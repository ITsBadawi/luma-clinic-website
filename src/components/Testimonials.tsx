import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { reviewsData } from '../data/clinicData';
import { Star, Quote, ChevronRight, ChevronLeft, CheckCircle2, Sparkles } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalReviews = reviewsData.length;

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  };

  // Auto sliding every 6 seconds unless hovered
  useEffect(() => {
    if (!isPaused) {
      autoPlayTimerRef.current = setInterval(() => {
        nextReview();
      }, 6000);
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPaused, currentIndex]);

  const current = reviewsData[currentIndex];

  return (
    <section
      id="reviews"
      className="py-20 lg:py-28 bg-white relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-mint-100 text-teal-800 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            تجارب حقيقية نعتز بها
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-teal-950 mb-4 tracking-tight">
            ماذا يقول مراجعونا عن تجربتهم في لوما؟
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            كل تقييم هو حافز لنا لتقديم أرقى مستويات الرعاية الطبية بأقصى درجات الاهتمام.
          </p>
        </div>

        {/* Carousel Card Container */}
        <div className="relative bg-gradient-to-br from-mint-50/80 via-white to-mint-50/50 rounded-3xl p-8 sm:p-12 border border-mint-200 shadow-soft-lg min-h-[340px] flex flex-col justify-between">
          
          {/* Subtle Quote icon background */}
          <div className="absolute top-6 left-8 text-mint-200/60 pointer-events-none">
            <Quote className="w-24 h-24 transform rotate-180" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="relative z-10"
            >
              {/* Star Rating & Verified Pill */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-mint-100 px-3 py-1 rounded-full border border-mint-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>مراجع موثق لدى العيادة</span>
                </div>
              </div>

              {/* Review Text */}
              <blockquote className="text-lg sm:text-xl lg:text-2xl text-slate-700 font-normal leading-relaxed mb-8 text-right font-heading">
                "{current.comment}"
              </blockquote>

              {/* Author & Treatment Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-mint-200">
                <div className="w-12 h-12 rounded-full bg-teal-700 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                  {current.avatarText}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-base">
                    {current.author}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                    <span className="text-teal-700 font-semibold">{current.treatment}</span>
                    <span>•</span>
                    <span>{current.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls: Prev/Next & Dots */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-mint-100 z-10">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviewsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-teal-700 ${
                    currentIndex === idx
                      ? 'w-8 bg-teal-700'
                      : 'w-2.5 bg-mint-300 hover:bg-mint-400'
                  }`}
                  aria-label={`الانتقال إلى المراجعة ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevReview}
                className="w-10 h-10 rounded-full bg-white border border-mint-200 text-teal-900 flex items-center justify-center hover:bg-mint-100 transition-colors shadow-xs focus-visible:ring-2 focus-visible:ring-teal-700"
                aria-label="المراجعة السابقة"
              >
                {/* In RTL, previous points right */}
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={nextReview}
                className="w-10 h-10 rounded-full bg-white border border-mint-200 text-teal-900 flex items-center justify-center hover:bg-mint-100 transition-colors shadow-xs focus-visible:ring-2 focus-visible:ring-teal-700"
                aria-label="المراجعة التالية"
              >
                {/* In RTL, next points left */}
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
