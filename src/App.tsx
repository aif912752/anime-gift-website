import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  HomePage,
  HowDarePage,
  PresentsPage,
  SongPage,
  HeartWallPage,
  LoveMessagePage,
  LoveAnimation,
  SavedItemsButton,
  PhotoBoothPage,
} from "./components";

type Page =
  | "home"
  | "how-dare"
  | "presents"
  | "song"
  | "pictures"
  | "letter"
  | "love-message"
  | "photo-booth";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isPlaying, setIsPlaying] = useState(false);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <AnimatePresence mode="wait">
      {currentPage === "home" && (
        <HomePage key="home" navigateTo={navigateTo} />
      )}
      {currentPage === "how-dare" && (
        <HowDarePage key="how-dare" navigateTo={navigateTo} />
      )}
      {currentPage === "presents" && (
        <PresentsPage key="presents" navigateTo={(page) => {
          if (page === 'photo-booth') {
            navigateTo('photo-booth');
          } else {
            navigateTo(page as Exclude<Page, 'photo-booth'>);
          }
        }} />
      )}
      {currentPage === "song" && (
        <SongPage
          key="song"
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          navigateTo={navigateTo}
        />
      )}
      {currentPage === "pictures" && (
        <LoveAnimation key="pictures" navigateTo={navigateTo} />
      )}
      {currentPage === "letter" && (
        <HeartWallPage key="letter" navigateTo={navigateTo} />
      )}
      {currentPage === "love-message" && (
        <LoveMessagePage key="love-message" navigateTo={navigateTo} />
      )}
      {currentPage === "photo-booth" && (
        <PhotoBoothPage key="photo-booth" navigateTo={navigateTo} />
      )}
      
      {/* Saved Items Button - Available on all pages except photo-booth */}
      {currentPage !== "photo-booth" && <SavedItemsButton />}
    </AnimatePresence>
  );
}

export default App;
