import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Scale, FileText, CheckCircle2, Lock, AlertTriangle } from 'lucide-react';

export type LegalTab = 'disclaimer' | 'privacy' | 'terms';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTab;
}

export const LegalModal: React.FC<LegalModalProps> = ({ 
  isOpen, 
  onClose, 
  initialTab = 'disclaimer' 
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-[#0f152b] border border-indigo-900/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-indigo-950 bg-[#0c1122]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Yasal Bilgilendirme & Sözleşmeler</h3>
              <p className="text-xs text-indigo-300/70">Nickora PRO Hukuki & Güvenlik Bildirimleri</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-indigo-950 transition-colors"
            title="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-indigo-950/80 bg-[#090d1c] px-6 pt-2 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('disclaimer')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'disclaimer'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Yasal Uyarı & Sorumluluk Reddi</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'border-blue-400 text-blue-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Gizlilik Politikası (KVKK)</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'terms'
                ? 'border-purple-400 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Kullanım Koşulları</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed">
          {/* TAB 1: YASAL UYARI */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/50 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">
                    Bağımsız Araç & Ticari Marka Bildirimi
                  </h4>
                  <p className="text-amber-200/90 text-xs">
                    Nickora, kullanıcıların Unicode karakter standartlarıyla estetik metinler oluşturmasını sağlayan bağımsız, tarafsız ve ücretsiz bir araçtır.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  1. Üçüncü Taraf Markalar ve Telif Hakları
                </h4>
                <p>
                  Sitede adı geçen oyunlar, sosyal ağlar ve şirket isimleri (örneğin PUBG, Brawl Stars, Valorant, Free Fire, Roblox, League of Legends, Instagram, TikTok, Discord, WhatsApp, Twitter/X vb.) ilgili şirketlerin ve hak sahiplerinin tescilli ticari markalarıdır. <strong>Nickora</strong>'nın bu kuruluşlarla hiçbir resmi ortaklığı, sponsorluk, lisans veya onay ilişkisi bulunmamaktadır. Tüm marka adları yalnızca kullanıcılara uyumluluk ve referans sağlama amacıyla bilgilendirici (nominative fair use) olarak zikredilmiştir.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  2. İçerik ve Kullanıcı Sorumluluğu
                </h4>
                <p>
                  Nickora araçları vasıtasıyla oluşturulan, süslenen veya kopyalanan tüm nicklerin, yazıların ve biyo metinlerinin içeriğinden <strong>doğrudan ve münhasıran kullanıcı sorumludur</strong>. Kullanıcılar oluşturdukları metinlerin;
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-1.5 text-slate-300">
                  <li>Türkiye Cumhuriyeti kanunlarına, genel ahlaka ve kamu düzenine aykırı olmamasını,</li>
                  <li>Kişilik haklarına, telif haklarına veya ticari itibar zedeleyici unsurlar barındırmamasını,</li>
                  <li>Kullanılan platformların (Discord, Instagram, oyun sunucuları vb.) kendi hizmet koşullarına ve kurallarına aykırı olmamasını taahhüt eder.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  3. Garanti Reddi
                </h4>
                <p>
                  Nickora platformunda sunulan font dönüştürme ve nick oluşturma hizmeti "olduğu gibi" (as-is) sunulmaktadır. Karakterlerin her cihazda, işletim sisteminde veya üçüncü taraf uygulamada hatasız görüntüleneceğine dair yasal bir taahhüt verilmemektedir. Karakterlerin görünürlüğü kullanıcının ve alıcının cihazındaki işletim sistemi sürümüne ve Unicode yazı tipi desteğine bağlıdır.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: GİZLİLİK POLİTİKASI (KVKK) */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">
                    %100 İstemci Taraflı (Client-Side) Güvenlik
                  </h4>
                  <p className="text-blue-200/90 text-xs">
                    Nickora'da yazdığınız veya kopyaladığınız hiçbir metin sunuculara iletilmez veya kaydedilmez. Tüm dönüşümler cihazınızın kendi tarayıcısında anlık yapılır.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  1. 6698 Sayılı KVKK Kapsamında Bilgilendirme
                </h4>
                <p>
                  6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, Nickora platformu kullanıcıların gizliliğine ve güvenliğine en üst seviyede saygı duyar. Sitede üyelik, kayıt veya form doldurma zorunluluğu bulunmamaktadır; ad, soyad, telefon veya e-posta gibi kişisel kimlik verileri kesinlikle talep edilmez ve toplanmaz.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  2. Yerel Depolama (HTML5 Local Storage)
                </h4>
                <p>
                  Site tercihlerinizi (yıldızladığınız favori fontlar ve son kopyalanan geçmiş gibi işlevler) sadece kullanıcı rahatlığı amacıyla tarayıcınızın kendi belleğinde (Local Storage) tutar. Bu veriler harici bir veritabanına ya da üçüncü taraflara aktarılmaz. Tarayıcı geçmişinizi temizlediğinizde tüm bu yerel veriler anında silinir.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  3. Çerezler (Cookies)
                </h4>
                <p>
                  Sitemizde kullanıcıları gizlice profilleyen, izleyen ya da reklam amacıyla üçüncü şahıslara veri aktaran izleme çerezleri kullanılmamaktadır.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: KULLANIM KOŞULLARI */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 flex items-start gap-3">
                <FileText className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">
                    Hizmet Şartları ve Kullanım Esasları
                  </h4>
                  <p className="text-purple-200/90 text-xs">
                    Nickora web sitesini ziyaret eden ve araçlarını kullanan herkes bu şartları kabul etmiş sayılır.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  1. Hizmetin Niteliği ve Ücretsiz Kullanım
                </h4>
                <p>
                  Nickora web sitesi, bireysel ve kurumsal kullanıcılara ücretsiz olarak metin biçimlendirme ve karakter dönüştürme hizmeti sunar. Hizmetin kesintisiz veya ömür boyu süreceğine dair garanti verilmemekle birlikte, sitenin istikrarı için gerekli teknik tedbirler alınmaktadır.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  2. Yasaklı Eylemler ve Kabul Edilebilir Kullanım
                </h4>
                <p>
                  Kullanıcılar site altyapısına zarar verebilecek otomatik botlar, DDoS saldırıları, tersine mühendislik veya sitenin normal işleyişini bozacak faaliyetlerde bulunamazlar.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  3. Fikri Mülkiyet Hakları
                </h4>
                <p>
                  Nickora'nın site tasarımı, kaynak kodları, logosu, arayüz bileşenleri ve marka kimliği korunmaktadır. İzinsiz kopyalanması, birebir klonlanması veya ticari olarak dağıtılması yasaktır. Unicode standart sembolleri ise evrensel kamu malıdır.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  4. Şartların Güncellenmesi
                </h4>
                <p>
                  Nickora, kullanım koşullarını ve yasal uyarıları gerek gördüğünde önceden bildirmeksizin güncelleme hakkını saklı tutar. Değişiklikler sitede yayımlandığı andan itibaren geçerlilik kazanır.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-4 bg-[#0c1122] border-t border-indigo-950 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Türkiye Cumhuriyeti Hukuku Uyarınca Hazırlanmıştır</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
          >
            Okudum & Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
