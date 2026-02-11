/**
 * DirectiveFilms Design Tokens
 * Import and use these tokens throughout your React application
 */

export const colors = {
  // Brand Colors
  brand: {
    gold: '#FDB714',
    goldHover: '#e5a512',
    black: '#000000',
  },

  // Background Colors
  bg: {
    primary: '#000000',
    secondary: '#1A1A1A',
    tertiary: '#2A2A2A',
  },

  // Text Colors
  text: {
    primary: '#FFFFFF',
    secondary: '#CCCCCC',
    tertiary: '#999999',
    muted: '#666666',
    onLight: '#000000',
  },

  // Border Colors
  border: {
    light: '#333333',
    medium: '#444444',
    dark: '#1A1A1A',
  },
};

export const typography = {
  // Font Families
  fontFamily: {
    primary: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },

  // Font Sizes
  fontSize: {
    display1: '56px',
    display2: '48px',
    h1: '40px',
    h2: '32px',
    h3: '24px',
    h4: '20px',
    bodyLg: '18px',
    body: '16px',
    bodySm: '14px',
    caption: '12px',
  },

  // Font Weights
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
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
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.2)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.3)',
  glowGold: '0 4px 20px rgba(253, 183, 20, 0.3)',
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
    premium: [0.25, 0.1, 0.25, 1], // For framer-motion
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
