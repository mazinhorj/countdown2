'use client';

import React, { useState, useEffect } from 'react';
import { getTimeUntilEvent, CountdownTime } from '@/utils/dateUtils';

interface CountdownTimerProps {
  eventDate: string;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ eventDate, className = '' }) => {
  const [time, setTime] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateCountdown = () => {
      const newTime = getTimeUntilEvent(eventDate);
      setTime(newTime);
    };

    // Atualizar imediatamente
    updateCountdown();

    // Configurar intervalo para atualizar a cada segundo
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [eventDate, mounted]);

  if (!mounted) {
    return null; // Evita hidration mismatch
  }

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className={`grid grid-cols-4 gap-4 ${className}`}>
      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 text-center">
        <div className="text-3xl md:text-4xl font-bold text-white">
          {formatNumber(time.days)}
        </div>
        <div className="text-sm text-white/80 mt-1">
          Dias
        </div>
      </div>
      
      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 text-center">
        <div className="text-3xl md:text-4xl font-bold text-white">
          {formatNumber(time.hours)}
        </div>
        <div className="text-sm text-white/80 mt-1">
          Hs.
        </div>
      </div>
      
      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 text-center">
        <div className="text-3xl md:text-4xl font-bold text-white">
          {formatNumber(time.minutes)}
        </div>
        <div className="text-sm text-white/80 mt-1">
          Min.
        </div>
      </div>
      
      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 text-center">
        <div className="text-3xl md:text-4xl font-bold text-white">
          {formatNumber(time.seconds)}
        </div>
        <div className="text-sm text-white/80 mt-1">
          Seg.
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

