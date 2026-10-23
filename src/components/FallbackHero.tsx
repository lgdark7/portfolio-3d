import React from 'react';
import { SPATIAL_STATIONS, BENHIN_PROFILE } from '../data/portfolioData';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const FallbackHero: React.FC = () => {
  const { openModal } = usePortfolioStore();

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 text-ink select-none">
      <div className="max-w-3xl w-full bg-white border-4 border-ink shadow-comic-lg rounded-2xl p-8 text-center">
        <div className="inline-block px-4 py-1 bg-hoodie text-white font-mono font-bold text-sm rounded-full border-2 border-ink mb-4 shadow-comic-sm">
          STUDIO COMMAND • BENHIN
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-2 text-ink">
          {BENHIN_PROFILE.name} <span className="text-sky-600 font-mono text-xl sm:text-2xl">{BENHIN_PROFILE.handle}</span>
        </h1>
        <p className="text-sm sm:text-base text-ink-soft mb-8 max-w-xl mx-auto leading-relaxed font-mono">
          {BENHIN_PROFILE.title}. 3D Studio is running in lightweight 2D mode on this device. Explore the studio stations directly below:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
          {SPATIAL_STATIONS.map((station) => (
            <button
              key={station.id}
              onClick={() => openModal(station.id)}
              className="p-4 rounded-xl border-3 border-ink shadow-comic bg-paper hover:bg-cheese transition-all hover:-translate-y-1 text-left cursor-pointer active:scale-95"
              style={{ borderLeftColor: station.color, borderLeftWidth: '8px' }}
            >
              <div className="font-mono text-xs font-bold text-ink-faint mb-1">
                ZONE {station.badge}
              </div>
              <div className="font-bold text-base text-ink">{station.label}</div>
              <div className="text-xs text-ink-soft mt-1 leading-snug">{station.tagline}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
