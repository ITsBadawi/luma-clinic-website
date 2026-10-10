import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqsData } from '../data/clinicData';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { clinicInfo } from '../data/clinicData';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-mint-100 text-teal-800 text-xs font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
            الأسئلة الشائعة
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-teal-950 mb-4 tracking-tight">
            إجابات واضحة لكل ما يدور في ذهنك
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            جمعنا لك أكثر الاستفسارات تكراراً حول الإجراءات والضمانات وتفاصيل الزيارة لمساعدتك على اتخاذ قرارك براحة تامة.
          </p>
        </div>

        {/* Accordion List (6 items) */}
        <div className="space-y-4">
          {faqsData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-mint-300 bg-mint-50/50 shadow-soft'
                    : 'border-mint-200 bg-white hover:border-mint-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-5 px-6 sm:px-8 text-right flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-mint-100 text-teal-800 text-xs font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-base sm:text-lg font-bold font-heading text-teal-950">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen ? 'bg-teal-700 text-white rotate-180' : 'bg-mint-100 text-teal-800'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 sm:px-8 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-mint-200/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Extra Help Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-mint-100/70 border border-mint-200 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-right">
            <h4 className="text-base sm:text-lg font-bold font-heading text-teal-950">
              هل تبحث عن إجابة لحالة خاصة؟
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              طاقمنا الطبي مستعد للإجابة على جميع استفساراتك الفردية عبر الواتساب في أي وقت.
            </p>
          </div>
          <a
            href={`https://wa.me/${clinicInfo.whatsapp.replace('+', '')}?text=${encodeURIComponent('مرحباً عيادة لوما، لدي استفسار طبي بخصوص العلاج...')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full shadow-teal-glow transition-all shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-mint-300" />
            <span>تحدث مع الاستشاري المناوب</span>
          </a>
        </div>

      </div>
    </section>
  );
};
