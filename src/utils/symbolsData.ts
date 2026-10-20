export interface SymbolCategory {
  id: string;
  name: string;
  iconName: string;
  symbols: string[];
}

export const SYMBOL_CATEGORIES: SymbolCategory[] = [
  {
    id: 'stars',
    name: 'Yıldızlar & Parıltı',
    iconName: 'Sparkles',
    symbols: [
      '★', '☆', '✦', '✧', '✩', '✪', '✫', '✬', '✭', '✮',
      '✯', '✰', '⋆', '⁎', '⁑', '✱', '✲', '✳', '✴', '✵',
      '✶', '✷', '✸', '✹', '✺', '✻', '✼', '✽', '✾', '✿',
      '✨', '⭐', '🌟', '💫', '🌠', '🔯', '۞'
    ]
  },
  {
    id: 'gamer',
    name: 'Oyun, Silah & Taç',
    iconName: 'Crown',
    symbols: [
      '亗', '乡', '乂', '♛', '♚', '☬', '༒', '⚔️', '⚔', '🗡️',
      '🏹', '🛡️', '🎯', '💣', '⚡', '☠️', '☠', '☣️', '☢️', 'ッ',
      '𓆩♡𓆪', '𓅓', '𓃠', '×͜×', 'ᦓ᭄', '╾━╤デ╦︻', '▄︻デ══━一',
      '︻╦̵̵͇̿̿̿̿══╤─', '⌐╦╦═─', '𓊈', '𓊉', '⫷', '⫸', '☣', '☬'
    ]
  },
  {
    id: 'hearts',
    name: 'Kalpler & Aşk',
    iconName: 'Heart',
    symbols: [
      '♥', '♡', '❤', '❥', '❣', '❦', '❧', 'ღ', 'დ', 'ლ',
      '💖', '💗', '💓', '💞', '💕', '💘', '💌', '🖤', '🤍', '🤎',
      '💜', '💙', '💚', '💛', '🧡', '🫀', '❦', '❧', 'ʚ♡ɞ', '⸜❤︎⸝'
    ]
  },
  {
    id: 'arrows',
    name: 'Oklar & Yön',
    iconName: 'ArrowRight',
    symbols: [
      '➔', '➜', '➝', '➞', '➟', '➠', '➡', '➢', '➣', '➤',
      '➥', '➦', '➧', '➨', '➩', '➪', '➫', '➬', '➭', '➮',
      '➯', '➱', '➲', '➳', '➴', '➵', '➶', '➷', '➸', '➹',
      '➺', '➻', '➼', '➽', '➾', '↩', '↪', '↔', '↕', '↖',
      '↗', '↘', '↙', '⇄', '⇅', '⇆', '⇇', '⇈', '⇉', '⇊'
    ]
  },
  {
    id: 'brackets',
    name: 'Parantez & Çerçeve',
    iconName: 'Frame',
    symbols: [
      '【', '】', '〖', '〗', '〘', '〙', '「', '」', '『', '』',
      '⟦', '⟧', '⟪', '⟫', '⦅', '⦆', '⟨', '⟩', '❨', '❩',
      '❪', '❫', '❬', '❭', '❮', '❯', '❰', '❱', '❴', '❵',
      '«', '»', '‹', '›', '〔', '〕', '〚', '〛', '₍', '₎'
    ]
  },
  {
    id: 'kaomoji',
    name: 'Kaomoji & Yüzler',
    iconName: 'Smile',
    symbols: [
      '(づ｡◕‿‿◕｡)づ', '(ง\'̀-\'́)ง', '(⌐■_■)', '¯\\_(ツ)_/¯',
      '(•‿•)', '(>‿<)', 'ʕ•ᴥ•ʔ', '(=^･ｪ･^=)', '(｡♥‿♥｡)',
      '(ಥ﹏ಥ)', '(╯°□°）╯︵ ┻━┻', 'ヘ(^_^ヘ)', '(◕‿◕✿)',
      '٩(◕‿◕｡)۶', '(o_O)', '(✿◠‿◠)', '(｡◕‿◕｡)', '(ᵔᴥᵔ)',
      '＼(＾O＾)／', '(¬‿¬)', '(づ￣ ³￣)づ', 'ಠ_ಠ', '(•_•)'
    ]
  },
  {
    id: 'dividers',
    name: 'Ayırıcı & Biyo Çizgiler',
    iconName: 'Minus',
    symbols: [
      '━━━━━━━━━━━━━━━',
      '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬',
      '·.¸¸.·♩♪♫ ·.¸¸.·♩♪♫',
      '•┈┈┈••✦♡✦••┈┈┈•',
      '*•.¸♡ ♡¸.•*',
      '«─────── « ⋅ʚ♡ɞ⋅ » ───────»',
      '★・・・・・・★・・・・・・★',
      '─━─━─━─「✦」─━─━─━─',
      '─── ❖ ── ✦ ── ❖ ───',
      '┊ ┊ ┊ ┊ ┊ ┊',
      '｡☆✼★━━━━━━━━━━━━★✼☆｡',
      '═━┈━═━┈━═━┈━═━┈━═',
      'ˏˋ°•*⁀➷',
      'ੈ✩‧₊˚'
    ]
  },
  {
    id: 'music-nature',
    name: 'Müzik & Doğa',
    iconName: 'Music',
    symbols: [
      '♩', '♪', '♫', '♬', '♭', '♮', '♯', '𝄢', '𝄡', '🎧',
      '☕', '☘️', '🍀', '🌸', '🌺', '🌻', '🌹', '🍂', '🍁', '🌙',
      '☀️', '☁️', '❄️', '🌊', '🪐', '🦋', '🐾', '🕊️', '🦅', '🦁'
    ]
  }
];

export interface NickDecoration {
  name: string;
  prefix: string;
  suffix: string;
  category: 'clan' | 'aesthetic' | 'bracket' | 'gun';
}

export const PRESET_DECORATIONS: NickDecoration[] = [
  { name: 'Kral Kanatları', prefix: '꧁༺ ', suffix: ' ༻꧂', category: 'clan' },
  { name: 'Yıldız Nişanı', prefix: '★彡[ ', suffix: ' ]彡★', category: 'clan' },
  { name: 'Boss Tacı', prefix: '亗 ', suffix: ' 亗', category: 'clan' },
  { name: 'Hükümdar', prefix: '♛ ', suffix: ' ♛', category: 'clan' },
  { name: 'Samuray Çapraz', prefix: '乂 ', suffix: ' 乂', category: 'clan' },
  { name: 'Suikastçi Kılıcı', prefix: '⚔️ ⟪ ', suffix: ' ⟫ ⚔️', category: 'clan' },
  { name: 'Karanlık Ruh', prefix: '꧁༒☬ ', suffix: ' ☬༒꧂', category: 'clan' },
  { name: 'Gülümseyen Tehlike', prefix: '×͜× ', suffix: ' ⚡', category: 'clan' },
  { name: 'Aşk Kalpleri', prefix: '♡ ˗ˏˋ ', suffix: ' ˎˊ˗ ♡', category: 'aesthetic' },
  { name: 'Pırıltılı Ay', prefix: '⋆⁺₊⋆ ☾ ', suffix: ' ⋆⁺₊⋆', category: 'aesthetic' },
  { name: 'Japon Köşeli', prefix: '「 ', suffix: ' 」', category: 'bracket' },
  { name: 'Siyah Parantez', prefix: '【 ', suffix: ' 】', category: 'bracket' },
  { name: 'Çift Yay', prefix: '〖 ', suffix: ' 〗', category: 'bracket' },
  { name: 'Sniper Tüfeği', prefix: '╾━╤デ╦︻ ', suffix: '', category: 'gun' },
  { name: 'Hücum Tüfeği', prefix: '▄︻デ══━一 ', suffix: '', category: 'gun' },
  { name: 'Matrix Çemberi', prefix: '░▒▓█ ', suffix: ' █▓▒░', category: 'clan' },
  { name: 'Bahar Çiçeği', prefix: '❀ 𖤣𖥧 ', suffix: ' 𖥧𖤣 ❀', category: 'aesthetic' },
  { name: 'Melek Kanatları', prefix: 'ʚĭɞ ', suffix: ' ʚĭɞ', category: 'aesthetic' },
];
