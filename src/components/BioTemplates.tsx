import React, { useState } from 'react';
import { Copy, Check, Sparkles, Eye, QrCode, Sliders } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BIO_TEMPLATES, BioTemplate } from '../utils/bioTemplatesData';

interface BioTemplatesProps {
  onPreview: (text: string, title: string) => void;
  onOpenQR: (text: string) => void;
}

export const BioTemplates: React.FC<BioTemplatesProps> = ({ onPreview, onOpenQR }) => {
  const [userName, setUserName] = useState<string>('Alex');
  const [userCity, setUserCity] = useState<string>('İstanbul');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getCustomizedBio = (template: string) => {
    return template
      .replace(/{NAME}/g, userName || 'İsim')
      .replace(/{CITY}/g, userCity || 'Şehir');
  };

  const handleCopyBio = (id: string, text: string, e: React.MouseEvent) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);

    try {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      confetti({
        particleCount: 20,
        spread: 55,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#ffffff'],
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredTemplates = selectedCategory === 'all'
    ? BIO_TEMPLATES
    : BIO_TEMPLATES.filter(b => b.category === selectedCategory);

  return (
    <div className="w-full bg-[#10172e]/90 border border-indigo-900/60 rounded-2xl p-5 sm:p-7 shadow-2xl shadow-indigo-950/50 mb-10 backdrop-blur-xl">
      {/* Header and customizer inputs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-indigo-950">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>Hazır Sosyal Medya & Biyografi Şablonları</span>
          </h2>
          <p className="text-sm text-indigo-200/70 mt-1">
            Instagram, TikTok ve Discord için profesyonelce hazırlanmış, çok satırlı estetik biyo tasarımları.
          </p>
        </div>

        {/* Dynamic variable inputs */}
        <div className="flex flex-wrap items-center gap-3 bg-[#0a0e1c] p-2.5 rounded-xl border border-indigo-900/80">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            <span>Kişiselleştir:</span>
          </div>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="İsminiz..."
            className="w-28 sm:w-32 bg-[#121933] border border-indigo-800 rounded-lg px-2.5 py-1 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-400 font-medium"
          />
          <input
            type="text"
            value={userCity}
            onChange={(e) => setUserCity(e.target.value)}
            placeholder="Şehriniz..."
            className="w-28 sm:w-32 bg-[#121933] border border-indigo-800 rounded-lg px-2.5 py-1 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-400 font-medium"
          />
        </div>
      </div>

      {/* Category selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-indigo-950/60'
          }`}
        >
          Tüm Şablonlar ({BIO_TEMPLATES.length})
        </button>
        <button
          onClick={() => setSelectedCategory('aesthetic')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
            selectedCategory === 'aesthetic'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-indigo-950/60'
          }`}
        >
          Estetik & Soft
        </button>
        <button
          onClick={() => setSelectedCategory('gaming')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
            selectedCategory === 'gaming'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-indigo-950/60'
          }`}
        >
          Oyun & Klan
        </button>
        <button
          onClick={() => setSelectedCategory('minimal')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
            selectedCategory === 'minimal'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-indigo-950/60'
          }`}
        >
          Minimal & İş
        </button>
        <button
          onClick={() => setSelectedCategory('quote')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
            selectedCategory === 'quote'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-indigo-950/60'
          }`}
        >
          Müzik & Alıntılar
        </button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTemplates.map((item: BioTemplate) => {
          const filledBio = getCustomizedBio(item.template);
          const isCopied = copiedId === item.id;
          const charLen = filledBio.length;

          return (
            <div
              key={item.id}
              className="bg-[#0a0e1c] border border-indigo-900/60 hover:border-indigo-500/70 rounded-2xl p-5 flex flex-col justify-between shadow-lg shadow-indigo-950/30 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[11px] text-indigo-400 font-medium">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Preformatted Bio Display */}
                <div className="bg-[#060812] border border-indigo-950 rounded-xl p-4 font-sans text-xs text-slate-200 whitespace-pre-wrap leading-relaxed select-all">
                  {filledBio}
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-4 pt-3 border-t border-indigo-950 flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-slate-500">
                  {charLen} krk {charLen > 150 ? <span className="text-amber-500">(150+ krk)</span> : ''}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onOpenQR(filledBio)}
                    title="QR Kod Oluştur"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-indigo-950 transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onPreview(filledBio, item.title)}
                    title="Instagram / Discord'da Gör"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-300 hover:bg-indigo-950 transition-colors flex items-center gap-1 text-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleCopyBio(item.id, filledBio, e)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                      isCopied
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-md shadow-indigo-600/30'
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Kopyalandı' : 'Biyoyu Al'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
