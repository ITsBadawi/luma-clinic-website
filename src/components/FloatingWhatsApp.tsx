import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { clinicInfo } from '../data/clinicData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = encodeURIComponent(
    'مرحباً عيادة لوما التخصصية، أود الاستفسار عن المواعيد والخدمات الطبية المتاحة...'
  );

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start">
      {/* Tooltip message */}
      {showTooltip && (
        <div className="relative mb-2 bg-white text-slate-800 text-xs py-2 px-3.5 rounded-2xl shadow-soft-lg border border-mint-200 flex items-center gap-2 max-w-xs animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <span>تحدث مباشرة مع المنسق الطبي</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 mr-1 p-0.5 rounded"
            aria-label="إخفاء التنبيه"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={`https://wa.me/${clinicInfo.whatsapp.replace('+', '')}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20bd5a] transition-all duration-300 hover:scale-110 focus-visible:ring-4 focus-visible:ring-emerald-300"
        aria-label="تواصل عبر الواتساب"
      >
        {/* Pulsing ring aura */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping -z-10 pointer-events-none" />
        
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
};
