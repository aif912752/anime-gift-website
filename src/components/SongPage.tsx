import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Heart, Music, ArrowLeft } from 'lucide-react';
import { savePhotoMemory } from '../hooks/usePhotoMemories';

interface SongPageProps {
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  navigateTo: (page: 'presents') => void;
}

// สร้างหัวใจลอยแบบสุ่ม
const floatingHearts = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 8 + Math.random() * 7,
  size: 15 + Math.random() * 25,
  emoji: ['💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 5)],
}));

// สร้าง sparkles
const sparkles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 3,
  duration: 2 + Math.random() * 3,
}));

export function SongPage({ isPlaying, setIsPlaying, navigateTo }: SongPageProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress] = useState(33);
  const [hasCaptured, setHasCaptured] = useState(false);

  // ควบคุมการเล่น/หยุดเพลง
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        // ตั้งเวลาเริ่มต้นที่ 3:00 (180 วินาที)
        if (audioRef.current.currentTime < 180) {
          audioRef.current.currentTime = 180;
        }
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Capture memory when page is shown
  useEffect(() => {
    if (hasCaptured || !containerRef.current) return;
    
    // Wait for animations to settle
    const timer = setTimeout(async () => {
      try {
        const html2canvas = (await import('html2canvas')).default;
        const canvas = await html2canvas(containerRef.current!, {
          scale: 1.2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          logging: false,
        });
        
        const dataUrl = canvas.toDataURL('image/png');
        savePhotoMemory({
          pageId: 'song',
          dataUrl,
          title: '🎵 เพลงพิเศษ',
        });
        setHasCaptured(true);
      } catch (error) {
        console.error('Failed to capture SongPage:', error);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [hasCaptured]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden p-4 md:p-8"
      style={{
        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #ff9a9e 50%, #fecfef 75%, #fecfef 100%)',
      }}
    >
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.8) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, rgba(255, 182, 193, 0.6) 0%, transparent 50%),
                              radial-gradient(circle at 40% 40%, rgba(255, 192, 203, 0.4) 0%, transparent 40%),
                              radial-gradient(circle at 60% 60%, rgba(255, 105, 180, 0.3) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Floating Hearts Background */}
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="fixed pointer-events-none"
          style={{
            left: `${heart.x}%`,
            fontSize: heart.size,
            bottom: '-50px',
          }}
          animate={{
            y: [0, -window.innerHeight - 200],
            x: [0, Math.sin(heart.id) * 50, 0],
            opacity: [0, 0.8, 0.8, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="fixed w-1 h-1 bg-white rounded-full pointer-events-none"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/MP3/GERRARD.mp3"
        preload="auto"
        loop
      />

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigateTo('presents')}
        className="relative z-10 flex items-center gap-2 text-white hover:text-pink-100 mb-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full transition-all hover:bg-white/30"
        style={{ fontFamily: 'Mitr, sans-serif' }}
      >
        <ArrowLeft className="w-5 h-5" />
        กลับ
      </motion.button>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 relative z-10"
      >
        <motion.h1
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg"
          style={{ fontFamily: 'Mitr, sans-serif' }}
        >
           🎵
        </motion.h1>
        <motion.div
          className="w-32 h-1 bg-white/50 mx-auto rounded-full"
          animate={{ width: ['8rem', '12rem', '8rem'] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start relative z-10">
        {/* Music Player Card */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(199, 91, 91, 0.9) 0%, rgba(255, 107, 157, 0.9) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          {/* Card Glow Effect */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-400/30 rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* Album Art Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <motion.div 
                className="aspect-square rounded-lg overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img src="/images/11.jpg" alt="Couple" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div 
                className="aspect-square rounded-lg overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img src="/images/22.jpg" alt="Couple" className="w-full h-full object-cover" />
              </motion.div>
            </div>

            {/* Song Info */}
            <div className="mb-6 text-center">
              <motion.p 
                className="text-2xl font-bold mb-1"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                เพลงพิเศษ
              </motion.p>
              <p className="text-white/70 text-sm">สำหรับคนพิเศษ 💕</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-white/70 mb-2">
                <span>3:00</span>
                <span>3:34</span>
              </div>
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white rounded-full"
                  style={{ width: `${progress}%` }}
                  animate={isPlaying ? { width: ['33%', '100%'] } : {}}
                  transition={{ duration: 34, ease: 'linear' }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-8">
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/80 hover:text-white transition-colors"
              >
                <SkipBack className="w-8 h-8" />
              </motion.button>
              
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#c75b5b] shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/80 hover:text-white transition-colors"
              >
                <SkipForward className="w-8 h-8" />
              </motion.button>
            </div>

            {/* Heart Animation */}
            <motion.div 
              className="flex justify-center mt-6 gap-1"
              animate={isPlaying ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  animate={isPlaying ? { y: [0, -10, 0] } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                >
                  <Heart className="w-5 h-5 fill-white/30 text-white/30" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Letter Content */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          {/* Floating Music Notes */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-4 -right-4"
          >
            <Music className="w-10 h-10 text-white drop-shadow-lg" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, delay: 0.5, repeat: Infinity }}
            className="absolute top-20 -left-4"
          >
            <span className="text-3xl">🎶</span>
          </motion.div>
          <motion.div
            animate={{ y: [0, -12, 0], x: [0, 5, 0] }}
            transition={{ duration: 3.5, delay: 1, repeat: Infinity }}
            className="absolute bottom-20 right-0"
          >
            <span className="text-4xl">💝</span>
          </motion.div>

          {/* Letter Card */}
          <motion.div 
            className="rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200/30 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-200/30 rounded-full blur-2xl" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Heart className="w-8 h-8 text-[#c75b5b] fill-[#c75b5b]" />
                </motion.div>
                <h3 
                  className="text-xl font-bold text-[#c75b5b]"
                  style={{ fontFamily: 'Mitr, sans-serif' }}
                >
                  ข้อความจากหัวใจ 💌
                </h3>
              </div>

              {/* Content */}
              <p 
                className="text-gray-700 leading-relaxed text-lg"
                style={{ fontFamily: 'Mitr, sans-serif', lineHeight: '2' }}
              >
                ไม่อยากให้คุณไม่สบาย<br />
                เวลาคุณไม่สบายผมจ๋องๆ เป็นสองเท่า<br />
                ผมเป็นห่วงคุณที่สุดแม้รู้ดีแก่ใจว่าคุณดูแลตัวเองได้<br />
                คุณดูแลตัวเองได้ดีมาโดยตลอด<br />
                แต่ผมก็อดห่วงคุณไม่ได้นี่นา
                <br /><br />
                ขอให้คุณหายป่วยเร็วๆ เพี้ยง !!!!<br /><br />
                <span className="text-[#c75b5b] font-semibold">
                  แล้วรีบมาหาผ้มได้แล่วค้าบบบบบบบบบบบบบบบบ<br /> 
                  คิดถึงงงงงงงงงงงงงงงงงงงงงงงงงงฮือ 💕
                </span>
              </p>

    
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Decorative Wave */}
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 120" className="w-full">
          <path
            fill="rgba(255, 255, 255, 0.2)"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </motion.div>
  );
}
