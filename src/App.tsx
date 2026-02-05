import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Heart, Music, ArrowLeft } from 'lucide-react';

type Page = 'home' | 'how-dare' | 'presents' | 'song' | 'pictures' | 'letter';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isPlaying, setIsPlaying] = useState(false);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  // Home Page - PLS ACCEPT THE GIFT
  const HomePage = () => (
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
        PLS ACCEPT THE GIFT
      </motion.h1>

      <motion.img
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: 'spring' }}
        src="/cat-heart.png"
        alt="Cute cat holding heart"
        className="w-64 h-64 md:w-80 md:h-80 mb-12 object-contain"
      />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex gap-8"
      >
        <button
          onClick={() => navigateTo('presents')}
          className="px-12 py-4 bg-[#c75b5b] hover:bg-[#b54d4d] text-white font-semibold rounded-full text-xl transition-all transform hover:scale-105 shadow-lg"
        >
          YES
        </button>
        <button
          onClick={() => navigateTo('how-dare')}
          className="px-12 py-4 bg-[#c75b5b] hover:bg-[#b54d4d] text-white font-semibold rounded-full text-xl transition-all transform hover:scale-105 shadow-lg"
        >
          NO
        </button>
      </motion.div>
    </motion.div>
  );

  // How Dare You Page
  const HowDarePage = () => (
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
        HOW DARE YOU!
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
        TRY AGAIN
      </motion.button>
    </motion.div>
  );

  // Presents Page
  const PresentsPage = () => (
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
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigateTo('song')}
          className="w-40 h-40 md:w-56 md:h-56 bg-[#c75b5b] rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow"
        >
          <img
            src="/cat-flower.png"
            alt="Cat with flower"
            className="w-32 h-32 md:w-44 md:h-44 object-contain"
          />
        </motion.button>

        {/* Gift 2 - Couple */}
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigateTo('pictures')}
          className="w-40 h-40 md:w-56 md:h-56 bg-[#c75b5b] rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow"
        >
          <img
            src="/cat-couple.png"
            alt="Cat couple"
            className="w-32 h-32 md:w-44 md:h-44 object-contain"
          />
        </motion.button>

        {/* Gift 3 - Stand */}
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigateTo('letter')}
          className="w-40 h-40 md:w-56 md:h-56 bg-[#c75b5b] rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow"
        >
          <img
            src="/cat-stand.png"
            alt="Cat standing"
            className="w-32 h-32 md:w-44 md:h-44 object-contain"
          />
        </motion.button>
      </div>
    </motion.div>
  );

  // Song Page - Unforgettable Song
  const SongPage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8"
    >
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigateTo('presents')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </motion.button>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">
        {/* Music Player Card */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#c75b5b] rounded-3xl p-6 md:p-8 text-white shadow-2xl"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Unforgettable song</h2>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="aspect-square bg-white/20 rounded-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=300&fit=crop" alt="Couple" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square bg-white/20 rounded-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=300&h=300&fit=crop" alt="Couple" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square bg-white/20 rounded-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=300&h=300&fit=crop" alt="Couple" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square bg-white/20 rounded-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300&h=300&fit=crop" alt="Couple" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="mb-4">
            <p className="text-lg font-semibold">ELECTRIC LOVE</p>
            <p className="text-white/70">BY BØRNS</p>
          </div>

          <div className="flex items-center justify-center gap-6">
            <SkipBack className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#c75b5b] hover:scale-110 transition-transform"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
            <SkipForward className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            <div className="flex-1 h-1 bg-white/30 rounded-full">
              <div className="w-1/3 h-full bg-white rounded-full" />
            </div>
            <span className="text-sm">1:28</span>
          </div>
        </motion.div>

        {/* Letter Content */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <Music className="absolute -top-4 -right-4 w-8 h-8 text-[#c75b5b] animate-bounce" />
          <Music className="absolute top-20 -left-4 w-6 h-6 text-[#c75b5b] animate-pulse" />
          <Music className="absolute bottom-20 right-0 w-7 h-7 text-[#c75b5b] animate-bounce" style={{ animationDelay: '0.5s' }} />
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg">
            <p className="text-gray-700 leading-relaxed text-lg">
              Do you remember our first kiss?<br /><br />
              You played this song that night. I can still feel the moment so clearly — the way everything around us seemed to fade until it was just you and me. I was nervous, but somehow everything felt right, like time paused just for us.<br /><br />
              It makes me so happy every time I think about it. I still can't forget how your smile felt so close, how warm it was, and how everything about that moment felt soft and real. Whenever I play this song, it takes me back to that exact feeling — the rush, the calm, and the little flutter in my chest that hasn't gone away since.<br /><br />
              Even now, it still makes me shy, but in the best way — because that memory reminds me just how special you are to me.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  // Pictures Page - Heart Tree Animation
  const PicturesPage = () => {
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
          Back
        </motion.button>

        <div className="max-w-4xl mx-auto relative">
          {/* Title */}
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl md:text-5xl font-bold text-center text-[#c75b5b] mb-4"
          >
            Our Love Grows
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-gray-500 mb-8"
          >
            Like a tree, our love grows stronger every day
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
              "Every heartbeat is a reminder of my love for you"
            </p>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // Letter Page - Floating Hearts Animation
  const LetterPage = () => {
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
  };

  return (
    <AnimatePresence mode="wait">
      {currentPage === 'home' && <HomePage key="home" />}
      {currentPage === 'how-dare' && <HowDarePage key="how-dare" />}
      {currentPage === 'presents' && <PresentsPage key="presents" />}
      {currentPage === 'song' && <SongPage key="song" />}
      {currentPage === 'pictures' && <PicturesPage key="pictures" />}
      {currentPage === 'letter' && <LetterPage key="letter" />}
    </AnimatePresence>
  );
}

export default App;
