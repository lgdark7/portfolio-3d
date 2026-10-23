import React, { useState } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { WEB_PROJECTS } from '../data/portfolioData';
import { X, ExternalLink, Sparkles, Filter } from 'lucide-react';

export const WebProjectsModal: React.FC = () => {
  const { closeModal } = usePortfolioStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'css-art', label: 'CSS Art' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'fullstack', label: 'Fullstack' },
    { id: 'webgl', label: '3D & WebGL' }
  ];

  const filtered = selectedCategory === 'all'
    ? WEB_PROJECTS
    : WEB_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-paper border-4 border-ink shadow-comic-xl rounded-3xl flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b-3 border-ink bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-retro-blue border-2 border-ink flex items-center justify-center text-white font-mono font-black shadow-comic-sm">
              01
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-ink">
                Web Engineering & Design
              </h2>
              <p className="text-xs text-ink-soft font-mono">
                Interactive web apps, creative code & experiments
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2.5 rounded-2xl border-2 border-ink bg-paper hover:bg-hoodie hover:text-white transition-colors shadow-comic-sm"
            title="Close Drawer (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-6 py-3 bg-paper-dark border-b-2 border-ink flex items-center gap-2 overflow-x-auto">
          <Filter className="w-4 h-4 text-ink-faint flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border-2 border-ink transition-all flex-shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-ink text-white shadow-comic-sm'
                  : 'bg-white text-ink hover:bg-cheese'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="bg-white border-3 border-ink rounded-2xl p-5 shadow-comic flex flex-col justify-between hover:-translate-y-1 transition-transform"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="px-2.5 py-0.5 rounded-full border border-ink text-[11px] font-mono font-bold text-white shadow-comic-sm"
                      style={{ backgroundColor: project.accentColor }}
                    >
                      {project.category.toUpperCase()}
                    </span>
                    {project.featured && (
                      <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-hoodie">
                        <Sparkles className="w-3 h-3" /> FEATURED
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-extrabold text-ink mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-ink-soft leading-relaxed mb-3">
                    {project.description}
                  </p>

                  <div className="bg-paper-dark/60 rounded-xl p-3 border border-ink/20 mb-4">
                    <p className="text-[11px] font-mono text-ink italic">
                      "{project.impact}"
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-paper rounded-md border border-ink/30 text-[10px] font-mono text-ink-soft"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t-2 border-ink/10">
                  {project.demoUrl !== '#' && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border-2 border-ink bg-cheese hover:bg-cheese-dark text-ink font-mono font-bold text-xs shadow-comic-sm transition-transform active:translate-y-0.5"
                    >
                      <span>Visit Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-2 rounded-xl border-2 border-ink bg-paper hover:bg-paper-dark text-ink font-mono font-bold text-xs shadow-comic-sm"
                      title="View GitHub Source"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-paper-dark border-t-3 border-ink flex items-center justify-between text-xs font-mono text-ink-soft">
          <span>{filtered.length} projects loaded</span>
          <span>Tip: Click monitor screen in 3D to reopen</span>
        </div>
      </div>
    </div>
  );
};
