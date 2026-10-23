import React from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { BENHIN_PROFILE, SPATIAL_STATIONS } from '../data/portfolioData';
import {
  X,
  Terminal,
  ExternalLink,
  Shield,
  Radio,
  Music,
  ArrowRight,
  Disc,
  Code2,
  Copy,
  Check
} from 'lucide-react';

export const HubOverviewModal: React.FC = () => {
  const { closeModal, setScrollProgress } = usePortfolioStore();
  const [copied, setCopied] = React.useState(false);

  const copyDiscord = () => {
    navigator.clipboard.writeText(BENHIN_PROFILE.discordUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const jumpToStation = (index: number) => {
    setScrollProgress(index);
    closeModal();
  };

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/60 backdrop-blur-md animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] bg-paper border-3 sm:border-4 border-ink shadow-comic-xl rounded-2xl sm:rounded-3xl flex flex-col overflow-hidden cursor-default"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b-2 sm:border-b-3 border-ink bg-white">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-sky-500 border-2 border-ink flex items-center justify-center text-white font-mono font-black shadow-comic-sm text-sm sm:text-base flex-shrink-0">
              00
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h2 className="text-lg sm:text-2xl font-black text-ink">
                  {BENHIN_PROFILE.name}
                </h2>
                <span className="text-[11px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-300">
                  {BENHIN_PROFILE.handle}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-ink-soft font-mono">
                {BENHIN_PROFILE.title}
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border-2 border-ink bg-paper hover:bg-hoodie hover:text-white transition-colors shadow-comic-sm cursor-pointer flex-shrink-0"
            title="Close Drawer (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Creed / Philosophy Banner */}
          <div className="bg-ink text-white p-5 rounded-2xl border-3 border-ink shadow-comic relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-bold uppercase mb-2">
                <Terminal className="w-4 h-4" />
                <span>Engineering Creed</span>
              </div>
              <p className="font-mono text-sm sm:text-base italic leading-relaxed text-slate-100">
                "{BENHIN_PROFILE.quote}"
              </p>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-6 translate-y-6">
              <Shield className="w-40 h-40 text-sky-400" />
            </div>
          </div>

          {/* Core Stats Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BENHIN_PROFILE.stats.map((s) => (
              <div
                key={s.label}
                className="bg-white border-3 border-ink rounded-2xl p-4 shadow-comic text-center"
              >
                <div className="text-lg sm:text-xl font-black text-ink mb-1">
                  {s.value}
                </div>
                <div className="text-[11px] font-mono font-bold text-ink-soft">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fairy Live Card */}
            <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-comic flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-red-600 font-mono font-bold text-xs">
                    <Radio className="w-4 h-4" />
                    <span>RTMP LIVE STREAMING ENGINE</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-100 border border-red-300 font-bold text-red-800">
                    &lt; 15MB APK
                  </span>
                </div>
                <h3 className="text-lg font-black text-ink mb-1">FAIRY LIVE</h3>
                <p className="text-xs text-ink-soft leading-relaxed mb-3">
                  Zero-bloat native Android live streaming engine. Pure-Kotlin RTMP socket engine, MediaProjection, hardware MediaCodec H.264/AAC, and studio broadcast DSP.
                </p>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t-2 border-ink/10">
                <a
                  href="https://github.com/lgdark7/FairyLive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border-2 border-ink bg-cheese hover:bg-cheese-dark text-ink font-mono font-bold text-xs shadow-comic-sm"
                >
                  <span>View Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Fairy Music Card */}
            <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-comic flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sky-600 font-mono font-bold text-xs">
                    <Music className="w-4 h-4" />
                    <span>AUDIO STREAMING ECOSYSTEM</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-100 border border-sky-300 font-bold text-sky-800">
                    120 FPS UI
                  </span>
                </div>
                <h3 className="text-lg font-black text-ink mb-1">FAIRY MUSIC</h3>
                <p className="text-xs text-ink-soft leading-relaxed mb-3">
                  Material Design Android music streaming app. Features synchronized "Play Together" host-client playback, Apple Canvas visuals, and multi-source synchronized lyrics.
                </p>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t-2 border-ink/10">
                <a
                  href="https://github.com/lgdark7/FAIRY-MUSIC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border-2 border-ink bg-sky-400 hover:bg-sky-500 text-white font-mono font-bold text-xs shadow-comic-sm"
                >
                  <span>View Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Spatial Station Quick Travel Links */}
          <div className="bg-paper-dark border-3 border-ink rounded-2xl p-5 shadow-comic">
            <h4 className="text-xs font-mono font-bold text-ink uppercase mb-3 flex items-center gap-1.5">
              <Disc className="w-4 h-4 text-hoodie" />
              <span>Jump To 3D Studio Stations</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {SPATIAL_STATIONS.map((station) => (
                <button
                  key={station.id}
                  onClick={() => jumpToStation(station.index)}
                  className="flex items-center justify-between p-3 rounded-xl border-2 border-ink bg-white hover:bg-cheese transition-all text-left shadow-comic-sm group"
                >
                  <div>
                    <div className="text-[10px] font-mono font-bold text-ink-faint">
                      STATION {station.badge}
                    </div>
                    <div className="text-xs font-extrabold text-ink group-hover:text-hoodie">
                      {station.label}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-ink-faint group-hover:translate-x-1 group-hover:text-ink transition-transform" />
                </button>
              ))}
            </div>
          </div>

          {/* Direct Community & Links */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border-3 border-ink rounded-2xl shadow-comic">
            <div className="flex items-center gap-2">
              <a
                href={BENHIN_PROFILE.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-ink bg-[#5865f2] text-white font-mono font-bold text-xs shadow-comic-sm hover:opacity-90"
              >
                <span>Discord Community</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={BENHIN_PROFILE.gunslolUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-ink bg-[#f43f5e] text-white font-mono font-bold text-xs shadow-comic-sm hover:opacity-90"
              >
                <span>guns.lol/lg_dark</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <button
              onClick={copyDiscord}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-ink bg-paper hover:bg-cheese text-ink font-mono font-bold text-xs shadow-comic-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'DISCORD INVITE COPIED!' : 'COPY DISCORD LINK'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-paper-dark border-t-3 border-ink flex items-center justify-between text-xs font-mono text-ink-soft">
          <span>{BENHIN_PROFILE.location}</span>
          <span>Tip: Scroll mouse wheel to explore the studio</span>
        </div>
      </div>
    </div>
  );
};
