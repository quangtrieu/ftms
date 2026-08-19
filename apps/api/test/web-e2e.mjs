// web-e2e.mjs — kiểm giao diện thật bằng Chromium:
// đăng nhập → bắt đổi mật khẩu → vào Việc của tôi → chuyển cửa sổ → mở phiếu → ESC đóng.
// Chạy: bun test/web-e2e.mjs http://localhost:4001 f037 Forever@2026
import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://localhost:4001';
const USER = process.argv[3] || 'f037';
const PASS = process.argv[4] || 'Forever@2026';
const PASS_MOI = 'MatKhau@Moi2026';

let dat = 0, truot = 0;
const ok = (ten, dk) => { if (dk) { dat++; console.log('✓', ten); } else { truot++; console.log('✗', ten); } };

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
page.on('pageerror', (e) => console.log('  [lỗi JS trang]', e.message));

// 1. Chưa đăng nhập → về /dang-nhap
await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
ok('chưa đăng nhập bị đưa về /dang-nhap', page.url().includes('/dang-nhap'));

// 2. Đăng nhập lần đầu → bắt đổi mật khẩu
await page.fill('#u', USER);
await page.fill('#p', PASS);
await page.click('button');
await page.waitForURL('**/doi-mat-khau', { timeout: 8000 }).catch(() => {});
ok('lần đầu bị bắt đổi mật khẩu', page.url().includes('/doi-mat-khau'));

// 3. Đổi mật khẩu → vào màn hình chính
await page.fill('#c', PASS);
await page.fill('#m', PASS_MOI);
await page.fill('#m2', PASS_MOI);
await page.click('button');
await page.waitForURL(BASE + '/', { timeout: 8000 }).catch(() => {});
await page.waitForSelector('#app .h1', { timeout: 10000 }).catch(() => {});
ok('vào được màn hình chính', await page.locator('#app .h1').first().textContent().then((t) => (t || '').includes('Việc của tôi')).catch(() => false));

// 4. Ô số + huy hiệu nav render đúng
ok('thanh điều hướng có cửa sổ', (await page.locator('#nav button').count()) >= 4);
ok('có bảng việc', (await page.locator('#app .row').count()) >= 1);

// 5. Chuyển cửa sổ Theo dõi (server render lại #app)
await page.locator('#nav button', { hasText: 'Theo dõi' }).click();
await page.waitForFunction(() => document.querySelector('#app .h1') && !document.querySelector('#app .h1').textContent.includes('Việc của tôi'), null, { timeout: 8000 }).catch(() => {});
const h1 = await page.locator('#app .h1').first().textContent().catch(() => '');
ok('chuyển sang cửa sổ Theo dõi', (h1 || '').length > 0 && !(h1 || '').includes('Việc của tôi'));

// 6. Quay lại và mở một phiếu việc
await page.locator('#nav button').first().click();
await page.waitForTimeout(600);
await page.locator('#app .row').first().click();
await page.waitForFunction(() => document.getElementById('dw').classList.contains('on'), null, { timeout: 8000 }).catch(() => {});
ok('phiếu việc mở (drawer .on)', await page.evaluate(() => document.getElementById('dw').classList.contains('on')));
ok('phiếu có nội dung', (await page.locator('#dwB').textContent().then((t) => t.length)) > 100);

// 7. ESC đóng phiếu
await page.keyboard.press('Escape');
await page.waitForFunction(() => !document.getElementById('dw').classList.contains('on'), null, { timeout: 8000 }).catch(() => {});
ok('ESC đóng phiếu', await page.evaluate(() => !document.getElementById('dw').classList.contains('on')));

// 8. Chuông thông báo
await page.click('#bell');
ok('chuông mở bảng thông báo', await page.evaluate(() => document.getElementById('nt').classList.contains('on')));

// 9. Mở cửa sổ tạo việc
await page.locator('#app .tmb .btn').first().click().catch(() => {});
await page.waitForTimeout(700);
const taoMo = await page.evaluate(() => (document.getElementById('app').innerHTML || '').includes('Tạo việc') || document.querySelector('.mdl.on, #mdl.on') !== null);
ok('mở được biểu mẫu tạo việc', taoMo);

await page.screenshot({ path: '/tmp/ftms-e2e.png', fullPage: false });
await browser.close();
console.log(`WEB-E2E: ${dat}/${dat + truot}`);
process.exit(truot ? 1 : 0);
