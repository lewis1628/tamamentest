import React, { useEffect } from 'react';
import { Home, Compass, Sparkles, Gamepad2, Palette, Box, ArrowRight } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
  onSelectTab?: (tab: 'fonts' | 'bios' | 'builder' | 'symbols') => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate, onSelectTab }) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = '404 - Sayfa Bulunamadı | Şekilli Yazı';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  const handleGoTab = (tab: 'fonts' | 'bios' | 'builder' | 'symbols') => {
    onNavigate('/');
    if (onSelectTab) {
      onSelectTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans relative overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header mini bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-4 sm:px-8 py-4 relative z-10 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
            Ş
          </div>
          <span className="font-bold text-lg text-white">
            Şekilli<span className="text-blue-400">Yaz</span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-colors cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Ana Sayfa</span>
        </button>
      </header>

      {/* Main 404 Hero */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 relative z-10">
        <div className="max-w-2xl w-full text-center">
          {/* Animated 404 Visual badge */}
          <div className="relative inline-block mb-4">
            <span className="text-8xl sm:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-indigo-300 via-indigo-600 to-slate-900 select-none opacity-90 drop-shadow-2xl">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-xs sm:text-sm font-semibold text-indigo-300 flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
                <Compass className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Sayfa Bulunamadı</span>
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Aradığınız Sayfa Yolunu Şaşırmış Olabilir
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
            Girdiğiniz adres taşınmış, silinmiş veya hatalı yazılmış olabilir. Aşağıdaki hızlı butonlarla en popüler araçlarımıza hemen ulaşabilirsiniz.
          </p>

          {/* Primary Action Button */}
          <div className="mb-10">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-base shadow-lg shadow-indigo-600/30 transition-all cursor-pointer hover:shadow-indigo-500/50 active:scale-95"
            >
              <Home className="w-5 h-5" />
              <span>Ana Sayfaya Dön & Şekilli Yaz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto text-left">
            <button
              type="button"
              onClick={() => handleGoTab('fonts')}
              className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 transition-all flex items-center gap-3.5 group cursor-pointer"
            >
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                  Şekilli Yazı Tipleri
                </div>
                <div className="text-xs text-slate-400">
                  100+ farklı hazır font stili
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleGoTab('builder')}
              className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 transition-all flex items-center gap-3.5 group cursor-pointer"
            >
              <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                  Nick Oluşturucu
                </div>
                <div className="text-xs text-slate-400">
                  PUBG, Valorant & CS oyun nickleri
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleGoTab('bios')}
              className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 transition-all flex items-center gap-3.5 group cursor-pointer"
            >
              <div className="p-2.5 rounded-lg bg-pink-500/10 text-pink-400 group-hover:scale-110 transition-transform">
                <Palette className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors">
                  Instagram Biyo Sözleri
                </div>
                <div className="text-xs text-slate-400">
                  Estetik ve havalı hazır profiller
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleGoTab('symbols')}
              className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 transition-all flex items-center gap-3.5 group cursor-pointer"
            >
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                <Box className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Özel Semboller
                </div>
                <div className="text-xs text-slate-400">
                  Klan simgeleri, kalpler ve oklar
                </div>
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-4 px-4 text-center text-xs text-slate-500 relative z-10">
        © {new Date().getFullYear()} SekilliYaz.com.tr — Tüm hakları saklıdır.
      </footer>
    </div>
  );
};
