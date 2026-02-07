import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  HomePage,
  HowDarePage,
  PresentsPage,
  SongPage,
  HeartWallPage,
  LoveMessagePage,
  LoveAnimation
} from './components';

type Page = 'home' | 'how-dare' | 'presents' | 'song' | 'pictures' | 'letter' | 'love-message';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isPlaying, setIsPlaying] = useState(false);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <AnimatePresence mode="wait">
      {currentPage === 'home' && <HomePage key="home" navigateTo={navigateTo} />}
      {currentPage === 'how-dare' && <HowDarePage key="how-dare" navigateTo={navigateTo} />}
      {currentPage === 'presents' && <PresentsPage key="presents" navigateTo={navigateTo} />}
      {currentPage === 'song' && <SongPage key="song" isPlaying={isPlaying} setIsPlaying={setIsPlaying} navigateTo={navigateTo} />}
      {currentPage === 'pictures' && <LoveAnimation key="pictures" navigateTo={navigateTo} />}
      {currentPage === 'letter' && <HeartWallPage key="letter" navigateTo={navigateTo} />}
      {currentPage === 'love-message' && <LoveMessagePage key="love-message" navigateTo={navigateTo} />}
    </AnimatePresence>
  );
}

export default App;
