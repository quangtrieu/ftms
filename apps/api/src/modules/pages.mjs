// pages.mjs — trang đăng nhập & đổi mật khẩu (không cần kernel).
const khung = (tieuDe, body) => `<!DOCTYPE html>
<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${tieuDe} — FTMS Forever</title>
<style>
:root{--brand:#1270B8;--navy:#0E4671;--ice2:#EFF6FB;--line:#DAE1E7;--ink:#22303C;--mute:#6B7885;--red:#B02A37;--white:#fff}
*{box-sizing:border-box;margin:0}
body{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;background:linear-gradient(160deg,var(--ice2),#fff);
  min-height:100vh;display:flex;align-items:center;justify-content:center;color:var(--ink)}
.card{background:var(--white);border:1px solid var(--line);border-radius:14px;padding:34px 38px;width:min(400px,92vw);
  box-shadow:0 1px 2px rgba(14,70,113,.06),0 12px 40px rgba(14,70,113,.10)}
h1{font-size:19px;color:var(--navy);margin-bottom:4px}
.sub{color:var(--mute);font-size:13px;margin-bottom:22px}
label{display:block;font-size:12.5px;font-weight:600;margin:14px 0 5px}
input{width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:8px;font-size:14.5px}
input:focus{outline:2px solid var(--brand);border-color:var(--brand)}
button{width:100%;margin-top:22px;padding:11px;background:var(--brand);color:#fff;border:0;border-radius:8px;
  font-size:15px;font-weight:600;cursor:pointer}
button:hover{background:var(--navy)}
.err{display:none;background:#FBE3E5;color:var(--red);border-radius:8px;padding:9px 12px;font-size:13px;margin-top:14px}
.brand{font-weight:800;color:var(--brand);letter-spacing:.4px;margin-bottom:14px;font-size:15px}
.brand i{font-style:normal;color:#1FB47D}
</style></head><body><div class="card"><div class="brand">FOR<i>EVER</i> · FTMS</div>${body}</div></body></html>`;

export const trangDangNhap = () => khung('Đăng nhập', `
<h1>Đăng nhập</h1>
<p class="sub">Tên đăng nhập là mã nhân sự viết thường (ví dụ <b>f003</b>).</p>
<form id="f">
  <label>Tên đăng nhập</label><input id="u" autocomplete="username" autofocus>
  <label>Mật khẩu</label><input id="p" type="password" autocomplete="current-password">
  <div class="err" id="e"></div>
  <button>Vào làm việc</button>
</form>
<script>
document.getElementById('f').onsubmit = function(ev){
  ev.preventDefault();
  fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({username:document.getElementById('u').value.trim(),password:document.getElementById('p').value})})
  .then(r=>r.json().then(d=>({s:r.status,d})))
  .then(({s,d})=>{
    if(s===200) location.href = d.mustChange ? '/doi-mat-khau' : '/';
    else { var e=document.getElementById('e'); e.style.display='block'; e.textContent=d.loi||'Không đăng nhập được'; }
  });
};
</script>`);

export const trangDoiMatKhau = (batBuoc) => khung('Đổi mật khẩu', `
<h1>Đổi mật khẩu</h1>
<p class="sub">${batBuoc
    ? 'Lần đầu đăng nhập — bạn phải đặt mật khẩu riêng trước khi vào làm việc.'
    : 'Đổi xong, mọi phiên đăng nhập cũ sẽ hết hiệu lực.'}</p>
<form id="f">
  <label>Mật khẩu hiện tại</label><input id="c" type="password" autocomplete="current-password" autofocus>
  <label>Mật khẩu mới (từ 8 ký tự)</label><input id="m" type="password" autocomplete="new-password">
  <label>Nhập lại mật khẩu mới</label><input id="m2" type="password" autocomplete="new-password">
  <div class="err" id="e"></div>
  <button>Đổi mật khẩu</button>
</form>
<script>
document.getElementById('f').onsubmit = function(ev){
  ev.preventDefault();
  var e=document.getElementById('e');
  var m=document.getElementById('m').value;
  if(m!==document.getElementById('m2').value){e.style.display='block';e.textContent='Hai lần nhập không khớp.';return;}
  fetch('/api/auth/change-password',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({cu:document.getElementById('c').value,moi:m})})
  .then(r=>r.json().then(d=>({s:r.status,d})))
  .then(({s,d})=>{
    if(s===200) location.href='/';
    else { e.style.display='block'; e.textContent=d.loi||'Không đổi được'; }
  });
};
</script>`);
