import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Clock, Activity, Calendar, Sparkles } from 'lucide-react';
import type { Service } from '../data/clinicData';

interface ServiceDetailModalProps {
  service: Service | null;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-teal-950/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative bg-white rounded-3xl shadow-soft-lg max-w-2xl w-full p-6 sm:p-8 z-10 border border-mint-200 my-8 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Header decorative accent */}
          <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-teal-700 via-mint-400 to-teal-600" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 left-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-mint-100 transition-colors focus-visible:ring-2 focus-visible:ring-teal-700"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Category */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-mint-100 text-teal-700 flex items-center justify-center shrink-0 border border-mint-200">
              <Sparkles className="w-7 h-7 text-teal-700" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-teal-600">
                {service.enTitle}
              </span>
              <h3 id="modal-title" className="text-2xl font-bold font-heading text-teal-950 mt-0.5">
                {service.title}
              </h3>
            </div>
          </div>

          {/* Full description */}
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
            {service.fullDesc}
          </p>

          {/* Key Quick Facts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-mint-50/70 border border-mint-200/80 mb-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-500 block">مدة الجلسة التقديرية</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800">{service.duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-500 block">فترة التعافي</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800">{service.recovery}</span>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-teal-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
              أبرز مزايا الإجراء:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Procedure Steps */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-teal-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
              مراحل العلاج في العيادة:
            </h4>
            <div className="space-y-2">
              {service.procedureSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-mint-200 text-teal-800 text-[11px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suitability Note */}
          <div className="text-xs text-slate-500 bg-white p-3 rounded-xl border border-mint-200 mb-6">
            <strong className="text-teal-900">لمن يناسب هذا الإجراء؟ </strong>
            {service.suitableFor}
          </div>

          {/* Footer Action */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-mint-200">
            <button
              onClick={() => {
                onBookService(service.id);
                onClose();
              }}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 px-6 rounded-full shadow-teal-glow transition-all duration-200 text-sm focus-visible:ring-2 focus-visible:ring-teal-700"
            >
              <Calendar className="w-4 h-4 text-mint-300" />
              <span>حجز موعد لهذه الخدمة</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 text-slate-600 hover:bg-mint-100 rounded-full text-sm font-medium transition-colors"
            >
              إغلاق
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
