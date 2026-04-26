/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface News {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
}

export const NEWS: News[] = [
  {
    id: '1',
    title: 'VNDIRECT tổ chức thành công Đại hội đồng cổ đông thường niên năm 2024',
    excerpt: 'Đại hội đã thông qua nhiều kế hoạch quan trọng nhằm thúc đẩy tăng trưởng bền vững trong giai đoạn tới.',
    content: 'Tại Đại hội đồng cổ đông thường niên năm 2024, Ban lãnh đạo VNDIRECT đã chia sẻ về kết quả kinh doanh ấn tượng trong năm qua và định hướng chiến lược tập trung vào chuyển đổi số và nâng cao trải nghiệm khách hàng. Các cổ đông đã tham gia thảo luận sôi nổi và thống nhất cao với các tờ trình về phương án phân phối lợi nhuận, kế hoạch tăng vốn và bầu bổ sung thành viên Hội đồng quản trị.',
    date: '26/04/2024',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    title: 'VNDIRECT công bố chiến lược "Hành trình cổ đông 2.0"',
    excerpt: 'Chương trình nhằm gắn kết và tri ân các cổ đông đã đồng hành cùng công ty trong suốt chặng đường phát triển.',
    content: 'Chiến lược "Hành trình cổ đông 2.0" không chỉ tập trung vào các giá trị tài chính mà còn mở rộng sang hệ sinh thái các đặc quyền ưu đãi vượt trội. VNDIRECT cam kết mang đến những giá trị thực chất thông qua sự kết hợp với các đối tác chiến lược như PTI, Anvie Life và các giải pháp công nghệ VNDGO.',
    date: '24/04/2024',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    title: 'Thông điệp từ Chủ tịch HĐQT VNDIRECT tại kỳ đại hội 2024',
    excerpt: '"Sự tin tưởng của cổ đông là động lực lớn nhất để chúng tôi không ngừng sáng tạo và đổi mới."',
    content: 'Trong bài phát biểu khai mạc, Chủ tịch HĐQT đã nhấn mạnh tầm quan trọng của việc xây dựng một cộng đồng đầu tư văn minh và thịnh vượng. VNDIRECT sẽ tiếp tục là người bạn đồng hành tin cậy, giúp khách hàng và cổ đông tối ưu hóa nguồn lực tài chính của mình.',
    date: '25/04/2024',
    image: 'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?auto=format&fit=crop&q=80&w=800',
  }
];

export type VoucherCategory = 'All' | 'VNDGO' | 'PTI Care' | 'Anvie Life';

export interface Voucher {
  id: string;
  title: string;
  description: string;
  category: VoucherCategory;
  discount: string;
  image: string;
}

export type VerificationStep = 'START' | 'IDENTIFYING' | 'EXISTING_USER' | 'NEW_USER' | 'WELCOME_BACK' | 'CONSENT' | 'OTP' | 'PROCESSING_SYSTEMS' | 'RESULT';

export type UserStatus = 'UNKNOWN' | 'GUEST' | 'SHAREHOLDER_NO_ACCOUNT' | 'SHAREHOLDER_ACTIVE';

export const VOUCHERS: Voucher[] = [
  {
    id: '1',
    title: 'VNDGO Premium Bundle',
    description: 'Ưu đãi đặc quyền trải nghiệm dịch vụ tài chính cao cấp.',
    category: 'VNDGO',
    discount: 'Giảm 20%',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800',
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
