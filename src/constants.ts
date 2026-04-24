/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type VoucherCategory = 'All' | 'VNDGO' | 'PTI Care' | 'Anvie Life';

export interface Voucher {
  id: string;
  title: string;
  description: string;
  category: VoucherCategory;
  discount: string;
  image: string;
}

export type VerificationStep = 'CONTACT' | 'OTP' | 'RESULT';

export type UserStatus = 'UNKNOWN' | 'GUEST' | 'SHAREHOLDER_NO_ACCOUNT' | 'SHAREHOLDER_ACTIVE';

export const VOUCHERS: Voucher[] = [
  {
    id: '1',
    title: 'VNDGO Premium Bundle',
    description: 'Ưu đãi đặc quyền trải nghiệm dịch vụ tài chính cao cấp.',
    category: 'VNDGO',
    discount: 'Giảm 20%',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    title: 'PTI Care - Bảo hiểm sức khỏe',
    description: 'An tâm sống khỏe với gói bảo hiểm toàn diện từ PTI.',
    category: 'PTI Care',
    discount: 'Giảm 30%',
    image: 'https://images.unsplash.com/photo-1505751172107-1d960ba3c3b7?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    title: 'Anvie Life - Gói nghỉ dưỡng',
    description: 'Tận hưởng kỳ nghỉ sang trọng tại các hệ thống resort Anvie.',
    category: 'Anvie Life',
    discount: 'Voucher 1,000,000đ',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '4',
    title: 'VNDGO Investment Bot',
    description: 'Miễn phí sử dụng iBot tư vấn đầu tư trong 3 tháng.',
    category: 'VNDGO',
    discount: 'Free 3 Months',
    image: 'https://images.unsplash.com/photo-1611974714158-f899986b2401?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '5',
    title: 'PTI Auto - Bảo hiểm xe cơ giới',
    description: 'Bảo vệ xế yêu với chi phí tối ưu nhất.',
    category: 'PTI Care',
    discount: 'Ưu đãi 15%',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '6',
    title: 'Anvie Life Wellness Center',
    description: 'Liệu trình chăm sóc sức khỏe đặc biệt dành cho cổ đông.',
    category: 'Anvie Life',
    discount: 'Giảm 50% lần đầu',
    image: 'https://images.unsplash.com/photo-1544161515-4af6b1d462c2?auto=format&fit=crop&q=80&w=800',
  }
];

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  summary: string;
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'n1',
    title: 'VNDIRECT công bố kết quả kinh doanh quý 1 năm 2024',
    date: '15/04/2024',
    category: 'Báo cáo tài chính',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800',
    summary: 'Doanh thu hoạt động tăng trưởng mạnh mẽ, khẳng định vị thế dẫn đầu thị trường môi giới chứng khoán.'
  },
  {
    id: 'n2',
    title: 'Thông báo mời họp Đại hội Đồng cổ đông thường niên 2024',
    date: '10/04/2024',
    category: 'Sự kiện',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    summary: 'Đại hội sẽ thảo luận về kế hoạch kinh doanh và phân phối lợi nhuận năm 2024.'
  },
  {
    id: 'n3',
    title: 'VNDIRECT nhận giải thưởng Công nghệ tài chính tiêu biểu',
    date: '05/04/2024',
    category: 'Giải thưởng',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800',
    summary: 'Hệ thống D-BOARD tiếp tục được vinh danh nhờ sự đổi mới và ổn định vượt trội.'
  },
  {
    id: 'n4',
    title: 'Chiến lược đầu tư năm 2024: Cơ hội từ các ngành thế mạnh',
    date: '01/04/2024',
    category: 'Phân tích',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    summary: 'Các chuyên gia VNDIRECT nhận định về xu hướng dòng tiền trong bối cảnh vĩ mô mới.'
  }
];
