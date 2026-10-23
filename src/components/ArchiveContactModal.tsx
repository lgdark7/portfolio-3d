import React, { useState } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { X, Send, Copy, Check, Terminal, ExternalLink } from 'lucide-react';

export const ArchiveContactModal: React.FC = () => {
  const { closeModal } = usePortfolioStore();
  const [copied, setCopied] = useState(false);
  const [guestMessage, setGuestMessage] = useState('');
  const [guestName, setGuestName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('lynn@lynnandtonic.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestMessage.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setGuestMessage('');
      setGuestName('');
      alert('Thanks for dropping a note in the 2018 studio guestbook!');
    }, 1200);
  };

  const archiveYears = [
    { year: '2025', version: 'v. XIX', desc: 'Current studio redesign' },
    { year: '2024', version: 'v. XVIII', desc: 'Lime green & stretched typography' },
    { year: '2023', version: 'v. XVII', desc: 'High-contrast portrait' },
    { year: '2022', version: 'v. XVI', desc: 'Illustrated colorful header' },
    { year: '2021', version: 'v. XV', desc: 'The elevator lobby' },
    { year: '2020', version: 'v. XIV', desc: 'Folded paper world' },
    { year: '2019', version: 'v. XIII', desc: 'Nesting doll heads' },
    { year: '2018', version: 'v. XII', desc: 'Bob\'s Burgers studio & 220 queries (This theme!)' },
    { year: '2017', version: 'v. XI', desc: 'Wolf hat & black/gold palette' },
    { year: '2016', version: 'v. X', desc: 'Minimal emoji interface' },
    { year: '2015', version: 'v. IX', desc: 'Soft rainbow vertical nav' },
    { year: '2007', version: 'v. I', desc: 'Three-column iframe layout' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-paper border-4 border-ink shadow-comic-xl rounded-3xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-3 border-ink bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-hoodie border-2 border-ink flex items-center justify-center text-white font-mono font-black shadow-comic-sm">
              05
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-ink">
                Archive & Connect
              </h2>
              <p className="text-xs text-ink-soft font-mono">
                Annual site history since 2007 & studio message terminal
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

        {/* Content split */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Guestbook Terminal & Socials (Left Column) */}
          <div className="md:col-span-6 space-y-6">
            <div className="bg-white border-3 border-ink rounded-3xl p-6 shadow-comic">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-4 h-4 text-hoodie" />
                <h3 className="text-sm font-mono font-bold text-ink uppercase">
                  Studio Guestbook & Message Terminal
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
                    placeholder="e.g. Tina Belcher"
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl border-2 border-ink bg-paper focus:bg-white outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-ink mb-1">
                    Message:
                  </label>
                  <textarea
                    rows={3}
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    placeholder="Say hello, talk CSS, or recommend a burger..."
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl border-2 border-ink bg-paper focus:bg-white outline-none resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full py-2.5 rounded-xl border-2 border-ink bg-hoodie text-white font-mono font-bold text-xs shadow-comic-sm hover:bg-hoodie-dark transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitted ? 'PINNING TO CHALKBOARD...' : 'SEND MESSAGE'}</span>
                </button>
              </form>

              {/* Direct Email Card */}
              <div className="mt-5 pt-4 border-t-2 border-ink/10 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono font-bold text-ink-faint">
                    DIRECT CONTACT:
                  </div>
                  <div className="text-xs font-mono font-extrabold text-ink">
                    lynn@lynnandtonic.com
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-ink bg-cheese hover:bg-cheese-dark text-ink font-mono font-bold text-xs shadow-comic-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'COPIED!' : 'COPY'}</span>
                </button>
              </div>
            </div>

            {/* Social Links with inline SVGs */}
            <div className="bg-white border-3 border-ink rounded-3xl p-5 shadow-comic">
              <h4 className="text-xs font-mono font-bold text-ink-faint uppercase mb-3">
                Elsewhere on the Web
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://github.com/lynnandtonic"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl border-2 border-ink bg-paper hover:bg-paper-dark text-xs font-mono font-bold text-ink shadow-comic-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
                <a
                  href="https://twitter.lynnandtonic.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl border-2 border-ink bg-paper hover:bg-paper-dark text-xs font-mono font-bold text-ink shadow-comic-sm"
                >
                  <svg className="w-4 h-4 text-retro-blue" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.18 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
                  </svg>
                  <span>Twitter</span>
                </a>
                <a
                  href="https://instagram.lynnandtonic.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl border-2 border-ink bg-paper hover:bg-paper-dark text-xs font-mono font-bold text-ink shadow-comic-sm"
                >
                  <svg className="w-4 h-4 text-hoodie" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.etsy.com/shop/lynnandtonic"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl border-2 border-ink bg-paper hover:bg-paper-dark text-xs font-mono font-bold text-ink shadow-comic-sm"
                >
                  <ExternalLink className="w-4 h-4 text-mint-dark" />
                  <span>Shop</span>
                </a>
              </div>
            </div>
          </div>

          {/* Annual Archive Wall (Right Column) */}
          <div className="md:col-span-6 bg-white border-3 border-ink rounded-3xl p-6 shadow-comic flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-mono font-bold text-ink uppercase">
                  Annual Portfolio Archive (2007 - 2025)
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cheese border border-ink font-bold">
                  18 EDITIONS
                </span>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {archiveYears.map((item) => (
                  <a
                    key={item.year}
                    href={`https://lynnandtonic.com/archive/${item.year}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl border-2 border-ink bg-paper hover:bg-cheese transition-colors text-xs font-mono group"
                  >
                    <div>
                      <span className="font-extrabold text-ink mr-2">{item.year}</span>
                      <span className="text-ink-soft text-[11px]">{item.desc}</span>
                    </div>
                    <span className="text-hoodie font-bold group-hover:translate-x-1 transition-transform">
                      {item.version} ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-ink/10 text-center text-xs font-mono text-ink-faint">
              "Have a great day!" — Lynn Fisher
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
