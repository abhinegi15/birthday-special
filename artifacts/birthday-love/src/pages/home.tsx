import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FloatingHearts } from '@/components/FloatingHearts';
import { HeartCursor } from '@/components/HeartCursor';
import { MusicPlayer } from '@/components/MusicPlayer';
import { Countdown } from '@/components/Countdown';
import { BirthdayCake } from '@/components/BirthdayCake';
import { LoveStats } from '@/components/LoveStats';
import { StarryBackground } from '@/components/StarryBackground';
import { WishStars } from '@/components/WishStars';
import { OpenWhenLetters } from '@/components/OpenWhenLetters';

// Placeholders for photos. Replace these with her actual photos any time.
import solo1 from '@/assets/solo-1.png';
import solo2 from '@/assets/solo-2.png';
import solo3 from '@/assets/solo-3.png';
import couple1 from '@/assets/couple-1.png';
import couple2 from '@/assets/couple-2.png';
import couple3 from '@/assets/couple-3.png';

// Trending Bubu & Dudu style panda couple stickers
import pandaHug from '@/assets/stickers/panda-hug.png';
import pandaHeart from '@/assets/stickers/panda-heart.png';
import pandaCake from '@/assets/stickers/panda-cake.png';
import pandaKiss from '@/assets/stickers/panda-kiss.png';
import pandaSleep from '@/assets/stickers/panda-sleep.png';
import pandaFlowers from '@/assets/stickers/panda-flowers.png';
import pandaWalk from '@/assets/stickers/panda-walk.png';
import pandaBackhug from '@/assets/stickers/panda-backhug.png';

const STICKERS = [
  { src: pandaHug, label: 'just one more hug' },
  { src: pandaHeart, label: 'this is for you' },
  { src: pandaKiss, label: 'mwah' },
  { src: pandaCake, label: 'cake o\'clock' },
  { src: pandaFlowers, label: 'picked these for you' },
  { src: pandaSleep, label: 'sweet dreams together' },
  { src: pandaWalk, label: 'wherever, as long as it\'s with you' },
  { src: pandaBackhug, label: 'caught you' },
];

const LOVE_REASONS = [
  "The way your eyes crinkle when you laugh at something genuinely funny.",
  "How fiercely you care about the people you love.",
  "That little sleepy voice you have right when you wake up.",
  "The incredible way you see the beauty in small, everyday things.",
  "Your passion and drive — it's the most magnetic thing in the world.",
  "How safe and completely myself I feel when I'm just sitting next to you.",
  "The way you randomly start dancing or singing when you're happy.",
  "Your kindness, which you give so freely even when the world doesn't deserve it.",
  "The warmth of your hand in mine.",
  "Just... you. All of you. Every single part."
];

// Floating decorative sticker — drifts and bobs gently in the margins
function FloatingSticker({
  src,
  className,
  size = 96,
  rotate = 0,
  delay = 0,
}: {
  src: string;
  className?: string;
  size?: number;
  rotate?: number;
  delay?: number;
}) {
  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none drop-shadow-[0_8px_24px_rgba(255,150,180,0.25)] ${className ?? ''}`}
      style={{ width: size, height: size, objectFit: 'contain' }}
      initial={{ opacity: 0, y: 20, rotate: rotate - 6, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, rotate, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay, duration: 1, ease: 'easeOut' }}
    >
    </motion.img>
  );
}

function BobbingSticker({
  src,
  className,
  size = 88,
  rotate = 0,
}: {
  src: string;
  className?: string;
  size?: number;
  rotate?: number;
}) {
  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none drop-shadow-[0_10px_30px_rgba(255,150,180,0.3)] ${className ?? ''}`}
      style={{ width: size, height: size, objectFit: 'contain' }}
      animate={{ y: [0, -10, 0], rotate: [rotate - 3, rotate + 3, rotate - 3] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export default function Home() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const NAME = "[Her Name]"; // Boyfriend: Replace this!
  const BOYFRIEND_NAME = "[Your Name]"; // Boyfriend: Replace this!

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden">
      <StarryBackground />
      <HeartCursor />
      <FloatingHearts />
      <MusicPlayer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setLightboxImage(null)}
          >
            <motion.button
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close"
            >
              <X size={32} />
            </motion.button>
            <motion.img
              src={lightboxImage}
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 w-full">

        {/* HERO SECTION */}
        <section className="relative min-h-[100dvh] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
          {/* Hero glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.25)_0%,transparent_60%)] blur-2xl" />
            <div className="absolute right-[15%] top-[20%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-[radial-gradient(circle,hsl(var(--secondary)/0.18)_0%,transparent_70%)] blur-3xl" />
          </div>

          {/* Floating stickers around hero */}
          <BobbingSticker src={pandaHeart} className="absolute left-[6%] top-[18%] hidden md:block" size={110} rotate={-12} />
          <BobbingSticker src={pandaFlowers} className="absolute right-[7%] top-[22%] hidden md:block" size={120} rotate={10} />
          <BobbingSticker src={pandaKiss} className="absolute left-[10%] bottom-[12%] hidden md:block" size={100} rotate={6} />
          <BobbingSticker src={pandaHug} className="absolute right-[8%] bottom-[14%] hidden md:block" size={110} rotate={-8} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="max-w-3xl relative z-10"
          >
            <p className="text-primary tracking-[0.3em] uppercase text-xs md:text-sm mb-6 font-medium">For Her, On Her Day</p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight drop-shadow-[0_2px_30px_rgba(255,180,200,0.25)]">
              Happy Birthday,<br />
              <span className="font-script text-primary text-6xl md:text-8xl lg:text-9xl capitalize block mt-4 drop-shadow-[0_0_30px_hsl(var(--primary)/0.6)]">{NAME}</span>
            </h1>
            <p className="font-serif text-base md:text-xl text-foreground/75 mt-8 max-w-xl mx-auto leading-relaxed">
              To the girl who makes every ordinary day feel like magic. Tonight, the whole sky is lit just for you.
            </p>

            <motion.div
              className="mt-16 text-primary/60 text-sm tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0.5] }}
              transition={{ delay: 2, duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            >
              ↓ scroll gently ↓
            </motion.div>
          </motion.div>
        </section>

        {/* TIME ALIVE SECTION */}
        <section className="py-24 px-6 relative overflow-hidden border-y border-primary/10 bg-card/30 backdrop-blur-sm">
          <FloatingSticker src={pandaSleep} className="absolute -left-4 top-8 hidden lg:block opacity-90" size={130} rotate={-10} />
          <FloatingSticker src={pandaWalk} className="absolute -right-6 bottom-6 hidden lg:block opacity-90" size={130} rotate={12} />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.15)_0,transparent_70%)] pointer-events-none" />
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1 }}
            >
              <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">Every second since you arrived</h2>
              <p className="font-serif text-foreground/70 mb-12 max-w-2xl mx-auto">
                Born on a Monday afternoon at exactly 5:12:19 PM, the world got a little softer that day. This is exactly how long you've been making everything better:
              </p>

              <Countdown />
            </motion.div>
          </div>
        </section>

        {/* THE LOVE LETTER */}
        <section className="py-32 px-6 relative">
          <FloatingSticker src={pandaHeart} className="absolute right-[8%] top-12 hidden md:block" size={90} rotate={14} />
          <FloatingSticker src={pandaFlowers} className="absolute left-[6%] bottom-12 hidden md:block" size={90} rotate={-12} />

          <div className="max-w-3xl mx-auto">
            <motion.div
              className="bg-card/70 backdrop-blur-xl rounded-2xl p-8 md:p-16 shadow-2xl border border-primary/25 relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2 }}
            >
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />

              <h2 className="font-script text-5xl md:text-6xl text-primary mb-10 text-center drop-shadow-[0_0_20px_hsl(var(--primary)/0.5)]">My dearest,</h2>

              <div className="space-y-6 font-serif text-lg md:text-xl text-foreground/85 leading-relaxed">
                <p>
                  I've been trying to find the perfect words to tell you how much you mean to me, but nineteen years of you existing in this world feels too big for ordinary sentences.
                </p>
                <p>
                  Before I met you, I didn't know someone could feel so much like home. I didn't know that just seeing a name pop up on my phone could change the entire trajectory of my day. You have this incredible, effortless way of bringing light into every room you walk into.
                </p>
                <p>
                  Today is about celebrating the beautiful, complex, brilliant person you are. I want you to look in the mirror today and see what I see every single day: someone truly breathtaking, inside and out.
                </p>
                <p>
                  Thank you for letting me be part of your story. Thank you for your patience, your laughter, and your heart. I promise to spend this next year making sure you never forget how deeply loved you are.
                </p>
                <p className="pt-6 font-script text-3xl text-primary text-right">
                  Forever yours,
                </p>
                <p className="font-script text-4xl text-foreground text-right pr-4">
                  {BOYFRIEND_NAME}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* HER GALLERY */}
        <section className="py-24 px-6 relative bg-primary/5">
          <BobbingSticker src={pandaKiss} className="absolute left-4 top-10 hidden md:block" size={90} rotate={-10} />
          <BobbingSticker src={pandaHug} className="absolute right-4 bottom-10 hidden md:block" size={100} rotate={12} />

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">The Birthday Girl</h2>
              <p className="font-serif text-foreground/60">A masterpiece in every light.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { src: solo1, delay: 0.1, alt: 'Beautiful portrait 1' },
                { src: solo2, delay: 0.3, alt: 'Beautiful portrait 2' },
                { src: solo3, delay: 0.5, alt: 'Beautiful portrait 3' },
              ].map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: img.delay, duration: 0.8 }}
                  className="group relative aspect-[3/4] overflow-hidden rounded-xl shadow-md cursor-pointer ring-1 ring-primary/20 hover:ring-primary/60 transition"
                  onClick={() => setLightboxImage(img.src)}
                >
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay" />
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* LOVE STATS / FUNNY METERS */}
        <section className="py-32 px-6 relative">
          <FloatingSticker src={pandaHeart} className="absolute right-[5%] top-12 hidden md:block" size={110} rotate={10} />
          <FloatingSticker src={pandaCake} className="absolute left-[5%] bottom-16 hidden md:block" size={110} rotate={-12} />

          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="text-primary tracking-[0.3em] uppercase text-xs mb-4 font-medium">Just Some Facts™</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-3">The Love Stats</h2>
              <p className="font-serif text-foreground/60 max-w-xl mx-auto">
                Highly scientific. Peer-reviewed by my own heart. Results may vary (they don't).
              </p>
            </motion.div>

            <LoveStats />
          </div>
        </section>

        {/* REASONS I LOVE YOU */}
        <section className="py-32 px-6 relative">
          <BobbingSticker src={pandaFlowers} className="absolute right-6 top-20 hidden lg:block" size={100} rotate={8} />

          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-center text-foreground mb-20">10 Things I Love About You</h2>

            <div className="space-y-12">
              {LOVE_REASONS.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.08, duration: 0.6 }}
                  className="flex gap-6 items-start"
                >
                  <span className="font-script text-4xl md:text-6xl text-primary/50 shrink-0 mt-[-10px] drop-shadow-[0_0_15px_hsl(var(--primary)/0.4)]">
                    {index + 1}.
                  </span>
                  <p className="font-serif text-xl md:text-2xl text-foreground/85 pt-2">
                    {reason}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* STICKER SHOWCASE — Bubu & Dudu style */}
        <section className="py-24 px-6 relative bg-gradient-to-b from-transparent via-primary/5 to-transparent">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="text-primary tracking-[0.3em] uppercase text-xs mb-4 font-medium">A Tiny Sticker Diary</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-3">Us, but make it cute</h2>
              <p className="font-serif text-foreground/60 max-w-xl mx-auto">
                A little visual love language. Tap a sticker to enlarge — pick your favorite for your wallpaper.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-8">
              {STICKERS.map((s, i) => (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => setLightboxImage(s.src)}
                  initial={{ opacity: 0, scale: 0.85, rotate: -5 + (i % 2) * 10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 140, damping: 14 }}
                  whileHover={{ y: -8, rotate: i % 2 === 0 ? 4 : -4, scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-card/60 backdrop-blur-md rounded-3xl p-4 md:p-6 border border-primary/20 shadow-lg hover:shadow-[0_10px_40px_-5px_hsl(var(--primary)/0.5)] transition-shadow flex flex-col items-center"
                >
                  <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.18)_0,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={s.src}
                    alt={s.label}
                    className="w-full aspect-square object-contain drop-shadow-[0_8px_18px_rgba(255,150,180,0.35)] relative z-10"
                  />
                  <span className="mt-3 text-xs md:text-sm font-script text-primary text-center relative z-10">
                    {s.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* COUPLE GALLERY / US */}
        <section className="py-24 px-6 relative bg-secondary/5">
          <BobbingSticker src={pandaBackhug} className="absolute left-6 top-10 hidden lg:block" size={100} rotate={-10} />
          <BobbingSticker src={pandaWalk} className="absolute right-6 bottom-10 hidden lg:block" size={100} rotate={10} />

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">You & Me</h2>
              <p className="font-serif text-foreground/60">My favorite place to be is right beside you.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { src: couple1, delay: 0.1, span: 'col-span-1 md:col-span-2 lg:col-span-1' },
                { src: couple2, delay: 0.3, span: 'col-span-1' },
                { src: couple3, delay: 0.5, span: 'col-span-1' },
              ].map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: img.delay, duration: 0.8 }}
                  className={`${img.span} group relative aspect-square md:aspect-auto md:h-96 overflow-hidden rounded-xl shadow-md cursor-pointer ring-1 ring-primary/20 hover:ring-primary/60 transition`}
                  onClick={() => setLightboxImage(img.src)}
                >
                  <img
                    src={img.src}
                    alt="Us"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WISH UPON A STAR — interactive */}
        <section className="py-32 px-6 relative">
          <FloatingSticker src={pandaSleep} className="absolute left-[6%] top-12 hidden md:block" size={100} rotate={-10} />
          <FloatingSticker src={pandaHeart} className="absolute right-[6%] bottom-12 hidden md:block" size={100} rotate={10} />

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-primary tracking-[0.3em] uppercase text-xs mb-4 font-medium">A Sky Full of You</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-3">Wish Upon a Star</h2>
              <p className="font-serif text-foreground/60 max-w-xl mx-auto">
                I scattered a wish behind every star up there. Tap one and it's yours.
              </p>
            </motion.div>

            <WishStars />
          </div>
        </section>

        {/* OPEN WHEN LETTERS — interactive */}
        <section className="py-32 px-6 relative bg-primary/5">
          <BobbingSticker src={pandaBackhug} className="absolute left-4 top-10 hidden md:block" size={90} rotate={-8} />
          <BobbingSticker src={pandaFlowers} className="absolute right-4 bottom-10 hidden md:block" size={90} rotate={10} />

          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-primary tracking-[0.3em] uppercase text-xs mb-4 font-medium">For Every Mood</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-3">Open When…</h2>
              <p className="font-serif text-foreground/60 max-w-xl mx-auto">
                A little stack of letters from me. Pick the one you need today — or open them all, I won't tell anyone.
              </p>
            </motion.div>

            <OpenWhenLetters />
          </div>
        </section>

        {/* CAKE SECTION */}
        <section className="py-32 px-6 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,hsl(var(--secondary)/0.18)_0,transparent_60%)] pointer-events-none" />
          <FloatingSticker src={pandaCake} className="absolute right-[10%] top-12 hidden md:block" size={100} rotate={12} />
          <FloatingSticker src={pandaHeart} className="absolute left-[10%] top-16 hidden md:block" size={90} rotate={-10} />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Make a Wish</h2>
            <p className="font-serif text-foreground/70 mb-16">Close your eyes. Think of something beautiful.</p>

            <BirthdayCake />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-16 text-center border-t border-primary/15 bg-card/40 backdrop-blur-sm relative">
          <BobbingSticker src={pandaHug} className="absolute left-1/2 -translate-x-1/2 -top-12" size={88} />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-6"
          >
            <p className="font-script text-3xl md:text-4xl text-primary mb-4 drop-shadow-[0_0_15px_hsl(var(--primary)/0.5)]">
              Yours, always — {BOYFRIEND_NAME}
            </p>
            <p className="font-serif text-xs md:text-sm text-foreground/40 uppercase tracking-widest">
              Made with love on April 30, 2026
            </p>
            <div className="mt-8 text-primary/40 text-xl">♥</div>
          </motion.div>
        </footer>

      </main>
    </div>
  );
}
