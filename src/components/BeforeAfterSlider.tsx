import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { beforeAfterCases } from '../data/clinicData';
import type { BeforeAfterCase } from '../data/clinicData';
import { Sparkles, Clock, User, CheckCircle, GripVertical } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentCase: BeforeAfterCase = beforeAfterCases[activeCaseIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percentage = (clampedX / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section id="results" className="py-20 lg:py-28 bg-mint-100/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-mint-300 text-teal-800 text-xs font-semibold mb-4 shadow-soft">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            نتائج حقيقية موثقة
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-teal-950 mb-4 tracking-tight">
            شاهد الفارق بنفسك: قبل وبعد العلاج
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            اسحب المؤشر التفاعلي لاستكشاف التحول الطبيعي والدقيق لابتسامات مراجعينا في عيادة لوما.
          </p>
        </div>

        {/* Case Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {beforeAfterCases.map((c, index) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCaseIndex(index);
                setSliderPosition(50);
              }}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-teal-700 ${
                activeCaseIndex === index
                  ? 'bg-teal-700 text-white shadow-teal-glow'
                  : 'bg-white hover:bg-mint-200/60 text-slate-700 border border-mint-200'
              }`}
            >
              {c.category}
            </button>
          ))}
        </div>

        {/* Main Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Slider Container (8 Cols on large) */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-soft-lg border-4 border-white select-none cursor-ew-resize bg-slate-100"
            >
              {/* BEFORE IMAGE (Background Layer) */}
              <img
                src={currentCase.beforeImage}
                alt={`قبل العلاج - ${currentCase.title}`}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                loading="eager"
              />

              {/* AFTER IMAGE (Foreground Clipped Layer) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{
                  clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                }}
              >
                <img
                  src={currentCase.afterImage}
                  alt={`بعد العلاج - ${currentCase.title}`}
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                  loading="eager"
                />
              </div>

              {/* Slider Line Divider */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Circular Draggable Handle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white border-2 border-teal-700 shadow-xl flex items-center justify-center text-teal-800 transition-transform active:scale-110">
                  <GripVertical className="w-5 h-5 text-teal-700" />
                </div>
              </div>

              {/* Badges for "قبل" and "بعد" */}
              <div className="absolute top-4 right-4 bg-teal-950/75 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm pointer-events-none">
                قبل الإجراء
              </div>
              <div className="absolute top-4 left-4 bg-teal-700/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm pointer-events-none">
                بعد الإجراء ✨
              </div>

              {/* Bottom Drag Hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/85 backdrop-blur-md text-teal-900 text-[11px] font-semibold px-4 py-1 rounded-full shadow-xs pointer-events-none">
                اسحب يميناً ويساراً للمقارنة
              </div>

              {/* Hidden Range Input for Accessibility */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="sr-only"
                aria-label="مؤشر المقارنة بين قبل وبعد"
              />
            </div>
          </div>

          {/* Case Narrative Details (4 Cols on large) */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCase.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-mint-200 shadow-soft"
              >
                <div className="inline-block px-3 py-1 rounded-lg bg-mint-100 text-teal-800 text-xs font-bold mb-3">
                  {currentCase.category}
                </div>

                <h3 className="text-xl font-bold font-heading text-teal-950 mb-3">
                  {currentCase.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {currentCase.description}
                </p>

                {/* Metadata List */}
                <div className="space-y-3 pt-4 border-t border-mint-200 text-xs sm:text-sm">
                  <div className="flex items-center gap-3 text-slate-700">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                    <span className="font-medium text-slate-500">نوع العلاج:</span>
                    <span className="font-bold text-slate-800">{currentCase.treatmentName}</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-700">
                    <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                    <span className="font-medium text-slate-500">مدة العلاج:</span>
                    <span className="font-bold text-slate-800">{currentCase.duration}</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-700">
                    <User className="w-4 h-4 text-teal-600 shrink-0" />
                    <span className="font-medium text-slate-500">الطبيب المشرف:</span>
                    <span className="font-bold text-slate-800">{currentCase.doctorName}</span>
                  </div>
                </div>

                {/* Assurance note */}
                <div className="mt-6 p-3 rounded-2xl bg-mint-50 border border-mint-200/60 text-[11px] text-teal-900 leading-normal">
                  💡 جميع الصور المعروضة لحالات حقيقية تم علاجها داخل عيادة لوما بموافقة المراجعين ودون أي تعديلات رقمية مضللة.
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
