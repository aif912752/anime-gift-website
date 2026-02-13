import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, Palette, X, Heart } from 'lucide-react';
import html2canvas from 'html2canvas';
import { getPhotoMemories, type PhotoMemory } from '../hooks/usePhotoMemories';

interface PhotoBoothPageProps {
  navigateTo: (page: 'home') => void;
}

const FILTERS = [
  { id: 'none', name: 'ปกติ', class: '', icon: '✨' },
  { id: 'pink', name: 'หวานแหวว', class: 'photo-filter-pink', icon: '🌸' },
  { id: 'vintage', name: 'วินเทจ', class: 'photo-filter-vintage', icon: '📷' },
  { id: 'bw', name: 'ขาวดำ', class: 'photo-filter-bw', icon: '🖤' },
  { id: 'warm', name: 'อุ่นๆ', class: 'photo-filter-warm', icon: '☀️' },
  { id: 'cool', name: 'เย็นๆ', class: 'photo-filter-cool', icon: '❄️' },
  { id: 'pastel', name: 'พาสเทล', class: 'photo-filter-pastel', icon: '🎨' },
  { id: 'dreamy', name: 'ฝันหวาน', class: 'photo-filter-dreamy', icon: '☁️' },
];

const FRAMES = [
  { id: 'classic', name: 'คลาสสิก', class: 'frame-classic', icon: '🖼️' },
  { id: 'cute', name: 'น่ารัก', class: 'frame-cute', icon: '🎀' },
  { id: 'polaroid', name: 'โพลารอยด์', class: 'frame-polaroid', icon: '📸' },
  { id: 'heart', name: 'หัวใจ', class: 'frame-heart', icon: '💕' },
  { id: 'anime', name: 'อนิเมะ', class: 'frame-anime', icon: '✨' },
];

const STICKERS = [
  { id: 'none', emoji: '', name: 'ไม่มี' },
  { id: 'heart1', emoji: '💖', name: 'หัวใจวิ้ง' },
  { id: 'heart2', emoji: '💕', name: 'หัวใจคู่' },
  { id: 'star', emoji: '⭐', name: 'ดาว' },
  { id: 'sparkle', emoji: '✨', name: 'ประกาย' },
  { id: 'flower', emoji: '🌸', name: 'ซากุระ' },
  { id: 'ribbon', emoji: '🎀', name: 'โบว์' },
  { id: 'cat', emoji: '😺', name: 'เหมียว' },
  { id: 'love', emoji: '💌', name: 'จดหมาย' },
  { id: 'crown', emoji: '👑', name: 'มงกุฎ' },
];

export function PhotoBoothPage({ navigateTo }: PhotoBoothPageProps) {
  const [savedMemories, setSavedMemories] = useState<PhotoMemory[]>([]);
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);
  const [selectedFrame, setSelectedFrame] = useState(FRAMES[1]);
  const [selectedSticker, setSelectedSticker] = useState(STICKERS[0]);
  const [caption, setCaption] = useState('รักนะ 💕');
  const [isCapturing, setIsCapturing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [capturedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'saved'>('preview');
  const [hideUI, setHideUI] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSavedMemories(getPhotoMemories());
  }, []);

  const handleCapture = async () => {
    if (!previewRef.current) return;

    setIsCapturing(true);
    setHideUI(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 200));

      const images = previewRef.current.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map(
          (img: any) =>
            new Promise<void>((resolve) => {
              if (img.complete && img.naturalHeight !== 0) {
                resolve();
              } else {
                img.onload = () => resolve();
                img.onerror = () => resolve();
              }
            })
        )
      );

      // Store original transform if polaroid
      const isPolaroid = selectedFrame.id === 'polaroid';
      const originalTransform = isPolaroid ? previewRef.current.style.transform : '';

      // Remove transform for clean capture
      if (isPolaroid && previewRef.current) {
        previewRef.current.style.transform = 'none';
      }

      // Fix object-fit for images before capture
      const allImages = previewRef.current.querySelectorAll('img');
      const originalStyles: Array<{img: HTMLImageElement, src: string, width: string, height: string, objectFit: string}> = [];

      allImages.forEach((img) => {
        const htmlImg = img as HTMLImageElement;

        // Store original styles
        originalStyles.push({
          img: htmlImg,
          src: htmlImg.src,
          width: htmlImg.style.width,
          height: htmlImg.style.height,
          objectFit: htmlImg.style.objectFit
        });

        // Calculate proper dimensions for object-fit: cover
        const containerRect = htmlImg.parentElement?.getBoundingClientRect();
        if (!containerRect) return;

        const naturalRatio = htmlImg.naturalWidth / htmlImg.naturalHeight;
        const containerRatio = containerRect.width / containerRect.height;

        let finalWidth, finalHeight;

        if (naturalRatio > containerRatio) {
          // Image is wider than container - fit to height
          finalHeight = containerRect.height;
          finalWidth = containerRect.height * naturalRatio;
        } else {
          // Image is taller than container - fit to width
          finalWidth = containerRect.width;
          finalHeight = containerRect.width / naturalRatio;
        }

        // Calculate offset to center the image
        const offsetX = (containerRect.width - finalWidth) / 2;
        const offsetY = (containerRect.height - finalHeight) / 2;

        // Apply styles to simulate object-fit: cover
        htmlImg.style.width = `${finalWidth}px`;
        htmlImg.style.height = `${finalHeight}px`;
        htmlImg.style.position = 'absolute';
        htmlImg.style.left = `${offsetX}px`;
        htmlImg.style.top = `${offsetY}px`;
        htmlImg.style.objectFit = 'none';

        // Make sure parent has proper positioning
        if (htmlImg.parentElement) {
          const parent = htmlImg.parentElement;
          parent.style.position = 'relative';
          parent.style.overflow = 'hidden';
        }
      });

      await new Promise(resolve => setTimeout(resolve, 500));

      // Force layout recalculation
      previewRef.current.offsetHeight;

      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 5000,
      });

      // Restore original styles
      originalStyles.forEach(({img, width, height, objectFit}) => {
        img.style.width = width;
        img.style.height = height;
        img.style.objectFit = objectFit;
        img.style.position = '';
        img.style.left = '';
        img.style.top = '';

        // Reset parent styles
        if (img.parentElement) {
          img.parentElement.style.position = '';
          img.parentElement.style.overflow = '';
        }
      });

      // Restore transform
      if (isPolaroid && previewRef.current) {
        previewRef.current.style.transform = originalTransform;
      }
      
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `photobooth-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to capture:', error);
    } finally {
      setIsCapturing(false);
      setHideUI(false);
    }
  };

  const getFilterClass = () => {
    switch (selectedFilter.id) {
      case 'pink': return 'sepia-[0.3] saturate-[1.5] hue-rotate-[-20deg]';
      case 'vintage': return 'sepia-[0.4] contrast-90 brightness-95';
      case 'bw': return 'grayscale';
      case 'warm': return 'sepia-[0.2] saturate-[1.3] hue-rotate-[-10deg] brightness-105';
      case 'cool': return 'saturate-[1.1] hue-rotate-[10deg] brightness-102';
      case 'pastel': return 'saturate-[0.5] brightness-125 contrast-90 opacity-90';
      case 'dreamy': return 'saturate-[1.2] brightness-105 contrast-90';
      default: return '';
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
      {/* Header */}
      {!hideUI && (
        <div className="max-w-6xl mx-auto mb-6">
          <div className="flex items-center justify-between">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigateTo('home')} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <X className="w-5 h-5" /><span>ปิด</span>
            </motion.button>
            <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Camera className="w-8 h-8 text-pink-500" />Photo Booth<Sparkles className="w-6 h-6 text-yellow-500" />
            </motion.h1>
            <div className="w-20" />
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr,350px] gap-8">
        {/* Left Side - Photo Card with FIXED WIDTH */}
        <div className="flex justify-center">
          <div 
            ref={previewRef}
            className={`relative bg-white shadow-2xl overflow-hidden ${selectedFrame.class} ${getFilterClass()} ${selectedFrame.id === 'polaroid' || selectedFrame.id === 'heart' ? '' : 'rounded-3xl'}`}
            style={{ width: selectedFrame.id === 'polaroid' ? '420px' : '500px', maxWidth: '100%' }}
          >
            {/* Frame decorations */}
            {selectedFrame.id === 'cute' && <div className="absolute inset-0 pointer-events-none z-20"><div className="absolute top-2 left-2 text-3xl">🎀</div><div className="absolute top-2 right-2 text-3xl">🎀</div><div className="absolute bottom-2 left-2 text-3xl">💖</div><div className="absolute bottom-2 right-2 text-3xl">💖</div></div>}
            {selectedFrame.id === 'heart' && <div className="absolute inset-0 pointer-events-none z-20"><div className="absolute top-1 left-4 text-2xl opacity-60">💕</div><div className="absolute top-8 right-4 text-xl opacity-60">💖</div><div className="absolute bottom-8 left-6 text-xl opacity-60">💗</div><div className="absolute bottom-2 right-6 text-2xl opacity-60">💝</div></div>}
            {selectedFrame.id === 'anime' && <div className="absolute inset-0 pointer-events-none z-20"><div className="absolute -top-1 -left-1 w-8 h-8 border-l-4 border-t-4 border-pink-400 rounded-tl-lg" /><div className="absolute -top-1 -right-1 w-8 h-8 border-r-4 border-t-4 border-pink-400 rounded-tr-lg" /><div className="absolute -bottom-1 -left-1 w-8 h-8 border-l-4 border-b-4 border-pink-400 rounded-bl-lg" /><div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-4 border-b-4 border-pink-400 rounded-br-lg" /></div>}
            
            <div className={selectedFrame.id === 'polaroid' ? '' : 'p-5'}>
              {/* Tab Switcher */}
              {!hideUI && (
                <div className="flex justify-center gap-2 mb-4">
                  <button onClick={() => setActiveTab('preview')} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${activeTab === 'preview' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-600'}`}>🎨 ตัวอย่าง</button>
                  <button onClick={() => setActiveTab('saved')} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${activeTab === 'saved' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-600'}`}>📸 ที่บันทึก ({savedMemories.length})</button>
                </div>
              )}

              {/* Content - SQUARE Grid */}
              {activeTab === 'preview' || hideUI ? (
                <div ref={gridRef} className={`grid grid-cols-2 gap-3 ${selectedFrame.id === 'polaroid' ? 'polaroid-grid' : ''}`}>
                  {/* Slot 1 - Square */}
                  <div className={`relative aspect-square overflow-hidden shadow-md bg-pink-100 ${selectedFrame.id === 'polaroid' ? '' : 'rounded-xl'}`}>
                    <img src="/images/11.jpg" alt="Photo 1" className="w-full h-full object-cover" crossOrigin="anonymous" />
                    {selectedSticker.id !== 'none' && <div className="absolute -top-1 -right-1 text-2xl">{selectedSticker.emoji}</div>}
                  </div>
                  
                  {/* Slot 2 - Square */}
                  <div className={`relative aspect-square overflow-hidden shadow-md ${selectedFrame.id === 'polaroid' ? '' : 'rounded-xl'}`}>
                    <div className="w-full h-full bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 p-3 flex flex-col justify-center overflow-hidden">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-5 h-5 text-[#c75b5b] fill-[#c75b5b] flex-shrink-0" />
                        <h3 className="text-xs font-bold text-[#c75b5b]">ข้อความจากหัวใจ 💌</h3>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-[10px] leading-tight text-gray-700">
                          <span className="text-gray-800 font-medium">ไม่อยากให้คุณไม่สบาย</span><br />
                          <span className="text-gray-800">เวลาคุณไม่สบายผมจ๋องๆ เป็นสองเท่า</span><br />
                          <span className="text-gray-800">ผมเป็นห่วงคุณที่สุด</span><br />
                          <span className="text-gray-600">แม้รู้ดีแก่ใจว่าคุณดูแลตัวเองได้</span><br />
                          <span className="text-gray-600">คุณดูแลตัวเองได้ดีมาโดยตลอด</span><br />
                          <span className="text-gray-800">แต่ผมก็อดห่วงคุณไม่ได้นี่นา</span>
                        </p>
                        <p className="text-[11px] leading-tight mt-1">
                          <span className="text-[#c75b5b] font-bold">ขอให้คุณหายป่วยเร็วๆ เพี้ยง !!!!</span>
                        </p>
                        <p className="text-[10px] leading-tight mt-1">
                          <span className="text-[#c75b5b] font-bold">แล้วรีบมาหาผ้มได้แล่วค้าบบบบ คิดถึงงงงฮือ 💕💕💕</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Slot 3 - Square */}
                  <div className={`relative aspect-square overflow-hidden shadow-md ${selectedFrame.id === 'polaroid' ? '' : 'rounded-xl'}`}>
                    <div className="w-full h-full bg-[#f0e6f6] flex flex-col relative p-3">
                      <div className="absolute top-2 right-2 text-lg opacity-30">💌</div>
                      <div className="absolute bottom-2 left-2 text-base opacity-30">💕</div>
                      <div className="relative flex-1 flex items-center justify-center">
                        <div className="relative w-28 h-24">
                          <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#ff6f61] rounded-b-lg" style={{ clipPath: 'polygon(0 0, 50% 45%, 100% 0, 100% 100%, 0 100%)' }} />
                          <div className="absolute top-0 left-0 right-0 h-10 bg-[#d9534f] rounded-t-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', transform: 'rotateX(180deg)' }} />
                          <div className="absolute bottom-2 left-1 right-1 h-16 bg-white rounded-lg shadow-lg p-2 flex flex-col justify-center" style={{ transform: 'translateY(-10px)' }}>
                            <div className="text-[10px] text-[#d9534f] bg-rose-100 rounded px-2 py-1 w-fit mb-1">ถึง: คนพิเศษ</div>
                            <div className="text-xs text-gray-700 text-center leading-tight">ขอให้น่ารัก<br/>ตลอดไป 💕</div>
                          </div>
                          <div className="absolute -top-1 left-3 text-lg">💕</div>
                          <div className="absolute -top-1 right-3 text-sm">💖</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Slot 4 - Square */}
                  <div className={`relative aspect-square overflow-hidden shadow-md bg-pink-100 ${selectedFrame.id === 'polaroid' ? '' : 'rounded-xl'}`}>
                    <img src="/images/22.jpg" alt="Photo 2" className="w-full h-full object-cover" crossOrigin="anonymous" />
                  </div>
                </div>
              ) : (
                <div className={`grid grid-cols-2 gap-3 ${selectedFrame.id === 'polaroid' ? 'polaroid-grid' : ''}`}>
                  {savedMemories.length === 0 ? <div className={`col-span-2 text-center py-8 bg-gray-50 ${selectedFrame.id === 'polaroid' ? '' : 'rounded-xl'}`}><div className="text-4xl mb-2">📸</div><p className="text-gray-500 text-sm">ยังไม่มีภาพที่บันทึก</p></div> : savedMemories.slice(0, 4).map((memory, index) => <motion.div key={memory.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1 }} className={`relative aspect-square overflow-hidden ${selectedFrame.id === 'polaroid' ? '' : 'rounded-xl'}`}><img src={memory.dataUrl} alt={memory.title} className="w-full h-full object-cover" /></motion.div>)}
                </div>
              )}

              {/* Footer - Hidden when using Polaroid frame */}
              {selectedFrame.id !== 'polaroid' && (
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-full">
                    <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                    <span className="text-sm text-gray-600">Anime Gift Website</span>
                    <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Flash */}
          <AnimatePresence>{isCapturing && <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="fixed inset-0 bg-white z-50 pointer-events-none" />}</AnimatePresence>
        </div>

        {/* Right Side - Controls */}
        {!hideUI && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><Sparkles className="w-4 h-4 text-yellow-500" />ข้อความ</label>
              <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none text-sm" placeholder="พิมพ์ข้อความ..." maxLength={20} />
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><Palette className="w-4 h-4 text-pink-500" />กรองรูป</label>
              <div className="grid grid-cols-4 gap-2">
                {FILTERS.map((filter) => <motion.button key={filter.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSelectedFilter(filter)} className={`p-2 rounded-xl text-center transition-all ${selectedFilter.id === filter.id ? 'bg-pink-500 text-white' : 'bg-gray-50 hover:bg-gray-100'}`}><div className="text-lg">{filter.icon}</div><div className="text-[10px]">{filter.name}</div></motion.button>)}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><span className="text-lg">🖼️</span>เฟรมรูป</label>
              <div className="flex gap-2 flex-wrap">
                {FRAMES.map((frame) => <motion.button key={frame.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSelectedFrame(frame)} className={`px-3 py-1.5 rounded-xl text-xs transition-all ${selectedFrame.id === frame.id ? 'bg-purple-500 text-white' : 'bg-gray-50 hover:bg-gray-100'}`}><span className="mr-1">{frame.icon}</span>{frame.name}</motion.button>)}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><span className="text-lg">🎨</span>สติ๊กเกอร์</label>
              <div className="grid grid-cols-5 gap-1">
                {STICKERS.map((sticker) => <motion.button key={sticker.id} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setSelectedSticker(sticker)} className={`p-1.5 rounded-xl text-xl transition-all ${selectedSticker.id === sticker.id ? 'bg-pink-100 ring-2 ring-pink-400' : 'hover:bg-gray-50'}`}>{sticker.emoji || '❌'}</motion.button>)}
              </div>
            </div>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleCapture} disabled={isCapturing} className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 disabled:opacity-50">
              {isCapturing ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />กำลังถ่าย...</> : <><Camera className="w-6 h-6" />ถ่ายรูป 📸</>}
            </motion.button>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && capturedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowPreview(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="text-center mb-4"><h3 className="text-xl font-bold text-gray-800">📸 บันทึกสำเร็จ!</h3></div>
              <div className="text-center text-gray-600 mb-6">รูปของคุณถูกบันทึกแล้ว</div>
              <div className="flex gap-3"><button onClick={() => setShowPreview(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium">ถ่ายใหม่</button><button onClick={() => setShowPreview(false)} className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium">ปิด</button></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default PhotoBoothPage;
