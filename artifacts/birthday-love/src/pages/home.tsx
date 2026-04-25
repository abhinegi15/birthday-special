import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FloatingHearts } from '@/components/FloatingHearts';
import { HeartCursor } from '@/components/HeartCursor';
import { MusicPlayer } from '@/components/MusicPlayer';
import { Countdown } from '@/components/Countdown';
import { BirthdayCake } from '@/components/BirthdayCake';

// Placeholders for photos
// Replace these with actual images when you want
import solo1 from '@/assets/solo-1.png';
import solo2 from '@/assets/solo-2.png';
import solo3 from '@/assets/solo-3.png';
import couple1 from '@/assets/couple-1.png';
import couple2 from '@/assets/couple-2.png';
import couple3 from '@/assets/couple-3.png';

const LOVE_REASONS = [
  "The way your eyes crinkle when you laugh at something genuinely funny.",
  "How fiercely you care about the people you love.",
  "That little sleepy voice you have right when you wake up.",
  "The incredible way you see the beauty in small, everyday things.",
  "Your passion and drive—it's the most magnetic thing in the world.",
  "How safe and completely myself I feel when I'm just sitting next to you.",
  "The way you randomly start dancing or singing when you're happy.",
  "Your kindness, which you give so freely even when the world doesn't deserve it.",
  "The warmth of your hand in mine.",
  "Just... you. All of you. Every single part."
];

export default function Home() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const NAME = "[Her Name]"; // Boyfriend: Replace this!
  const BOYFRIEND_NAME = "[Your Name]"; // Boyfriend: Replace this!

  return (
    <div className="relative min-h-screen bg-background selection:bg-primary/20">
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setLightboxImage(null)}
          >
            <motion.button 
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
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
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 w-full overflow-x-hidden">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[100dvh] flex flex-col items-center justify-center p-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="text-primary tracking-[0.3em] uppercase text-sm mb-6 font-medium">For Her, On Her Day</p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight">
              Happy Birthday,<br />
              <span className="font-script text-primary text-6xl md:text-8xl lg:text-9xl capitalize block mt-4 drop-shadow-sm">{NAME}</span>
            </h1>
            <p className="font-serif text-lg md:text-xl text-foreground/70 mt-8 max-w-xl mx-auto leading-relaxed">
              To the girl who makes every ordinary day feel like magic. Today, the world stops to celebrate you.
            </p>
            
            <motion.div 
              className="mt-16 animate-bounce text-primary/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              ↓ Scroll gently
            </motion.div>
          </motion.div>
        </section>

        {/* TIME ALIVE SECTION */}
        <section className="py-24 px-6 bg-white/40 border-y border-primary/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0,transparent_100%)] opacity-5"></div>
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Every second since you arrived</h2>
              <p className="font-serif text-foreground/70 mb-12 max-w-2xl mx-auto">
                Born on a Monday afternoon at 5:12 PM, the world got a little softer that day. This is exactly how long you've been making everything better:
              </p>
              
              <Countdown />
            </motion.div>
          </div>
        </section>

        {/* THE LOVE LETTER */}
        <section className="py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              className="bg-white/80 backdrop-blur-md rounded-2xl p-8 md:p-16 shadow-xl border border-primary/20 relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2 }}
            >
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-lg"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-lg"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-lg"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-lg"></div>

              <h2 className="font-script text-5xl md:text-6xl text-primary mb-10 text-center">My dearest,</h2>
              
              <div className="space-y-6 font-serif text-lg md:text-xl text-foreground/80 leading-relaxed">
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
        <section className="py-24 px-6 bg-primary/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl text-foreground mb-4">The Birthday Girl</h2>
              <p className="font-serif text-foreground/60">A masterpiece in every light.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { src: solo1, delay: 0.1, alt: "Beautiful portrait 1" },
                { src: solo2, delay: 0.3, alt: "Beautiful portrait 2" },
                { src: solo3, delay: 0.5, alt: "Beautiful portrait 3" }
              ].map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: img.delay, duration: 0.8 }}
                  className="group relative aspect-[3/4] overflow-hidden rounded-xl shadow-md cursor-pointer"
                  onClick={() => setLightboxImage(img.src)}
                >
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay"></div>
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

        {/* REASONS I LOVE YOU */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-center text-foreground mb-20">10 Things I Love About You</h2>
            
            <div className="space-y-12">
              {LOVE_REASONS.map((reason, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex gap-6 items-start"
                >
                  <span className="font-script text-4xl md:text-6xl text-primary/40 shrink-0 mt-[-10px]">
                    {index + 1}.
                  </span>
                  <p className="font-serif text-xl md:text-2xl text-foreground/80 pt-2">
                    {reason}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* COUPLE GALLERY / US */}
        <section className="py-24 px-6 bg-secondary/10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl text-foreground mb-4">You & Me</h2>
              <p className="font-serif text-foreground/60">My favorite place to be is right beside you.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { src: couple1, delay: 0.1, span: "col-span-1 md:col-span-2 lg:col-span-1" },
                { src: couple2, delay: 0.3, span: "col-span-1" },
                { src: couple3, delay: 0.5, span: "col-span-1" }
              ].map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: img.delay, duration: 0.8 }}
                  className={`${img.span} group relative aspect-square md:aspect-auto md:h-96 overflow-hidden rounded-xl shadow-md cursor-pointer border border-primary/10`}
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

        {/* CAKE SECTION */}
        <section className="py-32 px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Make a Wish</h2>
            <p className="font-serif text-foreground/70 mb-16">Close your eyes. Think of something beautiful.</p>
            
            <BirthdayCake />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-16 text-center border-t border-primary/10 bg-white/50">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="font-script text-3xl text-primary mb-4">Yours, always — {BOYFRIEND_NAME}</p>
            <p className="font-serif text-sm text-foreground/40 uppercase tracking-widest">
              Made with love on April 30, 2026
            </p>
            <div className="mt-8 text-primary/30 text-xl">♥</div>
          </motion.div>
        </footer>

      </main>
    </div>
  );
}
