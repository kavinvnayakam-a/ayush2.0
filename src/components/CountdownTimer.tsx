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
    <div className="flex space-x-2 my-4">
      {timeParts.map((part, index) => (
        <div key={part.label} className="flex items-center">
          <div className="text-center bg-white/50 p-2 rounded-md border border-green-200">
            <div className="text-2xl font-bold text-green-900">{String(part.value).padStart(2, '0')}</div>
            <div className="text-xs text-green-800">{part.label}</div>
          </div>
          {index < timeParts.length - 1 && <div className="text-2xl font-bold text-green-800 mx-1">:</div>}
        </div>
      ))}
    </div>
  );
}
