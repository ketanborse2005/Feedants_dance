import React, { useState, useEffect } from 'react';
import { Hourglass, Timer } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface CountdownTimerProps {
  targetIsoDate: string;
  language: Language;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetIsoDate, language }) => {
  const t = translations[language];

  // Initialize remaining time (seeded to 1d 06h 28m 32s from reference design)
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 1,
    hours: 6,
    minutes: 28,
    seconds: 32,
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(targetIsoDate).getTime();
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        // Fallback default loop so demo never shows 00:00:00 permanently
        setTimeLeft({ days: 1, hours: 6, minutes: 28, seconds: 32 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          return { days: 1, hours: 6, minutes: 28, seconds: 32 };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetIsoDate]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="mx-4 mt-3 px-3 py-2.5 bg-[#EDF9F8] border border-[#BCECE6] rounded-xl flex items-center justify-between text-xs shadow-2xs">
      {/* Left: Hourglass & Label */}
      <div className="flex items-center gap-1.5 text-slate-800 font-semibold text-[11.5px]">
        <Hourglass className="w-3.5 h-3.5 text-slate-700 stroke-[2.2]" />
        <span>{t.registrationClosesIn}</span>
      </div>

      {/* Center: Live countdown formatted as 01d : 06h : 28m : 32s */}
      <div className="font-extrabold text-[#005c53] font-mono tracking-tight text-[12.5px] tabular-nums">
        {pad(timeLeft.days)}d : {pad(timeLeft.hours)}h : {pad(timeLeft.minutes)}m : {pad(timeLeft.seconds)}s
      </div>

      {/* Right: Hurry up with Timer icon */}
      <div className="flex items-center gap-1 text-[#00796b] font-bold text-[11.5px]">
        <Timer className="w-3.5 h-3.5 stroke-[2.4]" />
        <span>{t.hurryUp}</span>
      </div>
    </div>
  );
};
