import React, { useState } from 'react';
import { Copy, Check, Star, Eye, Share2, Smartphone, QrCode } from 'lucide-react';

interface FontCardProps {
  id: string;
  name: string;
  categoryLabel: string;
  transformedText: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onPreview: (text: string, title: string) => void;
  onOpenQR: (text: string, title: string) => void;
  onCopiedToHistory: (text: string, fontName: string) => void;
  viewMode?: 'grid' | 'list';
  fontSize?: 'sm' | 'md' | 'lg';
}

const FontCardComponent: React.FC<FontCardProps> = ({
  id,
  name,
  categoryLabel,
  transformedText,
  isFavorite,
  onToggleFavorite,
  onPreview,
  onOpenQR,
  onCopiedToHistory,
  viewMode = 'grid',
  fontSize = 'md',
}) => {
  const [copied, setCopied] = useState(false);

  const getTextSizeClass = () => {
    switch (fontSize) {
      case 'sm': return 'text-sm sm:text-base';
      case 'lg': return 'text-xl sm:text-2xl';
      case 'md':
      default:
        return 'text-base sm:text-lg';
    }
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!transformedText) return;

    navigator.clipboard.writeText(transformedText);
    setCopied(true);
    onCopiedToHistory(transformedText, name);

    // Celebratory confetti with blue, purple, and white tones
    try {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      import('canvas-confetti').then((module) => {
        const confetti = module.default;
        confetti({
          particleCount: 18,
          spread: 50,
          startVelocity: 18,
          ticks: 55,
          origin: { x, y },
          colors: ['#3b82f6', '#8b5cf6', '#a855f7', '#6366f1', '#ffffff'],
          disableForReducedMotion: true,
        });
      }).catch(() => {});
    } catch {
      // safe fallback
    }

    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Şekilli Yazı',
          text: transformedText,
        });
      } catch {
        // Ignored
      }
    } else {
      navigator.clipboard.writeText(transformedText);
      onCopiedToHistory(transformedText, name);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const charLength = Array.from(transformedText).length;

  if (viewMode === 'list') {
    return (
      <div className="group relative bg-[#10172e]/85 hover:bg-[#131d3b] border border-indigo-900/50 hover:border-indigo-500/70 rounded-xl p-3.5 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md shadow-indigo-950/20">
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 text-xs mb-1">
            <span className="font-bold text-white">{name}</span>
            <span aria-hidden="true" className="text-indigo-800">·</span>
            <span className="text-indigo-400 text-[11px]">{categoryLabel}</span>
            <span aria-hidden="true" className="text-indigo-800">·</span>
            <span className="text-slate-500 text-[11px] font-mono">{charLength} krk</span>
          </div>
          <div 
            onClick={handleCopy}
            title="Kopyala"
            className={`font-sans tracking-wide text-white select-all break-all cursor-pointer py-1 font-medium ${getTextSizeClass()}`}
          >
            {transformedText}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
          <button
            onClick={() => onOpenQR(transformedText, name)}
            title="QR Kod Üret"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-indigo-950 transition-colors"
          >
            <QrCode className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onPreview(transformedText, name)}
            title="Canlı Sosyal Önizleme"
            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-300 hover:bg-indigo-950 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggleFavorite(id)}
            title={isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
            className={`p-1.5 rounded-lg transition-colors ${
              isFavorite
                ? 'text-amber-400 bg-amber-400/10'
                : 'text-slate-400 hover:text-amber-400 hover:bg-indigo-950'
            }`}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
          </button>
          <button
            onClick={handleCopy}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-md ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-indigo-600/30'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-[#10172e]/80 hover:bg-[#131d3b] border border-indigo-900/50 hover:border-indigo-500/60 rounded-xl p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between shadow-lg shadow-indigo-950/20 hover:shadow-indigo-900/30 backdrop-blur-md">
      {/* Top row: Name & Category metadata */}
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-white">{name}</span>
          <span aria-hidden="true" className="text-indigo-800">·</span>
          <span className="text-indigo-300/70 font-medium">{categoryLabel}</span>
        </div>

        {/* Action icons: QR, Preview & Favorite */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onOpenQR(transformedText, name)}
            title="QR Kod Oluştur"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-indigo-950 transition-colors"
          >
            <QrCode className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onPreview(transformedText, name)}
            title="Instagram / Discord / WhatsApp üzerinde canlı önizle"
            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-300 hover:bg-blue-950/60 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggleFavorite(id)}
            title={isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
            className={`p-1.5 rounded-lg transition-colors ${
              isFavorite
                ? 'text-amber-400 bg-amber-400/10'
                : 'text-slate-400 hover:text-amber-400 hover:bg-indigo-950/60'
            }`}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Transformed Text Display */}
      <div 
        onClick={handleCopy}
        title="Kopyalamak için tıkla"
        className="my-2 p-3.5 min-h-[58px] rounded-xl bg-[#0a0e1c]/90 hover:bg-[#080b17] border border-indigo-950/80 cursor-pointer transition-all flex items-center justify-between group-hover:border-indigo-800/80"
      >
        <div className={`text-white font-sans tracking-wide break-all select-all font-medium ${getTextSizeClass()}`}>
          {transformedText || <span className="text-slate-600 italic">Metin bekleniyor...</span>}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-2 pt-2 border-t border-indigo-950 flex items-center justify-between gap-2">
        <div className="text-[11px] text-indigo-300/60 font-mono tabular-nums">
          {charLength} krk
          {charLength > 30 && (
            <span className="ml-1 text-purple-400" title="Bazı oyun nicklerinde karakter sınırı vardır">
              (Uzun)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Share button */}
          <button
            onClick={handleShare}
            title="Paylaş veya Kopyala"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-indigo-950 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          {/* Social preview button */}
          <button
            onClick={() => onPreview(transformedText, name)}
            title="Profilde Gör"
            className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs text-indigo-300 hover:text-white hover:bg-indigo-950 rounded transition-colors font-medium"
          >
            <Smartphone className="w-3 h-3 text-indigo-400" />
            <span>Önizle</span>
          </button>

          {/* Primary Copy Button with blue & purple gradient and white text */}
          <button
            onClick={handleCopy}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-md ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/30 active:scale-95'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export const FontCard = React.memo(FontCardComponent);
