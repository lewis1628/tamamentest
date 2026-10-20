export interface BioTemplate {
  id: string;
  title: string;
  category: 'instagram' | 'gaming' | 'aesthetic' | 'minimal' | 'quote';
  categoryLabel: string;
  template: string;
  tags: string[];
}

export const BIO_TEMPLATES: BioTemplate[] = [
  {
    id: 'aesthetic-angel',
    title: 'Estetik Melek & Bulutlar',
    category: 'aesthetic',
    categoryLabel: 'Estetik & Instagram',
    tags: ['Soft', 'Pastel', 'Bio'],
    template: `⋆⁺₊⋆ ☾ ⋆⁺₊⋆
˗ˏˋ {NAME} ˎˊ˗
❀ 𖤣𖥧 Hayal kur, keşfet, sev 𖥧𖤣 ❀
🕊️ 𝒢𝑜𝑜𝒹 𝓋𝒾𝒷𝑒𝓈 𝑜𝓃𝓁𝓎
📍 {CITY}`
  },
  {
    id: 'gaming-pro',
    title: 'Klan Lideri & Pro Oyuncu',
    category: 'gaming',
    categoryLabel: 'Oyun & Discord',
    tags: ['PUBG', 'Valorant', 'CS2'],
    template: `亗 {NAME} 亗
╾━╤デ╦︻ 𝐸𝓈𝓅𝑜𝓇𝓉𝓈 𝒫𝓁𝒶𝓎𝑒𝓇
⚡ 𝓡𝓪𝓭𝓲𝓪𝓷𝓽 / 𝓒𝓸𝓷𝓺𝓾𝓮𝓻𝓸𝓻
🎮 𝒟𝒾𝓈𝒸𝑜𝓇𝒹: {NAME}#0001
🏆 𝒩𝑒𝓋𝑒𝓇 𝓈𝓊𝓇𝓇𝑒𝓃𝒹𝑒𝓇`
  },
  {
    id: 'dark-gothic',
    title: 'Karanlık Ruh & Gotik',
    category: 'aesthetic',
    categoryLabel: 'Gotik & Gizemli',
    tags: ['Dark', 'Gothic', 'Shadow'],
    template: `꧁༺ 𝕯𝖆𝖗𝖐𝖓𝖊𝖘𝖘 ༻꧂
𝕴𝖓 𝖆 𝖜𝖔𝖗𝖑𝖉 𝖔𝖋 𝖈𝖍𝖆𝖔𝖘
♠️ 𝕾𝖎𝖑𝖊𝖓𝖈𝖊 𝖎𝖘 𝖆𝖓 𝖆𝖓𝖘𝖜𝖊𝖗
🥀 1999 • 𝕭𝖑𝖆𝖈𝖐 𝕳𝖊𝖆𝖗𝖙
🖤 {CITY}`
  },
  {
    id: 'minimal-creator',
    title: 'Modern İçerik Üreticisi',
    category: 'minimal',
    categoryLabel: 'Minimal & İş',
    tags: ['Creator', 'Minimal', 'SaaS'],
    template: `{NAME}
— ᴅɪɢɪᴛᴀʟ ᴄʀᴇᴀᴛᴏʀ & ᴅᴇsɪɢɴᴇʀ
✦ ᴛᴜʀɴɪɴɢ ɪᴅᴇᴀs ɪɴᴛᴏ ʀᴇᴀʟɪᴛʏ
☕ ᴄᴏғғᴇᴇ + ᴄᴏᴅᴇ + ᴀᴇsᴛʜᴇᴛɪᴄ
✉️ ɪɴғᴏ@{NAME}.ᴄᴏᴍ`
  },
  {
    id: 'cyber-future',
    title: 'Cyberpunk & Matrix Terminal',
    category: 'gaming',
    categoryLabel: 'Cyberpunk & Teknoloji',
    tags: ['Cyber', 'Matrix', 'Terminal'],
    template: `░▒▓█ {NAME} █▓▒░
[STATUS: 2026 // ONLINE]
⚡ ꜱʏꜱᴛᴇᴍ ᴏᴠᴇʀʀɪᴅᴇ
🧠 ᴄᴏᴅᴇ. ʜᴀᴄᴋ. ʀᴇᴘᴇᴀᴛ.
🌐 ᴛᴇʀᴍɪɴᴀʟ ᴀᴄᴄᴇꜱꜱ ɢʀᴀɴᴛᴇᴅ`
  },
  {
    id: 'love-romantic',
    title: 'Romantik Kalp Ritmi',
    category: 'quote',
    categoryLabel: 'Aşk & Romantik',
    tags: ['Love', 'Heart', 'Sweet'],
    template: `♡ ˗ˏˋ {NAME} ˎˊ˗ ♡
ﮩ٨ـﮩﮩʌـﮩ٨ـﮩﮩʌـ 𝒴𝑜𝓊 𝒶𝓇𝑒 𝓂𝓎 𝓈𝓊𝓃𝓈𝒽𝒾𝓃𝑒
💍 𝒮𝒾𝓃𝒸𝑒 𝟤𝟢𝟤𝟦
🔒 𝒯𝒶𝓀𝑒𝓃 𝒷𝓎 𝒯𝒽𝑒 𝒪𝓃𝑒
🔐 𝒦𝑒𝓎 𝓉𝑜 𝓂𝓎 𝒽𝑒𝒶𝓇𝓉`
  },
  {
    id: 'luxury-king',
    title: 'Kraliyet & Başarı (Crown King)',
    category: 'minimal',
    categoryLabel: 'Kral & Lüks',
    tags: ['Luxury', 'Crown', 'Elite'],
    template: `♛ ❝ {NAME} ❞ ♛
⚜️ Ｂｕｉｌｄｉｎｇ  ｍｙ  Ｅｍｐｉｒｅ
💎 Ｄｉｓｃｉｐｌｉｎｅ > Ｍｏｔｉｖａｔｉｏｎ
💼 Ｅｎｔｒｅｐｒｅｎｅｕｒ
🚀 Ｓｋｙ ｉｓ ｎｏｔ ｔｈｅ ｌｉｍｉｔ`
  },
  {
    id: 'music-beats',
    title: 'Müzik Tutkunu & Vibe',
    category: 'quote',
    categoryLabel: 'Müzik & Sanat',
    tags: ['Music', 'Spotify', 'Vibe'],
    template: `·.¸¸.·♩♪♫ {NAME} ♫♪♩·.¸¸.·
🎧 𝒲𝒽𝑒𝓇𝑒 𝓌𝑜𝓇𝒹𝓈 𝒻𝒶𝒾𝓁, 𝓂𝓊𝓈𝒾𝒸 𝓈𝓅𝑒𝒶𝓀𝓈
🪐 𝐿𝑜𝓈𝓉 𝒾𝓃 𝓉𝒽𝑒 𝒻𝓇𝑒𝓆𝓊𝑒𝓃𝒸𝓎
📻 𝒫𝓁𝒶𝓎𝒾𝓃𝑔 𝓂𝓎 𝒻𝒶𝓋𝑜𝓇𝒾𝓉𝑒 𝓉𝓇𝒶𝒸𝓀
🌙 𝒩𝒾𝑔𝒽𝓉 𝑜𝓌𝓁`
  },
  {
    id: 'anime-otaku',
    title: 'Japon Estetiği & Anime',
    category: 'aesthetic',
    categoryLabel: 'Anime & Japon',
    tags: ['Anime', 'Kaomoji', 'Japan'],
    template: `「 {NAME} 」
(づ｡◕‿‿◕｡)づ 𝒴𝑜𝓊𝓇 𝒶𝓃𝒾𝓂𝑒 𝓅𝓇𝑜𝓉𝒶𝑔𝑜𝓃𝒾𝓈𝓉
🌸 𝒯𝑜𝓀𝓎𝑜 𝒹𝓇𝑒𝒶𝓂𝓈
🍙 𝑅𝒶𝓂𝑒𝓃 > 𝐸𝓋𝑒𝓇𝓎𝓉𝒽𝒾𝓃𝑔
⛩️ 𝐼𝓀𝒾𝑔𝒶𝒾`
  }
];
