import React, { useState } from 'react';
import { Copy, Check, Sparkles, RefreshCw, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FONT_STYLES } from '../utils/textTransformers';

interface NickBuilderProps {
  baseText: string;
  onPreview: (text: string, title: string) => void;
}

const LEFT_DECORATIONS = [
  { label: 'Efsanevi Kanat', val: '꧁༺ ' },
  { label: 'Karanlık Ruh', val: '꧁༒☬ ' },
  { label: 'Yıldız Nişan', val: '★彡[ ' },
  { label: 'Boss Tacı', val: '亗 ' },
  { label: 'Kraliyet Tacı', val: '♛ ' },
  { label: 'Samuray Çapraz', val: '乂 ' },
  { label: 'Suikastçi Kılıç', val: '⚔️ ⟪ ' },
  { label: 'Toxıc Gülen', val: '×͜× ' },
  { label: 'Sniper Tüfeği', val: '╾━╤デ╦︻ ' },
  { label: 'Şimşek Yıldırım', val: '⚡ ' },
  { label: 'Estetik Kalp', val: '♡ ˗ˏˋ ' },
  { label: 'Ay & Yıldız', val: '⋆⁺₊⋆ ☾ ' },
  { label: 'Matrix Blok', val: '░▒▓█ ' },
  { label: 'Japon Köşeli', val: '「 ' },
  { label: 'Siyah Kutu', val: '【 ' },
  { label: 'Boş (Yok)', val: '' },
];

const RIGHT_DECORATIONS = [
  { label: 'Efsanevi Kanat', val: ' ༻꧂' },
  { label: 'Karanlık Ruh', val: ' ☬༒꧂' },
  { label: 'Yıldız Nişan', val: ' ]彡★' },
  { label: 'Boss Tacı', val: ' 亗' },
  { label: 'Kraliyet Tacı', val: ' ♛' },
  { label: 'Samuray Çapraz', val: ' 乂' },
  { label: 'Suikastçi Kılıç', val: ' ⟫ ⚔️' },
  { label: 'Toxıc Gülen', val: ' ⚡' },
  { label: 'Sniper Tüfeği', val: '' },
  { label: 'Şimşek Yıldırım', val: ' ⚡' },
  { label: 'Estetik Kalp', val: ' ˎˊ˗ ♡' },
  { label: 'Ay & Yıldız', val: ' ⋆⁺₊⋆' },
  { label: 'Matrix Blok', val: ' █▓▒░' },
  { label: 'Japon Köşeli', val: ' 」' },
  { label: 'Siyah Kutu', val: ' 】' },
  { label: 'Boş (Yok)', val: '' },
];

const POPULAR_FONTS_FOR_BUILDER = [
  { id: 'bold-fraktur', name: 'Koyu Gotik' },
  { id: 'bold-serif', name: 'Kalın Matematik' },
  { id: 'sans-bold', name: 'Kalın Sans' },
  { id: 'small-caps', name: 'Small Caps' },
  { id: 'circles-black', name: 'Siyah Bubble' },
  { id: 'circles-white', name: 'Beyaz Bubble' },
  { id: 'vaporwave-wide', name: 'Vaporwave' },
  { id: 'monospace-font', name: 'Daktilo' },
  { id: 'script-cursive', name: 'El Yazısı' },
];

export const NickBuilder: React.FC<NickBuilderProps> = ({ baseText, onPreview }) => {
  const [nickText, setNickText] = useState(baseText || 'Şampiyon');
  const [selectedLeft, setSelectedLeft] = useState(LEFT_DECORATIONS[0].val);
  const [selectedRight, setSelectedRight] = useState(RIGHT_DECORATIONS[0].val);
  const [selectedFontId, setSelectedFontId] = useState('bold-fraktur');
  const [copied, setCopied] = useState(false);

  const currentFont = FONT_STYLES.find(f => f.id === selectedFontId) || FONT_STYLES[0];
  const transformedCore = currentFont.transform(nickText || 'Nick');
  const fullNick = `${selectedLeft}${transformedCore}${selectedRight}`;

  const handleCopy = (e: React.MouseEvent) => {
    navigator.clipboard.writeText(fullNick);
    setCopied(true);

    try {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      confetti({
        particleCount: 22,
        spread: 60,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: ['#3b82f6', '#8b5cf6', '#a855f7', '#6366f1', '#ffffff'],
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => setCopied(false), 2000);
  };

  const handleRandomize = () => {
    const randomLeft = LEFT_DECORATIONS[Math.floor(Math.random() * (LEFT_DECORATIONS.length - 1))].val;
    const randomRight = RIGHT_DECORATIONS[Math.floor(Math.random() * (RIGHT_DECORATIONS.length - 1))].val;
    const randomFont = POPULAR_FONTS_FOR_BUILDER[Math.floor(Math.random() * POPULAR_FONTS_FOR_BUILDER.length)].id;
    setSelectedLeft(randomLeft);
    setSelectedRight(randomRight);
    setSelectedFontId(randomFont);
  };

  return (
    <div className="w-full bg-[#10172e]/90 border border-indigo-900/60 rounded-2xl p-5 sm:p-7 shadow-2xl shadow-indigo-950/50 mb-10 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>Özel Oyun Nicki & Biyo Tasarlayıcı</span>
          </h2>
          <p className="text-sm text-indigo-200/70 mt-1">
            Sol süs, yazı tipi ve sağ süsü birleştirerek benzersiz PUBG, Valorant, Brawl Stars ve Instagram nickinizi oluşturun.
          </p>
        </div>

        <button
          onClick={handleRandomize}
          className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold bg-indigo-950/70 hover:bg-indigo-900/80 border border-indigo-800/70 hover:border-indigo-500 text-white rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
          <span>Rastgele Karıştır</span>
        </button>
      </div>

      {/* Output Showcase Box */}
      <div className="bg-[#0a0e1c] border border-indigo-900/80 rounded-2xl p-6 sm:p-8 mb-8 text-center shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient opacity-60 pointer-events-none" />
        
        <div className="text-xs uppercase tracking-wider text-indigo-400 font-semibold mb-2 relative z-10">
          Canlı Nick Önizlemesi
        </div>
        <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white py-3 break-all select-all font-sans relative z-10 drop-shadow-md">
          {fullNick}
        </div>
        <div className="flex items-center justify-center gap-3 mt-4 relative z-10">
          <button
            onClick={() => onPreview(fullNick, 'Özel Tasarım Nick')}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-950/70 hover:bg-indigo-900 border border-indigo-800/70 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span>Profilde Önizle</span>
          </button>
          <button
            onClick={handleCopy}
            className={`px-5 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 shadow-lg ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-indigo-600/40 active:scale-95'
            }`}
          >
            {copied ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Kopyalandı!' : 'Nicki Kopyala'}</span>
          </button>
        </div>
      </div>

      {/* Nickname Input & Builder Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1: Left Wing / Icon */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2">
            1. Sol Süs / Kanat
          </label>
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {LEFT_DECORATIONS.map((dec) => (
              <button
                key={dec.label}
                onClick={() => setSelectedLeft(dec.val)}
                className={`w-full text-left px-3 py-2 text-xs rounded-lg border transition-all flex items-center justify-between ${
                  selectedLeft === dec.val
                    ? 'bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-indigo-500 text-white font-bold shadow-sm'
                    : 'bg-[#0a0e1c]/70 border-indigo-950 text-slate-300 hover:bg-indigo-950/60 hover:text-white'
                }`}
              >
                <span>{dec.label}</span>
                <span className="font-mono text-sm text-indigo-300">{dec.val || '—'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Main Text & Font Style */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2">
            2. İsim & Yazı Fontu
          </label>
          <input
            type="text"
            value={nickText}
            onChange={(e) => setNickText(e.target.value)}
            placeholder="İsim yazın..."
            className="w-full bg-[#0a0e1c] border border-indigo-900/80 rounded-lg px-3 py-2 text-sm text-white mb-3 focus:outline-none focus:border-indigo-400 font-medium"
          />
          <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
            {POPULAR_FONTS_FOR_BUILDER.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFontId(f.id)}
                className={`w-full text-left px-3 py-2 text-xs rounded-lg border transition-all flex items-center justify-between ${
                  selectedFontId === f.id
                    ? 'bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-indigo-500 text-white font-bold shadow-sm'
                    : 'bg-[#0a0e1c]/70 border-indigo-950 text-slate-300 hover:bg-indigo-950/60 hover:text-white'
                }`}
              >
                <span>{f.name}</span>
                <span className="font-sans text-xs text-indigo-200">
                  {FONT_STYLES.find(fs => fs.id === f.id)?.transform('Nick')}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Right Wing / Icon */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2">
            3. Sağ Süs / Sembol
          </label>
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {RIGHT_DECORATIONS.map((dec) => (
              <button
                key={dec.label}
                onClick={() => setSelectedRight(dec.val)}
                className={`w-full text-left px-3 py-2 text-xs rounded-lg border transition-all flex items-center justify-between ${
                  selectedRight === dec.val
                    ? 'bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-indigo-500 text-white font-bold shadow-sm'
                    : 'bg-[#0a0e1c]/70 border-indigo-950 text-slate-300 hover:bg-indigo-950/60 hover:text-white'
                }`}
              >
                <span>{dec.label}</span>
                <span className="font-mono text-sm text-indigo-300">{dec.val || '—'}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
