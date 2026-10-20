import React, { useState } from 'react';
import { 
  Sparkles, 
  Crown, 
  Heart, 
  ArrowRight, 
  Frame, 
  Smile, 
  Minus, 
  Music, 
  Search,
  Check,
  Plus
} from 'lucide-react';
import { SYMBOL_CATEGORIES } from '../utils/symbolsData';

interface SymbolPickerProps {
  onInsertSymbol: (symbol: string) => void;
}

export const SymbolPicker: React.FC<SymbolPickerProps> = ({ onInsertSymbol }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-3.5 h-3.5 text-blue-400" />;
      case 'Crown': return <Crown className="w-3.5 h-3.5 text-amber-400" />;
      case 'Heart': return <Heart className="w-3.5 h-3.5 text-pink-400" />;
      case 'ArrowRight': return <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />;
      case 'Frame': return <Frame className="w-3.5 h-3.5 text-purple-400" />;
      case 'Smile': return <Smile className="w-3.5 h-3.5 text-yellow-400" />;
      case 'Minus': return <Minus className="w-3.5 h-3.5 text-slate-400" />;
      case 'Music': return <Music className="w-3.5 h-3.5 text-cyan-400" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-blue-400" />;
    }
  };

  const handleCopySymbol = (sym: string) => {
    navigator.clipboard.writeText(sym);
    setCopiedSymbol(sym);
    setTimeout(() => setCopiedSymbol(null), 1500);
  };

  const filteredCategories = SYMBOL_CATEGORIES.map(cat => {
    if (activeCategory !== 'all' && cat.id !== activeCategory) {
      return { ...cat, symbols: [] };
    }
    if (!searchQuery.trim()) return cat;

    const query = searchQuery.toLowerCase();
    const matchedSymbols = cat.symbols.filter(s => s.toLowerCase().includes(query));
    return { ...cat, symbols: matchedSymbols };
  }).filter(cat => cat.symbols.length > 0);

  return (
    <div className="w-full bg-[#10172e]/90 border border-indigo-900/60 rounded-2xl p-5 sm:p-7 shadow-2xl shadow-indigo-950/50 mb-10 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>Süslü Semboller, Emojiler & Kaomoji Arşivi</span>
          </h2>
          <p className="text-sm text-indigo-200/70 mt-1">
            İstediğiniz sembole tıklayarak anında kopyalayın veya metninizin içine ekleyin.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-indigo-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Sembol veya emoji ara..."
            className="w-full bg-[#0a0e1c] border border-indigo-900/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-400 font-medium"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 border-b border-indigo-950">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
            activeCategory === 'all'
              ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-indigo-500 shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-indigo-950/60'
          }`}
        >
          Tüm Semboller
        </button>
        {SYMBOL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-indigo-500 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-indigo-950/60'
            }`}
          >
            {getCategoryIcon(cat.iconName)}
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Copied Feedback Banner */}
      {copiedSymbol && (
        <div className="mb-4 p-2.5 bg-gradient-to-r from-blue-950/80 to-purple-950/80 border border-indigo-500/60 rounded-xl text-xs text-white flex items-center justify-center gap-2 shadow-lg animate-fadeIn">
          <Check className="w-4 h-4 text-blue-400" />
          <span><strong>{copiedSymbol}</strong> panoya kopyalandı!</span>
        </div>
      )}

      {/* Symbols Render */}
      <div className="space-y-6">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            Aradığınız kritere uygun sembol bulunamadı.
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <div key={cat.id}>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-3 flex items-center gap-2">
                {getCategoryIcon(cat.iconName)}
                <span>{cat.name}</span>
                <span className="text-indigo-400/60 font-mono text-[11px]">({cat.symbols.length})</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.symbols.map((sym, idx) => (
                  <div
                    key={`${cat.id}-${idx}`}
                    className="group relative flex items-center bg-[#0a0e1c] border border-indigo-950 hover:border-indigo-500/70 rounded-xl p-1 transition-all shadow-sm"
                  >
                    <button
                      onClick={() => handleCopySymbol(sym)}
                      title="Kopyalamak için tıkla"
                      className="px-3 py-2 text-base sm:text-lg text-white hover:bg-indigo-950/70 rounded-lg transition-colors select-none font-sans"
                    >
                      {sym}
                    </button>
                    <button
                      onClick={() => onInsertSymbol(sym)}
                      title="Yazıya Ekle (+)"
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-blue-400 rounded transition-opacity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
