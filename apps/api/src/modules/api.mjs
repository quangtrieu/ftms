// api.mjs — REST JSON (hợp đồng OpenAPI: openapi/openapi.json).
// Mỏng đúng nghĩa: dựng ngữ cảnh người dùng → gọi hàm kernel → trả JSON
// tên trường tiếng Việt đúng như số vàng. Thao tác ghi đi qua store.write.
const j = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8' } });

export function dangKyApi({ sql, store, auth, ui, files, assistant }) {
  // đọc trong ngữ cảnh phiên
  const doc = (me, fn) => store.withSession(me, (K) => JSON.parse(JSON.stringify(fn(K.X, K))));
  const chiSoViec = (X, t) => ({
    ...t,
    quaHan: X.quaHan(t), dangDung: X.dangDung(t), ngayDaDung: X.ngayDaDung(t),
    hanThuc: X.fmtNgay(X.hanThuc(t)), conLai: X.conLai(t), uuTien: X.uuTien(t),
    tienDo: X.tienDo(t), raci: X.raci(t), ruiRo: X.ruiRo(t), nguon: X.nguonCua(t),
  });

  return async function api(req, url, me, ip) {
    const p = url.pathname, m = req.method;
    const q = url.searchParams;
    const body = m === 'POST' || m === 'PATCH' ? await req.json().catch(() => ({})) : {};
    const coQuyen = (ma) => store.withSession(me, (K) => K.X.coQuyen(me, ma));

    // ---------- ĐỌC ----------
    if (p === '/api/me') return j(doc(me, (X) => ({
      id: me, ...X.U[me], tabs: X.tabs(), capBC: X.capBCChoPhep(),
      quyen: Object.fromEntries(X.QUYEN.map(([ma]) => [ma, X.coQuyen(me, ma)])),
      hangAI: X.hangCua(me), laBGD: X.laBGD(me),
    })));

    if (p === '/api/work-items' && m === 'GET') return j(doc(me, (X) => {
      const scope = q.get('scope') || 'mine';
      let ds = scope === 'mine'
        ? X.T.filter((t) => X.viecMo(t) && X.vaiCuaToi(t))
        : X.T.filter((t) => X.trongTamNhin(t));
      const vai = q.get('vai');
      if (vai && vai !== 'TAT_CA') ds = ds.filter((t) => { const v = X.vaiCuaToi(t); return v && v.vai === vai; });
      const dv = q.get('dv');
      if (dv && dv !== 'TAT_CA') ds = ds.filter((t) => X.trongDV(t.lam, dv));
      const nguon = q.get('nguon');
      if (nguon && nguon !== 'TAT_CA') ds = ds.filter((t) => t.loai === nguon);
      const duAn = q.get('duAn');
      if (duAn && duAn !== 'TAT_CA') ds = ds.filter((t) => (X.duAnCua(t) || {}).id === duAn);
      return ds.map((t) => chiSoViec(X, t));
    }));

    const mViec = p.match(/^\/api\/work-items\/([\w-]+)$/);
    if (mViec && m === 'GET') {
      const t0 = store.withSession(me, (K) => { const t = K.X.find(mViec[1]); return t && K.X.xemDuoc(t) ? t : null; });
      if (!t0) return j({ loi: 'Không có việc này hoặc bạn không có quyền xem' }, 404);
      if (t0.mat === 'HAN_CHE') {
        // Mở việc mức Hạn chế → ghi nhật ký (đúng openDw của prototype)
        await store.write(me, (K) =>
          K.X.NK.unshift({ t: K.X.NOW, ai: me, viec: 'Mở việc mức Hạn chế', dt: `${t0.id} · ${t0.ttl}`, ip }));
      }
      return j(doc(me, (X) => chiSoViec(X, X.find(mViec[1]))));
    }

    if (p === '/api/org/tree') return j(doc(me, (X) => ({
      DV: X.DV, KHOI: X.KHOI, VI_TRI: X.VI_TRI,
      nguoi: Object.values(X.U).map((u) => ({ ...u, cap: X.capViec(u.id) })),
    })));

    if (p === '/api/people') return j(doc(me, (X) =>
      Object.keys(X.U).filter((id) => X.nhanhCuaToi().has(id) || X.coQuyen(me, 'xem_toan_cty'))
        .map((id) => ({ id, ...X.U[id], ...X.tinhNguoi(id), taiTuanNay: X.taiTuanNay(id) }))));

    const mNguoi = p.match(/^\/api\/people\/([\w-]+)\/work$/);
    if (mNguoi) return j(doc(me, (X) =>
      X.T.filter((t) => X.trongTamNhin(t) && t.lam === mNguoi[1] && X.viecMo(t)).map((t) => chiSoViec(X, t))));

    if (p === '/api/projects') return j(doc(me, (X) => X.dsDuAn().map((t) => ({
      ...chiSoViec(X, t), sucKhoe: X.sucKhoeDA(t), duBao: X.duBao(t.id), moc: X.mocDA(t.id).map((x) => x.id),
    }))));
    const mDA = p.match(/^\/api\/projects\/([\w-]+)$/);
    if (mDA) return j(doc(me, (X) => {
      const t = X.find(mDA[1]);
      if (!t || !X.xemDuoc(t)) return { loi: 'Không có dự án này' };
      return {
        ...chiSoViec(X, t), sucKhoe: X.sucKhoeDA(t), duBao: X.duBao(t.id), cpm: X.cpm(t.id),
        viec: X.viecDA(t.id).map((x) => chiSoViec(X, x)), moc: X.mocDA(t.id).map((x) => chiSoViec(X, x)),
        ruiRo: X.RUI_RO.filter((r) => r.da === t.id), quyetDinh: X.QUYET_DINH.filter((r) => r.da === t.id),
        dieuLe: t.dieule || null,
      };
    }));

    if (p === '/api/recurrence') return j(doc(me, (X) => ({
      soLieu: X.soViecLap(),
      quyTac: X.T.filter((t) => X.xemDuoc(t) && X.laCK(t) && !t.tuQuyTac)
        .map((t) => ({ ...t, kySau: X.kySau(t), khoaKy: X.khoaKy(t, t.han) })),
    })));

    if (p === '/api/dieu-hanh') return j(doc(me, (X) => ({
      dangChanBoi: X.dangChanBoi().map((t) => chiSoViec(X, t)),
      nhacHomNay: X.nhacHomNay().map((x) => ({ viec: x.t.id, ttl: x.t.ttl, moc: x.moc.ma, ai: x.ai, ngay: x.ngay })),
      canThiep: X.T.filter((t) => X.trongTamNhin(t) && X.canCanThiep(t)).map((t) => chiSoViec(X, t)),
      monteCarlo: X.monteCarlo(5, 200),
    })));

    if (p === '/api/reports/period') return j(doc(me, (X) => {
      const loai = q.get('loai') || 'TUAN', lech = Number(q.get('lech') || 0);
      const kt = X.khoangKy(loai, lech - 1), kn = X.khoangKy(loai, lech);
      const tap = X.T.filter((t) => X.trongTamNhin(t));
      const S = X.soLieuKy(tap, kt, kn);
      return {
        ky: { truoc: kt, nay: kn }, soLieu: S,
        theoDonVi: X.dvBaoCao().map((ma) => X.tomTatDV(ma, kt, kn)),
        theoKhoi: X.KHOI.map((k) => X.tomTatKhoi(k, kt, kn)),
        khoiHo: X.khoiHo(kt, kn),
        ketLuan: X.ketLuanDH(tap, kt, kn, S),
      };
    }));

    if (p === '/api/scores/period') return j(doc(me, (X) => {
      const loai = q.get('loai') || 'THANG', lech = Number(q.get('lech') || 0);
      const ky = X.khoangKy(loai, lech);
      return {
        ky,
        khoi: X.KHOI.map((k) => X.diemThangKhoi(k, ky)),
        donVi: X.dvBaoCao().map((ma) => X.diemThangDV(ma, ky)),
        nguoi: Object.keys(X.U).map((id) => X.diemThangNguoi(id, ky)),
      };
    }));

    if (p === '/api/done') return j(doc(me, (X) =>
      X.T.filter((t) => X.trongTamNhin(t) && t.tt === 'HOAN_THANH').map((t) => chiSoViec(X, t))));

    if (p === '/api/notifications') return j(doc(me, (X) => X.NT.filter((n) => n.to === me)));
    if (p === '/api/notifications/read-all' && m === 'POST') {
      const r = await store.write(me, (K) => K.X.readAll());
      return j({ ok: true, thayDoi: r.thayDoi });
    }

    if (p === '/api/glossary') return j(doc(me, (X) => X.THUAT_NGU));
    if (p === '/api/params') {
      if (!coQuyen('sua_tham_so')) return j({ loi: 'Không có quyền' }, 403);
      return j(doc(me, (X) => ({ CH: X.CH, THAM_SO: X.THAM_SO, AI_CH: X.AI_CH, BAC_DUYET: X.BAC_DUYET })));
    }
    if (p === '/api/admin/audit') {
      if (!coQuyen('xem_nhat_ky')) return j({ loi: 'Không có quyền' }, 403);
      return j(doc(me, (X) => X.NK.slice(0, Number(q.get('limit') || 200))));
    }

    // ---------- TÀI KHOẢN (quản trị) ----------
    if (p.startsWith('/api/auth/accounts')) {
      if (!coQuyen('sua_to_chuc')) return j({ loi: 'Cần quyền sửa tổ chức' }, 403);
      if (p === '/api/auth/accounts' && m === 'GET') return j(await auth.danhSach());
      const mm = p.match(/^\/api\/auth\/accounts\/([\w-]+)\/(reset-password|active)$/);
      if (mm && m === 'POST') {
        if (mm[2] === 'reset-password') return j(await auth.datLaiMatKhau(me, mm[1]));
        return j(await auth.datActive(me, mm[1], !!body.active));
      }
    }

    // ---------- TỆP ----------
    const mTep = p.match(/^\/api\/files\/([\w-]+)$/);
    if (mTep && m === 'GET') return files.taiXuong(me, mTep[1]);

    // ---------- GHI (qua kernel — cùng đường với UI) ----------
    const ghiViec = async (id, fn, inputs) => {
      const t0 = store.withSession(me, (K) => { const t = K.X.find(id); return t && K.X.xemDuoc(t) ? t.id : null; });
      if (!t0) return j({ loi: 'Không có việc này hoặc không có quyền' }, 404);
      const r = await store.write(me, (K) => {
        K.SET.CUR(K.X.find(id));
        fn(K);
      }, { inputs: inputs || {} });
      const kq = doc(me, (X) => chiSoViec(X, X.find(id)));
      return j({ ok: true, thayDoi: r.thayDoi, viec: kq });
    };

    let mw;
    if ((mw = p.match(/^\/api\/work-items\/([\w-]+)\/accept$/)) && m === 'POST')
      return ghiViec(mw[1], (K) => K.X.act('nhan'));
    if ((mw = p.match(/^\/api\/work-items\/([\w-]+)\/feedback$/)) && m === 'POST')
      return ghiViec(mw[1], (K) => K.X.guiYKien(['HAN','NGUONLUC','NGUOI'].includes(body.loai) ? body.loai : 'HAN'), { yk_nd: body.noiDung || '' });
    if ((mw = p.match(/^\/api\/work-items\/([\w-]+)\/feedback\/reply$/)) && m === 'POST') {
      const cach = String(body.cach || '');
      if (!['giuNguyen', 'doiHan', 'themNguonLuc', 'doiNguoi'].includes(cach)) return j({ loi: 'cach không hợp lệ' }, 400);
      return ghiViec(mw[1], (K) => K.X.act(cach));
    }
    if ((mw = p.match(/^\/api\/work-items\/([\w-]+)\/reschedule$/)) && m === 'POST') {
      const hd = String(body.action || '');
      if (!['xinlui', 'dongYLui', 'tuChoiLui'].includes(hd)) return j({ loi: 'action không hợp lệ' }, 400);
      return ghiViec(mw[1], (K) => K.X.act(hd), body.inputs);
    }
    if ((mw = p.match(/^\/api\/work-items\/([\w-]+)\/submit$/)) && m === 'POST')
      return ghiViec(mw[1], (K) => K.X.act('nop'));
    if ((mw = p.match(/^\/api\/work-items\/([\w-]+)\/approve$/)) && m === 'POST')
      return ghiViec(mw[1], (K) => {
        K.SET.SC({ cl: body.cl, cd: body.cd, ht: body.ht });
        K.X.chotDiem();
      }, { nx: body.nx || '' });
    if ((mw = p.match(/^\/api\/work-items\/([\w-]+)\/return$/)) && m === 'POST')
      return ghiViec(mw[1], (K) => K.X.act(body.lan === 2 ? 'tralai2' : 'tralai'));
    if ((mw = p.match(/^\/api\/work-items\/([\w-]+)\/health$/)) && m === 'PATCH')
      return ghiViec(mw[1], (K) => K.X.setSK(String(body.sk || 'BT')));
    if ((mw = p.match(/^\/api\/work-items\/([\w-]+)\/tick$/)) && m === 'POST')
      return ghiViec(mw[1], (K) => K.X.tick(Number(body.i)));

    if (p === '/api/work-items' && m === 'POST') {
      // Tạo việc: dựng FRM đúng hình newFrm rồi gọi taoViec của kernel
      const r = await store.write(me, (K) => {
        const f = K.X.newFrm(body.nhom || 'CONG_VIEC');
        const { tc, nhom, ...con } = body;
        Object.assign(f, con);
        // FRM.tc của prototype là mảng CHUỖI (mỗi dòng một tiêu chí)
        if (tc) f.tc = tc.map((x) => (typeof x === 'string' ? x : (x && x.t) || '')).filter(Boolean);
        K.SET.FRM(f);
        K.SET.TAO_MO(true);
        K.X.taoViec();
        return K.GET.FRM();
      });
      // thành công = có việc mới trong T (taoViec unshift lên đầu)
      const moi = r.thayDoi.includes('T') ? store.withSession(me, (K) => K.X.T[0]) : null;
      await store.write(me, (K) => { K.SET.TAO_MO(false); K.SET.FRM(null); });
      if (!moi) return j({ loi: 'Không tạo được việc — kiểm tra các trường bắt buộc (tiêu đề, người làm, sản phẩm, ≥1 tiêu chí, hạn; đột xuất cần nguồn).' }, 400);
      return j({ ok: true, id: moi.id, thayDoi: r.thayDoi }, 201);
    }

    // ---------- TRỢ LÝ ----------
    if (p === '/api/assistant/ask' && m === 'POST') {
      const r = await store.write(me, (K) => {
        K.SET.AI_NV(body.nhiemVu || 'TONG_HOP');
        K.SET.AI_HOI(String(body.cauHoi || ''));
        if (body.moHinh) K.SET.AI_MH(String(body.moHinh));
      });
      const kq = await assistant.hoi(me, ui, {});
      const phien = store.withSession(me, (K) => K.GET.AI_PHIEN()[0] || null);
      return j({ ok: true, traLoi: phien ? JSON.parse(JSON.stringify({ nv: phien.nv, kq: phien.kq, luc: phien.luc })) : null });
    }
    if (p === '/api/assistant/history') return j(
      (await sql`SELECT id, nv, mo_hinh, chi_phi, luc FROM ai_request WHERE uid=${me} ORDER BY luc DESC LIMIT 50`));

    return null; // không khớp — main trả 404
  };
}
