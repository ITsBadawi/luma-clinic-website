import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Sparkles,
  ExternalLink,
  Shield,
  Heart,
  MessageCircle,
} from 'lucide-react';
import { clinicInfo } from '../data/clinicData';

export const ContactFooter: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 relative overflow-hidden pt-20">
      {/* Decorative ambient top glow */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-teal-800/10 rounded-full blur-3xl pointer-events-none" />

      {/* CONTACT INFO GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-slate-800">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 text-mint-300 text-xs font-semibold mb-4 border border-slate-700">
            <MapPin className="w-3.5 h-3.5 text-mint-300" />
            موقعنا وساعات العمل
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-3 tracking-tight">
            نسعد باستقبالكم في قلب بغداد
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            موقع استراتيجي هادئ في المنصور مع مواقف سيارات مخصصة لمراجعينا.
          </p>
        </div>

        {/* 4 Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Address */}
          <div className="bg-slate-850/80 p-6 rounded-3xl border border-slate-800 bg-slate-800/40 hover:border-teal-700/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-teal-900/60 text-mint-300 flex items-center justify-center mb-4 border border-teal-800/40">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">العنوان والموقع</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {clinicInfo.address}
            </p>
            <a
              href="https://maps.google.com/?q=Al-Mansour+Baghdad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-mint-300 hover:text-white mt-4 font-semibold transition-colors"
            >
              <span>فتح في الخرائط</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Working Hours */}
          <div className="bg-slate-850/80 p-6 rounded-3xl border border-slate-800 bg-slate-800/40 hover:border-teal-700/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-teal-900/60 text-mint-300 flex items-center justify-center mb-4 border border-teal-800/40">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">ساعات الدوام</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-1">
              {clinicInfo.hours.weekdays}
            </p>
            <p className="text-[11px] text-teal-300/80 leading-relaxed">
              {clinicInfo.hours.friday}
            </p>
          </div>

          {/* Phone Numbers */}
          <div className="bg-slate-850/80 p-6 rounded-3xl border border-slate-800 bg-slate-800/40 hover:border-teal-700/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-teal-900/60 text-mint-300 flex items-center justify-center mb-4 border border-teal-800/40">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">الهاتف والاستفسارات</h3>
            <a
              href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`}
              className="block text-xs text-slate-400 hover:text-mint-300 transition-colors"
              dir="ltr"
            >
              {clinicInfo.phone}
            </a>
            <div className="mt-2 pt-2 border-t border-slate-800/80">
              <span className="text-[10px] text-rose-400 font-bold block">خط الطوارئ السريع:</span>
              <a
                href={`tel:${clinicInfo.emergencyHotline.replace(/\s+/g, '')}`}
                className="text-xs text-slate-300 hover:text-white"
                dir="ltr"
              >
                {clinicInfo.emergencyHotline}
              </a>
            </div>
          </div>

          {/* Email & Chat */}
          <div className="bg-slate-850/80 p-6 rounded-3xl border border-slate-800 bg-slate-800/40 hover:border-teal-700/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-teal-900/60 text-mint-300 flex items-center justify-center mb-4 border border-teal-800/40">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">المراسلة الإلكترونية</h3>
            <a
              href={`mailto:${clinicInfo.email}`}
              className="block text-xs text-slate-400 hover:text-mint-300 transition-colors"
            >
              {clinicInfo.email}
            </a>
            <div className="mt-4">
              <a
                href={`https://wa.me/${clinicInfo.whatsapp.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>واتساب الاستقبال الفوري</span>
              </a>
            </div>
          </div>

        </div>

        {/* Map Preview Card */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 h-64 bg-slate-800">
          {/* Aesthetic Map stylization placeholder with real pin */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40">
            <div className="w-12 h-12 rounded-2xl bg-teal-700 text-white flex items-center justify-center shadow-lg mb-3">
              <MapPin className="w-6 h-6 text-mint-300 animate-bounce" />
            </div>
            <h4 className="text-lg font-bold text-white font-heading">
              عيادة لوما التخصصية — المنصور
            </h4>
            <p className="text-xs text-slate-400 max-w-md mt-1 mb-4">
              شارع الأميرات، قرب تقاطع الرواد، مجمع النخبة الطبي، الطابق الثالث
            </p>
            <a
              href="https://maps.google.com/?q=Al-Mansour+Baghdad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-600 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors shadow-teal-glow"
            >
              <span>فتح مسار الاتجاهات عبر Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand info (2 cols) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-teal-700 flex items-center justify-center text-white shadow-teal-glow">
                <Sparkles className="w-5 h-5 text-mint-300" />
              </div>
              <div>
                <span className="text-lg font-bold text-white font-heading block">
                  عيادة لوما | LUMA CLINIC
                </span>
                <span className="text-[11px] text-teal-400 font-medium -mt-1 block">
                  رعاية طبية وتجميلية متقدمة
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-6">
              عيادة استشارية متخصصة في طب وتجميل الأسنان والوجه في بغداد. رسالتنا تقديم علاج دقيق ومريح يعيد ثقتك بابتسامتك دون ألم أو قلق.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href={clinicInfo.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-teal-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="إنستغرام"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={clinicInfo.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-teal-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="فيسبوك"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href={clinicInfo.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#25D366] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="واتساب"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#hero" className="hover:text-mint-300 transition-colors">الصفحة الرئيسية</a></li>
              <li><a href="#services" className="hover:text-mint-300 transition-colors">خدمات العيادة</a></li>
              <li><a href="#results" className="hover:text-mint-300 transition-colors">حالات قبل وبعد</a></li>
              <li><a href="#doctors" className="hover:text-mint-300 transition-colors">الأطباء الاستشاريون</a></li>
              <li><a href="#booking" className="hover:text-mint-300 transition-colors">حجز موعد مسبق</a></li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              أبرز الخدمات
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#services" className="hover:text-mint-300 transition-colors">ابتسامة هوليوود (فينير)</a></li>
              <li><a href="#services" className="hover:text-mint-300 transition-colors">زراعة الأسنان الموجهة</a></li>
              <li><a href="#services" className="hover:text-mint-300 transition-colors">تبييض الأسنان بالليزر</a></li>
              <li><a href="#services" className="hover:text-mint-300 transition-colors">التقويم الشفاف الرقمي</a></li>
              <li><a href="#services" className="hover:text-mint-300 transition-colors">حقن الفيلر والبوتوكس</a></li>
            </ul>
          </div>

          {/* Certifications & Badges */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              معايير الجودة
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Shield className="w-4 h-4 text-teal-400 shrink-0" />
                <span>تعقيم مجهري بنظام Class B</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
                <span>خامات سويسرية وألمانية أصلية</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Heart className="w-4 h-4 text-teal-400 shrink-0" />
                <span>بروتوكول علاج خالٍ من الألم</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Disclaimer */}
        <div className="pt-8 mt-12 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} عيادة لوما لطب وتجميل الأسنان (LUMA CLINIC).
          </div>
          <div className="text-center sm:text-left text-slate-500">
            المحتوى الطبي للأغراض التوعوية ولا يغني عن الفحص السريري المباشر لدى الطبيب المختص.
          </div>
        </div>

      </div>
    </footer>
  );
};
