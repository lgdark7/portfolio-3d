import React, { useState } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { BENHIN_PROFILE } from '../data/portfolioData';
import { X, Send, Copy, Check, Terminal, ExternalLink, Shield, Radio, Sparkles } from 'lucide-react';

export const ArchiveContactModal: React.FC = () => {
  const { closeModal } = usePortfolioStore();
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  const [copiedGuns, setCopiedGuns] = useState(false);
  const [guestMessage, setGuestMessage] = useState('');
  const [guestName, setGuestName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [transmitted, setTransmitted] = useState(false);

  const copyDiscord = () => {
    navigator.clipboard.writeText(BENHIN_PROFILE.discordUrl);
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 2000);
  };

  const copyGunsLol = () => {
    navigator.clipboard.writeText(BENHIN_PROFILE.gunslolUrl);
    setCopiedGuns(true);
    setTimeout(() => setCopiedGuns(false), 2000);
  };

  const sanitizeInput = (val: string, maxLen = 300) => {
    return val.replace(/[<>'"]/g, '').trim().slice(0, maxLen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMsg = sanitizeInput(guestMessage, 500);
    const cleanName = sanitizeInput(guestName, 60);
    if (!cleanMsg) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTransmitted(true);
      setGuestMessage('');
      setGuestName('');
      setTimeout(() => setTransmitted(false), 4000);
    }, 900);
  };

  const releases = [
    { name: 'FAIRY LIVE v1.2.0', tag: 'Latest Release', desc: 'Hardware MediaCodec H.264/AAC & pure-Kotlin RTMP socket engine (<15MB APK)', link: 'https://github.com/lgdark7/FairyLive' },
    { name: 'FAIRY MUSIC v1.0.8', tag: 'Production', desc: '120 FPS fluid UI, Material Design 3, and synchronized Play Together listening rooms', link: 'https://github.com/lgdark7/FAIRY-MUSIC' },
    { name: 'FairyLive OTA Manifests', tag: 'Automated Pipeline', desc: 'Decentralized version manifests, SHA256 checksums, and seamless updates', link: 'https://github.com/lgdark7/fairylive-releases' },
    { name: 'Audio DSP Sidechain Core', tag: 'Sub-10ms Gate', desc: 'Speech priority formant filter, adaptive noise gate, and automatic background ducking', link: 'https://github.com/lgdark7/FairyLive' },
    { name: '3D Cel-Shaded Studio Experience', tag: 'WebGL 60FPS', desc: 'Bob\'s Burgers style studio with Catmull-Rom spline camera rail and procedural Web Audio', link: 'https://github.com/lgdark7' }
  ];

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/60 backdrop-blur-md animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] bg-paper border-4 border-ink shadow-comic-xl rounded-3xl flex flex-col overflow-hidden cursor-default"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-3 border-ink bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500 border-2 border-ink flex items-center justify-center text-white font-mono font-black shadow-comic-sm">
              05
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-ink">
                Connect Terminal & Distribution
              </h2>
              <p className="text-xs text-ink-soft font-mono">
                Discord server, guns.lol, official releases & studio guestbook
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2.5 rounded-2xl border-2 border-ink bg-paper hover:bg-hoodie hover:text-white transition-colors shadow-comic-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content split */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Guestbook Terminal & Socials (Left Column) */}
          <div className="md:col-span-6 space-y-6">
            <div className="bg-white border-3 border-ink rounded-3xl p-6 shadow-comic">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-4 h-4 text-sky-600" />
                <h3 className="text-sm font-mono font-bold text-ink uppercase">
                  Direct Studio Message Terminal
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-ink mb-1">
                    Your Name / Handle:
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. KaliUser / AndroidDev"
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl border-2 border-ink bg-paper focus:bg-white outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-ink mb-1">
                    Packet Payload / Message:
                  </label>
                  <textarea
                    rows={3}
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    placeholder="Say hello, discuss RTMP protocols, Kotlin media, or collaborate..."
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl border-2 border-ink bg-paper focus:bg-white outline-none resize-none"
                    required
                  />
                </div>

                {transmitted && (
                  <div className="p-2.5 rounded-xl border border-emerald-400 bg-emerald-50 text-emerald-800 font-mono font-bold text-xs flex items-center gap-2 animate-fadeIn">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Packet safely logged to Benhin's systems terminal!</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full py-2.5 rounded-xl border-2 border-ink bg-sky-500 text-white font-mono font-bold text-xs shadow-comic-sm hover:bg-sky-600 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitted ? 'TRANSMITTING PACKET...' : 'TRANSMIT MESSAGE'}</span>
                </button>
              </form>

              {/* Direct Link Cards */}
              <div className="mt-5 pt-4 border-t-2 border-ink/10 space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl border-2 border-ink bg-paper">
                  <div>
                    <div className="text-[10px] font-mono font-bold text-ink-faint">
                      OFFICIAL DISCORD:
                    </div>
                    <div className="text-xs font-mono font-extrabold text-ink">
                      discord.gg/AWAe8gS7yq
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={copyDiscord}
                      className="px-2.5 py-1 rounded-lg border border-ink bg-white hover:bg-cheese text-ink font-mono font-bold text-[11px] shadow-comic-sm cursor-pointer"
                    >
                      {copiedDiscord ? 'COPIED!' : 'COPY'}
                    </button>
                    <a
                      href={BENHIN_PROFILE.discordUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg border border-ink bg-[#5865f2] text-white font-mono font-bold text-[11px] shadow-comic-sm"
                    >
                      JOIN ↗
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl border-2 border-ink bg-paper">
                  <div>
                    <div className="text-[10px] font-mono font-bold text-ink-faint">
                      GUNS.LOL BIO:
                    </div>
                    <div className="text-xs font-mono font-extrabold text-ink">
                      guns.lol/lg_dark
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={copyGunsLol}
                      className="px-2.5 py-1 rounded-lg border border-ink bg-white hover:bg-cheese text-ink font-mono font-bold text-[11px] shadow-comic-sm cursor-pointer"
                    >
                      {copiedGuns ? 'COPIED!' : 'COPY'}
                    </button>
                    <a
                      href={BENHIN_PROFILE.gunslolUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg border border-ink bg-[#f43f5e] text-white font-mono font-bold text-[11px] shadow-comic-sm"
                    >
                      VISIT ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hub Social Quick Grid */}
            <div className="bg-white border-3 border-ink rounded-3xl p-5 shadow-comic">
              <h4 className="text-xs font-mono font-bold text-ink-faint uppercase mb-3">
                Benhin's Primary Channels
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={BENHIN_PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl border-2 border-ink bg-paper hover:bg-paper-dark text-xs font-mono font-bold text-ink shadow-comic-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>GitHub (@lgdark7)</span>
                </a>
                <a
                  href={BENHIN_PROFILE.discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl border-2 border-ink bg-paper hover:bg-paper-dark text-xs font-mono font-bold text-ink shadow-comic-sm"
                >
                  <Radio className="w-4 h-4 text-[#5865f2]" />
                  <span>Discord Guild</span>
                </a>
              </div>
            </div>
          </div>

          {/* Releases and Manifests Wall (Right Column) */}
          <div className="md:col-span-6 bg-white border-3 border-ink rounded-3xl p-6 shadow-comic flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-mono font-bold text-ink uppercase">
                  Releases, Manifests & Architectures
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 border border-emerald-400 text-emerald-800 font-bold">
                  ACTIVE DEPLOYMENTS
                </span>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {releases.map((rel) => (
                  <a
                    key={rel.name}
                    href={rel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col p-3 rounded-xl border-2 border-ink bg-paper hover:bg-cheese transition-colors text-xs font-mono group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-ink">{rel.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white border border-ink text-sky-600 font-bold">
                        {rel.tag}
                      </span>
                    </div>
                    <span className="text-ink-soft text-[11px] leading-relaxed">
                      {rel.desc}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-ink/10 text-center text-xs font-mono text-ink-faint">
              "Never play it safe.. pure execution and relentless engineering." — Benhin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
