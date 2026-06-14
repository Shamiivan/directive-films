/**
 * DirectiveFilms Design Tokens
 * Import and use these tokens throughout your React application
 */

export const colors = {
  // Brand Colors
  brand: {
    gold: 'var(--color-gold)',
    goldHover: 'var(--color-gold-hover)',
    black: 'var(--color-black)',
  },

  // Background Colors
  bg: {
    primary: 'var(--color-bg-light)',
    secondary: 'var(--color-bg-light-card)',
    tertiary: 'var(--color-bg-tertiary)',
    dark: 'var(--color-bg-dark)',
    deep: 'var(--color-bg-deep)',
    darkCard: 'var(--color-bg-dark-card)',
    darkElevated: 'var(--color-bg-dark-elevated)',
  },

  // Text Colors
  text: {
    primary: 'var(--color-text-on-light)',
    secondary: 'var(--color-text-on-light-secondary)',
    tertiary: 'var(--color-text-on-light-muted)',
    muted: 'var(--color-text-muted)',
    onLight: 'var(--color-text-on-light)',
    onDark: 'var(--color-text-on-dark)',
    onDarkSecondary: 'var(--color-text-on-dark-secondary)',
    onDarkMuted: 'var(--color-text-on-dark-muted)',
  },

  // Border Colors
  border: {
    light: 'var(--color-border-on-light)',
    medium: 'var(--color-border-on-light-strong)',
    dark: 'var(--color-border-dark)',
    subtle: 'var(--color-border-subtle)',
    darkSubtle: 'var(--color-border-dark-subtle)',
    darkMedium: 'var(--color-border-dark-medium)',
  },
};

export const typography = {
  // Font Families
  fontFamily: {
    display: 'var(--font-display, Fraunces, Georgia, serif)',
    body: 'var(--font-body, Archivo, sans-serif)',
    mono: 'var(--font-mono, "JetBrains Mono", monospace)',
    primary: 'var(--font-body, Archivo, sans-serif)',
  },

  // Font Sizes
  fontSize: {
    display1: 'var(--font-size-display1)',
    display2: 'var(--font-size-display2)',
    h1: 'var(--font-size-h1)',
    h2: 'var(--font-size-h2)',
    h3: 'var(--font-size-h3)',
    h4: 'var(--font-size-h4)',
    bodyLg: 'var(--font-size-body-lg)',
    body: 'var(--font-size-body)',
    bodySm: 'var(--font-size-body-sm)',
    ui: 'var(--font-size-ui)',
    caption: 'var(--font-size-caption)',
    label: 'var(--font-size-label)',
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
    snug: 1.2,
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
  xs: 'var(--space-xs)',
  sm: 'var(--space-sm)',
  md: 'var(--space-md)',
  lg: 'var(--space-lg)',
  xl: 'var(--space-xl)',
  '2xl': 'var(--space-2xl)',
  '3xl': 'var(--space-3xl)',
  '4xl': 'var(--space-4xl)',
};

export const layout = {
  containerMaxWidth: 'var(--container-max-width)',
  containerPadding: 'var(--container-padding)',
  containerPaddingMobile: 'var(--container-padding-mobile)',
  sectionPadding: 'var(--section-padding)',
  sectionPaddingMobile: 'var(--section-padding-mobile)',
};

export const borderRadius = {
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
  full: 'var(--radius-full)',
};

export const shadows = {
  sm: 'var(--shadow-sm)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)',
  gold: 'var(--shadow-gold)',
  goldMd: 'var(--shadow-gold-md)',
  goldLg: 'var(--shadow-gold-lg)',
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
