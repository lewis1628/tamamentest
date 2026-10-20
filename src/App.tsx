import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  Star, 
  TrendingUp, 
  Gamepad2, 
  Palette, 
  Box, 
  Zap,
  Bookmark,
  Copy,
  Layers
} from 'lucide-react';
import { Header } from './components/Header';
import { TextInputArea } from './components/TextInputArea';
import { FontCard } from './components/FontCard';
import { NickBuilder } from './components/NickBuilder';
import { SymbolPicker } from './components/SymbolPicker';
import { BioTemplates } from './components/BioTemplates';
import { SocialPreviewModal } from './components/SocialPreviewModal';
import { QRCodeModal } from './components/QRCodeModal';
import { HistoryModal, HistoryItem } from './components/HistoryModal';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { BulkExportModal } from './components/BulkExportModal';
import { KVKKModal } from './components/KVKKModal';
import { FONT_STYLES, FontStyleItem, toBinary, toMorse } from './utils/textTransformers';

type CategoryFilter = 'all' | 'popular' | 'nick' | 'aesthetic' | 'boxed' | 'special';
type SortOption = 'default' | 'alpha-asc' | 'length-desc';

export default function App() {
  const [activeTab, setActiveTab] = useState<'fonts' | 'bios' | 'builder' | 'symbols' | 'favorites'>('fonts');
  const [inputText, setInputText] = useState<string>('Şekilli Yazı');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');

  // Modals state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isKVKKOpen, setIsKVKKOpen] = useState(false);

  // Favorites state with localStorage - starts completely empty by default
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fancy_text_favorites');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      // Clean up previous 4 hardcoded defaults if still present
      const oldDefaults = ['bold-serif', 'script-cursive', 'nick-wings-mythic', 'small-caps'];
      if (Array.isArray(parsed) && parsed.length === 4 && parsed.every((id, idx) => id === oldDefaults[idx])) {
        localStorage.removeItem('fancy_text_favorites');
        return [];
      }
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // History state with localStorage
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('fancy_text_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Social Preview Modal state
  const [previewModal, setPreviewModal] = useState<{ isOpen: boolean; text: string; fontName: string }>({
    isOpen: false,
    text: '',
    fontName: '',
  });

  // QR Code Modal state
  const [qrModal, setQrModal] = useState<{ isOpen: boolean; text: string; title: string }>({
    isOpen: false,
    text: '',
    title: '',
  });

  useEffect(() => {
    try {
      localStorage.setItem('fancy_text_favorites', JSON.stringify(favorites));
    } catch {
      // safe fallback
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('fancy_text_history', JSON.stringify(history));
    } catch {
      // safe fallback
    }
  }, [history]);

  // Global keyboard shortcut: Ctrl+K / Cmd+K to open Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCopiedToHistory = (text: string, fontName: string) => {
    const newItem: HistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      text,
      fontName,
      copiedAt: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    };

    setHistory(prev => {
      const filtered = prev.filter(item => item.text !== text);
      return [newItem, ...filtered].slice(0, 30);
    });
  };

  const handleClear = () => {
    setInputText('');
  };

  const handleInsertSymbol = (sym: string) => {
    setInputText(prev => prev + sym);
  };

  const handleOpenPreview = (text: string, fontName: string) => {
    setPreviewModal({
      isOpen: true,
      text,
      fontName,
    });
  };

  const handleOpenQR = (text: string, title = 'Şekilli Yazı QR Kodu') => {
    setQrModal({
      isOpen: true,
      text,
      title,
    });
  };

  const handleCycleFontSize = () => {
    if (fontSize === 'sm') setFontSize('md');
    else if (fontSize === 'md') setFontSize('lg');
    else setFontSize('sm');
  };

  const handleQuickTransform = (type: 'upper' | 'lower' | 'clean' | 'reverse' | 'binary' | 'morse') => {
    if (!inputText) return;
    if (type === 'upper') {
      setInputText(inputText.toLocaleUpperCase('tr-TR'));
    } else if (type === 'lower') {
      setInputText(inputText.toLocaleLowerCase('tr-TR'));
    } else if (type === 'clean') {
      setInputText(inputText.replace(/[ \t]+/g, ' ').trim());
    } else if (type === 'reverse') {
      setInputText(inputText.split('').reverse().join(''));
    } else if (type === 'binary') {
      setInputText(toBinary(inputText));
    } else if (type === 'morse') {
      setInputText(toMorse(inputText));
    }
  };

  const filteredFonts = useMemo(() => {
    let list = FONT_STYLES.filter((style: FontStyleItem) => {
      if (activeTab === 'favorites') {
        if (!favorites.includes(style.id)) return false;
      } else if (selectedCategory !== 'all' && style.category !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = style.name.toLowerCase().includes(q);
        const matchesCategory = style.categoryLabel.toLowerCase().includes(q);
        return matchesName || matchesCategory;
      }

      return true;
    });

    if (sortOption === 'alpha-asc') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'tr-TR'));
    } else if (sortOption === 'length-desc') {
      list = [...list].sort((a, b) => {
        const textA = a.transform(inputText || 'Test');
        const textB = b.transform(inputText || 'Test');
        return Array.from(textB).length - Array.from(textA).length;
      });
    }

    return list;
  }, [selectedCategory, searchQuery, activeTab, favorites, sortOption, inputText]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      {/* Background ambient glowing orbs in blue and purple */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-radial-gradient pointer-events-none" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Upgraded Professional Studio Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favorites.length}
        historyCount={history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onClear={handleClear}
        hasText={inputText.length > 0}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(prev => prev === 'grid' ? 'list' : 'grid')}
        fontSize={fontSize}
        onCycleFontSize={handleCycleFontSize}
        onQuickTransform={handleQuickTransform}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 relative z-10">
        {/* Hero Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-800/60 text-xs text-indigo-300 font-semibold mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Profesyonel Metin Biçimlendirme & Nick Stüdyosu</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3 text-balance drop-shadow-sm">
            Şekilli Yazı Yazma &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              Süslü Font Oluşturucu
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 text-balance leading-relaxed">
            Metinlerinizi evrensel Unicode yazı tiplerine, klan sembollerine ve estetik biyo şablonlarına dönüştürün. Tek tıkla kopyalayın, tüm platformlarda sorunsuz kullanın.
          </p>
        </div>

        {/* Text Input Area */}
        <TextInputArea
          text={inputText}
          onChange={setInputText}
          onClear={handleClear}
        />

        {/* View Switcher based on activeTab */}
        {activeTab === 'bios' ? (
          <BioTemplates
            onPreview={handleOpenPreview}
            onOpenQR={handleOpenQR}
          />
        ) : activeTab === 'builder' ? (
          <NickBuilder
            baseText={inputText}
            onPreview={handleOpenPreview}
          />
        ) : activeTab === 'symbols' ? (
          <SymbolPicker
            onInsertSymbol={handleInsertSymbol}
          />
        ) : (
          /* Font List View (Fonts or Favorites) */
          <div>
            {/* Filter and Control Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              {/* Category Segmented Controls */}
              <div className="flex items-center gap-1.5 p-1.5 bg-[#10172e]/90 border border-indigo-900/60 rounded-xl overflow-x-auto shadow-md">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-indigo-950/60'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tüm Fontlar ({FONT_STYLES.length})</span>
                </button>
                <button
                  onClick={() => setSelectedCategory('popular')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    selectedCategory === 'popular'
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-indigo-950/60'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 text-blue-300" />
                  <span>Popüler & Klasik</span>
                </button>
                <button
                  onClick={() => setSelectedCategory('nick')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    selectedCategory === 'nick'
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-indigo-950/60'
                  }`}
                >
                  <Gamepad2 className="w-3.5 h-3.5 text-indigo-300" />
                  <span>Oyun & Nick</span>
                </button>
                <button
                  onClick={() => setSelectedCategory('aesthetic')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    selectedCategory === 'aesthetic'
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-indigo-950/60'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5 text-pink-300" />
                  <span>Estetik & Bio</span>
                </button>
                <button
                  onClick={() => setSelectedCategory('boxed')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    selectedCategory === 'boxed'
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-indigo-950/60'
                  }`}
                >
                  <Box className="w-3.5 h-3.5 text-purple-300" />
                  <span>Kutulu & Bubble</span>
                </button>
                <button
                  onClick={() => setSelectedCategory('special')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    selectedCategory === 'special'
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-indigo-950/60'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Zalgo & Özel</span>
                </button>
              </div>

              {/* Search & Sort Controls */}
              <div className="flex items-center gap-2">
                {/* Sort dropdown */}
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="bg-[#10172e] border border-indigo-900/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-400 font-semibold cursor-pointer"
                  >
                    <option value="default">Önerilen Sıralama</option>
                    <option value="alpha-asc">Alfabetik (A-Z)</option>
                    <option value="length-desc">Karakter Uzunluğuna Göre</option>
                  </select>
                </div>

                {/* Search Box */}
                <div className="relative w-full sm:w-60">
                  <Search className="w-4 h-4 text-indigo-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Font ara (Gotik, Bubble, Zalgo...)"
                    className="w-full bg-[#10172e] border border-indigo-900/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-indigo-400 font-medium shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Favorites Tab Header Notice */}
            {activeTab === 'favorites' && (
              <div className="mb-6 p-4 bg-purple-950/30 border border-purple-800/50 rounded-xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2 text-sm text-purple-200">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">Favorilere eklediğiniz fontlar ({favorites.length} adet)</span>
                </div>
                {favorites.length > 0 && (
                  <button
                    onClick={() => setFavorites([])}
                    className="text-xs text-purple-300 hover:text-white underline font-medium"
                  >
                    Favorileri Sıfırla
                  </button>
                )}
              </div>
            )}

            {/* Result Grid or Dense List based on viewMode */}
            {filteredFonts.length === 0 ? (
              <div className="text-center py-16 bg-[#10172e]/60 border border-indigo-900/60 rounded-2xl p-8">
                {activeTab === 'favorites' ? (
                  <>
                    <Bookmark className="w-12 h-12 text-indigo-400/60 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-white mb-1">Henüz favori font eklemediniz</h3>
                    <p className="text-sm text-slate-300 mb-4">
                      Beğendiğiniz yazı stillerinin yanındaki yıldız ikonuna tıklayarak favorilerinize ekleyebilirsiniz.
                    </p>
                    <button
                      onClick={() => setActiveTab('fonts')}
                      className="px-5 py-2 text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 shadow-md shadow-indigo-600/30 transition-all"
                    >
                      Fontları Keşfet
                    </button>
                  </>
                ) : (
                  <>
                    <Search className="w-12 h-12 text-indigo-400/60 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-white mb-1">Sonuç Bulunamadı</h3>
                    <p className="text-sm text-slate-300 mb-4">
                      "{searchQuery}" aramasına uygun bir font stili bulunamadı.
                    </p>
                    <button
                      onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                      className="px-4 py-2 text-xs font-semibold bg-indigo-900/60 text-white rounded-lg hover:bg-indigo-900 border border-indigo-800 transition-colors"
                    >
                      Filtreleri Temizle
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-2.5"}>
                {filteredFonts.map((font) => (
                  <FontCard
                    key={font.id}
                    id={font.id}
                    name={font.name}
                    categoryLabel={font.categoryLabel}
                    transformedText={font.transform(inputText || 'Örnek')}
                    isFavorite={favorites.includes(font.id)}
                    onToggleFavorite={toggleFavorite}
                    onPreview={handleOpenPreview}
                    onOpenQR={handleOpenQR}
                    onCopiedToHistory={handleCopiedToHistory}
                    viewMode={viewMode}
                    fontSize={fontSize}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Feature Highlights Section */}
        <section className="mt-16 pt-12 border-t border-indigo-950">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#10172e]/70 border border-indigo-900/50 shadow-lg shadow-indigo-950/20 backdrop-blur-md">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mb-4">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Oyun & Klan Nickleri</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                PUBG Mobile, Brawl Stars, CS2, Valorant, Free Fire ve Roblox için şekilli klan adları ve havalı oyuncu nickleri oluşturun.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#10172e]/70 border border-indigo-900/50 shadow-lg shadow-indigo-950/20 backdrop-blur-md">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-500/20 to-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mb-4">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Instagram & TikTok Bio</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sosyal medya profillerinizde dikkat çeken estetik yazılar, kalın serifler, el yazısı biyografi sözleri ve süslü emojiler kullanın.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#10172e]/70 border border-indigo-900/50 shadow-lg shadow-indigo-950/20 backdrop-blur-md">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mb-4">
                <Copy className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Tek Tıkla Kopyala & Kullan</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Evrensel Unicode karakter kodlaması sayesinde ekstra font yüklemenize gerek kalmadan doğrudan WhatsApp, Discord ve Twitter'a yapıştırın.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#10172e]/50 border border-indigo-900/50 shadow-md">
          <h3 className="text-lg font-bold text-white mb-4">Sıkça Sorulan Sorular</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed">
            <div>
              <h4 className="text-sm font-bold text-white mb-1.5">Şekilli yazılar her telefonda ve oyunda görünür mü?</h4>
              <p>
                Evet! Üretilen tüm yazı stilleri evrensel Unicode karakter standartlarına uygundur. iOS, Android, Windows, Mac ve oyun platformlarında sorunsuz görünür.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1.5">Türkçe karakterler (ç, ğ, ı, ö, ş, ü) bozulur mu?</h4>
              <p>
                Gelişmiş akıllı karakter eşleştiricimiz Türkçe karakterleri destekler ve Unicode fontlarının desteklemediği durumlarda yazının bozulmaması için otomatik uyarlama yapar.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-indigo-950 bg-[#070b14] py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-slate-300 font-medium">© 2026 Nickora PRO Stüdyo</span>
            <span aria-hidden="true" className="text-indigo-800">·</span>
            <span>Tüm hakları saklıdır</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-indigo-300 font-mono text-[11px] tabular-nums">Unicode 15.1 Uyumlu</span>
            <span aria-hidden="true" className="text-indigo-800">·</span>
            <button
              onClick={() => setIsKVKKOpen(true)}
              className="text-indigo-300/90 hover:text-white transition-colors underline flex items-center gap-1 font-medium"
            >
              <span>KVKK & Gizlilik Politikası</span>
            </button>
            <span aria-hidden="true" className="text-indigo-800">·</span>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Yukarı Çık ↑
            </button>
          </div>
        </div>
      </footer>

      {/* Social & Gaming Live Preview Modal */}
      <SocialPreviewModal
        isOpen={previewModal.isOpen}
        onClose={() => setPreviewModal(prev => ({ ...prev, isOpen: false }))}
        previewText={previewModal.text}
        fontName={previewModal.fontName}
      />

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={qrModal.isOpen}
        onClose={() => setQrModal(prev => ({ ...prev, isOpen: false }))}
        text={qrModal.text}
        title={qrModal.title}
      />

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={() => setHistory([])}
      />

      {/* Spotlight Command Palette (Ctrl+K) */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        inputText={inputText}
        onSelectText={(text, title) => handleCopiedToHistory(text, title)}
      />

      {/* Bulk Export Modal */}
      <BulkExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        inputText={inputText}
      />

      {/* KVKK & Privacy Policy Modal */}
      <KVKKModal
        isOpen={isKVKKOpen}
        onClose={() => setIsKVKKOpen(false)}
      />
    </div>
  );
}
