'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  endTime: Date;
  onEnd?: () => void;
  className?: string;
}

export default function CountdownTimer({ endTime, onEnd, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isEnded, setIsEnded] = useState(false);

  function calculateTimeLeft() {
    const difference = +new Date(endTime) - +new Date();
    if (difference <= 0) {
      if (onEnd) onEnd();
      setIsEnded(true);
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      if (Object.values(newTimeLeft).every(v => v === 0)) {
        clearInterval(timer);
        if (onEnd) onEnd();
        setIsEnded(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onEnd]);

  if (isEnded) {
    return <span className={cn("text-gray-500", className)}>Auktion beendet</span>;
  }

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <div className="bg-gray-100 px-1.5 py-0.5 rounded">
        {String(timeLeft.days).padStart(2, '0')}
      </div>
      <span>:</span>
      <div className="bg-gray-100 px-1.5 py-0.5 rounded">
        {String(timeLeft.hours).padStart(2, '0')}
      </div>
      <span>:</span>
      <div className="bg-gray-100 px-1.5 py-0.5 rounded">
        {String(timeLeft.minutes).padStart(2, '0')}
      </div>
      <span>:</span>
      <div className="bg-gray-100 px-1.5 py-0.5 rounded">
        {String(timeLeft.seconds).padStart(2, '0')}
      </div>
    </div>
  );
}