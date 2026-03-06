/**
 * DirectiveFilms Design Tokens
 * Import and use these tokens throughout your React application
 */

export const colors = {
  // Brand Colors
  brand: {
    gold: '#FDB714',
    goldHover: '#e5a512',
    black: '#0a1628',
  },

  // Background Colors
  bg: {
    primary: '#ffffff',
    secondary: '#f7f8fa',
    tertiary: '#eef1f5',
    dark: '#0a1628',
    deep: '#071020',
  },

  // Text Colors
  text: {
    primary: '#0f1729',
    secondary: '#374151',
    tertiary: '#6b7280',
    muted: '#9ca3af',
    onLight: '#0f1729',
    onDark: '#ffffff',
    onDarkSecondary: 'rgba(255, 255, 255, 0.7)',
    onDarkMuted: 'rgba(255, 255, 255, 0.4)',
  },

  // Border Colors
  border: {
    light: '#e5e7eb',
    medium: '#d1d5db',
    dark: '#f3f4f6',
    subtle: '#e5e7eb',
  },
};

export const typography = {
  // Font Families - Clean sans-serif (Inter + Space Mono)
  fontFamily: {
    display: 'var(--font-display, Inter, sans-serif)',
    body: 'var(--font-body, Inter, sans-serif)',
    mono: 'var(--font-mono, "Space Mono", monospace)',
    primary: 'var(--font-body, Inter, sans-serif)',
  },

  // Font Sizes
  fontSize: {
    display1: '64px',
    display2: '52px',
    h1: '40px',
    h2: '32px',
    h3: '24px',
    h4: '20px',
    bodyLg: '18px',
    body: '16px',
    bodySm: '14px',
    caption: '12px',
    label: '11px',
  },

  // Font Weights
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Line Heights
  lineHeight: {
    tight: 1.1,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },

  // Letter Spacing
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.01em',
    wider: '0.05em',
    widest: '0.1em',
    ultra: '0.2em',
  },
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '80px',
};

export const layout = {
  containerMaxWidth: '1400px',
  containerPadding: '40px',
  containerPaddingMobile: '20px',
  sectionPadding: '60px',
  sectionPaddingMobile: '40px',
};

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
  md: '0 4px 12px rgba(0, 0, 0, 0.06)',
  lg: '0 12px 24px rgba(0, 0, 0, 0.08)',
  xl: '0 24px 48px rgba(0, 0, 0, 0.1)',
  gold: '0 4px 12px rgba(253, 183, 20, 0.2)',
  goldMd: '0 4px 20px rgba(253, 183, 20, 0.25)',
  goldLg: '0 8px 24px rgba(253, 183, 20, 0.3)',
};

export const transitions = {
  fast: '150ms ease-in-out',
  base: '250ms ease-in-out',
  slow: '350ms ease-in-out',
  premium: '600ms cubic-bezier(0.25, 0.1, 0.25, 1)',
};

export const animations = {
  // Easing curves
  easing: {
    premium: [0.25, 0.1, 0.25, 1],
    smooth: [0.4, 0.0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
  },
  // Duration values (in seconds for framer-motion)
  duration: {
    fast: 0.2,
    base: 0.3,
    slow: 0.6,
    slower: 1.2,
  },
  // Spring configs
  spring: {
    gentle: { stiffness: 100, damping: 15 },
    snappy: { stiffness: 300, damping: 25 },
    bouncy: { stiffness: 400, damping: 10 },
  },
};

export const zIndex = {
  dropdown: 100,
  modal: 200,
  popover: 300,
  tooltip: 400,
};
