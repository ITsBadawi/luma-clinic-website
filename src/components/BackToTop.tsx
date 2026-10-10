import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-teal-800 border border-mint-200 shadow-soft-md flex items-center justify-center transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-teal-700 backdrop-blur-xs"
      aria-label="الرجوع إلى أعلى الصفحة"
    >
      <ArrowUp className="w-5 h-5 text-teal-700" />
    </button>
  );
};
