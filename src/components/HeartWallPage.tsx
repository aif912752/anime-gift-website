import React, { useEffect, useRef, useState } from 'react';
import biubiuGif from '/images/biubiubiu.gif';
import heartPng from '/images/heart.png';
import { SaveButton } from './SaveButton';
import { savePhotoMemory } from '../hooks/usePhotoMemories';

const blk_pitn = {
  block1: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
  block2: [[0, 1], [0, 0], [-1, 0], [0, -1]],
  block3: [[-1, 1], [0, 0], [-1, 0], [-1, -1]],
  block4: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
  block5: [[-1, 1], [0, 0], [-1, 0], [0, -1]],
  block6: [[0, -1], [0, 0], [-1, 0], [1, -1]],
  block7: [[-1, -1], [0, 0], [-1, 0], [1, 0]],
  block8: [[-1, 1], [0, 0], [-1, 0], [-1, -1]],
  block9: [[0, -1], [0, 0], [-1, 0], [1, 0]],
  block10: [[-1, 1], [0, 0], [-1, 0], [1, 0]],
  block11: [[2, 0], [0, 0], [-1, 0], [1, 0]],
  block12: [[0, 1], [0, 0], [-1, 0], [0, -1]],
  block13: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
  block14: [[1, 1], [0, 0], [-1, 0], [1, 0]],
  block15: [[1, -1], [0, 0], [-1, 0], [1, 0]],
  block16: [[-1, -1], [0, 0], [-1, 0], [1, 0]],
  block17: [[0, 1], [0, 0], [-1, 0], [0, -1]],
  block18: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
  block19: [[0, -1], [0, 0], [-1, 0], [1, 0]],
  block20: [[1, -1], [0, 0], [-1, 0], [1, 0]],
  block21: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
  block22: [[1, 1], [0, 0], [-1, 0], [1, 0]],
  block23: [[0, 2], [0, 0], [0, -1], [0, 1]],
};

const offset_pitn = {
  block1: [5, 3],
  block2: [5, 1],
  block3: [3, 4],
  block4: [3, 2],
  block5: [3, -1],
  block6: [2, 5],
  block7: [2, 1],
  block8: [1, -1],
  block9: [1, -3],
  block10: [1, 2],
  block11: [0, 3],
  block12: [0, 0],
  block13: [-1, -4],
  block14: [0, -2],
  block15: [-2, 4],
  block16: [-2, 2],
  block17: [-2, 0],
  block18: [-3, -2],
  block19: [-4, 0],
  block20: [-3, 5],
  block21: [-5, 3],
  block22: [-4, 1],
  block23: [-6, 1],
};

interface HeartWallPageProps {
  navigateTo: (page: 'love-message') => void;
}

const HeartWallPage: React.FC<HeartWallPageProps> = () => {
  const [started, setStarted] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const loveRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const block_left = useRef(0);
  const block_top = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Calculate responsive scale based on viewport
  useEffect(() => {
    const calculateScale = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const minDimension = Math.min(vw, vh);
      
      if (minDimension < 400) {
        setScale(0.4);
        setIsMobile(true);
      } else if (minDimension < 600) {
        setScale(0.5);
        setIsMobile(true);
      } else if (minDimension < 768) {
        setScale(0.6);
        setIsMobile(true);
      } else if (minDimension < 1024) {
        setScale(0.75);
        setIsMobile(true);
      } else {
        setScale(1);
        setIsMobile(false);
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  // Initialize block position
  useEffect(() => {
    if (blockRef.current) {
      block_left.current = window.innerWidth / 2;
      block_top.current = window.innerHeight / 2;
      
      blockRef.current.style.top = block_top.current + 'px';
      blockRef.current.style.left = block_left.current + 'px';
      blockRef.current.style.margin = '-20px 0 0 -20px';
    }
  }, []);

  // Start everything when user clicks the button
  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    setStarted(true);
  };

  // Capture memory when animation completes
  useEffect(() => {
    if (!animationComplete || !containerRef.current) return;
    
    const timer = setTimeout(async () => {
      try {
        const html2canvas = (await import('html2canvas')).default;
        const canvas = await html2canvas(containerRef.current!, {
          scale: 1.2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          logging: false,
        });
        
        const dataUrl = canvas.toDataURL('image/png');
        savePhotoMemory({
          pageId: 'heart-wall',
          dataUrl,
          title: '💖 กำแพงหัวใจ',
        });
      } catch (error) {
        console.error('Failed to capture HeartWallPage:', error);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [animationComplete]);

  // Animation effect - only runs after started
  useEffect(() => {
    if (!started) return;

    const Rise = () => {
      if (loveRef.current) {
        const love_top = parseFloat(window.getComputedStyle(loveRef.current).top.slice(0, -2));
        let distance = 0;
        const target = 120;
        const speed = 1;

        const timer2 = setInterval(() => {
          distance += speed;
          if (distance >= target) {
            clearInterval(timer2);
          }
          if (loveRef.current) {
            loveRef.current.style.top = (love_top - distance) + 'px';
          }
        }, 22);
      }
    };

    const Next = () => {
      indexRef.current++;

      if (indexRef.current >= 24) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        Rise();
        // Mark animation as complete after a delay
        setTimeout(() => {
          setAnimationComplete(true);
        }, 3000);
        return;
      }

      if (blockRef.current && loveRef.current) {
        blockRef.current.style.visibility = 'visible';

        const idx = indexRef.current;
        blockRef.current.style.left = (block_left.current + 40 * offset_pitn[`block${idx}` as keyof typeof offset_pitn][0]) + 'px';
        blockRef.current.style.top = (block_top.current - 40 * offset_pitn[`block${idx}` as keyof typeof offset_pitn][1]) + 'px';

        const blockData = blk_pitn[`block${idx}` as keyof typeof blk_pitn];
        for (let i = 0; i < blockRef.current.children.length; i++) {
          const child = blockRef.current.children[i] as HTMLDivElement;
          child.style.left = (blockData[i][0] * -40) + 'px';
          child.style.top = (blockData[i][1] * -40) + 'px';
        }

        const clone = blockRef.current.cloneNode(true) as HTMLDivElement;
        loveRef.current.appendChild(clone);

        if (loveRef.current.children.length >= 24) {
          const allBlocks = loveRef.current.children;
          const lastBlock = allBlocks[allBlocks.length - 1] as HTMLDivElement;
          if (lastBlock && lastBlock.children[2]) {
            (lastBlock.children[2] as HTMLDivElement).style.display = 'none';
          }
          blockRef.current.style.display = 'none';
        }
      }
    };

    const timeout = setTimeout(() => {
      timerRef.current = setInterval(() => {
        Next();
      }, 300);
    }, 12000);

    return () => {
      clearTimeout(timeout);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [started]);

  const loveContainerStyle = isMobile ? {
    transform: `scale(${scale})`,
    margin: `${-260 * scale}px 0 0 ${-220 * scale}px`,
  } : {
    margin: '-260px 0 0 -220px',
  };

  return (
    <div ref={containerRef} className="heartwall-container">
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Mitr:wght@300;400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* Audio */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/MP3/1.mp3" type="audio/mpeg" />
      </audio>

      {/* Intro Overlay - ก่อนเริ่ม */}
      {!started && (
        <div className="intro-overlay" onClick={handleStart}>
          <div className="intro-content">
            <div className="gift-icon">🎁</div>
            <h1 className="intro-title">💖 มีของขวัญให้เธอ 💖</h1>
            <p className="intro-subtitle">กดที่หน้าจอเพื่อเปิดดูนะ</p>
            <button className="start-btn">✨ เปิดของขวัญ ✨</button>
          </div>
        </div>
      )}

      {/* Main Content - แสดงตอนเริ่มแล้ว */}
      {started && (
        <>
          <div className={`biubiu-container ${isMobile ? 'mobile' : ''}`} style={isMobile ? { transform: `scale(${Math.max(0.5, scale)})` } : {}}>
            <img src={biubiuGif} alt="animation" draggable={false} />
          </div>

          <div className={`love-container ${isMobile ? 'mobile' : ''}`} ref={loveRef} style={loveContainerStyle}>
            <div className="block" ref={blockRef}>
              <div className="heart-piece"></div>
              <div className="heart-piece"></div>
              <div className="heart-piece"></div>
              <div className="heart-piece"></div>
            </div>
          </div>

          <div className="footer">
            <div className="border">
              <div className="border-top"></div>
              <div className="border-bottom"></div>
            </div>
          </div>
        </>
      )}

      {/* Save Button */}
      {started && (
        <SaveButton
          pageId="heart-wall"
          containerRef={containerRef}
        />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Mitr:wght@300;400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          border: 0;
          box-sizing: border-box;
        }

        .heartwall-container {
          width: 100vw;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          overflow: hidden;
          background: linear-gradient(135deg, #ffeef8 0%, #ffe0f0 50%, #ffd0e8 100%);
          font-family: 'Quicksand', 'Mitr', sans-serif;
        }

        /* Intro Overlay - Romantic Theme */
        .intro-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          cursor: pointer;
          animation: fadeIn 0.8s ease;
          overflow: hidden;
        }

        /* Floating hearts background */
        .intro-overlay::before,
        .intro-overlay::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 182, 193, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 192, 203, 0.3) 0%, transparent 40%);
          animation: floatBg 15s ease-in-out infinite;
        }

        .intro-overlay::after {
          animation-delay: -7s;
          background-image: 
            radial-gradient(circle at 60% 60%, rgba(255, 105, 180, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 10% 30%, rgba(255, 240, 245, 0.4) 0%, transparent 40%);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(1.1); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes floatBg {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(10px) rotate(-1deg); }
        }

        .intro-content {
          text-align: center;
          color: #fff;
          padding: 40px;
          position: relative;
          z-index: 1;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 20px 60px rgba(255, 105, 180, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
          max-width: 90vw;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .gift-icon {
          font-size: 70px;
          margin-bottom: 15px;
          display: inline-block;
          filter: drop-shadow(0 5px 15px rgba(255, 20, 147, 0.4));
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.1); }
          28% { transform: scale(1); }
          42% { transform: scale(1.1); }
          70% { transform: scale(1); }
        }

        .intro-title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 12px;
          font-family: 'Mitr', sans-serif;
          color: #fff;
          text-shadow: 
            0 2px 10px rgba(255, 20, 147, 0.3),
            0 4px 20px rgba(255, 105, 180, 0.2);
          letter-spacing: 1px;
        }

        .intro-subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 35px;
          font-weight: 400;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .start-btn {
          background: linear-gradient(135deg, #ff6b9d 0%, #ff1493 100%);
          color: white;
          border: none;
          padding: 16px 45px;
          font-size: 18px;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 
            0 8px 25px rgba(255, 20, 147, 0.4),
            0 0 0 4px rgba(255, 255, 255, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Mitr', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .start-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s;
        }

        .start-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 
            0 12px 35px rgba(255, 20, 147, 0.5),
            0 0 0 6px rgba(255, 255, 255, 0.3);
        }

        .start-btn:hover::before {
          left: 100%;
        }

        .start-btn:active {
          transform: translateY(-1px) scale(0.98);
        }

        @keyframes border {
          0% { width: 0; }
          5% { width: 5%; }
          10% { width: 10%; }
          15% { width: 15%; }
          20% { width: 20%; }
          25% { width: 25%; }
          30% { width: 30%; }
          35% { width: 35%; }
          40% { width: 40%; }
          45% { width: 45%; }
          50% { width: 50%; }
          55% { width: 55%; }
          60% { width: 60%; }
          65% { width: 65%; }
          70% { width: 70%; }
          75% { width: 75%; }
          80% { width: 80%; }
          85% { width: 85%; }
          90% { width: 90%; }
          95% { width: 95%; }
          100% { width: 100%; }
        }

        .biubiu-container {
          width: 300px;
          height: 300px;
          left: 0;
          bottom: 110px;
          position: absolute;
          z-index: 98;
        }

        .biubiu-container.mobile {
          width: min(300px, 35vw);
          height: min(300px, 35vw);
          bottom: min(110px, 15vh);
          transform-origin: bottom left;
        }

        .biubiu-container img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          user-select: none;
          -webkit-user-drag: none;
        }

        .love-container {
          width: 520px;
          height: 440px;
          left: 50%;
          top: 50%;
          position: absolute;
          margin: -260px 0 0 -220px;
        }

        .love-container.mobile {
          transform-origin: center center;
          transition: transform 0.3s ease, margin 0.3s ease;
        }

        .block {
          right: 0;
          position: absolute;
          visibility: hidden;
        }

        .heart-piece {
          width: 40px;
          height: 40px;
          position: absolute;
          background-image: url('${heartPng}');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }

        .footer {
          position: fixed;
          bottom: 30px;
          left: 0;
          right: 0;
          z-index: 99;
          padding: 0 20px;
        }

        .border {
          position: relative;
          overflow: hidden;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .border-top {
          display: inline-block;
          height: 3px;
          vertical-align: bottom;
          border-top: 3px solid #ff6b9d;
          transform-origin: left center;
          animation: border 12s linear;
          animation-fill-mode: both;
        }

        .border-bottom {
          display: inline-block;
          height: 3px;
          vertical-align: bottom;
          float: right;
          border-top: 3px solid #ff1744;
          transform-origin: right center;
          animation: border 7s linear 12s;
          animation-fill-mode: both;
        }

        /* Responsive intro */
        @media (max-width: 600px) {
          .intro-content {
            padding: 30px 25px;
            border-radius: 25px;
          }
          .intro-title {
            font-size: 26px;
          }
          .intro-subtitle {
            font-size: 14px;
            margin-bottom: 25px;
          }
          .gift-icon {
            font-size: 55px;
          }
          .start-btn {
            padding: 14px 35px;
            font-size: 16px;
          }
        }

        /* Landscape mode on mobile */
        @media (max-height: 500px) and (orientation: landscape) {
          .biubiu-container.mobile {
            width: 150px;
            height: 150px;
            bottom: 20px;
          }
          
          .love-container.mobile {
            transform: scale(0.65) !important;
            margin: -170px 0 0 -145px !important;
          }
          
          .footer {
            bottom: 15px;
          }
          
          .intro-content {
            padding: 25px 20px;
          }
          .intro-title {
            font-size: 22px;
          }
          .intro-subtitle {
            font-size: 13px;
            margin-bottom: 20px;
          }
          .gift-icon {
            font-size: 45px;
            margin-bottom: 10px;
          }
          .start-btn {
            padding: 12px 30px;
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default HeartWallPage;
