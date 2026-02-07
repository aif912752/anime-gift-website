import { motion } from 'framer-motion';
import { Heart, ArrowLeft } from 'lucide-react';

interface PicturesPageProps {
  navigateTo: (page: 'presents') => void;
}

export function PicturesPage({ navigateTo }: PicturesPageProps) {
  // Generate random hearts for the tree
  const hearts = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: 50 + Math.random() * 200 - 100,
    y: -50 - Math.random() * 150,
    size: 12 + Math.random() * 16,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-white p-4 md:p-8 overflow-hidden"
    >
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigateTo('presents')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 relative z-20"
      >
        <ArrowLeft className="w-5 h-5" />
        กลับ
      </motion.button>

      <div className="max-w-4xl mx-auto relative">
        {/* Title */}
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl md:text-5xl font-bold text-center text-[#c75b5b] mb-4"
        >
          ความรักเราเติบโต
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-500 mb-8"
        >
          เหมือนต้นไม้ ความรักเราเติบโตแข็งแรงขึ้นทุกวัน
        </motion.p>

        {/* Heart Tree Container */}
        <div className="relative h-[500px] md:h-[600px] flex items-end justify-center">
          {/* Floating Hearts from Tree */}
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 0, y: 250, x: heart.x + 150 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [250, heart.y, heart.y - 100],
                x: [heart.x + 150, heart.x + 150 + (Math.random() - 0.5) * 50, heart.x + 150],
              }}
              transition={{
                duration: heart.duration,
                delay: heart.delay,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="absolute"
              style={{ bottom: 200 }}
            >
              <Heart
                className="text-[#ff6b8a] fill-[#ff6b8a]"
                style={{ width: heart.size, height: heart.size }}
              />
            </motion.div>
          ))}

          {/* Tree Crown - Made of Hearts */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="absolute bottom-[180px] left-1/2 -translate-x-1/2"
          >
            {/* Large heart cluster forming tree crown */}
            <div className="relative w-[300px] h-[280px]">
              {/* Center big heart */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <Heart className="w-32 h-32 text-[#c75b5b] fill-[#c75b5b]" />
              </motion.div>

              {/* Surrounding hearts */}
              <motion.div animate={{ rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute top-0 left-1/2 -translate-x-1/2">
                <Heart className="w-20 h-20 text-[#e88a9a] fill-[#e88a9a]" />
              </motion.div>
              <motion.div animate={{ rotate: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3.5 }} className="absolute top-4 left-4">
                <Heart className="w-16 h-16 text-[#ff9eb0] fill-[#ff9eb0]" />
              </motion.div>
              <motion.div animate={{ rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-4 right-4">
                <Heart className="w-18 h-18 text-[#e88a9a] fill-[#e88a9a]" />
              </motion.div>
              <motion.div animate={{ rotate: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3.2 }} className="absolute bottom-8 left-0">
                <Heart className="w-16 h-16 text-[#ffb3c1] fill-[#ffb3c1]" />
              </motion.div>
              <motion.div animate={{ rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 3.8 }} className="absolute bottom-8 right-0">
                <Heart className="w-16 h-16 text-[#ff9eb0] fill-[#ff9eb0]" />
              </motion.div>
              <motion.div animate={{ rotate: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4.2 }} className="absolute top-1/3 left-0">
                <Heart className="w-14 h-14 text-[#e88a9a] fill-[#e88a9a]" />
              </motion.div>
              <motion.div animate={{ rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 3.6 }} className="absolute top-1/3 right-0">
                <Heart className="w-14 h-14 text-[#ffb3c1] fill-[#ffb3c1]" />
              </motion.div>
            </div>
          </motion.div>

          {/* Tree Trunk */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 origin-bottom"
          >
            <div className="w-16 h-[200px] bg-gradient-to-t from-[#8b6f47] to-[#a0826d] rounded-t-lg relative">
              {/* Bark texture lines */}
              <div className="absolute top-4 left-2 w-2 h-8 bg-[#6b5637] rounded-full opacity-50" />
              <div className="absolute top-16 right-3 w-1.5 h-6 bg-[#6b5637] rounded-full opacity-50" />
              <div className="absolute top-28 left-3 w-2 h-10 bg-[#6b5637] rounded-full opacity-50" />
              <div className="absolute top-20 left-1/2 w-1 h-12 bg-[#6b5637] rounded-full opacity-50" />
            </div>
          </motion.div>

          {/* Ground/Grass */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-8"
          >
            <div className="w-full h-full bg-gradient-to-t from-green-200 to-transparent rounded-full blur-sm" />
          </motion.div>

          {/* Small hearts on ground */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-2 left-1/4"
          >
            <Heart className="w-6 h-6 text-pink-300 fill-pink-300" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-4 right-1/3"
          >
            <Heart className="w-5 h-5 text-rose-300 fill-rose-300" />
          </motion.div>
        </div>

        {/* Love message */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-8"
        >
          <p className="text-xl text-gray-600 italic">
            "ทุกจังหวะการเต้นของหัวใจคือการเตือนให้รู้ว่าฉันรักเธอ"
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
