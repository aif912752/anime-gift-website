import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { GiftCard } from './GiftCard';

interface PresentsPageProps {
  navigateTo: (page: 'song' | 'pictures' | 'letter' | 'photo-booth') => void;
}

export function PresentsPage({ navigateTo }: PresentsPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-8"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl md:text-5xl font-bold text-gray-700 mb-4 tracking-wide"
      >
        ของขวัญสำหรับเธอ
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-500 mb-12 text-lg"
      >
        คลิกของขวัญเพื่อเปิด
      </motion.p>

      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {/* Gift 1 - Flower */}
        <GiftCard
          imageSrc="/cat-flower.png"
          imageAlt="Cat with flower"
          onClick={() => navigateTo('song')}
          delay={0.4}
        />

        {/* Gift 2 - Couple */}
        <GiftCard
          imageSrc="/cat-couple.png"
          imageAlt="Cat couple"
          onClick={() => navigateTo('pictures')}
          delay={0.5}
        />

        {/* Gift 3 - Stand */}
        <GiftCard
          imageSrc="/cat-stand.png"
          imageAlt="Cat standing"
          onClick={() => navigateTo('letter')}
          delay={0.6}
        />
      </div>

      {/* Photo Booth Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        onClick={() => navigateTo('photo-booth')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-12 flex items-center gap-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <Camera className="w-6 h-6" />
        <span className="font-bold text-lg">📸 Photo Booth</span>
        <span className="text-sm opacity-80">ถ่ายรูปเก็บไว้เลย!</span>
      </motion.button>
    </motion.div>
  );
}
