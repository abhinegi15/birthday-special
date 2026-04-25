import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts: Heart[] = [];
      for (let i = 0; i < 25; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100 + 100, // start below screen
          size: Math.random() * 15 + 10,
          duration: Math.random() * 20 + 15, // very slow
          delay: Math.random() * -30, // staggered start
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-primary"
          style={{
            left: `${heart.x}vw`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
          }}
          initial={{ y: '100vh', x: 0, rotate: 0 }}
          animate={{
            y: '-20vh',
            x: [0, 20, -20, 0],
            rotate: [0, 90, -90, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}
