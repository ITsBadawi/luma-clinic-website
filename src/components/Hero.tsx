import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Star, ShieldCheck, Sparkles, Heart } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreServices }) => {
  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-mint-100/60 via-white to-white">
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-mint-200/50 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-36 left-10 w-80 h-80 bg-teal-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Side (Right in RTL) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-right"
          >
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-mint-300 shadow-soft text-teal-800 text-xs sm:text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>عيادة لوما التخصصية — رعاية راقية في بغداد</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-teal-950 leading-[1.2] sm:leading-[1.18] tracking-tight mb-6">
              ابتسامتك تستحق <br />
              <span className="relative inline-block text-teal-700">
                الأفضل
                {/* Gentle underline curve */}
                <svg
                  className="absolute -bottom-2 right-0 w-full h-3 text-aqua"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9C50 3 150 3 197 9"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              {' '}دائماً
            </h1>

            {/* Subline */}
            <p className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl mb-8">
              في عيادة لوما، نجمع بين دقة التقنيات السويسرية الحديثة وهدوء التجربة العلاجية. صممنا كل تفصيلة لتمنحك ابتسامة صحية ومشرقة بدون أي ألم، في بيئة مريحة تشعرك بالطمأنينة الكاملة.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-base px-8 py-4 rounded-full shadow-teal-glow hover:shadow-soft-lg transform hover:-translate-y-0.5 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-teal-700"
              >
                <Calendar className="w-5 h-5 text-mint-300" />
                <span>احجز موعدك الآن</span>
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-mint-50 text-teal-900 border border-mint-300 font-semibold text-base px-7 py-4 rounded-full shadow-soft transition-all duration-200 hover:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-700"
              >
                <span>تعرّف على خدماتنا</span>
                <ArrowLeft className="w-4 h-4 text-teal-600 transition-transform group-hover:-translate-x-1" />
              </button>
            </div>

            {/* Social Proof Mini Bar */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-mint-200/80 w-full">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 space-x-reverse">
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="مراجع راضٍ"
                    loading="lazy"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="مراجع راضٍ"
                    loading="lazy"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                    alt="مراجع راضٍ"
                    loading="lazy"
                  />
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-white bg-mint-200 text-teal-800 text-xs font-bold">
                    +12k
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-800">أكثر من 12,000 مراجع سعيد</div>
                  <div className="text-[11px] text-slate-500">في بغداد والمحافظات</div>
                </div>
              </div>

              <div className="h-8 w-px bg-mint-200 hidden sm:block" />

              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-800">4.9 / 5</span>
                <span className="text-[11px] text-slate-500">(خرائط Google)</span>
              </div>
            </div>
          </motion.div>

          {/* Image Side (Left in RTL) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            {/* Background organic shape */}
            <div className="absolute inset-0 bg-gradient-to-tr from-mint-300/40 via-mint-100 to-teal-50 rounded-3xl transform rotate-2 scale-105 -z-10" />

            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-soft-lg border-4 border-white w-full max-w-md aspect-[4/5] bg-mint-50">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85"
                alt="ابتسامة واثقة وصحية في عيادة لوما"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                loading="eager"
              />
              
              {/* Soft overlay gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/40 via-transparent to-transparent pointer-events-none" />

              {/* In-image caption tag */}
              <div className="absolute bottom-4 right-4 left-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 shadow-soft">
                <div className="flex items-center justify-between text-xs font-semibold text-teal-900">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    ضمان معتمد لجميع الإجراءات
                  </span>
                  <span className="text-[10px] text-teal-600 font-bold bg-mint-100 px-2 py-0.5 rounded-md">
                    ISO معتمد
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Card Top-Right (in RTL = Top-Left visually) */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: [0, -8, 0], opacity: 1 }}
              transition={{
                y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
                opacity: { duration: 0.6, delay: 0.4 }
              }}
              className="absolute -top-4 -right-4 sm:-right-8 bg-white p-3.5 rounded-2xl shadow-soft-md border border-mint-200 flex items-center gap-3 z-10"
            >
              <div className="w-10 h-10 rounded-xl bg-mint-100 text-teal-700 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-teal-950">تقنيات 3D رقمية</div>
                <div className="text-[10px] text-slate-500">مسح فوري بدون قوالب</div>
              </div>
            </motion.div>

            {/* Floating Card Bottom-Left (in RTL = Bottom-Right visually) */}
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: [0, 8, 0], opacity: 1 }}
              transition={{
                y: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 },
                opacity: { duration: 0.6, delay: 0.5 }
              }}
              className="absolute -bottom-6 -left-4 sm:-left-8 bg-white p-3.5 rounded-2xl shadow-soft-md border border-mint-200 flex items-center gap-3 z-10"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <Heart className="w-5 h-5 text-teal-600" />
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-teal-950">رعاية هادئة بدون ألم</div>
                <div className="text-[10px] text-slate-500">تخدير رقمي فائق اللطف</div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
