/* client.js — client mỏng tuyệt đối của FTMS.
   Không có một phép tính nghiệp vụ nào ở đây: trình duyệt chỉ
   (1) áp các mảnh innerHTML/classList mà máy chủ (kernel prototype) sinh ra,
   (2) gửi nguyên văn chuỗi handler on* về máy chủ thực thi,
   (3) tải tệp lên qua endpoint riêng. */
(function () {
  'use strict';
  var dangGui = false, hangDoi = [];
  try { if (localStorage.getItem('sbgon') === '1') document.documentElement.classList.add('sb-gon'); } catch (e) {}

  function $id(id) { return document.getElementById(id); }

  function thuThapInputs() {
    var o = {};
    var els = document.querySelectorAll('input[id],select[id],textarea[id]');
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      if (e.type === 'file') continue;
      if (e.type === 'checkbox' || e.type === 'radio') o[e.id + '::checked'] = e.checked;
      o[e.id] = e.value;
    }
    // hộp chọn dạng nút (ví dụ Loại đề nghị): gửi lựa chọn đang bật
    var picks = document.querySelectorAll('[id] > button.on[data-v]');
    for (var k = 0; k < picks.length; k++) {
      var pe = picks[k].parentElement;
      if (pe && pe.id) o[pe.id + '::onv'] = picks[k].getAttribute('data-v');
    }
    return o;
  }

  function apDung(res) {
    if (!res) return;
    if (res.tuChoi) { baoLoi(res.tuChoi); return; }
    if (res.html) {
      for (var id in res.html) {
        var el = $id(id);
        if (!el) continue;
        el.innerHTML = res.html[id];
        vietLaiHandler(el);
        if (id === 'nav') trangTriNav(el);
      }
    }
    if (res.cls) {
      for (var i = 0; i < res.cls.length; i++) {
        var op = res.cls[i]; var el2 = $id(op[0]);
        if (!el2) continue;
        if (op[1] === 'add') el2.classList.add(op[2]);
        else if (op[1] === 'remove') el2.classList.remove(op[2]);
        else el2.classList.toggle(op[2]);
      }
    }
    // toast: máy chủ không có setTimeout — client tự tắt sau 2.6s
    var t = $id('toast');
    if (t && t.classList.contains('on')) {
      clearTimeout(t.__h);
      t.__h = setTimeout(function () { t.classList.remove('on'); }, 2600);
    }
  }

  function baoLoi(msg) {
    var t = $id('toast');
    if (!t) return alert(msg);
    t.innerHTML = msg; t.classList.add('on');
    clearTimeout(t.__h);
    t.__h = setTimeout(function () { t.classList.remove('on'); }, 3200);
  }

  function goi(h, ctx, confirms) {
    var body = {
      h: h,
      v: ctx && ctx.v !== undefined ? ctx.v : '',
      c: ctx ? !!ctx.c : false,
      k: ctx && ctx.k ? ctx.k : '',
      inputs: thuThapInputs(),
      confirms: confirms || []
    };
    return fetch('/api/ui/act', {
      method: 'POST', credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(function (r) {
      if (r.status === 401) { location.href = '/dang-nhap'; throw new Error('401'); }
      return r.json();
    }).then(function (res) {
      if (res && res.canXacNhan) {
        if (window.confirm(res.canXacNhan)) return goi(h, ctx, [true]);
        return null;
      }
      apDung(res);
      return res;
    }).catch(function (e) { if (String(e.message) !== '401') baoLoi('Mất kết nối máy chủ — thử lại.'); });
  }

  // Trang trí thanh bên (thuần trình bày, không nghiệp vụ): nhãn nhóm chèn trước
  // cửa sổ đầu tiên của mỗi nhóm — cửa sổ nào bị quyền lọc mất thì nhãn tự bỏ qua.
  var NAV_NHOM = [['toi', 'Công việc'], ['dh', 'Điều hành'], ['ns', 'Hệ thống'], ['xong', 'Lưu trữ']];
  function trangTriNav(el) {
    for (var i = 0; i < NAV_NHOM.length; i++) {
      var b = el.querySelector('button[data-k="' + NAV_NHOM[i][0] + '"]');
      if (!b) continue;
      var d = document.createElement('div');
      d.className = 'nav-sec'; d.textContent = NAV_NHOM[i][1];
      el.insertBefore(d, b);
    }
  }

  var LOAI_SK = ['onclick', 'onchange', 'oninput', 'onmouseenter', 'onmouseleave', 'ondrop', 'ondragover', 'ondragleave', 'onkeydown'];
  function vietLaiHandler(goc) {
    var els = goc.querySelectorAll('[onclick],[onchange],[oninput],[onmouseenter],[onmouseleave],[ondrop],[onkeydown]');
    var all = [goc].concat(Array.prototype.slice.call(els));
    for (var i = 0; i < all.length; i++) gan(all[i]);
  }
  function gan(el) {
    if (el.type === 'file') return; // tệp đi đường riêng (listener change toàn cục)
    for (var j = 0; j < LOAI_SK.length; j++) {
      var ten = LOAI_SK[j];
      var code = el.getAttribute && el.getAttribute(ten);
      if (!code) continue;
      if (ten === 'onclick') {
        // nút điều hướng: giữ lại khoá cửa sổ làm data-k (icon CSS) + tooltip khi sidebar thu gọn
        var gm = code.match(/^go\('([a-z]+)'\)$/);
        if (gm) { el.dataset.k = gm[1]; el.title = (el.textContent || '').replace(/\d+$/, ''); }
      }
      el.removeAttribute(ten);
      (function (loai, code2, el2) {
        if (loai === 'ondragover' || loai === 'ondragleave') {
          // thuần trang trí kéo-thả — xử lý tại chỗ, không gọi máy chủ
          el2.addEventListener(loai.slice(2), function (ev) {
            ev.preventDefault();
            if (loai === 'ondragover') el2.classList.add('keo');
            else el2.classList.remove('keo');
          });
          return;
        }
        el2.addEventListener(loai.slice(2), function (ev) {
          if (loai === 'onclick') ev.stopPropagation();
          // hai handler thuần client: chọn nút trong hộp (pickDx) và tô sáng hàng Gantt (hovG)
          if (/^pickDx\(this\)$/.test(code2)) {
            var sib = el2.parentNode.querySelectorAll('button');
            for (var q = 0; q < sib.length; q++) sib[q].classList.remove('on');
            el2.classList.add('on');
            return;
          }
          if (/^hovG\(/.test(code2)) {
            var hm = code2.match(/^hovG\('?([^',)]*)'?,\s*(true|false|1|0)\)$/);
            if (hm) {
              var hs = document.querySelectorAll('.gt-rw[data-k="' + hm[1] + '"],.gt-br[data-k="' + hm[1] + '"]');
              for (var w = 0; w < hs.length; w++) hs[w].classList.toggle('hov', hm[2] === 'true' || hm[2] === '1');
              return;
            }
          }
          if (loai === 'ondrop') {
            ev.preventDefault(); el2.classList.remove('keo');
            if (ev.dataTransfer && ev.dataTransfer.files && ev.dataTransfer.files.length)
              return taiTepLen(ev.dataTransfer.files, 'fi');
          }
          if (loai === 'onkeydown' && ev.key !== 'Enter') return;
          var ctx = { v: el2.value, c: el2.checked, k: ev.key || '' };
          if (loai === 'oninput') {
            clearTimeout(el2.__deb);
            el2.__deb = setTimeout(function () { goi(code2, ctx); }, 220);
            return;
          }
          goi(code2, ctx);
        });
      })(ten, code, el);
    }
  }

  // ---------- tệp ----------
  function taiTepLen(files, inputId) {
    var fd = new FormData();
    fd.append('inputId', inputId);
    for (var i = 0; i < files.length; i++) fd.append('files', files[i]);
    return fetch('/api/ui/files', { method: 'POST', credentials: 'same-origin', body: fd })
      .then(function (r) { return r.json(); })
      .then(apDung)
      .catch(function () { baoLoi('Không tải được tệp lên.'); });
  }
  document.addEventListener('change', function (ev) {
    var e = ev.target;
    if (e && e.type === 'file' && e.files && e.files.length) {
      taiTepLen(e.files, e.id || '');
      e.value = '';
    }
  }, true);

  // ---------- khung: chuông, menu, ESC, bấm ra ngoài ----------
  function khung() {
    var who = $id('who'), bell = $id('bell'), nt = $id('nt'), menu = $id('menu');
    // thu gọn / mở rộng sidebar (chỉ là trình bày; nhớ lựa chọn trong localStorage)
    var sb = $id('sbtg');
    if (sb) sb.addEventListener('click', function (ev) {
      ev.stopPropagation();
      var on = document.documentElement.classList.toggle('sb-gon');
      try { localStorage.setItem('sbgon', on ? '1' : '0'); } catch (e) {}
    });
    if (who) who.addEventListener('click', function (ev) {
      ev.stopPropagation(); if (nt) nt.classList.remove('on'); if (menu) menu.classList.toggle('on');
    });
    if (bell) bell.addEventListener('click', function (ev) {
      ev.stopPropagation(); if (menu) menu.classList.remove('on'); if (nt) nt.classList.toggle('on');
    });
    document.addEventListener('click', function (ev) {
      if (nt && !ev.target.closest('.nt') && !ev.target.closest('#bell')) nt.classList.remove('on');
      if (menu && !ev.target.closest('.menu') && !ev.target.closest('#who')) menu.classList.remove('on');
      if (document.querySelector('.cn') && !ev.target.closest('.cn')) goi('__outside_cn', {});
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') goi('__esc', {});
    });
  }

  // ---------- thời gian thực ----------
  function sse() {
    try {
      var es = new EventSource('/api/events');
      es.onmessage = function (ev) {
        try {
          var d = JSON.parse(ev.data);
          if (d && d.kind === 'changed') goi('__refresh', {});
        } catch (e) {}
      };
      es.onerror = function () { es.close(); setTimeout(sse, 5000); };
    } catch (e) {}
  }

  // ---------- khởi động ----------
  fetch('/api/ui/boot', { credentials: 'same-origin' })
    .then(function (r) {
      if (r.status === 401) { location.href = '/dang-nhap'; throw new Error('401'); }
      return r.json();
    })
    .then(function (res) {
      if (res && res.doiMatKhau) { location.href = '/doi-mat-khau'; return; }
      vietLaiHandler(document.body);
      apDung(res);
      khung();
      sse();
    })
    .catch(function () {});

  // in phiếu / báo cáo: máy chủ trả HTML in được → mở cửa sổ in của trình duyệt
  window.__inHTML = function (html) {
    var w = window.open('', '_blank');
    w.document.write(html); w.document.close();
    setTimeout(function () { w.print(); }, 300);
  };
})();
