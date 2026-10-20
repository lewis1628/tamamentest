/**
 * Comprehensive Unicode character maps and text transformation algorithms
 * Includes support for Turkish character normalization and fallbacks
 */

// Turkish character replacements for Unicode fonts that only have A-Z/a-z
export const turkishMap: Record<string, string> = {
  'ç': 'c', 'Ç': 'C',
  'ğ': 'g', 'Ğ': 'G',
  'ı': 'i', 'I': 'I',
  'İ': 'I', 'i': 'i',
  'ö': 'o', 'Ö': 'O',
  'ş': 's', 'Ş': 'S',
  'ü': 'u', 'Ü': 'U',
};

export function normalizeTurkish(text: string): string {
  return text.split('').map(char => turkishMap[char] || char).join('');
}

// Character mappings
const standardChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const maps: Record<string, string> = {
  boldSerif: '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗',
  italicSerif: '𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧0123456789',
  boldItalicSerif: '𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛0123456789',
  sansRegular: '𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫',
  sansBold: '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵',
  sansItalic: '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻0123456789',
  sansBoldItalic: '𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯0123456789',
  script: '𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏0123456789',
  boldScript: '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃0123456789',
  fraktur: '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷0123456789',
  boldFraktur: '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟0123456789',
  doubleStruck: '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡',
  monospace: '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿',
  fullwidth: 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９',
  circles: 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨',
  negativeCircles: '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩⓿❶❷❸❹❺❻❼❽❾',
  squared: '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉0123456789',
  negativeSquared: '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🄺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🄺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉0123456789',
  parenthesized: '⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⑴⑵⑶⑷⑸⑹⑺⑻⑼',
};

// Map each standard character to unicode character
function mapToFont(text: string, targetMap: string): string {
  const norm = normalizeTurkish(text);
  const targetChars = Array.from(targetMap);
  return norm.split('').map(char => {
    const idx = standardChars.indexOf(char);
    if (idx !== -1 && targetChars[idx]) {
      return targetChars[idx];
    }
    return char;
  }).join('');
}

// Small caps mapping
const smallCapsMap: Record<string, string> = {
  a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ',
  k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ',
  u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ',
  A: 'ᴀ', B: 'ʙ', C: 'ᴄ', D: 'ᴅ', E: 'ᴇ', F: 'ғ', G: 'ɢ', H: 'ʜ', I: 'ɪ', J: 'ᴊ',
  K: 'ᴋ', L: 'ʟ', M: 'ᴍ', N: 'ɴ', O: 'ᴏ', P: 'ᴘ', Q: 'ǫ', R: 'ʀ', S: 's', T: 'ᴛ',
  U: 'ᴜ', V: 'ᴠ', W: 'ᴡ', X: 'x', Y: 'ʏ', Z: 'ᴢ',
  'ç': 'ᴄ', 'ğ': 'ɢ', 'ı': 'ɪ', 'ö': 'ᴏ', 'ş': 's', 'ü': 'ᴜ',
  'Ç': 'ᴄ', 'Ğ': 'ɢ', 'İ': 'ɪ', 'Ö': 'ᴏ', 'Ş': 's', 'Ü': 'ᴜ'
};

export function toSmallCaps(text: string): string {
  return text.split('').map(c => smallCapsMap[c] || c).join('');
}

// Inverted / Upside Down mapping
const upsideDownMap: Record<string, string> = {
  a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ',
  k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ',
  u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
  A: '∀', B: '𐐒', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I', J: 'ſ',
  K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Ό', R: 'ᴚ', S: 'S', T: '┴',
  U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
  '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ',
  '8': '8', '9': '6', '.': '˙', ',': '\'', '?': '¿', '!': '¡', '(': ')', ')': '(',
  '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<', '_': '‾'
};

export function toUpsideDown(text: string): string {
  const norm = normalizeTurkish(text);
  return norm.split('').reverse().map(c => upsideDownMap[c] || c).join('');
}

// Reversed / Mirror mapping
const mirrorMap: Record<string, string> = {
  a: 'ɒ', b: 'd', c: 'ɔ', d: 'b', e: 'ɘ', f: 'ʇ', g: 'ǫ', h: 'ʜ', i: 'i', j: 'ɾ',
  k: 'ʞ', l: 'l', m: 'm', n: 'n', o: 'o', p: 'q', q: 'p', r: 'ɿ', s: 'ꙅ', t: 'ƚ',
  u: 'u', v: 'v', w: 'w', x: 'x', y: 'ʏ', z: 'ƹ',
  A: 'A', B: 'ᙠ', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'ᖷ', G: 'Ꭾ', H: 'H', I: 'I', J: 'Ⴑ',
  K: 'ʞ', L: '⅃', M: 'M', N: 'И', O: 'O', P: 'ꟼ', Q: 'Ọ', R: 'Я', S: 'Ƨ', T: 'T',
  U: 'U', V: 'V', W: 'W', X: 'X', Y: 'Y', Z: 'Ƶ',
};

export function toReversed(text: string): string {
  const norm = normalizeTurkish(text);
  return norm.split('').reverse().map(c => mirrorMap[c] || c).join('');
}

// Combining diacritic overlays
export function withCombiningDiacritic(text: string, diacritic: string): string {
  return text.split('').map(c => c === ' ' ? ' ' : c + diacritic).join('');
}

// Leet speak mapping
const leetMap: Record<string, string> = {
  a: '4', b: '8', e: '3', g: '9', i: '1', l: '1', o: '0', s: '5', t: '7', z: '2',
  A: '4', B: '8', E: '3', G: '9', I: '1', L: '1', O: '0', S: '5', T: '7', Z: '2'
};

export function toLeet(text: string): string {
  const norm = normalizeTurkish(text);
  return norm.split('').map(c => leetMap[c] || c).join('');
}

// Morse code
const morseMap: Record<string, string> = {
  a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.', g: '--.', h: '....',
  i: '..', j: '.---', k: '-.-', l: '.-..', m: '--', n: '-.', o: '---', p: '.--.',
  q: '--.-', r: '.-.', s: '...', t: '-', u: '..-', v: '...-', w: '.--', x: '-..-',
  y: '-.--', z: '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  ' ': '/'
};

export function toMorse(text: string): string {
  const norm = normalizeTurkish(text.toLowerCase());
  return norm.split('').map(c => morseMap[c] || c).join(' ');
}

// Binary code
export function toBinary(text: string): string {
  return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
}

// Zalgo / Glitch Generator
const zalgoUp = ['\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310', '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a', '\u034b', '\u034c', '\u0350', '\u0300', '\u0301', '\u0302', '\u0303', '\u030b', '\u030c', '\u0312', '\u0313', '\u0314', '\u033d', '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369', '\u036a', '\u036b', '\u036c', '\u036d', '\u036e', '\u036f', '\u033e', '\u035b', '\u0346', '\u031a'];
const zalgoMid = ['\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321', '\u0322', '\u0327', '\u0328', '\u0334', '\u0335', '\u0336', '\u034f', '\u035c', '\u035d', '\u035e', '\u035f', '\u0360', '\u0362', '\u0338', '\u0337', '\u0361', '\u0349'];
const zalgoDown = ['\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f', '\u0320', '\u0324', '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c', '\u032d', '\u032e', '\u032f', '\u0330', '\u0331', '\u0332', '\u0333', '\u0339', '\u033a', '\u033b', '\u033c', '\u0345', '\u0347', '\u0348', '\u034d', '\u034e', '\u0353', '\u0354', '\u0355', '\u0356', '\u0359', '\u035a', '\u0323'];

export function toZalgo(text: string, intensity = 2): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    result += char;
    if (char === ' ') continue;
    
    for (let u = 0; u < intensity; u++) {
      result += zalgoUp[Math.floor(Math.random() * zalgoUp.length)];
    }
    for (let m = 0; m < Math.floor(intensity / 2); m++) {
      result += zalgoMid[Math.floor(Math.random() * zalgoMid.length)];
    }
    for (let d = 0; d < intensity; d++) {
      result += zalgoDown[Math.floor(Math.random() * zalgoDown.length)];
    }
  }
  return result;
}

// Spacing out text
export function toSpaced(text: string): string {
  return text.split('').join(' ');
}

// Alternating case
export function toAlternating(text: string): string {
  return text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
}

// Curved / Wave decorator
export function toWavy(text: string): string {
  return text.split('').map((c, i) => i % 2 === 0 ? c + '\u0303' : c + '\u0330').join('');
}

export interface FontStyleItem {
  id: string;
  name: string;
  category: 'popular' | 'nick' | 'aesthetic' | 'special' | 'boxed' | 'symbols';
  categoryLabel: string;
  tags?: string[];
  transform: (text: string) => string;
}

export const FONT_STYLES: FontStyleItem[] = [
  // --- POPULAR FONTS ---
  {
    id: 'bold-serif',
    name: 'Kalın Serif (Matematik)',
    category: 'popular',
    categoryLabel: 'Popüler & Klasik',
    transform: (t) => mapToFont(t, maps.boldSerif),
  },
  {
    id: 'sans-bold',
    name: 'Kalın Sans-Serif (Modern)',
    category: 'popular',
    categoryLabel: 'Popüler & Klasik',
    transform: (t) => mapToFont(t, maps.sansBold),
  },
  {
    id: 'script-cursive',
    name: 'Zarif El Yazısı (Cursive)',
    category: 'popular',
    categoryLabel: 'Popüler & Klasik',
    transform: (t) => mapToFont(t, maps.script),
  },
  {
    id: 'bold-script',
    name: 'Kalın Süslü El Yazısı',
    category: 'popular',
    categoryLabel: 'Popüler & Klasik',
    transform: (t) => mapToFont(t, maps.boldScript),
  },
  {
    id: 'gothic-fraktur',
    name: 'Gotik / Fraktur',
    category: 'popular',
    categoryLabel: 'Popüler & Klasik',
    transform: (t) => mapToFont(t, maps.fraktur),
  },
  {
    id: 'bold-fraktur',
    name: 'Koyu Gotik (Ağır Zırh)',
    category: 'popular',
    categoryLabel: 'Popüler & Klasik',
    transform: (t) => mapToFont(t, maps.boldFraktur),
  },
  {
    id: 'double-struck',
    name: 'Çift Çizgili (Blackboard)',
    category: 'popular',
    categoryLabel: 'Popüler & Klasik',
    transform: (t) => mapToFont(t, maps.doubleStruck),
  },
  {
    id: 'small-caps',
    name: 'Küçük Büyük Harfler (Small Caps)',
    category: 'popular',
    categoryLabel: 'Popüler & Klasik',
    transform: (t) => toSmallCaps(t),
  },
  {
    id: 'monospace-font',
    name: 'Daktilo / Monospace',
    category: 'popular',
    categoryLabel: 'Popüler & Klasik',
    transform: (t) => mapToFont(t, maps.monospace),
  },
  {
    id: 'italic-serif',
    name: 'İtalik Serif (Eğik)',
    category: 'popular',
    categoryLabel: 'Popüler & Klasik',
    transform: (t) => mapToFont(t, maps.italicSerif),
  },
  {
    id: 'sans-italic',
    name: 'İtalik Sans (Dinamik)',
    category: 'popular',
    categoryLabel: 'Popüler & Klasik',
    transform: (t) => mapToFont(t, maps.sansItalic),
  },
  {
    id: 'sans-bold-italic',
    name: 'Kalın İtalik Sans',
    category: 'popular',
    categoryLabel: 'Popüler & Klasik',
    transform: (t) => mapToFont(t, maps.sansBoldItalic),
  },

  // --- BOXED & BUBBLES ---
  {
    id: 'circles-white',
    name: 'Beyaz Yuvarlak (Bubble)',
    category: 'boxed',
    categoryLabel: 'Kutulu & Çember',
    transform: (t) => mapToFont(t, maps.circles),
  },
  {
    id: 'circles-black',
    name: 'Siyah Yuvarlak (Koyu Bubble)',
    category: 'boxed',
    categoryLabel: 'Kutulu & Çember',
    transform: (t) => mapToFont(t, maps.negativeCircles),
  },
  {
    id: 'squared-white',
    name: 'Kare Çerçeveli (Boxed)',
    category: 'boxed',
    categoryLabel: 'Kutulu & Çember',
    transform: (t) => mapToFont(t, maps.squared),
  },
  {
    id: 'squared-black',
    name: 'Siyah Kare Kutu',
    category: 'boxed',
    categoryLabel: 'Kutulu & Çember',
    transform: (t) => mapToFont(t, maps.negativeSquared),
  },
  {
    id: 'parenthesized-font',
    name: 'Parantezli Harfler',
    category: 'boxed',
    categoryLabel: 'Kutulu & Çember',
    transform: (t) => mapToFont(t, maps.parenthesized),
  },
  {
    id: 'brackets-capsule',
    name: 'Köşeli Parantezli [T][E][X][T]',
    category: 'boxed',
    categoryLabel: 'Kutulu & Çember',
    transform: (t) => t.split('').filter(c => c !== ' ').map(c => `[${c}]`).join(' '),
  },
  {
    id: 'brace-style',
    name: 'Süslü Parantez {T}{E}{X}{T}',
    category: 'boxed',
    categoryLabel: 'Kutulu & Çember',
    transform: (t) => t.split('').filter(c => c !== ' ').map(c => `{${c}}`).join(' '),
  },

  // --- AESTHETIC & STYLISH ---
  {
    id: 'vaporwave-wide',
    name: 'Vaporwave / Estetik Geniş Harfler',
    category: 'aesthetic',
    categoryLabel: 'Estetik & Sosyal Medya',
    transform: (t) => mapToFont(t, maps.fullwidth),
  },
  {
    id: 'spaced-out',
    name: 'A r a l ı k l ı  E s t e t i k',
    category: 'aesthetic',
    categoryLabel: 'Estetik & Sosyal Medya',
    transform: (t) => toSpaced(t),
  },
  {
    id: 'small-caps-spaced',
    name: 'ᴀ ʀ ᴀ ʟ ı ᴋ ʟ ı  s ᴍ ᴀ ʟ ʟ  ᴄ ᴀ ᴘ s',
    category: 'aesthetic',
    categoryLabel: 'Estetik & Sosyal Medya',
    transform: (t) => toSpaced(toSmallCaps(t)),
  },
  {
    id: 'strikethrough-single',
    name: 'Üstü Çizili (Strikethrough)',
    category: 'aesthetic',
    categoryLabel: 'Estetik & Sosyal Medya',
    transform: (t) => withCombiningDiacritic(t, '\u0336'),
  },
  {
    id: 'underline-single',
    name: 'Altı Çizili (Underline)',
    category: 'aesthetic',
    categoryLabel: 'Estetik & Sosyal Medya',
    transform: (t) => withCombiningDiacritic(t, '\u0332'),
  },
  {
    id: 'underline-double',
    name: 'Çift Altı Çizili (Double Underline)',
    category: 'aesthetic',
    categoryLabel: 'Estetik & Sosyal Medya',
    transform: (t) => withCombiningDiacritic(t, '\u0333'),
  },
  {
    id: 'overline-single',
    name: 'Üstü Çizgili (Overline)',
    category: 'aesthetic',
    categoryLabel: 'Estetik & Sosyal Medya',
    transform: (t) => withCombiningDiacritic(t, '\u0305'),
  },
  {
    id: 'slash-through',
    name: 'Eğik Çizgili (Slash-Through)',
    category: 'aesthetic',
    categoryLabel: 'Estetik & Sosyal Medya',
    transform: (t) => withCombiningDiacritic(t, '\u0337'),
  },
  {
    id: 'sparkle-aesthetic',
    name: 'Parıltılı ✧ [Metin] ✧',
    category: 'aesthetic',
    categoryLabel: 'Estetik & Sosyal Medya',
    transform: (t) => `✧･ﾟ: *✧ ${t} ✧*:･ﾟ✧`,
  },
  {
    id: 'hearts-aesthetic',
    name: 'Kalpli ♡ [Metin] ♡',
    category: 'aesthetic',
    categoryLabel: 'Estetik & Sosyal Medya',
    transform: (t) => `♡ ˗ˏˋ ${toSmallCaps(t)} ˎˊ˗ ♡`,
  },
  {
    id: 'clouds-aesthetic',
    name: 'Bulutlu ⋆⁺₊⋆ ☾ [Metin] ⋆⁺₊⋆',
    category: 'aesthetic',
    categoryLabel: 'Estetik & Sosyal Medya',
    transform: (t) => `⋆⁺₊⋆ ☾ ${t} ⋆⁺₊⋆`,
  },
  {
    id: 'floral-aesthetic',
    name: 'Çiçekli ❀ [Metin] ❀',
    category: 'aesthetic',
    categoryLabel: 'Estetik & Sosyal Medya',
    transform: (t) => `❀ 𖤣𖥧 ${t} 𖥧𖤣 ❀`,
  },

  // --- NICKNAME & GAMER STYLES ---
  {
    id: 'nick-wings-mythic',
    name: 'Efsanevi Kanatlar (Mythic)',
    category: 'nick',
    categoryLabel: 'Oyun Nickleri & Klan',
    transform: (t) => `꧁༺${mapToFont(t, maps.boldFraktur)}༻꧂`,
  },
  {
    id: 'nick-pubg-boss',
    name: 'PUBG / Oyun Boss 亗',
    category: 'nick',
    categoryLabel: 'Oyun Nickleri & Klan',
    transform: (t) => `亗 ${t.toUpperCase()} 亗`,
  },
  {
    id: 'nick-star-swords',
    name: 'Yıldızlı Kılıçlar ★彡',
    category: 'nick',
    categoryLabel: 'Oyun Nickleri & Klan',
    transform: (t) => `★彡[ ${t} ]彡★`,
  },
  {
    id: 'nick-crown-king',
    name: 'Hükümdar Tacı ♛ Kral',
    category: 'nick',
    categoryLabel: 'Oyun Nickleri & Klan',
    transform: (t) => `♛ ❝ ${mapToFont(t, maps.boldSerif)} ❞ ♛`,
  },
  {
    id: 'nick-cross-x',
    name: 'Samuray X 乂 [Metin] 乂',
    category: 'nick',
    categoryLabel: 'Oyun Nickleri & Klan',
    transform: (t) => `乂 ${mapToFont(t, maps.sansBold)} 乂`,
  },
  {
    id: 'nick-sniper-rifle',
    name: 'Keskin Nişancı Sniper ╾━╤デ╦︻',
    category: 'nick',
    categoryLabel: 'Oyun Nickleri & Klan',
    transform: (t) => `╾━╤デ╦︻ ${t.toUpperCase()}`,
  },
  {
    id: 'nick-assassin-blades',
    name: 'Suikastçi Hançerler ⚔️',
    category: 'nick',
    categoryLabel: 'Oyun Nickleri & Klan',
    transform: (t) => `⚔️ ⟪ ${toSmallCaps(t)} ⟫ ⚔️`,
  },
  {
    id: 'nick-lightning-pulse',
    name: 'Şimşek Yıldırım ⚡',
    category: 'nick',
    categoryLabel: 'Oyun Nickleri & Klan',
    transform: (t) => `⚡ ${mapToFont(t, maps.sansBold)} ⚡`,
  },
  {
    id: 'nick-toxic-smile',
    name: 'Toxıc Gülüş ×͜×',
    category: 'nick',
    categoryLabel: 'Oyun Nickleri & Klan',
    transform: (t) => `×͜× ${t}`,
  },
  {
    id: 'nick-diamond-clan',
    name: 'Elmas Klan ◆ [Metin] ◆',
    category: 'nick',
    categoryLabel: 'Oyun Nickleri & Klan',
    transform: (t) => `◆━━━《 ${t} 》━━━◆`,
  },
  {
    id: 'nick-heartbeat-line',
    name: 'Kalp Ritmi EKG ﮩ٨ـﮩﮩʌـ',
    category: 'nick',
    categoryLabel: 'Oyun Nickleri & Klan',
    transform: (t) => `ﮩ٨ـﮩﮩʌـﮩ٨ـﮩﮩʌـ ${t} ﮩ٨ـﮩﮩʌـ`,
  },
  {
    id: 'nick-retro-border',
    name: 'Retro Dalga •´¯`•.',
    category: 'nick',
    categoryLabel: 'Oyun Nickleri & Klan',
    transform: (t) => '•´¯`•. [ ' + t + ' ] .•´¯`•',
  },
  {
    id: 'nick-double-stars',
    name: 'Çift Yıldız Kuşak ╰•★★',
    category: 'nick',
    categoryLabel: 'Oyun Nickleri & Klan',
    transform: (t) => `╰•★★ ${mapToFont(t, maps.boldSerif)} ★★•╯`,
  },
  {
    id: 'nick-dark-angel',
    name: 'Karanlık Melek ༒☬',
    category: 'nick',
    categoryLabel: 'Oyun Nickleri & Klan',
    transform: (t) => `꧁༒☬${t.toUpperCase()}☬༒꧂`,
  },
  {
    id: 'nick-cyber-bracket',
    name: 'Cyberpunk Kenarlık ░▒▓█',
    category: 'nick',
    categoryLabel: 'Oyun Nickleri & Klan',
    transform: (t) => `░▒▓█ ${t.toUpperCase()} █▓▒░`,
  },

  // --- SPECIAL & FUN ENCODINGS ---
  {
    id: 'zalgo-glitch',
    name: 'Glitch / Zalgo (Bozuk Yazı)',
    category: 'special',
    categoryLabel: 'Özel & Eğlenceli',
    transform: (t) => toZalgo(t, 2),
  },
  {
    id: 'upside-down',
    name: 'Baş Aşağı / Ters Yazı (˙ʇxǝʇ)',
    category: 'special',
    categoryLabel: 'Özel & Eğlenceli',
    transform: (t) => toUpsideDown(t),
  },
  {
    id: 'reversed-mirror',
    name: 'Ayna / Geriye Doğru (ɿoɿɿiM)',
    category: 'special',
    categoryLabel: 'Özel & Eğlenceli',
    transform: (t) => toReversed(t),
  },
  {
    id: 'alternating-case',
    name: 'bİr BüyÜk bİr KüÇük',
    category: 'special',
    categoryLabel: 'Özel & Eğlenceli',
    transform: (t) => toAlternating(t),
  },
  {
    id: 'leet-speak',
    name: 'Hacker / Leet Speak (1337)',
    category: 'special',
    categoryLabel: 'Özel & Eğlenceli',
    transform: (t) => toLeet(t),
  },
  {
    id: 'morse-code',
    name: 'Mors Alfabesi (- . - -)',
    category: 'special',
    categoryLabel: 'Özel & Eğlenceli',
    transform: (t) => toMorse(t),
  },
  {
    id: 'binary-code',
    name: 'İkili Kod (Binary 0101)',
    category: 'special',
    categoryLabel: 'Özel & Eğlenceli',
    transform: (t) => toBinary(t),
  },
];
