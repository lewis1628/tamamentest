import React, { useRef } from 'react';
import { 
  X, 
  Clipboard, 
  Check, 
  CaseUpper, 
  CaseLower, 
  Heading1, 
  Sparkles,
  ArrowLeftRight,
  Eraser,
  AlignLeft,
  Smartphone,
  Gamepad2,
  Twitter
} from 'lucide-react';
import { PRESET_DECORATIONS } from '../utils/symbolsData';

interface TextInputAreaProps {
  text: string;
  onChange: (val: string) => void;
  onClear: () => void;
}

export const TextInputArea: React.FC<TextInputAreaProps> = ({
  text,
  onChange,
  onClear
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copiedRaw, setCopiedRaw] = React.useState(false);

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) {
        onChange(clipboardText);
      }
    } catch {
      // Fallback
    }
  };

  const handleCopyRaw = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedRaw(true);
    setTimeout(() => setCopiedRaw(false), 2000);
  };

  const transformCase = (type: 'upper' | 'lower' | 'title' | 'alternating' | 'reverse' | 'spaced' | 'clean-spaces' | 'join-lines') => {
    if (!text) return;
    if (type === 'upper') {
      onChange(text.toLocaleUpperCase('tr-TR'));
    } else if (type === 'lower') {
      onChange(text.toLocaleLowerCase('tr-TR'));
    } else if (type === 'title') {
      onChange(
        text.replace(/\b\w/g, l => l.toLocaleUpperCase('tr-TR'))
      );
    } else if (type === 'alternating') {
      onChange(
        text.split('').map((c, i) => i % 2 === 0 ? c.toLocaleLowerCase('tr-TR') : c.toLocaleUpperCase('tr-TR')).join('')
      );
    } else if (type === 'reverse') {
      onChange(text.split('').reverse().join(''));
    } else if (type === 'spaced') {
      onChange(text.replace(/\s+/g, '').split('').join(' '));
    } else if (type === 'clean-spaces') {
      onChange(text.replace(/[ \t]+/g, ' ').trim());
    } else if (type === 'join-lines') {
      onChange(text.replace(/\r?\n+/g, ' ').trim());
    }
  };

  const applyDecoration = (prefix: string, suffix: string) => {
    const trimmed = text.trim() || 'Metin';
    onChange(`${prefix}${trimmed}${suffix}`);
  };

  const charCount = text.length;
  const charNoSpaces = text.replace(/\s/g, '').length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  // Platform limits
  const igPercent = Math.min(100, Math.round((charCount / 150) * 100));
  const gamePercent = Math.min(100, Math.round((charCount / 14) * 100));
  const tweetPercent = Math.min(100, Math.round((charCount / 280) * 100));

  return (
    <div className="w-full bg-[#10172d]/90 border border-indigo-900/60 rounded-2xl shadow-2xl shadow-indigo-950/50 p-4 sm:p-6 mb-8 backdrop-blur-xl relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Input Header & Statistics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 relative z-10">
        <label htmlFor="fancy-input" className="text-sm font-bold text-white flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span>Metin Giriş ve Dönüştürme Alanı</span>
        </label>
        
        {/* Real-time Text Statistics */}
        <div className="flex items-center gap-3 text-xs text-indigo-200/70 font-mono tabular-nums">
          <span className="text-white font-semibold">{charCount} <span className="text-indigo-400 font-normal">karakter</span></span>
          <span aria-hidden="true" className="text-indigo-800">·</span>
          <span className="text-indigo-300 font-semibold">{charNoSpaces} <span className="text-indigo-400 font-normal">boşluksuz</span></span>
          <span aria-hidden="true" className="text-indigo-800">·</span>
          <span className="text-purple-300 font-semibold">{wordCount} <span className="text-purple-400 font-normal">kelime</span></span>
        </div>
      </div>

      {/* Main Textarea */}
      <div className="relative group z-10">
        <textarea
          id="fancy-input"
          ref={textareaRef}
          value={text}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Dönüştürmek istediğiniz yazıyı, oyun nickinizi veya biyografinizi buraya yazın..."
          rows={3}
          className="w-full bg-[#0a0e1c]/85 border border-indigo-900/80 rounded-xl px-4 py-3.5 text-lg sm:text-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-indigo-400 transition-all resize-y min-h-[96px] shadow-inner font-sans font-medium"
        />

        {/* Clear button inside textarea */}
        {text && (
          <button
            onClick={onClear}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all shadow-sm"
            title="Temizle"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Platform Limit Bars */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 relative z-10">
        {/* Instagram Bio Limit */}
        <div className="bg-[#0a0e1c]/70 border border-indigo-950/80 rounded-lg p-2 flex items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium truncate">
            <Smartphone className="w-3.5 h-3.5 text-pink-400 shrink-0" />
            <span className="truncate">Instagram Bio:</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${charCount > 150 ? 'bg-rose-500' : 'bg-gradient-to-r from-pink-500 to-purple-500'}`}
                style={{ width: `${igPercent}%` }}
              />
            </div>
            <span className={`font-mono tabular-nums font-semibold ${charCount > 150 ? 'text-rose-400' : 'text-slate-400'}`}>
              {charCount}/150
            </span>
          </div>
        </div>

        {/* Gaming Nick Limit */}
        <div className="bg-[#0a0e1c]/70 border border-indigo-950/80 rounded-lg p-2 flex items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium truncate">
            <Gamepad2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="truncate">Oyun Nick:</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${charCount > 14 ? 'bg-amber-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}`}
                style={{ width: `${gamePercent}%` }}
              />
            </div>
            <span className={`font-mono tabular-nums font-semibold ${charCount > 14 ? 'text-amber-400' : 'text-slate-400'}`}>
              {charCount}/14
            </span>
          </div>
        </div>

        {/* Twitter / X Post Limit */}
        <div className="bg-[#0a0e1c]/70 border border-indigo-950/80 rounded-lg p-2 flex items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium truncate">
            <Twitter className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="truncate">Twitter / X:</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${charCount > 280 ? 'bg-rose-500' : 'bg-gradient-to-r from-sky-500 to-blue-500'}`}
                style={{ width: `${tweetPercent}%` }}
              />
            </div>
            <span className={`font-mono tabular-nums font-semibold ${charCount > 280 ? 'text-rose-400' : 'text-slate-400'}`}>
              {charCount}/280
            </span>
          </div>
        </div>
      </div>

      {/* Professional Text Engineering Toolbar */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-indigo-950 pt-3 relative z-10">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-indigo-300/70 mr-1 text-[11px] uppercase tracking-wider font-bold">Dönüştür:</span>
          <button
            onClick={() => transformCase('upper')}
            className="px-2.5 py-1 rounded-md bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-900/60 text-slate-200 hover:text-white transition-colors flex items-center gap-1 font-semibold"
            title="Tüm harfleri BÜYÜK yap"
          >
            <CaseUpper className="w-3.5 h-3.5 text-blue-400" />
            <span>BÜYÜK</span>
          </button>
          <button
            onClick={() => transformCase('lower')}
            className="px-2.5 py-1 rounded-md bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-900/60 text-slate-200 hover:text-white transition-colors flex items-center gap-1 font-semibold"
            title="Tüm harfleri küçük yap"
          >
            <CaseLower className="w-3.5 h-3.5 text-purple-400" />
            <span>küçük</span>
          </button>
          <button
            onClick={() => transformCase('title')}
            className="px-2.5 py-1 rounded-md bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-900/60 text-slate-200 hover:text-white transition-colors flex items-center gap-1 font-semibold"
            title="Kelimelerin İlk Harflerini Büyük Yap"
          >
            <Heading1 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Baş Harfler</span>
          </button>
          <button
            onClick={() => transformCase('alternating')}
            className="px-2.5 py-1 rounded-md bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-900/60 text-slate-200 hover:text-white transition-colors font-semibold"
            title="Bir büyük bir küçük harf"
          >
            aLtErNaTe
          </button>
          <button
            onClick={() => transformCase('spaced')}
            className="px-2.5 py-1 rounded-md bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-900/60 text-slate-200 hover:text-white transition-colors font-semibold"
            title="Harflerin arasına tek boşluk koy"
          >
            B o ş l u k l u
          </button>
          <button
            onClick={() => transformCase('reverse')}
            className="px-2.5 py-1 rounded-md bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-900/60 text-slate-200 hover:text-white transition-colors flex items-center gap-1 font-semibold"
            title="Metni ters çevir"
          >
            <ArrowLeftRight className="w-3 h-3 text-pink-400" />
            <span>Ters</span>
          </button>
          <button
            onClick={() => transformCase('clean-spaces')}
            className="px-2.5 py-1 rounded-md bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-900/60 text-slate-200 hover:text-white transition-colors flex items-center gap-1 font-semibold"
            title="Gereksiz birden fazla boşlukları temizle"
          >
            <Eraser className="w-3 h-3 text-amber-400" />
            <span>Boşluk Temizle</span>
          </button>
          <button
            onClick={() => transformCase('join-lines')}
            className="px-2.5 py-1 rounded-md bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-900/60 text-slate-200 hover:text-white transition-colors flex items-center gap-1 font-semibold"
            title="Alt satırları tek satırda birleştir"
          >
            <AlignLeft className="w-3 h-3 text-teal-400" />
            <span>Satırları Birleştir</span>
          </button>
        </div>

        {/* Quick paste & copy buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePaste}
            className="px-3.5 py-1.5 text-xs font-bold bg-indigo-900/50 hover:bg-indigo-900 border border-indigo-700/60 text-white rounded-lg transition-colors flex items-center gap-1"
          >
            <Clipboard className="w-3.5 h-3.5 text-blue-400" />
            <span>Panodan Yapıştır</span>
          </button>
          {text && (
            <button
              onClick={handleCopyRaw}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                copiedRaw 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-sm'
              }`}
            >
              {copiedRaw ? <Check className="w-3.5 h-3.5" /> : <Clipboard className="w-3.5 h-3.5" />}
              <span>{copiedRaw ? 'Kopyalandı' : 'Ham Metni Kopyala'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Fast Nick Decoration Quick-Bar */}
      <div className="mt-3 pt-3 border-t border-indigo-950/70 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs relative z-10">
        <span className="text-purple-300/80 whitespace-nowrap text-[11px] font-bold">Hızlı Süs & Kanat Ekle:</span>
        {PRESET_DECORATIONS.map((dec) => (
          <button
            key={dec.name}
            onClick={() => applyDecoration(dec.prefix, dec.suffix)}
            className="px-2.5 py-1 rounded-lg bg-[#0a0e1c] hover:bg-indigo-950 text-indigo-200 hover:text-white border border-indigo-900/70 hover:border-purple-500/70 whitespace-nowrap shrink-0 transition-all font-mono"
            title={`${dec.name} ekle`}
          >
            {dec.prefix}Metin{dec.suffix}
          </button>
        ))}
      </div>
    </div>
  );
};
