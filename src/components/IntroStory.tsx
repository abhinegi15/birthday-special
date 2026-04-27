import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Music, Lightbulb, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

import cakeImg from '@/assets/intro-cake.png';
import pandaHug from '@/assets/stickers/panda-hug.png';
import pandaHeart from '@/assets/stickers/panda-heart.png';
import pandaKiss from '@/assets/stickers/panda-kiss.png';
import pandaCake from '@/assets/stickers/panda-cake.png';
import pandaFlowers from '@/assets/stickers/panda-flowers.png';
import pandaBackhug from '@/assets/stickers/panda-backhug.png';

const BALLOON_COLORS = ['#f472b6', '#fb7185', '#e11d48', '#fbbf24', '#c084fc', '#f9a8d4'];

function Balloon({ color, left, delay, duration, size }: { color: string; left: number; delay: number; duration: number; size: number; }) {
  return (
    <motion.div
      className="absolute bottom-[-180px] flex flex-col items-center pointer-events-none"
      style={{ left: `${left}%` }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: -1400, opacity: [0, 1, 1, 0.9] }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      <div
        className="rounded-full relative"
        style={{
          width: size,
          height: size * 1.2,
          background: `radial-gradient(circle at 30% 30%, ${color}ee, ${color}99 70%, ${color}55)`,
          boxShadow: `0 10px 40px ${color}66, inset -8px -10px 20px rgba(0,0,0,0.2), inset 8px 6px 12px rgba(255,255,255,0.3)`,
        }}
      >
        {/* Highlight */}
        <span
          className="absolute rounded-full bg-white/50 blur-sm"
          style={{ width: size * 0.18, height: size * 0.22, top: size * 0.15, left: size * 0.18 }}
        />
        {/* Knot */}
        <span
          className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0"
          style={{
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: `10px solid ${color}`,
          }}
        />
      </div>
      {/* String */}
      <div className="w-px bg-white/30" style={{ height: size * 1.6 }} />
    </motion.div>
  );
}

type Step =
  | 'countdown'
  | 'happy-birthday'
  | 'bond'
  | 'vibe'
  | 'something-special'
  | 'celebrate'
  | 'balloons'
  | 'envelope-closed'
  | 'envelope-open'
  | 'final';

type Props = {
  name: string;
  fromName: string;
  onFinish: (opts: { lightsOn: boolean; playMusic: boolean }) => void;
};

export function IntroStory({ name, fromName, onFinish }: Props) {
  const [step, setStep] = useState<Step>('countdown');
  const [count, setCount] = useState(3);

  // Auto-advance the countdown
  useEffect(() => {
    if (step !== 'countdown') return;
    if (count === 0) {
      const t = setTimeout(() => setStep('happy-birthday'), 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCount((c) => c - 1), 900);
    return () => clearTimeout(t);
  }, [step, count]);

  // Confetti when balloons start
  useEffect(() => {
    if (step !== 'balloons') return;
    const colors = ['#f472b6', '#fbbf24', '#ffffff', '#e11d48', '#c084fc'];
    const end = Date.now() + 1800;
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, [step]);

  const balloons = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        left: 4 + (i / 18) * 92 + (Math.random() * 6 - 3),
        delay: Math.random() * 0.8,
        duration: 5 + Math.random() * 3,
        size: 60 + Math.random() * 50,
      })),
    []
  );

  const NextButton = ({
    label,
    onClick,
    icon: Icon,
  }: {
    label: string;
    onClick: () => void;
    icon?: typeof ArrowRight;
  }) => {
    const I = Icon ?? ArrowRight;
    return (
      <motion.button
        type="button"
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="group relative mt-10 md:mt-12 inline-flex items-center gap-2.5 px-7 md:px-9 py-3 md:py-3.5 rounded-full font-medium text-sm md:text-base tracking-wide text-white overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)',
          boxShadow:
            '0 8px 24px -8px hsl(var(--primary) / 0.6), 0 0 0 1px hsl(var(--primary) / 0.4) inset, 0 1px 0 0 rgba(255,255,255,0.25) inset',
        }}
      >
        {/* Soft inner sheen */}
        <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-transparent to-transparent" />
        {/* Hover glow */}
        <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: '0 0 35px 4px hsl(var(--primary) / 0.55)' }}
        />
        <span className="relative z-10">{label}</span>
        <motion.span
          className="relative z-10 inline-flex"
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <I size={16} className="md:w-[18px] md:h-[18px]" />
        </motion.span>
      </motion.button>
    );
  };

  return (
    <div className="fixed inset-0 z-[200] bg-gradient-to-b from-[#0a0309] via-[#15040d] to-[#0a0309] text-foreground overflow-hidden">
      {/* Ambient drifting glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.18)_0%,transparent_60%)] blur-3xl" />
      </div>
      {/* Twinkling background */}
      {Array.from({ length: 60 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 2 + 0.5,
            height: Math.random() * 2 + 0.5,
          }}
          animate={{ opacity: [0.1, 0.7, 0.1] }}
          transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}

      <div className="relative w-full h-full flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {/* COUNTDOWN */}
          {step === 'countdown' && (
            <motion.div
              key="countdown"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <AnimatePresence mode="wait">
                {count > 0 ? (
                  <motion.div
                    key={count}
                    initial={{ scale: 0.4, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 1.5, opacity: 0, rotate: 6 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="font-serif text-[14rem] md:text-[20rem] leading-none text-white"
                    style={{
                      textShadow:
                        '0 0 30px hsl(var(--primary) / 0.95), 0 0 70px hsl(var(--primary) / 0.7), 0 0 120px hsl(var(--primary) / 0.4)',
                    }}
                  >
                    {count}
                  </motion.div>
                ) : (
                  <motion.div
                    key="go"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-script text-7xl md:text-9xl text-primary drop-shadow-[0_0_50px_hsl(var(--primary)/1)]"
                  >
                    ♥
                  </motion.div>
                )}
              </AnimatePresence>
              <p className="mt-8 uppercase tracking-[0.4em] text-xs text-foreground/50">getting ready…</p>
            </motion.div>
          )}

          {/* HAPPY BIRTHDAY */}
          {step === 'happy-birthday' && (
            <motion.div
              key="hb"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl px-2"
            >
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-primary uppercase tracking-[0.4em] text-[10px] md:text-sm mb-5"
              >
                ♥ for someone very special ♥
              </motion.div>

              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-foreground leading-[0.95]"
                style={{
                  textShadow:
                    '0 0 30px hsl(var(--primary) / 0.65), 0 0 70px hsl(var(--primary) / 0.35)',
                }}
              >
                Happy Birthday
              </motion.h1>

              {/* Her name in script */}
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.9 }}
                className="font-script text-5xl sm:text-6xl md:text-8xl text-primary mt-3 md:mt-4 leading-[1.1]"
                style={{
                  textShadow:
                    '0 0 30px hsl(var(--primary) / 0.9), 0 0 60px hsl(var(--primary) / 0.5)',
                }}
              >
                {name}
              </motion.p>

              {/* Nineteen years ago line */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.9 }}
                className="font-serif italic text-foreground/75 text-sm sm:text-base md:text-lg mt-7 md:mt-9 max-w-xl mx-auto leading-relaxed"
              >
                Nineteen years ago, on Monday, 30 April 2007, at 5:12:19&nbsp;PM, the world got its softest soul.
              </motion.p>

              <NextButton label="Next" onClick={() => setStep('bond')} />
            </motion.div>
          )}

          {/* BOND with stickers */}
          {step === 'bond' && (
            <motion.div
              key="bond"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl"
            >
              <p className="text-primary uppercase tracking-[0.3em] text-xs mb-4">step by step</p>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-10 leading-snug">
                Our bond grew into something <span className="text-primary">special</span>.
              </h2>
              <div className="flex justify-center items-center flex-wrap gap-6 md:gap-10">
                {[pandaHug, pandaHeart, pandaKiss, pandaBackhug].map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    alt=""
                    className="w-20 md:w-28 h-20 md:h-28 object-contain drop-shadow-[0_8px_20px_rgba(255,150,180,0.4)]"
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.18, duration: 0.6, type: 'spring' }}
                  />
                ))}
              </div>
              <NextButton label="Next" onClick={() => setStep('vibe')} />
            </motion.div>
          )}

          {/* VIBE */}
          {step === 'vibe' && (
            <motion.div
              key="vibe"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl"
            >
              <p className="text-primary uppercase tracking-[0.3em] text-xs mb-4">the vibe between us</p>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-3">
                Sweet, warm, and totally yours.
              </h2>
              <p className="font-script text-5xl md:text-7xl text-primary mt-6 drop-shadow-[0_0_30px_hsl(var(--primary)/0.7)]">
                Happy Birthday, {name}
              </p>
              <div className="mt-8 flex justify-center gap-6">
                <motion.img src={pandaFlowers} alt="" className="w-20 h-20 object-contain" animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }} />
                <motion.img src={pandaCake} alt="" className="w-20 h-20 object-contain" animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />
              </div>
              <NextButton label="Next" onClick={() => setStep('something-special')} />
            </motion.div>
          )}

          {/* I MADE SOMETHING SPECIAL */}
          {step === 'something-special' && (
            <motion.div
              key="special"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl"
            >
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <Sparkles size={48} className="text-secondary" />
              </motion.div>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4 leading-snug">
                I made something special<br />just for you.
              </h2>
              <p className="font-serif text-foreground/60 mt-2 text-base md:text-lg">
                A little world built only for your birthday. Ready to see it?
              </p>
              <NextButton label="Let's Go" onClick={() => setStep('celebrate')} />
            </motion.div>
          )}

          {/* CELEBRATE */}
          {step === 'celebrate' && (
            <motion.div
              key="celebrate"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.h2
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="font-serif text-5xl md:text-7xl text-foreground"
              >
                Let's celebrate
                <br />
                <span className="font-script text-primary text-6xl md:text-8xl drop-shadow-[0_0_40px_hsl(var(--primary)/0.8)]">
                  your birthday
                </span>
              </motion.h2>
              <NextButton label="Release the balloons" onClick={() => setStep('balloons')} />
            </motion.div>
          )}

          {/* BALLOONS + YOU ARE SPECIAL + CAKE */}
          {step === 'balloons' && (
            <motion.div
              key="balloons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center"
            >
              {/* Balloons */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {balloons.map((b, i) => (
                  <Balloon key={i} {...b} />
                ))}
              </div>

              <div className="relative z-10 px-6">
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="font-script text-4xl md:text-6xl text-secondary mb-4 drop-shadow-[0_0_25px_hsl(var(--secondary)/0.7)]"
                >
                  You are special
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6, duration: 0.9, type: 'spring' }}
                  className="font-serif text-5xl md:text-7xl text-foreground"
                  style={{
                    textShadow:
                      '0 0 20px hsl(var(--primary) / 0.8), 0 0 40px hsl(var(--primary) / 0.5), 0 0 80px hsl(var(--primary) / 0.3)',
                  }}
                >
                  Happy Birthday<br />
                  <span className="font-script text-primary text-6xl md:text-8xl">{name}</span>
                </motion.h2>

                <motion.img
                  src={cakeImg}
                  alt="Birthday cake"
                  initial={{ opacity: 0, y: 60, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 2.2, duration: 1, type: 'spring' }}
                  className="mx-auto w-48 md:w-64 mt-8 drop-shadow-[0_20px_40px_hsl(var(--primary)/0.5)]"
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.4, duration: 0.6 }}
                >
                  <NextButton label="There's more" onClick={() => setStep('envelope-closed')} />
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ENVELOPE CLOSED */}
          {step === 'envelope-closed' && (
            <motion.div
              key="env-closed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-md"
            >
              <p className="text-primary uppercase tracking-[0.3em] text-[10px] md:text-xs mb-5">a little something more</p>
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8 md:mb-10">
                There's a letter here for you.
              </h2>

              {/* Big envelope — entire envelope is clickable */}
              <motion.button
                type="button"
                onClick={() => setStep('envelope-open')}
                aria-label="Open the envelope"
                whileHover={{ y: -6, rotate: 1 }}
                whileTap={{ scale: 0.97 }}
                className="group relative mx-auto block aspect-[5/3] w-64 sm:w-72 md:w-80 rounded-2xl bg-gradient-to-br from-card via-card/95 to-primary/15 border border-primary/40 shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.7)] overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary/20 to-transparent border-b border-primary/30" />
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-1/2 h-1/2 border-r border-primary/20 [transform-origin:top_right] rotate-[26deg]" />
                  <div className="absolute top-0 right-0 w-1/2 h-1/2 border-l border-primary/20 [transform-origin:top_left] -rotate-[26deg]" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center border-2 border-primary/40 shadow-[0_0_30px_hsl(var(--primary)/0.7)] group-hover:shadow-[0_0_50px_hsl(var(--primary)/0.9)] transition-shadow">
                    <span className="font-script text-2xl text-white">♥</span>
                  </div>
                </motion.div>
                {/* Tiny "tap me" hint */}
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-primary/70">
                  tap to open
                </span>
              </motion.button>

              <NextButton
                label="Open the envelope"
                icon={Mail}
                onClick={() => setStep('envelope-open')}
              />
            </motion.div>
          )}

          {/* ENVELOPE OPEN — letter */}
          {step === 'envelope-open' && (
            <motion.div
              key="env-open"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, type: 'spring' }}
              className="relative max-w-lg w-full text-center"
            >
              <div className="relative bg-gradient-to-br from-card via-card to-primary/10 border border-primary/40 rounded-3xl px-8 py-10 md:px-12 md:py-12 shadow-[0_0_70px_-10px_hsl(var(--primary)/0.7)]">
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />

                <p className="text-primary/70 text-xs uppercase tracking-[0.3em] mb-4">a letter from me</p>
                <h3 className="font-script text-3xl md:text-4xl text-primary mb-6 drop-shadow-[0_0_15px_hsl(var(--primary)/0.5)]">
                  My love,
                </h3>
                <p className="font-serif text-base md:text-lg text-foreground/85 leading-relaxed">
                  I built this whole little world tonight just to tell you one thing: you are the best part of my every single day. Thank you for existing. Thank you for being mine.
                </p>
                <p className="font-serif text-base md:text-lg text-foreground/85 leading-relaxed mt-4">
                  Today, the whole sky belongs to you. Make a wish — I'll spend the rest of the year helping it come true.
                </p>
                <p className="font-script text-2xl text-primary text-right mt-6">
                  yours, {fromName}
                </p>
                <div className="mt-6 text-primary/40 text-xl">♥</div>
              </div>

              <NextButton label="Continue" onClick={() => setStep('final')} />
            </motion.div>
          )}

          {/* FINAL — turn on lights + play music */}
          {step === 'final' && (
            <motion.div
              key="final"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl"
            >
              <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
                Ready to step inside?
              </h2>
              <p className="font-serif text-foreground/65 mb-10 text-base md:text-lg">
                Turn on the lights and start the music — your full birthday world is waiting on the other side.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onFinish({ lightsOn: true, playMusic: false })}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-secondary text-secondary-foreground font-medium tracking-wide shadow-[0_0_30px_-5px_hsl(var(--secondary)/0.7)]"
                >
                  <Lightbulb size={18} /> Turn on the lights
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onFinish({ lightsOn: true, playMusic: true })}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium tracking-wide shadow-[0_0_30px_-5px_hsl(var(--primary)/0.7)]"
                >
                  <Music size={18} /> Lights + Play music
                </motion.button>
              </div>

              <button
                type="button"
                onClick={() => onFinish({ lightsOn: true, playMusic: false })}
                className="mt-8 text-xs uppercase tracking-[0.3em] text-foreground/40 hover:text-foreground/70 transition-colors"
              >
                skip intro
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip button — always available except on countdown */}
      {step !== 'countdown' && step !== 'final' && (
        <button
          type="button"
          onClick={() => onFinish({ lightsOn: true, playMusic: false })}
          className="absolute bottom-6 right-6 text-xs uppercase tracking-[0.3em] text-foreground/40 hover:text-foreground/70 transition-colors"
        >
          skip ↦
        </button>
      )}
    </div>
  );
}
