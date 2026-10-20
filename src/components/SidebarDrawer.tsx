import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  TrendingUp, 
  Gamepad2, 
  Palette, 
  Box, 
  Zap, 
  Layers, 
  Bookmark, 
  History, 
  Search, 
  ShieldCheck, 
  FileText, 
  Scale, 
  Copy, 
  Check, 
  ChevronRight,
  CaseUpper,
  CaseLower,
  ArrowLeftRight,
  Binary,
  Radio
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'fonts' | 'bios' | 'builder' | 'symbols' | 'favorites';
  setActiveTab: (tab: 'fonts' | 'bios' | 'builder' | 'symbols' | 'favorites') => void;
  selectedCategory: 'all' | 'popular' | 'nick' | 'aesthetic' | 'boxed' | 'special';
  setSelectedCategory: (cat: 'all' | 'popular' | 'nick' | 'aesthetic' | 'boxed' | 'special') => void;
  favoritesCount: number;
  historyCount: number;
  onOpenHistory: () => void;
  onOpenCommandPalette: () => void;
  onOpenExport: () => void;
  onOpenLegal: (tab: 'disclaimer' | 'privacy' | 'terms') => void;
  onQuickTransform: (type: 'upper' | 'lower' | 'clean' | 'reverse' | 'binary' | 'morse') => void;
  totalFontsCount: number;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
  favoritesCount,
  historyCount,
  onOpenHistory,
  onOpenCommandPalette,
  onOpenLegal,
  onQuickTransform,
  totalFontsCount
}) => {
  const [copiedBlank, setCopiedBlank] = useState(false);

  // Invisible space character (U+3164 Hangul Filler) - universal for PUBG, Brawl Stars, Instagram, etc.
  const handleCopyBlankSpace = () => {
    const blankChar = '\u3164';
    navigator.clipboard.writeText(blankChar);
    setCopiedBlank(true);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.3, x: 0.2 },
      colors: ['#3b82f6', '#8b5cf6', '#ffffff']
    });
    setTimeout(() => setCopiedBlank(false), 2000);
  };

  const handleSelectCategory = (cat: 'all' | 'popular' | 'nick' | 'aesthetic' | 'boxed' | 'special') => {
    setActiveTab('fonts');
    setSelectedCategory(cat);
    onClose();
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleSelectTab = (tab: 'fonts' | 'bios' | 'builder' | 'symbols' | 'favorites') => {
    setActiveTab(tab);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer content */}
      <aside 
        className="relative w-80 max-w-[85vw] bg-[#0c1124] border-r border-indigo-900/60 shadow-2xl flex flex-col h-full z-10 animate-slideRight"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-indigo-950/90 bg-[#090d1c] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-extrabold text-lg text-white">
                Nick<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">ora</span>
              </span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/40 font-mono">
                PRO
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-indigo-950 transition-colors"
            title="Menüyü Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Nav Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-5 text-xs">
          
          {/* Quick Action: Boşluk Kopyala (Invisible Space) */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-950/50 via-indigo-950/50 to-purple-950/50 border border-indigo-800/60 shadow-inner">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-white text-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                Boşluk Kopyala
              </span>
              <span className="text-[10px] text-indigo-300 font-mono">U+3164</span>
            </div>
            <p className="text-[11px] text-slate-300 mb-2.5 leading-relaxed">
              PUBG, Brawl Stars, Valorant ve Instagram için görünmez boşluk karakteri.
            </p>
            <button
              onClick={handleCopyBlankSpace}
              className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md ${
                copiedBlank
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-indigo-600/30'
              }`}
            >
              {copiedBlank ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Boşluk Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Görünmez Boşluğu Kopyala</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Tools Grid */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { onClose(); onOpenCommandPalette(); }}
              className="p-2.5 rounded-lg bg-[#11172f] hover:bg-[#182142] border border-indigo-900/50 text-slate-300 hover:text-white flex items-center gap-2 transition-all text-[11px] font-medium"
            >
              <Search className="w-3.5 h-3.5 text-blue-400" />
              <div className="text-left">
                <div className="font-bold text-white">Hızlı Ara</div>
                <div className="text-[10px] text-slate-400">Ctrl + K</div>
              </div>
            </button>

            <button
              onClick={() => { onClose(); onOpenHistory(); }}
              className="p-2.5 rounded-lg bg-[#11172f] hover:bg-[#182142] border border-indigo-900/50 text-slate-300 hover:text-white flex items-center gap-2 transition-all text-[11px] font-medium"
            >
              <History className="w-3.5 h-3.5 text-purple-400" />
              <div className="text-left">
                <div className="font-bold text-white">Pano Geçmişi</div>
                <div className="text-[10px] text-slate-400">{historyCount} kayıt</div>
              </div>
            </button>
          </div>

          {/* Navigation Section 1: Yazı Stilleri (Categories) */}
          <div>
            <div className="px-2 mb-2 text-[11px] font-bold tracking-wider uppercase text-indigo-300/80">
              Yazı Stilleri & Kategoriler
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleSelectCategory('all')}
                className={`w-full px-3 py-2 rounded-lg text-left font-medium transition-all flex items-center justify-between ${
                  activeTab === 'fonts' && selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-indigo-500/60 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-indigo-950/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>Tüm Yazı Stilleri</span>
                </span>
                <span className="text-[10px] font-mono text-indigo-300 px-1.5 py-0.5 rounded bg-indigo-950/80">
                  {totalFontsCount}
                </span>
              </button>

              <button
                onClick={() => handleSelectCategory('popular')}
                className={`w-full px-3 py-2 rounded-lg text-left font-medium transition-all flex items-center justify-between ${
                  activeTab === 'fonts' && selectedCategory === 'popular'
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-indigo-500/60 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-indigo-950/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-300" />
                  <span>Popüler & Klasik</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => handleSelectCategory('nick')}
                className={`w-full px-3 py-2 rounded-lg text-left font-medium transition-all flex items-center justify-between ${
                  activeTab === 'fonts' && selectedCategory === 'nick'
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-indigo-500/60 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-indigo-950/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-indigo-400" />
                  <span>Oyun & Klan Nickleri</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => handleSelectCategory('aesthetic')}
                className={`w-full px-3 py-2 rounded-lg text-left font-medium transition-all flex items-center justify-between ${
                  activeTab === 'fonts' && selectedCategory === 'aesthetic'
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-indigo-500/60 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-indigo-950/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-pink-400" />
                  <span>Estetik & El Yazısı</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => handleSelectCategory('boxed')}
                className={`w-full px-3 py-2 rounded-lg text-left font-medium transition-all flex items-center justify-between ${
                  activeTab === 'fonts' && selectedCategory === 'boxed'
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-indigo-500/60 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-indigo-950/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Box className="w-4 h-4 text-purple-400" />
                  <span>Kutulu & Çerçeveli</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => handleSelectCategory('special')}
                className={`w-full px-3 py-2 rounded-lg text-left font-medium transition-all flex items-center justify-between ${
                  activeTab === 'fonts' && selectedCategory === 'special'
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-indigo-500/60 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-indigo-950/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Zalgo & Özel Efektler</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Navigation Section 2: Stüdyo Araçları */}
          <div>
            <div className="px-2 mb-2 text-[11px] font-bold tracking-wider uppercase text-indigo-300/80">
              Stüdyo Araçları & Modüller
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleSelectTab('bios')}
                className={`w-full px-3 py-2 rounded-lg text-left font-medium transition-all flex items-center justify-between ${
                  activeTab === 'bios'
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-indigo-500/60 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-indigo-950/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-pink-400" />
                  <span>Biyo Şablonları (Instagram)</span>
                </span>
                <span className="text-[10px] text-pink-400 font-bold">Yeni</span>
              </button>

              <button
                onClick={() => handleSelectTab('builder')}
                className={`w-full px-3 py-2 rounded-lg text-left font-medium transition-all flex items-center justify-between ${
                  activeTab === 'builder'
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-indigo-500/60 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-indigo-950/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-emerald-400" />
                  <span>Nick & Klan Tasarlayıcı</span>
                </span>
              </button>

              <button
                onClick={() => handleSelectTab('symbols')}
                className={`w-full px-3 py-2 rounded-lg text-left font-medium transition-all flex items-center justify-between ${
                  activeTab === 'symbols'
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-indigo-500/60 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-indigo-950/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Sembol & Kaomoji</span>
                </span>
              </button>

              <button
                onClick={() => handleSelectTab('favorites')}
                className={`w-full px-3 py-2 rounded-lg text-left font-medium transition-all flex items-center justify-between ${
                  activeTab === 'favorites'
                    ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border border-purple-500/60 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-indigo-950/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-amber-400" />
                  <span>Favorilerim</span>
                </span>
                {favoritesCount > 0 && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300">
                    {favoritesCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Section 3: Hızlı Metin Efektleri */}
          <div>
            <div className="px-2 mb-2 text-[11px] font-bold tracking-wider uppercase text-indigo-300/80">
              Hızlı Metin Efektleri
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => { onQuickTransform('upper'); onClose(); }}
                className="px-2.5 py-1.5 rounded-lg bg-[#11172f] hover:bg-[#182142] text-slate-300 hover:text-white border border-indigo-950 flex items-center gap-1.5 text-[11px]"
              >
                <CaseUpper className="w-3.5 h-3.5 text-blue-400" />
                <span>BÜYÜK</span>
              </button>

              <button
                onClick={() => { onQuickTransform('lower'); onClose(); }}
                className="px-2.5 py-1.5 rounded-lg bg-[#11172f] hover:bg-[#182142] text-slate-300 hover:text-white border border-indigo-950 flex items-center gap-1.5 text-[11px]"
              >
                <CaseLower className="w-3.5 h-3.5 text-indigo-400" />
                <span>küçük</span>
              </button>

              <button
                onClick={() => { onQuickTransform('reverse'); onClose(); }}
                className="px-2.5 py-1.5 rounded-lg bg-[#11172f] hover:bg-[#182142] text-slate-300 hover:text-white border border-indigo-950 flex items-center gap-1.5 text-[11px]"
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-purple-400" />
                <span>Ters Yazı</span>
              </button>

              <button
                onClick={() => { onQuickTransform('binary'); onClose(); }}
                className="px-2.5 py-1.5 rounded-lg bg-[#11172f] hover:bg-[#182142] text-slate-300 hover:text-white border border-indigo-950 flex items-center gap-1.5 text-[11px]"
              >
                <Binary className="w-3.5 h-3.5 text-cyan-400" />
                <span>Binary (010)</span>
              </button>

              <button
                onClick={() => { onQuickTransform('morse'); onClose(); }}
                className="col-span-2 px-2.5 py-1.5 rounded-lg bg-[#11172f] hover:bg-[#182142] text-slate-300 hover:text-white border border-indigo-950 flex items-center justify-center gap-1.5 text-[11px]"
              >
                <Radio className="w-3.5 h-3.5 text-pink-400" />
                <span>Mors Alfabesi (• - -)</span>
              </button>
            </div>
          </div>

          {/* Navigation Section 4: Yasal Uyarılar & Sözleşmeler */}
          <div className="pt-2 border-t border-indigo-950">
            <div className="px-2 mb-2 text-[11px] font-bold tracking-wider uppercase text-indigo-300/80">
              Yasal & Kurallar
            </div>
            <div className="space-y-1">
              <button
                onClick={() => { onClose(); onOpenLegal('disclaimer'); }}
                className="w-full px-3 py-1.5 rounded-lg text-left text-slate-400 hover:text-white hover:bg-indigo-950/50 flex items-center gap-2 text-[11px]"
              >
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>Yasal Uyarı & Sorumluluk Reddi</span>
              </button>

              <button
                onClick={() => { onClose(); onOpenLegal('privacy'); }}
                className="w-full px-3 py-1.5 rounded-lg text-left text-slate-400 hover:text-white hover:bg-indigo-950/50 flex items-center gap-2 text-[11px]"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Gizlilik Politikası (KVKK)</span>
              </button>

              <button
                onClick={() => { onClose(); onOpenLegal('terms'); }}
                className="w-full px-3 py-1.5 rounded-lg text-left text-slate-400 hover:text-white hover:bg-indigo-950/50 flex items-center gap-2 text-[11px]"
              >
                <FileText className="w-3.5 h-3.5 text-purple-400" />
                <span>Kullanım Koşulları</span>
              </button>
            </div>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-[#090d1c] border-t border-indigo-950 text-[10px] text-slate-400 flex items-center justify-between shrink-0">
          <span className="font-medium text-slate-300">Nickora PRO</span>
        </div>
      </aside>
    </div>
  );
};
