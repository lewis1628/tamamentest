import React, { useState } from 'react';
import { X, Copy, Check, Trash2, Clock, Search } from 'lucide-react';

export interface HistoryItem {
  id: string;
  text: string;
  fontName?: string;
  copiedAt: string;
}

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onClearHistory: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onClearHistory,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const handleCopy = (item: HistoryItem) => {
    navigator.clipboard.writeText(item.text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filtered = history.filter(h => 
    h.text.toLowerCase().includes(search.toLowerCase()) || 
    (h.fontName && h.fontName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-[#0f152b] border border-indigo-900/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-indigo-950 bg-[#0c1122]">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="font-bold text-white text-base">Pano Geçmişi</h3>
              <p className="text-xs text-indigo-300/70">Son kopyaladığınız şekilli yazılar ve nickler</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-indigo-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search bar & Actions */}
        <div className="p-3 bg-[#0a0e1c] border-b border-indigo-950 flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-indigo-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Geçmişte ara..."
              className="w-full bg-[#121933] border border-indigo-900/70 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-400"
            />
          </div>
          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              title="Geçmişi temizle"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors flex items-center gap-1 text-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Temizle</span>
            </button>
          )}
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              {history.length === 0 ? 'Henüz kopyalanmış bir metin yok.' : 'Aramaya uygun geçmiş bulunamadı.'}
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-[#0a0e1c] border border-indigo-950 hover:border-indigo-700/60 rounded-xl flex items-center justify-between gap-3 group transition-all"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-white truncate font-sans">
                    {item.text}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1 font-mono">
                    {item.fontName && <span className="text-indigo-400">{item.fontName}</span>}
                    <span>·</span>
                    <span>{item.copiedAt}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(item)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
                    copiedId === item.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-indigo-900/60 hover:bg-indigo-900 border border-indigo-800 text-white'
                  }`}
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === item.id ? 'Alındı' : 'Kopyala'}</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0c1122] border-t border-indigo-950 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-indigo-950 text-white rounded-lg hover:bg-indigo-900 transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
