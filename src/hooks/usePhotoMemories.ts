import { useState, useEffect, useCallback } from 'react';

// Types
export interface PhotoMemory {
  id: string;
  pageId: 'song' | 'letter' | 'heart-wall' | 'love-message' | 'pictures';
  dataUrl: string;
  timestamp: number;
  title: string;
}

const STORAGE_KEY = 'anime-gift-memories';

// Get memories from localStorage
export const getPhotoMemories = (): PhotoMemory[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save memory to localStorage
export const savePhotoMemory = (memory: Omit<PhotoMemory, 'id' | 'timestamp'>) => {
  try {
    const memories = getPhotoMemories();
    
    // Remove existing memory for same page
    const filtered = memories.filter(m => m.pageId !== memory.pageId);
    
    const newMemory: PhotoMemory = {
      ...memory,
      id: `${memory.pageId}-${Date.now()}`,
      timestamp: Date.now(),
    };
    
    filtered.unshift(newMemory);
    // Keep only last 10 memories
    const trimmed = filtered.slice(0, 10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    
    return newMemory;
  } catch (error) {
    console.error('Failed to save memory:', error);
    return null;
  }
};

// Clear all memories
export const clearPhotoMemories = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// Hook for components to save memories
export const usePhotoMemories = () => {
  const [memories, setMemories] = useState<PhotoMemory[]>([]);
  
  useEffect(() => {
    setMemories(getPhotoMemories());
  }, []);
  
  const refreshMemories = useCallback(() => {
    setMemories(getPhotoMemories());
  }, []);
  
  const captureAndSave = useCallback(async (
    element: HTMLElement | null,
    pageId: PhotoMemory['pageId'],
    title: string
  ) => {
    if (!element) return null;
    
    try {
      // Dynamically import html2canvas to avoid loading it unnecessarily
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        // Capture only the visible part
        x: 0,
        y: 0,
        width: element.scrollWidth,
        height: element.scrollHeight,
      });
      
      const dataUrl = canvas.toDataURL('image/png');
      const saved = savePhotoMemory({
        pageId,
        dataUrl,
        title,
      });
      
      if (saved) {
        refreshMemories();
      }
      
      return saved;
    } catch (error) {
      console.error('Failed to capture memory:', error);
      return null;
    }
  }, [refreshMemories]);
  
  return {
    memories,
    refreshMemories,
    captureAndSave,
    clearMemories: clearPhotoMemories,
  };
};

export default usePhotoMemories;
