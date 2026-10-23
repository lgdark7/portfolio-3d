import React, { useState } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { SKILL_CATEGORIES, STUDIO_EQUIPMENT } from '../data/portfolioData';
import { soundFX } from '../audio/soundFX';
import { X, Folder, Cpu, Sparkles, Monitor, Award, Heart } from 'lucide-react';

export const AboutModal: React.FC = () => {
  const { closeModal } = usePortfolioStore();
  const [activeDrawer, setActiveDrawer] = useState<number>(0);

  const drawers = [
    { id: 0, label: 'Drawer 1: Tech Stack', icon: Cpu, badge: 'SKILLS' },
    { id: 1, label: 'Drawer 2: Studio Gear', icon: Monitor, badge: 'GEAR' },
    { id: 2, label: 'Drawer 3: Biography', icon: Heart, badge: 'BIO' },
    { id: 3, label: 'Drawer 4: Credentials', icon: Award, badge: 'RESUME' }
  ];

  const handleDrawerClick = (index: number) => {
    soundFX.playDrawerSlide();
    setActiveDrawer(index);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-paper border-4 border-ink shadow-comic-xl rounded-3xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-3 border-ink bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cheese border-2 border-ink flex items-center justify-center text-ink font-mono font-black shadow-comic-sm">
              03
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-ink">
                Filing Cabinet (About & Skills)
              </h2>
              <p className="text-xs text-ink-soft font-mono">
                Slide open the 3D metal drawers to inspect abilities & bio
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2.5 rounded-2xl border-2 border-ink bg-paper hover:bg-hoodie hover:text-white transition-colors shadow-comic-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Filing Cabinet Tabs (Drawers) */}
        <div className="bg-paper-dark border-b-3 border-ink px-6 pt-3 flex gap-2 overflow-x-auto">
          {drawers.map((d) => {
            const isActive = activeDrawer === d.id;
            const Icon = d.icon;
            return (
              <button
                key={d.id}
                onClick={() => handleDrawerClick(d.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl font-mono text-xs font-bold border-t-3 border-x-3 border-ink transition-all flex-shrink-0 ${
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
                              className="h-full bg-hoodie rounded-full"
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
                Hardware, Software & Studio Props
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
                <span className="text-xs font-mono font-bold text-hoodie uppercase">
                  Artist • Designer • Web Architect
                </span>
                <h3 className="text-2xl font-black mt-1">Hello from the Studio!</h3>
              </div>
              <p>
                I am a web designer, frontend architect, and artist. Since 2007, I have redesigned and archived a completely fresh version of my portfolio every single year.
              </p>
              <p>
                The 2018 edition paid tribute to the inimitable world of <em>Bob's Burgers</em> with hand-drawn vector line art, an oversized red hoodie, and an interactive studio that responded to screen dimensions.
              </p>
              <p>
                This modern 3D incarnation breathes spatial life into that vision: genuine Three.js cel-shaded geometry, procedural Web Audio acoustics, and mouse-scroll camera kinematics.
              </p>
            </div>
          )}

          {/* Drawer 4: Credentials & Resume */}
          {activeDrawer === 3 && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border-3 border-ink bg-cheese shadow-comic flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-ink">Download Full Resume</h3>
                  <p className="text-xs text-ink-soft mt-1">
                    Complete engineering history, design leadership, and speaking credentials.
                  </p>
                </div>
                <button
                  onClick={() => alert("Resume downloaded!")}
                  className="px-6 py-2.5 rounded-xl border-2 border-ink bg-ink text-white font-mono font-bold text-xs shadow-comic hover:bg-hoodie transition-colors flex-shrink-0"
                >
                  DOWNLOAD PDF ↗
                </button>
              </div>

              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold text-ink-faint uppercase">
                  Highlights & Speaking
                </h4>
                <div className="p-4 rounded-xl border-2 border-ink bg-paper flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-ink">CSSDay Keynote Speaker</div>
                    <div className="text-xs text-ink-soft">Illustration & Constraint-Driven Web Design</div>
                  </div>
                  <span className="text-xs font-mono font-bold text-hoodie">Amsterdam</span>
                </div>
                <div className="p-4 rounded-xl border-2 border-ink bg-paper flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-ink">Net Magazine Feature Issue #261</div>
                    <div className="text-xs text-ink-soft">A Single Div & Creative CSS</div>
                  </div>
                  <span className="text-xs font-mono font-bold text-mint-dark">Global</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-paper-dark border-t-3 border-ink flex items-center justify-between text-xs font-mono text-ink-soft">
          <span>Cabinet Index: Drawer #{activeDrawer + 1} of 4</span>
          <span>Stickers: CSS IS AWESOME • ♡ JS ♡</span>
        </div>
      </div>
    </div>
  );
};
