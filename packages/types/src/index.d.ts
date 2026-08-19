// @ftms/types — kiểu dữ liệu API (tên trường tiếng Việt đúng như prototype/số vàng).
// Ranh giới duy nhất giữa client và api — client không import gì khác từ api.
export type TrangThai = 'MOI' | 'DANG_LAM' | 'CHO_DUYET' | 'CHO_DUYET_2' | 'HOAN_THANH' | 'TRA_LAI';
export type LoaiViec = 'CONG_VIEC' | 'DU_AN' | 'CHU_KY' | 'DOT_XUAT';
export type MucMat = 'CONG_KHAI' | 'NOI_BO' | 'HAN_CHE';

export interface TieuChi { t: string; d: boolean; }
export interface Diem { cl: number; dh: number; cd: number; ht: number; tong: number; ai: string; nx?: string; }
export interface PhieuViec {
  id: string; ttl: string; tt: TrangThai; loai: LoaiViec;
  giao: string; lam: string; bd: string; han: string; han_goc: string;
  dk: 1 | 2 | 3 | 5 | 8; ah: number; kc: number; doi: number;
  mat?: MucMat; sp: string; tc: TieuChi[]; phoihop: string[]; theodoi?: string[];
  tien?: number | string; luat?: boolean; lap?: string; nguon?: string;
  diem?: Diem; cha?: string | null; truoc?: string[]; moc?: boolean;
  // chỉ số máy chủ tính kèm
  quaHan: boolean; dangDung: boolean; ngayDaDung: number; hanThuc: string;
  conLai: number; uuTien: { bac: number; diem: number }; tienDo: number;
  raci: { R: string[]; A: string[]; C: string[]; I: string[] };
}
export interface NhanSu { id: string; ten: string; tat: string; cd: string; dv: string; vt: string; anh?: string; }
export interface ThongBao { to: string; ic: string; tx: string; tm: string; un: 0 | 1; go?: string; }
