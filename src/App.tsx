import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Services } from './components/Services';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { Doctors } from './components/Doctors';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { BookingForm } from './components/BookingForm';
import { FAQ } from './components/FAQ';
import { ContactFooter } from './components/ContactFooter';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BackToTop } from './components/BackToTop';

export function App() {
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);
  const [bookingDoctorId, setBookingDoctorId] = useState<string | undefined>(undefined);

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForBooking = (serviceId: string) => {
    setBookingServiceId(serviceId);
    scrollToBooking();
  };

  const handleSelectDoctorForBooking = (doctorId: string) => {
    setBookingDoctorId(doctorId);
    scrollToBooking();
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-teal-700 selection:text-white">
      {/* Sticky Header */}
      <Navbar onOpenBooking={scrollToBooking} />

      {/* Main Content */}
      <main>
        {/* 1. Hero */}
        <Hero
          onOpenBooking={scrollToBooking}
          onExploreServices={scrollToServices}
        />

        {/* 2. Trust Bar */}
        <TrustBar />

        {/* 3. Services */}
        <Services onSelectServiceForBooking={handleSelectServiceForBooking} />

        {/* 4. Before / After Interactive Slider */}
        <BeforeAfterSlider />

        {/* 5. Our Doctors */}
        <Doctors onSelectDoctorForBooking={handleSelectDoctorForBooking} />

        {/* 6. How It Works (4-Step Timeline) */}
        <HowItWorks />

        {/* 7. Patient Testimonials */}
        <Testimonials />

        {/* 8. Booking Multi-step Form */}
        <BookingForm
          initialServiceId={bookingServiceId}
          initialDoctorId={bookingDoctorId}
        />

        {/* 9. FAQ Accordion */}
        <FAQ />
      </main>

      {/* 10. Contact & Footer */}
      <ContactFooter />

      {/* Interactive Fixed Elements */}
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
}

export default App;
