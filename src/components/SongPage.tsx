import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Heart, Music, ArrowLeft } from 'lucide-react';

interface SongPageProps {
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  navigateTo: (page: 'presents') => void;
}

export function SongPage({ isPlaying, setIsPlaying, navigateTo }: SongPageProps) {
  return (
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
}
