/* =======================================================================
   BẢN CHẠY THỬ — Phần mềm quản lý công việc Forever
   Dữ liệu thật: Phòng Tài chính – Kế toán. Ngày hệ thống giả lập: 04/09/2026.
   Mọi trạng thái nằm trong bộ nhớ trang, tải lại trang là về mốc ban đầu.
   ======================================================================= */

const TODAY = new Date(2026, 8, 4);          // 04/09/2026, thứ Sáu
const NOW   = "04/09 09:15";

/* ---------- người dùng ---------- */
const U = {
  F001:{id:"F001", ten:"Đoàn Việt Dũng",          tat:"VD", cd:"CEO kiêm Trưởng phòng Marketing",     dv:"HDQT", vt:"BGD"},
  F003:{id:"F003", ten:"Ngô Quý Ước",             tat:"QƯ", cd:"Tổng Giám đốc",                       dv:"CTY", vt:"BGD"},
  F002:{id:"F002", ten:"Nguyễn Thị Linh",         tat:"TL", cd:"PTGĐ kiêm Giám đốc Kinh doanh",       dv:"CTY", vt:"BGD"},
  F005:{id:"F005", ten:"Trịnh Thái Ly",           tat:"TL", cd:"PTGĐ kiêm CFO",                       dv:"CTY", vt:"BGD"},
  F004:{id:"F004", ten:"Ngô Minh Trang",          tat:"MT", cd:"Kiểm soát tài chính",                 dv:"CTY", vt:"PP"},
  F006:{id:"F006", ten:"Tống Thị Lan",            tat:"TL", cd:"Trợ lý Giám đốc Kinh doanh",          dv:"CTY", vt:"TT"},
  F007:{id:"F007", ten:"Nguyễn Văn Thành",        tat:"VT", cd:"Trợ lý Tổng Giám đốc",                dv:"CTY", vt:"TT"},
  F008:{id:"F008", ten:"Nguyễn Văn Nhu",          tat:"VN", cd:"Trưởng kho",                          dv:"KHO", vt:"TP"},
  F009:{id:"F009", ten:"Ngô Thành Bắc",           tat:"TB", cd:"Kế toán kho",                         dv:"KHO", vt:"NV"},
  F010:{id:"F010", ten:"Nguyễn Tiến Mão",         tat:"TM", cd:"Tổ trưởng Tổ xe",                     dv:"KHO_XE", vt:"TT"},
  F011:{id:"F011", ten:"Ngô Thị Thơm",            tat:"TT", cd:"Nhân viên tổng hợp",                  dv:"KHO", vt:"NV"},
  F012:{id:"F012", ten:"Ngô Thị Hiền",            tat:"TH", cd:"Thủ kho Bán buôn và Online",          dv:"KHO", vt:"NV"},
  F013:{id:"F013", ten:"Nguyễn Văn Đức",          tat:"VĐ", cd:"Nhân viên kho",                       dv:"KHO", vt:"NV"},
  F014:{id:"F014", ten:"Nguyễn Văn Cương",        tat:"VC", cd:"Nhân viên Tổ xe",                     dv:"KHO_XE", vt:"NV"},
  F015:{id:"F015", ten:"Dương Thị Hồng Toán",     tat:"HT", cd:"Thủ kho Bán buôn và Online",          dv:"KHO", vt:"NV"},
  F016:{id:"F016", ten:"Ngô Thị Thoa",            tat:"TT", cd:"Nhân viên kho",                       dv:"KHO", vt:"NV"},
  F017:{id:"F017", ten:"Nguyễn Thị Hiên",         tat:"TH", cd:"Nhân viên kho",                       dv:"KHO", vt:"NV"},
  F018:{id:"F018", ten:"Đặng Thị Hoa",            tat:"TH", cd:"Trưởng phòng Admin Kinh doanh",       dv:"ADKD", vt:"TP"},
  F019:{id:"F019", ten:"Nguyễn Thị Hường",        tat:"TH", cd:"Admin GT",                            dv:"ADKD_GT", vt:"NV"},
  F020:{id:"F020", ten:"Hồ Thị Thủy",             tat:"TT", cd:"Admin GT",                            dv:"ADKD_GT", vt:"NV"},
  F021:{id:"F021", ten:"Nguyễn Thị Huyền",        tat:"TH", cd:"Admin GT",                            dv:"ADKD_GT", vt:"NV"},
  F022:{id:"F022", ten:"Hoàng Thị Minh Thảo",     tat:"MT", cd:"Tổ trưởng Thương hiệu",               dv:"MKT_BRAND", vt:"TT"},
  F023:{id:"F023", ten:"Lê Thị Thanh Hà",         tat:"TH", cd:"Brand Manager",                       dv:"MKT_BRAND", vt:"NV"},
  F024:{id:"F024", ten:"Lê Thanh Long",           tat:"TL", cd:"Tổ trưởng Hub Digital",               dv:"MKT_HUB", vt:"TT"},
  F025:{id:"F025", ten:"Nguyễn Đình Mạnh",        tat:"ĐM", cd:"Chuyên viên Quay dựng Video",         dv:"MKT_HUB", vt:"NV"},
  F026:{id:"F026", ten:"Nguyễn Quốc Bằng",        tat:"QB", cd:"Tổ trưởng Sự kiện",                   dv:"MKT_SK", vt:"TT"},
  F028:{id:"F028", ten:"Đặng Thị Mỹ Duyên",       tat:"MD", cd:"Chuyên viên Thiết kế và Media",       dv:"MKT_HUB", vt:"NV"},
  F029:{id:"F029", ten:"Trịnh Phương Nhi",        tat:"PN", cd:"Chuyên viên Thiết kế và Media",       dv:"MKT_HUB", vt:"NV"},
  F030:{id:"F030", ten:"Nguyễn Thị Thủy Tiên",    tat:"TT", cd:"Chuyên viên Content Marketing",       dv:"MKT_HUB", vt:"NV"},
  F031:{id:"F031", ten:"Nguyễn Hưng Nguyên",      tat:"HN", cd:"Event Designer",                      dv:"MKT_SK", vt:"NV"},
  F032:{id:"F032", ten:"Nguyễn Thị Minh Ngọc",    tat:"MN", cd:"Event Planner",                       dv:"MKT_SK", vt:"NV"},
  F033:{id:"F033", ten:"Nguyễn Tiến Đạt",         tat:"TĐ", cd:"Chuyên viên Vận hành Sàn TMĐT",       dv:"MKT_HUB", vt:"NV"},
  F034:{id:"F034", ten:"Hoàng Trung Hiếu",        tat:"TH", cd:"Chuyên viên Pháp chế Thương mại",     dv:"PC", vt:"NV"},
  F035:{id:"F035", ten:"Nguyễn Khánh Linh",       tat:"KL", cd:"Chuyên viên Pháp chế Doanh nghiệp",   dv:"PC", vt:"NV"},
  F036:{id:"F036", ten:"Doãn Thị Sáu",            tat:"TS", cd:"Kế toán trưởng",                      dv:"TCKT_KT", vt:"TT"},
  F037:{id:"F037", ten:"Phạm Thị Bích Ngọc",      tat:"BN", cd:"Kế toán thuế",                        dv:"TCKT_KT", vt:"NV"},
  F038:{id:"F038", ten:"Lê Quang Anh",            tat:"QA", cd:"Kế toán công nợ phải trả",            dv:"TCKT_KT", vt:"NV"},
  F039:{id:"F039", ten:"Đỗ Việt Cường",           tat:"VC", cd:"Nhân viên lái xe",                    dv:"TH_HC", vt:"NV"},
  F040:{id:"F040", ten:"Nguyễn Thùy Linh",        tat:"TL", cd:"Chuyên viên Tuyển dụng và Đào tạo",   dv:"TH_NS", vt:"NV"},
  F041:{id:"F041", ten:"Nguyễn Thị Ánh Sáng",     tat:"ÁS", cd:"Admin Online",                        dv:"KDOL", vt:"NV"},
  F042:{id:"F042", ten:"Mai Minh Trang",          tat:"MT", cd:"Admin Online",                        dv:"KDOL", vt:"NV"},
  F043:{id:"F043", ten:"Trần Đức Minh Giang",     tat:"MG", cd:"Chuyên viên Mua hàng quốc tế",        dv:"XNK", vt:"NV"},
  F044:{id:"F044", ten:"Nguyễn Thị Liên",         tat:"TL", cd:"Chuyên viên Mua hàng quốc tế",        dv:"XNK", vt:"NV"},
  F045:{id:"F045", ten:"Nguyễn Thu Hiền",         tat:"TH", cd:"Chuyên viên Mua hàng nội địa",        dv:"XNK", vt:"NV"},
};
/* Định biên theo Cẩm nang tổ chức. Số hiện có suy từ danh sách nhân sự, không gõ tay,
   để hai con số không bao giờ lệch nhau. */
const DINH_BIEN = {MKT:23, ADKD:6, TH:8, TCKT:9, KHO:12, XNK:4, KDOL:3, PC:3};
/* CƠ CẤU TỔ CHỨC THẬT — 18 đơn vị, 44 nhân sự đang làm việc.
   khuyet:true = vị trí trưởng đơn vị còn khuyết, người ghi ở đây duyệt tạm.
   Hai tổ chưa hoạt động (Công nghệ thông tin, Tài chính) chưa nạp.
   F027 đã nghỉ việc theo quyết định 16/8, không còn trong danh sách. */
const DV = {
  HDQT:      {ten:"Hội đồng quản trị",                   cha:null,    truong:"F001"},
  CTY:       {ten:"Công ty",                             cha:"HDQT",  truong:"F003"},
  MKT:       {ten:"Phòng Marketing",                     cha:"CTY",   truong:"F001"},
  ADKD:      {ten:"Phòng Admin Kinh doanh",              cha:"CTY",   truong:"F018"},
  KDOL:      {ten:"Tổ Kinh doanh Online",                cha:"CTY",   truong:"F001", khuyet:true},
  TH:        {ten:"Phòng Tổng hợp",                      cha:"CTY",   truong:"F003", khuyet:true},
  PC:        {ten:"Phòng Pháp chế",                      cha:"CTY",   truong:"F003", khuyet:true},
  KHO:       {ten:"Bộ phận Kho hàng",                    cha:"CTY",   truong:"F008"},
  TCKT:      {ten:"Phòng Tài chính – Kế toán",           cha:"CTY",   truong:"F005"},
  XNK:       {ten:"Tổ Xuất nhập khẩu",                   cha:"CTY",   truong:"F005", khuyet:true},
  MKT_BRAND: {ten:"Tổ Thương hiệu",                      cha:"MKT",   truong:"F022"},
  MKT_HUB:   {ten:"Tổ Hub Digital",                      cha:"MKT",   truong:"F024"},
  MKT_SK:    {ten:"Tổ Sự kiện",                          cha:"MKT",   truong:"F026"},
  ADKD_GT:   {ten:"Tổ GT",                               cha:"ADKD",  truong:"F018"},
  TH_NS:     {ten:"Tổ Nhân sự",                          cha:"TH",    truong:null, khuyet:true},
  TH_HC:     {ten:"Tổ Hành chính",                       cha:"TH",    truong:null, khuyet:true},
  KHO_XE:    {ten:"Tổ xe",                               cha:"KHO",   truong:"F010"},
  TCKT_KT:   {ten:"Tổ Kế toán",                          cha:"TCKT",  truong:"F036"},
};
const ORDER = ["F001","F003","F005","F018","F008","F022","F036","F037","F043","F034"];
/* CHỐT 16/8: ba bậc duyệt theo giá trị, và CHỈ áp cho khoản CHI RA.
   Khoản thu, hợp đồng bán, hàng luân chuyển không kích hoạt tầng duyệt thêm. */
const BAC_DUYET = [
  {tu:   50000000, ai:"F005", ten:"CFO"},
  {tu:  500000000, ai:"F003", ten:"Tổng Giám đốc"},
  {tu: 2000000000, ai:"F001", ten:"Chủ tịch HĐQT"},
];
const NGUONG_DUYET_THEM = BAC_DUYET[0].tu;
function tienTxt(v){ return (v||0).toLocaleString("vi-VN") + " đ"; }
/* Chuỗi người duyệt thêm, xếp từ thấp lên cao, bỏ ai đã có trong tuyến. */
function chuoiDuyetThem(t){
  if ((t.tienLoai || "CHI") !== "CHI" || !(t.tien > 0) || !t.lam) return [];
  const v = t.tien || 0, d1 = nguoiDuyet(t), out = [];
  BAC_DUYET.forEach(b => {
    if (v > b.tu && b.ai !== d1 && b.ai !== t.lam && !out.includes(b.ai)) out.push(b.ai);
  });
  return out;
}
function bacDat(t){
  if ((t.tienLoai || "CHI") !== "CHI") return [];
  return BAC_DUYET.filter(b => (t.tien||0) > b.tu);
}
let me = "F037";                              // mở lên là vai nhân viên

/* ---------- công việc ---------- */
/* tt: MOI | DANG_LAM | CHO_DUYET | HOAN_THANH | TRA_LAI                    */
/* SEQ phải SUY TỪ DỮ LIỆU, không gõ cứng. Gõ 100 đúng khi mã lớn nhất là CV-094;
   mở dữ liệu lên toàn công ty thì mã lớn nhất thành CV-125, và việc thứ 10 tạo mới
   sẽ mang mã CV-110 trùng với việc kiểm kê kho — bấm vào dòng này mở ra phiếu khác.
   Đặt sau khai báo T ở phía dưới, xem doiSEQ(). */
let SEQ = 100;
let T = [
 { id:"CV-130", ttl:"MỐC: Chốt danh sách nhãn và ngân sách quý 4", tt:"DANG_LAM", cha:"CV-118", ah:5, kc:4, truoc:[],
   loai:"DU_AN", giao:"F001", lam:"F022", bd:"25/08/2026", han:"10/09/2026", dk:3, han_goc:"10/09/2026", doi:0,
   moc:true, phoihop:[], sp:"Danh sách nhãn và ngân sách đã duyệt",
   tc:[{t:"Chốt đủ 6 nhãn chủ lực",d:true},{t:"Ngân sách trong hạn mức",d:false}],
   files:[], log:[{w:U["F001"].ten, k:"giao việc này", t:"25/08 09:00", s:1}]},
 { id:"CV-131", ttl:"Xây thông điệp và bộ nhận diện cho từng nhãn", tt:"MOI", cha:"CV-118", ah:4, kc:3, truoc:["CV-130"],
   loai:"DU_AN", giao:"F022", lam:"F023", bd:"11/09/2026", han:"30/09/2026", dk:5, han_goc:"30/09/2026", doi:0,
   phoihop:[], sp:"Bộ thông điệp và nhận diện đã duyệt",
   tc:[{t:"Mỗi nhãn một thông điệp chính",d:false},{t:"Brand Manager duyệt",d:false}],
   files:[], log:[{w:U["F022"].ten, k:"giao việc này", t:"11/09 09:00", s:1}]},
 { id:"CV-132", ttl:"Lập kế hoạch truyền thông và phân bổ ngân sách kênh", tt:"MOI", cha:"CV-118", ah:4, kc:4, truoc:["CV-130"],
   loai:"DU_AN", giao:"F022", lam:"F024", bd:"11/09/2026", han:"25/09/2026", dk:5, han_goc:"25/09/2026", doi:0,
   phoihop:[], sp:"Kế hoạch kênh và ngân sách đã duyệt",
   tc:[{t:"Phủ đủ ba kênh chính",d:false},{t:"Chi phí trên đơn nằm trong ngưỡng",d:false}],
   files:[], log:[{w:U["F022"].ten, k:"giao việc này", t:"11/09 09:00", s:1}]},
 { id:"CV-133", ttl:"MỐC: Trình Ban Giám đốc duyệt kế hoạch quý 4", tt:"MOI", cha:"CV-118", ah:5, kc:4, truoc:["CV-131","CV-132"],
   loai:"DU_AN", giao:"F001", lam:"F022", bd:"01/10/2026", han:"08/10/2026", dk:2, han_goc:"08/10/2026", doi:0,
   moc:true, phoihop:[], sp:"Biên bản duyệt kế hoạch quý 4",
   tc:[{t:"Ban Giám đốc thông qua",d:false}],
   files:[], log:[{w:U["F001"].ten, k:"giao việc này", t:"01/10 09:00", s:1}]},
 { id:"CV-140", ttl:"Chốt địa điểm và ký hợp đồng nhà thầu sự kiện", tt:"DANG_LAM", cha:"CV-121", ah:5, kc:4, truoc:[],
   loai:"DU_AN", giao:"F001", lam:"F026", bd:"01/09/2026", han:"20/09/2026", dk:5, han_goc:"20/09/2026", doi:0,
   tien:280000000, tienLoai:"CHI", phoihop:[], sp:"Hợp đồng địa điểm và nhà thầu đã ký",
   tc:[{t:"So sánh tối thiểu 3 địa điểm",d:true},{t:"Hợp đồng có điều khoản phạt",d:false}],
   files:[], log:[{w:U["F001"].ten, k:"giao việc này", t:"01/09 09:00", s:1}]},
 { id:"CV-141", ttl:"Thiết kế và sản xuất vật phẩm sự kiện", tt:"MOI", cha:"CV-121", ah:4, kc:4, truoc:["CV-140"],
   loai:"DU_AN", giao:"F026", lam:"F031", bd:"21/09/2026", han:"10/10/2026", dk:5, han_goc:"10/10/2026", doi:0,
   phoihop:[], sp:"Vật phẩm đã nghiệm thu tại kho",
   tc:[{t:"Duyệt maquette",d:false},{t:"Nghiệm thu số lượng và chất lượng",d:false}],
   files:[], log:[{w:U["F026"].ten, k:"giao việc này", t:"21/09 09:00", s:1}]},
 { id:"CV-142", ttl:"Mời và xác nhận khách tham dự", tt:"MOI", cha:"CV-121", ah:4, kc:3, truoc:[],
   loai:"DU_AN", giao:"F026", lam:"F032", bd:"15/09/2026", han:"15/10/2026", dk:3, han_goc:"15/10/2026", doi:0,
   phoihop:[], sp:"Danh sách khách đã xác nhận",
   tc:[{t:"Gửi thư mời đủ danh sách",d:false},{t:"Xác nhận tối thiểu 80%",d:false}],
   files:[], log:[{w:U["F026"].ten, k:"giao việc này", t:"15/09 09:00", s:1}]},
 { id:"CV-143", ttl:"MỐC: Tổ chức sự kiện ngày 20/10 và nghiệm thu", tt:"MOI", cha:"CV-121", ah:5, kc:5, truoc:["CV-141","CV-142"],
   loai:"DU_AN", giao:"F001", lam:"F026", bd:"19/10/2026", han:"20/10/2026", dk:5, han_goc:"20/10/2026", doi:0,
   moc:true, phoihop:[], sp:"Biên bản nghiệm thu sự kiện",
   tc:[{t:"Sự kiện diễn ra đúng kịch bản",d:false},{t:"Chi phí không vượt ngân sách",d:false}],
   files:[], log:[{w:U["F001"].ten, k:"giao việc này", t:"19/10 09:00", s:1}]},
 { id:"CV-110", ttl:"Kiểm kê tồn kho định kỳ tháng 8 tại kho Bắc Ninh", tt:"DANG_LAM", cha:null, ah:4, kc:4,
   loai:"CONG_VIEC", giao:"F008", lam:"F012", bd:"28/08/2026", han:"06/09/2026", dk:5, han_goc:"06/09/2026", doi:0,
   bc:true, sk:"RR", mat:"NOI_BO", phoihop:[], sp:"Biên bản kiểm kê có đủ chữ ký thủ kho và kế toán",
   tc:[{t:"Đếm đủ 100% mã hàng",d:true},{t:"Lệch quá 0,5% phải có giải trình",d:false},{t:"Kế toán kho đối chiếu xong",d:false}],
   files:[], log:[{w:U["F008"].ten, k:"giao việc này", t:"28/08 08:30", s:1}]},
 { id:"CV-111", ttl:"Rà soát hàng cận date và xử lý theo FIFO tuần 35", tt:"DANG_LAM", cha:null, ah:4, kc:5,
   loai:"CHU_KY", giao:"F008", lam:"F015", bd:"31/08/2026", han:"05/09/2026", dk:3, han_goc:"05/09/2026", doi:0,
   lap:"TUAN", soKy:22, kyDung:20, sk:"BT", phoihop:[], sp:"Danh sách hàng cận date kèm phương án xử lý",
   tc:[{t:"Lọc đủ hàng còn dưới 90 ngày",d:true},{t:"Có phương án cho từng lô",d:false}],
   files:[], log:[{w:U["F008"].ten, k:"giao việc này", t:"31/08 08:30", s:1}]},
 { id:"CV-112", ttl:"Lập lịch xe giao hàng tuần 36 và theo dõi an toàn", tt:"DANG_LAM", cha:null, ah:3, kc:4,
   loai:"CHU_KY", giao:"F008", lam:"F010", bd:"01/09/2026", han:"07/09/2026", dk:3, han_goc:"07/09/2026", doi:0,
   lap:"TUAN", soKy:30, kyDung:29, phoihop:[], sp:"Lịch xe tuần và báo cáo sự cố giao thông",
   tc:[{t:"Phủ hết đơn đã chốt",d:true},{t:"Không phát sinh sự cố",d:true}],
   files:[], log:[{w:U["F008"].ten, k:"giao việc này", t:"01/09 08:30", s:1}]},
 { id:"CV-113", ttl:"Chăm sóc và tái ký hợp đồng nhóm đại lý hết hạn quý 3", tt:"DANG_LAM", cha:null, ah:4, kc:3,
   loai:"CONG_VIEC", giao:"F018", lam:"F019", bd:"20/08/2026", han:"30/09/2026", dk:5, han_goc:"30/09/2026", doi:0,
   tien:0, sk:"BT", phoihop:[], sp:"Danh sách đại lý đã tái ký và biên bản làm việc",
   tc:[{t:"Liên hệ đủ 100% đại lý hết hạn",d:true},{t:"Tỷ lệ tái ký từ 80%",d:false},{t:"Hợp đồng đã ký về đủ",d:false}],
   files:[], log:[{w:U["F018"].ten, k:"giao việc này", t:"20/08 08:30", s:1}]},
 { id:"CV-114", ttl:"Cập nhật hồ sơ khách hàng và phân nhóm quý 3", tt:"MOI", cha:null, ah:3, kc:3,
   loai:"CONG_VIEC", giao:"F002", lam:"F018", bd:"01/09/2026", han:"25/09/2026", dk:5, han_goc:"25/09/2026", doi:0,
   phoihop:[], sp:"Bảng phân nhóm khách hàng đã cập nhật",
   tc:[{t:"Làm sạch dữ liệu trùng",d:false},{t:"Phân đủ ba nhóm",d:false}],
   files:[], log:[{w:U["F002"].ten, k:"giao việc này", t:"01/09 08:30", s:1}]},
 { id:"CV-115", ttl:"Xử lý đơn hàng và báo giá kênh GT tuần 36", tt:"DANG_LAM", cha:null, ah:3, kc:5,
   loai:"CHU_KY", giao:"F018", lam:"F020", bd:"31/08/2026", han:"06/09/2026", dk:2, han_goc:"06/09/2026", doi:0,
   lap:"TUAN", soKy:34, kyDung:31, phoihop:[], sp:"Bảng tổng hợp đơn và báo giá đã gửi",
   tc:[{t:"Trả báo giá trong 4 giờ",d:true},{t:"Không sai giá",d:true}],
   files:[], log:[{w:U["F018"].ten, k:"giao việc này", t:"31/08 08:30", s:1}]},
 { id:"CV-116", ttl:"Vận hành đơn hàng phiên livestream tối thứ Năm 03/9", tt:"CHO_DUYET", cha:null, ah:4, kc:5,
   loai:"DOT_XUAT", giao:"F001", lam:"F041", bd:"03/09/2026", han:"05/09/2026", dk:3, han_goc:"05/09/2026", doi:0,
   nguon:"Khách hàng", phatSinh:"03/09/2026", nhanSau:1, phoihop:[], sp:"Báo cáo đơn hàng phiên live và tỷ lệ chốt",
   tc:[{t:"Chốt đơn trong phiên",d:true},{t:"Đẩy đơn sang kho trong 12 giờ",d:true}],
   files:[], log:[{w:U["F001"].ten, k:"giao việc này", t:"03/09 08:30", s:1}]},
 { id:"CV-117", ttl:"Báo cáo hiệu quả kênh Online và Livestream tháng 8", tt:"DANG_LAM", cha:null, ah:3, kc:3,
   loai:"CHU_KY", giao:"F001", lam:"F042", bd:"01/09/2026", han:"10/09/2026", dk:3, han_goc:"10/09/2026", doi:0,
   lap:"THANG", soKy:14, kyDung:12, phoihop:[], sp:"Báo cáo hiệu quả kênh tháng 8",
   tc:[{t:"Đủ số liệu ba sàn",d:true},{t:"So sánh với tháng 7",d:false}],
   files:[], log:[{w:U["F001"].ten, k:"giao việc này", t:"01/09 08:30", s:1}]},
 { id:"CV-118", ttl:"Lập kế hoạch nhãn và chiến dịch quý 4", tt:"DANG_LAM", cha:null, ah:5, kc:3,
   loai:"DU_AN", giao:"F001", lam:"F022", bd:"25/08/2026", han:"20/09/2026", dk:8, han_goc:"20/09/2026", doi:0,
   tien:450000000, tienLoai:"CHI", mat:"HAN_CHE", phoihop:[], sp:"Kế hoạch nhãn quý 4 đã được duyệt",
      dieule:{muctieu:"Kế hoạch nhãn quý 4 được Ban Giám đốc duyệt trước 08/10, có mục tiêu đo được cho từng nhãn",
     phamvi:"Sáu nhãn chủ lực, ba kênh truyền thông chính",
     ngoaipham:"Không bao gồm nhãn mới ra mắt sau quý 4, không bao gồm kênh xuất khẩu",
     nganSach:450000000, batdau:"25/08/2026", ketthuc:"08/10/2026"},
   tc:[{t:"Có mục tiêu đo được cho từng nhãn",d:true},{t:"Ngân sách nằm trong hạn mức",d:false},{t:"Ban Giám đốc thông qua",d:false}],
   files:[], log:[{w:U["F001"].ten, k:"giao việc này", t:"25/08 08:30", s:1}]},
 { id:"CV-119", ttl:"Triển khai chiến dịch quảng cáo số tháng 9", tt:"DANG_LAM", cha:null, ah:4, kc:4,
   loai:"CHU_KY", giao:"F001", lam:"F024", bd:"01/09/2026", han:"30/09/2026", dk:5, han_goc:"30/09/2026", doi:0,
   lap:"THANG", soKy:16, kyDung:13, tien:120000000, tienLoai:"CHI", phoihop:[], sp:"Báo cáo hiệu quả chiến dịch tháng 9",
   tc:[{t:"Chi phí trên đơn nằm trong ngưỡng",d:false},{t:"Đủ số liệu ba kênh",d:false}],
   files:[], log:[{w:U["F001"].ten, k:"giao việc này", t:"01/09 08:30", s:1}]},
 { id:"CV-120", ttl:"Sản xuất bộ ảnh và POSM cho SKU mới ra mắt tháng 10", tt:"DANG_LAM", cha:null, ah:4, kc:4,
   loai:"CONG_VIEC", giao:"F024", lam:"F028", bd:"24/08/2026", han:"18/09/2026", dk:5, han_goc:"18/09/2026", doi:0,
   sk:"RR", phoihop:[], sp:"Bộ ảnh và file in POSM đã duyệt",
   tc:[{t:"Đủ 12 ảnh theo brief",d:true},{t:"Brand Manager duyệt",d:false},{t:"File in đúng chuẩn nhà in",d:false}],
   files:[], log:[{w:U["F024"].ten, k:"giao việc này", t:"24/08 08:30", s:1}]},
 { id:"CV-121", ttl:"Tổ chức sự kiện ra mắt sản phẩm ngày 20/10 tại Hà Nội", tt:"DANG_LAM", cha:null, ah:5, kc:3,
   loai:"DU_AN", giao:"F001", lam:"F026", bd:"01/09/2026", han:"20/10/2026", dk:8, han_goc:"20/10/2026", doi:0,
   tien:680000000, tienLoai:"CHI", phoihop:[], sp:"Sự kiện đã tổ chức và báo cáo tổng kết",
      dieule:{muctieu:"Sự kiện ra mắt ngày 20/10 diễn ra đúng kịch bản, chi phí không vượt ngân sách",
     phamvi:"Sự kiện tại Hà Nội, khách mời đại lý và báo chí",
     ngoaipham:"Không bao gồm sự kiện vệ tinh tại các tỉnh, không bao gồm quảng cáo sau sự kiện",
     nganSach:680000000, batdau:"01/09/2026", ketthuc:"20/10/2026"},
   tc:[{t:"Chốt địa điểm và nhà thầu",d:true},{t:"Đủ khách mời theo danh sách",d:false},{t:"Chi phí không vượt ngân sách",d:false}],
   files:[], log:[{w:U["F001"].ten, k:"giao việc này", t:"01/09 08:30", s:1}]},
 { id:"CV-122", ttl:"Rà soát và đàm phán hợp đồng nhà cung cấp nguyên liệu mới", tt:"DANG_LAM", cha:null, ah:5, kc:4,
   loai:"CONG_VIEC", giao:"F003", lam:"F034", bd:"20/08/2026", han:"15/09/2026", dk:5, han_goc:"15/09/2026", doi:0,
   mat:"HAN_CHE", sk:"RR", phoihop:[], sp:"Hợp đồng đã rà soát kèm ý kiến pháp lý",
   tc:[{t:"Nêu đủ rủi ro pháp lý",d:true},{t:"Chốt điều khoản phạt vi phạm",d:false},{t:"Hai bên ký",d:false}],
   files:[], log:[{w:U["F003"].ten, k:"giao việc này", t:"20/08 08:30", s:1}]},
 { id:"CV-123", ttl:"Rà soát tuân thủ hợp đồng lao động và nội quy lao động", tt:"MOI", cha:null, ah:4, kc:3,
   loai:"CONG_VIEC", giao:"F003", lam:"F035", bd:"01/09/2026", han:"30/09/2026", dk:5, han_goc:"30/09/2026", doi:0,
   mat:"HAN_CHE", phoihop:[], sp:"Báo cáo rà soát tuân thủ và kiến nghị sửa",
   tc:[{t:"Đối chiếu đủ Bộ luật Lao động hiện hành",d:false},{t:"Liệt kê điểm chưa tuân thủ",d:false}],
   files:[], log:[{w:U["F003"].ten, k:"giao việc này", t:"01/09 08:30", s:1}]},
 { id:"CV-124", ttl:"Tuyển 3 nhân viên kho cho mùa cao điểm quý 4", tt:"DANG_LAM", cha:null, ah:4, kc:4,
   loai:"CONG_VIEC", giao:"F003", lam:"F040", bd:"25/08/2026", han:"30/09/2026", dk:5, han_goc:"30/09/2026", doi:0,
   phoihop:[], sp:"Ba nhân viên đã nhận việc",
   tc:[{t:"Đăng tin và sàng lọc hồ sơ",d:true},{t:"Phỏng vấn đủ vòng",d:false},{t:"Ký hợp đồng thử việc",d:false}],
   files:[], log:[{w:U["F003"].ten, k:"giao việc này", t:"25/08 08:30", s:1}]},
 { id:"CV-125", ttl:"Giải trình công văn quản lý thị trường về nhãn mác lô hàng", tt:"DANG_LAM", cha:null, ah:5, kc:5,
   loai:"DOT_XUAT", giao:"F003", lam:"F034", bd:"02/09/2026", han:"09/09/2026", dk:5, han_goc:"09/09/2026", doi:0,
   nguon:"Cơ quan nhà nước", phatSinh:"02/09/2026", nhanSau:3, luat:true, mat:"HAN_CHE", sk:"TRE", phoihop:[], sp:"Văn bản giải trình đã gửi cơ quan",
   tc:[{t:"Thu thập đủ hồ sơ lô hàng",d:true},{t:"Luật sư ngoài soát lại",d:false},{t:"Gửi trong hạn công văn",d:false}],
   files:[], log:[{w:U["F003"].ten, k:"giao việc này", t:"02/09 08:30", s:1}]},
 { id:"CV-090", ttl:"Kiểm toán độc lập báo cáo tài chính năm 2026", tt:"DANG_LAM", cha:null, ah:5, kc:3,
   loai:"DU_AN", mat:"NOI_BO", han_goc:"31/03/2027", doi:0, phoihop:["F004"], tien:180000000, tienLoai:"CHI", sk:"BT", bc:true,
   giao:"F001", lam:"F005", bd:"01/10/2026", han:"31/03/2027", dk:8, luat:false,
   sp:"Báo cáo kiểm toán năm 2026 đã phát hành và trình HĐQT",
   mucdich:"Nghị quyết HĐQT: báo cáo kiểm toán ý kiến chấp nhận toàn phần, không có ngoại trừ",
   dieule:{muctieu:"Có báo cáo kiểm toán ý kiến chấp nhận toàn phần trước 31/3/2027, không phát sinh điều chỉnh trọng yếu",
     phamvi:"Toàn bộ báo cáo tài chính riêng năm 2026 của công ty mẹ",
     ngoaipham:"Không bao gồm soát xét thuế, không bao gồm công ty liên kết",
     nganSach:180000000, batdau:"01/10/2026", ketthuc:"31/03/2027"},
   tc:[{t:"Chọn được công ty kiểm toán trước 31/10",d:true},
       {t:"Cung cấp đủ hồ sơ theo danh mục yêu cầu",d:false},
       {t:"Không có điều chỉnh trọng yếu",d:false},
       {t:"HĐQT thông qua báo cáo",d:false}],
   files:[], log:[{w:"Đoàn Việt Dũng",k:"giao việc này",t:"20/08 09:00",s:1}]},

 { id:"CV-091", ttl:"MỐC: Ký hợp đồng với công ty kiểm toán", tt:"HOAN_THANH", cha:"CV-090", ah:5, kc:4, moc:true,
   loai:"DU_AN", mat:"NOI_BO", han_goc:"31/10/2026", doi:0, phoihop:[], tien:0, sk:"BT", bc:true,
   giao:"F005", lam:"F005", bd:"01/10/2026", han:"31/10/2026", dk:2, luat:false,
   sp:"Hợp đồng kiểm toán đã ký",
   mucdich:"Kế thừa từ việc cha: báo cáo kiểm toán ý kiến chấp nhận toàn phần",
   tc:[{t:"So sánh ít nhất 3 báo giá",d:true},{t:"HĐQT phê duyệt đơn vị kiểm toán",d:true}],
   diem:{cl:5,cd:4,ht:4,dh:5,tong:4.75,boi:"01/11 09:00",ai:"Đoàn Việt Dũng",nx:"Chốt sớm 5 ngày, tiết kiệm 12% so báo giá cao nhất."},
   files:[], log:[{w:"Trịnh Thái Ly",k:"giao việc này",t:"01/10 08:00",s:1}]},

 { id:"CV-092", ttl:"Chuẩn bị bộ hồ sơ kiểm toán theo danh mục yêu cầu", tt:"DANG_LAM", cha:"CV-090", ah:4, kc:3,
   loai:"DU_AN", mat:"NOI_BO", han_goc:"20/01/2027", doi:0, phoihop:[], tien:0, sk:"RR", bc:true,
   giao:"F005", lam:"F036", bd:"01/12/2026", han:"20/01/2027", dk:5, luat:false, truoc:["CV-091"],
   sp:"Bộ hồ sơ đầy đủ theo danh mục kiểm toán viên gửi",
   mucdich:"Kế thừa từ việc cha: báo cáo kiểm toán ý kiến chấp nhận toàn phần",
   tc:[{t:"Đủ 100% mục trong danh mục",d:true},{t:"Không có mục nào thiếu chứng từ gốc",d:false}],
   files:[], log:[{w:"Trịnh Thái Ly",k:"giao việc này",t:"20/11 09:00",s:1}]},

 { id:"CV-093", ttl:"Xử lý các điểm kiểm toán viên nêu và điều chỉnh sổ", tt:"MOI", cha:"CV-090", ah:5, kc:3,
   loai:"DU_AN", mat:"NOI_BO", han_goc:"10/03/2027", doi:0, phoihop:["F037"], tien:0, sk:"BT", bc:true,
   giao:"F005", lam:"F036", bd:"01/02/2027", han:"10/03/2027", dk:5, luat:false, truoc:["CV-092"],
   sp:"Bảng theo dõi điểm kiểm toán và bút toán điều chỉnh đã hạch toán",
   mucdich:"Kế thừa từ việc cha: báo cáo kiểm toán ý kiến chấp nhận toàn phần",
   tc:[{t:"Mọi điểm đều có phản hồi",d:false},{t:"Bút toán điều chỉnh được CFO duyệt",d:false}],
   files:[], log:[{w:"Trịnh Thái Ly",k:"giao việc này",t:"20/11 09:05",s:1}]},

 { id:"CV-094", ttl:"MỐC: Phát hành báo cáo kiểm toán và trình HĐQT", tt:"MOI", cha:"CV-090", ah:5, kc:3, moc:true,
   loai:"DU_AN", mat:"NOI_BO", han_goc:"31/03/2027", doi:0, phoihop:[], tien:0, sk:"BT", bc:true,
   giao:"F005", lam:"F005", bd:"11/03/2027", han:"31/03/2027", dk:3, luat:false, truoc:["CV-093"],
   sp:"Báo cáo kiểm toán bản chính thức và biên bản HĐQT thông qua",
   mucdich:"Kế thừa từ việc cha: báo cáo kiểm toán ý kiến chấp nhận toàn phần",
   tc:[{t:"Ý kiến chấp nhận toàn phần",d:false},{t:"HĐQT thông qua",d:false}],
   files:[], log:[{w:"Trịnh Thái Ly",k:"giao việc này",t:"20/11 09:10",s:1}]},

 { id:"CV-060", ttl:"Chuẩn bị hồ sơ quyết toán thuế năm 2026", tt:"DANG_LAM", cha:null, ah:5, kc:2,
   giao:"F001", lam:"F005", bd:"01/09/2026", han:"30/11/2026", dk:8, luat:false,
   loai:"DU_AN", mat:"NOI_BO", han_goc:"30/11/2026", doi:0, phoihop:["F004"], tien:0, sk:"BT", bc:true,
   sp:"Bộ hồ sơ quyết toán thuế năm 2026 trình HĐQT",
   mucdich:"Nghị quyết HĐQT: quyết toán thuế năm 2026 không phát sinh truy thu và phạt",
   dieule:{muctieu:"Quyết toán thuế năm 2026 không phát sinh truy thu và tiền phạt",
     phamvi:"Thuế thu nhập doanh nghiệp, thuế GTGT và thuế nhà thầu năm 2026",
     ngoaipham:"Không bao gồm thuế thu nhập cá nhân, không bao gồm các năm trước",
     nganSach:0, batdau:"01/09/2026", ketthuc:"30/11/2026"},
   tc:[{t:"Hồ sơ đầy đủ theo danh mục cơ quan thuế yêu cầu",d:false},
       {t:"Không còn chênh lệch chưa giải trình",d:false},
       {t:"HĐQT thông qua trước 30/11",d:false}],
   files:[], log:[{w:"Đoàn Việt Dũng",k:"giao việc này",t:"01/09 08:00",s:1}]},

 { id:"CV-061", ttl:"Hoàn tất sổ sách và đối chiếu số liệu kế toán năm 2026", tt:"DANG_LAM", cha:"CV-060", ah:4, kc:2,
   giao:"F005", lam:"F036", bd:"01/09/2026", han:"31/10/2026", dk:5, luat:false,
   loai:"DU_AN", mat:"NOI_BO", han_goc:"31/10/2026", doi:0, phoihop:[], tien:0, sk:"BT", bc:true,
   sp:"Sổ sách kế toán năm 2026 đã khoá và đối chiếu xong",
   mucdich:"Kế thừa từ việc cha: quyết toán thuế 2026 không phát sinh truy thu",
   tc:[{t:"Khoá sổ đủ 12 kỳ",d:true},
       {t:"Đối chiếu công nợ và tồn kho khớp cả năm",d:false},
       {t:"Chênh lệch có bảng giải trình",d:false}],
   files:[], log:[{w:"Trịnh Thái Ly",k:"giao việc này",t:"01/09 09:30",s:1}]},

 { id:"CV-062", ttl:"Rà soát hoá đơn đầu vào cả năm 2026", tt:"DANG_LAM", cha:"CV-061", ah:3, kc:3,
   giao:"F036", lam:"F037", bd:"01/09/2026", han:"15/10/2026", dk:3, luat:false,
   loai:"DU_AN", mat:"NOI_BO", han_goc:"15/10/2026", doi:0, phoihop:[], tien:0, sk:"BT", bc:true,
   sp:"Bảng rà soát hoá đơn đầu vào cả năm, tách riêng hoá đơn không hợp lệ",
   mucdich:"Kế thừa từ việc cha: sổ sách 2026 khoá và đối chiếu xong",
   tc:[{t:"Đủ 12 tháng",d:true},
       {t:"Đối chiếu khớp cổng hoá đơn điện tử",d:true},
       {t:"Hoá đơn không hợp lệ tách riêng và ghi lý do",d:false},
       {t:"Kế toán trưởng xác nhận",d:false}],
   buoc:[{t:"Tải dữ liệu hoá đơn từ cổng thuế theo từng quý",d:true},
         {t:"Đối chiếu với sổ chi tiết từng tháng",d:true},
         {t:"Lọc hoá đơn của nhà cung cấp đã ngừng hoạt động",d:false},
         {t:"Lập danh sách hoá đơn cần xin lại bản gốc",d:false}],
   files:[], log:[{w:"Doãn Thị Sáu",k:"giao việc này",t:"01/09 10:05",s:1}]},

 { id:"CV-063", ttl:"Đối chiếu công nợ phải trả cả năm 2026", tt:"MOI", cha:"CV-061", ah:3, kc:2, truoc:["CV-062"],
   giao:"F036", lam:"F038", bd:"01/09/2026", han:"20/10/2026", dk:2, luat:false,
   loai:"DU_AN", mat:"NOI_BO", han_goc:"20/10/2026", doi:0, phoihop:[], tien:0, sk:"RR", bc:true,
   sp:"Bảng đối chiếu công nợ phải trả cả năm đã ký xác nhận",
   mucdich:"Kế thừa từ việc cha: sổ sách 2026 khoá và đối chiếu xong",
   tc:[{t:"Đủ nhà cung cấp có phát sinh trong năm",d:false},
       {t:"Lệch quá 1% có xác nhận của Kế toán trưởng",d:false}],
   files:[], log:[{w:"Doãn Thị Sáu",k:"giao việc này",t:"01/09 10:12",s:1}]},

 { id:"CV-065", ttl:"Tập hợp hồ sơ pháp lý kèm hồ sơ quyết toán", tt:"DANG_LAM", cha:"CV-060", ah:3, kc:2,
   loai:"DU_AN", mat:"NOI_BO", han_goc:"30/09/2026", doi:0, phoihop:[], tien:0, sk:"BT", bc:true,
   giao:"F005", lam:"F004", bd:"01/09/2026", han:"30/09/2026", dk:2, luat:false,
   sp:"Bộ hồ sơ pháp lý: giấy phép, hợp đồng lớn, biên bản họp HĐQT",
   mucdich:"Kế thừa từ việc cha: quyết toán thuế 2026 không phát sinh truy thu",
   tc:[{t:"Đủ danh mục hồ sơ cơ quan thuế yêu cầu",d:true},
       {t:"Bản sao y có công chứng còn hiệu lực",d:false}],
   files:[], log:[{w:"Trịnh Thái Ly",k:"giao việc này",t:"01/09 09:40",s:1}]},

 { id:"CV-064", ttl:"Lập bản giải trình chênh lệch thuế năm 2026", tt:"MOI", cha:"CV-060", ah:4, kc:2, truoc:["CV-061"],
   giao:"F005", lam:"F036", bd:"15/10/2026", han:"20/11/2026", dk:3, luat:false,
   loai:"DU_AN", mat:"NOI_BO", han_goc:"20/11/2026", doi:0, phoihop:["F004"], tien:0, sk:"BT", bc:true,
   sp:"Bản giải trình chênh lệch giữa sổ kế toán và tờ khai thuế",
   mucdich:"Kế thừa từ việc cha: quyết toán thuế 2026 không phát sinh truy thu",
   tc:[{t:"Giải trình đủ các khoản chênh lệch",d:false},
       {t:"Có căn cứ văn bản cho từng khoản",d:false}],
   files:[], log:[{w:"Trịnh Thái Ly",k:"giao việc này",t:"01/09 09:35",s:1}]},

 { id:"CV-041", ttl:"Đối chiếu số dư ngân hàng tuần 35", tt:"DANG_LAM", cha:null, ah:4, kc:5,
   loai:"CHU_KY", lap:"TUAN", soKy:31, kyDung:29, mat:"NOI_BO", han_goc:"02/09/2026", doi:0, phoihop:[], tien:0, sk:"TRE", bc:true,
   giao:"F036", lam:"F038", bd:"31/08/2026", han:"02/09/2026", dk:2, luat:false,
   sp:"Bảng đối chiếu số dư 4 tài khoản ngân hàng, đã in và ký",
   mucdich:"KPI phòng: số dư sổ khớp sao kê 100%, không để lệch qua tuần",
   tc:[{t:"Đủ 4 tài khoản ngân hàng",d:true},
       {t:"Số dư khớp sao kê từng tài khoản",d:false},
       {t:"Khoản lệch có giải trình bằng chứng từ",d:false}],
   log:[{w:"Doãn Thị Sáu",k:"giao việc này",t:"31/08 08:20",s:1},
        {w:"Lê Quang Anh",k:"nhận việc",t:"31/08 08:47",s:1},
        {w:"Lê Quang Anh",k:"",t:"02/09 16:40",s:0,
         x:"Chị ơi tài khoản Vietcombank có 3 giao dịch ngày 29/8 chưa về sao kê, em đã gửi mail cho ngân hàng nhưng chưa có phản hồi. Em xin lùi 2 ngày ạ."},
        {w:"Doãn Thị Sáu",k:"",t:"03/09 08:05",s:0,
         x:"Em cứ đối chiếu 3 tài khoản còn lại trước và nộp phần đó. Riêng Vietcombank ghi rõ là đang chờ ngân hàng, chị sẽ gọi hôm nay."}],
   files:[{id:"h1",ten:"Sao ke VCB tuan 35.pdf",kb:340,boi:"Lê Quang Anh",luc:"01/09 09:12",gd:"LAM",ver:1,ct:false}],
   dexuat:[{loai:"THEM", nd:"Giao dịch chưa về sao kê được liệt kê riêng kèm ngày dự kiến", boi:"Lê Quang Anh", luc:"03/09 09:30"}]},

 { id:"CV-046", ttl:"Lập bảng kê hoá đơn đầu vào tháng 8/2026", tt:"DANG_LAM", cha:null, ah:4, kc:5,
   loai:"CHU_KY", lap:"THANG", soKy:14, kyDung:13, mat:"NOI_BO", han_goc:"04/09/2026", doi:0, phoihop:[], tien:0, sk:"BT", bc:false,
   giao:"F036", lam:"F037", bd:"01/09/2026", han:"04/09/2026", dk:2, luat:false,
   sp:"Bảng kê hoá đơn đầu vào tháng 8 đã đối chiếu với hoá đơn điện tử",
   mucdich:"Chuẩn bị dữ liệu cho tờ khai thuế GTGT kỳ tháng 8",
   tc:[{t:"Đủ hoá đơn của tất cả nhà cung cấp có phát sinh",d:true},
       {t:"Đối chiếu khớp cổng hoá đơn điện tử",d:true},
       {t:"Hoá đơn không hợp lệ được tách riêng và ghi lý do",d:false}],
   files:[{id:"f1",ten:"Danh muc NCC thang 8.xlsx",kb:184,boi:"Doãn Thị Sáu",luc:"01/09 07:55",gd:"GIAO",ver:1,ct:false},
          {id:"f2",ten:"Bang ke HDDV thang 8 - ban nhap.xlsx",kb:512,boi:"Phạm Thị Bích Ngọc",luc:"03/09 15:20",gd:"LAM",ver:1,ct:false},
          {id:"f3",ten:"Bang ke HDDV thang 8 - ban nhap.xlsx",kb:548,boi:"Phạm Thị Bích Ngọc",luc:"04/09 08:40",gd:"LAM",ver:2,ct:false}],
   log:[{w:"Doãn Thị Sáu",k:"giao việc này",t:"01/09 07:55",s:1},
        {w:"Phạm Thị Bích Ngọc",k:"nhận việc",t:"01/09 08:10",s:1},
        {w:"Doãn Thị Sáu",k:"đính kèm Danh muc NCC thang 8.xlsx",t:"01/09 07:55",s:1},
        {w:"Phạm Thị Bích Ngọc",k:"tải lên bản 2 của Bang ke HDDV thang 8 - ban nhap.xlsx",t:"04/09 08:40",s:1}]},

 { id:"CV-048", ttl:"Khoá sổ và lập báo cáo tài chính nội bộ tháng 8/2026", tt:"CHO_DUYET", cha:null, ah:5, kc:4,
   loai:"CHU_KY", lap:"THANG", soKy:23, kyDung:22, mat:"HAN_CHE", han_goc:"05/09/2026", doi:0, phoihop:["F004"], tien:0, sk:"BT", bc:true,
   giao:"F005", lam:"F036", bd:"01/09/2026", han:"05/09/2026", dk:5, luat:false,
   sp:"Bộ báo cáo tài chính nội bộ tháng 8 đã trình CFO",
   mucdich:"KPI phòng: BCTC nội bộ hoàn thành đúng hạn trước ngày 5, đủ 12/12 kỳ",
   tc:[{t:"Khoá sổ đủ các phân hệ",d:true},
       {t:"Đối chiếu công nợ và tồn kho khớp",d:true},
       {t:"Nộp trước ngày 5",d:true},
       {t:"CFO ký duyệt",d:true}],
   nop:{t:"03/09 17:22", x:"Em gửi anh bộ BCTC nội bộ tháng 8. Có một điểm cần lưu ý: chi phí kho tăng 14% so tháng 7 do phát sinh thuê xe ngoài đợt cao điểm, em đã tách riêng ở thuyết minh mục 4.2."},
   files:[{id:"g1",ten:"BCTC noi bo T8-2026.pdf",kb:1420,boi:"Doãn Thị Sáu",luc:"03/09 17:22",gd:"NOP",ver:1,ct:true},
          {id:"g2",ten:"Thuyet minh muc 4.2 - chi phi kho.docx",kb:96,boi:"Doãn Thị Sáu",luc:"03/09 17:22",gd:"NOP",ver:1,ct:true},
          {id:"g3",ten:"So chi tiet cong no T8.xlsx",kb:1180,boi:"Doãn Thị Sáu",luc:"02/09 11:05",gd:"LAM",ver:1,ct:false}],
   log:[{w:"Trịnh Thái Ly",k:"giao việc này",t:"01/09 08:00",s:1},
        {w:"Doãn Thị Sáu",k:"nhận việc",t:"01/09 08:12",s:1},
        {w:"Doãn Thị Sáu",k:"nộp kết quả kèm 2 tệp sản phẩm",t:"03/09 17:22",s:1}]},

 { id:"CV-050", ttl:"Đối soát công nợ phải trả và lập lịch thanh toán nhà cung cấp tháng 9", tt:"MOI", cha:null, ah:5, kc:3,
   loai:"CHU_KY", lap:"THANG", soKy:18, kyDung:17, mat:"NOI_BO", han_goc:"08/09/2026", doi:0, phoihop:[], tien:1850000000, tienLoai:"CHI", sk:"BT", bc:true,
   giao:"F036", lam:"F038", bd:"01/09/2026", han:"08/09/2026", dk:3, luat:false,
   sp:"Bảng đối soát công nợ phải trả và lịch thanh toán đã được CFO duyệt",
   mucdich:"KPI phòng: thời gian xử lý đề nghị thanh toán không quá 2 ngày làm việc",
   tc:[{t:"Đối chiếu đủ nhà cung cấp có phát sinh",d:false},
       {t:"Lệch quá 1% phải có xác nhận của Kế toán trưởng",d:false},
       {t:"Lịch thanh toán được CFO duyệt",d:false}],
   buoc:[{t:"Kết xuất công nợ phải trả từ phần mềm kế toán",d:false},
         {t:"Gửi thư đối chiếu cho nhà cung cấp có phát sinh",d:false},
         {t:"Tổng hợp phản hồi và lập bảng chênh lệch",d:false},
         {t:"Xếp thứ tự ưu tiên thanh toán theo hạn hợp đồng",d:false},
         {t:"Trình Kế toán trưởng ký nháy rồi trình CFO",d:false}],
   files:[],
   log:[{w:"Doãn Thị Sáu",k:"giao việc này",t:"04/09 08:30",s:1}]},

 { id:"CV-052", ttl:"Kê khai và nộp thuế GTGT kỳ tháng 8/2026", tt:"MOI", cha:null, ah:5, kc:3,
   loai:"CHU_KY", lap:"THANG", soKy:26, kyDung:26, mat:"NOI_BO", han_goc:"20/09/2026", doi:0, phoihop:[], tien:0, sk:"BT", bc:true,
   giao:"F036", lam:"F037", bd:"01/09/2026", han:"20/09/2026", dk:3, luat:true,
   sp:"Tờ khai đã nộp và chứng từ nộp thuế",
   mucdich:"KPI phòng: kê khai và nộp thuế đúng hạn 100%",
   tc:[{t:"Tờ khai khớp sổ",d:false},
       {t:"Nộp trước hạn luật định",d:false},
       {t:"Lưu chứng từ vào hồ sơ thuế",d:false}],
   files:[],
   log:[{w:"Doãn Thị Sáu",k:"giao việc này",t:"04/09 08:34",s:1}]},

 { id:"CV-070", ttl:"Cập nhật quy trình thanh toán nội bộ theo yêu cầu kiểm toán", tt:"DANG_LAM", cha:null, ah:4, kc:3,
   loai:"CONG_VIEC", mat:"NOI_BO", han_goc:"25/09/2026", doi:0, phoihop:["F038"], tien:0, sk:"BT", bc:true,
   giao:"F005", lam:"F036", bd:"25/08/2026", han:"25/09/2026", dk:5, luat:false,
   sp:"Quy trình thanh toán nội bộ bản mới đã ban hành",
   mucdich:"Kiểm toán năm 2025 nêu điểm yếu về phân tách nhiệm vụ trong khâu thanh toán",
   tc:[{t:"Có sơ đồ luồng và bảng phân quyền",d:true},
       {t:"Tách bạch người đề nghị, người duyệt, người chi",d:false},
       {t:"CFO ký ban hành",d:false}],
   files:[], log:[{w:"Trịnh Thái Ly",k:"giao việc này",t:"25/08 09:00",s:1}]},

 { id:"CV-071", ttl:"Rà soát hợp đồng thuê kho Bắc Ninh sắp hết hạn", tt:"MOI", cha:null, ah:4, kc:4,
   loai:"CONG_VIEC", mat:"NOI_BO", han_goc:"18/09/2026", doi:0, phoihop:[], tien:0, sk:"BT", bc:true,
   giao:"F005", lam:"F004", bd:"01/09/2026", han:"18/09/2026", dk:3, luat:false,
   sp:"Bản đối chiếu điều khoản và đề xuất tái ký hoặc chuyển kho",
   mucdich:"Hợp đồng hết hạn 31/12, cần chốt phương án trước khi vào mùa cao điểm",
   tc:[{t:"So sánh giá thuê với ít nhất 2 kho tương đương",d:false},
       {t:"Đánh giá chi phí chuyển kho nếu đổi",d:false}],
   files:[], log:[{w:"Trịnh Thái Ly",k:"giao việc này",t:"01/09 08:15",s:1}]},

 { id:"CV-080", ttl:"Giải trình chênh lệch doanh thu quý 2 theo yêu cầu cơ quan thuế", tt:"DANG_LAM", cha:null, ah:5, kc:5,
   loai:"DOT_XUAT", mat:"HAN_CHE", han_goc:"08/09/2026", doi:0, phoihop:["F036"], tien:0, sk:"RR", bc:true,
   nguon:"Công văn cơ quan thuế", phatSinh:"02/09/2026", nhanSau:1.5,
   giao:"F005", lam:"F037", bd:"02/09/2026", han:"08/09/2026", dk:5, luat:true,
   sp:"Công văn giải trình kèm bảng đối chiếu doanh thu quý 2",
   mucdich:"Trả lời công văn trong thời hạn luật định, tránh bị ấn định thuế",
   tc:[{t:"Đối chiếu doanh thu sổ với tờ khai từng tháng",d:true},
       {t:"Giải thích được từng khoản chênh",d:false},
       {t:"Pháp chế soát trước khi gửi",d:false}],
   files:[], log:[{w:"Trịnh Thái Ly",k:"giao việc này",t:"02/09 10:30",s:1}]},

 { id:"CV-081", ttl:"Truy tìm chênh lệch 47 triệu trên tài khoản Techcombank", tt:"CHO_DUYET", cha:null, ah:4, kc:5,
   loai:"DOT_XUAT", mat:"NOI_BO", han_goc:"04/09/2026", doi:0, phoihop:[], tien:47000000, tienLoai:"CHI", sk:"BT", bc:true,
   nguon:"CFO phát hiện khi soát sao kê", phatSinh:"03/09/2026", nhanSau:0.5,
   giao:"F005", lam:"F038", bd:"03/09/2026", han:"04/09/2026", dk:3, luat:false,
   sp:"Báo cáo truy vết kèm chứng từ gốc của khoản chênh",
   mucdich:"Không để chênh lệch chưa rõ nguyên nhân qua kỳ khoá sổ",
   tc:[{t:"Xác định được nguồn gốc khoản chênh",d:true},
       {t:"Có chứng từ gốc hoặc xác nhận ngân hàng",d:true}],
   nop:{t:"04/09 08:20",x:"Là khoản phí bảo lãnh ngân hàng thu tự động, chưa hạch toán. Đã có xác nhận Techcombank."},
   files:[], log:[{w:"Trịnh Thái Ly",k:"giao việc này",t:"03/09 14:10",s:1},
                  {w:"Lê Quang Anh",k:"nộp kết quả, chờ duyệt",t:"04/09 08:20",s:1}]},

 { id:"CV-039", ttl:"Lập bảng lương tháng 8 và chuyển bảo hiểm", tt:"HOAN_THANH", cha:null, ah:5, kc:3,
   loai:"CHU_KY", lap:"THANG", soKy:23, kyDung:21, mat:"HAN_CHE", han_goc:"31/08/2026", doi:0, phoihop:[], tien:0, sk:"BT", bc:true,
   giao:"F005", lam:"F036", bd:"25/08/2026", han:"31/08/2026", dk:3, luat:false,
   sp:"Bảng lương đã duyệt và chứng từ nộp bảo hiểm",
   mucdich:"KPI phòng: chi lương đúng ngày cam kết, 12/12 kỳ",
   tc:[{t:"Bảng lương khớp bảng chấm công",d:true},
       {t:"Chuyển bảo hiểm trước ngày cuối tháng",d:true},
       {t:"CFO duyệt trước khi chi",d:true}],
   diem:{cl:5,cd:4,ht:4,dh:5,tong:4.75,boi:"03/09 09:40",ai:"Trịnh Thái Ly",
         nx:"Làm sớm 1 ngày, phát hiện sai lệch chấm công của kho và chủ động báo trước khi chi."},
   files:[{id:"l1",ten:"Bang luong T8-2026 da duyet.xlsx",kb:224,boi:"Doãn Thị Sáu",luc:"30/08 16:10",gd:"NOP",ver:1,ct:true},
          {id:"l2",ten:"Chung tu nop bao hiem T8.pdf",kb:410,boi:"Doãn Thị Sáu",luc:"30/08 16:10",gd:"NOP",ver:1,ct:true}],
   log:[{w:"Trịnh Thái Ly",k:"giao việc này",t:"25/08 09:00",s:1},
        {w:"Doãn Thị Sáu",k:"nộp kết quả, chờ duyệt",t:"30/08 16:10",s:1},
        {w:"Trịnh Thái Ly",k:"duyệt và chấm điểm 4.75",t:"03/09 09:40",s:1}]},
];

/* ---------- thư viện mẫu ---------- */
let MSEQ = 10;
let MAU = [
 {n:"Khoá sổ và lập BCTC nội bộ tháng", sp:"Bộ báo cáo tài chính nội bộ đã trình CFO", dk:5, ng:4,
  tc:["Khoá sổ đủ các phân hệ","Đối chiếu công nợ và tồn kho khớp","Nộp trước ngày 5 của tháng sau","CFO ký duyệt"],
  md:"KPI phòng: BCTC nội bộ hoàn thành đúng hạn trước ngày 5", luat:false, loai:"CHU_KY", id:"m1", boi:"Trịnh Thái Ly", luc:"12/08/2026", dung:11},
 {n:"Kê khai và nộp thuế kỳ", sp:"Tờ khai đã nộp và chứng từ nộp thuế", dk:3, ng:2,
  tc:["Tờ khai khớp sổ","Nộp trước hạn luật định","Lưu chứng từ vào hồ sơ thuế"],
  buoc:["Kết xuất bảng kê hoá đơn đầu ra đầu vào","Đối chiếu với sổ kế toán","Lập tờ khai trên phần mềm HTKK","Trình Kế toán trưởng soát trước khi nộp","Nộp tờ khai và lưu chứng từ"],
  md:"KPI phòng: kê khai và nộp thuế đúng hạn 100%", luat:true, bc:true, loai:"CHU_KY", id:"m2", boi:"Doãn Thị Sáu", luc:"12/08/2026", dung:8},
 {n:"Đối soát công nợ phải trả và lập lịch thanh toán", sp:"Bảng đối soát và lịch thanh toán đã duyệt", dk:3, ng:3,
  tc:["Đối chiếu đủ nhà cung cấp có phát sinh","Lệch quá 1% phải có xác nhận của Kế toán trưởng","CFO duyệt lịch thanh toán"],
  buoc:["Kết xuất công nợ phải trả từ phần mềm kế toán","Gửi thư đối chiếu cho nhà cung cấp có phát sinh","Tổng hợp phản hồi và lập bảng chênh lệch","Xếp thứ tự ưu tiên thanh toán theo hạn hợp đồng","Trình Kế toán trưởng ký nháy rồi trình CFO"],
  md:"KPI phòng: thời gian xử lý đề nghị thanh toán không quá 2 ngày làm việc", luat:false, bc:true, loai:"CHU_KY", id:"m3", boi:"Doãn Thị Sáu", luc:"14/08/2026", dung:4},
 {n:"Đối soát công nợ theo nhóm khách hàng", sp:"Bảng đối soát đã ký xác nhận", dk:3, ng:3,
  tc:["Đủ số khách hàng trong nhóm","Số liệu khớp sổ kế toán","Có chữ ký xác nhận","Lệch quá ngưỡng thì có xác nhận người thứ hai"],
  md:"KPI phòng: công nợ quá hạn dưới 5% doanh thu", luat:false, loai:"CHU_KY", id:"m4", boi:"Doãn Thị Sáu", luc:"14/08/2026", dung:6},
 {n:"Rà soát hợp đồng sắp hết hạn", sp:"Bản đối chiếu điều khoản và đề xuất phương án", dk:3, ng:5,
  tc:["So sánh với ít nhất 2 phương án thay thế","Đánh giá chi phí chuyển đổi","Trình BGĐ quyết định"],
  md:"Không để hợp đồng hết hạn mà chưa có phương án", luat:false, loai:"CONG_VIEC",
  id:"m5", boi:"Trịnh Thái Ly", luc:"16/08/2026", dung:0},
 {n:"Giải trình theo yêu cầu cơ quan nhà nước", sp:"Công văn giải trình kèm hồ sơ chứng minh", dk:5, ng:3,
  tc:["Đối chiếu số liệu sổ với hồ sơ đã nộp","Giải thích được từng khoản chênh","Pháp chế soát trước khi gửi"],
  md:"Trả lời trong thời hạn luật định, tránh bị ấn định", luat:true, bc:true, loai:"DOT_XUAT",
  id:"m6", boi:"Trịnh Thái Ly", luc:"16/08/2026", dung:0},
];

/* ---------- thông báo ---------- */
let NT = [
 {to:"F037", ic:"a", tx:"<b>Doãn Thị Sáu</b> giao cho bạn việc <b>Kê khai và nộp thuế GTGT kỳ tháng 8/2026</b>", tm:"04/09 08:34", un:1, go:"CV-052"},
 {to:"F037", ic:"r", tx:"Việc <b>Lập bảng kê hoá đơn đầu vào tháng 8/2026</b> đến hạn <b>hôm nay</b>", tm:"04/09 08:00", un:1, go:"CV-046"},
 {to:"F038", ic:"r", tx:"Việc <b>Đối chiếu số dư ngân hàng tuần 35</b> đã <b>quá hạn 2 ngày</b>", tm:"04/09 08:00", un:1, go:"CV-041"},
 {to:"F038", ic:"a", tx:"<b>Doãn Thị Sáu</b> giao cho bạn việc <b>Đối soát công nợ phải trả tháng 9</b>", tm:"04/09 08:30", un:1, go:"CV-050"},
 {to:"F005", ic:"", tx:"<b>Doãn Thị Sáu</b> đã nộp <b>Báo cáo tài chính nội bộ tháng 8/2026</b>, chờ bạn duyệt", tm:"03/09 17:22", un:1, go:"CV-048"},
 {to:"F036", ic:"", tx:"<b>Lê Quang Anh</b> nhắn trong việc <b>Đối chiếu số dư ngân hàng tuần 35</b>", tm:"02/09 16:40", un:0, go:"CV-041"},
 {to:"F036", ic:"g", tx:"<b>Trịnh Thái Ly</b> đã duyệt <b>Lập bảng lương tháng 8</b> — điểm 4.75", tm:"03/09 09:40", un:0, go:"CV-039"},
];

/* ---------- ảnh đại diện: chấm tròn chữ cái đầu của TÊN, đổi được ảnh thật ---------- */
const AV_MAU = ["#0E4671","#B85042","#2E6E4E","#7A55A8","#B3781E","#1F5FA8","#8A4B6B","#0F6E72"];
function avMau(id){ let h=0; for (const c of id) h = (h*31 + c.charCodeAt(0)) % 9973; return AV_MAU[h % AV_MAU.length]; }
function chuCai(ten){ const w = String(ten).trim().split(/\s+/); return (w[w.length-1]||"?")[0].toUpperCase(); }
function avHTML(id, sz){
  const u = U[id]; sz = sz || 26;
  if (!u) return `<span class="av2" style="width:${sz}px;height:${sz}px;background:#C3CDD7;font-size:${Math.round(sz*.42)}px">?</span>`;
  const st = `width:${sz}px;height:${sz}px;font-size:${Math.round(sz*.42)}px`;
  const tip = `${u.ten} — ${u.cd}`;
  return u.anh
    ? `<span class="av2" style="${st};background-image:url('${u.anh}')" title="${tip}"></span>`
    : `<span class="av2" style="${st};background:${avMau(id)}" title="${tip}">${chuCai(u.ten)}</span>`;
}
function avNhom(ids, sz, stack){
  if (!ids || !ids.length) return `<span class="avs"><span class="no">—</span></span>`;
  return `<span class="avs ${stack?"stack":""}">${ids.map(i=>avHTML(i,sz)).join("")}</span>`;
}

/* ---------- RACI: ánh xạ thẳng từ mô hình G–T–D–P ----------
   R Responsible  = T Người thực hiện, đúng 1 người
   A Accountable  = D Người duyệt, đúng 1 người và khác T
   C Consulted    = P Người phối hợp, 0 đến n
   I Informed     = người theo dõi: người giao khi giao vượt cấp, người duyệt tầng 2,
                    và người chủ trì việc cha                                        */
function raci(t){
  const d = nguoiDuyet(t);
  const R = [t.lam];
  const A = d ? [d] : [];
  const C = (t.phoihop||[]).slice();
  const I = [];
  const them = x => { if (x && !I.includes(x) && !R.includes(x) && !A.includes(x) && !C.includes(x)) I.push(x); };
  if (t.giao !== d && t.giao !== t.lam) them(t.giao);
  chuoiDuyetThem(t).forEach(them);
  /* chỉ định người duyệt khác mặc định thì trưởng đơn vị trực tiếp vẫn vào danh sách theo dõi */
  if (t.duyet) them(truongTrucTiep(t.lam));
  (t.theodoi||[]).forEach(them);
  toTien(t).forEach(x => them(x.lam));
  return {R, A, C, I};
}

/* ================= LỊCH SỬ ĐỂ DỰNG BÁO CÁO NHÂN SỰ =================
   SỐ LIỆU MÔ PHỎNG, không phải số thật của Forever. Sinh bằng bộ số giả ngẫu nhiên
   có hạt giống cố định để lần nào mở cũng ra đúng một kết quả, phục vụ đúng một mục đích:
   xem thử HÌNH DẠNG của báo cáo trước khi lập trình. Mọi con số sẽ được thay bằng
   dữ liệu thật sau vài kỳ chạy.
   Mỗi bản ghi = một việc ĐÃ DUYỆT XONG, đúng các trường hệ thống thật sẽ có. */
let _seed = 20260904;
/* xorshift32 thay cho LCG cũ: tích _seed × 1103515245 vượt 2^53 nên float64 làm tròn
   mất bit thấp, chu kỳ tụt xuống ~10.400 giá trị. "Mô phỏng 10.000 lần" khi đó chỉ có
   khoảng 10.400 lượt rút độc lập và đuôi bi quan p95 bị cắt ngắn mất một ngày. */
function rnd(){
  _seed ^= _seed << 13; _seed >>>= 0;
  _seed ^= _seed >>> 17;
  _seed ^= _seed << 5;  _seed >>>= 0;
  return _seed / 4294967296;
}
function gauss(m, sd){ let u=0,v=0; while(!u)u=rnd(); while(!v)v=rnd();
  return m + sd * Math.sqrt(-2*Math.log(u)) * Math.cos(2*Math.PI*v); }
const KY = ["06/2026","07/2026","08/2026"];
/* tính cách từng người, chỉ dùng để sinh số mô phỏng */
/* Hồ sơ mô phỏng cho TOÀN CÔNG TY. Trước đây chỉ có bốn người của Tài chính – Kế toán,
   nên mở rộng ra 44 người thì màn Đánh giá hiện 0 việc cho gần hết công ty.
   Vẫn là SỐ MÔ PHỎNG, không phải số thật của Forever — dùng để xem hình dạng báo cáo. */
const _NET = {};
[["F036",11,13,0.93,4.3,4.2,4.3,0.05,0.75],["F037",9,12,0.88,4.0,3.5,3.9,0.10,0.45],
 ["F038",7,10,0.66,3.6,2.9,3.6,0.24,0.20],["F004",4,6,0.85,4.1,3.8,4.0,0.08,0.55],
 ["F008",8,11,0.90,4.2,4.0,4.1,0.07,0.60],["F012",9,12,0.84,3.9,3.6,3.8,0.12,0.35],
 ["F015",8,11,0.87,4.0,3.7,3.9,0.09,0.40],["F010",7,9,0.92,4.1,4.1,4.2,0.05,0.65],
 ["F009",6,9,0.81,3.8,3.4,3.7,0.14,0.30],["F011",5,8,0.79,3.7,3.3,3.6,0.16,0.28],
 ["F013",6,9,0.72,3.5,3.0,3.4,0.20,0.22],["F016",6,9,0.75,3.6,3.2,3.5,0.18,0.25],
 ["F017",5,8,0.77,3.6,3.1,3.5,0.17,0.24],["F014",5,7,0.88,3.9,3.8,3.9,0.08,0.50],
 ["F018",7,10,0.91,4.3,4.2,4.2,0.06,0.70],["F019",8,11,0.86,4.0,3.7,3.9,0.11,0.42],
 ["F020",8,11,0.83,3.9,3.5,3.8,0.13,0.38],["F021",7,10,0.80,3.8,3.4,3.7,0.15,0.33],
 ["F022",6,9,0.89,4.4,4.3,4.3,0.06,0.68],["F023",6,9,0.85,4.1,3.9,4.0,0.10,0.48],
 ["F024",7,10,0.87,4.2,4.0,4.1,0.09,0.55],["F025",6,9,0.78,3.7,3.3,3.6,0.16,0.30],
 ["F026",6,9,0.84,4.0,3.8,3.9,0.11,0.45],["F028",7,10,0.82,3.9,3.6,3.8,0.13,0.36],
 ["F029",6,9,0.80,3.8,3.5,3.7,0.14,0.34],["F030",7,10,0.86,4.1,3.8,4.0,0.10,0.44],
 ["F031",5,8,0.76,3.6,3.2,3.5,0.18,0.26],["F032",6,9,0.83,3.9,3.7,3.8,0.12,0.40],
 ["F033",7,10,0.81,3.8,3.5,3.7,0.14,0.35],["F034",5,8,0.90,4.3,4.1,4.2,0.06,0.62],
 ["F035",5,8,0.87,4.1,3.9,4.0,0.09,0.52],["F039",4,6,0.85,3.8,3.7,3.8,0.10,0.40],
 ["F040",5,8,0.82,4.0,3.7,3.9,0.12,0.46],["F041",7,10,0.79,3.7,3.4,3.6,0.15,0.32],
 ["F042",7,10,0.84,4.0,3.7,3.9,0.11,0.43],["F043",6,9,0.88,4.2,4.0,4.1,0.08,0.58],
 ["F044",6,9,0.74,3.5,3.1,3.4,0.21,0.23],["F045",5,8,0.86,4.1,3.8,4.0,0.10,0.47],
 ["F006",5,8,0.83,3.9,3.6,3.8,0.12,0.41],["F007",5,8,0.88,4.2,4.0,4.1,0.08,0.56],
 /* Ban Giám đốc cũng nhận việc trong hệ thống (chủ trì dự án, ký duyệt có sản phẩm),
    nên phải có lịch sử. Thiếu thì màn Đánh giá của cấp trên họ hiện 0 việc. */
 ["F001",3,5,0.92,4.4,4.3,4.4,0.04,0.72],["F003",4,6,0.90,4.3,4.2,4.3,0.05,0.70],
 ["F002",4,6,0.87,4.2,4.0,4.1,0.07,0.60],["F005",5,7,0.91,4.3,4.1,4.2,0.05,0.66],
].forEach(([id,a,b,dung,cl,cd,ht,tl,som]) => {
  _NET[id] = {sl:[a,b], dung, cl, cd, ht, tralai:tl, som};
});
const LS = [];
Object.entries(_NET).forEach(([id, n]) => {
  KY.forEach(ky => {
    const sl = n.sl[0] + Math.floor(rnd() * (n.sl[1] - n.sl[0] + 1));
    for (let i = 0; i < sl; i++){
      const dk = [1,2,2,3,3,3,5,5,8][Math.floor(rnd()*9)];
      const dungHan = rnd() < n.dung;
      const som = rnd() < n.som;
      const tl  = rnd() < n.tralai;
      const cl = Math.max(1, Math.min(5, Math.round(gauss(n.cl, 0.75))));
      const cd = Math.max(1, Math.min(5, Math.round(gauss(n.cd, 0.8))));
      const ht = Math.max(1, Math.min(5, Math.round(gauss(n.ht, 0.7))));
      const dh = dungHan ? (rnd() < 0.5 ? 5 : 4) : (rnd() < 0.6 ? 3 : 1);
      LS.push({ky, nguoi:id, dk, dh, cl, cd, ht, tralai:tl?1:0, baoSom:som?1:0,
               tong: cl*0.45 + dh*0.30 + cd*0.15 + ht*0.10});
    }
  });
});
/* người duyệt: thời gian giữ phiếu và tỷ lệ trả lại, cũng là số mô phỏng */
/* Hồ sơ người duyệt — phải phủ MỌI người thực sự duyệt, không chỉ hai người của
   Tài chính – Kế toán. Thiếu một người là màn Điều hành của người đó ném lỗi. */
const LS_DUYET = {
  F001:{soPhieu:52, gioGiu:31.2, traLai:0.09},
  F003:{soPhieu:64, gioGiu:22.8, traLai:0.08},
  F005:{soPhieu:41, gioGiu:26.4, traLai:0.07},
  F036:{soPhieu:96, gioGiu: 9.1, traLai:0.11},
  F008:{soPhieu:78, gioGiu:11.4, traLai:0.13},
  F010:{soPhieu:24, gioGiu: 7.2, traLai:0.06},
  F018:{soPhieu:69, gioGiu:13.8, traLai:0.10},
  F022:{soPhieu:31, gioGiu:15.6, traLai:0.12},
  F024:{soPhieu:44, gioGiu:12.1, traLai:0.14},
  F026:{soPhieu:27, gioGiu:18.3, traLai:0.09},
};
const NGAY_CONG_KY = 22;     /* số ngày làm việc trong một kỳ */
const GIO_NGAY = 8;
/* Định luật Little: L = λ × W. λ là số phiếu đến mỗi ngày, W là thời gian phiếu nằm
   trong hệ thống tính bằng ngày, L là số phiếu trung bình đang treo ở người đó. */
function nutThat(id){
  const d = LS_DUYET[id] || {soPhieu:0, gioGiu:0, traLai:0};
  if (!d.soPhieu) return {lam:0, W:0, L:0, ...d, chuaCo:true};
  const lam = d.soPhieu / NGAY_CONG_KY;          /* λ — phiếu đến mỗi ngày */
  const W  = d.gioGiu / GIO_NGAY;                /* W — thời gian nằm chờ, tính theo ngày công */
  return {lam, W, L: lam * W, ...d};
}

/* ===== LỊCH SỬ THỜI GIAN THẬT THEO MẪU VIỆC =====
   Dùng cho dự báo theo lớp tham chiếu (Kahneman, Flyvbjerg): thay vì hỏi người ta
   "bạn nghĩ mất bao lâu" — cách nhìn từ bên trong, luôn lạc quan — hệ thống lấy
   thời gian THẬT của các lần làm trước cùng loại việc.
   Số mô phỏng, sinh có hạt giống cố định. */
const LS_MAU = {};
[["m1",11,3.4,0.9],["m2",8,1.9,0.5],["m3",4,3.1,1.1],["m4",6,2.8,0.7]].forEach(([id,n,mu,sg])=>{
  LS_MAU[id] = Array.from({length:n}, () => Math.max(0.5, Math.round(gauss(mu,sg)*2)/2));
});
function phanVi(arr, q){
  if (!arr.length) return null;
  const a2 = arr.slice().sort((x,y)=>x-y);
  const i = (a2.length - 1) * q, lo = Math.floor(i), hi = Math.ceil(i);
  return lo === hi ? a2[lo] : a2[lo] + (a2[hi]-a2[lo])*(i-lo);
}
function lopThamChieu(mauId){
  const a2 = LS_MAU[mauId];
  if (!a2 || a2.length < 3) return null;
  return {n:a2.length, tv:phanVi(a2,0.5), p80:phanVi(a2,0.8),
          min:Math.min(...a2), max:Math.max(...a2)};
}
function soNgayLe(n){ return Number.isInteger(n) ? n : n.toFixed(1).replace(".", ","); }

/* ===== THÔNG LƯỢNG THEO NGÀY + BIỂU ĐỒ DÒNG TÍCH LUỸ =====
   Đây chính là dữ liệu mà BẢNG LỊCH SỬ TRẠNG THÁI sinh ra. Bản thử mô phỏng 45 ngày
   để cho thấy vì sao phải có bảng đó từ tuần đầu: không có nó thì không vẽ được hình này. */
/* =====================================================================
   LỊCH LÀM VIỆC — danh mục nền số một

   Mọi phép tính đúng hạn, mọi thời lượng, mọi dự báo đều đếm ngày công.
   Thiếu bảng này thì điểm đúng hạn sai HỆ THỐNG chứ không sai lẻ tẻ: một việc
   bắc qua Tết mất năm ngày công mà phần mềm vẫn tính đủ.
   Ngày lễ dưới đây nạp theo lịch nghỉ thông lệ; ngày âm lịch phải đối chiếu
   thông báo chính thức của Chính phủ hằng năm, nên mỗi dòng có cờ xacNhan. */
const CH = {
  thuBayNuaNgay: true,     /* thứ Bảy tính 0,5 ngày công */
  chuNhatNghi:   true,
  sucTuan:       8,        /* điểm độ khó một người gánh nổi trong một tuần */
  wipTran:       5,        /* số việc mở cùng lúc trước khi cảnh báo mềm */
  spanTran:      8,        /* số người tối đa một người duyệt trực tiếp */
  nhipNgay:      45,       /* số ngày lịch sử dùng cho dự báo thông lượng */
  /* --- bộ sinh kỳ cho việc lặp: người quản trị chỉnh được, mọi lần chỉnh vào nhật ký --- */
  ckSinhTruoc:   0,        /* sinh kỳ mới sớm hơn hạn kỳ hiện tại bao nhiêu ngày */
  ckTranMo:      2,        /* một quy tắc được để tối đa bao nhiêu kỳ mở cùng lúc */
  ckNhacTruoc:   2,        /* nhắc người thực hiện trước hạn bao nhiêu ngày */
  ckTuDong:      true,     /* có tự sinh khi tới kỳ hay chờ bấm tay */
  ckDoiNoiBo:    "SAU",    /* kỳ rơi ngày nghỉ: việc nội bộ dời về SAU hay TRƯỚC */
  /* --- lịch tự gửi báo cáo qua email --- */
  emBat:         true,     /* có tự gửi hay không */
  emThu:         0,        /* 0 = Chủ nhật … 6 = thứ Bảy */
  emGio:         "17:00",  /* giờ gửi */
  emKy:          "TUAN",   /* kỳ của báo cáo gửi kèm */
};
const NGHI_LE = [
  {ngay:"01/01/2026", ten:"Tết Dương lịch",              xacNhan:true},
  {ngay:"15/02/2026", ten:"Tết Nguyên đán (29 tháng Chạp)", xacNhan:false},
  {ngay:"16/02/2026", ten:"Tết Nguyên đán (30 tháng Chạp)", xacNhan:false},
  {ngay:"17/02/2026", ten:"Tết Nguyên đán (mùng 1)",     xacNhan:false},
  {ngay:"18/02/2026", ten:"Tết Nguyên đán (mùng 2)",     xacNhan:false},
  {ngay:"19/02/2026", ten:"Tết Nguyên đán (mùng 3)",     xacNhan:false},
  {ngay:"20/02/2026", ten:"Tết Nguyên đán (mùng 4)",     xacNhan:false},
  {ngay:"26/04/2026", ten:"Giỗ Tổ Hùng Vương",           xacNhan:false},
  {ngay:"30/04/2026", ten:"Ngày Giải phóng miền Nam",    xacNhan:true},
  {ngay:"01/05/2026", ten:"Ngày Quốc tế Lao động",       xacNhan:true},
  {ngay:"02/09/2026", ten:"Quốc khánh",                  xacNhan:true},
  {ngay:"03/09/2026", ten:"Quốc khánh (nghỉ bù)",        xacNhan:false},
  {ngay:"01/01/2027", ten:"Tết Dương lịch",              xacNhan:true},
  {ngay:"04/02/2027", ten:"Tết Nguyên đán (29 tháng Chạp)", xacNhan:false},
  {ngay:"05/02/2027", ten:"Tết Nguyên đán (30 tháng Chạp)", xacNhan:false},
  {ngay:"06/02/2027", ten:"Tết Nguyên đán (mùng 1)",     xacNhan:false},
  {ngay:"08/02/2027", ten:"Tết Nguyên đán (mùng 2)",     xacNhan:false},
  {ngay:"09/02/2027", ten:"Tết Nguyên đán (mùng 3)",     xacNhan:false},
  {ngay:"10/02/2027", ten:"Tết Nguyên đán (mùng 4)",     xacNhan:false},
  {ngay:"15/04/2027", ten:"Giỗ Tổ Hùng Vương",           xacNhan:false},
  {ngay:"30/04/2027", ten:"Ngày Giải phóng miền Nam",    xacNhan:true},
  {ngay:"03/05/2027", ten:"Quốc tế Lao động (nghỉ bù)",  xacNhan:false},
  {ngay:"02/09/2027", ten:"Quốc khánh",                  xacNhan:true},
];
const LE_SET = new Set(NGHI_LE.map(x => x.ngay));
/* Năm cuối cùng có dữ liệu. Ngoài phạm vi này congCuaNgay() vẫn chạy nhưng KHÔNG trừ lễ,
   nên mọi phép tính đúng hạn sẽ rộng rãi hơn thực tế mà không báo gì. */
const NAM_CO_LICH = [...new Set(NGHI_LE.map(x => +x.ngay.slice(6)))].sort();
function khoaNgay(d){ return `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`; }
function laNgayLe(d){ return LE_SET.has(khoaNgay(d)); }
/* Số ngày công của MỘT ngày cụ thể: 0 nếu Chủ nhật hoặc ngày lễ, 0,5 nếu thứ Bảy. */
function congCuaNgay(d){
  if (laNgayLe(d)) return 0;
  const w = d.getDay();
  if (w === 0 && CH.chuNhatNghi) return 0;
  if (w === 6) return CH.thuBayNuaNgay ? 0.5 : 1;
  return 1;
}
/* Đọc SỐNG từ CH, không chụp giá trị một lần lúc nạp trang. Chụp một lần thì đổi tham số
   ở màn Thiết lập chỉ đổi được con số in ra, còn ngưỡng thật vẫn là giá trị cũ. */
Object.defineProperty(globalThis, "WIP_TRAN", {get: () => CH.wipTran});
Object.defineProperty(globalThis, "SUC_TUAN", {get: () => CH.sucTuan});
const NGAY_LS = CH.nhipNgay;
const CFD = [];            /* cộng dồn theo ngày: đã vào, đã bắt đầu, đã nộp, đã duyệt */
const TL = [];             /* thông lượng mỗi ngày = số việc được duyệt xong */
(function(){
  let vao = 0, batDau = 0, nop = 0, xong = 0;
  let qMoi = 0, qLam = 0, qDuyet = 0;
  for (let i = 0; i < NGAY_LS; i++){
    const d = new Date(TODAY); d.setDate(d.getDate() - (NGAY_LS - 1 - i));
    if (d.getDay() === 0){ CFD.push({d, vao, batDau, nop, xong}); TL.push(0); continue; }
    const a2 = Math.max(0, Math.round(gauss(2.9, 1.3)));         /* việc mới vào */
    vao += a2; qMoi += a2;
    const b2 = Math.min(qMoi, Math.max(0, Math.round(gauss(2.9, 1.1))));
    batDau += b2; qMoi -= b2; qLam += b2;
    const c2 = Math.min(qLam, Math.max(0, Math.round(gauss(2.8, 1.2))));
    nop += c2; qLam -= c2; qDuyet += c2;
    const e2 = Math.min(qDuyet, Math.max(0, Math.round(gauss(2.7, 1.4))));
    xong += e2; qDuyet -= e2;
    TL.push(e2);
    CFD.push({d, vao, batDau, nop, xong});
  }
})();

/* ===== MÔ PHỎNG MONTE CARLO TRÊN THÔNG LƯỢNG =====
   Lấy mẫu CÓ HOÀN LẠI từ thông lượng lịch sử, 10.000 lần. Ngày không xong việc nào
   phải giữ nguyên trong mẫu — bỏ chúng đi sẽ làm kết quả lạc quan giả tạo. */
function monteCarlo(soViec, lanChay){
  lanChay = lanChay || 10000;
  if (!TL.length || !soViec) return null;
  const kq = [];
  for (let r = 0; r < lanChay; r++){
    let con = soViec, ngay = 0;
    while (con > 0 && ngay < 400){
      con -= TL[Math.floor(rnd() * TL.length)];
      ngay++;
    }
    kq.push(ngay);
  }
  kq.sort((x,y)=>x-y);
  const pv = q => kq[Math.min(kq.length-1, Math.floor(kq.length * q))];
  return {n:lanChay, p50:pv(0.50), p85:pv(0.85), p95:pv(0.95),
          tbTL: TL.reduce((a2,b2)=>a2+b2,0) / TL.length};
}
function congNgay(n){
  const d = new Date(TODAY);
  d.setDate(d.getDate() + n);
  return `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}`;
}

/* ---- thống kê: khoảng dao động và co ngót ---- */
function tb(a){ return a.length ? a.reduce((x,y)=>x+y,0)/a.length : 0; }
function sd(a){ if (a.length < 2) return 0; const m = tb(a);
  return Math.sqrt(a.reduce((s2,x)=>s2+(x-m)*(x-m),0)/(a.length-1)); }
/* khoảng Wilson cho tỷ lệ — đúng hơn công thức thường khi n nhỏ */
function wilson(k, n){
  if (!n) return [0,1];
  const z = 1.96, p = k/n, d = 1 + z*z/n;
  const c = (p + z*z/(2*n)) / d;
  const r = z * Math.sqrt(p*(1-p)/n + z*z/(4*n*n)) / d;
  return [Math.max(0,c-r), Math.min(1,c+r)];
}
/* co ngót Bayes thực nghiệm: người ít việc bị kéo về trung bình nhóm nhiều hơn */
function coNgot(x, n, muN, tau2, sig2){
  if (!n) return muN;
  const lam = tau2 / (tau2 + sig2/n);
  return lam*x + (1-lam)*muN;
}

/* ===== SỔ RỦI RO VÀ SỔ QUYẾT ĐỊNH CỦA DỰ ÁN =====
   Hai cấu phần chuẩn của quản trị dự án mà bảng công việc không thay thế được:
   rủi ro là thứ CHƯA xảy ra, vấn đề là thứ ĐÃ xảy ra, quyết định là thứ phải nhớ vì sao đã chọn. */
const RUI_RO = [
 {id:"R1", da:"CV-060", mo:"Cơ quan thuế yêu cầu giải trình thêm ngoài danh mục, kéo dài thời gian",
  kn:4, td:4, nguoi:"F037", bp:"Chuẩn bị sẵn hồ sơ giải trình cho ba khoản chênh lớn nhất ngay từ đầu", tt:"DANG_THEO_DOI"},
 {id:"R2", da:"CV-060", mo:"Hoá đơn đầu vào của nhà cung cấp đã ngừng hoạt động không lấy lại được bản gốc",
  kn:3, td:5, nguoi:"F037", bp:"Lập danh sách sớm, gửi công văn xin xác nhận từ tháng 9", tt:"DANG_XU_LY"},
 {id:"R3", da:"CV-060", mo:"Kế toán trưởng nghỉ phép dài trùng giai đoạn cao điểm",
  kn:2, td:4, nguoi:"F005", bp:"Chỉ định người thay và bàn giao trước 15/10", tt:"DANG_THEO_DOI"},
 {id:"R4", da:"CV-090", mo:"Kiểm toán viên nêu điều chỉnh trọng yếu về ghi nhận doanh thu",
  kn:3, td:5, nguoi:"F005", bp:"Rà soát chính sách ghi nhận doanh thu trước khi kiểm toán vào", tt:"DANG_XU_LY"},
 {id:"R5", da:"CV-090", mo:"Chi phí kiểm toán vượt ngân sách do phát sinh thủ tục bổ sung",
  kn:2, td:3, nguoi:"F004", bp:"Chốt phạm vi và điều khoản phát sinh ngay trong hợp đồng", tt:"DA_DONG"},
];
const RR_TT = {DANG_THEO_DOI:["Đang theo dõi","m"], DANG_XU_LY:["Đang xử lý","a"], DA_DONG:["Đã đóng","g"]};
function mucRuiRo(kn, td){ const d = kn*td; return d>=15?["Cao","r"]:d>=8?["Trung bình","a"]:["Thấp","m"]; }

const QUYET_DINH = [
 {da:"CV-060", ngay:"28/08/2026", nd:"Thuê ngoài phần rà soát hoá đơn đầu vào cho quý 1 và quý 2",
  boi:"Trịnh Thái Ly", vi:"Khối lượng 12 tháng vượt khả năng của hai người trong hai tháng",
  ah:"Tăng chi phí 22 triệu, đổi lại rút ngắn 3 tuần"},
 {da:"CV-060", ngay:"02/09/2026", nd:"Không thuê tư vấn thuế bên ngoài cho phần giải trình",
  boi:"Ngô Quý Ước", vi:"Các khoản chênh đều thuộc loại đã từng giải trình thành công năm 2025",
  ah:"Tiết kiệm 60 triệu, rủi ro nếu cơ quan thuế đổi cách diễn giải"},
 {da:"CV-090", ngay:"22/10/2026", nd:"Chọn công ty kiểm toán B thay vì A dù giá cao hơn 8%",
  boi:"Đoàn Việt Dũng", vi:"B có kinh nghiệm ngành xuất nhập khẩu và cam kết nhân sự cố định",
  ah:"Chi phí tăng 13 triệu, giảm rủi ro phải giải thích lại từ đầu"},
];

/* Chốt SEQ theo mã lớn nhất đang có, cộng biên an toàn. */
SEQ = Math.max(SEQ, ...T.map(t => parseInt(String(t.id).replace(/\D/g,""), 10) || 0)) + 10;

/* ---------- tiện ích ---------- */
const $  = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const d2  = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
function parse(s){ const [d,m,y] = s.split("/").map(Number); return new Date(y, m-1, d); }
function days(han){ return Math.round((d2(parse(han)) - d2(TODAY)) / 86400000); }
function dlText(han, t){
  if (t && t.tt === "HOAN_THANH") return {t:"Xong " + han.slice(0,5), c:""};
  if (t && dangDung(t)){ const n = ngayDaDung(t);
    return {t: n ? `Đồng hồ dừng ${n} ngày` : "Đồng hồ vừa dừng", c:"hn"}; }
  const n = t ? conLai(t) : days(han);
  if (n <  0) return {t:`Quá hạn ${-n} ngày`, c:"qh"};
  if (n === 0) return {t:"Hạn hôm nay",       c:"hn"};
  if (n === 1) return {t:"Hạn ngày mai",      c:"hn"};
  if (n <= 7 ) return {t:`Còn ${n} ngày`,     c:""};
  return {t:"Hạn " + han.slice(0,5), c:""};
}
/* Nhận cả việc lẫn chuỗi hạn. Có việc thì đếm theo hạn THỰC (đã cộng ngày dừng đồng hồ). */
function bucket(han, t){ const n = t ? conLai(t) : days(han); return n<0 ? "qh" : n===0 ? "hn" : n<=7 ? "tn" : "sd"; }
function pct(t){ const tc = t.tc || []; return tc.length ? Math.round(tc.filter(c=>c.d).length / tc.length * 100) : 0; }
const TT = {MOI:["Mới","m"], DANG_LAM:["Đang làm",""], CHO_DUYET:["Chờ duyệt","a"],
            CHO_DUYET_2:["Chờ duyệt cấp 2","a"], HOAN_THANH:["Hoàn thành","g"], TRA_LAI:["Trả lại","r"]};
function toast(m){ const e=$("#toast"); e.textContent=m; e.classList.add("on"); clearTimeout(e._t); e._t=setTimeout(()=>e.classList.remove("on"),2600); }
function find(id){ return T.find(t=>t.id===id); }
function idTheoTen(ten){ const u = Object.values(U).find(x=>x.ten===ten); return u ? u.id : "?"; }

/* Người duyệt = TRƯỞNG ĐƠN VỊ TRỰC TIẾP của người thực hiện, không phải người giao.
   Khác nhau khi giao vượt cấp: CFO giao thẳng cho chuyên viên thì Kế toán trưởng vẫn là
   người duyệt, CFO thành người theo dõi. Người giao ghi đè được bằng trường duyet. */
/* Leo cây tổ chức cho tới khi gặp một trưởng đơn vị KHÁC chính mình.
   Bản trước chỉ leo một tầng rồi bỏ cuộc, nên người kiêm trưởng hai tầng không có cấp trên. */
function truongTrucTiep(uid){
  if (!uid || !U[uid]) return null;
  let d = DV[U[uid].dv], vong = 0;
  while (d && vong++ < 12){
    if (d.truong && d.truong !== uid) return d.truong;
    d = d.cha ? DV[d.cha] : null;
  }
  return null;                             /* người này đứng ở đỉnh cây */
}
/* Người duyệt = trưởng đơn vị trực tiếp của người thực hiện.
   Bản trước rơi về t.giao khi không suy được, và đó là lỗi thẩm quyền: Kế toán thuế giao
   một việc cho Chủ tịch HĐQT thì chính Kế toán thuế thành người nghiệm thu và chấm điểm.
   Nay chỉ chấp nhận người giao làm người duyệt khi người giao ở cấp cao hơn hoặc ngang
   người thực hiện. Không ai đủ thẩm quyền thì trả null và phiếu nói thẳng ra điều đó,
   thay vì âm thầm trao quyền cho người sai. */
function nguoiDuyet(t){
  if (t.duyet) return t.duyet;
  const tr = truongTrucTiep(t.lam);
  if (tr) return tr;
  /* Người giao chỉ được làm người duyệt khi ở cấp CAO HƠN HẲN người thực hiện.
     Cho phép bằng cấp thì Tổng Giám đốc giao việc cho CEO sẽ tự thành người nghiệm thu
     việc của CEO — hai người cùng cấp 1 nghiệm thu lẫn nhau, tuyến duyệt thành vòng tròn. */
  if (t.giao && t.giao !== t.lam && capViec(t.giao) < capViec(t.lam)) return t.giao;
  return null;
}
function canDuyetNgay(t){
  return (t.tt==="CHO_DUYET"   && laViecToiDuyet(t))
      || (t.tt==="CHO_DUYET_2" && laViecToiDuyet2(t));
}
function laVuotCap(t){ const nd = nguoiDuyet(t); return t.giao !== nd && t.giao !== t.lam; }
function canThemTangDuyet(t){ return chuoiDuyetThem(t).length > 0; }
/* Tầng duyệt thứ hai: cấp trên trực tiếp của người duyệt thứ nhất.
   Tầng 2 chỉ xác nhận về mặt GIÁ TRỊ, không chấm điểm lại — điểm do người duyệt
   thứ nhất chấm vì họ mới là người biết việc làm tốt hay không. */
function nguoiDuyet2(t){
  const c = t.chuoi || chuoiDuyetThem(t);
  return c.length ? c[Math.min(t.ci || 0, c.length - 1)] : null;
}
function laViecToiDuyet2(t){
  const c = t.chuoi || []; return c.length ? c[t.ci || 0] === me : false;
}
/* ===== ĐỘ ƯU TIÊN — MA TRẬN ẢNH HƯỞNG × KHẨN CẤP KIỂU ITIL =====
   Bỏ công thức năm thành phần có trọng số của bản thiết kế cũ. Lý do trong Tập 3:
   WSJF và RICE sinh ra để so ít hạng mục lớn theo quý, RICE còn đo công sức bằng
   người-tháng. Ma trận 5×5 ra bốn mức thì giải thích được cho kế toán và kho trong
   một câu, và không phải hộp đen. */
const AH = {5:"Ảnh hưởng cả công ty", 4:"Ảnh hưởng cả phòng", 3:"Ảnh hưởng một tổ",
            2:"Ảnh hưởng vài người", 1:"Chỉ mình người làm"};
const KC = {5:"Phải xử lý ngay hôm nay", 4:"Trong 2–3 ngày", 3:"Trong tuần",
            2:"Trong tháng", 1:"Không gấp"};
const UT = {1:["P1","Rất cao","r"], 2:["P2","Cao","a"], 3:["P3","Trung bình",""], 4:["P4","Thấp","m"]};

function mucUuTien(diem){ return diem >= 20 ? 1 : diem >= 12 ? 2 : diem >= 6 ? 3 : 4; }
/* Việc con chưa xong thì đang CHẶN việc cha đóng — đây là quan hệ chặn thật duy nhất
   trong mô hình hiện tại, không phải suy diễn. */
/* Chặn thật = có việc KHÁC khai là phải đợi việc này xong.
   Bản trước coi "có việc cha chưa xong" là đang chặn — điều kiện đó đúng với MỌI việc con,
   nên 8/21 việc bị nâng bậc và cột ưu tiên mất khả năng phân biệt: một việc hạn còn sáu
   tháng đứng ngang P1 với việc hạn bốn ngày. */
function dangChan(t){
  if (t.tt === "HOAN_THANH") return false;
  /* Chặn THẬT = có việc khác phải đợi việc này, VÀ việc bị chặn đang chịu sức ép thời gian
     (đã tới hoặc quá ngày phải bắt đầu, hoặc hạn của nó còn dưới 30 ngày).
     Chặn một việc mà chính nó còn sáu tháng thì không phải lý do nâng bậc — bản đầu tiên
     coi "có việc cha chưa xong" là chặn nên 8/21 việc bị nâng và cột ưu tiên mất tác dụng;
     bản thứ hai bỏ điều kiện thời gian nên vẫn nâng nhầm việc hạn còn 187 ngày. */
  return T.some(x => x.id !== t.id && (x.truoc||[]).includes(t.id) && viecMo(x)
                  && (days(x.bd) <= 7 || days(x.han) <= 30));
}
/* Còn dưới 20% thời gian được cấp thì nâng một bậc, tối đa P1. */
function sapHetGio(t){
  if (t.tt === "HOAN_THANH") return false;
  const tong = Math.max(1, Math.round((d2(parse(t.han)) - d2(parse(t.bd))) / D1));
  const conLai = Math.round((d2(parse(t.han)) - d2(TODAY)) / D1);
  return conLai / tong < 0.2;
}
function uuTien(t){
  const ah = t.ah || 3, kc = t.kc || 3;
  let m = mucUuTien(ah * kc);
  const ly = [];
  if (dangChan(t))   { m = Math.max(1, m - 1); ly.push("đang chặn việc khác khởi động"); }
  if (sapHetGio(t))  { m = Math.max(1, m - 1); ly.push("còn dưới 20% thời gian"); }
  return {muc:m, diem:ah*kc, ah, kc, ly};
}
/* ===== NĂM QUY TẮC CẢNH BÁO NGUY CƠ TRỄ =====
   Quy tắc rõ ràng, KHÔNG học máy. Trong bảy sản phẩm hàng đầu chỉ Wrike công khai
   dùng mô hình thật; nhãn "AI" của Asana, Monday, ClickUp không có tài liệu kỹ thuật
   nào chứng minh. Với 45 người, dữ liệu quá ít để huấn luyện có ý nghĩa — và quy tắc
   thì giải thích được cho kế toán và pháp chế. */

/* =====================================================================
   BỘ ĐẾM CHUẨN — một khái niệm định nghĩa đúng một chỗ

   Trước đây mỗi màn hình tự viết lại điều kiện, nên cùng một dữ liệu cho ra
   những con số chỏi nhau ngay cạnh nhau: một người hiện "5 việc mở · 6 khẩn",
   một dự án hiện 4 / 5 / 6 việc ở ba chỗ, một tuần hiện tải 6,1 ở Điều hành
   và 1,1 ở Theo dõi. Không màn hình nào sai riêng — chúng đếm những tập khác
   nhau dưới cùng một cái nhãn. Mọi chỗ nay gọi qua đây.
   ===================================================================== */
function viecMo(t){ return t.tt !== "HOAN_THANH"; }
/* =====================================================================
   CÓ Ý KIẾN VÀ ĐỒNG HỒ TẠM DỪNG  (khoảng trống B6)

   Người bị giao một việc bất khả thi mà không có đường nói lại thì sẽ im lặng rồi
   trễ hạn — cả hai bên cùng thiệt và phần mềm ghi nhận sai nguyên nhân. Ba loại ý
   kiến vì ba loại nguyên nhân khác nhau, và người giao phải trả lời bằng ba hành
   động khác nhau. Trộn làm một thì lại quay về nút "xin lùi hạn" cho mọi tình huống.

   Trong lúc chờ trả lời, ĐỒNG HỒ TRỄ HẠN DỪNG. Nếu không dừng thì người nêu ý kiến
   vẫn bị tính trễ trong thời gian chờ chính cấp trên của mình — và lần sau họ sẽ
   không nêu nữa. Số ngày đã dừng được cộng dồn vào t.dungNgay để hạn thực tế lùi
   theo, chứ hạn cam kết trên phiếu vẫn giữ nguyên cho việc chấm điểm. */
const Y_KIEN = {
  HAN:      ["Hạn không khả thi",  "Khối lượng lớn hơn thời gian được cấp"],
  NGUONLUC: ["Thiếu nguồn lực",    "Thiếu người, thiếu số liệu hoặc thiếu công cụ để làm"],
  NGUOI:    ["Không đúng người",   "Việc này thuộc chuyên môn hoặc thẩm quyền của người khác"],
};
function dangDung(t){
  if (!t) return false;
  if (t.yKien) return true;                                   /* có ý kiến chưa trả lời */
  const o = t.ttRieng ? TT_RIENG.find(x => x.ma === t.ttRieng) : null;
  return !!(o && o.dung);                                     /* trạng thái riêng loại chờ bên ngoài */
}
function lyDoDung(t){
  if (!t) return null;
  if (t.yKien) return `${U[t.yKien.boi]?U[t.yKien.boi].ten:"Người thực hiện"} nêu ${Y_KIEN[t.yKien.loai][0].toLowerCase()}, chưa ai trả lời`;
  const o = t.ttRieng ? TT_RIENG.find(x => x.ma === t.ttRieng) : null;
  return o && o.dung ? `${o.ten} — ${o.gt}` : null;
}
function ngayDaDung(t){
  /* Đồng hồ dừng vì hai lý do, mỗi lý do có mốc bắt đầu riêng:
       · ý kiến chưa trả lời      → tính từ ngày nêu ý kiến
       · trạng thái riêng chờ ngoài → phiếu không ghi ngày chuyển trạng thái, nên
         không cộng thêm ngày; chỉ dừng đồng hồ từ lúc này trở đi.
     Bản trước đọc thẳng t.yKien.ngay nên khi dừng vì trạng thái riêng thì vỡ. */
  let n = t.dungNgay || 0;
  if (t.yKien && t.yKien.ngay) n += Math.max(0, dCong(parse(t.yKien.ngay), TODAY));
  return n;
}
/* Hạn thực tế = hạn cam kết cộng số ngày đồng hồ đã dừng. Hạn cam kết không đổi. */
function hanThuc(t){
  const n = ngayDaDung(t); if (!n) return parse(t.han);
  const d = parse(t.han); d.setDate(d.getDate() + n); return d;
}
function conLai(t){ return dCong(TODAY, hanThuc(t)); }
function quaHan(t){ return viecMo(t) && !dangDung(t) && conLai(t) < 0; }
/* Việc cần can thiệp = việc mở có ít nhất một cảnh báo của ruiRo().
   Trước đây bốn màn hình có bốn định nghĩa khác nhau nên cùng một dự án hiện
   1 việc cần can thiệp ở Tổng quan, 0 ở Điều hành, 0 ở Bảng và không nhãn nào ở thẻ.
   Nay chỉ còn một định nghĩa; muốn đổi thì sửa ruiRo(). */
function canCanThiep(t){ return viecMo(t) && ruiRo(t).length > 0; }
function viecCua(uid){ return T.filter(t => t.lam === uid && xemDuoc(t)); }
function soViecMo(uid){ return viecCua(uid).filter(t => viecMo(t) && laLa(t)).length; }
function ruiRo(t){
  if (t.tt === "HOAN_THANH") return [];
  const r = [];
  /* Đồng hồ dừng vì hai lý do khác nhau — nói đúng lý do, đừng mặc định là ý kiến.
     Trước đây một việc dừng vì "Chờ số liệu kế toán" vẫn hiện "chờ ... trả lời ý kiến". */
  if (dangDung(t)) return [["a2", t.yKien
    ? `Đồng hồ đang dừng ${ngayDaDung(t)} ngày — chờ ${U[t.giao]?U[t.giao].ten:"người giao"} trả lời ý kiến`
    : `Đồng hồ đang dừng — ${lyDoDung(t) || "đang chờ bên ngoài"}`]];
  if (quaHan(t)) r.push(["r2", `Đã quá hạn ${-conLai(t)} ngày`]);
  else if (sapHetGio(t) && pct(t) < 50)
    r.push(["r2", `Còn dưới 20% thời gian mà mới đạt ${pct(t)}% tiêu chí`]);
  if (!t.lam) r.push(["r2", "Chưa có người thực hiện"]);
  if (t.tt === "MOI" && days(t.bd) < -2)
    r.push(["a2", `Đã qua ngày bắt đầu ${-days(t.bd)} ngày mà chưa ai nhận việc`]);
  const n = t.lam ? soViecMo(t.lam) : 0;
  if (n > WIP_TRAN)
    r.push(["a2", `${U[t.lam]?U[t.lam].ten:"Người thực hiện"} đang mở ${n} việc cùng lúc, vượt ngưỡng ${WIP_TRAN}`]);
  if (t.sk === "TRE") r.push(["a2", "Người thực hiện tự báo đang trễ"]);
  if (t.sk === "RR")  r.push(["a2", "Người thực hiện tự báo có rủi ro"]);
  return r;
}
function ruiRoHTML(t){
  const r = ruiRo(t); if (!r.length) return "";
  const nang = r.some(x => x[0] === "r2");
  return `<span class="tag ${nang?"r":"a"}" title="${r.map(x=>x[1]).join(" · ")}">⚠ ${r.length}</span>`;
}

/* ===== VAI CỦA TÔI TRONG MỘT VIỆC — theo đúng bốn vai RACI ===== */
const VAI_TEN = {
  R:["R","Tôi làm",      "Tôi chịu trách nhiệm về kết quả", ""],
  A:["A","Tôi duyệt",    "Tôi nghiệm thu và chấm điểm",     "a"],
  C:["C","Tôi phối hợp", "Tôi hỗ trợ, không chấm điểm",     "g"],
  I:["I","Tôi theo dõi", "Tôi chỉ cần biết, không phải làm","m"],
};
function vaiCuaToi(t){
  const r = raci(t);
  if (r.R.includes(me)) return "R";
  if (r.A.includes(me)) return "A";
  if (r.C.includes(me)) return "C";
  if (r.I.includes(me)) return "I";
  return null;
}
function vaiHTML(t){
  const v = vaiCuaToi(t); if (!v) return "";
  const x = VAI_TEN[v];
  return `<span class="tag ${x[3]}" title="${x[2]}">${x[0]} · ${x[1]}</span>`;
}

function utHTML(t, nho){
  const u = uuTien(t), v = UT[u.muc];
  return `<span class="tag ${v[2]}" title="Ảnh hưởng ${u.ah} × Khẩn cấp ${u.kc} = ${u.diem} điểm${u.ly.length?" · nâng bậc vì "+u.ly.join(" và "):""}">${v[0]}${nho?"":" · "+v[1]}</span>`;
}

/* ===== CẤP CỦA VIỆC — suy từ cấp tổ chức của người thực hiện, không hỏi người dùng ===== */
const CAP_TEN = {1:"Cấp công ty", 2:"Cấp phòng", 3:"Cấp tổ", 4:"Cấp cá nhân"};
/* Cấp suy từ ĐỘ SÂU của đơn vị mà người đó làm trưởng, không đọc trường vai.
   Bản trước đọc u.vai nhưng không ai trong U mang vai TRUONG_PHONG, nên cấp 2 không bao
   giờ trả về — đúng thứ mà chú thích cũ đã hứa là suy từ cây nhưng không làm. */
function sauDV(ma){ let n = 0, d = DV[ma]; while (d && d.cha && n < 12){ d = DV[d.cha]; n++; } return n; }
/* Ban Giám đốc và các vị trí tham mưu trực thuộc Công ty không làm trưởng đơn vị nào,
   nhưng không thể là cấp 4: Phó Tổng Giám đốc từng bị xếp "Chuyên viên" và mất cả tab
   Giao việc lẫn Điều hành, trong khi dữ liệu có việc do chính bà giao. */
const CAP_TAY = {F001:1, F003:1, F002:1, F005:1, F004:2, F006:3, F007:3};
const CHUC_VU = {
  HDQT: {ten:"Hội đồng quản trị", cap:1, mo:"Thành viên HĐQT — xem toàn công ty, không trực tiếp điều hành"},
  BGD:  {ten:"Ban Giám đốc",      cap:1, mo:"Điều hành toàn công ty, xem mọi đơn vị"},
  TP:   {ten:"Trưởng phòng",      cap:2, mo:"Phụ trách một phòng và các tổ trực thuộc"},
  PP:   {ten:"Phó phòng",         cap:2, mo:"Tầm nhìn như trưởng phòng, nhưng chỉ nghiệm thu khi được giao ô trưởng đơn vị"},
  TT:   {ten:"Tổ trưởng",         cap:3, mo:"Phụ trách một tổ trực thuộc phòng"},
  NV:   {ten:"Nhân viên",         cap:4, mo:"Thực hiện việc được giao và tự khai việc của mình"},
};
const CV_THU = ["HDQT","BGD","TP","PP","TT","NV"];
/* Cấp suy theo thứ tự ưu tiên: chức vụ đã khai → bảng đè tay cũ → độ sâu trong cây.
   Chức vụ đứng trước vì nó là thứ người quản trị khai có chủ đích; độ sâu cây chỉ là
   suy diễn, và nó không phân biệt nổi trưởng phòng với phó phòng. */
function capViec(uid){
  if (!uid || !U[uid]) return 4;
  const cv = U[uid].vt;
  if (cv && CHUC_VU[cv]) return CHUC_VU[cv].cap;
  if (CAP_TAY[uid]) return CAP_TAY[uid];
  let sauNhoNhat = null;
  Object.entries(DV).forEach(([ma, d]) => {
    if (d.truong !== uid) return;
    const k = sauDV(ma);
    if (sauNhoNhat === null || k < sauNhoNhat) sauNhoNhat = k;
  });
  if (sauNhoNhat === null) return 4;       /* không làm trưởng đơn vị nào */
  return Math.max(1, Math.min(4, sauNhoNhat));
}
/* ===== CÂY VIỆC ===== */
function conCua(id){ return T.filter(x => x.cha === id); }
/* Việc lá = không có việc con. Trước đây khai hai lần ở hai chỗ với hai cách viết
   tương đương — bản sau đè bản trước im lặng, đúng loại lỗi khó tìm nhất. */
function laLa(t){ return conCua(t.id).length === 0; }
/* Tiến độ lá: suy từ tiêu chí đã tích. Tiến độ cha: trung bình CÓ TRỌNG SỐ theo độ khó.
   Không dùng trung bình cộng — ví dụ trong tài liệu cho thấy nó sai gấp đôi. */
function tienDoLa(t){
  if (t.tt === "HOAN_THANH") return 100;
  if (t.tt === "CHO_DUYET" || t.tt === "CHO_DUYET_2") return 90;
  if (t.tt === "MOI") return 0;
  return Math.round(pct(t) * 0.9);        /* trần 90 — chỉ người duyệt mới đẩy lên 100 */
}
/* Tiến độ việc cha = trung bình có trọng số độ khó, tính TRÊN TOÀN BỘ VIỆC LÁ của nhánh.
   Bản trước gộp đệ quy theo từng tầng, tức chuẩn hoá lại trọng số ở mỗi tầng, làm mất
   sức nặng của nhánh nhiều việc: một cây có nhánh 8 điểm chưa làm và hai việc 1 điểm đã
   xong cho ra 56% thay vì 20%. Gộp thẳng trên việc lá thì trọng số giữ nguyên tỷ lệ thật.
   Độ khó thiếu hoặc bằng 0 được coi là 1, nếu không cả nhánh sẽ báo 0% dù con đã xong hết. */
function tienDo(t){
  const la = caCay(t.id).filter(x => !conCua(x.id).length);
  if (!la.length || (la.length === 1 && la[0].id === t.id)) return tienDoLa(t);
  const w = c => Math.max(1, Number(c.dk) || 0);
  const ts = la.reduce((a,c)=>a + w(c), 0);
  return ts ? Math.round(la.reduce((a,c)=>a + w(c) * tienDoLa(c), 0) / ts) : 0;
}
function toTien(t){                       /* chuỗi đường dẫn từ gốc xuống */
  const r = []; let x = t, vong = 0;
  while (x && x.cha && vong++ < 12){ x = find(x.cha); if (x) r.unshift(x); }
  return r;
}
function suckhoeXau(t){                   /* con nào đang trễ thì cha biết */
  return conCua(t.id).some(c => c.sk === "TRE" || suckhoeXau(c));
}

/* ===== ĐƯỜNG GĂNG (CPM) — CHỈ QUAN HỆ "XONG A MỚI BẮT ĐẦU B" =====
   Tập 3 kết luận: đủ bốn loại quan hệ và ràng buộc cứng kiểu Microsoft Project tốn
   35–45 giờ công mà quan hệ xong-mới-bắt-đầu đã giải quyết trên 90% ca thực tế.
   Nên chỉ làm loại này. Độ phức tạp tuyến tính theo số việc và số quan hệ.
      ES = max(EF của các việc trước)      EF = ES + thời lượng
      LF = min(LS của các việc sau)        LS = LF − thời lượng
      Dự trữ toàn phần = LS − ES.  Dự trữ = 0 thì việc nằm trên đường găng.        */
function caCay(id){                       /* toàn bộ việc trong một dự án, kể cả việc cha */
  const out = [];
  (function di(x){ out.push(x); conCua(x.id).forEach(di); })(find(id));
  return out;
}
function cpm(gocId){
  const all = caCay(gocId);
  const la  = all.filter(t => !conCua(t.id).length);
  /* việc trước là việc cha thì hiểu là "sau khi mọi việc con của nó xong" */
  const noRong = ids => (ids||[]).flatMap(x => {
    const t2 = find(x); if (!t2) return [];
    return conCua(x).length ? caCay(x).filter(y => !conCua(y.id).length).map(y=>y.id) : [x];
  }).filter(x => la.some(y => y.id === x));
  /* Ràng buộc trỏ tới việc không tồn tại hoặc thuộc dự án khác bị loại khỏi phép tính.
     Trước đây loại im lặng trong khi cột "Việc trước" vẫn in mã đó ra, nên người dùng
     tưởng ràng buộc có hiệu lực còn dự trữ và đường găng thì tính như không có nó. */
  const boQua = [];
  const idx = {}; la.forEach(t => {
    const tr = noRong(t.truoc);
    (t.truoc||[]).forEach(x => { if (!tr.includes(x) && !caCay(gocId).some(y=>y.id===x)) boQua.push({t, x}); });
    idx[t.id] = {t, dur: Math.max(0.5, ngayCong(t.bd, t.han)), truoc: tr};
  });
  /* sắp thứ tự tô-pô kiểu Kahn */
  const bac = {}, sau = {};
  la.forEach(t => { bac[t.id] = idx[t.id].truoc.length; sau[t.id] = []; });
  la.forEach(t => idx[t.id].truoc.forEach(pz => sau[pz].push(t.id)));
  const q = la.filter(t => !bac[t.id]).map(t => t.id), thuTu = [];
  while (q.length){ const u = q.shift(); thuTu.push(u); sau[u].forEach(v => { if (--bac[v] === 0) q.push(v); }); }
  if (thuTu.length < la.length) return null;          /* có vòng — không tính được */
  /* lượt xuôi */
  const R = {};
  thuTu.forEach(id => { const n = idx[id];
    R[id] = {ES: n.truoc.length ? Math.max(...n.truoc.map(pz => R[pz].EF)) : 0, dur: n.dur};
    R[id].EF = R[id].ES + n.dur; });
  const het = Math.max(...thuTu.map(id => R[id].EF));
  /* lượt ngược */
  [...thuTu].reverse().forEach(id => {
    const ke = sau[id];
    R[id].LF = ke.length ? Math.min(...ke.map(v => R[v].LS)) : het;
    R[id].LS = R[id].LF - R[id].dur;
    R[id].DT = R[id].LS - R[id].ES;
    R[id].gang = R[id].DT === 0;
  });
  /* việc cha: gộp từ việc con */
  all.filter(t => conCua(t.id).length).forEach(t => {
    const con = caCay(t.id).filter(x => x.id !== t.id && !conCua(x.id).length && R[x.id]);
    if (!con.length) return;
    R[t.id] = {ES: Math.min(...con.map(c=>R[c.id].ES)), EF: Math.max(...con.map(c=>R[c.id].EF)),
               DT: Math.min(...con.map(c=>R[c.id].DT)), tong:true};
    /* Thời lượng hiển thị của việc cha lấy theo LỊCH CỦA CHÍNH NÓ, không lấy EF−ES.
       EF−ES là độ dài chuỗi việc nối tiếp nhau; khi lịch cho vài việc chạy song song
       trong lúc đã khai việc nọ phải xong trước việc kia thì hai số này lệch nhau, và
       hàng việc cha sẽ tự mâu thuẫn với đúng hai cột ngày in ngay bên cạnh nó.
       Chênh lệch đó không bị giấu đi: nó là phát hiện "lịch tự mâu thuẫn" ở tab Tổng quan. */
    R[t.id].dur = ngayCong(t.bd, t.han);
    R[t.id].chuoi = R[t.id].EF - R[t.id].ES;
    R[t.id].gang = R[t.id].DT === 0;
  });
  return {R, het, all, boQua};
}
/* mã phân rã công việc kiểu 1, 1.1, 1.1.2 */
function wbs(gocId){
  const m = {};
  (function di(x, pre){
    m[x.id] = pre;
    conCua(x.id).sort((a2,b2)=>parse(a2.bd)-parse(b2.bd))
      .forEach((c,i) => di(c, pre + "." + (i+1)));
  })(find(gocId), "1");
  return m;
}
/* cộng n ngày công vào một mốc, thứ Bảy tính nửa ngày */
/* Ngày rơi vào sau tuNgay đúng n ngày công. n = 0 trả về chính ngày đó.
   Đây là phép DỜI, không phải phép đảo của ngayCong (ngayCong tính bao gồm hai đầu). */
function themNgayCong(tuNgay, n){
  const d = new Date(parse(tuNgay));
  let con = Number(n) || 0, vong = 0;
  if (con <= 0) return d;
  while (con > 0 && vong++ < 4000){
    d.setDate(d.getDate()+1);
    con -= congCuaNgay(d);
  }
  return d;
}

/* nhịp báo cáo tiến độ suy từ độ khó — mục 3.5.2 */
function nhipBaoCao(dk){
  if (dk <= 2) return "Không yêu cầu báo cáo giữa chừng";
  if (dk === 3) return "Báo cáo tiến độ một lần ở giữa kỳ";
  return "Báo cáo tiến độ mỗi tuần";
}
/* Ngày công theo lịch Forever, chốt 16/8: thứ Hai đến thứ Sáu tính 1 ngày,
   THỨ BẢY TÍNH 0,5 NGÀY, Chủ nhật nghỉ. Chưa trừ ngày nghỉ lễ — còn thiếu bảng lịch lễ. */
/* Số ngày công của một việc, TÍNH CẢ NGÀY BẮT ĐẦU và ngày hạn.
   Bản trước tăng ngày rồi mới cộng nên bỏ mất ngày đầu: việc làm trong ngày ra 0 ngày,
   việc trọn tuần thứ Hai đến thứ Sáu ra 4 thay vì 5. Sai này lan ra mọi ô "Thời lượng",
   mọi phép tính tải, và cả đường găng. */
function ngayCong(bd, han){
  let d = parse(bd); const h = parse(han);
  if (d > h) return 0;                     /* hạn trước ngày bắt đầu: dữ liệu hỏng, trả 0 */
  let n = 0;
  for (; d <= h; d.setDate(d.getDate()+1)) n += congCuaNgay(d);
  return n;
}
function ngayCongTxt(bd, han){
  const n = ngayCong(bd, han);
  return (Number.isInteger(n) ? n : n.toFixed(1).replace(".", ",")) + " ngày công";
}
const MAT_TEN = {CONG_KHAI:"Công khai", NOI_BO:"Nội bộ", HAN_CHE:"Hạn chế"};
const LOAI_TEN = {CONG_VIEC:"Công việc", DU_AN:"Dự án", CHU_KY:"Chu kỳ", DOT_XUAT:"Đột xuất"};
const SK_TEN = {BT:["Bình thường","g"], RR:["Có rủi ro","a"], TRE:["Đang trễ","r"]};
/* việc mức Hạn chế: chỉ người giao, người thực hiện, người duyệt, người phối hợp mới thấy */
function xemDuoc(t){
  if (t.mat !== "HAN_CHE") return true;
  /* Người duyệt tầng 2 (khoản chi vượt ngưỡng) và người theo dõi cũng phải xem được:
     trước đây một khoản chi 1,9 tỷ bắt buộc CFO và TGĐ ký lại không hiện trong hộp việc
     của họ và họ không mở nổi phiếu. Người mang vai I cũng bị chặn dù raci() đã xếp vai. */
  if ([t.giao, t.lam, nguoiDuyet(t), ...(t.phoihop||[]), ...(t.theodoi||[]),
       ...(chuoiDuyetThem(t)||[])].includes(me)) return true;
  /* Người chủ trì việc CHA phải xem được việc con, nếu không thì không theo dõi nổi
     dự án của chính mình. Đây là lỗ hổng lộ ra khi dựng cây việc — quyền theo nhánh
     VIỆC vẫn áp dụng, chỉ quyền theo nhánh TỔ CHỨC là không. */
  let x = t, vong = 0;
  while (x && x.cha && vong++ < 12){
    x = find(x.cha); if (!x) break;
    if ([x.giao, x.lam, nguoiDuyet(x)].includes(me)) return true;
  }
  return false;
}
function laViecCuaToi(t){ return t.lam === me; }
function laViecToiDuyet(t){ return nguoiDuyet(t) === me && t.lam !== me; }
/* Cấp dưới trực tiếp: suy từ cây tổ chức, không viết cứng.
   Gồm người trong đơn vị mình làm trưởng, cộng trưởng của các đơn vị con. */
/* Cả nhánh dưới quyền, không chỉ cấp dưới trực tiếp — điều hành phải nhìn hết nhánh. */
function doiCuaToi(){
  const out = new Set(), q = [...capDuoi()];
  while (q.length){ const u = q.shift(); if (out.has(u)) continue; out.add(u);
    const o = me; me = u; capDuoi().forEach(x => q.push(x)); me = o; }
  return [...out];
}
/* Số việc đang nằm chờ chính tôi xử lý — dùng cho huy hiệu trên thanh điều hướng. */
function canToiXuLy(){ return dangChanBoi().length; }
function dangChanBoi(){
  const r = [];
  T.filter(xemDuoc).forEach(t => {
    if (canDuyetNgay(t)) r.push({t, loai:"duyet"});
    else if (t.yKien && (t.giao === me || nguoiDuyet(t) === me)) r.push({t, loai:"ykien"});
    else if ((t.dexuat||[]).length && t.giao === me) r.push({t, loai:"dexuat"});

  });
  return r;
}
/* Gợi ý can thiệp: mỗi loại rủi ro một hành động cụ thể, không nói chung chung. */
function goiYCanThiep(t){
  if (quaHan(t)) return "Hỏi lý do rồi chốt hạn mới — để trễ im lặng là mất kiểm soát";
  if (sapHetGio(t) && pct(t) < 50) return "Cắt bớt phạm vi hoặc thêm người, đừng chờ tới hạn mới biết";
  if (t.tt === "MOI" && days(t.bd) < -2) return "Nhắc nhận việc, hoặc đổi người nếu họ đang kẹt việc khác";
  if (t.lam && soViecMo(t.lam) > WIP_TRAN) return `Chuyển bớt việc của ${U[t.lam].ten} sang người rảnh hơn`;
  if (t.sk === "TRE") return "Người chủ trì đã tự báo trễ — hỏi họ cần gì để gỡ";
  return "Theo dõi thêm, chưa cần can thiệp";
}
/* Tải một tuần = tổng độ khó của các việc lá, chia đều theo NGÀY CÔNG rồi lấy phần
   rơi vào tuần này. Bản trước chia theo ngày lịch và cửa sổ tuần gồm cả Chủ nhật,
   nên một việc đặt trọn thứ Bảy và Chủ nhật vẫn dồn đủ điểm vào tuần và báo quá tải. */
function taiTuanNay(uid){
  let t0 = new Date(TODAY); while (t0.getDay() !== 1) t0.setDate(t0.getDate()-1);
  const we = new Date(t0); we.setDate(we.getDate()+5);      /* thứ Hai → thứ Bảy, Chủ nhật nghỉ */
  const lo = fmtNgay(t0), hi = fmtNgay(we);
  let tong = 0;
  viecCua(uid).filter(t => viecMo(t) && laLa(t)).forEach(t => {
    const tongNC = ngayCong(t.bd, t.han);
    if (!tongNC) return;
    const a = parse(t.bd) > t0 ? t.bd : lo;
    const b = parse(t.han) < we ? t.han : hi;
    if (parse(a) > parse(b)) return;
    tong += (Number(t.dk)||1) * ngayCong(a, b) / tongNC;
  });
  return Math.round(tong*10)/10;
}

function capDuoi(){
  const out = new Set();
  /* Người thuộc Ban Giám đốc có thể không làm trưởng đơn vị nào (Phó Tổng Giám đốc,
     Kiểm soát tài chính, trợ lý). Trước đây họ trả về rỗng nên mất cả tab Giao việc,
     Điều hành và Đánh giá — trong khi dữ liệu có việc do chính họ giao.
     Không làm trưởng chỗ nào thì phạm vi lấy theo đơn vị mình đang thuộc. */
  const laTruong = Object.values(DV).some(d => d.truong === me);
  /* Người không làm trưởng đơn vị nào thì lấy đơn vị mình đang thuộc làm phạm vi.
     Nhưng phải chặn đúng một trường hợp, nếu không là lỗ hổng: người CẤP 2 ngồi thẳng
     dưới gốc CTY mà không giữ đơn vị nào sẽ lấy luôn cả công ty làm phạm vi — rộng hơn
     cả một Trưởng phòng thật. Màn Phân quyền đo ra: Kiểm soát tài chính (cấp 2, thuộc CTY)
     thấy 81/88 việc trong khi Trưởng phòng thật chỉ thấy 22.
     Cấp 1 giữ nguyên vì họ vốn đã có quyền xem toàn công ty, không nới thêm gì. */
  const goc = U[me] && (U[me].dv === "CTY" || U[me].dv === "HDQT");
  const pham = laTruong ? null
    : capViec(me) === 1 ? U[me].dv
    : (capViec(me) === 2 && !goc) ? U[me].dv : null;
  Object.entries(DV).forEach(([ma, d]) => {
    if (d.truong !== me && ma !== pham) return;
    Object.values(U).forEach(u => { if (u.dv === ma && u.id !== me) out.add(u.id); });
    Object.values(DV).forEach(c => { if (c.cha === ma && c.truong && c.truong !== me) out.add(c.truong); });
  });
  return [...out];
}

/* =====================  KHUNG  ===================== */
let TAB = "toi";
function tabs(){
  const cd = capDuoi().length;
  /* Huy hiệu phải bằng đúng con số trang đó in ra. Trước đây huy hiệu đếm laViecCuaToi
     (chỉ việc mình thực hiện) còn trang đếm vaiCuaToi (cả bốn vai RACI): tab ghi 3, trang ghi 16. */
  /* Thứ tự đi theo NHỊP LÀM VIỆC, không theo thứ tự viết mã:
       Việc của tôi  — việc có tên tôi, tôi tự tay xử lý
       Dự án         — vật chứa: việc của tôi nằm trong dự án nào
       Việc lặp      — bộ sinh việc: việc tuần sau từ đâu ra
       Điều hành     — việc của người khác đang chờ tôi gỡ
       Theo dõi      — tra cứu toàn cảnh, mọi việc trong tầm nhìn
       Giao ban      — số liệu kỳ để họp và ra quyết định
       Cá nhân       — con người, không phải việc
       Thiết lập     — chỉnh hệ thống
       Đã xong       — lưu trữ, tra lại việc đã đóng
     Bốn mục đầu là việc hằng ngày; bốn mục sau là nhìn lại và chỉnh. */
  const list = [["toi","Việc của tôi", T.filter(t=>viecMo(t) && xemDuoc(t) && vaiCuaToi(t)).length]];
  list.push(["da","Dự án", 0]);
  /* Biểu mẫu giao việc không còn là một tab: nó là cửa sổ nổi, mở từ Việc của tôi,
     Theo dõi hoặc từ trong một dự án. Chỉ SỔ VIỆC LẶP còn là một cửa sổ riêng,
     vì nó là bộ sinh việc chứ không phải một biểu mẫu. */
  if (cd) list.push(["lap","Việc lặp", T.filter(t => xemDuoc(t) && laCK(t) && !t.tuQuyTac && !t.tam).length]);
  if (cd) list.push(["dh","Điều hành", canToiXuLy()]);
  list.push(["cong","Theo dõi", 0]);
  if (cd) list.push(["bc","Giao ban", 0]);
  if (cd && coQuyen(me,"bao_cao_ns")) list.push(["ns","Cá nhân", 0]);
  /* Cụm quản trị gom vào MỘT mục thay vì kéo dài thanh điều hướng. Chỉ cấp 1 và 2 thấy —
     chuyên viên không có việc gì ở đây, hiện ra chỉ làm rối. */
  if (coQuyen(me,"vao_quan_tri")) list.push(["qt","Thiết lập", 0]);
  list.push(["xong","Đã xong", 0]);
  return list;
}
function drawNav(){
  $("#nav").innerHTML = tabs().map(([k,n,c]) =>
    `<button class="${TAB===k?"on":""}" onclick="go('${k}')">${n}${c?`<span class="pip">${c}</span>`:""}</button>`).join("");
  const u = U[me];
  $("#who").innerHTML = `${avHTML(me,28)}<span class="nm">${u.ten}<i>${u.cd}</i></span>`;
  $("#menu").innerHTML =
    `<div class="hd">Xem với vai</div>` +
    ORDER.map(id=>`<button class="it ${id===me?"on":""}" onclick="doiVai('${id}')">
        ${avHTML(id,30)}<span>${U[id].ten}<i>${U[id].cd}</i></span></button>`).join("") +
    `<div class="hd">Ảnh đại diện</div>
     <div class="ft">
       <button class="btn sm" onclick="chonAnh()">Đổi ảnh của ${esc(U[me].ten)}</button>
       ${U[me].anh?`<button class="btn sm" onclick="xoaAnh()">Bỏ ảnh, về chấm chữ</button>`:""}
     </div>`;
  const n = NT.filter(x=>x.to===me && x.un).length;
  $("#bellN").style.display = n ? "block" : "none";
  $("#bellN").textContent = n;
}
function go(k){ TAB=k; draw(); }

/* =====================  VẼ  ===================== */
/* ---------- DỮ LIỆU BỐI CẢNH NGÀNH ----------
   Không có số nội bộ tương ứng. Dùng để giải thích môi trường, KHÔNG để chấm điểm.
   Hai dòng đầu là số công bố thật, có đường dẫn kiểm chứng được. */
let BOI_CANH = [
  {ma:"XNK", ten:"Kim ngạch xuất nhập khẩu cả nước", gt:"659,58 tỷ USD", phu:"+28,1% so với cùng kỳ",
   ky:"7 tháng đầu 2026", loai:"CONG_BO", nguon:"Tổng cục Thống kê, dẫn qua VietnamPlus",
   url:"https://www.vietnamplus.vn/7-thang-nam-2026-tong-kim-ngach-xuat-nhap-khau-hang-hoa-tang-281-post1128008.vnp",
   ngay:"04/08/2026", chieu:"tot",
   y:"Xuất khẩu +21,7%, nhập khẩu +34,8%, nhập siêu 20,52 tỷ USD. Ngành đang mở rộng nhanh — khối lượng việc của công ty tăng theo là bình thường, không phải dấu hiệu quản lý kém."},
  {ma:"PMI", ten:"Chỉ số nhà quản trị mua hàng (PMI) sản xuất Việt Nam", gt:"51,8", phu:"tháng trước 52,8",
   ky:"tháng 6/2026", loai:"CONG_BO", nguon:"S&P Global, dẫn qua VietnamPlus",
   url:"https://en.vietnamplus.vn/manufacturing-sector-ends-first-half-of-2026-with-firm-growth-as-pmi-holds-above-no-change-mark-post347589.vnp",
   ngay:"01/07/2026", chieu:"tot",
   y:"Trên mốc 50 là còn mở rộng, nhưng đã chậm lại. Đơn hàng mới còn tăng, doanh nghiệp vẫn cắt giảm nhân sự và chuỗi cung ứng còn chậm giao — sức ép tiến độ đến từ bên ngoài, không chỉ từ nội bộ."},
];

/* ---------- MỐC ĐỐI CHIẾU ----------
   CÓ số nội bộ tương ứng. lay() trả về số nội bộ, tính bằng chính các hàm đã kiểm thử.
   chieu: "cao_tot" hay "thap_tot" — quyết định thanh nào là tốt, đừng để giao diện tự đoán. */
let DOI_CHIEU = [
  {ma:"DUNG_HAN", ten:"Tỷ lệ hoàn thành đúng hạn", donVi:"%", chieu:"cao_tot",
   moc:85, dai:[80,90], loai:"TU_DAT", nguon:"Mức công ty tự đặt trong tham số hệ thống",
   ngay:"01/01/2026",
   y:"Đây là CAM KẾT của công ty, không phải chuẩn ngành. Muốn so với ngành thì phải mua một khảo sát thật rồi thay dòng này.",
   lay:(S)=> S.tlDung},
  {ma:"CHO_DUYET", ten:"Thời gian phiếu nằm chờ ở khâu duyệt", donVi:"giờ", chieu:"thap_tot",
   moc:8, dai:[4,8], loai:"TU_DAT", nguon:"Một ngày công — mức công ty tự đặt",
   ngay:"01/01/2026",
   y:"Quá một ngày công thì nút thắt nằm ở người duyệt, không ở người làm. Mốc này suy từ lịch làm việc của chính công ty nên kiểm chứng được.",
   lay:()=> { const ids = Object.keys(LS_DUYET).filter(id => id === me || doiCuaToi().includes(id));
     if (!ids.length) return null;
     return ids.reduce((a,id)=>a+nutThat(id).gioGiu,0)/ids.length; }},
  {ma:"TRA_LAI", ten:"Tỷ lệ việc bị trả lại khi nghiệm thu", donVi:"%", chieu:"thap_tot",
   moc:20, dai:[10,20], loai:"TU_DAT", nguon:"Ngưỡng cảnh báo trong tham số hệ thống",
   ngay:"01/01/2026",
   y:"Trả lại nhiều gần như luôn là tiêu chí nghiệm thu chưa rõ từ lúc giao, không phải người làm kém.",
   /* Dùng LẠI tinhNguoi() — cùng con số mà cửa sổ Cá nhân in ra. Bản trước tự dò
      chữ "trả lại" trong nhật ký việc và ra 0% trong khi Cá nhân in 29–43%: hai phép
      tính cho cùng một khái niệm, đúng cái lỗi phải tránh nhất. */
   lay:()=> { const ds = Object.values(U).map(u => tinhNguoi(u.id)).filter(x => x.n >= 5);
     if (!ds.length) return null;
     return Math.round(ds.reduce((a,x)=>a+x.traLai,0) / ds.length * 100); }},
  {ma:"DOT_XUAT", ten:"Tỷ lệ việc đột xuất trên tổng việc phát sinh", donVi:"%", chieu:"thap_tot",
   moc:30, dai:[20,30], loai:"TU_DAT", nguon:"Ngưỡng cảnh báo trong tham số hệ thống",
   ngay:"01/01/2026",
   y:"Đột xuất cao thì vấn đề nằm ở khâu LẬP KẾ HOẠCH, không ở khâu thực hiện. Ép người làm nhanh hơn không chữa được chỗ này.",
   lay:(S)=> S.ps.tlDX},
  {ma:"SPAN", ten:"Số người một trưởng đơn vị quản trực tiếp", donVi:"người", chieu:"thap_tot",
   moc:9, dai:[5,9], loai:"KHAO_SAT", nguon:"Dải thông dụng trong thiết kế tổ chức — CHƯA có nguồn khảo sát chính thức",
   ngay:null,
   y:"Vượt dải thì phiếu nằm chờ lâu ở một người. Dòng này thiếu nguồn — người quản trị phải thay bằng số khảo sát thật trước khi dùng để ra quyết định nhân sự.",
   lay:()=> { const d = Object.values(U).map(u => Object.values(U).filter(x => x.id!==u.id && nguoiDuyet({lam:x.id})===u.id).length)
     .filter(n => n > 0); return d.length ? Math.round(d.reduce((a,b)=>a+b,0)/d.length*10)/10 : null; }},
  {ma:"QUA_TAI", ten:"Tỷ lệ người đang quá tải", donVi:"%", chieu:"thap_tot",
   moc:15, dai:[0,15], loai:"TU_DAT", nguon:"Mức công ty tự đặt",
   ngay:"01/01/2026",
   y:"Quá tải một vài người trong tuần cao điểm là bình thường; quá tải kéo dài nhiều kỳ là lỗi phân việc.",
   /* Mẫu số là người ĐANG CÓ VIỆC MỞ, đúng như soLieuKy() dùng — chia cho cả 44 người
      thì người đang nghỉ cũng vào mẫu số và tỷ lệ luôn đẹp giả tạo. */
   lay:(S)=> S.nguoiTap.length ? Math.round(S.quaTai.length / S.nguoiTap.length * 100) : null},
];
const DC_LOAI = {
  CONG_BO:  {ten:"Số công bố", mo:"Cơ quan thống kê hoặc tổ chức công bố công khai — kiểm chứng được", m:"g"},
  KHAO_SAT: {ten:"Khảo sát ngành", mo:"Chuẩn nghề hoặc khảo sát — là một DẢI, không phải một con số", m:"a"},
  TU_DAT:   {ten:"Công ty tự đặt", mo:"KHÔNG phải dữ liệu ngoài — đây là CAM KẾT của chính công ty", m:"m"},
};
/* Số ngoài cũ thì nguy hiểm hơn không có số: người đọc tưởng nó còn đúng.
   Quá 180 ngày thì màn hình tự cảnh báo. */
const HAN_SO_NGOAI = 180;
function soNgoaiCu(ngay){
  if (!ngay) return {thieu:true, ngay:null};
  const [d,m,y] = ngay.split("/").map(Number);
  const n = Math.round((TODAY - new Date(y, m-1, d)) / 86400000);
  return {thieu:false, ngay:n, cu:n > HAN_SO_NGOAI};
}
/* Chấm một mốc: dưới dải · trong dải · trên dải, đã tính theo chiều tốt/xấu. */
function chamMoc(x, gt){
  if (gt == null) return {muc:null, chu:"chưa đủ dữ liệu nội bộ để so"};
  const [lo, hi] = x.dai;
  const trong = gt >= lo && gt <= hi;
  const tot = x.chieu === "cao_tot" ? gt >= x.moc : gt <= x.moc;
  const lech = Math.round((gt - x.moc) * 10) / 10;
  return {muc: tot ? 0 : (trong ? 1 : 2), lech, trong,
    chu: tot ? `đạt mốc (${lech >= 0 ? "+" : ""}${so1(lech)} ${x.donVi})`
             : `chưa đạt mốc (${lech >= 0 ? "+" : ""}${so1(lech)} ${x.donVi})`};
}

/* ===================== TRỢ LÝ CLAUDE ===================== */
/* ---------- MÔ HÌNH ----------
   Giá ghi theo đồng/1 triệu token để người quản trị so được, không phải để tính tiền
   chính xác — số tiền thật do máy chủ trả về sau mỗi lượt gọi. */
const MO_HINH = {
  "claude-opus-4-6":   {ten:"Claude Opus",   manh:3, vao:75000, ra:375000,
    dung:"Việc khó: tham mưu chiến lược, phân tích nhiều tầng nguyên nhân, đối chiếu dữ liệu ngoài",
    luu:"Đắt nhất, chậm hơn. Dùng cho câu hỏi mà một câu trả lời sai gây hậu quả thật."},
  "claude-sonnet-4-6": {ten:"Claude Sonnet", manh:2, vao:15000, ra:75000,
    dung:"Việc thường ngày: tổng hợp kỳ, phân tích nút thắt, tư vấn phân việc",
    luu:"Cân bằng giữa chất lượng và chi phí. Đây là mô hình dùng mặc định."},
  "claude-haiku-4-6":  {ten:"Claude Haiku",  manh:1, vao:2500, ra:12500,
    dung:"Việc nhẹ: hướng dẫn dùng phần mềm, tra thuật ngữ, tóm tắt việc của chính mình",
    luu:"Rẻ và nhanh. Đủ tốt cho câu hỏi có đáp án nằm sẵn trong gói dữ liệu."},
};
const MH_THU = ["claude-opus-4-6","claude-sonnet-4-6","claude-haiku-4-6"];

/* ---------- BA HẠNG SỬ DỤNG ---------- */
const HANG_AI = {
  DH: {ten:"Hạng Điều hành", ic:"◆", tuDong:["HDQT","BGD"],
    mo:"Toàn quyền tham mưu: mọi nhiệm vụ, phạm vi toàn công ty, chọn được mô hình, xem được dữ liệu đối chiếu bên ngoài.",
    nv:["TONG_HOP","PHAN_TICH","SO_SANH","DANH_GIA","TU_VAN","HUONG_DAN"],
    pv:"CTY", moHinh:MH_THU, macDinh:"claude-sonnet-4-6", chonMoHinh:true,
    luotNgay:40, tranThang:3000000, soViec:60, ngoai:true, phanTichSau:true},
  TDV:{ten:"Hạng Trưởng đơn vị", ic:"◈", tuDong:["TP","PP","TT"],
    mo:"Nhiệm vụ quản lý trong nhánh mình phụ trách. Không so sánh chéo đơn vị khác, không xem dữ liệu đối chiếu ngoài, mô hình cố định.",
    nv:["TONG_HOP","PHAN_TICH","DANH_GIA","TU_VAN","HUONG_DAN"],
    pv:"NHANH", moHinh:["claude-sonnet-4-6","claude-haiku-4-6"], macDinh:"claude-sonnet-4-6", chonMoHinh:false,
    luotNgay:20, tranThang:800000, soViec:30, ngoai:false, phanTichSau:false},
  NV: {ten:"Hạng Nhân viên", ic:"○", tuDong:["NV"],
    mo:"Hỏi cách dùng phần mềm và tóm tắt việc của chính mình. Không đọc dữ liệu người khác, mô hình nhẹ nhất.",
    nv:["HUONG_DAN","TONG_HOP"],
    pv:"MINH", moHinh:["claude-haiku-4-6"], macDinh:"claude-haiku-4-6", chonMoHinh:false,
    luotNgay:10, tranThang:150000, soViec:10, ngoai:false, phanTichSau:false},
};
const HANG_THU = ["DH","TDV","NV"];
/* Gán tay — cùng cách làm với phân quyền: có người gán, có ngày, có lý do. */
let HANG_GAN = [
  {uid:"F004", hang:"DH", boi:"F003", ngay:"03/03/2026",
   ly:"Kiểm soát tài chính — cần đối chiếu số liệu toàn công ty khi tham mưu cho Ban Giám đốc"},
  {uid:"F007", hang:"TDV", boi:"F003", ngay:"20/07/2026",
   ly:"Trợ lý Tổng Giám đốc — chuẩn bị số liệu cho khối Điều hành chung"},
];
function hangCua(uid){
  const g = HANG_GAN.find(x => x.uid === uid);
  if (g && HANG_AI[g.hang]) return {ma:g.hang, ...HANG_AI[g.hang], tuDong:false, gan:g};
  const vt = U[uid] ? (U[uid].vt || "NV") : "NV";
  const k = HANG_THU.find(h => HANG_AI[h].tuDong.includes(vt)) || "NV";
  return {ma:k, ...HANG_AI[k], tuDong:true, gan:null};
}
/* GIAO của phạm vi hạng và quyền THẬT. Hạng chỉ thu hẹp, không bao giờ nới rộng. */
function pvAI(uid){
  const h = hangCua(uid);
  const that = coQuyen(uid,"xem_toan_cty") ? "CTY" : coQuyen(uid,"xem_doi") ? "NHANH" : "MINH";
  return PHAM_VI[h.pv].r <= PHAM_VI[that].r ? h.pv : that;
}
/* Đếm mức đã dùng theo từng người. Không đếm theo người thì một người hỏi cả ngày
   là hết quỹ chung, và không ai biết là ai. */
let AI_DUNG = {};
function mucDung(uid){ return AI_DUNG[uid] || (AI_DUNG[uid] = {ngay:0, thang:0, tien:0}); }
function conDuocHoi(uid){
  const h = hangCua(uid), d = mucDung(uid);
  if (!AI_CH.bat) return {duoc:false, ly:"Trợ lý đang tắt — người quản trị bật ở Thiết lập › Trợ lý AI"};
  if (!h.nv.length) return {duoc:false, ly:`Hạng ${h.ten} chưa được mở nhiệm vụ nào`};
  if (d.ngay >= h.luotNgay) return {duoc:false, ly:`Đã dùng hết ${h.luotNgay} lượt của hôm nay — hạn mức của ${h.ten}`};
  if (d.tien >= h.tranThang) return {duoc:false, ly:`Đã chạm trần chi phí tháng ${h.tranThang.toLocaleString("vi")} đ của ${h.ten}`};
  if (AI_CH.daTieu >= AI_CH.tranThang) return {duoc:false, ly:"Đã chạm trần chi phí tháng của toàn công ty"};
  return {duoc:true};
}
function ganHang(uid, hang, ly){
  if (!coQuyen(me,"sua_tham_so")) return toast("Bạn không có quyền đặt hạng sử dụng AI");
  const h = hangCua(me);
  /* Không ai cấp cho người khác hạng cao hơn hạng của chính mình — cùng một chốt
     chống leo thang đã dùng ở phân quyền, vì đây cũng là một đường lên quyền. */
  /* Chỉ chặn khi ĐANG CẤP một hạng. Trả người về hạng tự động là THU HẸP quyền,
     không phải leo thang — chặn cả chỗ này thì không ai gỡ được một lần gán sai. */
  if (hang && HANG_THU.indexOf(hang) < HANG_THU.indexOf(h.ma))
    return toast(`Bạn đang ở ${h.ten}, không cấp được hạng cao hơn cho người khác`);
  const i = HANG_GAN.findIndex(x => x.uid === uid);
  if (i >= 0) HANG_GAN.splice(i, 1);
  if (hang) HANG_GAN.push({uid, hang, boi:me, ngay:fmtDY(TODAY), ly:ly||""});
  ghiNK(U[me].ten, hang ? `đặt ${U[uid].ten} vào ${HANG_AI[hang].ten} khi dùng trợ lý`
                        : `trả ${U[uid].ten} về hạng tự động theo vị trí`, NOW);
  toast(hang ? `${U[uid].ten} → ${HANG_AI[hang].ten}` : "Đã trả về hạng tự động"); draw();
}

/* Cấu hình do người quản trị đặt ở Thiết lập › Trợ lý AI. */
const AI_CH = {
  bat: true,
  duongDan: "/api/tro-ly",              /* máy chủ công ty, KHÔNG gọi thẳng api.anthropic.com từ trình duyệt */
  moHinh: "claude-sonnet-4-6",
  /* Ai được dùng và dùng tới đâu nay do HẠNG SỬ DỤNG quyết (xem HANG_AI ở trên),
     không còn là một danh sách cấp phẳng. Công tắc dưới đây chỉ còn bật/tắt toàn hệ. */
  giauViecMat: true,                    /* thay tiêu đề việc mật bằng mã trước khi gửi */
  tranThang: 4000000,                   /* trần chi phí một tháng, đồng */
  daTieu: 512000,
  soViecToiDa: 60,                      /* trần số dòng việc trong một gói */
};
/* Sáu nhiệm vụ. Mỗi nhiệm vụ khai rõ: gói gì, hỏi gì, và trả về cái gì —
   không khai ra thì mỗi người hỏi một kiểu và câu trả lời không so được với nhau. */
const NHIEM_VU = {
  TONG_HOP: {ten:"Tổng hợp tình hình", ic:"▤",
    mo:"Gộp số liệu kỳ thành một bản đọc được trong ba phút",
    goi:"ky", ra:"Bản tóm tắt kỳ: kết quả, chỗ lệch, việc phải quyết"},
  PHAN_TICH:{ten:"Phân tích nguyên nhân", ic:"◔",
    mo:"Vì sao chỗ này trễ, nút thắt nằm ở đâu",
    goi:"ky", ra:"Chuỗi nguyên nhân có bằng chứng, tách nguyên nhân gốc khỏi triệu chứng"},
  SO_SANH:  {ten:"So sánh", ic:"⇄",
    mo:"Hai đơn vị, hai khối, hai kỳ — khác nhau ở đâu và vì sao",
    goi:"ss", ra:"Bảng đối chiếu kèm giải thích chênh lệch"},
  DANH_GIA: {ten:"Đánh giá", ic:"◈",
    mo:"Một đơn vị, một khối hoặc một dự án đang ở đâu so với cam kết",
    goi:"ky", ra:"Nhận định kèm mức tin cậy và điều kiện để kết luận đổi"},
  TU_VAN:   {ten:"Tư vấn cải thiện", ic:"◎",
    mo:"Nên làm gì để kỳ sau khá hơn — người, quy trình, tham số",
    goi:"ky", ra:"Danh sách việc nên làm, xếp theo tác động trên công sức"},
  HUONG_DAN:{ten:"Hướng dẫn dùng phần mềm", ic:"?",
    mo:"Cửa sổ này để làm gì, con số kia tính thế nào, tôi phải bấm vào đâu",
    goi:"pm", ra:"Chỉ dẫn theo đúng màn hình đang mở và quyền đang có"},
};

/* ---------- ĐÓNG GÓI BỐI CẢNH ----------
   Đây là phần quan trọng nhất của cả tính năng. Gói phải: đủ để trả lời,
   gọn để không tốn tiền, và ĐÚNG PHẠM VI để không rò dữ liệu. */
function goiBoiCanh(nv, tuyChon){
  const o = tuyChon || {};
  const kT = khoangKy(o.ky || "TUAN", -1), kN = khoangKy(o.ky || "TUAN", 0);
  const nvo = NHIEM_VU[nv] || NHIEM_VU.TONG_HOP;

  /* Chốt 1: chỉ việc trong tầm nhìn của CHÍNH người đang hỏi, RỒI cắt tiếp theo
     phạm vi của hạng sử dụng. Hai lớp, lớp sau chỉ thu hẹp thêm. */
  const pv = pvAI(me), nh = nhanhCuaToi();
  const tap = T.filter(trongTamNhin).filter(t =>
      pv === "CTY"   ? true
    : pv === "NHANH" ? (nh.has(t.lam) || coTenToi(t))
    :                  coTenToi(t));

  /* Chốt 2: việc mật ra khỏi hệ thống thì giấu tiêu đề. */
  const doiTen = t => (AI_CH.giauViecMat && t.mat === "HAN_CHE")
    ? `[việc hạn chế ${t.id}]` : t.ttl;

  const hg = hangCua(me);
  const goi = {
    hoi: {ten:U[me].ten, chucDanh:U[me].cd, viTri:CHUC_VU[U[me].vt||"NV"].ten,
          hangDungAI:hg.ten, phamViDuocDoc:PHAM_VI[pv].ten,
          donVi:(DV[U[me].dv]||{}).ten || "—",
          khoi:(khoiCua(me)||{}).ten || null,
          quyen:QUYEN.filter(q=>coQuyen(me,q[0])).map(q=>q[0])},
    congTy: {ten:"Công ty CP Xuất nhập khẩu và Thương mại FOREVER",
             soNguoi:Object.keys(U).length, soDonVi:Object.keys(DV).length,
             homNay:fmtDY(TODAY)},
    ky: {danhGia:kT.day, keHoach:kN.day},
    thamSo: {sucTuan:SUC_TUAN, nguongChiBGD:BAC_DUYET[0].tu,
             giaiThich:"Điểm độ khó một tuần một người gánh được; ngưỡng chi phải trình Ban Giám đốc"},
  };

  if (nvo.goi === "pm"){
    /* Hướng dẫn dùng phần mềm: KHÔNG gửi dữ liệu việc, chỉ gửi bản đồ màn hình,
       bảng thuật ngữ và quyền của người hỏi. Rẻ hơn, và không có gì để rò. */
    goi.manHinh = tabs().map(([k,n]) => ({ma:k, ten:n, vaiTro:(VAI_CS[k]||[])[0]||null}));
    goi.dangMo = {cuaSo:(tabs().find(x=>x[0]===TAB)||[])[1] || TAB,
                  moTa:(VAI_CS[TAB]||[])[1] || null};
    goi.thuatNgu = THUAT_NGU.map(([a,b,c,d]) => ({tu:a, nghia:b.replace(/<[^>]+>/g,""), ham:c, oDau:d}));
    goi.quyenCuaToi = QUYEN.map(q => ({ma:q[0], ten:q[1], co:coQuyen(me,q[0]),
      nguon:(nguonQuyen(me,q[0])||{}).tenVai || null}));
    return goi;
  }

  /* Số liệu kỳ — CHÍNH hàm mà màn Giao ban dùng, không tính lại lần thứ hai. */
  const S = soLieuKy(tap, kT, kN);
  goi.soLieu = {
    denHanKyQua: S.denHanTruoc.length, daNghiemThu: S.xongTruoc.length,
    dungHan: S.dungHan.length, tyLeDungHan: S.tlDung,
    conTreChuaXong: S.treTruoc.filter(viecMo).length,
    denHanKyNay: S.denHanNay.length, mocKyNay: S.mocNay.length,
    dangTac: S.tac.length, nguoiQuaTai: S.quaTai.length,
    phaiTrinhBGD: S.bgd.length, phatSinhTrongKy: S.ps.ds.length,
    ghiChu:"Mọi con số ở đây do phần mềm tính sẵn bằng soLieuKy(). Dùng nguyên, không tính lại."
  };
  goi.theoKhoi = KHOI.map(k => { const x = tomTatKhoi(k, kT, kN);
    return {khoi:k.ten, phuTrach:U[k.bod]?U[k.bod].ten:"—", soNguoi:x.soNguoi,
            denHan:x.denHan.length, xong:x.xong.length, tyLeDungHan:x.tl,
            conTre:x.treMo.length, dangTac:x.tac.length, quaTai:x.quaTai.length};
  });
  goi.theoDonVi = dvBaoCao().map(ma => { const x = tomTatDV(ma, kT, kN);
    return {donVi:x.ten, truong:U[x.truong]?U[x.truong].ten:"khuyết", soNguoi:x.soNguoi,
            denHan:x.denHan.length, xong:x.xong.length, tyLeDungHan:x.tl,
            conTre:x.treMo.length, dangTac:x.tac.length, mucDo:["đạt","cần chú ý","có vấn đề"][x.muc]};
  });
  /* Kết luận điều hành đã có sẵn phát hiện + bằng chứng + hậu quả + người phải quyết.
     Đưa nguyên vào gói để Claude khỏi phải tự phát hiện lại — và khỏi phát hiện khác. */
  goi.phatHien = ketLuanDH(tap, kT, kN, S).map(k => ({
    phatHien:(k.tieu||"").replace(/<[^>]+>/g,""), bangChung:(k.bc||"").replace(/<[^>]+>/g,""),
    neuDeNguyen:(k.hq||"").replace(/<[^>]+>/g,""), phaiQuyet:(k.qd||"").replace(/<[^>]+>/g,"")}));
  /* Dòng việc: có trần, và NÓI RÕ đã cắt bao nhiêu. Cắt im lặng thì mô hình tưởng
     mình thấy hết và kết luận trên một nửa dữ liệu. */
  const tran = Math.min(AI_CH.soViecToiDa, hg.soViec);
  const dsViec = tap.filter(t => viecMo(t) && (quaHan(t) || canCanThiep(t) || t.moc))
    .sort((a,b)=>(uuTien(a).muc-uuTien(b).muc)||(conLai(a)-conLai(b)));
  goi.viecDangCanhBao = dsViec.slice(0, tran).map(t => ({
    ma:t.id, ten:doiTen(t), nguoiLam:U[t.lam]?U[t.lam].ten:"—",
    donVi:(DV[(U[t.lam]||{}).dv]||{}).ten||"—",
    han:t.han, treNgay: quaHan(t) ? -conLai(t) : 0, tienDo:tienDo(t),
    uuTien:UT[uuTien(t).muc][0], trangThai:(TT[t.tt]||[t.tt])[0],
    dungDongHo: dangDung(t) ? "có — đang chờ bên ngoài" : "không"}));
  if (dsViec.length > tran)
    goi.viecDangCanhBao_ghiChu = `Còn ${dsViec.length - tran} việc nữa không đưa vào gói do trần ${tran} dòng của ${hg.ten}. Kết luận phải nói rõ là dựa trên phần đã xem.`;
  /* Dữ liệu đối chiếu bên ngoài chỉ vào gói của hạng được phép. Trưởng đơn vị và
     nhân viên không cần bối cảnh vĩ mô để làm việc của mình, mà gửi kèm thì vừa
     tốn token vừa mở rộng chỗ mô hình có thể suy diễn sai. */
  if (hg.phanTichSau){
    /* Năm phép phân tích do PHẦN MỀM tính, đưa nguyên vào gói. Trợ lý diễn đạt và
       xếp thứ tự ưu tiên, KHÔNG tự chẩn đoán lại — chẩn đoán lại thì hai lần hỏi
       cùng một câu ra hai nguyên nhân gốc khác nhau. */
    const _DC = dongChay(tap, kT, S);
    const _NT = nutHeThong(tap, S);
    goi.dongChay = {nhanVaoTrongKy:_DC.nhan, dongDuocTrongKy:_DC.dong,
      tonKhoDangMo:_DC.ton, soKyDeRutHet:_DC.chu, chenhLech:_DC.can, nhanDinh:_DC.y};
    goi.nutThatChinh = _NT.chinh ? {ten:_NT.chinh.ten, doLuong:_NT.chinh.mo,
      bangChung:_NT.chinh.bc.replace(/<[^>]+>/g,""), phaiLam:_NT.chinh.lam} : null;
    goi.nutThatKhac = _NT.khac.map(x => ({ten:x.ten, soLieu:x.so}));
    goi.chuoiNguyenNhan = chuoiNhan(tap, S, _DC, _NT).map(x => ({
      bac:x.bac, noiDung:x.ten.replace(/<[^>]+>/g,""), bangChung:x.bc.replace(/<[^>]+>/g,"")}));
    goi.ruiRoTapTrung = ruiRoTapTrung(tap).map(x => ({
      rui:x.ten, mucDo:["thấp","cần chú ý","cao"][x.muc], soLieu:x.so, ai:x.ai, phaiLam:x.lam}));
    goi.canhBaoSom = canhBaoSom(tap, kN).filter(x => x.muc >= 1).slice(0, 10).map(x => ({
      ma:x.t.id, ten:doiTen(x.t), nguoiLam:U[x.t.lam]?U[x.t.lam].ten:"—", han:x.t.han,
      tienDo:tienDo(x.t), tocDoCan:Math.round(x.canToc*10)/10, tocDoDangDat:Math.round(x.dangToc*10)/10,
      phaiNhanhGap:Math.round(x.ty*10)/10, laMoc:!!x.t.moc}));
    goi.xuHuongBaKy = xuHuongKy(3).map(x => ({ky:x.ten, khoang:x.khoang, tyLeDungHan:x.tl,
      denHan:x.denHan, xong:x.xong, conTre:x.tre, dangTac:x.tac}));
    /* Diễn biến bên ngoài: CHỈ gửi mục đã được người có thẩm quyền xác nhận đánh giá.
       Đánh giá sơ bộ chưa xác nhận mà lọt vào gói thì trợ lý sẽ kết luận trên một
       nhận định chưa ai chịu trách nhiệm. */
    goi.dienBienNgoai = TIN_NGOAI.filter(x => x.xacNhan).map(x => ({
      nhom:TIN_NHOM[x.nhom].ten, ten:x.ten, soHieu:x.so, ngayHieuLuc:x.hieuLuc,
      noiDung:x.nd, anhHuong:AH_MUC[x.ah].ten, anhHuongToiCongTy:x.viSao,
      phaiLam:x.lam, donViChiuTrachNhiem:x.dv && DV[x.dv] ? DV[x.dv].ten : null,
      han:x.han, nguon:x.nguon, ngayCongBo:x.ngay}));
    const _chua = TIN_NGOAI.filter(x => !x.xacNhan).length;
    if (_chua) goi.dienBienNgoai_ghiChu = `Còn ${_chua} diễn biến có đánh giá ảnh hưởng CHƯA được xác nhận nên không đưa vào gói. Không suy đoán về chúng.`;
    goi.sapHieuLuc = tinSapHieuLuc().filter(x => x.con >= 0).map(x => ({
      soHieu:x.so, ten:x.ten, conLaiNgayCong:x.con, ngayHieuLuc:x.hieuLuc, daCoViecTheoDoi:x.daCoViec}));
    goi.boiCanhNganh = BOI_CANH.map(x => ({chiSo:x.ten, giaTri:x.gt, ky:x.ky,
      nguon:x.nguon, ngayCongBo:x.ngay, yNghia:x.y, loai:DC_LOAI[x.loai].ten}));
    goi.mocDoiChieu = DOI_CHIEU.map(x => { const gt = x.lay(S); const c = chamMoc(x, gt);
      return {chiSo:x.ten, soCuaCongTy:gt, donVi:x.donVi, moc:x.moc, dai:x.dai,
              dat:c.muc===0, loaiMoc:DC_LOAI[x.loai].ten, nguonMoc:x.nguon,
              ngayMoc:x.ngay, luuY:x.y};
    });
    goi.canThan = "dongChay, nutThatChinh, chuoiNguyenNhan, ruiRoTapTrung, canhBaoSom đều do PHẦN MỀM tính sẵn — dùng nguyên, KHÔNG chẩn đoán lại và KHÔNG đổi nguyên nhân gốc. Số ở boiCanhNganh KHÔNG có số nội bộ tương ứng — dùng để giải thích môi trường, TUYỆT ĐỐI không dùng để chấm điểm công ty. Chỉ mocDoiChieu mới được so. Mốc loại 'Công ty tự đặt' là CAM KẾT của công ty, không phải chuẩn ngành — nói rõ điều đó khi kết luận.";
  }
  if (o.dv && DV[o.dv]) goi.tapTrungVao = DV[o.dv].ten;
  if (o.ss) goi.soSanh = o.ss;
  return goi;
}

/* ---------- LỜI DẶN HỆ THỐNG ----------
   Viết ra thành hằng số để người bàn giao đọc được và sửa được, không giấu trong mã. */
function loiDan(nv){
  const nvo = NHIEM_VU[nv] || NHIEM_VU.TONG_HOP;
  return [
    `Bạn là trợ lý điều hành của ${"Công ty CP Xuất nhập khẩu và Thương mại FOREVER"}, trả lời bằng tiếng Việt.`,
    `Nhiệm vụ lần này: ${nvo.ten} — ${nvo.mo}. Kết quả cần có: ${nvo.ra}.`,
    `QUY TẮC BẮT BUỘC:`,
    `1. Mọi con số phải lấy nguyên từ gói dữ liệu. TUYỆT ĐỐI không tự cộng trừ, không ước lượng, không bịa số.`,
    `2. Thiếu dữ liệu để kết luận thì nói thẳng là thiếu, và nói thiếu cái gì. Không đoán.`,
    `3. Mỗi nhận định phải kèm bằng chứng chỉ ra được trong gói (mã việc, tên đơn vị, con số).`,
    `4. Nêu người phải quyết, không nêu chung chung "cần cải thiện".`,
    `5. Không đề xuất xếp hạng nhân sự theo điểm: mẫu 5–20 việc một tháng là quá nhỏ để xếp hạng công bằng.`,
    `6. Phân biệt "quá hạn" (đang mở, đã qua hạn — sửa được hôm nay) với "trễ" (đến hạn trong kỳ mà không về đích — đã chốt).`,
    `7. Bạn KHÔNG được thực hiện thao tác nào. Chỉ đề xuất; người dùng tự bấm nút xác nhận.`,
    `8. Viết ngắn. Người đọc là lãnh đạo, không có thì giờ đọc văn.`,
    `9. Gói có mục boiCanhNganh thì đó là số môi trường bên ngoài, KHÔNG dùng để chấm điểm công ty. Chỉ mocDoiChieu mới được so, và phải nói rõ mốc đó là chuẩn ngành hay là mức công ty tự đặt.`,
    `10. Gói có nutThatChinh và chuoiNguyenNhan thì phần mềm ĐÃ chẩn đoán rồi. Diễn đạt lại cho gọn và nói rõ phải làm gì, KHÔNG đưa ra nguyên nhân gốc khác — hai lần hỏi cùng một câu phải ra cùng một nguyên nhân.`,
    `11. Chỉ nhắc tới diễn biến bên ngoài có trong mục dienBienNgoai. Diễn biến chưa được xác nhận đánh giá thì không có trong gói và không được suy đoán về nó.`,
  ].join("\n");
}

/* ---------- ĐƯỜNG GỌI ---------- */
let AI_PHIEN = [];       /* lịch sử hỏi đáp của phiên này */
let AI_MO = false, AI_NV = "TONG_HOP", AI_HOI = "", AI_CHAY = false, AI_GOI_XEM = null;
let AI_MH = "claude-sonnet-4-6";

async function goiClaude(nv, cauHoi, goi){
  /* Đường thật: máy chủ công ty giữ khoá. Trình duyệt không bao giờ thấy khoá. */
  if (AI_CH.duongDan && window.FOREVER_CO_MAY_CHU){
    const r = await fetch(AI_CH.duongDan, {method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({moHinh:AI_CH.moHinh, nhiemVu:nv, loiDan:loiDan(nv), cauHoi, goi})});
    if (!r.ok) throw new Error("Máy chủ trả lỗi " + r.status);
    return await r.json();          /* {tra, token, chiPhi} */
  }
  /* Bản chạy thử: dựng câu trả lời tại chỗ TỪ CHÍNH GÓI ĐÓ. */
  return traLoiTaiCho(nv, cauHoi, goi);
}

/* Bản dựng tại chỗ. Không phải để thay Claude — để bản chạy thử vẫn nói đúng số thật
   của công ty, và để người lập trình thấy rõ gói chứa đủ thứ cần cho câu trả lời. */
function traLoiTaiCho(nv, cauHoi, g){
  const B = [];
  const so = g.soLieu || {};
  if (nv === "HUONG_DAN"){
    const q = boDau(cauHoi || "");
    const tn = (g.thuatNgu||[]).find(x => q.includes(boDau(x.tu)));
    if (tn) B.push({tieu:`“${tn.tu}” nghĩa là gì`, y:[
      tn.nghia, `Phần mềm tính bằng ${tn.ham}.`, `Xuất hiện ở: ${tn.oDau}.`]});
    const cs = (g.manHinh||[]).find(x => q.includes(boDau(x.ten)));
    if (cs) B.push({tieu:`Cửa sổ ${cs.ten} để làm gì`, y:[cs.vaiTro || "Xem mô tả ngay đầu cửa sổ."]});
    if (!B.length) B.push({tieu:`Bạn đang ở cửa sổ ${g.dangMo.cuaSo}`, y:[
      g.dangMo.moTa || "Mỗi cửa sổ có một dòng khai rõ nó trả lời câu hỏi gì, ngay dưới tiêu đề.",
      `Bạn có ${(g.quyenCuaToi||[]).filter(x=>x.co).length} trên ${(g.quyenCuaToi||[]).length} quyền. Thao tác nào không có quyền thì nút sẽ không hiện.`,
      `Gõ tên một cửa sổ hoặc một từ như “quá hạn”, “dừng đồng hồ”, “quá tải” để hỏi cụ thể.`]});
    return {tra:B, token:{vao:1200, ra:300}, chiPhi:900, taiCho:true};
  }
  const xau = (g.theoDonVi||[]).filter(x => x.mucDo === "có vấn đề");
  const kQua = [...(g.theoKhoi||[])].sort((a,b)=>(b.conTre-a.conTre)||((a.tyLeDungHan??101)-(b.tyLeDungHan??101)));
  if (nv === "TONG_HOP" || nv === "DANH_GIA"){
    B.push({tieu:`Kỳ ${g.ky.danhGia}`, y:[
      `Đến hạn ${so.denHanKyQua} việc, nghiệm thu ${so.daNghiemThu}, đúng hạn ${so.tyLeDungHan ?? "—"}%.`,
      so.conTreChuaXong ? `Còn ${so.conTreChuaXong} việc đến hạn kỳ qua chưa xong.` : `Không việc nào của kỳ qua còn bỏ dở.`,
      `Kỳ này ${so.denHanKyNay} việc đến hạn, trong đó ${so.mocKyNay} mốc bàn giao.`]});
    if (kQua.length) B.push({tieu:"Bốn khối", y:kQua.map(k =>
      `${k.khoi} (${k.phuTrach}): ${k.denHan} việc đến hạn, đúng hạn ${k.tyLeDungHan ?? "—"}%${
        k.conTre?`, còn trễ ${k.conTre}`:""}${k.quaTai?`, ${k.quaTai} người quá tải`:""}.`)});
    if (xau.length) B.push({tieu:"Đơn vị đang có vấn đề", y:xau.map(x =>
      `${x.donVi} (${x.truong}): đúng hạn ${x.tyLeDungHan ?? "—"}%, còn trễ ${x.conTre}, đang tắc ${x.dangTac}.`)});
  }
  if (nv === "PHAN_TICH"){
    if (g.nutThatChinh) B.push({tieu:"Nút thắt của cả hệ", y:[
      `${g.nutThatChinh.ten} — ${g.nutThatChinh.doLuong}.`,
      `Bằng chứng: ${g.nutThatChinh.bangChung}.`,
      `Phải làm: ${g.nutThatChinh.phaiLam}.`,
      (g.nutThatKhac||[]).length ? `Còn ${g.nutThatKhac.length} chỗ lệch nhẹ hơn (${g.nutThatKhac.map(x=>x.ten).join(", ")}) — sửa chúng trước cũng không nhanh lên được.` : "Không còn chỗ lệch nào khác."]});
    if (g.chuoiNguyenNhan) B.push({tieu:"Chuỗi nguyên nhân", y:g.chuoiNguyenNhan.map(x =>
      `${x.bac}: ${x.noiDung}. ${x.bangChung}`)});
    if (g.dongChay) B.push({tieu:"Dòng chảy công việc", y:[
      `Nhận vào ${g.dongChay.nhanVaoTrongKy}, đóng được ${g.dongChay.dongDuocTrongKy}, tồn kho ${g.dongChay.tonKhoDangMo} việc đang mở.`,
      g.dongChay.nhanDinh,
      g.dongChay.soKyDeRutHet != null ? `Với nhịp này cần khoảng ${g.dongChay.soKyDeRutHet} kỳ mới rút hết tồn kho.` : ""].filter(Boolean)});
    if ((g.ruiRoTapTrung||[]).some(x => x.mucDo === "cao")) B.push({tieu:"Rủi ro tập trung", nho:true,
      y:g.ruiRoTapTrung.filter(x=>x.mucDo==="cao").map(x => `${x.rui}: ${x.soLieu} — ${x.ai}. ${x.phaiLam}`)});
    B.push({tieu:"Nút thắt đọc được từ số liệu", y:[
      so.dangTac ? `${so.dangTac} việc đang tắc — dừng lại chờ người khác, không phải chờ người làm.` : `Không việc nào đang tắc.`,
      so.nguoiQuaTai ? `${so.nguoiQuaTai} người vượt sức tuần (${g.thamSo.sucTuan} điểm độ khó).` : `Không ai quá tải.`,
      so.phaiTrinhBGD ? `${so.phaiTrinhBGD} việc vượt thẩm quyền phòng ban, đang chờ Ban Giám đốc.` : `Không việc nào phải trình Ban Giám đốc.`]});
    if ((g.canhBaoSom||[]).length) B.push({tieu:"Sẽ trễ nếu giữ nhịp hiện tại", y:g.canhBaoSom.slice(0,5).map(v =>
      `${v.ma} · ${v.ten}${v.laMoc?" (MỐC)":""} — ${v.nguoiLam}, hạn ${v.han}, tiến độ ${v.tienDo}%. Cần ${v.tocDoCan}%/ngày, đang đạt ${v.tocDoDangDat}%/ngày — phải nhanh gấp ${v.phaiNhanhGap} lần.`)});
    const tre = (g.viecDangCanhBao||[]).filter(v=>v.treNgay>0).slice(0,5);
    if (tre.length) B.push({tieu:"Trễ lâu nhất", y:tre.map(v =>
      `${v.ma} · ${v.ten} — ${v.nguoiLam} (${v.donVi}), trễ ${v.treNgay} ngày, tiến độ ${v.tienDo}%${
        v.dungDongHo.startsWith("có")?", đồng hồ đang dừng vì chờ bên ngoài":""}.`)});
  }
  if (nv === "SO_SANH" && kQua.length){
    const a = kQua[0], b = kQua[kQua.length-1];
    B.push({tieu:`${a.khoi} so với ${b.khoi}`, y:[
      `Đúng hạn: ${a.tyLeDungHan ?? "—"}% so với ${b.tyLeDungHan ?? "—"}%.`,
      `Khối lượng: ${a.denHan} việc đến hạn trên ${a.soNguoi} người, so với ${b.denHan} trên ${b.soNguoi} người.`,
      `Chênh lệch đúng hạn khi khối lượng lệch nhiều thì chưa kết luận được về cách làm — cần xem độ khó trung bình trước.`]});
  }
  if (nv === "TU_VAN"){
    const y = [];
    if (g.nutThatChinh) y.push(`Gỡ nút thắt trước mọi thứ khác: ${g.nutThatChinh.ten}. ${g.nutThatChinh.phaiLam}.`);
    if (g.dongChay && g.dongChay.chenhLech > 0)
      y.push(`Chặn bớt đầu vào ${g.dongChay.chenhLech} việc mỗi kỳ, hoặc thêm người ở khâu chậm nhất — ép làm nhanh hơn không chữa được chỗ này.`);
    (g.sapHieuLuc||[]).filter(x => !x.daCoViecTheoDoi).forEach(x =>
      y.push(`${x.soHieu||x.ten} còn ${x.conLaiNgayCong} ngày công là có hiệu lực mà chưa có việc nào theo dõi — ngày hiệu lực không lùi được.`));
    (g.dienBienNgoai||[]).filter(x => x.anhHuong === "Ảnh hưởng cao").forEach(x =>
      y.push(`${x.ten}: ${x.phaiLam}${x.donViChiuTrachNhiem?` — giao ${x.donViChiuTrachNhiem}`:""}${x.han?`, hạn ${x.han}`:""}.`));
    if (so.dangTac) y.push(`Đặt lịch duyệt cố định trong ngày cho người duyệt: ${so.dangTac} việc đang tắc phần lớn nằm ở khâu chờ nghiệm thu, không ở người làm.`);
    if (so.nguoiQuaTai) y.push(`Chuyển bớt việc của ${so.nguoiQuaTai} người quá tải sang người còn chỗ — cửa sổ Cá nhân có bộ lọc “Còn chỗ nhận việc”.`);
    if (xau.length) y.push(`Ưu tiên gỡ ${xau[0].donVi} trước: đây là đơn vị lệch xa nhất, gỡ một chỗ này kéo cả số chung lên.`);
    if (so.phatSinhTrongKy) y.push(`${so.phatSinhTrongKy} việc phát sinh trong kỳ — nếu tỷ lệ đột xuất cao thì vấn đề nằm ở khâu lập kế hoạch, không ở khâu thực hiện.`);
    y.push(`Không xếp hạng nhân sự theo điểm: mẫu 5–20 việc một tháng quá nhỏ, xếp hạng cưỡng bức trong nhóm nhỏ sai vị trí 32–53%.`);
    B.push({tieu:"Nên làm gì, xếp theo tác động trên công sức", y});
  }
  if ((g.phatHien||[]).length) B.push({tieu:"Việc phải quyết", nho:true,
    y:g.phatHien.slice(0,4).map(k => `${k.phatHien} → ${k.phaiQuyet}`)});
  if (g.viecDangCanhBao_ghiChu) B.push({tieu:"Giới hạn của câu trả lời này", nho:true, y:[g.viecDangCanhBao_ghiChu]});
  if (!B.length) B.push({tieu:"Không đủ dữ liệu", y:["Kỳ này chưa có số liệu để nói gì có ích."]});
  return {tra:B, token:{vao:2600 + (g.viecDangCanhBao||[]).length*40, ra:520}, chiPhi:4200, taiCho:true};
}

async function hoiTroLy(){
  if (AI_CHAY) return;
  const ok = conDuocHoi(me);
  if (!ok.duoc) return toast(ok.ly);
  const hg = hangCua(me);
  if (!hg.nv.includes(AI_NV)) return toast(`${hg.ten} không được dùng nhiệm vụ này`);
  if (!hg.moHinh.includes(AI_MH)) AI_MH = hg.macDinh;
  AI_CHAY = true; veTroLy();
  const goi = goiBoiCanh(AI_NV, {ky:"TUAN"});
  let kq;
  try { kq = await goiClaude(AI_NV, AI_HOI, goi); }
  catch(e){ kq = {tra:[{tieu:"Không gọi được trợ lý", y:[String(e.message||e),
    "Kiểm tra đường dẫn máy chủ ở Thiết lập › Trợ lý AI."]}], token:{vao:0,ra:0}, chiPhi:0, loi:true}; }
  AI_CHAY = false;
  /* Chi phí đổi theo mô hình: mô hình mạnh đắt gấp nhiều lần. Không nhân theo mô hình
     thì bảng hạn mức thành vô nghĩa — ai cũng chọn mô hình mạnh nhất. */
  const mh = MO_HINH[AI_MH] || MO_HINH[hg.macDinh];
  const tien = Math.round((kq.token.vao * mh.vao + kq.token.ra * mh.ra) / 1000000);
  kq.chiPhi = tien; kq.moHinh = AI_MH;
  AI_PHIEN.unshift({nv:AI_NV, hoi:AI_HOI, goi, kq, luc:NOW, ai:me, mh:AI_MH, hang:hg.ma});
  AI_CH.daTieu += tien;
  const d = mucDung(me); d.ngay++; d.thang++; d.tien += tien;
  ghiNK(U[me].ten, `hỏi trợ lý (${hg.ten} · ${mh.ten}) — ${NHIEM_VU[AI_NV].ten}${AI_HOI?`: “${AI_HOI.slice(0,60)}”`:""} · gói ${(goi.viecDangCanhBao||[]).length} dòng việc · ${tien.toLocaleString("vi")} đ`, NOW);
  AI_HOI = "";
  veTroLy();
}

function moTroLy(nv){
  AI_MO = true; if (nv) AI_NV = nv;
  const _h = hangCua(me);
  if (!_h.nv.includes(AI_NV)) AI_NV = _h.nv[0] || "HUONG_DAN";
  if (!_h.moHinh.includes(AI_MH)) AI_MH = _h.macDinh;
  veTroLy();
}
function dongTroLy(){ AI_MO = false; AI_GOI_XEM = null; veTroLy(); }
function datNV(k){ AI_NV = k; veTroLy(); }
function xemGoi(i){ AI_GOI_XEM = (AI_GOI_XEM === i) ? null : i; veTroLy(); }

/* Câu hỏi gợi ý theo ĐÚNG vai và ĐÚNG cửa sổ đang mở. Ô nhập trống là ô không ai
   dùng: người ta không biết hỏi được gì. */
function goiYHoi(){
  const c = capViec(me), t = TAB;
  const r = [];
  if (t === "bc") r.push(["TONG_HOP","Tóm tắt kỳ này cho tôi trong ba ý"],
                         ["PHAN_TICH","Vì sao tỷ lệ đúng hạn tụt so với kỳ trước"]);
  if (t === "ns") r.push(["PHAN_TICH","Ai đang là nút thắt và vì sao"],
                         ["TU_VAN","Nên chuyển bớt việc của ai sang ai"]);
  if (t === "dh") r.push(["TU_VAN","Hôm nay tôi nên gỡ việc nào trước"]);
  if (t === "da") r.push(["DANH_GIA","Dự án nào đang có nguy cơ vỡ tiến độ"]);
  if (hangCua(me).phanTichSau) r.push(
    ["PHAN_TICH","Nút thắt của cả hệ đang nằm ở đâu"],
    ["PHAN_TICH","Công ty đang nhận việc nhanh hơn hay chậm hơn tốc độ đóng việc"],
    ["SO_SANH","So sánh bốn khối kỳ vừa rồi"],
    ["TU_VAN","Diễn biến chính sách nào cần giao việc ngay"],
    ["TU_VAN","Ba việc nên làm để kỳ sau khá hơn"]);
  else if (c <= 2) r.push(["TU_VAN","Ba việc nên làm để kỳ sau khá hơn"]);
  r.push(["HUONG_DAN","“Quá hạn” khác “trễ” chỗ nào"],
         ["HUONG_DAN","Cửa sổ Điều hành để làm gì"]);
  return r.slice(0, 6);
}

function veTroLy(){
  const w = document.getElementById("tlw"), sc = document.getElementById("tlscrim");
  if (!w) return;
  w.classList.toggle("on", !!AI_MO); sc.classList.toggle("on", !!AI_MO);
  if (!AI_MO){ w.innerHTML = ""; return; }
  const hg = hangCua(me), _ok = conDuocHoi(me), duoc = _ok.duoc;
  const nvs = Object.entries(NHIEM_VU).filter(([k]) => hg.nv.includes(k));
  const dg = mucDung(me);
  const pt = Math.min(100, Math.round(dg.tien / hg.tranThang * 100));
  w.innerHTML = `
    <div class="tlh">
      <div><b>✦ Trợ lý điều hành</b>
        <i>${esc(U[me].ten)} · đang ở cửa sổ ${esc((tabs().find(x=>x[0]===TAB)||[])[1]||TAB)}</i></div>
      <button class="btn sm" onclick="dongTroLy()">Đóng</button>
    </div>
    ${!duoc ? `<div class="tlb"><div class="warn">${esc(_ok.ly)}</div>
        <div class="tlhg"><span class="tlhi">${hg.ic}</span><div><b>${esc(hg.ten)}</b>
          <i>${esc(hg.mo)}</i></div></div></div>`
    : `<div class="tlb">
      <div class="tlhg"><span class="tlhi">${hg.ic}</span>
        <div><b>${esc(hg.ten)}</b>${hg.tuDong?"":`<span class="tlgt">gán tay</span>`}
          <i>${esc(hg.mo)}</i></div></div>
      <div class="tlmh">
        <span>Mô hình</span>
        ${hg.chonMoHinh
          ? `<select class="lsel" onchange="AI_MH=this.value;veTroLy()">${hg.moHinh.map(k=>
              `<option value="${k}" ${AI_MH===k?"selected":""}>${MO_HINH[k].ten} — ${
                (MO_HINH[k].vao/1000).toLocaleString("vi")}k đ/1tr token vào</option>`).join("")}</select>`
          : `<b>${esc(MO_HINH[hg.macDinh].ten)}</b><i>cố định theo ${esc(hg.ten)} — chỉ Ban Giám đốc chọn được mô hình</i>`}
      </div>
      ${hg.chonMoHinh&&MO_HINH[AI_MH]?`<div class="tlmhm">${esc(MO_HINH[AI_MH].dung)}. ${esc(MO_HINH[AI_MH].luu)}</div>`:""}
      <div class="tlnv">${nvs.map(([k,v])=>`<button class="${AI_NV===k?"on":""}" onclick="datNV('${k}')"
        title="${esc(v.mo)}"><span>${v.ic}</span>${esc(v.ten)}</button>`).join("")}</div>
      <div class="tlmo">${esc(NHIEM_VU[AI_NV].mo)}. <b>Trả về:</b> ${esc(NHIEM_VU[AI_NV].ra)}.</div>

      <div class="tlo">
        <textarea class="inp tlta" rows="2" placeholder="Hỏi thêm cho cụ thể — để trống cũng được, trợ lý sẽ tổng hợp theo nhiệm vụ đã chọn"
          oninput="AI_HOI=this.value">${esc(AI_HOI)}</textarea>
        <button class="btn pri" onclick="hoiTroLy()" ${AI_CHAY?"disabled":""}>${AI_CHAY?"Đang hỏi…":"Hỏi"}</button>
      </div>
      <div class="tlgy">${goiYHoi().map(([k,q])=>`<button onclick="AI_NV='${k}';AI_HOI=${JSON.stringify(q)};veTroLy()">${esc(q)}</button>`).join("")}</div>

      <div class="tlct">
        <span title="Chỉ dữ liệu bạn được đọc mới vào gói">◎ Phạm vi: đúng tầm nhìn của bạn</span>
        <span title="${AI_CH.giauViecMat?"Việc mật thay tiêu đề bằng mã trước khi gửi":"CẢNH BÁO: tiêu đề việc mật đang được gửi nguyên văn"}">${
          AI_CH.giauViecMat?"◈ Việc mật: giấu tiêu đề":"⚠ Việc mật: GỬI NGUYÊN VĂN"}</span>
        <span title="Trợ lý chỉ đề xuất, mọi thao tác do bạn xác nhận">✎ Không tự hành động</span>
        <span title="Phạm vi dữ liệu = giao của hạng sử dụng và quyền thật của bạn">◫ Đọc tới: ${esc(PHAM_VI[pvAI(me)].ten.toLowerCase())}</span>
        ${hg.ngoai?`<span title="Dữ liệu bối cảnh ngành và mốc đối chiếu được gửi kèm">⌖ Có dữ liệu đối chiếu ngoài</span>`:""}
      </div>

      ${AI_CHAY?`<div class="tlload"><span></span><span></span><span></span> Đang đóng gói số liệu và hỏi…</div>`:""}

      ${AI_PHIEN.map((x,i)=>`<div class="tlk">
        <div class="tlkh"><span class="tlki">${NHIEM_VU[x.nv].ic}</span>
          <div><b>${esc(NHIEM_VU[x.nv].ten)}</b>${x.hoi?`<i>“${esc(x.hoi)}”</i>`:""}</div>
          <span class="tlkt">${esc(x.luc)}</span></div>
        ${x.kq.tra.map(b=>`<div class="tls ${b.nho?"nho":""}"><b>${esc(b.tieu)}</b>
          <ul>${b.y.map(y=>`<li>${esc(y)}</li>`).join("")}</ul></div>`).join("")}
        <div class="tlf">
          ${x.kq.taiCho?`<span class="tltc" title="Bản chạy thử chưa nối máy chủ. Câu trả lời dựng tại chỗ TỪ CHÍNH GÓI DỮ LIỆU đó, nên số liệu là số thật.">dựng tại chỗ — chưa nối máy chủ</span>`:""}
          <span>${x.kq.token.vao.toLocaleString("vi")} token vào · ${x.kq.token.ra.toLocaleString("vi")} ra
            · ${(x.kq.chiPhi||0).toLocaleString("vi")} đ${x.mh?` · ${esc(MO_HINH[x.mh].ten)}`:""}</span>
          <button class="btn sm" onclick="xemGoi(${i})">${AI_GOI_XEM===i?"Ẩn gói dữ liệu":"Xem gói đã gửi"}</button>
        </div>
        ${AI_GOI_XEM===i?`<pre class="tlgoi">${esc(JSON.stringify(x.goi, null, 1))}</pre>`:""}
        <div class="tlnut2">
          <button class="btn sm" onclick="dongTroLy();go('bc')">Mở Giao ban để đối chiếu</button>
          <button class="btn sm" onclick="dongTroLy();moTao('CONG_VIEC')">Tạo việc từ đề xuất</button>
        </div>
      </div>`).join("")}

      ${!AI_PHIEN.length&&!AI_CHAY?`<div class="tlrong">
        <b>Trợ lý đọc đúng những gì bạn đọc được.</b>
        <p>Số liệu do phần mềm tính sẵn rồi mới đưa sang — trợ lý viết nhận định, không tự cộng trừ.
        Vì vậy con số trong câu trả lời luôn khớp với con số trên màn hình.</p>
        <p>Chọn một nhiệm vụ ở trên, hoặc bấm một câu gợi ý.</p></div>`:""}
    </div>
    <div class="tltran"><div class="tltb"><span style="width:${pt}%;background:${
        pt>=90?"#C0392B":pt>=70?"#C8901A":"var(--navy2)"}"></span></div>
      <span>Hạn mức của bạn: <b>${dg.ngay}/${hg.luotNgay}</b> lượt hôm nay ·
        <b>${dg.tien.toLocaleString("vi")}/${hg.tranThang.toLocaleString("vi")} đ</b> tháng này.
        Toàn công ty ${AI_CH.daTieu.toLocaleString("vi")}/${AI_CH.tranThang.toLocaleString("vi")} đ.
        Chạm trần thì trợ lý khoá lại cho tới khi người quản trị nâng.</span></div>`}`;
}

function draw(){ drawNav(); drawNoti(); $("#app").innerHTML = ({
  toi:vToi, dh:vDieuHanh, lap:vSoLap, ns:vNhanSu, cong:vCong, da:vDuAn, bc:vBaoCao, qt:vQuanTri, xong:vXong }[TAB] || vToi)();
  /* Ngăn giao việc dùng chung mọi ô nhập với trang Giao việc, mà các ô đó gọi draw()
     sau mỗi lần đổi. Vẽ lại ngăn ngay tại đây thì không phải sửa từng chỗ gọi. */
  if (NGAN_GIAO) veNganGiao();
  veTroLy();          /* ngăn trợ lý bám theo cửa sổ đang mở nên phải vẽ lại cùng nhịp */
  $("#app").insertAdjacentHTML("beforeend", veTao()); }

/* ---------- 1. VIỆC CỦA TÔI — LỌC THEO VAI RACI ---------- */
let LOC_VAI = "TAT_CA";
function setVai(v){ LOC_VAI = v; draw(); }
/* CỬA SỔ NỔI TẠO VIỆC
   Biểu mẫu giao việc trước đây chỉ sống ở tab riêng, và mở tab đó ra thì thấy một
   khung trống bảo "chọn một nhóm việc ở trên" — thêm một cú bấm thừa trước khi làm
   được gì. Nay bấm từ Việc của tôi là mở thẳng cửa sổ nổi với nhóm việc đã chọn sẵn,
   dùng lại ĐÚNG biểu mẫu đó chứ không dựng bản thứ hai để hai nơi lệch nhau. */
let TAO_MO = false;
function moTao(nhom){
  TAO_MO = true;
  GTAB = "moi";
  FRM = newFrm(nhom);
  if (nhom === "DOT_XUAT"){ FRM.ah = 4; FRM.kc = 5; }
  if (!coQuyen(me,"giao_viec") || !capDuoi().length) FRM.lam = me;
  draw();
}
function dongTao(){ TAO_MO = false; draw(); }
function veTao(){
  if (!TAO_MO) return "";
  const N = {CONG_VIEC:["Công việc","Việc thường, có hạn và sản phẩm phải nộp"],
             DU_AN:["Dự án","Việc lớn có việc con, mốc bàn giao và ngân sách"],
             CHU_KY:["Việc lặp","Lập một lần, hệ thống tự sinh kỳ mới theo lịch"],
             DOT_XUAT:["Đột xuất","Việc ngoài kế hoạch, phải ghi rõ nguồn phát sinh"]};
  const n = N[FRM.nhom] || N.CONG_VIEC;
  return `<div class="tso" onclick="dongTao()"></div>
    <div class="tsw" role="dialog">
      <div class="tsh"><div class="tsin">
        <div><span class="tsl">${coQuyen(me,"giao_viec") && capDuoi().length ? "Giao việc" : "Tự tạo việc"}</span>
          <b>${n[0]}</b><i>${n[1]}</i></div>
        <button class="x" onclick="dongTao()">✕</button>
      </div></div>
      <div class="tsn">
        <div class="sg tsg">${Object.entries(N).map(([k,v])=>
          `<button class="${FRM.nhom===k?"on":""}" onclick="moTao('${k}')">${v[0]}</button>`).join("")}</div>
      </div>
      <div class="tsb">${khoiMau(FRM)}${formGiao(FRM, false)}</div>
    </div>`;
}

/* Một dòng nói rõ cửa sổ này khác ba cửa sổ kia ở chỗ nào. Bốn cửa sổ dùng chung
   một tập việc, nên nếu không nói ra thì người dùng phải tự đoán vào đâu. */
const VAI_CS = {
  toi:  ["Việc CÓ TÊN BẠN", "bạn làm, bạn duyệt, bạn phối hợp hoặc bạn theo dõi — đây là chỗ bạn tự tay xử lý"],
  dh:   ["Việc CẦN BẠN CAN THIỆP hôm nay", "không phải việc bạn làm, mà là việc của người khác đang chờ bạn gỡ"],
  cong: ["MỌI việc trong tầm nhìn của bạn", "chỗ tra cứu và lọc — không có nút thao tác, muốn tác động thì bấm vào dòng"],
  ns:   ["CON NGƯỜI, không phải việc", "ai đang quá tải, ai đang ôm việc quá hạn, kỳ qua ai ra sao"],
};
function vaiCuaSo(k){
  const o = VAI_CS[k]; if (!o) return "";
  const khac = Object.entries(VAI_CS).filter(([x]) => x !== k)
    .map(([x,v]) => `<b>${{toi:"Việc của tôi",dh:"Điều hành",cong:"Theo dõi",ns:"Cá nhân"}[x]}</b>: ${v[0].toLowerCase()}`);
  return `<div class="vcs"><span class="vcsi">◎</span>
    <div><b>${o[0]}</b> — ${o[1]}.
      <span class="vcsk">Ba cửa sổ còn lại: ${khac.join(" · ")}.</span></div></div>`;
}

function vToi(){
  /* Màn hình này trả lời một câu: HÔM NAY TÔI LÀM GÌ TRƯỚC.
     Bản trước mở ra là bốn nhóm việc xếp theo hạn — đúng nhưng chưa đủ để quyết:
     không có con số tổng, không nói việc nào nên động tới đầu tiên, và việc đã duyệt
     xong thì biến mất hẳn nên người làm không thấy thành quả của chính mình. */
  const coTen = T.filter(t => xemDuoc(t) && vaiCuaToi(t));
  const tatCa = coTen.filter(viecMo);
  const dem = {R:0, A:0, C:0, I:0};
  tatCa.forEach(t => dem[vaiCuaToi(t)]++);
  const mine = LOC_VAI === "TAT_CA" ? tatCa : tatCa.filter(t => vaiCuaToi(t) === LOC_VAI);

  const G = {qh:[],hn:[],tn:[],sd:[]};
  mine.forEach(t => G[bucket(t.han, t)].push(t));
  const xepUu = (x,y) => (uuTien(x).muc - uuTien(y).muc) || (conLai(x) - conLai(y));
  Object.values(G).forEach(a => a.sort(xepUu));
  const N = {qh:"Quá hạn", hn:"Đến hạn hôm nay", tn:"Trong tuần này", sd:"Sau tuần này"};
  const GT = {qh:"Đã vượt hạn cam kết — xử lý hoặc nêu ý kiến ngay",
              hn:"Hết hôm nay là trễ", tn:"Còn dư địa nhưng đừng để dồn", sd:"Chưa gấp, xem để biết"};

  /* Việc nên động tới trước — chỉ chọn thứ TÔI THỰC SỰ LÀM ĐƯỢC, và xếp theo mức
     chặn người khác chứ không chỉ theo hạn:
       1. Phiếu chờ tôi duyệt   — người khác đang đứng chờ tôi, tôi là nút thắt
       2. Việc quá hạn tôi làm  — đã vỡ cam kết
       3. Việc gấp nhất tôi làm
     Việc mình chỉ theo dõi thì không gợi ý: nhìn thấy nhưng không làm gì được. */
  const choDuyet = tatCa.filter(t => canDuyetNgay(t)).sort(xepUu);
  const lamDuoc = tatCa.filter(t => vaiCuaToi(t) === "R" && t.tt !== "CHO_DUYET" && t.tt !== "CHO_DUYET_2").sort(xepUu);
  const canThiep = tatCa.filter(t => vaiCuaToi(t) === "A" && quaHan(t)).sort(xepUu);
  const dauTien = choDuyet[0] ? {t:choDuyet[0], v:"Duyệt phiếu"}
                : canThiep[0] ? {t:canThiep[0], v:"Can thiệp việc quá hạn"}
                : lamDuoc[0]  ? {t:lamDuoc[0],  v:"Bắt đầu từ"} : null;
  const xongGanDay = coTen.filter(t => t.tt === "HOAN_THANH");
  const dangDungDH = tatCa.filter(dangDung);

  /* ---- hero kiểu bảng điều khiển: chào theo tên + bốn ô số đè lên mép banner.
     Lời chào cố định "Xin chào" (không đổi theo giờ thật) để kết quả vẽ tất định —
     ngày hệ thống là mốc giả lập, giờ máy thật sẽ làm hai lần chạy vẽ khác nhau. ---- */
  let h = `<div class="hero">
      <span class="hero-hi">Xin chào 👋</span>
      <h1 class="hero-ten">${U[me].ten}</h1>
      <p class="hero-sub">${U[me].cd} · hôm nay ${fmtDY(TODAY)} · ${tatCa.length} việc đang mở có tên bạn.</p>
    </div>`;

  h += oKPI([
    ["Quá hạn", G.qh.length, G.qh.length?"xử lý hoặc nêu ý kiến ngay":"không có việc nào trễ",
      G.qh.length?"var(--red)":"#1B5E20"],
    ["Đến hạn hôm nay", G.hn.length, "hết hôm nay là trễ", G.hn.length?"#8A6D3B":""],
    ["Chờ tôi duyệt", choDuyet.length, choDuyet.length?"người khác đang đợi bạn":"không ai phải đợi bạn",
      choDuyet.length?"#8A6D3B":"#1B5E20"],
    ["Đã xong", xongGanDay.length, "việc có tên bạn đã được duyệt", "#1B5E20"],
  ]);

  h += vaiCuaSo("toi");

  /* ---- dòng kết luận: nói thẳng hôm nay phải động tới cái gì ---- */
  const gap = G.qh.length + G.hn.length;
  const mau = G.qh.length ? "r" : gap ? "a" : "g";
  h += `<div class="kl ${mau}"><span class="ki">${G.qh.length?"✕":gap?"!":"✓"}</span><div>
      <span class="kt">${G.qh.length ? `${G.qh.length} việc đã quá hạn`
        : gap ? `${gap} việc đến hạn hôm nay` : "Không việc nào tới hạn hôm nay"}</span>
      <div class="ks">${dauTien
        ? `<b>${dauTien.v}</b>: ${esc(dauTien.t.ttl)} — ${utHTML(dauTien.t,1)} ${dlText(dauTien.t.han,dauTien.t).t.toLowerCase()}`
        : "Không có việc nào cần bạn động tới ngay."}${
        choDuyet.length ? ` · <b>${choDuyet.length} phiếu</b> đang chờ bạn duyệt` : ""}${
        dangDungDH.length ? ` · ${dangDungDH.length} việc đang dừng đồng hồ chờ trả lời` : ""}</div>
    </div></div>`;

  /* Tạo việc ngay tại đây — biểu mẫu giao việc đã gộp vào cửa sổ này. */
  h += nutTao(false);

  /* ---- lọc theo vai ---- */
  h += `<div class="vsw" style="margin-bottom:8px">
      <button class="${LOC_VAI==="TAT_CA"?"on":""}" onclick="setVai('TAT_CA')">Tất cả ${tatCa.length}</button>
      ${Object.entries(VAI_TEN).map(([k,x])=>`<button class="${LOC_VAI===k?"on":""}" onclick="setVai('${k}')"
        title="${x[2]}"><b style="margin-right:5px">${x[0]}</b>${x[1]} ${dem[k]}</button>`).join("")}
    </div>
    <div style="font-size:12.5px;color:var(--mute);margin-bottom:16px">
      ${LOC_VAI==="TAT_CA"
        ? `<b>R</b> tôi chịu trách nhiệm về kết quả · <b>A</b> tôi nghiệm thu và chấm điểm · <b>C</b> tôi hỗ trợ, không chấm điểm · <b>I</b> tôi chỉ cần biết`
        : `Đang lọc: <b>${VAI_TEN[LOC_VAI][1]}</b> — ${VAI_TEN[LOC_VAI][2]}.`}
    </div>`;

  if (!mine.length) h += `<div class="card empty"><div class="ic">✓</div>
    ${LOC_VAI==="TAT_CA" ? "Không còn việc nào đang mở." : `Không có việc nào bạn giữ vai ${VAI_TEN[LOC_VAI][0]}.`}</div>`;

  for (const k of ["qh","hn","tn","sd"]){
    if (!G[k].length) continue;
    h += `<div class="grp ${k}"><div class="grp-h">
        <h2 style="font:inherit;margin:0">${N[k]}</h2><span class="n">${G[k].length}</span>
        <span style="font-size:12px;color:var(--mute);margin-left:10px">${GT[k]}</span>
        <span class="ln"></span></div>
        <div class="rows">${dauViec()}${G[k].map(t=>rowHTML(t,k)).join("")}</div></div>`;
  }

  /* ---- việc đã xong: trước đây duyệt xong là biến mất, không thấy thành quả đâu ---- */
  if (xongGanDay.length){
    const diem = xongGanDay.filter(t=>t.diem);
    const tb2 = diem.length ? diem.reduce((a,t)=>a+t.diem.tong,0)/diem.length : null;
    h += `<div class="gvc" style="margin-top:18px">
      <details class="ac" ${XONG_MO?"open":""}><summary onclick="setTimeout(()=>{XONG_MO=!XONG_MO},0)">
        Đã xong — ${xongGanDay.length} việc${tb2?` · điểm trung bình ${so2(tb2)}`:""}</summary>
      <div class="msp" style="margin-top:12px"><table><thead><tr>
        <th style="width:74px">Mã</th><th style="min-width:300px">Công việc</th><th>Vai của tôi</th>
        <th>Hạn cam kết</th><th>Nộp lúc</th><th>Đúng hạn</th><th>Độ khó</th><th>Điểm</th><th>Người duyệt</th>
      </tr></thead><tbody>
        ${xongGanDay.sort((a,b)=>ngayXong(b)-ngayXong(a)).map(t=>{
          const nx = ngayXong(t), som = dCong(nx, parse(t.han));
          return `<tr onclick="openDw('${t.id}')" style="cursor:pointer">
            <td class="cot"><b>${t.id}</b></td>
            <td class="cot" style="left:74px"><span class="tn2">${esc(t.ttl)}</span></td>
            <td>${vaiHTML(t)||"—"}</td>
            <td>${t.han}${t.doi?` <span class="tag a">dời ${t.doi} lần</span>`:""}</td>
            <td>${fmtNgay(nx)}</td>
            <td><span class="tag ${som>=0?"g":"r"}">${som>=0?(som?`sớm ${som} ngày`:"đúng ngày"):`trễ ${-som} ngày`}</span></td>
            <td class="num">${t.dk}</td>
            <td class="num"><b style="font-size:14px;color:var(--navy)">${t.diem?so2(t.diem.tong):"—"}</b></td>
            <td>${t.diem?esc(t.diem.ai):"—"}</td></tr>`;}).join("")}
      </tbody></table></div>
      <div class="note" style="margin-top:12px;margin-bottom:0">Cột <b>Hạn cam kết</b> hiện kèm số lần dời:
        về đích đúng hạn sau khi đã dời hạn ba lần thì không phải đúng hạn. Điểm ở đây là điểm từng việc;
        điểm tháng có nhân trọng số độ khó nằm ở cửa sổ <b>Cá nhân</b>.</div>
      </details></div>`;
  }
  return h;
}
let XONG_MO = false;

/* Đề mục của bảng việc — dùng chung một lưới với từng dòng để cột thẳng hàng. */
function dauViec(){
  return `<div class="vh">
    <span class="hvai" title="Vai của tôi trong việc: R làm · A duyệt · C phối hợp · I theo dõi">Vai</span>
    <span class="hten">Công việc</span>
    <span class="hlam">Người thực hiện</span>
    <span class="hgiao">Người giao</span>
    <span class="hut">Ưu tiên</span>
    <span class="htt">Trạng thái</span>
    <span class="ph">Hạn · tiến độ</span>
  </div>`;
}
function rowHTML(t, k){
  const d = dlText(t.han,t), p = pct(t), st = TT[t.tt];
  const v = vaiCuaToi(t), V = v ? VAI_TEN[v] : null;
  return `<div class="row ${k||""}" onclick="openDw('${t.id}')">
    <span class="vbar"></span>
    <span class="vcol">${V?`<span class="vai ${V[3]||"n"}" title="${V[2]}"><b>${V[0]}</b><i>${V[1].replace("Tôi ","")}</i></span>`:"—"}</span>
    <div class="vten">
      <div class="ttl">${esc(t.ttl)}</div>
      <div class="vsub"><span>${t.id}</span>${ruiRoHTML(t)}
        ${t.luat?`<span class="tag law">Hạn pháp lý</span>`:""}
        ${(t.tuTao||t.giao===t.lam)?`<span class="tag m">tự khai</span>`:""}</div>
    </div>
    <span class="vng vlam">${avHTML(t.lam,22)}<i>${esc(U[t.lam].ten)}</i></span>
    <span class="vng vgiao">${avHTML(t.giao,22)}<i>${esc(U[t.giao].ten)}</i></span>
    <span class="vut">${utHTML(t,1)}</span>
    <span class="vtt"><span class="tag ${st[1]}">${st[0]}</span></span>
    <div class="rt">
      <span class="dl ${d.c}">${d.t}</span>
      <span class="pg" title="${p}% tiêu chí đã đạt"><i style="width:${p}%"></i></span>
    </div></div>`;
}

/* ---------- 2. CHỜ TÔI DUYỆT ---------- */

/* ---------- 3. VIỆC CỦA ĐỘI ---------- */
/* ================= ĐIỀU HÀNH — MÀN HÌNH VẬN HÀNH HẰNG NGÀY =================
   Trả lời đúng một câu hỏi: HÔM NAY TÔI PHẢI CAN THIỆP VÀO ĐÂU.
   Khác hẳn màn hình Đánh giá, vốn nhìn lại kỳ đã qua và nhìn vào con người.
   Bốn phần theo đúng thứ tự một người quản lý cần: tôi có đang chặn ai không →
   việc nào sắp vỡ → ai đang gánh quá sức → nhịp chung của đội.               */
const VM = {
  MOI:        {ten:"Mới",           mau:"#4a3aa7"},
  DANG_LAM:   {ten:"Đang làm",      mau:"#2a78d6"},
  CHO_DUYET:  {ten:"Chờ duyệt",     mau:"#eda100"},
  HOAN_THANH: {ten:"Hoàn thành",    mau:"#008300"},
  QUA_HAN:    {ten:"Quá hạn",       mau:"#e34948"},
};

const VIEWS = [
  ["bang",  "Bảng",       "Danh sách gom theo cây, kèm bốn vai RACI"],
  ["kanban","Kanban",     "Cột theo trạng thái, nhìn ra việc đang tắc ở đâu"],
  ["gantt", "Gantt",      "Trục thời gian, nhìn ra việc nào chồng nhau"],
  ["lich",  "Lịch",       "Theo tháng, nhìn ra ngày nào dồn nhiều hạn"],
  ["tai",   "Tải người",  "Khối lượng từng người theo tuần, nhìn ra ai quá tải"],
  ["bd",    "Biểu đồ",    "Sáu biểu đồ điều hành và bốn chỉ số tổng"],
];

let VIEW = "bang";

let DH_DV = "TAT_CA";
/* =====================================================================
   BÁO CÁO GIAO BAN

   Một cuộc họp giao ban luôn có đúng ba phần, và báo cáo phải xếp theo đúng ba phần đó:
     A. Kỳ vừa qua làm được gì   — nhìn lại, đã xong rồi không sửa được nữa
     B. Kỳ này sẽ làm gì         — cam kết, còn thay đổi được
     C. Cần quyết trong cuộc họp — thứ duy nhất không tự chạy nếu không ai quyết

   Phần C là phần hay bị bỏ nhất và cũng là phần duy nhất khiến cuộc họp có ích.
   Một báo cáo chỉ có số liệu thì họp xong ai về chỗ nấy; báo cáo có mục "cần quyết"
   thì cuộc họp buộc phải ra quyết định.
   ===================================================================== */
const BC_KY = {TUAN:"Tuần", THANG:"Tháng", QUY:"Quý"};
let BC_LOAI = "TUAN", BC_LECH = 0, BC_DV = "TAT_CA", BC_CAP = "CTY";

/* Khoảng thời gian của kỳ. lech = 0 là kỳ đang chạy, -1 là kỳ trước. */
function fmtDY(d){ return `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`; }
/* Số thứ tự tuần trong năm theo chuẩn ISO — để gọi tên tuần cho thống nhất. */
function soTuan(d){
  const a = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  a.setDate(a.getDate() + 4 - (a.getDay() || 7));
  return Math.ceil(((a - new Date(a.getFullYear(), 0, 1)) / 86400000 + 1) / 7);
}
function khoangKy(loai, lech){
  const d = new Date(TODAY);
  /* Mỗi kỳ luôn kèm KHOẢNG NGÀY tường minh: người đọc báo cáo phải biết chính xác
     "tuần qua" là từ ngày nào đến ngày nào, không phải tự suy ra. */
  if (loai === "TUAN"){
    while (d.getDay() !== 1) d.setDate(d.getDate()-1);
    d.setDate(d.getDate() + lech*7);
    const den = new Date(d); den.setDate(den.getDate()+6);
    return {tu:d, den, ten:`Tuần ${soTuan(d)}`, khoang:`${fmtDY(d)} – ${fmtDY(den)}`,
            day:`Tuần ${soTuan(d)} (${fmtDY(d)} – ${fmtDY(den)})`};
  }
  if (loai === "THANG"){
    const t = new Date(d.getFullYear(), d.getMonth()+lech, 1);
    const den = new Date(t.getFullYear(), t.getMonth()+1, 0);
    return {tu:t, den, ten:`Tháng ${t.getMonth()+1}/${t.getFullYear()}`, khoang:`${fmtDY(t)} – ${fmtDY(den)}`,
            day:`Tháng ${t.getMonth()+1}/${t.getFullYear()} (${fmtDY(t)} – ${fmtDY(den)})`};
  }
  const q0 = Math.floor(d.getMonth()/3) + lech;
  const t = new Date(d.getFullYear(), q0*3, 1);
  const den = new Date(t.getFullYear(), t.getMonth()+3, 0);
  const q = `Quý ${Math.floor(t.getMonth()/3)+1}/${t.getFullYear()}`;
  return {tu:t, den, ten:q, khoang:`${fmtDY(t)} – ${fmtDY(den)}`, day:`${q} (${fmtDY(t)} – ${fmtDY(den)})`};
}
function trongKhoang(d, k){ return d2(d) >= d2(k.tu) && d2(d) <= d2(k.den); }

/* Nhánh người mà tôi được đọc dữ liệu. Tính một lần cho mỗi lượt vẽ vì doiCuaToi()
   duyệt đệ quy cả cây — gọi cho từng việc thì mỗi lần vẽ chạy hàng nghìn lượt. */
let _NHANH = null, _NHANH_CUA = null;
function nhanhCuaToi(){
  if (_NHANH_CUA !== me){ _NHANH_CUA = me; _NHANH = new Set([me, ...doiCuaToi()]); }
  return _NHANH;
}
/* Một việc có nằm trong tầm nhìn của tôi không — GIAO của hai lớp:
     lớp bảo mật (xemDuoc) VÀ lớp nhánh tổ chức.
   Lớp nhánh nới ra đúng một chỗ: có tên trong phiếu thì luôn đọc được, nếu không
   người phối hợp ngoài phòng sẽ không mở nổi việc mà chính họ đang hỗ trợ. */
function trongTamNhin(t){
  if (!xemDuoc(t)) return false;
  if (coQuyen(me, "xem_toan_cty")) return true;
  if (t.lam === me || t.giao === me) return true;
  if (nhanhCuaToi().has(t.lam)) return true;
  return !!vaiCuaToi(t);
}
/* Các cấp báo cáo người này được phép mở. Không có quyền thì chip không hiện —
   ẩn nút còn hơn để bấm rồi báo lỗi. */
function capBCChoPhep(){
  const ra = [];
  if (coQuyen(me, "xem_toan_cty")) ra.push("CTY");
  if (coQuyen(me, "xem_doi") && doiCuaToi().length) ra.push("DV");
  ra.push("NS");
  return ra;
}
/* Đơn vị được phép chọn: đơn vị mà tôi thấy được ít nhất một người trong đó. */
function dvBCChoPhep(){
  const nh = nhanhCuaToi(), toan = coQuyen(me, "xem_toan_cty");
  return Object.entries(DV).filter(([k]) => k !== "HDQT" && k !== "CTY")
    .filter(([k]) => Object.values(U).some(u => trongDV(u.id, k) && (toan || nh.has(u.id))))
    .map(([k, d]) => [k, d]);
}
/* Người được phép chọn: chính mình, cộng nhánh mình quản. */
function nguoiBCChoPhep(){
  const nh = nhanhCuaToi(), toan = coQuyen(me, "xem_toan_cty");
  /* Cấp báo cáo "Cá nhân" của BGĐ liệt kê cấp trưởng phó và người BGĐ trực tiếp giao —
     42 dòng tên nhân viên trong ô chọn thì không ai chọn nổi, và cũng không phải
     đối tượng BGĐ theo dõi. Tắt ống kính thì hiện đủ. */
  return Object.values(U).filter(u => (toan || nh.has(u.id)) && nguoiTamDH(u.id));
}
/* Phạm vi báo cáo: toàn công ty, một đơn vị, hoặc một người — luôn cắt theo tầm nhìn. */
function phamViBC(){
  const tatCa = T.filter(trongTamNhin);
  if (BC_CAP === "NS")  return tatCa.filter(t => t.lam === BC_DV);
  if (BC_CAP === "DV")  return tatCa.filter(t => trongDV(t.lam, BC_DV));
  return tatCa;
}
/* Ép mọi lựa chọn về trong phạm vi cho phép. Gọi ở đầu mỗi lượt vẽ Giao ban,
   vì đổi vai đang xem có thể làm lựa chọn cũ thành trái phép. */
function chuanBC(){
  const cap = capBCChoPhep();
  if (!cap.includes(BC_CAP)){ BC_CAP = cap[0]; BC_DV = BC_CAP === "CTY" ? "TAT_CA" : BC_CAP === "DV" ? null : me; BC_MO = null; }
  if (BC_CAP === "DV"){
    const ds = dvBCChoPhep();
    if (!ds.some(([k]) => k === BC_DV)) BC_DV = ds.length ? ds[0][0] : null;
  }
  if (BC_CAP === "NS"){
    const ds = nguoiBCChoPhep();
    if (!ds.some(u => u.id === BC_DV)) BC_DV = me;
  }
  if (BC_CAP === "CTY" && BC_MO && !dvBCChoPhep().some(([k]) => k === BC_MO)) BC_MO = null;
}
function tenPhamVi(){
  if (BC_CAP === "NS") return U[BC_DV] ? `${U[BC_DV].ten} — ${U[BC_DV].cd}` : "—";
  if (BC_CAP === "DV") return DV[BC_DV] ? DV[BC_DV].ten : "—";
  return "Toàn công ty";
}
/* --- BỘ CHỌN NGƯỜI CÓ TÌM KIẾM ---
   44 người trong một danh sách xổ xuống là quá dài để rê chuột tìm. Hai bước:
     1. chọn phòng ban  → danh sách rút còn vài người
     2. gõ vài chữ      → lọc tiếp theo tên, chức danh hoặc đơn vị
   Bỏ dấu tiếng Việt khi so khớp, để gõ "thanh ha" vẫn ra "Lê Thị Thanh Hà". */
let CN_MO = null, CN_TIM = "", CN_DV = "TAT_CA";
function boDau(x){ return (x||"").normalize("NFD").replace(/[̀-ͯ]/g,"")
  .replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase(); }
function moChon(id, ev){ if (ev) ev.stopPropagation();
  CN_MO = CN_MO === id ? null : id; CN_TIM = ""; draw();
  if (CN_MO) setTimeout(() => { const o = $("#cnTim"); if (o) o.focus(); }, 30); }
function timChon(v){ CN_TIM = v;
  const h = $("#cnDs"); if (!h) return;
  h.innerHTML = dsChonHTML();                       /* vẽ lại riêng danh sách, không vẽ lại cả trang
                                                       để ô gõ không bị mất con trỏ */ }
function locDV(v){ CN_DV = v; CN_TIM = ""; draw();
  setTimeout(() => { const o = $("#cnTim"); if (o) o.focus(); }, 30); }
function dsChon(){
  const q = boDau(CN_TIM.trim());
  return nguoiBCChoPhep()
    .filter(u => CN_DV === "TAT_CA" || trongDV(u.id, CN_DV))
    .filter(u => !q || boDau(u.ten).includes(q) || boDau(u.cd).includes(q)
              || boDau(DV[u.dv] ? DV[u.dv].ten : "").includes(q) || boDau(u.id).includes(q))
    .sort((a,b) => capViec(a.id) - capViec(b.id) || a.ten.localeCompare(b.ten, "vi"));
}
function dsChonHTML(){
  const ds = dsChon();
  if (!ds.length) return `<div class="cnko">Không ai khớp “${esc(CN_TIM)}”${
    CN_DV!=="TAT_CA"?` trong ${esc(DV[CN_DV]?DV[CN_DV].ten:"")}`:""}. Thử bỏ bớt chữ, hoặc chọn <b>Tất cả phòng ban</b>.</div>`;
  let dvTruoc = "";
  return ds.map(u => {
    const dv = DV[u.dv] ? DV[u.dv].ten : "—";
    const dau = dv !== dvTruoc ? (dvTruoc = dv, `<div class="cnnh">${esc(dv)}</div>`) : "";
    return `${dau}<div class="cni ${BC_DV===u.id?"chon":""}" onclick="chonNguoi('${u.id}')">
      ${avHTML(u.id,26)}<div><b>${esc(u.ten)}</b><span>${esc(u.cd)}</span></div>
      ${BC_DV===u.id?`<i>✓</i>`:""}</div>`;
  }).join("");
}
function chonNguoi(id){ if (!nguoiBCChoPhep().some(u => u.id === id)) return;   /* chặn cả ở tầng hành động */
  BC_DV = id; CN_MO = null; CN_TIM = ""; SO_MO = null; draw(); }
/* Cây phòng ban cho ô lọc — chỉ hiện đơn vị thật sự có người. */
function oLocDV(){
  const cho = nguoiBCChoPhep();
  const ra = []; (function di(ma, sau){
    Object.entries(DV).filter(([k,d]) => d.cha === ma).forEach(([k,d]) => {
      const n = cho.filter(u => trongDV(u.id, k)).length;
      if (n) ra.push(`<option value="${k}" ${CN_DV===k?"selected":""}>${"　".repeat(sau)}${sau?"└ ":""}${esc(d.ten)} (${n})</option>`);
      di(k, sau + 1);
    });
  })("CTY", 0);
  return `<select class="lsel ${CN_DV!=="TAT_CA"?"on":""}" style="max-width:250px" onchange="locDV(this.value)">
    <option value="TAT_CA" ${CN_DV==="TAT_CA"?"selected":""}>Tất cả phòng ban (${cho.length})</option>
    ${ra.join("")}</select>`;
}
function chonNguoiHTML(){
  const u = U[BC_DV], ds = dsChon();
  return `<div class="cnw">
    ${oLocDV()}
    <div class="cn">
      <button class="cnb ${CN_MO?"mo":""}" onclick="moChon('bc',event)">
        ${u?`${avHTML(u.id,24)}<span><b>${esc(u.ten)}</b><i>${esc(u.cd)}</i></span>`
           :`<span><b>Chọn người</b></span>`}
        <u>⌄</u></button>
      ${CN_MO==="bc"?`<div class="cnp" onclick="event.stopPropagation()">
        <input id="cnTim" class="cnt" placeholder="Gõ tên, chức danh hoặc phòng ban…"
          value="${esc(CN_TIM)}" oninput="timChon(this.value)">
        <div class="cns">${ds.length} người${CN_DV!=="TAT_CA"?` trong ${esc(DV[CN_DV]?DV[CN_DV].ten:"")}`:" toàn công ty"}</div>
        <div id="cnDs" class="cnd">${dsChonHTML()}</div>
      </div>`:""}
    </div></div>`;
}
function setBC(k, v){ SO_MO = null; CN_MO = null; CN_TIM = "";
  if (k === "cap"){
    if (!capBCChoPhep().includes(v)) return;      /* không có quyền thì không đổi được cấp */
    BC_CAP = v; BC_MO = null;
    BC_DV = v === "CTY" ? "TAT_CA"
          : v === "DV"  ? ((dvBCChoPhep()[0] || [null])[0])
          : me;
  }
  else if (k === "loai") BC_LOAI = v; else if (k === "lech") BC_LECH = +v; else { BC_DV = v; BC_MO = null; }
  draw(); }

/* --- biểu đồ cột ngang, một sắc, nhãn thẳng trên cột --- */
function cotNgang(ds, tuyChon){
  const o = tuyChon || {};
  const max = Math.max(1, ...ds.map(x => x.v));
  return `<div class="bcz">${ds.map(x => {
    const w = Math.max(2, x.v / max * 100);
    const mau = x.mau || "#2a78d6";
    return `<div class="bcr" title="${esc(x.ten)}: ${x.nhan||x.v}">
      <span class="bcl">${esc(x.ten)}</span>
      <span class="bct"><i style="width:${w}%;background:${mau}"></i>${
        o.moc!=null?`<u style="left:${Math.min(100,o.moc/max*100)}%"></u>`:""}</span>
      <b class="bcv" style="${x.dam?`color:${mau}`:""}">${x.nhan!=null?x.nhan:x.v}</b>
    </div>`;}).join("")}</div>`;
}
/* --- biểu đồ cột dọc theo thời gian, một sắc --- */
function cotDoc(ds){
  const max = Math.max(1, ...ds.map(x=>x.v));
  return `<div class="bcc">${ds.map(x=>`<div class="bcd" title="${esc(x.ten)}: ${x.v}">
      <b>${x.v}</b><i style="height:${Math.max(3, x.v/max*100)}%;background:${x.mau||"#2a78d6"}"></i>
      <span>${esc(x.ten)}</span></div>`).join("")}</div>`;
}

/* =====================================================================
   BẢNG ĐIỂM GIAO BAN — rút từ ba thực hành đã được kiểm chứng

   1. AMAZON WBR: tách CHỈ SỐ ĐẦU RA khỏi CHỈ SỐ ĐẦU VÀO, và quy định chỉ được bàn
      chỉ số đầu vào. Lý do: đúng hạn hay thông lượng là KẾT QUẢ — không ai sửa thẳng
      được. Thứ sửa được là tải người, tồn đọng, thời gian phiếu nằm chờ duyệt.
      Cuộc họp bàn chỉ số đầu ra chỉ dẫn tới trách móc; bàn chỉ số đầu vào mới ra hành động.

   2. EOS LEVEL 10: mỗi con số phải có MỘT NGƯỜI SỞ HỮU và MỘT NGƯỠNG. Ở phần bảng
      điểm không tranh luận — chỉ đọc đạt hay không đạt. Số nào không đạt thì TỰ ĐỘNG
      rơi xuống mục cần quyết. Đây là cơ chế biến báo cáo thành quyết định.

   3. NGUYÊN TẮC NGOẠI LỆ: biến động bình thường thì lướt qua, chỉ dừng lại ở chỗ bất
      thường. Vì vậy cột Kỳ trước và mũi tên xu hướng quan trọng ngang cột giá trị —
      một con số không có mốc so sánh thì không đọc được là tốt hay xấu.
   ===================================================================== */
/* =====================================================================
   BIỂU ĐỒ HÀNH VI QUÁ TRÌNH — tách TÍN HIỆU khỏi NHIỄU

   Vấn đề của mọi bảng điểm giao ban: một con số nhúc nhích là có người hỏi "sao tuần
   này tụt". Trên số nhỏ, phần lớn nhúc nhích đó là NHIỄU — đúng hạn từ 100% xuống
   67% khi kỳ trước có 5 việc và kỳ này có 6 việc thì chênh lệch đó nằm gọn trong
   biến động thường ngày của chính quá trình. Phản ứng với nhiễu làm hỏng quá trình:
   người ta đổi cách làm để chữa một thứ vốn không hỏng.

   Cách phân biệt (Wheeler, biểu đồ XmR):
     mR   = trị tuyệt đối hiệu hai kỳ liền nhau
     mR̄   = trung bình các mR
     Giới hạn tự nhiên trên  = X̄ + 2,66 × mR̄
     Giới hạn tự nhiên dưới  = X̄ − 2,66 × mR̄
   Hằng số 2,66 = 3 ÷ 1,128. Giới hạn bắt đầu ổn định từ khoảng 17 kỳ, lý tưởng 24.

   Ba quy tắc nhận tín hiệu:
     1. Một điểm nằm ngoài giới hạn
     2. Tám kỳ liên tiếp cùng một phía đường trung bình
     3. Ba trong bốn kỳ liên tiếp nằm ở phần tư ngoài cùng về cùng một phía
   Không chạm quy tắc nào thì là biến động thường — báo cáo phải NÓI RA điều đó,
   thay vì để mũi tên lên xuống khiến người đọc tưởng có chuyện.
   ===================================================================== */
const XMR_TOI_THIEU = 8;      /* dưới mức này thì chưa vẽ giới hạn, chỉ nói là chưa đủ kỳ */
const XMR_ON_DINH   = 17;     /* từ đây giới hạn mới coi là chắc */
function gioiHanTuNhien(ds, chan){
  /* Điều kiện nền của phương pháp: các kỳ phải cùng một hệ nguyên nhân. Những kỳ
     trước khi hệ thống có dữ liệu đều bằng 0 — chúng không phải "quá trình chạy kém",
     chúng là quá trình CHƯA TỒN TẠI. Để nguyên thì đường trung bình bị kéo tụt và
     mọi kỳ sau đều thành "tín hiệu tăng" giả. Cắt phần 0 dẫn đầu trước khi tính. */
  let a = ds.filter(x => x != null && !isNaN(x));
  let i0 = 0; while (i0 < a.length && a[i0] === 0) i0++;
  const v = a.slice(i0);
  if (v.length < XMR_TOI_THIEU) return {du:false, n:v.length};
  const mr = []; for (let i = 1; i < v.length; i++) mr.push(Math.abs(v[i] - v[i-1]));
  const tbX = v.reduce((a,b)=>a+b,0) / v.length;
  const tbR = mr.length ? mr.reduce((a,b)=>a+b,0) / mr.length : 0;
  let tren = tbX + 2.66*tbR, duoi = tbX - 2.66*tbR;
  /* Giới hạn tính ra có thể vượt khỏi miền giá trị có thể có — tỷ lệ phần trăm không
     thể trên 100 hay dưới 0. Wheeler gọi đây là giới hạn "không áp dụng": bỏ đi chứ
     không kẹp về biên, vì kẹp sẽ tạo ra tín hiệu giả ngay tại biên. */
  const c = chan || {};
  const boTren = c.max != null && tren > c.max, boDuoi = c.min != null && duoi < c.min;
  return {du:true, n:v.length, chac:v.length >= XMR_ON_DINH, tb:tbX, mR:tbR,
          tren, duoi, boTren, boDuoi};
}
/* Trả về mô tả tín hiệu cho giá trị mới nhất, hoặc null nếu chỉ là biến động thường. */
function tinHieu(ds, cao, chan){
  const g = gioiHanTuNhien(ds, chan);
  if (!g.du) return {g, loai:null, txt:`Mới ${g.n} kỳ có dữ liệu — cần ${XMR_TOI_THIEU} kỳ mới vẽ được giới hạn tự nhiên`};
  let a = ds.filter(x => x != null && !isNaN(x));
  let i0 = 0; while (i0 < a.length && a[i0] === 0) i0++;
  const v = a.slice(i0);
  const cuoi = v[v.length-1];
  if (!g.boTren && cuoi > g.tren) return {g, loai:cao?"tot":"xau", txt:"Vượt giới hạn trên — tín hiệu thật, phải tìm nguyên nhân"};
  if (!g.boDuoi && cuoi < g.duoi) return {g, loai:cao?"xau":"tot", txt:"Dưới giới hạn dưới — tín hiệu thật, phải tìm nguyên nhân"};
  /* quy tắc 2: tám kỳ liên tiếp cùng phía */
  let run = 1;
  for (let i = v.length-2; i >= 0; i--){
    if ((v[i] > g.tb) === (cuoi > g.tb) && v[i] !== g.tb) run++; else break;
  }
  if (run >= 8) return {g, loai:(cuoi>g.tb)===!!cao?"tot":"xau",
    txt:`${run} kỳ liên tiếp cùng phía đường trung bình — quá trình đã dịch chuyển`};
  /* quy tắc 3: ba trong bốn kỳ ở phần tư ngoài cùng */
  const bon = v.slice(-4);
  if (bon.length === 4){
    const nguongT = g.tb + (g.tren-g.tb)*0.5, nguongD = g.tb - (g.tb-g.duoi)*0.5;
    const t = bon.filter(x=>x>nguongT).length, d = bon.filter(x=>x<nguongD).length;
    if (t >= 3) return {g, loai:cao?"tot":"xau", txt:"3 trong 4 kỳ ở vùng cao bất thường — đang dịch chuyển"};
    if (d >= 3) return {g, loai:cao?"xau":"tot", txt:"3 trong 4 kỳ ở vùng thấp bất thường — đang dịch chuyển"};
  }
  return {g, loai:"thuong", txt:"Biến động thường — không phải tín hiệu, đừng đổi cách làm vì con số này"};
}

function bangDiem(tap, kyTruoc, kyNay, chuNhanh){
  const xong    = tap.filter(t => t.tt === "HOAN_THANH" && trongKhoang(ngayXong(t), kyTruoc));
  const xongTr  = tap.filter(t => t.tt === "HOAN_THANH" && trongKhoang(ngayXong(t), khoangKy(BC_LOAI, BC_LECH-2)));
  const dung    = xong.filter(t => dCong(ngayXong(t), parse(t.han_goc||t.han)) >= 0);
  const dungTr  = xongTr.filter(t => dCong(ngayXong(t), parse(t.han_goc||t.han)) >= 0);
  const den     = tap.filter(t => trongKhoang(parse(t.bd), kyTruoc));
  const mo      = tap.filter(viecMo);
  const moLa    = mo.filter(laLa);
  const tuoi    = moLa.map(t => Math.max(0, dCong(parse(t.bd), TODAY)));
  const cho     = mo.filter(t => (t.tt === "CHO_DUYET" || t.tt === "CHO_DUYET_2") && t.nop
                    && dCong(parse(khoaNgay(ngayNop(t))), TODAY) > 1);
  const nguoi   = [...new Set(moLa.map(t=>t.lam))];
  const quaTai  = nguoi.filter(id => taiTuanNay(id) > SUC_TUAN);
  const dx      = tap.filter(t => nguonCua(t) === "DOT_XUAT" && t.phatSinh && trongKhoang(parse(t.phatSinh), kyTruoc));
  const thieuTC = mo.filter(t => !(t.tc||[]).length);
  const diem    = xong.filter(t=>t.diem);
  const diemTr  = xongTr.filter(t=>t.diem);
  const tsDk    = diem.reduce((a,t)=>a+(Number(t.dk)||1),0);
  const dTS     = tsDk ? diem.reduce((a,t)=>a+(Number(t.dk)||1)*t.diem.tong,0)/tsDk : null;
  const tsDkTr  = diemTr.reduce((a,t)=>a+(Number(t.dk)||1),0);
  const dTSTr   = tsDkTr ? diemTr.reduce((a,t)=>a+(Number(t.dk)||1)*t.diem.tong,0)/tsDkTr : null;
  const tl      = xong.length ? dung.length/xong.length*100 : null;
  const tlTr    = xongTr.length ? dungTr.length/xongTr.length*100 : null;

  const ai = uid => U[uid] ? U[uid].ten : "—";
  /* dat: hàm nhận giá trị, trả true nếu đạt ngưỡng. cao:true = càng cao càng tốt */
  const D = [
    {n:"Việc nghiệm thu xong", l:"ra", o:chuNhanh, ng:"≥ 4 việc", v:xong.length, t:xongTr.length,
     dat:xong.length>=4, cao:true, dv:"việc",
     gt:"Thông lượng của kỳ. Là nền của mọi dự báo — thấp kéo dài thì mọi cam kết sau đó đều lung lay."},
    {n:"Đúng hạn theo hạn gốc", l:"ra", o:chuNhanh, ng:"≥ 90%", v:tl, t:tlTr,
     dat:tl==null||tl>=90, cao:true, dv:"%", ptram:true,
     gt:"Đối chiếu hạn BAN ĐẦU, không phải hạn đã dời — nếu không thì dời hạn là cách làm đẹp chỉ số."},
    {n:"Điểm trung bình có trọng số", l:"ra", o:chuNhanh, ng:"≥ 4,00", v:dTS, t:dTSTr,
     dat:dTS==null||dTS>=4, cao:true, dv:"điểm", so2:true,
     gt:"Nhân trọng số độ khó nên không thể nâng điểm bằng cách gom việc dễ."},

    {n:"Việc mới nhận / việc làm xong", l:"vao", o:chuNhanh, ng:"≤ 1,0", v:xong.length?den.length/xong.length:null, t:null,
     dat:!xong.length||den.length/xong.length<=1, cao:false, dv:"lần", so2:true,
     gt:"Trên 1 nghĩa là việc vào nhiều hơn việc ra — tồn đọng phình lên, và tuần sau sẽ nặng hơn tuần này."},
    {n:"Tuổi trung bình việc đang mở", l:"vao", o:chuNhanh, ng:"≤ 12 ngày", v:tuoi.length?tb(tuoi):null, t:null,
     dat:!tuoi.length||tb(tuoi)<=12, cao:false, dv:"ngày", so1:true,
     gt:"Việc càng nằm lâu càng khó xong. Đây là chỉ báo sớm tốt hơn số việc quá hạn, vì nó cảnh báo TRƯỚC khi trễ."},
    {n:"Việc đang quá hạn", l:"vao", o:chuNhanh, ng:"= 0", v:moLa.filter(quaHan).length, t:null,
     dat:!moLa.filter(quaHan).length, cao:false, dv:"việc",
     gt:"Mỗi việc ở đây phải có một câu trả lời trong cuộc họp: chốt hạn mới, đổi người, hay bỏ."},
    {n:"Phiếu chờ duyệt quá 1 ngày", l:"vao", o:chuNhanh, ng:"= 0", v:cho.length, t:null,
     dat:!cho.length, cao:false, dv:"phiếu",
     gt:"Nút thắt nằm ở khâu duyệt, không ở người làm. Báo cáo chỉ soi nhân viên sẽ không bao giờ nhìn ra."},
    {n:"Người quá tải tuần này", l:"vao", o:chuNhanh, ng:"= 0", v:quaTai.length, t:null,
     dat:!quaTai.length, cao:false, dv:"người",
     gt:"Chỗ để chuyển việc, không phải chỗ phê bình — quá tải là hệ quả của cách chia việc."},
    {n:"Tỷ lệ việc đột xuất", l:"vao", o:chuNhanh, ng:"≤ 25%", v:den.length?dx.length/den.length*100:null, t:null,
     dat:!den.length||dx.length/den.length*100<=25, cao:false, dv:"%", ptram:true,
     gt:"Đột xuất nhiều không có nghĩa nhân viên kém — nghĩa là khâu lập kế hoạch đang bị động."},
    {n:"Việc chưa có tiêu chí nghiệm thu", l:"vao", o:chuNhanh, ng:"= 0", v:thieuTC.length, t:null,
     dat:!thieuTC.length, cao:false, dv:"việc",
     gt:"Không có tiêu chí thì lúc nghiệm thu sẽ tranh cãi, và tỷ lệ trả lại tăng."},
  ];
  /* Chuỗi 12 kỳ gần nhất của từng chỉ số, để tính giới hạn tự nhiên. */
  const chuoiChiSo = (fn) => { const r = [];
    for (let i = 11; i >= 0; i--) r.push(fn(khoangKy(BC_LOAI, BC_LECH - 1 - i)));
    return r; };
  const cXong = chuoiChiSo(k => tap.filter(t => t.tt==="HOAN_THANH" && trongKhoang(ngayXong(t), k)).length);
  const cDung = chuoiChiSo(k => { const a = tap.filter(t => t.tt==="HOAN_THANH" && trongKhoang(ngayXong(t), k));
    return a.length ? a.filter(t=>dCong(ngayXong(t), parse(t.han_goc||t.han))>=0).length/a.length*100 : null; });
  const cDiem = chuoiChiSo(k => { const a = tap.filter(t => t.tt==="HOAN_THANH" && trongKhoang(ngayXong(t), k) && t.diem);
    const w = a.reduce((s,t)=>s+(Number(t.dk)||1),0);
    return w ? a.reduce((s,t)=>s+(Number(t.dk)||1)*t.diem.tong,0)/w : null; });
  const chuoiCua = {0:cXong, 1:cDung, 2:cDiem};

  return D.map((x, i) => {
    const f = x.ptram ? v => v==null?"—":Math.round(v)+"%"
            : x.so2   ? v => v==null?"—":so2(v)
            : x.so1   ? v => v==null?"—":so1(v)
            : v => v==null?"—":v;
    const dl = (x.v!=null && x.t!=null) ? x.v - x.t : null;
    const th = chuoiCua[i] ? tinHieu(chuoiCua[i], x.cao, x.ptram?{min:0,max:100}:{min:0}) : null;
    return {...x, hienV:f(x.v), hienT:f(x.t), delta:dl, chuoi:chuoiCua[i]||null, th,
      mui: dl==null||Math.abs(dl)<0.01 ? "" : (dl>0) === !!x.cao ? "▲" : "▼",
      muiTot: dl==null ? null : (dl>0) === !!x.cao};
  });
}

/* Vướng mắc viết thành MỘT CÂU người đọc hiểu ngay, không phải mã lỗi. */
function vuongMac(t){
  if (t.yKien) return `${U[t.yKien.boi].ten} nêu ${Y_KIEN[t.yKien.loai][0].toLowerCase()}: ${t.yKien.nd}`;
  if (quaHan(t)) return `Quá hạn ${-conLai(t)} ngày${t.doi?`, đã dời hạn ${t.doi} lần`:""}`;
  if (t.tt === "TRA_LAI") return "Bị trả lại sau nghiệm thu, phải làm lại";
  if (t.tt === "CHO_DUYET" || t.tt === "CHO_DUYET_2") return "Đã nộp, đang chờ nghiệm thu";
  if (t.sk === "TRE") return "Người thực hiện tự báo đang trễ";
  if (t.sk === "RR")  return "Người thực hiện tự báo có rủi ro";
  if (t.tt === "MOI" && days(t.bd) < -2) return `Đã qua ngày bắt đầu ${-days(t.bd)} ngày mà chưa nhận việc`;
  if (t.lam && soViecMo(t.lam) > WIP_TRAN) return `${U[t.lam].ten} đang mở ${soViecMo(t.lam)} việc cùng lúc`;
  return "";
}
/* AI PHẢI LÀM GÌ — trả về {ai, lam, khi}. Đây là cột quan trọng nhất của báo cáo:
   nhìn vào là biết đích danh người nào phải làm động tác nào, hạn chót là bao giờ. */
function aiLamGi(t){
  const duyet = nguoiDuyet(t);
  if (t.yKien) return {ai:t.giao, lam:"Trả lời ý kiến — giữ nguyên, đổi hạn, cấp thêm người hay đổi người", khi:"trong cuộc họp"};
  if (t.tt === "CHO_DUYET" || t.tt === "CHO_DUYET_2")
    return {ai:duyet, lam:"Nghiệm thu và chấm điểm", khi:"trong 1 ngày làm việc"};
  if (t.tt === "TRA_LAI") return {ai:t.lam, lam:"Sửa theo góp ý rồi nộp lại", khi:"trong tuần này"};
  if (quaHan(t)) return {ai:duyet||t.giao, lam:"Chốt hạn mới với người thực hiện, hoặc đổi người", khi:"trong cuộc họp"};
  if (t.tt === "MOI" && days(t.bd) < -2) return {ai:t.lam, lam:"Nhận việc và bắt đầu", khi:"hôm nay"};
  if (t.sk === "TRE" || t.sk === "RR")
    return {ai:duyet||t.giao, lam:`Hỏi ${U[t.lam]?U[t.lam].ten:"người thực hiện"} cần gì để gỡ`, khi:"trong tuần này"};
  if (t.lam && soViecMo(t.lam) > WIP_TRAN)
    return {ai:duyet||t.giao, lam:`Chuyển bớt việc của ${U[t.lam].ten} sang người rảnh hơn`, khi:"trong tuần này"};
  if (viecMo(t)) return {ai:t.lam, lam:"Tiếp tục theo kế hoạch", khi:`trước ${t.han}`};
  return null;
}

/* =========================================================================
   BÁO CÁO CẤP CÔNG TY LÀ BÁO CÁO ĐIỀU HÀNH, KHÔNG PHẢI BẢN LIỆT KÊ

   Ban Giám đốc không đọc từng dòng việc — 44 người, gần 90 việc thì liệt kê ra
   là vô nghĩa. Cái BGĐ cần đọc chỉ có ba thứ, và phải gói trong một màn hình:
     · đơn vị nào đạt, đơn vị nào không  → bảng đơn vị, xấu xếp trước
     · việc gì vượt thẩm quyền phòng ban → chỉ những việc CHỈ BGĐ mới quyết được
     · kỳ này cam kết những gì            → mốc lớn và tải theo đơn vị
   Chi tiết từng việc không mất đi: bấm vào dòng đơn vị là tụt xuống bảng chi tiết
   của phòng ban đó. Tóm tắt ở trên, chi tiết ở dưới một cú bấm — không trộn lẫn.
   ========================================================================= */

/* Các đơn vị trực thuộc công ty — mỗi đơn vị một dòng, gộp cả tổ bên dưới. */
function dvBaoCao(){ return Object.entries(DV).filter(([k,d]) => d.cha === "CTY").map(([k]) => k); }

function tomTatLoi(ds, quan, meta, kyTruoc, kyNay){
  const denHan = ds.filter(t => trongKhoang(parse(t.han_goc || t.han), kyTruoc));
  const xong   = ds.filter(t => t.tt === "HOAN_THANH" && trongKhoang(ngayXong(t), kyTruoc));
  const dung   = xong.filter(t => dCong(ngayXong(t), parse(t.han_goc || t.han)) >= 0);
  const tre    = denHan.filter(t => t.tt !== "HOAN_THANH" || dCong(ngayXong(t), parse(t.han_goc||t.han)) < 0);
  const treMo  = tre.filter(viecMo);
  const tac    = ds.filter(t => viecMo(t) && (t.yKien || t.tt === "CHO_DUYET" || t.tt === "CHO_DUYET_2" || t.tt === "TRA_LAI"));
  const quaTai = quan.filter(u => taiTuanNay(u.id) > SUC_TUAN).map(u => u.id);
  const tl     = xong.length ? Math.round(dung.length / xong.length * 100) : null;
  const nay    = ds.filter(t => viecMo(t) && trongKhoang(parse(t.han), kyNay));
  const treSau = treMo.length ? Math.max(...treMo.map(t => -conLai(t))) : 0;
  const ps = phatSinhKy(ds, kyTruoc);
  let muc = 0;                                   /* 0 đạt · 1 cần chú ý · 2 có vấn đề */
  if (treMo.length || quaTai.length || (tl != null && tl < 85)) muc = 1;
  if (treMo.length >= 3 || (tl != null && tl < 60) || treSau > 7) muc = 2;
  return {...meta, soNguoi:quan.length,
          denHan, xong, dung, tre, treMo, tac, quaTai, tl, nay, treSau, muc, ps,
          moc: nay.filter(t => t.moc), cao: nay.filter(t => uuTien(t).muc <= 2)};
}
function tomTatDV(ma, kyTruoc, kyNay){
  const ds   = T.filter(t => trongTamNhin(t) && trongDV(t.lam, ma));
  const quan = Object.values(U).filter(u => trongDV(u.id, ma));
  return tomTatLoi(ds, quan, {ma, ten:DV[ma].ten, truong:DV[ma].truong, khuyet:!!DV[ma].khuyet}, kyTruoc, kyNay);
}
/* Cùng phép tính, tập việc là việc của đúng một người. Dùng cho báo cáo cấp phòng ban
   khi phòng đó không có tổ trực thuộc — lúc ấy "đơn vị con" chính là từng nhân sự. */
function tomTatNS(uid, kyTruoc, kyNay){
  const ds = T.filter(t => trongTamNhin(t) && t.lam === uid);
  return tomTatLoi(ds, [U[uid]].filter(Boolean),
    {ma:"@"+uid, uid, laNguoi:true, ten:U[uid]?U[uid].ten:"—", truong:uid,
     khuyet:false, cd:U[uid]?U[uid].cd:""}, kyTruoc, kyNay);
}
/* Tầng dưới của cấp đang xem: công ty → phòng ban · phòng ban → tổ, không có tổ thì → người. */
/* Dùng LẠI tomTatLoi — cùng một phép tính với cấp công ty và cấp phòng, nên bốn khối
   cộng lại đúng bằng tổng công ty trừ phần chưa gán khối. Viết phép tính thứ hai cho
   khối là cách chắc chắn nhất để hai bảng lệch nhau sau vài lần sửa. */
function tomTatKhoi(k, kyTruoc, kyNay){
  const ng = nguoiKhoi(k);
  const ds = T.filter(t => trongTamNhin(t) && ng.includes(t.lam));
  return tomTatLoi(ds, ng.map(id=>U[id]).filter(Boolean),
    {ma:k.ma, ten:k.ten, truong:k.bod, khuyet:false, laKhoi:true, dvs:k.dv}, kyTruoc, kyNay);
}
/* Việc không rơi vào khối nào — hiện rõ chứ không giấu, vì đó là chỗ tổ chức còn hở. */
function khoiHo(kyTruoc, kyNay){
  const ng = Object.values(U).filter(u => !khoiCua(u.id)).map(u=>u.id);
  if (!ng.length) return null;
  const ds = T.filter(t => trongTamNhin(t) && ng.includes(t.lam));
  if (!ds.length) return null;
  return tomTatLoi(ds, ng.map(id=>U[id]), {ma:"K_HO", ten:"Chưa gán khối", truong:null,
    khuyet:true, laKhoi:true, dvs:[]}, kyTruoc, kyNay);
}

function dsConBC(kyTruoc, kyNay){
  if (BC_CAP === "CTY")
    return {loai:"dv", nhan:"đơn vị", cot:"Đơn vị", capTren:"BGĐ",
            ds: dvBaoCao().map(ma => tomTatDV(ma, kyTruoc, kyNay))};
  const con = Object.entries(DV).filter(([k,d]) => d.cha === BC_DV).map(([k]) => k);
  if (con.length)
    return {loai:"dv", nhan:"bộ phận", cot:"Bộ phận trực thuộc", capTren:"Trưởng đơn vị",
            ds: con.map(ma => tomTatDV(ma, kyTruoc, kyNay))};
  const ng = Object.values(U).filter(u => trongDV(u.id, BC_DV) && (coQuyen(me,"xem_toan_cty") || nhanhCuaToi().has(u.id) || u.id === me));
  return {loai:"ns", nhan:"nhân sự", cot:"Cá nhân", capTren:"Trưởng đơn vị",
          ds: ng.map(u => tomTatNS(u.id, kyTruoc, kyNay))};
}

/* Việc nào THỰC SỰ phải để BGĐ quyết — phần còn lại là việc của trưởng đơn vị.
   Lọc chặt ở đây chính là cái làm cho báo cáo cấp công ty ngắn lại. */
/* ---------- TẦM ĐIỀU HÀNH CỦA BAN GIÁM ĐỐC ---------- */
function laBGD(uid){ const v = U[uid] && U[uid].vt; return v === "BGD" || v === "HDQT"; }
/* Người giữ chức = có vị trí từ tổ trưởng trở lên, HOẶC đang đứng tên trưởng một đơn vị.
   Vế thứ hai để phòng trường hợp chức danh chưa khai mà người đó đã nhận nhiệm vụ trưởng. */
function laNguoiGiuChuc(uid){
  const v = U[uid] && U[uid].vt;
  if (v && CHUC_VU[v] && CHUC_VU[v].cap <= 3) return true;
  return Object.values(DV).some(d => d.truong === uid);
}
function coTenToi(t){
  return t.giao === me || t.lam === me || nguoiDuyet(t) === me
      || (t.phoihop || []).includes(me) || (t.theodoi || []).includes(me)
      || (chuoiDuyetThem(t) || []).includes(me);
}
/* Công tắc: bật mặc định cho BGĐ, tắt hẳn với mọi vai khác (trưởng phòng PHẢI thấy
   từng nhân viên của mình — đó đúng là việc của họ). */
let ONG_BGD = 1;
function ongBGD(){ return !!ONG_BGD && laBGD(me); }
function datOng(v){ ONG_BGD = v ? 1 : 0; ND_MO = new Set(); draw(); }

/* Một NGƯỜI có nằm trong tầm điều hành trực tiếp của BGĐ đang xem không */
function nguoiTamDH(uid){
  if (!ongBGD() || uid === me) return true;
  if (laNguoiGiuChuc(uid)) return true;
  return T.some(t => t.lam === uid && viecMo(t) && coTenToi(t));
}
/* Một VIỆC có nằm trong tầm điều hành trực tiếp của BGĐ đang xem không */
function viecTamDH(t){
  if (!ongBGD()) return true;
  if (coTenToi(t)) return true;
  if (laNguoiGiuChuc(t.lam)) return true;
  if (canBGD(t)) return true;      /* việc buộc trình BGĐ — giấu đi thì gãy vòng điều hành */
  return false;
}
/* Dải công tắc, kèm con số bị ẩn để người xem biết mình đang không nhìn thấy gì.
   Ẩn mà không nói ra thì đúng bằng nói dối. */
function daiOng(nHien, nDay, dv){
  if (!laBGD(me)) return "";
  const an = nDay - nHien;
  return `<div class="ong ${ONG_BGD?"on":""}">
    <span class="ongi">${ONG_BGD ? "◱" : "◨"}</span>
    <div class="ongb"><b>${ONG_BGD ? "Tầm điều hành Ban Giám đốc" : "Toàn bộ nhánh"}</b> —
      ${ONG_BGD
        ? `đang hiện <b>${nHien}</b> ${dv}: cấp trưởng phó các đơn vị, người bạn trực tiếp giao việc,
           và việc buộc trình Ban Giám đốc quyết.${an > 0
             ? ` Ẩn <b>${an}</b> ${dv} của nhân viên do trưởng phòng quản.` : ""}`
        : `đang hiện đủ <b>${nHien}</b> ${dv}, gồm cả việc nhân viên mà bạn không có tên trong phiếu.`}
    </div>
    <button class="btn sm" onclick="datOng(${ONG_BGD?0:1})">${ONG_BGD ? "Xem đủ cả nhánh" : "Về tầm điều hành"}</button>
  </div>`;
}

function canBGD(t){
  if (!viecMo(t) && t.tt !== "CHO_DUYET" && t.tt !== "CHO_DUYET_2") return "";
  if ((t.tienLoai || "CHI") === "CHI" && (t.tien || 0) >= BAC_DUYET[0].tu) return "Vượt ngưỡng chi";
  if (t.yKien && capViec(t.giao) <= 2)        return "Ý kiến chờ BGĐ trả lời";
  if (t.moc && quaHan(t))                     return "Mốc bàn giao đã trễ";
  if (quaHan(t) && uuTien(t).muc <= 2)        return "Trễ việc ưu tiên cao";
  if (quaHan(t) && -conLai(t) > 7)            return "Trễ quá 7 ngày";
  if ((t.doi || 0) >= 2)                      return "Đã dời hạn " + t.doi + " lần";
  return "";
}
/* Đơn vị cấp 1 của một người — để mục 3 và mục 2 gọi tên đơn vị GIỐNG NHAU.
   Trước đây mục 3 in tên tổ ("Tổ Kế toán") còn mục 2 in tên phòng ("Phòng Tài chính – Kế toán"),
   nên cùng một việc mà hai bảng đọc ra hai đơn vị khác nhau. */
function dvCap1(uid){
  let x = U[uid] ? U[uid].dv : null, v = 0, cuoi = null;
  while (x && v++ < 12){
    if (x === "CTY" || x === "HDQT") return "CTY";       /* người thuộc thẳng công ty thì dừng ở CTY */
    if (DV[x] && DV[x].cha === "CTY") return x;
    cuoi = x; x = DV[x] ? DV[x].cha : null;
  }
  return cuoi;
}
function tenDVDay(uid){
  const c1 = dvCap1(uid), rieng = U[uid] ? U[uid].dv : null;
  if (!c1) return "—";
  return rieng && rieng !== c1 && DV[rieng] ? `${DV[c1].ten}<div style="font-size:11px;color:var(--mute)">${esc(DV[rieng].ten)}</div>` : DV[c1].ten;
}
/* Câu quyết định của BGĐ phải khớp với LÝ DO việc đó lên tới BGĐ. Dùng lại câu chung
   của aiLamGi thì một khoản chi 1,85 tỷ hiện ra "Tiếp tục theo kế hoạch" — vô nghĩa. */
function bgdQuyet(t, ly){
  const bac = bacDat(t), cao = bac.length ? bac[bac.length-1] : null;
  const duyet = nguoiDuyet(t);
  if (ly === "Vượt ngưỡng chi")
    return {ai: cao ? cao.ai : duyet, lam:`Duyệt hay không duyệt khoản chi này`,
            khi: t.tt==="CHO_DUYET_2" ? "đang chờ chữ ký, quyết trong cuộc họp" : "trong cuộc họp"};
  if (ly === "Ý kiến chờ BGĐ trả lời")
    return {ai:t.giao, lam:"Trả lời ý kiến — giữ nguyên hạn, đổi hạn, cấp thêm người hay đổi người", khi:"trong cuộc họp"};
  if (ly === "Mốc bàn giao đã trễ")
    return {ai:duyet||t.giao, lam:`Chốt lại ngày bàn giao và báo bên nhận`, khi:"trong cuộc họp"};
  if (ly === "Trễ việc ưu tiên cao" || ly === "Trễ quá 7 ngày")
    return {ai:duyet||t.giao, lam:"Chốt hạn mới với người thực hiện, hoặc đổi người", khi:"trong cuộc họp"};
  if (ly.indexOf("Đã dời hạn") === 0)
    return {ai:duyet||t.giao, lam:"Quyết dứt điểm: giữ hạn này, hay dừng việc", khi:"trong cuộc họp"};
  return aiLamGi(t);
}
function xemDV(ma){ BC_CAP = "DV"; BC_DV = ma; BC_MO = null; draw(); }
let BC_MO = null;
let KHOI_MO = null;
function moKhoi(ma){ KHOI_MO = (KHOI_MO === ma) ? null : ma; draw(); }
function bungDV(ma, ev){ if (ev) ev.stopPropagation(); SO_MO = null; BC_MO = BC_MO === ma ? null : ma; draw(); }
function veCTY(){ BC_CAP = "CTY"; BC_DV = "TAT_CA"; draw(); }

/* Bảng chi tiết bung ra dưới dòng đơn vị. Cùng một câu hỏi với báo cáo phòng ban
   — đến đâu, vướng gì, ai phải làm gì — nhưng gói gọn để BGĐ không phải rời màn hình
   đang so sánh các đơn vị với nhau. Muốn xem đủ thì có nút mở báo cáo riêng của phòng. */
/* Một thanh ngang đọc được trong một giây: kỳ qua đơn vị này xong đúng hạn bao nhiêu,
   nộp muộn bao nhiêu, còn trễ bao nhiêu. Tám ô số riêng lẻ không trả lời được câu đó —
   phải tự cộng trừ trong đầu mới ra tỷ lệ. */
function thanhSucKhoe(x){
  const dung = x.dung.length, muon = x.xong.length - x.dung.length, tre = x.treMo.length;
  const tong = dung + muon + tre;
  const TT3 = [["Đạt", "Cần chú ý", "Có vấn đề"], ["g","a","r"]];
  if (!tong) return `<div class="tsk trong"><span class="tskt">Kỳ qua đơn vị này không có việc nào đến hạn</span>
    <span class="tag ${TT3[1][x.muc]}">${TT3[0][x.muc]}</span></div>`;
  const pc = n => Math.round(n / tong * 100);
  return `<div class="tsk">
    <div class="tskh"><span class="tskt">Kỳ qua · ${tong} việc đến hạn</span>
      <span class="tag ${TT3[1][x.muc]}">${TT3[0][x.muc]}</span></div>
    <div class="tskb">
      ${dung?`<i class="d" style="width:${pc(dung)}%" title="Xong đúng hạn: ${dung} việc">${pc(dung)>13?`${dung}`:""}</i>`:""}
      ${muon?`<i class="m" style="width:${pc(muon)}%" title="Xong nhưng nộp muộn: ${muon} việc">${pc(muon)>13?`${muon}`:""}</i>`:""}
      ${tre?`<i class="t" style="width:${pc(tre)}%" title="Còn trễ chưa xong: ${tre} việc">${pc(tre)>13?`${tre}`:""}</i>`:""}
    </div>
    <div class="tskc">
      ${dung?`<span><u class="d"></u>Xong đúng hạn <b>${dung}</b></span>`:""}
      ${muon?`<span><u class="m"></u>Xong nhưng muộn <b>${muon}</b></span>`:""}
      ${tre?`<span><u class="t"></u>Còn trễ chưa xong <b>${tre}</b></span>`:""}
      ${x.tac.length?`<span><u class="c"></u>Đang tắc <b>${x.tac.length}</b></span>`:""}
    </div></div>`;
}

function chiTietDV(x, kyTruoc, kyNay){
  const ds = x.laNguoi ? T.filter(t => trongTamNhin(t) && t.lam === x.uid)
                       : T.filter(t => trongTamNhin(t) && trongDV(t.lam, x.ma));
  /* việc đáng nói: đang vướng, hoặc vừa xong trong kỳ — xếp vướng trước */
  const vuong = ds.filter(t => viecMo(t) && vuongMac(t))
    .sort((a,b) => (uuTien(a).muc - uuTien(b).muc) || (conLai(a) - conLai(b)));
  const xong  = x.xong.slice().sort((a,b) => parse(b.han) - parse(a.han));
  const dsTo  = x.laNguoi ? [] : Object.entries(DV).filter(([k,d]) => d.cha === x.ma)
    .map(([k,d]) => { const n = ds.filter(t => trongDV(t.lam, k));
      return {k, ten:d.ten, mo:n.filter(viecMo).length, tre:n.filter(t=>viecMo(t)&&quaHan(t)).length,
              nguoi:Object.values(U).filter(u=>trongDV(u.id,k)).length}; })
    .filter(o => o.nguoi);
  const nguoi = [...new Set(ds.filter(viecMo).map(t => t.lam))]
    .map(id => ({id, mo:ds.filter(t=>t.lam===id&&viecMo(t)).length,
                 tre:ds.filter(t=>t.lam===id&&viecMo(t)&&quaHan(t)).length, tai:taiTuanNay(id)}))
    .sort((a,b) => (b.tre - a.tre) || (b.tai - a.tai));

  return `<div class="bcct">
    <div class="bccth">
      <div><b>${esc(x.ten)}</b> — tổng hợp ${kyTruoc.ten.toLowerCase()} (${kyTruoc.khoang})</div>
      ${x.laNguoi ? `<button class="btn sm" onclick="event.stopPropagation();setBC('cap','NS');chonNguoi('${x.uid}')">Mở báo cáo riêng của người này →</button>`
        : `<button class="btn sm" onclick="event.stopPropagation();xemDV('${x.ma}')">Mở báo cáo riêng của đơn vị →</button>`}
    </div>

    ${thanhSucKhoe(x)}
    ${[["Kỳ qua", [["Đến hạn", x.denHan.length, "", "denHan"],
                   ["Đã nghiệm thu", x.xong.length, "", "xong"],
                   ["Đúng hạn", x.tl==null?"—":x.tl+"%", x.tl==null?"":x.tl>=90?"#1B5E20":x.tl>=75?"#8A6D3B":"var(--red)", "tl"],
                   ["Còn trễ chưa xong", x.treMo.length, x.treMo.length?"var(--red)":"", "tre"],
                   ["Việc phát sinh", x.ps.ds.length, x.ps.tlDX!=null&&x.ps.tlDX>=30?"var(--amb)":"", "ps"],
                   ["Trong đó đột xuất", x.ps.dotXuat.length, x.ps.dotXuat.length?"var(--amb)":"", "psdx"],
                   ["Trong đó tự khai", x.ps.tuTao.length, "", "pstt"]]],
       ["Đang mở / kỳ này", [["Đang tắc", x.tac.length, x.tac.length?"var(--amb)":"", "tac"],
                   ["Người quá tải", x.quaTai.length, x.quaTai.length?"var(--red)":"", "tai"],
                   ["Việc kỳ này", x.nay.length, "", "nay"],
                   ["Mốc kỳ này", x.moc.length, x.moc.length?"var(--navy2)":"", "moc"]]]
      ].map(([cum, o])=>`<div class="bccum"><span class="bccl">${cum}</span>
        <div class="bcso">${o.map(([l,v,m,c])=>{ const k = `DV:${x.ma}:${c}`, co = v !== 0 && v !== "—";
          return `<div class="bcso1${co?" bam":" rong"}${SO_MO===k?" mo":""}"${co?` onclick="event.stopPropagation();moSo('${k}')"`:""}>
            <span>${l}</span><b style="${m?`color:${m}`:""}">${v}</b>
            ${co?`<u>${SO_MO===k?"đóng ⌃":"xem ⌄"}</u>`:""}</div>`; }).join("")}</div></div>`).join("")}
    ${SO_MO && SO_MO.indexOf(`DV:${x.ma}:`) === 0 ? khoiSo(SO_MO) : ""}

    ${dsTo.length ? `<div class="bcctt">Bộ phận trực thuộc</div>
      <div class="bcto">${dsTo.map(o=>`<span class="bcto1"><b>${esc(o.ten)}</b>
        <span>${o.nguoi} người · ${o.mo} việc mở${o.tre?` · <em>${o.tre} trễ</em>`:""}</span></span>`).join("")}</div>` : ""}

    <div class="bcctt">Việc đang vướng — ${vuong.length ? `${vuong.length} việc, ai phải làm gì` : "không có"}</div>
    ${vuong.length ? bangViecNho(vuong, 8)
      : `<div class="flag b2" style="margin:0 0 11px"><span class="ic2">✓</span><span class="bd2">Không việc nào đang vướng.</span></div>`}

    ${xong.length ? `<div class="bcctt">Đã nghiệm thu ${kyTruoc.ten.toLowerCase()} — ${xong.length} việc</div>
      <div class="bcxong">${xong.slice(0,8).map(t=>{ const l = dCong(ngayXong(t), parse(t.han_goc||t.han));
        return `<span class="bcx1" onclick="event.stopPropagation();openDw('${t.id}')">
          <span class="tag ${l>=0?"g":"a"}">${l>=0?"đúng hạn":`trễ ${-l}n`}</span>
          <b>${esc(t.ttl)}</b><span>${esc(U[t.lam]?U[t.lam].ten:"")}</span></span>`;}).join("")}</div>` : ""}

    ${nguoi.length ? `<div class="bcctt">Người trong đơn vị — xếp theo việc quá hạn rồi tới tải</div>
      <div class="bcng">${nguoi.slice(0,10).map(n=>`<span class="bcng1 ${n.tre?"do":n.tai>SUC_TUAN?"vang":""}">
        ${avHTML(n.id,24)}<b>${esc(U[n.id].ten)}</b>
        <span>${n.mo} việc mở${n.tre?` · <em>${n.tre} trễ</em>`:""} · tải ${soNgayLe(n.tai)}/${SUC_TUAN}</span></span>`).join("")}</div>` : ""}
  </div>`;
}

/* =========================================================================
   MỖI CON SỐ TỔNG HỢP PHẢI MỞ RA ĐƯỢC DANH SÁCH SINH RA NÓ

   Ô "Đang tắc: 1" mà không bấm được thì người đọc phải tin suông, và khi muốn biết
   việc nào tắc lại phải sang cửa sổ khác dò tay. Nên mọi ô số ở báo cáo đều bấm được:
   bấm là bung đúng danh sách việc đã cộng nên con số đó, bấm tiếp một dòng là mở
   phiếu việc. Danh sách KHÔNG lưu trong biến — chỉ lưu MÃ CHỈ SỐ rồi tính lại lúc vẽ,
   để con số trên ô và danh sách bên dưới không bao giờ lệch nhau.
   ========================================================================= */
/* NGÀY VIỆC PHÁT SINH = ngày nó được giao, lấy từ dòng đầu của nhật ký phiếu.
   Mốc nhật ký chỉ ghi ngày/tháng, không ghi năm, nên năm lấy theo ngày bắt đầu;
   lệch quá nửa năm thì đó là việc giao từ năm trước, lùi một năm.
   Việc mô phỏng của các kỳ đã qua không có dòng "giao việc" — lấy ngày bắt đầu. */
function ngayGiaoViec(t){
  const g = (t.log || []).find(x => x.k && (x.k.indexOf("giao việc") >= 0 || x.k.indexOf("tự tạo việc") >= 0));
  if (g && /^(\d{2})\/(\d{2})/.test(g.t)){
    const m = g.t.match(/^(\d{2})\/(\d{2})/), bd = parse(t.bd);
    let x = new Date(bd.getFullYear(), +m[2] - 1, +m[1]);
    if (d2(x) - d2(bd) > 183 * D1) x = new Date(bd.getFullYear() - 1, +m[2] - 1, +m[1]);
    return x;
  }
  if (t.phatSinh) return parse(t.phatSinh);
  return parse(t.bd);
}
/* Việc phát sinh trong một kỳ, tách theo nguồn gốc. Tỷ lệ ĐỘT XUẤT là con số đáng đọc
   nhất ở đây: đột xuất cao nghĩa là kế hoạch không giữ được, và mọi việc trễ trong kỳ
   phải đọc kèm con số này thì mới công bằng với người làm. */
function phatSinhKy(tap, ky){
  const ds = tap.filter(t => trongKhoang(ngayGiaoViec(t), ky));
  const theo = n => ds.filter(t => nguonCua(t) === n);
  const dx = theo("DOT_XUAT");
  const tuTao = ds.filter(t => t.tuTao || (t.giao && t.giao === t.lam));
  return {ds, keHoach: theo("KE_HOACH"), chuKy: theo("CHU_KY"), dotXuat: dx, tuTao,
          tlDX: ds.length ? Math.round(dx.length / ds.length * 100) : null,
          tlTT: ds.length ? Math.round(tuTao.length / ds.length * 100) : null};
}

/* ---------- KHỐI CÔNG VIỆC CỦA BAN GIÁM ĐỐC ---------- */
/* Khối = DANH SÁCH ĐƠN VỊ + DANH SÁCH NGƯỜI KHAI RIÊNG. Vế thứ hai là bắt buộc:
   trợ lý và kiểm soát viên ngồi thẳng ở cấp công ty, không thuộc phòng nào, nhưng
   vẫn phải nằm trong một khối — không thì họ rơi vào "chưa gán" mãi mãi. */
let KHOI = [
  {ma:"K_DH", bod:"F003", ten:"Khối Điều hành chung",      dv:["TH","PC","TH_NS","TH_HC"], nguoi:["F007"]},
  {ma:"K_KD", bod:"F002", ten:"Khối Kinh doanh",           dv:["ADKD","ADKD_GT","KDOL"],     nguoi:["F006"]},
  {ma:"K_TC", bod:"F005", ten:"Khối Tài chính – Vận hành", dv:["TCKT","TCKT_KT","XNK","KHO","KHO_XE"], nguoi:["F004"]},
  {ma:"K_TT", bod:"F001", ten:"Khối Thị trường",           dv:["MKT","MKT_BRAND","MKT_HUB","MKT_SK"], nguoi:[]},
];
/* Khối của một người = khối chứa đơn vị người đó thuộc về, dò ngược lên cây.
   Dò ngược để một nhân viên Tổ Kế toán vẫn rơi đúng vào khối Tài chính dù khối
   chỉ khai tới cấp phòng. */
function khoiCua(uid){
  if (!U[uid]) return null;
  const k1 = KHOI.find(k => k.bod === uid || (k.nguoi||[]).includes(uid));
  if (k1) return k1;
  let x = U[uid].dv, v = 0;
  while (x && v++ < 12){
    const k = KHOI.find(k2 => k2.dv.includes(x));
    if (k) return k;
    x = DV[x] ? DV[x].cha : null;
  }
  return null;
}
function nguoiKhoi(k){ return Object.values(U).filter(u => { const o = khoiCua(u.id); return o && o.ma === k.ma; }).map(u=>u.id); }
/* Việc BGĐ đó trực tiếp có tên trong phiếu — chồng lấn với khối khác là chuyện
   bình thường (Phó Tổng duyệt một việc của phòng khác), nên đếm riêng và nói rõ. */
function viecNamTrucTiep(bod, tap){
  const cu = me; let r = [];
  try { me = bod; r = tap.filter(coTenToi); } finally { me = cu; }
  return r;
}

/* Số thứ tự mục trong báo cáo phải chạy theo mục THẬT SỰ được vẽ: mục "Bốn khối"
   chỉ có ở cấp công ty, nên cấp phòng ban đánh số 1-2-3 còn cấp công ty 1-2-3-4. */
let _sn = 1;
function soLieuKy(tap, kyTruoc, kyNay){
  const denHanTruoc = tap.filter(t => trongKhoang(parse(t.han_goc || t.han), kyTruoc));
  const xongTruoc   = tap.filter(t => t.tt === "HOAN_THANH" && trongKhoang(ngayXong(t), kyTruoc));
  const dungHan     = xongTruoc.filter(t => dCong(ngayXong(t), parse(t.han_goc || t.han)) >= 0);
  const treTruoc    = denHanTruoc.filter(t => t.tt !== "HOAN_THANH" || dCong(ngayXong(t), parse(t.han_goc||t.han)) < 0);
  const tlDung      = xongTruoc.length ? Math.round(dungHan.length / xongTruoc.length * 100) : null;
  const denHanNay   = tap.filter(t => viecMo(t) && trongKhoang(parse(t.han), kyNay)).sort((a,b)=>uuTien(a).muc-uuTien(b).muc);
  const mocNay      = denHanNay.filter(t => t.moc);
  const nguoiTap    = [...new Set(tap.filter(viecMo).map(t=>t.lam))];
  const quaTai      = nguoiTap.filter(id => taiTuanNay(id) > SUC_TUAN);
  const tac         = tap.filter(t => viecMo(t) && (t.yKien || t.tt === "CHO_DUYET" || t.tt === "CHO_DUYET_2" || t.tt === "TRA_LAI"));
  const bgd         = tap.map(t => ({t, l: canBGD(t)})).filter(o => o.l)
                        .sort((a,b) => (uuTien(a.t).muc - uuTien(b.t).muc) || (conLai(a.t) - conLai(b.t)));
  const ps = phatSinhKy(tap, kyTruoc);
  return {denHanTruoc, xongTruoc, dungHan, treTruoc, tlDung, denHanNay, mocNay, nguoiTap, quaTai, tac, bgd, ps};
}

let SO_MO = null;
function moSo(k){ SO_MO = (!k || SO_MO === k) ? null : k; draw(); }

/* Mã chỉ số: "<phạm vi>:<mã đơn vị>:<chỉ số>". Phạm vi CTY dùng chính bộ lọc đang xem. */
function soTap(k){
  const [pv, ma, chi] = String(k).split(":");
  const kyTruoc = khoangKy(BC_LOAI, BC_LECH - 1), kyNay = khoangKy(BC_LOAI, BC_LECH);
  if (pv === "DV"){
    const laNg = ma.indexOf("@") === 0;
    if (!laNg && !DV[ma]) return null;
    if (laNg && !U[ma.slice(1)]) return null;
    const x = laNg ? tomTatNS(ma.slice(1), kyTruoc, kyNay) : tomTatDV(ma, kyTruoc, kyNay);
    const ten = x.ten;
    const M = {
      denHan:{n:`${ten} · việc đến hạn ${kyTruoc.ten.toLowerCase()} (${kyTruoc.khoang})`, ds:x.denHan},
      xong:  {n:`${ten} · đã nghiệm thu ${kyTruoc.ten.toLowerCase()}`, ds:x.xong},
      tl:    {n:`${ten} · ${x.dung.length}/${x.xong.length} việc nộp đúng hạn gốc`, ds:x.xong},
      tre:   {n:`${ten} · việc còn trễ chưa xong`, ds:x.treMo},
      tac:   {n:`${ten} · việc đang tắc — chờ trả lời ý kiến, chờ nghiệm thu hoặc bị trả lại`, ds:x.tac},
      nay:   {n:`${ten} · việc đến hạn ${kyNay.ten.toLowerCase()} (${kyNay.khoang})`, ds:x.nay},
      ps:    {n:`${ten} · việc phát sinh ${kyTruoc.ten.toLowerCase()} (${kyTruoc.khoang}) — tính theo ngày được giao`, ds:x.ps.ds},
      psdx:  {n:`${ten} · việc đột xuất phát sinh ${kyTruoc.ten.toLowerCase()}`, ds:x.ps.dotXuat},
      pstt:  {n:`${ten} · việc do chính người thực hiện tự khai`, ds:x.ps.tuTao},
      moc:   {n:`${ten} · mốc bàn giao ${kyNay.ten.toLowerCase()}`, ds:x.moc},
      tai:   {n:`${ten} · người đang quá tải`, ng:x.quaTai},
    };
    return M[chi] || null;
  }
  if (pv === "LAP"){
    const l = T.filter(t => xemDuoc(t) && laCK(t) && !t.tuQuyTac);
    const nguong = new Date(new Date(TODAY).getTime() + (CH.ckSinhTruoc||0)*864e5);
    const M = {
      chay:{n:"Quy tắc lặp đang chạy", ds:l.filter(t => !t.tam)},
      dung:{n:"Quy tắc lặp đang tạm dừng", ds:l.filter(t => t.tam)},
      toi: {n:`Quy tắc sắp tới kỳ — sinh sớm ${CH.ckSinhTruoc} ngày trước hạn`,
            ds:l.filter(q => !q.tam && d2(parse(q.han)) <= d2(nguong))},
      sinh:{n:"Kỳ đã sinh ra từ các quy tắc lặp trong phiên chạy thử này", ds:T.filter(t => t.tuQuyTac && xemDuoc(t))},
      yeu: {n:"Quy tắc lặp có tỷ lệ đúng hạn dưới 90% qua các kỳ đã chạy",
            ds:l.filter(t => t.soKy && (t.kyDung||0)/t.soKy < 0.9)},
    };
    return M[chi] || null;
  }
  const tap = phamViBC(), S = soLieuKy(tap, kyTruoc, kyNay), pham = tenPhamVi();
  const M = {
    xong:  {n:`${pham} · đã nghiệm thu ${kyTruoc.ten.toLowerCase()} (${kyTruoc.khoang})`, ds:S.xongTruoc},
    tl:    {n:`${pham} · ${S.dungHan.length}/${S.xongTruoc.length} việc nộp đúng hạn gốc`, ds:S.xongTruoc},
    tre:   {n:`${pham} · việc trễ ${kyTruoc.ten.toLowerCase()}`, ds:S.treTruoc},
    treMo: {n:`${pham} · việc trễ đến nay vẫn chưa xong`, ds:S.treTruoc.filter(viecMo)},
    nay:   {n:`${pham} · việc đến hạn ${kyNay.ten.toLowerCase()} (${kyNay.khoang})`, ds:S.denHanNay},
    moc:   {n:`${pham} · mốc bàn giao ${kyNay.ten.toLowerCase()}`, ds:S.mocNay},
    tac:   {n:`${pham} · việc đang tắc`, ds:S.tac},
    psinh: {n:`${pham} · việc phát sinh ${kyTruoc.ten.toLowerCase()} (${kyTruoc.khoang}) — tính theo ngày được giao`, ds:S.ps.ds},
    psdx:  {n:`${pham} · việc đột xuất phát sinh ${kyTruoc.ten.toLowerCase()} — việc không nằm trong kế hoạch`, ds:S.ps.dotXuat},
    pstt:  {n:`${pham} · việc do chính người thực hiện tự khai ${kyTruoc.ten.toLowerCase()}`, ds:S.ps.tuTao},
    tai:   {n:`${pham} · người đang quá tải`, ng:S.quaTai},
    bgd:   {n:`${pham} · việc vượt thẩm quyền phòng ban`, ds:S.bgd.map(o=>o.t)},
  };
  return M[chi] || null;
}

/* Một dòng việc gọn — dùng chung cho bảng chi tiết đơn vị và mọi danh sách bung ra
   từ ô số, để hai chỗ không bao giờ mô tả cùng một việc theo hai kiểu khác nhau. */
function dongViecNho(t){
  const vm = vuongMac(t), a = aiLamGi(t), xong = t.tt === "HOAN_THANH";
  const lech = xong ? dCong(ngayXong(t), parse(t.han_goc || t.han)) : null;
  return `<tr onclick="event.stopPropagation();openDw('${t.id}')" style="cursor:pointer" class="${!xong&&quaHan(t)?"gang2":""}">
    <td><b>${t.id}</b></td>
    <td class="wr"><span class="tn2">${esc(t.ttl)}</span></td>
    <td><div style="display:flex;align-items:center;gap:7px">${avHTML(t.lam,22)}<span style="font-size:12.5px">${esc(U[t.lam]?U[t.lam].ten:"—")}</span></div></td>
    <td>${xong
      ? `<span class="tag ${lech>=0?"g":"a"}">Xong${lech<0?` · trễ ${-lech}n`:lech>0?` · sớm ${lech}n`:""}</span>
         <div style="font-size:11px;color:var(--mute)">nộp ${t.nop?t.nop.t:"—"}</div>`
      : `<span style="display:flex;align-items:center;gap:6px"><span class="mini"><i style="width:${tienDo(t)}%"></i></span>${tienDo(t)}%</span>
         <div style="font-size:11px;color:var(--mute)">${dlText(t.han,t).t}</div>`}</td>
    <td class="wr" style="font-size:12px;color:${vm?(quaHan(t)?"var(--red)":"var(--amb)"):"var(--mute)"}">${esc(vm||"—")}</td>
    <td class="wr">${a?`<div style="font-size:12px"><b style="color:var(--navy)">${esc(U[a.ai]?U[a.ai].ten:"—")}</b>
      <div style="color:var(--navy2);font-weight:600">→ ${esc(a.lam)}</div>
      <div style="color:var(--mute);font-size:11px">${esc(a.khi)}</div></div>`:"—"}</td></tr>`;
}
function bangViecNho(ds, tran){
  const n = tran || 12;
  return `<div class="msp"><table class="bcnho"><thead><tr>
      <th style="width:70px">Mã</th><th style="min-width:215px">Công việc</th><th style="min-width:130px">Người thực hiện</th>
      <th style="min-width:118px">Đến đâu rồi</th><th style="min-width:165px">Vướng gì</th>
      <th style="min-width:225px">Ai phải làm gì</th></tr></thead><tbody>
    ${ds.slice(0,n).map(dongViecNho).join("")}</tbody></table></div>
    ${ds.length>n?`<div class="bcgc">Còn ${ds.length-n} việc nữa — mở cửa sổ Theo dõi để xem đủ.</div>`:""}`;
}
/* Khối bung ra ngay dưới hàng ô số. */
function khoiSo(k){
  const o = soTap(k); if (!o) return "";
  const ds = o.ds || [], ng = o.ng || [];
  return `<div class="sok">
    <div class="sokh"><b>${esc(o.n)}</b>
      <span>${ds.length ? `${ds.length} việc — bấm một dòng để mở phiếu việc` : ng.length ? `${ng.length} người` : ""}</span>
      <i onclick="moSo(null)" title="Đóng">✕</i></div>
    ${ds.length ? bangViecNho(ds)
      : ng.length ? `<div class="bcng">${ng.map(id=>{
          const mo = T.filter(t=>t.lam===id&&viecMo(t)&&xemDuoc(t));
          return `<span class="bcng1 ${mo.some(quaHan)?"do":"vang"}">${avHTML(id,24)}<b>${esc(U[id].ten)}</b>
            <span>${esc(U[id].cd)} · ${mo.length} việc mở · tải ${soNgayLe(taiTuanNay(id))}/${SUC_TUAN}</span></span>`;}).join("")}
          <div class="bcgc">Xem từng người ở cửa sổ <b>Cá nhân</b>.</div>`
      : `<div class="flag b2" style="margin:0"><span class="ic2">✓</span><span class="bd2">Không có mục nào.</span></div>`}
  </div>`;
}

/* =========================================================================
   KẾT LUẬN ĐIỀU HÀNH — PHÁT HIỆN CÓ TÊN, KHÔNG PHẢI ĐẾM SỐ

   Bản trước viết "5 việc đến hạn, xong 6, đúng hạn 67%, 1 đơn vị có vấn đề". Bốn con số
   đúng nhưng không phải kết luận: chúng không nói việc NÀO, ai, hậu quả gì, và ai phải
   quyết. Ban Giám đốc đọc xong vẫn phải tự đi tìm.

   Một kết luận điều hành phải có đủ bốn phần, thiếu phần nào là chưa dùng được:
     1. PHÁT HIỆN   — một câu có tên riêng: đơn vị nào, việc nào, người nào, bao nhiêu ngày
     2. BẰNG CHỨNG  — mã việc và con số để tra lại, không phải nhận định
     3. HẬU QUẢ     — chuyện gì xảy ra nếu để nguyên, nói bằng thứ đo được (mốc trễ, tiền kẹt)
     4. PHẢI QUYẾT  — đích danh người quyết và quyết cái gì

   Các con số tổng hợp không bỏ đi, nhưng tụt xuống một dòng nền phía dưới: chúng là
   BỐI CẢNH của kết luận, không phải bản thân kết luận.
   ========================================================================= */
function ketLuanDH(tap, kyTruoc, kyNay, S){
  const K = [];
  const them = o => { if (o && !K.some(x => x.tieu === o.tieu)) K.push(o); };
  const ten = id => U[id] ? U[id].ten : "—";

  /* 1. Việc trễ đang CHẶN việc khác — hậu quả lan, nặng hơn mọi việc trễ đứng một mình */
  tap.filter(t => viecMo(t) && quaHan(t) && dangChan(t))
     .sort((a,b) => conLai(a) - conLai(b)).slice(0,2).forEach(t => {
    const chan = T.filter(x => (x.truoc||[]).includes(t.id) && viecMo(x) && xemDuoc(x));
    const moc = chan.filter(x => x.moc);
    them({m:2, tieu:`${esc(t.ttl)} trễ ${-conLai(t)} ngày và đang chặn ${chan.length} việc khác`,
      bc:`${t.id} · ${ten(t.lam)} · tiến độ ${tienDo(t)}% · hạn ${t.han}${t.doi?` · đã dời ${t.doi} lần`:""}`,
      hq: moc.length ? `${moc.length} mốc bàn giao phía sau lùi theo — ${esc(moc[0].ttl.replace(/^MỐC:\s*/,""))} hạn ${moc[0].han}`
        : `${chan.length} việc phía sau không khởi động được: ${chan.slice(0,2).map(x=>x.id).join(", ")}`,
      qd:`${ten(nguoiDuyet(t) || t.giao)} chốt: dồn thêm người cho ${t.id}, hay lùi cả chuỗi phía sau`});
  });

  /* 2. Ý kiến chưa trả lời — đồng hồ đang dừng, việc đứng im mà không ai biết */
  tap.filter(t => t.yKien).sort((a,b) => ngayDaDung(b) - ngayDaDung(a)).slice(0,2).forEach(t => {
    const n = ngayDaDung(t);
    them({m: n >= 3 ? 2 : 1,
      tieu:`${ten(t.yKien.boi)} nêu “${Y_KIEN[t.yKien.loai][0].toLowerCase()}” ${n} ngày trước, chưa ai trả lời`,
      bc:`${t.id} · ${esc(t.ttl)} · ${esc(t.yKien.nd)}`,
      hq:`Đồng hồ quá hạn đang dừng nên việc này không hiện đỏ ở đâu cả — càng để lâu càng không ai nhớ`,
      qd:`${ten(t.giao)} trả lời dứt điểm: giữ nguyên hạn, đổi hạn, cấp thêm người, hay đổi người`});
  });

  /* 3. Tiền đang chờ chữ ký */
  const tien = tap.filter(t => (t.tienLoai||"CHI") === "CHI" && (t.tien||0) >= BAC_DUYET[0].tu
                            && (viecMo(t) || t.tt === "CHO_DUYET_2"))
                  .sort((a,b) => (b.tien||0) - (a.tien||0));
  if (tien.length){
    const tong = tien.reduce((a,t)=>a+(t.tien||0),0), to = tien[0];
    const bac = bacDat(to), ai = bac.length ? bac[bac.length-1] : null;
    them({m: tien.length >= 3 ? 2 : 1,
      tieu:`${tienTxt(tong)} đang chờ chữ ký ở ${tien.length} khoản chi`,
      bc:`Lớn nhất: ${to.id} · ${esc(to.ttl)} · ${tienTxt(to.tien)} · ${ten(to.lam)}`,
      hq:`Việc đứng chờ duyệt tiền thì người thực hiện vẫn bị tính trễ — trễ này không phải lỗi của họ`,
      qd:`${ai ? ten(ai.ai) : ten(nguoiDuyet(to))} ký hoặc bác trong cuộc họp, không để sang kỳ sau`});
  }

  /* 4. Mốc bàn giao sắp trễ — mốc là điểm không lùi được */
  tap.filter(t => t.moc && viecMo(t) && conLai(t) <= 21)
     .sort((a,b) => conLai(a) - conLai(b)).slice(0,2).forEach(t => {
    const cham = tienDo(t) < 60 || quaHan(t);
    if (!cham) return;
    them({m: quaHan(t) ? 2 : 1,
      tieu: quaHan(t) ? `Mốc “${esc(t.ttl.replace(/^MỐC:\s*/,""))}” đã trễ ${-conLai(t)} ngày`
        : `Mốc “${esc(t.ttl.replace(/^MỐC:\s*/,""))}” còn ${soNgayLe(conLai(t))} ngày nhưng mới đạt ${tienDo(t)}%`,
      bc:`${t.id} · ${ten(t.lam)}${toTien(t).length?` · thuộc ${esc(toTien(t)[0].ttl)}`:""}`,
      hq:`Mốc không lùi được như việc thường — trễ mốc là bên nhận đã lỡ kế hoạch của họ`,
      qd:`${ten(nguoiDuyet(t) || t.giao)} chốt: giữ ngày và cắt bớt phạm vi, hay báo bên nhận ngày mới ngay hôm nay`});
  });

  /* 5. Cam kết kỳ tới vượt sức người — nói trước khi vỡ, không nói sau */
  const camKet = S.denHanNay.filter(t => uuTien(t).muc <= 2);
  const qt = S.quaTai.map(id => ({id, tai: taiTuanNay(id),
      cao: S.denHanNay.filter(t => t.lam === id && uuTien(t).muc <= 2).length}))
    .filter(x => x.cao).sort((a,b) => b.tai - a.tai);
  if (qt.length) them({m:1,
    tieu:`${qt.length} người nhận việc ưu tiên cao ${kyNay.ten.toLowerCase()} trong khi đã quá tải`,
    bc: qt.slice(0,3).map(x => `${ten(x.id)} tải ${soNgayLe(x.tai)}/${SUC_TUAN}, giữ ${x.cao} việc P1–P2`).join(" · "),
    hq:`Cam kết ${kyNay.ten.toLowerCase()} có ${camKet.length} việc ưu tiên cao — phần giao cho người quá tải là phần dễ vỡ nhất`,
    qd:`Trưởng đơn vị chuyển bớt việc, hoặc BGĐ chấp nhận lùi hạn ngay từ đầu kỳ thay vì cuối kỳ`});

  /* 6. Đơn vị lệch hẳn so với phần còn lại */
  if (BC_CAP === "CTY"){
    const dvs = dvBaoCao().map(ma => tomTatDV(ma, kyTruoc, kyNay))
      .filter(x => x.denHan.length || x.nay.length || x.tac.length);
    dvs.filter(x => x.muc === 2).sort((a,b) => (a.tl==null?101:a.tl) - (b.tl==null?101:b.tl))
      .slice(0,2).forEach(x => {
      const nang = x.treMo.slice().sort((a,b)=>conLai(a)-conLai(b))[0];
      them({m:2,
        tieu:`${esc(x.ten)} ${x.tl!=null&&x.tl<60?`chỉ đạt ${x.tl}% đúng hạn`:`còn ${x.treMo.length} việc trễ chưa xong`}, lệch hẳn so với các đơn vị khác`,
        bc:`${x.denHan.length} việc đến hạn, nghiệm thu ${x.xong.length}${x.tl!=null?`, đúng hạn ${x.tl}%`:""}${
          nang?` · nặng nhất ${nang.id} trễ ${-conLai(nang)} ngày (${ten(nang.lam)})`:""}${
          x.khuyet?` · đơn vị đang khuyết trưởng, do ${ten(x.truong)} kiêm nhiệm`:""}`,
        hq: x.khuyet ? `Đơn vị khuyết trưởng thì phiếu phải trôi lên cấp trên nghiệm thu — chậm là hệ quả của cơ cấu, không phải của người làm`
          : `Kéo tỷ lệ đúng hạn toàn công ty xuống ${S.tlDung!=null?S.tlDung+"%":"—"}`,
        qd: x.khuyet ? `BGĐ bổ nhiệm trưởng đơn vị, hoặc ghi rõ người được uỷ quyền nghiệm thu`
          : `${ten(x.truong)} báo cáo nguyên nhân và cam kết mốc phục hồi ngay trong cuộc họp`});
    });
  }

  /* 6b. Việc đột xuất chiếm phần lớn khối lượng phát sinh — kế hoạch không giữ được */
  if (S.ps && S.ps.ds.length >= 3 && S.ps.tlDX >= 30){
    const dx = S.ps.dotXuat.slice().sort((a,b) => uuTien(a).muc - uuTien(b).muc);
    const nguon = {}; dx.forEach(t => { const o = NGUON_DX.find(z => z.ma === t.nguon); const k = o ? o.ten : "không ghi nguồn";
      nguon[k] = (nguon[k]||0) + 1; });
    const topNguon = Object.entries(nguon).sort((a,b)=>b[1]-a[1])[0];
    them({m: S.ps.tlDX >= 50 ? 2 : 1,
      tieu:`${S.ps.tlDX}% việc phát sinh ${kyTruoc.ten.toLowerCase()} là đột xuất — ${S.ps.dotXuat.length} trên ${S.ps.ds.length} việc được giao mới`,
      bc:`${topNguon?`Nguồn nhiều nhất: ${topNguon[0]} (${topNguon[1]} việc)`:""}${
        dx[0]?`${topNguon?" · ":""}nặng nhất ${dx[0].id} · ${esc(dx[0].ttl)} · ${ten(dx[0].lam)}`:""}`,
      hq:`Đột xuất cao thì việc theo kế hoạch bị đẩy lùi — mọi con số trễ ${kyTruoc.ten.toLowerCase()} phải đọc kèm tỷ lệ này mới công bằng với người làm`,
      qd:`BGĐ xem lại khâu sinh ra đột xuất, hoặc chấp nhận giảm bớt cam kết kế hoạch cho tương xứng`});
  }

  /* 6c. Phần lớn việc là do người làm tự khai — cấp trên không còn nắm được đầu việc */
  if (S.ps && S.ps.ds.length >= 4 && S.ps.tlTT >= 60 && BC_CAP !== "NS"){
    const ai = {}; S.ps.tuTao.forEach(t => { ai[t.lam] = (ai[t.lam]||0) + 1; });
    const top = Object.entries(ai).sort((a,b)=>b[1]-a[1]).slice(0,3);
    them({m:1,
      tieu:`${S.ps.tlTT}% việc ${kyTruoc.ten.toLowerCase()} là do chính người làm tự khai, không phải cấp trên giao`,
      bc: top.map(([id,n]) => `${ten(id)} tự khai ${n} việc`).join(" · "),
      hq:`Tự khai là tốt vì việc thật vào được phần mềm, nhưng tỷ lệ cao nghĩa là cấp trên đang không chủ động đặt đầu việc — kế hoạch chạy theo người làm chứ không dẫn dắt`,
      qd:`Trưởng đơn vị rà lại: việc nào đúng là phát sinh thật, việc nào lẽ ra phải nằm trong kế hoạch từ đầu kỳ`});
  }

  /* 7. Việc đã qua ngày bắt đầu mà chưa ai nhận */
  const chuaNhan = tap.filter(t => t.tt === "MOI" && days(t.bd) < -2);
  if (chuaNhan.length >= 2){
    const lau = chuaNhan.slice().sort((a,b)=>days(a.bd)-days(b.bd))[0];
    them({m:1, tieu:`${chuaNhan.length} việc đã qua ngày bắt đầu mà chưa ai nhận`,
      bc:`Lâu nhất: ${lau.id} · ${esc(lau.ttl)} · ${ten(lau.lam)} · quá ${-days(lau.bd)} ngày`,
      hq:`Thời gian đã tiêu nhưng tiến độ vẫn 0% — đến hạn mới phát hiện thì không còn đường lùi`,
      qd:`Trưởng đơn vị xác nhận người thực hiện đã biết việc, hoặc đổi người ngay`});
  }

  /* 8. Tín hiệu lệch khỏi mức thường của chính công ty (XmR) */
  (S.tinHieu || []).forEach(x => them({m:1,
    tieu:`${x.n} ở mức ${x.hienV} — lệch khỏi mức thường của chính ${BC_KY[BC_LOAI].toLowerCase()} trước`,
    bc:`Tính trên chuỗi các kỳ đã qua, không phải so với một chỉ tiêu đặt ra`,
    hq:`Lệch khỏi dải thường nghĩa là có nguyên nhân riêng, không phải dao động tự nhiên`,
    qd:`Hỏi nguyên nhân trong cuộc họp trước khi ra quyết định dựa trên con số này`}));

  return K.sort((a,b) => b.m - a.m).slice(0, 6);
}

/* ---------- ĐIỂM HOÀN THÀNH CÔNG VIỆC THÁNG ---------- */
/* Bốn tiêu chí và trọng số — ĐÚNG bộ đang dùng lúc nghiệm thu, khai một chỗ để hai
   nơi không lệch. Người quản trị sửa ở Thiết lập › Tham số; sửa không hồi tố. */
const TIEU_CHI = [
  {ma:"cl", ten:"Chất lượng kết quả", ts:0.45, mo:"Sản phẩm nộp có dùng được ngay không, có phải sửa lại không"},
  {ma:"dh", ten:"Đúng hạn",           ts:0.30, mo:"Tính tự động từ ngày nộp thật so với hạn gốc, không chấm tay"},
  {ma:"cd", ten:"Chủ động",           ts:0.15, mo:"Báo vướng sớm, tự tìm cách gỡ, không đợi nhắc"},
  {ma:"ht", ten:"Hợp tác",            ts:0.10, mo:"Phối hợp với người khác, bàn giao đủ, không giữ việc một mình"},
];
/* Ngưỡng xếp loại — CÔNG BỐ TRƯỚC, không phải xếp hạng tương đối.
   Cả phòng cùng đạt Xuất sắc là chuyện bình thường; ép phân bổ theo tỷ lệ mới là sai. */
let XEP_LOAI = [
  {ma:"XS", ten:"Xuất sắc",       m:"g", diem:4.5, ht:95, mo:"Điểm ≥ 4,5 và hoàn thành ≥ 95% khối lượng đến hạn"},
  {ma:"T",  ten:"Tốt",            m:"g", diem:4.0, ht:90, mo:"Điểm ≥ 4,0 và hoàn thành ≥ 90%"},
  {ma:"D",  ten:"Đạt",            m:"",  diem:3.5, ht:80, mo:"Điểm ≥ 3,5 và hoàn thành ≥ 80%"},
  {ma:"CT", ten:"Cần cải thiện",  m:"a", diem:2.5, ht:60, mo:"Điểm ≥ 2,5 hoặc hoàn thành ≥ 60%"},
  {ma:"CD", ten:"Chưa đạt",       m:"r", diem:0,   ht:0,  mo:"Dưới mức trên — phải có cuộc trao đổi riêng, không phải một dòng trong bảng"},
];
let MAU_TOI_THIEU = 5;     /* dưới ngưỡng này thì KHÔNG xếp loại */

/* Chấm một đối tượng bất kỳ (người · phòng · khối) trên cùng một tập việc.
   MỘT hàm cho cả ba tầng: ba hàm thì ba tháng sau ba tầng ra ba con số khác nhau. */
function diemThang(ds, ky, meta){
  const denHan = ds.filter(t => trongKhoang(parse(t.han_goc || t.han), ky));
  const xong   = ds.filter(t => t.tt === "HOAN_THANH" && trongKhoang(ngayXong(t), ky) && t.diem);
  const chuaXong = denHan.filter(t => t.tt !== "HOAN_THANH");
  /* Việc trễ nhưng đồng hồ dừng vì chờ bên ngoài — tách ra, không tính vào lỗi người làm. */
  const treNgoai = denHan.filter(t => viecMo(t) && dangDung(t));
  const treThat  = denHan.filter(t => (t.tt !== "HOAN_THANH" && !dangDung(t))
                    || (t.tt === "HOAN_THANH" && dCong(ngayXong(t), parse(t.han_goc||t.han)) < 0));

  const tsDk = xong.reduce((a,t) => a + (t.dk || 1), 0);
  const diemTS = tsDk ? xong.reduce((a,t) => a + (t.dk || 1) * t.diem.tong, 0) / tsDk : null;
  const diemTB = xong.length ? xong.reduce((a,t) => a + t.diem.tong, 0) / xong.length : null;
  /* Hoàn thành tính theo ĐỘ KHÓ, không theo số việc: bỏ dở một việc nặng khác hẳn
     bỏ dở một việc vặt, đếm đầu việc thì hai cái đó bằng nhau. */
  const klDenHan = denHan.reduce((a,t) => a + (t.dk || 1), 0);
  const klXong   = denHan.filter(t => t.tt === "HOAN_THANH").reduce((a,t) => a + (t.dk || 1), 0);
  const tlHT = klDenHan ? Math.round(klXong / klDenHan * 100) : null;
  const tlDH = xong.length
    ? Math.round(xong.filter(t => dCong(ngayXong(t), parse(t.han_goc||t.han)) >= 0).length / xong.length * 100)
    : null;
  /* Điểm từng tiêu chí — để nói được "yếu ở đâu", không chỉ "được mấy điểm". */
  const theoTC = {};
  TIEU_CHI.forEach(c => { theoTC[c.ma] = xong.length
    ? xong.reduce((a,t) => a + (t.diem[c.ma] || 0), 0) / xong.length : null; });

  const du = xong.length >= MAU_TOI_THIEU;
  let loai = null;
  if (du && diemTS != null && tlHT != null){
    loai = XEP_LOAI.find(x => diemTS >= x.diem && tlHT >= x.ht)
        || XEP_LOAI.find(x => diemTS >= x.diem || tlHT >= x.ht)
        || XEP_LOAI[XEP_LOAI.length-1];
  }
  return {...meta, denHan, xong, chuaXong, treThat, treNgoai, tsDk, diemTS, diemTB,
    lech: (diemTS != null && diemTB != null) ? diemTS - diemTB : null,
    tlHT, tlDH, theoTC, du, loai, soViec: xong.length, klDenHan, klXong};
}
function diemThangNguoi(uid, ky){
  return diemThang(T.filter(t => trongTamNhin(t) && t.lam === uid), ky,
    {ma:"@"+uid, uid, ten:U[uid] ? U[uid].ten : "—", phu:U[uid] ? U[uid].cd : "", laNguoi:true});
}
function diemThangDV(ma, ky){
  return diemThang(T.filter(t => trongTamNhin(t) && trongDV(t.lam, ma)), ky,
    {ma, ten:DV[ma] ? DV[ma].ten : ma, phu:(DV[ma] && DV[ma].truong && U[DV[ma].truong])
      ? U[DV[ma].truong].ten : "khuyết trưởng", soNguoi:Object.values(U).filter(u=>trongDV(u.id,ma)).length});
}
function diemThangKhoi(k, ky){
  const ng = nguoiKhoi(k);
  return diemThang(T.filter(t => trongTamNhin(t) && ng.includes(t.lam)), ky,
    {ma:k.ma, ten:k.ten, phu:U[k.bod] ? U[k.bod].ten : "chưa có người phụ trách",
     soNguoi:ng.length, dsNguoi:ng});
}
/* So với tháng trước — chỉ để thấy chiều đi, KHÔNG dùng để xếp hạng. */
function chieuDiem(nay, truoc){
  if (nay == null || truoc == null) return null;
  return Math.round((nay - truoc) * 100) / 100;
}

let BC_MAN = "bc";              /* "bc" báo cáo kỳ · "dg" điểm tháng */
let DG_TANG = "KHOI";           /* KHOI · DV · NS */
let DG_LECH = 0;                /* 0 kỳ này · -1 kỳ trước · -2 */
let DG_KY = "THANG";            /* THANG · QUY — cá nhân thường phải chấm theo quý mới đủ mẫu */
let DG_MO = null;               /* dòng đang bung */
function setMan(k){ BC_MAN = k; DG_MO = null; draw(); }
function setDG(k, v){
  if (k === "tang") DG_TANG = v;
  else if (k === "ky") DG_KY = v;
  else DG_LECH = Number(v);
  DG_MO = null; draw();
}
function moDG(ma){ DG_MO = (DG_MO === ma) ? null : ma; draw(); }

function vDiemThang(){
  const ky = khoangKy(DG_KY, DG_LECH), kyTr = khoangKy(DG_KY, DG_LECH - 1);
  const toan = coQuyen(me, "xem_toan_cty");

  /* Ba tầng, CÙNG một hàm chấm. Tầng nào cũng cắt theo tầm nhìn của người xem. */
  let hang = [], hangTr = [], nhan = "";
  if (DG_TANG === "KHOI"){
    nhan = "khối";
    hang   = KHOI.map(k => diemThangKhoi(k, ky));
    hangTr = KHOI.map(k => diemThangKhoi(k, kyTr));
  } else if (DG_TANG === "DV"){
    nhan = "đơn vị";
    const ds = dvBaoCao();
    hang   = ds.map(m => diemThangDV(m, ky));
    hangTr = ds.map(m => diemThangDV(m, kyTr));
  } else {
    nhan = "người";
    const ds = Object.values(U).filter(u => (toan || nhanhCuaToi().has(u.id)) && nguoiTamDH(u.id))
      .map(u => u.id);
    hang   = ds.map(id => diemThangNguoi(id, ky));
    hangTr = ds.map(id => diemThangNguoi(id, kyTr));
  }
  const mapTr = {}; hangTr.forEach(x => mapTr[x.ma] = x);
  /* Tầng khối và đơn vị GIỮ ĐỦ DÒNG, kể cả dòng chưa có việc nào — ẩn một khối đi
     thì người đọc tưởng công ty chỉ có ba khối. Riêng tầng cá nhân mới lọc bớt,
     vì 44 dòng rỗng là nhiễu, và số bị lọc được NÓI RA ngay dưới bảng. */
  const anDi = DG_TANG === "NS" ? hang.filter(x => !x.denHan.length && !x.xong.length).length : 0;
  if (DG_TANG === "NS") hang = hang.filter(x => x.denHan.length || x.xong.length);
  hang.sort((a,b) => (b.diemTS ?? -1) - (a.diemTS ?? -1));

  const coDiem = hang.filter(x => x.diemTS != null);
  const tbChung = coDiem.length ? coDiem.reduce((a,x)=>a+x.diemTS,0) / coDiem.length : null;
  const tongViec = hang.reduce((a,x)=>a+x.xong.length,0);
  const chuaDu = hang.filter(x => !x.du).length;

  let h = `<p class="sub">Điểm chấm <b>một lần lúc nghiệm thu</b> theo bốn tiêu chí; màn này
    <b>không chấm lại</b>, chỉ cộng điểm đã chấm lên ba tầng: người → phòng ban → khối.
    Chấm lại là hồi tố, và điểm cũ tự đổi số sau lưng người ta.</p>`;

  const nhanKy = DG_KY === "QUY" ? "quý" : "tháng";
  h += `<div class="lb" style="gap:10px;margin-bottom:14px">
    <div class="sg">${[["THANG","Theo tháng"],["QUY","Theo quý"]].map(([k,v])=>
      `<button class="${DG_KY===k?"on":""}" onclick="setDG('ky','${k}')">${v}</button>`).join("")}</div>
    <div class="sg">${[[0,`${DG_KY==="QUY"?"Quý":"Tháng"} này`],[-1,`${DG_KY==="QUY"?"Quý":"Tháng"} trước`],[-2,"Kỳ trước nữa"]].map(([k,v])=>
      `<button class="${DG_LECH===k?"on":""}" onclick="setDG('lech','${k}')">${v}</button>`).join("")}</div>
    <span class="lsep"></span>
    <div class="sg">${[["KHOI","Khối"],["DV","Phòng ban"],["NS","Cá nhân"]].map(([k,v])=>
      `<button class="${DG_TANG===k?"on":""}" onclick="setDG('tang','${k}')">${v}</button>`).join("")}</div>
    <span class="lsep"></span>
    <span style="font-size:12.5px;color:var(--mute)">Kỳ chấm <b style="color:var(--navy)">${ky.day}</b></span>
  </div>`;

  h += oKPI([
    [`Việc đã nghiệm thu trong ${nhanKy}`, tongViec, `trên ${hang.reduce((a,x)=>a+x.denHan.length,0)} việc đến hạn`, "var(--navy)"],
    ["Điểm trung bình chung", tbChung != null ? so1(tbChung) : "—",
      `trung bình của ${coDiem.length} trên ${hang.length} ${nhan} có việc nghiệm thu trong ${nhanKy}`,
      tbChung == null ? "" : tbChung >= 4 ? "#1B5E20" : tbChung >= 3.5 ? "" : "var(--amb)"],
    ["Chưa đủ mẫu để xếp loại", chuaDu, chuaDu ? `dưới ${MAU_TOI_THIEU} việc nghiệm thu trong ${nhanKy}` : "mọi dòng đều đủ mẫu",
      chuaDu ? "var(--mute)" : "#1B5E20"],
    ["Cần trao đổi riêng", hang.filter(x => x.loai && (x.loai.ma === "CD" || x.loai.ma === "CT")).length,
      "xếp loại Cần cải thiện hoặc Chưa đạt", hang.some(x=>x.loai&&x.loai.ma==="CD")?"var(--red)":""],
  ]);

  /* Màn tự soi chính nó: có đủ dữ liệu để chấm ở tầng này không.
     Hiện 44 dòng "Chưa đủ mẫu" rồi để người dùng tự đoán vì sao là cách tệ nhất. */
  const coViec = hang.filter(x => x.xong.length > 0);
  const duMau  = hang.filter(x => x.du);
  const tlDu   = coViec.length ? Math.round(duMau.length / coViec.length * 100) : 0;
  if (coViec.length && tlDu < 50){
    const thieu = coViec.reduce((a,x) => a + Math.max(0, MAU_TOI_THIEU - x.xong.length), 0);
    const canGap = tongViec ? Math.round((tongViec + thieu) / tongViec * 10) / 10 : null;
    h += `<div class="cbm">
      <span class="cbmi">!</span>
      <div><b>Kỳ ${esc(ky.ten)} chưa đủ dữ liệu để xếp loại ở tầng ${nhan} này.</b>
        <div class="cbmn">Chỉ <b>${duMau.length}/${coViec.length}</b> ${nhan} đạt ngưỡng ${MAU_TOI_THIEU} việc nghiệm thu.
          Cả kỳ có <b>${tongViec}</b> việc được nghiệm thu; để mọi ${nhan} đủ mẫu cần thêm khoảng
          <b>${thieu}</b> việc nữa${canGap ? `, tức gấp <b>${so1(canGap)}</b> lần khối lượng hiện tại` : ""}.
          Đây <b>không phải lỗi phần mềm</b> — đây là giới hạn của dữ liệu, và hạ ngưỡng xuống để có
          xếp loại đẹp thì con số xếp loại đó không nói lên điều gì.</div>
        <div class="cbml">
          ${DG_KY === "THANG" ? `<button class="btn sm" onclick="setDG('ky','QUY')">Chấm theo quý thay vì theo tháng</button>` : ""}
          ${DG_TANG === "NS" ? `<button class="btn sm" onclick="setDG('tang','DV')">Xem tầng phòng ban — đủ mẫu hơn</button>` : ""}
          <span>Ngưỡng mẫu sửa ở <b>Thiết lập › Tham số</b>, nhưng hạ ngưỡng không tạo thêm dữ liệu.</span>
        </div></div>
    </div>`;
  }

  /* dải phân bố — KHÔNG phải phân bổ cưỡng bức */
  const pb = XEP_LOAI.map(L => ({L, n: hang.filter(x => x.loai && x.loai.ma === L.ma).length}));
  const chua = hang.filter(x => !x.du).length;
  h += `<div class="pbl">
    <div class="pbh"><b>Phân bố xếp loại</b>
      <span>xếp theo <b>ngưỡng công bố trước</b>, không phải xếp hạng với nhau —
        cả nhóm cùng Xuất sắc là bình thường, ép theo tỷ lệ mới là sai</span></div>
    <div class="pbb">${pb.map(({L,n}) => n ? `<span class="pbs ${L.m}" style="flex:${n}"
      title="${esc(L.ten)}: ${n} ${nhan}">${n}</span>` : "").join("")}${
      chua ? `<span class="pbs m" style="flex:${chua}" title="Chưa đủ mẫu: ${chua}">${chua}</span>` : ""}</div>
    <div class="pbc">${pb.filter(x=>x.n).map(({L,n})=>`<span><i class="${L.m}"></i>${esc(L.ten)} ${n}</span>`).join("")}
      ${chua?`<span><i class="m"></i>Chưa đủ mẫu ${chua}</span>`:""}</div>
  </div>`;

  /* bảng chính */
  h += `<div class="tdkh ${hang.length<=8?"it":""}"><table class="dgb"><thead><tr>
      <th style="min-width:206px">${DG_TANG==="NS"?"Người":DG_TANG==="DV"?"Đơn vị":"Khối"}</th>
      <th style="min-width:132px">${DG_TANG==="NS"?"Chức danh":"Phụ trách"}</th>
      <th class="num" title="Số việc đã nghiệm thu trong tháng">Việc xong</th>
      <th class="num" title="Tổng điểm độ khó của việc đã nghiệm thu">Khối lượng</th>
      <th style="min-width:148px" title="Tỷ lệ hoàn thành tính theo ĐỘ KHÓ, không theo số việc">Hoàn thành</th>
      <th style="min-width:118px">Đúng hạn</th>
      <th style="min-width:150px" title="Điểm có nhân trọng số độ khó">Điểm ${nhanKy}</th>
      <th style="min-width:118px">So ${nhanKy} trước</th>
      <th style="min-width:132px">Xếp loại</th></tr></thead><tbody>
    ${hang.map(x => { const tr = mapTr[x.ma], ch = chieuDiem(x.diemTS, tr ? tr.diemTS : null);
      const rong = 9;
      return `<tr class="${x.loai&&x.loai.ma==="CD"?"gang2":""} ${DG_MO===x.ma?"ckchon":""}"
          onclick="moDG('${x.ma}')" style="cursor:pointer">
        <td class="cot">${x.laNguoi
          ? `<div style="display:flex;align-items:center;gap:9px">${avHTML(x.uid,26)}<b>${esc(x.ten)}</b></div>`
          : `<b>${esc(x.ten)}</b>${x.soNguoi?`<div style="font-size:11px;color:var(--mute)">${x.soNguoi} người</div>`:""}`}</td>
        <td style="font-size:12px;color:var(--mute)">${esc(x.phu||"")}</td>
        <td class="num">${x.xong.length}${x.chuaXong.length?`<div style="font-size:10.5px;color:var(--red)">bỏ dở ${x.chuaXong.length}</div>`:""}</td>
        <td class="num">${x.tsDk||0}</td>
        <td>${x.tlHT!=null?`<div class="tt2"><span class="tb2"><span style="width:${Math.min(100,x.tlHT)}%;
            background:${x.tlHT>=90?"#2E7D32":x.tlHT>=80?"#C8901A":"#C0392B"}"></span></span>
            <b>${x.tlHT}%</b></div>`:`<i style="color:var(--mute)">—</i>`}</td>
        <td>${x.tlDH!=null?`<b style="color:${x.tlDH>=90?"#1B5E20":x.tlDH>=75?"#8A6D3B":"var(--red)"}">${x.tlDH}%</b>`:"—"}
          ${x.treNgoai.length?`<div style="font-size:10.5px;color:var(--mute)">${x.treNgoai.length} việc chờ bên ngoài</div>`:""}</td>
        <td>${x.diemTS!=null?`<b style="font-size:15px">${so1(x.diemTS)}</b>
            <span style="font-size:11px;color:var(--mute)"> / 5</span>
            ${x.lech!=null&&Math.abs(x.lech)>=0.15?`<div style="font-size:10.5px;color:${x.lech<0?"var(--amb)":"var(--mute)"}"
              title="Điểm không nhân trọng số là ${so1(x.diemTB)}">${x.lech<0?"thấp hơn":"cao hơn"} trung bình cộng ${so1(Math.abs(x.lech))}</div>`:""}`
          :`<i style="color:var(--mute)">chưa có việc nghiệm thu</i>`}</td>
        <td>${ch!=null?`<span style="font-weight:700;color:${ch>0?"#1B5E20":ch<0?"var(--red)":"var(--mute)"}">${
            ch>0?"▲":ch<0?"▼":"■"} ${so1(Math.abs(ch))}</span>`:`<i style="color:var(--mute)">—</i>`}</td>
        <td>${x.du && x.loai
          ? `<span class="xl ${x.loai.m}">${esc(x.loai.ten)}</span>`
          : x.xong.length || x.denHan.length
          ? `<span class="xl m" title="Mới ${x.xong.length} việc nghiệm thu, dưới ngưỡng ${MAU_TOI_THIEU} — không đủ để kết luận về một tháng">Chưa đủ mẫu</span>`
          : `<span class="xl m" title="Không có việc nào đến hạn hay nghiệm thu trong tháng">Không có việc</span>`}</td>
      </tr>` + (DG_MO === x.ma ? `<tr class="pqbung"><td colspan="${rong}">${bungDiem(x, tr, ky)}</td></tr>` : "");
    }).join("")}</tbody></table></div>`;

  if (anDi) h += `<div class="bcgc">Ẩn ${anDi} người không có việc nào đến hạn hay nghiệm thu trong
    ${esc(ky.ten)} — họ không bị chấm điểm, cũng không bị xếp loại.</div>`;
  if (!hang.length) h += `<div class="flag b2"><span class="ic2">—</span>
    <span class="bd2">Tháng ${ky.ten} chưa có việc nào đến hạn hay nghiệm thu trong phạm vi bạn xem được.</span></div>`;

  /* bảng quy tắc — công bố trước, để không ai tranh cãi sau */
  h += `<h2 class="sh">Cách tính điểm <em>— công bố trước, ai cũng đọc được, không đổi giữa kỳ</em></h2>
    <div class="qtl">
      <div class="qtc"><b>Bốn tiêu chí chấm lúc nghiệm thu</b>
        ${TIEU_CHI.map(c=>`<div class="qtr"><span class="qtts">${Math.round(c.ts*100)}%</span>
          <div><b>${esc(c.ten)}</b><i>${esc(c.mo)}</i></div></div>`).join("")}
        <div class="qtn">Tiêu chí <b>Đúng hạn</b> tính tự động từ ngày nộp thật so với hạn gốc —
          người duyệt không chấm tay được ô này, nên không co giãn theo cảm tình.</div></div>
      <div class="qtc"><b>Bốn quy tắc cộng điểm lên kỳ</b>
        ${[["Nhân trọng số độ khó","Điểm kỳ = Σ(độ khó × điểm việc) ÷ Σ độ khó. Trung bình cộng thì người làm 20 việc dễ ăn đứt người làm 3 việc khó — muốn điểm cao phải gánh việc nặng."],
           ["Tính cả việc bỏ dở","Chỉ cộng điểm việc đã xong thì người bỏ dở 5 việc và làm tốt 1 việc vẫn điểm cao. Cột Hoàn thành là cột riêng, không trộn vào điểm."],
           ["Trừ phần chờ bên ngoài","Việc dừng đồng hồ vì chờ đối tác hay chờ trả lời ý kiến thì trễ đó không phải lỗi người làm — hiện thành cột riêng, không âm thầm cộng vào."],
           [`Dưới ${MAU_TOI_THIEU} việc thì không xếp loại`,`Năm việc một kỳ không đủ để kết luận về một con người. Hiện “chưa đủ mẫu” chứ không hiện một xếp loại giả. Ở công ty này khối lượng một tháng thường chỉ đủ chấm khối và phòng ban; chấm từng người nên để theo quý.`]]
          .map(([a,b],i)=>`<div class="qtr"><span class="qtts">${i+1}</span><div><b>${esc(a)}</b><i>${esc(b)}</i></div></div>`).join("")}
      </div>
      <div class="qtc"><b>Ngưỡng xếp loại</b>
        ${XEP_LOAI.map(L=>`<div class="qtr"><span class="xl ${L.m}">${esc(L.ten)}</span>
          <div><i>${esc(L.mo)}</i></div></div>`).join("")}
        <div class="qtn"><b>Không xếp hạng người với nhau.</b> Ai đạt ngưỡng nào thì vào loại đó —
          có thể cả phòng cùng Xuất sắc, cũng có thể không ai. Ép phân bổ theo tỷ lệ trong nhóm nhỏ
          sai vị trí 32–53%, và nó biến việc phân công thành cuộc đua giành việc dễ.
          Sửa ngưỡng ở <b>Thiết lập › Tham số</b>; sửa <b>không hồi tố</b>.</div></div>
    </div>`;
  return h;
}

/* Bung một dòng: điểm từng tiêu chí, danh sách việc đã chấm, việc bỏ dở.
   Không có phần này thì bảng điểm là một con số không cãi được — mà điểm phải cãi được. */
function bungDiem(x, tr, ky){
  const cot = c => x.theoTC[c.ma];
  let h = `<div class="pqd">
    <div class="dgg">
      <div class="dgtc"><div class="dgth">Điểm từng tiêu chí <em>— để nói được yếu ở đâu, không chỉ được mấy điểm</em></div>
        ${TIEU_CHI.map(c => { const v = cot(c), vt = tr ? tr.theoTC[c.ma] : null;
          return `<div class="dgtr"><span class="dgtn">${esc(c.ten)}<i>${Math.round(c.ts*100)}%</i></span>
            <span class="dgtb"><span style="width:${v!=null?Math.round(v/5*100):0}%;
              background:${v==null?"#ccc":v>=4?"#2E7D32":v>=3?"#C8901A":"#C0392B"}"></span></span>
            <span class="dgtv">${v!=null?so1(v):"—"}${vt!=null&&v!=null&&Math.abs(v-vt)>=0.2
              ?`<i class="${v>vt?"len":"xuong"}">${v>vt?"▲":"▼"}${so1(Math.abs(v-vt))}</i>`:""}</span></div>`;
        }).join("")}
        <div class="dgn">Điểm có trọng số <b>${x.diemTS!=null?so1(x.diemTS):"—"}</b> ·
          không trọng số <b>${x.diemTB!=null?so1(x.diemTB):"—"}</b>.
          ${x.lech!=null&&x.lech<-0.15
            ? `Thấp hơn khi nhân trọng số nghĩa là <b>việc khó bị chấm thấp hơn việc dễ</b> — đáng hỏi thêm.`
            : x.lech!=null&&x.lech>0.15
            ? `Cao hơn khi nhân trọng số nghĩa là <b>việc khó được làm tốt hơn việc dễ</b>.`
            : `Hai số sát nhau — chất lượng đều giữa việc khó và việc dễ.`}</div>
      </div>
      <div class="dgtc"><div class="dgth">Khối lượng kỳ ${esc(ky.ten)}</div>
        <div class="dgso"><span><b>${x.klXong||0}</b>điểm độ khó đã nghiệm thu</span>
          <span><b>${x.klDenHan||0}</b>điểm độ khó đến hạn</span>
          <span><b>${x.xong.length}</b>việc xong</span>
          <span><b class="${x.chuaXong.length?"r":""}">${x.chuaXong.length}</b>việc bỏ dở</span>
          <span><b class="${x.treThat.length?"r":""}">${x.treThat.length}</b>trễ thật</span>
          <span><b>${x.treNgoai.length}</b>chờ bên ngoài</span></div>
        ${x.treNgoai.length?`<div class="dgn">${x.treNgoai.length} việc quá hạn nhưng
          <b>đồng hồ đang dừng</b> vì chờ bên ngoài — không tính vào lỗi của người làm.</div>`:""}
      </div>
    </div>`;

  if (x.xong.length) h += `<div class="dgvh">Việc đã nghiệm thu và điểm từng việc</div>
    <div class="msp"><table><thead><tr><th style="min-width:230px">Việc</th>
      ${x.laNguoi?"":`<th style="min-width:130px">Người làm</th>`}
      <th class="num">Độ khó</th>${TIEU_CHI.map(c=>`<th class="num" title="${esc(c.ten)}">${esc(c.ten.split(" ")[0])}</th>`).join("")}
      <th class="num">Điểm</th><th style="min-width:126px">Người chấm</th></tr></thead><tbody>
      ${x.xong.slice(0,TRAN_DONG).map(t=>`<tr onclick="event.stopPropagation();openDw('${t.id}')" style="cursor:pointer">
        <td class="cot"><b>${esc(t.ttl)}</b><div style="font-size:11px;color:var(--mute)">${esc(t.id)} · hạn ${esc(t.han_goc||t.han)}</div></td>
        ${x.laNguoi?"":`<td style="font-size:12px">${esc(U[t.lam]?U[t.lam].ten:"—")}</td>`}
        <td class="num">${t.dk||1}</td>
        ${TIEU_CHI.map(c=>`<td class="num" style="color:${(t.diem[c.ma]||0)>=4?"#1B5E20":(t.diem[c.ma]||0)>=3?"":"var(--red)"}">${t.diem[c.ma]||"—"}</td>`).join("")}
        <td class="num"><b>${so1(t.diem.tong)}</b></td>
        <td style="font-size:11.5px;color:var(--mute)">${esc(t.diem.ai||"—")}</td></tr>`).join("")}
    </tbody></table></div>
    ${x.xong.length>TRAN_DONG?`<div class="bcgc">Còn ${x.xong.length-TRAN_DONG} việc nữa — mở phiếu từng việc để xem đủ.</div>`:""}`;

  if (x.chuaXong.length) h += `<div class="dgvh" style="margin-top:12px">Việc đến hạn trong tháng mà chưa nghiệm thu
      <em> — không có điểm, nhưng vẫn trừ vào cột Hoàn thành</em></div>
    <div class="msp"><table><thead><tr><th style="min-width:230px">Việc</th>
      ${x.laNguoi?"":`<th style="min-width:130px">Người làm</th>`}
      <th class="num">Độ khó</th><th class="num">Tiến độ</th><th style="min-width:96px">Hạn</th>
      <th style="min-width:160px">Vì sao chưa xong</th></tr></thead><tbody>
      ${x.chuaXong.slice(0,TRAN_DONG).map(t=>`<tr onclick="event.stopPropagation();openDw('${t.id}')" style="cursor:pointer">
        <td class="cot"><b>${esc(t.ttl)}</b><div style="font-size:11px;color:var(--mute)">${esc(t.id)}</div></td>
        ${x.laNguoi?"":`<td style="font-size:12px">${esc(U[t.lam]?U[t.lam].ten:"—")}</td>`}
        <td class="num">${t.dk||1}</td><td class="num">${tienDo(t)}%</td>
        <td style="font-size:12px">${esc(t.han)}</td>
        <td style="font-size:12px">${dangDung(t)?`<span style="color:var(--amb)">đồng hồ dừng — chờ bên ngoài</span>`
          :t.tt==="CHO_DUYET"||t.tt==="CHO_DUYET_2"?"đang chờ nghiệm thu"
          :t.tt==="TRA_LAI"?"bị trả lại, đang làm lại":"đang làm"}</td></tr>`).join("")}
    </tbody></table></div>`;
  return h + `</div>`;
}

function vBaoCao(){
  /* Mặt trước chỉ có bốn thứ, đúng thứ tự người chủ trì nói trong cuộc họp:
       1. Tình hình kỳ qua — vài câu văn xuôi
       2. Công việc kỳ qua — đến đâu, vướng gì, ai phải làm gì
       3. Kế hoạch kỳ này
       4. Cần quyết ngay trong cuộc họp
     Không có mục phương pháp nào trên màn hình. Phép tính tín hiệu và nhiễu vẫn chạy
     nhưng chỉ dùng để QUYẾT ĐỊNH CÓ HIỆN RA HAY KHÔNG — nhiễu thì im lặng. */
  chuanBC();                       /* ép lựa chọn về trong phạm vi trước khi tính bất cứ con số nào */
  const kyTruoc = khoangKy(BC_LOAI, BC_LECH - 1), kyNay = khoangKy(BC_LOAI, BC_LECH);
  const tap = phamViBC();
  const dvi = BC_KY[BC_LOAI].toLowerCase();

  const S = soLieuKy(tap, kyTruoc, kyNay);
  const {denHanTruoc, xongTruoc, dungHan, treTruoc, tlDung, denHanNay, mocNay, quaTai} = S;

  const bangViec = [...xongTruoc, ...tap.filter(t => viecMo(t) && laLa(t) && vuongMac(t))]
    .filter((t,k,a) => a.indexOf(t) === k)
    .sort((a,b) => (a.tt==="HOAN_THANH"?1:0) - (b.tt==="HOAN_THANH"?1:0) || uuTien(a).muc - uuTien(b).muc);

  const canQuyet = [];
  const them = (t,l) => { if (!canQuyet.some(x=>x.t===t)) canQuyet.push({t, l}); };
  tap.filter(t => t.yKien).forEach(t => them(t,"Ý kiến chưa trả lời"));
  tap.filter(t => t.tt === "CHO_DUYET" || t.tt === "CHO_DUYET_2").forEach(t => them(t,"Chờ nghiệm thu"));
  tap.filter(t => viecMo(t) && (t.tien||0) >= BAC_DUYET[0].tu && t.tienLoai === "CHI").forEach(t => them(t,"Vượt ngưỡng chi"));
  treTruoc.filter(viecMo).forEach(t => them(t,"Trễ, chưa xong"));

  const chuNhanh = BC_CAP === "NS" ? BC_DV : BC_CAP === "DV" ? (DV[BC_DV] && DV[BC_DV].truong) || "F003" : "F003";
  const bd = bangDiem(tap, kyTruoc, kyNay, chuNhanh);
  const tinHieuThat = bd.filter(x => x.th && (x.th.loai === "tot" || x.th.loai === "xau"));

  /* Hai mặt của cùng một cửa sổ: báo cáo kỳ và điểm tháng. Cùng phạm vi, cùng người xem —
     tách thành hai tab thì phải chọn phạm vi hai lần. */
  const MAN = [["bc","Báo cáo kỳ","Kỳ qua ra sao, việc phải quyết, cam kết kỳ tới"],
               ["dg","Điểm tháng","Điểm hoàn thành công việc của khối, phòng ban và từng người"]];
  const dauMan = `<div class="mant">${MAN.map(([k,n,d])=>`<button class="${BC_MAN===k?"on":""}"
      onclick="setMan('${k}')"><b>${n}</b><i>${d}</i></button>`).join("")}</div>`;
  if (BC_MAN === "dg") return `<h1 class="h1">Điểm hoàn thành công việc</h1>${dauMan}${vDiemThang()}`;

  let h = `<h1 class="h1">${BC_CAP==="CTY"?"Báo cáo điều hành":"Báo cáo giao ban"}</h1>${dauMan}
    <p class="sub">${esc(tenPhamVi())} · ${BC_CAP==="CTY"
      ? "bản dành cho Ban Giám đốc — kết quả theo đơn vị, việc phải quyết, cam kết kỳ tới."
      : "chi tiết từng việc — đến đâu rồi, vướng gì, ai phải làm gì."}</p>
    <div class="lb" style="gap:10px">
      <div class="sg">${Object.entries(BC_KY).map(([k,v])=>
        `<button class="${BC_LOAI===k?"on":""}" onclick="setBC('loai','${k}')">${v}</button>`).join("")}</div>
      <div class="sg">${[[0,"Kỳ này"],[-1,"Kỳ trước"],[-2,"Hai kỳ trước"]].map(([k,v])=>
        `<button class="${BC_LECH===k?"on":""}" onclick="setBC('lech','${k}')">${v}</button>`).join("")}</div>
      <span class="lsep"></span>
      ${(()=>{ const cho = capBCChoPhep();
        if (cho.length < 2) return "";
        return `<div class="sg">${[["CTY","Công ty"],["DV","Phòng ban"],["NS","Cá nhân"]]
          .filter(([k]) => cho.includes(k))
          .map(([k,v])=>`<button class="${BC_CAP===k?"on":""}" onclick="setBC('cap','${k}')">${v}</button>`).join("")}</div>`; })()}
      ${BC_CAP==="DV"?`<select class="lsel" style="max-width:290px" onchange="setBC('dv',this.value)">
        ${dvBCChoPhep().map(([k,d])=>
          `<option value="${k}" ${BC_DV===k?"selected":""}>${esc(d.ten)}</option>`).join("")}</select>`:""}
      ${BC_CAP==="NS"?chonNguoiHTML():""}
    </div>`;

  /* Nói thẳng người đang xem được đọc tới đâu. Giấu phạm vi thì người ta tưởng
     con số là của cả công ty rồi kết luận sai. */
  h += `<div class="pvbc"><span class="pvi">${coQuyen(me,"xem_toan_cty")?"◎":"◐"}</span>
    <span>Bạn đang xem với vai <b>${esc(U[me].ten)} — ${esc(U[me].cd)}</b> ·
    ${coQuyen(me,"xem_toan_cty")
      ? `phạm vi <b>toàn công ty</b>, ${Object.keys(U).length} người`
      : doiCuaToi().length
        ? `phạm vi <b>nhánh do bạn phụ trách</b> — ${doiCuaToi().length} người, cộng việc có tên bạn ở bất kỳ vai nào`
        : `phạm vi <b>việc có tên bạn</b> — bạn không phụ trách nhánh nào nên không đọc được dữ liệu của người khác`}.
    Toàn bộ con số dưới đây chỉ tính trên <b>${tap.length}</b> việc bạn được đọc, không phải ${T.length} việc của cả kho.</span></div>`;

  /* --- Dải kỳ: luôn ghi rõ TỪ NGÀY NÀO ĐẾN NGÀY NÀO, không bắt người đọc suy ra --- */
  h += `<div class="bcky">
      <div class="bck qua"><span class="bckl">Đánh giá kỳ qua</span>
        <b>${kyTruoc.ten}</b><span class="bckd">${kyTruoc.khoang}</span></div>
      <span class="bcmui">→</span>
      <div class="bck nay"><span class="bckl">Kế hoạch kỳ này</span>
        <b>${kyNay.ten}</b><span class="bckd">${kyNay.khoang}</span></div>
      <div class="bcnow">Lập lúc ${fmtDY(new Date(TODAY))}</div>
    </div>`;

  /* ===================================================================
     A. CẤP CÔNG TY — BÁO CÁO ĐIỀU HÀNH
     Ba câu hỏi, ba bảng, không có bảng nào quá 10 dòng.
     =================================================================== */
  if (BC_CAP === "CTY" || BC_CAP === "DV"){
    const CON = dsConBC(kyTruoc, kyNay);
    const dvs = CON.ds
      .filter(x => x.denHan.length || x.nay.length || x.tac.length)
      .sort((a,b) => (b.muc - a.muc) || (b.treMo.length - a.treMo.length)
                  || ((a.tl == null ? 101 : a.tl) - (b.tl == null ? 101 : b.tl)));
    const xau = dvs.filter(x => x.muc === 2), vua = dvs.filter(x => x.muc === 1), tot = dvs.filter(x => x.muc === 0);
    const bgd = tap.map(t => ({t, l: canBGD(t)})).filter(x => x.l)
      .sort((a,b) => (uuTien(a.t).muc - uuTien(b.t).muc) || (conLai(a.t) - conLai(b.t)));

    /* 1 · KẾT LUẬN — từng phát hiện có tên, có bằng chứng, có hậu quả, có người quyết. */
    const KL = ketLuanDH(tap, kyTruoc, kyNay, {...S, tinHieu: tinHieuThat});
    h += `<h2 class="sh">${(_sn=2, 1)} · Kết luận điều hành <em>— ${KL.length ? `${KL.length} phát hiện, xếp nặng trước · mỗi phát hiện đã kèm người phải quyết` : `không phát hiện nào cần ${CON.capTren} can thiệp`}</em></h2>`;
    h += KL.length ? `<div class="kldh">${KL.map((k,i)=>`<div class="kld ${k.m===2?"do":"vang"}">
        <span class="kldn">${i+1}</span>
        <div class="kldb">
          <b class="kldt">${k.tieu}</b>
          <div class="kldr"><span>Bằng chứng</span><i>${k.bc}</i></div>
          <div class="kldr"><span>Nếu để nguyên</span><i>${k.hq}</i></div>
          <div class="kldr qd"><span>Phải quyết</span><i>${k.qd}</i></div>
        </div></div>`).join("")}</div>`
      : `<div class="kl g"><span class="ki">✓</span><div><span class="kt">Không có phát hiện nào cần ${CON.capTren} can thiệp</span>
          <div class="ks">Không việc trễ nào đang chặn việc khác, không ý kiến nào chờ trả lời, không khoản chi nào chờ ký,
          không mốc nào sắp trễ. Cuộc họp chỉ cần chốt cam kết kỳ tới ở mục 4.</div></div></div>`;


    h += oKPI([
      ["Đã nghiệm thu", xongTruoc.length, kyTruoc.khoang, "", "CTY::xong"],
      ["Đúng hạn", tlDung!=null?tlDung+"%":"—", `${dungHan.length}/${xongTruoc.length} việc, so hạn gốc`,
        tlDung==null?"":tlDung>=90?"#1B5E20":tlDung>=75?"#8A6D3B":"var(--red)", "CTY::tl"],
      ["Còn trễ chưa xong", treTruoc.filter(viecMo).length, treTruoc.filter(viecMo).length?`trên ${denHanTruoc.length} việc đến hạn`:`trên ${denHanTruoc.length} việc đến hạn`,
        treTruoc.filter(viecMo).length?"var(--red)":"#1B5E20", "CTY::treMo"],
      ["BGĐ phải quyết", bgd.length, bgd.length?"vượt thẩm quyền phòng ban":"không có", bgd.length?"var(--amb)":"#1B5E20", "CTY::bgd"],
      ["Việc phát sinh", S.ps.ds.length,
        S.ps.ds.length ? `${S.ps.dotXuat.length} đột xuất · ${S.ps.tuTao.length} tự khai · ${S.ps.chuKy.length} chu kỳ`
                       : "không việc nào được giao mới",
        S.ps.tlDX!=null && S.ps.tlDX >= 30 ? "var(--amb)" : "", S.ps.ds.length?"CTY::psinh":""],
    ]);

    /* 2 · BỐN KHỐI CỦA BAN GIÁM ĐỐC — người chịu trách nhiệm trước Hội đồng là bốn
       người này; bảng phòng ban ở mục 3 là tầng thực thi bên dưới. */
    const KS = KHOI.map(k => tomTatKhoi(k, kyTruoc, kyNay));
    const ho = khoiHo(kyTruoc, kyNay);
    const KSX = [...KS].sort((a,b) => (b.muc - a.muc) || (b.treMo.length - a.treMo.length));
    const tongDH = KS.reduce((a,x)=>a+x.denHan.length,0) + (ho?ho.denHan.length:0);
    _sn = 2;
    h += `<h2 class="sh">${_sn++} · Bốn khối của Ban Giám đốc
      <em>— ai chịu trách nhiệm mảng nào, mảng đó kỳ qua ra sao · bấm một khối để mở các phòng bên trong</em></h2>`;
    h += `<div class="kho">${[...KSX, ...(ho?[ho]:[])].map(x => {
      const tong = Math.max(1, x.denHan.length);
      const wD = x.dung.length / tong * 100;
      const wT = Math.max(0, x.xong.length - x.dung.length) / tong * 100;
      const wM = x.treMo.length / tong * 100;
      const bod = x.truong && U[x.truong] ? U[x.truong] : null;
      return `<button class="khoc m${x.muc}${KHOI_MO===x.ma?" op":""}" onclick="moKhoi('${x.ma}')">
        <div class="khoh">${bod ? avHTML(bod.id, 34) : `<span class="khox">?</span>`}
          <div class="khot"><b>${esc(x.ten)}</b>
            <i>${bod ? esc(bod.ten) + " · " + esc(bod.cd) : "chưa có người phụ trách"}</i></div>
          <span class="khom ${["g","a","r"][x.muc]}">${["Đạt","Cần chú ý","Có vấn đề"][x.muc]}</span></div>
        <div class="khob" title="Trên ${x.denHan.length} việc đến hạn kỳ qua">
          <span style="width:${wD}%" class="d"></span><span style="width:${wT}%" class="t"></span>
          <span style="width:${wM}%" class="m"></span></div>
        <div class="khol"><span><i class="d"></i>Xong đúng hạn ${x.dung.length}</span>
          <span><i class="t"></i>Xong nhưng trễ ${Math.max(0,x.xong.length-x.dung.length)}</span>
          <span><i class="m"></i>Còn trễ ${x.treMo.length}</span></div>
        <div class="khon">
          <span><b>${x.tl!=null?x.tl+"%":"—"}</b>đúng hạn</span>
          <span><b>${x.denHan.length}</b>đến hạn kỳ qua</span>
          <span><b class="${x.tac.length?"r":""}">${x.tac.length}</b>đang tắc</span>
          <span><b class="${x.quaTai.length?"r":""}">${x.quaTai.length}</b>người quá tải</span>
          <span><b>${x.soNguoi}</b>người · ${x.dvs.length} đơn vị</span>
          <span><b class="${x.nay.filter(t=>t.moc).length?"a":""}">${x.nay.length}</b>đến hạn kỳ này</span>
        </div>
        ${x.treMo.length ? `<div class="khoq">Việc trễ lâu nhất <b>${x.treSau} ngày</b>${
          x.moc.length?` · ${x.moc.length} mốc bàn giao đến hạn kỳ này`:""}</div>` : ""}
      </button>`;
    }).join("")}</div>`;
    h += `<div class="khoc2">Bốn khối cộng lại <b>${tongDH}</b> việc đến hạn kỳ qua, đúng bằng
      tổng công ty — một việc chỉ thuộc <b>một</b> khối, gán theo đơn vị của người thực hiện.
      ${ho ? `Riêng <b>${ho.denHan.length}</b> việc thuộc người chưa gắn vào khối nào —
        đó là chỗ cần chốt lại phân công, không phải lỗi số liệu.` : ""}
      Việc mà một thành viên Ban Giám đốc trực tiếp đứng tên nhưng do phòng khối khác làm
      thì vẫn tính cho khối của người làm; xem riêng ở bảng bung dưới mỗi khối.</div>`;
    if (KHOI_MO){
      const kx = [...KS, ...(ho?[ho]:[])].find(x => x.ma === KHOI_MO);
      const kdef = KHOI.find(k => k.ma === KHOI_MO);
      if (kx) h += `<div class="khod"><div class="khodh"><b>${esc(kx.ten)}</b>
          <span>${kdef ? [...kdef.dv.filter(d=>DV[d]).map(d=>esc(DV[d].ten)),
            ...(kdef.nguoi||[]).filter(x=>U[x]).map(x=>esc(U[x].ten)+" (khai riêng)")].join(" · ") : "người chưa gắn khối"}</span>
          <button class="btn sm" onclick="moKhoi('${KHOI_MO}')">Đóng</button></div>
        ${(kdef ? kdef.dv.filter(d=>DV[d]) : []).length ? `<div class="msp"><table><thead><tr>
            <th style="min-width:190px">Đơn vị trong khối</th><th style="min-width:140px">Phụ trách</th>
            <th class="num">Đến hạn</th><th class="num">Xong</th><th style="min-width:104px">Đúng hạn</th>
            <th class="num">Còn trễ</th><th class="num">Đang tắc</th></tr></thead><tbody>
          ${kdef.dv.filter(d=>DV[d]).map(d => { const y = tomTatDV(d, kyTruoc, kyNay);
            return `<tr class="${y.muc===2?"gang2":""}"><td><b>${esc(DV[d].ten)}</b>
              <div style="font-size:11px;color:var(--mute)">${y.soNguoi} người</div></td>
              <td style="font-size:12.5px">${DV[d].truong&&U[DV[d].truong]?esc(U[DV[d].truong].ten):`<i style="color:var(--red)">khuyết</i>`}</td>
              <td class="num">${y.denHan.length}</td><td class="num">${y.xong.length}</td>
              <td>${y.tl!=null?`<b style="color:${y.tl>=90?"#1B5E20":y.tl>=75?"#8A6D3B":"var(--red)"}">${y.tl}%</b>`:"—"}</td>
              <td class="num ${y.treMo.length?"xau":""}">${y.treMo.length}</td>
              <td class="num ${y.tac.length?"xau":""}">${y.tac.length}</td></tr>`;
          }).join("")}</tbody></table></div>` : `<div class="bcgc">Khối này gồm những người chưa gắn đơn vị vào khối nào.</div>`}
        ${(() => { const tt = viecNamTrucTiep(kx.truong, T.filter(trongTamNhin)).filter(viecMo);
          return kx.truong && tt.length ? `<div class="khodt"><b>${esc(U[kx.truong].ten)} đang trực tiếp đứng tên ${tt.length} việc đang mở</b>
            — gồm cả việc của khối khác mà ${esc(U[kx.truong].ten)} giao, duyệt hoặc theo dõi.
            ${tt.filter(quaHan).length?`<span style="color:var(--red)">Trong đó ${tt.filter(quaHan).length} việc đã quá hạn.</span>`:""}
            Số này <b>chồng lấn</b> với các khối khác nên không cộng vào bảng trên.</div>` : ""; })()}
      </div>`;
    }

    /* 3 · BẢNG ĐƠN VỊ — thay cho việc liệt kê từng dòng công việc. */
    const TT = [["Đạt","g"],["Cần chú ý","a"],["Có vấn đề","r"]];
    h += `<h2 class="sh">${_sn++} · Kết quả theo ${CON.nhan} <em>— xếp ${CON.nhan} có vấn đề lên trước · bấm một dòng để xem chi tiết việc</em></h2>`;
    h += dvs.length ? `<div class="msp"><table class="bcdv"><thead><tr>
        <th style="min-width:198px">${CON.cot}</th><th style="min-width:138px">${CON.loai==="ns"?"Chức danh":"Phụ trách"}</th>
        <th class="num">Đến hạn</th><th class="num">Xong</th>
        <th style="min-width:96px">Khối lượng</th>
        <th style="min-width:118px">Đúng hạn</th><th class="num">Còn trễ</th><th class="num">Đang tắc</th>
        <th style="min-width:104px">Kỳ này</th><th style="min-width:132px">Tình trạng</th>
      </tr></thead><tbody>
      ${dvs.map(x => `<tr onclick="bungDV('${x.ma}',event)" style="cursor:pointer" class="${x.muc===2?"gang2":""} ${BC_MO===x.ma?"ckchon":""}">
        <td>${x.laNguoi
          ? `<div style="display:flex;align-items:center;gap:8px">${avHTML(x.uid,26)}<b>${esc(x.ten)}</b></div>`
          : `<b>${esc(x.ten)}</b><div style="font-size:11.5px;color:var(--mute)">${x.soNguoi} người</div>`}</td>
        <td>${x.laNguoi ? `<span style="font-size:12.5px">${esc(x.cd)}</span>`
          : x.truong && U[x.truong] ? `<div style="display:flex;align-items:center;gap:8px">${avHTML(x.truong,24)}
            <span style="font-size:12.5px">${esc(U[x.truong].ten)}${x.khuyet?`<div style="color:var(--amb);font-size:11px">kiêm nhiệm</div>`:""}</span></div>` : "—"}</td>
        <td class="num">${x.denHan.length}</td>
        <td class="num"><b>${x.xong.length}</b></td>
        <td>${(()=>{ const max = Math.max(1, ...dvs.map(z=>z.denHan.length + z.nay.length));
          const a = x.denHan.length, b2 = x.nay.length;
          return `<span class="ssb" title="Kỳ qua ${a} việc · kỳ này ${b2} việc">
            <i class="qua" style="width:${a/max*100}%"></i><i class="nay" style="width:${b2/max*100}%"></i></span>`; })()}</td>
        <td>${x.tl==null ? `<span style="color:var(--mute)">—</span>` :
          `<span style="display:flex;align-items:center;gap:7px"><span class="mini"><i style="width:${x.tl}%;background:${
            x.tl>=90?"#2E7D32":x.tl>=75?"#C79000":"#C62828"}"></i></span><b style="color:${
            x.tl>=90?"#1B5E20":x.tl>=75?"#8A6D3B":"var(--red)"}">${x.tl}%</b></span>`}</td>
        <td class="num" style="${x.treMo.length?"color:var(--red);font-weight:700":"color:var(--mute)"}">${
          x.treMo.length ? `${x.treMo.length}<div style="font-size:11px;font-weight:600">trễ nhất ${x.treSau} ngày</div>` : "0"}</td>
        <td class="num" style="${x.tac.length?"color:var(--amb);font-weight:700":"color:var(--mute)"}">${x.tac.length}</td>
        <td style="font-size:12.5px">${x.nay.length} việc${x.moc.length?`<div style="color:var(--navy2);font-weight:600">${x.moc.length} mốc</div>`:""}${
          x.quaTai.length?`<div style="color:var(--red);font-size:11.5px">${x.quaTai.length} người quá tải</div>`:""}</td>
        <td style="white-space:nowrap"><span class="tag ${TT[x.muc][1]}">${TT[x.muc][0]}</span>
          <span style="color:var(--mute);font-size:14px;margin-left:5px">${BC_MO===x.ma?"⌃":"⌄"}</span></td>
      </tr>`).join("")}
      </tbody></table></div>
      <div class="bcgc"><span class="ssl"><i class="qua"></i>khối lượng kỳ qua</span>
        <span class="ssl"><i class="nay"></i>khối lượng kỳ này</span> ·
        Đạt = không việc trễ, đúng hạn ≥ 85%, không ai quá tải · Cần chú ý = lệch một trong ba ·
        Có vấn đề = từ 3 việc trễ, hoặc đúng hạn dưới 60%, hoặc trễ quá 7 ngày.
        <b>Bấm một dòng để mở bảng tổng hợp chi tiết ngay bên dưới.</b></div>
      ${(()=>{ const o = dvs.find(z => z.ma === BC_MO); return o ? chiTietDV(o, kyTruoc, kyNay) : ""; })()}`
      : `<div class="flag b2"><span class="ic2">✓</span><span class="bd2">Không đơn vị nào có việc đến hạn trong kỳ.</span></div>`;

    /* 3 · CHỈ NHỮNG VIỆC BGĐ MỚI QUYẾT ĐƯỢC. */
    h += `<h2 class="sh">${_sn++} · Việc vượt thẩm quyền ${BC_CAP==="CTY"?"phòng ban":"cấp dưới"} <em>— mỗi dòng phải có một câu trả lời trước khi tan họp</em></h2>`;
    h += bgd.length ? `<div class="msp"><table><thead><tr>
        <th style="width:70px">Mã</th><th style="min-width:150px">Vì sao lên ${CON.capTren}</th>
        <th style="min-width:225px">Công việc</th><th style="min-width:135px">Đơn vị</th>
        <th style="min-width:170px">Vướng gì</th><th style="min-width:235px">${CON.capTren} phải quyết gì</th></tr></thead><tbody>
      ${bgd.slice(0,10).map(x => { const a = bgdQuyet(x.t, x.l);
        return `<tr onclick="openDw('${x.t.id}')" style="cursor:pointer">
          <td class="cot"><b>${x.t.id}</b></td>
          <td><span class="tag ${x.l.indexOf("Trễ")===0||x.l.indexOf("Vượt")===0||x.l.indexOf("Mốc")===0?"r":"a"}">${x.l}</span>${
            x.t.tien?`<div style="font-size:11.5px;color:var(--mute);margin-top:3px">${tienTxt(x.t.tien)}</div>`:""}</td>
          <td><span class="tn2">${esc(x.t.ttl)}</span>
            <div style="font-size:11.5px;color:var(--mute)">${esc(U[x.t.lam]?U[x.t.lam].ten:"—")}</div></td>
          <td style="font-size:12.5px">${tenDVDay(x.t.lam)}</td>
          <td class="wr" style="font-size:12.5px;color:${quaHan(x.t)?"var(--red)":"var(--amb)"}">${esc(vuongMac(x.t)||"—")}</td>
          <td class="wr">${a?`<div style="font-size:12.5px"><b style="color:var(--navy)">${esc(U[a.ai]?U[a.ai].ten:"—")}</b>
              <div style="color:var(--navy2);font-weight:600">→ ${esc(a.lam)}</div>
              <div style="color:var(--mute);font-size:11.5px">${esc(a.khi)}</div></div>`:"—"}</td></tr>`;}).join("")}
      </tbody></table></div>${bgd.length>10?`<div class="bcgc">Còn ${bgd.length-10} việc nữa cùng loại — xử lý theo ${CON.nhan} ở mục 2.</div>`:""}`
      : `<div class="flag b2"><span class="ic2">✓</span><span class="bd2">Không việc nào vượt thẩm quyền cấp dưới. Phần còn lại người phụ trách trực tiếp tự quyết.</span></div>`;

    /* 4 · CAM KẾT KỲ NÀY — theo đơn vị, kèm danh sách MỐC (việc duy nhất BGĐ theo dõi từng cái). */
    h += `<h2 class="sh">${_sn++} · Cam kết ${kyNay.ten.toLowerCase()} <em>— ${kyNay.khoang} · người đứng tên chịu trách nhiệm trước ${CON.capTren} về con số của mình</em></h2>`;
    const camKet = dvs.filter(x => x.nay.length).sort((a,b) => b.nay.length - a.nay.length);
    h += camKet.length ? `<div class="msp"><table><thead><tr>
        <th style="min-width:230px">${CON.cot}</th><th style="min-width:150px">Người cam kết</th>
        <th class="num">Việc đến hạn</th><th class="num">Mốc bàn giao</th><th class="num">Ưu tiên cao</th>
        <th style="min-width:190px">Rủi ro đã thấy trước</th></tr></thead><tbody>
      ${camKet.map(x => `<tr onclick="${x.laNguoi?`setBC('cap','NS');chonNguoi('${x.uid}')`:`xemDV('${x.ma}')`}" style="cursor:pointer">
        <td><b>${esc(x.ten)}</b></td>
        <td>${x.truong&&U[x.truong]?`<div style="display:flex;align-items:center;gap:8px">${avHTML(x.truong,24)}<span style="font-size:12.5px">${esc(x.laNguoi?x.cd:U[x.truong].ten)}</span></div>`:"—"}</td>
        <td class="num"><b>${x.nay.length}</b></td>
        <td class="num" style="${x.moc.length?"color:var(--navy2);font-weight:700":"color:var(--mute)"}">${x.moc.length}</td>
        <td class="num" style="${x.cao.length?"font-weight:700":"color:var(--mute)"}">${x.cao.length}</td>
        <td class="wr" style="font-size:12px">${[
            x.quaTai.length?`<span style="color:var(--red)">${x.quaTai.length} người quá tải</span>`:"",
            x.treMo.length?`<span style="color:var(--red)">${x.treMo.length} việc trễ gánh sang</span>`:"",
            x.tac.length?`<span style="color:var(--amb)">${x.tac.length} việc đang tắc</span>`:""
          ].filter(Boolean).join("<br>") || `<span style="color:var(--mute)">Không</span>`}</td>
      </tr>`).join("")}
      </tbody></table></div>` : `<div class="flag b2"><span class="ic2">✓</span><span class="bd2">Không ${CON.nhan} nào có việc đến hạn ${kyNay.ten.toLowerCase()}.</span></div>`;

    if (mocNay.length) h += `<div class="bcmoc"><div class="bcmt">Mốc bàn giao ${kyNay.ten.toLowerCase()} — ${mocNay.length} mốc theo dõi từng cái</div>
      ${mocNay.slice(0,8).map(t => `<div class="bcmr" onclick="openDw('${t.id}')">
        <span class="bcmd">${t.han}</span>
        <span class="bcmn">${esc(t.ttl.replace(/^MỐC:\s*/,""))}</span>
        <span class="bcmp">${avHTML(t.lam,22)}${esc(U[t.lam]?U[t.lam].ten:"—")}</span>
        <span style="display:flex;align-items:center;gap:7px;min-width:96px"><span class="mini"><i style="width:${tienDo(t)}%"></i></span>${tienDo(t)}%</span>
        ${quaHan(t)?`<span class="tag r">Trễ ${-conLai(t)} ngày</span>`:`<span class="tag ${conLai(t)<=2?"a":"g"}">Còn ${soNgayLe(conLai(t))} ngày</span>`}
      </div>`).join("")}</div>`;
    return h;
  }

  /* ===================================================================
     B. CẤP PHÒNG BAN / NHÂN SỰ — BÁO CÁO TÁC NGHIỆP
     Ở đây liệt kê từng việc mới đúng: người chủ trì cuộc họp phòng cần
     đi qua từng đầu việc một.
     =================================================================== */
  h += `<div class="bcve" onclick="veCTY()">‹ Về báo cáo điều hành toàn công ty</div>`;

  const cau = [];
  cau.push(`${kyTruoc.ten} (${kyTruoc.khoang}) có <b>${denHanTruoc.length} việc</b> đến hạn, đã nghiệm thu xong <b>${xongTruoc.length} việc</b>${
    tlDung!=null?`, trong đó <b>${tlDung}%</b> đúng hạn gốc`:""}.`);
  cau.push(treTruoc.length
    ? `Còn <b style="color:var(--red)">${treTruoc.length} việc trễ</b>${treTruoc.filter(viecMo).length?`, ${treTruoc.filter(viecMo).length} việc đến nay vẫn chưa xong`:", đều đã xong nhưng nộp muộn"}.`
    : `Không việc nào trễ hạn.`);
  cau.push(`${kyNay.ten} (${kyNay.khoang}) có <b>${denHanNay.length} việc</b> đến hạn${
    mocNay.length?`, trong đó <b>${mocNay.length} mốc bàn giao</b>`:""}${
    denHanNay.filter(t=>uuTien(t).muc<=2).length?`, <b>${denHanNay.filter(t=>uuTien(t).muc<=2).length} việc ưu tiên cao</b>`:""}.`);
  if (quaTai.length) cau.push(`<b style="color:var(--red)">${quaTai.length} người quá tải</b>: ${quaTai.map(id=>esc(U[id].ten)).join(", ")}.`);
  if (canQuyet.length) cau.push(`<b>${canQuyet.length} việc cần quyết trong cuộc họp</b> — xem mục 4.`);

  /* Cấp nhân sự dùng ĐÚNG bộ kết luận của cấp công ty, không phải mấy câu đếm việc.
     Câu "việc này xong, việc kia chưa" không nói được người này đang vướng ở đâu và
     ai phải gỡ — mà đó mới là thứ người chủ trì cuộc họp cần. */
  const KL = ketLuanDH(tap, kyTruoc, kyNay, {...S, tinHieu: tinHieuThat});
  h += `<h2 class="sh">1 · Kết luận <em>— ${KL.length ? `${KL.length} phát hiện về ${esc(tenPhamVi())}, xếp nặng trước` : "không có phát hiện nào cần can thiệp"}</em></h2>`;
  h += KL.length ? `<div class="kldh">${KL.map((k,i)=>`<div class="kld ${k.m===2?"do":"vang"}">
      <span class="kldn">${i+1}</span>
      <div class="kldb"><b class="kldt">${k.tieu}</b>
        <div class="kldr"><span>Bằng chứng</span><i>${k.bc}</i></div>
        <div class="kldr"><span>Nếu để nguyên</span><i>${k.hq}</i></div>
        <div class="kldr qd"><span>Phải quyết</span><i>${k.qd}</i></div></div></div>`).join("")}</div>`
    : `<div class="kl g"><span class="ki">✓</span><div><span class="kt">Không có phát hiện nào cần can thiệp</span>
        <div class="ks">${cau.join(" ")}</div></div></div>`;

  h += oKPI([
    ["Đã nghiệm thu", xongTruoc.length, kyTruoc.khoang, "", "PV::xong"],
    ["Đúng hạn", tlDung!=null?tlDung+"%":"—", `${dungHan.length}/${xongTruoc.length} việc, so hạn gốc`,
      tlDung==null?"":tlDung>=90?"#1B5E20":tlDung>=75?"#8A6D3B":"var(--red)", "PV::tl"],
    ["Việc trễ", treTruoc.length, treTruoc.length?"xem mục 2":"không có", treTruoc.length?"var(--red)":"#1B5E20", "PV::tre"],
    ["Việc kỳ này", denHanNay.length, mocNay.length?`gồm ${mocNay.length} mốc`:"đến hạn", "", "PV::nay"],
    ["Việc phát sinh", S.ps.ds.length,
      S.ps.ds.length ? `${S.ps.dotXuat.length} đột xuất · ${S.ps.tuTao.length} tự khai · ${S.ps.chuKy.length} chu kỳ`
                     : "không việc nào được giao mới",
      S.ps.tlDX!=null && S.ps.tlDX >= 30 ? "var(--amb)" : "", S.ps.ds.length?"PV::psinh":""],
  ]);

  const dongViec = t => {
    const vm = vuongMac(t), a = aiLamGi(t), xong = t.tt==="HOAN_THANH";
    const lech = xong ? dCong(ngayXong(t), parse(t.han_goc||t.han)) : null;
    return `<tr onclick="openDw('${t.id}')" style="cursor:pointer" class="${!xong&&quaHan(t)?"gang2":""}">
      <td class="cot"><b>${t.id}</b></td>
      <td class="cot" style="left:74px"><span class="tn2">${esc(t.ttl)}</span></td>
      <td><div style="display:flex;align-items:center;gap:8px">${avHTML(t.lam,24)}${esc(U[t.lam].ten)}</div></td>
      <td>${xong ? `<span class="tag ${lech>=0?"g":"a"}">Xong${lech<0?` · trễ ${-lech} ngày`:lech>0?` · sớm ${lech} ngày`:""}</span>`
        : `<span style="display:flex;align-items:center;gap:7px"><span class="mini"><i style="width:${tienDo(t)}%"></i></span>${tienDo(t)}%</span>
           <div style="font-size:11.5px;color:var(--mute);margin-top:2px">${dlText(t.han,t).t}</div>`}</td>
      <td class="wr" style="font-size:12.5px;color:${vm?(quaHan(t)?"var(--red)":"var(--amb)"):"var(--mute)"}">${vm?esc(vm):"—"}</td>
      <td class="wr">${a ? `<div style="font-size:12.5px"><b style="color:var(--navy)">${esc(U[a.ai]?U[a.ai].ten:"—")}</b>
            <div style="color:var(--navy2);font-weight:600">→ ${esc(a.lam)}</div>
            <div style="color:var(--mute);font-size:11.5px">${esc(a.khi)}</div></div>` : "—"}</td>
    </tr>`;
  };
  const dauBang = `<thead><tr><th style="width:74px">Mã</th><th style="min-width:250px">Công việc</th>
      <th style="min-width:150px">Người thực hiện</th><th style="min-width:135px">Đến đâu rồi</th>
      <th style="min-width:260px">Vướng gì</th><th style="min-width:290px">Ai phải làm gì</th></tr></thead>`;

  h += `<h2 class="sh">2 · Công việc ${dvi} qua <em>— ${kyTruoc.khoang} · đến đâu rồi, vướng gì, ai phải làm gì</em></h2>`;
  h += bangViec.length ? `<div class="msp"><table>${dauBang}<tbody>
      ${bangViec.slice(0,20).map(dongViec).join("")}</tbody></table></div>
    ${bangViec.length>20?`<div class="bcgc">Còn ${bangViec.length-20} việc nữa — xem đủ ở cửa sổ Theo dõi.</div>`:""}`
    : `<div class="flag b2"><span class="ic2">✓</span><span class="bd2">Không việc nào xong hoặc vướng trong ${dvi} qua.</span></div>`;

  h += `<h2 class="sh">3 · Kế hoạch ${dvi} này <em>— ${kyNay.khoang} · việc đến hạn, mốc phải đạt, ai đang gánh bao nhiêu</em></h2>`;
  h += denHanNay.length ? `<div class="msp"><table><thead><tr>
      <th style="width:74px">Mã</th><th style="min-width:280px">Công việc</th>
      <th style="min-width:150px">Người thực hiện</th><th>Hạn</th><th>Ưu tiên</th>
      <th style="min-width:120px">Đến đâu rồi</th><th style="min-width:140px">Tải người đó</th></tr></thead><tbody>
    ${denHanNay.slice(0,18).map(t=>{ const tw = taiTuanNay(t.lam), q = tw > SUC_TUAN;
      return `<tr onclick="openDw('${t.id}')" style="cursor:pointer" class="${t.moc?"sum2":""}">
        <td class="cot"><b>${t.id}</b></td>
        <td class="cot" style="left:74px">${t.moc?`<span class="tag a">MỐC</span> `:""}<span class="tn2">${esc(t.ttl.replace(/^MỐC:\s*/,""))}</span></td>
        <td><div style="display:flex;align-items:center;gap:8px">${avHTML(t.lam,24)}${esc(U[t.lam].ten)}</div></td>
        <td>${t.han}</td><td>${utHTML(t,1)}</td>
        <td><span style="display:flex;align-items:center;gap:7px"><span class="mini"><i style="width:${tienDo(t)}%"></i></span>${tienDo(t)}%</span></td>
        <td class="num" style="${q?"color:var(--red);font-weight:700":""}">${soNgayLe(tw)} / ${SUC_TUAN}${q?" · quá tải":""}</td></tr>`;}).join("")}
    </tbody></table></div>` : `<div class="flag b2"><span class="ic2">✓</span><span class="bd2">Không việc nào đến hạn trong ${dvi} này.</span></div>`;

  h += `<h2 class="sh">4 · Cần quyết ngay trong cuộc họp <em>— mỗi dòng phải có một câu trả lời trước khi tan họp</em></h2>`;
  h += canQuyet.length ? `<div class="msp"><table><thead><tr><th style="width:74px">Mã</th>
      <th style="min-width:150px">Loại</th><th style="min-width:250px">Công việc</th>
      <th style="min-width:250px">Vướng gì</th><th style="min-width:290px">Ai phải làm gì</th></tr></thead><tbody>
    ${canQuyet.slice(0,14).map(x=>{ const a = aiLamGi(x.t);
      return `<tr onclick="openDw('${x.t.id}')" style="cursor:pointer">
        <td class="cot"><b>${x.t.id}</b></td>
        <td><span class="tag ${x.l.indexOf("Trễ")>=0||x.l.indexOf("Vượt")>=0?"r":"a"}">${x.l}</span></td>
        <td class="cot" style="left:74px"><span class="tn2">${esc(x.t.ttl)}</span></td>
        <td class="wr" style="font-size:12.5px;color:var(--mute)">${esc(vuongMac(x.t)||"—")}</td>
        <td class="wr">${a?`<div style="font-size:12.5px"><b style="color:var(--navy)">${esc(U[a.ai]?U[a.ai].ten:"—")}</b>
            <div style="color:var(--navy2);font-weight:600">→ ${esc(a.lam)}</div>
            <div style="color:var(--mute);font-size:11.5px">${esc(a.khi)}</div></div>`:"—"}</td></tr>`;}).join("")}
    </tbody></table></div>`
    : `<div class="flag b2"><span class="ic2">✓</span><span class="bd2">Không có việc nào cần quyết.</span></div>`;
  return h;
}

function vDieuHanh(){
  /* =====================================================================
     ĐIỀU HÀNH giờ chỉ còn MỘT chủ đề: VIỆC NÀO CẦN TÔI ĐỘNG TỚI HÔM NAY.

     Bản trước có năm mục, thực ra là hai màn hình dán vào nhau: ba mục đầu nói về
     VIỆC, hai mục cuối (cân tải, nhịp đội) nói về NGƯỜI — và chính hai mục đó trùng
     với cửa sổ Đánh giá. Đã chuyển sang cửa sổ Cá nhân, nơi mọi thứ về con người
     nằm chung một chỗ và xem được chi tiết từng người.

     Ba mục còn lại xếp theo mức khẩn của HÀNH ĐỘNG, không theo loại dữ liệu:
       1. Tôi là nút thắt      — người khác đang đứng chờ tôi
       2. Hệ thống nhắc hôm nay — chưa vỡ, nhưng sắp
       3. Sẽ vỡ nếu bỏ mặc     — cần tôi quyết, không phải chỉ nhắc
     ===================================================================== */
  const doiGoc = doiCuaToi();
  /* Lọc theo đơn vị: người quản nhiều phòng cần soi từng phòng một, chứ nhìn 42 người
     trộn lẫn thì không ra quyết định được. Chọn một phòng thì gồm cả các tổ trực thuộc. */
  const doi = DH_DV === "TAT_CA" ? doiGoc : doiGoc.filter(id => trongDV(id, DH_DV));
  const lDay = T.filter(t => doi.includes(t.lam) && viecMo(t) && xemDuoc(t));
  const l = lDay.filter(viecTamDH);
  const chan = dangChanBoi().filter(x => (DH_DV === "TAT_CA" || trongDV(x.t.lam, DH_DV)));
  const rui = l.filter(canCanThiep).sort((a,b)=>(uuTien(a).muc-uuTien(b).muc)||(conLai(a)-conLai(b)));
  const nhac = nhacHomNay().filter(x => (DH_DV === "TAT_CA" || trongDV(x.t.lam, DH_DV)) && viecTamDH(x.t));
  const mc = monteCarlo(l.length);
  const quaTai = doi.filter(id => nguoiTamDH(id) && taiTuanNay(id) > SUC_TUAN);

  const canLam = chan.length + nhac.length + rui.length;
  const mau = chan.length ? "r" : canLam ? "a" : "g";
  let h = `<h1 class="h1">Điều hành</h1>${vaiCuaSo("dh")}
    <p class="sub">${U[me].ten} · ${doi.filter(nguoiTamDH).length} người trong tầm · ${l.length} việc đang mở.
    Màn hình này chỉ trả lời một câu: <b>hôm nay tôi phải động tới việc nào</b>.
    Mọi thứ về con người nằm ở cửa sổ <b>Cá nhân</b>.</p>
    ${daiOng(l.length, lDay.length, "việc")}
    ${(()=>{ const dsDV = [...new Set(doiGoc.map(id => U[id] && U[id].dv).filter(Boolean))];
      const cha = new Set(); dsDV.forEach(k => { let x = DV[k] ? DV[k].cha : null, v = 0;
        while (x && v++ < 12){ cha.add(x); x = DV[x] ? DV[x].cha : null; } });
      const chon = [...new Set([...dsDV, ...cha])].filter(k => k !== "HDQT" && k !== "CTY");
      if (chon.length < 2) return "";
      return `<div class="lb" style="margin-bottom:14px">
        <span style="font-size:11.5px;font-weight:700;letter-spacing:.3px;text-transform:uppercase;color:var(--mute)">Đơn vị</span>
        <select class="lsel ${DH_DV!=="TAT_CA"?"on":""}" style="max-width:330px" onchange="DH_DV=this.value;draw()">
          <option value="TAT_CA">Cả nhánh của tôi (${doiGoc.length} người)</option>
          ${(function(){ const ra=[]; (function di(ma, sau){
              if (chon.includes(ma)){ const n = doiGoc.filter(id=>trongDV(id,ma)).length;
                if (n) ra.push(`<option value="${ma}" ${DH_DV===ma?"selected":""}>${"　".repeat(sau)}${sau?"└ ":""}${esc(DV[ma].ten)} (${n} người)</option>`); }
              Object.entries(DV).filter(([k,d])=>d.cha===ma).forEach(([k])=>di(k, chon.includes(ma)?sau+1:sau));
            })("CTY", 0); return ra.join(""); })()}
        </select>
        <div class="lct"><span>Đang xem <b>${doi.length}</b> người · <b>${l.length}</b> việc mở</span>
          ${DH_DV!=="TAT_CA"?`<button onclick="DH_DV='TAT_CA';draw()">Bỏ lọc</button>`:""}</div>
      </div>`; })()}
    <div class="kl ${mau}"><span class="ki">${chan.length?"✕":canLam?"!":"✓"}</span><div>
      <span class="kt">${chan.length ? `${chan.length} phiếu đang đứng chờ chính bạn`
        : canLam ? `${canLam} việc cần bạn nhìn tới hôm nay` : "Không việc nào cần bạn can thiệp hôm nay"}</span>
      <div class="ks">${chan.length?`Bạn đang là nút thắt — gỡ trước rồi hãy làm việc khác. `:""}${
        rui.length?`${rui.length} việc sẽ vỡ nếu bỏ mặc. `:""}${
        quaTai.length?`${quaTai.length} người quá tải tuần này — xem ở cửa sổ Cá nhân.`:""}</div>
    </div></div>`;

  h += oKPI([
    ["Người khác đang đợi tôi", chan.length, chan.length?"tôi đang là nút thắt":"không ai phải đợi tôi",
      chan.length?"var(--red)":"#1B5E20"],
    ["Hệ thống nhắc hôm nay", nhac.length, "chưa vỡ nhưng sắp", nhac.length?"#8A6D3B":""],
    ["Sẽ vỡ nếu bỏ mặc", rui.length, rui.length?"cần bạn quyết, không chỉ nhắc":"không có việc nào",
      rui.length?"var(--red)":"#1B5E20"],
    ["Dự báo hết việc mở", mc?fmtD(themNgayCong(fmtNgay(TODAY), mc.p85)):"—",
      mc?`85% khả năng xong ${l.length} việc trước ngày này`:"chưa đủ dữ liệu", ""],
  ]);

  /* ---------- 1 ---------- */
  h += `<h2 class="sh">1 · Tôi đang là nút thắt <em>— người khác đứng chờ tôi, gỡ trước tiên</em></h2>`;
  if (!chan.length) h += `<div class="flag b2"><span class="ic2">✓</span>
    <span class="bd2">Không phiếu nào nằm chờ bạn.</span></div>`;
  else {
    h += `<div class="msp"><table><thead><tr><th style="width:74px">Mã</th>
      <th style="min-width:280px">Công việc</th><th style="min-width:170px">Người gửi</th>
      <th style="min-width:180px">Chờ gì ở bạn</th><th>Nộp lúc</th><th style="width:120px"></th>
      </tr></thead><tbody>
      ${chan.map(({t,loai})=>{
        const cho = loai==="duyet" ? "Nghiệm thu và chấm điểm"
          : loai==="ykien" ? `Trả lời ý kiến: ${Y_KIEN[t.yKien.loai][0]}` : "Duyệt sửa tiêu chí nghiệm thu";
        return `<tr onclick="openDw('${t.id}')" style="cursor:pointer">
          <td class="cot"><b>${t.id}</b></td>
          <td class="cot" style="left:74px"><span class="tn2">${esc(t.ttl)}</span>${utHTML(t,1)}</td>
          <td><div style="display:flex;align-items:center;gap:8px">${avHTML(t.lam,24)}${esc(U[t.lam].ten)}</div></td>
          <td><span class="tag ${loai==="duyet"?"a":"m"}">${cho}</span></td>
          <td>${t.nop?t.nop.t:(t.yKien?t.yKien.luc:"—")}</td>
          <td><button class="btn sm" onclick="event.stopPropagation();openDw('${t.id}')">Mở để xử lý</button></td>
        </tr>`;}).join("")}
      </tbody></table></div>`;
    const n = nutThat(me);
    if (n && n.soPhieu) h += `<div class="note" style="margin-top:11px">Bạn giữ phiếu trung bình
      <b>${so1(n.gioGiu)} giờ làm việc</b>. Theo định luật Little luôn có khoảng <b>${so1(n.L)} phiếu</b>
      nằm chờ bạn tại mọi thời điểm — đây là thứ báo cáo chỉ soi nhân viên sẽ không bao giờ nhìn ra.</div>`;
  }

  /* ---------- 2 ---------- */
  h += `<h2 class="sh">2 · Hệ thống nhắc hôm nay <em>— chưa vỡ, nhưng sắp</em></h2>`;
  h += nhac.length ? `<div class="msp"><table><thead><tr><th style="width:58px">Mốc</th>
      <th style="min-width:300px">Công việc</th><th style="min-width:170px">Nhắc ai</th>
      <th style="min-width:140px">Vì sao nhắc</th><th>Hạn</th></tr></thead><tbody>
      ${nhac.slice(0,8).map(x=>`<tr onclick="openDw('${x.t.id}')" style="cursor:pointer">
        <td class="cot"><span class="tag ${x.ngay<0?"r":x.ngay<=1?"a":"m"}">${x.moc.ma}</span></td>
        <td class="cot" style="left:58px"><span class="tn2">${esc(x.t.ttl)}</span>${x.t.luat?` <span class="tag law">Hạn pháp lý</span>`:""}</td>
        <td><div style="display:flex;align-items:center;gap:8px">${avHTML(x.ai,24)}${esc(U[x.ai].ten)}</div></td>
        <td style="font-size:12.5px;color:var(--mute)">${esc(x.moc.gt)}</td>
        <td>${x.ngay<0?`<b style="color:var(--red)">quá hạn ${-x.ngay} ngày</b>`:`còn ${x.ngay} ngày`}</td>
      </tr>`).join("")}
      </tbody></table></div>
      ${nhac.length>8?`<div style="font-size:12.5px;color:var(--mute);margin-top:8px">Còn ${nhac.length-8} lượt nhắc nữa.</div>`:""}
      <div class="note" style="margin-top:11px">Ba mốc vì ba mục đích khác nhau, không phải nhắc ba lần cho chắc.
        Mốc cuối <b>leo thang lên người duyệt</b> — đến lúc đó nhắc thêm người làm cũng không giải quyết được gì.
        Việc có <b>hạn pháp lý</b> nhắc sớm hơn vì trễ là bị phạt chứ không phải bị nhắc.</div>`
    : `<div class="flag b2"><span class="ic2">✓</span><span class="bd2">Hôm nay không việc nào chạm mốc nhắc.</span></div>`;

  /* ---------- 3 ---------- */
  h += `<h2 class="sh">3 · Sẽ vỡ nếu bỏ mặc <em>— cần bạn quyết, không phải chỉ nhắc</em></h2>`;
  h += rui.length ? `<div class="msp"><table><thead><tr><th style="width:74px">Mã</th>
      <th style="min-width:270px">Công việc</th><th style="min-width:160px">Người thực hiện</th>
      <th style="width:58px">Ưu tiên</th><th style="min-width:210px">Vướng gì</th>
      <th style="min-width:300px">Ai phải làm gì</th></tr></thead><tbody>
      ${rui.slice(0,10).map(t=>{ const r = ruiRo(t), do2 = r.some(x=>x[0]==="r2");
        return `<tr onclick="openDw('${t.id}')" style="cursor:pointer" class="${do2?"gang2":""}">
          <td class="cot"><b>${t.id}</b></td>
          <td class="cot" style="left:74px"><span class="tn2">${esc(t.ttl)}</span></td>
          <td><div style="display:flex;align-items:center;gap:8px">${avHTML(t.lam,24)}${esc(U[t.lam].ten)}</div></td>
          <td>${utHTML(t,1)}</td>
          <td style="color:${do2?"var(--red)":"var(--amb)"};font-weight:600;font-size:12.5px">${esc(r[0][1])}</td>
          <td style="color:var(--navy2);font-weight:600;font-size:12.5px">→ ${esc(goiYCanThiep(t))}</td>
        </tr>`;}).join("")}
      </tbody></table></div>
      ${rui.length>10?`<div style="font-size:12.5px;color:var(--mute);margin-top:8px">Còn ${rui.length-10} việc nữa — xem đủ ở cửa sổ Theo dõi.</div>`:""}`
    : `<div class="flag b2"><span class="ic2">✓</span><span class="bd2">Không việc nào vượt ngưỡng cảnh báo.</span></div>`;

  return h;
}

function setView(v){ VIEW = v; draw(); }

/* =====================================================================
   BỘ LỌC DÙNG CHUNG CHO MỌI LĂNG KÍNH

   Trước đây mỗi lăng kính tự lọc lấy, và hàng nút "Tất cả · Công việc ·
   Dự án · Chu kỳ · Đột xuất" vừa lọc vừa đổi cột vừa nhảy sang màn khác.
   Một hàng nút làm ba việc khác nhau nên không đọc ra quy luật.
   Nay tách bạch:  ô lọc đổi TẬP VIỆC  ·  lăng kính đổi CÁCH NHÌN.
   Ô lọc áp cho cả sáu lăng kính, số đếm luôn cùng một đơn vị là số việc. */
let F = {ng:"TAT_CA", da:"TAT_CA", vai:"TAT_CA", dv:"TAT_CA"};
/* Đơn vị của một VIỆC = đơn vị của người thực hiện. Chọn một phòng thì lấy cả các tổ
   trực thuộc — người quản lý hỏi "phòng tôi đang có gì", không hỏi "riêng những người
   ngồi thẳng dưới tôi đang có gì". */
function trongDV(uid, ma){
  if (!U[uid]) return false;
  let x = U[uid].dv, v = 0;
  while (x && v++ < 12){ if (x === ma) return true; x = DV[x] ? DV[x].cha : null; }
  return false;
}
function setF(k, v){ F[k] = v; draw(); }
function xoaLoc(){ F = {ng:"TAT_CA", da:"TAT_CA", vai:"TAT_CA", dv:"TAT_CA"}; draw(); }
function coLoc(){ return F.ng !== "TAT_CA" || F.da !== "TAT_CA" || F.vai !== "TAT_CA" || F.dv !== "TAT_CA"; }
function hopLoc(t){
  if (F.ng  !== "TAT_CA" && nguonCua(t) !== F.ng) return false;
  if (F.da === "KHONG"){ if (duAnCua(t)) return false; }
  else if (F.da !== "TAT_CA" && duAnCua(t) !== F.da) return false;
  if (F.vai !== "TAT_CA" && vaiCuaToi(t) !== F.vai) return false;
  if (F.dv  !== "TAT_CA" && !trongDV(t.lam, F.dv)) return false;
  return true;
}
function locViec(){ return T.filter(t => xemDuoc(t) && hopLoc(t)); }

function thanhLoc(){
  const co  = T.filter(xemDuoc);
  const das = dsDuAn();
  const n   = locViec().length;
  const dNg  = k => co.filter(t => nguonCua(t) === k).length;
  const dVai = k => co.filter(t => vaiCuaToi(t) === k).length;

  /* Nguồn gốc là ô lọc dùng thường xuyên nhất và chỉ có bốn lựa chọn loại trừ nhau
     → để dạng nút gạt, thấy hết không cần bấm mở.
     Vật chứa và Vai của tôi dùng thưa hơn và danh sách dài dần → để dạng thả xuống.
     Số đếm đi vào trong từng dòng của danh sách thả, nên không còn bốn con số RACI
     nằm cạnh nhau khiến người xem tưởng chúng phải cộng lại bằng tổng. */
  const nut = (k, nhan, sl) =>
    `<button class="${F.ng===k?"on":""}" onclick="setF('ng','${k}')"
      title="${k==="TAT_CA"?"Không lọc theo nguồn gốc":esc(NGUON_TEN[k])}">${nhan}<i>${sl}</i></button>`;
  /* Vai RACI để dạng NÚT GẠT và đặt đầu tiên, không giấu trong ô thả xuống.
     Đây là ô lọc trả lời câu dùng nhiều nhất — "việc nào tôi phải làm, việc nào tôi
     chỉ duyệt" — nên phải thấy ngay, không phải bấm mở mới biết có. */
  const nutVai = (k, nhan, sl) =>
    `<button class="${F.vai===k?"on":""}" onclick="setF('vai','${k}')"
      title="${k==="TAT_CA"?"Không lọc theo vai":esc(VAI_TEN[k][2])}">${nhan}<i>${sl}</i></button>`;

  return `<div class="lb">
    <span style="font-size:11.5px;font-weight:700;letter-spacing:.3px;text-transform:uppercase;color:var(--mute)">Vai của tôi</span>
    <div class="sg" title="Trách nhiệm của bạn trong việc đó theo RACI">
      ${nutVai("TAT_CA","Tất cả",co.length)}${Object.entries(VAI_TEN).map(([k,x])=>
        nutVai(k, `${x[0]} · ${x[1]}`, dVai(k))).join("")}</div>
    <span class="lsep"></span>
    <div class="sg" title="Việc này từ đâu ra. Mỗi việc đúng một nguồn gốc nên bốn số cộng lại bằng tổng.">
      ${nut("TAT_CA","Tất cả",co.length)}${nut("KE_HOACH","Kế hoạch",dNg("KE_HOACH"))}
      ${nut("CHU_KY","Chu kỳ",dNg("CHU_KY"))}${nut("DOT_XUAT","Đột xuất",dNg("DOT_XUAT"))}
    </div>
    <span class="lsep"></span>
    <select class="lsel ${F.dv!=="TAT_CA"?"on":""}" onchange="setF('dv',this.value)"
      title="Đơn vị của người thực hiện, gồm cả các tổ trực thuộc">
      <option value="TAT_CA" ${F.dv==="TAT_CA"?"selected":""}>Mọi đơn vị</option>
      ${(()=>{ const ra = [];
        (function di(ma, sau){ const n = co.filter(t => trongDV(t.lam, ma)).length;
          if (n) ra.push(`<option value="${ma}" ${F.dv===ma?"selected":""}>${"　".repeat(sau)}${sau?"└ ":""}${esc(DV[ma].ten)} (${n})</option>`);
          Object.entries(DV).filter(([k,d])=>d.cha===ma).forEach(([k])=>di(k, sau+1)); })("CTY", 0);
        return ra.join(""); })()}
    </select>
    <select class="lsel ${F.da!=="TAT_CA"?"on":""}" onchange="setF('da',this.value)"
      title="Việc nằm trong dự án nào">
      <option value="TAT_CA" ${F.da==="TAT_CA"?"selected":""}>Mọi dự án</option>
      <option value="KHONG" ${F.da==="KHONG"?"selected":""}>Không thuộc dự án (${co.filter(t=>!duAnCua(t)).length})</option>
      ${das.map(p=>`<option value="${p.id}" ${F.da===p.id?"selected":""}>${esc(p.ttl)} (${co.filter(t=>duAnCua(t)===p.id).length})</option>`).join("")}
    </select>
    <div class="lct"><span><b>${n}</b> việc đang hiện</span>
      ${coLoc()?`<button onclick="xoaLoc()">Bỏ lọc</button>`:""}</div>
    <div class="lh" style="padding-left:0">${F.vai==="TAT_CA"
      ? `<b>R</b> tôi chịu trách nhiệm về kết quả · <b>A</b> tôi nghiệm thu và chấm điểm ·
         <b>C</b> tôi hỗ trợ, không chấm điểm · <b>I</b> tôi chỉ cần biết.
         Bốn số chỉ đếm việc có tên bạn nên không cộng lại bằng ${co.length}.`
      : `Đang lọc <b>${VAI_TEN[F.vai][1]}</b> — ${VAI_TEN[F.vai][2]}.`}</div>
  </div>`;
}
/* =====================================================================
   BA TRỤC PHÂN LOẠI — thay cho bốn nhóm loại trừ nhau

   Bốn nhóm cũ (Công việc · Dự án · Chu kỳ · Đột xuất) bị dồn vào một
   trường loai duy nhất nên buộc phải loại trừ nhau. Hậu quả: một việc
   đột xuất phát sinh trong dự án phải chọn một nhóm và biến mất khỏi
   nhóm còn lại. Số đếm cũng không cùng đơn vị — "Dự án 6" đếm 1 việc
   gốc cộng 5 việc con, còn "Công việc 2" đếm 2 việc rời.

   Bốn thứ đó thực ra là ba loại khái niệm khác nhau:
     · Dự án   là VẬT CHỨA   — có việc con, điều lệ, ngân sách, mốc, rủi ro
     · Chu kỳ  là BỘ SINH    — một quy tắc đẻ ra nhiều kỳ
     · Đột xuất là THUỘC TÍNH — việc bình thường đến từ ngoài kế hoạch
     · Công việc là ĐƠN VỊ CƠ SỞ
   Quy tắc: vật chứa và bộ sinh được cửa sổ riêng; thuộc tính chỉ được ô lọc.
   ===================================================================== */
const NGUON_TEN = {KE_HOACH:"Theo kế hoạch", CHU_KY:"Chu kỳ sinh ra", DOT_XUAT:"Đột xuất"};
function nguonCua(t){
  const l = t.loai || "CONG_VIEC";
  return l === "DOT_XUAT" ? "DOT_XUAT" : l === "CHU_KY" ? "CHU_KY" : "KE_HOACH";
}
function gocCua(t){ let x = t, g = 0; while (x && x.cha && g++ < 12){ const c = find(x.cha); if (!c) break; x = c; } return x; }
function laDuAn(t){ return !!t && !t.cha && t.loai === "DU_AN"; }
function duAnCua(t){ const g = gocCua(t); return laDuAn(g) ? g.id : null; }
function dsDuAn(){ return T.filter(t => laDuAn(t) && xemDuoc(t)); }
function viecDA(id){ return caCay(id).filter(t => t.id !== id && xemDuoc(t)); }
function laCK(t){ return nguonCua(t) === "CHU_KY"; }

/* =====================================================================
   CỬA SỔ QUẢN TRỊ DỰ ÁN
   Hai tầng: danh mục dự án  →  bấm vào một dự án ra cửa sổ vận hành.
   ===================================================================== */
let DA_MO = null, DA_TAB = "tq";
function moDA(id){ DA_MO = id; DA_TAB = "tq"; window.scrollTo(0,0); draw(); }
function dongDA(){ DA_MO = null; window.scrollTo(0,0); draw(); }
function setDATab(k){ DA_TAB = k; draw(); }

/* Sức khoẻ dự án — so phần trăm việc đã làm với phần trăm thời gian đã tiêu.
   Đây là bản rút gọn của chỉ số SPI trong phương pháp giá trị đạt được.
   Không dùng bản đầy đủ vì công ty chưa chấm công theo giờ nên không có
   chi phí thực tế theo từng việc; thiếu vế đó thì CPI là con số bịa. */
function sucKhoeDA(p){
  const td = tienDo(p);
  const b = parse(p.bd), h = parse(p.han);
  const tong = Math.max(D1, h - b), qua = Math.max(0, Math.min(tong, d2(TODAY) - b));
  const kv = Math.round(qua / tong * 100), lech = td - kv;
  /* Nhãn sức khoẻ lấy theo DỰ BÁO, không theo phép so phần trăm tiến độ với phần trăm
     thời gian. Phép so đó không biết gì về ràng buộc trước sau: dự án quyết toán thuế
     làm được 23% trong khi mới tiêu 3% thời gian nên bị chấm "Đúng nhịp" màu xanh, còn
     dự báo có tính ràng buộc thì ra muộn 25 ngày. Hai tín hiệu chỏi nhau trên một thẻ. */
  const FB = duBao(p.id);
  const dl = FB && FB[p.id] ? dCong(parse(p.han), FB[p.id].ket) : null;
  const m = qua === 0 && dl !== null && dl <= 0 ? ["Chưa bắt đầu","m"]
          : dl === null ? (lech >= -5 ? ["Đúng nhịp","g"] : lech >= -15 ? ["Chậm nhẹ","a"] : ["Chậm nhiều","r"])
          : dl > 7 ? ["Chậm nhiều","r"] : dl > 0 ? ["Chậm nhẹ","a"] : ["Đúng nhịp","g"];
  return {td, kv, lech, duBaoLech:dl, nhan:m[0], mau:m[1]};
}
function tienDAText(n){ return !n ? "—" : n >= 1e9 ? (n/1e9).toFixed(2).replace(/\.?0+$/,"").replace(".",",")+" tỷ"
                                     : Math.round(n/1e6).toLocaleString("vi-VN")+" tr"; }
function tienDu(n){ return !n ? "—" : Number(n).toLocaleString("vi-VN") + " đ"; }
function so1(n){ return (Math.round(Number(n)*10)/10).toFixed(1).replace(".", ","); }
function so2(n){ return (Math.round(Number(n)*100)/100).toFixed(2).replace(".", ","); }
function mocDA(id){ return viecDA(id).filter(t => t.moc).sort((a,b)=>parse(a.han)-parse(b.han)); }
function rrDA(id){ return RUI_RO.filter(r => r.da === id); }
/* ĐƯỜNG GĂNG TRẢ VỀ SỐ NGÀY CÔNG CỦA CHUỖI VIỆC PHỤ THUỘC — KHÔNG PHẢI NGÀY KẾT THÚC.
   Bản trước cộng thẳng số ngày đó vào ngày bắt đầu rồi gọi là "dự kiến kết thúc".
   Sai, vì kế hoạch thật có khoảng chờ cố ý — chờ kiểm toán viên vào, chờ cơ quan thuế
   trả lời — mà phép cộng đó ép về không. Hậu quả nhìn thấy được: một dự án chưa khởi
   động hiện "sớm hơn hạn 43 ngày" màu xanh, còn một dự án khác hiện "vượt hạn 39 ngày"
   chỉ vì hai việc được ghi cùng ngày bắt đầu trong khi một việc khai là phải xong trước.

   Nay tách thành hai câu hỏi khác nhau, vì chúng có hai câu trả lời khác nhau:
     1. Kế hoạch cam kết xong ngày nào  → hạn muộn nhất trong cây, không suy diễn gì thêm
     2. Kế hoạch đó có khả thi không    → so ngày bắt đầu đã ghi với ngày sớm nhất mà
                                          ràng buộc trước sau cho phép. Ghi sớm hơn thì
                                          lịch tự mâu thuẫn, và đó mới là phát hiện đáng giá. */
function lichDA(p){
  const c = cpm(p.id), thu = caCay(p.id);
  const la  = thu.filter(t => !conCua(t.id).length);
  const bd0 = thu.reduce((a,t)=> parse(t.bd) < parse(a) ? t.bd : a, p.bd);
  const ketKH = thu.reduce((a,t)=> parse(t.han) > parse(a) ? t.han : a, p.han);
  const span = ngayCong(bd0, ketKH), gang = c ? c.het : 0;
  const vuong = c ? la.map(t => {
      const r = c.R[t.id]; if (!r) return null;
      const som = themNgayCong(bd0, r.ES);
      return d2(som) > d2(parse(t.bd)) ? {t, som, lech: dCong(parse(t.bd), som)} : null;
    }).filter(Boolean) : [];
  return {ok:!!c, bd0, ketKH, span, gang, cho: Math.max(0, span - gang), vuong};
}


/* =====================================================================
   NGÀY CAM KẾT  ≠  NGÀY DỰ KIẾN

   Cho tới bản này, ngày là DỮ LIỆU NGƯỜI NHẬP chứ không phải kết quả máy tính.
   Nghĩa là mỗi việc mang sẵn một ràng buộc "phải bắt đầu đúng ngày" và "phải
   kết thúc đúng ngày" — đúng thứ mà ghi chú dưới bảng dự án gọi là nguồn gốc
   phổ biến nhất của lịch vỡ. Microsoft Project để ràng buộc đó là tuỳ chọn và
   mặc định tắt; bản trước biến nó thành bắt buộc, áp cho mọi dòng.
   Đo được: 5 trên 5 ràng buộc trước sau KHÔNG tác động tới ngày đã ghi. Khai
   "phải đợi việc kia xong" mà ngày vẫn đứng yên thì cái khai đó chỉ là trang trí.

   Lời giải KHÔNG phải cho ngày tự trôi. Hạn là lời hứa giữa hai người và là
   thước đo chấm điểm; máy tự dời hạn thì tỷ lệ đúng hạn luôn 100% và cả cơ chế
   chấm điểm thành vô nghĩa — đúng lỗ hổng mà cột số lần dời đang canh.

   Tách làm hai:
     · HẠN CAM KẾT (t.han)  — người đặt, chỉ người đổi, mỗi lần đổi vào nhật ký,
                              chấm điểm đúng hạn đo vào đây. Máy không đụng vào.
     · NGÀY DỰ KIẾN         — máy suy từ tiến độ THẬT và ràng buộc trước sau,
                              trôi tự do, không ai bị chấm điểm vào nó.
   Khoảng cách giữa hai con số là cảnh báo sớm: nó lớn dần ngay lúc việc bắt đầu
   trượt, không đợi tới khi quá hạn mới báo.

   Khác với đường găng ở tab Công việc: đường găng tính trên KẾ HOẠCH, dự báo này
   tính trên THỰC TẾ — việc đã xong lấy ngày nộp thật, việc đang làm chỉ còn phần
   chưa xong, việc chưa bắt đầu không thể khởi động trong quá khứ.
   ===================================================================== */
/* Ngày việc thật sự xong. ngayNop() trả về hôm nay khi việc không có phiếu nộp — dùng lúc
   chấm điểm thì được, nhưng đem đi dự báo thì sai: một việc đã duyệt xong từ tháng 11 sẽ hiện
   ngày kết thúc là hôm nay, tức trước cả ngày nó bắt đầu. */
function ngayXong(t){
  if (t.nop && t.nop.t) return ngayNop(t);
  const nam = parse(t.han).getFullYear();
  const m = t.diem && t.diem.boi && String(t.diem.boi).match(/^(\d{2})\/(\d{2})/);
  if (m){
    let d = new Date(nam, Number(m[2])-1, Number(m[1]));
    if (d - parse(t.han) < -180*86400000) d = new Date(nam+1, Number(m[2])-1, Number(m[1]));
    return d;
  }
  return parse(t.han);
}
function ngayLamViec(d){        /* đẩy tới ngày làm việc gần nhất, bỏ qua Chủ nhật và ngày lễ */
  const x = new Date(d); let v = 0;
  while (congCuaNgay(x) === 0 && v++ < 30) x.setDate(x.getDate()+1);
  return x;
}
/* Việc trước, đã nở về việc lá và chỉ giữ những việc nằm trong cây này. */
function truocLa(t, gocId){
  const laId = new Set(caCay(gocId).filter(x => !conCua(x.id).length).map(x => x.id));
  return (t.truoc||[]).flatMap(x => {
    const t2 = find(x); if (!t2) return [];
    return conCua(x).length ? caCay(x).filter(y=>!conCua(y.id).length).map(y=>y.id) : [x];
  }).filter(x => laId.has(x));
}
/* CHUỖI VIỆC QUYẾT ĐỊNH NGÀY VỀ ĐÍCH.
   Đi từ việc lá xong muộn nhất, lần ngược theo việc trước nào thật sự đẩy ngày bắt đầu
   của nó. Đây là câu trả lời cho "vì sao dự án chậm" — khác với danh sách việc quá hạn,
   vốn chỉ liệt kê triệu chứng mà không nói cái nào kéo cái nào. */
function chuoiTre(gocId, F){
  const la = caCay(gocId).filter(t => !conCua(t.id).length && F[t.id]);
  if (!la.length) return [];
  let cur = la.reduce((a,t) => F[t.id].ket > F[a.id].ket ? t : a, la[0]);
  const chain = [cur], seen = new Set([cur.id]);
  let vong = 0;
  while (vong++ < 20){
    const pre = truocLa(cur, gocId).map(find).filter(x => x && F[x.id] && !seen.has(x.id));
    if (!pre.length) break;
    const m = pre.reduce((a,t) => F[t.id].ket > F[a.id].ket ? t : a, pre[0]);
    const sau = new Date(F[m.id].ket); sau.setDate(sau.getDate()+1);
    if (d2(sau) < d2(parse(cur.bd))) break;    /* việc trước xong sớm hơn kế hoạch: không phải nó đẩy */
    chain.unshift(m); seen.add(m.id); cur = m;
  }
  return chain;
}
function duBao(gocId){
  const all = caCay(gocId);
  const la  = all.filter(t => !conCua(t.id).length);
  const noRong = ids => (ids||[]).flatMap(x => {
    const t2 = find(x); if (!t2) return [];
    return conCua(x).length ? caCay(x).filter(y=>!conCua(y.id).length).map(y=>y.id) : [x];
  }).filter(x => la.some(y => y.id === x));

  const F = {}, dang = new Set();
  function tinh(t){
    if (F[t.id]) return F[t.id];
    if (dang.has(t.id)) return null;         /* vòng — cpm đã báo riêng, ở đây bỏ qua */
    dang.add(t.id);
    let som = parse(t.bd);
    noRong(t.truoc).forEach(pid => {
      const pt = find(pid); if (!pt) return;
      const q = tinh(pt);
      if (q && q.ket){ const n = new Date(q.ket); n.setDate(n.getDate()+1); if (n > som) som = n; }
    });
    if (t.tt === "HOAN_THANH"){
      F[t.id] = {bd: parse(t.bd), ket: ngayXong(t), xong:true};
    } else {
      if (som < d2(TODAY)) som = new Date(d2(TODAY));   /* không ai bắt đầu được trong quá khứ */
      som = ngayLamViec(som);
      const tong   = Math.max(0.5, ngayCong(t.bd, t.han));
      const conLai = Math.max(0.5, tong * (1 - tienDoLa(t)/100));
      F[t.id] = {bd: som, ket: themNgayCong(fmtNgay(som), conLai - 1), xong:false};
    }
    dang.delete(t.id);
    return F[t.id];
  }
  la.forEach(tinh);
  all.filter(t => conCua(t.id).length).forEach(t => {
    const con = caCay(t.id).filter(x => x.id !== t.id && !conCua(x.id).length && F[x.id]);
    if (!con.length) return;
    F[t.id] = {bd: new Date(Math.min(...con.map(c=>F[c.id].bd))),
               ket: new Date(Math.max(...con.map(c=>F[c.id].ket))), tong:true};
  });
  return F;
}
/* >0 = dự kiến muộn hơn cam kết, tính bằng ngày lịch cho dễ đọc */
function lechDuBao(t, F){ return (F && F[t.id]) ? dCong(parse(t.han), F[t.id].ket) : null; }
function nhanLech(n){
  if (n === null) return ["—","m"];
  if (n > 7)  return [`muộn ${n} ngày`, "r"];
  if (n > 0)  return [`muộn ${n} ngày`, "a"];
  if (n === 0) return ["đúng hạn", "g"];
  return [`sớm ${-n} ngày`, "g"];
}

/* =====================================================================
   PHÂN HỆ CƠ CẤU TỔ CHỨC

   Đây là DANH MỤC NỀN, không phải màn hình vận hành. Mọi thứ khác trong phần mềm
   đều đọc từ đây: tuyến duyệt suy từ cây đơn vị, cấp bậc suy từ độ sâu, quyền xem
   việc mức Hạn chế suy từ vai trong việc. Sai ở đây thì sai toàn hệ, và đó là lý do
   nó phải có màn hình riêng để nhìn thấy và kiểm được, thay vì nằm im trong mã nguồn.
   ===================================================================== */
function nguoiCuaDV(ma){ return Object.values(U).filter(u => u.dv === ma); }
function dvCon(ma){ return Object.entries(DV).filter(([k,d]) => d.cha === ma).map(([k])=>k); }
function tongNguoi(ma, tham){                 /* gồm cả đơn vị con */
  const q = tham || new Set();
  if (q.has(ma)) return 0; q.add(ma);         /* cây bị sửa thành vòng thì không treo */
  return nguoiCuaDV(ma).length + dvCon(ma).reduce((a,k)=>a+tongNguoi(k, q), 0);
}
/* Đơn vị có tới được gốc không. Sửa cha thành mã không tồn tại thì đơn vị biến mất
   khỏi cây mà không ai báo — với 18 đơn vị sửa tay thì đây là kiểu hỏng dễ gặp nhất. */
function toiGoc(ma){
  let x = ma, n = 0; const q = new Set();
  while (x && n++ < 20){
    if (q.has(x)) return false; q.add(x);
    const d = DV[x]; if (!d) return false;
    if (!d.cha) return true;
    x = d.cha;
  }
  return false;
}
function capDV(ma){ const n = sauDV(ma); return n <= 1 ? "Công ty" : n === 2 ? "Phòng" : "Tổ"; }
/* Sức chứa quản lý: một người trực tiếp duyệt cho bao nhiêu người.
   Ngưỡng 8 lấy từ khảo sát quản trị phổ thông; vượt thì người duyệt thành nút thắt. */
function soNguoiDuyetChoi(uid){
  return Object.keys(U).filter(id => id !== uid && nguoiDuyet({lam:id, giao:null}) === uid).length;
}
function loiToChuc(){
  const r = [];
  Object.entries(DV).forEach(([ma,d]) => {
    if (!d.truong) r.push({m:"r", t:`${d.ten} chưa có trưởng đơn vị`,
      g:`Việc của ${tongNguoi(ma)} người ở đây đẩy lên ${DV[d.cha]?DV[d.cha].ten:"cấp trên"} duyệt`});
    else if (d.khuyet) r.push({m:"a", t:`${d.ten} còn khuyết trưởng đơn vị`,
      g:`${U[d.truong]?U[d.truong].ten:"—"} đang duyệt tạm`});
  });
  Object.keys(U).forEach(id => {
    const n = soNguoiDuyetChoi(id);
    if (n > CH.spanTran) r.push({m:"a", t:`${U[id].ten} đang duyệt cho ${n} người`,
      g:`Vượt ngưỡng ${CH.spanTran} — người duyệt dễ thành nút thắt, phiếu chờ lâu`});
  });
  Object.keys(DV).forEach(ma => {
    if (!toiGoc(ma)) r.push({m:"r", t:`${DV[ma].ten} không nối được về gốc cây`,
      g:`Đơn vị cha "${DV[ma].cha}" không tồn tại hoặc tạo thành vòng — đơn vị này biến mất khỏi cây và tuyến duyệt`});
  });
  const kd = Object.keys(U).filter(id => !nguoiDuyet({lam:id, giao:null}));
  kd.forEach(id => { if (id !== "F001") r.push({m:"r", t:`${U[id].ten} không có người duyệt`, g:"Việc nộp lên sẽ treo"}); });
  return r;
}

/* =====================================================================
   PHÂN QUYỀN — ma trận vai trò × quyền

   Quyền suy từ CẤP trong cây tổ chức, không gán tay cho từng người. Gán tay thì
   mỗi lần có người lên chức lại phải nhớ sửa quyền, và cái quên sửa là lỗ hổng.
   Cấp suy từ độ sâu đơn vị mà người đó làm trưởng — xem capViec().
   ===================================================================== */
const CAP_VAI = {1:"Ban Giám đốc", 2:"Trưởng / Phó phòng", 3:"Tổ trưởng", 4:"Nhân viên"};

/* =====================================================================
   DANH MỤC DÙNG CHUNG

   TRẠNG THÁI TUỲ BIẾN là chỗ dễ hỏng nhất của phần mềm loại này. Mỗi phòng có
   ngôn ngữ riêng: Pháp chế cần "Chờ đối tác phản hồi", Kho cần "Chờ số liệu kế toán",
   Xuất nhập khẩu cần "Chờ hãng tàu". Không cho tự đặt thì họ dùng sai trạng thái hệ
   thống và số liệu hỏng. Cho tự đặt tự do thì mỗi phòng một bảng, không cộng được
   báo cáo toàn công ty.

   Cách giải: trạng thái riêng được đặt thoải mái, nhưng BẮT BUỘC gắn vào đúng một
   trong năm nhóm hệ thống. Báo cáo luôn đọc theo nhóm, người dùng luôn nhìn theo tên
   của phòng mình. Thêm một cột nữa: trạng thái nào DỪNG ĐỒNG HỒ — chờ bên ngoài trả
   lời thì không tính vào thời gian trễ của người làm, nếu không thì chỉ số phạt oan.
   ===================================================================== */
const TT_RIENG = [
  {ma:"PC_DOITAC",  ten:"Chờ đối tác phản hồi",   dv:"PC",   nhom:"DANG_LAM", dung:true,
   gt:"Đã gửi bản thảo hợp đồng, đang đợi phía đối tác"},
  {ma:"PC_TOAAN",   ten:"Chờ cơ quan thụ lý",     dv:"PC",   nhom:"DANG_LAM", dung:true,
   gt:"Hồ sơ đã nộp, thời gian nằm ngoài tầm kiểm soát"},
  {ma:"KHO_SOLIEU", ten:"Chờ số liệu kế toán",    dv:"KHO",  nhom:"DANG_LAM", dung:true,
   gt:"Kiểm kê xong nhưng chưa đối chiếu được vì kế toán chưa khoá sổ"},
  {ma:"KHO_KIEMDEM",ten:"Đang kiểm đếm thực tế",  dv:"KHO",  nhom:"DANG_LAM", dung:false,
   gt:"Người kho đang đếm tại kho Bắc Ninh"},
  {ma:"XNK_HANGTAU",ten:"Chờ hãng tàu xác nhận",  dv:"XNK",  nhom:"DANG_LAM", dung:true,
   gt:"Đã đặt booking, đợi hãng trả lịch"},
  {ma:"XNK_THONGQUAN",ten:"Đang thông quan",      dv:"XNK",  nhom:"DANG_LAM", dung:true,
   gt:"Hồ sơ đã nộp hải quan"},
  {ma:"MKT_DUYETND",ten:"Chờ duyệt nội dung",     dv:"MKT",  nhom:"CHO_DUYET",dung:false,
   gt:"Bài đã viết xong, chờ Brand Manager đọc"},
  {ma:"TCKT_CHOCT", ten:"Chờ chứng từ gốc",       dv:"TCKT", nhom:"DANG_LAM", dung:true,
   gt:"Thiếu hoá đơn bản gốc từ nhà cung cấp"},
];
const NGUON_DX = [
  {ma:"NN",  ten:"Cơ quan nhà nước", gt:"Công văn thuế, hải quan, quản lý thị trường"},
  {ma:"KH",  ten:"Khách hàng",       gt:"Khiếu nại, yêu cầu gấp ngoài hợp đồng"},
  {ma:"NCC", ten:"Nhà cung cấp",     gt:"Giao thiếu, giao sai, đổi giá đột ngột"},
  {ma:"NB",  ten:"Nội bộ",           gt:"Ban Giám đốc giao thêm, phòng khác nhờ"},
  {ma:"SC",  ten:"Sự cố",            gt:"Hỏng hàng, mất mát, hệ thống ngừng chạy"},
];
/* Loại bằng chứng BẮT BUỘC theo nghiệp vụ — khoảng trống B11.
   Khuyến khích thì không ai nộp; bắt buộc thì phải nói rõ bắt buộc cái gì. */
const BANG_CHUNG = [
  {viec:"Kiểm kê kho",              bc:"Biên bản kiểm kê có đủ chữ ký thủ kho và kế toán", bat:true},
  {viec:"Nghiệm thu hàng nhập khẩu",bc:"Biên bản nghiệm thu và ảnh tình trạng hàng",       bat:true},
  {viec:"Thanh toán nhà cung cấp",  bc:"Đề nghị thanh toán có duyệt và uỷ nhiệm chi",      bat:true},
  {viec:"Kê khai thuế",             bc:"Tờ khai đã nộp và chứng từ nộp thuế",              bat:true},
  {viec:"Ký hợp đồng",              bc:"Bản hợp đồng đã ký đủ chữ ký và đóng dấu",         bat:true},
  {viec:"Bài đăng truyền thông",    bc:"Đường dẫn bài đã đăng",                            bat:false},
  {viec:"Tuyển dụng",               bc:"Hồ sơ ứng viên và biên bản phỏng vấn",             bat:false},
];
/* Vị trí việc làm — tách khỏi con người. Một vị trí có thể khuyết, có thể hai người
   cùng giữ, và phải biết ai thay khi người giữ vắng. */
const VI_TRI = [
  {ma:"VT01", ten:"Kế toán trưởng",            dv:"TCKT_KT", cap:3, thay:"F005"},
  {ma:"VT02", ten:"Kế toán thuế",              dv:"TCKT_KT", cap:4, thay:"F036"},
  {ma:"VT03", ten:"Kế toán công nợ phải trả",  dv:"TCKT_KT", cap:4, thay:"F036"},
  {ma:"VT04", ten:"Trưởng kho",                dv:"KHO",     cap:2, thay:"F003"},
  {ma:"VT05", ten:"Thủ kho",                   dv:"KHO",     cap:4, thay:"F008"},
  {ma:"VT06", ten:"Tổ trưởng Tổ xe",           dv:"KHO_XE",  cap:3, thay:"F008"},
  {ma:"VT07", ten:"Trưởng phòng Admin Kinh doanh", dv:"ADKD",cap:2, thay:"F002"},
  {ma:"VT08", ten:"Admin GT",                  dv:"ADKD_GT", cap:4, thay:"F018"},
  {ma:"VT09", ten:"Tổ trưởng Thương hiệu",     dv:"MKT_BRAND",cap:3,thay:"F001"},
  {ma:"VT10", ten:"Tổ trưởng Hub Digital",     dv:"MKT_HUB", cap:3, thay:"F001"},
  {ma:"VT11", ten:"Tổ trưởng Sự kiện",         dv:"MKT_SK",  cap:3, thay:"F001"},
  {ma:"VT12", ten:"Chuyên viên Pháp chế",      dv:"PC",      cap:4, thay:"F003"},
  {ma:"VT13", ten:"Chuyên viên Mua hàng quốc tế", dv:"XNK",  cap:4, thay:"F005"},
  {ma:"VT14", ten:"Admin Online",              dv:"KDOL",    cap:4, thay:"F001"},
  {ma:"VT15", ten:"Chuyên viên Tuyển dụng và Đào tạo", dv:"TH_NS", cap:4, thay:"F003"},
];
const QUYEN = [
  ["xem_viec_minh",   "Xem việc có tên mình",                    [1,2,3,4]],
  ["giao_viec",       "Giao việc cho người khác",                [1,2,3]],
  ["duyet_viec",      "Nghiệm thu và chấm điểm",                 [1,2,3]],
  ["xem_doi",         "Xem việc của cấp dưới",                   [1,2,3]],
  ["xem_toan_cty",    "Xem việc toàn công ty",                   [1]],
  ["bao_cao_ns",      "Xem báo cáo đánh giá nhân sự",            [1,2]],
  ["duyet_tien",      "Duyệt khoản chi vượt ngưỡng",             [1]],
  ["sua_to_chuc",     "Sửa cơ cấu tổ chức và nhân sự",           [1]],
  ["sua_tham_so",     "Sửa tham số hệ thống và lịch làm việc",   [1]],
  ["xem_nhat_ky",     "Xem nhật ký truy cập",                    [1]],
  ["vao_quan_tri",    "Vào cụm Thiết lập hệ thống",               [1,2]],
  ["tu_tao_viec",     "Tự tạo việc cho chính mình",              [1,2,3,4]],
];
/* ---------- PHẠM VI ---------- */
/* Xếp từ hẹp tới rộng. Số thứ tự dùng để so "phạm vi nào rộng hơn" khi một người
   giữ nhiều phân công cùng cấp một quyền. */
const PHAM_VI = {
  MINH:  {r:1, ten:"Chỉ mình",            mo:"Chỉ dữ liệu có tên mình trong phiếu"},
  DV:    {r:2, ten:"Đơn vị của mình",     mo:"Đơn vị đang thuộc, KHÔNG gồm đơn vị con"},
  NHANH: {r:3, ten:"Nhánh phụ trách",     mo:"Đơn vị mình làm trưởng và toàn bộ cấp dưới, nhiều tầng"},
  KHOI:  {r:4, ten:"Khối được giao",      mo:"Các đơn vị trong khối của thành viên Ban Giám đốc"},
  CTY:   {r:5, ten:"Toàn công ty",        mo:"Mọi đơn vị, kể cả nhánh không thuộc mình"},
};
const PV_THU = ["MINH","DV","NHANH","KHOI","CTY"];

/* ---------- VAI TRÒ ---------- */
/* tuDong: vai trò tự gán cho ai mang vị trí này — người quản trị không phải gán tay
   cho 44 người. Vai trò KHÔNG có tuDong là vai trò phụ, chỉ có khi được gán. */
const VAI_TRO = {
  R_NV:   {ten:"Nhân viên", tuDong:"NV", pv:"MINH", nhom:"Vai theo vị trí",
           mo:"Làm việc được giao và tự khai việc của mình",
           q:["xem_viec_minh","tu_tao_viec"]},
  R_TT:   {ten:"Tổ trưởng", tuDong:"TT", pv:"NHANH", nhom:"Vai theo vị trí",
           mo:"Giao và nghiệm thu trong tổ mình phụ trách",
           q:["xem_viec_minh","tu_tao_viec","giao_viec","duyet_viec","xem_doi"]},
  R_PP:   {ten:"Phó phòng", tuDong:"PP", pv:"NHANH", nhom:"Vai theo vị trí",
           mo:"Tầm nhìn như trưởng phòng; chỉ nghiệm thu khi được giao ô trưởng đơn vị",
           q:["xem_viec_minh","tu_tao_viec","giao_viec","xem_doi","bao_cao_ns","vao_quan_tri"]},
  R_TP:   {ten:"Trưởng phòng", tuDong:"TP", pv:"NHANH", nhom:"Vai theo vị trí",
           mo:"Chịu trách nhiệm toàn bộ nhánh phòng mình",
           q:["xem_viec_minh","tu_tao_viec","giao_viec","duyet_viec","xem_doi","bao_cao_ns","vao_quan_tri"]},
  R_BGD:  {ten:"Ban Giám đốc", tuDong:"BGD", pv:"CTY", nhom:"Vai theo vị trí",
           mo:"Điều hành toàn công ty",
           q:["xem_viec_minh","tu_tao_viec","giao_viec","duyet_viec","xem_doi","xem_toan_cty",
              "bao_cao_ns","duyet_tien","sua_to_chuc","sua_tham_so","xem_nhat_ky","vao_quan_tri"]},
  R_HDQT: {ten:"Hội đồng quản trị", tuDong:"HDQT", pv:"CTY", nhom:"Vai theo vị trí",
           mo:"Đọc toàn công ty, KHÔNG trực tiếp điều hành — không giao việc, không nghiệm thu",
           q:["xem_viec_minh","xem_doi","xem_toan_cty","bao_cao_ns","xem_nhat_ky"]},
  /* --- vai trò phụ: gán thêm cho một người cụ thể, không đụng tới chức vụ của họ --- */
  R_KTT:  {ten:"Kế toán trưởng", pv:"CTY", nhom:"Vai nghiệp vụ",
           mo:"Ký duyệt khoản chi vượt ngưỡng mà không cần đưa lên Ban Giám đốc",
           q:["duyet_tien"]},
  R_KS:   {ten:"Kiểm soát", pv:"CTY", nhom:"Vai nghiệp vụ",
           mo:"Đọc toàn công ty để đối chiếu, KHÔNG giao và KHÔNG nghiệm thu",
           q:["xem_toan_cty","xem_nhat_ky"]},
  R_QTHT: {ten:"Quản trị hệ thống", pv:"CTY", nhom:"Vai hệ thống",
           mo:"Sửa cơ cấu, tham số, danh mục — KHÔNG kèm quyền đọc nội dung việc",
           q:["sua_to_chuc","sua_tham_so","xem_nhat_ky","vao_quan_tri"]},
  R_TL:   {ten:"Trợ lý điều hành", pv:"KHOI", nhom:"Vai nghiệp vụ",
           mo:"Thay lãnh đạo theo dõi khối, xem được nhưng không quyết",
           q:["xem_viec_minh","xem_doi","bao_cao_ns"]},
};
/* Phân công gán tay. Mỗi dòng ghi rõ AI GÁN và NGÀY NÀO — thu hồi hay tranh cãi
   về sau đều phải tra được. Ba dòng dưới là dữ liệu mẫu có thật trong công ty. */
let PHAN_CONG = [
  {uid:"F036", vai:"R_KTT",  pv:"CTY",   dv:null,   boi:"F005", ngay:"12/06/2026",
   ly:"Ký duyệt chi dưới 500 triệu thay CFO khi CFO đi công tác"},
  {uid:"F004", vai:"R_KS",   pv:"CTY",   dv:null,   boi:"F003", ngay:"03/03/2026",
   ly:"Kiểm soát tài chính — đối chiếu số liệu toàn công ty"},
  {uid:"F007", vai:"R_TL",   pv:"KHOI",  dv:"K_DH", boi:"F003", ngay:"20/07/2026",
   ly:"Trợ lý Tổng Giám đốc theo dõi Khối Điều hành chung"},
];

/* Toàn bộ phân công của một người = vai tự động theo vị trí + các vai gán tay.
   Vai tự động vẫn hiện thành một dòng trong bảng, có nhãn "tự động" — người quản trị
   phải NHÌN THẤY nó, nếu không họ sẽ tưởng người này chưa có quyền gì. */
function phanCongCua(uid){
  const r = [];
  const vt = U[uid] ? (U[uid].vt || "NV") : "NV";
  const tu = Object.entries(VAI_TRO).find(([k,v]) => v.tuDong === vt);
  if (tu) r.push({uid, vai:tu[0], pv:tu[1].pv, dv:null, tuDong:true,
                  ly:`Tự động theo vị trí ${CHUC_VU[vt] ? CHUC_VU[vt].ten : vt}`});
  PHAN_CONG.filter(x => x.uid === uid).forEach(x => r.push({...x, tuDong:false}));
  return r;
}
/* Quyền thực tế = HỢP của các vai đang giữ. Giữ nguyên chữ ký coQuyen(uid, ma) để
   180 chỗ gọi trong phần mềm không phải sửa — đổi cách tính, không đổi giao diện hàm. */
function coQuyen(uid, ma){
  if (!U[uid]) return false;
  return phanCongCua(uid).some(pc => (VAI_TRO[pc.vai] || {q:[]}).q.includes(ma));
}
/* Phạm vi rộng nhất mà một quyền được cấp — dùng khi cần biết quyền đó chạm tới
   dữ liệu của ai, thay cho lối suy đoán "không làm trưởng thì lấy đơn vị mình". */
function phamViQuyen(uid, ma){
  let best = null;
  phanCongCua(uid).forEach(pc => {
    if (!(VAI_TRO[pc.vai] || {q:[]}).q.includes(ma)) return;
    if (!best || PHAM_VI[pc.pv].r > PHAM_VI[best.pv].r) best = pc;
  });
  return best;
}
/* Vì sao người này làm được việc kia — trả về đúng dòng phân công đã cho phép.
   Không có hàm này thì bảng phân quyền chỉ là trang trí: không ai chứng minh được
   cấu hình đúng trước khi tin nó. */
function nguonQuyen(uid, ma){
  const pc = phamViQuyen(uid, ma);
  if (!pc) return null;
  return {...pc, tenVai:VAI_TRO[pc.vai].ten, tenPV:PHAM_VI[pc.pv].ten};
}
/* Bất biến 3: không ai gán cho người khác quyền mà chính mình không có. Thiếu chốt
   này thì một trưởng phòng có quyền sửa tổ chức sẽ tự nâng mình lên toàn công ty. */
function canGan(nguoiGan, vai){
  const q = (VAI_TRO[vai] || {q:[]}).q;
  const thieu = q.filter(x => !coQuyen(nguoiGan, x));
  return {duoc: !thieu.length, thieu};
}
function ganVai(uid, vai, pv, dv, ly){
  const ok = canGan(me, vai);
  if (!ok.duoc) return toast(`Không gán được: bạn không có ${ok.thieu.length} quyền trong vai này`);
  if (PHAN_CONG.some(x => x.uid === uid && x.vai === vai)) return toast("Người này đã giữ vai đó");
  PHAN_CONG.push({uid, vai, pv, dv:dv||null, boi:me, ngay:fmtDY(TODAY), ly:ly||""});
  ghiNK(U[me].ten, `gán vai “${VAI_TRO[vai].ten}” (${PHAM_VI[pv].ten}) cho ${U[uid].ten}`, NOW);
  toast(`Đã gán ${VAI_TRO[vai].ten} cho ${U[uid].ten}`); draw();
}
function thuVai(uid, vai){
  const i = PHAN_CONG.findIndex(x => x.uid === uid && x.vai === vai);
  if (i < 0) return;
  PHAN_CONG.splice(i, 1);
  ghiNK(U[me].ten, `thu hồi vai “${VAI_TRO[vai].ten}” của ${U[uid].ten}`, NOW);
  toast("Đã thu hồi"); draw();
}
/* Mỗi quyền phải trả lời được ba câu, nếu không thì ma trận dấu tích là vô nghĩa:
     LÀM ĐƯỢC GÌ · TRÊN DỮ LIỆU CỦA AI · Ở MÀN HÌNH NÀO.
   Câu thứ hai là câu hay bị bỏ sót nhất — "xem việc" mà không nói xem việc của ai
   thì không phải một quyền, chỉ là một cái nhãn. */
const QUYEN_MO = {
  xem_viec_minh: ["Mở phiếu việc, cập nhật tiến độ, nộp kết quả, nêu ý kiến",
                  "Việc có tên mình ở bất kỳ vai nào (R, A, C, I)", "Việc của tôi · Theo dõi · Đã xong"],
  giao_viec:     ["Tạo việc mới, giao cho người khác, đặt hạn, đổi hạn, đóng việc",
                  "Người trong nhánh tổ chức mình phụ trách", "Giao việc · Dự án"],
  duyet_viec:    ["Nghiệm thu kết quả, chấm bốn tiêu chí, trả lại việc",
                  "Việc của người mình là trưởng đơn vị trực tiếp", "Việc của tôi · Điều hành"],
  xem_doi:       ["Xem toàn bộ việc, tải và điểm của cấp dưới",
                  "Cả nhánh bên dưới mình, nhiều tầng", "Điều hành · Cá nhân · Giao ban"],
  xem_toan_cty:  ["Xem việc của mọi đơn vị, kể cả nhánh không thuộc mình",
                  "Toàn công ty", "Theo dõi · Giao ban cấp công ty"],
  bao_cao_ns:    ["Xem điểm, xếp hạng, biểu đồ năng lực và lịch sử chấm",
                  "Nhánh mình phụ trách", "Cá nhân"],
  duyet_tien:    ["Ký duyệt khoản chi vượt ngưỡng theo ba bậc giá trị",
                  "Việc có khoản chi, theo bậc mình đứng tên", "Phiếu việc · Giao ban"],
  sua_to_chuc:   ["Thêm/sửa đơn vị, bổ nhiệm trưởng, đổi người giữ vị trí",
                  "Toàn công ty", "Thiết lập › Cơ cấu tổ chức · Vị trí việc làm"],
  sua_tham_so:   ["Đổi ngưỡng cảnh báo, lịch nghỉ lễ, tham số bộ sinh kỳ",
                  "Toàn hệ thống", "Thiết lập › Tham số · Lịch làm việc · Việc lặp"],
  xem_nhat_ky:   ["Xem ai đã mở việc mật, ai đã đổi tham số, đổi lúc nào",
                  "Toàn hệ thống", "Thiết lập › Nhật ký"],
  vao_quan_tri:  ["Vào được cụm Thiết lập (từng tab con còn lọc tiếp theo quyền trên)",
                  "—", "Thanh điều hướng"],
  tu_tao_viec:   ["Tự khai việc mình đang làm, đặt hạn và sản phẩm phải nộp cho chính mình",
                  "Chỉ việc của bản thân — ô người thực hiện khoá, không giao cho ai khác được",
                  "Giao việc › Tự tạo việc"],
};
/* Quyền theo VAI TRONG VIỆC — lớp quyền thứ hai, không suy từ cấp.
   Một chuyên viên cấp 4 mang vai A trong một việc thì vẫn nghiệm thu việc đó. */
const QUYEN_VAI = [
  ["Mở phiếu việc, xem toàn bộ nội dung",        1,1,1,1],
  ["Cập nhật tiến độ, tích tiêu chí nghiệm thu", 1,0,0,0],
  ["Nộp kết quả và đính kèm bằng chứng",         1,0,0,0],
  ["Nêu ý kiến (dừng đồng hồ quá hạn)",          1,0,1,0],
  ["Trả lời ý kiến — giữ hạn, đổi hạn, đổi người", 0,1,0,0],
  ["Nghiệm thu và chấm bốn tiêu chí",            0,1,0,0],
  ["Trả lại việc kèm lý do",                     0,1,0,0],
  ["Đổi hạn cam kết",                            0,1,0,0],
  ["Nhận thông báo mọi thay đổi",                1,1,1,1],
];
const QUYEN_MAT = [
  ["CONG_KHAI", "Mọi người trong công ty đều xem được", "Không ghi nhật ký"],
  ["NOI_BO",    "Người trong việc, cấp trên theo nhánh tổ chức, và người có quyền xem toàn công ty", "Không ghi nhật ký"],
  ["HAN_CHE",   "Chỉ người có tên trong việc: giao, thực hiện, duyệt, duyệt tầng thêm, phối hợp, theo dõi — cộng người chủ trì việc cha", "Ghi nhật ký mỗi lượt mở"],
];
/* Nhật ký hệ thống. Tài liệu yêu cầu MỌI lượt mở việc mức Hạn chế phải vào nhật ký —
   đây là bản chạy thử của yêu cầu đó, cộng các thao tác đổi tham số và đổi tổ chức. */
/* Nhật ký sinh TỪ DỮ LIỆU THẬT, không gõ tay. Bản gõ tay dẫn CV-048 kèm mô tả
   "Đề nghị thanh toán lô hàng Hàn Quốc" trong khi CV-048 là việc khoá sổ — dấu vết
   còn lại của bản 21 việc. Mọi bảng dẫn chiếu mã việc đều phải lấy tên từ chính việc đó. */
const NK = [];
function ghiNK(ai, viec, dt, ip){ NK.unshift({t:NOW, ai, viec, dt, ip:ip||"192.168.1.x"}); }
function moTaViec(id){ const v = find(id); return v ? `${id} · ${v.ttl}` : id; }

/* =====================================================================
   VIỆC ĐÃ NGHIỆM THU CỦA CÁC KỲ TRƯỚC

   Báo cáo giao ban đọc kỳ VỪA QUA, mà dữ liệu gốc chỉ có việc đang mở nên mọi ô số
   của phần A đều bằng 0 — bố cục đúng nhưng không kiểm chứng được gì.
   Sinh ở đây bằng bộ số giả có hạt giống cố định, lấy tỷ lệ đúng hạn từ chính hồ sơ
   _NET của từng người nên nhanh chậm khác nhau đúng như phần Đánh giá.
   Đây là SỐ MÔ PHỎNG, mọi việc đều mang cờ mp:true để phân biệt với dữ liệu thật. */
(function sinhLichSu(){
  const mau = [
    ["Đối chiếu số dư ngân hàng tuần", "F038", 3], ["Lập bảng kê hoá đơn đầu vào", "F037", 3],
    ["Kiểm kê tồn kho định kỳ", "F012", 5], ["Rà soát hàng cận date", "F015", 3],
    ["Lập lịch xe giao hàng tuần", "F010", 3], ["Xử lý đơn hàng kênh GT tuần", "F020", 2],
    ["Chăm sóc nhóm đại lý", "F019", 3], ["Vận hành đơn hàng phiên livestream", "F041", 3],
    ["Báo cáo hiệu quả kênh Online", "F042", 3], ["Triển khai chiến dịch quảng cáo số", "F024", 5],
    ["Sản xuất bộ ảnh cho SKU", "F028", 5], ["Viết nội dung cho nhóm nhãn", "F030", 3],
    ["Rà soát hợp đồng nhà cung cấp", "F034", 5], ["Theo dõi lô hàng nhập khẩu", "F043", 5],
    ["Khảo sát báo giá nhà cung cấp", "F045", 3], ["Xử lý claim hàng lỗi", "F044", 5],
    ["Đối soát công nợ phải trả", "F038", 3], ["Khoá sổ báo cáo nội bộ", "F036", 5],
    ["Tuyển dụng vị trí kho", "F040", 3], ["Đối chiếu công nợ đại lý", "F021", 2],
    ["Dựng video giới thiệu sản phẩm", "F025", 3], ["Vận hành sàn thương mại điện tử", "F033", 3],
    ["Chuẩn bị hồ sơ pháp lý", "F035", 3], ["Điều phối xe giao hàng cao điểm", "F014", 2],
    ["Kiểm đếm hàng nhập kho", "F016", 2], ["Lập kế hoạch sự kiện nhỏ", "F032", 3],
  ];
  let n = 0;
  for (let tuan = 9; tuan >= 1; tuan--){
    /* mỗi tuần lấy 4–6 mẫu, xoay vòng để trải đều các phòng */
    const soViec = 4 + Math.floor(rnd()*3);
    for (let i = 0; i < soViec; i++){
      const m = mau[(n + i*7) % mau.length];
      const lam = m[1]; const hs = _NET[lam]; if (!hs) continue;
      const han = new Date(TODAY); han.setDate(han.getDate() - tuan*7 + Math.floor(rnd()*5));
      if (han.getDay() === 0) han.setDate(han.getDate()-1);
      const bd  = new Date(han); bd.setDate(bd.getDate() - (3 + Math.floor(rnd()*6)));
      const dungHan = rnd() < hs.dung;
      const xong = new Date(han);
      xong.setDate(xong.getDate() + (dungHan ? -Math.floor(rnd()*3) : 1 + Math.floor(rnd()*5)));
      const doi = (!dungHan && rnd() < 0.35) ? 1 + Math.floor(rnd()*2) : 0;
      const cl = Math.max(1, Math.min(5, Math.round(gauss(hs.cl, 0.7))));
      const dh = dungHan ? (rnd() < 0.5 ? 5 : 4) : (rnd() < 0.6 ? 3 : 1);
      const cd = Math.max(1, Math.min(5, Math.round(gauss(hs.cd, 0.8))));
      const ht = Math.max(1, Math.min(5, Math.round(gauss(hs.ht, 0.7))));
      const duyet = nguoiDuyet({lam, giao:null}) || "F003";
      const id = "CV-" + (200 + n);
      T.push({
        id, ttl: `${m[0]} — kỳ ${khoaNgay(han).slice(0,5)}`, tt:"HOAN_THANH", cha:null, mp:true,
        loai:"CONG_VIEC", giao:duyet, lam, bd:khoaNgay(bd), han:khoaNgay(han),
        han_goc: doi ? khoaNgay(new Date(han.getTime() - doi*86400000*3)) : khoaNgay(han),
        doi, dk:m[2], ah:3, kc:3, mat:"NOI_BO", phoihop:[], theodoi:[], truoc:[],
        tien:0, tienLoai:"CHI", sk:"BT", bc:false, files:[], chuoi:null, ci:0,
        sp:"Đã nghiệm thu", tc:[{t:"Hoàn thành theo yêu cầu", d:true}],
        nop:{t: `${khoaNgay(xong).slice(0,5)} 16:00`, x:"Đã nộp."},
        diem:{cl, dh, cd, ht, tong: cl*0.45 + dh*0.30 + cd*0.15 + ht*0.10,
              ai: U[duyet] ? U[duyet].ten : "—", luc: `${khoaNgay(xong).slice(0,5)} 17:00`},
        log:[{w:U[duyet]?U[duyet].ten:"—", k:"nghiệm thu và chấm điểm", t:`${khoaNgay(xong).slice(0,5)} 17:00`, s:1}],
      });
      n++;
    }
  }
})();

/* Nhật ký mẫu — mô tả việc lấy thẳng từ T nên không bao giờ lệch với dữ liệu. */
[["04/09 09:12","F004","Mở việc mức Hạn chế","CV-080","192.168.1.42"],
 ["04/09 08:47","F005","Duyệt khoản chi vượt ngưỡng","CV-050","192.168.1.11"],
 ["03/09 16:02","F036","Mở việc mức Hạn chế","CV-048","192.168.1.23"],
 ["01/09 09:00","F005","Mở việc mức Hạn chế","CV-118","192.168.1.11"],
].forEach(([t,ai,viec,id,ip]) => {
  const v = T.find(x => x.id === id); if (!v) return;
  NK.push({t, ai, viec, dt: `${id} · ${v.ttl}${viec.indexOf("chi")>=0 && v.tien ? ` · ${tienDAText(v.tien)}` : ""}`, ip});
});
NK.push({t:"03/09 17:30", ai:"F003", viec:"Đổi tham số hệ thống", dt:"Sức tuần 7 → 8 điểm", ip:"192.168.1.5"});
NK.push({t:"03/09 11:15", ai:"F003", viec:"Sửa cơ cấu tổ chức", dt:"Tổ Hub Digital: nâng từ Nhóm lên Tổ", ip:"192.168.1.5"});
NK.push({t:"02/09 14:20", ai:"F001", viec:"Đổi người duyệt", dt:"Tổ Xuất nhập khẩu: giao CFO duyệt tạm", ip:"192.168.1.2"});
NK.sort((a,b) => a.t < b.t ? 1 : -1);


let TC_MO = new Set(["HDQT","CTY"]), TC_CHON = null;
function togTC(ma){ TC_MO.has(ma) ? TC_MO.delete(ma) : TC_MO.add(ma); draw(); }
function chonTC(ma){ TC_CHON = TC_CHON === ma ? null : ma; draw(); }

const QT_TABS = [
  ["tc",  "Cơ cấu tổ chức", "Cây đơn vị, nhân sự, tuyến duyệt và các chỗ khuyết"],
  ["lich","Lịch làm việc",  "Ngày nghỉ lễ và quy ước ngày công — mọi phép tính đúng hạn dựa vào đây"],
  ["ts",  "Tham số",        "Các ngưỡng đang chi phối cảnh báo và chấm điểm"],
  ["pq",  "Phân quyền",     "Gán vai trò kèm phạm vi cho từng người, sửa thư viện vai, và thử trước khi tin"],
  ["ck",  "Việc lặp",       "Tham số bộ sinh kỳ và toàn bộ quy tắc lặp — sửa được, mọi lần sửa vào nhật ký"],
  ["dm",  "Danh mục",       "Trạng thái riêng của từng phòng, nguồn phát sinh, bằng chứng bắt buộc"],
  ["vt",  "Vị trí việc làm","Vị trí tách khỏi con người — ai đang giữ, ai thay khi vắng"],
  ["em",  "Báo cáo tự gửi", "Lịch gửi email hằng tuần và bộ báo cáo của từng người nhận"],
  ["ai",  "Trợ lý AI",      "Ba hạng sử dụng, phân hạng từng người, chọn mô hình, phạm vi dữ liệu gửi đi và hạn mức chi phí"],
  ["dn",  "Dữ liệu ngoài",  "Diễn biến chính sách, thị trường, ngành — và các mốc đối chiếu số của công ty"],
  ["nk",  "Nhật ký",        "Ai đã mở việc mật, ai đã đổi tham số và tổ chức"],
];
let QT_TAB = "tc";
function setQT(k){ QT_TAB = k; draw(); }
/* =========================================================================
   BÁO CÁO TỰ GỬI QUA EMAIL — 17:00 CHỦ NHẬT HẰNG TUẦN

   Nguyên tắc: DANH SÁCH NGƯỜI NHẬN VÀ BỘ BÁO CÁO CỦA TỪNG NGƯỜI KHÔNG GÕ TAY,
   mà suy từ cây tổ chức và ba lớp quyền — đúng thứ đang chạy trên màn hình. Gõ tay
   thì mỗi lần bổ nhiệm hay chuyển phòng lại phải nhớ sửa danh sách, và cái quên sửa
   chính là chỗ người ta không nhận được báo cáo mà không ai biết.

   Bộ báo cáo theo cấp:
     · Ban Giám đốc  — toàn công ty · tổng hợp giao ban · cá nhân
     · Trưởng phòng  — cấp phòng của mình · từng nhân sự thuộc phòng · cá nhân
     · Tổ trưởng     — cấp tổ của mình · từng nhân sự thuộc tổ · cá nhân
     · Nhân sự       — cá nhân · bản tóm tắt của phòng mình
   ========================================================================= */
const EM_THU = ["Chủ nhật","Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy"];
const EM_LOAI = {
  CTY: ["Báo cáo điều hành tuần — toàn công ty", "Một tệp đủ để chủ trì giao ban"],
  DV:  ["Báo cáo tuần — đơn vị của bạn",         "Một tệp, kèm phụ lục từng nhân sự"],
  TO:  ["Báo cáo tuần — tổ của bạn",             "Một tệp, kèm phụ lục từng nhân sự"],
  CN:  ["Báo cáo tuần — việc của bạn",           "Việc của chính mình và tóm tắt phòng"],
};
/* Các phần bên trong một tệp — đây mới là chỗ chứa thông tin về từng người,
   thay cho việc đính kèm mỗi người một tệp. */
const EM_PHAN = {
  CTY: ["Kết quả từng đơn vị", "Việc vượt thẩm quyền phòng ban, kèm người phải quyết",
        "Cam kết kỳ tới theo đơn vị", "Phụ lục: người cần chú ý toàn công ty"],
  DV:  ["Kết quả của đơn vị", "Việc phải quyết trong tuần",
        "Phụ lục: từng nhân sự trong đơn vị, mỗi người một dòng"],
  TO:  ["Kết quả của tổ", "Việc phải quyết trong tuần",
        "Phụ lục: từng nhân sự trong tổ, mỗi người một dòng"],
  CN:  ["Việc của bạn kỳ qua và kỳ tới", "Việc đang vướng và ai phải gỡ", "Tóm tắt đơn vị bạn đang thuộc"],
};
/* Ai nhận gì — suy hoàn toàn từ cây tổ chức, không có bảng gõ tay nào. */
function nguoiNhanBC(){
  return Object.values(U).map(u => {
    const cap = capViec(u.id);
    const giu = Object.entries(DV).filter(([k,d]) => d.truong === u.id).map(([k]) => k);
    const cu = me; let duoi = [];
    try { me = u.id; duoi = doiCuaToi(); } finally { me = cu; }
    /* Đúng MỘT tệp cho mỗi người, chọn theo cấp cao nhất mà người đó chịu trách nhiệm. */
    const ma = coQuyen(u.id, "xem_toan_cty") ? "CTY"
             : giu.length ? (giu.some(k => DV[k].cha === "CTY") ? "DV" : "TO")
             : "CN";
    return {u, cap, giu, duoi, bo:[ma], ma, phan: EM_PHAN[ma],
            email: `${boDau(u.ten).replace(/\s+/g,".")}@forever.com.vn`,
            soBan: 1};
  }).sort((a,b) => a.cap - b.cap || a.u.ten.localeCompare(b.u.ten, "vi"));
}
/* Lần gửi kế tiếp theo lịch đang đặt. */
function lanGuiSau(){
  const d = new Date(TODAY);
  const [gio, phut] = String(CH.emGio).split(":").map(Number);
  d.setHours(gio, phut, 0, 0);
  let b = 0;
  while ((d.getDay() !== CH.emThu || d <= TODAY) && b++ < 14) d.setDate(d.getDate() + 1);
  return d;
}
let EM_XEM = null;
function xemMail(id){ EM_XEM = EM_XEM === id ? null : id; draw(); }
function guiThu(){
  const ds = nguoiNhanBC();
  const tong = ds.reduce((a,x) => a + x.soBan, 0);
  ghiNK(me, "Gửi thử báo cáo email", `${ds.length} người nhận · ${tong} bản báo cáo · kỳ ${BC_KY[CH.emKy].toLowerCase()}`);
  toast(`Đã mô phỏng gửi ${tong} bản báo cáo tới ${ds.length} người · đã ghi nhật ký`);
  draw();
}
function datEM(k, v){
  const cu = CH[k];
  CH[k] = k === "emThu" ? +v : (k === "emBat" ? !cu : v);
  const ten = {emThu:"Ngày gửi", emGio:"Giờ gửi", emKy:"Kỳ báo cáo", emBat:"Tự gửi"}[k] || k;
  const doc = x => k === "emThu" ? EM_THU[x] : k === "emBat" ? (x ? "bật" : "tắt") : k === "emKy" ? BC_KY[x] : x;
  ghiNK(me, "Sửa lịch gửi báo cáo", `${ten}: ${doc(cu)} → ${doc(CH[k])}`);
  toast(`${ten}: ${doc(cu)} → ${doc(CH[k])} · đã ghi nhật ký`);
  draw();
}

function vEmail(){
  const sua = coQuyen(me, "sua_to_chuc");
  const ds = nguoiNhanBC();
  const tong = ds.reduce((a, x) => a + x.soBan, 0);
  const sau = lanGuiSau();
  const nhom = [[1,"Ban Giám đốc"],[2,"Trưởng phòng"],[3,"Tổ trưởng"],[4,"Nhân sự"]];

  let h = oKPI([
    ["Người nhận", ds.length, "suy từ cây tổ chức, không gõ tay", ""],
    ["Tệp PDF mỗi lần gửi", tong, "đúng một tệp cho mỗi người", ""],
    ["Lần gửi kế tiếp", `${EM_THU[CH.emThu]} ${CH.emGio}`, fmtDY(sau), CH.emBat?"":"var(--mute)"],
    ["Trạng thái", CH.emBat ? "Đang bật" : "Đang tắt", CH.emBat?`kỳ ${BC_KY[CH.emKy].toLowerCase()}`:"không tự gửi", CH.emBat?"#1B5E20":"var(--amb)"],
  ]);

  h += `<div class="gvc"><h3 class="gvh">Lịch gửi <em>— áp cho toàn bộ danh sách người nhận</em></h3>
    <div class="msp"><table><thead><tr><th style="min-width:170px">Tham số</th>
      <th style="min-width:210px">Giá trị</th><th class="wr" style="min-width:360px">Ghi chú</th></tr></thead><tbody>
    <tr><td class="cot"><b>Tự gửi</b></td>
      <td>${sua?`<button class="btn ${CH.emBat?"p":""}" onclick="datEM('emBat')">${CH.emBat?"Đang bật":"Đang tắt"}</button>`
        :`<b style="color:var(--navy)">${CH.emBat?"Bật":"Tắt"}</b>`}</td>
      <td class="wr" style="font-size:12.5px;color:var(--mute)">Tắt thì không ai nhận email; báo cáo trên màn hình vẫn chạy bình thường.</td></tr>
    <tr><td class="cot"><b>Ngày trong tuần</b></td>
      <td>${sua?`<select class="lsel" style="max-width:170px" onchange="datEM('emThu',this.value)">
          ${EM_THU.map((t,i)=>`<option value="${i}" ${CH.emThu===i?"selected":""}>${t}</option>`).join("")}</select>`
        :`<b style="color:var(--navy)">${EM_THU[CH.emThu]}</b>`}</td>
      <td class="wr" style="font-size:12.5px;color:var(--mute)">Gửi chiều Chủ nhật để sáng thứ Hai vào họp là mọi người đã đọc xong.</td></tr>
    <tr><td class="cot"><b>Giờ gửi</b></td>
      <td>${sua?`<select class="lsel" style="max-width:130px" onchange="datEM('emGio',this.value)">
          ${["07:00","08:00","12:00","15:00","16:00","17:00","18:00","20:00"].map(g=>`<option value="${g}" ${CH.emGio===g?"selected":""}>${g}</option>`).join("")}</select>`
        :`<b style="color:var(--navy)">${CH.emGio}</b>`}</td>
      <td class="wr" style="font-size:12.5px;color:var(--mute)">Giờ máy chủ. Báo cáo chốt số liệu đúng thời điểm gửi.</td></tr>
    <tr><td class="cot"><b>Kỳ báo cáo</b></td>
      <td>${sua?`<select class="lsel" style="max-width:150px" onchange="datEM('emKy',this.value)">
          ${Object.entries(BC_KY).map(([k,v])=>`<option value="${k}" ${CH.emKy===k?"selected":""}>${v}</option>`).join("")}</select>`
        :`<b style="color:var(--navy)">${BC_KY[CH.emKy]}</b>`}</td>
      <td class="wr" style="font-size:12.5px;color:var(--mute)">Nội dung email lấy đúng bản báo cáo của kỳ này trên màn Giao ban — không có bản thứ hai để lệch nhau.</td></tr>
    </tbody></table></div>
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:13px">
      ${sua?`<button class="btn p" onclick="guiThu()">Gửi thử ngay</button>`:""}
      <span style="font-size:12.5px;color:var(--mute)">Lần gửi kế tiếp: <b>${EM_THU[CH.emThu]} ${fmtDY(sau)} lúc ${CH.emGio}</b>
        · ${tong} bản tới ${ds.length} người.</span></div></div>`;

  h += `<h2 class="sh">Ai nhận báo cáo gì <em>— suy từ cây tổ chức và ba lớp quyền · bổ nhiệm hay chuyển phòng là danh sách tự đúng theo</em></h2>`;
  h += `<div class="msp"><table><thead><tr>
      <th style="min-width:190px">Người nhận</th><th style="min-width:150px">Email</th>
      <th style="min-width:118px">Cấp</th><th class="num">Số bản</th>
      <th class="wr" style="min-width:400px">Tệp nhận được và các phần bên trong</th><th style="min-width:96px"></th>
    </tr></thead><tbody>
    ${nhom.map(([c,ten]) => { const g = ds.filter(x => x.cap === c); if (!g.length) return "";
      return `<tr class="mocth"><td colspan="6">${ten} — ${g.length} người · ${g.reduce((a,x)=>a+x.soBan,0)} bản</td></tr>` +
      g.map(x => `<tr>
        <td class="cot"><div style="display:flex;align-items:center;gap:8px">${avHTML(x.u.id,24)}
          <span><b>${esc(x.u.ten)}</b><div style="font-size:11px;color:var(--mute)">${esc(x.u.cd)}</div></span></div></td>
        <td style="font-size:12px;color:var(--mute)">${esc(x.email)}</td>
        <td><span class="tag m">${CAP_VAI[x.cap]}</span></td>
        <td class="num"><b>${x.soBan}</b></td>
        <td class="wr"><span class="embc" title="${esc(EM_LOAI[x.ma][1])}">${EM_LOAI[x.ma][0]}</span>
          <div style="font-size:11px;color:var(--mute);margin-top:4px;line-height:1.5">Trong tệp: ${x.phan.join(" · ")}</div></td>
        <td><button class="btn sm" onclick="xemMail('${x.u.id}')">${EM_XEM===x.u.id?"Đóng":"Xem thư"}</button></td>
      </tr>` + (EM_XEM === x.u.id ? `<tr class="bcbung2"><td colspan="6">${thuMau(x)}</td></tr>` : "")).join("");
    }).join("")}
    </tbody></table></div>`;

  const nkEM = NK.filter(x => x.viec && (x.viec.indexOf("báo cáo email") >= 0 || x.viec.indexOf("lịch gửi") >= 0));
  h += `<div class="gvc" style="margin-top:15px"><h3 class="gvh">Nhật ký gửi và đổi lịch <em>— ${nkEM.length} lượt</em></h3>
    ${nkEM.length ? `<div class="msp"><table><thead><tr><th style="min-width:140px">Lúc</th>
        <th style="min-width:170px">Người thao tác</th><th style="min-width:200px">Loại</th>
        <th class="wr" style="min-width:340px">Nội dung</th></tr></thead><tbody>
      ${nkEM.slice(0,12).map(x=>`<tr><td>${x.t}</td><td>${esc(U[x.ai]?U[x.ai].ten:x.ai)}</td>
        <td>${esc(x.viec)}</td><td class="wr" style="font-size:12.5px">${esc(x.dt)}</td></tr>`).join("")}
      </tbody></table></div>`
      : `<div class="flag b2"><span class="ic2">✓</span><span class="bd2">Chưa có lượt gửi nào trong phiên này. Bấm <b>Gửi thử ngay</b> rồi quay lại xem.</span></div>`}</div>`;

  h += `<div class="vd" style="margin-top:15px"><b>Bản chạy thử mô phỏng việc gửi, không gửi thư thật.</b>
    Danh sách người nhận, bộ báo cáo của từng người và nội dung thư đều đã tính đúng ở đây — đó là phần
    khó và phần dễ sai. Bản lập trình thật chỉ cần thêm một tiến trình nền chạy theo lịch cộng một dịch vụ
    gửi thư, và phải có sổ theo dõi thư gửi lỗi: thư không tới mà không ai biết còn tệ hơn không gửi.</div>`;
  return h;
}

/* =========================================================================
   THƯ GỬI GIÁM ĐỐC PHẢI NHÌN LÀ HIỂU, KHÔNG PHẢI ĐỌC TỪNG GẠCH ĐẦU DÒNG

   Bản trước là một trang văn bản: bốn gạch đầu dòng số liệu, bốn gạch đầu dòng
   phát hiện. Đúng nội dung nhưng sai hình thức — người nhận phải đọc hết mới biết
   tình hình. Nay thư dựng như chính màn hình báo cáo: ô số lớn, thanh sức khoẻ đọc
   trong một giây, thẻ phát hiện có màu theo mức nặng, và một bảng gọn ở cuối.
   Kèm bản in A4 để đính vào thư dưới dạng PDF.
   ========================================================================= */

/* Gom toàn bộ số liệu của một người nhận về một chỗ — thư và bản in dùng chung,
   không dựng hai lần để hai bản lệch nhau. */
function soLieuThu(x){
  const cuMe = me, cuCap = BC_CAP, cuDv = BC_DV, cuKy = BC_LOAI, cuLech = BC_LECH;
  let R = null;
  try {
    me = x.u.id; BC_LOAI = CH.emKy; BC_LECH = 0;
    BC_CAP = x.ma === "CTY" ? "CTY" : (x.ma === "DV" || x.ma === "TO") ? "DV" : "NS";
    if (BC_CAP === "DV") BC_DV = x.giu[0] || (U[x.u.id] ? U[x.u.id].dv : null);
    if (BC_CAP === "NS") BC_DV = x.u.id;
    chuanBC();
    const kyT = khoangKy(BC_LOAI, -1), kyN = khoangKy(BC_LOAI, 0), tap = phamViBC();
    const S = soLieuKy(tap, kyT, kyN);
    const KL = ketLuanDH(tap, kyT, kyN, {...S, tinHieu: []});
    let con = [];
    if (BC_CAP !== "NS"){
      con = dsConBC(kyT, kyN).ds
        .filter(o => o.denHan.length || o.nay.length || o.tac.length)
        .sort((a,b) => (b.muc - a.muc) || (b.treMo.length - a.treMo.length));
    }
    R = {kyT, kyN, S, KL, con, soViec: tap.length, cap: BC_CAP,
         pham: tenPhamVi(), conNhan: BC_CAP === "CTY" ? "đơn vị" : "bộ phận / nhân sự"};
  } finally { me = cuMe; BC_CAP = cuCap; BC_DV = cuDv; BC_LOAI = cuKy; BC_LECH = cuLech; }
  return R;
}
/* Thanh sức khoẻ dùng chung cho thư và bản in — ba đoạn, đọc trong một giây. */
function thanhThu(S){
  const dung = S.dungHan.length, muon = S.xongTruoc.length - S.dungHan.length,
        tre = S.treTruoc.filter(viecMo).length, tong = dung + muon + tre;
  if (!tong) return `<div class="ethanh trong">Kỳ qua không có việc nào đến hạn hoặc nghiệm thu.</div>`;
  const pc = n => Math.round(n / tong * 100);
  return `<div class="ethanh">
    <div class="etb">
      ${dung?`<i style="width:${pc(dung)}%;background:#2E7D32">${pc(dung)>12?dung:""}</i>`:""}
      ${muon?`<i style="width:${pc(muon)}%;background:#C79000">${pc(muon)>12?muon:""}</i>`:""}
      ${tre?`<i style="width:${pc(tre)}%;background:#C62828">${pc(tre)>12?tre:""}</i>`:""}
    </div>
    <div class="etc">
      ${dung?`<span><u style="background:#2E7D32"></u>Xong đúng hạn <b>${dung}</b></span>`:""}
      ${muon?`<span><u style="background:#C79000"></u>Xong nhưng muộn <b>${muon}</b></span>`:""}
      ${tre?`<span><u style="background:#C62828"></u>Còn trễ chưa xong <b>${tre}</b></span>`:""}
    </div></div>`;
}
function oThu(S, kyN){
  const o = [
    ["Đã nghiệm thu", S.xongTruoc.length, "trong kỳ qua", ""],
    ["Đúng hạn", S.tlDung!=null?S.tlDung+"%":"—", `${S.dungHan.length}/${S.xongTruoc.length} việc, so hạn gốc`,
      S.tlDung==null?"":S.tlDung>=90?"#1B5E20":S.tlDung>=75?"#8A6D3B":"#C62828"],
    ["Còn trễ chưa xong", S.treTruoc.filter(viecMo).length, "vẫn đang mở",
      S.treTruoc.filter(viecMo).length?"#C62828":"#1B5E20"],
    ["Việc phát sinh", S.ps.ds.length, `${S.ps.dotXuat.length} đột xuất · ${S.ps.tuTao.length} tự khai`, ""],
    ["Kỳ này đến hạn", S.denHanNay.length, S.mocNay.length?`gồm ${S.mocNay.length} mốc bàn giao`:"việc", ""],
  ];
  return `<div class="eo">${o.map(([l,v,h,m])=>`<div class="eo1">
    <span>${l}</span><b${m?` style="color:${m}"`:""}>${v}</b><i>${h}</i></div>`).join("")}</div>`;
}
function theThu(KL){
  if (!KL.length) return `<div class="ekhong">✓ Không có việc nào cần anh/chị quyết trong kỳ này.</div>`;
  return `<div class="ekl">${KL.slice(0,5).map((k,i)=>`<div class="ek ${k.m===2?"do":"vang"}">
    <span class="ekn">${i+1}</span>
    <div><b>${k.tieu}</b>
      <div class="ekr"><span>Bằng chứng</span>${k.bc}</div>
      <div class="ekr"><span>Nếu để nguyên</span>${k.hq}</div>
      <div class="ekr qd"><span>Phải quyết</span>${k.qd}</div></div></div>`).join("")}</div>`;
}
function bangConThu(con, nhan){
  if (!con.length) return "";
  const TT3 = [["Đạt","g"],["Cần chú ý","a"],["Có vấn đề","r"]];
  return `<div class="ebang"><div class="ebh">Kết quả theo ${nhan} — xếp nặng trước</div>
    <table><thead><tr><th>${nhan==="đơn vị"?"Đơn vị":"Bộ phận / nhân sự"}</th>
      <th class="n">Đến hạn</th><th class="n">Xong</th><th class="n">Đúng hạn</th>
      <th class="n">Còn trễ</th><th class="n">Đang tắc</th><th class="n">Kỳ này</th><th>Tình trạng</th></tr></thead><tbody>
    ${con.slice(0,10).map(o=>`<tr><td><b>${esc(o.ten)}</b></td>
      <td class="n">${o.denHan.length}</td><td class="n">${o.xong.length}</td>
      <td class="n" style="${o.tl!=null&&o.tl<75?"color:#C62828;font-weight:700":""}">${o.tl==null?"—":o.tl+"%"}</td>
      <td class="n" style="${o.treMo.length?"color:#C62828;font-weight:700":""}">${o.treMo.length}</td>
      <td class="n" style="${o.tac.length?"color:#8A6D3B;font-weight:700":""}">${o.tac.length}</td>
      <td class="n">${o.nay.length}</td>
      <td><span class="et ${TT3[o.muc][1]}">${TT3[o.muc][0]}</span></td></tr>`).join("")}
    </tbody></table></div>`;
}

/* PHỤ LỤC NGƯỜI — thay cho việc đính kèm mỗi người một tệp.
   Ở cấp đơn vị thì liệt kê ĐỦ, vì một phòng chỉ vài người và trưởng phòng cần thấy hết.
   Ở cấp công ty thì chỉ đưa NGƯỜI CẦN CHÚ Ý (có việc trễ, đang tắc, hoặc quá tải):
   44 dòng thì không ai đọc, mà cái Ban Giám đốc cần là biết chỗ nào đang hỏng. */
function phuLucNguoi(x, R, du){
  const cu = me; let ds = [];
  try {
    me = x.u.id;
    const nguoi = du
      ? Object.values(U).filter(u => x.giu.some(k => trongDV(u.id, k)))
      : Object.values(U).filter(u => coQuyen(x.u.id,"xem_toan_cty") || nhanhCuaToi().has(u.id));
    ds = nguoi.map(u => {
      const v = T.filter(t => trongTamNhin(t) && t.lam === u.id);
      const mo = v.filter(viecMo), tre = mo.filter(quaHan);
      const tac = mo.filter(t => t.yKien || t.tt === "CHO_DUYET" || t.tt === "CHO_DUYET_2" || t.tt === "TRA_LAI");
      const xong = v.filter(t => t.tt === "HOAN_THANH" && trongKhoang(ngayXong(t), R.kyT));
      const dung = xong.filter(t => dCong(ngayXong(t), parse(t.han_goc || t.han)) >= 0);
      const nay = mo.filter(t => trongKhoang(parse(t.han), R.kyN));
      return {u, mo, tre, tac, xong, dung, nay, tai: taiTuanNay(u.id),
              tl: xong.length ? Math.round(dung.length / xong.length * 100) : null,
              can: tre.length || tac.length || taiTuanNay(u.id) > SUC_TUAN};
    });
  } finally { me = cu; }
  if (!du) ds = ds.filter(o => o.can);
  ds.sort((a,b) => (b.tre.length - a.tre.length) || (b.tac.length - a.tac.length) || (b.tai - a.tai));
  if (!ds.length) return `<div class="ekhong">✓ ${du ? "Không có nhân sự nào trong đơn vị." : "Không ai trong công ty có việc trễ, việc tắc hay quá tải trong kỳ."}</div>`;
  return `<div class="ebang"><div class="ebh">${du ? `Từng nhân sự — ${ds.length} người, mỗi người một dòng`
      : `Người cần chú ý — ${ds.length} người có việc trễ, việc tắc hoặc quá tải`}</div>
    <table><thead><tr><th>Nhân sự</th><th>Đơn vị</th>
      <th class="n">Việc mở</th><th class="n">Trễ</th><th class="n">Tắc</th>
      <th class="n">Xong kỳ qua</th><th class="n">Đúng hạn</th><th class="n">Kỳ tới</th><th class="n">Tải tuần</th></tr></thead><tbody>
    ${ds.slice(0, du ? 40 : 12).map(o => `<tr>
      <td><b>${esc(o.u.ten)}</b><div style="font-size:8.5pt;color:#6B7885">${esc(o.u.cd)}</div></td>
      <td>${esc(DV[o.u.dv] ? DV[o.u.dv].ten : "—")}</td>
      <td class="n">${o.mo.length}</td>
      <td class="n" style="${o.tre.length?"color:#C62828;font-weight:700":""}">${o.tre.length}</td>
      <td class="n" style="${o.tac.length?"color:#8A6D3B;font-weight:700":""}">${o.tac.length}</td>
      <td class="n">${o.xong.length}</td>
      <td class="n" style="${o.tl!=null&&o.tl<75?"color:#C62828;font-weight:700":""}">${o.tl==null?"—":o.tl+"%"}</td>
      <td class="n">${o.nay.length}</td>
      <td class="n" style="${o.tai>SUC_TUAN?"color:#C62828;font-weight:700":""}">${soNgayLe(o.tai)}/${SUC_TUAN}</td>
    </tr>`).join("")}
    </tbody></table>${ds.length > (du?40:12) ? `<div style="padding:7px 10px;font-size:8.5pt;color:#6B7885">Còn ${ds.length-(du?40:12)} người nữa — mở phần mềm mục Nhân sự để xem đủ.</div>` : ""}</div>`;
}

/* Bản in A4 — chính là tệp PDF đính kèm. Trình duyệt in ra PDF, nên nội dung nhìn
   thấy ở đây đúng bằng nội dung tệp người nhận mở. */
function inPDF(uid){
  const x = nguoiNhanBC().find(o => o.u.id === uid); if (!x) return;
  const R = soLieuThu(x);
  const w = window.open("", "_blank", "width=900,height=1100");
  if (!w) return toast("Trình duyệt chặn cửa sổ mới — cho phép rồi bấm lại");
  w.document.write(`<!doctype html><html lang="vi"><head><meta charset="utf-8">
    <title>Bao cao ${R.kyT.ten} - ${x.u.ten}</title>
    <style>
      @page{size:A4;margin:14mm 13mm}
      *{box-sizing:border-box}
      body{font-family:-apple-system,"Segoe UI",Arial,sans-serif;color:#22303C;font-size:11pt;line-height:1.55;margin:0}
      .bia{background:#0E4671;color:#fff;padding:16px 18px;border-radius:10px;margin-bottom:16px}
      .bia .l{font-size:8.5pt;letter-spacing:1px;text-transform:uppercase;opacity:.72}
      .bia h1{font-size:18pt;margin:3px 0 4px}
      .bia .m{font-size:10pt;opacity:.85}
      h2{font-size:12pt;color:#0E4671;margin:18px 0 9px;padding-bottom:5px;border-bottom:2px solid #DCE5EE}
      .eo{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px}
      .eo1{flex:1;min-width:104px;border:1px solid #D8E0E8;border-radius:8px;padding:8px 10px}
      .eo1 span{display:block;font-size:7.5pt;font-weight:700;letter-spacing:.4px;text-transform:uppercase;color:#6B7885}
      .eo1 b{display:block;font-size:19pt;color:#0E4671;line-height:1.15;margin:2px 0}
      .eo1 i{display:block;font-style:normal;font-size:8pt;color:#6B7885;line-height:1.35}
      .ethanh{margin-bottom:15px}
      .etb{display:flex;height:22px;border-radius:5px;overflow:hidden;background:#F2F5F8;gap:2px}
      .etb i{display:grid;place-items:center;font-style:normal;font-size:8.5pt;font-weight:700;color:#fff}
      .etc{display:flex;gap:14px;flex-wrap:wrap;margin-top:6px;font-size:8.5pt;color:#6B7885}
      .etc span{display:inline-flex;align-items:center;gap:5px}
      .etc u{display:inline-block;width:9px;height:9px;border-radius:2px;text-decoration:none}
      .etc b{color:#0E4671}
      .ethanh.trong{font-size:9.5pt;color:#6B7885;padding:9px 11px;background:#F7FAFD;border-radius:8px}
      .ek{display:flex;gap:10px;border:1px solid #D8E0E8;border-left:3px solid #C79000;border-radius:8px;
        padding:9px 11px;margin-bottom:8px;page-break-inside:avoid}
      .ek.do{border-left-color:#C62828;background:#FEF8F8}
      .ek.vang{background:#FFFCF5}
      .ekn{display:grid;place-items:center;width:19px;height:19px;border-radius:5px;background:#C79000;
        color:#fff;font-size:9pt;font-weight:700;flex:none}
      .ek.do .ekn{background:#C62828}
      .ek b{display:block;font-size:11pt;color:#0E4671;margin-bottom:5px;line-height:1.4}
      .ekr{display:flex;gap:8px;font-size:9pt;line-height:1.5;padding:1px 0}
      .ekr>span{flex:0 0 78px;font-size:7.5pt;font-weight:700;letter-spacing:.3px;text-transform:uppercase;color:#6B7885;padding-top:2px}
      .ekr.qd{margin-top:4px;padding-top:5px;border-top:1px solid #EDF1F5;color:#1270B8;font-weight:600}
      .ekhong{font-size:10pt;color:#1B5E20;background:#F1F8F2;border:1px solid #CBE3CD;border-radius:8px;padding:10px 12px}
      table{width:100%;border-collapse:collapse;font-size:9pt}
      th{background:#0E4671;color:#fff;text-align:left;padding:6px 8px;font-size:7.5pt;
        letter-spacing:.4px;text-transform:uppercase;font-weight:700}
      td{padding:6px 8px;border-bottom:1px solid #EDF1F5}
      th.n,td.n{text-align:right}
      .et{display:inline-block;padding:1px 7px;border-radius:5px;font-size:8pt;font-weight:700}
      .et.g{background:#DCF0DC;color:#1B5E20}.et.a{background:#FFF3CD;color:#8A6D3B}.et.r{background:#FBE3E5;color:#B02A37}
      .chan{margin-top:20px;padding-top:9px;border-top:1px solid #D8E0E8;font-size:8.5pt;color:#6B7885}
      @media print{.noprint{display:none}}
      .noprint{position:fixed;top:10px;right:10px;background:#0E4671;color:#fff;border:0;border-radius:8px;
        padding:9px 15px;font-size:11pt;cursor:pointer;font-family:inherit}
    </style></head><body>
    <button class="noprint" onclick="window.print()">In / Lưu thành PDF</button>
    <div class="bia"><div class="l">FOREVER · Báo cáo ${R.cap==="CTY"?"điều hành toàn công ty":R.cap==="DV"?"cấp đơn vị":"cá nhân"}</div>
      <h1>${R.kyT.ten} · ${R.kyT.khoang}</h1>
      <div class="m">${esc(R.pham)} — gửi ${esc(x.u.ten)}, ${esc(x.u.cd)}
        · kế hoạch ${R.kyN.ten.toLowerCase()} (${R.kyN.khoang})
        · số liệu trên ${R.soViec} việc trong phạm vi được đọc</div></div>
    <h2>1 · Kết quả kỳ qua</h2>
    ${oThu(R.S, R.kyN)}
    ${thanhThu(R.S)}
    <h2>2 · Việc cần quyết</h2>
    ${theThu(R.KL)}
    ${R.con.length?`<h2>3 · Kết quả theo ${R.conNhan}</h2>${bangConThu(R.con, R.conNhan)}`:""}
    ${x.ma !== "CN" ? `<h2>${R.con.length?4:3} · Phụ lục nhân sự</h2>${phuLucNguoi(x, R, x.ma !== "CTY")}` : ""}
    <div class="chan">Báo cáo do hệ thống lập tự động lúc ${CH.emGio} ${EM_THU[CH.emThu].toLowerCase()},
      ngày lập ${fmtDY(new Date(TODAY))}. Số liệu chốt tại thời điểm gửi.
      Mở phần mềm mục <b>Giao ban</b> để xem chi tiết từng việc.</div>
    </body></html>`);
  w.document.close();
  ghiNK(me, "Xuất PDF báo cáo email", `${x.u.ten} · ${R.kyT.ten} (${R.kyT.khoang})`);
}

/* Nội dung thư — dựng từ cùng bộ số liệu với bản in. */
function thuMau(x){
  const R = soLieuThu(x);
  const dinh = x.bo.map(k => EM_LOAI[k][0] + (k === "NSD" ? ` ×${x.duoi.length}` : ""));
  return `<div class="thu">
    <div class="thuh">
      <div><span>Tới</span><b>${esc(x.email)}</b></div>
      <div><span>Tiêu đề</span><b>[FOREVER] Báo cáo ${R.kyT.ten.toLowerCase()} ${R.kyT.khoang} — ${esc(R.pham)}</b></div>
    </div>
    <div class="thub">
      <div class="ebia">
        <div class="ebl">FOREVER · Báo cáo ${R.cap==="CTY"?"điều hành toàn công ty":R.cap==="DV"?"cấp đơn vị":"cá nhân"}</div>
        <b>${R.kyT.ten} · ${R.kyT.khoang}</b>
        <span>${esc(x.u.ten)} — ${esc(x.u.cd)} · kế hoạch ${R.kyN.ten.toLowerCase()} (${R.kyN.khoang})</span>
      </div>
      ${oThu(R.S, R.kyN)}
      ${thanhThu(R.S)}
      <div class="emuc">Việc cần anh/chị quyết</div>
      ${theThu(R.KL)}
      ${R.con.length ? bangConThu(R.con, R.conNhan) : ""}
      <div class="edinh">
        <div class="edh">Tệp đính kèm — đúng một bản PDF</div>
        <div class="edd">
          <span class="ed1" onclick="inPDF('${x.u.id}')" title="Mở bản in A4 để lưu thành PDF">
            <i>PDF</i><b>${esc(EM_LOAI[x.ma][0])} · ${R.kyT.khoang.replace(/\s/g,"")}.pdf</b><u>mở xem</u></span>
        </div>
        <div class="edn"><b>Trong tệp có:</b> ${x.phan.map((t,i)=>`${i+1}. ${t}`).join(" · ")}.
          ${x.ma!=="CN" ? `Thông tin từng người nằm ở <b>phụ lục nhân sự</b> ngay trong tệp này —
            không đính kèm mỗi người một tệp riêng, vì ${x.ma==="CTY"?"44 tệp thì không ai đọc nổi":"gộp một bảng dễ so sánh hơn"}.` : ""}</div>
      </div>
      <div class="thuf">Thư do hệ thống gửi tự động lúc ${CH.emGio} ${EM_THU[CH.emThu].toLowerCase()} hằng tuần.
        Mở phần mềm mục <b>Giao ban</b> để xem chi tiết từng việc.</div>
    </div></div>`;
}


function vQuanTri(){
  const mt = QT_TABS.find(x=>x[0]===QT_TAB) || QT_TABS[0];
  /* Tab con lọc theo quyền thật, không hiện đủ bảy cho mọi người vào được cụm này. */
  const duoc = QT_TABS.filter(([k]) =>
    k === "ts" || k === "nk" ? coQuyen(me,"xem_nhat_ky")
    : k === "pq" || k === "dm" || k === "vt" || k === "ck" || k === "em" ? coQuyen(me,"sua_to_chuc") : true);
  if (!duoc.some(x => x[0] === QT_TAB)) QT_TAB = duoc[0][0];
  return `<h1 class="h1">Thiết lập hệ thống</h1>
    <p class="sub">Danh mục nền và tham số vận hành. Đây không phải màn hình làm việc hằng ngày —
    nhưng mọi màn hình làm việc đều đọc số liệu từ đây, nên sai ở đây là sai toàn hệ.</p>
    <div class="vsw">${duoc.map(([k,n,d])=>
      `<button class="${QT_TAB===k?"on":""}" onclick="setQT('${k}')" title="${esc(d)}">${n}</button>`).join("")}</div>
    <p class="sub" style="margin:-8px 0 15px;font-size:12.5px">${esc(mt[2])}.</p>`
    + ({tc:vToChuc, lich:vLich2, ts:vThamSo, pq:vPhanQuyen, dm:vDanhMuc, vt:vViTri, ck:vVietLap, em:vEmail, ai:vTroLyCH, dn:vDuLieuNgoai, nk:vNhatKy}[QT_TAB] || vToChuc)();
}

function vLich2(){
  const chua = NGHI_LE.filter(x=>!x.xacNhan).length;
  const nam = {}; NGHI_LE.forEach(x=>{ const y = x.ngay.slice(6); (nam[y]=nam[y]||[]).push(x); });
  /* số ngày công một năm, tính thật chứ không ước */
  const congNam = y => { let n=0; const d=new Date(+y,0,1); while(d.getFullYear()==y){ n+=congCuaNgay(d); d.setDate(d.getDate()+1);} return n; };
  let h = oKPI([
    ["Ngày nghỉ lễ đã nạp", NGHI_LE.length, "cho hai năm 2026 và 2027", ""],
    ["Chưa đối chiếu công bố", chua, chua?"ngày âm lịch, phải kiểm lại hằng năm":"đã kiểm hết",
      chua?"var(--red)":"#1B5E20"],
    ["Ngày công năm 2026", soNgayLe(congNam(2026)), "đã trừ Chủ nhật, lễ, thứ Bảy nửa ngày", ""],
    ["Quy ước thứ Bảy", CH.thuBayNuaNgay?"0,5 ngày":"1 ngày", "chốt ngày 16/8", ""],
  ]);
  h += `<div class="note" style="margin-bottom:15px"><b>Vì sao bảng này là danh mục nền số một.</b>
    Mọi thời lượng, mọi điểm đúng hạn, mọi dự báo đều đếm bằng ngày công. Thiếu bảng này thì sai
    <b>hệ thống</b> chứ không sai lẻ tẻ — một việc bắc qua Tết mất năm ngày công mà phần mềm vẫn tính đủ.
    Ngày âm lịch phải đối chiếu thông báo chính thức của Chính phủ hằng năm; dòng nào chưa đối chiếu
    được đánh dấu rõ thay vì để người dùng tưởng là đã chắc.</div>`;
  Object.keys(nam).sort().forEach(y=>{
    h += `<div class="gvc"><h3 class="gvh">Năm ${y} <em>— ${nam[y].length} ngày nghỉ · ${soNgayLe(congNam(+y))} ngày công cả năm</em></h3>
      <div class="msp"><table><thead><tr><th style="width:110px">Ngày</th><th>Thứ</th>
        <th style="min-width:260px">Dịp nghỉ</th><th>Đối chiếu công bố</th></tr></thead><tbody>
        ${nam[y].map(x=>{ const d=parse(x.ngay); const th=["Chủ nhật","Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy"][d.getDay()];
          return `<tr><td class="cot"><b>${x.ngay}</b></td><td>${th}</td><td>${esc(x.ten)}</td>
            <td>${x.xacNhan?`<span class="tag g">Đã đối chiếu</span>`:`<span class="tag a">Cần kiểm lại</span>`}</td></tr>`;}).join("")}
      </tbody></table></div></div>`;
  });
  return h;
}

/* Mỗi tham số: mã trong CH · tên · đơn vị · các mức chọn · chi phối cái gì · căn cứ ·
   và một hàm đo ẢNH HƯỞNG NGAY nếu đặt giá trị v, tính trên dữ liệu thật. */
const THAM_SO = [
  {ma:"sucTuan", ten:"Sức một tuần", dv:"điểm độ khó", muc:[4,6,8,10,12,15],
   chi:"Vạch đỏ quá tải ở Cá nhân, Điều hành, Giao ban và cột Tải người",
   can:"Phải đo lại bằng dữ liệu thật: lấy trung vị điểm độ khó mà những người về đích đúng hạn gánh được mỗi tuần.",
   anh:v => { const n = Object.values(U).filter(u => taiTuanNay(u.id) > v).length;
              return `${n} người sẽ bị tính là quá tải (hiện ${Object.values(U).filter(u=>taiTuanNay(u.id)>CH.sucTuan).length})`; }},
  {ma:"wipTran", ten:"Ngưỡng việc mở cùng lúc", dv:"việc", muc:[3,4,5,6,8,10],
   chi:"Cảnh báo mềm khi giao thêm việc, và dòng “đang mở N việc cùng lúc” ở báo cáo",
   can:"Không chặn, chỉ cảnh báo. Chặn cứng thì người ta lách bằng cách không ghi việc vào phần mềm.",
   anh:v => { const n = Object.values(U).filter(u => soViecMo(u.id) > v).length;
              return `${n} người vượt ngưỡng (hiện ${Object.values(U).filter(u=>soViecMo(u.id)>CH.wipTran).length})`; }},
  {ma:"spanTran", ten:"Ngưỡng người duyệt trực tiếp", dv:"người", muc:[4,6,8,10,12,15],
   chi:"Cảnh báo nút thắt ở Cơ cấu tổ chức và Phân quyền",
   can:"Vượt ngưỡng thì người duyệt thành nút thắt, phiếu nằm chờ lâu.",
   anh:v => { const n = Object.keys(U).filter(id => soNguoiDuyetChoi(id) > v).length;
              return `${n} người bị gắn cờ nút thắt (hiện ${Object.keys(U).filter(id=>soNguoiDuyetChoi(id)>CH.spanTran).length})`; }},
  {ma:"nhipNgay", ten:"Số ngày lịch sử cho dự báo", dv:"ngày", muc:[14,30,45,60,90],
   chi:"Mô phỏng Monte Carlo ở Cá nhân và dự báo ngày về đích của dự án",
   can:"Ngắn quá thì dự báo nhiễu, dài quá thì không bắt kịp thay đổi cách làm.",
   anh:v => `Dự báo sẽ đọc ${v} ngày gần nhất thay vì ${CH.nhipNgay}`},
];
const THAM_SO_CO = [
  {ma:"thuBayNuaNgay", ten:"Thứ Bảy tính nửa ngày công",
   chi:"Mọi phép tính thời lượng, hạn, ngày công và tải người",
   can:"Chốt ngày 16/8. Tắt thì thứ Bảy tính trọn một ngày công như ngày thường.",
   bat:"0,5 ngày công", tat:"1 ngày công"},
  {ma:"chuNhatNghi", ten:"Chủ nhật là ngày nghỉ",
   chi:"Lịch làm việc, dời hạn khi rơi ngày nghỉ, mọi phép đếm ngày công",
   can:"Tắt thì Chủ nhật thành ngày làm việc bình thường, hạn không dời nữa.",
   bat:"nghỉ", tat:"vẫn làm việc"},
];
function datTS(ma, v){
  const cu = CH[ma], moi = isNaN(+v) ? v : +v;
  if (String(cu) === String(moi)) return;
  CH[ma] = moi;
  const ten = (THAM_SO.find(x=>x.ma===ma)||{}).ten || ma;
  ghiNK(me, "Sửa tham số hệ thống", `${ten}: ${cu} → ${moi}`);
  toast(`${ten}: ${cu} → ${moi} · mọi màn hình đã tính lại`);
  draw();
}
function datTSCo(ma){
  const cu = CH[ma]; CH[ma] = !cu;
  const o = THAM_SO_CO.find(x=>x.ma===ma) || {ten:ma, bat:"bật", tat:"tắt"};
  ghiNK(me, "Sửa tham số hệ thống", `${o.ten}: ${cu?o.bat:o.tat} → ${CH[ma]?o.bat:o.tat}`);
  toast(`${o.ten}: ${CH[ma]?o.bat:o.tat} · lịch làm việc đã tính lại`);
  draw();
}
function datBac(i, k, v){
  const b = BAC_DUYET[i]; if (!b) return;
  const cu = k === "tu" ? tienDu(b.tu) : (U[b.ai] ? U[b.ai].ten : b.ai);
  if (k === "tu") b.tu = +String(v).replace(/\D/g,"") || b.tu; else b.ai = v;
  ghiNK(me, "Sửa bậc duyệt tiền", `Bậc ${i+1} · ${k==="tu"?"mức":"người ký"}: ${cu} → ${k==="tu"?tienDu(b.tu):(U[b.ai]?U[b.ai].ten:b.ai)}`);
  toast(`Đã sửa bậc duyệt ${i+1} · tuyến duyệt tiền đã tính lại`); draw();
}
function vThamSo(){
  const sua = coQuyen(me, "sua_tham_so") || coQuyen(me, "sua_to_chuc");
  let h = `<div class="note" style="margin-bottom:15px"><b>Sửa được ngay tại đây, mọi màn hình tính lại tức thì.</b>
    Cột <b>Đổi thì gì xảy ra</b> đo thật trên dữ liệu hiện có, không phải mô tả suông —
    trước khi đổi đã biết bao nhiêu người sẽ bị gắn cờ.
    Mỗi lần đổi ghi vào <b>Thiết lập › Nhật ký</b> kèm giá trị cũ.</div>`;

  h += `<div class="msp" style="margin-bottom:15px"><table><thead><tr>
      <th style="min-width:196px">Tham số</th><th style="min-width:158px">Giá trị</th>
      <th class="wr" style="min-width:250px">Chi phối cái gì</th>
      <th class="wr" style="min-width:210px">Đổi thì gì xảy ra</th>
      <th class="wr" style="min-width:270px">Căn cứ đặt số</th></tr></thead><tbody>
    ${THAM_SO.map(o=>`<tr>
      <td class="cot"><b>${o.ten}</b></td>
      <td>${sua ? `<select class="lsel" style="max-width:148px" onchange="datTS('${o.ma}',this.value)">
            ${o.muc.map(v=>`<option value="${v}" ${CH[o.ma]===v?"selected":""}>${v} ${o.dv}</option>`).join("")}</select>`
        : `<b style="color:var(--navy)">${CH[o.ma]} ${o.dv}</b>`}</td>
      <td class="wr" style="font-size:12.5px">${o.chi}</td>
      <td class="wr" style="font-size:12.5px;color:var(--navy2);font-weight:600">${o.anh(CH[o.ma])}</td>
      <td class="wr" style="font-size:12.5px;color:var(--mute)">${o.can}</td></tr>`).join("")}
    ${THAM_SO_CO.map(o=>`<tr>
      <td class="cot"><b>${o.ten}</b></td>
      <td>${sua ? `<button class="btn ${CH[o.ma]?"p":""}" onclick="datTSCo('${o.ma}')">${CH[o.ma]?o.bat:o.tat}</button>`
        : `<b style="color:var(--navy)">${CH[o.ma]?o.bat:o.tat}</b>`}</td>
      <td class="wr" style="font-size:12.5px">${o.chi}</td>
      <td class="wr" style="font-size:12.5px;color:var(--navy2);font-weight:600">Đổi lại toàn bộ số ngày công đã tính</td>
      <td class="wr" style="font-size:12.5px;color:var(--mute)">${o.can}</td></tr>`).join("")}
    </tbody></table></div>`;

  h += `<div class="gvc"><h3 class="gvh">Ba bậc duyệt theo giá trị khoản chi
      <em>— mức tiền và người ký, sửa được</em></h3>
    <div class="msp"><table><thead><tr><th style="min-width:180px">Từ mức</th>
      <th style="min-width:250px">Người phải ký thêm</th>
      <th class="wr" style="min-width:230px">Việc đang vượt mức này</th></tr></thead><tbody>
      ${BAC_DUYET.map((b,i)=>{ const n = T.filter(t => (t.tienLoai||"CHI")==="CHI" && (t.tien||0) >= b.tu && viecMo(t)).length;
        return `<tr>
        <td class="cot">${sua ? `<select class="lsel" style="max-width:170px" onchange="datBac(${i},'tu',this.value)">
            ${[20e6,50e6,100e6,200e6,500e6,1e9,2e9,5e9].map(v=>`<option value="${v}" ${b.tu===v?"selected":""}>${tienDu(v)}</option>`).join("")}</select>`
          : `<b>${tienDu(b.tu)}</b>`}</td>
        <td>${sua ? `<select class="lsel" style="max-width:250px" onchange="datBac(${i},'ai',this.value)">
            ${Object.values(U).filter(u=>capViec(u.id)<=2).map(u=>`<option value="${u.id}" ${b.ai===u.id?"selected":""}>${esc(u.ten)} — ${esc(u.cd)}</option>`).join("")}</select>`
          : `${esc(b.ten)}${U[b.ai]?` — ${esc(U[b.ai].ten)}`:""}`}</td>
        <td class="wr" style="font-size:12.5px;${n?"color:var(--amb);font-weight:600":"color:var(--mute)"}">${
          n ? `${n} việc đang mở vượt mức này, phải qua chữ ký của người trên` : "không việc nào đang mở vượt mức này"}</td></tr>`;}).join("")}
    </tbody></table></div>
    <div class="note" style="margin-top:13px;margin-bottom:0">Cộng dồn nghĩa là khoản 2,5 tỷ phải qua
      cả ba người, không phải chỉ người ở bậc cao nhất. Khoản thu, hợp đồng bán và hàng luân chuyển
      không kích hoạt tầng duyệt thêm.</div></div>`;

  const nkTS = NK.filter(x => x.viec && (x.viec.indexOf("tham số hệ thống") >= 0 || x.viec.indexOf("bậc duyệt") >= 0));
  h += `<div class="gvc" style="margin-top:15px"><h3 class="gvh">Nhật ký sửa tham số
      <em>— ${nkTS.length} lượt · giữ giá trị cũ để truy lại vì sao con số hôm nay khác tháng trước</em></h3>
    ${nkTS.length ? `<div class="msp"><table><thead><tr><th style="min-width:140px">Lúc</th>
        <th style="min-width:170px">Người sửa</th><th style="min-width:190px">Loại</th>
        <th class="wr" style="min-width:320px">Sửa gì</th></tr></thead><tbody>
      ${nkTS.slice(0,12).map(x=>`<tr><td>${x.t}</td><td>${esc(U[x.ai]?U[x.ai].ten:x.ai)}</td>
        <td>${esc(x.viec)}</td><td class="wr" style="font-size:12.5px">${esc(x.dt)}</td></tr>`).join("")}
      </tbody></table></div>`
      : `<div class="flag b2"><span class="ic2">✓</span><span class="bd2">Chưa ai sửa tham số trong phiên này. Đổi một ô ở trên rồi quay lại xem.</span></div>`}</div>`;

  h += `<div class="vd" style="margin-top:15px"><b>Một quyết định phải chốt trước khi lập trình thật:
    đổi tham số có tính lại điểm đã chấm không.</b> Ở đây chọn <b>không hồi tố</b> — việc đã nghiệm thu
    giữ nguyên điểm chấm theo tham số lúc đó. Làm ngược lại thì bảng điểm cũ tự đổi số sau lưng người ta,
    và không ai giải thích được vì sao điểm tháng trước hôm nay khác hôm qua.</div>`;
  return h;
}

let PQ_AI = "F036", PQ_VIEC = "";
function setPQ(k, v){ if (k === "ai") PQ_AI = v; else PQ_VIEC = v; draw(); }

/* Thử quyền thật: đổi vai đang xem trong chốc lát rồi trả lại, để câu trả lời đến từ
   CHÍNH những hàm mà màn hình làm việc đang dùng, không phải một bản mô phỏng riêng. */
function thuQuyen(uid, tid){
  const t = find(tid); if (!t || !U[uid]) return null;
  const cu = me; me = uid;
  let r;
  try {
    const vai = vaiCuaToi(t);
    r = {vai, xem: xemDuoc(t), lam: t.lam === uid, giao: t.giao === uid,
         duyet: nguoiDuyet(t) === uid && t.lam !== uid,
         them: (chuoiDuyetThem(t) || []).includes(uid),
         phoi: (t.phoihop || []).includes(uid),
         nhanh: capDuoi().includes(t.lam)};
  } finally { me = cu; }
  return r;
}

let PQ_TAB = "gan", PQ_MO = null, PQ_TIM = "", PQ_NHOM = "TAT_CA";
function setPQTab(k){ PQ_TAB = k; PQ_MO = null; draw(); }
function moPQ(id){ PQ_MO = (PQ_MO === id) ? null : id; draw(); }

/* Biểu mẫu gán vai: chọn người → chọn vai → chọn phạm vi. Ba bước, không hơn.
   Vai nào người đang thao tác không đủ quyền cấp thì HIỆN NHƯNG KHOÁ, kèm lý do —
   ẩn đi thì người quản trị tưởng hệ thống thiếu tính năng. */
let GAN = null;
function moGan(uid){ GAN = uid ? {uid, vai:"", pv:"NHANH", dv:null, ly:""} : null; draw(); }
function datGan(k, v){ if (!GAN) return;
  GAN[k] = v;
  if (k === "vai" && VAI_TRO[v]) GAN.pv = VAI_TRO[v].pv;
  draw(); }
function luuGan(){
  if (!GAN || !GAN.vai) return toast("Chọn một vai trò");
  if (GAN.pv === "KHOI" && !GAN.dv) return toast("Chọn khối áp dụng");
  ganVai(GAN.uid, GAN.vai, GAN.pv, GAN.dv, GAN.ly);
  GAN = null;
}

function vPhanQuyen(){
  const TABS = [
    ["gan", "Phân công", "Ai đang giữ vai gì, phạm vi tới đâu — gán thêm và thu hồi"],
    ["vai", "Vai trò",   "Thư viện bó quyền — sửa một vai là sửa cho mọi người giữ vai đó"],
    ["thu", "Thử & rà soát", "Chứng minh cấu hình đúng trước khi tin nó, và soát chỗ hở"],
  ];
  let h = `<h2 class="sh">Phân quyền
    <em>— vai trò × phạm vi. Gán VAI TRÒ cho người, không tick từng ô quyền.</em></h2>`;

  /* ---- dải mô hình, thu gọn ---- */
  h += `<div class="pqm">
    <div class="pqmr">
      ${[["Quyền","Một động từ trên một loại dữ liệu","Không bao giờ cấp thẳng cho người",QUYEN.length],
         ["Vai trò","Bó quyền có tên","Thứ người quản trị thật sự gán",Object.keys(VAI_TRO).length],
         ["Phạm vi","Quyền đó chạm dữ liệu của ai","Thiếu trục này là mọi RBAC đều hở",PV_THU.length],
         ["Phân công","(người · vai trò · phạm vi)","Quyền thực tế là HỢP các phân công",
          Object.keys(U).length + PHAN_CONG.length]]
        .map(([a,b,c,n])=>`<div class="pqmc"><span class="pqmn">${n}</span>
          <b>${a}</b><i>${b}</i><em>${c}</em></div>`).join("<span class='pqmx'>×</span>")}
    </div>
    <div class="pqmb"><b>Bốn lớp bất biến — không phân công nào ghi đè được:</b>
      có tên trong phiếu thì luôn đọc được phiếu đó ·
      không ai nghiệm thu việc của chính mình ·
      không ai gán cho người khác quyền mà mình không có ·
      mọi lần gán và thu hồi đều vào nhật ký.</div>
  </div>`;

  h += `<div class="tct">${TABS.map(([k,n,d])=>`<button class="${PQ_TAB===k?"on":""}"
      onclick="setPQTab('${k}')"><b>${n}</b><i>${d}</i></button>`).join("")}</div>`;

  /* ============ TAB 1 · PHÂN CÔNG ============ */
  if (PQ_TAB === "gan"){
    const q = boDau(PQ_TIM.trim());
    const ds = Object.values(U)
      .filter(u => PQ_NHOM === "TAT_CA"
        || (PQ_NHOM === "THEM" && PHAN_CONG.some(x=>x.uid===u.id))
        || (PQ_NHOM === "CTY"  && coQuyen(u.id,"xem_toan_cty"))
        || (PQ_NHOM === "QT"   && coQuyen(u.id,"vao_quan_tri")))
      .filter(u => !q || boDau(u.ten).includes(q) || boDau(u.cd).includes(q)
                || boDau((DV[u.dv]||{}).ten||"").includes(q))
      .sort((a,b) => (capViec(a.id)-capViec(b.id)) || a.ten.localeCompare(b.ten,"vi"));
    h += `<div class="nsloc"><div class="nsl1">
        <div class="sg">${[["TAT_CA",`Tất cả ${Object.keys(U).length}`],
          ["THEM",`Có vai gán thêm ${new Set(PHAN_CONG.map(x=>x.uid)).size}`],
          ["CTY",`Xem toàn công ty ${Object.values(U).filter(u=>coQuyen(u.id,"xem_toan_cty")).length}`],
          ["QT",`Vào Thiết lập ${Object.values(U).filter(u=>coQuyen(u.id,"vao_quan_tri")).length}`]]
          .map(([k,n])=>`<button class="${PQ_NHOM===k?"on":""}" onclick="PQ_NHOM='${k}';draw()">${n}</button>`).join("")}</div>
        <label class="nslb"><span>Tìm người</span>
          <input class="inp" style="height:34px" placeholder="Tên, chức danh hoặc phòng…"
            value="${esc(PQ_TIM)}" oninput="PQ_TIM=this.value;draw();
            (o=>{o&&(o.focus(),o.setSelectionRange(this.value.length,this.value.length))})(document.querySelector('.nslb input'))"></label>
      </div>
      <div class="nsl2"><span>Đang hiện <b>${ds.length}</b> trên <b>${Object.keys(U).length}</b> người</span></div></div>`;

    h += `<div class="tdkh"><table><thead><tr>
        <th style="min-width:200px">Người</th><th style="min-width:130px">Vị trí</th>
        <th style="min-width:290px">Vai đang giữ</th><th style="min-width:170px">Phạm vi rộng nhất</th>
        <th class="num">Quyền</th><th style="width:118px"></th></tr></thead><tbody>
      ${ds.map(u => { const pcs = phanCongCua(u.id);
        const rong = pcs.reduce((a,x)=> !a || PHAM_VI[x.pv].r > PHAM_VI[a.pv].r ? x : a, null);
        const soq = new Set(pcs.flatMap(x=>VAI_TRO[x.vai].q)).size;
        return `<tr class="${PQ_MO===u.id?"ckchon":""}" onclick="moPQ('${u.id}')" style="cursor:pointer">
          <td class="cot"><div style="display:flex;align-items:center;gap:9px">${avHTML(u.id,28)}
            <div><b>${esc(u.ten)}</b><div style="font-size:11px;color:var(--mute)">${esc(u.cd)}</div></div></div></td>
          <td><span class="tag ${capViec(u.id)===1?"r":capViec(u.id)===2?"a":capViec(u.id)===3?"":"m"}">${
            CHUC_VU[u.vt||"NV"].ten}</span></td>
          <td class="wr">${pcs.map(x=>`<span class="vtg ${x.tuDong?"tu":"tay"}">${VAI_TRO[x.vai].ten}${
            x.tuDong?"":`<i>gán tay</i>`}</span>`).join(" ")}</td>
          <td><b style="font-size:12.5px">${rong?PHAM_VI[rong.pv].ten:"—"}</b>
            <div style="font-size:11px;color:var(--mute)">${rong&&rong.pv==="KHOI"&&rong.dv
              ?esc((KHOI.find(k=>k.ma===rong.dv)||{}).ten||""):PHAM_VI[rong?rong.pv:"MINH"].mo}</div></td>
          <td class="num">${soq}</td>
          <td><button class="btn sm" onclick="event.stopPropagation();moGan('${u.id}')">Gán vai</button></td>
        </tr>` + (PQ_MO === u.id ? `<tr class="pqbung"><td colspan="6">
          <div class="pqd">
            <div class="pqdh">Vì sao ${esc(u.ten)} làm được những gì</div>
            <div class="pqdg">${QUYEN.map(qq => { const n = nguonQuyen(u.id, qq[0]);
              return `<div class="pqdi ${n?"co":"khong"}"><span>${n?"✓":"·"}</span>
                <div><b>${esc(qq[1])}</b>${n?`<i>qua vai <b>${esc(n.tenVai)}</b> · phạm vi ${esc(n.tenPV)}${
                  n.tuDong?" · tự động theo vị trí":` · ${esc(U[n.boi]?U[n.boi].ten:"—")} gán ${esc(n.ngay||"")}`}</i>`
                  :`<i>không có vai nào cấp quyền này</i>`}</div></div>`;
            }).join("")}</div>
            ${PHAN_CONG.filter(x=>x.uid===u.id).length?`<div class="pqdt">
              ${PHAN_CONG.filter(x=>x.uid===u.id).map(x=>`<div class="pqdr">
                <b>${esc(VAI_TRO[x.vai].ten)}</b><span>${esc(PHAM_VI[x.pv].ten)}${
                  x.pv==="KHOI"&&x.dv?` · ${esc((KHOI.find(k=>k.ma===x.dv)||{}).ten||"")}`:""}</span>
                <i>${esc(x.ly||"")} — ${esc(U[x.boi]?U[x.boi].ten:"—")} gán ngày ${esc(x.ngay||"")}</i>
                <button class="btn sm" onclick="event.stopPropagation();thuVai('${u.id}','${x.vai}')">Thu hồi</button>
              </div>`).join("")}</div>`:""}
          </div></td></tr>` : "");
      }).join("")}</tbody></table></div>`;

    if (GAN && U[GAN.uid]){
      const dsVai = Object.entries(VAI_TRO).filter(([k,v]) => !v.tuDong);
      h += `<div class="pqg">
        <div class="pqgh"><b>Gán vai cho ${esc(U[GAN.uid].ten)}</b>
          <span>${esc(U[GAN.uid].cd)} · ${esc((DV[U[GAN.uid].dv]||{}).ten||"")}</span>
          <button class="btn sm" onclick="moGan(null)">Đóng</button></div>
        <div class="pqgb">
          <label class="nslb"><span>Vai trò</span>
            <select class="lsel" onchange="datGan('vai',this.value)">
              <option value="">— Chọn vai trò —</option>
              ${dsVai.map(([k,v]) => { const ok = canGan(me, k);
                return `<option value="${k}" ${GAN.vai===k?"selected":""} ${ok.duoc?"":"disabled"}>${
                  v.ten}${ok.duoc?"":" — bạn không đủ quyền để cấp"}</option>`; }).join("")}
            </select></label>
          <label class="nslb"><span>Phạm vi</span>
            <select class="lsel" onchange="datGan('pv',this.value)">
              ${PV_THU.map(k=>`<option value="${k}" ${GAN.pv===k?"selected":""}>${PHAM_VI[k].ten}</option>`).join("")}
            </select></label>
          ${GAN.pv==="KHOI"?`<label class="nslb"><span>Khối</span>
            <select class="lsel" onchange="datGan('dv',this.value)">
              <option value="">— Chọn khối —</option>
              ${KHOI.map(k=>`<option value="${k.ma}" ${GAN.dv===k.ma?"selected":""}>${esc(k.ten)}</option>`).join("")}
            </select></label>`:""}
          <label class="nslb" style="flex:1"><span>Lý do cấp</span>
            <input class="inp" style="height:34px" placeholder="Vì sao người này cần vai đó — bắt buộc để tra lại về sau"
              value="${esc(GAN.ly)}" oninput="GAN.ly=this.value"></label>
        </div>
        ${GAN.vai?`<div class="pqgq"><b>Vai “${esc(VAI_TRO[GAN.vai].ten)}” cấp ${VAI_TRO[GAN.vai].q.length} quyền:</b>
          ${VAI_TRO[GAN.vai].q.map(x=>`<span class="qch">${esc((QUYEN.find(y=>y[0]===x)||[])[1]||x)}</span>`).join("")}
          <div class="pqgm">${esc(VAI_TRO[GAN.vai].mo)}. Áp trên <b>${esc(PHAM_VI[GAN.pv].ten.toLowerCase())}</b> — ${esc(PHAM_VI[GAN.pv].mo.toLowerCase())}.</div>
        </div>`:`<div class="pqgm">Chọn một vai trò để xem nó cấp những quyền gì trước khi lưu.</div>`}
        <div class="pqgf"><button class="btn pri" onclick="luuGan()">Gán vai này</button>
          <button class="btn" onclick="moGan(null)">Huỷ</button>
          <span>Lần gán này sẽ vào nhật ký kèm tên bạn và ngày hôm nay.</span></div>
      </div>`;
    }
  }

  /* ============ TAB 2 · VAI TRÒ ============ */
  if (PQ_TAB === "vai"){
    const nhom = [...new Set(Object.values(VAI_TRO).map(v=>v.nhom))];
    h += `<p class="sub">Sửa một vai là sửa cho <b>mọi người đang giữ vai đó</b>. Bấm một ô quyền để bật tắt —
      thay đổi có hiệu lực ngay trên toàn phần mềm và vào nhật ký.</p>`;
    nhom.forEach(n => {
      h += `<h3 class="sh2" style="margin-top:15px">${esc(n)}</h3><div class="vtl">`;
      Object.entries(VAI_TRO).filter(([k,v])=>v.nhom===n).forEach(([k,v]) => {
        const giu = Object.keys(U).filter(id => phanCongCua(id).some(x=>x.vai===k));
        h += `<div class="vtc">
          <div class="vtch"><b>${esc(v.ten)}</b>
            <span class="vtcn">${giu.length} người</span>
            ${v.tuDong?`<span class="tag m">tự động theo vị trí ${CHUC_VU[v.tuDong].ten}</span>`
                      :`<span class="tag">chỉ có khi được gán</span>`}</div>
          <div class="vtcm">${esc(v.mo)}</div>
          <div class="vtcp">${QUYEN.map(qq => { const co = v.q.includes(qq[0]);
            return `<button class="qo ${co?"on":""}" onclick="batQuyen('${k}','${qq[0]}')"
              title="${esc((QUYEN_MO[qq[0]]||[])[0]||"")}">${co?"✓":"·"} ${esc(qq[1])}</button>`; }).join("")}</div>
          <div class="vtcf">Phạm vi mặc định khi gán: <b>${PHAM_VI[v.pv].ten}</b> — ${esc(PHAM_VI[v.pv].mo.toLowerCase())}.
            ${giu.length?`Đang giữ: ${giu.slice(0,6).map(id=>esc(U[id].ten)).join(", ")}${giu.length>6?` và ${giu.length-6} người nữa`:""}.`:""}</div>
        </div>`;
      });
      h += `</div>`;
    });
    h += `<div class="note" style="margin-top:14px"><b>Vì sao không cho tạo vai trò mới ở bản thử này.</b>
      Mười vai đã phủ hết tình huống của một công ty 44 người; mở cho tạo tự do thì sau một năm
      có ba mươi vai gần giống nhau và không ai dám xoá vai nào. Khi lập trình thật, nếu mở
      thì phải kèm hai thứ: <b>bắt buộc ghi vai này khác vai kia ở chỗ nào</b>, và
      <b>cảnh báo khi vai mới trùng quyền với vai đã có</b>.</div>`;
  }

  /* ============ TAB 3 · THỬ & RÀ SOÁT ============ */
  if (PQ_TAB === "thu"){
    const ai = U[PQ_AI] ? PQ_AI : Object.keys(U)[0];
    const dsV = T.filter(t => !PQ_VIEC || t.id === PQ_VIEC);
    const viec = find(PQ_VIEC) || T[0];
    const r = viec ? thuQuyen(ai, viec.id) : null;
    h += `<div class="gvc"><h3 class="gvh">Bàn thử quyền
        <em>— chọn một người và một việc, hệ thống trả lời có làm được không và vì sao</em></h3>
      <div class="tsl">
        <label class="nslb"><span>Người</span>
          <select class="lsel" onchange="setPQ('ai',this.value)">
            ${Object.values(U).sort((a,b)=>capViec(a.id)-capViec(b.id)||a.ten.localeCompare(b.ten,"vi"))
              .map(u=>`<option value="${u.id}" ${ai===u.id?"selected":""}>${esc(u.ten)} — ${esc(u.cd)}</option>`).join("")}
          </select></label>
        <label class="nslb" style="flex:2"><span>Việc</span>
          <select class="lsel" onchange="setPQ('viec',this.value)">
            ${T.slice(0,60).map(t=>`<option value="${t.id}" ${viec&&viec.id===t.id?"selected":""}>${t.id} · ${esc(
              t.mat==="HAN_CHE"?t.ttl+" (hạn chế)":t.ttl)} — ${esc(U[t.lam]?U[t.lam].ten:"—")}</option>`).join("")}
          </select></label>
      </div>
      ${r && viec ? `<div class="tbg">
        ${[["Mở được phiếu này", r.xem, r.xem
              ? (viec.mat!=="HAN_CHE" ? "Việc nội bộ — mọi người trong tầm nhìn đều mở được"
                 : "Có tên trong phiếu, nên lớp bảo mật nới ra cho người này")
              : "Việc hạn chế và người này không có tên trong phiếu"],
           ["Là người thực hiện", r.lam, r.lam?"Đứng tên ở ô người làm":"Không phải người làm việc này"],
           ["Nghiệm thu được", r.duyet, r.duyet
              ? "Là trưởng đơn vị trực tiếp của người làm"
              : (viec.lam===ai ? "KHÔNG — không ai nghiệm thu việc của chính mình, đây là lớp bất biến"
                 : "Không phải người duyệt của việc này")],
           ["Ký thêm ở bậc tiền", r.them, r.them?"Nằm trong chuỗi duyệt tiền của khoản chi này":"Không thuộc chuỗi duyệt tiền"],
           ["Việc nằm trong nhánh mình", r.nhanh, r.nhanh?"Người làm thuộc nhánh người này phụ trách":"Người làm ở nhánh khác"],
          ].map(([a,b,c])=>`<div class="tbr ${b?"co":"khong"}"><span>${b?"✓":"✕"}</span>
            <div><b>${a}</b><i>${esc(c)}</i></div></div>`).join("")}
      </div>
      <div class="tbv">Vai trong việc: <b>${r.vai ? VAI_TEN[r.vai][0]+" · "+VAI_TEN[r.vai][1] : "không mang vai nào"}</b>.
        Kết quả này lấy từ chính <code>xemDuoc()</code>, <code>nguoiDuyet()</code>, <code>raci()</code>
        mà bốn màn làm việc đang dùng — không phải bản mô phỏng riêng.</div>
      <div class="tbq"><b>Quyền hệ thống của ${esc(U[ai].ten)} và nguồn cấp:</b>
        ${QUYEN.map(qq => { const n = nguonQuyen(ai, qq[0]);
          return `<span class="tbqc ${n?"co":""}" title="${n?`qua vai ${n.tenVai}, phạm vi ${n.tenPV}`:"không vai nào cấp"}">${
            n?"✓":"·"} ${esc(qq[1])}${n?`<i>${esc(n.tenVai)}</i>`:""}</span>`; }).join("")}</div>` : ""}
    </div>`;
    h += CU_RA_SOAT();
  }
  return h;
}
/* Bật tắt một quyền trong vai trò. Chốt: không ai tự thêm vào vai quyền mà mình không có. */
function batQuyen(vai, q){
  const v = VAI_TRO[vai]; if (!v) return;
  const co = v.q.includes(q);
  if (!co && !coQuyen(me, q)) return toast("Không thêm được quyền mà chính bạn không có");
  if (co && v.tuDong === (U[me].vt||"NV") && q === "vao_quan_tri")
    return toast("Không tự khoá đường vào Thiết lập của chính vai mình");
  v.q = co ? v.q.filter(x=>x!==q) : [...v.q, q];
  ghiNK(U[me].ten, `${co?"bỏ":"thêm"} quyền “${(QUYEN.find(y=>y[0]===q)||[])[1]}” ${co?"khỏi":"vào"} vai “${v.ten}”`, NOW);
  toast(`${co?"Đã bỏ":"Đã thêm"} quyền — có hiệu lực ngay với ${Object.keys(U).filter(id=>phanCongCua(id).some(x=>x.vai===vai)).length} người`);
  draw();
}
function CU_RA_SOAT(){
  let h = '';
  const dem = {}; Object.keys(U).forEach(id => { const c = capViec(id); dem[c] = (dem[c]||0)+1; });
  /* Đếm quyền theo VAI TRÒ tự động của cấp đó, không đếm theo cột cấp trong QUYEN —
     cột đó nay chỉ còn là ghi chú lịch sử, nguồn sự thật là VAI_TRO. */
  const soQ = c => { const vt = CV_THU.find(k => CHUC_VU[k].cap === c);
    const v = Object.values(VAI_TRO).find(x => x.tuDong === vt);
    return v ? v.q.length : 0; };

  const co = [];
  const giuCua = id => Object.entries(DV).filter(([k,d]) => d.truong === id).map(([k]) => k);
  Object.values(U).forEach(u => {
    const giu = giuCua(u.id), c = capViec(u.id);
    const cu = me; let pham = 0; try { me = u.id; pham = doiCuaToi().length; } finally { me = cu; }
    if (giu.length >= 2) co.push({m:"a", l:"Kiêm nhiệm nhiều đơn vị", ai:u.ten, cd:u.cd,
      vi:`Đang là trưởng của ${giu.length} đơn vị: ${giu.map(k=>DV[k].ten).join(", ")}`,
      hq:`Phạm vi gộp cả ${giu.length} nhánh — ${pham} người`,
      lam:"Bổ nhiệm trưởng thật cho các đơn vị khuyết, phạm vi tự co lại"});
    if (c <= 2 && !giu.length) co.push({m:"a", l:"Cấp cao không giữ đơn vị nào", ai:u.ten, cd:u.cd,
      vi:`Cấp ${c} (${CAP_VAI[c]}) nhưng không làm trưởng đơn vị nào`,
      hq: c === 1 ? `Vẫn thấy toàn công ty nhờ quyền “xem việc toàn công ty”`
                  : `Phạm vi chỉ còn việc có tên mình — ${pham} người dưới quyền`,
      lam: c === 1 ? "Không cần xử lý" : "Gắn vào một đơn vị cụ thể, hoặc cấp quyền xem theo nhánh bằng tay"});
    const sl = Object.values(U).filter(x => x.id !== u.id && nguoiDuyet({lam:x.id}) === u.id).length;
    if (sl > CH.spanTran) co.push({m:"a", l:"Duyệt cho quá nhiều người", ai:u.ten, cd:u.cd,
      vi:`Đang là người duyệt trực tiếp của ${sl} người, ngưỡng đặt ${CH.spanTran}`,
      hq:"Phiếu nằm chờ lâu ở một người — nút thắt nghiệm thu",
      lam:"Tách bớt nhánh, hoặc bổ nhiệm thêm một tầng trưởng"});
  });
  Object.entries(DV).filter(([k,d]) => d.khuyet).forEach(([k,d]) => {
    const cha = DV[d.cha];
    co.push({m:"m", l:"Đơn vị khuyết trưởng", ai:d.ten, cd:`${Object.values(U).filter(u=>u.dv===k).length} người`,
      vi: U[d.truong] ? `Đang do ${esc(U[d.truong].ten)} kiêm nhiệm`
                      : `Chưa ai kiêm nhiệm — đơn vị đang không có người duyệt`,
      hq: U[d.truong] ? `Việc của đơn vị này trôi lên ${cha?esc(cha.ten):"cấp trên"} để nghiệm thu`
                      : `Việc của đơn vị này không có ai nghiệm thu cho tới khi bổ nhiệm`,
      lam:"Bổ nhiệm trưởng, hoặc ghi rõ người được uỷ quyền nghiệm thu"});
  });
  const toanCty = Object.values(U).filter(u => coQuyen(u.id, "xem_toan_cty"));
  const hanChe = T.filter(t => t.mat === "HAN_CHE");
  h += `<h2 class="sh">Rà soát quyền <em>— ${co.length} chỗ cần soát · lỗ hổng quyền thường đến từ cơ cấu lệch, không từ ma trận sai</em></h2>`;
  h += co.length ? `<div class="msp" style="margin-bottom:8px"><table><thead><tr>
      <th style="min-width:178px">Loại</th><th style="min-width:186px">Ai / đơn vị nào</th>
      <th style="min-width:250px">Vì sao lọt vào danh sách</th>
      <th style="min-width:230px">Hệ quả về quyền</th><th style="min-width:250px">Cần làm gì</th></tr></thead><tbody>
    ${co.map(x=>`<tr><td><span class="tag ${x.m}">${x.l}</span></td>
      <td class="cot wr"><b>${esc(x.ai)}</b><div style="font-size:11px;color:var(--mute)">${esc(x.cd)}</div></td>
      <td class="wr" style="font-size:12.5px">${x.vi}</td>
      <td class="wr" style="font-size:12.5px;color:var(--navy2);font-weight:600">${x.hq}</td>
      <td class="wr" style="font-size:12.5px">${esc(x.lam)}</td></tr>`).join("")}
    </tbody></table></div>`
    : `<div class="flag b2"><span class="ic2">✓</span><span class="bd2">Không chỗ nào cần soát.</span></div>`;
  h += `<div class="pqrs">
      <div class="pqrs1"><span>Người xem được toàn công ty</span><b>${toanCty.length}</b>
        <i>${toanCty.map(u=>esc(u.ten)).join(" · ")}</i></div>
      <div class="pqrs1"><span>Việc mức Hạn chế</span><b>${hanChe.length}</b>
        <i>${hanChe.length ? `${[...new Set(hanChe.map(t=>U[t.lam]?U[t.lam].ten:"—"))].slice(0,4).join(" · ")} thực hiện · mỗi lượt mở đều vào nhật ký` : "chưa có việc nào"}</i></div>
      <div class="pqrs1"><span>Đơn vị khuyết trưởng</span><b>${Object.values(DV).filter(d=>d.khuyet).length}</b>
        <i>trên ${Object.keys(DV).length} đơn vị — mỗi chỗ khuyết là một tuyến duyệt đi vòng</i></div>
      <div class="pqrs1"><span>Lượt mở việc mật đã ghi</span><b>${NK.filter(x=>x.viec&&x.viec.indexOf("Hạn chế")>=0).length}</b>
        <i>xem đủ ở Thiết lập › Nhật ký</i></div>
    </div>`;

  /* ---- G. Ai đang giữ quyền gì ---- */
  h += `<h2 class="sh">Ai đang giữ quyền gì <em>— ${Object.keys(U).length} người, quyền suy từ cấp nên không có ngoại lệ gán tay</em></h2>
    <div class="pqng">${[1,2,3,4].map(c=>{
      const ds = Object.values(U).filter(u => capViec(u.id) === c);
      if (!ds.length) return "";
      return `<div class="pqng1"><div class="pqngh"><b>${CAP_VAI[c]}</b>
          <span>${ds.length} người · ${soQ(c)}/${QUYEN.length} quyền</span></div>
        <div class="pqngb">${ds.map(u=>`<span class="pqp" onclick="setPQ('ai','${u.id}')" title="Chọn người này để thử quyền">
          ${avHTML(u.id,22)}${esc(u.ten)}</span>`).join("")}</div>
        <div class="pqngq">${QUYEN.filter(q=>q[2].includes(c)).map(q=>`<i>${q[1]}</i>`).join("")}</div>
      </div>`;}).join("")}</div>`;

  h += `<div class="vd" style="margin-top:16px"><b>Chỗ bản chạy thử chưa làm: đăng nhập thật.</b>
    Hiện đổi vai bằng một nút bấm nên mọi thứ ở trên kiểm chứng được ngay, nhưng chưa có mật khẩu,
    phiên làm việc, khoá tài khoản sau n lần sai, và thu hồi quyền khi nghỉ việc. Bốn thứ đó là hạng mục
    bắt buộc của bản lập trình thật. Riêng ba lớp quyền ở trên đã chạy đúng ngay trong bản thử —
    lọc thật ở cả bốn màn danh sách, ở thanh điều hướng và ở các tab con của Thiết lập.</div>`;
  return h;
}

/* Bảng thuật ngữ — viết ra để bốn cửa sổ và người bàn giao dùng chung một nghĩa.
   Không viết ra thì mỗi lần thêm màn hình lại đẻ thêm một cách gọi. */
const THUAT_NGU = [
  ["Quá hạn", "Việc <b>đang mở</b> và đã qua hạn cam kết. Là <b>trạng thái hôm nay</b>, còn sửa được.",
   "quaHan(t)", "Việc của tôi · Điều hành · Theo dõi · Cá nhân"],
  ["Trễ", "Việc <b>đến hạn trong kỳ</b> mà không về đích đúng hạn — gồm cả việc đã xong nhưng nộp muộn. Là <b>kết quả của kỳ</b>, đã chốt.",
   "treTruoc trong soLieuKy()", "Giao ban · Đã xong"],
  ["Việc đang mở", "Việc chưa được nghiệm thu xong. Không tính việc đã đóng.",
   "viecMo(t)", "Mọi cửa sổ"],
  ["Cần can thiệp", "Việc đang mở có ít nhất một cảnh báo nguy cơ — <b>chưa chắc đã quá hạn</b>.",
   "canCanThiep(t)", "Điều hành · Theo dõi · Dự án"],
  ["Đang tắc", "Việc đang mở nhưng dừng lại chờ người khác: chờ nghiệm thu, chờ trả lời ý kiến, hoặc bị trả lại.",
   "yKien / CHO_DUYET / TRA_LAI", "Giao ban · Cá nhân"],
  ["Dừng đồng hồ", "Việc quá hạn nhưng <b>không tính là quá hạn</b> vì đang chờ bên ngoài: có ý kiến chưa trả lời, hoặc ở trạng thái riêng loại chờ ngoài.",
   "dangDung(t)", "Phiếu việc · mọi phép đếm quá hạn"],
  ["Quá tải", "Tổng điểm độ khó của việc đang mở trong tuần vượt sức một tuần.",
   "taiTuanNay(id) > SUC_TUAN", "Điều hành · Cá nhân · Giao ban"],
];
/* Màn cấu hình trợ lý. Ba thứ người quản trị phải quyết được, và ba thứ đó
   phải nằm trên MỘT màn để thấy hệ quả của nhau:
     · AI được dùng — mở rộng thì hữu ích, mở hết thì tốn tiền và tăng bề mặt rò dữ liệu.
     · DỮ LIỆU NÀO ĐƯỢC GỬI ĐI — chỗ nguy hiểm nhất của cả tính năng.
     · TIÊU BAO NHIÊU — không có trần thì một vòng lặp hỏng đốt hết ngân sách quý. */
/* Màn quản trị dữ liệu ngoài. Ba việc người quản trị phải làm được:
     · Thêm/sửa một diễn biến, kèm ĐỦ BỐN Ô: ảnh hưởng · ai lo · làm gì · hạn.
     · Xác nhận hay bỏ xác nhận một đánh giá ảnh hưởng.
     · Sửa mốc đối chiếu và ghi rõ mốc đó lấy ở đâu.
   Không có màn này thì dữ liệu ngoài nằm cứng trong mã, và ba tháng sau không ai
   dám sửa vì sợ gãy. */
let DN_TAB = "tin", DN_SUA = null;
function setDN(k){ DN_TAB = k; DN_SUA = null; draw(); }
function suaTin(ma){ DN_SUA = (DN_SUA === ma) ? null : ma; draw(); }
function datTin(ma, k, v){
  const t = TIN_NGOAI.find(x => x.ma === ma); if (!t) return;
  t[k] = v; t.xacNhan = false;      /* sửa nội dung thì đánh giá phải xác nhận lại */
  ghiNK(U[me].ten, `sửa diễn biến ngoài “${t.ten}” (${k}) — đánh giá phải xác nhận lại`, NOW);
  draw();
}
function themTin(){
  if (!coQuyen(me,"sua_tham_so")) return toast("Bạn không có quyền thêm diễn biến");
  const ma = "TN" + String(TIN_NGOAI.length + 1).padStart(2,"0");
  TIN_NGOAI.unshift({ma, nhom:"CHINH_SACH", ten:"Diễn biến mới — sửa tên", so:null, hieuLuc:null,
    nd:"", nguon:null, url:null, ngay:fmtDY(TODAY), ah:"THEO_DOI", xacNhan:false,
    viSao:"", lam:"", dv:null, han:null});
  DN_SUA = ma;
  ghiNK(U[me].ten, "thêm một diễn biến bên ngoài", NOW);
  draw();
}
function xoaTin(ma){
  const i = TIN_NGOAI.findIndex(x => x.ma === ma); if (i < 0) return;
  ghiNK(U[me].ten, `xoá diễn biến ngoài “${TIN_NGOAI[i].ten}”`, NOW);
  TIN_NGOAI.splice(i,1); DN_SUA = null; toast("Đã xoá"); draw();
}
function datMoc(ma, k, v){
  const x = DOI_CHIEU.find(y => y.ma === ma); if (!x) return;
  if (k === "moc" || k === "lo" || k === "hi"){
    const n = Number(v); if (isNaN(n)) return;
    if (k === "moc") x.moc = n; else if (k === "lo") x.dai = [n, x.dai[1]]; else x.dai = [x.dai[0], n];
  } else x[k] = v;
  ghiNK(U[me].ten, `sửa mốc đối chiếu “${x.ten}” (${k} = ${v})`, NOW);
  draw();
}

function vDuLieuNgoai(){
  const TB = [["tin","Diễn biến bên ngoài",`${TIN_NGOAI.length} mục`],
              ["moc","Mốc đối chiếu",`${DOI_CHIEU.length} chỉ số`]];
  let h = `<p class="sub">Đây là phần <b>duy nhất</b> của phần mềm mà số liệu <b>không tự tính ra được</b> —
    phải có người nhập và có người chịu trách nhiệm về nó. Vì vậy mọi mục đều bắt buộc mang
    <b>nguồn · ngày · đánh giá ảnh hưởng · người chịu trách nhiệm</b>; thiếu ô nào thì màn Tham mưu tự đánh dấu đỏ.</p>
    <div class="tct">${TB.map(([k,n,d])=>`<button class="${DN_TAB===k?"on":""}" onclick="setDN('${k}')">
      <b>${n}</b><i>${d}</i></button>`).join("")}</div>`;

  if (DN_TAB === "tin"){
    const chuaXN = TIN_NGOAI.filter(x=>!x.xacNhan).length;
    const thieu = TIN_NGOAI.filter(x=>!x.nguon || !x.dv || !x.lam);
    h += oKPI([
      ["Diễn biến đang theo", TIN_NGOAI.length, `${TIN_NGOAI.filter(x=>x.nhom==="CHINH_SACH").length} chính sách · ${TIN_NGOAI.filter(x=>x.nhom!=="CHINH_SACH").length} thị trường và ngành`, "var(--navy)"],
      ["Ảnh hưởng cao", TIN_NGOAI.filter(x=>x.ah==="CAO").length, "phải có việc cụ thể và có hạn", TIN_NGOAI.filter(x=>x.ah==="CAO").length?"var(--red)":"#1B5E20"],
      ["Đánh giá chưa xác nhận", chuaXN, chuaXN?"chưa được đưa vào phần kết luận":"đã xác nhận hết", chuaXN?"var(--amb)":"#1B5E20"],
      ["Thiếu ô bắt buộc", thieu.length, thieu.length?"thiếu nguồn, người chịu trách nhiệm hoặc việc phải làm":"đủ cả bốn ô", thieu.length?"var(--red)":"#1B5E20"],
      /* Số ngoài đã cũ nguy hiểm hơn không có số, vì người đọc tưởng nó còn đúng. */
      ["Nguồn quá hạn cập nhật", TIN_NGOAI.filter(x=>soNgoaiCu(x.ngay).cu).length + DOI_CHIEU.filter(x=>soNgoaiCu(x.ngay).cu).length,
        `quá ${HAN_SO_NGOAI} ngày kể từ ngày công bố`,
        (TIN_NGOAI.filter(x=>soNgoaiCu(x.ngay).cu).length + DOI_CHIEU.filter(x=>soNgoaiCu(x.ngay).cu).length)?"var(--amb)":"#1B5E20"],
    ]);
    h += `<div class="lb" style="margin-bottom:12px"><button class="btn pri" onclick="themTin()">Thêm diễn biến</button>
      <span style="font-size:11.5px;color:var(--mute)">Mỗi lần thêm hoặc sửa đều vào nhật ký.
        Sửa nội dung thì đánh giá ảnh hưởng <b>tự về trạng thái chưa xác nhận</b> — vì nội dung đổi thì đánh giá cũ có thể không còn đúng.</span></div>`;
    h += `<div class="tdkh"><table><thead><tr>
        <th style="min-width:230px">Diễn biến</th><th style="min-width:120px">Nhóm</th>
        <th style="min-width:118px">Ảnh hưởng</th><th style="min-width:130px">Ai lo</th>
        <th style="min-width:98px">Hạn</th><th style="min-width:118px">Nguồn</th>
        <th style="width:150px"></th></tr></thead><tbody>
      ${TIN_NGOAI.map(x=>`<tr class="${!x.nguon||!x.dv?"gang2":""} ${DN_SUA===x.ma?"ckchon":""}">
        <td class="cot"><b>${esc(x.ten)}</b>${x.so?` <span class="tnso">${esc(x.so)}</span>`:""}
          <div style="font-size:11px;color:var(--mute)">${x.hieuLuc?`hiệu lực ${esc(x.hieuLuc)} · `:""}${
            x.xacNhan?`<b style="color:#1B5E20">đã xác nhận</b>`:`<b style="color:var(--amb)">chưa xác nhận</b>`}</div></td>
        <td style="font-size:12px">${TIN_NHOM[x.nhom].ic} ${esc(TIN_NHOM[x.nhom].ten)}</td>
        <td><span class="tnah ${AH_MUC[x.ah].m}">${esc(AH_MUC[x.ah].ten)}</span></td>
        <td style="font-size:12px">${x.dv&&DV[x.dv]?esc(DV[x.dv].ten):`<b style="color:var(--red)">chưa giao</b>`}</td>
        <td style="font-size:12px">${x.han?esc(x.han):`<i style="color:var(--mute)">—</i>`}</td>
        <td style="font-size:11.5px">${(()=>{ if (!x.nguon) return `<b style="color:var(--red)">chưa có</b>`;
          const c = soNgoaiCu(x.ngay);
          return `${esc(x.nguon.slice(0,26))}<div style="font-size:10px;color:${c.cu?"var(--red)":"var(--mute)"}">${
            c.thieu ? "chưa có ngày" : `${esc(x.ngay)}${c.cu?` · đã ${c.ngay} ngày, nên cập nhật`:""}`}</div>`; })()}</td>
        <td><button class="btn sm" onclick="suaTin('${x.ma}')">${DN_SUA===x.ma?"Đóng":"Sửa"}</button>
          <button class="btn sm" onclick="xacNhanTin('${x.ma}')">${x.xacNhan?"Bỏ XN":"Xác nhận"}</button></td>
      </tr>`).join("")}</tbody></table></div>`;
    const sx = TIN_NGOAI.find(x => x.ma === DN_SUA);
    if (sx) h += `<div class="pqg" style="margin-top:14px">
      <div class="pqgh"><b>Sửa: ${esc(sx.ten)}</b><span>mã ${esc(sx.ma)}</span>
        <button class="btn sm" onclick="xoaTin('${sx.ma}')">Xoá</button>
        <button class="btn sm" onclick="suaTin('${sx.ma}')">Đóng</button></div>
      <div class="pqgb">
        <label class="nslb" style="flex:2"><span>Tên diễn biến</span>
          <input class="inp" value="${esc(sx.ten)}" onchange="datTin('${sx.ma}','ten',this.value)"></label>
        <label class="nslb"><span>Nhóm</span>
          <select class="lsel" onchange="datTin('${sx.ma}','nhom',this.value)">
            ${Object.entries(TIN_NHOM).map(([k,v])=>`<option value="${k}" ${sx.nhom===k?"selected":""}>${v.ic} ${v.ten}</option>`).join("")}
          </select></label>
        <label class="nslb"><span>Mức ảnh hưởng</span>
          <select class="lsel" onchange="datTin('${sx.ma}','ah',this.value)">
            ${Object.entries(AH_MUC).map(([k,v])=>`<option value="${k}" ${sx.ah===k?"selected":""}>${v.ten}</option>`).join("")}
          </select></label>
        <label class="nslb"><span>Số hiệu văn bản</span>
          <input class="inp" value="${esc(sx.so||"")}" placeholder="vd 273/2026/NĐ-CP" onchange="datTin('${sx.ma}','so',this.value)"></label>
        <label class="nslb"><span>Ngày hiệu lực</span>
          <input class="inp" value="${esc(sx.hieuLuc||"")}" placeholder="dd/mm/yyyy" onchange="datTin('${sx.ma}','hieuLuc',this.value)"></label>
        <label class="nslb"><span>Đơn vị chịu trách nhiệm</span>
          <select class="lsel" onchange="datTin('${sx.ma}','dv',this.value)">
            <option value="">— chưa giao —</option>
            ${Object.entries(DV).filter(([k])=>k!=="HDQT").map(([k,d])=>`<option value="${k}" ${sx.dv===k?"selected":""}>${esc(d.ten)}</option>`).join("")}
          </select></label>
        <label class="nslb"><span>Hạn phải xong</span>
          <input class="inp" value="${esc(sx.han||"")}" placeholder="dd/mm/yyyy" onchange="datTin('${sx.ma}','han',this.value)"></label>
        <label class="nslb" style="flex:2"><span>Nguồn</span>
          <input class="inp" value="${esc(sx.nguon||"")}" placeholder="Cơ quan công bố" onchange="datTin('${sx.ma}','nguon',this.value)"></label>
        <label class="nslb" style="flex:2"><span>Đường dẫn kiểm chứng</span>
          <input class="inp" value="${esc(sx.url||"")}" onchange="datTin('${sx.ma}','url',this.value)"></label>
        <label class="nslb"><span>Ngày công bố</span>
          <input class="inp" value="${esc(sx.ngay||"")}" onchange="datTin('${sx.ma}','ngay',this.value)"></label>
      </div>
      <div class="pqgb" style="margin-top:11px">
        <label class="nslb" style="flex:1 1 100%"><span>Nội dung</span>
          <textarea class="inp" rows="2" onchange="datTin('${sx.ma}','nd',this.value)">${esc(sx.nd||"")}</textarea></label>
        <label class="nslb" style="flex:1 1 100%"><span>Ảnh hưởng tới FOREVER — cụ thể, không viết “có thể tác động tới doanh nghiệp”</span>
          <textarea class="inp" rows="2" onchange="datTin('${sx.ma}','viSao',this.value)">${esc(sx.viSao||"")}</textarea></label>
        <label class="nslb" style="flex:1 1 100%"><span>Phải làm gì — một việc làm được, không viết “tiếp tục theo dõi”</span>
          <textarea class="inp" rows="2" onchange="datTin('${sx.ma}','lam',this.value)">${esc(sx.lam||"")}</textarea></label>
      </div>
      <div class="pqgf"><button class="btn pri" onclick="xacNhanTin('${sx.ma}')">${sx.xacNhan?"Bỏ xác nhận":"Xác nhận đánh giá ảnh hưởng"}</button>
        <button class="btn" onclick="tinThanhViec('${sx.ma}')">Giao thành việc</button>
        <span>Xác nhận nghĩa là bạn chịu trách nhiệm về đánh giá này — nó sẽ được đưa vào phần kết luận của bản tham mưu.</span></div>
    </div>`;
  }

  if (DN_TAB === "moc"){
    h += `<div class="note" style="margin-bottom:13px"><b>Ba loại mốc, độ tin cậy khác hẳn nhau, đừng trộn.</b>
      ${Object.entries(DC_LOAI).map(([k,v])=>`<div style="margin-top:6px"><span class="bcnl ${v.m}">${v.ten}</span>
        <span style="font-size:12px;margin-left:7px">${v.mo}</span></div>`).join("")}</div>`;
    h += `<div class="tdkh"><table><thead><tr>
        <th style="min-width:210px">Chỉ số</th><th style="min-width:126px">Loại mốc</th>
        <th class="num" style="min-width:78px">Mốc</th><th style="min-width:140px">Dải chấp nhận</th>
        <th class="num">Số công ty</th><th style="min-width:240px">Nguồn mốc</th></tr></thead><tbody>
      ${(()=>{ const kT=khoangKy("TUAN",-1), kN=khoangKy("TUAN",0);
        const S2=soLieuKy(T.filter(trongTamNhin),kT,kN);
        return DOI_CHIEU.map(x=>{ const gt=x.lay(S2), c=chamMoc(x,gt);
        return `<tr class="${c.muc===2?"gang2":""}">
          <td class="cot"><b>${esc(x.ten)}</b>
            <div style="font-size:11px;color:var(--mute)">${x.chieu==="cao_tot"?"càng cao càng tốt":"càng thấp càng tốt"} · ${esc(x.donVi)}</div></td>
          <td><select class="lsel" style="max-width:none" onchange="datMoc('${x.ma}','loai',this.value)">
            ${Object.entries(DC_LOAI).map(([k,v])=>`<option value="${k}" ${x.loai===k?"selected":""}>${v.ten}</option>`).join("")}
          </select></td>
          <td class="num"><input class="inp" style="width:70px;text-align:right" value="${x.moc}"
            onchange="datMoc('${x.ma}','moc',this.value)"></td>
          <td><input class="inp" style="width:56px;text-align:right" value="${x.dai[0]}" onchange="datMoc('${x.ma}','lo',this.value)">
            <span style="color:var(--mute)"> – </span>
            <input class="inp" style="width:56px;text-align:right" value="${x.dai[1]}" onchange="datMoc('${x.ma}','hi',this.value)"></td>
          <td class="num"><b style="color:${c.muc===0?"#1B5E20":c.muc===2?"var(--red)":"var(--amb)"}">${gt!=null?so1(gt):"—"}</b></td>
          <td><input class="inp" style="width:100%" value="${esc(x.nguon)}" onchange="datMoc('${x.ma}','nguon',this.value)">
            <div style="font-size:10.5px;color:${!x.ngay||soNgoaiCu(x.ngay).cu?"var(--red)":"var(--mute)"};margin-top:3px">${
              x.ngay?`đặt ${esc(x.ngay)}${soNgoaiCu(x.ngay).cu?` · đã ${soNgoaiCu(x.ngay).ngay} ngày, nên soát lại`:""}`
                    :"CHƯA CÓ NGÀY VÀ NGUỒN CHÍNH THỨC — chưa dùng để ra quyết định nhân sự"}</div></td>
        </tr>`; }).join(""); })()}
      </tbody></table></div>`;
    h += `<div class="vd" style="margin-top:14px"><b>Vì sao không cho thêm mốc tự do ở bản thử này.</b>
      Mỗi mốc phải khai một hàm <code>lay(S)</code> lấy số nội bộ tương ứng, và hàm đó
      <b>phải gọi lại phép tính đã có</b> chứ không viết bản thứ hai. Đã mắc lỗi này một lần:
      tỷ lệ trả lại tự dò chữ trong nhật ký việc và ra 0% trong khi cửa sổ Cá nhân in 29–43%.
      Khi lập trình thật, phần thêm mốc phải kèm một danh sách <b>chỉ số nội bộ đã có sẵn</b>
      để người quản trị chọn, không cho gõ công thức tự do.</div>`;
  }
  return h;
}

function vTroLyCH(){
  const pt = Math.min(100, Math.round(AI_CH.daTieu / AI_CH.tranThang * 100));
  let h = `<p class="sub">Trợ lý đọc <b>đúng phần dữ liệu người hỏi được đọc</b>, không hơn.
    Số liệu do phần mềm tính sẵn rồi mới gửi sang — trợ lý viết nhận định, không tự cộng trừ.
    Nhờ vậy con số trong câu trả lời luôn khớp con số trên màn hình.</p>`;

  h += oKPI([
    ["Trạng thái", AI_CH.bat?"Đang bật":"Đang tắt",
      AI_CH.bat?`${HANG_THU.map(k=>`${Object.keys(U).filter(id=>hangCua(id).ma===k).length} ${HANG_AI[k].ten.replace("Hạng ","").toLowerCase()}`).join(" · ")}`:"không ai hỏi được",
      AI_CH.bat?"#1B5E20":"var(--mute)"],
    ["Chi phí tháng này", AI_CH.daTieu.toLocaleString("vi")+" đ", `trần ${AI_CH.tranThang.toLocaleString("vi")} đ · đã dùng ${pt}%`,
      pt>=90?"var(--red)":pt>=70?"var(--amb)":"var(--navy)"],
    ["Lượt hỏi phiên này", AI_PHIEN.length, "mọi lượt đều vào nhật ký", "var(--navy)"],
    ["Người được gán tay khác vị trí", HANG_GAN.length, HANG_GAN.length?"đều có người gán, ngày và lý do":"chưa ai", "var(--navy)"],
  ]);

  h += `<div class="gvc"><h3 class="gvh">Ba hạng sử dụng
      <em>— mỗi hạng bó đủ bốn thứ: nhiệm vụ nào · đọc tới đâu · mô hình nào · tiêu bao nhiêu</em></h3>
    <div class="hgl">${HANG_THU.map(k => { const H = HANG_AI[k];
      const nguoi = Object.keys(U).filter(id => hangCua(id).ma === k);
      const tay = HANG_GAN.filter(x => x.hang === k).length;
      const tieu = nguoi.reduce((a,id)=>a+mucDung(id).tien,0);
      return `<div class="hgc h${k}">
        <div class="hgh"><span class="hgi">${H.ic}</span>
          <div><b>${esc(H.ten)}</b><i>${H.tuDong.map(v=>CHUC_VU[v].ten).join(" · ")}</i></div>
          <span class="hgn">${nguoi.length}<em>người</em></span></div>
        <div class="hgm">${esc(H.mo)}</div>
        <div class="hgr"><span>Nhiệm vụ</span><div>${Object.keys(NHIEM_VU).map(n =>
          `<i class="${H.nv.includes(n)?"co":""}" title="${esc(NHIEM_VU[n].ten)}">${NHIEM_VU[n].ic}</i>`).join("")}
          <b>${H.nv.length}/${Object.keys(NHIEM_VU).length}</b></div></div>
        <div class="hgr"><span>Đọc tới</span><div><b>${PHAM_VI[H.pv].ten}</b>
          <em>${esc(PHAM_VI[H.pv].mo.toLowerCase())}</em></div></div>
        <div class="hgr"><span>Mô hình</span><div>${H.moHinh.map(x=>`<u class="${x===H.macDinh?"md":""}">${
          MO_HINH[x].ten.replace("Claude ","")}</u>`).join("")}
          <em>${H.chonMoHinh?"người dùng tự chọn":"cố định, không chọn được"}</em></div></div>
        <div class="hgr"><span>Hạn mức</span><div><b>${H.luotNgay}</b> lượt/ngày ·
          <b>${(H.tranThang/1000).toLocaleString("vi")}k đ</b>/tháng mỗi người
          <em>tháng này cả hạng đã tiêu ${tieu.toLocaleString("vi")} đ</em></div></div>
        <div class="hgr"><span>Gói việc</span><div><b>${H.soViec}</b> dòng tối đa
          ${H.ngoai?`<u class="ok">có dữ liệu đối chiếu ngoài</u>`:`<em>không gửi dữ liệu ngoài</em>`}</div></div>
        ${tay?`<div class="hgt">${tay} người được gán tay vào hạng này</div>`:""}
      </div>`; }).join("")}</div>
    <div class="note" style="margin-top:12px;margin-bottom:0"><b>Vì sao chia ba hạng chứ không một công tắc.</b>
      Bốn thứ phải khác nhau theo vai, không chỉ một: nhân viên không cần “so sánh bốn khối”;
      trưởng phòng không được hỏi ra số của phòng khác; mô hình mạnh đắt gấp
      ${Math.round(MO_HINH["claude-opus-4-6"].ra / MO_HINH["claude-haiku-4-6"].ra)} lần nên phải để dành cho việc khó;
      và không có hạn mức theo người thì một người hỏi cả ngày là hết quỹ chung mà không ai biết là ai.</div>
    <div class="warn" style="margin-top:12px"><b>Chốt chống cửa hậu.</b>
      Phạm vi đọc thật sự là <b>GIAO</b> của phạm vi hạng và quyền thật của người đó —
      hạng chỉ <b>thu hẹp</b>, không bao giờ nới rộng. Nếu hạng nới rộng được thì chỉ cần nâng hạng AI
      cho một người là họ đọc được cả công ty mà không ai thấy, đi vòng qua toàn bộ hệ thống phân quyền.
      Ngoài ra không ai cấp được cho người khác hạng cao hơn hạng của chính mình.</div></div>`;

  /* ---- bảng phân hạng từng người ---- */
  const dsN = Object.values(U).sort((a,b) =>
    (HANG_THU.indexOf(hangCua(a.id).ma) - HANG_THU.indexOf(hangCua(b.id).ma))
    || a.ten.localeCompare(b.ten,"vi"));
  h += `<div class="gvc" style="margin-top:14px"><h3 class="gvh">Phân hạng từng người
      <em>— mặc định suy theo vị trí; gán tay khi một người cần khác vị trí của họ</em></h3>
    <div class="tdkh"><table><thead><tr>
      <th style="min-width:196px">Người</th><th style="min-width:120px">Vị trí</th>
      <th style="min-width:230px">Hạng sử dụng AI</th>
      <th style="min-width:150px">Đọc tới (thực tế)</th>
      <th class="num">Lượt hôm nay</th><th class="num">Chi phí tháng</th>
      <th style="min-width:210px">Lý do gán tay</th></tr></thead><tbody>
      ${dsN.map(u => { const hh = hangCua(u.id), d = mucDung(u.id);
        const pv = pvAI(u.id), hep = PHAM_VI[pv].r < PHAM_VI[hh.pv].r;
        return `<tr class="${d.ngay >= hh.luotNgay ? "gang2" : ""}">
          <td class="cot"><div style="display:flex;align-items:center;gap:9px">${avHTML(u.id,26)}
            <div><b>${esc(u.ten)}</b><div style="font-size:11px;color:var(--mute)">${esc(u.cd)}</div></div></div></td>
          <td><span class="tag ${capViec(u.id)===1?"r":capViec(u.id)===2?"a":capViec(u.id)===3?"":"m"}">${CHUC_VU[u.vt||"NV"].ten}</span></td>
          <td><select class="lsel" style="max-width:none" onchange="ganHang('${u.id}',this.value,'Đặt tay ở màn Trợ lý AI')">
              <option value="" ${hh.tuDong?"selected":""}>Tự động theo vị trí — ${HANG_AI[HANG_THU.find(k=>HANG_AI[k].tuDong.includes(u.vt||"NV"))||"NV"].ten}</option>
              ${HANG_THU.map(k=>`<option value="${k}" ${!hh.tuDong&&hh.ma===k?"selected":""}>${HANG_AI[k].ic} ${HANG_AI[k].ten}</option>`).join("")}
            </select></td>
          <td><b style="font-size:12.5px">${PHAM_VI[pv].ten}</b>${hep
            ? `<div style="font-size:10.5px;color:var(--amb)">hẹp hơn hạng — quyền thật chỉ tới đây</div>` : ""}</td>
          <td class="num ${d.ngay >= hh.luotNgay ? "xau" : ""}">${d.ngay}/${hh.luotNgay}</td>
          <td class="num">${d.tien ? d.tien.toLocaleString("vi") : "—"}</td>
          <td class="wr" style="font-size:11.5px;color:var(--mute)">${hh.gan
            ? `${esc(hh.gan.ly)}<div style="font-size:10.5px">${esc(U[hh.gan.boi]?U[hh.gan.boi].ten:"—")} · ${esc(hh.gan.ngay)}</div>`
            : ""}</td></tr>`; }).join("")}
    </tbody></table></div></div>`;

  /* ---- catalogue mô hình ---- */
  h += `<div class="gvc" style="margin-top:14px"><h3 class="gvh">Ba mô hình và khi nào dùng cái nào
      <em>— chỉ Ban Giám đốc chọn được; hai hạng dưới dùng mô hình cố định của hạng</em></h3>
    <div class="mhl">${MH_THU.map(k => { const M = MO_HINH[k];
      const dung = AI_PHIEN.filter(x => x.mh === k).length;
      return `<div class="mhc m${M.manh}">
        <div class="mhh"><b>${esc(M.ten)}</b>
          <span class="mhs">${"●".repeat(M.manh)}${"○".repeat(3-M.manh)}</span></div>
        <div class="mhg"><span>${(M.vao/1000).toLocaleString("vi")}k đ</span><i>1 triệu token vào</i>
          <span>${(M.ra/1000).toLocaleString("vi")}k đ</span><i>1 triệu token ra</i></div>
        <div class="mhd"><b>Dùng cho:</b> ${esc(M.dung)}</div>
        <div class="mhu">${esc(M.luu)}</div>
        <div class="mhf">${HANG_THU.filter(x=>HANG_AI[x].moHinh.includes(k)).map(x=>
          `<span>${HANG_AI[x].ic} ${HANG_AI[x].ten.replace("Hạng ","")}</span>`).join("")}
          ${dung?`<em>${dung} lượt trong phiên này</em>`:""}</div>
      </div>`; }).join("")}</div>
    <div class="note" style="margin-top:12px;margin-bottom:0">Giá ghi ở đây để <b>so tương quan</b>,
      không phải để tính tiền chính xác — số tiền thật do máy chủ trả về sau mỗi lượt gọi và ghi vào nhật ký.
      Cập nhật giá khi bảng giá đổi, nếu không thì hạn mức tính sai.</div></div>`;

  h += `<div class="gvc" style="margin-top:14px"><h3 class="gvh">Dữ liệu nào được gửi đi
      <em>— chỗ phải cẩn thận nhất của cả tính năng</em></h3>
    <div class="aic">
      ${[["Phạm vi việc","Chỉ việc lọt qua trongTamNhin() của chính người hỏi",
          "Cố định, không đổi được","Trợ lý không được là đường vòng để đọc thứ giao diện đã chặn"],
         ["Việc mật", AI_CH.giauViecMat?"Thay tiêu đề bằng mã việc trước khi gửi":"GỬI NGUYÊN VĂN tiêu đề",
          null,"Tắt chỉ khi máy chủ mô hình đặt trong mạng nội bộ công ty"],
         ["Dữ liệu cá nhân","Tên, chức danh, đơn vị của người trong việc",
          "Cố định","Không có tên thì trợ lý không chỉ được ai phải quyết — mất hết tác dụng"],
         ["Tiền","Ngưỡng chi và giá trị khoản chi vượt ngưỡng",
          "Cố định","Cần cho nhiệm vụ phân tích việc chờ ký"],
         ["KHÔNG gửi","Lịch sử chấm điểm từng người, nhật ký truy cập, ảnh đại diện, tệp đính kèm",
          "Cố định","Không nhiệm vụ nào cần tới, gửi đi là rủi ro không đổi lấy gì"],
        ].map(([a,b,c,d])=>`<div class="aicr"><b>${esc(a)}</b>
          <span>${esc(b)}</span>
          <div>${c ? `<i>${esc(c)}</i>` :
            `<button class="btn sm" onclick="AI_CH.giauViecMat=!AI_CH.giauViecMat;
              ghiNK(U[me].ten, 'đổi cách xử lý việc mật khi gửi trợ lý: '+(AI_CH.giauViecMat?'giấu tiêu đề':'gửi nguyên văn'), NOW);draw()">${
              AI_CH.giauViecMat?"Cho gửi nguyên văn":"Bật giấu tiêu đề"}</button>`}</div>
          <em>${esc(d)}</em></div>`).join("")}
    </div></div>`;

  h += `<div class="gvc" style="margin-top:14px"><h3 class="gvh">Đường gọi và chi phí</h3>
    <div class="tsl">
      <label class="nslb"><span>Đường dẫn máy chủ công ty</span>
        <input class="inp" value="${esc(AI_CH.duongDan)}" oninput="AI_CH.duongDan=this.value"></label>
      <label class="nslb"><span>Mô hình</span>
        <input class="inp" value="${esc(AI_CH.moHinh)}" oninput="AI_CH.moHinh=this.value"></label>
      <label class="nslb"><span>Trần chi phí tháng (đ)</span>
        <input class="inp" type="number" value="${AI_CH.tranThang}" oninput="AI_CH.tranThang=+this.value||0"></label>
      <label class="nslb"><span>Trần dòng việc mỗi gói</span>
        <input class="inp" type="number" value="${AI_CH.soViecToiDa}" oninput="AI_CH.soViecToiDa=+this.value||10"></label>
    </div>
    <div class="tltb" style="margin-top:13px"><span style="width:${pt}%;background:${
      pt>=90?"#C0392B":pt>=70?"#C8901A":"var(--navy2)"}"></span></div>
    <div style="font-size:11.5px;color:var(--mute);margin-top:6px">Chạm trần thì trợ lý khoá lại,
      không tự nâng. Đây là chốt duy nhất chặn được một vòng lặp hỏng đốt hết ngân sách quý.</div>
    <div class="warn" style="margin-top:13px"><b>Khoá API không bao giờ đặt trong trang web.</b>
      Trình duyệt gọi <code>${esc(AI_CH.duongDan)}</code> của công ty; máy chủ mới gắn khoá và gọi Claude.
      Đặt khoá trong trang là công khai khoá đó cho mọi nhân viên biết bấm F12.
      Bản chạy thử này chưa có máy chủ nên câu trả lời được <b>dựng tại chỗ từ chính gói dữ liệu</b> —
      số liệu là số thật, chỉ phần diễn đạt là mẫu cố định.</div></div>`;

  h += `<div class="gvc" style="margin-top:14px"><h3 class="gvh">Sáu nhiệm vụ
      <em>— mỗi nhiệm vụ khai rõ gói gì, trả về gì; không khai thì mỗi người hỏi một kiểu</em></h3>
    <div class="msp"><table><thead><tr><th style="min-width:168px">Nhiệm vụ</th>
      <th class="wr" style="min-width:250px">Dùng khi nào</th>
      <th class="wr" style="min-width:270px">Trả về cái gì</th>
      <th style="min-width:186px">Hạng được dùng</th></tr></thead><tbody>
      ${Object.entries(NHIEM_VU).map(([k,v])=>`<tr><td class="cot"><b>${v.ic} ${esc(v.ten)}</b>
        <div style="font-size:11px;color:var(--mute)">gói: ${v.goi==="pm"?"bản đồ màn hình, không gửi dữ liệu việc":"số liệu kỳ"}</div></td>
        <td class="wr" style="font-size:12.5px">${esc(v.mo)}</td>
        <td class="wr" style="font-size:12.5px">${esc(v.ra)}</td>
        <td style="font-size:12px">${HANG_THU.filter(x=>HANG_AI[x].nv.includes(k)).map(x=>
          `<span class="tag ${x==="DH"?"r":x==="TDV"?"a":"m"}">${HANG_AI[x].ic} ${HANG_AI[x].ten.replace("Hạng ","")}</span>`).join(" ")||"<i>chưa hạng nào</i>"}</td></tr>`).join("")}
    </tbody></table></div></div>`;

  h += `<div class="gvc" style="margin-top:14px"><h3 class="gvh">Lời dặn gửi kèm mỗi lượt hỏi
      <em>— viết ra để sửa được, không giấu trong mã</em></h3>
    <pre class="tlgoi" style="max-height:none">${esc(loiDan(AI_NV))}</pre></div>`;

  h += `<div class="vd" style="margin-top:15px"><b>Ba thứ phải làm khi lập trình thật, đừng bỏ qua.</b>
    <b>Một:</b> máy chủ phải kiểm lại quyền của người hỏi trước khi gọi mô hình — không tin gói do
    trình duyệt gửi lên, vì trình duyệt sửa được. <b>Hai:</b> ghi lại nguyên văn gói và câu trả lời
    trong 90 ngày; tranh cãi về một quyết định dựa trên trợ lý thì phải tra được đã đưa nó xem gì.
    <b>Ba:</b> đặt thời gian chờ tối đa và số lần thử lại; mô hình chậm hay lỗi thì màn hình phải
    nói rõ là lỗi, không được im lặng trả về rỗng làm người dùng tưởng công ty không có vấn đề gì.</div>`;
  return h;
}


function vDanhMuc(){
  const dung = TT_RIENG.filter(x=>x.dung).length;
  const _tn = `<div class="gvc" style="margin-bottom:15px"><h3 class="gvh">Bảng thuật ngữ
      <em>— mỗi khái niệm đúng một tên, dùng chung ở mọi cửa sổ</em></h3>
    <div class="msp"><table><thead><tr><th style="min-width:140px">Từ dùng</th>
      <th class="wr" style="min-width:340px">Nghĩa chính xác</th>
      <th style="min-width:190px">Hàm tính</th>
      <th class="wr" style="min-width:220px">Xuất hiện ở</th></tr></thead><tbody>
      ${THUAT_NGU.map(([a,b2,c,d])=>`<tr><td class="cot"><b>${a}</b></td>
        <td class="wr" style="font-size:12.5px">${b2}</td>
        <td style="font-size:12px;color:var(--navy2);font-family:ui-monospace,monospace">${esc(c)}</td>
        <td class="wr" style="font-size:12.5px;color:var(--mute)">${d}</td></tr>`).join("")}
    </tbody></table></div>
    <div class="note" style="margin-top:13px;margin-bottom:0"><b>Quá hạn và trễ là hai khái niệm khác nhau, đừng gộp.</b>
      Quá hạn nói về <b>hôm nay</b> và còn sửa được; trễ nói về <b>kỳ đã qua</b> và đã chốt.
      Gộp lại thì báo cáo kỳ mất nghĩa: một việc nộp muộn hôm qua không còn "quá hạn" nữa,
      nhưng vẫn phải tính là "trễ" của kỳ đó.</div></div>`;
  let h = _tn + oKPI([
    ["Trạng thái riêng", TT_RIENG.length, `của ${new Set(TT_RIENG.map(x=>x.dv)).size} phòng`, ""],
    ["Loại dừng đồng hồ", dung, "chờ bên ngoài, không tính vào thời gian trễ", ""],
    ["Nguồn phát sinh", NGUON_DX.length, "cho việc đột xuất", ""],
    ["Bằng chứng bắt buộc", BANG_CHUNG.filter(x=>x.bat).length + "/" + BANG_CHUNG.length, "nghiệp vụ phải có tệp mới nộp được", ""],
  ]);
  h += `<div class="gvc"><h3 class="gvh">Trạng thái riêng của từng phòng
      <em>— đặt tên theo ngôn ngữ của phòng, nhưng phải gắn vào một nhóm hệ thống</em></h3>
    <div class="msp"><table><thead><tr><th style="min-width:220px">Tên phòng dùng</th><th>Phòng</th>
      <th>Gắn vào nhóm hệ thống</th><th>Dừng đồng hồ</th><th style="min-width:300px">Dùng khi nào</th></tr></thead><tbody>
      ${TT_RIENG.map(x=>`<tr><td class="cot"><b>${esc(x.ten)}</b></td>
        <td>${esc(DV[x.dv]?DV[x.dv].ten:x.dv)}</td>
        <td><span class="tag ${TT[x.nhom]?TT[x.nhom][1]:"m"}">${TT[x.nhom]?TT[x.nhom][0]:x.nhom}</span></td>
        <td>${x.dung?`<span class="tag a">Có</span>`:`<span class="tag m">Không</span>`}</td>
        <td style="color:var(--mute)">${esc(x.gt)}</td></tr>`).join("")}
    </tbody></table></div>
    <div class="vd" style="margin-top:13px"><b>Danh mục này chưa nối vào luồng việc.</b>
      Bảng đã định nghĩa xong, nhưng bản chạy thử chưa cho gán trạng thái riêng vào một việc cụ thể,
      nên cột <b>Dừng đồng hồ</b> ở đây chưa tự kích hoạt. Cơ chế dừng đồng hồ đang chạy thật là
      <b>nút Có ý kiến</b> trên phiếu việc. Nối hai thứ lại là việc của bản lập trình.</div>
    <div class="note" style="margin-top:11px;margin-bottom:0"><b>Hai cột bên phải là hai quyết định khác nhau.</b>
      Cột <b>nhóm hệ thống</b> giữ cho báo cáo toàn công ty cộng được — không có nó thì mỗi phòng một bảng
      và không ai tổng hợp nổi. Cột <b>dừng đồng hồ</b> quyết định người làm có bị tính trễ hay không:
      chờ hãng tàu trả lịch mà vẫn đếm ngày trễ thì chỉ số phạt oan, và người ta sẽ thôi ghi việc vào phần mềm.</div>
  </div>`;
  h += `<div class="gv"><div class="gvc"><h3 class="gvh">Nguồn phát sinh việc đột xuất</h3>
    ${NGUON_DX.map((x,i)=>`<div class="mx ${i?"":"f"}"><span class="mxn">${x.ma}</span>
      <div class="mxb"><div style="font-weight:600;font-size:13.5px">${esc(x.ten)}</div>
      <div class="t2">${esc(x.gt)}</div></div></div>`).join("")}
    <div class="note" style="margin-top:12px;margin-bottom:0">Cột này trả lời câu đắt nhất về việc đột xuất:
      <b>gốc rễ nằm ở đâu</b>. Nếu phần lớn đến từ Nội bộ thì vấn đề là khâu lập kế hoạch, không phải khâu thực thi.</div>
  </div>
  <div class="gvc"><h3 class="gvh">Bằng chứng bắt buộc theo nghiệp vụ</h3>
    <div class="msp"><table><thead><tr><th style="min-width:180px">Loại việc</th>
      <th style="min-width:250px">Phải nộp kèm</th><th>Bắt buộc</th></tr></thead><tbody>
      ${BANG_CHUNG.map(x=>`<tr><td class="cot"><b>${esc(x.viec)}</b></td><td>${esc(x.bc)}</td>
        <td>${x.bat?`<span class="tag r">Chặn nộp</span>`:`<span class="tag m">Khuyến khích</span>`}</td></tr>`).join("")}
    </tbody></table></div>
    <div class="note" style="margin-top:12px;margin-bottom:0">Khuyến khích thì không ai nộp.
      Muốn có bằng chứng thì phải <b>chặn nút Nộp việc</b> khi chưa đính tệp, và nói rõ chặn ở nghiệp vụ nào.
      <b>Bản chạy thử chặn theo cờ gõ tay trên từng việc</b>, chưa tra bảng này — nối hai thứ là việc của bản lập trình.</div>
  </div></div>`;
  return h;
}

function vViTri(){
  const giu = ma => Object.values(U).filter(u => (VI_TRI.find(v=>v.ma===ma)||{}).ten === u.cd
    || u.cd.indexOf((VI_TRI.find(v=>v.ma===ma)||{ten:"\\u0000"}).ten) === 0);
  const khuyet = VI_TRI.filter(v => !giu(v.ma).length);
  let h = oKPI([
    ["Vị trí việc làm", VI_TRI.length, "đã mô tả trong hệ thống", ""],
    ["Đang khuyết người", khuyet.length, khuyet.length?"chưa ai giữ vị trí này":"đủ người", khuyet.length?"var(--red)":"#1B5E20"],
    ["Vị trí một người giữ", VI_TRI.filter(v=>giu(v.ma).length===1).length, "rủi ro khi người đó nghỉ", ""],
    ["Đã chỉ định người thay", VI_TRI.filter(v=>v.thay).length + "/" + VI_TRI.length, "khi người giữ vắng mặt", ""],
  ]);
  h += `<div class="msp"><table><thead><tr><th style="width:64px">Mã</th>
      <th style="min-width:240px">Vị trí</th><th style="min-width:200px">Đơn vị</th><th>Cấp</th>
      <th style="min-width:200px">Ai đang giữ</th><th style="min-width:180px">Ai thay khi vắng</th></tr></thead><tbody>
    ${VI_TRI.map(v=>{ const ng = giu(v.ma);
      return `<tr class="${ng.length?"":"gang2"}"><td class="cot"><b>${v.ma}</b></td>
        <td class="cot" style="left:64px">${esc(v.ten)}</td>
        <td>${esc(DV[v.dv]?DV[v.dv].ten:v.dv)}</td><td>${CAP_TEN[v.cap]||CAP_VAI[v.cap]}</td>
        <td>${ng.length?ng.map(u=>esc(u.ten)).join(", "):`<span style="color:var(--red)">chưa có ai</span>`}</td>
        <td>${v.thay&&U[v.thay]?esc(U[v.thay].ten):"—"}</td></tr>`;}).join("")}
    </tbody></table></div>
    <div class="note" style="margin-top:14px"><b>Vị trí tách khỏi con người là điều kiện để bàn giao được.</b>
      Khi phần mềm chỉ biết "việc này của chị Sáu" thì chị Sáu nghỉ là việc treo. Khi nó biết
      "việc này của vị trí Kế toán trưởng, người thay là CFO" thì hệ thống tự chuyển được.
      Cột <b>Ai thay khi vắng</b> là thứ rẻ nhất để chuẩn bị mà hầu như không phần mềm nội bộ nào có.
      <b>Bản chạy thử mới khai báo, chưa gắn việc vào vị trí</b> — nên chưa tự chuyển được khi người giữ vắng.</div>`;
  return h;
}

function vNhatKy(){
  const mat = NK.filter(x=>x.viec.includes("Hạn chế")).length;
  let h = oKPI([
    ["Dòng nhật ký", NK.length, "trong bản chạy thử", ""],
    ["Lượt mở việc mật", mat, "mỗi lượt đều phải ghi lại", ""],
    ["Đổi tham số", NK.filter(x=>x.viec.includes("tham số")).length, "có ghi giá trị cũ và mới", ""],
    ["Đổi tổ chức", NK.filter(x=>x.viec.includes("tổ chức")||x.viec.includes("người duyệt")).length, "đổi tuyến duyệt của cả nhánh", ""],
  ]);
  h += `<div class="msp"><table><thead><tr><th style="width:110px">Thời điểm</th>
      <th style="min-width:170px">Người thao tác</th><th style="min-width:210px">Thao tác</th>
      <th style="min-width:320px">Đối tượng</th><th>Địa chỉ máy</th></tr></thead><tbody>
    ${NK.map(x=>`<tr><td class="cot"><b>${x.t}</b></td>
      <td><div style="display:flex;align-items:center;gap:8px">${avHTML(x.ai,24)}${esc(U[x.ai].ten)}</div></td>
      <td>${x.viec.includes("Hạn chế")?`<span class="tag a">${esc(x.viec)}</span>`:esc(x.viec)}</td>
      <td>${esc(x.dt)}</td><td style="color:var(--mute)">${x.ip}</td></tr>`).join("")}
    </tbody></table></div>
    <div class="note" style="margin-top:14px"><b>Nhật ký chỉ ghi thêm, không sửa và không xoá.</b>
      Một bảng nhật ký cho phép sửa thì không còn là bằng chứng. Trong bản lập trình thật, bảng này
      phải chặn cả quyền sửa của người quản trị hệ thống — nếu không thì người có quyền cao nhất
      lại là người duy nhất có thể xoá dấu vết của chính mình.</div>`;
  return h;
}
/* =========================================================================
   THÊM · SỬA · XOÁ ĐƠN VỊ VÀ NHÂN SỰ

   Chỗ dễ hỏng nhất của một mô-đun cơ cấu tổ chức không phải màn hình nhập liệu,
   mà là NHỮNG THỨ ĐỔ THEO khi cây tổ chức đổi. Ở phần mềm này, cây tổ chức quyết
   định bốn thứ, và cả bốn đều tính lại tự động chứ không lưu cứng:
     · cấp của một người   → quyền vào màn hình nào
     · phạm vi dữ liệu     → thấy việc của ai
     · người duyệt của việc → trưởng đơn vị trực tiếp của người thực hiện
     · tuyến duyệt tiền     → ba bậc theo giá trị
   Vì vậy nguyên tắc ở đây là: KHÔNG XOÁ ĐƯỢC THỨ ĐANG ĐƯỢC DÙNG. Chặn thì phải nói
   rõ vì sao và gỡ bằng cách nào — chặn im lặng thì người quản trị sẽ đi tìm đường vòng.
   ========================================================================= */
let TC_SUA = null;        /* {loai:"dv"|"ns", ma} — đang mở biểu mẫu nào */
let TC_MOI = null;        /* {loai, cha} — đang thêm mới */
function moSuaDV(ma, ev){ if (ev) ev.stopPropagation(); TC_SUA = {loai:"dv", ma}; TC_MOI = null; draw(); }
function moSuaNS(id, ev){ if (ev) ev.stopPropagation(); TC_SUA = {loai:"ns", ma:id}; TC_MOI = null; draw(); }
function moThemDV(cha, ev){ if (ev) ev.stopPropagation(); TC_MOI = {loai:"dv", cha}; TC_SUA = null; draw(); }
function moThemNS(dv, ev){ if (ev) ev.stopPropagation(); TC_MOI = {loai:"ns", cha:dv}; TC_SUA = null; draw(); }
function dongTC(){ TC_SUA = null; TC_MOI = null; draw(); }

/* ---- kiểm tra trước khi xoá: liệt kê ĐỦ lý do, không dừng ở lý do đầu tiên ---- */
function canTruXoaDV(ma){
  const ly = [];
  const con = Object.entries(DV).filter(([k,d]) => d.cha === ma).map(([k]) => DV[k].ten);
  if (con.length) ly.push(`còn ${con.length} đơn vị con: ${con.join(", ")} — chuyển hoặc xoá chúng trước`);
  const ng = Object.values(U).filter(u => u.dv === ma);
  if (ng.length) ly.push(`còn ${ng.length} người đang thuộc đơn vị: ${ng.slice(0,4).map(u=>u.ten).join(", ")}${ng.length>4?"…":""} — chuyển họ sang đơn vị khác trước`);
  const viec = T.filter(t => U[t.lam] && U[t.lam].dv === ma && viecMo(t));
  if (viec.length) ly.push(`còn ${viec.length} việc đang mở gắn với người của đơn vị`);
  if (ma === "CTY" || ma === "HDQT") ly.push("đây là gốc cây tổ chức, xoá thì mọi đơn vị khác mất chỗ bám");
  return ly;
}
function canTruXoaNS(id){
  const ly = [];
  const giu = Object.entries(DV).filter(([k,d]) => d.truong === id).map(([k]) => DV[k].ten);
  if (giu.length) ly.push(`đang là trưởng của ${giu.length} đơn vị: ${giu.join(", ")} — bổ nhiệm người khác trước`);
  const lam = T.filter(t => t.lam === id && viecMo(t));
  if (lam.length) ly.push(`còn ${lam.length} việc đang thực hiện — bàn giao cho người khác trước`);
  const duyet = T.filter(t => viecMo(t) && nguoiDuyet(t) === id && t.lam !== id);
  if (duyet.length) ly.push(`đang là người duyệt của ${duyet.length} việc đang mở`);
  const bac = BAC_DUYET.filter(b => b.ai === id);
  if (bac.length) ly.push(`đang đứng tên ở bậc duyệt tiền ${bac.map(b=>b.ten).join(", ")} — đổi người ở Thiết lập › Tham số trước`);
  if (id === me) ly.push("đây là vai bạn đang xem, không tự xoá chính mình được");
  return ly;
}

/* ---- ghi ---- */
function luuDV(){
  const f = TC_MOI || TC_SUA; if (!f) return;
  const ten = ($("#dvTen").value || "").trim();
  const cha = $("#dvCha").value, truong = $("#dvTruong").value, db = +($("#dvDB").value || 0);
  const khuyet = $("#dvKhuyet").value === "1";
  if (!ten) return toast("Phải đặt tên đơn vị");
  /* Cha rỗng thì đơn vị rơi khỏi cây và biến mất khỏi mọi tuyến duyệt — chặn tuyệt đối.
     Trường hợp này xảy ra thật khi danh sách chọn đã loại nhánh con: giá trị cũ không
     còn trong danh sách nên trình duyệt trả về chuỗi rỗng. */
  if (!cha || !DV[cha]) return toast("Phải chọn đơn vị cha có thật — để trống thì đơn vị rơi khỏi cây tổ chức");
  if (TC_MOI){
    let ma = boDau(ten).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8) || "DV";
    let i = 1; while (DV[ma]) ma = ma.slice(0,7) + (++i);
    DV[ma] = {ten, cha, truong: truong || null, khuyet};
    if (db) DINH_BIEN[ma] = db;
    ghiNK(me, "Thêm đơn vị", `${ten} (${ma}) · trực thuộc ${DV[cha]?DV[cha].ten:cha}${truong?` · trưởng ${U[truong].ten}`:" · chưa có trưởng"}`);
    toast(`Đã thêm đơn vị "${ten}" — mã ${ma}`);
    TC_MOI = null; TC_CHON = ma;
  } else {
    const ma = TC_SUA.ma, d = DV[ma];
    /* Đổi đơn vị cha phải kiểm tra vòng lặp: cho một đơn vị làm con của chính con nó
       thì cây đứt, tuyến duyệt biến mất và màn hình nào cũng sai theo. */
    if (cha !== d.cha){
      let x = cha, v = 0, vong = false;
      while (x && v++ < 20){ if (x === ma){ vong = true; break; } x = DV[x] ? DV[x].cha : null; }
      if (vong) return toast("Không đặt được: đơn vị cha nằm bên dưới chính đơn vị này, cây sẽ thành vòng");
    }
    const cu = `${d.ten} · cha ${DV[d.cha]?DV[d.cha].ten:"—"} · trưởng ${U[d.truong]?U[d.truong].ten:"—"}`;
    d.ten = ten; d.cha = cha; d.truong = truong || null; d.khuyet = khuyet;
    if (db) DINH_BIEN[ma] = db; else delete DINH_BIEN[ma];
    ghiNK(me, "Sửa đơn vị", `${ma}: ${cu} → ${ten} · cha ${DV[cha]?DV[cha].ten:"—"} · trưởng ${U[truong]?U[truong].ten:"—"}`);
    toast(`Đã lưu "${ten}" · cấp và tuyến duyệt đã tính lại`);
    TC_SUA = null;
  }
  draw();
}
function xoaDV(ma){
  /* Định biên không chặn xoá — nó là con số kế hoạch, xoá theo đơn vị là đúng.
     Chỉ những thứ CÒN ĐANG ĐƯỢC DÙNG mới chặn: đơn vị con, người, việc đang mở. */
  const ly = canTruXoaDV(ma);
  if (ly.length) return toast("Chưa xoá được — xem lý do trong biểu mẫu");
  const ten = DV[ma].ten;
  delete DV[ma]; delete DINH_BIEN[ma];
  if (TC_CHON === ma) TC_CHON = null;
  ghiNK(me, "Xoá đơn vị", `${ten} (${ma})`);
  toast(`Đã xoá đơn vị "${ten}"`); TC_SUA = null; draw();
}
function luuNS(){
  const ten = ($("#nsTen").value || "").trim(), cd = ($("#nsCD").value || "").trim();
  const dv = $("#nsDV").value, capTay = $("#nsCap").value;
  if (!ten) return toast("Phải nhập họ tên");
  if (!cd)  return toast("Phải nhập chức danh");
  if (TC_MOI){
    let n = 1; while (U["F" + String(n).padStart(3,"0")]) n++;
    const id = "F" + String(n).padStart(3,"0");
    U[id] = {id, ten, cd, dv, vt: ($("#nsVT") ? $("#nsVT").value : "NV") || "NV"};
    if (capTay) CAP_TAY[id] = +capTay;
    ghiNK(me, "Thêm nhân sự", `${ten} — ${cd} · ${CHUC_VU[U[id].vt].ten} · ${DV[dv]?DV[dv].ten:dv} · mã ${id}`);
    toast(`Đã thêm ${ten} — mã ${id}`); TC_MOI = null;
  } else {
    const id = TC_SUA.ma, u = U[id];
    const cu = `${u.ten} — ${u.cd} · ${CHUC_VU[u.vt]?CHUC_VU[u.vt].ten:"—"} · ${DV[u.dv]?DV[u.dv].ten:"—"}`;
    u.ten = ten; u.cd = cd; u.dv = dv;
    if ($("#nsVT")) u.vt = $("#nsVT").value || "NV";
    if (capTay) CAP_TAY[id] = +capTay; else delete CAP_TAY[id];
    ghiNK(me, "Sửa nhân sự", `${id}: ${cu} → ${ten} — ${cd} · ${DV[dv]?DV[dv].ten:"—"}`);
    toast(`Đã lưu ${ten} · người duyệt và quyền đã tính lại theo đơn vị mới`);
    TC_SUA = null;
  }
  draw();
}
function xoaNS(id){
  const ly = canTruXoaNS(id);
  if (ly.length) return toast("Chưa xoá được — xem lý do trong biểu mẫu");
  const ten = U[id].ten;
  delete U[id]; delete CAP_TAY[id];
  ghiNK(me, "Xoá nhân sự", `${ten} (${id})`);
  toast(`Đã xoá ${ten}`); TC_SUA = null; draw();
}
/* Bàn giao trọn gói: chuyển mọi việc đang mở của một người sang người khác.
   Đây là đường gỡ chính khi có người nghỉ việc — không có nó thì "xoá" bị chặn mãi. */
function banGiao(id){
  const sang = $("#bgAi").value;
  if (!sang || sang === id) return toast("Chọn người nhận bàn giao");
  const ds = T.filter(t => t.lam === id && viecMo(t));
  ds.forEach(t => { t.lam = sang;
    t.log = t.log || []; t.log.unshift({w:U[me].ten, k:`bàn giao từ ${U[id].ten} sang ${U[sang].ten}`, t:NOW, s:1}); });
  ghiNK(me, "Bàn giao việc", `${ds.length} việc từ ${U[id].ten} sang ${U[sang].ten}`);
  toast(`Đã bàn giao ${ds.length} việc sang ${U[sang].ten}`); draw();
}

/* ---- biểu mẫu ---- */
/* Ô chọn đơn vị cha. boQua = đơn vị đang sửa: loại HẲN cả nhánh bên dưới nó ra khỏi
   danh sách, vì đặt một đơn vị làm con của chính con nó thì cây đứt và tuyến duyệt
   biến mất. Chặn ngay ở danh sách chọn tốt hơn chặn lúc bấm Lưu — người dùng không
   phải thử rồi bị từ chối. */
function oChonDV(id, val, boQua){
  const ra = []; (function di(ma, sau){
    if (ma === boQua) return;                       /* bỏ cả nhánh, không đi tiếp */
    ra.push(`<option value="${ma}" ${val===ma?"selected":""}>${"　".repeat(sau)}${sau?"└ ":""}${esc(DV[ma].ten)}</option>`);
    Object.entries(DV).filter(([k,d]) => d.cha === ma).forEach(([k]) => di(k, sau+1));
  })("HDQT", 0);
  return `<select class="lsel" id="${id}" style="width:100%;max-width:none">${ra.join("")}</select>`;
}
function frmDV(){
  const them = !!TC_MOI, ma = them ? null : TC_SUA.ma, d = them ? {ten:"", cha:TC_MOI.cha, truong:"", khuyet:false} : DV[ma];
  const ly = them ? [] : canTruXoaDV(ma);
  const nguoi = Object.values(U).sort((a,b)=>capViec(a.id)-capViec(b.id));
  return `<div class="ckf"><div class="ckfh"><span class="ckfx" onclick="dongTC()">✕</span>
      ${them ? "Thêm đơn vị mới" : `Sửa đơn vị <b>${esc(d.ten)}</b>`}
      <span>Đổi đơn vị cha hoặc trưởng đơn vị thì <b>cấp, quyền, người duyệt và phạm vi dữ liệu</b>
        của mọi người bên dưới tự tính lại — không có bảng nào phải sửa tay theo.</span></div>
    <div class="ckfg">
      <label class="rong"><span>Tên đơn vị</span>
        <input class="inp" id="dvTen" value="${esc(d.ten)}" placeholder="Ví dụ: Phòng Kỹ thuật"></label>
      <label><span>Trực thuộc</span>${oChonDV("dvCha", d.cha, ma)}
        <i>Độ sâu trong cây quyết định cấp: con của Công ty là cấp 2, con của phòng là cấp 3.</i></label>
      <label><span>Trưởng đơn vị</span>
        <select class="lsel" id="dvTruong"><option value="">— Chưa có trưởng —</option>
          ${nguoi.map(u=>`<option value="${u.id}" ${d.truong===u.id?"selected":""}>${esc(u.ten)} — ${esc(u.cd)}</option>`).join("")}</select>
        <i>Người này thành người nghiệm thu cho toàn bộ nhân sự của đơn vị.</i></label>
      <label><span>Tình trạng</span>
        <select class="lsel" id="dvKhuyet">
          <option value="0" ${!d.khuyet?"selected":""}>Có trưởng chính thức</option>
          <option value="1" ${d.khuyet?"selected":""}>Đang khuyết — người trên kiêm nhiệm</option></select>
        <i>Đánh dấu khuyết để báo cáo tính đúng: chậm ở đây là hệ quả cơ cấu.</i></label>
      <label><span>Định biên</span>
        <input class="inp" id="dvDB" type="number" min="0" value="${DINH_BIEN[ma]||""}" placeholder="để trống nếu chưa đặt"></label>
    </div>
    <div class="ckfn" style="display:flex;gap:9px;align-items:center;flex-wrap:wrap">
      <button class="btn p" onclick="luuDV()">${them?"Thêm đơn vị":"Lưu thay đổi"}</button>
      ${them ? "" : ly.length
        ? `<button class="btn" style="opacity:.5" onclick="toast('Chưa xoá được — xem lý do bên dưới')">Xoá đơn vị</button>`
        : `<button class="btn" style="color:var(--red)" onclick="xoaDV('${ma}')">Xoá đơn vị</button>`}
      <button class="btn" onclick="dongTC()">Huỷ</button>
      ${ly.length ? `<div class="tcchan"><b>Chưa xoá được vì:</b>
        <ul>${ly.map(x=>`<li>${x}</li>`).join("")}</ul></div>` : ""}
    </div></div>`;
}
function frmNS(){
  const them = !!TC_MOI, id = them ? null : TC_SUA.ma;
  const u = them ? {ten:"", cd:"", dv:TC_MOI.cha} : U[id];
  const ly = them ? [] : canTruXoaNS(id);
  const mo = them ? [] : T.filter(t => t.lam === id && viecMo(t));
  return `<div class="ckf"><div class="ckfh"><span class="ckfx" onclick="dongTC()">✕</span>
      ${them ? "Thêm nhân sự mới" : `Sửa hồ sơ <b>${esc(u.ten)}</b>`}
      <span>Đổi đơn vị thì <b>người duyệt</b> của mọi việc người này đang làm đổi theo — hệ thống suy lại,
        không lưu cứng vào từng phiếu.</span></div>
    <div class="ckfg">
      <label><span>Họ và tên</span><input class="inp" id="nsTen" value="${esc(u.ten)}" placeholder="Ví dụ: Nguyễn Văn A"></label>
      <label><span>Chức danh</span><input class="inp" id="nsCD" value="${esc(u.cd)}" placeholder="Ví dụ: Chuyên viên kinh doanh"></label>
      <label><span>Thuộc đơn vị</span>${oChonDV("nsDV", u.dv)}</label>
      <label><span>Vị trí</span>
        <select class="lsel" id="nsVT">
          ${CV_THU.map(k=>`<option value="${k}" ${(u.vt||"NV")===k?"selected":""}>${CHUC_VU[k].ten} — cấp ${CHUC_VU[k].cap}</option>`).join("")}</select>
        <i>Quyết định cấp và quyền. Quyền <b>nghiệm thu</b> vẫn chỉ đến từ ô trưởng đơn vị,
          nên Phó phòng thấy như Trưởng phòng mà không tự nhiên thành người duyệt.</i></label>
      <label><span>Cấp đặt tay</span>
        <select class="lsel" id="nsCap"><option value="">Theo cây tổ chức (khuyến nghị)</option>
          ${[1,2,3,4].map(c=>`<option value="${c}" ${(!them&&CAP_TAY[id]===c)?"selected":""}>Cấp ${c} — ${CAP_VAI[c]}</option>`).join("")}</select>
        <i>Chỉ đặt tay khi chức vụ không khớp độ sâu trong cây, ví dụ Phó Tổng Giám đốc không giữ đơn vị nào.</i></label>
    </div>
    ${!them && mo.length ? `<div class="tcbg">
      <b>Bàn giao ${mo.length} việc đang mở</b>
      <div style="display:flex;gap:9px;align-items:center;flex-wrap:wrap;margin-top:8px">
        <select class="lsel" id="bgAi" style="max-width:290px">
          <option value="">— Chọn người nhận —</option>
          ${Object.values(U).filter(x=>x.id!==id).map(x=>`<option value="${x.id}">${esc(x.ten)} — ${esc(x.cd)}</option>`).join("")}</select>
        <button class="btn" onclick="banGiao('${id}')">Chuyển hết sang người này</button>
      </div>
      <i style="display:block;margin-top:7px;font-size:11.5px;color:var(--mute)">Đây là đường gỡ khi có người nghỉ việc.
        Mỗi phiếu được ghi một dòng nhật ký ai bàn giao cho ai.</i></div>` : ""}
    <div class="ckfn" style="display:flex;gap:9px;align-items:center;flex-wrap:wrap">
      <button class="btn p" onclick="luuNS()">${them?"Thêm nhân sự":"Lưu thay đổi"}</button>
      ${them ? "" : ly.length
        ? `<button class="btn" style="opacity:.5" onclick="toast('Chưa xoá được — xem lý do bên dưới')">Xoá nhân sự</button>`
        : `<button class="btn" style="color:var(--red)" onclick="xoaNS('${id}')">Xoá nhân sự</button>`}
      <button class="btn" onclick="dongTC()">Huỷ</button>
      ${ly.length ? `<div class="tcchan"><b>Chưa xoá được vì:</b>
        <ul>${ly.map(x=>`<li>${x}</li>`).join("")}</ul></div>` : ""}
    </div></div>`;
}

/* =========================================================================
   CƠ CẤU TỔ CHỨC TÁCH THÀNH BỐN CỬA SỔ CON

   Trước đây một trang gánh cả bốn việc: xem cây, xem người của một đơn vị, hiểu vị
   trí, và soi chức danh. Bốn việc đó có bốn cách sắp xếp khác nhau — cây thì theo
   nhánh, người thì theo phòng, vị trí thì theo cấp, chức danh thì theo tần suất dùng
   — nên nhét chung một trang thì cái nào cũng dở.
     · Cơ cấu tổ chức — cây đơn vị, thêm/sửa/xoá đơn vị
     · Nhân sự        — toàn bộ người, lọc theo phòng ban và tìm theo tên
     · Vị trí         — danh mục sáu vị trí, mỗi vị trí kéo theo cấp và quyền gì
     · Chức danh      — chức danh đang dùng thật, để phát hiện đặt tên lệch nhau
   ========================================================================= */
const TC_TABS = [
  ["cay",  "Cơ cấu tổ chức", "Cây đơn vị, tuyến duyệt và các chỗ khuyết trưởng"],
  ["ns",   "Nhân sự",        "Toàn bộ nhân sự, lọc theo phòng ban và tìm theo tên"],
  ["vt",   "Vị trí",         "Sáu vị trí — mỗi vị trí kéo theo cấp, quyền và tầm nhìn dữ liệu"],
  ["cd",   "Chức danh",      "Chức danh đang dùng thật, gom theo đơn vị"],
];
let TC_TAB = "cay", TC_LOC_DV = "TAT_CA", TC_TIM = "", TC_LOC_VT = "TAT_CA";
function setTCTab(k){ TC_TAB = k; TC_SUA = null; TC_MOI = null; draw(); }
function locTCDV(v){ TC_LOC_DV = v; draw(); }
function locTCVT(v){ TC_LOC_VT = v; draw(); }
function timTC(v){ TC_TIM = v;
  const o = $("#tcDs"); if (o) o.innerHTML = bangNhanSuHTML(); }

/* ---- cửa sổ con: NHÂN SỰ ---- */
function dsNhanSu(){
  const q = boDau(TC_TIM.trim());
  return Object.values(U)
    .filter(u => TC_LOC_DV === "TAT_CA" || trongDV(u.id, TC_LOC_DV))
    .filter(u => TC_LOC_VT === "TAT_CA" || (u.vt || "NV") === TC_LOC_VT)
    .filter(u => !q || boDau(u.ten).includes(q) || boDau(u.cd).includes(q)
              || boDau(DV[u.dv] ? DV[u.dv].ten : "").includes(q) || boDau(u.id).includes(q))
    .sort((a,b) => capViec(a.id) - capViec(b.id) || a.ten.localeCompare(b.ten, "vi"));
}
function bangNhanSuHTML(){
  const ds = dsNhanSu(), sua = coQuyen(me, "sua_to_chuc");
  if (!ds.length) return `<div class="flag b2"><span class="ic2">—</span><span class="bd2">Không ai khớp bộ lọc đang đặt.</span></div>`;
  return `<div class="msp tdkh"><table><thead><tr>
      <th style="width:62px">Mã</th><th style="min-width:190px">Họ và tên</th>
      <th style="min-width:210px">Chức danh</th><th style="min-width:130px">Vị trí</th>
      <th style="min-width:190px">Đơn vị</th><th style="min-width:160px">Người duyệt</th>
      <th class="num">Việc mở</th><th class="num">Tải tuần</th>
      ${sua?`<th style="width:70px"></th>`:""}</tr></thead><tbody>
    ${ds.map(u => { const d = nguoiDuyet({lam:u.id, giao:null}), tw = taiTuanNay(u.id);
      const cv = CHUC_VU[u.vt] || CHUC_VU.NV;
      return `<tr>
        <td class="cot"><b>${u.id}</b></td>
        <td class="cot" style="left:62px"><div style="display:flex;align-items:center;gap:8px">${avHTML(u.id,24)}${esc(u.ten)}</div></td>
        <td>${esc(u.cd)}${(()=>{ const v = VI_TRI.find(x => x.ten === u.cd && trongDV(u.id, x.dv));
          return v ? `<div style="font-size:11px;color:var(--mute)">vị trí ${v.ma} · thay khi vắng: ${esc(U[v.thay]?U[v.thay].ten:"—")}</div>` : ""; })()}</td>
        <td><span class="tag ${cv.cap===1?"r":cv.cap===2?"a":cv.cap===3?"":"m"}">${cv.ten}</span></td>
        <td style="font-size:12.5px">${esc(DV[u.dv] ? DV[u.dv].ten : "—")}</td>
        <td style="font-size:12.5px">${d?esc(U[d].ten):`<span style="color:var(--red)">chưa xác định</span>`}</td>
        <td class="num">${soViecMo(u.id)}</td>
        <td class="num" style="${tw>SUC_TUAN?"color:var(--red);font-weight:700":""}">${soNgayLe(tw)}/${SUC_TUAN}</td>
        ${sua?`<td><button class="btn sm" onclick="moSuaNS('${u.id}',event)">Sửa</button></td>`:""}</tr>`;}).join("")}
    </tbody></table></div>`;
}
function vTCNhanSu(){
  const sua = coQuyen(me, "sua_to_chuc"), ds = dsNhanSu();
  let h = "";
  if (sua) h += `<div class="tmb gon"><button class="btn p" onclick="moThemNS('${TC_LOC_DV==="TAT_CA"?"CTY":TC_LOC_DV}')"><span>＋</span> Thêm nhân sự</button>
      <span class="tmg">Thêm vào <b>${esc(DV[TC_LOC_DV]?DV[TC_LOC_DV].ten:"Công ty")}</b> — đổi ô lọc phòng ban để thêm vào chỗ khác.</span></div>`;
  if (sua && TC_MOI && TC_MOI.loai === "ns") h += frmNS();
  if (sua && TC_SUA && TC_SUA.loai === "ns" && U[TC_SUA.ma]) h += frmNS();

  h += `<div class="tdtb">
      <span class="tdl">Phòng ban</span>
      <select class="lsel ${TC_LOC_DV!=="TAT_CA"?"on":""}" style="max-width:280px" onchange="locTCDV(this.value)">
        <option value="TAT_CA">Tất cả phòng ban (${Object.keys(U).length} người)</option>
        ${(function(){ const ra=[]; (function di(ma, sau){
            Object.entries(DV).filter(([k,d])=>d.cha===ma).forEach(([k,d])=>{
              const n = Object.values(U).filter(u=>trongDV(u.id,k)).length;
              if (n) ra.push(`<option value="${k}" ${TC_LOC_DV===k?"selected":""}>${"　".repeat(sau)}${sau?"└ ":""}${esc(d.ten)} (${n})</option>`);
              di(k, sau+1); });
          })("CTY",0); return ra.join(""); })()}
      </select>
      <span class="tdl">Vị trí</span>
      <select class="lsel ${TC_LOC_VT!=="TAT_CA"?"on":""}" style="max-width:190px" onchange="locTCVT(this.value)">
        <option value="TAT_CA">Mọi vị trí</option>
        ${CV_THU.map(k=>`<option value="${k}" ${TC_LOC_VT===k?"selected":""}>${CHUC_VU[k].ten} (${Object.values(U).filter(u=>(u.vt||"NV")===k).length})</option>`).join("")}
      </select>
      <input id="tcTim" class="inp" style="max-width:250px;height:34px" placeholder="Gõ tên, chức danh hoặc phòng…"
        value="${esc(TC_TIM)}" oninput="timTC(this.value)">
      <span class="tdd">Đang hiện <b>${ds.length}</b> trên <b>${Object.keys(U).length}</b> người</span>
    </div>`;
  h += `<div id="tcDs">${bangNhanSuHTML()}</div>`;
  return h;
}

/* ---- cửa sổ con: VỊ TRÍ ---- */
function vTCViTri(){
  const dem = {}; Object.values(U).forEach(u => { const k = u.vt || "NV"; dem[k] = (dem[k]||0)+1; });
  let h = `<div class="note" style="margin-bottom:15px"><b>Vị trí quyết định CẤP, cấp quyết định QUYỀN.</b>
    Nhưng quyền <b>nghiệm thu</b> thì không: nó chỉ đến từ ô <b>trưởng đơn vị</b> trong cây tổ chức.
    Nhờ tách hai thứ đó mà diễn đạt được Phó phòng — thấy dữ liệu như Trưởng phòng nhưng không tự nhiên
    thành người duyệt của phòng.</div>`;
  h += `<div class="msp" style="margin-bottom:15px"><table><thead><tr>
      <th style="min-width:180px">Vị trí</th><th class="num">Số người</th><th class="num">Cấp</th>
      <th class="wr" style="min-width:290px">Nghĩa là gì</th>
      <th class="wr" style="min-width:230px">Quyền kèm theo</th>
      <th class="wr" style="min-width:200px">Thấy dữ liệu của ai</th></tr></thead><tbody>
    ${CV_THU.map(k=>{ const o = CHUC_VU[k];
      const q = QUYEN.filter(x=>x[2].includes(o.cap)).length;
      const pham = o.cap===1 ? "Toàn công ty" : o.cap===2 ? "Phòng mình và các tổ trực thuộc"
        : o.cap===3 ? "Tổ mình phụ trách" : "Chỉ việc có tên mình";
      return `<tr>
        <td class="cot"><b>${o.ten}</b></td>
        <td class="num"><b>${dem[k]||0}</b></td>
        <td class="num">${o.cap}</td>
        <td class="wr" style="font-size:12.5px">${o.mo}</td>
        <td class="wr" style="font-size:12.5px"><b>${q}/${QUYEN.length}</b> quyền — ${
          QUYEN.filter(x=>x[2].includes(o.cap)).slice(0,3).map(x=>x[1].toLowerCase()).join(", ")}${q>3?`…`:""}</td>
        <td class="wr" style="font-size:12.5px;color:var(--navy2);font-weight:600">${pham}</td></tr>`;}).join("")}
    </tbody></table></div>`;
  h += `<div class="gvc"><h3 class="gvh">Ai đang giữ vị trí nào</h3>
    <div class="pqng">${CV_THU.filter(k=>dem[k]).map(k=>{
      const ds = Object.values(U).filter(u=>(u.vt||"NV")===k);
      return `<div class="pqng1"><div class="pqngh"><b>${CHUC_VU[k].ten}</b>
          <span>${ds.length} người · cấp ${CHUC_VU[k].cap}</span></div>
        <div class="pqngb">${ds.map(u=>`<span class="pqp" onclick="setTCTab('ns');locTCVT('${k}')" title="${esc(u.cd)}">
          ${avHTML(u.id,22)}${esc(u.ten)}</span>`).join("")}</div></div>`;}).join("")}</div></div>`;
  h += `<div class="vd" style="margin-top:15px">Danh mục sáu vị trí này là <b>đóng</b> — không thêm bớt trên màn hình.
    Thêm một vị trí thứ bảy nghĩa là phải trả lời nó nằm ở cấp nào, kéo theo quyền gì và thấy dữ liệu của ai;
    đó là quyết định thiết kế, không phải thao tác quản trị. Cần thêm thì sửa ở bản lập trình thật.</div>`;
  return h;
}

/* ---- cửa sổ con: CHỨC DANH ---- */
function vTCChucDanh(){
  const gom = {};
  Object.values(U).forEach(u => { (gom[u.cd] = gom[u.cd] || []).push(u); });
  const ds = Object.entries(gom).sort((a,b) => b[1].length - a[1].length || a[0].localeCompare(b[0], "vi"));
  const trung = ds.filter(([,v]) => v.length > 1);
  const rieng = ds.filter(([,v]) => v.length === 1);
  let h = oKPI([
    ["Chức danh đang dùng", ds.length, `cho ${Object.keys(U).length} người`, ""],
    ["Chức danh nhiều người dùng", trung.length, "từ 2 người trở lên", ""],
    ["Chức danh chỉ một người", rieng.length, rieng.length>ds.length*0.6?"nhiều chức danh cá biệt — nên rà lại cách đặt tên":"trong mức thường",
      rieng.length>ds.length*0.6?"var(--amb)":""],
    ["Vị trí", CV_THU.length, "danh mục đóng, không sửa trên màn hình", ""],
  ]);
  h += `<div class="note" style="margin-bottom:15px"><b>Chức danh là chữ tự do, vị trí mới là trường có danh mục.</b>
    Cửa sổ này để soi cách đặt tên: hai người cùng làm một việc mà chức danh viết khác nhau thì mọi báo cáo
    gom theo chức danh sẽ tách họ ra làm hai. Sửa chức danh ở cửa sổ <b>Nhân sự</b>.</div>`;
  h += `<div class="msp tdkh"><table><thead><tr>
      <th style="min-width:250px">Chức danh</th><th class="num">Số người</th>
      <th style="min-width:130px">Vị trí tương ứng</th>
      <th style="min-width:250px">Đơn vị đang dùng</th>
      <th style="min-width:260px">Ai đang giữ</th></tr></thead><tbody>
    ${ds.map(([cd, v])=>{
      const vts = [...new Set(v.map(u=>u.vt||"NV"))];
      const dvs = [...new Set(v.map(u=>DV[u.dv]?DV[u.dv].ten:"—"))];
      return `<tr>
        <td class="cot wr"><b>${esc(cd)}</b></td>
        <td class="num"><b>${v.length}</b></td>
        <td>${vts.map(k=>`<span class="tag ${CHUC_VU[k].cap===1?"r":CHUC_VU[k].cap===2?"a":CHUC_VU[k].cap===3?"":"m"}">${CHUC_VU[k].ten}</span>`).join(" ")}
          ${vts.length>1?`<div style="font-size:11px;color:var(--amb);margin-top:3px">cùng chức danh nhưng khác vị trí — nên rà lại</div>`:""}</td>
        <td class="wr" style="font-size:12.5px">${dvs.slice(0,3).map(esc).join(" · ")}${dvs.length>3?` và ${dvs.length-3} nơi nữa`:""}
          ${dvs.length>1?`<div style="font-size:11px;color:var(--mute)">dùng ở ${dvs.length} đơn vị</div>`:""}</td>
        <td class="wr" style="font-size:12.5px">${v.slice(0,5).map(u=>esc(u.ten)).join(" · ")}${v.length>5?` và ${v.length-5} người nữa`:""}</td>
      </tr>`;}).join("")}
    </tbody></table></div>`;
  return h;
}

function vToChuc(){
  return `<div class="vsw" style="margin-bottom:14px">${TC_TABS.map(([k,n,d])=>
      `<button class="${TC_TAB===k?"on":""}" onclick="setTCTab('${k}')" title="${esc(d)}">${n}</button>`).join("")}</div>
    <p class="sub" style="margin:-6px 0 14px;font-size:12.5px">${esc((TC_TABS.find(x=>x[0]===TC_TAB)||TC_TABS[0])[2])}.</p>`
    + (TC_TAB === "ns" ? vTCNhanSu() : TC_TAB === "vt" ? vTCViTri() : TC_TAB === "cd" ? vTCChucDanh() : vToChucCay());
}
function vToChucCay(){
  const loi = loiToChuc();
  const tongNS = Object.keys(U).length;
  const db = Object.values(DINH_BIEN).reduce((a,b)=>a+b, 0);
  let h = "";

  h += oKPI([
    ["Đơn vị đang hoạt động", Object.keys(DV).length - 1, "chưa tính Hội đồng quản trị", ""],
    ["Nhân sự hiện có", tongNS, (()=>{ const trongDB = Object.keys(DINH_BIEN).reduce((a,k)=>a+tongNguoi(k),0);
        return `${trongDB}/${db} nằm trong ô định biên, ${tongNS-trongDB} người thuộc Công ty và HĐQT chưa có định biên`; })(), ""],
    ["Vị trí trưởng còn khuyết", Object.values(DV).filter(d=>!d.truong||d.khuyet).length,
      "việc phải đẩy lên cấp trên duyệt", "var(--red)"],
    ["Cảnh báo tổ chức", loi.length, loi.length?"xem danh sách bên dưới":"không có vấn đề",
      loi.length?"var(--red)":"#1B5E20"],
  ]);

  const suaTC = coQuyen(me, "sua_to_chuc");
  if (suaTC) h += `<div class="tmb gon" style="margin-bottom:13px">
      <button class="btn p" onclick="moThemDV('${TC_CHON||"CTY"}')"><span>＋</span> Thêm đơn vị</button>
      <button class="btn" onclick="moThemNS('${TC_CHON||"CTY"}')"><span class="tmi">＋</span> Thêm nhân sự</button>
      <span class="tmg">Thêm vào <b>${esc(DV[TC_CHON]?DV[TC_CHON].ten:"Công ty")}</b> — chọn đơn vị khác ở cây bên dưới để đổi chỗ.</span>
    </div>`;
  if (suaTC && TC_MOI && TC_MOI.loai === "dv") h += frmDV();
  if (suaTC && TC_MOI && TC_MOI.loai === "ns") h += frmNS();
  if (suaTC && TC_SUA && TC_SUA.loai === "dv" && DV[TC_SUA.ma]) h += frmDV();
  if (suaTC && TC_SUA && TC_SUA.loai === "ns" && U[TC_SUA.ma]) h += frmNS();

  /* cây đơn vị */
  h += `<div class="tc" style="margin-bottom:15px">`;
  (function di(ma, sau){
    const d = DV[ma], con = dvCon(ma), mo = TC_MO.has(ma);
    const tt = tongNguoi(ma), tr = nguoiCuaDV(ma).length;
    const dbn = DINH_BIEN[ma] || 0;
    h += `<div class="tcr ${TC_CHON===ma?"on":""}" onclick="chonTC('${ma}')">
        <span style="display:inline-block;width:${sau*20}px;flex:none"></span>
        <span class="tcv" onclick="event.stopPropagation();togTC('${ma}')">${con.length?(mo?"▼":"▶"):"·"}</span>
        <div class="tcn"><b>${esc(d.ten)}</b>
          <i>${capDV(ma)}${d.truong?` · ${esc(U[d.truong].ten)}${d.khuyet?" (duyệt tạm)":""}`:` · <b style="color:var(--red)">chưa có trưởng</b>`}</i></div>
        <div class="tcb">
          <span><b>${tt}</b> người${con.length?` · ${tr} trực thuộc`:""}</span>
          ${dbn?`<span class="dbar2" title="Hiện có ${tt} trên định biên ${dbn}"><i style="width:${Math.min(100,tt/dbn*100)}%"></i></span>
            <span><b>${tt}</b>/${dbn}</span>`:`<span style="width:74px"></span><span>—</span>`}
          ${coQuyen(me,"sua_to_chuc")?`<button class="tcsua" onclick="moSuaDV('${ma}',event)" title="Sửa hoặc xoá đơn vị này">Sửa</button>`:""}
        </div></div>`;
    if (mo) con.forEach(k => di(k, sau+1));
  })("HDQT", 0);
  h += `</div>`;

  /* nhân sự của đơn vị đang chọn */
  if (TC_CHON){
    const ds = nguoiCuaDV(TC_CHON);
    h += `<div class="gvc" style="margin-bottom:15px">
      <h3 class="gvh">${esc(DV[TC_CHON].ten)} <em>— ${ds.length} người trực thuộc</em>
        ${coQuyen(me,"sua_to_chuc")?`<button class="btn sm" style="float:right" onclick="moThemNS('${TC_CHON}',event)">+ Thêm người vào đơn vị này</button>`:""}</h3>
      ${ds.length ? `<div class="msp"><table><thead><tr><th style="width:62px">Mã</th><th style="min-width:200px">Họ tên</th>
        <th style="min-width:220px">Chức danh</th><th>Cấp</th><th style="min-width:170px">Người duyệt</th>
        <th>Việc đang mở</th><th>Tải tuần này</th>${coQuyen(me,"sua_to_chuc")?`<th style="width:70px"></th>`:""}</tr></thead><tbody>
        ${ds.map(u=>{ const d = nguoiDuyet({lam:u.id, giao:null}), tw = taiTuanNay(u.id);
          return `<tr><td class="cot"><b>${u.id}</b></td>
            <td class="cot" style="left:62px"><div style="display:flex;align-items:center;gap:8px">${avHTML(u.id,24)}${esc(u.ten)}</div></td>
            <td>${esc(u.cd)}</td><td>${CAP_TEN[capViec(u.id)]}</td>
            <td>${d?esc(U[d].ten):`<span style="color:var(--red)">chưa xác định</span>`}</td>
            <td class="num">${soViecMo(u.id)}</td>
            <td class="num" style="${tw>SUC_TUAN?"color:var(--red);font-weight:700":""}">${soNgayLe(tw)} / ${SUC_TUAN}</td>
            ${coQuyen(me,"sua_to_chuc")?`<td><button class="btn sm" onclick="moSuaNS('${u.id}',event)">Sửa</button></td>`:""}</tr>`;}).join("")}
        </tbody></table></div>`
        : `<div style="font-size:13px;color:var(--mute)">Không có ai trực thuộc trực tiếp — chỉ có các đơn vị con.</div>`}
    </div>`;
  } else {
    h += `<div class="note" style="margin-bottom:15px">Bấm vào một đơn vị để xem danh sách nhân sự và tuyến duyệt của đơn vị đó.</div>`;
  }

  /* cảnh báo tổ chức */
  h += `<div class="gvc">
    <h3 class="gvh">Cảnh báo tổ chức <em>— những chỗ làm tuyến duyệt hoạt động sai</em></h3>
    ${loi.length ? loi.map((x,i)=>`<div class="mx ${i?"":"f"}">
        <span class="tag ${x.m}" style="flex:none">${x.m==="r"?"Phải xử lý":"Theo dõi"}</span>
        <div class="mxb"><div style="font-weight:600;font-size:13.5px">${esc(x.t)}</div>
          <div class="t2">${esc(x.g)}</div></div></div>`).join("")
      : `<div style="font-size:13px;color:var(--mute)">Không có vấn đề nào.</div>`}
    <div class="note" style="margin-top:13px;margin-bottom:0">Vị trí trưởng khuyết không phải lỗi phần mềm,
      nhưng phần mềm phải nói ra: mỗi chỗ khuyết là một tầng duyệt bị bỏ qua, và người ở cấp trên phải
      gánh thêm. Cảnh báo <b>đang duyệt cho N người</b> ở danh sách dưới cho biết gánh đó đã quá nặng chưa.</div>
  </div>`;
  return h;
}

function vDuAn(){
  if (DA_MO && find(DA_MO) && xemDuoc(find(DA_MO))) return daChiTiet(find(DA_MO));
  return daDanhMuc();
}

/* =========================================================================
   BỐN CÁCH XEM DANH MỤC DỰ ÁN

   Một danh mục dự án bị hỏi bốn câu khác nhau, và không có bố cục nào trả lời được
   cả bốn. Thẻ đẹp khi có vài dự án nhưng không so sánh được; bảng so sánh tốt nhưng
   không thấy dự án nào chồng lấn dự án nào; dòng thời gian thấy chồng lấn nhưng không
   đọc được con số; mốc bàn giao là thứ ban điều hành thật sự canh nhưng nó nằm rải
   trong từng dự án. Nên tách thành bốn cách xem trên CÙNG MỘT tập dữ liệu — đổi cách
   xem không đổi phạm vi, không đổi con số.
   ========================================================================= */
const DA_XEM = [
  ["the",  "Thẻ",             "Nhìn nhanh từng dự án — tiến độ, việc cần can thiệp, ngân sách"],
  ["bang", "Bảng",            "So sánh mọi dự án trên cùng bộ cột, dự án lệch nhiều xếp trước"],
  ["tg",   "Dòng thời gian",  "Các dự án trên cùng một trục ngày — thấy cái nào chồng lấn, cái nào kết thúc khi nào"],
  ["moc",  "Mốc bàn giao",    "Mọi mốc của mọi dự án xếp theo ngày — thứ ban điều hành canh thật sự"],
];
let DA_XEM_K = "the";
function setDAXem(k){ DA_XEM_K = k; draw(); }

/* Một dự án, một bộ số — cả bốn cách xem đều đọc từ đây, không ai tự tính lại. */
function soDA(p){
  const sk = sucKhoeDA(p), n = viecDA(p.id), moc = mocDA(p.id);
  const lech = sk.duBaoLech || 0;
  const mocToi = moc.filter(m => m.tt !== "HOAN_THANH").sort((a,b)=>parse(a.han)-parse(b.han))[0] || null;
  return {p, sk, lech, viec:n, tre:n.filter(canCanThiep), moc,
          mocXong:moc.filter(m=>m.tt==="HOAN_THANH").length, mocToi,
          rrCao:rrDA(p.id).filter(r=>r.tt!=="DA_DONG" && mucRuiRo(r.kn,r.td)[0]==="Cao").length,
          rr:rrDA(p.id).filter(r=>r.tt!=="DA_DONG").length,
          ns:(p.dieule && p.dieule.nganSach) || (p.tienLoai !== "THU" ? (p.tien||0) : 0)};
}
const xepDA = (a,b) => (b.lech - a.lech) || (b.tre.length - a.tre.length) || (a.sk.td - b.sk.td);

/* ---- cách xem 2: bảng so sánh ---- */
function daBangDS(ds){
  const r = ds.map(soDA).sort(xepDA);
  return `<div class="msp"><table><thead><tr>
      <th style="min-width:196px">Dự án</th><th style="min-width:118px">Chủ trì</th>
      <th style="min-width:112px">Khung</th><th style="min-width:126px">Đã làm / đã tiêu</th>
      <th style="min-width:102px">Dự kiến</th><th class="num" style="min-width:96px">Việc<br>cần can thiệp</th>
      <th style="min-width:112px">Mốc tới</th><th class="num" style="min-width:74px">Rủi ro<br>Cao</th>
      <th style="min-width:92px">Ngân sách</th><th style="min-width:106px">Tình trạng</th>
    </tr></thead><tbody>
    ${r.map(x => `<tr onclick="moDA('${x.p.id}')" style="cursor:pointer" class="${x.lech>0?"gang2":""}">
      <td class="cot wr"><b>${esc(x.p.ttl)}</b></td>
      <td><div style="display:flex;align-items:center;gap:8px">${avHTML(x.p.lam,24)}<span style="font-size:12.5px">${esc(U[x.p.lam].ten)}</span></div></td>
      <td style="font-variant-numeric:tabular-nums">${x.p.bd}<div style="color:var(--mute)">→ ${x.p.han}</div></td>
      <td><span style="display:flex;align-items:center;gap:7px">
            <span class="mini"><i style="width:${x.sk.td}%"></i></span><b>${x.sk.td}%</b></span>
          <div style="font-size:11.5px;color:var(--mute);margin-top:2px">đã tiêu ${x.sk.kv}% thời gian</div></td>
      <td style="${x.lech>0?"color:var(--red);font-weight:700":x.lech<0?"color:#1B5E20;font-weight:600":"color:var(--mute)"}">
        ${x.lech>0?`Muộn ${x.lech} ngày`:x.lech<0?`Sớm ${-x.lech} ngày`:"Đúng hạn"}</td>
      <td class="num"><b>${x.viec.length}</b> việc
        <div style="font-size:11.5px;${x.tre.length?"color:var(--red);font-weight:700":"color:var(--mute)"}">${
          x.tre.length?`${x.tre.length} cần can thiệp`:"không việc nào kẹt"}</div></td>
      <td>${x.mocToi ? `<span style="font-variant-numeric:tabular-nums">${x.mocToi.han}</span>
            <div style="font-size:11px;color:${quaHan(x.mocToi)?"var(--red)":"var(--mute)"}">${
              quaHan(x.mocToi)?`trễ ${-conLai(x.mocToi)} ngày`:`còn ${soNgayLe(conLai(x.mocToi))} ngày`}</div>`
          : `<span style="color:var(--mute)">— ${x.moc.length?"đã đạt hết":"chưa đặt mốc"}</span>`}</td>
      <td class="num" style="${x.rrCao?"color:var(--red);font-weight:700":"color:var(--mute)"}">${x.rrCao}</td>
      <td class="num">${tienDAText(x.ns)}</td>
      <td><span class="tag ${x.sk.mau}">${x.sk.nhan}</span></td>
    </tr>`).join("")}
    </tbody></table></div>
    <div class="note" style="margin-top:14px"><b>Cột đáng đọc trước là “Dự kiến”, không phải “Đã làm”.</b>
      Phần trăm hoàn thành một mình không nói được sớm hay muộn — một dự án làm được 23% có thể vẫn muộn
      25 ngày nếu chuỗi việc phụ thuộc bị kéo dài. Cột Dự kiến đã tính ràng buộc trước sau và tiến độ thật.</div>`;
}

/* ---- cách xem 3: dòng thời gian toàn danh mục ---- */
function daTgDS(ds){
  const r = ds.map(soDA).sort((a,b) => parse(a.p.bd) - parse(b.p.bd));
  if (!r.length) return khungTrong("Chưa có dự án nào.");
  /* Trục ngày phủ toàn bộ danh mục, nới hai đầu cho thoáng rồi cắt tròn theo tháng. */
  let min = r.reduce((a,x)=> Math.min(a, d2(parse(x.p.bd))), d2(parse(r[0].p.bd)));
  let max = r.reduce((a,x)=> Math.max(a, d2(parse(x.p.han))), d2(parse(r[0].p.han)));
  const hn = d2(TODAY); min = Math.min(min, hn); max = Math.max(max, hn);
  const t0 = new Date(min); t0.setDate(1);
  const t1 = new Date(max); t1.setMonth(t1.getMonth()+1, 1);
  const A = d2(t0), B = d2(t1), W = Math.max(1, B - A);
  const vt = d => Math.max(0, Math.min(100, (d2(d) - A) / W * 100));

  /* vạch tháng */
  const xHN = vt(TODAY);
  const thang = []; const c = new Date(t0);
  while (d2(c) < B){ const x = vt(c);
    thang.push({x, ten:`${c.getMonth()+1}/${String(c.getFullYear()).slice(2)}`, an: Math.abs(x - xHN) < 5});
    c.setMonth(c.getMonth()+1); }

  return `<div class="dtg">
    <div class="dtgt"><span class="dtgl"></span><span class="dtgr">
      ${thang.map(m=>`<i style="left:${m.x}%">${m.an?"":`<u>${m.ten}</u>`}</i>`).join("")}
      <b class="dtghn" style="left:${vt(TODAY)}%"><span>hôm nay</span></b></span></div>
    ${r.map(x => {
      const a = vt(parse(x.p.bd)), b = vt(parse(x.p.han));
      const mau = x.sk.mau === "r" ? "#C62828" : x.sk.mau === "a" ? "#C79000" : x.sk.mau === "m" ? "#8895a6" : "#2E7D32";
      return `<div class="dtgd" onclick="moDA('${x.p.id}')">
        <span class="dtgl"><b title="${esc(x.p.ttl)}">${esc(x.p.ttl)}</b>
          <i>${esc(U[x.p.lam].ten)} · đã làm <b style="font-size:11px">${x.sk.td}%</b> · ${x.viec.length} việc${
          x.tre.length?` · <em>${x.tre.length} cần can thiệp</em>`:""}</i></span>
        <span class="dtgr">
          ${thang.map(m=>`<i style="left:${m.x}%"></i>`).join("")}
          <b class="dtghn" style="left:${vt(TODAY)}%"></b>
          <span class="dtgb" style="left:${a}%;width:${Math.max(0.8, b-a)}%;border-color:${mau}">
            <u style="width:${x.sk.td}%;background:${mau}"></u></span>
          ${x.moc.map(m=>`<span class="dtgm ${m.tt==="HOAN_THANH"?"xong":quaHan(m)?"tre":""}"
              style="left:${vt(parse(m.han))}%" title="${esc(m.ttl.replace(/^MỐC:\s*/,""))} — ${m.han}"></span>`).join("")}
          ${x.lech>0?`<span class="dtgx ${b>84?"trai":""}" style="left:${b}%">+${x.lech}n</span>`:""}
        </span></div>`; }).join("")}
    <div class="dtgc">
      <span><i class="k1"></i>Khung kế hoạch từ ngày bắt đầu tới hạn cam kết</span>
      <span><i class="k2"></i>Phần đã làm được</span>
      <span><i class="k3"></i>Mốc bàn giao · <b style="color:#1B5E20">xanh</b> đã đạt, <b style="color:var(--red)">đỏ</b> đã trễ</span>
      <span><i class="k4"></i>Vạch hôm nay</span>
      <span><b style="color:var(--red)">+n</b> số ngày dự kiến vượt quá hạn cam kết</span>
    </div></div>`;
}

/* ---- cách xem 4: mốc bàn giao toàn danh mục ---- */
function daMocDS(ds){
  const all = ds.flatMap(p => mocDA(p.id).map(m => ({m, p})))
    .sort((a,b) => parse(a.m.han) - parse(b.m.han));
  if (!all.length) return khungTrong("Chưa dự án nào đặt mốc bàn giao.");
  const chua = all.filter(x => x.m.tt !== "HOAN_THANH");
  const tre  = chua.filter(x => quaHan(x.m));
  const gan  = chua.filter(x => !quaHan(x.m) && conLai(x.m) <= 30);

  let h = oKPI([
    ["Mốc chưa đạt", chua.length, `trên ${all.length} mốc toàn danh mục`, ""],
    ["Đã trễ", tre.length, tre.length?"mốc không lùi được":"không mốc nào trễ", tre.length?"var(--red)":"#1B5E20"],
    ["Rơi vào 30 ngày tới", gan.length, gan.length?"phải chốt phương án ngay":"không mốc nào gấp", gan.length?"var(--amb)":""],
    ["Đã đạt", all.length - chua.length, "cộng dồn từ đầu", ""],
  ]);

  let thangTruoc = "";
  h += `<div class="msp"><table><thead><tr>
      <th style="min-width:110px">Ngày</th><th style="min-width:290px">Mốc bàn giao</th>
      <th style="min-width:220px">Thuộc dự án</th><th style="min-width:150px">Người chịu trách nhiệm</th>
      <th style="min-width:120px">Đến đâu rồi</th><th style="min-width:135px">Tình trạng</th></tr></thead><tbody>
    ${all.map(({m,p}) => {
      const d = parse(m.han), tn = `Tháng ${d.getMonth()+1}/${d.getFullYear()}`;
      const dau = tn !== thangTruoc ? (thangTruoc = tn, true) : false;
      const xong = m.tt === "HOAN_THANH", qh = !xong && quaHan(m);
      return `${dau?`<tr class="mocth"><td colspan="6">${tn}</td></tr>`:""}
        <tr onclick="openDw('${m.id}')" style="cursor:pointer" class="${qh?"gang2":""} ${xong?"mo50":""}">
        <td style="font-variant-numeric:tabular-nums"><b>${m.han}</b></td>
        <td class="wr"><span class="tn2">${esc(m.ttl.replace(/^MỐC:\s*/,""))}</span></td>
        <td class="wr"><a href="#" onclick="event.preventDefault();event.stopPropagation();moDA('${p.id}')"
          style="color:var(--navy2);font-weight:600">${esc(p.ttl)}</a></td>
        <td><div style="display:flex;align-items:center;gap:8px">${avHTML(m.lam,24)}<span style="font-size:12.5px">${esc(U[m.lam].ten)}</span></div></td>
        <td><span style="display:flex;align-items:center;gap:7px"><span class="mini"><i style="width:${tienDo(m)}%"></i></span>${tienDo(m)}%</span></td>
        <td>${xong?`<span class="tag g">Đã đạt</span>`
          : qh?`<span class="tag r">Trễ ${-conLai(m)} ngày</span>`
          : `<span class="tag ${conLai(m)<=7?"a":"m"}">Còn ${soNgayLe(conLai(m))} ngày</span>`}</td>
      </tr>`; }).join("")}
    </tbody></table></div>
    <div class="note" style="margin-top:14px"><b>Mốc là điểm không lùi được.</b>
      Việc thường trễ thì dời hạn rồi làm tiếp; mốc trễ thì bên nhận đã lỡ kế hoạch của họ.
      Vì vậy mốc tách khỏi danh sách việc và xếp theo ngày trên toàn danh mục, không nằm rải trong từng dự án.</div>`;
  return h;
}

/* ---------- tầng 1: danh mục dự án ---------- */
function daDanhMuc(){
  const ds = dsDuAn();
  let h = `<h1 class="h1">Dự án</h1>
    <p class="sub">Việc lớn có nhiều việc con, có ràng buộc trước sau, có ngân sách và mốc bàn giao.
    Mỗi dự án là một <b>vật chứa</b> — nó có điều lệ, mốc, rủi ro và nhật ký quyết định,
    những thứ không nhét vừa một dòng trong bảng công việc. Bấm vào một dự án để mở cửa sổ vận hành.</p>`;
  if (!ds.length) return h + khungTrong("Chưa có dự án nào bạn được xem.");

  const nsCua = p => (p.dieule && p.dieule.nganSach) || (p.tienLoai !== "THU" ? (p.tien||0) : 0);
  const tong = ds.reduce((a,p)=>a + nsCua(p), 0);
  /* Dùng đúng thứ nhãn trên thẻ đang dùng — dự báo có tính ràng buộc trước sau.
     Phép so tiến độ với thời gian cho ra +20 (làm nhanh hơn tiêu) trong khi dự báo
     cho ra muộn 22 ngày, nên ô số ghi "0 dự án chậm" ngay trên thẻ ghi "Chậm nhiều". */
  const cham = ds.filter(p => (sucKhoeDA(p).duBaoLech || 0) > 0).length;
  const rrCao = RUI_RO.filter(r => r.tt !== "DA_DONG" && mucRuiRo(r.kn,r.td)[0] === "Cao"
                                && ds.some(p=>p.id===r.da)).length;
  const mocGan = ds.flatMap(p=>mocDA(p.id)).filter(m => m.tt !== "HOAN_THANH" && days(m.han) <= 30).length;
  const treTen = ds.filter(p => (sucKhoeDA(p).duBaoLech||0) > 0)
    .sort((a,b)=>(sucKhoeDA(b).duBaoLech||0)-(sucKhoeDA(a).duBaoLech||0))[0];
  const mauDA = cham ? (cham > 1 ? "r" : "a") : "g";
  h += `<div class="kl ${mauDA}"><span class="ki">${cham>1?"✕":cham?"!":"✓"}</span><div>
      <span class="kt">${cham ? `${cham} trên ${ds.length} dự án dự kiến trễ hạn`
        : `Cả ${ds.length} dự án đều dự kiến về đích đúng hạn`}</span>
      <div class="ks">${treTen ? `Nặng nhất là <b>${esc(treTen.ttl)}</b> — muộn ${sucKhoeDA(treTen).duBaoLech} ngày.
        Mở dự án để xem chuỗi việc nào đang kéo ngày về đích.`
        : `Tổng ngân sách đã duyệt ${tienDAText(tong)}${rrCao?`, còn ${rrCao} rủi ro mức Cao phải canh`:""}.`}</div>
    </div></div>`;
  h += oKPI([
    ["Dự án đang chạy", ds.filter(p=>p.tt!=="HOAN_THANH").length, `trên ${ds.length} dự án`, ""],
    ["Dự kiến trễ hạn", cham, cham?"theo ràng buộc trước sau và tiến độ thật":"không dự án nào dự kiến trễ",
      cham?"var(--red)":"#1B5E20"],
    ["Ngân sách đã duyệt", tienDAText(tong), "cộng theo điều lệ dự án", ""],
    ["Rủi ro mức Cao còn mở", rrCao, rrCao?"phải có người xử lý":"không có rủi ro mức Cao", rrCao?"var(--red)":"#1B5E20"],
  ]);
  if (mocGan) h += `<div class="note" style="margin:-6px 0 16px"><b>${mocGan} mốc bàn giao</b> rơi vào 30 ngày tới.
    Mốc là điểm không lùi được — xem tab <b>Mốc</b> trong từng dự án.</div>`;

  h += `<div class="lb" style="margin-bottom:14px">
      <span style="font-size:11.5px;font-weight:700;letter-spacing:.3px;text-transform:uppercase;color:var(--mute)">Cách xem</span>
      <div class="sg">${DA_XEM.map(([k,n,d])=>
        `<button class="${DA_XEM_K===k?"on":""}" onclick="setDAXem('${k}')" title="${esc(d)}">${n}</button>`).join("")}</div>
      <div class="lct"><span>${esc((DA_XEM.find(x=>x[0]===DA_XEM_K)||DA_XEM[0])[2])}</span></div>
    </div>`;
  if (DA_XEM_K === "bang") return h + daBangDS(ds);
  if (DA_XEM_K === "tg")   return h + daTgDS(ds);
  if (DA_XEM_K === "moc")  return h + daMocDS(ds);

  h += `<div class="dac">` + ds.map(p => {
    const sk = sucKhoeDA(p), n = viecDA(p.id), tre = n.filter(canCanThiep).length;
    const rr = rrDA(p.id).filter(r=>r.tt!=="DA_DONG").length;
    const lc = lichDA(p), FB2 = duBao(p.id), lb2 = FB2 && FB2[p.id] ? nhanLech(lechDuBao(p, FB2)) : null;
    return `<button class="dai" onclick="moDA('${p.id}')">
      <h4>${esc(p.ttl)}</h4>
      <div class="mt">${esc(U[p.lam].ten)} chủ trì · ${p.bd} → ${p.han}</div>
      <div class="dbar"><i style="width:${sk.td}%"></i><u style="left:calc(${sk.kv}% - 1px)"></u></div>
      <div class="dsl"><span>Đã làm <b style="color:var(--ink)">${sk.td}%</b></span>
        <span>Đã tiêu ${sk.kv}% thời gian</span></div>
      <div style="margin-bottom:10px"><span class="tag ${sk.mau}">${sk.nhan}</span>
        ${tre?`<span class="tag r" style="margin-left:5px">${tre} việc cần can thiệp</span>`:""}
        ${lb2 && lb2[1]!=="g" ? `<span class="tag ${lb2[1]}" style="margin-left:5px">Dự kiến ${lb2[0]}</span>`:""}
        ${lc.vuong.length?`<span class="tag a" style="margin-left:5px">${lc.vuong.length} việc sai thứ tự lịch</span>`:""}</div>
      <div class="dfo"><span><b>${n.length}</b> việc</span>
        <span><b>${mocDA(p.id).length}</b> mốc</span>
        <span><b>${rr}</b> rủi ro mở</span>
        <span><b>${tienDAText(nsCua(p))}</b> ngân sách</span></div>
    </button>`; }).join("") + `</div>
    <div class="note" style="margin-top:16px"><b>Vạch dọc trên thanh tiến độ</b> là phần trăm thời gian đã tiêu.
      Thanh xanh ngắn hơn vạch nghĩa là làm chậm hơn tiêu. So hai con số này với nhau đáng tin hơn nhìn riêng
      phần trăm hoàn thành, vì phần trăm một mình không nói được là sớm hay muộn.</div>`;
  return h;
}

/* ---------- tầng 2: cửa sổ vận hành một dự án ---------- */
const DA_TABS = [
  ["tq",  "Tổng quan",  "Dự án có ổn không, nếu không thì vì việc nào, và gì đang chờ bạn quyết"],
  ["cv",  "Công việc",  "Bảng phân rã kiểu Microsoft Project, có đường găng"],
  ["gt",  "Gantt",      "Trục thời gian của riêng dự án này"],
  ["moc", "Mốc",        "Điểm bàn giao: kế hoạch so với thực tế"],
  ["rr",  "Rủi ro",     "Sổ rủi ro và ma trận khả năng × tác động"],
  ["nl",  "Nguồn lực",  "Ai đang gánh bao nhiêu trong dự án này"],
  ["qd",  "Quyết định", "Nhật ký quyết định: quyết gì, ai quyết, vì sao"],
];
function daChiTiet(p){
  const sk = sucKhoeDA(p);
  const mt = DA_TABS.find(x=>x[0]===DA_TAB) || DA_TABS[0];
  /* Nút thêm việc để ngay cạnh tiêu đề. Trước đây chỉ có nút nhỏ trong từng dòng của tab
     Công việc, mà nửa số dòng lại không có nút vì điều kiện capViec(t.lam)<4 — nên câu hỏi
     "muốn tạo việc mới trong dự án thì làm thế nào" là câu hỏi đúng, giao diện có lỗi. */
  let h = `<div class="dbc"><button onclick="dongDA()">← Danh mục dự án</button><span>/</span><span>${esc(p.ttl)}</span></div>
    <div style="display:flex;gap:14px;align-items:flex-start;flex-wrap:wrap">
      <h1 class="h1" style="margin-bottom:5px;flex:1;min-width:260px">${esc(p.ttl)}</h1>
      <button class="btn p" style="flex:none;margin-top:4px" onclick="moNganGiao('${p.id}')"
        title="Mở ngăn tạo việc bên phải, không rời khỏi dự án">+ Thêm việc vào dự án</button>
    </div>
    <p class="sub" style="margin-bottom:13px">
      <span class="tag ${sk.mau}">${sk.nhan}</span>
      <span style="margin-left:8px">${esc(U[p.lam].ten)} chủ trì · giao bởi ${esc(U[p.giao].ten)}
      · ${p.bd} → ${p.han} · ${viecDA(p.id).length} việc con</span></p>
    <div class="vsw">${DA_TABS.map(([k,n,d])=>
      `<button class="${DA_TAB===k?"on":""}" onclick="setDATab('${k}')" title="${esc(d)}">${n}</button>`).join("")}</div>
    <p class="sub" style="margin:-8px 0 15px;font-size:12.5px">${esc(mt[2])}.</p>`;
  return h + ({tq:daTongQuan, cv:daCongViec, gt:daGantt, moc:daMoc, rr:daRuiRo, nl:daNguonLuc, qd:daQuyetDinh}[DA_TAB] || daTongQuan)(p);
}

function daTongQuan(p){
  /* Màn hình này trả lời ĐÚNG BA CÂU, theo đúng thứ tự người quản lý cần:
       1. Dự án có ổn không            → dòng kết luận
       2. Nếu không thì vì việc nào    → chuỗi việc quyết định ngày về đích
       3. Có gì đang chờ tôi quyết     → mục đang chờ bạn quyết
     Bản trước có 5 ô số ngang hàng, một bảng điều lệ 6 dòng chiếm chỗ đẹp nhất, một khối
     kiểm tra lịch trùng với cột Lệch ở tab Công việc, một khối rủi ro trùng với tab Rủi ro,
     và 266 từ giảng giải phương pháp — nhiều thứ đúng, không thứ nào trả lời câu hỏi đầu tiên.
     Điều lệ là tài liệu tra cứu nên thu vào; rủi ro và lịch đã có tab riêng nên bỏ khỏi đây. */
  const dl = p.dieule || {}, sk = sucKhoeDA(p);
  const FB = duBao(p.id), lech = FB[p.id] ? dCong(parse(p.han), FB[p.id].ket) : null;
  const n = viecDA(p.id), xong = n.filter(t => t.tt === "HOAN_THANH").length;
  const canT = n.filter(canCanThiep);
  const chuoi = chuoiTre(p.id, FB);
  const mocSau = mocDA(p.id).filter(m => m.tt !== "HOAN_THANH")[0];
  const cho = dangChanBoi().filter(x => duAnCua(x.t) === p.id);
  const cam = caCay(p.id).reduce((a,t)=>a + (t.tienLoai==="CHI" ? (t.tien||0) : 0), 0);

  const mau = lech === null ? "a" : lech > 7 ? "r" : lech > 0 ? "a" : "g";
  const ic  = mau === "g" ? "✓" : mau === "a" ? "!" : "✕";
  const cau = lech === null ? "Chưa tính được ngày về đích"
            : lech > 0 ? `Dự kiến chậm ${lech} ngày so với hạn cam kết`
            : lech < 0 ? `Dự kiến xong sớm ${-lech} ngày so với hạn cam kết`
            : "Dự kiến về đích đúng hạn cam kết";
  const gay = chuoi.find(t => dCong(parse(t.han), FB[t.id].ket) > 0);
  let h = `<div class="kl ${mau}"><span class="ki">${ic}</span><div>
      <span class="kt">${cau}</span>
      <div class="ks">Hạn cam kết <b>${p.han}</b> · dự kiến xong <b>${FB[p.id]?fmtNgay(FB[p.id].ket):"—"}</b>${
        gay ? ` · điểm gãy là <b>${esc(gay.ttl)}</b>` : ""}</div>
    </div></div>`;

  h += oKPI([
    ["Tiến độ", sk.td+"%", `${xong}/${n.length} việc con đã xong`, ""],
    ["Việc cần can thiệp", canT.length, canT.length?"quá hạn hoặc đã báo có vấn đề":"không có việc nào",
      canT.length?"var(--red)":"#1B5E20"],
    ["Mốc kế tiếp", mocSau ? mocSau.han : "—",
      mocSau ? esc(mocSau.ttl.replace(/^MỐC:\s*/,"").slice(0,42))
             : (mocDA(p.id).length ? "đã qua hết các mốc" : "dự án chưa đánh dấu mốc nào"), ""],
    ["Ngân sách", tienDAText(dl.nganSach||0), cam?`đã cam kết ${tienDAText(cam)}`:"chưa cam kết khoản nào", ""],
  ]);

  h += `<div class="card" style="padding:17px 19px;margin-bottom:15px">
    <h3 style="margin:0 0 3px;font-size:15px">Chuỗi việc quyết định ngày về đích</h3>
    <div style="font-size:12px;color:var(--mute);margin-bottom:9px">
      Việc sau chỉ khởi động được khi việc trước xong — kéo dài một mắt là kéo dài cả dự án</div>
    ${chuoi.length ? chuoi.map((t,i)=>{
        const d = dCong(parse(t.han), FB[t.id].ket), nl = nhanLech(d);
        return `<div class="mx ${i?"":"f"} ${d>0?"hot":""}">
          <span class="mxn">${i+1}</span>
          <div class="mxb">
            <button class="t1" onclick="openDw('${t.id}')">${esc(t.ttl)}</button>
            <div class="t2">${esc(U[t.lam].ten)} · ${tienDo(t)}% · cam kết ${t.han} → dự kiến ${fmtNgay(FB[t.id].ket)}</div>
          </div>
          <span class="tag ${nl[1]}" style="flex:none">${nl[0]}</span></div>`; }).join("")
      : `<div style="font-size:13px;color:var(--mute)">Dự án chưa khai ràng buộc trước sau nào.</div>`}
    ${(()=>{ const la = caCay(p.id).filter(x=>!conCua(x.id).length).length, du = la - chuoi.length;
       if (gay) return `<div class="note" style="margin:12px 0 0"><b>Can thiệp vào mắt số ${chuoi.indexOf(gay)+1}</b>
         thì cả chuỗi phía sau rút theo. Can thiệp vào việc ngoài chuỗi này không đổi được ngày về đích.${
         du>0?` ${du} việc còn lại có dự trữ nên không nằm trong chuỗi.`:""}</div>`;
       if (du > 0) return `<div class="note" style="margin:12px 0 0">${du} việc còn lại của dự án
         <b>có dự trữ</b> nên không quyết định ngày về đích — chúng không hiện ở đây.</div>`;
       return ""; })()}
  </div>`;

  if (cho.length) h += `<div class="card" style="padding:17px 19px;margin-bottom:15px">
    <h3 style="margin:0 0 9px;font-size:15px">Đang chờ bạn quyết — ${cho.length}</h3>
    ${cho.map((x,i)=>`<div class="mx ${i?"":"f"}"><span class="mxn">${
        x.loai==="duyet"?"D":x.loai==="ykien"?"Y":x.loai==="dexuat"?"S":"H"}</span>
      <div class="mxb"><button class="t1" onclick="openDw('${x.t.id}')">${esc(x.t.ttl)}</button>
        <div class="t2">${x.loai==="duyet"?"chờ bạn nghiệm thu và chấm điểm"
          :x.loai==="ykien"?`nêu ý kiến: ${Y_KIEN[x.t.yKien.loai][0].toLowerCase()}`
          :x.loai==="dexuat"?"đề nghị sửa tiêu chí nghiệm thu":"xin lùi hạn"}</div></div></div>`).join("")}
  </div>`;

  h += `<div class="card" style="padding:15px 19px">
    <details class="ac"><summary>Điều lệ dự án</summary>
      <dl class="dl2" style="margin-top:12px">
        <dt>Mục tiêu</dt><dd>${esc(dl.muctieu||"—")}</dd>
        <dt>Trong phạm vi</dt><dd>${esc(dl.phamvi||"—")}</dd>
        <dt>Ngoài phạm vi</dt><dd>${esc(dl.ngoaipham||"—")}
          <div style="font-size:11.5px;color:var(--mute);margin-top:2px">
            Ô đắt nhất trong bảng — dự án hỏng vì phình phạm vi nhiều hơn vì làm chậm</div></dd>
        <dt>Sản phẩm bàn giao</dt><dd>${esc(p.sp||"—")}</dd>
        <dt>Ngân sách duyệt</dt><dd>${dl.nganSach?tienDu(dl.nganSach):"không có ngân sách riêng"}</dd>
        <dt>Thời gian</dt><dd>${dl.batdau||p.bd} → ${dl.ketthuc||p.han}</dd>
        <dt>Chủ trì</dt><dd>${esc(U[p.lam].ten)} · giao bởi ${esc(U[p.giao].ten)}</dd>
      </dl>
    </details></div>`;
  return h;
}
function daCongViec(p){ return bangDuAn(p.id); }
function daGantt(p){ return wGantt(p.id); }

function daMoc(p){
  const ms = mocDA(p.id);
  if (!ms.length) return khungTrong("Dự án này chưa đánh dấu mốc nào.")
    + `<div class="vd" style="margin-top:12px"><b>Mốc</b> là việc có thời lượng bằng không về mặt quản trị:
       nó không tiêu thời gian, nó chỉ xác nhận một thứ đã xong. Đánh dấu mốc cho những điểm
       <b>không lùi được</b> — ký hợp đồng, nộp hồ sơ, phát hành báo cáo.</div>`;
  let h = `<div class="card" style="padding:19px 21px 15px;margin-bottom:15px"><div class="mst">
    <div class="ln"></div><div class="mstw">` + ms.map(m=>{
      const xong = m.tt === "HOAN_THANH", tre = !xong && days(m.han) < 0;
      const cls = xong ? "ok" : tre ? "late" : (days(m.han) <= 30 ? "now" : "");
      return `<div><div style="font-size:11px;color:var(--mute);height:15px">${m.han}</div>
        <div class="mdot ${cls}"></div>
        <div style="font-size:11.5px;line-height:1.35;padding:0 4px">${esc(m.ttl.replace(/^MỐC:\s*/,""))}</div></div>`;
    }).join("") + `</div></div></div>`;

  h += `<div class="msp"><table><thead><tr>
    <th style="width:74px">Mã</th><th style="min-width:300px">Mốc</th><th>Người chịu trách nhiệm</th>
    <th>Hạn gốc</th><th>Hạn hiện tại</th><th>Số lần dời</th><th>Thực tế</th><th>Lệch</th><th>Trạng thái</th>
    </tr></thead><tbody>` + ms.map(m=>{
      const tt = TT[m.tt], xong = m.tt === "HOAN_THANH";
      const tt2 = xong ? (m.diem && m.diem.boi ? m.diem.boi.split(" ")[0] : "—") : "—";
      const lech = xong ? null : days(m.han);
      return `<tr onclick="openDw('${m.id}')" style="cursor:pointer" class="${!xong&&days(m.han)<0?"gang2":""}">
        <td class="cot"><b>${m.id}</b></td>
        <td class="cot" style="left:74px"><span class="tn2">${esc(m.ttl.replace(/^MỐC:\s*/,""))}</span></td>
        <td>${esc(U[m.lam].ten)}</td>
        <td>${m.han_goc||m.han}</td><td>${m.han}</td>
        <td class="num">${m.doi||0}</td>
        <td>${tt2}</td>
        <td class="num" style="${lech!==null&&lech<0?"color:var(--red);font-weight:700":""}">
          ${xong?"—":lech<0?`trễ ${-lech} ngày`:`còn ${lech} ngày`}</td>
        <td><span class="tag ${tt[1]}">${tt[0]}</span></td></tr>`; }).join("") + `</tbody></table></div>
    <div class="note" style="margin-top:14px"><b>Cột Số lần dời là cột chống gian lận chỉ số.</b>
      Một mốc dời hạn ba lần rồi về đích "đúng hạn" thì cột phần trăm đúng hạn vẫn đẹp, nhưng thực tế đã trễ.
      Giữ nguyên hạn gốc bên cạnh hạn hiện tại là cách duy nhất nhìn ra chuyện đó.</div>`;
  return h;
}

function daRuiRo(p){
  const rs = rrDA(p.id);
  if (!rs.length) return khungTrong("Dự án này chưa ghi rủi ro nào.");
  const mo = rs.filter(r=>r.tt!=="DA_DONG");
  let h = oKPI([
    ["Rủi ro đang mở", mo.length, `trên ${rs.length} đã ghi nhận`, ""],
    ["Mức Cao", mo.filter(r=>mucRuiRo(r.kn,r.td)[0]==="Cao").length, "khả năng × tác động ≥ 15", "var(--red)"],
    ["Đã có biện pháp", mo.filter(r=>r.bp).length, "trên tổng số rủi ro mở", ""],
    ["Đã đóng", rs.filter(r=>r.tt==="DA_DONG").length, "không còn phải canh", "#1B5E20"],
  ]);

  /* ma trận khả năng × tác động */
  let mtx = `<div class="card" style="padding:17px 19px;margin-bottom:15px">
    <h3 style="margin:0 0 3px;font-size:15px">Ma trận khả năng × tác động</h3>
    <div style="font-size:12px;color:var(--mute);margin-bottom:12px">Ô càng về góc trên bên phải càng phải xử lý trước</div>
    <div style="display:flex;gap:26px;flex-wrap:wrap;align-items:flex-start">
    <div style="overflow-x:auto"><table class="mtx"><tbody>`;
  for (let kn = 5; kn >= 1; kn--){
    mtx += `<tr><th style="text-align:right;white-space:nowrap">Khả năng ${kn}</th>`;
    for (let td = 1; td <= 5; td++){
      const d = kn*td, c = d>=15?"c3":d>=8?"c2":"c1";
      const hit = mo.filter(r=>r.kn===kn && r.td===td);
      mtx += `<td class="${c}" title="Điểm ${d}">${hit.map(r=>`<span title="${esc(r.mo)}">${r.id}</span>`).join("")}</td>`;
    }
    mtx += `</tr>`;
  }
  mtx += `<tr><th></th>` + [1,2,3,4,5].map(i=>`<th>Tác động ${i}</th>`).join("") + `</tr></tbody></table></div>
    <div style="flex:1;min-width:250px;font-size:12.5px;color:var(--mute);line-height:1.65">
      <div style="margin-bottom:9px"><span class="tag r">Cao</span> tích ≥ 15 — phải có biện pháp và ngày rà lại</div>
      <div style="margin-bottom:9px"><span class="tag a">Trung bình</span> tích 8–14 — theo dõi, chưa cần hành động</div>
      <div style="margin-bottom:12px"><span class="tag g">Thấp</span> tích ≤ 7 — ghi để không quên</div>
      <div><b style="color:var(--ink)">Thang 1–5 là ước lượng chủ quan</b>, không phải xác suất đo được.
        Giá trị của ma trận nằm ở chỗ nó bắt mọi người nói ra con số để tranh luận,
        chứ không nằm ở độ chính xác của tích hai số.</div>
    </div></div></div>`;
  h += mtx;

  h += `<div class="msp"><table><thead><tr>
    <th style="width:48px">Mã</th><th style="min-width:320px">Rủi ro</th><th>Khả năng</th><th>Tác động</th>
    <th>Mức</th><th>Người canh</th><th style="min-width:280px">Biện pháp giảm nhẹ</th><th>Trạng thái</th>
    </tr></thead><tbody>` + rs.sort((a,b)=>(b.kn*b.td)-(a.kn*a.td)).map(r=>{
      const m = mucRuiRo(r.kn,r.td), st = RR_TT[r.tt];
      return `<tr class="${m[0]==="Cao"&&r.tt!=="DA_DONG"?"gang2":""}">
        <td class="cot"><b>${r.id}</b></td>
        <td class="cot" style="left:48px"><span class="tn2">${esc(r.mo)}</span></td>
        <td class="num">${r.kn}</td><td class="num">${r.td}</td>
        <td><span class="tag ${m[1]}">${m[0]}</span></td>
        <td>${esc(U[r.nguoi].ten)}</td>
        <td><span class="tn2">${esc(r.bp)}</span></td>
        <td><span class="tag ${st[1]}">${st[0]}</span></td></tr>`; }).join("") + `</tbody></table></div>
    <div class="vd" style="margin-top:14px"><b>Rủi ro khác việc.</b> Việc là thứ chắc chắn phải làm.
      Rủi ro là thứ có thể xảy ra và nếu xảy ra thì hỏng. Trộn hai thứ vào một danh sách thì rủi ro
      luôn bị đẩy xuống cuối vì nó chưa xảy ra — đó là lý do sổ rủi ro phải để riêng.
      Mỗi rủi ro bắt buộc có <b>một người canh</b>; không có tên người thì dòng đó chỉ là lời than.</div>`;
  return h;
}

function daNguonLuc(p){
  const n = viecDA(p.id).filter(t => !conCua(t.id).length);
  const per = {};
  n.forEach(t => { const k = t.lam; (per[k] = per[k] || {mo:0, xong:0, tre:0, ngay:0, dk:0}); 
    if (t.tt === "HOAN_THANH") per[k].xong++; else { per[k].mo++; if (quaHan(t)) per[k].tre++; }
    per[k].ngay += ngayCong(t.bd, t.han); per[k].dk += (t.dk||1); });
  const ds = Object.entries(per).sort((a,b)=>b[1].ngay-a[1].ngay);
  if (!ds.length) return khungTrong("Dự án chưa có việc lá nào giao cho ai.");
  const tongNgay = ds.reduce((a,x)=>a+x[1].ngay,0);
  let h = `<div class="msp"><table><thead><tr>
    <th style="min-width:210px">Người</th><th>Việc trong dự án</th><th>Đang mở</th><th>Đã xong</th><th>Đang trễ</th>
    <th>Ngày công gánh</th><th>Tỷ trọng trong dự án</th><th>Tải cả tuần này</th></tr></thead><tbody>`
   + ds.map(([uid,x])=>{ const tw = taiTuanNay(uid), qua = tw > SUC_TUAN;
      return `<tr class="${x.tre?"gang2":""}">
        <td class="cot"><div style="display:flex;align-items:center;gap:8px">${avHTML(uid,26)}
          <div><b>${esc(U[uid].ten)}</b><div style="font-size:11px;color:var(--mute)">${esc(U[uid].cd)}</div></div></div></td>
        <td class="num">${x.mo+x.xong}</td><td class="num">${x.mo}</td><td class="num">${x.xong}</td>
        <td class="num" style="${x.tre?"color:var(--red);font-weight:700":""}">${x.tre||"—"}</td>
        <td class="num">${soNgayLe(x.ngay)}</td>
        <td class="num"><span class="mini"><i style="width:${Math.round(x.ngay/tongNgay*100)}%"></i></span>
          ${Math.round(x.ngay/tongNgay*100)}%</td>
        <td class="num" style="${qua?"color:var(--red);font-weight:700":""}">${soNgayLe(tw)} / ${SUC_TUAN}</td>
      </tr>`; }).join("") + `</tbody></table></div>
    <div class="note" style="margin-top:14px">Cột cuối là tải của người đó trên <b>toàn bộ công ty</b> tuần này,
      không riêng dự án. Nó trả lời câu hỏi thật sự cần trả lời khi giao thêm việc:
      người này còn chỗ trống không, chứ không phải người này bận mấy việc trong dự án của tôi.</div>`;
  return h;
}

function daQuyetDinh(p){
  const qs = QUYET_DINH.filter(q=>q.da===p.id).sort((a,b)=>parse(b.ngay)-parse(a.ngay));
  if (!qs.length) return khungTrong("Dự án này chưa ghi quyết định nào.");
  return qs.map(q => `<div class="card" style="padding:16px 19px;margin-bottom:11px">
      <div style="display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;margin-bottom:9px">
        <b style="font-size:14.5px;flex:1;min-width:220px">${esc(q.nd)}</b>
        <span class="tag m">${q.ngay}</span></div>
      <dl class="dl2">
        <dt>Người quyết</dt><dd>${esc(q.boi)}</dd>
        <dt>Vì sao quyết vậy</dt><dd>${esc(q.vi)}</dd>
        <dt>Đánh đổi</dt><dd>${esc(q.ah)}</dd>
      </dl></div>`).join("")
    + `<div class="vd"><b>Vì sao phải ghi lại quyết định.</b> Sáu tháng sau, khi có người hỏi
      "sao hồi đó không thuê tư vấn", không ai còn nhớ lý do và cuộc họp sẽ tranh luận lại từ đầu.
      Ghi <b>lý do</b> và <b>cái đánh đổi</b> ngay lúc quyết là cách rẻ nhất để không phải quyết lại lần hai.
      Trường bắt buộc là <b>vì sao</b> — quyết định không có lý do thì sau này không kiểm tra được là đúng hay sai.</div>`;
}

/* Hàng nút tạo việc — dùng chung ở Việc của tôi và Theo dõi, để tạo việc được ngay
   tại chỗ đang làm việc chứ không phải đi tìm một cửa sổ khác. */
function nutTao(gon){
  return `<div class="tmb${gon?" gon":""}">
      <button class="btn p${gon?"":" lon"}" onclick="moTao('CONG_VIEC')"><span>＋</span> Tạo việc mới</button>
      ${[["DU_AN","Dự án","▤"],["CHU_KY","Việc lặp","↻"],["DOT_XUAT","Đột xuất","!"]]
        .map(([k,n,i])=>`<button class="btn" onclick="moTao('${k}')"><span class="tmi">${i}</span> ${n}</button>`).join("")}
      ${gon?"":`<span class="tmg">${coQuyen(me,"giao_viec") && capDuoi().length
        ? "Giao cho người trong nhánh của bạn, hoặc tự tạo việc cho chính mình."
        : "Bạn tự tạo việc cho chính mình — người nghiệm thu vẫn là trưởng đơn vị."}</span>`}
    </div>`;
}
function vCong(){
  const mt = VIEWS.find(v=>v[0]===VIEW) || VIEWS[0];
  /* Ba cửa sổ kia đều mở đầu bằng một hàng ô số, riêng Theo dõi không có — đọc bốn cửa sổ
     liền nhau thì thấy hụt. Bốn ô ở đây đếm trên ĐÚNG tập đang lọc, nên đổi bộ lọc là số đổi theo. */
  const _tvDay = T.filter(t => xemDuoc(t) && hopLoc(t));
  const _tv = _tvDay.filter(viecTamDH);
  const _mo = _tv.filter(viecMo);
  return `<h1 class="h1">Theo dõi</h1>${vaiCuaSo("cong")}${daiOng(_tv.length, _tvDay.length, "việc")}
    <p class="sub">Cùng một tập việc, sáu lăng kính. Đang xem: <b>${esc(mt[1])}</b> — ${esc(mt[2])}.
    Muốn tác động vào một việc thì bấm vào dòng của nó; muốn duyệt và gỡ tắc thì sang <b>Điều hành</b>.</p>
    ` + thanhLoc() + oKPI([
      ["Việc mở trong bộ lọc", _mo.length, `trên ${_tv.length} việc khớp bộ lọc đang đặt`, ""],
      ["Quá hạn trong bộ lọc", _mo.filter(quaHan).length,
        _mo.filter(quaHan).length?"đổi bộ lọc thì con số này đổi theo":"không việc nào quá hạn",
        _mo.filter(quaHan).length?"var(--red)":"#1B5E20"],
      ["Cần can thiệp trong bộ lọc", _mo.filter(canCanThiep).length, "gồm cả việc sắp vỡ, chưa nhận và đang tắc",
        _mo.filter(canCanThiep).length?"var(--amb)":"#1B5E20"],
      ["Đã nghiệm thu", _tv.filter(t=>t.tt==="HOAN_THANH").length, "trong tập đang lọc", ""],
    ]) + `
    <div class="vsw">${VIEWS.map(([k,n,d])=>
      `<button class="${VIEW===k?"on":""}" onclick="setView('${k}')" title="${esc(d)}">${n}</button>`).join("")}</div>
    ` + ({bang:wBang, kanban:wKanban, gantt:wGantt, lich:wLich, tai:wTai, bd:wBieuDo}[VIEW] || wBang)();
}

/* trạng thái rút gọn dùng cho biểu đồ: quá hạn tách riêng khỏi đang làm */
function nhomTT(t){
  if (t.tt === "HOAN_THANH") return "HOAN_THANH";
  if (quaHan(t)) return "QUA_HAN";
  if (t.tt === "CHO_DUYET" || t.tt === "CHO_DUYET_2") return "CHO_DUYET";
  if (t.tt === "MOI") return "MOI";
  return "DANG_LAM";
}

/* Cách gom nhóm của bảng Theo dõi. Cùng một tập việc, bốn cách xếp — mỗi cách trả lời
   một câu hỏi khác nhau, nên không cách nào thay được cách nào:
     · Dự án   — việc này thuộc dự án nào, dự án đó đang tới đâu
     · Người   — ai đang ôm những việc gì
     · Đơn vị  — phòng nào đang gánh gì
     · Không gom — danh sách phẳng, xếp theo mức gấp, để quét nhanh
   Trước đây chỉ có cách gom theo cây dự án và không đổi được. */
const GOM_TEN = {duan:"Dự án", nguoi:"Người thực hiện", donvi:"Đơn vị", khong:"Không gom"};
let GOM = "duan";
function setGom(k){ GOM = k; ZIP = new Set(); MO_HET = new Set(); draw(); }
let ZIP = new Set();                       /* nhóm đang thu gọn */
let DAY = "thoang";                        /* độ dày dòng: thoang | gon */
let MO_HET = new Set();                    /* nhóm đã bấm "xem hết", bỏ chặn số dòng */
const TRAN_DONG = 12;                      /* số dòng tối đa mỗi nhóm trước khi chặn */
function setDay(v){ DAY = v; draw(); }
function moHet(k){ MO_HET.add(k); draw(); }
/* Bảng dài thì thu gọn sẵn. Ngưỡng đặt theo SỐ DÒNG chứ không theo số nhóm:
   ba nhóm mà mỗi nhóm 40 dòng vẫn là bảng dài. */
function tuThuGon(nhom){
  if (ZIP._daTinh === GOM) return;
  const tong = nhom.reduce((a,g) => a + g.items.length, 0);
  if (tong > 40 && nhom.length > 1)
    ZIP = new Set(nhom.filter(g => g.goc || g.tuGom).map(g => g.key));
  ZIP._daTinh = GOM;
}
function togZip(k){ ZIP.has(k) ? ZIP.delete(k) : ZIP.add(k); draw(); }
function zipAll(v){ ZIP = v ? new Set(nhomBang().filter(g=>g.goc||g.tuGom).map(g=>g.key)) : new Set();
  ZIP._daTinh = GOM; draw(); }

/* Gom việc thành nhóm: mỗi cây là một nhóm, các việc lẻ gộp vào một nhóm cuối. */
function nhomBang(){
  const co = T.filter(t => xemDuoc(t) && hopLoc(t) && viecTamDH(t));
  const xepGap = (a,b)=>{ const o={CHO_DUYET:0,CHO_DUYET_2:0,TRA_LAI:1,DANG_LAM:2,MOI:3,HOAN_THANH:4};
    return (o[a.tt]-o[b.tt]) || (conLai(a)-conLai(b)); };

  if (GOM === "khong")
    return [{key:"__phang", goc:null, phang:true, khop:co.length,
             items: co.slice().sort(xepGap).map(t=>({t, sau:0, mo:false}))}];

  if (GOM === "nguoi" || GOM === "donvi"){
    const khoa = t => GOM === "nguoi" ? t.lam : (U[t.lam] ? U[t.lam].dv : "?");
    const ten  = k => GOM === "nguoi" ? (U[k] ? `${U[k].ten} — ${U[k].cd}` : "Chưa giao ai")
                                      : (DV[k] ? DV[k].ten : "Không rõ đơn vị");
    const map = {}; co.forEach(t => (map[khoa(t)] = map[khoa(t)] || []).push(t));
    return Object.entries(map)
      .sort((a,b) => b[1].filter(viecMo).length - a[1].filter(viecMo).length)
      .map(([k, ds]) => ({key:"g_"+k, goc:null, ten:ten(k), tuGom:true, khop:ds.length,
        phu:`${ds.filter(viecMo).length} việc đang mở · ${ds.filter(quaHan).length} quá hạn${
          GOM==="nguoi" ? ` · tải ${soNgayLe(taiTuanNay(k))}/${SUC_TUAN}` : ""}`,
        items: ds.slice().sort(xepGap).map(t=>({t, sau:0, mo:false}))}));
  }

  /* mặc định: gom theo cây dự án */
  const khop = new Set(co.map(t=>t.id));
  const nhom = [], daVao = new Set();
  T.filter(t => !t.cha && xemDuoc(t) && conCua(t.id).length).forEach(g => {
    const items = []; let coKhop = false;
    (function di(t, sau){
      const ok = khop.has(t.id); if (ok) coKhop = true;
      items.push({t, sau, mo:!ok}); daVao.add(t.id);
      conCua(t.id).filter(xemDuoc).sort((a,b)=>parse(a.han)-parse(b.han)).forEach(c => di(c, sau+1)); })(g, 0);
    if (coKhop) nhom.push({key:g.id, goc:g, items, khop:items.filter(x=>!x.mo).length});
  });
  const le = co.filter(t => !daVao.has(t.id)).sort(xepGap).map(t => ({t, sau:0, mo:false}));
  if (le.length) nhom.push({key:"__le", goc:null, items:le, khop:le.length});
  return nhom;
}

/* Hàng nút nhóm việc cũ đã bỏ. Lý do ghi ở khối BA TRỤC PHÂN LOẠI phía trên:
   nó trộn ba việc khác nhau vào một hàng — "Tất cả" là một cách nhìn theo cây,
   "Dự án" và "Chu kỳ" nhảy sang đối tượng khác, "Đột xuất" mới thật sự là ô lọc.
   Nay chỉ còn MỘT bảng, một bộ cột, và bộ lọc nằm ở thanh lọc dùng chung. */
function wBang(){ return wBangRACI(); }
function wBangRACI(){
  const nhom = nhomBang();
  const soCay = nhom.filter(g=>g.goc).length;
  let h = `<div class="rk">
      <span><b>R</b>Responsible — người thực hiện, đúng 1 người</span>
      <span><b>A</b>Accountable — người duyệt, đúng 1 và khác R</span>
      <span><b>C</b>Consulted — người phối hợp, 0 đến n</span>
      <span><b>I</b>Informed — người theo dõi, hệ thống tự thêm</span>
    </div>`;
  if (!nhom.length) return h + `<div class="card empty"><div class="ic">—</div>
      ${coLoc() ? `Không việc nào khớp bộ lọc đang đặt.
        <div style="margin-top:11px"><button class="btn sm" onclick="xoaLoc()">Bỏ lọc</button></div>`
                : "Chưa có việc nào."}</div>`;
  tuThuGon(nhom);
  const tongDong = nhom.reduce((a,g) => a + g.items.length, 0);
  const dangHien = nhom.reduce((a,g) => a + ((g.goc||g.tuGom) && ZIP.has(g.key) ? 0
                     : Math.min(g.items.length, MO_HET.has(g.key) ? 1e9 : TRAN_DONG)), 0);
  h += `<div class="tdtb">
      <span class="tdl">Gom theo</span>
      <div class="sg">${Object.entries(GOM_TEN).map(([k,v])=>
        `<button class="${GOM===k?"on":""}" onclick="setGom('${k}')">${v}</button>`).join("")}</div>
      <span class="lsep"></span>
      <span class="tdl">Độ dày</span>
      <div class="sg">${[["thoang","Thoáng"],["gon","Gọn"]].map(([k,v])=>
        `<button class="${DAY===k?"on":""}" onclick="setDay('${k}')">${v}</button>`).join("")}</div>
      ${GOM!=="khong"?`<span class="lsep"></span>
      <button class="btn sm" onclick="zipAll(true)">Thu gọn tất cả</button>
      <button class="btn sm" onclick="zipAll(false)">Mở tất cả</button>`:""}
      <span class="tdd">Đang hiện <b>${dangHien}</b> trên <b>${tongDong}</b> dòng${
        nhom.length>1?` · ${nhom.length} nhóm`:""}</span>
    </div>`;

  /* Cột phụ: chỉ hiện khi đã lọc về một nguồn gốc. Đây là bảng NỞ RA thêm cột,
     không phải bảng khác thay thế — bộ cột gốc giữ nguyên vị trí ở mọi lúc. */
  const phu = F.ng === "DOT_XUAT" ? [["Nguồn phát sinh",190],["Nhận sau",76]]
            : F.ng === "CHU_KY"   ? [["Tần suất",96],["Đúng hạn qua các kỳ",132]] : [];
  const SC = 10 + phu.length;
  h += `<div class="wrapx tdkh ${DAY}"><table class="tbl raci"><thead><tr>
      <th style="width:74px">Mã</th><th>Công việc</th><th style="width:62px">Ưu tiên</th>
      <th style="width:104px">Trạng thái</th><th style="width:96px">Hạn</th>
      ${phu.map(([n,w])=>`<th style="width:${w}px">${n}</th>`).join("")}
      <th class="rc">R</th><th class="rc">A</th><th class="rc">C</th><th class="rc">I</th>
      <th style="width:112px">Tiến độ</th></tr></thead><tbody>`;

  nhom.forEach(g => {
    const zip = ZIP.has(g.key);
    if (g.goc){
      const gt = tienDo(g.goc), n = g.items.length - 1;
      const kh = coLoc() ? ` · <b>${g.khop}</b> khớp bộ lọc` : "";
      const tre = g.items.filter(x => canCanThiep(x.t)).length;
      h += `<tr class="gh ${zip?"zip":""}" onclick="togZip('${g.key}')"><td colspan="${SC}">
        <div class="gt"><span class="cv">▼</span>
          <span>${esc(g.goc.ttl)}</span>
          <span class="tag ${g.goc.loai==="DU_AN"?"":"m"}">${LOAI_TEN[g.goc.loai]||"Việc"}</span>
          <span class="gs">${n} việc con · tiến độ ${gt}%${kh}${tre?` · <b style="color:var(--red)">${tre} việc cần can thiệp</b>`:""}</span>
          <button class="btn sm" style="margin-left:auto" onclick="event.stopPropagation();moDA('${g.goc.id}')"
            title="Mở cửa sổ quản trị dự án">Mở dự án →</button>
        </div></td></tr>`;
      if (zip) return;
    } else if (g.tuGom){
      h += `<tr class="gh ${zip?"zip":""}" onclick="togZip('${g.key}')"><td colspan="${SC}">
        <div class="gt"><span class="cv">▼</span><span>${esc(g.ten)}</span>
          <span class="gs">${g.phu}</span></div></td></tr>`;
      if (zip) return;
    } else if (g.phang){
      /* danh sách phẳng: không cần đầu nhóm */
    } else if (nhom.length > 1){
      h += `<tr class="gh ${ZIP.has("__le")?"zip":""}" onclick="togZip('__le')"><td colspan="${SC}">
        <div class="gt"><span class="cv">▼</span><span>Việc đơn lẻ</span>
          <span class="gs">${g.items.length} việc, không thuộc cây nào</span></div></td></tr>`;
      if (ZIP.has("__le")) return;
    }
    /* Chặn số dòng: một nhóm 40 việc thì 12 dòng đầu đã đủ để biết nhóm đó ra sao.
       Bấm "xem hết nhóm" mới nở ra — chặn mà không nói ra thì thành giấu dữ liệu. */
    const het = MO_HET.has(g.key) || g.items.length <= TRAN_DONG;
    const hien = het ? g.items : g.items.slice(0, TRAN_DONG);
    hien.forEach(({t, sau, mo}) => { h += dongBang(t, sau, mo); });
    if (!het) h += `<tr class="tdcon" onclick="moHet('${g.key}')"><td colspan="${SC}">
      Còn <b>${g.items.length - TRAN_DONG}</b> việc nữa trong nhóm này — bấm để xem hết</td></tr>`;
  });

  return h + `</tbody></table></div>
    <div class="note" style="margin-top:14px"><b>Vì sao chỉ một vai phải nhập tay.</b>
    R là người thực hiện, người giao chọn. A suy thẳng từ cây tổ chức, là trưởng đơn vị trực tiếp của R —
    đổi được nhưng khi đó trưởng đơn vị vẫn tự vào cột I. C để trống cũng được.
    I hệ thống tự thêm: người giao khi giao vượt cấp, người duyệt tầng hai khi việc vượt ngưỡng giá trị,
    và người chủ trì việc cha.</div>`;
}

function dongBang(t, sau, mo){
  const r = raci(t), st = TT[t.tt], d = dlText(t.han, t), td = tienDo(t);
  const con = conCua(t.id).filter(xemDuoc).length;
  const ind = sau ? `<span class="ind">${"│  ".repeat(sau-1)}└─ </span>` : "";
  /* Cột phụ đi kèm ô lọc nguồn gốc — xem chú thích ở wBangRACI */
  const tl = t.soKy ? t.kyDung/t.soKy : null;
  const cp = F.ng === "DOT_XUAT"
    ? `<td>${esc(t.nguon||"—")}</td><td class="num">${t.nhanSau!=null?t.nhanSau+" giờ":"—"}</td>`
    : F.ng === "CHU_KY"
    ? `<td><span class="tag m">${LAP_TEN[t.lap]||"Hằng tháng"}</span></td>
       <td class="num">${tl===null?"—":`<span class="mini"><i style="width:${tl*100}%;background:${
         tl>=0.95?"#008300":tl>=0.9?"#2a78d6":tl>=0.8?"#eda100":"#e34948"}"></i></span> ${Math.round(tl*100)}%`}</td>`
    : "";
  return `<tr onclick="openDw('${t.id}')" style="cursor:pointer${mo?";opacity:.42":""}"
      ${mo?'title="Không khớp bộ lọc — hiện làm ngữ cảnh của cây"':""}>
    <td><b>${t.id}</b></td>
    <td>${ind}${esc(t.ttl)}${ruiRoHTML(t)}
      ${con?` <span class="tag m">${con} việc con</span>`:""}
      ${t.luat?` <span class="tag law">Hạn pháp lý</span>`:""}
      ${t.sk==="TRE"?` <span class="tag r">Đang trễ</span>`:t.sk==="RR"?` <span class="tag a">Có rủi ro</span>`:""}</td>
    <td>${utHTML(t,1)}</td>
    <td><span class="tag ${st[1]}">${st[0]}</span></td>
    <td><span class="dl ${d.c}" style="font-weight:${d.c?"600":"400"}">${d.t}</span></td>
    ${cp}
    <td class="rc">${avNhom(r.R,26)}</td>
    <td class="rc">${avNhom(r.A,26)}</td>
    <td class="rc">${avNhom(r.C,26,true)}</td>
    <td class="rc">${avNhom(r.I,26,true)}</td>
    <td><div style="display:flex;align-items:center;gap:7px">
      <span class="pg" style="width:62px"><i style="width:${td}%"></i></span>
      <b style="font-size:12.5px">${td}%</b></div></td></tr>`;
}

/* ---------- 4b. CÂY CÔNG VIỆC — BIỂU ĐỒ GANTT ---------- */
let ZG = new Set();                                  /* nút đang thu gọn trên Gantt */
function togZG(id){ ZG.has(id) ? ZG.delete(id) : ZG.add(id); draw(); }
function zgAll(v){
  ZG = v ? new Set(T.filter(t=>conCua(t.id).length).map(t=>t.id)) : new Set();
  draw();
}
const D1 = 86400000;
function dCong(a, b){ return Math.round((d2(b) - d2(a)) / D1); }
function fmtD(d){ return `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}`; }
function fmtNgay(d){ return `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`; }

function wGantt(chiDA){
  const goc = chiDA ? T.filter(t => t.id === chiDA)
                    : T.filter(t => !t.cha && xemDuoc(t) && conCua(t.id).length
                        && (F.da === "TAT_CA" || F.da === t.id));
  let h = "";
  if (!goc.length) return `<div class="card empty"><div class="ic">—</div>Không có việc nhiều tầng nào bạn được xem.</div>`;

  /* danh sách dòng theo thứ tự cây, tôn trọng nút đang thu gọn */
  const rows = [];
  goc.forEach(g => (function di(t, sau){
    rows.push({t, sau});
    if (ZG.has(t.id)) return;
    conCua(t.id).filter(xemDuoc).sort((a,b)=>parse(a.bd)-parse(b.bd)).forEach(c => di(c, sau+1));
  })(g, 0));

  /* khung thời gian: lùi về thứ Hai đầu tuần, tiến tới Chủ nhật cuối tuần */
  let lo = null, hi = null;
  rows.forEach(({t}) => { const a = parse(t.bd), b = parse(t.han);
    if (!lo || a < lo) lo = a; if (!hi || b > hi) hi = b; });
  if (TODAY < lo) lo = new Date(TODAY);
  if (TODAY > hi) hi = new Date(TODAY);
  lo = new Date(lo); while (lo.getDay() !== 1) lo.setDate(lo.getDate()-1);
  hi = new Date(hi); while (hi.getDay() !== 0) hi.setDate(hi.getDate()+1);
  const nDay = dCong(lo, hi) + 1;
  const px = Math.max(3.2, Math.min(22, 1020 / nDay));
  const W = Math.round(nDay * px);
  const X = d => Math.round(dCong(lo, d) * px);

  /* nền: ô Chủ nhật, vạch đầu tuần */
  let nen = "";
  for (let i = 0; i < nDay; i++){
    const d = new Date(lo); d.setDate(d.getDate()+i);
    if (d.getDay() === 0) nen += `<span class="gt-we" style="left:${Math.round(i*px)}px;width:${Math.ceil(px)}px"></span>`;
    if (d.getDay() === 1) nen += `<span class="gt-gl" style="left:${Math.round(i*px)}px"></span>`;
  }
  const xT = X(TODAY) + Math.round(px/2);

  /* dải tháng và dải tuần */
  let dhM = "", dhW = "";
  for (let i = 0; i < nDay; ){
    const d = new Date(lo); d.setDate(d.getDate()+i);
    const cuoi = new Date(d.getFullYear(), d.getMonth()+1, 0);
    const het = Math.min(nDay, i + dCong(d, cuoi) + 1);
    const w = Math.round((het - i) * px);
    if (w > 26) dhM += `<div class="gt-mo" style="left:${Math.round(i*px)}px;width:${w}px">Tháng ${d.getMonth()+1}/${d.getFullYear()}</div>`;
    i = het;
  }
  for (let i = 0; i < nDay; i += 7){
    const d = new Date(lo); d.setDate(d.getDate()+i);
    if (px * 7 > 34) dhW += `<div class="gt-wk" style="left:${Math.round(i*px)}px;width:${Math.round(px*7)}px">${fmtD(d)}</div>`;
  }

  /* cột trái + thanh phải */
  let trai = "", phai = "";
  rows.forEach(({t, sau}, k) => {
    const con = conCua(t.id).filter(xemDuoc), la = !con.length;
    const td = tienDo(t), tre = quaHan(t);
    const cls = t.tt === "HOAN_THANH" ? "g" : tre ? "r"
              : (t.tt === "CHO_DUYET" || t.tt === "CHO_DUYET_2") ? "a" : "";
    trai += `<div class="gt-rw ${ZG.has(t.id)?"zip":""}" data-k="${k}"
        onmouseenter="hovG(${k},1)" onmouseleave="hovG(${k},0)"
        onclick="${la?`openDw('${t.id}')`:`togZG('${t.id}')`}">
      <span class="sp" style="width:${sau*13}px"></span>
      ${la ? `<span style="width:17px;flex:none"></span>` : `<span class="cv2">▼</span>`}
      ${avHTML(t.lam,20)}
      <span class="tn" title="${esc(t.ttl)} — ${esc(U[t.lam].ten)}">${esc(t.ttl)}</span>
      <b style="flex:none;font-size:11.5px;color:${tre?"var(--red)":"var(--mute)"}">${td}%</b>
    </div>`;

    const x = X(parse(t.bd)), w = Math.max(7, X(parse(t.han)) + Math.round(px) - x);
    phai += `<div class="gt-br" data-k="${k}" onmouseenter="hovG(${k},1)" onmouseleave="hovG(${k},0)">
      <div class="bar ${la?cls:"sum"}" style="left:${x}px;width:${w}px"
           title="${esc(t.ttl)}&#10;${t.bd} → ${t.han}&#10;${U[t.lam].ten} · độ khó ${t.dk} · ${td}%"
           onclick="event.stopPropagation();openDw('${t.id}')">${la?`<i style="width:${td}%"></i>`:""}</div>
      ${w > 46 ? "" : `<span class="blab" style="left:${x+w+6}px">${td}%</span>`}
    </div>`;
  });

  h += `<div style="display:flex;gap:8px;margin-bottom:11px">
      <button class="btn sm" onclick="zgAll(true)">Thu gọn tất cả</button>
      <button class="btn sm" onclick="zgAll(false)">Mở tất cả</button>
      <span style="font-size:12.5px;color:var(--mute);align-self:center">
        Bấm tên việc cha để thu gọn nhánh, bấm thanh để mở phiếu việc.</span></div>
    <div class="gt">
      <div class="gt-l"><div class="gt-hd">Công việc</div>${trai}</div>
      <div class="gt-r"><div class="gt-cv" style="width:${W}px">
        <div class="gt-hd2">${dhM}${dhW}<div class="gt-tdh" style="left:${xT}px">Hôm nay</div></div>
        <div class="gt-bd">${nen}
          <div class="gt-td" style="left:${xT}px"></div>
          ${phai}</div>
      </div></div>
    </div>
    <div class="glg">
      <span><em style="background:var(--navy)"></em>Việc cha, gộp từ việc con</span>
      <span><em style="background:var(--navy2)"></em>Đang làm</span>
      <span><em style="background:#C9922B"></em>Chờ duyệt</span>
      <span><em style="background:#2E7D32"></em>Hoàn thành</span>
      <span><em style="background:var(--red)"></em>Quá hạn</span>
      <span><em style="background:#F2F5F8;box-shadow:inset 0 0 0 1px var(--line)"></em>Chủ nhật</span>
    </div>
    <div class="note" style="margin-top:14px"><b>Vì sao không dùng trung bình cộng.</b>
    Với bốn việc con trọng số 1, 1, 5, 8 đạt lần lượt 100%, 100%, 50%, 0% thì trung bình cộng cho 62,5%
    còn trung bình có trọng số cho 30%. Ban Giám đốc sẽ quyết định trên một con số sai gấp đôi nếu dùng cách thứ nhất.</div>
    <div class="note" style="margin-top:10px;background:var(--ambbg);border-color:#EBD9A0;border-left-color:var(--amb)">
    <b>Ràng buộc trước sau đã có, mũi tên phụ thuộc thì chưa vẽ.</b> Quan hệ “xong A mới bắt đầu B”
    được khai trong dữ liệu và đường găng tính được — xem cột <b>Việc trước</b> và <b>Dự trữ</b>
    ở cửa sổ Dự án. Hình này mới chỉ vẽ thanh thời gian, chưa nối mũi tên giữa các thanh.</div>`;
  return h;
}
/* ================= 7. BẢNG DỰ ÁN KIỂU MICROSOFT PROJECT =================
   Bảng nhập liệu quen thuộc của Microsoft Project: mã phân rã công việc, tên thụt theo cấp,
   thời lượng, bắt đầu, kết thúc, việc trước, người thực hiện, phần trăm hoàn thành,
   dự trữ toàn phần, và đánh dấu đường găng.
   Cố ý CHỈ dùng quan hệ "xong A mới bắt đầu B" — lý do trong Tập 3. */


function khungTrong(msg){ return `<div class="card empty"><div class="ic">—</div>${msg}</div>`; }
/* Phần tử thứ năm là MÃ CHỈ SỐ. Có mã thì ô số bấm được và bung ra danh sách sinh ra nó;
   không có thì ô số hiển thị như cũ — mọi màn hình đang dùng oKPI không phải sửa gì. */
function oKPI(a){ return `<div class="kpi" style="margin-bottom:13px">${a.map(([l,v,h,m,k])=>
  `<div class="c${k?" bam"+(SO_MO===k?" mo":""):""}"${k?` onclick="moSo('${k}')"`:""}>
     <div class="l">${l}</div><div class="v"${m?` style="color:${m}"`:""}>${v}</div><div class="h">${h}</div>
     ${k?`<div class="kbam">${SO_MO===k?"đóng danh sách ⌃":"xem danh sách ⌄"}</div>`:""}</div>`).join("")}</div>
  ${SO_MO && a.some(x=>x[4]===SO_MO) ? khoiSo(SO_MO) : ""}`; }

/* ---------- A. CÔNG VIỆC THƯỜNG ---------- */

/* ---------- B. DỰ ÁN ---------- */
function bangDuAn(gocId){
  const goc = find(gocId);
  if (!goc) return khungTrong("Không tìm thấy dự án.");
  const c = cpm(goc.id), w = wbs(goc.id), FB = duBao(goc.id);
  if (!c) return khungTrong("Ràng buộc trước sau đang tạo thành vòng tròn — không tính được lịch.");
  const thu = [];
  (function di(x){ thu.push(x); conCua(x.id).sort((a,b)=>parse(a.bd)-parse(b.bd)).forEach(di); })(goc);
  const gang = thu.filter(t => c.R[t.id] && c.R[t.id].gang && !conCua(t.id).length);
  const bd0 = thu.reduce((a,t)=> parse(t.bd) < parse(a) ? t.bd : a, goc.bd);

  const lc = lichDA(goc);
  return oKPI([
    ["Thời lượng kế hoạch", soNgayLe(lc.span), `ngày công, từ ${bd0} tới ${lc.ketKH}`, ""],
    ["Việc trên đường găng", gang.length, `trên ${thu.filter(t=>!conCua(t.id).length).length} việc lá — trễ một việc là trễ cả dự án`, VM.QUA_HAN.mau],
    ["Tiến độ dự án", tienDo(goc)+"%", "gộp có trọng số theo độ khó", ""],
    /* Ô "Dự kiến kết thúc" cũ đã bỏ: nó cộng độ dài chuỗi găng vào ngày bắt đầu, xoá mất
       khoảng chờ trong kế hoạch và cho ra "sớm hơn hạn 43 ngày" cho dự án còn chưa khởi động. */
    ["Chuỗi găng cần", soNgayLe(lc.gang) + " ngày",
      lc.gang > lc.span ? `nhiều hơn kế hoạch ${soNgayLe(lc.gang-lc.span)} ngày — lịch tự mâu thuẫn` : "nằm gọn trong kế hoạch",
      lc.gang > lc.span ? "var(--red)" : "#1B5E20"],
  ]) + (c.boQua.length ? `<div class="vd" style="margin-bottom:13px"><b>${c.boQua.length} ràng buộc trước sau không dùng được.</b>
      ${c.boQua.map(b=>`Việc <b>${esc(b.t.ttl)}</b> khai phải đợi <b>${esc(b.x)}</b>, nhưng mã đó không nằm trong dự án này`).join(" · ")}.
      Cột <b>Dự trữ</b> và <b>Đường găng</b> đang tính như không có các ràng buộc đó.</div>` : "")
    + `<div class="msp"><table><thead><tr>
      <th style="width:52px">Mã</th><th style="min-width:340px">Tên công việc</th><th>Thời lượng</th>
      <th>Bắt đầu</th><th>Hạn cam kết</th><th>Dự kiến xong</th><th>Lệch</th>
      <th>Việc trước</th><th>Người thực hiện</th>
      <th>% hoàn thành</th><th>Dự trữ</th><th>Đường găng</th><th style="width:96px"></th></tr></thead><tbody>
    ${thu.map(t=>{ const r=c.R[t.id], la=!conCua(t.id).length, sau=(w[t.id].split(".").length-1);
      const truoc=(t.truoc||[]).map(x=>w[x]||x).join(", "), td=tienDo(t);
      return `<tr class="${la?"":"sum2"} ${r&&r.gang?"gang2":""}" onclick="openDw('${t.id}')" style="cursor:pointer">
      <td class="cot"><span class="wb">${w[t.id]}</span></td>
      <td class="cot" style="left:52px"><span style="display:inline-block;width:${sau*15}px"></span>
        <span class="tn2" title="${esc(t.ttl)}">${esc(t.ttl)}</span></td>
      <td class="num">${soNgayLe(r?r.dur:0)} ngày</td>
      <td>${t.bd}</td><td>${t.han}</td>
      <td>${FB[t.id]?fmtNgay(FB[t.id].ket):"—"}</td>
      <td><span class="tag ${nhanLech(lechDuBao(t,FB))[1]}">${nhanLech(lechDuBao(t,FB))[0]}</span></td>
      <td>${truoc||"—"}</td>
      <td>${la?esc(U[t.lam].ten):"—"}</td>
      <td class="num"><span class="mini"><i style="width:${td}%"></i></span> ${td}%</td>
      <td class="num" style="${r&&r.DT===0?"color:var(--red);font-weight:700":""}">${r?soNgayLe(r.DT):"—"}</td>
      <td>${r&&r.gang?`<span class="tag r">Đường găng</span>`:`<span class="tag m">Có dự trữ</span>`}</td>
      <td>${sau<3?`<button class="btn sm" onclick="event.stopPropagation();moNganGiao('${t.id}')" title="Tạo việc con nằm dưới việc này">+ Việc con</button>`:`<span style="color:var(--mute);font-size:11.5px">tầng cuối</span>`}</td></tr>`;}).join("")}
    </tbody></table></div>
    <div class="note" style="margin-top:14px"><b>Hai cột ngày, hai nghĩa khác nhau.</b>
      <b>Hạn cam kết</b> do người giao đặt, chỉ người đổi được, mỗi lần đổi vào nhật ký —
      chấm điểm đúng hạn đo vào cột này. <b>Dự kiến xong</b> do máy suy từ tiến độ thật và
      ràng buộc trước sau, trôi tự do, không ai bị chấm điểm vào nó. Cột <b>Lệch</b> là
      khoảng cách giữa hai cột đó, và nó là cảnh báo sớm: nó lớn dần ngay khi việc bắt đầu
      trượt chứ không đợi tới lúc quá hạn. Dự báo chỉ đẩy muộn, không kéo sớm hơn kế hoạch.</div>
    <div class="note" style="margin-top:11px"><b>Cách đọc.</b> Cột <b>Việc trước</b> ghi mã phân rã của việc phải xong trước.
      Cột <b>Dự trữ</b> là số ngày được phép trễ mà dự án vẫn về đích — bằng 0 nghĩa là nằm trên <b>đường găng</b>.
      Việc cha in đậm, thời lượng và tiến độ gộp từ việc con.</div>
    <div class="vd" style="margin-top:11px"><b>Vì sao chỉ có một loại quan hệ trước sau, và chỗ lập luận này từng sai.</b>
      Microsoft Project có bốn loại quan hệ và ba nhóm ràng buộc ngày cứng. Quan hệ
      <b>xong A mới bắt đầu B</b> giải quyết trên 90% ca thực tế, nên bỏ ba loại kia vẫn đúng.
      <br><br>Nhưng câu đó trả lời <i>cần mấy loại quan hệ</i>, không trả lời <i>quan hệ có được phép
      tác động hay không</i>. Bản trước để ngày là dữ liệu người gõ vào, nên mỗi việc mang sẵn một ràng
      buộc "phải bắt đầu đúng ngày" — đúng thứ mà chính ghi chú này gọi là nguồn gốc của lịch vỡ,
      chỉ khác là Project cho nó là tuỳ chọn còn ở đây nó thành bắt buộc trên mọi dòng.
      Đo được: <b>5 trên 5 ràng buộc không hề tác động tới ngày đã ghi</b>. Khai "phải đợi việc kia xong"
      mà ngày vẫn đứng yên thì cái khai đó chỉ là trang trí.
      <br><br>Lời giải không phải cho ngày tự trôi — hạn là lời hứa giữa hai người và là thước đo chấm điểm,
      máy tự dời hạn thì tỷ lệ đúng hạn luôn đẹp và cả cơ chế chấm điểm thành vô nghĩa.
      Lời giải là <b>tách hạn cam kết khỏi ngày dự kiến</b>: hạn giữ nguyên do người đặt, ngày dự kiến
      do máy tính và được phép trôi. Ràng buộc trước sau từ đó mới thật sự có tác dụng — nó đẩy
      ngày dự kiến, không đụng vào lời hứa.</div>`;
}

const LAP_TEN = {NGAY:"Hằng ngày", TUAN:"Hằng tuần", THANG:"Hằng tháng", QUY:"Hằng quý"};
/* =====================================================================
   BỘ SINH KỲ CHO VIỆC CHU KỲ  (khoảng trống B2 — đã chốt vào bản 1)

   Một quy tắc lặp KHÔNG phải một việc: nó là bộ sinh, đẻ ra nhiều kỳ, mỗi kỳ mới
   là một việc bình thường có hạn riêng, người làm riêng, điểm riêng.

   Hai chỗ dễ sai:
     · Kỳ rơi vào Chủ nhật hoặc ngày lễ — phải dời, và dời về TRƯỚC chứ không phải
       về sau. Hạn nộp thuế rơi vào mùng 2 Tết mà dời sang sau Tết là quá hạn luật định.
     · Sinh trùng — mở phần mềm hai lần trong ngày không được đẻ ra hai kỳ giống nhau.
       Mỗi kỳ mang khoá kỳ duy nhất, có rồi thì thôi.
   ===================================================================== */
function ngayLamViecTruoc(d){        /* lùi về ngày làm việc gần nhất phía trước */
  const x = new Date(d); let v = 0;
  while (congCuaNgay(x) === 0 && v++ < 30) x.setDate(x.getDate()-1);
  return x;
}
function ngaySauCuaKy(t, tuHan){
  const d = tuHan ? parse(tuHan) : parse(t.han);
  if (t.lap === "NGAY")      d.setDate(d.getDate()+1);
  else if (t.lap === "TUAN") d.setDate(d.getDate()+7);
  else if (t.lap === "QUY")  d.setMonth(d.getMonth()+3);
  else                       d.setMonth(d.getMonth()+1);
  if (t.ngayKy && t.lap !== "NGAY" && t.lap !== "TUAN"){
    const n = Number(t.ngayKy);
    if (n) d.setDate(Math.min(n, new Date(d.getFullYear(), d.getMonth()+1, 0).getDate()));
  }
  /* Hạn pháp lý LUÔN dời về TRƯỚC ngày nghỉ — đây là ràng buộc luật, quản trị không đổi được.
     Việc nội bộ dời theo hướng người quản trị chọn (mặc định SAU cho đỡ dồn trước kỳ nghỉ). */
  if (t.luat) return ngayLamViecTruoc(d);
  return (CH.ckDoiNoiBo === "TRUOC") ? ngayLamViecTruoc(d) : ngayLamViec(d);
}
function khoaKy(t, han){
  const d = parse(han);
  return t.lap === "NGAY" || t.lap === "TUAN" ? `${t.id}:${han}`
       : t.lap === "QUY"  ? `${t.id}:Q${Math.floor(d.getMonth()/3)+1}/${d.getFullYear()}`
       : `${t.id}:${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;
}
function kySau(t){ return fmtD(ngaySauCuaKy(t)); }
function kySauDay(t){ return fmtNgay(ngaySauCuaKy(t)); }
/* Sinh kỳ tiếp theo. Trả về mã việc mới, hoặc null nếu kỳ đó đã có. */
function sinhKy(quyTacId){
  const q = find(quyTacId); if (!q) return null;
  /* Chỉ sinh khi KỲ HIỆN TẠI ĐÃ TỚI HẠN. Thiếu điều kiện này thì bấm nút bao nhiêu lần
     sẽ đẻ ra bấy nhiêu kỳ tương lai — khoá chống trùng không cứu được, vì mỗi lần
     quy tắc tiến một kỳ nên khoá lần sau đã khác. */
  if (!q.lap || !LAP_TEN[q.lap]) return null;   /* thiếu tần suất thì không đoán bừa là hằng tháng */
  if (q.tam) return null;                       /* quy tắc đang tạm dừng — quản trị tắt có chủ đích */
  /* Ba tham số dưới đây do người quản trị đặt ở Thiết lập › Việc lặp, không nằm cứng trong mã. */
  const som = new Date(d2(parse(q.han))); som.setDate(som.getDate() - (CH.ckSinhTruoc || 0));
  if (d2(som) > d2(TODAY)) return null;          /* chưa tới ngưỡng sinh sớm */
  const dangMo = T.filter(x => x.tuQuyTac === q.id && viecMo(x)).length;
  if (dangMo >= (CH.ckTranMo || 99)) return null; /* đã dồn quá số kỳ mở cho phép */
  const hanMoi = kySauDay(q);
  const khoa = khoaKy(q, hanMoi);
  if (T.some(x => x.khoaKy === khoa)) return null;         /* đã sinh rồi, không đẻ trùng */
  const id = "CV-" + (++SEQ);
  const bd = fmtNgay(ngayLamViec(parse(q.han)));
  T.unshift({
    id, ttl:`${q.ttl} — kỳ ${hanMoi.slice(3)}`, tt:"MOI", giao:q.giao, lam:q.lam,
    bd, han:hanMoi, dk:q.dk, luat:q.luat, sp:q.sp, mucdich:q.mucdich,
    tc:(q.tc||[]).map(c=>({t:c.t, d:false})), buoc:(q.buoc||[]).map(c=>({t:c.t, d:false})),
    loai:"CHU_KY", lap:q.lap, ngayKy:q.ngayKy, tuQuyTac:q.id, khoaKy:khoa,
    mat:q.mat||"NOI_BO", han_goc:hanMoi, doi:0, ah:q.ah, kc:q.kc,
    phoihop:(q.phoihop||[]).slice(), theodoi:[], duyet:q.duyet||null,
    tien:0, tienLoai:"CHI", sk:"BT", bc:!!q.bc, files:[], cha:null, truoc:[], chuoi:null, ci:0,
    log:[{w:"Hệ thống", k:`sinh kỳ tự động từ quy tắc ${q.id}`, t:NOW, s:1}],
  });
  q.soKy = (q.soKy||0) + 1;
  q.han  = hanMoi;                    /* quy tắc tiến sang kỳ kế tiếp */
  NT.unshift({to:q.lam, ic:"", tx:`Kỳ mới của việc lặp <b>${esc(q.ttl)}</b> đã vào hộp việc của bạn`, tm:NOW, un:1, go:id});
  return id;
}
function sinhKyTatCa(){
  const ds = T.filter(t => xemDuoc(t) && laCK(t) && !t.tuQuyTac);
  const chuaToi = ds.filter(q => d2(parse(q.han)) > d2(TODAY)).length;
  const moi = ds.map(q => sinhKy(q.id)).filter(Boolean);
  draw();
  toast(moi.length ? `Đã sinh ${moi.length} kỳ mới · ${chuaToi} quy tắc chưa tới kỳ nên bỏ qua`
                   : `Không quy tắc nào tới kỳ — ${chuaToi} quy tắc còn trong kỳ hiện tại`);
}
/* ---------- C. CHU KỲ ---------- */
let LAP_TRUOC = null;
function soViecLap(){
  /* Hai lỗi của bản trước, cùng một gốc: màn này và màn Thiết lập › Việc lặp cùng nói về
     một tập quy tắc nhưng đếm theo hai cách, và ô số ở đây không bấm được trong khi mọi
     ô số khác đều bấm được.
       · "Tổng số kỳ đã chạy 205" nằm ngay trên "Đã sinh 0 kỳ từ các quy tắc này" —
         hai con số đúng nhưng nhãn không phân biệt: 205 là sổ cộng dồn của từng quy tắc
         (dữ liệu lịch sử), 0 là số kỳ bộ sinh đã đẻ ra trong phiên chạy thử. Nay đặt cạnh
         nhau trong một câu, có nhãn rõ, thay vì đứng hai chỗ chỏi nhau.
       · Ô số ở đây bỏ qua quy tắc đang TẠM DỪNG nên đếm 9 trong khi Thiết lập đếm khác.
         Nay hai màn dùng chung đúng một bộ mã chỉ số. */
  const THU_LAP = {NGAY:0, TUAN:1, THANG:2, QUY:3};
  const l = T.filter(t => xemDuoc(t) && laCK(t) && !t.tuQuyTac)
    .sort((a,b) => ((THU_LAP[a.lap]==null?9:THU_LAP[a.lap]) - (THU_LAP[b.lap]==null?9:THU_LAP[b.lap]))
                || (parse(a.han) - parse(b.han)));
  const daSinh = T.filter(t => t.tuQuyTac && xemDuoc(t));
  if (!l.length) return khungTrong("Chưa có việc chu kỳ nào.");
  const chay = l.filter(t => !t.tam), dung = l.filter(t => t.tam);
  const nguong = new Date(new Date(TODAY).getTime() + (CH.ckSinhTruoc||0)*864e5);
  const toi = chay.filter(q => d2(parse(q.han)) <= d2(nguong));
  const tongKy = l.reduce((a,t)=>a+(t.soKy||0),0), tongDung = l.reduce((a,t)=>a+(t.kyDung||0),0);
  const tl = tongKy ? Math.round(tongDung/tongKy*100) : null;
  const yeu = l.filter(t => t.soKy && (t.kyDung||0)/t.soKy < 0.9);
  return oKPI([
    ["Quy tắc đang chạy", chay.length, dung.length?`${dung.length} quy tắc đang tạm dừng`:"không quy tắc nào tạm dừng", "", "LAP::chay"],
    ["Sắp tới kỳ", toi.length, toi.length?"bấm sinh kỳ là đẻ ra ngay":"chưa quy tắc nào tới ngưỡng", toi.length?"#2a78d6":"", toi.length?"LAP::toi":""],
    ["Đúng hạn cả nhóm", tl!=null?tl+"%":"—", `trên ${tongKy} kỳ đã chạy`, tl!=null&&tl<90?VM.CHO_DUYET.mau:"#008300"],
    ["Quy tắc dưới 90%", yeu.length, yeu.length?"cần xem lại cách bố trí việc":"tất cả đều ổn định",
      yeu.length?VM.CHO_DUYET.mau:"#008300", yeu.length?"LAP::yeu":""],
  ]) + `<div class="lkgv">
      <button class="btn p" onclick="sinhKyTatCa()">Sinh kỳ tiếp theo cho tất cả</button>
      <span><b>${tongKy}</b> kỳ đã chạy theo sổ cộng dồn của từng quy tắc ·
        <b>${daSinh.length}</b> kỳ do bộ sinh đẻ ra trong phiên chạy thử này.
        Bấm hai lần không đẻ ra kỳ trùng — mỗi kỳ mang một khoá duy nhất.</span>
      ${coQuyen(me,"sua_to_chuc")?`<button class="btn" onclick="TAB='qt';QT_TAB='ck';draw()">Sửa tham số việc lặp →</button>`:""}
    </div>
    <div class="msp tdkh"><table><thead><tr>
    <th style="width:70px">Mã</th><th style="min-width:172px">Tên việc lặp</th><th style="min-width:100px">Tần suất</th>
    <th style="min-width:124px">Người thực hiện</th><th style="min-width:106px">Kỳ này</th><th style="min-width:100px">Trạng thái</th>
    <th style="min-width:152px">Đúng hạn qua các kỳ</th>
    <th style="min-width:100px">Kỳ tiếp theo</th></tr></thead><tbody>
    ${(LAP_TRUOC = null, l.map(t=>{ const d=dlText(t.han,t), st=TT[t.tt];
      const tl = t.soKy ? t.kyDung/t.soKy : null;
      const mau = tl===null?"":tl>=0.95?"#008300":tl>=0.9?"#2a78d6":tl>=0.8?"#eda100":"#e34948";
      const dauN = t.lap !== LAP_TRUOC ? (LAP_TRUOC = t.lap,
        `<tr class="mocth"><td colspan="8">${LAP_TEN[t.lap]||"Không rõ tần suất"} — ${
          l.filter(z=>z.lap===t.lap).length} quy tắc${
          l.filter(z=>z.lap===t.lap&&quaHan(z)&&!z.tam).length?` · ${l.filter(z=>z.lap===t.lap&&quaHan(z)&&!z.tam).length} đang quá hạn`:""}</td></tr>`) : "";
      return dauN + `<tr onclick="openDw('${t.id}')" style="cursor:pointer" class="${quaHan(t)&&!t.tam?"gang2":""} ${t.tam?"mo50":""}">
      <td class="cot"><b>${t.id}</b></td>
      <td class="cot" style="left:74px"><span class="tn2" title="${esc(t.ttl)}">${esc(t.ttl)}</span>${ruiRoHTML(t)}</td>
      <td><span class="tag m">${LAP_TEN[t.lap]||"Hằng tháng"}</span></td>
      <td>${esc(U[t.lam].ten)}</td>
      <td><span class="dl ${d.c}">${d.t}</span></td>
      <td><span class="tag ${st[1]}">${st[0]}</span></td>
      <td>${tl===null?`<span style="color:var(--mute)">chưa có kỳ nào</span>`
        : `<span style="display:flex;align-items:center;gap:7px"><span class="mini"><i style="width:${tl*100}%;background:${mau}"></i></span>
             <b style="color:${mau}">${Math.round(tl*100)}%</b></span>
           <div style="font-size:11px;color:var(--mute)">trên ${t.soKy} kỳ đã chạy</div>`}</td>
      <td>${t.tam?`<span class="tag m">Tạm dừng</span>`
        :`${kySauDay(t)}${t.luat?`<div style="margin-top:3px"><span class="tag law">dời về trước</span></div>`:""}`}</td></tr>`;}).join(""))}
    </tbody></table></div>
    <div class="note" style="margin-top:14px">Cột đáng giá nhất là <b>Đúng hạn qua các kỳ</b>. Một việc lặp trễ một lần
      là chuyện thường; trễ đều đặn qua hàng chục kỳ thì <b>vấn đề nằm ở cách bố trí việc, không nằm ở người làm</b> —
      thường là hạn đặt sai so với chu kỳ số liệu đầu vào.</div>
    <div class="note" style="margin-top:11px"><b>Kỳ rơi vào ngày nghỉ được dời theo hai hướng khác nhau.</b>
      Việc có <b>hạn pháp lý</b> dời về <b>trước</b> ngày nghỉ — hạn nộp thuế rơi vào mùng 2 Tết mà đẩy sang
      sau Tết là quá hạn luật định, bị phạt. Việc nội bộ dời về <b>sau</b> cho đỡ dồn vào ngày cuối trước nghỉ.</div>
    <div class="vd" style="margin-top:11px"><b>Bản thử sinh kỳ bằng nút bấm, bản thật chạy theo lịch.</b>
      Cơ chế chống sinh trùng đã có và chạy đúng ở đây. Bản lập trình thật cần thêm một tiến trình nền
      chạy mỗi sáng, cộng cửa sổ thời gian cho việc theo ca.</div>`;
}

/* =========================================================================
   QUẢN TRỊ › VIỆC LẶP — NGƯỜI QUẢN TRỊ CHỈNH THAM SỐ

   Bộ sinh kỳ trước đây chôn cứng trong mã: sinh đúng ngày tới hạn, không giới hạn số
   kỳ dồn, không tắt được một quy tắc riêng lẻ. Vận hành thật thì ba việc này xảy ra
   hằng tháng — đổi người làm khi có người nghỉ, tạm dừng một quy tắc khi đổi quy trình,
   sinh kỳ sớm vài ngày để người ta chuẩn bị. Nên chúng phải là THAM SỐ, sửa trên màn
   hình, và mỗi lần sửa ghi vào nhật ký kèm giá trị cũ — không sửa lén trong mã.

   Hai lớp tham số:
     · Lớp chung  — áp cho toàn bộ bộ sinh kỳ (sinh sớm, trần kỳ mở, nhắc trước, hướng dời)
     · Lớp quy tắc — riêng từng việc lặp (tần suất, ngày trong kỳ, người làm, độ khó…)
   ========================================================================= */
let CK_SUA = null;
const CK_TS = [
  ["ckSinhTruoc", "Sinh kỳ mới sớm hơn hạn", "ngày", [0,1,2,3,5,7,10,15],
   "0 = chỉ sinh khi kỳ hiện tại đã tới hạn. Đặt 3 thì kỳ sau vào hộp việc trước 3 ngày để người làm chuẩn bị."],
  ["ckTranMo",    "Trần số kỳ mở cùng lúc",  "kỳ",   [1,2,3,4,5],
   "Chống dồn kỳ. Người làm chưa xong kỳ này mà kỳ sau đã đẻ ra liên tục thì hộp việc thành bãi rác."],
  ["ckNhacTruoc", "Nhắc trước hạn",          "ngày", [0,1,2,3,5,7],
   "Số ngày trước hạn hệ thống đẩy nhắc việc cho người thực hiện."],
];
function datCKTS(k, v){
  const cu = CH[k], moi = isNaN(+v) ? v : +v;
  if (String(cu) === String(moi)) return;
  CH[k] = moi;
  const ten = (CK_TS.find(x=>x[0]===k)||[])[1] || k;
  ghiNK(me, "Sửa tham số việc lặp", `${ten}: ${cu} → ${moi}`);
  toast(`Đã đổi "${ten}" từ ${cu} sang ${moi} · đã ghi nhật ký`);
  draw();
}
function datCKCo(k){
  const cu = CH[k]; CH[k] = !cu;
  const ten = k === "ckTuDong" ? "Tự sinh kỳ" : k;
  ghiNK(me, "Sửa tham số việc lặp", `${ten}: ${cu?"bật":"tắt"} → ${CH[k]?"bật":"tắt"}`);
  toast(`${ten}: ${CH[k]?"đã bật":"đã tắt"} · đã ghi nhật ký`); draw();
}
function datCKDoi(v){
  const cu = CH.ckDoiNoiBo; if (cu === v) return; CH.ckDoiNoiBo = v;
  ghiNK(me, "Sửa tham số việc lặp", `Hướng dời ngày nghỉ (việc nội bộ): ${cu} → ${v}`);
  toast(`Việc nội bộ rơi ngày nghỉ sẽ dời về ${v==="TRUOC"?"trước":"sau"} · đã ghi nhật ký`); draw();
}
function moSuaCK(id){ CK_SUA = CK_SUA === id ? null : id; draw(); }
function tamCK(id){
  const q = find(id); if (!q) return;
  q.tam = !q.tam;
  ghiNK(me, "Sửa quy tắc việc lặp", `${moTaViec(id)} — ${q.tam?"TẠM DỪNG sinh kỳ":"cho chạy lại"}`);
  toast(q.tam ? `Đã tạm dừng "${q.ttl}" — không sinh kỳ mới` : `Đã cho "${q.ttl}" chạy lại`); draw();
}
/* Lưu một ô của quy tắc. Ghi nhật ký kèm GIÁ TRỊ CŨ — nhật ký không có giá trị cũ
   thì không truy được vì sao con số hôm nay khác con số tháng trước. */
function suaCK(id, truong, v){
  const q = find(id); if (!q) return;
  const nhan = {lap:"Tần suất", ngayKy:"Ngày trong kỳ", lam:"Người thực hiện", dk:"Độ khó",
                ah:"Mức ảnh hưởng", kc:"Mức khẩn cấp", luat:"Hạn pháp lý", bc:"Bằng chứng bắt buộc",
                sp:"Sản phẩm cần nộp", songay:"Thời lượng"}[truong] || truong;
  const doc = x => truong==="lap" ? (LAP_TEN[x]||"—")
    : truong==="lam" ? (U[x]?U[x].ten:"—")
    : truong==="luat" ? (x?"có":"không")
    : truong==="bc" ? (x?"bắt buộc":"không bắt buộc")
    : truong==="ah" ? `${x} — ${AH[x]}` : truong==="kc" ? `${x} — ${KC[x]}`
    : (x===""||x==null ? "—" : x);
  let cu;
  if (truong === "songay"){
    cu = ngayCong(q.bd, q.han);
    const n = Math.max(0.5, +v || 1), han = parse(q.han); let d = new Date(han), con = n;
    /* lùi từ hạn về đủ số ngày công để ra ngày bắt đầu — dùng đúng lịch làm việc của công ty */
    while (con > congCuaNgay(d) && (d = new Date(d.setDate(d.getDate()-1)))) con -= congCuaNgay(d) ? congCuaNgay(d) : 0;
    while (congCuaNgay(d) === 0) d.setDate(d.getDate()-1);
    q.bd = fmtNgay(d);
  } else if (truong === "luat" || truong === "bc"){
    cu = q[truong]; q[truong] = (v === "1" || v === true);
  } else if (truong === "dk" || truong === "ah" || truong === "kc"){
    cu = q[truong]; q[truong] = +v;
  } else {
    cu = q[truong]; q[truong] = v;
  }
  const moi = truong === "songay" ? ngayCong(q.bd, q.han) : q[truong];
  if (String(cu) === String(moi)) return;
  ghiNK(me, "Sửa quy tắc việc lặp", `${moTaViec(id)} — ${nhan}: ${doc(cu)} → ${doc(moi)}`);
  q.log = q.log || [];
  q.log.unshift({w:U[me]?U[me].ten:me, k:`sửa tham số lặp · ${nhan}: ${doc(cu)} → ${doc(moi)}`, t:NOW, s:1});
  toast(`${nhan}: ${doc(cu)} → ${doc(moi)} · đã ghi nhật ký`);
  draw();
}

function vVietLap(){
  const sua = coQuyen(me, "sua_to_chuc");
  const l = T.filter(t => xemDuoc(t) && laCK(t) && !t.tuQuyTac).sort((a,b)=>parse(a.han)-parse(b.han));
  const chay = l.filter(t => !t.tam), dung = l.filter(t => t.tam);
  const daSinh = T.filter(t => t.tuQuyTac && xemDuoc(t));
  const toi = l.filter(q => !q.tam && d2(parse(q.han)) <= d2(new Date(new Date(TODAY).getTime() + (CH.ckSinhTruoc||0)*864e5)));

  let h = oKPI([
    ["Quy tắc đang chạy", chay.length, dung.length?`${dung.length} quy tắc tạm dừng`:"không quy tắc nào tạm dừng", "", "LAP::chay"],
    ["Sắp tới kỳ", toi.length, toi.length?"bấm sinh kỳ là đẻ ra ngay":"chưa quy tắc nào tới ngưỡng", toi.length?"#2a78d6":"", toi.length?"LAP::toi":""],
    ["Kỳ đã sinh", daSinh.length, "từ các quy tắc này", "", daSinh.length?"LAP::sinh":""],
    ["Trần kỳ mở", CH.ckTranMo, "kỳ cùng lúc cho một quy tắc", ""],
  ]);

  /* ---- Lớp 1: tham số chung của bộ sinh kỳ ---- */
  h += `<div class="gvc"><h3 class="gvh">Tham số bộ sinh kỳ <em>— áp cho toàn bộ quy tắc lặp</em></h3>
    <div class="msp"><table><thead><tr>
      <th style="min-width:206px">Tham số</th><th style="min-width:160px">Giá trị</th>
      <th class="wr" style="min-width:340px">Đặt số này để làm gì</th></tr></thead><tbody>
    ${CK_TS.map(([k,ten,dv,ds,mo])=>`<tr>
      <td class="cot"><b>${ten}</b></td>
      <td>${sua ? `<select class="lsel" style="max-width:150px" onchange="datCKTS('${k}',this.value)">
            ${ds.map(v=>`<option value="${v}" ${CH[k]===v?"selected":""}>${v} ${dv}</option>`).join("")}</select>`
          : `<b style="color:var(--navy)">${CH[k]} ${dv}</b>`}</td>
      <td style="font-size:12.5px;color:var(--mute)">${mo}</td></tr>`).join("")}
    <tr><td class="cot"><b>Tự sinh kỳ khi tới ngưỡng</b></td>
      <td>${sua ? `<button class="btn ${CH.ckTuDong?"p":""}" onclick="datCKCo('ckTuDong')">${CH.ckTuDong?"Đang bật":"Đang tắt"}</button>`
          : `<b style="color:var(--navy)">${CH.ckTuDong?"Bật":"Tắt"}</b>`}</td>
      <td style="font-size:12.5px;color:var(--mute)">Tắt thì kỳ mới chỉ sinh khi có người bấm nút — dùng khi đang sửa lại quy trình, không muốn hệ thống đẻ thêm việc.</td></tr>
    <tr><td class="cot"><b>Kỳ rơi vào ngày nghỉ</b></td>
      <td>${sua ? `<div class="sg">${[["SAU","Dời về sau"],["TRUOC","Dời về trước"]].map(([v,n])=>
            `<button class="${CH.ckDoiNoiBo===v?"on":""}" onclick="datCKDoi('${v}')">${n}</button>`).join("")}</div>`
          : `<b style="color:var(--navy)">Dời về ${CH.ckDoiNoiBo==="TRUOC"?"trước":"sau"}</b>`}</td>
      <td style="font-size:12.5px;color:var(--mute)">Chỉ áp cho <b>việc nội bộ</b>.
        Việc có <b>hạn pháp lý</b> luôn dời về trước ngày nghỉ và không đổi được ở đây — nộp thuế trễ vì nghỉ Tết vẫn là nộp trễ.</td></tr>
    </tbody></table></div></div>`;

  h += `<div style="display:flex;gap:9px;align-items:center;flex-wrap:wrap;margin:15px 0 13px">
      <button class="btn p" onclick="sinhKyTatCa()">Sinh kỳ tiếp theo cho tất cả</button>
      <span style="font-size:12.5px;color:var(--mute)">Bấm hai lần không đẻ ra kỳ trùng — mỗi kỳ mang một khoá duy nhất.
        Quy tắc đang tạm dừng và quy tắc đã chạm trần kỳ mở đều bị bỏ qua.</span></div>`;

  /* ---- Lớp 2: từng quy tắc ---- */
  h += `<h2 class="sh">Quy tắc lặp <em>— ${l.length} quy tắc · bấm “Sửa” ở cuối dòng để chỉnh tham số của riêng một quy tắc</em></h2>`;
  if (!l.length) return h + khungTrong("Chưa có việc chu kỳ nào.");

  /* ---- Panel sửa: một quy tắc mỗi lần, nằm ngay trên bảng để bấm Sửa là thấy ---- */
  if (sua && CK_SUA && find(CK_SUA)){
    const q = find(CK_SUA);
    h += `<div class="ckf">
      <div class="ckfh"><span class="ckfx" onclick="moSuaCK('${q.id}')">✕</span>
        Sửa tham số quy tắc <b>${q.id} · ${esc(q.ttl)}</b>
        <span>Mỗi ô đổi xong ghi ngay vào nhật ký kèm giá trị cũ. Đổi tham số <b>không</b> động tới các kỳ đã sinh — chỉ áp cho kỳ sinh từ nay về sau.</span></div>
      <div class="ckfg">
        <label><span>Tần suất</span>
          <select class="lsel" onchange="suaCK('${q.id}','lap',this.value)">
            ${Object.entries(LAP_TEN).map(([k,n])=>`<option value="${k}" ${q.lap===k?"selected":""}>${n}</option>`).join("")}</select>
          <i>Quyết định khoảng cách giữa hai kỳ.</i></label>
        <label><span>Ngày trong kỳ</span>
          <select class="lsel" onchange="suaCK('${q.id}','ngayKy',this.value)" ${q.lap==="NGAY"||q.lap==="TUAN"?"disabled":""}>
            <option value="">Theo hạn hiện tại</option>
            ${Array.from({length:28},(_,i)=>i+1).map(n=>`<option value="${n}" ${String(q.ngayKy)===String(n)?"selected":""}>Ngày ${n}</option>`).join("")}
            <option value="31" ${String(q.ngayKy)==="31"?"selected":""}>Ngày cuối kỳ</option></select>
          <i>Chỉ áp cho hằng tháng và hằng quý. Ngày 31 tự co về ngày cuối của tháng ngắn.</i></label>
        <label><span>Người thực hiện</span>
          <select class="lsel" onchange="suaCK('${q.id}','lam',this.value)">
            ${Object.values(U).map(u=>`<option value="${u.id}" ${q.lam===u.id?"selected":""}>${esc(u.ten)} — ${esc(u.cd)}</option>`).join("")}</select>
          <i>Người duyệt tự suy lại theo trưởng đơn vị của người mới.</i></label>
        <label><span>Thời lượng</span>
          <select class="lsel" onchange="suaCK('${q.id}','songay',this.value)">
            ${(()=>{ const hien = ngayCong(q.bd,q.han);
              const ds = [...new Set([0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,6,7,10,13.5,15,20,22, hien])].sort((a,b)=>a-b);
              return ds.map(n=>`<option value="${n}" ${hien===n?"selected":""}>${soNgayLe(n)} ngày công</option>`).join(""); })()}</select>
          <i>Giữ nguyên hạn, lùi ngày bắt đầu theo lịch làm việc.</i></label>
        <label><span>Độ khó</span>
          <select class="lsel" onchange="suaCK('${q.id}','dk',this.value)">
            ${[1,2,3,4,5].map(n=>`<option value="${n}" ${q.dk===n?"selected":""}>${n} — ${nhipBaoCao(n).toLowerCase()}</option>`).join("")}</select>
          <i>Vào thẳng công thức tải người và điểm việc.</i></label>
        <label><span>Mức ảnh hưởng</span>
          <select class="lsel" onchange="suaCK('${q.id}','ah',this.value)">
            ${[5,4,3,2,1].map(n=>`<option value="${n}" ${(q.ah||3)===n?"selected":""}>${n} — ${AH[n]}</option>`).join("")}</select>
          <i>Ảnh hưởng × khẩn cấp ra mức ưu tiên P1–P4.</i></label>
        <label><span>Mức khẩn cấp</span>
          <select class="lsel" onchange="suaCK('${q.id}','kc',this.value)">
            ${[5,4,3,2,1].map(n=>`<option value="${n}" ${(q.kc||3)===n?"selected":""}>${n} — ${KC[n]}</option>`).join("")}</select>
          <i>Hiện quy tắc này ra mức <b>${UT[uuTien(q).muc][0]} · ${UT[uuTien(q).muc][1]}</b>.</i></label>
        <label><span>Hạn pháp lý</span>
          <select class="lsel" onchange="suaCK('${q.id}','luat',this.value)">
            <option value="0" ${!q.luat?"selected":""}>Không — hạn nội bộ</option>
            <option value="1" ${q.luat?"selected":""}>Có — rơi ngày nghỉ thì lùi về trước</option></select>
          <i>Bật thì hạn không dời được và nhắc sớm hơn việc thường.</i></label>
        <label><span>Bằng chứng khi nộp</span>
          <select class="lsel" onchange="suaCK('${q.id}','bc',this.value)">
            <option value="0" ${!q.bc?"selected":""}>Không bắt buộc</option>
            <option value="1" ${q.bc?"selected":""}>Bắt buộc đính kèm tệp</option></select>
          <i>Bật thì không nộp được nếu chưa có tệp.</i></label>
        <label class="rong"><span>Sản phẩm cần nộp</span>
          <input class="inp" value="${esc(q.sp||"")}" onchange="suaCK('${q.id}','sp',this.value)">
          <i>Câu này chép nguyên sang mọi kỳ sinh sau — nộp cái gì thì gọi là xong.</i></label>
      </div>
      <div class="ckfn">Kỳ tiếp theo sau khi sửa: <b>${q.tam?"đang tạm dừng":kySauDay(q)}</b>
        · đã chạy <b>${q.soKy||0}</b> kỳ, đúng hạn <b>${q.soKy?Math.round((q.kyDung||0)/q.soKy*100)+"%":"—"}</b>
        · đang mở <b>${T.filter(x=>x.tuQuyTac===q.id&&viecMo(x)).length}/${CH.ckTranMo}</b> kỳ</div>
    </div>`;
  }

  h += `<div class="msp"><table><thead><tr>
      <th style="width:70px">Mã</th><th style="min-width:210px">Tên quy tắc</th>
      <th style="min-width:100px">Tần suất</th>
      <th style="min-width:128px">Người thực hiện</th><th class="num">Thời lượng</th><th class="num">Độ khó</th>
      <th style="min-width:96px">Kỳ tiếp theo</th>
      <th style="min-width:112px">Trạng thái</th>${sua?`<th style="min-width:160px">Tác vụ</th>`:""}</tr></thead><tbody>
    ${l.map(q => {
      const mo = T.filter(x => x.tuQuyTac === q.id && viecMo(x)).length;
      const day = mo >= CH.ckTranMo;
      return `<tr class="${q.tam?"mo50":""} ${CK_SUA===q.id?"ckchon":""}">
        <td class="cot"><b>${q.id}</b></td>
        <td class="cot" style="left:70px"><span class="tn2" title="${esc(q.ttl)}">${esc(q.ttl)}</span>
          ${q.luat?`<span class="tag law">hạn pháp lý</span>`:""}
          ${q.lap==="THANG"||q.lap==="QUY" ? (q.ngayKy?`<span class="tag m">ngày ${q.ngayKy}</span>`:"") : ""}</td>
        <td><span class="tag m">${LAP_TEN[q.lap]||"—"}</span></td>
        <td><div style="display:flex;align-items:center;gap:8px">${avHTML(q.lam,24)}${esc(U[q.lam].ten)}</div></td>
        <td class="num">${soNgayLe(ngayCong(q.bd,q.han))}</td>
        <td class="num">${q.dk}</td>
        <td>${q.tam?`<span style="color:var(--mute)">đang dừng</span>`:kySauDay(q)}</td>
        <td>${q.tam?`<span class="tag m">Tạm dừng</span>`:day?`<span class="tag a">Chạm trần</span>`:`<span class="tag g">Đang chạy</span>`}
          <div style="font-size:11px;color:${day?"var(--amb)":"var(--mute)"};margin-top:3px">đang mở ${mo}/${CH.ckTranMo} kỳ</div></td>
        ${sua?`<td style="white-space:nowrap"><button class="btn sm" onclick="moSuaCK('${q.id}')">${CK_SUA===q.id?"Đóng":"Sửa"}</button>
          <button class="btn sm" onclick="tamCK('${q.id}')">${q.tam?"Chạy lại":"Tạm dừng"}</button></td>`:""}
      </tr>`;
    }).join("")}
    </tbody></table></div>`;

  const nkCK = NK.filter(x => x.viec && x.viec.indexOf("việc lặp") >= 0);
  h += `<div class="gvc" style="margin-top:15px"><h3 class="gvh">Nhật ký sửa tham số việc lặp
      <em>— ${nkCK.length} lượt · giữ cả giá trị cũ để truy lại vì sao con số hôm nay khác tháng trước</em></h3>
    ${nkCK.length ? `<div class="msp"><table><thead><tr><th style="min-width:150px">Lúc</th>
        <th style="min-width:170px">Người sửa</th><th style="min-width:190px">Loại</th>
        <th style="min-width:420px">Sửa gì</th></tr></thead><tbody>
      ${nkCK.slice(0,15).map(x=>`<tr><td>${x.t}</td><td>${esc(U[x.ai]?U[x.ai].ten:x.ai)}</td>
        <td>${esc(x.viec)}</td><td style="font-size:12.5px">${esc(x.dt)}</td></tr>`).join("")}
      </tbody></table></div>` : `<div class="flag b2"><span class="ic2">✓</span><span class="bd2">Chưa ai sửa tham số việc lặp trong phiên này. Thử đổi một ô ở trên rồi quay lại xem.</span></div>`}
  </div>`;

  h += `<div class="note" style="margin-top:14px"><b>Sửa tham số không hồi tố.</b>
    Kỳ đã sinh giữ nguyên tham số lúc nó được sinh ra — đổi độ khó hôm nay không làm điểm đã chấm
    tháng trước lệch đi. Đây là quy ước phải chốt trước khi lập trình thật, vì làm ngược lại
    (tính lại toàn bộ theo tham số mới) sẽ khiến bảng điểm cũ tự đổi số sau lưng người ta.</div>`;
  return h;
}

/* ---------- D. ĐỘT XUẤT ---------- */

/* ================= 2. KANBAN ================= */
function wKanban(){
  /* Dùng chung nhomTT() với Biểu đồ. Trước đây Kanban gộp DANG_LAM với TRA_LAI và
     không tách quá hạn, nên cùng một cửa sổ Theo dõi, việc CV-041 nằm cột "Đang làm"
     của Kanban trong khi Biểu đồ xếp nó vào "Quá hạn". */
  const cot = [["MOI","Mới"],["DANG_LAM","Đang làm"],["QUA_HAN","Quá hạn"],
               ["CHO_DUYET","Chờ duyệt"],["HOAN_THANH","Hoàn thành"]];
  const l = locViec();
  let h = `<div class="kb">`;
  cot.forEach(([k, ten]) => {
    const it = l.filter(t => {
      return nhomTT(t) === k;         /* một hàm phân nhóm duy nhất, dùng chung với Biểu đồ */
    }).sort((a,b)=>parse(a.han)-parse(b.han));
    h += `<div class="kbc">
      <div class="kbc-h"><span class="sw" style="background:${VM[k].mau}"></span>
        <span>${ten}</span><span class="n2">${it.length}</span></div>
      ${it.length ? it.map(t=>{
        const d = dlText(t.han,t), td = tienDo(t), qh = nhomTT(t)==="QUA_HAN";
        return `<div class="kbi" onclick="openDw('${t.id}')">
          <div class="t">${esc(t.ttl)}</div>
          <div class="m">${avHTML(t.lam,20)}${utHTML(t,1)}<span>${t.id}</span><span class="dot"></span>
            <span style="${qh?"color:var(--red);font-weight:700":""}">${d.t}</span>
            <span class="dot"></span><span>Độ khó ${t.dk}</span>
            ${t.luat?`<span class="tag law">Pháp lý</span>`:""}
            ${t.sk==="TRE"?`<span class="tag r">Đang trễ</span>`:t.sk==="RR"?`<span class="tag a">Rủi ro</span>`:""}</div>
          <span class="pg"><i style="width:${td}%;background:${VM[nhomTT(t)].mau}"></i></span></div>`;
      }).join("") : `<div class="em">Không có việc nào</div>`}
    </div>`;
  });
  return h + `</div>
    <div class="note" style="margin-top:14px">Kanban trả lời một câu: <b>việc đang tắc ở đâu.</b>
    Cột Chờ duyệt dài ra nghĩa là người duyệt đang là nút thắt, không phải người làm.
    Bản thử chưa cho kéo thả giữa cột — đổi trạng thái vẫn phải qua phiếu việc để hệ thống ghi được nhật ký và người chịu trách nhiệm.</div>`;
}

/* ================= 4. LỊCH ================= */
let LM = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
function chuyenThang(n){ LM = new Date(LM.getFullYear(), LM.getMonth()+n, 1); draw(); }
function wLich(){
  const dau = new Date(LM), cuoi = new Date(LM.getFullYear(), LM.getMonth()+1, 0);
  const l = locViec();
  let o = new Date(dau); while (o.getDay() !== 1) o.setDate(o.getDate()-1);
  const het = new Date(cuoi); while (het.getDay() !== 0) het.setDate(het.getDate()+1);
  const soO = Math.round((d2(het) - d2(o)) / D1) + 1;

  let g = "";
  ["Hai","Ba","Tư","Năm","Sáu","Bảy","CN"].forEach(x => g += `<div class="cal-d">${x}</div>`);
  for (let i = 0; i < soO; i++){
    const d = new Date(o); d.setDate(d.getDate()+i);
    const ngoai = d.getMonth() !== LM.getMonth();
    const homNay = d2(d).getTime() === d2(TODAY).getTime();
    const key = `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;
    const it = l.filter(t => t.han === key);
    g += `<div class="cal-c ${ngoai?"off":""} ${d.getDay()===0?"cn":""} ${homNay?"td":""}">
      <div class="dn">${d.getDate()}</div>
      ${it.slice(0,3).map(t=>`<button class="cal-e" style="background:${VM[nhomTT(t)].mau}"
          title="${esc(t.ttl)} — ${esc(U[t.lam].ten)}" onclick="openDw('${t.id}')">${esc(t.ttl)}</button>`).join("")}
      ${it.length>3?`<div style="font-size:11px;color:var(--mute);padding-left:3px">+${it.length-3} việc nữa</div>`:""}
    </div>`;
  }
  return `<div class="cal">
    <div class="cal-h">
      <b>Tháng ${LM.getMonth()+1} năm ${LM.getFullYear()}</b>
      <button class="btn sm" onclick="chuyenThang(-1)">‹ Tháng trước</button>
      <button class="btn sm" onclick="chuyenThang(1)">Tháng sau ›</button>
    </div>
    <div class="cal-g">${g}</div></div>
    <div class="lgd" style="margin-top:12px">${Object.entries(VM).map(([k,v])=>
      `<span><em style="background:${v.mau}"></em>${v.ten}</span>`).join("")}</div>
    <div class="note" style="margin-top:12px">Việc đặt vào <b>ngày hết hạn</b>, không phải ngày bắt đầu.
    Lịch trả lời câu hỏi ngày nào bị dồn nhiều hạn cùng lúc — đó là ngày sẽ trễ.</div>`;
}

/* ================= 5. TẢI NGƯỜI ================= */

function wTai(){
  const l = T.filter(t => xemDuoc(t) && hopLoc(t) && t.tt !== "HOAN_THANH" && !conCua(t.id).length);
  const nguoi = [...new Set(l.map(t => t.lam))];
  if (!nguoi.length) return `<div class="card empty"><div class="ic">—</div>Không có việc đang mở nào.</div>`;

  let t0 = new Date(TODAY); while (t0.getDay() !== 1) t0.setDate(t0.getDate()-1);
  const TUAN = 8;
  const tai = {};
  nguoi.forEach(n => tai[n] = new Array(TUAN).fill(0));
  /* Chia theo NGÀY CÔNG và cửa sổ thứ Hai đến thứ Bảy — cùng công thức với taiTuanNay().
     Bản trước chia theo ngày lịch và tính cả Chủ nhật, nên cùng một người hiện 4,4 ở
     màn Tải người và 2,6 ở Điều hành, chênh 69%. Hai công thức, một cái nhãn, một ngưỡng. */
  l.forEach(t => {
    const tongNC = ngayCong(t.bd, t.han); if (!tongNC) return;
    for (let w = 0; w < TUAN; w++){
      const ws = new Date(t0); ws.setDate(ws.getDate() + w*7);
      const we = new Date(ws); we.setDate(we.getDate() + 5);
      const a = parse(t.bd) > ws ? t.bd : fmtNgay(ws);
      const b = parse(t.han) < we ? t.han : fmtNgay(we);
      if (parse(a) <= parse(b)) tai[t.lam][w] += (Number(t.dk)||1) * ngayCong(a, b) / tongNC;
    }
  });

  const hdr = [...Array(TUAN)].map((_,w)=>{ const d = new Date(t0); d.setDate(d.getDate()+w*7);
    return `<th>${w===0?"Tuần này":"Tuần "+fmtD(d)}</th>`; }).join("");
  const rows = nguoi.map(n => {
    const c = tai[n].map(v => {
      const x = Math.round(v*10)/10, q = x / SUC_TUAN;
      const bg = x === 0 ? "#F1F5F8" : q > 1 ? "#e34948" : q > 0.75 ? "#eda100" : q > 0.4 ? "#8FB4DC" : "#D3E2F1";
      const fg = (q > 1) ? "#fff" : (q > 0.75 ? "#4A3A10" : "var(--ink)");
      return `<td><div class="cell" style="background:${bg};color:${fg}"
        title="${U[n].ten} — tuần này gánh ${x} điểm độ khó, sức tạm tính ${SUC_TUAN}">${x===0?"–":x}</div></td>`;
    }).join("");
    return `<tr><td><div class="nm2">${avHTML(n,26)}<span>${U[n].ten}<i>${U[n].cd}</i></span></div></td>${c}</tr>`;
  }).join("");

  return `<div class="wl"><table><thead><tr><th>Người</th>${hdr}</tr></thead><tbody>${rows}</tbody></table></div>
    <div class="lgd" style="margin-top:12px">
      <span><em style="background:#D3E2F1"></em>Nhẹ, dưới 40% sức</span>
      <span><em style="background:#8FB4DC"></em>Vừa</span>
      <span><em style="background:#eda100"></em>Sát sức, trên 75%</span>
      <span><em style="background:#e34948"></em>Quá tải, trên 100%</span>
    </div>
    <div class="note" style="margin-top:12px"><b>Con số trong ô là tổng điểm độ khó</b> của các việc rơi vào tuần đó,
    chia đều theo số ngày của việc. Sức một tuần đang tạm đặt là ${SUC_TUAN} điểm — <b>con số này tôi tự đặt</b>,
    phải đo bằng dữ liệu thật sau vài tháng chạy rồi chỉnh lại theo từng vị trí. Bảng này là để thấy ai đang bị dồn việc
    trước khi họ trễ, không phải để ép ai làm cho đủ chỉ tiêu.</div>`;
}

/* ================= 6. BIỂU ĐỒ ĐIỀU HÀNH =================
   Bốn hình, mỗi hình trả lời đúng một câu hỏi. Mọi hình đều có nhãn chữ và số
   ngay trên hình, không bắt người xem đoán bằng màu. */
function wBieuDo(){
  const l   = locViec();
  const mo  = l.filter(t => t.tt !== "HOAN_THANH");
  const qh  = mo.filter(quaHan);
  const cd  = l.filter(t => t.tt === "CHO_DUYET" || t.tt === "CHO_DUYET_2");
  const xong= l.filter(t => t.tt === "HOAN_THANH");
  const dungHan = xong.filter(t => t.diem && t.diem.dh >= 4).length;
  const tyLe = xong.length ? Math.round(dungHan / xong.length * 100) : null;

  const kpi = [
    ["Việc đang mở", mo.length, "trên tổng " + l.length + " việc", "var(--navy)"],
    ["Quá hạn", qh.length, qh.length ? "cần xử lý trước tiên" : "không có việc nào trễ", qh.length?VM.QUA_HAN.mau:"#008300"],
    ["Chờ duyệt", cd.length, cd.length ? "đang nằm ở người duyệt" : "không ai phải chờ", cd.length?VM.CHO_DUYET.mau:"var(--navy)"],
    ["Tỷ lệ nộp đúng hạn", tyLe===null?"—":tyLe+"%", xong.length?`trên ${xong.length} việc đã duyệt`:"chưa đủ việc để tính", "#008300"],
  ];

  /* 1. việc đến hạn theo tuần */
  let t0 = new Date(TODAY); while (t0.getDay() !== 1) t0.setDate(t0.getDate()-1);
  const TUAN = 8, cot = new Array(TUAN).fill(0);
  let sau = 0;
  mo.forEach(t => {
    const w = Math.floor((d2(parse(t.han)) - d2(t0)) / (7*D1));
    if (quaHan(t)) return;
    if (w >= 0 && w < TUAN) cot[w]++; else if (w >= TUAN) sau++;
  });
  const day = [{n:["Quá","hạn"], v:qh.length, m:VM.QUA_HAN.mau}]
    .concat(cot.map((v,w)=>{ const d = new Date(t0); d.setDate(d.getDate()+w*7);
      return {n:(w===0?["Tuần","này"]:[fmtD(d)]), v, m:"#2a78d6"}; }))
    .concat(sau ? [{n:["Sau","đó"], v:sau, m:"#9AAABA"}] : []);
  const mx1 = Math.max(1, ...day.map(x=>x.v));
  const CW = 46, CH = 150;
  const c1 = `<svg viewBox="0 0 ${day.length*CW} ${CH+34}" style="width:100%;height:auto" role="img"
      aria-label="Số việc đến hạn theo tuần">
    ${day.map((x,i)=>{
      const h2 = Math.round(x.v / mx1 * CH), y = CH - h2 + 4;
      return `<g><title>${x.n.join(" ")}: ${x.v} việc</title>
        ${x.v?`<rect x="${i*CW+9}" y="${y}" width="${CW-18}" height="${h2}" rx="4" fill="${x.m}"/>`:""}
        <text x="${i*CW+CW/2}" y="${x.v?y-6:CH-2}" text-anchor="middle" font-size="12" font-weight="700"
          fill="${x.v?"#22303C":"#B9C6D2"}">${x.v}</text>
        ${x.n.map((s2,k)=>`<text x="${i*CW+CW/2}" y="${CH+20+k*12}" text-anchor="middle"
          font-size="10.5" fill="#6B7885">${s2}</text>`).join("")}</g>`;
    }).join("")}
    <line x1="0" y1="${CH+5}" x2="${day.length*CW}" y2="${CH+5}" stroke="#D8E0E8" stroke-width="1"/>
  </svg>`;

  /* 2. phân bố trạng thái */
  const dem = {}; Object.keys(VM).forEach(k => dem[k] = 0);
  l.forEach(t => dem[nhomTT(t)]++);
  const mx2 = Math.max(1, ...Object.values(dem));
  const c2 = Object.entries(VM).map(([k,v]) => `<div class="hb">
      <span class="lb3">${v.ten}</span>
      <span class="tr"><span class="in" style="width:${dem[k]/mx2*100}%"><i style="width:100%;background:${v.mau}"></i></span></span>
      <span class="vv">${dem[k]}</span></div>`).join("");

  /* 3. khối lượng theo người, xếp chồng theo trạng thái */
  const ng = [...new Set(l.map(t=>t.lam))]
    .map(n => ({n, it: l.filter(t=>t.lam===n)}))
    .sort((a,b)=>b.it.length-a.it.length);
  const mx3 = Math.max(1, ...ng.map(x=>x.it.length));
  const c3 = ng.map(({n,it}) => {
    const d3 = {}; Object.keys(VM).forEach(k=>d3[k]=it.filter(t=>nhomTT(t)===k).length);
    return `<div class="hb">
      <span class="lb3" title="${esc(U[n].ten)}">${esc(U[n].ten.split(" ").slice(-2).join(" "))}</span>
      <span class="tr"><span class="in" style="width:${it.length/mx3*100}%">
        ${Object.entries(d3).filter(([,v])=>v).map(([k,v])=>
          `<i style="width:${v/it.length*100}%;background:${VM[k].mau}" title="${VM[k].ten}: ${v} việc"></i>`).join("")}</span></span>
      <span class="vv">${it.length}</span></div>`;
  }).join("");

  /* 4. tiến độ so với thời gian đã dùng */
  const duAn = l.filter(t => conCua(t.id).length);
  const c4 = duAn.length ? duAn.map(t => {
    const a2 = parse(t.bd), b2 = parse(t.han);
    const tong = Math.max(1, Math.round((d2(b2)-d2(a2))/D1));
    const troi = Math.min(100, Math.max(0, Math.round((d2(TODAY)-d2(a2))/D1 / tong * 100)));
    const td = tienDo(t), lech = td - troi;
    const mau = lech >= 0 ? "#008300" : lech >= -15 ? "#eda100" : "#e34948";
    const kl = lech >= 0 ? "đúng hoặc vượt kế hoạch" : lech >= -15 ? "chậm nhẹ" : "chậm đáng kể";
    return `<div style="margin-bottom:16px">
      <div style="font-size:12.5px;font-weight:700;margin-bottom:6px;line-height:1.35">${esc(t.ttl)}</div>
      <div style="position:relative;height:19px;background:#F1F5F8;border-radius:5px">
        <i style="position:absolute;left:0;top:0;bottom:0;width:${td}%;background:${mau};border-radius:5px;display:block"></i>
        <span style="position:absolute;left:calc(${troi}% - 1px);top:-4px;bottom:-4px;width:2px;background:var(--navy)"
          title="Thời gian đã dùng ${troi}%"></span>
      </div>
      <div style="display:flex;gap:6px 14px;flex-wrap:wrap;font-size:11.5px;color:var(--mute);margin-top:6px">
        <span>Tiến độ thật <b style="color:var(--ink)">${td}%</b></span>
        <span>Thời gian đã dùng <b style="color:var(--ink)">${troi}%</b></span>
        <span style="color:${mau};font-weight:700">${lech>0?"+":""}${lech} điểm — ${kl}</span></div></div>`;
  }).join("") : `<div style="color:var(--mute);font-size:13px">Chưa có việc nhiều tầng nào để so.</div>`;

  /* ---- 5. dự báo Monte Carlo ---- */
  const mc = monteCarlo(mo.length);
  const c5 = mc ? `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:13px">
      ${[["50%",mc.p50,"#9AAABA","dùng nội bộ"],["85%",mc.p85,"#2a78d6","cam kết an toàn"],["95%",mc.p95,"#008300","cam kết ra ngoài"]]
        .map(([q,v,m2,gc])=>`<div style="border:1px solid var(--line);border-radius:9px;padding:11px 12px;text-align:center">
          <div style="font-size:11px;color:var(--mute);text-transform:uppercase;letter-spacing:.5px;font-weight:700">Phân vị ${q}</div>
          <div style="font-size:22px;font-weight:700;color:${m2};line-height:1.2;margin:3px 0">${congNgay(v)}</div>
          <div style="font-size:11.5px;color:var(--mute)">${v} ngày nữa · ${gc}</div></div>`).join("")}
    </div>
    <div style="font-size:12.5px;color:var(--mute);line-height:1.55">
      Chạy <b>${mc.n.toLocaleString("vi-VN")} lần</b> mô phỏng, lấy mẫu có hoàn lại từ thông lượng
      <b>${NGAY_LS} ngày</b> gần nhất (trung bình ${so1(mc.tbTL)} việc mỗi ngày).
      Ngày không xong việc nào <b>được giữ nguyên</b> trong mẫu — bỏ đi sẽ làm kết quả lạc quan giả tạo.<br>
      Cách đọc: <b>85% khả năng xong ${mo.length} việc đang mở trước ${congNgay(mc.p85)}</b>.
      Đây là câu nên nói với khách và với Ban Giám đốc, thay cho câu “chắc khoảng cuối tháng”.
    </div>` : `<div style="color:var(--mute);font-size:13px">Chưa có việc đang mở để dự báo.</div>`;

  /* ---- 6. biểu đồ dòng tích luỹ ---- */
  const CW2 = 560, CH2 = 190;
  const maxV = CFD[CFD.length-1].vao || 1;
  const px2 = CW2 / (CFD.length - 1), py2 = CH2 / maxV;
  const dai2 = key => CFD.map((c,i)=>`${(i*px2).toFixed(1)},${(CH2 - c[key]*py2).toFixed(1)}`).join(" ");
  const vung = (k1, k2, mau) =>
    `<polygon points="${dai2(k1)} ${CFD.map((c,i)=>`${((CFD.length-1-i)*px2).toFixed(1)},${(CH2 - CFD[CFD.length-1-i][k2]*py2).toFixed(1)}`).join(" ")}" fill="${mau}"/>`;
  const cuoi = CFD[CFD.length-1];
  const wipNay = cuoi.vao - cuoi.xong;
  const c6 = `
    <svg viewBox="-4 -8 ${CW2+8} ${CH2+34}" style="width:100%;height:auto" role="img" aria-label="Biểu đồ dòng tích luỹ">
      ${vung("vao","batDau",VM.MOI.mau+"33")}
      ${vung("batDau","nop",VM.DANG_LAM.mau+"44")}
      ${vung("nop","xong",VM.CHO_DUYET.mau+"55")}
      <polygon points="${dai2("xong")} ${(CW2).toFixed(1)},${CH2} 0,${CH2}" fill="${VM.HOAN_THANH.mau}22"/>
      ${["vao","batDau","nop","xong"].map((k,i)=>`<polyline points="${dai2(k)}" fill="none"
        stroke="${[VM.MOI.mau,VM.DANG_LAM.mau,VM.CHO_DUYET.mau,VM.HOAN_THANH.mau][i]}" stroke-width="2"/>`).join("")}
      <line x1="0" y1="${CH2}" x2="${CW2}" y2="${CH2}" stroke="#D8E0E8"/>
      <text x="0" y="${CH2+18}" font-size="10.5" fill="#6B7885">${fmtD(CFD[0].d)}</text>
      <text x="${CW2}" y="${CH2+18}" font-size="10.5" fill="#6B7885" text-anchor="end">Hôm nay</text>
      <line x1="${CW2-2}" y1="${(CH2 - cuoi.vao*py2).toFixed(1)}" x2="${CW2-2}" y2="${(CH2 - cuoi.xong*py2).toFixed(1)}"
        stroke="var(--terra)" stroke-width="2.5"/>
      <text x="${CW2-8}" y="${(CH2 - (cuoi.vao+cuoi.xong)/2*py2).toFixed(1)}" font-size="11" font-weight="700"
        fill="var(--terra)" text-anchor="end">${wipNay} việc đang dở</text>
    </svg>
    <div class="lgd">${[["MOI","Đã nhận vào"],["DANG_LAM","Đã bắt đầu"],["CHO_DUYET","Đã nộp"],["HOAN_THANH","Đã duyệt xong"]]
      .map(([k,n])=>`<span><em style="background:${VM[k].mau}"></em>${n}</span>`).join("")}</div>
    <div style="font-size:12.5px;color:var(--mute);margin-top:9px;line-height:1.55">
      Khoảng cách <b>dọc</b> giữa hai đường là số việc đang nằm ở khâu đó. Khoảng cách <b>ngang</b> là thời gian
      một việc đi qua khâu đó. Dải nào phình ngang ra là khâu đó đang tắc.<br>
      Hình này <b>chỉ vẽ được nếu có bảng lịch sử trạng thái</b> — đó là lý do bảng đó phải làm ngay tuần đầu,
      vì dữ liệu quá khứ không vá lại được.
    </div>`;

  return `<div class="kpi">${kpi.map(([l2,v,h2,m])=>`<div class="c">
      <div class="l">${l2}</div><div class="v" style="color:${m}">${v}</div><div class="h">${h2}</div></div>`).join("")}</div>
    <div class="chg">
      <div class="ch"><h3>Việc đến hạn theo tuần</h3>
        <p class="cs">Trả lời: tuần nào sắp bị dồn việc. Cột đỏ là việc đã trễ, phải xử lý trước.</p>${c1}</div>
      <div class="ch"><h3>Phân bố trạng thái</h3>
        <p class="cs">Trả lời: việc đang đọng ở khâu nào. Cột Chờ duyệt dài là người duyệt đang tắc.</p>${c2}</div>
      <div class="ch"><h3>Khối lượng theo người</h3>
        <p class="cs">Trả lời: ai đang ôm nhiều việc và trong đó bao nhiêu việc đã trễ.</p>${c3}
        <div class="lgd">${Object.entries(VM).map(([k,v])=>`<span><em style="background:${v.mau}"></em>${v.ten}</span>`).join("")}</div></div>
      <div class="ch"><h3>Tiến độ so với thời gian đã dùng</h3>
        <p class="cs">Trả lời: dự án có đang chậm không. Thanh màu là tiến độ thật, vạch đen là phần thời gian đã tiêu.</p>${c4}</div>
      <div class="ch"><h3>Dự báo bao giờ xong hết việc đang mở</h3>
        <p class="cs">Trả lời: hứa ngày nào thì an toàn. Mô phỏng Monte Carlo trên thông lượng thật, không phải cảm tính.</p>${c5}</div>
      <div class="ch" style="grid-column:1 / -1"><h3>Biểu đồ dòng tích luỹ</h3>
        <p class="cs">Trả lời: việc đang đọng ở khâu nào và đọng bao lâu — nhìn ra nút thắt trước khi nó thành sự cố.</p>${c6}</div>
    </div>
    <div class="note" style="margin-top:14px;background:#FFF8E6;border-color:#EBD9A0;border-left-color:var(--amb)">
    <b>Bốn hình đầu dùng dữ liệu thật trong bản thử.</b> Hai hình cuối — dự báo Monte Carlo và biểu đồ dòng tích luỹ —
    chạy trên <b>45 ngày thông lượng mô phỏng</b>, vì bản thử chưa có lịch sử thật.
    Thuật toán thì là thật và chạy đúng: đổi dữ liệu vào là ra kết quả đúng ngay.</div>`;
}

function hovG(k, on){
  document.querySelectorAll(`.gt-rw[data-k="${k}"],.gt-br[data-k="${k}"]`)
    .forEach(e => e.classList.toggle("hov", !!on));
}

/* ---------- 4. ĐÃ XONG ---------- */
function vXong(){
  /* Việc của tôi đã có mục "Đã xong" của riêng mình. Cửa sổ này phải là thứ KHÁC:
     KHO LƯU của cả nhánh — để tra cứu, để nhìn phân bố điểm, để thấy việc nào bị dời
     hạn nhiều lần rồi vẫn về đích "đúng hạn". Nếu chỉ lặp lại danh sách của một người
     thì nó không đáng một mục trên thanh điều hướng. */
  const pham = [me, ...capDuoi(), ...doiCuaToi()];
  const lDay = T.filter(t => t.tt === "HOAN_THANH" && xemDuoc(t)
    && (t.lam === me || nguoiDuyet(t) === me || pham.includes(t.lam)));
  const l = lDay.filter(viecTamDH);
  const l2 = XONG_VAI === "TAT_CA" ? l : l.filter(t => vaiCuaToi(t) === XONG_VAI);
  const lo = XONG_DV === "TAT_CA" ? l2 : l2.filter(t => trongDV(t.lam, XONG_DV));

  let h = `<h1 class="h1">Đã xong</h1>${daiOng(l.length, lDay.length, "việc")}
    <p class="sub">Kho lưu việc đã nghiệm thu trong nhánh của bạn. Điểm chấm một lần lúc duyệt,
    không chấm lại — cửa sổ này để <b>tra cứu và đối chiếu</b>, không phải để đánh giá lại.</p>`;
  if (!l.length) return h + khungTrong("Chưa có việc nào hoàn thành trong nhánh của bạn.");

  const diem = lo.filter(t=>t.diem);
  const tbD  = diem.length ? diem.reduce((a,t)=>a+t.diem.tong,0)/diem.length : null;
  const tsDk = lo.reduce((a,t)=>a + (Number(t.dk)||1), 0);
  const tbTS = tsDk && diem.length ? diem.reduce((a,t)=>a + (Number(t.dk)||1)*t.diem.tong,0)
                / diem.reduce((a,t)=>a + (Number(t.dk)||1),0) : null;
  const soDoi = lo.filter(t=>t.doi).length;
  const treThat = lo.filter(t => dCong(ngayXong(t), parse(t.han_goc || t.han)) < 0).length;

  h += oKPI([
    ["Việc đã nghiệm thu", lo.length, `tổng ${tsDk} điểm độ khó`, ""],
    ["Điểm trung bình", tbD?so2(tbD):"—",
      tbTS?`có trọng số độ khó ${so2(tbTS)}`:"chưa việc nào được chấm", ""],
    ["Trễ so với hạn GỐC", treThat, treThat?"đối chiếu hạn ban đầu, không phải hạn đã dời":"về đích đúng hạn gốc",
      treThat?"var(--red)":"#1B5E20"],
    ["Có dời hạn", soDoi, soDoi?"xem cột số lần dời":"không việc nào dời hạn",
      soDoi?"#8A6D3B":"#1B5E20"],
  ]);

  /* lọc theo đơn vị, dùng chung cách với Điều hành */
  const dsDV = [...new Set(l.map(t => U[t.lam] && U[t.lam].dv).filter(Boolean))];
  const cha = new Set(); dsDV.forEach(k => { let x = DV[k]?DV[k].cha:null, v=0;
    while (x && v++<12){ cha.add(x); x = DV[x]?DV[x].cha:null; } });
  const chon = [...new Set([...dsDV, ...cha])].filter(k => k !== "HDQT" && k !== "CTY");
  h += `<div class="lb" style="margin-bottom:14px">
      <span style="font-size:11.5px;font-weight:700;letter-spacing:.3px;text-transform:uppercase;color:var(--mute)">Vai của tôi</span>
      <div class="sg">${[["TAT_CA","Tất cả"],...Object.entries(VAI_TEN).map(([k,x])=>[k,`${x[0]} · ${x[1]}`])]
        .map(([k,nhan])=>`<button class="${XONG_VAI===k?"on":""}" onclick="XONG_VAI='${k}';draw()">${nhan}<i>${
          k==="TAT_CA"?l.length:l.filter(t=>vaiCuaToi(t)===k).length}</i></button>`).join("")}</div>
    </div>`;
  if (chon.length > 1) h += `<div class="lb" style="margin-bottom:14px">
      <span style="font-size:11.5px;font-weight:700;letter-spacing:.3px;text-transform:uppercase;color:var(--mute)">Đơn vị</span>
      <select class="lsel ${XONG_DV!=="TAT_CA"?"on":""}" style="max-width:330px" onchange="XONG_DV=this.value;draw()">
        <option value="TAT_CA">Cả nhánh (${l2.length} việc)</option>
        ${(function(){ const ra=[]; (function di(ma,sau){
            if (chon.includes(ma)){ const n = l2.filter(t=>trongDV(t.lam,ma)).length;
              if (n) ra.push(`<option value="${ma}" ${XONG_DV===ma?"selected":""}>${"　".repeat(sau)}${sau?"└ ":""}${esc(DV[ma].ten)} (${n})</option>`); }
            Object.entries(DV).filter(([k,d])=>d.cha===ma).forEach(([k])=>di(k, chon.includes(ma)?sau+1:sau));
          })("CTY",0); return ra.join(""); })()}
      </select>
      <div class="lct"><span>Đang xem <b>${lo.length}</b> việc</span>
        ${XONG_DV!=="TAT_CA"?`<button onclick="XONG_DV='TAT_CA';draw()">Bỏ lọc</button>`:""}</div>
    </div>`;

  h += `<div class="msp tdkh"><table><thead><tr><th style="width:74px">Mã</th>
      <th style="min-width:300px">Công việc</th><th style="min-width:170px">Người thực hiện</th>
      <th style="min-width:150px">Đơn vị</th><th>Hạn gốc</th><th>Hạn cuối</th><th>Nộp lúc</th>
      <th>So hạn gốc</th><th>Độ khó</th><th>Điểm</th><th style="min-width:150px">Người duyệt</th>
      </tr></thead><tbody>
    ${lo.slice().sort((a,b)=>ngayXong(b)-ngayXong(a)).map(t=>{
      const hg = t.han_goc || t.han, nx = ngayXong(t), som = dCong(nx, parse(hg));
      return `<tr onclick="openDw('${t.id}')" style="cursor:pointer" class="${som<0?"gang2":""}">
        <td class="cot"><b>${t.id}</b></td>
        <td class="cot" style="left:74px"><span class="tn2">${esc(t.ttl)}</span></td>
        <td><div style="display:flex;align-items:center;gap:8px">${avHTML(t.lam,24)}${esc(U[t.lam].ten)}</div></td>
        <td style="font-size:12.5px;color:var(--mute)">${esc(DV[U[t.lam].dv]?DV[U[t.lam].dv].ten:"—")}</td>
        <td>${hg}</td>
        <td>${t.han}${t.doi?` <span class="tag a">dời ${t.doi}</span>`:""}</td>
        <td>${fmtNgay(nx)}</td>
        <td><span class="tag ${som>=0?"g":"r"}">${som>=0?(som?`sớm ${som} ngày`:"đúng ngày"):`trễ ${-som} ngày`}</span></td>
        <td class="num">${t.dk}</td>
        <td class="num"><b style="font-size:14px;color:var(--navy)">${t.diem?so2(t.diem.tong):"—"}</b></td>
        <td>${t.diem?esc(t.diem.ai):"—"}</td></tr>`;}).join("")}
    </tbody></table></div>
    <div class="note" style="margin-top:14px"><b>Cột "So hạn gốc" là cột đắt nhất ở đây.</b>
      Nó đối chiếu ngày nộp thật với <b>hạn ban đầu</b>, không phải hạn đã dời. Một việc dời hạn ba lần
      rồi về đích "đúng hạn" thì mọi báo cáo đúng hạn đều đẹp, còn thực tế đã trễ — đây là chỗ duy nhất
      nhìn ra điều đó. Điểm chấm một lần lúc duyệt và không sửa được nữa.</div>`;
  return h;
}
let XONG_DV = "TAT_CA", XONG_VAI = "TAT_CA";

/* ================= BẢNG ĐIỀU HÀNH NHÂN SỰ =================
   Thiết kế đi ngược đề bài một cách có chủ ý. Lý do ghi ở cuối màn hình.
   Ba nguyên tắc: (1) tách rõ số ĐO ĐƯỢC với Ý KIẾN người duyệt;
   (2) hiện khoảng dao động chứ không hiện một con số trần trụi;
   (3) gắn cờ TÌNH HUỐNG cần xử lý, không dán nhãn người.                    */
function tinhNguoi(id){
  const r = LS.filter(x => x.nguoi === id);
  const kyCuoi = r.filter(x => x.ky === KY[KY.length-1]);
  const n = kyCuoi.length;
  const dungK = kyCuoi.filter(x => x.dh >= 4).length;
  const [lo, hi] = wilson(dungK, n);
  const cls = kyCuoi.map(x => x.cl);
  const mCl = tb(cls), sCl = sd(cls) || 0.8;
  const se = n ? sCl / Math.sqrt(n) : 0;
  /* ĐIỂM THÁNG CÓ TRỌNG SỐ ĐỘ KHÓ — khoảng trống B8.
     Trung bình cộng cho người làm 20 việc dễ ăn đứt người làm 3 việc khó. Nhân trọng số
     độ khó là hàng rào toán học chống gian lận: muốn điểm cao phải gánh việc nặng,
     không thể gom việc vặt cho nhiều. Cả hai số đều hiện ra để thấy chênh lệch. */
  const tsDk  = kyCuoi.reduce((a,b)=>a + b.dk, 0);
  const diemTS = tsDk ? kyCuoi.reduce((a,b)=>a + b.dk * b.tong, 0) / tsDk : 0;
  const diemTB = n ? kyCuoi.reduce((a,b)=>a + b.tong, 0) / n : 0;
  return {
    id, n, diemTS, diemTB, lechTS: diemTS - diemTB,
    khoiLuong: tsDk,
    dung: n ? dungK/n : 0, dungLo:lo, dungHi:hi,
    cl: mCl, clLo: mCl - 1.96*se, clHi: mCl + 1.96*se,
    traLai: n ? kyCuoi.filter(x=>x.tralai).length / n : 0,
    baoSom: n ? kyCuoi.filter(x=>x.baoSom).length / n : 0,
    xu: KY.map(k => { const a2 = r.filter(x=>x.ky===k);
      return a2.length ? a2.filter(x=>x.dh>=4).length/a2.length : 0; }),
  };
}
/* =====================================================================
   NHẮC HẠN BA MỐC  (khoảng trống B5)

   Ba mốc vì ba mục đích khác nhau, không phải nhắc ba lần cho chắc:
     · Còn 3 ngày công — để người làm còn kịp xoay xở hoặc nêu ý kiến
     · Còn 1 ngày công — để chốt, không còn thời gian xoay
     · Quá hạn 1 ngày  — LEO THANG lên người duyệt, vì đến đây thì
                         nhắc thêm người làm cũng không giải quyết được gì
   Việc đang dừng đồng hồ thì không nhắc: họ đang chờ chính cấp trên trả lời.
   ===================================================================== */
/* Hạn pháp lý nhắc sớm hơn vì không dời được: trễ là bị phạt, không phải bị nhắc.
   Ba mốc của việc thường là 3 / 1 / −1 ngày; của việc có hạn pháp lý là 7 / 3 / 1. */
const MOC_NHAC = [
  {ma:"M1", con: 3, luat: 7, ten:"Sắp tới hạn",    ai:"lam",   gt:"còn kịp xoay xở hoặc nêu ý kiến"},
  {ma:"M2", con: 1, luat: 3, ten:"Cận hạn",        ai:"lam",   gt:"chốt lần cuối, hết thời gian xoay"},
  {ma:"M3", con:-1, luat: 1, ten:"Mốc leo thang",  ai:"duyet", gt:"leo thang lên người duyệt"},
];
let ND_MO = new Set();
function nhacHomNay(){
  const r = [];
  T.filter(t => viecMo(t) && laLa(t) && xemDuoc(t)).forEach(t => {
    if (dangDung(t)) return;                       /* đang chờ trả lời ý kiến, không nhắc */
    const n = conLai(t);
    const m = MOC_NHAC.find(x => (t.luat ? x.luat : x.con) === n);
    if (!m) return;
    /* Không suy được người duyệt thì nhắc chính người thực hiện, chứ không bỏ im lặng —
       việc quá hạn của người đứng đầu cây trước đây rơi ra khỏi danh sách nhắc. */
    const ai = m.ai === "lam" ? t.lam : (nguoiDuyet(t) || t.lam);
    r.push({t, moc:m, ai, ngay: t.luat ? m.luat : m.con});
  });
  return r.sort((a,b)=>a.moc.con-b.moc.con);
}
function togND(id){ ND_MO.has(id) ? ND_MO.delete(id) : ND_MO.add(id); draw(); }
let ACC_MO = false;
function togAcc(){ ACC_MO = !ACC_MO; draw(); }

let NS_CHUY = 0, NS_CO = false;
let NS_DV = "TAT_CA", NS_VT = "TAT_CA", NS_TT = "TAT_CA", NS_TIM = "", NS_XEP = "tre";
function setNS(k, v){
  if (k === "dv") NS_DV = v; else if (k === "vt") NS_VT = v;
  else if (k === "tt") NS_TT = v; else if (k === "xep") NS_XEP = v;
  else NS_TIM = v;
  ND_MO = new Set();          /* đổi bộ lọc thì đóng các dòng đang bung, tránh bung việc đã bị lọc ra */
  draw();
  if (k === "tim"){ const o = $(".nslb input"); if (o){ o.focus(); o.setSelectionRange(v.length, v.length); } }
}
function xoaLocNS(){ NS_CHUY = 0; NS_DV = "TAT_CA"; NS_VT = "TAT_CA"; NS_TT = "TAT_CA"; NS_TIM = ""; draw(); }
function setNSChuY(v){ NS_CHUY = v; draw(); }
/* Bung một người ra: bốn ô số, VIỆC ĐANG LÀM THẬT, rồi mới tới số liệu kỳ qua.
   Giám sát điều hành là nhìn thấy việc thật — thêm một bảng thống kê nữa thì
   người quản vẫn không biết hôm nay phải nói gì với người đó. */
function chiTietNguoi(x, muDung, muCl, tau2, sig2){
  const e = x.e;
  const viec = T.filter(t => t.lam === x.id && viecMo(t) && xemDuoc(t))
    .sort((a,b) => (canCanThiep(b)?1:0) - (canCanThiep(a)?1:0) || conLai(a) - conLai(b));
  const xong = T.filter(t => t.lam === x.id && t.tt === "HOAN_THANH" && xemDuoc(t)).length;
  const o = [
    ["Đang mở", viec.length, ""],
    ["Đang trễ", viec.filter(quaHan).length, viec.filter(quaHan).length?"var(--red)":""],
    ["Chờ nghiệm thu", viec.filter(t=>t.tt==="CHO_DUYET"||t.tt==="CHO_DUYET_2").length, ""],
    ["Có ý kiến chưa trả lời", viec.filter(t=>t.yKien).length, viec.filter(t=>t.yKien).length?"var(--amb)":""],
    ["Tải tuần này", `${soNgayLe(x.tai)}/${SUC_TUAN}`, x.tai>SUC_TUAN?"var(--red)":""],
    ["Đã nghiệm thu cộng dồn", xong, ""],
  ];
  return `<div class="nsct">
    <div class="nscth"><b>${esc(U[x.id].ten)}</b> — ${esc(U[x.id].cd)}
      <span>${esc(DV[U[x.id].dv] ? DV[U[x.id].dv].ten : "—")}
        · người duyệt: ${esc(U[truongTrucTiep(x.id)] ? U[truongTrucTiep(x.id)].ten : "—")}</span>
      <button class="btn sm" onclick="event.stopPropagation();me='${x.id}';TAB='toi';draw()">Xem với vai người này →</button>
    </div>
    <div class="bcso">${o.map(([l,v,m])=>`<div class="bcso1${v===0?" rong":""}">
      <span>${l}</span><b style="${m?`color:${m}`:""}">${v}</b></div>`).join("")}</div>

    <div class="bcctt">Việc đang làm — ${viec.length ? `${viec.length} việc, xếp việc cần can thiệp lên trước` : "không có việc nào đang mở"}</div>
    ${viec.length ? bangViecNho(viec, 8)
      : `<div class="flag b2" style="margin:0 0 11px"><span class="ic2">✓</span><span class="bd2">Người này không còn việc nào đang mở.</span></div>`}

    ${e && e.n ? `<div class="bcctt">Kỳ ${KY[KY.length-1]} — ${e.n} việc đã nghiệm thu</div>
      <div class="nsg">
        <div class="nsb1"><span>Nộp đúng hạn</span><b>${Math.round(e.dung*100)}%</b>
          <i>dải thật ${Math.round(e.dungLo*100)}–${Math.round(e.dungHi*100)}% · nhóm ${Math.round(muDung*100)}%.
          Chỉ kết luận khi dải nằm hẳn ngoài mức nhóm.</i></div>
        <div class="nsb1"><span>Chất lượng</span><b>${e.cl.toFixed(2)}</b>
          <i>sau co ngót ${coNgot(e.cl, e.n, muCl, tau2, sig2).toFixed(2)} · do <b>một người</b> chấm,
          nên không dùng một mình để ra quyết định nhân sự.</i></div>
        <div class="nsb1"><span>Điểm có trọng số độ khó</span><b>${so2(e.diemTS)}</b>
          <i>trung bình không trọng số ${so2(e.diemTB)}, chênh ${e.lechTS>=0?"+":""}${so2(e.lechTS)} ·
          nhân trọng số để không ai gom việc vặt cho nhiều.</i></div>
        <div class="nsb1"><span>Khối lượng</span><b>${e.khoiLuong}</b>
          <i>điểm độ khó đã duyệt trong kỳ, trên ${e.n} việc.</i></div>
        <div class="nsb1"><span>Bị trả lại</span><b>${Math.round(e.traLai*100)}%</b>
          <i>${e.traLai>0.2?"cao — thường do tiêu chí nghiệm thu chưa rõ từ lúc giao.":"trong mức thường."}</i></div>
        <div class="nsb1"><span>Xu hướng đúng hạn</span>
          <b style="font-size:14px">${KY.map((k,i)=>Math.round(e.xu[i]*100)+"%").join(" → ")}</b>
          <i>${KY.join(" · ")}</i></div>
      </div>` : `<div class="bcgc">Chưa đủ việc đã nghiệm thu trong kỳ để nói gì về kết quả — hệ thống cố tình không xếp hạng.</div>`}
  </div>`;
}

/* Mỗi loại dấu hiệu: nghĩa là gì, nặng tới đâu, đo bằng gì, và PHẢI LÀM GÌ.
   Câu "phải làm gì" là thứ bản trước thiếu — 21 dòng mô tả mà không dòng nào
   nói người quản lý nên bước tiếp thế nào. */
const LOAI_CO = {
  TRE:  {m:"r", ic:"!",  ten:"Trễ hạn nhiều hơn nhóm ở mức chắc chắn",
         gt:"Khoảng tin cậy của người này nằm hẳn dưới mức trung bình nhóm — không phải may rủi của một vài việc.",
         lam:"Hỏi trực tiếp: do khối lượng, do việc khó, hay do cách làm. Ba nguyên nhân này ba cách xử lý khác nhau.",
         don:"% đúng hạn", nguoc:true},
  NUT:  {m:"r", ic:"⏳", ten:"Phiếu nằm chờ quá một ngày công ở khâu duyệt",
         gt:"Thời gian phiếu nằm chờ ở người duyệt, không phải thời gian người làm.",
         lam:"Nút thắt nằm ở người duyệt. Đặt lịch duyệt cố định trong ngày, hoặc uỷ quyền bớt cho cấp phó.",
         don:"giờ chờ trung bình"},
  TRA:  {m:"a", ic:"↺",  ten:"Bị trả lại nhiều khi nghiệm thu",
         gt:"Tỷ lệ việc bị trả lại ít nhất một lần trước khi được nghiệm thu.",
         lam:"Gần như luôn là tiêu chí nghiệm thu chưa rõ từ lúc giao, không phải người làm kém. Xem lại vài phiếu giao gần nhất.",
         don:"% việc bị trả lại"},
  GIAM: {m:"a", ic:"↓",  ten:"Giảm ba kỳ liên tiếp",
         gt:"Từng kỳ riêng lẻ chưa đủ chắc để kết luận, nhưng ba kỳ cùng chiều thì đáng hỏi thăm.",
         lam:"Hỏi thăm sớm, trước khi thành vấn đề. Thường có nguyên nhân ngoài công việc.",
         don:"mức giảm"},
  IT:   {m:"b", ic:"?",  ten:"Chưa đủ mẫu để kết luận",
         gt:"Dưới 5 việc trong kỳ. Hệ thống cố tình KHÔNG xếp hạng và KHÔNG chấm những người này.",
         lam:"Không kết luận gì. Nếu con số này lặp lại nhiều kỳ thì vấn đề là phân việc, không phải hiệu suất.",
         don:"số việc trong kỳ"},
};
const CO_THU = ["TRE","NUT","TRA","GIAM","IT"];

/* Vẽ một khối dấu hiệu: giải thích một lần, người dính vào xếp thành thanh so được. */
function khoiCo(loai, ds, muDung){
  const L = LOAI_CO[loai]; if (!ds.length) return "";
  const max = Math.max(...ds.map(x => x.tri), 0.0001);
  const sx = [...ds].sort((a,b) => L.nguoc ? a.tri - b.tri : b.tri - a.tri);
  const chuan = loai === "TRE" ? muDung : null;
  return `<div class="cok ${L.m}">
    <div class="cokh"><span class="coki">${L.ic}</span>
      <div><b>${L.ten}</b><span class="cokn">${ds.length} người</span>
        <i>${L.gt}</i></div></div>
    <div class="cob">${sx.map(x => {
      const r = Math.max(6, Math.round(x.tri / max * 100));
      return `<button class="cor" onclick="soiNguoi('${x.id}')" title="Mở dòng của ${esc(U[x.id].ten)}">
        <span class="corn">${esc(U[x.id].ten)}<i>${esc((DV[U[x.id].dv]||{}).ten || "")}</i></span>
        <span class="corb"><span class="corf" style="width:${r}%"></span>${
          chuan !== null ? `<span class="corc" style="left:${Math.min(99,Math.round(chuan/max*100))}%"
            title="Trung bình nhóm ${Math.round(chuan*100)}%"></span>` : ""}</span>
        <span class="corv">${x.nhan}${x.phu?`<i>${esc(x.phu)}</i>`:""}</span></button>`;
    }).join("")}</div>
    ${chuan !== null ? `<div class="cokc"><span class="cokcm"></span> Vạch dọc là mức trung bình nhóm
      (${Math.round(chuan*100)}% đúng hạn) — thanh ngắn hơn vạch là nằm dưới nhóm.</div>` : ""}
    <div class="cokl"><b>Nên làm gì:</b> ${L.lam}</div>
  </div>`;
}
/* Bấm một thanh thì mở đúng dòng người đó ở bảng bên dưới và cuộn tới — không bắt
   người dùng tự tìm lại cái tên vừa bấm trong bảng 42 dòng. */
function soiNguoi(id){
  NS_CHUY = 0; NS_DV = "TAT_CA"; NS_VT = "TAT_CA"; NS_TT = "TAT_CA"; NS_TIM = "";
  ND_MO = new Set([id]); draw();
  setTimeout(() => { const o = document.getElementById("ns-" + id);
    if (o) o.scrollIntoView({block:"center", behavior:"smooth"}); }, 30);
}

/* Xu hướng ba kỳ gần nhất — dùng chính soLieuKy() cho từng kỳ, không tự tính lại. */
/* ---------- DIỄN BIẾN BÊN NGOÀI ---------- */
const TIN_NHOM = {
  CHINH_SACH: {ten:"Chính sách – pháp luật", ic:"§", mo:"Văn bản đã ban hành, có ngày hiệu lực — bắt buộc tuân thủ, không phải lựa chọn"},
  THI_TRUONG: {ten:"Thị trường",            ic:"↗", mo:"Số liệu vĩ mô và ngành — giải thích môi trường đang thuận hay nghịch"},
  NGANH:      {ten:"Ngành hàng",            ic:"⚓", mo:"Giá cước, tỷ giá, nguyên liệu — chạm thẳng vào giá vốn"},
  CANH_TRANH: {ten:"Đối thủ – khách hàng",  ic:"◎", mo:"Do người trong công ty ghi nhận, không có nguồn công khai"},
};
const AH_MUC = {
  CAO:      {ten:"Ảnh hưởng cao",  m:"r", mo:"Phải có việc cụ thể và có hạn trước ngày hiệu lực"},
  VUA:      {ten:"Ảnh hưởng vừa",  m:"a", mo:"Cần rà soát, có thể phải điều chỉnh quy trình"},
  THAP:     {ten:"Ảnh hưởng thấp", m:"g", mo:"Biết để không bị động, chưa cần làm gì"},
  THEO_DOI: {ten:"Chỉ theo dõi",   m:"m", mo:"Chưa chạm tới hoạt động của công ty ở thời điểm này"},
};
/* Bốn văn bản dưới đây là văn bản THẬT, có số hiệu và ngày hiệu lực tra được.
   Phần ĐÁNH GIÁ ẢNH HƯỞNG là đánh giá sơ bộ — Phòng Pháp chế phải xác nhận trước khi dùng. */
let TIN_NGOAI = [
  {ma:"TN01", nhom:"CHINH_SACH", ten:"Nghị định 273/2026/NĐ-CP về kinh doanh hàng miễn thuế",
   so:"273/2026/NĐ-CP", hieuLuc:"21/08/2026",
   nd:"Người mua không phải xuất trình giấy tờ nếu thông tin đã được chia sẻ từ cơ sở dữ liệu.",
   nguon:"Cổng Thông tin điện tử Chính phủ", url:"https://baochinhphu.vn/chinh-sach-moi-co-hieu-luc-tu-thang-8-2026-102260731143849894.htm",
   ngay:"31/07/2026", ah:"VUA", xacNhan:false,
   viSao:"Công ty có hoạt động xuất nhập khẩu; thay đổi thủ tục chứng từ ở khâu hàng miễn thuế có thể kéo theo thay đổi hồ sơ lưu và cách đối chiếu của Tổ Xuất nhập khẩu.",
   lam:"Pháp chế đọc toàn văn, xác định có áp dụng cho mặt hàng của công ty không; nếu có thì cập nhật quy trình hồ sơ trước ngày hiệu lực.",
   dv:"PC", han:"18/08/2026"},
  {ma:"TN02", nhom:"CHINH_SACH", ten:"Nghị định 274/2026/NĐ-CP — ưu đãi cho đầu tư công nghệ cao, công nghệ xanh",
   so:"274/2026/NĐ-CP", hieuLuc:"21/08/2026",
   nd:"Ưu đãi tài chính 5% cho nhà đầu tư ứng dụng công nghệ cao hoặc công nghệ xanh; chuẩn hoá chi phí lập hồ sơ đấu thầu tối đa 200 triệu đồng.",
   nguon:"Cổng Thông tin điện tử Chính phủ", url:"https://baochinhphu.vn/chinh-sach-moi-co-hieu-luc-tu-thang-8-2026-102260731143849894.htm",
   ngay:"31/07/2026", ah:"VUA", xacNhan:false,
   viSao:"Nếu công ty có kế hoạch đầu tư kho, thiết bị hoặc phần mềm trong 12 tháng tới thì đây là khoản ưu đãi bỏ qua thì mất.",
   lam:"Tài chính rà danh mục đầu tư dự kiến, đối chiếu điều kiện hưởng ưu đãi, báo Ban Giám đốc trong cuộc họp tháng.",
   dv:"TCKT", han:"15/09/2026"},
  {ma:"TN03", nhom:"CHINH_SACH", ten:"Thông tư 31/2026/TT-NHNN — cho thuê tài chính với phần mềm và dữ liệu",
   so:"31/2026/TT-NHNN", hieuLuc:"15/08/2026",
   nd:"Đưa phần mềm và dữ liệu vào danh mục tài sản được cho thuê tài chính.",
   nguon:"Cổng Thông tin điện tử Chính phủ", url:"https://baochinhphu.vn/chinh-sach-moi-co-hieu-luc-tu-thang-8-2026-102260731143849894.htm",
   ngay:"31/07/2026", ah:"THAP", xacNhan:false,
   viSao:"Mở thêm một cách tài trợ cho chính khoản đầu tư phần mềm quản lý công việc đang triển khai — chuyển từ chi một lần sang thuê.",
   lam:"Tài chính hỏi thử hai đơn vị cho thuê, so với phương án mua đứt.",
   dv:"TCKT", han:"30/09/2026"},
  {ma:"TN04", nhom:"CHINH_SACH", ten:"Nghị định 281/2026/NĐ-CP — nâng mức phạt vi phạm đất đai",
   so:"281/2026/NĐ-CP", hieuLuc:"31/08/2026",
   nd:"Nâng mức phạt tối đa lên 250–400 triệu đồng.",
   nguon:"Cổng Thông tin điện tử Chính phủ", url:"https://baochinhphu.vn/chinh-sach-moi-co-hieu-luc-tu-thang-8-2026-102260731143849894.htm",
   ngay:"31/07/2026", ah:"THEO_DOI", xacNhan:false,
   viSao:"Chỉ chạm tới công ty nếu có mặt bằng kho thuê hoặc sở hữu đang có vướng mắc hồ sơ đất.",
   lam:"Pháp chế xác nhận tình trạng hồ sơ mặt bằng kho; nếu sạch thì đóng dòng này lại.",
   dv:"PC", han:"25/08/2026"},
  {ma:"TN05", nhom:"THI_TRUONG", ten:"Kim ngạch xuất nhập khẩu cả nước tăng 28,1%",
   so:null, hieuLuc:null,
   nd:"7 tháng đầu 2026 đạt 659,58 tỷ USD. Xuất khẩu +21,7%, nhập khẩu +34,8%, nhập siêu 20,52 tỷ USD.",
   nguon:"Tổng cục Thống kê, dẫn qua VietnamPlus",
   url:"https://www.vietnamplus.vn/7-thang-nam-2026-tong-kim-ngach-xuat-nhap-khau-hang-hoa-tang-281-post1128008.vnp",
   ngay:"04/08/2026", ah:"CAO", xacNhan:true,
   viSao:"Ngành đang mở rộng nhanh. Khối lượng việc của công ty tăng theo là bình thường — nhưng tồn kho việc đang mở cũng tăng theo, và đó mới là chỗ phải xử.",
   lam:"Khi giao kế hoạch kỳ tới, tính thêm phần tăng theo thị trường thay vì giữ nguyên mức cũ rồi để phát sinh đột xuất chen ngang.",
   dv:"ADKD", han:null},
  {ma:"TN06", nhom:"THI_TRUONG", ten:"PMI sản xuất Việt Nam 51,8 — còn mở rộng nhưng chậm lại",
   so:null, hieuLuc:null,
   nd:"Tháng 6/2026 đạt 51,8, giảm từ 52,8. Đơn hàng mới còn tăng, doanh nghiệp vẫn cắt giảm nhân sự, chuỗi cung ứng còn chậm giao.",
   nguon:"S&P Global, dẫn qua VietnamPlus",
   url:"https://en.vietnamplus.vn/manufacturing-sector-ends-first-half-of-2026-with-firm-growth-as-pmi-holds-above-no-change-mark-post347589.vnp",
   ngay:"01/07/2026", ah:"VUA", xacNhan:true,
   viSao:"Chuỗi cung ứng chậm giao là sức ép tiến độ đến từ BÊN NGOÀI. Một phần việc trễ của công ty không phải lỗi nội bộ — nhưng phải chứng minh được bằng trạng thái riêng “chờ đối tác”, không phải bằng lời.",
   lam:"Bắt buộc dùng trạng thái riêng “chờ đối tác” cho việc đang chờ bên ngoài, để đồng hồ dừng đúng chỗ và báo cáo trễ không đổ oan cho người làm.",
   dv:"XNK", han:null},
  {ma:"TN07", nhom:"NGANH", ten:"Tỷ giá USD/VND và giá cước vận tải biển",
   so:null, hieuLuc:null,
   nd:"CHƯA NỐI NGUỒN. Cần nối tỷ giá trung tâm của Ngân hàng Nhà nước và một chỉ số cước container.",
   nguon:null, url:null, ngay:null, ah:"CAO", xacNhan:false,
   viSao:"Hai biến này chạm thẳng vào giá vốn của công ty xuất nhập khẩu — nhưng phần mềm chưa có số nên chưa nói được gì.",
   lam:"CNTT nối nguồn tỷ giá và chỉ số cước ở giai đoạn 2. Trước khi nối xong, KHÔNG dùng dòng này để kết luận.",
   dv:"TH", han:null},
];
/* Đánh giá ảnh hưởng là việc của con người. Cờ này quyết định tin có được đưa vào
   phần kết luận hay chỉ nằm ở khu vực tham khảo. */
function xacNhanTin(ma){
  const t = TIN_NGOAI.find(x => x.ma === ma); if (!t) return;
  if (!coQuyen(me, "sua_tham_so")) return toast("Bạn không có quyền xác nhận đánh giá ảnh hưởng");
  t.xacNhan = !t.xacNhan; t.boi = me; t.ngayXN = fmtDY(TODAY);
  ghiNK(U[me].ten, `${t.xacNhan?"xác nhận":"bỏ xác nhận"} đánh giá ảnh hưởng của “${t.ten}”`, NOW);
  toast(t.xacNhan ? "Đã xác nhận — tin này được đưa vào phần kết luận" : "Đã bỏ xác nhận"); draw();
}
/* Biến một diễn biến thành một việc có người và có hạn. Trợ lý và bản tin đều
   KHÔNG tự tạo việc — mở sẵn biểu mẫu, người dùng bấm lưu. */
function tinThanhViec(ma){
  const t = TIN_NGOAI.find(x => x.ma === ma); if (!t) return;
  const truong = t.dv && DV[t.dv] ? DV[t.dv].truong : null;
  moTao("CONG_VIEC");
  FRM.ttl = t.so ? `Rà soát ${t.so}: ${t.ten.replace(/^[^—]*— ?/, "")}` : `Xử lý diễn biến: ${t.ten}`;
  FRM.mt = `${t.nd}\n\nẢnh hưởng tới công ty: ${t.viSao}\n\nViệc phải làm: ${t.lam}\n\nNguồn: ${t.nguon||"—"}${t.url?` (${t.url})`:""}`;
  FRM.sp = "Báo cáo rà soát và đề xuất trình Ban Giám đốc";
  if (truong) FRM.lam = truong;
  if (t.han) FRM.han = t.han;
  FRM.ah = t.ah === "CAO" ? 5 : t.ah === "VUA" ? 3 : 2;
  FRM.kc = t.hieuLuc ? 4 : 2;
  draw();
}
function tinCanLam(){
  return TIN_NGOAI.filter(x => (x.ah === "CAO" || x.ah === "VUA"));
}
/* Diễn biến sắp tới hạn hiệu lực mà chưa có việc nào gắn vào — chỗ dễ vỡ nhất,
   vì ngày hiệu lực không lùi được. */
function tinSapHieuLuc(){
  return TIN_NGOAI.filter(x => x.hieuLuc).map(x => {
    const con = dCong(TODAY, parse(x.hieuLuc));
    const daCoViec = T.some(t => viecMo(t) && x.so && (t.ttl||"").includes(x.so));
    return {...x, con, daCoViec};
  }).filter(x => x.con >= -30).sort((a,b) => a.con - b.con);
}

/* ---------- DÒNG CHẢY CÔNG VIỆC ----------
   Nhận vào so với đóng được, và tồn kho việc đang mở. Dùng định luật Little để
   ước thời gian một việc mới phải chờ: tồn kho ÷ nhịp đóng.
   Đây là con số trả lời câu "vì sao ai cũng bận mà việc vẫn trễ". */
function dongChay(tap, ky, S){
  const nhan = S.ps.ds.length;
  const dong = S.xongTruoc.length;
  const ton  = tap.filter(viecMo).length;
  const chu  = dong ? Math.round(ton / dong * 10) / 10 : null;   /* số kỳ để rút hết tồn kho */
  const can  = nhan - dong;
  return {nhan, dong, ton, chu, can,
    trang: can > 0 ? "day" : can < 0 ? "rut" : "can",
    y: dong === 0 ? "Kỳ qua không nghiệm thu việc nào nên chưa tính được nhịp."
     : can > 0 ? `Nhận vào ${nhan}, đóng được ${dong} — tồn kho tăng ${can} việc trong một kỳ. Ép người làm nhanh hơn không chữa được: phải chặn bớt đầu vào hoặc thêm người ở khâu chậm nhất.`
     : can < 0 ? `Đóng được ${dong}, nhận vào ${nhan} — tồn kho đang rút ${-can} việc mỗi kỳ. Nhịp đang lành.`
     : `Nhận vào bằng đóng được (${nhan}). Tồn kho đứng yên — không xấu, nhưng cũng không rút được ${ton} việc đang mở.`};
}

/* ---------- NÚT THẮT HỆ THỐNG ----------
   Cả hệ chỉ chạy nhanh bằng khâu chậm nhất. Nêu ĐÍCH DANH một nút. Liệt kê năm chỗ
   ngang nhau là cách chắc chắn nhất để không chỗ nào được sửa. */
function nutHeThong(tap, S){
  const ub = [];
  /* 1. Khâu nghiệm thu */
  const ids = Object.keys(LS_DUYET).filter(id => U[id]);
  const cham = ids.map(id => ({id, n:nutThat(id)})).filter(x => x.n.gioGiu > GIO_NGAY)
    .sort((a,b) => b.n.gioGiu - a.n.gioGiu);
  if (cham.length) ub.push({loai:"DUYET", diem: cham[0].n.gioGiu / GIO_NGAY,
    ten:`Khâu nghiệm thu ở ${U[cham[0].id].ten}`,
    so:`${so1(cham[0].n.gioGiu)} giờ`, mo:`phiếu nằm chờ trung bình ${so1(cham[0].n.gioGiu)} giờ, gấp ${so1(cham[0].n.gioGiu/GIO_NGAY)} lần một ngày công`,
    bc:`${cham.length} người duyệt vượt ngưỡng · luôn có khoảng ${so1(cham[0].n.L)} phiếu treo ở riêng người này`,
    lam:`Đặt lịch duyệt cố định hai lần mỗi ngày, hoặc uỷ quyền bớt cho cấp phó`,
    ai: cham[0].id});
  /* 2. Ý kiến chưa trả lời — đồng hồ dừng, việc đứng im mà không ai biết */
  const yk = tap.filter(t => viecMo(t) && t.yKien);
  if (yk.length) ub.push({loai:"Y_KIEN", diem: yk.length / Math.max(1, tap.filter(viecMo).length) * 12,
    ten:`Ý kiến chưa được trả lời`, so:`${yk.length} việc`,
    mo:`${yk.length} việc đang dừng đồng hồ chờ một câu trả lời`,
    bc:`Lâu nhất: ${esc(yk[0].id)} · ${esc(U[yk[0].lam]?U[yk[0].lam].ten:"—")}`,
    lam:`Trả lời hoặc uỷ quyền trả lời trong 24 giờ — việc đứng im ở đây không hiện lên bất kỳ báo cáo trễ nào`,
    ai: yk[0].giao});
  /* 3. Đơn vị khuyết trưởng — phiếu phải trôi lên cấp trên nghiệm thu */
  const khuyet = Object.entries(DV).filter(([k,d]) => d.khuyet);
  const nk = khuyet.reduce((a,[k]) => a + tap.filter(t => viecMo(t) && trongDV(t.lam, k)).length, 0);
  if (khuyet.length && nk) ub.push({loai:"CO_CAU", diem: khuyet.length * 1.6,
    ten:`${khuyet.length} đơn vị đang khuyết trưởng`, so:`${nk} việc`,
    mo:`${nk} việc đang mở nằm trong đơn vị không có người nghiệm thu tại chỗ`,
    bc: khuyet.slice(0,3).map(([k,d]) => esc(d.ten)).join(" · "),
    lam:`Bổ nhiệm trưởng, hoặc ghi rõ người được uỷ quyền nghiệm thu — đây là nguyên nhân CƠ CẤU, chấn chỉnh con người không chữa được`,
    ai: null});
  /* 4. Quá tải */
  if (S.quaTai.length) ub.push({loai:"TAI", diem: S.quaTai.length * 1.1,
    ten:`${S.quaTai.length} người quá tải trong tuần`, so:`${S.quaTai.length} người`,
    mo:`tổng độ khó việc đang mở vượt sức một tuần (${SUC_TUAN} điểm)`,
    bc: S.quaTai.slice(0,3).map(id => `${esc(U[id].ten)} ${so1(taiTuanNay(id))}/${SUC_TUAN}`).join(" · "),
    lam:`Chuyển bớt việc sang người còn chỗ — cửa sổ Cá nhân có bộ lọc “Còn chỗ nhận việc”`,
    ai: S.quaTai[0]});
  /* 5. Chờ ký tiền */
  const tien = S.bgd.filter(o => (o.t.tienLoai||"CHI") === "CHI" && (o.t.tien||0) >= BAC_DUYET[0].tu);
  if (tien.length) ub.push({loai:"TIEN", diem: tien.length * 1.4,
    ten:`${tien.length} khoản chi đang chờ chữ ký`,
    so:`${(tien.reduce((a,o)=>a+(o.t.tien||0),0)/1e9).toFixed(2)} tỷ`,
    mo:`việc đứng chờ duyệt tiền thì người thực hiện vẫn bị tính trễ — trễ này không phải lỗi của họ`,
    bc:`Lớn nhất: ${esc(tien[0].t.id)} · ${(tien[0].t.tien||0).toLocaleString("vi")} đ`,
    lam:`Ký hoặc bác ngay trong cuộc họp, không để sang kỳ sau`, ai:null});
  ub.sort((a,b) => b.diem - a.diem);
  return {chinh: ub[0] || null, khac: ub.slice(1)};
}

/* ---------- CHUỖI NGUYÊN NHÂN ----------
   Ba bậc: triệu chứng → trung gian → gốc. Ban Giám đốc phải gẩy vào GỐC.
   Gẩy vào triệu chứng ("yêu cầu các phòng nâng tỷ lệ đúng hạn") là kiểu chỉ đạo
   nghe rất quyết liệt mà không đổi được gì. */
function chuoiNhan(tap, S, DC, NT){
  const b = [];
  const tl = S.tlDung;
  b.push({bac:"Triệu chứng", ten: tl == null ? "Chưa có tỷ lệ đúng hạn của kỳ"
      : tl >= 85 ? `Đúng hạn ${tl}% — đạt mức công ty tự đặt`
      : `Đúng hạn ${tl}%, thiếu ${85-tl} điểm so với mức công ty tự đặt`,
    bc: tl == null ? "Kỳ qua không nghiệm thu việc nào."
      : `${S.dungHan.length}/${S.xongTruoc.length} việc về đích đúng hạn gốc · ${S.treTruoc.filter(viecMo).length} việc đến hạn kỳ qua còn bỏ dở.`});
  const tg = [];
  if (S.tac.length) tg.push(`${S.tac.length} việc đang tắc — dừng chờ người khác, không phải chờ người làm`);
  if (DC.can > 0) tg.push(`nhận vào nhiều hơn đóng được ${DC.can} việc trong kỳ, tồn kho ${DC.ton} việc đang mở`);
  if (S.ps.tlDX != null && S.ps.tlDX >= 30) tg.push(`${S.ps.tlDX}% việc phát sinh là đột xuất, chen ngang việc kế hoạch`);
  if (S.quaTai.length) tg.push(`${S.quaTai.length} người vượt sức tuần`);
  b.push({bac:"Nguyên nhân trung gian", ten: tg.length ? tg[0] : "Không có khâu nào lệch rõ trong kỳ",
    bc: tg.length > 1 ? "Cùng lúc: " + tg.slice(1).join(" · ") + "." : "Các khâu còn lại đều trong ngưỡng."});
  b.push({bac:"Nguyên nhân gốc", ten: NT.chinh ? NT.chinh.ten : "Chưa xác định được nút thắt rõ ràng",
    bc: NT.chinh ? `${NT.chinh.mo}. ${NT.chinh.bc}.`
      : "Không khâu nào vượt ngưỡng đủ xa để gọi là nút thắt. Nếu tỷ lệ vẫn thấp thì nguyên nhân nằm ngoài dữ liệu phần mềm — cần hỏi trực tiếp.",
    lam: NT.chinh ? NT.chinh.lam : null});
  return b;
}

/* ---------- RỦI RO TẬP TRUNG ----------
   Số trung bình luôn giấu chỗ này: cả phòng "bình thường" trong khi 40% việc nằm
   trên vai một người, và người đó nghỉ một tuần là vỡ. */
function ruiRoTapTrung(tap){
  const mo = tap.filter(viecMo);
  const r = [];
  const theoNguoi = {};
  mo.forEach(t => theoNguoi[t.lam] = (theoNguoi[t.lam]||0) + 1);
  const top = Object.entries(theoNguoi).sort((a,b)=>b[1]-a[1])[0];
  if (top && mo.length){
    const pt = Math.round(top[1] / mo.length * 100);
    r.push({muc: pt >= 25 ? 2 : pt >= 15 ? 1 : 0, ten:"Việc dồn vào một người",
      so:`${pt}%`, ai: U[top[0]] ? U[top[0]].ten : "—",
      mo:`${top[1]}/${mo.length} việc đang mở nằm trên một người`,
      lam: pt >= 15 ? `Người này nghỉ một tuần thì ${top[1]} việc đứng lại. Chia bớt, hoặc ít nhất ghi rõ người thay khi vắng ở Thiết lập › Vị trí việc làm.`
                    : `Phân bố đang đều, không cần can thiệp.`});
  }
  const dsD = Object.keys(LS_DUYET).filter(id => U[id]).map(id => ({id, n:nutThat(id).L}));
  const tong = dsD.reduce((a,x)=>a+x.n,0);
  const topD = dsD.sort((a,b)=>b.n-a.n)[0];
  if (topD && tong){
    const pt = Math.round(topD.n / tong * 100);
    r.push({muc: pt >= 30 ? 2 : pt >= 20 ? 1 : 0, ten:"Phiếu chờ dồn vào một người duyệt",
      so:`${pt}%`, ai: U[topD.id].ten,
      mo:`${so1(topD.n)} trên ${so1(tong)} phiếu đang treo nằm ở một người`,
      lam: pt >= 20 ? `Uỷ quyền bớt bậc duyệt, hoặc tách nhánh. Nút thắt nghiệm thu không tự giãn ra khi thêm người làm.`
                    : `Tải duyệt đang chia đều.`});
  }
  const khuyet = Object.entries(DV).filter(([k,d]) => d.khuyet);
  r.push({muc: khuyet.length >= 4 ? 2 : khuyet.length ? 1 : 0, ten:"Đơn vị khuyết trưởng",
    so:`${khuyet.length}/${Object.keys(DV).length}`, ai: khuyet.slice(0,2).map(([k,d])=>d.ten).join(", ") || "—",
    mo: khuyet.length ? `${khuyet.length} đơn vị không có trưởng chính thức` : "Mọi đơn vị đều có trưởng",
    lam: khuyet.length ? `Phiếu của các đơn vị này phải trôi lên cấp trên để nghiệm thu — chậm là hệ quả của cơ cấu, không phải của người làm.`
                       : `Không có rủi ro cơ cấu ở đây.`});
  const kiem = Object.values(U).map(u => ({u, n: Object.values(DV).filter(d => d.truong === u.id).length}))
    .filter(x => x.n >= 2).sort((a,b)=>b.n-a.n);
  if (kiem.length) r.push({muc: kiem[0].n >= 3 ? 2 : 1, ten:"Kiêm nhiệm nhiều đơn vị",
    so:`${kiem[0].n} đơn vị`, ai: kiem[0].u.ten,
    mo:`${kiem.length} người đang làm trưởng từ hai đơn vị trở lên`,
    lam:`Phạm vi quyền gộp cả các nhánh kiêm nhiệm. Bổ nhiệm trưởng thật thì phạm vi tự co lại.`});
  return r.sort((a,b)=>b.muc-a.muc);
}

/* ---------- CẢNH BÁO SỚM ----------
   Mốc và việc ưu tiên cao đến hạn kỳ này: với nhịp đang chạy thì có kịp không.
   Tính bằng tốc độ CẦN so với tốc độ ĐANG ĐẠT — không dùng cảm tính. */
function canhBaoSom(tap, kyNay){
  return tap.filter(t => viecMo(t) && trongKhoang(parse(t.han), kyNay) && (t.moc || uuTien(t).muc <= 2))
    .map(t => {
      const conL = Math.max(0, 100 - tienDo(t));
      const ngay = Math.max(0.5, ngayCong(fmtDY(TODAY), t.han));
      const canToc = conL / ngay;                       /* % mỗi ngày công phải đạt */
      const daQua = Math.max(0.5, ngayCong(t.bd, fmtDY(TODAY)));
      const dangToc = tienDo(t) / daQua;                /* % mỗi ngày công đang đạt */
      const ty = dangToc > 0 ? canToc / dangToc : 99;
      return {t, conL, ngay, canToc, dangToc, ty,
        muc: ty >= 2 ? 2 : ty >= 1.25 ? 1 : 0};
    })
    .sort((a,b) => (b.muc - a.muc) || (b.ty - a.ty));
}

function xuHuongKy(n){
  const r = [];
  for (let i = n; i >= 1; i--){
    const kT = khoangKy("TUAN", -i), kN = khoangKy("TUAN", -i+1);
    const S = soLieuKy(T.filter(trongTamNhin), kT, kN);
    r.push({ten:kT.ten, khoang:kT.khoang, tl:S.tlDung, denHan:S.denHanTruoc.length,
            xong:S.xongTruoc.length, tre:S.treTruoc.filter(viecMo).length, tac:S.tac.length});
  }
  return r;
}

function vNhanSu(){
  /* =====================================================================
     NHÂN SỰ — gộp hai nửa từng nằm rời nhau

     Cửa sổ Điều hành cũ có hai mục nói về CON NGƯỜI (cân tải tuần này, nhịp của đội)
     nằm lẫn với ba mục nói về VIỆC; còn cửa sổ Đánh giá chỉ nhìn lại kỳ đã qua.
     Cùng một người bị chia làm hai chỗ: hôm nay họ gánh bao nhiêu ở một màn, kỳ vừa
     rồi họ làm thế nào ở màn khác — không nối được hai vế lại để hiểu.

     Nay một cửa sổ, hai tầng thời gian, xếp đúng thứ tự người quản lý cần:
       · HÔM NAY  — ai đang quá tải, ai đang ôm việc quá hạn. Sửa được ngay.
       · KỲ VỪA RỒI — đúng hạn, chất lượng, xu hướng. Chỉ để hiểu, không sửa được nữa.
     ===================================================================== */
  /* Dùng ĐÚNG hàm mà Điều hành dùng — doiCuaToi() duyệt hết cây bên dưới, còn capDuoi()
     chỉ lấy cấp kề. Trước đây Điều hành ghi "42 người trong nhánh" còn Cá nhân ghi 11,
     cùng một vai và cùng một cây. */
  const nhanh = doiCuaToi();
  const idsGoc = Object.keys(_NET).filter(id => nhanh.includes(id) || id === me);
  const ids = DH_DV === "TAT_CA" ? idsGoc : idsGoc.filter(id => trongDV(id, DH_DV));
  const idsDay = ids.length > 1 ? ids : Object.keys(_NET);
  /* BGĐ nhìn cấp trưởng phó; trưởng phòng nhìn đủ người của mình. Cùng một bảng,
     khác tập người, vì hai vai này quản hai thứ khác nhau. */
  const dsId = idsDay.filter(nguoiTamDH);
  const D = dsId.map(tinhNguoi);
  const muDung = tb(D.map(x=>x.dung)), muCl = tb(D.map(x=>x.cl));
  const tau2 = Math.max(0.02, sd(D.map(x=>x.cl))**2), sig2 = 0.64;

  /* ---- cờ: mỗi cờ một dòng, một câu lý do, một câu việc cần làm ---- */
  /* Mỗi cờ mang đủ: LOẠI (để gom), NGƯỜI (để mở ra), GIÁ TRỊ SỐ (để vẽ thanh),
     và một nhãn ngắn. Câu giải thích dài không nằm ở cờ nữa mà nằm ở LOẠI —
     viết một lần cho cả nhóm thay vì lặp lại từng dòng. */
  const co = [];
  D.forEach(x => {
    const giam = x.xu[2] < x.xu[1] && x.xu[1] < x.xu[0];
    if (x.n < 5)
      co.push({n:"IT", id:x.id, tri:x.n, nhan:`${x.n} việc`});
    else if (x.dungHi < muDung)
      co.push({n:"TRE", id:x.id, tri:x.dung, nhan:`${Math.round(x.dung*100)}%`,
        phu:`dải ${Math.round(x.dungLo*100)}–${Math.round(x.dungHi*100)}%`});
    else if (giam)
      co.push({n:"GIAM", id:x.id, tri:x.xu[0]-x.xu[2], nhan:KY.map((k,i)=>Math.round(x.xu[i]*100)+"%").join(" → ")});
    if (x.n >= 5 && x.traLai > 0.2)
      co.push({n:"TRA", id:x.id, tri:x.traLai, nhan:`${Math.round(x.traLai*100)}%`, phu:`${x.n} việc trong kỳ`});
  });
  Object.keys(LS_DUYET).filter(id => id === me || doiCuaToi().includes(id)).forEach(id => { const n = nutThat(id);
    if (n.gioGiu > GIO_NGAY) co.push({n:"NUT", id, tri:n.gioGiu, nhan:`${so1(n.gioGiu)} giờ`,
      phu:`~${so1(n.L)} phiếu treo`});
  });

  /* ---- bốn chỉ số tổng ---- */
  /* Chỉ cộng người duyệt TRONG NHÁNH của mình. Cộng cả 10 người duyệt toàn công ty
     thì Tổ trưởng Tổ xe thấy 48,6 phiếu treo trong khi nhánh họ chỉ có 2 người. */
  const treo = Object.keys(LS_DUYET).filter(id => id === me || doiCuaToi().includes(id))
    .reduce((a2,id)=>a2 + nutThat(id).L, 0);
  const kpi = [
    ["Người trong nhóm", D.length, "trong nhóm của bạn", "var(--navy)"],
    ["Dấu hiệu cần hỏi thêm", co.length, co.length?"đếm DẤU HIỆU, không phải đếm việc":"không có gì bất thường",
      co.some(c=>LOAI_CO[c.n].m==="r")?VM.QUA_HAN.mau:co.length?VM.CHO_DUYET.mau:"#008300"],
    ["Đúng hạn cả nhóm", Math.round(muDung*100)+"%", "kỳ " + KY[KY.length-1], "var(--navy)"],
    /* Ô này trước ghi "Phiếu đang treo ở khâu duyệt 48,6" trong khi toàn công ty chỉ có
       2 việc đang chờ duyệt — 48,6 là TRUNG BÌNH DÀI HẠN theo định luật Little trên dữ
       liệu mô phỏng, không phải số phiếu đang treo lúc này. Đặt cạnh các ô đếm thật thì
       nó thành con số sai. Đưa xuống dải "Nhịp của cả nhóm" với nhãn đúng, chỗ này thay
       bằng một con số đếm thật trên cùng nhánh. */
    ["Việc đang mở của nhóm", T.filter(t => dsId.includes(t.lam) && viecMo(t) && xemDuoc(t)).length,
      `${T.filter(t => dsId.includes(t.lam) && viecMo(t) && xemDuoc(t) && quaHan(t)).length} việc đang quá hạn`,
      T.filter(t => dsId.includes(t.lam) && viecMo(t) && xemDuoc(t) && quaHan(t)).length?"var(--red)":"var(--navy)"],
  ];

  /* ---- TẦNG 1: HÔM NAY — chuyển từ cửa sổ Điều hành sang ---- */
  const doiTai = dsId.map(id => {
    const viec = T.filter(t => t.lam === id && viecMo(t) && laLa(t) && xemDuoc(t));
    return {id, tai:taiTuanNay(id), mo:viec.length, tre:viec.filter(quaHan).length,
            khan:viec.filter(t=>uuTien(t).muc<=2).length, dung:viec.filter(dangDung).length};
  }).sort((a,b)=>b.tai-a.tai);
  const quaTai = doiTai.filter(x => x.tai > SUC_TUAN);
  const viecDoi = T.filter(t => dsId.includes(t.lam) && viecMo(t) && xemDuoc(t));
  const mc = monteCarlo(viecDoi.length);

  /* Bảng "Hôm nay" cũ đã gộp vào bảng một-dòng-một-người bên dưới. */

  /* ---- TẦNG 2: KỲ VỪA RỒI ---- */
  const dai = (a2,b2) => `left:${a2*100}%;width:${Math.max(1,(b2-a2)*100)}%`;
  const dong = D.map(x => {
    const mo = ND_MO.has(x.id);
    /* Trước đây dò bằng "tiêu đề cờ có bắt đầu bằng tên người này không" — hai người
       tên lồng nhau ("Nguyễn Văn Nhu" / "Nguyễn Văn Nhung") là gán nhầm cờ. Nay cờ
       mang thẳng mã người nên so bằng mã. */
    const coCo = co.some(c => c.id === x.id);
    const doc = x.n < 5 ? ["Chưa đủ dữ liệu","m"] : coCo ? ["Cần xem thêm","a"] : ["Ổn định","g"];
    const clCo = coNgot(x.cl, x.n, muCl, tau2, sig2);
    let h = `<div class="prow ${mo?"op":""}" onclick="togND('${x.id}')">
      <div class="pnm">${avHTML(x.id,32)}<div><b>${U[x.id].ten}</b><i>${U[x.id].cd}</i></div></div>
      <div class="pv2">${x.n} việc</div>
      <div class="pm2"><span class="ci"><span class="band" style="${dai(x.dungLo,x.dungHi)}"></span>
        <span class="pt" style="left:calc(${x.dung*100}% - 1.5px)"></span>
        <span class="avg" style="left:${muDung*100}%"></span></span><b>${Math.round(x.dung*100)}%</b></div>
      <div class="pm2"><span class="ci"><span class="band" style="${dai((x.clLo-1)/4,(x.clHi-1)/4)}"></span>
        <span class="pt" style="left:calc(${(x.cl-1)/4*100}% - 1.5px)"></span>
        <span class="avg" style="left:${(muCl-1)/4*100}%"></span></span><b>${x.cl.toFixed(1)}</b></div>
      <div class="spk">${x.xu.map(v=>`<i style="height:${Math.max(8,v*100)}%"></i>`).join("")}</div>
      <div><span class="tag ${doc[1]}">${doc[0]}</span></div>
      <span class="pcv">▶</span>
    </div>`;
    if (mo) h += `<div class="pdet"><div class="g2">
      <div class="bx"><b>Nộp đúng hạn <span class="src do">Đo được</span></b>
        ${Math.round(x.dung*100)}%, dải thật ${Math.round(x.dungLo*100)}–${Math.round(x.dungHi*100)}%.
        Nhóm ${Math.round(muDung*100)}% (vạch đỏ). Chỉ kết luận khi dải nằm hẳn ngoài mức nhóm.</div>
      <div class="bx"><b>Chất lượng <span class="src yk">Ý kiến người duyệt</span></b>
        ${x.cl.toFixed(2)}, sau co ngót ${clCo.toFixed(2)}. Do <b>một người</b> chấm — hai quản lý chấm cùng một người
        chỉ khớp nhau khoảng 0,45 khi điểm dùng cho quyết định nhân sự.</div>
      <div class="bx"><b>Khối lượng <span class="src do">Đo được</span></b>
        ${x.khoiLuong} điểm độ khó đã duyệt trong kỳ, trên ${x.n} việc.</div>
      <div class="bx"><b>Điểm tháng có trọng số độ khó <span class="src do">Đo được</span></b>
        <b style="font-size:15px;color:var(--navy)">${so2(x.diemTS)}</b> — trung bình cộng không trọng số là
        ${so2(x.diemTB)}, chênh ${x.lechTS>=0?"+":""}${so2(x.lechTS)}.
        Nhân trọng số là <b>hàng rào toán học chống gian lận</b>: không nhân thì người làm 20 việc dễ
        ăn đứt người làm 3 việc khó, và ai cũng sẽ chọn việc dễ.</div>
      <div class="bx"><b>Báo vướng qua phần mềm <span class="src do">Đo được</span></b>
        ${Math.round(x.baoSom*100)}%. Đây là <b>mức dùng phần mềm</b>, không phải thước đo tính chủ động —
        không tính vào điểm.</div>
      <div class="bx"><b>Bị trả lại</b> ${Math.round(x.traLai*100)}% số việc trong kỳ.</div>
      <div class="bx"><b>Xu hướng đúng hạn</b> ${KY.map((k,i)=>k.slice(0,2)+": "+Math.round(x.xu[i]*100)+"%").join(" · ")}</div>
    </div></div>`;
    return h;
  }).join("");

  const tt = quaTai.length ? "r" : co.some(c=>LOAI_CO[c.n].m==="r") ? "a" : "g";

  /* Ghép hai vế của cùng một người: tải hiện tại và kết quả kỳ qua. */
  const map = {}; D.forEach(x => map[x.id] = x);
  const hang = doiTai.map(o => ({...o, e: map[o.id] || null}))
    .sort((a,b) => (b.tre - a.tre) || (b.tai - a.tai));
  const idCo = new Set(co.map(c => c.id));
  const canChuY = h => h.tre > 0 || h.tai > SUC_TUAN || h.dung > 0
    || (h.e && h.e.n >= 5 && h.e.dungHi < muDung)
    || idCo.has(h.id);                               /* gồm cả dấu hiệu của kỳ đã qua */
  /* Năm trục lọc ghép được với nhau. Mỗi trục trả lời một câu hỏi giám sát khác nhau:
       đơn vị  — "phòng nào đang có vấn đề"
       vị trí  — "các tổ trưởng của tôi ra sao"
       tình trạng — "ai đang quá tải" / "ai đang ôm việc quá hạn"
       tìm tên — "người này thế nào"
       sắp xếp — đổi trục ưu tiên khi câu hỏi đổi */
  const TT_LOC = {
    TAT_CA:  ["Mọi tình trạng", () => true],
    QUA_TAI: ["Đang quá tải",   x => x.tai > SUC_TUAN],
    TRE:     ["Có việc quá hạn", x => x.tre > 0],
    TAC:     ["Đang chờ tôi trả lời", x => x.dung > 0],
    KEM:     ["Trễ nhiều hơn nhóm",   x => x.e && x.e.n >= 5 && x.e.dungHi < muDung],
    RANH:    ["Còn chỗ nhận việc",    x => x.tre === 0 && x.tai <= SUC_TUAN * 0.75],
  };
  const XEP = {
    tre:  ["Việc quá hạn rồi tới tải", (a,b) => (b.tre - a.tre) || (b.tai - a.tai)],
    tai:  ["Tải tuần này",         (a,b) => b.tai - a.tai],
    dung: ["Đúng hạn kỳ qua",      (a,b) => ((a.e&&a.e.n?a.e.dung:2)) - ((b.e&&b.e.n?b.e.dung:2))],
    diem: ["Điểm kỳ qua",          (a,b) => ((b.e&&b.e.n?b.e.diemTS:0)) - ((a.e&&a.e.n?a.e.diemTS:0))],
    ten:  ["Tên A → Z",            (a,b) => U[a.id].ten.localeCompare(U[b.id].ten, "vi")],
  };
  const qTim = boDau(NS_TIM.trim());
  const loc = hang
    .filter(x => !NS_CHUY || canChuY(x))
    .filter(x => NS_DV === "TAT_CA" || trongDV(x.id, NS_DV))
    .filter(x => NS_VT === "TAT_CA" || (U[x.id].vt || "NV") === NS_VT)
    .filter(x => (TT_LOC[NS_TT] || TT_LOC.TAT_CA)[1](x))
    .filter(x => !qTim || boDau(U[x.id].ten).includes(qTim) || boDau(U[x.id].cd).includes(qTim)
              || boDau(DV[U[x.id].dv] ? DV[U[x.id].dv].ten : "").includes(qTim))
    .sort((XEP[NS_XEP] || XEP.tre)[1]);
  const coLocNS = NS_CHUY || NS_DV !== "TAT_CA" || NS_VT !== "TAT_CA" || NS_TT !== "TAT_CA" || NS_TIM;

  let h = `<h1 class="h1">Cá nhân</h1>
    ${vaiCuaSo("ns")}${daiOng(dsId.length, idsDay.length, "người")}
    <p class="sub">${esc(U[me].ten)} · ${dsId.length} người trong nhánh. Mỗi người <b>một dòng</b>:
    bên trái là thứ <b>sửa được hôm nay</b>, bên phải là <b>kết quả kỳ đã qua</b>.
    Bấm một dòng để xem đúng những việc người đó đang làm.</p>

    <div class="kl ${tt}"><span class="ki">${tt==="r"?"✕":tt==="a"?"!":"✓"}</span><div>
      <span class="kt">${quaTai.length ? `${quaTai.length} người đang quá tải tuần này`
        : co.some(c=>LOAI_CO[c.n].m==="r") ? "Có dấu hiệu cần xem thêm ở kỳ vừa rồi" : "Nhóm đang trong ngưỡng bình thường"}</span>
      <div class="ks">${doiTai.filter(x=>x.tre).length ? `<b style="color:var(--red)">${doiTai.filter(x=>x.tre).length} người đang ôm việc quá hạn</b> · ` : ""}${
        co.length ? `${co.length} dấu hiệu ở kỳ vừa rồi cần xem` : "không dấu hiệu bất thường nào ở kỳ vừa rồi"}${
        treo>8?` · <b style="color:var(--red)">${so1(treo)} phiếu đang treo ở khâu duyệt</b>`:""}</div>
    </div></div>`;

  h += `<div class="kpi">${kpi.map(([l2,v,h2,m])=>`<div class="c">
      <div class="l">${l2}</div><div class="v" style="color:${m}">${v}</div><div class="h">${h2}</div></div>`).join("")}</div>`;

  /* Dấu hiệu: mỗi cái MỘT DÒNG. Bản trước mỗi dấu hiệu là một thẻ hai dòng có nền,
     sáu cái chiếm hết màn hình trước khi tới bảng — thứ người ta vào đây để xem. */
  if (co.length){
    const nhom = CO_THU.map(k => [k, co.filter(c => c.n === k)]).filter(([k,d]) => d.length);
    /* Mặc định mở hai nhóm nặng nhất; các nhóm còn lại thu lại thành hàng chip đếm số.
       Mở hết ngay thì lại thành một trang chữ dài — đúng cái đang phải sửa. */
    const hien = NS_CO ? nhom : nhom.slice(0, 2);
    h += `<div class="nsco">
      <div class="nscoh">Dấu hiệu cần xem — <b>${co.length}</b> chỗ nên hỏi thêm trên
        <b>${nhom.length}</b> nhóm nguyên nhân, chưa phải kết luận
        <button class="btn sm" style="float:right" onclick="NS_CO=!NS_CO;draw()">${NS_CO?"Chỉ xem nhóm nặng":"Xem cả ${nhom.length} nhóm"}</button></div>
      <div class="cotab">${nhom.map(([k,d])=>`<button class="cotb ${LOAI_CO[k].m} ${hien.some(([x])=>x===k)?"on":""}"
        onclick="NS_CO=true;draw()"><span>${LOAI_CO[k].ic}</span>${LOAI_CO[k].ten.split(" ").slice(0,3).join(" ")}<b>${d.length}</b></button>`).join("")}</div>
      <div class="cog">${hien.map(([k,d]) => khoiCo(k, d, muDung)).join("")}</div>
      ${!NS_CO && nhom.length > 2 ? `<div class="bcgc">Còn ${nhom.length-2} nhóm nữa
        (${nhom.slice(2).map(([k,d])=>`${LOAI_CO[k].ten.toLowerCase()} · ${d.length}`).join(" · ")}) — bấm nút trên.</div>` : ""}
    </div>`;
  }

  /* ---- thanh lọc ---- */
  const dsDV = [...new Set(dsId.map(id => U[id] && U[id].dv).filter(Boolean))];
  const chaDV = new Set(); dsDV.forEach(k => { let x = DV[k] ? DV[k].cha : null, v = 0;
    while (x && v++ < 12){ chaDV.add(x); x = DV[x] ? DV[x].cha : null; } });
  const chonDV = [...new Set([...dsDV, ...chaDV])].filter(k => k !== "HDQT" && k !== "CTY");
  h += `<div class="nsloc">
      <div class="nsl1">
        <div class="sg">
          <button class="${!NS_CHUY?"on":""}" onclick="setNSChuY(0)">Tất cả ${hang.length}</button>
          <button class="${NS_CHUY?"on":""}" onclick="setNSChuY(1)">Cần chú ý ${hang.filter(canChuY).length}</button>
        </div>
        <span class="lsep"></span>
        <label class="nslb"><span>Đơn vị</span>
          <select class="lsel ${NS_DV!=="TAT_CA"?"on":""}" onchange="setNS('dv',this.value)">
            <option value="TAT_CA">Cả nhánh (${hang.length})</option>
            ${(function(){ const ra=[]; (function di(ma, sau){
                Object.entries(DV).filter(([k,d])=>d.cha===ma).forEach(([k,d])=>{
                  if (chonDV.includes(k)){ const n = hang.filter(x=>trongDV(x.id,k)).length;
                    if (n) ra.push(`<option value="${k}" ${NS_DV===k?"selected":""}>${"　".repeat(sau)}${sau?"└ ":""}${esc(d.ten)} (${n})</option>`); }
                  di(k, chonDV.includes(ma)?sau+1:sau); });
              })("CTY",0); return ra.join(""); })()}
          </select></label>
        <label class="nslb"><span>Vị trí</span>
          <select class="lsel ${NS_VT!=="TAT_CA"?"on":""}" onchange="setNS('vt',this.value)">
            <option value="TAT_CA">Mọi vị trí</option>
            ${CV_THU.filter(k=>hang.some(x=>(U[x.id].vt||"NV")===k))
              .map(k=>`<option value="${k}" ${NS_VT===k?"selected":""}>${CHUC_VU[k].ten} (${hang.filter(x=>(U[x.id].vt||"NV")===k).length})</option>`).join("")}
          </select></label>
        <label class="nslb"><span>Tình trạng</span>
          <select class="lsel ${NS_TT!=="TAT_CA"?"on":""}" onchange="setNS('tt',this.value)">
            ${Object.entries(TT_LOC).map(([k,v])=>`<option value="${k}" ${NS_TT===k?"selected":""}>${v[0]} (${hang.filter(v[1]).length})</option>`).join("")}
          </select></label>
        <label class="nslb"><span>Tìm người</span>
          <input class="inp" style="height:34px" placeholder="Gõ tên, chức danh hoặc phòng…"
            value="${esc(NS_TIM)}" oninput="setNS('tim',this.value)"></label>
        <label class="nslb"><span>Xếp theo</span>
          <select class="lsel" onchange="setNS('xep',this.value)">
            ${Object.entries(XEP).map(([k,v])=>`<option value="${k}" ${NS_XEP===k?"selected":""}>${v[0]}</option>`).join("")}
          </select></label>
      </div>
      <div class="nsl2">
        <span>Đang hiện <b>${loc.length}</b> trên <b>${hang.length}</b> người</span>
        ${coLocNS?`<button class="btn sm" onclick="xoaLocNS()">Bỏ hết bộ lọc</button>`:""}
      </div>
    </div>`;

  /* ---- MỘT BẢNG DUY NHẤT ---- */
  h += `<div class="msp tdkh"><table class="nsb"><thead><tr>
      <th style="min-width:210px">Người</th>
      <th style="min-width:132px">Tải tuần này</th>
      <th class="num">Việc mở</th><th class="num">P1–P2</th>
      <th class="num">Đang trễ</th><th class="num">Chờ tôi trả lời</th>
      <th style="min-width:128px">Đúng hạn kỳ qua</th>
      <th class="num" style="min-width:78px">Điểm kỳ qua</th>
      <th style="min-width:64px">3 kỳ</th>
      <th style="min-width:118px">Tình trạng</th><th style="width:34px"></th>
    </tr></thead><tbody>
    ${loc.map(x => {
      const q = x.tai / SUC_TUAN, e = x.e, mo = ND_MO.has(x.id);
      const tt2 = x.tre ? ["Có việc quá hạn","r"] : q > 1 ? ["Quá tải","r"]
        : (e && e.n >= 5 && e.dungHi < muDung) ? ["Trễ nhiều hơn nhóm","a"]
        : q > 0.75 ? ["Gần đầy","a"] : ["Còn chỗ","g"];
      return `<tr id="ns-${x.id}" class="${x.tre||q>1?"gang2":""} ${mo?"ckchon":""}" onclick="togND('${x.id}')" style="cursor:pointer">
        <td class="cot"><div style="display:flex;align-items:center;gap:9px">${avHTML(x.id,28)}
          <div><b>${esc(U[x.id].ten)}</b><div style="font-size:11px;color:var(--mute)">${esc(U[x.id].cd)}</div></div></div></td>
        <td><div style="display:flex;align-items:center;gap:8px">
          <span class="mini" title="${soNgayLe(x.tai)} trên sức ${SUC_TUAN}"><i style="width:${Math.min(100,q*100)}%;background:${
            q>1?"#C62828":q>0.75?"#C79000":"#2a78d6"}"></i></span>
          <b>${soNgayLe(x.tai)}</b><span style="color:var(--mute)">/${SUC_TUAN}</span></div></td>
        <td class="num">${x.mo}</td>
        <td class="num">${x.khan||"—"}</td>
        <td class="num" style="${x.tre?"color:var(--red);font-weight:700":"color:var(--mute)"}">${x.tre||"—"}</td>
        <td class="num" style="${x.dung?"color:var(--amb);font-weight:700":"color:var(--mute)"}">${x.dung||"—"}</td>
        <td>${e && e.n ? `<div style="display:flex;align-items:center;gap:8px">
            <span class="mini"><i style="width:${e.dung*100}%;background:${
              e.dung>=0.9?"#2E7D32":e.dung>=0.75?"#C79000":"#C62828"}"></i></span>
            <b>${Math.round(e.dung*100)}%</b></div>
            <div style="font-size:10.5px;color:var(--mute)">${e.n} việc · nhóm ${Math.round(muDung*100)}%</div>`
          : `<span style="color:var(--mute)">chưa đủ dữ liệu</span>`}</td>
        <td class="num">${e && e.n ? `<b style="color:var(--navy)">${so2(e.diemTS)}</b>` : "—"}</td>
        <td>${e ? `<span class="spk">${e.xu.map(v=>`<i style="height:${Math.max(8,v*100)}%"></i>`).join("")}</span>` : "—"}</td>
        <td><span class="tag ${tt2[1]}">${tt2[0]}</span></td>
        <td style="color:var(--mute);text-align:right;font-size:14px">${mo?"⌃":"⌄"}</td>
      </tr>${mo ? `<tr class="nsbung"><td colspan="11">${chiTietNguoi(x, muDung, muCl, tau2, sig2)}</td></tr>` : ""}`;
    }).join("")}
    </tbody></table></div>
    ${!loc.length ? `<div class="flag b2" style="margin-top:12px"><span class="ic2">—</span>
      <span class="bd2">${coLocNS
        ? `Không ai khớp bộ lọc đang đặt${NS_DV!=="TAT_CA"?` trong ${esc(DV[NS_DV]?DV[NS_DV].ten:"")}`:""}.
           <button class="btn sm" style="margin-left:9px" onclick="xoaLocNS()">Bỏ hết bộ lọc</button>`
        : "Không ai trong nhánh cần chú ý lúc này."}</span></div>` : ""}
    <div class="note" style="margin-top:13px">Cột <b>Chờ tôi trả lời</b> đếm việc đang dừng đồng hồ vì có ý kiến chưa
      được trả lời — <b>đó là việc của người quản, không phải người làm chậm</b>. Vạch tải là sức một tuần,
      tạm đặt ${SUC_TUAN} điểm độ khó và phải đo lại bằng dữ liệu thật sau vài tháng.</div>`;

  if (mc) h += `<div class="gvc" style="margin-top:16px"><h3 class="gvh">Nhịp của cả nhóm
      <em>— dự báo bằng mô phỏng trên thông lượng thật, không phải phép chia</em></h3>
      <div class="kpi" style="margin-bottom:0">
        <div class="c"><div class="l">Thông lượng</div><div class="v">${so1(mc.tbTL)}</div>
          <div class="h">việc duyệt xong mỗi ngày, ${NGAY_LS} ngày gần nhất</div></div>
        <div class="c"><div class="l">Hết ${viecDoi.length} việc mở</div><div class="v">${fmtD(themNgayCong(fmtNgay(TODAY), mc.p85))}</div>
          <div class="h">85% khả năng xong trước ngày này</div></div>
        <div class="c"><div class="l">Nếu suôn sẻ</div><div class="v">${fmtD(themNgayCong(fmtNgay(TODAY), mc.p50))}</div>
          <div class="h">một nửa số lần mô phỏng xong trước ngày này</div></div>
        <div class="c"><div class="l">Người quá tải</div><div class="v" style="color:${quaTai.length?"#B02A37":"#1B5E20"}">${quaTai.length}</div>
          <div class="h">trên ${doiTai.length} người trong nhánh</div></div>
        <div class="c"><div class="l">Hàng chờ trung bình ở khâu duyệt</div><div class="v">${so1(treo)}</div>
          <div class="h">trung bình dài hạn theo định luật Little trên lịch sử duyệt —
            <b>không phải</b> số phiếu đang treo lúc này (${T.filter(t=>xemDuoc(t)&&(t.tt==="CHO_DUYET"||t.tt==="CHO_DUYET_2")).length} phiếu)</div></div>
      </div></div>`;

  h += `<div class="vd" style="margin-top:15px">Cột <b>đúng hạn</b>, <b>điểm</b> và <b>3 kỳ</b> lấy từ bộ số liệu
    mô phỏng của ba kỳ trước để xem thử hình dạng báo cáo. Bốn cột bên trái — tải, việc mở, việc trễ,
    việc chờ trả lời — lấy từ dữ liệu việc thật.</div>`;

  /* Phần phương pháp gấp lại — cần cho người bàn giao, nhưng không phải thứ
     người quản đọc mỗi ngày, nên không để nó chiếm chỗ của bảng. */
  h += `<div class="acc ${ACC_MO?"op":""}" style="margin-top:16px">
      <button onclick="togAcc()"><span class="cv3">▶</span>
        Cách đọc bảng này, và vì sao nó không xếp hạng nhân viên</button>
      <div class="bd3">
        <b>Đề bài ban đầu là "nhìn vào biết ngay ai kém". Báo cáo này cố tình không làm vậy.</b><br><br>
        <b>1. Điểm do người chấm không đủ tin cậy để xếp hạng.</b> Phân tích tổng hợp của Viswesvaran, Ones và Schmidt
        cho hệ số giữa hai người chấm là 0,52; Salgado và Moscoso tách riêng trường hợp chấm để ra quyết định nhân sự
        thì chỉ còn 0,45. Hơn một nửa chênh lệch điểm phản ánh <b>người chấm</b>, không phải người được chấm.<br><br>
        <b>2. Mẫu quá nhỏ.</b> Goldstein và Spiegelhalter phân tích bảng xếp hạng trường học và bệnh viện: khoảng hai
        phần ba số cặp so sánh không phân biệt được về thống kê. Mỗi người ở đây chỉ 5–20 việc mỗi tháng.
        Vì vậy bảng hiện <b>dải dao động</b> và chỉ gắn cờ khi dải nằm hẳn ngoài mức nhóm.<br><br>
        <b>3. Ép phân phối ở nhóm nhỏ gây sai nghiêm trọng.</b> Mô phỏng trên nhóm 7 người cho tỷ lệ xếp sai 32–53%.
        Nghiên cứu của Bond trên Management Science 2025 với ~7.000 người: ai bị loại khỏi hạng cao vì hết suất
        nghỉ việc nhiều hơn ít nhất 34% trong 18 tháng sau.<br><br>
        <b>4. Chỉ số gắn thưởng phạt sẽ bị bóp méo.</b> Luật Campbell. Wells Fargo mở hơn 1,5 triệu tài khoản khống
        để đạt chỉ tiêu, sa thải ~5.300 người rồi bỏ hẳn chỉ tiêu doanh số.<br><br>
        <b>5. Phần mềm quản lý công việc hàng đầu không có báo cáo này.</b> Jira, Linear, Asana, Monday, ClickUp
        đều không có chỉ số năng suất cấp cá nhân. Swarmia và Jellyfish từ chối công khai kèm lý do.
        Lattice và Culture Amp có ma trận chín ô nhưng chỉ mở cho quản trị viên và chỉ sau khi đã hiệu chỉnh chéo.<br><br>
        <b>Bảng này làm thay:</b> tách rõ số <span class="src do">Đo được</span> với
        <span class="src yk">Ý kiến người duyệt</span>, hiện dải dao động, đòi tín hiệu lặp lại trước khi báo động,
        gắn cờ tình huống thay vì dán nhãn người, và <b>đo cả người duyệt</b> — vì nút thắt thường ở khâu duyệt.<br><br>
        <b>Về ngưỡng nút thắt:</b> lý thuyết hàng đợi có công thức Kingman với ngưỡng mức sử dụng 0,8, nhưng nó
        không hợp với người duyệt — duyệt phiếu chỉ chiếm vài phần trăm ngày làm việc của CFO nên mức sử dụng luôn thấp,
        dù phiếu vẫn nằm chờ hơn ba ngày. Nút thắt ở đây là <b>sự chú ý</b>, không phải <b>công suất</b>.
        Vì vậy ngưỡng dùng thực tế là: phiếu nằm chờ quá một ngày công.
      </div>
    </div>`;
  return h;
}

/* ---------- 5. GIAO VIỆC ---------- */
let FRM = null;
function newFrm(nhom){
  return {nhom: nhom || null, ttl:"", lam:"", duyet:"", phoihop:[], theodoi:[],
    bd:"04/09/2026", han:"", sp:"", md:"", dk:3, tc:["",""], buoc:[],
    ah:3, kc:3, mat:"NOI_BO", bc:false, luat:false, tien:"", tienLoai:"CHI",
    cha:"", truoc:[], lap:"THANG", ngayKy:"5", batDauKy:"09/2026",
    phatSinh:"04/09/2026", nguon:"", mo:false, duyetMo:false, ltc:null, mauId:null,
    dvR:"", dvA:"", dvC:"", dvI:""};
}
const N4 = {
  CONG_VIEC:["✓","Công việc","Việc có đầu có cuối, làm một lần, không thuộc dự án nào"],
  DU_AN:    ["▤","Dự án","Việc lớn chia thành nhiều việc con, có ràng buộc trước sau, tính đường găng"],
  CHU_KY:   ["↻","Chu kỳ","Lặp lại theo lịch. Khai báo tần suất một lần, hệ thống tự sinh từng kỳ"],
  DOT_XUAT: ["!","Đột xuất","Phát sinh ngoài kế hoạch. Ghi nguồn phát sinh để biết gốc rễ vấn đề"],
};

/* ---------- danh sách xổ theo phòng ban ---------- */
/* danh sách đơn vị có người, xếp từ trên xuống */
function dsDonVi(loc){
  const out = [];
  Object.entries(DV).forEach(([ma, d]) => {
    const n = Object.values(U).filter(u => u.dv === ma && (!loc || loc(u.id))).length;
    if (n) out.push({ma, ten:d.ten, n});
  });
  return out;
}
function nguoiTrongDV(ma, loc){
  return Object.values(U).filter(u => u.dv === ma && (!loc || loc(u.id)));
}
/* hai ô xổ: chọn phòng ban trước, danh sách người phụ thuộc vào phòng đã chọn */
function selCap(dvHienTai, nguoiHienTai, onDV, onNguoi, loc, hienTai, rongNguoi){
  const ds = dsDonVi(loc);
  const tong = ds.reduce((a2,d)=>a2+d.n, 0);
  const tatCa = dvHienTai === "*";
  const nhan = u => `${esc(u.ten)} — ${esc(u.cd)}${hienTai?` (${soViecMo(u.id)} việc mở)`:""}`;
  const oNguoi = tatCa
    ? Object.entries(nhomTheoDonVi(loc)).map(([dv,us])=>`<optgroup label="${esc(dv)}">
        ${us.map(u=>`<option value="${u.id}" ${nguoiHienTai===u.id?"selected":""}>${nhan(u)}</option>`).join("")}</optgroup>`).join("")
    : dvHienTai ? nguoiTrongDV(dvHienTai, loc).map(u=>`<option value="${u.id}" ${nguoiHienTai===u.id?"selected":""}>${nhan(u)}</option>`).join("") : "";
  return `<div class="two" style="gap:10px">
    <select class="inp" onchange="${onDV}">
      <option value="">— Chọn phòng ban —</option>
      <option value="*" ${tatCa?"selected":""}>Tất cả phòng ban (${tong} người)</option>
      ${ds.map(d=>`<option value="${d.ma}" ${dvHienTai===d.ma?"selected":""}>${esc(d.ten)} (${d.n} người)</option>`).join("")}
    </select>
    <select class="inp" ${dvHienTai?"":"disabled"} onchange="${onNguoi}">
      <option value="">${dvHienTai ? rongNguoi : "— Chọn phòng ban trước —"}</option>
      ${oNguoi}
    </select>
  </div>`;
}

function nhomTheoDonVi(loc){
  const g = {};
  Object.values(U).forEach(u => {
    if (loc && !loc(u.id)) return;
    const ten = (DV[u.dv] && DV[u.dv].ten) || u.dv;
    (g[ten] = g[ten] || []).push(u);
  });
  return g;
}
function chipsNguoi(ds, fn){
  if (!ds.length) return `<div style="font-size:12.5px;color:var(--mute);margin-top:6px">Chưa chọn ai</div>`;
  return `<div class="chips">${ds.map(id=>`<span class="cp">${avHTML(id,20)}${esc(U[id].ten)}
    <button onclick="${fn}('${id}')" title="Bỏ">✕</button></span>`).join("")}</div>`;
}

/* Sổ việc lặp nằm ở đây chứ không phải một ô lọc, vì một quy tắc lặp KHÔNG PHẢI
   là một việc: nó là bộ sinh, đẻ ra nhiều kỳ, mỗi kỳ mới là một việc.
   Trước đây một dòng vừa mang số liệu của quy tắc (số kỳ đã chạy, đúng hạn qua các kỳ)
   vừa mang số liệu của một kỳ (trạng thái, phần trăm) — hai đối tượng nhét vào một dòng,
   nên bộ máy tự sinh kỳ mới không có chỗ để sống. Đặt cạnh Giao việc là đúng chỗ:
   lập một quy tắc lặp chính là giao một việc thường trực. */
let GTAB = "moi";
function setGTab(k){ GTAB = k; draw(); }
/* =====================================================================
   BIỂU MẪU GIAO VIỆC — một hàm dựng, hai chỗ dùng

   Bản trước là một cột hẹp dài 2.500px với tám mục đánh số và nhãn viết hoa,
   đọc như tờ khai hành chính: nửa màn hình bên phải bỏ trống trong khi người
   dùng phải cuộn ba màn mới tới nút Giao việc. Khối RACI chiếm bốn hàng và tám
   ô chọn, trong đó ba hàng là tuỳ chọn.

   Nay chia hai cột theo đúng hai câu hỏi khác nhau:
     · trái  — VIỆC NÀY LÀ GÌ   (tiêu đề, sản phẩm, tiêu chí nghiệm thu)
     · phải  — AI LÀM, BAO GIỜ  (người thực hiện, người duyệt, thời gian, độ khó, ưu tiên)
   Người phối hợp, người theo dõi và các ô ít dùng nằm trong hai mục thu gọn.
   Nút hành động dính đáy màn hình, không phải cuộn đi tìm.

   Cùng hàm này dựng cả trang Giao việc lẫn ngăn trượt bên phải khi tạo việc
   trong dự án — ngan=true thì xếp một cột cho vừa bề ngang 720px.
   ===================================================================== */
/* Danh sách ô bắt buộc — ĐỊNH NGHĨA DUY NHẤT.
   Chân biểu mẫu và hàm taoViec() đều gọi qua đây. Trước đây hai chỗ có hai danh sách
   khác nhau: chân trang báo "Đã đủ ô bắt buộc" trong khi bấm Giao việc lại bị chặn vì
   thiếu sản phẩm cần nộp — người dùng bấm nút mà không có gì xảy ra. */
function oBatBuoc(f){
  const thieu = [];
  if (!f.nhom)             thieu.push("nhóm việc");
  if (!f.ttl.trim())       thieu.push("tiêu đề");
  if (!coQuyen(me,"giao_viec") || !capDuoi().length) f.lam = me;   /* chỉ tự tạo cho mình */
  if (!f.lam)              thieu.push("người thực hiện");
  if (!f.sp.trim())        thieu.push("sản phẩm cần nộp");
  if (!f.tc.filter(x=>x.trim()).length) thieu.push("tiêu chí nghiệm thu");
  if (f.nhom === "DOT_XUAT" && !f.nguon) thieu.push("nguồn phát sinh");
  else if (f.nhom !== "CHU_KY" && !f.han) thieu.push("hạn hoàn thành");
  return thieu;
}

function khoiMau(f){
  const mau = MAU.filter(m => (m.loai||"CHU_KY") === f.nhom);
  const iCu = f.mauId ? MAU.findIndex(m => m.id === f.mauId) : -1;
  const mCu = iCu >= 0 ? MAU[iCu] : null;
  return `<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <select class="inp" style="flex:1;min-width:210px" onchange="if(this.value!=='')useMau(+this.value);else boMau()">
        <option value="">— Không dùng mẫu, nhập tay —</option>
        ${mau.map(m => { const i = MAU.indexOf(m), l = lopThamChieu(m.id);
          return `<option value="${i}" ${f.mauId===m.id?"selected":""}>${esc(m.n)}${l?` — ${l.n} lần, trung vị ${soNgayLe(l.tv)} ngày`:""}</option>`;}).join("")}
      </select>
      ${mCu && suaMauDuoc(mCu) ? `<button class="btn sm" onclick="moMau(${iCu})">Sửa</button>` : ""}
      <button class="btn sm" onclick="moMau(-1)">+ Mẫu mới</button>
    </div>
    ${mCu ? (()=>{ const l = lopThamChieu(mCu.id);
      return `<div class="note" style="margin-top:9px">${
        l ? `Lịch sử <b>${l.n} lần</b>: nhanh nhất ${soNgayLe(l.min)} ngày, trung vị <b>${soNgayLe(l.tv)}</b>,
             80% dưới <b>${soNgayLe(l.p80)}</b>, chậm nhất ${soNgayLe(l.max)}.`
          : `Chưa đủ lịch sử để dự báo hạn.`}</div>`; })() : ""}`;
}

function formGiao(f, ngan){
  const duAn = f.cha ? find(duAnCua(find(f.cha)) || "") : null;
  const thieu = oBatBuoc(f);

  const traiA = `<div class="gvc">
      <h3 class="gvh">Việc này là gì <em>— ba ô quyết định người làm hiểu đúng hay sai</em></h3>
      <div class="fld"><label>Tiêu đề<span class="req">*</span>
        <span class="hint">— ${f.nhom==="CHU_KY"?"gọi tên loại việc lặp, không ghi tháng cụ thể":"bắt đầu bằng động từ"}</span></label>
        <input class="inp" id="f_ttl" value="${esc(f.ttl)}" oninput="FRM.ttl=this.value"
          placeholder="${f.nhom==="CHU_KY"?"Ví dụ: Đối soát công nợ phải trả":f.nhom==="DOT_XUAT"?"Ví dụ: Giải trình chênh lệch theo công văn thuế":"Ví dụ: Rà soát hợp đồng thuê kho"}"></div>
      <div class="fld"><label>Sản phẩm cần nộp <span class="hint">— nộp cái gì thì gọi là xong</span></label>
        <input class="inp" value="${esc(f.sp)}" oninput="FRM.sp=this.value" placeholder="Ví dụ: Bảng đối soát đã ký xác nhận"></div>
      <div class="fld" style="margin-bottom:0"><label>Tiêu chí nghiệm thu<span class="req">*</span>
        <span class="hint">— người làm tự tích, người duyệt đối chiếu</span></label>
        ${f.tc.map((c,i)=>`<div class="crit">
          <input class="inp" value="${esc(c)}" oninput="FRM.tc[${i}]=this.value" placeholder="Tiêu chí ${i+1}">
          <button class="rm" onclick="FRM.tc.splice(${i},1);draw()">✕</button></div>`).join("")}
        <button class="btn sm" onclick="FRM.tc.push('');draw()">+ Thêm tiêu chí</button></div>
    </div>`;

  const phaiA = `<div class="gvc">
      <h3 class="gvh">Ai làm, bao giờ</h3>
      ${raciFrm(f)}
      ${khoiThoiGian(f)}
      <div class="fld"><label>Độ khó <span class="hint">— quy đổi khối lượng khi tính điểm</span></label>
        <div class="pick">${[1,2,3,5,8].map(v=>`<button class="${f.dk===v?"on":""}" onclick="FRM.dk=${v};draw()">${v}</button>`).join("")}</div></div>
      ${khoiUuTien(f)}
      ${khoiRieng(f)}
    </div>`;

  const duoi = `<div class="gvc">
      ${f.mo ? khoiThem(f) : `<button class="more" style="margin:0" onclick="FRM.mo=true;draw()">+ Thêm tuỳ chọn
        <span style="font-weight:400;color:var(--mute)">— mục đích, giá trị tiền, các bước thực hiện, bằng chứng, mức bảo mật</span></button>`}
    </div>`;

  const than = ngan
    ? traiA + phaiA + duoi
    : `<div class="gv"><div>${traiA}${duoi}</div><div>${phaiA}</div></div>`;

  const _bc = bangChungCho(f.ttl, f.sp);
  return (_bc && !f.bc ? `<div class="warn" style="margin:0 0 13px">
      <b>Nghiệp vụ “${esc(_bc.viec)}” ${_bc.bat?"bắt buộc":"nên"} kèm bằng chứng:</b> ${esc(_bc.bc)}.
      <button class="btn sm" style="margin-left:9px" onclick="apBangChung()">Bật yêu cầu này</button>
    </div>` : "")
    + (duAn ? `<div class="note" style="margin:0 0 13px">Việc mới sẽ nằm trong dự án
      <b>${esc(duAn.ttl)}</b>${f.cha!==duAn.id?`, là việc con của <b>${esc(find(f.cha).ttl)}</b>`:""}.</div>` : "")
    + than
    + `<div class="gvf">
        <button class="btn p" onclick="taoViec()" ${thieu.length?'style="opacity:.5"':""}>Giao việc</button>
        <button class="btn" onclick="luuThanhMau()">Lưu thành mẫu</button>
        <button class="btn" onclick="FRM=newFrm(FRM.nhom);draw()">Xoá hết</button>
        <span style="font-size:12.5px;color:${thieu.length?"var(--terra)":"#1B5E20"};margin-left:auto">
          ${thieu.length?`Còn thiếu: ${thieu.join(" · ")}`:"Đã đủ ô bắt buộc"}</span>
      </div>`;
}

/* ---------- ngăn trượt bên phải, dùng khi tạo việc từ trong dự án ---------- */
let NGAN_GIAO = false;
function moNganGiao(chaId){
  const cha = chaId ? find(chaId) : null;
  FRM = newFrm("DU_AN");
  if (cha){
    FRM.cha = chaId;
    const goc = (cha.mucdich || "").replace(/^Kế thừa từ việc cha:\s*/, "");
    FRM.md  = goc ? `Kế thừa từ việc cha: ${goc}` : "";
    FRM.mat = cha.mat || "NOI_BO";
  }
  NGAN_GIAO = true;
  veNganGiao();
  $("#ngw").classList.add("on"); $("#scrim2").classList.add("on");
}
function dongNganGiao(){
  NGAN_GIAO = false;
  $("#ngw").classList.remove("on"); $("#scrim2").classList.remove("on");
  draw();
}
function veNganGiao(){
  const f = FRM; if (!f) return;
  const cha = f.cha ? find(f.cha) : null;
  $("#ngH").innerHTML = `<div style="flex:1;min-width:0">
      <div style="font-size:11px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:var(--mute)">Thêm việc vào dự án</div>
      <b style="font-size:16px">${cha?esc(cha.ttl):"Việc mới"}</b></div>
    <button class="x" onclick="dongNganGiao()">✕</button>`;
  $("#ngB").innerHTML = formGiao(f, true);
  $("#ngF").innerHTML = "";
}

/* Cửa sổ Việc lặp — bộ sinh việc, đứng riêng đúng như dự án và công việc thường. */
function vSoLap(){
  return `<h1 class="h1">Việc lặp</h1>
    <p class="sub">Quy tắc lặp là <b>việc thường trực</b> — lập một lần, hệ thống sinh ra kỳ mới theo lịch.
    Cửa sổ này quản các <b>quy tắc</b>; từng kỳ sinh ra là một việc bình thường, nằm trong <b>Theo dõi</b>
    và lọc được bằng ô nguồn gốc <i>Chu kỳ sinh ra</i>.
    Muốn lập một quy tắc mới thì bấm <b>Việc lặp</b> ở hàng nút tạo việc trong <b>Việc của tôi</b>.</p>`
    + soViecLap();
}
function vGiao(){
  if (!FRM) FRM = newFrm();
  const f = FRM;
  let h = "";

  /* Nhóm việc và mẫu gộp thành một hàng công cụ, không còn bốn thẻ lớn chiếm 170px.
     Mô tả từng nhóm chuyển thành chú giải khi rê chuột và một dòng ngay dưới. */
  h += `<div class="gvc" style="margin-bottom:15px">
      <h3 class="gvh">Nhóm việc <em>— mỗi nhóm một biểu mẫu riêng, chỉ hỏi đúng thứ nhóm đó cần</em></h3>
      <div class="sgv">${Object.entries(N4).map(([k,[ic,ten,mo]])=>
        `<button class="${f.nhom===k?"on":""}" onclick="doiNhomViec('${k}')" title="${esc(mo)}">
          <span>${ic}</span>${ten}</button>`).join("")}</div>
      ${f.nhom?`<div style="font-size:12.5px;color:var(--mute);margin-top:9px">${esc(N4[f.nhom][2])}</div>
      <div style="border-top:1px solid var(--line);margin:13px 0 12px"></div>
      <h3 class="gvh" style="margin-bottom:9px">Mẫu có sẵn <em>— chọn mẫu thì tiêu đề, sản phẩm, tiêu chí, độ khó và hạn tự điền</em></h3>
      ${khoiMau(f)}`:""}
    </div>`;
  if (!f.nhom) return h + `<div class="card empty"><div class="ic">↑</div>
    Chọn một nhóm việc ở trên để hiện biểu mẫu tương ứng.</div>`;
  return h + formGiao(f, false);
}
function doiNhomViec(k){
  const cu = FRM && FRM.nhom;
  FRM = newFrm(k);
  if (k === "DOT_XUAT"){ FRM.ah = 4; FRM.kc = 5; }
  draw();
  if (cu && cu !== k) toast(`Đã đổi sang biểu mẫu ${LOAI_TEN[k].toLowerCase()} — các ô riêng của nhóm cũ đã bỏ`);
}

/* ---------- khối 3: thời gian, khác nhau theo nhóm ---------- */
function khoiThoiGian(f){
  if (f.nhom === "CHU_KY") return `
    <div class="fld"><label>Lịch lặp <span class="hint">— khai báo một lần, hệ thống tự sinh từng kỳ</span></label>
      <div class="two">
        <div><div style="font-size:12px;color:var(--mute);margin-bottom:5px">Tần suất</div>
          <select class="inp" onchange="FRM.lap=this.value;draw()">
            ${Object.entries(LAP_TEN).map(([k,n])=>`<option value="${k}" ${f.lap===k?"selected":""}>${n}</option>`).join("")}</select></div>
        <div><div style="font-size:12px;color:var(--mute);margin-bottom:5px">
          ${f.lap==="TUAN"?"Thứ mấy trong tuần":f.lap==="NGAY"?"Giờ hạn trong ngày":"Ngày mấy trong kỳ"}</div>
          ${f.lap==="TUAN"
            ? `<select class="inp" onchange="FRM.ngayKy=this.value;draw()">
                ${["Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy"].map((n,i)=>`<option value="${i+2}" ${f.ngayKy==String(i+2)?"selected":""}>${n}</option>`).join("")}</select>`
            : f.lap==="NGAY"
            ? `<select class="inp" onchange="FRM.ngayKy=this.value;draw()">
                ${["10:00","12:00","15:00","17:00","cuối ngày"].map(n=>`<option ${f.ngayKy===n?"selected":""}>${n}</option>`).join("")}</select>`
            : `<select class="inp" onchange="FRM.ngayKy=this.value;draw()">
                ${[1,3,5,10,15,20,25,"cuối kỳ"].map(n=>`<option ${f.ngayKy==n?"selected":""}>${n}</option>`).join("")}</select>`}
        </div>
      </div>
      <div class="note" style="margin-top:9px"><b>Kỳ đầu tiên:</b> ${moTaLap(f)}.
        Không có ô ngày bắt đầu và hạn riêng lẻ — mỗi kỳ hệ thống tự đặt hạn theo lịch trên.</div>
      <div class="note" style="margin-top:8px;background:#FFF8E6;border-color:#EBD9A0;border-left-color:var(--amb)">
        Bộ máy sinh kỳ đã có ở <b>Sổ việc lặp</b>, chạy bằng nút bấm thay cho lịch nền. Giao ở đây sẽ tạo một kỳ đơn lẻ để xem thử. Phân hệ đầy đủ ước 40–60 giờ công.</div>
    </div>`;
  if (f.nhom === "DOT_XUAT") return `
    <div class="fld"><label>Thời gian <span class="hint">— việc đột xuất tính từ lúc phát sinh, không phải lúc giao</span></label>
      <div class="two">
        <div><div style="font-size:12px;color:var(--mute);margin-bottom:5px">Ngày phát sinh</div>
          <input class="inp" value="${esc(f.phatSinh)}" oninput="FRM.phatSinh=this.value" placeholder="dd/mm/yyyy"></div>
        <div><div style="font-size:12px;color:var(--mute);margin-bottom:5px">Hạn xử lý</div>
          <input class="inp" id="f_han" value="${esc(f.han)}" oninput="FRM.han=this.value" placeholder="dd/mm/yyyy"></div>
      </div>
      <div class="fld" style="margin:12px 0 0"><label style="text-transform:none;letter-spacing:0;font-size:12px;color:var(--mute)">Nguồn phát sinh — để sau này thống kê gốc rễ</label>
        <select class="inp" onchange="FRM.nguon=this.value;draw()">
          <option value="">— Chọn nguồn —</option>
          ${NGUON_DX.map(n=>`<option ${f.nguon===n.ten?"selected":""} title="${esc(n.gt)}">${esc(n.ten)}</option>`).join("")}</select></div>
    </div>`;
  return `
    <div class="two">
      <div class="fld"><label>Ngày bắt đầu</label>
        <input class="inp" value="${esc(f.bd)}" oninput="FRM.bd=this.value"></div>
      <div class="fld"><label>Hạn hoàn thành<span class="req">*</span></label>
        <input class="inp" id="f_han" value="${esc(f.han)}" oninput="FRM.han=this.value" placeholder="dd/mm/yyyy">
        ${f.luat?`<div style="margin-top:6px"><span class="tag law">Hạn pháp lý — không được dời</span></div>`:""}
        ${f.ltc?`<div class="note" style="margin-top:8px;font-size:12.5px">
          <b>Căn cứ ${f.ltc.n} lần làm thật trước đó</b>: nhanh nhất ${soNgayLe(f.ltc.min)} ngày,
          trung vị <b>${soNgayLe(f.ltc.tv)}</b>, 80% dưới <b>${soNgayLe(f.ltc.p80)}</b>.
          Hạn lấy theo phân vị 80 — người tự ước lượng luôn lạc quan hơn thực tế.</div>`:""}</div>
    </div>`;
}
function moTaLap(f){
  if (f.lap === "NGAY")  return `mỗi ngày làm việc, hạn ${f.ngayKy}`;
  if (f.lap === "TUAN")  return `mỗi tuần, hạn vào ${["","","Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy"][Number(f.ngayKy)]||"Thứ Hai"}`;
  if (f.lap === "QUY")   return `mỗi quý, hạn ngày ${f.ngayKy} của tháng đầu quý`;
  return `mỗi tháng, hạn ngày ${f.ngayKy}`;
}

/* ---------- khối ưu tiên: chu kỳ không cần ---------- */
function khoiUuTien(f){
  if (f.nhom === "CHU_KY") return `<div class="note" style="margin-bottom:15px">
    <b>Việc chu kỳ không đặt độ ưu tiên tay.</b> Ưu tiên suy từ lịch: càng gần hạn của kỳ càng lên cao.
    Đặt tay sẽ khiến mọi kỳ đều "rất cao" và mất ý nghĩa.</div>`;
  const d = (f.ah||3)*(f.kc||3), m = mucUuTien(d), v = UT[m];
  return `<div class="fld"><label>Độ ưu tiên <span class="hint">— hai ô, hệ thống tự ra mức P1 đến P4</span></label>
    <div class="two">
      <div><div style="font-size:12px;color:var(--mute);margin-bottom:5px">Ảnh hưởng nếu làm sai hoặc không làm</div>
        <select class="inp" onchange="FRM.ah=+this.value;draw()">
          ${[5,4,3,2,1].map(v2=>`<option value="${v2}" ${f.ah===v2?"selected":""}>${v2} · ${AH[v2]}</option>`).join("")}</select></div>
      <div><div style="font-size:12px;color:var(--mute);margin-bottom:5px">Mức khẩn cấp</div>
        <select class="inp" onchange="FRM.kc=+this.value;draw()">
          ${[5,4,3,2,1].map(v2=>`<option value="${v2}" ${f.kc===v2?"selected":""}>${v2} · ${KC[v2]}</option>`).join("")}</select></div>
    </div>
    <div class="note" style="margin-top:9px"><b>${v[0]} · ${v[1]}</b> — ${f.ah} × ${f.kc} = ${d} điểm.
      ${f.nhom==="DOT_XUAT"?"Việc đột xuất mặc định khẩn cấp cao, sửa lại nếu không phải vậy.":"Việc con chặn việc cha, hoặc còn dưới 20% thời gian, thì hệ thống tự nâng thêm một bậc."}</div></div>`;
}

/* ---------- khối riêng của từng nhóm ---------- */
/* Việc cha hợp lệ: mọi việc trong cây dự án TRỪ việc cấp 4.
   Cấp 4 là đơn vị nguyên tử — người thực hiện là nhân viên thì không giao xuống tiếp được. */
function chaHopLe(){
  const out = [];
  T.filter(t => !t.cha && (t.loai === "DU_AN") && xemDuoc(t)).forEach(g => {
    (function di(x, sau){
      if (capViec(x.lam) < 4) out.push({t:x, sau});
      conCua(x.id).sort((a2,b2)=>parse(a2.bd)-parse(b2.bd)).forEach(c => di(c, sau+1));
    })(g, 0);
  });
  return out;
}
/* Mở thẳng biểu mẫu tạo việc con, kế thừa mục đích và mức bảo mật từ việc cha. */
function themViecCon(chaId){
  const cha = find(chaId); if (!cha) return;
  FRM = newFrm("DU_AN");
  FRM.cha = chaId;
  const goc = (cha.mucdich || "").replace(/^Kế thừa từ việc cha:\s*/, "");
  FRM.md  = goc ? `Kế thừa từ việc cha: ${goc}` : "";
  FRM.mat = cha.mat || "NOI_BO";
  FRM.mo  = true;
  TAB = "giao"; CUR = null;
  $("#dw").classList.remove("on"); $("#scrim").classList.remove("on");
  draw();
  toast(`Đang tạo việc con của “${cha.ttl}” — mục đích và mức bảo mật kế thừa từ việc cha`);
}

function khoiRieng(f){
  if (f.nhom !== "DU_AN") return "";
  const da = chaHopLe();
  const cha = f.cha ? find(f.cha) : null;
  const duAn = f.cha ? find(duAnCua(cha) || "") : null;
  const anhEm = f.cha ? caCay(chaGoc(f.cha)).filter(x=>x.id!==f.cha && !conCua(x.id).length) : [];
  /* Ngăn trượt đã có dòng ngữ cảnh ở đầu biểu mẫu, không lặp lại ở đây nữa. */
  return (duAn && !NGAN_GIAO ? `<div class="note" style="margin:0 0 13px;display:flex;gap:12px;align-items:center;flex-wrap:wrap">
      <span style="flex:1;min-width:220px">Đang tạo việc trong dự án <b>${esc(duAn.ttl)}</b>.
        Lưu xong sẽ quay lại đúng cửa sổ dự án đó.</span>
      <button class="btn sm" onclick="TAB='da';DA_MO='${duAn.id}';DA_TAB='cv';draw()">← Về dự án</button>
    </div>` : "")
    + `<div class="fld"><label>Vị trí trong dự án <span class="hint">— để hệ thống tính đường găng</span></label>
    <div style="font-size:12px;color:var(--mute);margin-bottom:5px">Nằm dưới việc nào — chọn để tạo việc con</div>
    <select class="inp" onchange="FRM.cha=this.value;FRM.truoc=[];draw()">
      <option value="">— Tạo dự án mới ở cấp trên cùng —</option>
      ${da.map(({t:x,sau})=>`<option value="${x.id}" ${f.cha===x.id?"selected":""}>${"　".repeat(sau)}${sau?"└ ":""}${esc(x.ttl)} · ${CAP_TEN[capViec(x.lam)]}</option>`).join("")}</select>
    ${cha?`<div class="note" style="margin-top:8px">Việc mới sẽ là <b>việc con của “${esc(cha.ttl)}”</b>.
      Mục đích và mức bảo mật đã kế thừa từ việc cha.
      <b>${esc(U[cha.lam].ten)} vẫn chịu trách nhiệm về kết quả này</b> trước
      ${(()=>{const d=nguoiDuyet(cha);return d&&U[d]?esc(U[d].ten):"cấp trên";})()} — giao xuống không chuyển được trách nhiệm.</div>`:""}
    ${f.cha ? `<div style="font-size:12px;color:var(--mute);margin:12px 0 5px">Việc phải xong trước — chỉ quan hệ xong A mới bắt đầu B</div>
      <select class="inp" onchange="if(this.value)togTruoc(this.value);this.value=''">
        <option value="">— Thêm một việc phải xong trước —</option>
        ${anhEm.filter(x=>!f.truoc.includes(x.id)).map(x=>`<option value="${x.id}">${esc(x.ttl)}</option>`).join("")}</select>
      ${chipsNguoiViec(f.truoc)}` : ""}</div>`;
}
function chaGoc(id){ let x = find(id), v = 0; while (x && x.cha && v++ < 12) x = find(x.cha); return x ? x.id : id; }
function chipsNguoiViec(ds){
  if (!ds.length) return `<div style="font-size:12.5px;color:var(--mute);margin-top:6px">Không chờ việc nào — bắt đầu được ngay</div>`;
  return `<div class="chips">${ds.map(id=>{ const t=find(id);
    return `<span class="cp">${esc(t?t.ttl:id)}<button onclick="togTruoc('${id}')">✕</button></span>`;}).join("")}</div>`;
}

/* ---------- khối thêm tuỳ chọn, chung cho mọi nhóm ---------- */
function khoiThem(f){
  return `<div style="border-top:1px dashed var(--line);margin:16px 0 14px"></div>
    <div class="fld"><label>Mục đích <span class="hint">— vì sao cần làm, gắn với KPI nào</span></label>
      <textarea class="inp" oninput="FRM.md=this.value" placeholder="Ví dụ: KPI phòng: kê khai và nộp thuế đúng hạn 100%">${esc(f.md)}</textarea></div>

    <div class="fld"><label>Các bước thực hiện <span class="hint">— gợi ý cách làm, không tính vào tiến độ</span></label>
      ${f.buoc.map((c,i)=>`<div class="crit">
        <input class="inp" value="${esc(c)}" oninput="FRM.buoc[${i}]=this.value" placeholder="Bước ${i+1}">
        <button class="rm" onclick="FRM.buoc.splice(${i},1);draw()">✕</button></div>`).join("")}
      <button class="btn sm" onclick="FRM.buoc.push('');draw()">+ Thêm bước</button></div>

    <div class="fld"><label>Giá trị liên quan <span class="hint">— để trống nếu việc không gắn với tiền</span></label>
      <input class="inp" value="${esc(f.tien)}" oninput="FRM.tien=this.value" placeholder="Ví dụ: 1850000000">
      <div class="pick" style="margin-top:8px">
        <button class="${f.tienLoai!=="THU"?"on":""}" onclick="FRM.tienLoai='CHI';draw()">Khoản chi ra</button>
        <button class="${f.tienLoai==="THU"?"on":""}" onclick="FRM.tienLoai='THU';draw()">Khoản thu vào</button></div>
      ${(()=>{ const gia={tien:Number(String(f.tien).replace(/\D/g,""))||0, tienLoai:f.tienLoai||"CHI", lam:f.lam, giao:me, duyet:f.duyet||null};
        if(!gia.tien) return ""; const c=chuoiDuyetThem(gia);
        if(gia.tienLoai!=="CHI") return `<div class="note" style="margin-top:8px">Khoản thu <b>không kích hoạt</b> tầng duyệt thêm.</div>`;
        return c.length ? `<div class="note" style="margin-top:8px"><b>Khoản chi ${tienTxt(gia.tien)}</b> vượt
            ${bacDat(gia).map(b=>tienTxt(b.tu)).join(" và ")} — sau khi duyệt còn qua ${c.map((x,i)=>`<b>tầng ${i+2}: ${esc(U[x].ten)}</b>`).join(", rồi ")}.</div>`
          : `<div class="note" style="margin-top:8px">Dưới ${tienTxt(BAC_DUYET[0].tu)} — không cần thêm tầng duyệt.</div>`;})()}
      <div style="font-size:12px;color:var(--mute);margin-top:6px">Ba bậc: trên ${tienTxt(BAC_DUYET[0].tu)} thêm CFO · trên ${tienTxt(BAC_DUYET[1].tu)} thêm Tổng Giám đốc · trên ${tienTxt(BAC_DUYET[2].tu)} thêm Chủ tịch HĐQT.</div></div>

    <div class="two">
      <div class="fld"><label>Bằng chứng khi nộp</label>
        <select class="inp" onchange="FRM.bc=this.value==='1';draw()">
          <option value="0" ${!f.bc?"selected":""}>Không bắt buộc</option>
          <option value="1" ${f.bc?"selected":""}>Bắt buộc đính kèm tệp</option></select></div>
      <div class="fld"><label>Mức bảo mật</label>
        <select class="inp" onchange="FRM.mat=this.value;draw()">
          ${Object.entries(MAT_TEN).map(([k,n])=>`<option value="${k}" ${f.mat===k?"selected":""}>${n}</option>`).join("")}</select></div>
    </div>
    ${f.mat==="HAN_CHE"?`<div class="note"><b>Mức Hạn chế:</b> chỉ người giao, người thực hiện, người duyệt và người phối hợp nhìn thấy. Mọi lượt mở việc vào nhật ký.</div>`:""}
    ${f.nhom!=="CHU_KY"?`<div class="fld"><label>Loại hạn</label>
      <select class="inp" onchange="FRM.luat=this.value==='1';draw()">
        <option value="0" ${!f.luat?"selected":""}>Hạn nội bộ — dời được</option>
        <option value="1" ${f.luat?"selected":""}>Hạn pháp lý — khoá, không dời</option></select>
      ${f.luat?`<div class="note law" style="margin-top:8px">Hạn pháp lý <b>khoá nút dời hạn</b> và nhắc trước 5 ngày làm việc thay vì 2.</div>`:""}</div>`:""}`;
}

function togPH(id){ const i=FRM.phoihop.indexOf(id); i<0?FRM.phoihop.push(id):FRM.phoihop.splice(i,1); draw(); }
function togTruoc(id){ const i=FRM.truoc.indexOf(id); i<0?FRM.truoc.push(id):FRM.truoc.splice(i,1); draw(); }
function togTD(id){ const i=FRM.theodoi.indexOf(id); i<0?FRM.theodoi.push(id):FRM.theodoi.splice(i,1); draw(); }

/* ---------- bảng phân vai RACI bằng danh sách xổ ---------- */
function raciFrm(f){
  const gia = { lam:f.lam, giao:me, duyet:f.duyet||null, phoihop:f.phoihop, theodoi:f.theodoi,
                tien:Number(String(f.tien).replace(/\D/g,""))||0, tienLoai:f.tienLoai||"CHI", cha:null };
  const r = f.lam ? raci(gia) : {R:[],A:[],C:[],I:[]};
  const macDinh = f.lam ? truongTrucTiep(f.lam) : null;
  const chuaChon = id => id!==f.lam && id!==(f.duyet||macDinh) && !f.phoihop.includes(id) && !f.theodoi.includes(id);

  return `<div class="rc4">
    <div class="rw">
      <div class="lb2"><b>R</b><span>Người thực hiện<i>bắt buộc, đúng 1</i></span></div>
      <div>${coQuyen(me,"giao_viec") && capDuoi().length
        ? selCap(f.dvR, f.lam,
            "FRM.dvR=this.value;FRM.lam='';FRM.duyet='';draw()",
            "FRM.lam=this.value;FRM.duyet='';draw()", null, true, "— Chọn người —")
        : `<div class="khoaR">${avHTML(me,30)}<div><b>${esc(U[me].ten)}</b><span>${esc(U[me].cd)}</span></div>
             <span class="tag m">khoá</span></div>
           <div class="note" style="margin:9px 0 0">Bạn đang <b>tự tạo việc cho chính mình</b>.
             Người nghiệm thu vẫn là <b>${esc(U[truongTrucTiep(me)]?U[truongTrucTiep(me)].ten:"trưởng đơn vị")}</b> —
             tự khai việc không có nghĩa là tự chấm điểm mình. Việc này chạy vào báo cáo mọi cấp như việc được giao xuống.</div>`}
        ${f.lam && soViecMo(f.lam) >= WIP_TRAN ? `<div class="warn" style="margin-top:8px">
          <b>${esc(U[f.lam].ten)} đang mở ${soViecMo(f.lam)} việc</b>, ngưỡng mềm ${WIP_TRAN}.
          Vẫn giao được — hệ thống chỉ cảnh báo, vì ngưỡng này là số tạm đặt.</div>`:""}</div>
    </div>

    <div class="rw">
      <div class="lb2"><b>A</b><span>Người duyệt<i>tự suy, đổi được</i></span></div>
      <div>
        <div class="auto2">${r.A.length
          ? `${avHTML(r.A[0],24)} <b>${U[r.A[0]].ten}</b>
             <span style="color:var(--mute)">${f.duyet?"— do bạn chỉ định":"— trưởng đơn vị trực tiếp của R"}</span>`
          : `<span style="color:var(--mute);font-size:13px">Chọn người thực hiện trước</span>`}
          ${f.lam?`<button class="btn sm" onclick="FRM.duyetMo=${!f.duyetMo};draw()">${f.duyetMo?"Đóng":"Đổi"}</button>`:""}
          ${f.duyet?`<button class="btn sm" onclick="FRM.duyet='';FRM.dvA='';FRM.duyetMo=false;draw()">Về mặc định</button>`:""}</div>
        ${f.duyetMo?`<div style="margin-top:8px">${selCap(f.dvA, f.duyet,
            "FRM.dvA=this.value;FRM.duyet='';draw()",
            "FRM.duyet=this.value;FRM.duyetMo=false;draw()", id=>id!==f.lam, false, "— Chọn người duyệt —")}
          <div style="font-size:12px;color:var(--mute);margin-top:6px">Đổi người duyệt thì trưởng đơn vị trực tiếp của R vẫn tự vào cột I.</div></div>`:""}
      </div>
    </div>

  </div>
  ${/* C và I là tuỳ chọn nên thu lại. Bản trước bung cả hai, mỗi vai chiếm bốn dòng
       gồm ô chọn phòng, ô chọn người, dòng "Chưa chọn ai" và một dòng giải thích —
       tám ô chọn cho một biểu mẫu mà đa số việc chỉ cần đúng một người thực hiện. */""}
  <div style="margin-top:10px">
    ${f.cimo ? `<div class="rc4" style="margin-top:0">
      <div class="rw">
        <div class="lb2"><b>C</b><span>Người phối hợp<i>0 đến n, không chấm điểm</i></span></div>
        <div>${selCap(f.dvC, "", "FRM.dvC=this.value;draw()",
          "if(this.value)togPH(this.value)", chuaChon, false, "— Thêm người phối hợp —")}
          ${chipsNguoi(f.phoihop, "togPH")}</div>
      </div>
      <div class="rw">
        <div class="lb2"><b>I</b><span>Người theo dõi<i>hệ thống tự thêm</i></span></div>
        <div>
          <div class="auto2" style="margin-bottom:8px">${r.I.length
            ? r.I.map(id=>`${avHTML(id,22)}<span style="font-size:13px">${U[id].ten}</span>`).join('<span class="dot"></span>')
            : `<span style="color:var(--mute);font-size:13px">Hệ thống chưa thêm ai</span>`}</div>
          ${selCap(f.dvI, "", "FRM.dvI=this.value;draw()",
            "if(this.value)togTD(this.value)", chuaChon, false, "— Thêm người theo dõi —")}
          ${chipsNguoi(f.theodoi, "togTD")}
          <div style="font-size:12px;color:var(--mute);margin-top:6px">Người giao khi giao vượt cấp, người duyệt tầng hai, và người chủ trì việc cha đều tự vào đây.</div>
        </div>
      </div></div>
      <button class="btn sm" style="margin-top:9px" onclick="FRM.cimo=false;draw()">Thu gọn phối hợp và theo dõi</button>`
    : `<button class="more" style="margin:0" onclick="FRM.cimo=true;draw()">+ Người phối hợp và người theo dõi
        <span style="font-weight:400;color:var(--mute)">— ${
          (f.phoihop.length||f.theodoi.length) ? `đang có ${f.phoihop.length} phối hợp, ${f.theodoi.length} theo dõi`
          : "vai C và I, để trống cũng được"}</span></button>`}
  </div>`;
}

/* Chọn lại "không dùng mẫu": trước đây onchange gọi boMau() mà hàm này chưa từng
   được viết, nên bỏ mẫu là ném ReferenceError và biểu mẫu đứng im. */
function boMau(){
  const g = FRM ? FRM.nhom : null;
  FRM = newFrm(g);
  draw();
}
function useMau(i){
  const m = MAU[i]; m.dung = (m.dung||0) + 1;
  FRM = newFrm(m.loai || "CHU_KY");
  FRM.mauId = m.id;
  FRM.ttl = m.n; FRM.sp = m.sp; FRM.dk = m.dk; FRM.md = m.md;
  FRM.tc  = m.tc.slice(); FRM.buoc = (m.buoc||[]).slice();
  FRM.luat = m.luat; FRM.bc = !!m.bc; if (m.luat || m.bc || FRM.buoc.length) FRM.mo = true;
  if (m.luat){
    FRM.han = "";                    /* hạn pháp lý phải tự nhập, không gợi ý theo ngày công */
    draw(); toast("Mẫu có hạn pháp lý — bạn phải tự nhập đúng ngày luật định");
    return;
  }
  const l = lopThamChieu(m.id);
  const soNgay = l ? Math.ceil(l.p80) : m.ng;
  const d = new Date(TODAY); let add = soNgay;
  while (add > 0){ d.setDate(d.getDate()+1); if (d.getDay()!==0 && d.getDay()!==6) add--; }
  FRM.han = `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;
  FRM.ltc = l ? {...l, mau:m.n} : null;
  draw();
  toast(l ? `Hạn tính theo ${l.n} lần làm thật trước đó, lấy phân vị 80` : "Đã điền sẵn từ mẫu — kiểm lại hạn");
}
/* =====================  QUẢN LÝ MẪU VIỆC  =====================
   Ai được sửa: người tạo ra mẫu, hoặc trưởng đơn vị (người có cấp dưới).
   Mẫu thuộc về phòng chứ không thuộc về cá nhân, nên người tạo nghỉ việc thì mẫu vẫn còn.
   ============================================================== */
function laTruongDonVi(){ return capDuoi().length > 0; }
function suaMauDuoc(m){ return m.boi === U[me].ten || laTruongDonVi(); }

let MED = null;                                  /* mẫu đang soạn */
function moMau(i){
  const m = i < 0
    ? {n:"", sp:"", dk:3, ng:3, tc:["",""], buoc:[], md:"", luat:false, bc:false, _i:-1}
    : {...MAU[i], tc:MAU[i].tc.slice(), buoc:(MAU[i].buoc||[]).slice(), _i:i};
  MED = m; renderMau(); $("#mdl").classList.add("on");
}
function renderMau(){
  const m = MED, moi = m._i < 0;
  $("#mdlC").innerHTML = `
    <div class="mdl-h"><h3>${moi?"Tạo mẫu việc mới":"Sửa mẫu việc"}</h3>
      <p>Mẫu dùng chung toàn công ty, trưởng đơn vị nào cũng sửa được.
      ${moi?"":`${esc(m.boi)} tạo ngày ${m.luc} · đã dùng ${m.dung||0} lần`}</p></div>
    <div class="mdl-b">
      <div class="fld"><label>Tên mẫu <span class="hint">— gọi tên loại việc, không ghi tháng cụ thể</span></label>
        <input class="inp" value="${esc(m.n)}" oninput="MED.n=this.value"
          placeholder="Ví dụ: Đối soát công nợ theo nhóm khách hàng"></div>

      <div class="fld"><label>Sản phẩm cần nộp <span class="hint">— điền sẵn vào khối 4 khi chọn mẫu</span></label>
        <input class="inp" value="${esc(m.sp)}" oninput="MED.sp=this.value"
          placeholder="Ví dụ: Bảng đối soát đã ký xác nhận"></div>

      <div class="fld"><label>Tiêu chí nghiệm thu chuẩn</label>
        ${m.tc.map((c,i)=>`<div class="tce">
            <input class="inp" value="${esc(c)}" oninput="MED.tc[${i}]=this.value" placeholder="Tiêu chí ${i+1}">
            <button class="k" onclick="MED.tc.splice(${i},1);renderMau()">✕</button></div>`).join("")}
        <button class="btn sm" onclick="MED.tc.push('');renderMau()">+ Thêm tiêu chí</button></div>

      <div class="fld"><label>Độ khó mặc định</label>
        <div class="pick">${[1,2,3,5,8].map(v=>`<button class="${m.dk===v?"on":""}" onclick="MED.dk=${v};renderMau()">${v}</button>`).join("")}</div></div>

      <div class="fld"><label>Loại hạn</label>
        <div class="pick">
          <button class="${!m.luat?"on":""}" onclick="MED.luat=false;renderMau()">Hạn nội bộ</button>
          <button class="${m.luat?"on":""}" onclick="MED.luat=true;renderMau()">Hạn pháp lý</button></div></div>

      <div class="fld"><label>Các bước thực hiện chuẩn <span class="hint">— cách làm, khác với tiêu chí nghiệm thu ở trên</span></label>
        ${(m.buoc||[]).map((c,i)=>`<div class="tce">
            <input class="inp" value="${esc(c)}" oninput="MED.buoc[${i}]=this.value" placeholder="Bước ${i+1}">
            <button class="k" onclick="MED.buoc.splice(${i},1);renderMau()">✕</button></div>`).join("")}
        <button class="btn sm" onclick="(MED.buoc=MED.buoc||[]).push('');renderMau()">+ Thêm bước</button></div>

      <div class="fld"><label>Bằng chứng khi nộp</label>
        <div class="pick">
          <button class="${!m.bc?"on":""}" onclick="MED.bc=false;renderMau()">Không bắt buộc</button>
          <button class="${m.bc?"on":""}" onclick="MED.bc=true;renderMau()">Bắt buộc đính kèm tệp</button></div></div>

      ${m.luat ? `<div class="note law">Mẫu hạn pháp lý sẽ <b>để trống ô hạn</b> khi chọn, bắt người giao tự nhập đúng ngày luật định.</div>`
      : `<div class="fld"><label>Thời lượng gợi ý <span class="hint">— số ngày làm việc, hệ thống tự tính ra hạn</span></label>
        <div class="pick">${[1,2,3,5,7,10].map(v=>`<button class="${m.ng===v?"on":""}" onclick="MED.ng=${v};renderMau()">${v} ngày</button>`).join("")}</div></div>`}

      <div class="fld"><label>Mục đích <span class="hint">— gắn với KPI nào của phòng</span></label>
        <textarea class="inp" oninput="MED.md=this.value" placeholder="Ví dụ: KPI phòng: công nợ quá hạn dưới 5% doanh thu">${esc(m.md)}</textarea></div>
    </div>
    <div class="mdl-f">
      <button class="btn" onclick="dongCham()">Huỷ</button>
      <button class="btn p" onclick="luuMau()">${moi?"Tạo mẫu":"Lưu thay đổi"}</button>
    </div>`;
}
function luuMau(){
  const m = MED;
  const tc = m.tc.map(x=>x.trim()).filter(Boolean);
  if (!m.n.trim())  return toast("Chưa đặt tên mẫu");
  if (!m.sp.trim()) return toast("Chưa ghi sản phẩm cần nộp");
  if (!tc.length)   return toast("Mẫu cần ít nhất một tiêu chí nghiệm thu");
  const data = {n:m.n.trim(), sp:m.sp.trim(), dk:m.dk, ng:m.ng, tc, md:(m.md||"").trim(),
                luat:m.luat, bc:!!m.bc, loai:m.loai||"CHU_KY", buoc:(m.buoc||[]).map(x=>x.trim()).filter(Boolean)};
  if (m._i < 0){
    MAU.push({...data, id:"m"+(++MSEQ), boi:U[me].ten, luc:"04/09/2026", dung:0});
    toast(`Đã tạo mẫu “${data.n}” — cả phòng dùng được ngay`);
  } else {
    MAU[m._i] = {...MAU[m._i], ...data};
    toast("Đã lưu thay đổi — các việc đã giao trước đó giữ nguyên tiêu chí cũ");
  }
  MED = null; dongCham(); draw();
}
function luuThanhMau(){
  const f = FRM, tc = f.tc.map(x=>x.trim()).filter(Boolean);
  if (!f.ttl.trim()) return toast("Điền tiêu đề trước đã, rồi mới lưu thành mẫu");
  if (!tc.length)    return toast("Cần ít nhất một tiêu chí nghiệm thu");
  MED = {n:f.ttl.trim(), sp:f.sp, dk:f.dk, ng:3, tc, buoc:f.buoc.filter(Boolean),
         md:f.md, luat:f.luat, bc:!!f.bc, loai:f.nhom, _i:-1};
  renderMau(); $("#mdl").classList.add("on");
  toast("Đã bê nội dung sang — sửa lại tên cho chung chung rồi lưu");
}

/* Hộp chọn loại ý kiến — ba lựa chọn, không cho gõ tự do vì phải thống kê được
   nguyên nhân vướng mắc theo loại. Ô lý do là bắt buộc: "hạn không khả thi" mà không
   nói vì sao thì người giao không có gì để quyết. */
function moYKien(){
  const t = CUR; if (!t) return;
  $("#mdlC").innerHTML = `<div class="mdl-h"><b>Có ý kiến về việc này</b>
      <button class="x" onclick="dongCham()">✕</button></div>
    <div class="mdl-b">
      <div class="note" style="margin-top:0">Đồng hồ trễ hạn <b>dừng ngay khi bạn gửi</b> và chạy lại
        khi người giao trả lời. Hạn cam kết trên phiếu không đổi — số ngày dừng ghi riêng.</div>
      <div class="fld"><label>Loại vướng mắc</label>
        <div class="pick" style="flex-direction:column;align-items:stretch">
          ${Object.entries(Y_KIEN).map(([k,v])=>`<button style="text-align:left;padding:11px 13px"
            onclick="guiYKien('${k}')"><b>${v[0]}</b>
            <div style="font-weight:400;color:var(--mute);font-size:12.5px;margin-top:2px">${v[1]}</div></button>`).join("")}
        </div></div>
      <div class="fld" style="margin-bottom:0"><label>Nói rõ vì sao <span class="hint">— bắt buộc</span></label>
        <textarea class="inp" id="yk_nd" placeholder="Ví dụ: khối lượng 12 tháng hoá đơn, hai người làm trong hai tuần không kịp"></textarea></div>
    </div>`;
  $("#mdl").classList.add("on");
}
function guiYKien(loai){
  const t = CUR; if (!t) return;
  const nd = ($("#yk_nd").value || "").trim();
  if (!nd) return toast("Phải nói rõ vì sao — người giao cần căn cứ để quyết");
  t.yKien = {loai, nd, boi:me, luc:NOW, ngay:fmtNgay(TODAY)};
  t.log.push({w:U[me].ten, k:`nêu ý kiến: ${Y_KIEN[loai][0]}`, t:NOW, s:0, x:nd});
  const ai = t.giao;
  NT.unshift({to:ai, ic:"a", tx:`<b>${U[me].ten}</b> nêu ý kiến <b>${Y_KIEN[loai][0].toLowerCase()}</b> về việc <b>${esc(t.ttl)}</b>`, tm:NOW, un:1, go:t.id});
  dongCham(); renderDw(); drawNav(); drawNoti();
  toast("Đã gửi ý kiến — đồng hồ trễ hạn dừng cho tới khi người giao trả lời");
}

/* Nghiệp vụ nào bắt buộc bằng chứng gì — dò theo tiêu đề và sản phẩm phải nộp.
   Bắt người giao tự nhớ "việc này phải kèm biên bản" thì mười lần quên bảy; danh mục
   có sẵn mà không dùng thì càng vô lý. */
function bangChungCho(ttl, sp){
  /* So khớp theo TỪ, không theo chuỗi liền. "Kê khai thuế" phải bắt được
     "Kê khai và nộp thuế GTGT" — chuỗi liền thì trượt vì có "và nộp" chen giữa.
     Đòi đủ mọi từ của nghiệp vụ để không bắt bừa: "Họp giao ban" không khớp
     "Ký hợp đồng" dù có chung chữ "hợp". */
  const q = boDau((ttl || "") + " " + (sp || ""));
  return BANG_CHUNG.find(x => boDau(x.viec).split(/\s+/).filter(w => w.length > 1)
    .every(w => q.includes(w))) || null;
}
function apBangChung(){
  const f = FRM; if (!f) return;
  const o = bangChungCho(f.ttl, f.sp);
  if (!o) return toast("Tiêu đề chưa khớp nghiệp vụ nào trong danh mục bằng chứng");
  f.bc = true; f.bcLoai = o.bc;
  toast(`Đã bật bắt buộc bằng chứng: ${o.bc}`); draw();
}
function taoViec(){
  const f = FRM;
  const tc = f.tc.map(x=>x.trim()).filter(Boolean);
  const thieu = oBatBuoc(f);
  if (thieu.length) return toast("Còn thiếu: " + thieu.join(" · "));
  /* chu kỳ: hệ thống tự sinh ngày của kỳ đầu, không hỏi tay */
  if (f.nhom === "CHU_KY"){
    const d = new Date(TODAY);
    if (f.lap === "NGAY") d.setDate(d.getDate()+1);
    else if (f.lap === "TUAN") d.setDate(d.getDate()+7);
    else { d.setMonth(d.getMonth()+1); const n = Number(f.ngayKy); if (n) d.setDate(n); }
    f.bd  = `${String(TODAY.getDate()).padStart(2,"0")}/${String(TODAY.getMonth()+1).padStart(2,"0")}/${TODAY.getFullYear()}`;
    f.han = `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;
  }
  if (f.nhom === "DOT_XUAT"){
    if (!f.nguon) return toast("Việc đột xuất phải ghi nguồn phát sinh");
    f.bd = f.phatSinh;
  }
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(f.han)) return toast("Hạn phải theo dạng dd/mm/yyyy");
  const id = "CV-" + (++SEQ);
  T.unshift({id, ttl:f.ttl.trim(), tt:"MOI", giao:me, lam:f.lam, bd:f.bd, han:f.han, dk:f.dk,
    luat:f.luat, sp:f.sp.trim(), mucdich:f.md.trim(), tc:tc.map(t=>({t,d:false})),
    loai:f.nhom, mat:f.mat, han_goc:f.han, doi:0, ah:f.ah||3, kc:f.kc||3,
    lap:f.nhom==="CHU_KY"?f.lap:null, soKy:f.nhom==="CHU_KY"?1:null, kyDung:f.nhom==="CHU_KY"?0:null,
    nguon:f.nhom==="DOT_XUAT"?f.nguon:null, phatSinh:f.nhom==="DOT_XUAT"?f.phatSinh:null,
    nhanSau:f.nhom==="DOT_XUAT"?0:null,
    phoihop:f.phoihop.slice(), theodoi:f.theodoi.slice(), duyet:f.duyet||null,
    tien:Number(String(f.tien).replace(/\D/g,""))||0, tienLoai:f.tienLoai||"CHI",
    sk:"BT", bc:!!f.bc, files:[], cha:f.cha||null, truoc:f.truoc.slice(), chuoi:null, ci:0,
    buoc:f.buoc.map(x=>x.trim()).filter(Boolean).map(t=>({t,d:false})),
    bcLoai: f.bcLoai || (bangChungCho(f.ttl, f.sp) || {}).bc || null,
    ttRieng: null,
    tuTao: f.lam === me,          /* tự khai việc của mình, không phải cấp trên giao xuống */
    log:[{w:U[me].ten, k: f.lam === me ? "tự tạo việc này" : "giao việc này", t:NOW, s:1}]});
  if (f.lam !== me)
    NT.unshift({to:f.lam, ic:"a", tx:`<b>${U[me].ten}</b> giao cho bạn việc <b>${esc(f.ttl.trim())}</b>`, tm:NOW, un:1, go:id});
  else { const tr = truongTrucTiep(me);
    if (tr && tr !== me) NT.unshift({to:tr, ic:"", tx:`<b>${U[me].ten}</b> tự tạo việc <b>${esc(f.ttl.trim())}</b> — bạn là người nghiệm thu`, tm:NOW, un:1, go:id}); }
  const nh = f.nhom;
  FRM = newFrm(nh);
  /* Đưa người giao tới đúng chỗ việc vừa tạo sẽ xuất hiện: việc trong dự án thì
     mở cửa sổ dự án đó, còn lại thì về Theo dõi và tự đặt sẵn ô lọc nguồn gốc. */
  const daId = f.cha ? duAnCua(find(id)) : null;
  if (NGAN_GIAO){                      /* tạo từ ngăn trượt: đóng ngăn, giữ nguyên chỗ đang đứng */
    NGAN_GIAO = false;
    $("#ngw").classList.remove("on"); $("#scrim2").classList.remove("on");
    if (daId){ TAB = "da"; DA_MO = daId; }
  }
  else if (daId){ TAB = "da"; DA_MO = daId; DA_TAB = "cv"; }
  else { TAB = "cong"; VIEW = "bang"; DA_MO = null;
         F = {ng: nh === "DOT_XUAT" ? "DOT_XUAT" : nh === "CHU_KY" ? "CHU_KY" : "TAT_CA",
              da:"TAT_CA", vai:"TAT_CA"}; }
  draw();
  toast(f.lam === me
    ? `Đã tạo ${id} cho chính bạn · ${U[truongTrucTiep(me)]?U[truongTrucTiep(me)].ten+" sẽ nghiệm thu":"chờ phân người nghiệm thu"}`
    : daId ? `Đã giao ${id} cho ${U[f.lam].ten} — xem trong dự án`
           : `Đã giao ${id} cho ${U[f.lam].ten}`);
}

/* =====================  NGĂN CHI TIẾT  ===================== */
let CUR = null;
/* Trạng thái riêng của phòng — mỗi phòng có vài tình huống chờ mà trạng thái chung
   không diễn đạt được ("Chờ cơ quan thụ lý", "Chờ số liệu kế toán"). Loại có dung:true
   thì DỪNG ĐỒNG HỒ quá hạn, vì thời gian nằm ngoài tầm kiểm soát của người làm. */
function ttRiengCho(t){
  const dv = U[t.lam] ? U[t.lam].dv : null; if (!dv) return [];
  return TT_RIENG.filter(x => trongDV(t.lam, x.dv) && x.nhom === t.tt);
}
function datTTRieng(id, ma){
  const t = find(id); if (!t) return;
  const o = TT_RIENG.find(x => x.ma === ma) || null;
  t.ttRieng = ma || null;
  t.log = t.log || [];
  t.log.unshift({w:U[me].ten, k: o ? `chuyển sang trạng thái riêng “${o.ten}”` : "bỏ trạng thái riêng", t:NOW, s:1});
  toast(o ? `${o.ten}${o.dung?" · đồng hồ quá hạn dừng lại":""}` : "Đã bỏ trạng thái riêng");
  renderDw(); draw();
}
function openDw(id){
  CUR = find(id); if (!CUR) return;
  /* Tài liệu yêu cầu MỌI lượt mở việc mức Hạn chế phải vào nhật ký. Trước đây câu này
     chỉ nằm trong ghi chú, mã không ghi gì — nhật ký là bằng chứng, không phải lời hứa. */
  if (CUR.mat === "HAN_CHE") ghiNK(me, "Mở việc mức Hạn chế", moTaViec(id));
  EDIT = false; EDITB = false;
  NT.forEach(n => { if (n.to===me && n.go===id) n.un = 0; });
  renderDw(); $("#dw").classList.add("on"); $("#scrim").classList.add("on"); drawNav(); drawNoti();
}
function closeDw(){ CUR=null; $("#dw").classList.remove("on"); $("#scrim").classList.remove("on"); draw(); }

function renderDw(){
  const t = CUR, d = dlText(t.han,t), st = TT[t.tt], p = pct(t);
  const canTick = t.lam===me && laLa(t) && (t.tt==="DANG_LAM" || t.tt==="MOI" || t.tt==="TRA_LAI");

  $("#dwH").innerHTML = `<div style="flex:1;min-width:0">
      <div style="display:flex;gap:7px;align-items:center;flex-wrap:wrap;margin-bottom:4px">
        <span class="tag ${st[1]}">${st[0]}</span>
        ${t.luat?`<span class="tag law">Hạn pháp lý</span>`:""}
        <span style="font-size:12px;color:var(--mute)">${t.id}</span>
      </div>
      <div style="font-size:16.5px;font-weight:700;line-height:1.35">${esc(t.ttl)}</div>
      <div style="font-size:12.5px;color:var(--mute);margin-top:3px">
        ${U[t.giao].ten} giao cho ${U[t.lam].ten} · <span class="${d.c==="qh"?"":""}" style="${d.c==="qh"?"color:var(--red);font-weight:600":d.c==="hn"?"color:var(--amb);font-weight:600":""}">${d.t}</span>
      </div></div>
    <button class="x" onclick="closeDw()">✕</button>`;

  let b = "";

  if (t.tt==="TRA_LAI")
    b += `<div class="note" style="background:var(--redbg);border-color:#F0C7CC;border-left-color:var(--red)">
          <b>Việc bị trả lại.</b> ${esc(t.tralai||"")}</div>`;

  const _rr = ruiRo(t);
  if (_rr.length){
    const _do = _rr.some(x=>x[0]==="r2");
    b += `<div class="blk"><div class="blk-h" style="background:${_do?"#FBE3E5":"#FFF3CD"};color:${_do?"var(--red)":"var(--amb)"}">
        ${_rr.length} cảnh báo nguy cơ trễ</div><div class="blk-b">
        ${_rr.map(([c,x])=>`<div class="flag ${c}" style="margin-bottom:7px;padding:9px 11px">
          <span class="ic2" style="width:22px;height:22px;font-size:12px">${c==="r2"?"!":"⚠"}</span>
          <span class="bd2" style="font-size:13px">${esc(x)}</span></div>`).join("")}
        <div style="font-size:12px;color:var(--mute);margin-top:6px">
          Cảnh báo sinh từ <b>quy tắc rõ ràng</b>, không phải mô hình đoán. Mỗi dòng đều kiểm chứng lại được bằng dữ liệu trong phiếu.</div>
      </div></div>`;
  }

  if (t.luat)
    b += `<div class="note law"><b>Hạn ${t.han} là hạn pháp lý.</b>
          Không dời được trong phần mềm, và hệ thống nhắc ở ba mốc sớm hơn việc thường: còn 7 ngày, còn 3 ngày, và ngày quá hạn đầu tiên.</div>`;

  const nd = nguoiDuyet(t);
  const _v = vaiCuaToi(t);
  if (_v) b += `<div class="note" style="display:flex;align-items:center;gap:11px">
    <span style="display:inline-grid;place-items:center;width:34px;height:34px;border-radius:9px;
      background:var(--navy);color:#fff;font-weight:700;font-size:15px;flex:none">${VAI_TEN[_v][0]}</span>
    <span><b>${VAI_TEN[_v][1]}</b> — ${VAI_TEN[_v][2]}.
    ${_v==="R"?"Việc này chấm điểm cho bạn.":_v==="A"?"Bạn là người nghiệm thu và chấm điểm việc này.":
      _v==="C"?"Bạn hỗ trợ, việc này không tính điểm cho bạn.":"Bạn nhận thông báo nhưng không phải làm gì."}</span></div>`;
  /* =========================================================================
   NỘI DUNG GIAO — ĐỌC BẰNG MẮT, KHÔNG ĐỌC BẰNG CÁCH DÒ DANH SÁCH

   Bản cũ là 17 dòng "nhãn : giá trị" xếp thẳng, mọi dòng nặng như nhau: sản phẩm
   phải nộp nằm cùng cỡ chữ với mức bảo mật. Người mở phiếu việc chỉ cần biết ngay
   ba điều — NỘP CÁI GÌ, CÒN BAO LÂU, AI LIÊN QUAN — nên ba điều đó được kéo lên
   trên và vẽ ra thành hình. Phần còn lại là dữ liệu tham chiếu, thu về hàng thẻ nhỏ.
   ========================================================================= */
function dwThoiGian(t){
  const bd = parse(t.bd), han = parse(t.han), hn = new Date(TODAY);
  const tong = Math.max(1, d2(han) - d2(bd)), da = d2(hn) - d2(bd);
  const troi = Math.max(0, Math.min(100, da / tong * 100));
  const lam  = tienDo(t), qh = quaHan(t), xong = t.tt === "HOAN_THANH";
  const lech = Math.round(lam - troi);
  const nhip = xong ? {t:"Đã hoàn thành", c:"#1B5E20"}
    : qh ? {t:`Quá hạn ${-conLai(t)} ngày`, c:"var(--red)"}
    : da < 0 ? {t:"Chưa tới ngày bắt đầu", c:"var(--mute)"}
    : lech <= -20 ? {t:`Chậm hơn nhịp ${-lech}%`, c:"var(--red)"}
    : lech <= -8  ? {t:`Chậm hơn nhịp ${-lech}%`, c:"var(--amb)"}
    : lech >= 8   ? {t:`Sớm hơn nhịp ${lech}%`,  c:"#1B5E20"}
    : {t:"Đúng nhịp", c:"#1B5E20"};
  return `<div class="dwtl">
    <div class="dwtlh">
      <span><i>Bắt đầu</i><b>${t.bd}</b></span>
      <span class="gi"><i>Thời lượng</i><b>${ngayCongTxt(t.bd, t.han)}</b></span>
      <span class="ph"><i>Hạn hoàn thành</i><b class="${qh&&!xong?"do":""}">${t.han}</b>${
        t.luat?` <span class="tag law">khoá</span>`:""}${
        t.doi?` <span class="tag a">dời ${t.doi} lần</span>`:""}</span>
    </div>
    <div class="dwtlb" title="Cột màu là phần việc đã làm được, vạch đỏ là hôm nay">
      <i style="width:${lam}%;background:${xong?"#2E7D32":qh?"#C62828":lech<=-8?"#C79000":"#2a78d6"}"></i>
      ${da>=0&&!xong&&!qh?`<u style="left:${troi}%"></u>`:""}
      <b>${lam}%</b>
    </div>
    <div class="dwtlf">
      <span style="color:${nhip.c};font-weight:700">${nhip.t}</span>
      <span>${da<0?`Còn ${-da} ngày nữa mới bắt đầu`
        :xong?`Nộp lúc ${t.nop?t.nop.t:"—"}`
        :qh?`Đã trôi hết thời gian, làm được ${lam}%`
        :`Đã trôi ${Math.round(troi)}% thời gian, làm được ${lam}%`}</span>
      ${dangDung(t)?`<span class="tag a" title="${esc(lyDoDung(t)||"")}">Đồng hồ đang dừng</span>`:""}
    </div></div>`;
}
function dwNguoi(t){
  const nd = nguoiDuyet(t), them = canThemTangDuyet(t) ? chuoiDuyetThem(t) : [];
  const o = (id, vai, mo, cl) => id && U[id]
    ? `<div class="dwn ${cl||""}"><span class="dwnv">${vai}</span>${avHTML(id,36)}
        <b>${esc(U[id].ten)}</b><span class="dwnc">${esc(U[id].cd)}</span>
        ${mo?`<span class="dwnm">${mo}</span>`:""}</div>`
    : `<div class="dwn"><span class="dwnv">${vai}</span>
        <span class="dwno">?</span><b style="color:var(--red)">Chưa xác định</b></div>`;
  return `<div class="dwng">
      ${o(t.giao, "Người giao", laVuotCap(t) ? "giao vượt cấp · thành người theo dõi" : "")}
      <span class="dwmui">→</span>
      ${o(t.lam, "Người thực hiện", "chịu trách nhiệm chính · được chấm điểm", "chinh")}
      <span class="dwmui">→</span>
      ${o(nd, "Người duyệt", "nghiệm thu và chấm điểm")}
      ${them.map((x,k)=>{ const xg = t.tt==="HOAN_THANH" || (t.chuoi && (t.ci||0) > k);
        const dg = t.tt==="CHO_DUYET_2" && (t.ci||0) === k;
        return `<span class="dwmui">→</span>${o(x, `Duyệt tầng ${k+2}`, xg?"đã duyệt ✓":dg?"đang chờ":"chờ tầng trước")}`;}).join("")}
    </div>
    ${(t.phoihop||[]).length?`<div class="dwph"><span class="dwnv">Người phối hợp</span>
      ${t.phoihop.map(x=>U[x]?`<span class="dwpc">${avHTML(x,22)}${esc(U[x].ten)}</span>`:"").join("")}
      <span class="dwnm">hỗ trợ, không chịu trách nhiệm cuối cùng</span></div>`:""}`;
}
b += `<div class="blk"><div class="blk-h">Nội dung giao</div><div class="blk-b">

    <div class="dwsp"><span class="dwspi">📦</span><div style="flex:1;min-width:0">
      <span class="dwspl">Nộp cái gì thì gọi là xong</span>
      <div class="dwspv">${esc(t.sp)}</div>
      <div class="dwspt">
        <span class="tag ${t.bc?"a":"m"}">${t.bc?"Bắt buộc đính kèm tệp":"Không bắt buộc đính kèm"}</span>
      </div></div></div>

    ${dwThoiGian(t)}

    ${(()=>{ const u = uuTien(t), v = UT[u.muc];
      return `<div class="dwut ${v[2]||"n"}">
        <div class="dwutl"><span class="tag ${v[2]}">${v[0]} · ${v[1].toUpperCase()}</span>
          <b>${u.diem} điểm</b></div>
        <div class="dwutr">
          <span><i>Ảnh hưởng</i>${u.ah} — ${AH[u.ah]}</span>
          <span><i>Khẩn cấp</i>${u.kc} — ${KC[u.kc]}</span>
          ${u.ly.length?`<span class="nang"><i>Đã nâng bậc</i>${u.ly.join(" và ")}</span>`:""}
        </div></div>`; })()}

    ${(()=>{ const ds = ttRiengCho(t); if (!ds.length) return "";
      const o = TT_RIENG.find(x => x.ma === t.ttRieng);
      return `<div class="dwtt ${o&&o.dung?"dung":""}">
        <span class="dwttl">Trạng thái riêng của ${esc(DV[U[t.lam].dv]?DV[U[t.lam].dv].ten:"đơn vị")}</span>
        <select class="lsel" onchange="datTTRieng('${t.id}',this.value)">
          <option value="">— Không dùng trạng thái riêng —</option>
          ${ds.map(x=>`<option value="${x.ma}" ${t.ttRieng===x.ma?"selected":""}>${esc(x.ten)}${x.dung?" · dừng đồng hồ":""}</option>`).join("")}
        </select>
        ${o?`<span class="dwttm">${esc(o.gt)}${o.dung?" — thời gian nằm ngoài tầm kiểm soát của người làm nên không tính vào trễ.":""}</span>`:""}
      </div>`; })()}

    ${dwNguoi(t)}

    <div class="dwct">
      <span class="dwc"><span>Loại việc</span><b>${LOAI_TEN[t.loai]||"Việc đột xuất"}</b></span>
      ${(t.tuTao || t.giao === t.lam) ? `<span class="dwc"><span>Nguồn giao</span><b>Người thực hiện tự khai</b></span>` : ""}
      <span class="dwc"><span>Độ khó</span><b>${t.dk}</b> <span style="text-transform:none;letter-spacing:0;font-weight:400">${nhipBaoCao(t.dk).toLowerCase()}</span></span>
      <span class="dwc"><span>Cấp việc</span><b>${CAP_TEN[capViec(t.lam)]}</b></span>
      ${t.bcLoai?`<span class="dwc"><span>Bằng chứng phải nộp</span><b>${esc(t.bcLoai)}</b></span>`:""}
      <span class="dwc"><span>Bảo mật</span><b>${MAT_TEN[t.mat]||"Nội bộ"}</b>${
        t.mat==="HAN_CHE"?` <span class="tag r">chỉ người trong việc thấy</span>`:""}</span>
      <span class="dwc"><span>Sức khoẻ</span>${skHTML(t)}</span>
      ${t.tien?`<span class="dwc"><span>${(t.tienLoai||"CHI")==="CHI"?"Khoản chi":"Khoản thu"}</span><b>${tienTxt(t.tien)}</b>${
        bacDat(t).length?` <span class="tag a">vượt ${bacDat(t).map(x=>tienTxt(x.tu)).join(" và ")}</span>`:""}</span>`:""}
    </div>

    ${(toTien(t).length || conCua(t.id).length || t.mucdich) ? `<dl class="kv" style="margin-top:13px">
      ${toTien(t).length?`<dt>Thuộc việc</dt><dd style="font-weight:400">${toTien(t).map(x=>
        `<a href="#" onclick="event.preventDefault();openDw('${x.id}')" style="color:var(--navy2)">${esc(x.ttl)}</a>`).join(" › ")}</dd>`:""}
      ${conCua(t.id).length?`<dt>Việc con</dt><dd style="font-weight:400">${conCua(t.id).filter(xemDuoc).map(c=>
        `<a href="#" onclick="event.preventDefault();openDw('${c.id}')" style="color:var(--navy2)">${esc(c.ttl)}</a>
         <span style="color:var(--mute)">— ${U[c.lam].ten}, ${tienDo(c)}%</span>`).join("<br>")}
        <br><b>Tiến độ việc này: ${tienDo(t)}%</b> <span style="color:var(--mute);font-weight:400">— trung bình có trọng số theo độ khó của việc con</span></dd>`:""}
      ${t.mucdich?`<dt>Mục đích</dt><dd style="font-weight:400">${esc(t.mucdich)}</dd>`:""}
    </dl>` : ""}
  </div></div>`;

  b += tcBlock(t, canTick);
  b += buocBlock(t);
  b += fileBlock(t);

  if (t.nop)
    b += `<div class="blk"><div class="blk-h">Kết quả đã nộp · ${t.nop.t}</div>
        <div class="blk-b" style="font-size:13.5px">${esc(t.nop.x)}</div></div>`;

  if (t.diem){
    const D = t.diem;
    b += `<div class="blk"><div class="blk-h">Điểm việc này</div><div class="blk-b">
      <div class="tot" style="margin:0 0 11px"><div><div class="l">Điểm tổng</div>
        <div style="font-size:12px;opacity:.75;margin-top:3px">${esc(D.ai)} chấm lúc ${D.boi}</div></div>
        <div class="v">${D.tong.toFixed(2)}</div></div>
      <dl class="kv">
        <dt>Chất lượng (45%)</dt><dd>${D.cl}/5</dd>
        <dt>Đúng hạn (30%)</dt><dd>${D.dh}/5 <span style="font-weight:400;color:var(--mute)">— hệ thống tự tính</span></dd>
        <dt>Chủ động (15%)</dt><dd>${D.cd}/5</dd>
        <dt>Hợp tác (10%)</dt><dd>${D.ht}/5</dd>
        ${D.nx?`<dt>Nhận xét</dt><dd style="font-weight:400">${esc(D.nx)}</dd>`:""}
      </dl></div></div>`;
  }

  b += `<div class="blk"><div class="blk-h">Trao đổi và nhật ký</div><div class="blk-b">
      <div class="tl">${t.log.map(l=>`
        <div class="it ${l.s?"sys":""}">
          <div class="w">${avHTML(idTheoTen(l.w),18)} <b>${esc(l.w)}</b> ${l.s?esc(l.k):""} <span style="opacity:.7">· ${l.t}</span></div>
          ${l.x?`<div class="tx">${esc(l.x)}</div>`:""}
        </div>`).join("")}</div>
      <div class="say">
        <textarea id="say" placeholder="Nhắn cho ${esc(U[t.lam===me?t.giao:t.lam].ten)}… Mọi trao đổi nằm trong việc, không tản mát ra chat riêng."></textarea>
      </div>
      <div style="margin-top:8px"><button class="btn sm" onclick="noi()">Gửi</button></div>
      </div></div>`;

  $("#dwB").innerHTML = b;
  const conDuoc = (t.loai === "DU_AN" || !t.cha) && capViec(t.lam) < 4
                  && t.tt !== "HOAN_THANH" && (t.lam === me || t.giao === me || nguoiDuyet(t) === me);
  $("#dwF").innerHTML = (conDuoc
    ? `<button class="btn" onclick="${duAnCua(t)?`closeDw();moNganGiao('${t.id}')`:`themViecCon('${t.id}')`}">+ Việc con</button>` : "") + footHTML(t);
}

function footHTML(t){
  const mine = t.lam===me, duyet = laViecToiDuyet(t);
  /* B7: bốn nút can thiệp của người giao. Bản trước chỉ có hai — đồng ý lùi hạn hoặc
     giữ nguyên — nên mọi vướng mắc đều bị quy về chuyện hạn, kể cả khi nguyên nhân là
     thiếu người hoặc giao nhầm người. */
  if (t.yKien && (t.giao === me || nguoiDuyet(t) === me))
    return `<button class="btn w" onclick="act('giuNguyen')">Giữ nguyên</button>
            <button class="btn d" onclick="act('doiHan')">Đổi hạn</button>
            <button class="btn" onclick="act('themNguonLuc')">Cấp thêm người</button>
            <button class="btn" onclick="act('doiNguoi')">Đổi người thực hiện</button>
            <span style="font-size:12.5px;color:var(--mute)">
            ${esc(U[t.yKien.boi].ten)} nêu <b>${Y_KIEN[t.yKien.loai][0].toLowerCase()}</b> lúc ${t.yKien.luc}.
            Đồng hồ trễ hạn đã dừng ${ngayDaDung(t)} ngày, chạy lại ngay khi bạn trả lời.</span>`;
  const all = t.tc.every(c=>c.d);
  if (mine && t.tt==="MOI")
    return `<button class="btn p" onclick="act('nhan')">Nhận việc và bắt đầu</button>
            <span style="font-size:12.5px;color:var(--mute)">Nhận việc rồi mới tích được tiêu chí.</span>`;
  if (mine && (t.tt==="DANG_LAM"||t.tt==="TRA_LAI")){
    const spF = (t.files||[]).filter(f=>!f.go && f.ct).length;
    const conMo = conCua(t.id).filter(c=>c.tt!=="HOAN_THANH").length;
    const ok = all && t.tc.length && (!t.bc || spF) && !conMo;
    return `<button class="btn p" onclick="act('nop')" ${ok?"":"disabled"}>Nộp kết quả</button>
            ${t.yKien ? `<span class="tag a">Đang chờ trả lời ý kiến</span>`
              : `<button class="btn" onclick="moYKien()">Có ý kiến</button>`}
            <span style="font-size:12.5px;color:var(--mute)">
            ${!t.tc.length ? "Việc chưa có tiêu chí nghiệm thu nào."
              : !all ? `Còn ${t.tc.filter(c=>!c.d).length} tiêu chí chưa đạt.`
              : conMo ? `Còn ${conMo} việc con chưa đóng — việc cha chưa nộp được.`
              : (t.bc && !spF) ? "Việc này bắt buộc đính kèm bằng chứng — chưa có tệp nào đánh dấu ★ sản phẩm nộp."
              : `Đủ điều kiện, nộp được rồi${spF?` · ${spF} tệp sản phẩm`:""}.`}</span>`;
  }
  if (mine && t.tt==="CHO_DUYET")
    return `<span style="font-size:13px;color:var(--mute)">Đã nộp lúc ${t.nop?t.nop.t:"—"}, đang chờ ${U[t.giao].ten} duyệt.</span>`;
  if (duyet && t.tt==="CHO_DUYET")
    return `<button class="btn d" onclick="moCham()">Duyệt và chấm điểm</button>
            <button class="btn w" onclick="act('tralai')">Trả lại để làm tiếp</button>
            ${canThemTangDuyet(t)?`<span style="font-size:12.5px;color:var(--amb)">
              Khoản chi ${tienTxt(t.tien)} vượt ngưỡng — duyệt xong còn qua
              ${chuoiDuyetThem(t).map(x=>U[x].ten).join(" rồi ")}.</span>`:""}`;
  if (t.tt==="CHO_DUYET_2" && laViecToiDuyet2(t)){
    const c = t.chuoi||[], bac = (t.ci||0)+2, cuoi = (t.ci||0) === c.length-1;
    return `<button class="btn d" onclick="act('duyet2')">${cuoi?"Duyệt và đóng việc":"Duyệt và chuyển tầng trên"}</button>
            <button class="btn w" onclick="act('tralai2')">Trả về người duyệt cấp 1</button>
            <span style="font-size:12.5px;color:var(--mute)">
            Bạn là tầng ${bac} trên ${c.length+1}, duyệt về khoản chi ${tienTxt(t.tien)}.
            Điểm ${t.diem?t.diem.tong.toFixed(2):"—"} do ${t.diem?esc(t.diem.ai):"cấp 1"} chấm, bạn không chấm lại.</span>`;
  }
  if (t.tt==="CHO_DUYET_2")
    return `<span style="font-size:13px;color:var(--mute)">Đã duyệt cấp 1, đang chờ
            ${nguoiDuyet2(t)?U[nguoiDuyet2(t)].ten:"cấp trên"} duyệt tầng ${(t.ci||0)+2}
            trên ${(t.chuoi||[]).length+1}.</span>`;
  if (t.tt==="HOAN_THANH")
    return `<span style="font-size:13px;color:var(--mute)">Việc đã hoàn thành${t.diem?` · điểm ${t.diem.tong.toFixed(2)}`:""}.</span>`;
  return `<span style="font-size:13px;color:var(--mute)">Bạn đang xem với vai ${U[me].cd}. Việc này do ${U[t.lam].ten} thực hiện.</span>`;
}

/* Sức khoẻ do người chủ trì tự chọn, tách khỏi tiến độ.
   Một việc 80% tiến độ vẫn có thể đang trễ — đó mới là thứ cấp trên cần biết. */
function skHTML(t){
  const cur = t.sk || "BT", sua = (t.lam===me || t.giao===me) && t.tt!=="HOAN_THANH";
  const now = SK_TEN[cur];
  if (!sua) return `<span class="tag ${now[1]}">${now[0]}</span>`;
  return `<span class="pick" style="display:inline-flex;gap:5px">${Object.entries(SK_TEN).map(([k,v])=>
    `<button style="padding:3px 9px;font-size:12px" class="${cur===k?"on":""}" onclick="setSK('${k}')">${v[0]}</button>`).join("")}</span>`;
}
function setSK(k){
  if (CUR.sk === k) return;
  const cu = SK_TEN[CUR.sk||"BT"][0];
  CUR.sk = k;
  ghi(`đổi sức khoẻ việc: ${cu} → ${SK_TEN[k][0]}`);
  if (k !== "BT") baoKia(`<b>${U[me].ten}</b> báo việc <b>${esc(CUR.ttl)}</b> đang ở mức <b>${SK_TEN[k][0]}</b>`, "r");
  renderDw(); drawNav(); drawNoti();
}

function tick(i){
  const t = CUR; t.tc[i].d = !t.tc[i].d;
  if (t.tt==="MOI") t.tt = "DANG_LAM";
  renderDw();
}

/* =====================  TIÊU CHÍ NGHIỆM THU: SỬA / THÊM / BỚT  =====================
   Quy tắc:
   · Người GIAO được sửa, thêm, bớt bất cứ lúc nào TRƯỚC khi duyệt. Mọi thay đổi vào nhật ký.
   · Thêm hoặc sửa tiêu chí khi việc đang CHỜ DUYỆT thì việc tự quay về ĐANG LÀM,
     vì yêu cầu đã đổi sau khi người ta nộp — không được đổi luật giữa chừng rồi vẫn bắt chịu.
   · Người THỰC HIỆN không tự sửa được, chỉ ĐỀ NGHỊ thêm hoặc bớt; người giao bấm đồng ý.
   · Việc đã HOÀN THÀNH thì khoá cứng, không ai sửa được nữa.
   ================================================================================= */
let EDIT = false;
function coQuyenSua(t){ return t.giao === me && t.tt !== "HOAN_THANH"; }
function coQuyenDeXuat(t){ return t.lam === me && t.tt !== "HOAN_THANH"; }

function tcBlock(t, canTick){
  const p = pct(t), sua = coQuyenSua(t), dx = t.dexuat || [];
  let h = `<div class="blk"><div class="blk-h row2">
      <span>Tiêu chí nghiệm thu — ${t.tc.filter(c=>c.d).length}/${t.tc.length} đã đạt (${p}%)</span>
      ${sua ? `<button class="ed" onclick="EDIT=${!EDIT};renderDw()">${EDIT?"Xong":"Sửa tiêu chí"}</button>`
            : coQuyenDeXuat(t) ? `<button class="ed" onclick="moDeXuat()">Đề nghị sửa</button>` : ""}
      </div><div class="blk-b">`;

  if (t.tt === "HOAN_THANH")
    h += `<div style="font-size:12px;color:var(--mute);margin-bottom:9px">
          🔒 Việc đã duyệt xong, bộ tiêu chí bị khoá — không sửa được nữa để điểm đã chấm còn căn cứ.</div>`;

  dx.forEach((d,i)=>{
    h += `<div class="dx">
      <div class="t1">${esc(d.boi)} đề nghị ${d.loai==="THEM"?"THÊM":"BỎ"} một tiêu chí · ${d.luc}</div>
      <div class="t2">${esc(d.nd)}</div>
      ${t.giao===me?`<div class="ax">
        <button class="btn sm p" onclick="dxOk(${i})">Đồng ý</button>
        <button class="btn sm" onclick="dxNo(${i})">Từ chối</button></div>`
       :`<div style="font-size:12px;color:var(--mute)">Đang chờ ${esc(U[t.giao].ten)} trả lời.</div>`}
    </div>`;
  });

  if (EDIT && sua){
    h += t.tc.map((c,i)=>`<div class="tce">
        <input class="inp" value="${esc(c.t)}" onchange="tcSua(${i},this.value)">
        ${c.d?`<span class="lk" title="Người thực hiện đã tích tiêu chí này">✓</span>`:``}
        <button class="k" onclick="tcXoa(${i})" title="Bỏ tiêu chí này">✕</button></div>`).join("");
    h += `<button class="btn sm" onclick="tcThem()">+ Thêm tiêu chí</button>
      <div class="warn">Sửa tiêu chí là đổi chuẩn nghiệm thu giữa chừng. Mọi thay đổi đều vào nhật ký kèm tên và giờ,
      và ${esc(U[t.lam].ten)} nhận thông báo ngay.
      ${t.tt==="CHO_DUYET"?" Việc đang chờ duyệt — nếu thêm hoặc sửa tiêu chí, việc sẽ quay về Đang làm.":""}</div>`;
  } else {
    h += `<div class="pg" style="width:100%;margin-bottom:10px"><i style="width:${p}%"></i></div>`;
    h += t.tc.length ? t.tc.map((c,i)=>`<div class="chk ${c.d?"done":""}" data-lock="${canTick?0:1}">
          <input type="checkbox" ${c.d?"checked":""} ${canTick?"":"disabled"} onchange="tick(${i})" id="c${i}">
          <label for="c${i}">${esc(c.t)}</label></div>`).join("")
        : `<div style="font-size:13px;color:var(--red)">Chưa có tiêu chí nào — việc này không nghiệm thu được.</div>`;
    if (canTick) h += `<div style="font-size:12px;color:var(--mute);margin-top:9px">
        Tiến độ tính bằng số tiêu chí đã đạt. Không có ô nhập phần trăm tự do — vì con số đó không ai kiểm chứng được.</div>`;
  }
  return h + `</div></div>`;
}

/* ===== CÁC BƯỚC THỰC HIỆN =====
   Khác tiêu chí nghiệm thu: các bước là CÁCH LÀM, tiêu chí là ĐIỀU KIỆN ĐẠT.
   Vì thế các bước KHÔNG tính vào tiến độ, và NGƯỜI THỰC HIỆN được tự sửa —
   đó là cách làm của họ. Tiêu chí thì ngược lại, chỉ người giao mới sửa được. */
let EDITB = false;
function buocBlock(t){
  const B = t.buoc || [];
  const sua = (t.lam===me || t.giao===me) && t.tt!=="HOAN_THANH";
  const tick = t.lam===me && t.tt!=="HOAN_THANH";
  if (!B.length && !sua) return "";
  const xong = B.filter(x=>x.d).length;
  let h = `<div class="blk"><div class="blk-h row2">
      <span>Các bước thực hiện${B.length?` — ${xong}/${B.length} đã làm`:""}</span>
      ${sua?`<button class="ed" onclick="EDITB=${!EDITB};renderDw()">${EDITB?"Xong":B.length?"Sửa các bước":"Thêm các bước"}</button>`:""}
      </div><div class="blk-b">`;
  if (!B.length){
    h += `<div style="font-size:13px;color:var(--mute)">Chưa có bước nào. Đây là <b>gợi ý cách làm</b>,
      không phải điều kiện nghiệm thu — tích hết các bước cũng không làm việc thành xong,
      và bỏ trống cũng không sao.</div>`;
  } else if (EDITB && sua){
    h += B.map((c,i)=>`<div class="tce">
        <input class="inp" value="${esc(c.t)}" onchange="buocSua(${i},this.value)">
        <button class="k" onclick="buocXoa(${i})" title="Bỏ bước này">✕</button></div>`).join("");
  } else {
    h += B.map((c,i)=>`<div class="chk ${c.d?"done":""}" data-lock="${tick?0:1}">
        <input type="checkbox" ${c.d?"checked":""} ${tick?"":"disabled"} onchange="buocTick(${i})" id="bw${i}">
        <label for="bw${i}">${esc(c.t)}</label></div>`).join("");
  }
  if (EDITB && sua) h += `<button class="btn sm" onclick="buocThem()">+ Thêm bước</button>
    <div class="warn">Các bước <b>không tính vào tiến độ</b> — tiến độ chỉ dựa vào tiêu chí nghiệm thu.
    Người thực hiện được tự sửa các bước vì đó là cách làm của mình, khác với tiêu chí nghiệm thu
    chỉ người giao mới đổi được.</div>`;
  return h + `</div></div>`;
}
function buocTick(i){ CUR.buoc[i].d = !CUR.buoc[i].d; renderDw(); }
function buocThem(){ (CUR.buoc = CUR.buoc || []).push({t:"",d:false}); renderDw();
  const e = document.querySelectorAll(".tce .inp"); if (e.length) e[e.length-1].focus(); }
function buocSua(i, v){
  v = v.trim(); if (!v) { CUR.buoc.splice(i,1); return renderDw(); }
  CUR.buoc[i].t = v; renderDw();
}
function buocXoa(i){ CUR.buoc.splice(i,1); renderDw(); }

function ghi(k, x){
  CUR.log.push({w:U[me].ten, k, t:NOW, s:1, x:x||""});
}
function baoKia(txt, ic){
  const kia = CUR.lam===me ? CUR.giao : CUR.lam;
  NT.unshift({to:kia, ic:ic||"a", tx:txt, tm:NOW, un:1, go:CUR.id});
}
function hoanTrangThai(){
  if (CUR.tt === "CHO_DUYET"){
    CUR.tt = "DANG_LAM";
    ghi("yêu cầu đổi nên việc quay về Đang làm");
    toast("Yêu cầu đã đổi — việc quay về Đang làm để người thực hiện làm nốt");
  }
}
function tcSua(i, v){
  v = v.trim(); const cu = CUR.tc[i].t;
  if (!v || v === cu) return renderDw();
  CUR.tc[i].t = v;
  if (CUR.tc[i].d){ CUR.tc[i].d = false; }        /* nội dung đổi thì phải tích lại */
  ghi("sửa tiêu chí", `“${cu}” → “${v}”`);
  baoKia(`<b>${U[me].ten}</b> sửa tiêu chí nghiệm thu của việc <b>${esc(CUR.ttl)}</b>`);
  hoanTrangThai(); renderDw(); drawNav(); drawNoti();
}
function tcThem(){
  CUR.tc.push({t:"", d:false});
  renderDw();
  const els = document.querySelectorAll(".tce .inp");
  if (els.length) els[els.length-1].focus();
}
function tcXoa(i){
  const c = CUR.tc[i];
  if (!c.t.trim()){ CUR.tc.splice(i,1); return renderDw(); }
  if (!confirm(`Bỏ tiêu chí này?\n\n“${c.t}”` + (c.d ? "\n\nTiêu chí này người thực hiện ĐÃ TÍCH ĐẠT." : ""))) return;
  CUR.tc.splice(i,1);
  ghi("bỏ tiêu chí", `“${c.t}”${c.d ? " (người thực hiện đã tích đạt trước đó)" : ""}`);
  baoKia(`<b>${U[me].ten}</b> bỏ một tiêu chí của việc <b>${esc(CUR.ttl)}</b>`);
  renderDw(); drawNav(); drawNoti();
}
/* --- đề nghị từ người thực hiện --- */
function moDeXuat(){
  const t = CUR;
  $("#mdlC").innerHTML = `
    <div class="mdl-h"><h3>Đề nghị sửa tiêu chí nghiệm thu</h3>
      <p>Bạn không tự sửa được chuẩn nghiệm thu của chính mình. Đề nghị này gửi cho ${esc(U[t.giao].ten)} bấm đồng ý.</p></div>
    <div class="mdl-b">
      <div class="fld"><label>Loại đề nghị</label>
        <div class="pick" id="dxL">
          <button class="on" data-v="THEM" onclick="pickDx(this)">+ Thêm tiêu chí</button>
          <button data-v="BOT" onclick="pickDx(this)">✕</button></div></div>
      <div class="fld"><label>Nội dung <span class="hint">— ghi rõ tiêu chí nào và vì sao</span></label>
        <textarea class="inp" id="dxN" placeholder="Ví dụ: Xin bỏ tiêu chí “Số dư khớp sao kê từng tài khoản” cho tài khoản Vietcombank vì ngân hàng chưa trả sao kê, và thêm tiêu chí liệt kê riêng các giao dịch chưa về."></textarea></div>
    </div>
    <div class="mdl-f"><button class="btn" onclick="dongCham()">Huỷ</button>
      <button class="btn p" onclick="guiDeXuat()">Gửi đề nghị</button></div>`;
  $("#mdl").classList.add("on");
}
function pickDx(b){ b.parentNode.querySelectorAll("button").forEach(x=>x.classList.remove("on")); b.classList.add("on"); }
function guiDeXuat(){
  const nd = $("#dxN").value.trim();
  if (!nd) return toast("Chưa ghi nội dung đề nghị");
  const loai = $("#dxL button.on").dataset.v;
  (CUR.dexuat = CUR.dexuat || []).push({loai, nd, boi:U[me].ten, luc:NOW});
  ghi(`đề nghị ${loai==="THEM"?"thêm":"bỏ"} một tiêu chí`, nd);
  baoKia(`<b>${U[me].ten}</b> đề nghị sửa tiêu chí việc <b>${esc(CUR.ttl)}</b>`);
  dongCham(); renderDw(); drawNav(); drawNoti();
  toast("Đã gửi đề nghị — tiêu chí chưa đổi cho tới khi người giao đồng ý");
}
function dxOk(i){
  const d = CUR.dexuat[i];
  if (d.loai === "THEM") CUR.tc.push({t:d.nd, d:false});
  CUR.dexuat.splice(i,1);
  ghi(`đồng ý đề nghị ${d.loai==="THEM"?"thêm":"bỏ"} tiêu chí của ${d.boi}`, d.nd);
  baoKia(`<b>${U[me].ten}</b> đồng ý đề nghị sửa tiêu chí việc <b>${esc(CUR.ttl)}</b>`, "g");
  if (d.loai === "BOT") { EDIT = true; toast("Đã đồng ý — mở chế độ sửa để bạn bỏ đúng tiêu chí"); }
  else toast("Đã thêm tiêu chí theo đề nghị");
  hoanTrangThai(); renderDw(); drawNav(); drawNoti();
}
function dxNo(i){
  const d = CUR.dexuat[i]; CUR.dexuat.splice(i,1);
  ghi(`từ chối đề nghị sửa tiêu chí của ${d.boi}`, d.nd);
  baoKia(`<b>${U[me].ten}</b> từ chối đề nghị sửa tiêu chí việc <b>${esc(CUR.ttl)}</b>`, "r");
  renderDw(); drawNav(); drawNoti(); toast("Đã từ chối — tiêu chí giữ nguyên");
}

/* =====================  TỆP ĐÍNH KÈM  =====================
   Ba giai đoạn: GIAO (tài liệu đầu vào) · LAM (bản nháp) · NOP (sản phẩm nộp).
   Trùng tên thì lên bản mới, bản cũ vẫn giữ. Gỡ tệp là đánh dấu đã gỡ, không xoá khỏi nhật ký.
   ========================================================== */
const EXT_IC = {pdf:"pdf", xlsx:"xls", xls:"xls", csv:"xls", doc:"doc", docx:"doc",
                png:"img", jpg:"img", jpeg:"img", gif:"img", webp:"img"};
function extOf(n){ return (n.split(".").pop()||"").toLowerCase(); }
function kbTxt(kb){ return kb >= 1024 ? (kb/1024).toFixed(1)+" MB" : Math.max(1,Math.round(kb))+" KB"; }
function giaiDoan(t){ return t.tt==="CHO_DUYET" ? "NOP" : (t.giao===me && t.lam!==me) ? "GIAO" : "LAM"; }

function fileBlock(t){
  const F = t.files || [];
  const song = F.filter(f=>!f.go);
  const G = {GIAO:[], LAM:[], NOP:[]};
  song.forEach(f => G[f.gd] ? G[f.gd].push(f) : G.LAM.push(f));
  const TEN = {GIAO:"Tài liệu người giao gửi kèm", LAM:"Tài liệu trong quá trình làm", NOP:"Sản phẩm nộp"};
  const moFile = t.tt !== "HOAN_THANH" && (t.lam===me || t.giao===me);

  let h = `<div class="blk"><div class="blk-h row2">
      <span>Tệp đính kèm — ${song.length} tệp${F.length>song.length?`, ${F.length-song.length} đã gỡ`:""}</span>
      </div><div class="blk-b">`;

  if (!song.length && !moFile)
    h += `<div style="font-size:13px;color:var(--mute)">Chưa có tệp nào.</div>`;

  for (const k of ["GIAO","LAM","NOP"]){
    if (!G[k].length) continue;
    h += `<div class="gd">${TEN[k]}<span class="ln"></span></div>`;
    h += G[k].map(f=>flHTML(t,f)).join("");
  }
  const goRoi = F.filter(f=>f.go);
  if (goRoi.length){
    h += `<div class="gd">Đã gỡ<span class="ln"></span></div>` + goRoi.map(f=>flHTML(t,f)).join("");
  }

  if (moFile){
    h += `<div class="dz" id="dz" onclick="document.getElementById('fi').click()"
        ondragover="event.preventDefault();this.classList.add('hot')"
        ondragleave="this.classList.remove('hot')"
        ondrop="dropFile(event,this)">
      <span class="dzi">↥</span>
      <b>Kéo tệp vào đây hoặc bấm để chọn</b>
      <span class="dzm">Xếp vào mục <b>${TEN[giaiDoan(t)].toLowerCase()}</b> · trùng tên thì lên bản mới, bản cũ vẫn giữ</span>
      </div><input type="file" id="fi" multiple style="display:none" onchange="pickFile(event)">`;
    if (t.lam===me && !song.some(f=>f.ct) && (t.tt==="DANG_LAM"||t.tt==="TRA_LAI"))
      h += t.bc
        ? `<div class="warn" style="background:var(--redbg);border-color:#F0C7CC;color:var(--red)">
            <b>Việc này bắt buộc đính kèm bằng chứng.</b> Người giao đã bật yêu cầu này, nên chưa có tệp
            đánh dấu ★ sản phẩm nộp thì nút Nộp kết quả vẫn khoá.</div>`
        : `<div class="warn">Chưa có tệp nào được đánh dấu là <b>sản phẩm nộp</b>.
            Bấm dấu ★ để đánh dấu. Việc này không bắt buộc bằng chứng nên vẫn nộp được —
            sản phẩm là hành động tại chỗ thì ghi rõ trong ô trao đổi.</div>`;
  }
  return h + `</div></div>`;
}
function flHTML(t,f){
  const ic = EXT_IC[extOf(f.ten)] || "";
  const xoaDuoc = !f.go && t.tt!=="HOAN_THANH" && f.boi === U[me].ten;
  const sao = !f.go && t.tt!=="HOAN_THANH" && (t.lam===me || t.giao===me);
  return `<div class="fl ${f.go?"off":""}">
    <div class="ic ${ic}">${(extOf(f.ten)||"?").slice(0,4).toUpperCase()}</div>
    <div class="bd">
      <div class="nm">${f.url?`<a href="${f.url}" target="_blank" download="${esc(f.ten)}">${esc(f.ten)}</a>`:esc(f.ten)}
        ${f.ver>1?`<span class="tag m" style="margin-left:5px">Bản ${f.ver}</span>`:""}
        ${f.ct?`<span class="tag g" style="margin-left:5px">Sản phẩm nộp</span>`:""}</div>
      <div class="sub2"><span>${kbTxt(f.kb)}</span><span class="dot"></span>
        <span>${esc(f.boi)}</span><span class="dot"></span><span>${f.luc}</span>
        ${f.go?`<span class="dot"></span><span style="color:var(--red)">đã gỡ ${f.go}</span>`:""}</div>
    </div>
    <div class="ax">
      ${sao?`<button class="${f.ct?"on":""}" onclick="fileSao('${f.id}')" title="Đánh dấu là sản phẩm nộp">★</button>`:""}
      ${xoaDuoc?`<button onclick="fileGo('${f.id}')" title="Gỡ tệp">✕</button>`:""}
    </div></div>`;
}
function dropFile(e, el){
  e.preventDefault(); el.classList.remove("hot");
  themFile([...(e.dataTransfer.files||[])]);
}
function pickFile(e){ themFile([...e.target.files]); e.target.value = ""; }
function themFile(list){
  if (!list.length) return;
  const t = CUR, gd = giaiDoan(t);
  t.files = t.files || [];
  list.forEach(f => {
    const truoc = t.files.filter(x => x.ten === f.name && !x.go);
    const ver = truoc.length ? Math.max(...truoc.map(x=>x.ver)) + 1 : 1;
    t.files.push({id:"u"+Math.random().toString(36).slice(2,9), ten:f.name, kb:f.size/1024,
      boi:U[me].ten, luc:NOW, gd, ver, ct:(gd==="NOP"), url:URL.createObjectURL(f)});
    ghi(ver>1 ? `tải lên bản ${ver} của ${f.name}` : `đính kèm ${f.name}`);
  });
  baoKia(`<b>${U[me].ten}</b> đính kèm ${list.length} tệp vào việc <b>${esc(t.ttl)}</b>`);
  renderDw(); drawNav(); drawNoti();
  toast(list.length===1 ? `Đã đính kèm ${list[0].name}` : `Đã đính kèm ${list.length} tệp`);
}
function fileSao(id){
  const f = CUR.files.find(x=>x.id===id); f.ct = !f.ct;
  ghi(f.ct ? `đánh dấu ${f.ten} là sản phẩm nộp` : `bỏ đánh dấu sản phẩm nộp của ${f.ten}`);
  renderDw();
}
function fileGo(id){
  const f = CUR.files.find(x=>x.id===id);
  if (!confirm(`Gỡ tệp này?\n\n${f.ten}\n\nTệp vẫn nằm trong nhật ký, người khác vẫn thấy là đã từng có.`)) return;
  f.go = NOW; f.ct = false;
  ghi(`gỡ tệp ${f.ten}`);
  renderDw(); toast("Đã gỡ — vẫn giữ dấu vết trong nhật ký");
}
function noi(){
  const v = $("#say").value.trim(); if (!v) return;
  CUR.log.push({w:U[me].ten, k:"", t:NOW, s:0, x:v});
  const kia = CUR.lam===me ? CUR.giao : CUR.lam;
  NT.unshift({to:kia, ic:"", tx:`<b>${U[me].ten}</b> nhắn trong việc <b>${esc(CUR.ttl)}</b>`, tm:NOW, un:1, go:CUR.id});
  renderDw(); drawNav(); drawNoti(); toast("Đã gửi — người kia nhận thông báo ngay trong phần mềm");
}
function act(k){
  const t = CUR;
  if (k==="nhan"){
    t.tt="DANG_LAM"; t.log.push({w:U[me].ten,k:"nhận việc",t:NOW,s:1});
    toast("Đã nhận việc"); renderDw(); return;
  }
  if (k==="giuNguyen" || k==="doiHan" || k==="themNguonLuc" || k==="doiNguoi"){
    const y = t.yKien; if (!y) return;
    /* Chốt số ngày đã dừng vào t.dungNgay rồi cho đồng hồ chạy lại. */
    t.dungNgay = ngayDaDung(t);
    const ten = {giuNguyen:"giữ nguyên yêu cầu", doiHan:"đổi hạn",
                 themNguonLuc:"cấp thêm người phối hợp", doiNguoi:"đổi người thực hiện"}[k];
    if (k === "doiHan"){
      if (t.luat){ toast("Hạn pháp lý không dời được — chọn cách can thiệp khác"); return; }
      t.han_goc = t.han_goc || t.han;
      t.doi = (t.doi||0) + 1;
      const d = parse(t.han); d.setDate(d.getDate() + 5);
      t.han = fmtNgay(ngayLamViec(d));
    }
    if (k === "themNguonLuc"){
      const doi = capDuoi().filter(id => id !== t.lam && !(t.phoihop||[]).includes(id));
      const them = doi.sort((a,b)=>taiTuanNay(a)-taiTuanNay(b))[0];
      if (!them){ toast("Không còn ai trong nhóm của bạn để cấp thêm"); return; }
      (t.phoihop = t.phoihop || []).push(them);
      NT.unshift({to:them, ic:"a", tx:`<b>${U[me].ten}</b> cử bạn phối hợp việc <b>${esc(t.ttl)}</b>`, tm:NOW, un:1, go:t.id});
    }
    if (k === "doiNguoi"){
      const doi = capDuoi().filter(id => id !== t.lam);
      const moi = doi.sort((a,b)=>taiTuanNay(a)-taiTuanNay(b))[0];
      if (!moi){ toast("Không còn ai trong nhóm của bạn để chuyển việc"); return; }
      const cu = t.lam; t.lam = moi;
      (t.theodoi = t.theodoi || []).push(cu);       /* người cũ vẫn theo dõi để bàn giao */
      t.tt = "MOI";
      NT.unshift({to:moi, ic:"a", tx:`<b>${U[me].ten}</b> chuyển việc <b>${esc(t.ttl)}</b> sang bạn`, tm:NOW, un:1, go:t.id});
    }
    ghi(`trả lời ý kiến "${Y_KIEN[y.loai][0]}" bằng cách ${ten}`);
    NT.unshift({to:y.boi, ic:k==="giuNguyen"?"r":"g",
      tx:`<b>${U[me].ten}</b> trả lời ý kiến của bạn: <b>${ten}</b> — việc <b>${esc(t.ttl)}</b>`, tm:NOW, un:1, go:t.id});
    delete t.yKien;
    renderDw(); drawNav(); drawNoti();
    toast(`Đã ${ten}. Đồng hồ chạy lại, tổng dừng ${t.dungNgay} ngày đã ghi vào phiếu`);
    return;
  }
  if (k==="xinlui"){
    t.han_goc = t.han_goc || t.han;
    t.xinLui = {boi:U[me].ten, luc:NOW};
    t.log.push({w:U[me].ten,k:"",t:NOW,s:0,x:"Em xin lùi hạn, lý do: (điền lý do). Chờ người giao đồng ý."});
    NT.unshift({to:t.giao,ic:"a",tx:`<b>${U[me].ten}</b> xin lùi hạn việc <b>${esc(t.ttl)}</b>`,tm:NOW,un:1,go:t.id});
    toast("Đã gửi đề nghị lùi hạn — hạn chưa đổi cho tới khi người giao đồng ý");
    renderDw(); drawNav(); drawNoti(); return;
  }
  if (k==="nop"){
    const sp = (t.files||[]).filter(f=>!f.go && f.ct).length;
    t.tt="CHO_DUYET";
    t.nop={t:NOW, x:sp ? `Đã nộp kèm ${sp} tệp sản phẩm.` : "Nộp không kèm tệp — sản phẩm là hành động tại chỗ."};
    t.log.push({w:U[me].ten,k:`nộp kết quả${sp?` kèm ${sp} tệp sản phẩm`:" (không kèm tệp)"}, chờ duyệt`,t:NOW,s:1});
    NT.unshift({to:t.giao,ic:"",tx:`<b>${U[me].ten}</b> đã nộp <b>${esc(t.ttl)}</b>, chờ bạn duyệt`,tm:NOW,un:1,go:t.id});
    toast("Đã nộp — chuyển sang hộp duyệt của " + U[t.giao].ten);
    renderDw(); drawNav(); drawNoti(); return;
  }
  if (k==="dongYLui" || k==="tuChoiLui"){
    const ok = k === "dongYLui";
    ghi(ok ? `đồng ý lùi hạn theo đề nghị của ${t.xinLui.boi}` : `từ chối lùi hạn`);
    if (ok){ t.doi = (t.doi||0) + 1; const d = parse(t.han); d.setDate(d.getDate()+2);
      t.han = `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`; }
    NT.unshift({to:t.lam, ic:ok?"g":"r", tx:`<b>${U[me].ten}</b> ${ok?"đồng ý lùi hạn":"từ chối lùi hạn"} việc <b>${esc(t.ttl)}</b>`, tm:NOW, un:1, go:t.id});
    delete t.xinLui;
    renderDw(); drawNav(); drawNoti(); toast(ok?"Đã lùi hạn 2 ngày và ghi vào nhật ký":"Đã từ chối, hạn giữ nguyên"); return;
  }
  if (k==="duyet2"){
    const c = t.chuoi || [], bac = (t.ci||0) + 2;
    ghi(`duyệt tầng ${bac} về khoản chi ${tienTxt(t.tien)}`);
    t.ci = (t.ci||0) + 1;
    if (t.ci < c.length){
      const ke = c[t.ci];
      NT.unshift({to:ke, ic:"a", tx:`<b>${U[me].ten}</b> chuyển <b>${esc(t.ttl)}</b> lên bạn duyệt tầng ${bac+1}`, tm:NOW, un:1, go:t.id});
      renderDw(); drawNav(); drawNoti();
      toast(`Đã duyệt tầng ${bac} — chuyển tiếp ${U[ke].ten} duyệt tầng ${bac+1}`);
      return;
    }
    t.tt = "HOAN_THANH";
    NT.unshift({to:t.lam, ic:"g", tx:`<b>${U[me].ten}</b> đã duyệt tầng cuối — việc <b>${esc(t.ttl)}</b> đóng, điểm ${t.diem?t.diem.tong.toFixed(2):"—"}`, tm:NOW, un:1, go:t.id});
    if (t.diem) NT.unshift({to:nguoiDuyet(t), ic:"g", tx:`<b>${U[me].ten}</b> đã duyệt tầng cuối việc <b>${esc(t.ttl)}</b>`, tm:NOW, un:1, go:t.id});
    closeDw(); toast("Đã duyệt tầng cuối — việc đóng, điểm giữ nguyên của cấp 1"); return;
  }
  if (k==="tralai2"){
    t.tt = "CHO_DUYET"; t.ci = 0;
    ghi("trả về người duyệt cấp 1 xem lại");
    NT.unshift({to:nguoiDuyet(t), ic:"r", tx:`<b>${U[me].ten}</b> trả việc <b>${esc(t.ttl)}</b> về bạn xem lại`, tm:NOW, un:1, go:t.id});
    renderDw(); drawNav(); drawNoti(); toast("Đã trả về người duyệt cấp 1"); return;
  }
  if (k==="tralai"){
    t.tt="TRA_LAI"; t.tralai="Cần bổ sung trước khi duyệt.";
    t.log.push({w:U[me].ten,k:"trả lại để làm tiếp",t:NOW,s:1});
    NT.unshift({to:t.lam,ic:"r",tx:`<b>${U[me].ten}</b> trả lại việc <b>${esc(t.ttl)}</b>`,tm:NOW,un:1,go:t.id});
    toast("Đã trả lại — việc quay về người thực hiện");
    renderDw(); drawNav(); drawNoti(); return;
  }
}

/* =====================  CHẤM ĐIỂM  ===================== */
let SC = {cl:0, cd:0, ht:0};
/* Đúng hạn tính từ NGÀY NỘP THẬT so với hạn, không phải từ ngày hôm nay. */
function ngayNop(t){
  if (!t.nop) return d2(TODAY);
  const m = String(t.nop.t).match(/^(\d{2})\/(\d{2})/);
  return m ? new Date(TODAY.getFullYear(), Number(m[2])-1, Number(m[1])) : d2(TODAY);
}
function dhAuto(t){
  const n = Math.round((d2(parse(t.han)) - ngayNop(t)) / 86400000);  /* nộp sớm bao nhiêu ngày */
  if (n >=  2) return 5;
  if (n >=  0) return 4;
  if (n >= -2) return 3;
  return 1;
}
function tinh(t){
  const dh = dhAuto(t);
  return (SC.cl*0.45 + dh*0.30 + SC.cd*0.15 + SC.ht*0.10);
}
function moCham(){ SC={cl:0,cd:0,ht:0}; renderCham(); $("#mdl").classList.add("on"); }
function dongCham(){ $("#mdl").classList.remove("on"); }
function setSC(k,v){ SC[k]=v; renderCham(); }
function renderCham(){
  const t = CUR, dh = dhAuto(t), tong = tinh(t), du = SC.cl && SC.cd && SC.ht;
  const nhan = ["","Chưa đạt","Cần cải thiện","Đạt yêu cầu","Tốt","Xuất sắc"];
  const bar = (k,l,w,h) => `<div class="sc"><div class="lb"><b>${l}</b><i>${w} · ${SC[k]?nhan[SC[k]]:"chưa chấm"}</i></div>
      <div class="stars">${[1,2,3,4,5].map(v=>`<button class="${SC[k]===v?"on":""}" onclick="setSC('${k}',${v})">${v}</button>`).join("")}</div>
      <div style="font-size:12px;color:var(--mute);margin-top:5px">${h}</div></div>`;
  $("#mdlC").innerHTML = `
    <div class="mdl-h"><h3>Duyệt và chấm điểm</h3>
      <p>${esc(t.ttl)} · ${U[t.lam].ten} · độ khó ${t.dk}</p></div>
    <div class="mdl-b">
      ${bar("cl","Chất lượng kết quả","45%","Sản phẩm nộp có đúng cái đã yêu cầu không, có phải làm lại không.")}
      <div class="sc"><div class="lb"><b>Đúng hạn</b><i>30% · hệ thống tự tính</i></div>
        <div class="auto">Nộp lúc <b>${t.nop?t.nop.t:"—"}</b>, hạn <b>${t.han}</b>
        — ${(()=>{const n=Math.round((d2(parse(t.han))-ngayNop(t))/86400000);
                  return n>0?`sớm ${n} ngày`:n===0?"đúng ngày hạn":`trễ ${-n} ngày`;})()} → <b>${dh}/5</b>.
        Người duyệt không sửa được ô này, vì ngày tháng là dữ liệu chứ không phải cảm nhận.</div></div>
      ${bar("cd","Chủ động","15%","Có tự báo sớm khi vướng không, hay để đến hạn mới nói.")}
      ${bar("ht","Hợp tác","10%","Có hỗ trợ người khác, có trả lời khi được hỏi không.")}
      <div class="fld"><label>Nhận xét <span class="hint">— một câu cụ thể, người nhận đọc mới thấy có ích</span></label>
        <textarea class="inp" id="nx" placeholder="Ví dụ: Làm sớm 1 ngày, chủ động báo sai lệch chấm công trước khi chi."></textarea></div>
      <div class="tot"><div><div class="l">Điểm việc này</div>
        <div style="font-size:12px;opacity:.75;margin-top:3px">45% chất lượng · 30% đúng hạn · 15% chủ động · 10% hợp tác</div></div>
        <div class="v">${du?tong.toFixed(2):"—"}</div></div>
    </div>
    <div class="mdl-f">
      <button class="btn" onclick="dongCham()">Huỷ</button>
      <button class="btn d" onclick="chotDiem()" ${du?"":"disabled"}>Duyệt và chấm điểm</button>
    </div>`;
}
function chotDiem(){
  const t = CUR, dh = dhAuto(t), tong = tinh(t);
  const nx = ($("#nx")||{}).value || "";
  t.diem = {cl:SC.cl, cd:SC.cd, ht:SC.ht, dh, tong, boi:NOW, ai:U[me].ten, nx:nx.trim()};
  const chuoi = chuoiDuyetThem(t);
  const d2 = chuoi[0] || null;
  if (d2){
    t.chuoi = chuoi; t.ci = 0; t.tt = "CHO_DUYET_2";
    t.log.push({w:U[me].ten, k:`duyệt cấp 1 và chấm điểm ${tong.toFixed(2)}, chuyển ${chuoi.map(x=>U[x].ten).join(" rồi ")} duyệt giá trị`, t:NOW, s:1});
    NT.unshift({to:d2, ic:"a", tx:`<b>${U[me].ten}</b> chuyển <b>${esc(t.ttl)}</b> lên bạn duyệt vì khoản chi ${tienTxt(t.tien)} vượt ngưỡng`, tm:NOW, un:1, go:t.id});
    NT.unshift({to:t.lam, ic:"", tx:`<b>${U[me].ten}</b> đã duyệt <b>${esc(t.ttl)}</b> — điểm ${tong.toFixed(2)}, đang chờ ${U[d2].ten} duyệt giá trị`, tm:NOW, un:1, go:t.id});
    dongCham(); closeDw();
    toast(`Đã chấm ${tong.toFixed(2)} — việc vượt ngưỡng nên chuyển ${U[d2].ten} duyệt thêm một tầng`);
    return;
  }
  t.tt = "HOAN_THANH";
  t.log.push({w:U[me].ten, k:`duyệt và chấm điểm ${tong.toFixed(2)}`, t:NOW, s:1});
  NT.unshift({to:t.lam, ic:"g", tx:`<b>${U[me].ten}</b> đã duyệt <b>${esc(t.ttl)}</b> — điểm ${tong.toFixed(2)}`, tm:NOW, un:1, go:t.id});
  dongCham(); closeDw();
  toast(`Đã duyệt và chấm ${tong.toFixed(2)} — điểm vào sổ, cuối tháng không chấm lại`);
}

/* =====================  THÔNG BÁO  ===================== */
function drawNoti(){
  const l = NT.filter(n => n.to === me);
  $("#ntL").innerHTML = l.length ? l.map((n,i)=>`
    <div class="nt-i ${n.un?"un":""}" onclick="fromNoti(${NT.indexOf(n)})">
      <div class="ic ${n.ic}">${n.ic==="r"?"!":n.ic==="g"?"✓":n.ic==="a"?"→":"•"}</div>
      <div><div class="tx">${n.tx}</div><div class="tm">${n.tm}</div></div></div>`).join("")
    : `<div class="empty" style="padding:26px">Chưa có thông báo.</div>`;
}
function fromNoti(i){
  const n = NT[i]; n.un = 0; $("#nt").classList.remove("on");
  if (n.go) openDw(n.go); else { drawNav(); drawNoti(); }
}
function readAll(){ NT.forEach(n=>{ if(n.to===me) n.un=0; }); drawNav(); drawNoti(); }

/* =====================  ĐỔI VAI  ===================== */
$("#who").onclick = e => { e.stopPropagation(); $("#nt").classList.remove("on"); $("#menu").classList.toggle("on"); };
/* Đổi vai phải TRẢ SẠCH mọi trạng thái giao diện, không chỉ tab và phiếu đang mở.
   Rà soát bắt được ba thứ còn treo sang vai mới: cấp báo cáo Giao ban (vai mới có thể
   không có quyền mở cấp đó), danh sách đang bung sau một ô số, và bộ lọc Cá nhân.
   Trạng thái treo qua vai khác là loại lỗi người dùng không báo được vì họ tưởng
   phần mềm "nhớ" — trong khi đó là dữ liệu của người khác. */
function doiVai(id){
  me = id; TAB = "toi"; CUR = null; FRM = null;
  ONG_BGD = 1;                 /* mỗi vai vào lại từ ống kính mặc định của vai đó */
  AI_MO = false; AI_PHIEN = []; AI_HOI = ""; AI_GOI_XEM = null;   /* hỏi đáp của vai cũ không mang sang vai mới */
  BC_CAP = "CTY"; BC_DV = "TAT_CA"; BC_MO = null; BC_LECH = 0; KHOI_MO = null;
  BC_MAN = "bc"; DG_TANG = "KHOI"; DG_LECH = 0; DG_MO = null; DG_KY = "THANG";
  chuanBC();      /* ép ngay về cấp mà vai mới được phép, đừng đợi tới lượt vẽ Giao ban */
  SO_MO = null; CN_MO = null; CN_TIM = ""; CN_DV = "TAT_CA";
  NS_CHUY = 0; NS_DV = "TAT_CA"; NS_VT = "TAT_CA"; NS_TT = "TAT_CA"; NS_TIM = ""; NS_XEP = "tre";
  ND_MO = new Set(); ZIP = new Set(); MO_HET = new Set();
  DN_TAB = "tin"; DN_SUA = null;
  TC_SUA = null; TC_MOI = null; TC_CHON = null; TC_TAB = "cay";
  TC_LOC_DV = "TAT_CA"; TC_LOC_VT = "TAT_CA"; TC_TIM = "";
  DA_MO = null; DA_XEM_K = "the"; TAO_MO = false; EM_XEM = null; CK_SUA = null;
  F = {ng:"TAT_CA", da:"TAT_CA", vai:"TAT_CA", dv:"TAT_CA"}; DH_DV = "TAT_CA";
  $("#menu").classList.remove("on");
  $("#dw").classList.remove("on"); $("#scrim").classList.remove("on"); $("#nt").classList.remove("on");
  draw(); toast("Đang xem với vai " + U[me].ten + " — " + U[me].cd);
}
function chonAnh(){ $("#avin").click(); }
function doiAnh(e){
  const f = e.target.files && e.target.files[0]; e.target.value = "";
  if (!f) return;
  if (!f.type.startsWith("image/")) return toast("Chỉ nhận tệp ảnh");
  U[me].anh = URL.createObjectURL(f);
  $("#menu").classList.remove("on");
  if (CUR) renderDw();
  draw(); toast("Đã đổi ảnh đại diện của " + U[me].ten);
}
function xoaAnh(){
  delete U[me].anh; $("#menu").classList.remove("on");
  if (CUR) renderDw(); draw(); toast("Đã bỏ ảnh, quay về chấm chữ cái đầu");
}
$("#bell").onclick = e => { e.stopPropagation(); $("#nt").classList.toggle("on"); };
document.addEventListener("click", e => {
  if (!e.target.closest(".nt")   && !e.target.closest("#bell")) $("#nt").classList.remove("on");
  if (!e.target.closest(".menu") && !e.target.closest("#who"))  $("#menu").classList.remove("on");
  if (CN_MO && !e.target.closest(".cn")){ CN_MO = null; CN_TIM = ""; draw(); }
});
document.addEventListener("keydown", e => { if (e.key==="Escape"){ dongCham(); closeDw();
  if (TAO_MO){ TAO_MO = false; draw(); }
  if (CN_MO){ CN_MO = null; CN_TIM = ""; draw(); } } });

/* Gieo một lần lúc khởi động: gắn loại bằng chứng cho những việc khớp danh mục nghiệp vụ,
   và đặt trạng thái riêng cho một việc đang chờ bên ngoài. Không gieo thì ba danh mục
   vừa nối vẫn hiện 0/88 khi mở phần mềm, và người xem tưởng chưa làm. */
(function gieoDanhMuc(){
  let n = 0;
  T.forEach(t => { if (t.bcLoai) return;
    const o = bangChungCho(t.ttl, t.sp);
    if (o){ t.bcLoai = o.bc; if (o.bat) t.bc = true; n++; } });
  const kho = T.find(t => viecMo(t) && t.tt === "DANG_LAM" && U[t.lam] && trongDV(t.lam, "KHO"));
  if (kho) kho.ttRieng = "KHO_SOLIEU";
  const pc = T.find(t => viecMo(t) && t.tt === "DANG_LAM" && U[t.lam] && trongDV(t.lam, "PC"));
  if (pc) pc.ttRieng = "PC_DOITAC";
})();


try{draw()}catch(e){globalThis.__drawErr=String(e)}
