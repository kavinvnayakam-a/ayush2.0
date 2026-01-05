'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { MapPin, Sparkles } from 'lucide-react';

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
    isOver: true,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isOver: false,
    };
  }

  return timeLeft;
};

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });

  useEffect(() => {
    // Set initial time left on client-side to avoid hydration mismatch
    setTimeLeft(calculateTimeLeft(targetDate));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isOver) {
    return (
      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-slate-200 shadow-sm text-center">
        <h3 className="text-xl font-black text-[hsl(93,45%,44%)] uppercase flex items-center justify-center gap-2">
          <Sparkles size={20} /> Expo Begins!
        </h3>
        <p className="text-sm font-bold text-slate-600 mt-2">Join us at Heartfulness, Chennai.</p>
        <Button asChild size="sm" className="mt-4 bg-[hsl(93,45%,44%)] text-white hover:bg-[#ffa62f] font-bold">
          <Link href="/venue">
            <MapPin className="mr-2 h-4 w-4" />
            Get Directions
          </Link>
        </Button>
      </div>
    );
  }

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
