/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Bell, 
  User, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Mail, 
  Phone, 
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Menu,
  X,
  Copy,
  Check,
  Ticket,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { 
  VOUCHERS, 
  VoucherCategory, 
  Voucher, 
  VerificationStep, 
  UserStatus,
  NEWS_ITEMS,
  NewsItem
} from './constants';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<VoucherCategory>('All');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState<VerificationStep>('CONTACT');
  const [status, setStatus] = useState<UserStatus>('UNKNOWN');
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const filteredVouchers = useMemo(() => {
    if (activeCategory === 'All') return VOUCHERS;
    return VOUCHERS.filter(v => v.category === activeCategory);
  }, [activeCategory]);

  const handleStartVerification = () => {
    setIsVerifying(true);
    setVerificationStep('CONTACT');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contact) {
      setVerificationStep('OTP');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = () => {
    if (contact.toLowerCase().includes('guest')) {
      setStatus('GUEST');
    } else if (contact.toLowerCase().includes('noaccount')) {
      setStatus('SHAREHOLDER_NO_ACCOUNT');
    } else {
      setStatus('SHAREHOLDER_ACTIVE');
    }
    setVerificationStep('RESULT');
  };

  const handleClaimVoucher = (voucher: Voucher) => {
    if (status === 'SHAREHOLDER_ACTIVE') {
      setIsClaiming(true);
      setSelectedVoucher(voucher);
    } else {
      handleStartVerification();
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('VNDIRECT2024');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const resetFlow = () => {
    setIsVerifying(false);
    setVerificationStep('CONTACT');
    setStatus('UNKNOWN');
    setContact('');
    setOtp(['', '', '', '', '', '']);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1D1D1F] font-sans selection:bg-[#F27D26]/10 selection:text-[#F27D26] scroll-smooth">
      {/* Navbar */}
      <nav id="top" className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-11 h-11 bg-[#F27D26] rounded-xl flex items-center justify-center shadow-lg shadow-[#F27D26]/20 group-hover:scale-105 group-hover:rotate-3 transition-transform">
              <span className="text-white font-bold text-2xl">V</span>
            </div>
            <div className="hidden xs:block">
              <h1 className="font-bold text-xl leading-none tracking-tight">VNDIRECT</h1>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mt-1">Shareholder Portal</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Đại hội cổ đông', href: '#dhcd' },
              { label: 'Vouchers', href: '#vouchers' },
              { label: 'Tin tức', href: '#news' }
            ].map((item) => (
              <a key={item.label} href={item.href} className="text-sm font-semibold text-gray-600 hover:text-[#F27D26] transition-colors relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F27D26] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {status === 'UNKNOWN' ? (
              <button 
                id="btn-verify"
                onClick={handleStartVerification}
                className="bg-[#1D1D1F] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-800 transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-gray-200"
              >
                <ShieldCheck size={18} />
                Xác nhận cổ đông
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shadow-sm">
                  <User size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Cổ đông</span>
                  <span className="text-sm font-bold leading-none">{contact}</span>
                </div>
                <button onClick={resetFlow} className="ml-2 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                  <X size={16} />
                </button>
              </div>
            )}
            <button className="p-2.5 text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-xl md:hidden">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="dhcd" className="relative py-20 lg:py-32 overflow-hidden border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 text-[#F27D26] rounded-full text-xs font-bold uppercase tracking-widest mb-8">
                <Sparkles size={14} />
                Đặc quyền Hội đồng cổ đông 2024
              </div>
              <h2 className="text-5xl md:text-7xl font-[900] tracking-tight mb-8 leading-[1.05]">
                Tri Ân Đồng Hành <br />
                <span className="text-[#F27D26] italic font-serif">Ngàn Ưu Đãi Vàng</span>
              </h2>
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-12 font-medium">
                VNDIRECT trân trọng gửi tới Quý cổ đông bộ sưu tập Voucher độc quyền từ các đối tác chiến lược trong hệ sinh thái. Xác thực ngay để tận hưởng ưu đãi.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={handleStartVerification}
                  className="px-8 py-4 bg-[#F27D26] text-white rounded-2xl font-bold hover:bg-[#D96C1F] hover:shadow-2xl hover:shadow-[#F27D26]/30 transition-all flex items-center gap-3 active:scale-[0.98]"
                >
                  Bắt đầu xác thực <ArrowRight size={20} />
                </button>
                <div className="flex items-center gap-4 px-6 border-l border-gray-200">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden`}>
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                      </div>
                    ))}
                  </div>
                  <div className="text-xs font-bold text-gray-400">
                    <span className="text-[#1D1D1F]">10,000+</span> cổ đông <br /> đã nhận voucher
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-50/50 to-transparent -z-0 opacity-50" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#F27D26] rounded-full blur-[160px] opacity-[0.08] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-blue-100 rounded-full blur-[120px] opacity-[0.4] pointer-events-none" />
      </header>

      {/* Main Content */}
      <main id="vouchers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-32">
        {/* Cases Notifications */}
        <AnimatePresence>
          {status === 'GUEST' && (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border-2 border-red-100 rounded-[32px] p-8 mb-16 flex flex-col md:flex-row items-center gap-6 shadow-2xl shadow-red-500/5 overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-red-500" />
              <div className="bg-red-50 p-5 rounded-2xl text-red-600 flex-shrink-0">
                <AlertCircle size={32} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-bold text-red-900 text-xl mb-2">Thông báo từ hệ thống</h3>
                <p className="text-red-700/80 font-medium">Rất tiếc, thông tin <strong className="text-red-700">{contact}</strong> không nằm trong danh sách cổ đông chốt ngày 31/03/2024. Quý khách vui lòng kiểm tra lại hoặc liên hệ tổng đài hỗ trợ.</p>
              </div>
              <button className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-colors">Liên hệ hỗ trợ</button>
            </motion.div>
          )}

          {status === 'SHAREHOLDER_NO_ACCOUNT' && (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border-2 border-amber-100 rounded-[32px] p-8 mb-16 flex flex-col md:flex-row items-center gap-6 shadow-2xl shadow-amber-500/5 overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-amber-500" />
              <div className="bg-amber-50 p-5 rounded-2xl text-amber-600 flex-shrink-0">
                <Lock size={32} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-bold text-amber-900 text-xl mb-2">Chào mừng Cổ đông VNDIRECT</h3>
                <p className="text-amber-700/80 font-medium">Bạn đã xác thực thành công danh tính. Tuy nhiên, ưu đãi chỉ dành cho cổ đông đã kích hoạt tài khoản giao dịch D-BOARD. Hãy mở tài khoản ngay trong 5 phút để lấy voucher.</p>
              </div>
              <button className="px-8 py-3 bg-amber-600 text-white rounded-xl font-bold text-sm hover:bg-amber-700 transition-colors flex items-center gap-2">
                Mở tài khoản ngay <ArrowUpRight size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Voucher Selection Bar */}
        <div className="bg-white/50 backdrop-blur-xl border border-white p-2 rounded-[32px] shadow-sm mb-12 flex flex-wrap items-center gap-2 sticky top-[80px] z-30">
          {(['All', 'VNDGO', 'PTI Care', 'Anvie Life'] as VoucherCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-1 min-w-[120px] px-6 py-4 rounded-3xl text-sm font-bold transition-all ${
                activeCategory === cat 
                ? 'bg-[#1D1D1F] text-white shadow-xl shadow-gray-200 translate-y-[-2px]' 
                : 'bg-transparent border border-transparent text-gray-500 hover:bg-white hover:border-gray-100'
              }`}
            >
              {cat === 'All' ? 'Tất cả ưu đãi' : cat}
            </button>
          ))}
        </div>

        {/* Voucher Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredVouchers.map((voucher, idx) => (
            <VoucherCard 
              key={voucher.id} 
              voucher={voucher} 
              isLocked={status === 'SHAREHOLDER_NO_ACCOUNT' || status === 'GUEST'} 
              userStatus={status}
              index={idx}
              onClaim={() => handleClaimVoucher(voucher)}
            />
          ))}
        </div>
      </main>

      {/* News Section */}
      <section id="news" className="bg-gray-50/50 py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                Thông tin cập nhật
              </div>
              <h2 className="text-4xl font-black tracking-tight">Trang Tin Tức <br /><span className="text-[#F27D26]">VNDIRECT & Cổ Đông</span></h2>
            </div>
            <button className="text-sm font-bold text-gray-400 hover:text-[#F27D26] flex items-center gap-2 group transition-colors">
              Xem tất cả tin tức <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {NEWS_ITEMS.map((item, idx) => (
              <NewsCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1D1D1F] text-white pt-24 pb-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F27D26] blur-[180px] opacity-10 rounded-full translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#F27D26] rounded-2xl flex items-center justify-center">
                  <span className="text-white font-black text-2xl tracking-tighter">V</span>
                </div>
                <div>
                  <span className="font-black text-xl tracking-tight block">VNDIRECT</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Wisdom path</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">
                Dẫn đầu xu hướng tài chính số tại Việt Nam. Cam kết đồng hành cùng thịnh vượng của khách hàng và đối tác.
              </p>
            </div>
            
            {['Liên kết', 'Cổ đông', 'Hỗ trợ'].map((section, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-[#F27D26]">{section}</h4>
                <ul className="space-y-5 text-sm text-gray-400 font-semibold">
                  <li><a href="#" className="hover:text-white transition-colors">VNDirect Online</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Tra cứu cổ đông</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Trung tâm ưu đãi</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Hotline: 1900 54 54 09</a></li>
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-12 border-t border-gray-800 flex flex-col md:row items-center justify-between gap-6 text-[11px] text-gray-500 uppercase tracking-[0.2em] font-bold">
            <p>© 2024 CÔNG TY CỔ PHẦN CHỨNG KHOÁN VNDIRECT.</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-white transition-colors">Điều khoản dịch vụ</a>
              <a href="#" className="hover:text-white transition-colors">Bảo mật dữ liệu</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Verification Modal */}
      <AnimatePresence>
        {isVerifying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          >
            <div className="absolute inset-0 bg-[#1D1D1F]/60 backdrop-blur-xl" onClick={() => setIsVerifying(false)} />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="bg-white rounded-[40px] w-full max-w-[480px] overflow-hidden shadow-2xl relative z-10 p-1"
            >
              <div className="p-10">
                <button 
                  onClick={() => setIsVerifying(false)}
                  className="absolute top-8 right-8 p-3 text-gray-400 hover:bg-gray-100 rounded-full transition-colors active:scale-90"
                >
                  <X size={24} />
                </button>

                {verificationStep === 'CONTACT' && (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-amber-50 text-[#F27D26] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner shadow-amber-200/50">
                      <ShieldCheck size={40} />
                    </div>
                    <h3 className="text-3xl font-[900] mb-4 tracking-tight">Xác thực danh tính</h3>
                    <p className="text-gray-500 mb-10 text-sm font-medium leading-relaxed">
                      Quý cổ đông vui lòng nhập thông tin liên lạc để nhận mã xác thực ưu đãi.
                    </p>
                    
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#F27D26] transition-colors">
                          <Mail size={22} />
                        </div>
                        <input 
                          type="text" 
                          placeholder="Email hoặc Số điện thoại"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          className="w-full bg-gray-50 border-2 border-gray-100 rounded-3xl py-5 pl-14 pr-6 text-base font-bold focus:outline-none focus:ring-4 focus:ring-[#F27D26]/10 focus:border-[#F27D26] transition-all placeholder:text-gray-300"
                          required
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-[#1D1D1F] text-white py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-gray-300 hover:bg-gray-800 transition-all flex items-center justify-center gap-3 group active:scale-[0.98]"
                      >
                        Gửi mã xác thực
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                    <div className="mt-10 p-5 bg-gray-50 rounded-2xl flex items-start gap-4 text-left">
                      <AlertCircle className="text-amber-500 flex-shrink-0" size={18} />
                      <p className="text-[11px] text-gray-400 font-bold leading-relaxed uppercase">
                        Thông tin của bạn được bảo mật tuyệt đối theo tiêu chuẩn chứng khoán VNDIRECT.
                      </p>
                    </div>
                  </div>
                )}

                {verificationStep === 'OTP' && (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-amber-50 text-[#F27D26] rounded-3xl flex items-center justify-center mx-auto mb-8">
                      <Lock size={40} />
                    </div>
                    <h3 className="text-3xl font-[900] mb-4 tracking-tight">Xác nhận mã OTP</h3>
                    <p className="text-gray-500 mb-10 text-sm font-medium">
                      Mã gồm 6 chữ số đã được gửi đến <br />
                      <strong className="text-[#1D1D1F] text-base">{contact}</strong>
                    </p>
                    
                    <div className="flex justify-between gap-2 mb-10">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          id={`otp-${i}`}
                          type="text"
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          className="w-12 h-16 bg-gray-50 border-2 border-gray-100 rounded-2xl text-center text-2xl font-black focus:outline-none focus:ring-4 focus:ring-[#F27D26]/10 focus:border-[#F27D26] transition-all"
                          maxLength={1}
                        />
                      ))}
                    </div>

                    <button 
                      onClick={handleVerifyOtp}
                      className="w-full bg-[#1D1D1F] text-white py-5 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-[0.98]"
                    >
                      Hoàn tất xác thực
                    </button>
                    
                    <div className="mt-10 flex flex-col gap-6">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm font-bold text-gray-400">Không nhận được mã?</span>
                        <button className="text-sm font-black text-[#F27D26] hover:underline">
                          Gửi lại mã (0:59)
                        </button>
                      </div>
                      <button 
                        onClick={() => setVerificationStep('CONTACT')}
                        className="text-xs font-bold text-gray-300 hover:text-gray-600 transition-colors uppercase tracking-widest"
                      >
                        Sử dụng thông tin khác
                      </button>
                    </div>
                  </div>
                )}

                {verificationStep === 'RESULT' && (
                  <div className="text-center py-6">
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                      className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-10 ${
                        status === 'GUEST' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'
                      }`}
                    >
                      {status === 'GUEST' ? <AlertCircle size={48} /> : <CheckCircle2 size={48} />}
                    </motion.div>
                    
                    <h3 className="text-4xl font-[900] mb-4 tracking-tighter">
                      {status === 'GUEST' ? 'Xin lỗi quý khách' : 'Chào mừng Cổ đông'}
                    </h3>
                    <p className="text-gray-500 mb-12 text-sm font-medium leading-relaxed px-4">
                      {status === 'GUEST' 
                        ? 'Dữ liệu không khớp với danh sách cổ đông VNDIRECT. Vui lòng liên hệ 1900 54 54 09 để cập nhật thông tin.' 
                        : status === 'SHAREHOLDER_NO_ACCOUNT'
                          ? 'Chúng tôi đã tìm thấy tên bạn trong danh sách cổ đông. Tuy nhiên, voucher chỉ kích hoạt khi bạn có tài khoản D-BOARD.'
                          : 'Xác thực tài khoản thành công. Quý cổ đông hiện có thể nhận toàn bộ ưu đãi từ hệ sinh thái của chúng tôi.'}
                    </p>

                    <button 
                      onClick={() => setIsVerifying(false)}
                      className="w-full bg-[#1D1D1F] text-white py-5 rounded-3xl font-black text-sm uppercase tracking-widest active:scale-[0.98] shadow-xl"
                    >
                      Bắt đầu khám phá
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Claim Modal (Flow 4 Implementation) */}
      <AnimatePresence>
        {isClaiming && selectedVoucher && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          >
            <div className="absolute inset-0 bg-[#000]/80 backdrop-blur-2xl" onClick={() => setIsClaiming(false)} />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="bg-white rounded-[48px] w-full max-w-[560px] overflow-hidden shadow-2xl relative z-10"
            >
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <img src={selectedVoucher.image} alt={selectedVoucher.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-10 right-10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-[#F27D26] text-white text-[10px] font-black rounded-full uppercase tracking-widest">{selectedVoucher.category}</span>
                  </div>
                  <h3 className="text-white text-2xl font-black leading-tight">{selectedVoucher.title}</h3>
                </div>
                <button 
                  onClick={() => setIsClaiming(false)}
                  className="absolute top-6 right-6 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-10">
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[32px] p-8 text-center mb-8 relative group">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] block mb-4">Mã ưu đãi của bạn</span>
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-4xl font-[900] tracking-tighter text-[#F27D26]">VNDIRECT2024</span>
                    <button 
                      onClick={handleCopyCode}
                      className={`p-3 rounded-full transition-all ${isCopied ? 'bg-green-500 text-white' : 'bg-white text-gray-400 border border-gray-200 hover:border-[#F27D26] hover:text-[#F27D26]'}`}
                    >
                      {isCopied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                  </div>
                  {isCopied && (
                    <motion.div 
                      initial={{ y: 10, opacity: 0 }} 
                      animate={{ y: 0, opacity: 1 }} 
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-500 text-white text-[10px] font-black rounded-full"
                    >
                      ĐÃ SAO CHÉP
                    </motion.div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="p-5 bg-blue-50 rounded-3xl">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block mb-2">Giá trị ưu đãi</span>
                    <span className="text-xl font-black text-blue-700">{selectedVoucher.discount}</span>
                  </div>
                  <div className="p-5 bg-purple-50 rounded-3xl">
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-2">Hạn sử dụng</span>
                    <span className="text-xl font-black text-purple-700">31/12/2024</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-black text-sm uppercase tracking-widest text-gray-400">Hướng dẫn sử dụng</h4>
                  <ul className="space-y-3">
                    {[
                      'Truy xuất ứng dụng D-BOARD hoặc VNDIRECT Online.',
                      'Chọn dịch vụ tương ứng với voucher.',
                      'Nhập mã khuyến mãi tại bước thanh toán/đăng ký.'
                    ].map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm font-semibold text-gray-600">
                        <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[10px] flex-shrink-0">{i+1}</div>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => setIsClaiming(false)}
                  className="w-full mt-12 bg-[#F27D26] text-white py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-[#F27D26]/20 transition-all hover:bg-[#D96C1F] active:scale-95"
                >
                  Xong, về trang chủ
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NewsCard({ item, index }: { item: NewsItem, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="relative h-48 rounded-3xl overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-bold uppercase tracking-wider shadow-sm">
            {item.category}
          </span>
        </div>
      </div>
      <div className="px-2">
        <span className="text-[10px] font-bold text-[#F27D26] uppercase tracking-widest mb-2 block">{item.date}</span>
        <h3 className="font-bold text-base leading-snug mb-3 group-hover:text-[#F27D26] transition-colors line-clamp-2">
          {item.title}
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 font-medium">
          {item.summary}
        </p>
      </div>
    </motion.div>
  );
}

interface VoucherCardProps {
  voucher: Voucher;
  isLocked: boolean;
  userStatus: UserStatus;
  index: number;
  onClaim: () => void;
}

function VoucherCard({ voucher, isLocked, userStatus, index, onClaim }: VoucherCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-[0_32px_64px_-12px_rgba(242,125,38,0.12)] hover:-translate-y-3 transition-all duration-500 flex flex-col relative"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={voucher.image} 
          alt={voucher.title} 
          className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${isLocked ? 'grayscale opacity-60 scale-105' : ''}`}
        />
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] text-[#1D1D1F] border border-white/20 shadow-sm">
          {voucher.category}
        </div>
        
        <AnimatePresence>
          {isLocked && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="absolute inset-0 bg-[#1D1D1F]/50 backdrop-blur-[4px] flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full flex items-center justify-center text-white mb-4 shadow-2xl">
                <Lock size={28} />
              </div>
              <span className="text-white text-xs font-black uppercase tracking-[0.2em] leading-relaxed">Xác thực cổ đông <br /> để mở khóa</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-10 flex-1 flex flex-col">
        <div className="mb-6 flex items-start justify-between">
          <div className="bg-amber-50 text-[#F27D26] px-4 py-2 rounded-xl text-xl font-[900] tracking-tighter">
            {voucher.discount}
          </div>
          <div className="w-10 h-10 border border-gray-100 rounded-full flex items-center justify-center text-gray-300">
            <Ticket size={20} />
          </div>
        </div>
        
        <h3 className="font-black text-xl mb-4 leading-tight group-hover:text-[#F27D26] transition-colors">{voucher.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-10 font-semibold">{voucher.description}</p>
        
        <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
          <button 
            onClick={onClaim}
            disabled={userStatus === 'GUEST'}
            className={`flex-1 py-4.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
              isLocked 
              ? 'bg-gray-100 text-gray-400 hover:bg-gray-200' 
              : 'bg-[#F27D26] text-white shadow-xl shadow-[#F27D26]/20 hover:bg-[#D96C1F] hover:shadow-2xl hover:shadow-[#F27D26]/30 active:scale-95'
            }`}
          >
            {isLocked ? 'Cần mở tài khoản để nhận' : userStatus === 'SHAREHOLDER_ACTIVE' ? 'SỬ DỤNG QUÀ TẶNG' : 'Xác thực để nhận'}
            {!isLocked && <ChevronRight size={18} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
