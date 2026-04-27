import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

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
  const [activeWish, setActiveWish] = useState<{ text: string; from: { x: number; y: number } } | null>(null);
  const [usedIds, setUsedIds] = useState<Set<number>>(new Set());
  const [lastWish, setLastWish] = useState<string>('');

  const stars: Star[] = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: Math.random() * 92 + 4,
        top: Math.random() * 80 + 6,
        size: Math.random() * 10 + 8,
        delay: Math.random() * 2,
      })),
    []
  );

  const handleStarClick = (star: Star) => {
    setUsedIds((prev) => new Set(prev).add(star.id));
    const fresh = WISHES.filter((w) => w !== lastWish);
    const picked = fresh[Math.floor(Math.random() * fresh.length)];
    setLastWish(picked);
    setActiveWish({ text: picked, from: { x: star.left, y: star.top } });
  };

  const dismiss = () => setActiveWish(null);

  return (
    <div className="relative w-full">
      {/* Star field */}
      <div className="relative w-full h-[520px] md:h-[580px] rounded-3xl overflow-hidden border border-primary/20 bg-gradient-to-b from-[#1a0a14] via-[#170811] to-[#0d0509] shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]">
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
              onClick={() => handleStarClick(star)}
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
            </motion.button>
          );
        })}

        {/* Hint label (only shown before first interaction) */}
        {!activeWish && usedIds.size === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-4 left-0 right-0 text-center text-[11px] uppercase tracking-[0.3em] text-foreground/50 pointer-events-none flex items-center justify-center gap-2"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
            tap any star
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
          </motion.div>
        )}

        {/* Wish reveal — appears INSIDE the sky, anchored to where the star was */}
        <AnimatePresence>
          {activeWish && (
            <>
              {/* Sparkle burst at the tapped star */}
              <motion.div
                key={`burst-${activeWish.text}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${activeWish.from.x}%`,
                  top: `${activeWish.from.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {Array.from({ length: 14 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute left-0 top-0 w-1.5 h-1.5 rounded-full bg-primary"
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: Math.cos((i * Math.PI) / 7) * 80,
                      y: Math.sin((i * Math.PI) / 7) * 80,
                      opacity: 0,
                      scale: 0.4,
                    }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                  />
                ))}
                <motion.div
                  initial={{ scale: 0, opacity: 0.9 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.7)_0,transparent_70%)]"
                />
              </motion.div>

              {/* Centered wish card with backdrop dim */}
              <motion.div
                key="dim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={dismiss}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-5 cursor-pointer"
              >
                <motion.div
                  key={activeWish.text}
                  initial={{ opacity: 0, scale: 0.6, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', damping: 18, stiffness: 220 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-md w-full bg-card/95 backdrop-blur-xl border border-primary/40 rounded-2xl px-6 py-7 md:px-8 md:py-9 shadow-[0_0_60px_-10px_hsl(var(--primary)/0.8)] cursor-default"
                >
                  <button
                    type="button"
                    onClick={dismiss}
                    aria-label="Close wish"
                    className="absolute top-2 right-2 p-1.5 rounded-full text-foreground/50 hover:text-foreground hover:bg-primary/15 transition-colors"
                  >
                    <X size={18} />
                  </button>

                  <div className="text-center text-primary/70 text-[11px] uppercase tracking-[0.3em] mb-3">
                    a wish for you
                  </div>

                  <p className="font-script text-2xl md:text-3xl text-primary leading-snug text-center drop-shadow-[0_0_18px_hsl(var(--primary)/0.5)]">
                    {activeWish.text}
                  </p>

                  <div className="mt-5 text-center text-[11px] uppercase tracking-[0.25em] text-foreground/40">
                    tap anywhere to pick another
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Wishes-collected counter */}
      <div className="mt-5 text-center">
        <span className="inline-block text-xs uppercase tracking-[0.3em] text-foreground/50">
          wishes collected:{' '}
          <span className="text-primary font-bold tabular-nums">{usedIds.size}</span>
          <span className="text-foreground/30"> / {stars.length}</span>
        </span>
      </div>
    </div>
  );
}
