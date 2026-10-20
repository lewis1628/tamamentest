import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { X, Download, Copy, Check, QrCode } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  title?: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  text,
  title = 'Nickora QR Kodu'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && canvasRef.current && text) {
      QRCode.toCanvas(canvasRef.current, text, {
        width: 240,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      }, (err) => {
        if (err) console.error(err);
      });
    }
  }, [isOpen, text]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `nickora-qr-${Date.now()}.png`;
    a.click();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-sm bg-[#0f152b] border border-indigo-900/80 rounded-2xl shadow-2xl p-6 text-center text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-indigo-950 mb-4">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-sm text-white">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-indigo-950 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Canvas container */}
        <div className="bg-white p-3 rounded-xl inline-block shadow-lg mx-auto mb-4">
          <canvas ref={canvasRef} className="rounded" />
        </div>

        {/* Text preview */}
        <div className="bg-[#080b14] border border-indigo-950 p-3 rounded-xl mb-4 text-xs text-slate-300 font-mono break-all max-h-20 overflow-y-auto">
          {text}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="flex-1 py-2 px-3 text-xs font-bold rounded-lg bg-indigo-900/70 hover:bg-indigo-900 border border-indigo-700/60 text-white flex items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            {downloaded ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
            <span>{downloaded ? 'İndirildi' : 'QR İndir'}</span>
          </button>
          <button
            onClick={handleCopyText}
            className="flex-1 py-2 px-3 text-xs font-bold rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-600/30"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Kopyalandı' : 'Yazıyı Kopyala'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
