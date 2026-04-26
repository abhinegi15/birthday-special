import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WISHES = [
  "I wish for you to always feel as loved as you make me feel.",
  "I wish for you to chase every dream without ever doubting yourself.",
  "I wish for slow mornings, soft music, and your hand in mine.",
  "I wish for your laugh to be the soundtrack of every year ahead.",
  "I wish you'd see yourself the way I see you — every single day.",
  "I wish for a thousand more dates that turn into accidental adventures.",
  "I wish for the world to be gentler, just because you're walking through it.",
  "I wish for forehead kisses, late-night talks, and zero arguments about the AC.",
  "I wish for every birthday after this to somehow be even better.",
  "I wish for you to know — really know — that you are my favorite person.",
  "I wish for sunsets you'll remember and rainy days that feel cozy.",
  "I wish for your dreams to find you faster than they did me.",
];

type Star = {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
};

export function WishStars() {
  const [revealedId, setRevealedId] = useState<number | null>(null);
  const [usedIds, setUsedIds] = useState<Set<number>>(new Set());
  const [pickedWish, setPickedWish] = useState<string>('');

  const stars: Star[] = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: Math.random() * 95 + 1,
        top: Math.random() * 90 + 3,
        size: Math.random() * 10 + 8,
        delay: Math.random() * 2,
      })),
    []
  );

  const handleStarClick = (id: number) => {
    setRevealedId(id);
    setUsedIds((prev) => new Set(prev).add(id));
    const fresh = WISHES.filter((w) => w !== pickedWish);
    setPickedWish(fresh[Math.floor(Math.random() * fresh.length)]);
  };

  return (
    <div className="relative w-full">
      {/* Star field */}
      <div className="relative w-full h-[460px] md:h-[520px] rounded-3xl overflow-hidden border border-primary/20 bg-gradient-to-b from-[#1a0a14] via-[#170811] to-[#0d0509] shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]">
        {/* Faint nebula glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.18)_0,transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,hsl(var(--secondary)/0.14)_0,transparent_55%)] pointer-events-none" />

        {/* Twinkling background dust */}
        {Array.from({ length: 60 }).map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 1.5 + 0.5,
              height: Math.random() * 1.5 + 0.5,
            }}
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Clickable stars */}
        {stars.map((star) => {
          const used = usedIds.has(star.id);
          return (
            <motion.button
              key={star.id}
              type="button"
              onClick={() => handleStarClick(star.id)}
              className="absolute group"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: used ? [1, 0.6] : [1, 1.15, 1],
                opacity: used ? 0.35 : [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2.5,
                repeat: used ? 0 : Infinity,
                delay: star.delay,
              }}
              whileHover={{ scale: 1.6, opacity: 1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Make a wish on this star"
            >
              <svg
                width={star.size}
                height={star.size}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white drop-shadow-[0_0_8px_rgba(255,200,220,0.9)] group-hover:text-primary group-hover:drop-shadow-[0_0_14px_hsl(var(--primary)/1)] transition-colors"
              >
                <path d="M12 2l2.39 7.36H22l-6.18 4.49L18.21 22 12 17.27 5.79 22l2.39-8.15L2 9.36h7.61z" />
              </svg>

              {/* Sparkle burst on activation */}
              {revealedId === star.id && (
                <>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full bg-primary"
                      initial={{ x: 0, y: 0, opacity: 1 }}
                      animate={{
                        x: Math.cos((i * Math.PI) / 4) * 40,
                        y: Math.sin((i * Math.PI) / 4) * 40,
                        opacity: 0,
                      }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                    />
                  ))}
                </>
              )}
            </motion.button>
          );
        })}

        {/* Hint label */}
        <div className="absolute bottom-3 left-0 right-0 text-center text-[11px] uppercase tracking-[0.3em] text-foreground/40 pointer-events-none">
          tap any star
        </div>
      </div>

      {/* Wish reveal */}
      <div className="mt-6 min-h-[110px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {pickedWish ? (
            <motion.div
              key={pickedWish}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="max-w-2xl mx-auto text-center bg-card/70 backdrop-blur-md border border-primary/30 rounded-2xl px-6 py-5 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.6)]"
            >
              <p className="font-script text-2xl md:text-3xl text-primary leading-relaxed">
                {pickedWish}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-serif italic text-foreground/50 text-center"
            >
              Pick a star. Each one is holding a wish for you.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
