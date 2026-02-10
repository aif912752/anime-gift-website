import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { SaveButton } from './SaveButton';
import { savePhotoMemory } from '../hooks/usePhotoMemories';

interface LoveAnimationProps {
  navigateTo: (page: 'presents') => void;
}

export default function LoveAnimation({ navigateTo }: LoveAnimationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasCaptured, setHasCaptured] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  
  // Capture memory when envelope is opened
  useEffect(() => {
    if (!isOpen || hasCaptured || !containerRef.current) return;
    
    // Wait for animation to complete
    const timer = setTimeout(async () => {
      try {
        const html2canvas = (await import('html2canvas')).default;
        const canvas = await html2canvas(containerRef.current!, {
          scale: 1.2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#f0e6f6',
          logging: false,
        });
        
        const dataUrl = canvas.toDataURL('image/png');
        savePhotoMemory({
          pageId: 'letter',
          dataUrl,
          title: '💌 จดหมายรัก',
        });
        setHasCaptured(true);
      } catch (error) {
        console.error('Failed to capture LetterPage:', error);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [isOpen, hasCaptured]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative"
      style={{ backgroundColor: '#f0e6f6' }}
    >
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => navigateTo('presents')}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg transition-all hover:scale-105"
        style={{ fontFamily: 'Mitr, sans-serif' }}
      >
        <ArrowLeft className="w-5 h-5" />
        กลับ
      </motion.button>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl md:text-4xl font-bold text-[#d9534f] pt-8 mb-4 text-center"
        style={{ fontFamily: 'Mitr, sans-serif' }}
      >
        💌 จดหมายรักจากใจ 💌
      </motion.h1>

      {/* Original Envelope Structure */}
      <div className="envlope-wrapper">
        <div 
          id="envelope" 
          className={isOpen ? 'open' : 'close'}
          onClick={open}
        >
          <div className="front flap"></div>
          <div className="front pocket"></div>
          <div className="letter">
            <div className="words line1">ถึง: คนพิเศษ</div>
            <div className="words line2">ขอให้</div>
            <div className="words line3">น่ารักแบบนี้</div>
            <div className="words line4">ตลอดไป</div>
          </div>
          <div className="hearts">
            <div className="heart a1"></div>
            <div className="heart a2"></div>
            <div className="heart a3"></div>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="reset">
        <button id="open" onClick={open}>เปิดจดหมาย</button>
        <button id="reset" onClick={close}>ปิดซอง</button>
      </div>

      {/* Save Button */}
      <SaveButton
        pageId="love-letter"
        containerRef={containerRef}
      />

      {/* Original CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Mitr:wght@300;400;500;600;700&display=swap');

        #envelope {
          position: relative;
          width: 280px;
          height: 180px;
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
          margin-left: auto;
          margin-right: auto;
          top: 150px;
          background-color: #d9534f;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }

        .front {
          position: absolute;
          width: 0;
          height: 0;
          z-index: 3;
        }

        .flap {
          border-left: 140px solid transparent;
          border-right: 140px solid transparent;
          border-bottom: 82px solid transparent;
          border-top: 98px solid #d9534f;
          transform-origin: top;
          pointer-events: none;
        }

        .pocket {
          border-left: 140px solid #f5a3a2;
          border-right: 140px solid #f5a3a2;
          border-bottom: 90px solid #ff6f61;
          border-top: 90px solid transparent;
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
        }

        .letter {
          position: relative;
          background-color: #fff;
          width: 90%;
          margin-left: auto;
          margin-right: auto;
          height: 90%;
          top: 5%;
          border-radius: 6px;
          box-shadow: 0 2px 26px rgba(0, 0, 0, 0.12);
        }

        .words {
          position: absolute;
          left: 10%;
          width: 80%;
          height: 14%;
          background-color: #ffe6e6;
          font-family: 'Mitr', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        }

        .words.line1 {
          top: 10%;
          width: 30%;
          height: 12%;
          font-size: 0.75rem;
          color: #d9534f;
        }

        .words.line2 {
          top: 32%;
          text-align: center;
          font-size: 0.9rem;
          color: #333;
        }

        .words.line3 {
          top: 52%;
          font-size: 0.9rem;
          text-align: center;
          color: #333;
        }

        .words.line4 {
          top: 72%;
          font-size: 0.9rem;
          text-align: center;
          color: #333;
        }

        .open .flap {
          transform: rotateX(180deg);
          transition: transform 0.4s ease, z-index 0.6s;
          z-index: 1;
        }

        .close .flap {
          transform: rotateX(0deg);
          transition: transform 0.4s 0.6s ease, z-index 1s;
          z-index: 5;
        }

        .close .letter {
          transform: translateY(0px);
          transition: transform 0.4s ease, z-index 1s;
          z-index: 1;
        }

        .open .letter {
          transform: translateY(-100px);
          transition: transform 0.4s 0.6s ease, z-index 0.6s;
          z-index: 2;
        }

        .hearts {
          position: absolute;
          top: 90px;
          left: 0;
          right: 0;
          z-index: 2;
        }

        .heart {
          position: absolute;
          bottom: 0;
          right: 10%;
          pointer-events: none;
        }

        .heart:before,
        .heart:after {
          position: absolute;
          content: "";
          left: 50px;
          top: 0;
          width: 50px;
          height: 80px;
          background: #e60073;
          border-radius: 50px 50px 0 0;
          transform: rotate(-45deg);
          transform-origin: 0 100%;
          pointer-events: none;
        }

        .heart:after {
          left: 0;
          transform: rotate(45deg);
          transform-origin: 100% 100%;
        }

        .close .heart {
          opacity: 0;
          animation: none;
        }

        .a1 {
          left: 20%;
          transform: scale(0.6);
          opacity: 1;
          animation: slideUp 4s linear 1, sideSway 2s ease-in-out 4 alternate;
          animation-fill-mode: forwards;
          animation-delay: 0.7s;
        }

        .a2 {
          left: 55%;
          transform: scale(1);
          opacity: 1;
          animation: slideUp 5s linear 1, sideSway 4s ease-in-out 2 alternate;
          animation-fill-mode: forwards;
          animation-delay: 0.7s;
        }

        .a3 {
          left: 10%;
          transform: scale(0.8);
          opacity: 1;
          animation: slideUp 7s linear 1, sideSway 2s ease-in-out 6 alternate;
          animation-fill-mode: forwards;
          animation-delay: 0.7s;
        }

        @keyframes slideUp {
          0% {
            top: 0;
          }
          100% {
            top: -600px;
          }
        }

        @keyframes sideSway {
          0% {
            margin-left: 0px;
          }
          100% {
            margin-left: 50px;
          }
        }

        .envlope-wrapper {
          height: 380px;
        }

        .reset {
          text-align: center;
        }

        .reset button {
          font-weight: 800;
          font-style: normal;
          transition: all 0.1s linear;
          -webkit-appearance: none;
          background-color: transparent;
          border: solid 2px #d9534f;
          border-radius: 4px;
          color: #d9534f;
          display: inline-block;
          font-size: 14px;
          text-transform: uppercase;
          margin: 5px;
          padding: 10px;
          line-height: 1em;
          text-decoration: none;
          min-width: 120px;
          cursor: pointer;
          font-family: 'Mitr', sans-serif;
        }

        .reset button:hover {
          background-color: #d9534f;
          color: #fff;
        }

        /* Responsive */
        @media (max-width: 480px) {
          #envelope {
            width: 260px;
            height: 170px;
            top: 100px;
          }

          .flap {
            border-left: 130px solid transparent;
            border-right: 130px solid transparent;
            border-top: 90px solid #d9534f;
          }

          .pocket {
            border-left: 130px solid #f5a3a2;
            border-right: 130px solid #f5a3a2;
            border-bottom: 85px solid #ff6f61;
            border-top: 85px solid transparent;
          }

          .open .letter {
            transform: translateY(-80px);
          }

          .words.line1 {
            font-size: 0.7rem;
          }

          .words.line2,
          .words.line3,
          .words.line4 {
            font-size: 0.8rem;
          }

          .envlope-wrapper {
            height: 320px;
          }
        }
      `}</style>
    </motion.div>
  );
}
