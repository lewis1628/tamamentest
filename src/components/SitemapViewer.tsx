import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, FileCode, ExternalLink, Globe } from 'lucide-react';

const SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sekilliyaz.com.tr/</loc>
    <lastmod>2026-10-20</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://sekilliyaz.com.tr/yasaluyari</loc>
    <lastmod>2026-10-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://sekilliyaz.com.tr/gizlilikpolitikasi</loc>
    <lastmod>2026-10-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://sekilliyaz.com.tr/kullanimkosullari</loc>
    <lastmod>2026-10-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;

const ROBOTS_TXT = `# Robots.txt for https://sekilliyaz.com.tr
# Allow search engine crawlers to discover and index all public pages

User-agent: *
Allow: /

# Sitemap Index
Sitemap: https://sekilliyaz.com.tr/sitemap.xml`;

interface Props {
  type: 'sitemap' | 'robots';
  onNavigate: (path: string) => void;
}

export const SitemapViewer: React.FC<Props> = ({ type, onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const content = type === 'sitemap' ? SITEMAP_XML : ROBOTS_TXT;
  const title = type === 'sitemap' ? 'XML Site Haritası (sitemap.xml)' : 'Robots Taraması (robots.txt)';

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans relative">
      <div className="max-w-4xl mx-auto w-full px-4 py-8">
        {/* Header navigation */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfaya Dön
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Kopyalandı' : 'Kopyala'}
            </button>
            <a
              href={type === 'sitemap' ? '/sitemap.xml' : '/robots.txt'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Statik Dosyayı Aç
            </a>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{title}</h1>
              <p className="text-xs text-slate-400">Canlı Site: https://sekilliyaz.com.tr</p>
            </div>
          </div>

          {type === 'sitemap' && (
            <div className="mb-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/60 text-slate-300">
                  <tr>
                    <th className="p-3">Sayfa URL</th>
                    <th className="p-3">Öncelik</th>
                    <th className="p-3">Güncelleme</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-400">
                  <tr>
                    <td className="p-3 font-mono text-blue-400">
                      <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('/'); }} className="hover:underline flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5" /> https://sekilliyaz.com.tr/
                      </a>
                    </td>
                    <td className="p-3">1.0 (En Yüksek)</td>
                    <td className="p-3">Günlük</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-slate-300">
                      <a href="/yasaluyari" onClick={(e) => { e.preventDefault(); onNavigate('/yasaluyari'); }} className="hover:underline">
                        https://sekilliyaz.com.tr/yasaluyari
                      </a>
                    </td>
                    <td className="p-3">0.5</td>
                    <td className="p-3">Aylık</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-slate-300">
                      <a href="/gizlilikpolitikasi" onClick={(e) => { e.preventDefault(); onNavigate('/gizlilikpolitikasi'); }} className="hover:underline">
                        https://sekilliyaz.com.tr/gizlilikpolitikasi
                      </a>
                    </td>
                    <td className="p-3">0.5</td>
                    <td className="p-3">Aylık</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-slate-300">
                      <a href="/kullanimkosullari" onClick={(e) => { e.preventDefault(); onNavigate('/kullanimkosullari'); }} className="hover:underline">
                        https://sekilliyaz.com.tr/kullanimkosullari
                      </a>
                    </td>
                    <td className="p-3">0.5</td>
                    <td className="p-3">Aylık</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="relative">
            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-emerald-400 font-mono overflow-x-auto max-h-[450px]">
              {content}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
