import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MessageCircle,
  FileText,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { servicesData, doctorsData, clinicInfo } from '../data/clinicData';

interface BookingFormProps {
  initialServiceId?: string;
  initialDoctorId?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  initialServiceId,
  initialDoctorId,
}) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string>(initialServiceId || servicesData[0].id);
  const [selectedDoctor, setSelectedDoctor] = useState<string>(initialDoctorId || 'any');
  
  // Date & Time
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedPeriod, setSelectedPeriod] = useState<'morning' | 'evening'>('evening');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('05:00 م');

  // Contact details
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notes, setNotes] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // When initial props change from outside (e.g. user clicked "احجز" on a doctor or service)
  useEffect(() => {
    if (initialServiceId) setSelectedService(initialServiceId);
  }, [initialServiceId]);

  useEffect(() => {
    if (initialDoctorId) setSelectedDoctor(initialDoctorId);
  }, [initialDoctorId]);

  const morningSlots = ['10:00 ص', '11:00 ص', '12:00 م', '01:00 م'];
  const eveningSlots = ['04:30 م', '05:30 م', '06:30 م', '07:30 م', '08:30 م'];

  const validateStep = (currentStep: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 1) {
      if (!selectedService) {
        newErrors.service = 'يرجى اختيار الخدمة المطلوبة';
      }
    } else if (currentStep === 2) {
      if (!selectedDate) {
        newErrors.date = 'يرجى اختيار التاريخ المناسب';
      }
      if (!selectedTimeSlot) {
        newErrors.time = 'يرجى اختيار الوقت المفضل';
      }
    } else if (currentStep === 3) {
      if (!fullName.trim() || fullName.trim().length < 3) {
        newErrors.fullName = 'يرجى كتابة الاسم الثلاثي بالكامل';
      }
      const cleanPhone = phoneNumber.replace(/[\s-]/g, '');
      if (!cleanPhone || cleanPhone.length < 10) {
        newErrors.phoneNumber = 'يرجى إدخال رقم هاتف صحيح (10 أرقام على الأقل)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step === 3) {
        // Trigger celebration confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0F5E5A', '#8FD3C8', '#4CAFA3', '#E2EFEA'],
          });
        } catch {
          // Fallback gracefully
        }
        setStep(4);
      } else {
        setStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setStep(1);
    setFullName('');
    setPhoneNumber('');
    setNotes('');
    setErrors({});
  };

  // Find names for review
  const serviceObj = servicesData.find((s) => s.id === selectedService) || servicesData[0];
  const doctorObj = doctorsData.find((d) => d.id === selectedDoctor);
  const doctorDisplayName = doctorObj ? doctorObj.name : 'أول طبيب استشاري متاح';

  // Construct WhatsApp confirmation text
  const whatsappMessage = encodeURIComponent(
    `مرحباً عيادة لوما التخصصية،\nأود تأكيد موعد الكشف المبدئي الذي قمت بحجزه عبر الموقع:\n\n• الخدمة: ${serviceObj.title}\n• الطبيب: ${doctorDisplayName}\n• التاريخ: ${selectedDate}\n• الوقت: ${selectedTimeSlot}\n• الاسم: ${fullName}\n• الهاتف: ${phoneNumber}\n${notes ? `• ملاحظات: ${notes}` : ''}\n\nيرجى تأكيد الحجز وموافاتي بالموقع.`
  );

  return (
    <section id="booking" className="py-20 lg:py-28 bg-mint-100/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-mint-300 text-teal-800 text-xs font-semibold mb-4 shadow-soft">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            حجز موعد مسبق
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-teal-950 mb-3 tracking-tight">
            احجز استشارتك في دقائق معدودة
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            اختر الخدمة والموعد الأنسب لك، وسيتواصل معك منسقنا الطبي لتأكيد كل التفاصيل وتجهيز زيارتك.
          </p>
        </div>

        {/* Multi-Step Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-mint-200 shadow-soft-lg">
          
          {/* Step Progress Indicator (Hidden on confirmation step) */}
          {step < 4 && (
            <div className="mb-10">
              <div className="flex items-center justify-between max-w-lg mx-auto relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-mint-200 -z-0" />
                <div
                  className="absolute top-1/2 right-0 -translate-y-1/2 h-1 bg-teal-700 transition-all duration-500 -z-0"
                  style={{ width: `${((step - 1) / 2) * 100}%` }}
                />

                {/* Steps */}
                {[
                  { num: 1, title: 'الخدمة والطبيب' },
                  { num: 2, title: 'الموعد والوقت' },
                  { num: 3, title: 'بيانات التواصل' },
                ].map((s) => (
                  <div key={s.num} className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                        step === s.num
                          ? 'bg-teal-700 text-white shadow-teal-glow ring-4 ring-mint-200'
                          : step > s.num
                          ? 'bg-teal-600 text-white'
                          : 'bg-white text-slate-400 border-2 border-mint-300'
                      }`}
                    >
                      {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium ${
                        step >= s.num ? 'text-teal-950 font-bold' : 'text-slate-400'
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Content per Step */}
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Choose Service & Doctor */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <label className="block text-sm font-bold text-teal-950 mb-3">
                    1. اختر الخدمة المطلوبة:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servicesData.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => setSelectedService(s.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start gap-3 ${
                          selectedService === s.id
                            ? 'border-teal-700 bg-mint-50/80 shadow-xs ring-1 ring-teal-700'
                            : 'border-mint-200 hover:border-mint-300 hover:bg-slate-50'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                            selectedService === s.id
                              ? 'border-teal-700 bg-teal-700 text-white'
                              : 'border-slate-300'
                          }`}
                        >
                          {selectedService === s.id && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-teal-950">{s.title}</div>
                          <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{s.shortDesc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.service && (
                    <p className="text-xs text-rose-600 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.service}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-teal-950 mb-3">
                    2. الطبيب المفضل (اختياري):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div
                      onClick={() => setSelectedDoctor('any')}
                      className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                        selectedDoctor === 'any'
                          ? 'border-teal-700 bg-mint-50/80 text-teal-950 font-bold ring-1 ring-teal-700'
                          : 'border-mint-200 hover:border-mint-300 text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-semibold">أي طبيب متاح</div>
                      <div className="text-[10px] text-slate-500">أقرب موعد ممكن</div>
                    </div>
                    {doctorsData.map((d) => (
                      <div
                        key={d.id}
                        onClick={() => setSelectedDoctor(d.id)}
                        className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                          selectedDoctor === d.id
                            ? 'border-teal-700 bg-mint-50/80 text-teal-950 font-bold ring-1 ring-teal-700'
                            : 'border-mint-200 hover:border-mint-300 text-slate-700'
                        }`}
                      >
                        <div className="text-xs font-semibold">{d.name}</div>
                        <div className="text-[10px] text-slate-500 truncate">{d.specialty.split('،')[0]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Choose Date & Time */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <label className="block text-sm font-bold text-teal-950 mb-3 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-teal-700" />
                    <span>تاريخ الموعد:</span>
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full sm:w-72 p-3.5 rounded-2xl border border-mint-300 bg-white text-slate-800 text-sm focus:border-teal-700 focus:ring-2 focus:ring-mint-200 transition-all"
                  />
                  {errors.date && (
                    <p className="text-xs text-rose-600 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.date}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-teal-950 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-teal-700" />
                      <span>الفترة الزمنية المفضلة:</span>
                    </label>

                    {/* Morning / Evening Toggle */}
                    <div className="flex bg-mint-100 p-1 rounded-xl text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => setSelectedPeriod('morning')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${
                          selectedPeriod === 'morning' ? 'bg-teal-700 text-white shadow-xs' : 'text-teal-900'
                        }`}
                      >
                        صباحية
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPeriod('evening')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${
                          selectedPeriod === 'evening' ? 'bg-teal-700 text-white shadow-xs' : 'text-teal-900'
                        }`}
                      >
                        مسائية
                      </button>
                    </div>
                  </div>

                  {/* Slot chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(selectedPeriod === 'morning' ? morningSlots : eveningSlots).map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`p-3 rounded-2xl border text-center text-xs font-bold transition-all ${
                          selectedTimeSlot === slot
                            ? 'bg-teal-700 text-white border-teal-700 shadow-teal-glow'
                            : 'bg-white text-slate-700 border-mint-200 hover:border-teal-400'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  {errors.time && (
                    <p className="text-xs text-rose-600 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.time}
                    </p>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-mint-50 border border-mint-200 text-xs text-teal-900 leading-relaxed">
                  🗓️ <strong>ملاحظة:</strong> هذا الحجز هو تأكيد موعد مبدئي. سنقوم بالاتصال بكم أو مراسلتكم لتأكيد وصولكم وتخصيص الغرفة المعقمة بدقة.
                </div>
              </motion.div>
            )}

            {/* STEP 3: Patient Information */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-bold text-teal-950 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-teal-700" />
                    <span>الاسم الثلاثي:</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: محمد علي حسن"
                    className="w-full p-3.5 rounded-2xl border border-mint-300 bg-white text-slate-800 text-sm focus:border-teal-700 focus:ring-2 focus:ring-mint-200 transition-all placeholder:text-slate-400"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-rose-600 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-teal-950 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-teal-700" />
                    <span>رقم الهاتف (الواتساب للتأكيد):</span>
                  </label>
                  <input
                    type="tel"
                    dir="ltr"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="0770 123 4567"
                    className="w-full p-3.5 rounded-2xl border border-mint-300 bg-white text-slate-800 text-sm focus:border-teal-700 focus:ring-2 focus:ring-mint-200 transition-all placeholder:text-slate-400 text-right"
                  />
                  {errors.phoneNumber && (
                    <p className="text-xs text-rose-600 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-teal-950 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-teal-700" />
                    <span>ملاحظات إضافية أو وصف الحالة (اختياري):</span>
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="أخبرنا باختصار عن استفسارك أو هل تشعر بألم حالي..."
                    className="w-full p-3.5 rounded-2xl border border-mint-300 bg-white text-slate-800 text-sm focus:border-teal-700 focus:ring-2 focus:ring-mint-200 transition-all placeholder:text-slate-400 resize-none"
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 4: Confirmation Screen */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-4"
              >
                <div className="w-20 h-20 rounded-full bg-mint-100 text-teal-700 flex items-center justify-center mx-auto mb-6 shadow-teal-glow">
                  <CheckCircle className="w-10 h-10 text-teal-700" />
                </div>

                <span className="text-xs uppercase tracking-widest text-teal-600 font-bold">
                  تم استلام طلب الحجز بنجاح
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-teal-950 mt-1 mb-3">
                  شكراً لك، أهلاً بك في عيادة لوما!
                </h3>
                <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-8">
                  تم تسجيل تفاصيل موعدك لدى قسم التنسيق الطبي. يمكنك تأكيد الموعد فوراً عبر واتساب لتثبيته دون أي انتظار.
                </p>

                {/* Booking Summary Box */}
                <div className="bg-mint-50/70 border border-mint-200 rounded-3xl p-6 max-w-md mx-auto text-right text-xs sm:text-sm space-y-3 mb-8">
                  <div className="flex justify-between border-b border-mint-200/80 pb-2">
                    <span className="text-slate-500">الاسم:</span>
                    <span className="font-bold text-slate-800">{fullName}</span>
                  </div>
                  <div className="flex justify-between border-b border-mint-200/80 pb-2">
                    <span className="text-slate-500">رقم الهاتف:</span>
                    <span className="font-bold text-slate-800" dir="ltr">{phoneNumber}</span>
                  </div>
                  <div className="flex justify-between border-b border-mint-200/80 pb-2">
                    <span className="text-slate-500">الخدمة:</span>
                    <span className="font-bold text-teal-800">{serviceObj.title}</span>
                  </div>
                  <div className="flex justify-between border-b border-mint-200/80 pb-2">
                    <span className="text-slate-500">الطبيب المشرف:</span>
                    <span className="font-bold text-slate-800">{doctorDisplayName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">الموعد المقترح:</span>
                    <span className="font-bold text-slate-800">{selectedDate} — الساعة {selectedTimeSlot}</span>
                  </div>
                </div>

                {/* Direct WhatsApp Action Button */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                  <a
                    href={`https://wa.me/${clinicInfo.whatsapp.replace('+', '')}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 px-6 rounded-full shadow-lg transition-all text-sm"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>تأكيد الموعد عبر واتساب</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-mint-100 text-teal-900 border border-mint-300 font-semibold py-3.5 px-6 rounded-full transition-colors text-sm"
                  >
                    <RefreshCw className="w-4 h-4 text-teal-600" />
                    <span>حجز موعد آخر</span>
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Navigation Buttons for Steps 1 - 3 */}
          {step < 4 && (
            <div className="flex items-center justify-between pt-8 border-t border-mint-200 mt-8">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-slate-600 hover:bg-mint-100 font-medium text-sm transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>السابق</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold px-7 py-3 rounded-full shadow-teal-glow transition-all duration-200 text-sm focus-visible:ring-2 focus-visible:ring-teal-700"
              >
                <span>{step === 3 ? 'إتمام الحجز المبدئي' : 'المتابعة'}</span>
                <ArrowLeft className="w-4 h-4 text-mint-300" />
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
