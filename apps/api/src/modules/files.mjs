// files.mjs — P4: kho tệp.
// Nội dung tệp nằm ngoài kernel: đĩa cục bộ (mặc định, volume Docker) hoặc MinIO/S3
// (khi có MINIO_* — API tương thích S3, đường lên cloud không phải đổi mã).
// Metadata tệp nằm TRONG work_item.doc.files — đúng cấu trúc t.files của prototype
// (themFile/fileSao/fileGo của kernel thao tác tiếp như thường).
// Tải lên/tải xuống đều QUA API — một cửa kiểm quyền, không URL ký sẵn.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const TRAN_MB = 25;

export class FileService {
  constructor(sql, store) {
    this.sql = sql; this.store = store;
    this.goc = process.env.UPLOAD_DIR || path.resolve(import.meta.dir, '../../../../uploads');
    fs.mkdirSync(this.goc, { recursive: true });
  }

  trangThai() {
    try { fs.accessSync(this.goc, fs.constants.W_OK); return 'ok'; } catch { return 'loi'; }
  }

  async luuBlob(workId, ten, mime, buf, boi) {
    const id = crypto.randomUUID();
    const nam = String(new Date().getFullYear());
    const sach = ten.replace(/[^\p{L}\p{N}._-]/gu, '_').slice(0, 120);
    const key = `${nam}/${workId}/${id}-${sach}`;
    const duongDan = path.join(this.goc, key);
    fs.mkdirSync(path.dirname(duongDan), { recursive: true });
    fs.writeFileSync(duongDan, buf);
    await this.sql`INSERT INTO attachment_blob(id, work_id, ten, mime, kich_thuoc, storage_key, boi)
                   VALUES (${id}, ${workId}, ${ten}, ${mime}, ${buf.length}, ${key}, ${boi})`;
    return { id, key };
  }

  /** Client tải tệp lên từ giao diện (input #fi trong phiếu, #avin ảnh đại diện…). */
  async nhanTuUi(me, req, ui) {
    const form = await req.formData();
    const inputId = String(form.get('inputId') || '');
    const raw = form.getAll('files');
    const dsTep = [];
    for (const f of raw) {
      if (typeof f === 'string') continue;
      if (f.size > TRAN_MB * 1024 * 1024)
        return { tuChoi: `Tệp ${f.name} vượt trần ${TRAN_MB} MB.` };
      dsTep.push({ name: f.name, size: f.size, type: f.type, buf: Buffer.from(await f.arrayBuffer()) });
    }
    if (!dsTep.length) return { tuChoi: 'Không có tệp nào.' };

    if (inputId === 'avin') {
      // Ảnh đại diện: lưu thành data URL trong U[me].anh (ảnh nhỏ), đúng hành vi doiAnh
      const f = dsTep[0];
      if (!String(f.type).startsWith('image/')) return { tuChoi: 'Chỉ nhận tệp ảnh' };
      if (f.size > 512 * 1024) return { tuChoi: 'Ảnh đại diện tối đa 512 KB' };
      const dataUrl = `data:${f.type};base64,${f.buf.toString('base64')}`;
      const r = await this.store.write(me, (K) => {
        K.X.U[me].anh = dataUrl;
        if (K.GET.CUR()) K.X.renderDw();
        K.X.draw(); K.X.drawNav();
        K.X.toast('Đã đổi ảnh đại diện của ' + K.X.U[me].ten);
      });
      return ui._donKetQua(me, r);
    }

    // Tệp đính kèm phiếu việc (#fi hoặc kéo-thả): cần một phiếu đang mở (CUR)
    const ses = this.store.sessions.get(me);
    const cur = ses?.ui?.CUR;
    if (!cur || !cur.id) return { tuChoi: 'Chưa mở phiếu việc nào để đính kèm.' };
    const blobs = [];
    for (const f of dsTep) blobs.push({ f, blob: await this.luuBlob(cur.id, f.name, f.type, f.buf, me) });
    const r = await this.store.write(me, (K) => {
      const truocIds = new Set((K.GET.CUR().files || []).map((x) => x.id));
      K.X.themFile(dsTep.map((f) => ({ name: f.name, size: f.size, type: f.type })));
      // gắn đường tải xuống thật cho các mục vừa thêm
      const moi = (K.GET.CUR().files || []).filter((x) => !truocIds.has(x.id));
      moi.forEach((m, i) => { if (blobs[i]) m.url = '/api/files/' + blobs[i].blob.id; });
    });
    return ui._donKetQua(me, r);
  }

  /** Tải xuống — kiểm quyền xemDuoc trước khi mở luồng. */
  async taiXuong(me, blobId) {
    const [b] = await this.sql`SELECT * FROM attachment_blob WHERE id=${blobId}`;
    if (!b) return new Response('Không có tệp', { status: 404 });
    const duocXem = this.store.withSession(me, (K) => {
      const t = K.X.find(b.work_id);
      return t ? K.X.xemDuoc(t) : false;
    });
    if (!duocXem) return new Response('Bạn không có quyền xem tệp của việc này', { status: 403 });
    const duongDan = path.join(this.goc, b.storage_key);
    if (!fs.existsSync(duongDan)) return new Response('Tệp không còn trên kho', { status: 410 });
    return new Response(Bun.file(duongDan), {
      headers: {
        'Content-Type': b.mime || 'application/octet-stream',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(b.ten)}`,
      },
    });
  }
}
