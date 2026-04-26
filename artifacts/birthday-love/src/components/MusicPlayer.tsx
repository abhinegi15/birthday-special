import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MusicPlayer
 * Default song lives at /music.mp3 (in public/).
 * Boyfriend: replace artifacts/birthday-love/public/music.mp3 with your own song
 * any time — keep the filename the same and it will just work.
 *
 * Behavior:
 *  - Auto-attempts to start MUTED on mount (browsers allow muted autoplay).
 *  - A pulsing "Tap to hear our song" prompt appears until the user interacts.
 *  - On first click anywhere (or on the prompt), unmutes and plays.
 */
export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [needsActivation, setNeedsActivation] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    audio.muted = true;
    audio.loop = true;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        setIsPlaying(false);
      });
  }, []);

  const activateSound = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = false;
    setIsMuted(false);
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
    setNeedsActivation(false);
  };

  // Activate on any first user gesture anywhere on the page
  useEffect(() => {
    if (!needsActivation) return;
    const handler = () => {
      activateSound();
    };
    window.addEventListener('click', handler, { once: true });
    window.addEventListener('touchstart', handler, { once: true });
    window.addEventListener('keydown', handler, { once: true });
    window.addEventListener('scroll', handler, { once: true, passive: true });
    return () => {
      window.removeEventListener('click', handler);
      window.removeEventListener('touchstart', handler);
      window.removeEventListener('keydown', handler);
      window.removeEventListener('scroll', handler);
    };
  }, [needsActivation]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !isMuted;
    audio.muted = next;
    setIsMuted(next);
    if (!next) setNeedsActivation(false);
  };

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      {/* Pulsing prompt to enable sound */}
      <AnimatePresence>
        {needsActivation && (
          <motion.button
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            onClick={activateSound}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 group"
          >
            <motion.div
              animate={{ boxShadow: [
                '0 0 0 0 hsl(var(--primary) / 0.45)',
                '0 0 0 14px hsl(var(--primary) / 0)',
              ] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-primary/15 backdrop-blur-md border border-primary/40 text-foreground shadow-lg hover:bg-primary/25 transition-colors"
            >
              <Heart size={16} className="text-primary fill-primary animate-pulse" />
              <span className="text-sm font-medium tracking-wide">Tap to hear our song</span>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Persistent player controls */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-card/70 backdrop-blur-md border border-primary/30 shadow-lg flex items-center justify-center text-primary hover:bg-primary/15 transition-colors"
          title={isPlaying ? 'Pause' : 'Play our song'}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={toggleMute}
          className="w-10 h-10 rounded-full bg-card/70 backdrop-blur-md border border-primary/30 shadow-lg flex items-center justify-center text-primary/80 hover:bg-primary/15 transition-colors"
          title={isMuted ? 'Unmute' : 'Mute'}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </motion.button>
      </div>
    </>
  );
}
