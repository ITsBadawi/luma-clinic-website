import React from 'react';
import { doctorsData } from '../data/clinicData';
import { Calendar, Award, Sparkles, Clock } from 'lucide-react';

interface DoctorsProps {
  onSelectDoctorForBooking: (doctorId: string) => void;
}

export const Doctors: React.FC<DoctorsProps> = ({ onSelectDoctorForBooking }) => {
  return (
    <section id="doctors" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-mint-100 text-teal-800 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            الكادر الطبي الاستشاري
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-teal-950 mb-4 tracking-tight">
            أطباء شغوفون بأدق تفاصيل ابتسامتك
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            فريق متكامل من خيرة استشاريي طب وتجميل الأسنان، يجمعون بين الخبرات الأكاديمية الدولية واللمسة الإنسانية المطمئنة.
          </p>
        </div>

        {/* Doctors Grid (3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctorsData.map((doctor) => (
            <div
              key={doctor.id}
              className="group bg-surface-white rounded-3xl overflow-hidden border border-mint-200 shadow-soft hover:shadow-soft-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* Doctor Image Container */}
                <div className="relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-mint-50">
                  <img
                    src={doctor.image}
                    alt={`${doctor.name} - ${doctor.title}`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-950/70 via-teal-950/20 to-transparent" />
                  
                  {/* Experience Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-teal-900 border border-white/80 shadow-xs flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-teal-600" />
                    <span>+{doctor.experienceYears} سنوات خبرة</span>
                  </div>

                  {/* Doctor Name & Title on Image */}
                  <div className="absolute bottom-4 right-4 left-4 text-right">
                    <span className="text-[11px] text-mint-300 font-sans tracking-wider block">
                      {doctor.enName}
                    </span>
                    <h3 className="text-xl font-bold font-heading text-white">
                      {doctor.name}
                    </h3>
                    <p className="text-xs text-mint-100 font-medium mt-0.5">
                      {doctor.specialty}
                    </p>
                  </div>
                </div>

                {/* Doctor Details Body */}
                <div className="p-6">
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                    {doctor.bio}
                  </p>

                  {/* Credentials */}
                  <div className="space-y-2 mb-5">
                    <div className="text-[11px] font-bold text-teal-900">المؤهلات والاعتمادات:</div>
                    {doctor.credentials.map((cred, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                        <span>{cred}</span>
                      </div>
                    ))}
                  </div>

                  {/* Available Days */}
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-mint-50 text-[11px] text-teal-900 border border-mint-200/60">
                    <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>أيام التواجد: </span>
                    <span className="font-semibold">{doctor.availableDays}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectDoctorForBooking(doctor.id)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-mint-100 hover:bg-teal-700 text-teal-900 hover:text-white font-semibold py-3 px-4 rounded-full transition-all duration-300 text-xs sm:text-sm shadow-xs focus-visible:ring-2 focus-visible:ring-teal-700"
                >
                  <Calendar className="w-4 h-4" />
                  <span>طلب استشارة مع {doctor.name.split(' ')[1]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
