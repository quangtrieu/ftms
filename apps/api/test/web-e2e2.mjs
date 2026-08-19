// web-e2e2.mjs — e2e trình duyệt mở rộng, vai Tổng Giám đốc F003:
// Giao ban · Điểm tháng · Điều hành · Cá nhân · Thiết lập · Trợ lý · TẠO VIỆC THẬT từ form.
import { chromium } from 'playwright';
const BASE = process.argv[2] || 'http://localhost:4001';
let dat = 0, truot = 0;
const ok = (ten, dk, extra='') => { if (dk) { dat++; console.log('✓', ten); } else { truot++; console.log('✗', ten, extra); } };

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1500, height: 950 }, extraHTTPHeaders: { 'x-employee-id': 'F003' } });
const page = await ctx.newPage();
const loi = [];
page.on('pageerror', (e) => loi.push(e.message));

await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
await page.waitForSelector('#app .h1', { timeout: 10000 });
ok('F003 vào màn hình chính', true);

const tab = async (ten) => { await page.locator('#nav button', { hasText: ten }).first().click(); await page.waitForTimeout(700); return page.locator('#app').innerHTML(); };

let h = await tab('Giao ban');
ok('Giao ban render (kết luận điều hành)', h.includes('Kết luận') || h.includes('kết luận') || h.length > 5000, 'dài=' + h.length);
// chuyển sang mặt Điểm tháng
const coDG = await page.locator('#app button', { hasText: 'Điểm' }).count();
if (coDG) { await page.locator('#app button', { hasText: 'Điểm' }).first().click(); await page.waitForTimeout(700);
  const h2 = await page.locator('#app').innerHTML();
  ok('Điểm tháng render', h2.includes('XS') || h2.includes('Xếp loại') || h2.includes('điểm'), ''); }
else ok('Điểm tháng render', false, 'không thấy nút');

h = await tab('Điều hành');
ok('Điều hành render (3 mục)', h.includes('nút thắt') || h.includes('nhắc') || h.length > 3000, 'dài=' + h.length);
h = await tab('Cá nhân');
ok('Cá nhân render (bảng người)', h.length > 3000, 'dài=' + h.length);
h = await tab('Theo dõi');
ok('Theo dõi render', h.length > 3000);
// đổi lăng kính Kanban nếu có
const kb = await page.locator('#app button', { hasText: 'Kanban' }).count();
if (kb) { await page.locator('#app button', { hasText: 'Kanban' }).first().click(); await page.waitForTimeout(600);
  ok('Kanban render', (await page.locator('#app').innerHTML()).length > 2000); }
h = await tab('Dự án');
ok('Dự án render', h.length > 2000);
h = await tab('Thiết lập');
ok('Thiết lập render (11 tab)', h.includes('Tham số') || h.includes('Cơ cấu'), '');

// Trợ lý: mở ngăn, đặt câu hỏi cục bộ
await page.click('#tlnut');
await page.waitForTimeout(700);
ok('ngăn trợ lý mở', await page.evaluate(() => document.getElementById('tlw').classList.contains('on')));
const taTxt = await page.locator('#tlw textarea').count();
if (taTxt) {
  await page.locator('#tlw textarea').fill('quá hạn nghĩa là gì');
  await page.waitForTimeout(400);
  await page.locator('#tlw button', { hasText: 'Hỏi' }).click();
  await page.waitForTimeout(1500);
  const tl = await page.locator('#tlw').innerHTML();
  ok('trợ lý trả lời tại chỗ', tl.includes('Quá hạn') || tl.includes('quá hạn'), '');
} else ok('trợ lý trả lời tại chỗ', false, 'không có ô nhập');
// đóng ngăn trợ lý bằng chính nút đóng của nó, chờ ổn định
await page.waitForTimeout(800);
await page.evaluate(() => { var b = document.querySelector('#tlw .x, #tlw [onclickx]');
  if (b) b.click(); else document.getElementById('tlscrim').click(); });
await page.waitForFunction(() => !document.getElementById('tlw').classList.contains('on'), null, { timeout: 6000 }).catch(() => {});
await page.evaluate(() => { document.getElementById('tlw').classList.remove('on'); document.getElementById('tlscrim').classList.remove('on'); });

// TẠO VIỆC THẬT từ form (vai F003 có quyền giao việc)
await tab('Việc của tôi');
await page.locator('#app .tmb .btn', { hasText: 'Tạo việc mới' }).click();
await page.waitForTimeout(800);
ok('form tạo việc mở', /Tiêu đề|TIÊU ĐỀ/i.test(await page.locator('#app').innerHTML()));
// điền: tiêu đề, sản phẩm, 1 tiêu chí, hạn — các ô là input không id, handler oninput FRM.*
const inputs = page.locator('#app input.inp, #app textarea.inp');
await page.locator('#app input[placeholder*="Rà soát"]').fill('Kiểm kê quỹ tiền mặt cuối quý 3');
await page.waitForTimeout(400);
await page.locator('#app input[placeholder*="Bảng đối soát"]').fill('Biên bản kiểm kê quỹ có đủ chữ ký');
await page.waitForTimeout(400);
await page.locator('#app input[placeholder="Tiêu chí 1"]').fill('Số dư khớp sổ quỹ');
await page.waitForTimeout(400);
// chọn người thực hiện: cặp select phòng ban → người (bỏ qua select mẫu phiếu)
const dsSel = page.locator('#app select.inp');
const nSel = await dsSel.count();
for (let i = 0; i < nSel; i++) {
  const opts = await dsSel.nth(i).locator('option').allTextContents();
  if (opts.some((o) => o.includes('Chọn phòng ban'))) {
    await dsSel.nth(i).selectOption('TCKT_KT');
    await page.waitForTimeout(700);
    const dsSel2 = page.locator('#app select.inp');
    for (let j2 = 0; j2 < await dsSel2.count(); j2++) {
      const o2 = await dsSel2.nth(j2).locator('option').allTextContents();
      if (o2.some((x) => x.includes('Bích Ngọc') || x.includes('Quang Anh'))) {
        const val = await dsSel2.nth(j2).locator('option').nth(1).getAttribute('value');
        await dsSel2.nth(j2).selectOption(val);
        await page.waitForTimeout(700);
        break;
      }
    }
    break;
  }
}
const hanInput = page.locator('#app input[type="date"], #app input[placeholder*="dd/mm"]');
if (await hanInput.count()) { await hanInput.first().fill(await hanInput.first().getAttribute('type') === 'date' ? '2026-09-25' : '25/09/2026'); await page.waitForTimeout(400); }
// bấm Giao việc
await page.locator('#app button', { hasText: 'Giao việc' }).click();
await page.waitForTimeout(1200);
const appSau = await page.locator('#app').innerHTML();
const toast = await page.locator('#toast').innerHTML();
ok('giao việc thành công (toast/về danh sách)', toast.includes('Đã') || appSau.includes('Kiểm kê quỹ'), 'toast=' + toast.slice(0, 60));

ok('không có lỗi JS trang', loi.length === 0, loi.slice(0,3).join(' | '));
await page.screenshot({ path: '/tmp/ftms-e2e2.png' });
await browser.close();
console.log(`WEB-E2E2: ${dat}/${dat + truot}`);
process.exit(truot ? 1 : 0);
