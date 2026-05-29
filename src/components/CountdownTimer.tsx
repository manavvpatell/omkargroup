import React, { useState, useEffect } from 'react';
import { Calendar, Hourglass } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string; // "YYYY-MM-DD"
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Parse target date (starts of day at 10:00 AM)
      const targetTime = new Date(`${targetDate}T10:00:00`).getTime();
      const difference = targetTime - Date.now();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isOver: false
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timeBlocks = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds }
  ];

  return (
    <div className="bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800 backdrop-blur-md max-w-xl mx-auto block text-center space-y-4">
      <div className="flex items-center gap-2 justify-center text-xs font-mono uppercase tracking-widest text-amber-500 font-bold">
        <Hourglass className="w-4 h-4 text-amber-500 shrink-0" />
        <span>Vanguard Summit Commencing In</span>
      </div>

      {timeLeft.isOver ? (
        <div className="text-white py-4 font-bold text-lg font-mono uppercase text-center animate-pulse tracking-wider">
          ★ Summit Commenced or Under Way ★
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3 sm:gap-4 select-none">
          {timeBlocks.map((block) => (
            <div key={block.label} className="bg-slate-950 p-3 sm:p-4 rounded-xl border border-slate-850 relative">
              <span className="text-2xl sm:text-4xl font-extrabold font-mono text-white tracking-tighter">
                {String(block.value).padStart(2, '0')}
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono text-slate-500 uppercase tracking-widest block mt-1.5 font-bold">
                {block.label}
              </span>
            </div>
          ))}
        </div>
      )}

      <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
        Scheduled Date: {new Date(targetDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} at 10:00 AM IST
      </p>
    </div>
  );
}
