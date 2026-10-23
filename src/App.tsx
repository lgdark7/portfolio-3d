import React, { useEffect } from 'react';
import { CanvasContainer } from './components/CanvasContainer';
import { SpatialHUD } from './components/SpatialHUD';
import { WebProjectsModal } from './components/WebProjectsModal';
import { ArtModal } from './components/ArtModal';
import { AboutModal } from './components/AboutModal';
import { ThoughtsModal } from './components/ThoughtsModal';
import { ArchiveContactModal } from './components/ArchiveContactModal';
import { usePortfolioStore } from './store/usePortfolioStore';

export const App: React.FC = () => {
  const {
    activeModal,
    closeModal,
    setScrollProgress,
    scrollProgress,
    toggleLightingMode,
    toggleMute
  } = usePortfolioStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal) {
        closeModal();
        return;
      }

      // If typing inside an input/textarea, don't trigger global shortcuts
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        setScrollProgress(Math.min(5, Math.floor(scrollProgress + 1)));
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setScrollProgress(Math.max(0, Math.ceil(scrollProgress - 1)));
      } else if (['0', '1', '2', '3', '4', '5'].includes(e.key)) {
        setScrollProgress(parseInt(e.key, 10));
      } else if (e.key.toLowerCase() === 'l') {
        toggleLightingMode();
      } else if (e.key.toLowerCase() === 'm') {
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, closeModal, scrollProgress, setScrollProgress, toggleLightingMode, toggleMute]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-paper select-none">
      {/* 1. Real 3D Studio Canvas */}
      <CanvasContainer />

      {/* 2. 3D Spatial Navigation HUD (No static top buttons!) */}
      <SpatialHUD />

      {/* 3. Interactive Modals & Drawers */}
      {activeModal === 'web' && <WebProjectsModal />}
      {activeModal === 'art' && <ArtModal />}
      {activeModal === 'about' && <AboutModal />}
      {activeModal === 'thoughts' && <ThoughtsModal />}
      {activeModal === 'archive' && <ArchiveContactModal />}
    </main>
  );
};

export default App;
