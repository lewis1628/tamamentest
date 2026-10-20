import React, { useState } from 'react';
import { X, Copy, Check, Instagram, MessageSquare, Gamepad2, CheckCheck } from 'lucide-react';

interface SocialPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  previewText: string;
  fontName: string;
}

export const SocialPreviewModal: React.FC<SocialPreviewModalProps> = ({
  isOpen,
  onClose,
  previewText,
  fontName,
}) => {
  const [activePlatform, setActivePlatform] = useState<'instagram' | 'discord' | 'whatsapp'>('instagram');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(previewText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-[#0f152b] border border-indigo-900/80 rounded-2xl shadow-2xl shadow-indigo-950 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-indigo-950 bg-[#0c1122]">
          <div>
            <h3 className="font-bold text-white text-base">Sosyal Medya & Oyun Önizleme</h3>
            <p className="text-xs text-indigo-300/70">Yazı stili: {fontName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-indigo-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex items-center justify-around border-b border-indigo-950 bg-[#090d1a] p-2">
          <button
            onClick={() => setActivePlatform('instagram')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activePlatform === 'instagram'
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-indigo-950/60'
            }`}
          >
            <Instagram className="w-4 h-4" />
            <span>Instagram Bio</span>
          </button>

          <button
            onClick={() => setActivePlatform('discord')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activePlatform === 'discord'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-indigo-950/60'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Discord & Oyun</span>
          </button>

          <button
            onClick={() => setActivePlatform('whatsapp')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activePlatform === 'whatsapp'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-indigo-950/60'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>
        </div>

        {/* Mockup Canvas */}
        <div className="p-6 bg-[#070a14] flex items-center justify-center min-h-[300px]">
          {activePlatform === 'instagram' && (
            <div className="w-full max-w-sm bg-black border border-neutral-800 rounded-2xl p-5 shadow-xl text-white">
              {/* Profile Top Stats */}
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px]">
                    <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center text-xl font-bold">
                      🔥
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-5 text-center text-xs">
                  <div>
                    <div className="font-bold text-sm">48</div>
                    <div className="text-neutral-400 text-[11px]">Gönderi</div>
                  </div>
                  <div>
                    <div className="font-bold text-sm">18.4K</div>
                    <div className="text-neutral-400 text-[11px]">Takipçi</div>
                  </div>
                  <div>
                    <div className="font-bold text-sm">342</div>
                    <div className="text-neutral-400 text-[11px]">Takip</div>
                  </div>
                </div>
              </div>

              {/* Bio Name & Bio Description */}
              <div className="space-y-1">
                <div className="font-bold text-sm text-neutral-100 break-words">
                  {previewText}
                </div>
                <div className="text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed">
                  Creator & Digital Explorer ✨<br />
                  🚀 Hayal et ve gerçekleştir<br />
                  📍 İstanbul / Turkey
                </div>
                <div className="text-xs text-sky-400 font-medium hover:underline pt-1">
                  linktr.ee/profilim
                </div>
              </div>

              {/* Follow / Message Buttons */}
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-1.5 text-xs font-semibold bg-neutral-800 rounded-lg text-white">
                  Profili Düzenle
                </button>
                <button className="flex-1 py-1.5 text-xs font-semibold bg-neutral-800 rounded-lg text-white">
                  Profili Paylaş
                </button>
              </div>
            </div>
          )}

          {activePlatform === 'discord' && (
            <div className="w-full max-w-sm bg-[#1e1f22] rounded-2xl overflow-hidden border border-[#2b2d31] shadow-xl text-white">
              <div className="h-20 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-500 relative"></div>
              <div className="px-4 pb-4 relative">
                <div className="relative -mt-10 mb-2 inline-block">
                  <div className="w-20 h-20 rounded-full bg-[#2b2d31] border-4 border-[#1e1f22] flex items-center justify-center text-2xl">
                    ⚡
                  </div>
                  <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#23a55a] border-4 border-[#1e1f22]" />
                </div>

                <div className="bg-[#111214] p-3 rounded-xl border border-[#2b2d31]">
                  <div className="text-lg font-bold text-white break-words">
                    {previewText}
                  </div>
                  <div className="text-xs text-neutral-400">@game_master_99</div>

                  <div className="h-px bg-neutral-800 my-2.5" />

                  <div className="text-xs uppercase font-bold text-neutral-400 tracking-wider mb-1">
                    Hakkımda
                  </div>
                  <div className="text-xs text-neutral-300">
                    Oyunlarda ve klanlarda bu şekilli nickle oynuyorum!
                  </div>

                  <div className="mt-3 flex items-center gap-1.5">
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-medium border border-indigo-500/30">
                      VIP PLAYER
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-medium border border-emerald-500/30">
                      CLAN LEADER
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePlatform === 'whatsapp' && (
            <div className="w-full max-w-sm bg-[#0b141a] rounded-2xl border border-neutral-800 p-4 shadow-xl text-white">
              <div className="flex items-center gap-3 pb-3 border-b border-neutral-800">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white">
                  👑
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Kanka</div>
                  <div className="text-[11px] text-emerald-400">çevrimiçi</div>
                </div>
              </div>

              <div className="py-6 space-y-3">
                <div className="max-w-[80%] bg-[#202c33] text-neutral-200 text-xs p-2.5 rounded-lg rounded-tl-none">
                  Kanka yeni nickin veya durum mesajın nasıl oldu?
                </div>

                <div className="ml-auto max-w-[85%] bg-[#005c4b] text-white p-3 rounded-lg rounded-tr-none shadow-md">
                  <div className="text-sm font-medium break-words leading-relaxed">
                    {previewText}
                  </div>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-200/80 mt-1">
                    <span>18:45</span>
                    <CheckCheck className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#0c1122] border-t border-indigo-950">
          <div className="text-xs text-indigo-300/70 truncate max-w-[200px]">
            {previewText}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-slate-300 hover:text-white rounded-lg hover:bg-indigo-950 transition-colors"
            >
              Kapat
            </button>
            <button
              onClick={handleCopy}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-indigo-600/40'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopyalandı!' : 'Kopyala'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
