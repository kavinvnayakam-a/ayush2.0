'use client';

import { useState, useEffect } from 'react';

type CountdownTimerProps = {
  targetDate: Date;
};

const calculateTimeLeft = (targetDate: Date) => {
  const difference = +targetDate - +new Date();
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set initial time left on client-side to avoid hydration mismatch
    setTimeLeft(calculateTimeLeft(targetDate));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeParts = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div className="flex space-x-1 sm:space-x-2 my-4">
      {timeParts.map((part, index) => (
        <div key={part.label} className="flex items-center">
          <div className="text-center bg-white/80 backdrop-blur-sm p-2 rounded-lg border border-slate-200 shadow-sm w-[60px]">
            <div className="text-2xl font-black text-[hsl(93,20%,25%)]">{String(part.value).padStart(2, '0')}</div>
            <div className="text-[10px] font-bold text-[hsl(93,20%,40%)] uppercase">{part.label}</div>
          </div>
          {index < timeParts.length - 1 && <div className="text-2xl font-bold text-[hsl(93,45%,44%)]/50 mx-1">:</div>}
        </div>
      ))}
    </div>
  );
}
