import React from 'react';
import { SPATIAL_STATIONS } from '../data/portfolioData';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const FallbackHero: React.FC = () => {
  const { openModal } = usePortfolioStore();

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 text-ink">
      <div className="max-w-3xl w-full bg-white border-4 border-ink shadow-comic-lg rounded-2xl p-8 text-center">
        <div className="inline-block px-4 py-1 bg-hoodie text-white font-mono font-bold text-sm rounded-full border-2 border-ink mb-4">
          2018 STUDIO ARCHIVE
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Lynn Fisher 3D Studio
        </h1>
        <p className="text-lg text-ink-soft mb-8 max-w-xl mx-auto leading-relaxed">
          Welcome to the illustrated studio. WebGL is running in lightweight 2D mode on this device. Explore the studio stations directly below:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
          {SPATIAL_STATIONS.map((station) => (
            <button
              key={station.id}
              onClick={() => openModal(station.id)}
              className="p-4 rounded-xl border-3 border-ink shadow-comic bg-paper-light hover:bg-paper-dark transition-transform hover:-translate-y-1 text-left"
              style={{ borderLeftColor: station.color, borderLeftWidth: '8px' }}
            >
              <div className="font-mono text-xs font-bold text-ink-faint mb-1">
                ZONE {station.badge}
              </div>
              <div className="font-bold text-lg text-ink">{station.label}</div>
              <div className="text-xs text-ink-soft mt-1">{station.tagline}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
