import React, { useState } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { ART_PIECES } from '../data/portfolioData';
import { X, Palette, Eye, Code2, Terminal, Shield } from 'lucide-react';

export const ArtModal: React.FC = () => {
  const { closeModal } = usePortfolioStore();
  const [activeArt, setActiveArt] = useState(ART_PIECES[0]);

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/60 backdrop-blur-md animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] bg-paper border-3 sm:border-4 border-ink shadow-comic-xl rounded-2xl sm:rounded-3xl flex flex-col overflow-hidden cursor-default"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b-2 sm:border-b-3 border-ink bg-white">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-mint border-2 border-ink flex items-center justify-center text-ink font-mono font-black shadow-comic-sm text-sm sm:text-base flex-shrink-0">
              02
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-ink">
                Architecture Lab
              </h2>
              <p className="text-[11px] sm:text-xs text-ink-soft font-mono">
                Socket schematics, audio DSP diagrams & creeds
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border-2 border-ink bg-paper hover:bg-hoodie hover:text-white transition-colors shadow-comic-sm cursor-pointer flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
          {/* List of Artworks (Left column) */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-ink-faint tracking-wider mb-2">
              Studio Wall Frames & Schematics
            </h3>
            {ART_PIECES.map((piece) => {
              const isSelected = activeArt.id === piece.id;
              return (
                <button
                  key={piece.id}
                  onClick={() => setActiveArt(piece)}
                  className={`w-full text-left p-4 rounded-2xl border-3 border-ink transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cheese shadow-comic-lg translate-x-1'
                      : 'bg-white hover:bg-paper-dark shadow-comic-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-ink">{piece.title}</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white border border-ink">
                      {piece.year}
                    </span>
                  </div>
                  <div className="text-xs text-ink-soft mt-1">{piece.medium}</div>
                </button>
              );
            })}
          </div>

          {/* Active Art Detail & Canvas Preview (Right column) */}
          <div className="md:col-span-7 bg-white border-3 border-ink rounded-3xl p-6 shadow-comic flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-mono font-bold text-sky-600 uppercase">
                  {activeArt.medium}
                </span>
              </div>

              <h3 className="text-2xl font-black text-ink mb-2">
                {activeArt.title}
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed mb-6">
                {activeArt.description}
              </p>

              {/* Visual Comic Frame Preview */}
              <div
                className="w-full h-48 rounded-2xl border-4 border-ink p-6 flex flex-col items-center justify-center text-center shadow-comic-inner relative overflow-hidden bg-slate-950 text-white"
              >
                <div className="absolute top-2 left-2 text-[10px] font-mono font-bold px-2 py-0.5 bg-ink border border-slate-700 text-sky-400 rounded">
                  STUDIO FRAME
                </div>

                {activeArt.quote ? (
                  <blockquote className="font-mono font-bold text-sm sm:text-base text-slate-100 max-w-sm leading-snug">
                    "{activeArt.quote}"
                  </blockquote>
                ) : (
                  <div className="font-mono text-xl font-black text-sky-400">
                    &lt;RTMP_SOCKET_FRAME /&gt;
                  </div>
                )}
              </div>

              {activeArt.codeHighlights && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-ink mb-2">
                    <Code2 className="w-4 h-4 text-sky-600" />
                    <span>Low-Level Execution Pipeline</span>
                  </div>
                  <div className="bg-ink text-sky-300 font-mono text-xs p-4 rounded-xl border-2 border-ink space-y-1">
                    {activeArt.codeHighlights.map((line, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-slate-600 select-none">&gt;</span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t-2 border-ink/10 flex items-center justify-between text-xs font-mono text-ink-faint">
              <span>Interactive 3D Studio</span>
              <span>Benhin Architecture</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
