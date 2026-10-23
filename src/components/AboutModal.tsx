import React, { useState } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { SKILL_CATEGORIES, STUDIO_EQUIPMENT, BENHIN_PROFILE } from '../data/portfolioData';
import { soundFX } from '../audio/soundFX';
import { X, Cpu, Monitor, Award, Heart, Terminal, Shield, ExternalLink } from 'lucide-react';

export const AboutModal: React.FC = () => {
  const { closeModal } = usePortfolioStore();
  const [activeDrawer, setActiveDrawer] = useState<number>(0);

  const drawers = [
    { id: 0, label: 'Drawer 1: Technical Arsenal', icon: Cpu, badge: 'SKILLS' },
    { id: 1, label: 'Drawer 2: Workstation Rig', icon: Monitor, badge: 'GEAR' },
    { id: 2, label: 'Drawer 3: Systems Bio', icon: Heart, badge: 'BIO' },
    { id: 3, label: 'Drawer 4: Milestones & Stats', icon: Award, badge: 'STATS' }
  ];

  const handleDrawerClick = (index: number) => {
    soundFX.playDrawerSlide();
    setActiveDrawer(index);
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
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b-2 sm:border-b-3 border-ink bg-white">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-cheese border-2 border-ink flex items-center justify-center text-ink font-mono font-black shadow-comic-sm text-sm sm:text-base flex-shrink-0">
              03
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-ink">
                Filing Cabinet (About & Skills)
              </h2>
              <p className="text-[11px] sm:text-xs text-ink-soft font-mono">
                Slide open metal drawers for technical arsenal & bio
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

        {/* 4 Filing Cabinet Tabs (Drawers) */}
        <div className="bg-paper-dark border-b-2 sm:border-b-3 border-ink px-3 sm:px-6 pt-2.5 sm:pt-3 flex gap-2 overflow-x-auto no-scrollbar">
          {drawers.map((d) => {
            const isActive = activeDrawer === d.id;
            const Icon = d.icon;
            return (
              <button
                key={d.id}
                onClick={() => handleDrawerClick(d.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl font-mono text-xs font-bold border-t-3 border-x-3 border-ink transition-all flex-shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-white text-ink shadow-comic -mb-[3px] z-10'
                    : 'bg-paper text-ink-soft hover:bg-cheese'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{d.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {/* Drawer 1: Technical Stack */}
          {activeDrawer === 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SKILL_CATEGORIES.map((category) => (
                  <div
                    key={category.name}
                    className="p-5 rounded-2xl border-3 border-ink bg-paper shadow-comic"
                  >
                    <h3 className="font-extrabold text-lg text-ink mb-1">
                      {category.name}
                    </h3>
                    <p className="text-xs text-ink-soft mb-4">
                      {category.description}
                    </p>

                    <div className="space-y-3">
                      {category.skills.map((s) => (
                        <div key={s.name}>
                          <div className="flex justify-between text-xs font-mono font-bold text-ink mb-1">
                            <span>{s.name}</span>
                            <span>{s.level}%</span>
                          </div>
                          <div className="w-full h-2.5 bg-paper-dark rounded-full border border-ink overflow-hidden">
                            <div
                              className="h-full bg-sky-500 rounded-full"
                              style={{ width: `${s.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Drawer 2: Studio Gear */}
          {activeDrawer === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-mono font-bold text-ink-faint uppercase">
                Workstation Hardware, Architecture & Props
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {STUDIO_EQUIPMENT.map((eq) => (
                  <div
                    key={eq.item}
                    className="p-4 rounded-xl border-3 border-ink bg-paper shadow-comic flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cheese border-2 border-ink flex items-center justify-center font-mono font-bold text-xs flex-shrink-0">
                      ★
                    </div>
                    <div>
                      <div className="font-extrabold text-base text-ink">{eq.item}</div>
                      <div className="text-xs text-ink-soft mt-0.5">{eq.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Drawer 3: Bio */}
          {activeDrawer === 2 && (
            <div className="max-w-2xl space-y-4 text-ink leading-relaxed">
              <div className="p-4 bg-paper rounded-2xl border-3 border-ink shadow-comic mb-4">
                <div className="flex items-center gap-2 text-sky-600 font-mono text-xs font-bold uppercase">
                  <Terminal className="w-4 h-4" />
                  <span>{BENHIN_PROFILE.title}</span>
                </div>
                <h3 className="text-2xl font-black mt-1">Hello from Benhin ({BENHIN_PROFILE.handle})</h3>
              </div>
              <p>
                I am <strong>Benhin</strong>, a Native Android Systems Architect and Low-Level Multimedia Engineer dedicated to building ultra-high-performance mobile systems, zero-bloat audio/video engines, and resilient network protocol architectures.
              </p>
              <p>
                I'm the author of <strong>FAIRY LIVE</strong>, an open-source native Android live-streaming engine built under a strict <strong>&lt;15MB APK constraint</strong> with pure Kotlin execution, hardware MediaCodec H.264/AAC encoding, and custom RTMP/FLV socket transport.
              </p>
              <p>
                I also architect <strong>FAIRY MUSIC</strong>, a high-fidelity Material Design streaming app featuring sub-50ms synchronized "Play Together" host-client playback, 120 FPS fluid UI, and Apple Canvas visualizers.
              </p>
              <div className="p-4 bg-ink text-white rounded-xl font-mono text-xs border-2 border-ink">
                <span className="text-sky-400 font-bold">$ uname -a</span>
                <p className="text-slate-300 mt-1">
                  Linux kali-workstation 6.10-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux
                </p>
                <p className="text-emerald-400 mt-1">
                  ✓ Core: Zero-Bloat Kotlin • MediaCodec • AudioRecord DSP • Pure Execution
                </p>
              </div>
            </div>
          )}

          {/* Drawer 4: Credentials & Stats */}
          {activeDrawer === 3 && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border-3 border-ink bg-sky-100 shadow-comic flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-ink">Connect with Benhin</h3>
                  <p className="text-xs text-ink-soft mt-1">
                    Open to collaborations on low-level Android multimedia, RTMP/FLV protocols, and high-performance mobile systems.
                  </p>
                </div>
                <a
                  href={BENHIN_PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl border-2 border-ink bg-ink text-white font-mono font-bold text-xs shadow-comic hover:bg-sky-600 transition-colors flex-shrink-0 flex items-center gap-2"
                >
                  <span>GITHUB PROFILE ↗</span>
                </a>
              </div>

              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold text-ink-faint uppercase">
                  Systems Engineering Milestones
                </h4>
                <div className="p-4 rounded-xl border-2 border-ink bg-paper flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-ink">FAIRY LIVE Engine</div>
                    <div className="text-xs text-ink-soft">Pure-Kotlin RTMP socket engine &lt;15MB APK constraint</div>
                  </div>
                  <span className="text-xs font-mono font-bold text-red-600">Active Architecture</span>
                </div>
                <div className="p-4 rounded-xl border-2 border-ink bg-paper flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-ink">FAIRY MUSIC v1.0.8 Live</div>
                    <div className="text-xs font-ink-soft">120 FPS Compose UI & synchronized Play Together mesh</div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600">GPL v3</span>
                </div>
                <div className="p-4 rounded-xl border-2 border-ink bg-paper flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-ink">Broadcast Audio DSP Core</div>
                    <div className="text-xs text-ink-soft">Sub-10ms sidechain auto-ducking & speech noise gate</div>
                  </div>
                  <span className="text-xs font-mono font-bold text-sky-600">Production</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-paper-dark border-t-3 border-ink flex items-center justify-between text-xs font-mono text-ink-soft">
          <span>Cabinet Index: Drawer #{activeDrawer + 1} of 4</span>
          <span>Decals: KALI LINUX • ZERO-BLOAT KOTLIN • MEDIACODEC</span>
        </div>
      </div>
    </div>
  );
};
