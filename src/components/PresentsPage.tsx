import { motion } from 'framer-motion';
import { GiftCard } from './GiftCard';

interface PresentsPageProps {
  navigateTo: (page: 'song' | 'pictures' | 'letter') => void;
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
        PRESENT FOR YOU
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-500 mb-12 text-lg"
      >
        CLICK ANY GIFT TO OPEN
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
    </motion.div>
  );
}
