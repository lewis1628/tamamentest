import React, { useState } from 'react';
import { X, Download, Copy, Check, FileText } from 'lucide-react';
import { FONT_STYLES } from '../utils/textTransformers';

interface BulkExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputText: string;
}

export const BulkExportModal: React.FC<BulkExportModalProps> = ({
  isOpen,
  onClose,
  inputText,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const textToConvert = inputText || 'Örnek Metin';

  // Generate complete formatted export text
  const exportPayload = FONT_STYLES.map((f, i) => {
    return `${i + 1}. [${f.name}]\n${f.transform(textToConvert)}\n`;
  }).join('\n');

  const handleCopyAll = () => {
    navigator.clipboard.writeText(exportPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([exportPayload], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nickora-yazilar-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-xl bg-[#0f152b] border border-indigo-900/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-indigo-950 bg-[#0c1122]">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="font-bold text-white text-base">Tüm Stilleri Toplu Dışa Aktar</h3>
              <p className="text-xs text-indigo-300/70">50+ farklı şekilli yazı stilini tek bir metin belgesinde alın</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-indigo-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Text Preview Area */}
        <div className="p-4 bg-[#0a0e1c] flex-1 overflow-y-auto">
          <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed select-all bg-[#070914] p-4 rounded-xl border border-indigo-950/80 max-h-72 overflow-y-auto">
            {exportPayload}
          </pre>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#0c1122] border-t border-indigo-950">
          <div className="text-xs text-slate-400 font-mono">
            Toplam {FONT_STYLES.length} yazı stili
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadFile}
              className="py-1.5 px-3.5 text-xs font-bold rounded-lg bg-indigo-950 hover:bg-indigo-900 border border-indigo-800 text-white flex items-center gap-1.5 transition-colors"
            >
              {downloaded ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloaded ? 'İndirildi' : '.TXT Olarak İndir'}</span>
            </button>
            <button
              onClick={handleCopyAll}
              className={`py-1.5 px-4 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-md ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-indigo-600/30'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tümü Kopyalandı!' : 'Tümünü Kopyala'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
