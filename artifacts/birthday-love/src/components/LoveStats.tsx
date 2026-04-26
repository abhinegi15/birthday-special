import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RefreshCw, Star, ShieldCheck } from 'lucide-react';

export function LoveStats() {
  const [recalcCount, setRecalcCount] = useState(0);
  const [myLoveValue, setMyLoveValue] = useState(0);
  const [herLoveValue, setHerLoveValue] = useState(0);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [reasonsCount, setReasonsCount] = useState(847329612);

  // Real-time counter
  useEffect(() => {
    const interval = setInterval(() => {
      setReasonsCount(prev => prev + 1);
    }, 2500); // increments slowly forever
    return () => clearInterval(interval);
  }, []);

  const recalculate = () => {
    setIsRecalculating(true);
    setMyLoveValue(0);
    setHerLoveValue(0);
    
    setTimeout(() => {
      setRecalcCount(prev => prev + 1);
      setIsRecalculating(false);
    }, 600);
  };

  // Run initial animation
  useEffect(() => {
    if (!isRecalculating) {
      const timer = setTimeout(() => {
        setMyLoveValue(120); // Goes over 100
        setHerLoveValue(99); // Stuck at 99
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [recalcCount, isRecalculating]);

  return (
    <div className="space-y-12">
      {/* Love Meter */}
      <motion.div 
        className="bg-card/80 backdrop-blur-md rounded-3xl p-8 border border-primary/20 shadow-xl relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="absolute -top-10 -right-10 text-primary/10 rotate-12 pointer-events-none">
          <Heart size={150} fill="currentColor" />
        </div>

        <div className="flex justify-between items-center mb-8 relative z-10">
          <h3 className="font-serif text-2xl text-foreground flex items-center gap-2">
            <Star className="text-secondary" fill="currentColor" size={20} />
            Official Love Meter
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={recalculate}
            className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            title="Recalculate"
          >
            <RefreshCw size={18} className={isRecalculating ? "animate-spin" : ""} />
          </motion.button>
        </div>

        <div className="space-y-8 relative z-10">
          {/* How much I love you */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-foreground/80">How much I love YOU</span>
              <span className="font-script text-primary font-bold text-lg">
                {myLoveValue > 100 ? "ERROR: TOO MUCH LOVE ∞%" : `${myLoveValue}%`}
              </span>
            </div>
            <div className="h-4 bg-primary/10 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(myLoveValue, 100)}%` }}
                transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
              />
              {myLoveValue > 100 && (
                <motion.div 
                  className="absolute top-0 left-0 h-full w-full bg-white/30"
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              )}
            </div>
            {myLoveValue > 100 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="text-xs text-secondary mt-1 text-right italic"
              >
                * Warning: Overflows containment field
              </motion.div>
            )}
          </div>

          {/* How much you love me */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-foreground/80">How much YOU love me</span>
              <span className="text-foreground/50">
                {herLoveValue}%
              </span>
            </div>
            <div className="h-4 bg-primary/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary/40 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${herLoveValue}%` }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                <div className="absolute right-0 top-0 h-full w-4 bg-gradient-to-l from-white/20 to-transparent animate-pulse" />
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-xs text-foreground/40 mt-1 flex items-center gap-1"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              ...still verifying, please hold
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Reasons Counter */}
        <motion.div 
          className="bg-card/80 backdrop-blur-md rounded-3xl p-8 border border-primary/20 shadow-xl flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-sm uppercase tracking-widest text-primary/70 mb-4 font-medium">
            Reasons I Love You
          </div>
          <div className="font-serif text-4xl md:text-5xl text-foreground mb-4 tabular-nums">
            {reasonsCount.toLocaleString()}
          </div>
          <div className="text-foreground/50 italic text-sm">
            ...and counting in real-time.
          </div>
        </motion.div>

        {/* Certificate */}
        <motion.div 
          className="bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')] bg-card/90 backdrop-blur-md rounded-3xl p-8 border border-primary/30 shadow-xl relative"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-4 right-4 text-primary/20">
            <ShieldCheck size={60} />
          </div>
          <div className="border-2 border-primary/30 rounded-xl p-6 h-full flex flex-col justify-center">
            <h4 className="font-serif text-xl text-primary mb-6 text-center border-b border-primary/20 pb-4">
              Official Compatibility Report
            </h4>
            <div className="space-y-3 font-mono text-sm text-foreground/80">
              <div className="flex justify-between border-b border-foreground/10 pb-1">
                <span>Match Score:</span>
                <span className="text-primary font-bold">100%</span>
              </div>
              <div className="flex justify-between border-b border-foreground/10 pb-1">
                <span>Status:</span>
                <span className="text-secondary font-bold">Endgame</span>
              </div>
              <div className="flex justify-between border-b border-foreground/10 pb-1">
                <span>Probability of Forever:</span>
                <span className="text-primary font-bold">Confirmed</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>Cutest Couple Award:</span>
                <span className="text-secondary font-bold">★ Verified</span>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-red-500/50 flex items-center justify-center rotate-[-15deg] opacity-70">
                <span className="text-red-500/60 font-bold text-xs uppercase tracking-tighter">Certified</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* This Much Gauge */}
      <motion.div 
        className="bg-card/80 backdrop-blur-md rounded-3xl p-8 border border-primary/20 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h4 className="font-serif text-lg text-foreground mb-8 text-center">How much do I love you?</h4>
        
        <div className="relative pt-4 pb-8 px-4">
          {/* Track */}
          <div className="h-2 bg-primary/10 rounded-full w-full relative">
            {/* Fill */}
            <motion.div 
              className="absolute top-0 left-0 h-full bg-primary rounded-full"
              initial={{ width: "10%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            />
            
            {/* Handle/Icon */}
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 text-primary drop-shadow-md flex items-center justify-center bg-card rounded-full p-2 border border-primary/30"
              initial={{ left: "10%", scale: 1 }}
              whileInView={{ left: "100%", scale: [1, 1.2, 1.5, 1.3] }}
              viewport={{ once: true }}
              transition={{ 
                left: { duration: 2, ease: "easeOut", delay: 0.5 },
                scale: { duration: 0.8, delay: 2.2 }
              }}
              style={{ x: "-50%" }}
            >
              <Heart size={24} fill="currentColor" />
            </motion.div>
          </div>
          
          <div className="flex justify-between text-xs mt-4 text-foreground/60 uppercase tracking-wider font-medium">
            <span>A little</span>
            <motion.span 
              className="text-primary font-bold"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2.5 }}
            >
              To the moon & back
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
