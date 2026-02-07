import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  HomePage,
  HowDarePage,
  PresentsPage,
  SongPage,
  HeartWallPage,
  LoveAnimation
} from './components';

type Page = 'home' | 'how-dare' | 'presents' | 'song' | 'pictures' | 'letter';

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
      {currentPage === 'pictures' && <LoveAnimation key="pictures" />}
      {currentPage === 'letter' && <HeartWallPage key="letter" />}
    </AnimatePresence>
  );
}

export default App;
