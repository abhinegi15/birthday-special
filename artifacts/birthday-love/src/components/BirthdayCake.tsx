import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export function BirthdayCake() {
  const [isBlownOut, setIsBlownOut] = useState(false);

  const handleBlowOut = () => {
    if (isBlownOut) return;
    
    setIsBlownOut(true);
    
    // Confetti burst
    const end = Date.now() + 2 * 1000;
    const colors = ['#f4a4ac', '#d4af37', '#ffffff', '#e8c4c4'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <div className="relative flex flex-col items-center max-w-md mx-auto py-12">
      <div 
        className="relative cursor-pointer group"
        onClick={handleBlowOut}
      >
        <motion.div 
          className="relative z-10 text-center"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="flex justify-center gap-6 mb-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative w-4 h-16 bg-gradient-to-b from-white to-orange-100 rounded-t-sm rounded-b-md shadow-sm border border-orange-200/50">
                {/* Candle stripes */}
                <div className="absolute inset-0 opacity-20 overflow-hidden rounded-[inherit]">
                  <div className="w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[repeating-linear-gradient(transparent,transparent_10px,var(--color-primary)_10px,var(--color-primary)_20px)]" />
                </div>
                {/* Flame */}
                {!isBlownOut && (
                  <motion.div 
                    className="absolute -top-8 left-1/2 -translate-x-1/2 w-5 h-8 bg-gradient-to-b from-yellow-300 via-orange-400 to-red-500 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] origin-bottom shadow-[0_0_20px_rgba(251,191,36,0.6)]"
                    animate={{
                      scale: [1, 1.1, 0.9, 1.05, 1],
                      rotate: [-2, 3, -1, 4, -2],
                    }}
                    transition={{
                      duration: 0.5 + i * 0.1,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                )}
                {/* Smoke when blown out */}
                {isBlownOut && (
                  <motion.div 
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-400 rounded-full blur-sm"
                    initial={{ opacity: 0.8, y: 0, scale: 1 }}
                    animate={{ opacity: 0, y: -40, scale: 3 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                )}
              </div>
            ))}
          </div>
          
          {/* Cake Body */}
          <div className="relative w-64 h-32 bg-white rounded-xl shadow-lg border border-pink-100 flex flex-col items-center justify-center overflow-hidden">
            {/* Icing drips */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-primary/20 rounded-b-3xl"></div>
            <div className="absolute top-0 left-4 w-8 h-12 bg-primary/20 rounded-b-full"></div>
            <div className="absolute top-0 left-16 w-10 h-10 bg-primary/20 rounded-b-full"></div>
            <div className="absolute top-0 right-16 w-12 h-14 bg-primary/20 rounded-b-full"></div>
            <div className="absolute top-0 right-4 w-8 h-10 bg-primary/20 rounded-b-full"></div>
            
            <span className="font-serif text-xl text-primary/80 mt-4 relative z-10">Make a wish...</span>
          </div>
          
          {/* Cake plate */}
          <div className="w-72 h-4 bg-gray-200 rounded-full mt-2 shadow-md"></div>
        </motion.div>
        
        {!isBlownOut && (
          <div className="absolute -bottom-16 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity text-sm text-primary/70">
            Click to blow out the candles
          </div>
        )}
      </div>

      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isBlownOut ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h3 className="font-script text-4xl md:text-5xl text-primary mb-4">Your wish is safe with me</h3>
        <p className="font-serif text-lg text-foreground/80 max-w-md">
          May every dream you hold in your heart tonight come true this year. I'll do everything I can to help make them happen.
        </p>
      </motion.div>
    </div>
  );
}
