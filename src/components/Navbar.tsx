import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Sparkles } from 'lucide-react';
import { clinicInfo } from '../data/clinicData';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '#hero' },
    { name: 'خدماتنا', href: '#services' },
    { name: 'قبل وبعد', href: '#results' },
    { name: 'أطباؤنا', href: '#doctors' },
    { name: 'رحلة العلاج', href: '#how-it-works' },
    { name: 'آراء المراجعين', href: '#reviews' },
    { name: 'الأسئلة الشائعة', href: '#faq' },
    { name: 'تواصل معنا', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-mint-200/60 py-3'
          : 'bg-white/80 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 rounded-xl p-1"
          >
            <div className="w-11 h-11 rounded-2xl bg-teal-700 flex items-center justify-center text-white shadow-teal-glow transition-transform duration-300 group-hover:scale-105">
              <Sparkles className="w-6 h-6 text-mint-300" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-teal-900 font-heading">
                  عيادة لوما
                </span>
                <span className="text-xs uppercase tracking-widest text-teal-600 font-semibold border-r border-mint-300 pr-2 mr-1">
                  LUMA
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium -mt-0.5">
                لطب وتجميل الأسنان
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-mint-50/80 px-4 py-1.5 rounded-full border border-mint-200/60" aria-label="القائمة الرئيسية">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-teal-700 hover:bg-white rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-teal-700"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`}
              className="hidden xl:flex items-center gap-2 text-xs font-semibold text-teal-800 bg-mint-100/70 hover:bg-mint-200/80 px-3.5 py-2 rounded-full transition-colors border border-mint-200"
              title="اتصال مباشر"
            >
              <Phone className="w-3.5 h-3.5 text-teal-600" />
              <span dir="ltr">{clinicInfo.phone}</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-teal-glow transition-all duration-300 hover:shadow-soft-lg transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-teal-700"
            >
              <Calendar className="w-4 h-4 text-mint-300" />
              <span>احجز الآن</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="sm:hidden inline-flex items-center gap-1.5 bg-teal-700 text-white text-xs font-semibold px-3.5 py-2 rounded-full"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>احجز</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-teal-700 hover:bg-mint-100 transition-colors focus-visible:ring-2 focus-visible:ring-teal-700"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-teal-900" />
              ) : (
                <Menu className="w-6 h-6 text-teal-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-mint-200 px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="px-4 py-3 text-base font-medium text-slate-700 hover:text-teal-700 hover:bg-mint-50 rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="mt-5 pt-4 border-t border-mint-200 flex flex-col gap-3">
            <a
              href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-mint-100 text-teal-800 text-sm font-semibold"
            >
              <Phone className="w-4 h-4 text-teal-600" />
              <span>اتصل بنا: </span>
              <span dir="ltr">{clinicInfo.phone}</span>
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 rounded-xl shadow-teal-glow text-sm"
            >
              <Calendar className="w-4 h-4 text-mint-300" />
              <span>احجز موعدك الآن</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
