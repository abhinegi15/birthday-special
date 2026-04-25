import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt to auto-play on mount (browsers usually block this unless muted or interacted)
    // We will just wait for user interaction to be safe.
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setHasError(false);
      }).catch((err) => {
        console.log("Audio playback failed gracefully. Waiting for real file.");
        setHasError(true);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
      {/* 
        Placeholder for boyfriend's song.
        Boyfriend: Replace "/music.mp3" with the actual path to your song, 
        e.g., place "our-song.mp3" in the public folder and use "/our-song.mp3".
      */}
      <audio 
        ref={audioRef} 
        src="/music.mp3" 
        loop 
        onError={() => setHasError(true)}
      />
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-primary/20 shadow-sm flex items-center justify-center text-primary transition-colors hover:bg-primary/10"
        title="Play our song"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMute}
        className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-primary/20 shadow-sm flex items-center justify-center text-primary/70 transition-colors hover:bg-primary/10"
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </motion.button>
    </div>
  );
}
