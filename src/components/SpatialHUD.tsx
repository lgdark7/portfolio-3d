import React, { useState } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { SPATIAL_STATIONS, BENHIN_PROFILE } from '../data/portfolioData';
import {
  Sun,
  Sunset,
  Moon,
  Volume2,
  VolumeX,
  Compass,
  MousePointer2,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  X,
  Sparkles
} from 'lucide-react';

export const SpatialHUD: React.FC = () => {
  const {
    currentStationIndex,
    scrollProgress,
    lightingMode,
    hoveredObject,
    isMuted,
    hasInteracted,
    setScrollProgress,
    toggleLightingMode,
    toggleMute,
    openModal
  } = usePortfolioStore();

  const [showStationPicker, setShowStationPicker] = useState(false);

  const activeStation = SPATIAL_STATIONS[currentStationIndex] || SPATIAL_STATIONS[0];

  const handleNextStation = () => {
    setScrollProgress(Math.min(5, Math.floor(scrollProgress + 1)));
  };

  const handlePrevStation = () => {
    setScrollProgress(Math.max(0, Math.ceil(scrollProgress - 1)));
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between p-3 sm:p-6">
        {/* ========================================================
            TOP HEADER: Responsive for Desktop & Mobile
           ======================================================== */}
        <header className="flex items-center justify-between gap-2">
          {/* Brand & Hub Link */}
          <div
            onClick={() => openModal('hub')}
            className="pointer-events-auto cursor-pointer bg-white/95 backdrop-blur-md border-2 sm:border-3 border-ink rounded-2xl px-3.5 py-2 sm:px-5 sm:py-3 shadow-comic hover:-translate-y-0.5 active:translate-y-0.5 transition-transform"
            title="Click to open Command Center"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-sky-500 inline-block animate-pulse border border-ink" />
              <h1 className="font-extrabold text-sm sm:text-lg tracking-tight text-ink">
                {BENHIN_PROFILE.name} <span className="text-sky-600 font-mono text-xs">{BENHIN_PROFILE.handle}</span>
              </h1>
            </div>
            <p className="hidden sm:block text-xs text-ink-soft font-mono mt-0.5">
              {BENHIN_PROFILE.shortTitle} • Scroll to Travel
            </p>
          </div>

          {/* Desktop Hover Indicator / Quick Links */}
          <div className="hidden sm:flex items-center gap-2">
            {hoveredObject ? (
              <div className="pointer-events-auto flex items-center gap-2 bg-cheese border-3 border-ink px-4 py-2 rounded-xl shadow-comic animate-bounce">
                <MousePointer2 className="w-4 h-4 text-ink" />
                <span className="font-bold text-xs font-mono text-ink">
                  {hoveredObject}
                </span>
              </div>
            ) : (
              <div className="pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-md border-3 border-ink px-3 py-1.5 rounded-xl shadow-comic">
                <a
                  href={BENHIN_PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-ink hover:text-sky-600 flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-ink-faint">•</span>
                <a
                  href={BENHIN_PROFILE.discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-ink hover:text-[#5865f2] flex items-center gap-1"
                >
                  <span>Discord</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Mobile Quick Utility Controls (Top Right) */}
          <div className="pointer-events-auto flex sm:hidden items-center gap-1.5 bg-white/95 backdrop-blur-md border-2 border-ink p-1.5 rounded-2xl shadow-comic">
            <button
              onClick={toggleLightingMode}
              className="p-2 rounded-xl border border-ink bg-paper active:bg-cheese transition-colors shadow-comic-sm cursor-pointer"
              title={`Atmosphere: ${lightingMode}`}
              aria-label="Toggle Atmosphere"
            >
              {lightingMode === 'day' && <Sun className="w-4 h-4 text-cheese-dark" />}
              {lightingMode === 'sunset' && <Sunset className="w-4 h-4 text-hoodie" />}
              {lightingMode === 'night' && <Moon className="w-4 h-4 text-retro-blue" />}
            </button>

            <button
              onClick={toggleMute}
              className={`p-2 rounded-xl border border-ink transition-colors shadow-comic-sm cursor-pointer ${
                isMuted ? 'bg-red-100 text-red-600' : 'bg-paper text-ink active:bg-paper-dark'
              }`}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              aria-label="Toggle Mute"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setShowStationPicker(true)}
              className="p-2 rounded-xl border border-ink bg-sky-500 text-white active:bg-sky-600 transition-colors shadow-comic-sm cursor-pointer"
              title="Stations Menu"
              aria-label="Open Stations Menu"
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* ========================================================
            MIDDLE: Mobile Gesture Hint (Fades after interaction)
           ======================================================== */}
        {!hasInteracted && (
          <div className="sm:hidden pointer-events-none flex justify-center my-auto animate-bounce">
            <div className="bg-ink/85 backdrop-blur-md text-white font-mono text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-comic border border-white/20 flex items-center gap-1.5">
              <span>👆</span>
              <span>Swipe up/down to fly in 3D</span>
            </div>
          </div>
        )}

        {/* ========================================================
            FOOTER: DESKTOP LAYOUT (sm: and up)
           ======================================================== */}
        <footer className="hidden sm:flex flex-row items-center justify-between gap-4">
          {/* Left: Atmospheric Lighting & Sound Controls */}
          <div className="pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-md border-3 border-ink p-2 rounded-2xl shadow-comic">
            <button
              onClick={toggleLightingMode}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-ink bg-paper hover:bg-cheese transition-colors shadow-comic-sm font-mono text-xs font-bold text-ink cursor-pointer"
              title="Toggle Atmosphere: Day / Sunset / Night"
            >
              {lightingMode === 'day' && <Sun className="w-4 h-4 text-cheese-dark" />}
              {lightingMode === 'sunset' && <Sunset className="w-4 h-4 text-hoodie" />}
              {lightingMode === 'night' && <Moon className="w-4 h-4 text-retro-blue" />}
              <span className="capitalize">{lightingMode}</span>
            </button>

            <button
              onClick={toggleMute}
              className={`p-2 rounded-xl border-2 border-ink transition-colors shadow-comic-sm cursor-pointer ${
                isMuted ? 'bg-red-100 text-red-600' : 'bg-paper text-ink hover:bg-paper-dark'
              }`}
              title={isMuted ? 'Unmute Procedural Audio' : 'Mute Procedural Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Center: 3D Spatial Rail Scrubber */}
          <div className="pointer-events-auto bg-white/95 backdrop-blur-md border-3 border-ink px-6 py-3 rounded-2xl shadow-comic-lg flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevStation}
                disabled={scrollProgress <= 0.05}
                className="p-1 rounded-lg border-2 border-ink bg-paper hover:bg-cheese disabled:opacity-30 disabled:hover:bg-paper transition-colors cursor-pointer"
                title="Previous 3D Zone"
              >
                <ArrowUp className="w-3.5 h-3.5 text-ink" />
              </button>

              <button
                onClick={() => openModal(activeStation.id)}
                className="flex items-center gap-2 text-left group cursor-pointer"
                title="Click to open full station details"
              >
                <div
                  className="w-3 h-3 rounded-full border border-ink"
                  style={{ backgroundColor: activeStation.color }}
                />
                <span className="font-mono text-xs font-bold text-ink-faint">
                  [{activeStation.badge}]
                </span>
                <span className="font-extrabold text-base text-ink group-hover:text-sky-600 transition-colors">
                  {activeStation.label}
                </span>
                <span className="hidden md:inline text-xs text-ink-soft">
                  — {activeStation.hotspotLabel}
                </span>
              </button>

              <button
                onClick={handleNextStation}
                disabled={scrollProgress >= 4.95}
                className="p-1 rounded-lg border-2 border-ink bg-paper hover:bg-cheese disabled:opacity-30 disabled:hover:bg-paper transition-colors cursor-pointer"
                title="Next 3D Zone"
              >
                <ArrowDown className="w-3.5 h-3.5 text-ink" />
              </button>
            </div>

            {/* Interactive Stepper Track */}
            <div className="flex items-center gap-2">
              {SPATIAL_STATIONS.map((station) => {
                const isActive = Math.round(scrollProgress) === station.index;
                return (
                  <button
                    key={station.id}
                    onClick={() => setScrollProgress(station.index)}
                    className={`relative flex items-center justify-center transition-all cursor-pointer ${
                      isActive
                        ? 'w-8 h-4 rounded-full border-2 border-ink shadow-comic-sm'
                        : 'w-3 h-3 rounded-full border-2 border-ink bg-paper-dark hover:scale-125'
                    }`}
                    style={{
                      backgroundColor: isActive ? station.color : undefined
                    }}
                    title={`Fly to ${station.label}`}
                  >
                    {isActive && (
                      <span className="text-[9px] font-mono font-bold text-white leading-none">
                        {station.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="text-[10px] text-ink-faint font-mono flex items-center gap-1.5">
              <Compass className="w-3 h-3 text-sky-500" />
              <span>Mouse wheel / drag to fly in 3D</span>
            </div>
          </div>

          {/* Right: Quick Station Drawer Trigger */}
          <div className="pointer-events-auto bg-white/90 backdrop-blur-md border-3 border-ink p-2 rounded-2xl shadow-comic">
            <button
              onClick={() => openModal(activeStation.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-ink bg-sky-500 text-white hover:bg-sky-600 font-extrabold text-xs font-mono shadow-comic-sm transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            >
              <span>EXPLORE {activeStation.badge}</span>
              <span className="text-cheese font-black">↗</span>
            </button>
          </div>
        </footer>

        {/* ========================================================
            FOOTER: MOBILE COMMAND DOCK (Dedicated for Smartphones)
           ======================================================== */}
        <footer className="flex sm:hidden flex-col items-center gap-2 pb-safe">
          <div className="pointer-events-auto w-full max-w-sm bg-white/95 backdrop-blur-md border-2 border-ink rounded-2xl p-2 shadow-comic-lg flex items-center justify-between gap-2">
            {/* Tactile Prev Button */}
            <button
              onClick={handlePrevStation}
              disabled={scrollProgress <= 0.05}
              className="w-11 h-11 flex-shrink-0 rounded-xl border-2 border-ink bg-paper active:bg-cheese disabled:opacity-25 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-comic-sm"
              title="Previous Station"
              aria-label="Previous Station"
            >
              <ChevronLeft className="w-6 h-6 text-ink" />
            </button>

            {/* Center Station Banner & Action (Tap to Open Modal) */}
            <button
              onClick={() => openModal(activeStation.id)}
              className="flex-1 flex flex-col items-center justify-center py-1 px-2 rounded-xl border border-transparent active:border-ink/20 active:bg-paper transition-all cursor-pointer overflow-hidden"
              title="Tap to open station details"
            >
              <div className="flex items-center gap-1.5 max-w-full">
                <span
                  className="w-2.5 h-2.5 rounded-full border border-ink flex-shrink-0"
                  style={{ backgroundColor: activeStation.color }}
                />
                <span className="font-extrabold text-xs text-ink truncate font-mono">
                  [{activeStation.badge}] {activeStation.label}
                </span>
              </div>

              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5 mt-1">
                {SPATIAL_STATIONS.map((station) => {
                  const isActive = Math.round(scrollProgress) === station.index;
                  return (
                    <span
                      key={station.id}
                      className={`h-1.5 rounded-full transition-all ${
                        isActive
                          ? 'w-4 bg-sky-500 border border-ink'
                          : 'w-1.5 bg-paper-dark border border-ink/40'
                      }`}
                    />
                  );
                })}
              </div>

              <span className="text-[10px] text-sky-600 font-mono font-bold mt-0.5">
                TAP TO EXPLORE ↗
              </span>
            </button>

            {/* Tactile Next Button */}
            <button
              onClick={handleNextStation}
              disabled={scrollProgress >= 4.95}
              className="w-11 h-11 flex-shrink-0 rounded-xl border-2 border-ink bg-paper active:bg-cheese disabled:opacity-25 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-comic-sm"
              title="Next Station"
              aria-label="Next Station"
            >
              <ChevronRight className="w-6 h-6 text-ink" />
            </button>
          </div>
        </footer>
      </div>

      {/* ========================================================
          MOBILE STATIONS QUICK DRAWER / PICKER
         ======================================================== */}
      {showStationPicker && (
        <div
          onClick={() => setShowStationPicker(false)}
          className="fixed inset-0 z-50 flex items-end sm:hidden bg-ink/60 backdrop-blur-sm p-3 pb-safe animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-paper border-3 border-ink rounded-3xl p-5 shadow-comic-xl flex flex-col gap-3 animate-slideUp cursor-default"
          >
            <div className="flex items-center justify-between border-b-2 border-ink pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-sky-500" />
                <h3 className="font-black text-base text-ink">Jump to 3D Station</h3>
              </div>
              <button
                onClick={() => setShowStationPicker(false)}
                className="p-1.5 rounded-xl border border-ink bg-white active:bg-hoodie active:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {SPATIAL_STATIONS.map((station) => {
                const isActive = Math.round(scrollProgress) === station.index;
                return (
                  <button
                    key={station.id}
                    onClick={() => {
                      setScrollProgress(station.index);
                      setShowStationPicker(false);
                    }}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border-2 border-ink text-left transition-all active:scale-95 cursor-pointer ${
                      isActive
                        ? 'bg-sky-500 text-white shadow-comic-sm font-bold'
                        : 'bg-white text-ink active:bg-cheese'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-ink flex-shrink-0"
                      style={{ backgroundColor: station.color }}
                    />
                    <div className="truncate">
                      <div className="text-[10px] font-mono opacity-80">
                        {station.badge}
                      </div>
                      <div className="text-xs font-black truncate">
                        {station.label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
