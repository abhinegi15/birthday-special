import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail } from 'lucide-react';

type Letter = {
  id: string;
  prompt: string;
  body: string;
};

const LETTERS: Letter[] = [
  {
    id: 'miss-me',
    prompt: 'Open when you miss me',
    body:
      "I miss you too — probably right now, while you're reading this. Close your eyes and remember the last time we laughed so hard we couldn't breathe. I'm carrying that exact moment around with me until we're together again.",
  },
  {
    id: 'sad',
    prompt: 'Open when you feel sad',
    body:
      "Whatever you're feeling, you don't have to be okay right now. You're allowed to be human. I'm right here, no fixing required, no questions asked. You are loved on your worst days exactly as much as on your best ones.",
  },
  {
    id: 'doubt',
    prompt: 'Open when you doubt yourself',
    body:
      "Listen to me — the world has not seen anyone quite like you, and it never will again. Every quiet thing you do counts. Every brave thing you've done already proves it. You're more capable than you know. I'm so proud of you.",
  },
  {
    id: 'cant-sleep',
    prompt: 'Open when you can\'t sleep',
    body:
      "Hi sleepyhead. Take three slow breaths with me. In… and out. Picture us somewhere warm, quiet, no plans tomorrow. I'm holding you in this little imagined place until your eyes get heavy. Goodnight, my favorite person.",
  },
  {
    id: 'proud',
    prompt: 'Open when you\'re proud of yourself',
    body:
      "YES. THERE IT IS. Whatever you just did — I'm yelling about it somewhere. I always knew you could. Hold this feeling. You earned every bit of it. I'd throw a parade if I could find one open at this hour.",
  },
  {
    id: 'birthday',
    prompt: 'Open on your birthday',
    body:
      "Today is the best day of the entire year because it's the day the world got you. Thank you for being born. Thank you for choosing me to walk next to you. Make a wish — I already know it'll come true. Happy birthday, my love.",
  },
];

export function OpenWhenLetters() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const handleOpen = (id: string) => {
    setOpenId(id);
    setReadIds((prev) => new Set(prev).add(id));
  };

  const openLetter = LETTERS.find((l) => l.id === openId);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {LETTERS.map((letter, i) => {
          const isRead = readIds.has(letter.id);
          return (
            <motion.button
              key={letter.id}
              type="button"
              onClick={() => handleOpen(letter.id)}
              initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.07, duration: 0.6, type: 'spring' }}
              whileHover={{ y: -6, rotate: i % 2 === 0 ? -1.5 : 1.5, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="group relative aspect-[5/3] rounded-2xl overflow-hidden text-left bg-gradient-to-br from-card via-card/95 to-primary/10 border border-primary/30 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_-10px_hsl(var(--primary)/0.5)] transition-shadow"
            >
              {/* Envelope flap */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary/15 to-transparent border-b border-primary/20 origin-top transition-transform duration-500 group-hover:[transform:perspective(600px)_rotateX(-25deg)]" />
              {/* Diagonal flap fold lines */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-1/2 h-1/2 border-r border-primary/15 [transform-origin:top_right] rotate-[26deg] translate-y-[-1px]" />
                <div className="absolute top-0 right-0 w-1/2 h-1/2 border-l border-primary/15 [transform-origin:top_left] -rotate-[26deg] translate-y-[-1px]" />
              </div>

              {/* Wax seal */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0_0_20px_hsl(var(--primary)/0.6)] flex items-center justify-center border-2 border-primary/40">
                  <span className="font-script text-xl text-white drop-shadow">♥</span>
                </div>
              </div>

              {/* Prompt label */}
              <div className="absolute inset-x-0 bottom-3 text-center px-3 z-10">
                <span className="font-script text-base md:text-lg text-foreground/90 inline-block bg-card/80 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/20">
                  {letter.prompt}
                </span>
              </div>

              {/* Read indicator */}
              {isRead && (
                <div className="absolute top-2 right-2 z-10 text-[10px] uppercase tracking-widest text-primary/70 bg-primary/10 px-2 py-0.5 rounded-full border border-primary/30">
                  opened
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setOpenId(null)}
          >
            <motion.button
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close letter"
              onClick={() => setOpenId(null)}
            >
              <X size={28} />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-gradient-to-br from-card via-card to-primary/5 rounded-3xl p-8 md:p-12 shadow-2xl border border-primary/40"
            >
              {/* Decorative corners */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />

              <div className="flex items-center gap-2 text-primary/70 text-xs uppercase tracking-[0.3em] mb-4 justify-center">
                <Mail size={14} />
                <span>a letter for you</span>
              </div>

              <h3 className="font-script text-3xl md:text-4xl text-primary text-center mb-6 drop-shadow-[0_0_15px_hsl(var(--primary)/0.5)]">
                {openLetter.prompt}
              </h3>

              <div className="font-serif text-base md:text-lg text-foreground/85 leading-relaxed text-center">
                {openLetter.body}
              </div>

              <div className="mt-8 text-center text-primary/50 text-2xl">♥</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
