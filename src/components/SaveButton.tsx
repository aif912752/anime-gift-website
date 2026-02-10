import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Heart, Bookmark, X, Check, Image as ImageIcon } from 'lucide-react';
import html2canvas from 'html2canvas';
import { Button } from './ui/button';

interface SaveButtonProps {
  pageId: string;
  message?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
  variant?: 'floating' | 'inline';
}

interface SavedItem {
  id: string;
  type: 'screenshot' | 'message';
  data: string;
  timestamp: number;
  pageId: string;
}

// Storage key
const STORAGE_KEY = 'anime-gift-saved-items';

// Get saved items from localStorage
export const getSavedItems = (): SavedItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save item to localStorage
export const saveItem = (item: Omit<SavedItem, 'id' | 'timestamp'>) => {
  try {
    const items = getSavedItems();
    const newItem: SavedItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    items.unshift(newItem);
    // Keep only last 50 items
    const trimmedItems = items.slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedItems));
    return newItem;
  } catch {
    return null;
  }
};

// Delete item from localStorage
export const deleteItem = (id: string) => {
  try {
    const items = getSavedItems();
    const filtered = items.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
};

export function SaveButton({ pageId, message, containerRef, variant = 'floating' }: SaveButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showNotification = useCallback((msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, []);

  // Save screenshot
  const handleSaveScreenshot = async () => {
    try {
      // Find the main content container
      const target = containerRef?.current || document.querySelector('.min-h-screen') || document.body;
      
      const canvas = await html2canvas(target as HTMLElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });

      // Save to file
      const link = document.createElement('a');
      link.download = `anime-gift-${pageId}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      // Also save to storage
      const dataUrl = canvas.toDataURL('image/png');
      saveItem({
        type: 'screenshot',
        data: dataUrl,
        pageId,
      });

      showNotification('💾 บันทึกภาพแล้ว!');
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to save screenshot:', error);
      showNotification('❌ บันทึกไม่สำเร็จ');
    }
  };

  // Save message
  const handleSaveMessage = () => {
    if (!message) return;
    
    const saved = saveItem({
      type: 'message',
      data: message,
      pageId,
    });

    if (saved) {
      showNotification('💝 บันทึกข้อความโปรดแล้ว!');
      setIsOpen(false);
    } else {
      showNotification('❌ บันทึกไม่สำเร็จ');
    }
  };

  const buttonVariants = {
    floating: 'fixed bottom-6 right-6 z-50',
    inline: 'relative inline-block',
  };

  return (
    <>
      {/* Main Button */}
      <div className={buttonVariants[variant]}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-pink-400 to-rose-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
          <span className="font-medium">{isOpen ? 'ปิด' : 'บันทึก'}</span>
        </motion.button>

        {/* Menu Options */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-full right-0 mb-3 bg-white rounded-2xl shadow-xl p-3 min-w-[180px] border border-pink-100"
            >
              <div className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  onClick={handleSaveScreenshot}
                  className="flex items-center gap-2 justify-start hover:bg-pink-50 text-gray-700"
                >
                  <Camera className="w-4 h-4 text-pink-500" />
                  <span>📸 บันทึกภาพ</span>
                </Button>
                
                {message && (
                  <Button
                    variant="ghost"
                    onClick={handleSaveMessage}
                    className="flex items-center gap-2 justify-start hover:bg-pink-50 text-gray-700"
                  >
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>💝 บันทึกข้อความ</span>
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Component to display saved items gallery
export function SavedItemsGallery({ onClose }: { onClose: () => void }) {
  const [items, setItems] = useState<SavedItem[]>([]);
  const [selectedType, setSelectedType] = useState<'all' | 'screenshot' | 'message'>('all');

  // Load items on mount
  useEffect(() => {
    setItems(getSavedItems());
  }, []);
  
  // Refresh items
  const refreshItems = () => {
    setItems(getSavedItems());
  };

  const handleDelete = (id: string) => {
    if (deleteItem(id)) {
      refreshItems();
    }
  };

  const filteredItems = selectedType === 'all' 
    ? items 
    : items.filter(item => item.type === selectedType);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-pink-50 to-rose-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-pink-500" />
              ของที่บันทึกไว้
            </h2>
            <p className="text-gray-500 text-sm mt-1">{items.length} รายการ</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 p-4 border-b border-gray-100">
          {(['all', 'screenshot', 'message'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedType === type
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type === 'all' && 'ทั้งหมด'}
              {type === 'screenshot' && '📸 ภาพ'}
              {type === 'message' && '💝 ข้อความ'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500">ยังไม่มีอะไรบันทึกไว้</p>
              <p className="text-gray-400 text-sm mt-1">
                กดปุ่ม "บันทึก" ในหน้าต่างๆ เพื่อเก็บความทรงจำ
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group relative bg-gray-50 rounded-xl overflow-hidden border border-gray-100"
                >
                  {item.type === 'screenshot' ? (
                    <div className="aspect-square">
                      <img
                        src={item.data}
                        alt="Saved screenshot"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square p-4 flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50">
                      <p className="text-gray-700 text-center text-sm line-clamp-4">
                        {item.data}
                      </p>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {item.type === 'screenshot' && (
                      <a
                        href={item.data}
                        download={`saved-${item.timestamp}.png`}
                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <ImageIcon className="w-5 h-5 text-gray-700" />
                      </a>
                    )}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors"
                    >
                      <X className="w-5 h-5 text-red-500" />
                    </button>
                  </div>

                  {/* Timestamp */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-white text-xs">
                      {new Date(item.timestamp).toLocaleDateString('th-TH', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Floating saved items button
export function SavedItemsButton() {
  const [showGallery, setShowGallery] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  // Update count periodically
  useEffect(() => {
    const updateCount = () => {
      setItemCount(getSavedItems().length);
    };
    updateCount();
    const interval = setInterval(updateCount, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowGallery(true)}
        className="fixed bottom-6 left-6 z-50 bg-white text-gray-700 p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 border border-pink-100"
      >
        <Bookmark className="w-5 h-5 text-pink-500" />
        <span className="font-medium">ของที่บันทึก</span>
        {itemCount > 0 && (
          <span className="bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {showGallery && <SavedItemsGallery onClose={() => setShowGallery(false)} />}
      </AnimatePresence>
    </>
  );
}

export default SaveButton;
