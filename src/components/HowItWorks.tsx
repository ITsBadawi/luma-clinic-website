import React from 'react';
import { howItWorksSteps } from '../data/clinicData';
import { Sparkles, MessageCircle, Scan, HeartPulse, CheckCircle } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <MessageCircle className="w-6 h-6 text-teal-700" />;
      case 1:
        return <Scan className="w-6 h-6 text-teal-700" />;
      case 2:
        return <HeartPulse className="w-6 h-6 text-teal-700" />;
      case 3:
        return <CheckCircle className="w-6 h-6 text-teal-700" />;
      default:
        return <Sparkles className="w-6 h-6 text-teal-700" />;
    }
  };

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-mint-100/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-mint-300 text-teal-800 text-xs font-semibold mb-4 shadow-soft">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            رحلتك معنا في العيادة
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-teal-950 mb-4 tracking-tight">
            كيف تسير زيارتك من اللحظة الأولى؟
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            صممنا رحلة مريض واضحة وشفافة تزيل أي قلق مسبق وتمنحك تحكماً واطلاعاً كاملاً على كل خطوة علاجية.
          </p>
        </div>

        {/* 4-Step Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Subtle connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/4 right-[12%] left-[12%] h-0.5 bg-gradient-to-l from-mint-300 via-teal-200 to-mint-300 -z-0" />

          {howItWorksSteps.map((step, index) => (
            <div
              key={step.number}
              className="relative z-10 bg-white rounded-3xl p-6 sm:p-7 border border-mint-200 shadow-soft hover:shadow-soft-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header with Step Number and Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-mint-100 border border-mint-200 flex items-center justify-center">
                    {getStepIcon(index)}
                  </div>
                  <span className="text-3xl font-bold font-heading text-teal-200 tracking-tighter">
                    {step.number}
                  </span>
                </div>

                {/* Step Duration Pill */}
                <div className="inline-block text-[11px] font-semibold text-teal-700 bg-mint-50 px-2.5 py-1 rounded-md mb-3 border border-mint-200/50">
                  {step.durationText}
                </div>

                {/* Step Title */}
                <h3 className="text-lg font-bold font-heading text-teal-950 mb-3 leading-snug">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Bottom decorative hint */}
              <div className="mt-6 pt-4 border-t border-mint-100 text-[11px] text-teal-800 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                <span>راحة وأمان في كل مرحلة</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
