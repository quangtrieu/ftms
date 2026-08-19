// assistant.mjs — P6: trợ lý AI.
// Nguyên tắc (Luật 7): phần mềm tính số, mô hình viết nhận định. Gói bối cảnh dựng
// TẠI MÁY CHỦ bằng chính goiBoiCanh của kernel (cắt theo hạng ∩ quyền của người hỏi);
// khoá API chỉ nằm trong biến môi trường máy chủ; mọi lượt hỏi lưu ai_request.
// Không có ANTHROPIC_API_KEY → chạy chế độ trả lời tại chỗ (traLoiTaiCho của prototype,
// vẫn nói đúng số thật). Có khoá → gọi Claude thật, time-out 30 giây + 1 lần thử lại.
//
// hoiTroLy của prototype là hàm async (await goiClaude) — phần thân được tái hiện ở đây
// thành hai lượt ghi đồng bộ quanh lượt gọi mạng, giữ đúng từng phép cộng hạn mức.
export class AssistantService {
  constructor(sql, store) { this.sql = sql; this.store = store; }

  async hoi(me, ui, body) {
    // ----- lượt 1 (đồng bộ): kiểm hạn mức + dựng gói -----
    let giaiDoan1;
    const r1 = await this.store.write(me, (K) => {
      const X = K.X;
      const ok = X.conDuocHoi(me);
      if (!ok.duoc) { X.toast(ok.ly); giaiDoan1 = { dung: true }; return; }
      const hg = X.hangCua(me);
      const AI_NV = K.GET.AI_NV();
      if (!hg.nv.includes(AI_NV)) { X.toast(`${hg.ten} không được dùng nhiệm vụ này`); giaiDoan1 = { dung: true }; return; }
      if (!hg.moHinh.includes(K.GET.AI_MH())) K.SET.AI_MH(hg.macDinh);
      const goi = X.goiBoiCanh(AI_NV, { ky: 'TUAN' });
      giaiDoan1 = {
        goi, hg, nv: AI_NV, hoi: K.GET.AI_HOI(), mh: K.GET.AI_MH(),
        loiDan: X.loiDan(AI_NV),
      };
      K.SET.AI_CHAY && K.SET.AI_CHAY(true);
      X.veTroLy();
    }, { inputs: body.inputs || {} });
    if (giaiDoan1?.dung) return ui._donKetQua(me, r1);

    // ----- lượt mạng (ngoài kernel): Claude thật hoặc tại chỗ -----
    const { goi, hg, nv, hoi, mh, loiDan } = giaiDoan1;
    let kq;
    const key = process.env.ANTHROPIC_API_KEY;
    if (key) {
      kq = await this.goiClaudeThat(key, mh, loiDan, hoi, goi).catch((e) => ({
        tra: [{ tieu: 'Không gọi được trợ lý', y: [String(e.message || e), 'Kiểm tra khoá API và kết nối mạng của máy chủ.'] }],
        token: { vao: 0, ra: 0 }, chiPhi: 0, loi: true,
      }));
    } else {
      kq = this.store.withSession(me, (K) => K.X.traLoiTaiCho(nv, hoi, goi));
    }

    // ----- lượt 2 (đồng bộ): ghi kết quả + hạn mức + nhật ký — đúng thân hoiTroLy -----
    const r2 = await this.store.write(me, (K) => {
      const X = K.X;
      K.SET.AI_CHAY && K.SET.AI_CHAY(false);
      const mhO = X.MO_HINH[mh] || X.MO_HINH[hg.macDinh];
      const tien = Math.round((kq.token.vao * mhO.vao + kq.token.ra * mhO.ra) / 1000000);
      kq.chiPhi = tien; kq.moHinh = mh;
      K.GET.AI_PHIEN().unshift({ nv, hoi, goi, kq, luc: X.NOW, ai: me, mh, hang: hg.ma });
      X.AI_CH.daTieu += tien;
      const d = X.mucDung(me); d.ngay++; d.thang++; d.tien += tien;
      X.ghiNK(X.U[me].ten,
        `hỏi trợ lý (${hg.ten} · ${mhO.ten}) — ${X.NHIEM_VU[nv].ten}${hoi ? `: “${String(hoi).slice(0, 60)}”` : ''}` +
        ` · gói ${(goi.viecDangCanhBao || []).length} dòng việc · ${tien.toLocaleString('vi')} đ`, X.NOW);
      K.SET.AI_HOI('');
      X.veTroLy();
    });
    await this.sql`INSERT INTO ai_request(uid, nv, mo_hinh, goi, tra_loi, chi_phi)
                   VALUES (${me}, ${nv}, ${mh}, ${goi}::jsonb, ${JSON.stringify(kq.tra)}, ${kq.chiPhi || 0})`
      .catch((e) => console.error('[assistant] không lưu được ai_request:', e.message));
    return ui._donKetQua(me, r2);
  }

  /** Gọi Claude qua REST (không cần SDK) — time-out 30 s, 1 lần thử lại. */
  async goiClaudeThat(key, moHinh, loiDan, cauHoi, goi, lanThu = 0) {
    const ctl = new AbortController();
    const tm = setTimeout(() => ctl.abort(), 30000);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST', signal: ctl.signal,
        headers: {
          'x-api-key': key, 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: moHinh, max_tokens: 1500,
          system: loiDan + '\nTrả lời bằng JSON: mảng các khối {"tieu": "...", "y": ["...", "..."]} — tiếng Việt, bám đúng số liệu trong gói.',
          messages: [{ role: 'user', content: `Gói số liệu (JSON):\n${JSON.stringify(goi)}\n\nCâu hỏi: ${cauHoi || '(tổng hợp theo nhiệm vụ)'}` }],
        }),
      });
      clearTimeout(tm);
      if (!res.ok) throw new Error('Máy chủ Anthropic trả lỗi ' + res.status);
      const d = await res.json();
      const text = (d.content || []).map((c) => c.text || '').join('');
      let tra;
      try {
        const m = text.match(/\[[\s\S]*\]/);
        tra = m ? JSON.parse(m[0]) : [{ tieu: 'Trả lời', y: [text] }];
      } catch { tra = [{ tieu: 'Trả lời', y: [text] }]; }
      return { tra, token: { vao: d.usage?.input_tokens || 0, ra: d.usage?.output_tokens || 0 }, chiPhi: 0 };
    } catch (e) {
      clearTimeout(tm);
      if (lanThu < 1) return this.goiClaudeThat(key, moHinh, loiDan, cauHoi, goi, lanThu + 1);
      throw e;
    }
  }
}
