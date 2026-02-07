import { motion } from 'framer-motion';

interface HowDarePageProps {
  navigateTo: (page: 'home') => void;
}

export function HowDarePage({ navigateTo }: HowDarePageProps) {
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
        className="text-3xl md:text-5xl font-bold text-gray-700 mb-12 tracking-wide"
      >
        กล้าดียังไง!
      </motion.h1>

      <motion.img
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: 'spring' }}
        src="/cat-gun.png"
        alt="Angry cat with gun"
        className="w-64 h-64 md:w-80 md:h-80 mb-12 object-contain"
      />

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={() => navigateTo('home')}
        className="px-12 py-4 bg-[#c75b5b] hover:bg-[#b54d4d] text-white font-semibold rounded-full text-xl transition-all transform hover:scale-105 shadow-lg"
      >
        ลองใหม่
      </motion.button>
    </motion.div>
  );
}
