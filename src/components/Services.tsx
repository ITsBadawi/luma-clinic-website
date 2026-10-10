import React, { useState } from 'react';
import {
  Sparkles,
  ShieldPlus,
  Smile,
  Layers,
  Stethoscope,
  HeartHandshake,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { servicesData } from '../data/clinicData';
import type { Service } from '../data/clinicData';
import { ServiceDetailModal } from './ServiceDetailModal';

interface ServicesProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForBooking }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const getIcon = (name: Service['iconName']) => {
    const iconClass = "w-6 h-6 transition-colors duration-300";
    switch (name) {
      case 'Sparkles':
        return <Sparkles className={`${iconClass} text-teal-700 group-hover:text-teal-600`} />;
      case 'ShieldPlus':
        return <ShieldPlus className={`${iconClass} text-teal-700 group-hover:text-teal-600`} />;
      case 'Smile':
        return <Smile className={`${iconClass} text-teal-700 group-hover:text-teal-600`} />;
      case 'Layers':
        return <Layers className={`${iconClass} text-teal-700 group-hover:text-teal-600`} />;
      case 'Stethoscope':
        return <Stethoscope className={`${iconClass} text-teal-700 group-hover:text-teal-600`} />;
      case 'HeartHandshake':
        return <HeartHandshake className={`${iconClass} text-teal-700 group-hover:text-teal-600`} />;
      default:
        return <Sparkles className={`${iconClass} text-teal-700 group-hover:text-teal-600`} />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-mint-100 text-teal-800 text-xs font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
            خدماتنا التخصصية
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-teal-950 mb-4 tracking-tight">
            علاجات متطورة تُعيد لابتسامتك بريقها الطبيعي
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            نعتمد أعلى المعايير الطبية وأحدث الأجهزة العالمية لنضمن لك أفضل النتائج الجمالية والوظيفية في بيئة آمنة وهادئة.
          </p>
        </div>

        {/* Services Grid (6 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="group relative bg-surface-white rounded-3xl p-8 border border-mint-200 shadow-soft hover:shadow-soft-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* Top Icon & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-mint-100/80 border border-mint-200 flex items-center justify-center transition-colors group-hover:bg-teal-700 group-hover:border-teal-700">
                    <span className="transition-colors group-hover:text-white">
                      {getIcon(service.iconName)}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold tracking-wider text-teal-600/80 uppercase font-sans">
                    {service.enTitle}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-heading text-teal-950 mb-3 group-hover:text-teal-700 transition-colors">
                  {service.title}
                </h3>

                {/* Short description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Key Benefits Preview */}
                <ul className="space-y-2 mb-8 border-t border-mint-100 pt-4">
                  {service.benefits.slice(0, 2).map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-mint-200/60">
                <button
                  onClick={() => setSelectedService(service)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-mint-100/70 hover:bg-mint-200/80 text-teal-900 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-teal-700"
                >
                  <span>تفاصيل الإجراء</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onSelectServiceForBooking(service.id)}
                  className="inline-flex items-center justify-center py-2.5 px-4 rounded-full bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition-colors shadow-xs focus-visible:ring-2 focus-visible:ring-teal-700"
                  title="حجز موعد مباشر لهذه الخدمة"
                >
                  احجز
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={onSelectServiceForBooking}
      />
    </section>
  );
};
