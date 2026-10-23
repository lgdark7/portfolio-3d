import React, { useState } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { THOUGHT_ARTICLES } from '../data/portfolioData';
import { X, BookOpen, Clock, Tag } from 'lucide-react';

export const ThoughtsModal: React.FC = () => {
  const { closeModal } = usePortfolioStore();
  const [selectedArticle, setSelectedArticle] = useState(THOUGHT_ARTICLES[0]);

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
            <div className="w-10 h-10 rounded-2xl bg-purple-500 border-2 border-ink flex items-center justify-center text-white font-mono font-black shadow-comic-sm">
              04
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-ink">
                Engineering Log & Case Studies
              </h2>
              <p className="text-xs text-ink-soft font-mono">
                Low-level Android systems, RTMP socket architectures & audio DSP notes
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
          {/* Article Index (Left) */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-ink-faint tracking-wider mb-2">
              Studio Engineering Log
            </h3>
            {THOUGHT_ARTICLES.map((article) => {
              const isSelected = selectedArticle.id === article.id;
              return (
                <button
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className={`w-full text-left p-4 rounded-2xl border-3 border-ink transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cheese shadow-comic-lg translate-x-1'
                      : 'bg-white hover:bg-paper-dark shadow-comic-sm'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-ink-soft mb-1">
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1 font-bold">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm text-ink mb-1">
                    {article.title}
                  </h4>
                  <p className="text-xs text-ink-soft line-clamp-2">
                    {article.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Reading Pane (Right) */}
          <div className="md:col-span-7 bg-white border-3 border-ink rounded-3xl p-6 shadow-comic flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-sky-600">
                  {selectedArticle.date}
                </span>
                <span className="text-xs font-mono text-ink-faint">•</span>
                <span className="text-xs font-mono text-ink-soft flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {selectedArticle.readTime}
                </span>
              </div>

              <h3 className="text-2xl font-black text-ink mb-4 leading-tight">
                {selectedArticle.title}
              </h3>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {selectedArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-ink bg-paper text-[10px] font-mono font-bold text-ink"
                  >
                    <Tag className="w-2.5 h-2.5 text-sky-600" /> {tag}
                  </span>
                ))}
              </div>

              <div className="prose prose-sm text-ink-soft leading-relaxed space-y-4 text-sm font-sans whitespace-pre-line">
                {selectedArticle.content}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t-2 border-ink/10 flex items-center justify-between text-xs font-mono text-ink-faint">
              <span>Chalkboard Specials</span>
              <span>Benhin Engineering Notes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
