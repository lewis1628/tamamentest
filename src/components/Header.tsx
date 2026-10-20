import React from 'react';
import { 
  Sparkles, 
  Trash2, 
  Bookmark, 
  Layers,
  Search,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'fonts' | 'bios' | 'builder' | 'symbols' | 'favorites';
  setActiveTab: (tab: 'fonts' | 'bios' | 'builder' | 'symbols' | 'favorites') => void;
  favoritesCount: number;
  historyCount?: number;
  onOpenHistory?: () => void;
  onOpenCommandPalette: () => void;
  onOpenExport?: () => void;
  onClear: () => void;
  hasText: boolean;
  viewMode?: 'grid' | 'list';
  onToggleViewMode?: () => void;
  fontSize?: 'sm' | 'md' | 'lg';
  onCycleFontSize?: () => void;
  onQuickTransform?: (type: 'upper' | 'lower' | 'clean' | 'reverse' | 'binary' | 'morse') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  onOpenCommandPalette,
  onClear,
  hasText,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0c1122]/95 backdrop-blur-2xl border-b border-indigo-950/90 shadow-2xl shadow-indigo-950/40">
      {/* Top Banner Ticker: Minimal Trust Marker */}
      <div className="hidden sm:flex items-center justify-between px-4 sm:px-8 py-1 bg-[#070a14] border-b border-indigo-950/60 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>Evrensel Unicode 15.1 Karakter Standardı</span>
          <span aria-hidden="true" className="text-indigo-800">·</span>
          <span className="text-indigo-300">Tüm cihazlar ve oyunlar ile %100 uyumlu</span>
        </div>
        <div className="flex items-center gap-2 text-indigo-300/80">
          <span className="font-mono">Kısayol: <strong className="text-white font-semibold">Ctrl + K</strong> ile hızlı ara</span>
        </div>
      </div>

      {/* Main Studio Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* Zone 1: Distinctive Brand Lockup */}
        <div 
          onClick={() => setActiveTab('fonts')} 
          className="flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 group-hover:shadow-indigo-500/50 transition-all">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-extrabold text-xl tracking-tight text-white">
              Nick<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">ora</span>
            </span>
            <span className="text-[10px] font-extrabold tracking-wider px-1.5 py-0.5 rounded bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-indigo-300 border border-indigo-500/40 font-mono">
              PRO
            </span>
          </div>
        </div>

        {/* Center: Command Palette Search Bar Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center justify-between w-48 lg:w-64 px-3 py-1.5 bg-[#080b17] hover:bg-[#121933] border border-indigo-900/60 hover:border-indigo-600/70 rounded-xl text-xs text-slate-400 transition-all shadow-inner group"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-3.5 h-3.5 text-indigo-400 group-hover:text-blue-300 transition-colors shrink-0" />
            <span className="truncate group-hover:text-slate-200">Hızlı ara...</span>
          </div>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 font-mono text-[10px] text-indigo-300/80 bg-indigo-950/80 border border-indigo-800/80 px-1.5 py-0.5 rounded shadow-sm">
            ⌘K
          </kbd>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          <button
            onClick={() => setActiveTab('fonts')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'fonts'
                ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-indigo-500/60 shadow-sm shadow-indigo-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Font Stilleri
          </button>
          <button
            onClick={() => setActiveTab('bios')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'bios'
                ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-indigo-500/60 shadow-sm shadow-indigo-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-pink-400" />
            <span>Biyo Şablonları</span>
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'builder'
                ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-indigo-500/60 shadow-sm shadow-indigo-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Nick Tasarlayıcı
          </button>
          <button
            onClick={() => setActiveTab('symbols')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'symbols'
                ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-indigo-500/60 shadow-sm shadow-indigo-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Sembol & Kaomoji
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'favorites'
                ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border border-purple-500/60 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span>Favoriler</span>
            {favoritesCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                {favoritesCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Clean Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {hasText && (
            <button
              onClick={onClear}
              className="px-3 py-1.5 text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/50 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-sm"
              title="Metni Temizle"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Temizle</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile subnavigation bar */}
      <div className="xl:hidden flex items-center justify-around px-2 py-2 border-t border-indigo-950/80 bg-[#0c1122] text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('fonts')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap font-bold ${
            activeTab === 'fonts' ? 'bg-gradient-to-r from-blue-600/40 to-purple-600/40 text-white border border-indigo-500/50' : 'text-slate-400'
          }`}
        >
          Fontlar
        </button>
        <button
          onClick={() => setActiveTab('bios')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap font-bold flex items-center gap-1 ${
            activeTab === 'bios' ? 'bg-gradient-to-r from-blue-600/40 to-purple-600/40 text-white border border-indigo-500/50' : 'text-slate-400'
          }`}
        >
          <Layers className="w-3 h-3 text-pink-400" />
          <span>Biyolar</span>
        </button>
        <button
          onClick={() => setActiveTab('builder')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap font-bold ${
            activeTab === 'builder' ? 'bg-gradient-to-r from-blue-600/40 to-purple-600/40 text-white border border-indigo-500/50' : 'text-slate-400'
          }`}
        >
          Nick Tasarla
        </button>
        <button
          onClick={() => setActiveTab('symbols')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap font-bold ${
            activeTab === 'symbols' ? 'bg-gradient-to-r from-blue-600/40 to-purple-600/40 text-white border border-indigo-500/50' : 'text-slate-400'
          }`}
        >
          Semboller
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap font-bold flex items-center gap-1 ${
            activeTab === 'favorites' ? 'bg-purple-600/40 text-white border border-purple-500/50' : 'text-slate-400'
          }`}
        >
          <Bookmark className="w-3 h-3 text-amber-400" />
          <span>Favoriler ({favoritesCount})</span>
        </button>
      </div>
    </header>
  );
};
