import React from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { SPATIAL_STATIONS } from '../data/portfolioData';
import {
  Sun,
  Sunset,
  Moon,
  Volume2,
  VolumeX,
  Compass,
  MousePointer2,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export const SpatialHUD: React.FC = () => {
  const {
    currentStationIndex,
    scrollProgress,
    lightingMode,
    hoveredObject,
    isMuted,
    setScrollProgress,
    toggleLightingMode,
    toggleMute,
    openModal
  } = usePortfolioStore();

  const activeStation = SPATIAL_STATIONS[currentStationIndex] || SPATIAL_STATIONS[0];

  const handleNextStation = () => {
    setScrollProgress(Math.min(5, Math.floor(scrollProgress + 1)));
  };

  const handlePrevStation = () => {
    setScrollProgress(Math.max(0, Math.ceil(scrollProgress - 1)));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-6">
      {/* TOP HEADER: Clean Title & Hover Callout ONLY (Zero static nav buttons!) */}
      <header className="flex items-start justify-between">
        <div className="pointer-events-auto bg-white/90 backdrop-blur-md border-3 border-ink rounded-2xl px-5 py-3 shadow-comic">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-hoodie inline-block animate-pulse border border-ink" />
            <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-ink">
              Lynn Fisher <span className="text-hoodie">2018</span>
            </h1>
          </div>
          <p className="text-xs text-ink-soft font-mono mt-0.5">
            Spatial Studio • Scroll to Travel
          </p>
        </div>

        {/* Dynamic 3D Object Hover Indicator (shows what you are pointing at in 3D) */}
        {hoveredObject && (
          <div className="pointer-events-auto hidden sm:flex items-center gap-2 bg-cheese border-3 border-ink px-4 py-2 rounded-xl shadow-comic animate-bounce">
            <MousePointer2 className="w-4 h-4 text-ink" />
            <span className="font-bold text-xs font-mono text-ink">
              {hoveredObject}
            </span>
          </div>
        )}
      </header>

      {/* FLOATING ACTION ZONE: Bottom Center & Bottom Flanks */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Atmospheric Lighting & Sound Controls */}
        <div className="pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-md border-3 border-ink p-2 rounded-2xl shadow-comic">
          <button
            onClick={toggleLightingMode}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-ink bg-paper hover:bg-cheese transition-colors shadow-comic-sm font-mono text-xs font-bold text-ink"
            title="Toggle Atmosphere: Day / Sunset / Night"
          >
            {lightingMode === 'day' && <Sun className="w-4 h-4 text-cheese-dark" />}
            {lightingMode === 'sunset' && <Sunset className="w-4 h-4 text-hoodie" />}
            {lightingMode === 'night' && <Moon className="w-4 h-4 text-retro-blue" />}
            <span className="capitalize">{lightingMode}</span>
          </button>

          <button
            onClick={toggleMute}
            className={`p-2 rounded-xl border-2 border-ink transition-colors shadow-comic-sm ${
              isMuted ? 'bg-red-100 text-red-600' : 'bg-paper text-ink hover:bg-paper-dark'
            }`}
            title={isMuted ? 'Unmute Procedural Audio' : 'Mute Procedural Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Center: 3D Spatial Rail Scrubber */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md border-3 border-ink px-4 sm:px-6 py-3 rounded-2xl shadow-comic-lg flex flex-col items-center gap-2">
          {/* Station Banner */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevStation}
              disabled={scrollProgress <= 0.05}
              className="p-1 rounded-lg border-2 border-ink bg-paper hover:bg-cheese disabled:opacity-30 disabled:hover:bg-paper transition-colors"
              title="Previous 3D Zone"
            >
              <ArrowUp className="w-3.5 h-3.5 text-ink" />
            </button>

            <button
              onClick={() => openModal(activeStation.id)}
              className="flex items-center gap-2 text-left group"
              title="Click to open full station details"
            >
              <div
                className="w-3 h-3 rounded-full border border-ink"
                style={{ backgroundColor: activeStation.color }}
              />
              <span className="font-mono text-xs font-bold text-ink-faint">
                [{activeStation.badge}]
              </span>
              <span className="font-extrabold text-sm sm:text-base text-ink group-hover:text-hoodie transition-colors">
                {activeStation.label}
              </span>
              <span className="hidden md:inline text-xs text-ink-soft">
                — {activeStation.hotspotLabel}
              </span>
            </button>

            <button
              onClick={handleNextStation}
              disabled={scrollProgress >= 4.95}
              className="p-1 rounded-lg border-2 border-ink bg-paper hover:bg-cheese disabled:opacity-30 disabled:hover:bg-paper transition-colors"
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
                  className={`relative flex items-center justify-center transition-all ${
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
            <Compass className="w-3 h-3 text-hoodie" />
            <span>Mouse wheel / drag to fly in 3D</span>
          </div>
        </div>

        {/* Right: Quick Station Drawer Trigger */}
        <div className="pointer-events-auto bg-white/90 backdrop-blur-md border-3 border-ink p-2 rounded-2xl shadow-comic">
          <button
            onClick={() => openModal(activeStation.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-ink bg-hoodie text-white hover:bg-hoodie-dark font-extrabold text-xs font-mono shadow-comic-sm transition-transform active:translate-x-0.5 active:translate-y-0.5"
          >
            <span>EXPLORE {activeStation.badge}</span>
            <span className="text-cheese font-black">↗</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
