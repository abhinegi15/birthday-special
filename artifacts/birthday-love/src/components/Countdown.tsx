import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Birth date: Monday, April 30, 2007 at 5:12:19 PM
const BIRTH_DATE = new Date('2007-04-30T17:12:19').getTime();

export function Countdown() {
  const [timeAlive, setTimeAlive] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().getTime();
      const difference = now - BIRTH_DATE;

      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
      const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeAlive({ years, days, hours, minutes, seconds });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Years', value: timeAlive.years },
    { label: 'Days', value: timeAlive.days },
    { label: 'Hours', value: timeAlive.hours },
    { label: 'Minutes', value: timeAlive.minutes },
    { label: 'Seconds', value: timeAlive.seconds }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
      {timeUnits.map((unit, i) => (
        <motion.div 
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.8 }}
          className="flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm border border-primary/10 rounded-2xl p-4 sm:p-6 w-24 sm:w-32 shadow-sm"
        >
          <span className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-foreground mb-1 tabular-nums">
            {unit.value.toString().padStart(2, '0')}
          </span>
          <span className="text-xs sm:text-sm text-primary uppercase tracking-widest font-medium">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
