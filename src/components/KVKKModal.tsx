import React from 'react';
import { X, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

interface KVKKModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KVKKModal: React.FC<KVKKModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-[#0f152b] border border-indigo-900/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-indigo-950 bg-[#0c1122]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">KVKK & Gizlilik Politikası</h3>
              <p className="text-xs text-indigo-300/70">6698 Sayılı Kanun Uyarınca Aydınlatma Metni</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-indigo-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300 leading-relaxed">
          {/* Summary Box */}
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white text-sm mb-1">
                Nickora %100 İstemci Taraflı (Client-Side) Çalışır
              </h4>
              <p className="text-indigo-200/90 text-xs">
                Sitemizde kullanıcı verileri, yazdığınız metinler veya tercihleriniz hiçbir uzak sunucuya aktarılmaz, saklanmaz veya kaydedilmez. Tüm dönüşümler anlık olarak kendi cihazınızın tarayıcısında gerçekleşir.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              1. Veri Sorumlusu ve Kapsam
            </h4>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, <strong>Nickora</strong> web platformu olarak kullanıcılarımızın gizliliğine ve kişisel verilerinin korunmasına azami önem göstermekteyiz. İşbu Aydınlatma Metni, platformumuzu ziyaret eden kullanıcıları bilgilendirmek amacıyla hazırlanmıştır.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              2. Hangi Veriler İşlenmektedir?
            </h4>
            <p className="mb-2">
              Platformumuzda kullanıcı hesabı, üyelik sistemi, e-posta bülteni veya form bulunmamaktadır. Dolayısıyla;
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>Ad, soyad, kimlik numarası, telefon numarası veya e-posta gibi <strong>hiçbir kimlik/iletişim verisi toplanmaz</strong>.</li>
              <li>Yazdığınız veya dönüştürdüğünüz metinler <strong>sunuculara gönderilmez</strong>.</li>
              <li>IP adresleri veya coğrafi konum bilgileri <strong>kayıt altına alınmaz</strong>.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              3. Yerel Depolama (Local Storage) Kullanımı
            </h4>
            <p>
              Sitemizde kullanıcı deneyimini kolaylaştırmak amacıyla yalnızca tarayıcınızın kendi yerel hafızası (<strong>HTML5 Local Storage</strong>) kullanılmaktadır:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-1 text-slate-300">
              <li><strong>Favoriler:</strong> Yıldızladığınız font stillerinin tanımlayıcı kodları cihazınızda tutulur.</li>
              <li><strong>Pano Geçmişi:</strong> Son kopyaladığınız metinler yalnızca kendi cihazınızda geçici olarak listelenir.</li>
            </ul>
            <p className="mt-2 text-slate-400">
              Bu veriler hiçbir zaman internet üzerinden harici bir veritabanına iletilmez. Dilediğiniz zaman tarayıcı çerezlerinizi/önbelleğinizi temizleyerek bu verileri anında silebilirsiniz.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              4. Çerezler (Cookies) ve Üçüncü Taraf Takipçileri
            </h4>
            <p>
              Platformumuzda kullanıcıları profilleyen, izleyen, reklam hedeflemesi yapan zorunlu olmayan hiçbir üçüncü taraf takip çerezi (tracking cookie) barındırılmamaktadır.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              5. KVKK Madde 11 Kapsamındaki Haklarınız
            </h4>
            <p>
              KVKK'nın 11. maddesi uyarınca veri sahipleri kişisel verilerinin işlenip işlenmediğini öğrenme, silinmesini talep etme haklarına sahiptir. Platformumuzda herhangi bir kişisel veri toplanmadığı ve sunucu taraflı saklanmadığı için, tarayıcı geçmişinizi silmeniz durumunda tüm yerel tercihleriniz tamamen silinmiş olacaktır.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#0c1122] border-t border-indigo-950 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Kişisel Veri Güvenliği Garantisi</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
          >
            Anladım & Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
