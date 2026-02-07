import { motion } from 'framer-motion';
import { Heart, ArrowLeft } from 'lucide-react';

interface LetterPageProps {
  navigateTo: (page: 'presents') => void;
}

export function LetterPage({ navigateTo }: LetterPageProps) {
  // Generate floating hearts for background
  const floatingHearts = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 16 + Math.random() * 32,
    duration: 4 + Math.random() * 4,
    delay: Math.random() * 3,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 p-4 md:p-8 relative overflow-hidden"
    >
      {/* Floating Hearts Background */}
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 0, y: '100vh' }}
          animate={{
            opacity: [0, 0.6, 0.6, 0],
            y: ['100vh', `${heart.y}vh`, `${heart.y - 20}vh`],
            x: [`${heart.x}vw`, `${heart.x + (Math.random() - 0.5) * 10}vw`],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="absolute pointer-events-none"
        >
          <Heart
            className="text-pink-300/60 fill-pink-300/40"
            style={{ width: heart.size, height: heart.size }}
          />
        </motion.div>
      ))}

      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigateTo('presents')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 relative z-20"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </motion.button>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Animated Title */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <motion.h1
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-3xl md:text-5xl font-bold text-[#c75b5b] mb-2"
          >
            Happy Anniversary!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-500"
          >
            My Everything
          </motion.p>
        </motion.div>

        {/* Large Heart with pulsing animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="flex justify-center mb-8"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
          >
            <Heart className="w-24 h-24 md:w-32 md:h-32 text-[#c75b5b] fill-[#c75b5b] drop-shadow-lg" />
          </motion.div>
        </motion.div>

        {/* Letter Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-2xl border border-pink-100"
        >
          {/* Decorative hearts on card */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-4 -right-4"
          >
            <Heart className="w-10 h-10 text-pink-400 fill-pink-400" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
            className="absolute -bottom-4 -left-4"
          >
            <Heart className="w-8 h-8 text-rose-400 fill-rose-400" />
          </motion.div>

          <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
            Today we celebrate you—the beautiful soul who makes my world brighter just by being in it. From your smile that melts away my stress to the kindness you show everyone around you, you've filled my life with so much joy and meaning. Every moment with you feels like a gift, and I'm endlessly grateful for the laughter, the adventures, and even the quiet times we share together. You're the reason my days feel warmer, happier, and more complete.
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent my-6"
          />

          <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
            As we step into another year together, I just want you to know how deeply you're loved and cherished. I promise to keep standing by your side, cheering you on, and loving you in every season ahead. Thank you for being my safe haven, my inspiration, and my greatest blessing. Here's to celebrating us today, and to all the beautiful memories we'll continue to create. No matter what the future holds, I'll always be here, loving you endlessly.
          </p>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-right mt-8"
          >
            <p className="text-[#c75b5b] font-semibold text-xl">With all my love,</p>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-block mt-2"
            >
              <Heart className="w-6 h-6 text-pink-400 fill-pink-400 inline" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom decorative hearts */}
        <div className="flex justify-center gap-4 mt-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.1 }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  delay: i * 0.2
                }}
              >
                <Heart
                  className={`text-pink-400 fill-pink-400 ${
                    i === 2 ? 'w-8 h-8' : 'w-5 h-5'
                  }`}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
