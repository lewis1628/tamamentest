import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Scale, 
  FileText, 
  CheckCircle2, 
  Lock, 
  AlertTriangle,
  ExternalLink,
  Sparkles,
  Share2,
  Check,
  Contrast
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export type LegalPageType = 'disclaimer' | 'privacy' | 'terms';

interface LegalPageProps {
  pageType: LegalPageType;
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ pageType, onNavigate }) => {
  const { isTrueBlack, toggleTheme } = useTheme();
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update document title for SEO & clarity
    if (pageType === 'disclaimer') {
      document.title = 'Yasal Uyarı & Sorumluluk Reddi | Nickora';
    } else if (pageType === 'privacy') {
      document.title = 'Gizlilik Politikası (KVKK) | Nickora';
    } else if (pageType === 'terms') {
      document.title = 'Kullanım Koşulları | Nickora';
    }

    return () => {
      document.title = 'Nickora - Şekilli Yazı Yazma & Süslü Nickler';
    };
  }, [pageType]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#0a0f20]/95 backdrop-blur-md border-b border-indigo-950/80 px-4 sm:px-6 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Back button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className="p-2 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-800/60 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold group shadow-sm"
              title="Ana Sayfaya Dön"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span className="hidden sm:inline">Ana Sayfaya Dön</span>
            </button>

            <button 
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-wider bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-300 bg-clip-text text-transparent uppercase">
                  Nickora
                </span>
                <span className="text-[9px] text-indigo-400/80 -mt-1 font-semibold uppercase tracking-wider">
                  Hukuk & Güvenlik
                </span>
              </div>
            </button>
          </div>

          {/* Quick Share / Theme / Back */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isTrueBlack
                  ? 'bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-600'
                  : 'bg-indigo-950/50 hover:bg-indigo-900/50 border-indigo-800/50 text-indigo-300 hover:text-white'
              }`}
              title={isTrueBlack ? 'Gece Mavisi temasına geç' : 'OLED True Black moduna geç'}
              aria-label="Tema Değiştir"
            >
              <Contrast className={`w-3.5 h-3.5 ${isTrueBlack ? 'text-amber-400 rotate-180' : 'text-indigo-400'}`} />
              <span className="hidden md:inline">{isTrueBlack ? 'True Black' : 'Gece Mavisi'}</span>
            </button>

            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg bg-indigo-950/50 hover:bg-indigo-900/50 border border-indigo-800/50 text-indigo-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Bağlantıyı Kopyala"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Kopyalandı</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Paylaş</span>
                </>
              )}
            </button>
            <button
              onClick={() => onNavigate('/')}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all"
            >
              Uygulamaya Git
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Navigation Tabs between pages */}
        <div className="flex items-center justify-center sm:justify-start gap-2 pb-6 border-b border-indigo-950/80 mb-8 overflow-x-auto">
          <button
            onClick={() => onNavigate('/yasaluyari')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              pageType === 'disclaimer'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Yasal Uyarı & Sorumluluk Reddi</span>
          </button>

          <button
            onClick={() => onNavigate('/gizlilikpolitikasi')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              pageType === 'privacy'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm shadow-blue-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Gizlilik Politikası (KVKK)</span>
          </button>

          <button
            onClick={() => onNavigate('/kullanimkosullari')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              pageType === 'terms'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm shadow-purple-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
            }`}
          >
            <FileText className="w-4 h-4 text-purple-400" />
            <span>Kullanım Koşulları</span>
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-[#0c1122] border border-indigo-950 rounded-2xl p-6 sm:p-10 shadow-xl space-y-8">
          
          {/* ======================================================== */}
          {/* TAB 1: YASAL UYARI & SORUMLULUK REDDİ */}
          {/* ======================================================== */}
          {pageType === 'disclaimer' && (
            <article className="space-y-6">
              <div className="border-b border-indigo-950 pb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Hukuki ve Marka Bildirimi</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Yasal Uyarı ve Sorumluluk Reddi
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-2">
                  Son güncelleme: Ekim 2026 • Nickora Platformu Kullanım ve Hukuki Esasları
                </p>
              </div>

              {/* Callout */}
              <div className="p-4 sm:p-5 rounded-xl bg-amber-950/30 border border-amber-800/50 flex items-start gap-3.5">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h2 className="font-bold text-white text-sm">
                    Bağımsız Araç & Tarafsız Hizmet Bildirimi
                  </h2>
                  <p className="text-amber-200/90 text-xs leading-relaxed">
                    <strong>Nickora</strong>, kullanıcıların evrensel Unicode karakter standartlarını kullanarak estetik yazı tipleri, süslü nickler, semboller ve biyo metinleri oluşturmasını sağlayan bağımsız, tarafsız ve ücretsiz bir web aracıdır.
                  </p>
                </div>
              </div>

              {/* Clause 1 */}
              <section className="space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  1. Üçüncü Taraf Markalar ve Telif Hakları
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Web sitemizde adı geçen oyunlar, dijital platformlar, sosyal ağlar ve şirket isimleri (örneğin: <strong>PUBG Mobile, Brawl Stars, Valorant, Free Fire, Roblox, League of Legends, Counter-Strike, Instagram, TikTok, Discord, WhatsApp, Twitter/X, Telegram</strong> ve benzeri markalar) ilgili şirketlerin ve resmi hak sahiplerinin tescilli ticari markalarıdır.
                </p>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  <strong>Nickora</strong>'nın bu kuruluşlarla hiçbir resmi ortaklığı, sponsorluk, lisans, iş birliği veya doğrudan/dolaylı onay ilişkisi bulunmamaktadır. Tüm marka adları yalnızca kullanıcılara sistem uyumluluğu, karakter desteği ve referans sağlama amacıyla bilgilendirici (nominative fair use / dürüst kullanım) kapsamında zikredilmiştir.
                </p>
              </section>

              {/* Clause 2 */}
              <section className="space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  2. İçerik ve Kullanıcı Sorumluluğu
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Nickora araçları vasıtasıyla oluşturulan, süslenen, dönüştürülen veya kopyalanan tüm nicklerin, yazıların, sembol kombinasyonlarının ve biyo metinlerinin içeriğinden <strong>doğrudan, münhasıran ve tamamen kullanıcı sorumludur</strong>.
                </p>
                <div className="p-4 rounded-xl bg-[#090d1c] border border-indigo-950 space-y-2">
                  <p className="text-xs font-semibold text-slate-200">Kullanıcılar oluşturdukları içeriklerin:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
                    <li>Türkiye Cumhuriyeti kanunlarına, kamu düzenine, kişilik haklarına ve genel ahlak kurallarına aykırı olmamasını,</li>
                    <li>Nefret söylemi, ırkçılık, taciz, hakaret, tehdit veya yasa dışı unsurlar barındırmamasını,</li>
                    <li>Üçüncü şahısların ticari unvanlarını, telif haklarını veya fikri mülkiyet haklarını ihlal etmemesini,</li>
                    <li>Metinlerin kopyalandığı platformların (Discord, Instagram, Steam, oyun sunucuları vb.) kendi Topluluk Kuralları ve Hizmet Şartları ile çelişmemesini taahhüt eder.</li>
                  </ul>
                </div>
              </section>

              {/* Clause 3 */}
              <section className="space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  3. Garanti Reddi ve Karakter Görünürlüğü
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Nickora platformunda sunulan font dönüştürme ve nick oluşturma hizmeti <em>"olduğu gibi"</em> (as-is) esasıyla sunulmaktadır. Karakterlerin her cihazda, her işletim sisteminde veya tüm üçüncü taraf mobil uygulamalarda hatasız ve aynı şekilde görüntüleneceğine dair yasal bir taahhüt veya garanti verilmemektedir.
                </p>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Oluşturulan özel Unicode karakterlerin ve emojilerin görünürlüğü; kullanıcının ve alıcının cihazındaki işletim sistemi sürümüne (iOS, Android, Windows, macOS, Linux), kurulu font kütüphanesine ve ilgili oyun veya uygulamanın karakter filtreleme politikalarına bağlıdır.
                </p>
              </section>

              {/* Clause 4 */}
              <section className="space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  4. Harici Bağlantılar ve Üçüncü Taraf Servisler
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Nickora üzerinde yer alabilecek harici web sitelerine ait bağlantılar kullanıcıya kolaylık sağlamak amacıyla sunulur. Nickora, yönlendirilen sitelerin içeriklerinden, gizlilik pratiklerinden ve güvenliğinden sorumlu tutulamaz.
                </p>
              </section>
            </article>
          )}

          {/* ======================================================== */}
          {/* TAB 2: GİZLİLİK POLİTİKASI (KVKK) */}
          {/* ======================================================== */}
          {pageType === 'privacy' && (
            <article className="space-y-6">
              <div className="border-b border-indigo-950 pb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-3">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Kişisel Verilerin Korunması (KVKK)</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Gizlilik Politikası ve KVKK Aydınlatma Metni
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-2">
                  6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında Hazırlanmıştır
                </p>
              </div>

              {/* Highlight Banner */}
              <div className="p-4 sm:p-5 rounded-xl bg-blue-950/40 border border-blue-800/60 flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h2 className="font-bold text-white text-sm">
                    %100 İstemci Taraflı (Client-Side) Mimari & Sıfır Veri Depolama
                  </h2>
                  <p className="text-blue-200/90 text-xs leading-relaxed">
                    Nickora platformunda yazdığınız, dönüştürdüğünüz veya panoya kopyaladığınız hiçbir metin sunucularımıza gönderilmez, işlenmez ve veritabanlarına kaydedilmez. Tüm yazı dönüştürme işlemleri doğrudan cihazınızın tarayıcısında gerçekleşir.
                  </p>
                </div>
              </div>

              {/* Clause 1 */}
              <section className="space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                  1. 6698 Sayılı KVKK Kapsamında Veri Sorumlusu Bilgilendirmesi
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, <strong>Nickora</strong> kullanıcıların kişisel mahremiyetine ve veri güvenliğine en üst seviyede riayet eder.
                </p>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Platformumuzda üyelik, oturum açma, form doldurma veya profil oluşturma gibi bir zorunluluk bulunmamaktadır. Ad, soyad, telefon numarası, T.C. kimlik numarası, e-posta adresi veya ödeme bilgileri gibi kişisel kimlik verileri <strong>kesinlikle talep edilmez, toplanmaz ve depolanmaz</strong>.
                </p>
              </section>

              {/* Clause 2 */}
              <section className="space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                  2. Yerel Tarayıcı Depolaması (HTML5 Local Storage)
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Nickora, kullanıcı deneyimini iyileştirmek amacıyla yalnızca tarayıcınızın kendi yerel belleğini (Local Storage) kullanır. Bu kapsamda saklanan bilgiler:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
                  <li>Kullanıcının kendi isteğiyle yıldızladığı <strong>favori font stilleri</strong>,</li>
                  <li>Kullanıcının son kopyaladığı metinlerin yerel geçmiş listesi (cihazda tutulur),</li>
                  <li>Arayüz tercihleri (ızgara/liste görünümü, yazı boyutu).</li>
                </ul>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-2">
                  Bu veriler harici herhangi bir sunucuya ya da üçüncü taraflara aktarılmaz. Tarayıcınızın çerezlerini veya geçmişini temizlediğinizde ya da sitedeki "Temizle" butonunu kullandığınızda bu veriler kalıcı olarak cihazınızdan silinir.
                </p>
              </section>

              {/* Clause 3 */}
              <section className="space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                  3. Çerez (Cookie) Politikası
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Sitemizde kullanıcıları gizlice profilleyen, kişisel ilgi alanlarını takip eden veya reklam amacıyla üçüncü şahıslara veri aktaran izleme ve pazarlama çerezleri <strong>kullanılmamaktadır</strong>. Site yalnızca uygulamanın temel işlevselliği için gerekli olan teknik oturum çerezlerini barındırabilir.
                </p>
              </section>

              {/* Clause 4 */}
              <section className="space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                  4. Veri Güvenliği ve İletişim Şifrelemesi
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Web sitemiz modern 256-bit SSL/TLS şifreleme protokolleriyle korunmaktadır. Kullanıcı ve site arasındaki tüm veri trafiği güvenli kanallar üzerinden yürütülür.
                </p>
              </section>
            </article>
          )}

          {/* ======================================================== */}
          {/* TAB 3: KULLANIM KOŞULLARI */}
          {/* ======================================================== */}
          {pageType === 'terms' && (
            <article className="space-y-6">
              <div className="border-b border-indigo-950 pb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Kullanıcı ve Hizmet Sözleşmesi</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Kullanım Koşulları ve Hizmet Esasları
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-2">
                  Nickora Web Sitesi ve Araçlarının Kullanımına İlişkin Genel Şartlar
                </p>
              </div>

              {/* Callout */}
              <div className="p-4 sm:p-5 rounded-xl bg-purple-950/40 border border-purple-800/60 flex items-start gap-3.5">
                <FileText className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h2 className="font-bold text-white text-sm">
                    Hizmet Kabulü Bildirimi
                  </h2>
                  <p className="text-purple-200/90 text-xs leading-relaxed">
                    Nickora web sitesini ziyaret eden, font araçlarını kullanan, sembol veya nick kopyalayan her kullanıcı bu koşulları peşinen okumuş, anlamış ve kabul etmiş sayılır.
                  </p>
                </div>
              </div>

              {/* Clause 1 */}
              <section className="space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                  1. Hizmetin Niteliği ve Ücretsiz Sunum
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Nickora, bireysel ve genel kullanıcılara ücretsiz olarak metin biçimlendirme, Unicode yazı tipi dönüştürme, görünmez boşluk karakteri kopyalama ve sembol kütüphanesi sağlama amacıyla geliştirilmiştir.
                </p>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Hizmetin kesintisiz, ömür boyu veya daima aynı teknik yapıda süreceğine dair bir garanti verilmemektedir; ancak sistemin sürekli ve kararlı çalışması için gerekli teknik önlemler titizlikle uygulanır.
                </p>
              </section>

              {/* Clause 2 */}
              <section className="space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                  2. Yasaklı Eylemler ve Kabul Edilebilir Kullanım
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Kullanıcılar siteyi ziyaret ederken ve araçları kullanırken aşağıdaki eylemleri gerçekleştirmemeyi kabul eder:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
                  <li>Site sunucularına veya bant genişliğine aşırı yük bindirecek bot, crawler veya otomatik veri çekme araçları çalıştırmak,</li>
                  <li>DDoS veya servis dışı bırakma amaçlı siber saldırı girişimlerinde bulunmak,</li>
                  <li>Kaynak kodlarını zararlı yazılımlar veya tersine mühendislik yoluyla istismar etmeye çalışmak,</li>
                  <li>Sitenin güvenliğini veya diğer kullanıcıların erişimini olumsuz etkileyecek müdahaleler yapmak.</li>
                </ul>
              </section>

              {/* Clause 3 */}
              <section className="space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                  3. Fikri ve Sınai Mülkiyet Hakları
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  <strong>Nickora</strong> web sitesinin marka adı, logosu, sayfa tasarımları, grafik unsurları, arayüz bileşenleri ve özel yazılım mimarisi yasal olarak korunmaktadır. Platformun izinsiz şekilde birebir klonlanması, kaynak kodlarının ticari amaçla izinsiz dağıtılması veya telif hakkı ihlali doğuracak şekilde kopyalanması yasaktır.
                </p>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Sitede kullanılan evrensel Unicode sembolleri ve glifler ise uluslararası açık standartlar olup genel kamu malı niteliğindedir.
                </p>
              </section>

              {/* Clause 4 */}
              <section className="space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                  4. Şartların Güncellenmesi ve Yürürlük
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Nickora, kullanım şartlarını ve yasal politikalarını mevzuat değişiklikleri veya platform güncellemeleri doğrultusunda önceden bildirmeksizin tek taraflı güncelleme hakkını saklı tutar. Yapılan güncellemeler bu sayfada yayımlandığı andan itibaren tüm kullanıcılar için geçerli hale gelir.
                </p>
              </section>
            </article>
          )}

          {/* Bottom Security Badge */}
          <div className="pt-6 border-t border-indigo-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Türkiye Cumhuriyeti Hukuku ve 6698 Sayılı KVKK Uyarınca Düzenlenmiştir.</span>
            </div>
            <button
              onClick={() => onNavigate('/')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors shadow-md shadow-indigo-600/20"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </div>

        {/* Other Legal Links Navigation Box */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('/yasaluyari')}
            className={`p-4 rounded-xl border text-left transition-all ${
              pageType === 'disclaimer'
                ? 'bg-amber-950/20 border-amber-500/40'
                : 'bg-[#0a0f20] border-indigo-950 hover:border-indigo-800'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-xs text-white mb-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Yasal Uyarı & Markalar</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Telif hakları, marka sorumluluk reddi ve garanti koşulları.
            </p>
          </button>

          <button
            onClick={() => onNavigate('/gizlilikpolitikasi')}
            className={`p-4 rounded-xl border text-left transition-all ${
              pageType === 'privacy'
                ? 'bg-blue-950/20 border-blue-500/40'
                : 'bg-[#0a0f20] border-indigo-950 hover:border-indigo-800'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-xs text-white mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Gizlilik Politikası (KVKK)</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Sıfır veri depolama ve %100 istemci taraflı güvenlik garantisi.
            </p>
          </button>

          <button
            onClick={() => onNavigate('/kullanimkosullari')}
            className={`p-4 rounded-xl border text-left transition-all ${
              pageType === 'terms'
                ? 'bg-purple-950/20 border-purple-500/40'
                : 'bg-[#0a0f20] border-indigo-950 hover:border-indigo-800'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-xs text-white mb-1">
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span>Kullanım Koşulları</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Hizmet şartları, fikri mülkiyet ve kabul edilebilir kullanım esasları.
            </p>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-indigo-950 bg-[#060913] py-6 px-4 text-center text-xs text-slate-400">
        <p>© 2026 Nickora. Tüm hakları saklıdır. Estetik Yazı ve Nick Oluşturucu.</p>
      </footer>
    </div>
  );
};
