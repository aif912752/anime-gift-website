import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  HomePage,
  HowDarePage,
  PresentsPage,
  SongPage,
  PicturesPage,
  LetterPage
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
      {currentPage === 'pictures' && <PicturesPage key="pictures" navigateTo={navigateTo} />}
      {currentPage === 'letter' && <LetterPage key="letter" navigateTo={navigateTo} />}
    </AnimatePresence>
  );
}

export default App;
