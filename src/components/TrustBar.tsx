import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { trustStats } from '../data/clinicData';
import { Award, Users, Stethoscope, Cpu } from 'lucide-react';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ target, duration = 1800, suffix = '' }) => {
  const [count, setCount] = useState(target); // Start with target as fallback for immediate display
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number | null = null;
    let animationFrameId: number;
    setCount(0); // Reset to 0 to start count up

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Smooth cubic ease out
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-heading font-bold text-teal-950 text-3xl sm:text-4xl lg:text-5xl tracking-tight" dir="ltr">
      {suffix}{count.toLocaleString('en-US')}
    </span>
  );
};

export const TrustBar: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'experience':
        return <Award className="w-6 h-6 text-teal-700" />;
      case 'patients':
        return <Users className="w-6 h-6 text-teal-700" />;
      case 'doctors':
        return <Stethoscope className="w-6 h-6 text-teal-700" />;
      case 'technology':
        return <Cpu className="w-6 h-6 text-teal-700" />;
      default:
        return <Award className="w-6 h-6 text-teal-700" />;
    }
  };

  return (
    <section className="py-12 bg-mint-100/70 border-y border-mint-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {trustStats.map((stat, index) => (
            <div
              key={stat.id}
              className={`flex flex-col items-center sm:items-start text-center sm:text-right p-4 rounded-2xl bg-white/70 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none border border-mint-200/50 sm:border-0 ${
                index < trustStats.length - 1 ? 'lg:border-l lg:border-mint-200/80 lg:pl-8' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-mint-200/80 flex items-center justify-center mb-3">
                {getIcon(stat.id)}
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-teal-900 mb-0.5">
                {stat.label}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {stat.subLabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
