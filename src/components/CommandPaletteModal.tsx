import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Copy, Check, Sparkles, Smile, Layers, ArrowRight } from 'lucide-react';
import { FONT_STYLES } from '../utils/textTransformers';
import { SYMBOL_CATEGORIES } from '../utils/symbolsData';
import { BIO_TEMPLATES } from '../utils/bioTemplatesData';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputText: string;
  onSelectText: (text: string, title: string) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  inputText,
  onSelectText,
}) => {
  const [query, setQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global keydown listener for ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentSample = inputText || 'Örnek Metin';

  // Search matched fonts
  const matchedFonts = FONT_STYLES.filter(f => 
    !query || f.name.toLowerCase().includes(query.toLowerCase()) || f.categoryLabel.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8);

  // Search matched symbols
  const matchedSymbols: string[] = [];
  if (query) {
    SYMBOL_CATEGORIES.forEach(cat => {
      cat.symbols.forEach(s => {
        if (s.toLowerCase().includes(query.toLowerCase()) || cat.name.toLowerCase().includes(query.toLowerCase())) {
          if (matchedSymbols.length < 15 && !matchedSymbols.includes(s)) {
            matchedSymbols.push(s);
          }
        }
      });
    });
  }

  // Search matched bios
  const matchedBios = query
    ? BIO_TEMPLATES.filter(b => b.title.toLowerCase().includes(query.toLowerCase()) || b.categoryLabel.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
    : [];

  const handleCopy = (id: string, text: string, title: string) => {
    navigator.clipboard.writeText(text);
    onSelectText(text, title);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-[#0f152b] border border-indigo-900/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-indigo-950 bg-[#0c1122]">
          <Search className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Font stili, sembol, emoji veya biyo ara... (Örn: Gotik, Taç, Melek, Zalgo)"
            className="w-full bg-transparent text-white placeholder:text-slate-500 text-sm focus:outline-none font-medium"
          />
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-indigo-300/60 bg-indigo-950/70 border border-indigo-800/60 px-1.5 py-0.5 rounded">
              ESC
            </span>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-indigo-950 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto space-y-4">
          {/* Matched Fonts */}
          {matchedFonts.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 px-3 py-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Yazı Stilleri ({matchedFonts.length})</span>
              </div>
              <div className="space-y-1 mt-1">
                {matchedFonts.map(font => {
                  const transformed = font.transform(currentSample);
                  const isCopied = copiedId === font.id;
                  return (
                    <div
                      key={font.id}
                      onClick={() => handleCopy(font.id, transformed, font.name)}
                      className="px-3 py-2.5 rounded-xl hover:bg-[#151c38] cursor-pointer flex items-center justify-between gap-3 group transition-colors border border-transparent hover:border-indigo-900/60"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <span className="font-semibold text-slate-300">{font.name}</span>
                          <span>·</span>
                          <span className="text-indigo-400">{font.categoryLabel}</span>
                        </div>
                        <div className="text-base text-white font-sans truncate select-none mt-0.5">
                          {transformed}
                        </div>
                      </div>

                      <button
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 shrink-0 ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-indigo-900/60 group-hover:bg-indigo-600 text-white'
                        }`}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Kopyalandı' : 'Kopyala'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Matched Symbols */}
          {matchedSymbols.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-purple-400 px-3 py-1 flex items-center gap-1.5">
                <Smile className="w-3.5 h-3.5" />
                <span>Eşleşen Semboller</span>
              </div>
              <div className="flex flex-wrap gap-2 px-3 pt-1">
                {matchedSymbols.map((sym, i) => (
                  <button
                    key={i}
                    onClick={() => handleCopy(`sym-${i}`, sym, 'Sembol')}
                    className="p-2 text-lg bg-[#0a0e1c] hover:bg-indigo-950 border border-indigo-950 hover:border-indigo-500 rounded-lg text-white transition-all"
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Bios */}
          {matchedBios.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-pink-400 px-3 py-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Biyo Şablonları</span>
              </div>
              <div className="space-y-1.5 mt-1">
                {matchedBios.map(bio => (
                  <div
                    key={bio.id}
                    onClick={() => handleCopy(bio.id, bio.template, bio.title)}
                    className="p-3 bg-[#0a0e1c] hover:bg-[#151c38] border border-indigo-950 rounded-xl cursor-pointer flex items-center justify-between gap-3 group transition-all"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{bio.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{bio.template}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedFonts.length === 0 && matchedSymbols.length === 0 && matchedBios.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-sm">
              "{query}" ile eşleşen bir font veya sembol bulunamadı.
            </div>
          )}
        </div>

        {/* Footer shortcuts info */}
        <div className="px-4 py-2.5 bg-[#0a0e1c] border-t border-indigo-950 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>Seçmek ve kopyalamak için tıklayın</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-indigo-400">
            <span>Nickora PRO Hızlı Arama</span>
          </div>
        </div>
      </div>
    </div>
  );
};
