type Rgb = { r: number; g: number; b: number };
type Hsl = { h: number; s: number; l: number };

function parseHex(hex: string): Rgb {
  const normalized = hex.replace("#", "");
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function rgbToHsl(r: number, g: number, b: number): Hsl {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const lightness = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l: lightness };
  }

  const delta = max - min;
  const saturation =
    lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

  let hue = 0;
  switch (max) {
    case rn:
      hue = ((gn - bn) / delta + (gn < bn ? 6 : 0)) / 6;
      break;
    case gn:
      hue = ((bn - rn) / delta + 2) / 6;
      break;
    default:
      hue = ((rn - gn) / delta + 4) / 6;
      break;
  }

  return { h: hue * 360, s: saturation, l: lightness };
}

function hslToHex(h: number, s: number, l: number) {
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  const toHex = (channel: number) =>
    Math.round((channel + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function relativeLuminance({ r, g, b }: Rgb) {
  const channel = (value: number) => {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(foreground: string, background: string) {
  const fg = relativeLuminance(parseHex(foreground));
  const bg = relativeLuminance(parseHex(background));
  const lighter = Math.max(fg, bg);
  const darker = Math.min(fg, bg);
  return (lighter + 0.05) / (darker + 0.05);
}

function hasContrast(foreground: string, background: string, minRatio: number) {
  return contrastRatio(foreground, background) >= minRatio;
}

const MIN_CONTRAST = 3;

/** Complementary text color with black/white fallback when contrast is too low. */
export function getOppositeTextColor(backgroundHex: string) {
  const bg = parseHex(backgroundHex);
  const bgHsl = rgbToHsl(bg.r, bg.g, bg.b);
  const oppositeHue = (bgHsl.h + 180) % 360;

  const candidates = [
    hslToHex(oppositeHue, Math.max(bgHsl.s, 0.55) * 100, bgHsl.l * 100),
    hslToHex(oppositeHue, 70, bgHsl.l > 0.55 ? 18 : 88),
    hslToHex(oppositeHue, 55, bgHsl.l > 0.55 ? 28 : 78),
    hslToHex(oppositeHue, 85, bgHsl.l > 0.55 ? 12 : 92),
  ];

  for (const candidate of candidates) {
    if (hasContrast(candidate, backgroundHex, MIN_CONTRAST)) {
      return candidate;
    }
  }

  return bgHsl.l > 0.55 ? "#111111" : "#FFFFFF";
}
