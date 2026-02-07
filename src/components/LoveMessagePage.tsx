import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface LoveMessagePageProps {
  navigateTo: (page: 'presents') => void;
}

// ข้อความรักสุ่ม
const loveMessages = [
  "แม้เราจะยังไม่ได้คบกัน แต่ใจฉันเป็นของเธอไปแล้ว 💕",
  "เธอคือคนพิเศษที่สุดในชีวิตฉัน",
  "ทุกครั้งที่เห็นเธอยิ้ม โลกของฉันก็สดใสขึ้น",
  "ฉันไม่รู้ว่าอนาคตจะเป็นยังไง แต่ตอนนี้ฉันอยากมีเธออยู่ข้างๆ",
  "เธอทำให้หัวใจฉันเต้นแรงทุกครั้งที่เจอ",
  "ฉันแค่อยากให้เธอรู้ว่า... ฉันรักเธอ",
  "ไม่ว่าเราจะเป็นอะไรกัน ฉันก็จะรักเธอเสมอ",
  "เธอคือความฝันที่เป็นจริงของฉัน",
  "ทุกวันที่มีเธอ คือวันที่พิเศษสำหรับฉัน",
  "ฉันอยากเป็นคนที่ทำให้เธอยิ้มได้ทุกวัน",
];

// สีสำหรับ confetti
const confettiColors = ['#ff6b9d', '#ff8fab', '#fb6f92', '#ff006e', '#8338ec', '#3a86ff', '#ffbe0b'];

export function LoveMessagePage({ navigateTo }: LoveMessagePageProps) {
  const [heartCount, setHeartCount] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string; delay: number }>>([]);
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; x: number; delay: number; duration: number }>>([]);

  // สร้าง floating hearts ลอยทั่วจอ
  useEffect(() => {
    const hearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
    }));
    setFloatingHearts(hearts);
  }, []);

  // กดหัวใจเพื่อเพิ่มจำนวน
  const handleHeartClick = useCallback((e: React.MouseEvent) => {
    setHeartCount(prev => prev + 1);
    
    // สร้าง confetti ตรงตำแหน่งที่กด
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const newConfetti = Array.from({ length: 15 }, (_, i) => ({
      id: Date.now() + i,
      x: centerX + (Math.random() - 0.5) * 200,
      y: centerY + (Math.random() - 0.5) * 200,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      delay: Math.random() * 0.3,
    }));
    
    setConfetti(prev => [...prev.slice(-40), ...newConfetti]);
    
    // ลบ confetti หลังจากแอนิเมชั่นเสร็จ
    setTimeout(() => {
      setConfetti(prev => prev.filter(c => !newConfetti.find(nc => nc.id === c.id)));
    }, 2000);
  }, []);

  // สุ่มข้อความใหม่
  const handleNewMessage = () => {
    setCurrentMessage(prev => (prev + 1) % loveMessages.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 relative overflow-hidden"
    >
      {/* Floating Background Hearts */}
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="fixed text-2xl pointer-events-none"
          style={{
            left: `${heart.x}%`,
            bottom: '-50px',
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            opacity: [0, 0.6, 0.6, 0],
            scale: [0.5, 1, 1, 0.5],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          💕
        </motion.div>
      ))}

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        onClick={() => navigateTo('presents')}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg transition-all hover:scale-105"
      >
        <ArrowLeft className="w-5 h-5" />
        กลับ
      </motion.button>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        
        {/* Love Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            💖
          </motion.div>
          <motion.h1
            animate={{ 
              textShadow: [
                '0 0 20px rgba(255, 107, 157, 0.3)',
                '0 0 40px rgba(255, 107, 157, 0.6)',
                '0 0 20px rgba(255, 107, 157, 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#ff6b9d] via-[#ff1493] to-[#ff006e] bg-clip-text text-transparent"
            style={{ fontFamily: 'Mitr, sans-serif' }}
          >
            รักนะ
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-[#c75b5b] mt-3 font-medium"
            style={{ fontFamily: 'Mitr, sans-serif' }}
          >
            เธอคือคนพิเศษของฉัน
          </motion.p>
        </motion.div>

        {/* Clickable Heart Counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center mb-10"
        >
          <motion.button
            onClick={handleHeartClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative text-8xl mb-4 cursor-pointer"
          >
            <motion.span
              animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="inline-block"
            >
              💗
            </motion.span>
            {/* Pulse Ring */}
            <motion.span
              className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 107, 157, 0.4) 0%, transparent 70%)',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: [0.5, 2],
                opacity: [1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          </motion.button>
          <motion.p
            key={heartCount}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-lg text-[#c75b5b] font-medium"
            style={{ fontFamily: 'Mitr, sans-serif' }}
          >
            {heartCount === 0 
              ? "กดหัวใจเพื่อส่งความรักให้ฉัน" 
              : `เธอทำให้หัวใจฉันเต้นไปแล้ว ${heartCount} ครั้ง`
            }
          </motion.p>
        </motion.div>

        {/* Love Message Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-pink-100 text-center">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl text-[#ff6b9d] opacity-50 mb-2"
            >
              "
            </motion.div>
            
            <AnimatePresence mode="wait">
              <motion.p
                key={currentMessage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-gray-700 text-lg leading-relaxed mb-6"
                style={{ fontFamily: 'Mitr, sans-serif' }}
              >
                {loveMessages[currentMessage]}
              </motion.p>
            </AnimatePresence>

            <motion.button
              onClick={handleNewMessage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#ff9a9e] to-[#fecfef] text-[#c75b5b] px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
              style={{ fontFamily: 'Mitr, sans-serif' }}
            >
              💌 ข้อความถัดไป
            </motion.button>
          </div>
        </motion.div>

        {/* Fireworks */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                top: `${10 + (i % 3) * 15}%`,
                left: i % 2 === 0 ? `${5 + i * 15}%` : 'auto',
                right: i % 2 === 1 ? `${5 + i * 10}%` : 'auto',
              }}
              animate={{
                scale: [0, 1.2, 1, 0.5],
                opacity: [0, 1, 0.8, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                delay: i * 0.6,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            >
              {i === 1 ? '🎆' : i === 2 ? '✨' : i === 3 ? '🎇' : i === 4 ? '💫' : '⭐'}
            </motion.div>
          ))}
        </div>

        {/* Confetti */}
        <AnimatePresence>
          {confetti.map((c) => (
            <motion.div
              key={c.id}
              className="fixed w-3 h-3 rounded-full pointer-events-none z-50"
              style={{
                left: c.x,
                top: c.y,
                backgroundColor: c.color,
              }}
              initial={{ scale: 1, opacity: 1 }}
              animate={{
                y: 150,
                rotate: 720,
                scale: 0,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                delay: c.delay,
                ease: 'easeOut',
              }}
            />
          ))}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
