'use client';

import React from 'react';
import { colors, typography, spacing, borderRadius, shadows, transitions } from '../../tokens';

export default function DesignSystemPage() {
  const styles = {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: typography.fontFamily.primary,
      background: colors.bg.primary,
      color: colors.text.primary,
    },

    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 60px',
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(10px)',
    },

    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.md,
      fontWeight: typography.fontWeight.bold,
      fontSize: typography.fontSize.body,
    },

    logoIcon: {
      width: '40px',
      height: '40px',
      background: colors.brand.gold,
      transform: 'rotate(45deg)',
      position: 'relative' as const,
    },

    navList: {
      display: 'flex',
      gap: spacing.xl,
      listStyle: 'none',
      margin: 0,
    },

    navLink: {
      color: colors.text.primary,
      textDecoration: 'none',
      fontSize: typography.fontSize.body,
      transition: transitions.base,
    },

    navBtn: {
      background: colors.bg.primary,
      color: colors.text.primary,
      border: `2px solid ${colors.text.primary}`,
      padding: '10px 24px',
      borderRadius: borderRadius.full,
      cursor: 'pointer',
      transition: transitions.base,
      fontFamily: 'inherit',
      fontSize: typography.fontSize.body,
    },

    hero: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center' as const,
      padding: '120px 40px 80px',
      position: 'relative' as const,
      overflow: 'hidden',
    },

    heroTitle: {
      fontSize: typography.fontSize.display1,
      fontWeight: typography.fontWeight.bold,
      lineHeight: typography.lineHeight.tight,
      marginBottom: spacing.lg,
      margin: 0,
    },

    gold: {
      color: colors.brand.gold,
    },

    heroSubtitle: {
      fontSize: typography.fontSize.bodyLg,
      color: colors.text.secondary,
      marginBottom: spacing['2xl'],
      maxWidth: '600px',
    },

    section: {
      maxWidth: '1440px',
      margin: '0 auto',
      padding: `${spacing['4xl']} ${spacing.xl}`,
    },

    sectionTitle: {
      fontSize: typography.fontSize.h1,
      fontWeight: typography.fontWeight.semibold,
      marginBottom: spacing.md,
      textAlign: 'center' as const,
    },

    sectionSubtitle: {
      fontSize: typography.fontSize.bodyLg,
      color: colors.text.secondary,
      textAlign: 'center' as const,
      marginBottom: spacing['3xl'],
    },

    colorGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: spacing.xl,
      marginBottom: spacing['3xl'],
    },

    colorCard: {
      background: colors.bg.secondary,
      borderRadius: borderRadius.lg,
      overflow: 'hidden',
      transition: transitions.base,
      border: `1px solid ${colors.border.light}`,
    },

    colorSwatch: {
      height: '180px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Courier New', monospace",
      fontWeight: typography.fontWeight.semibold,
    },

    colorInfo: {
      padding: spacing.lg,
    },

    colorName: {
      fontSize: typography.fontSize.h4,
      fontWeight: typography.fontWeight.semibold,
      marginBottom: spacing.sm,
    },

    colorValues: {
      fontFamily: "'Courier New', monospace",
      fontSize: typography.fontSize.bodySm,
      color: colors.text.secondary,
      marginBottom: spacing.md,
    },

    usageTag: {
      display: 'inline-block',
      padding: '4px 12px',
      background: colors.bg.primary,
      borderRadius: borderRadius.sm,
      fontSize: typography.fontSize.caption,
      color: colors.text.tertiary,
      marginRight: spacing.sm,
    },

    typeGrid: {
      display: 'grid',
      gap: spacing.xl,
    },

    typeExample: {
      background: colors.bg.secondary,
      padding: spacing['2xl'],
      borderRadius: borderRadius.lg,
      border: `1px solid ${colors.border.light}`,
    },

    typeLabel: {
      fontSize: typography.fontSize.caption,
      color: colors.brand.gold,
      textTransform: 'uppercase' as const,
      letterSpacing: '1px',
      marginBottom: spacing.md,
      fontWeight: typography.fontWeight.semibold,
    },

    typeSpecs: {
      fontFamily: "'Courier New', monospace",
      fontSize: typography.fontSize.bodySm,
      color: colors.text.tertiary,
      marginTop: spacing.md,
      paddingTop: spacing.md,
      borderTop: `1px solid ${colors.border.light}`,
    },

    buttonGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: spacing.xl,
    },

    buttonExample: {
      background: colors.bg.secondary,
      padding: spacing['2xl'],
      borderRadius: borderRadius.lg,
      border: `1px solid ${colors.border.light}`,
      textAlign: 'center' as const,
    },

    btn: {
      padding: '12px 32px',
      borderRadius: borderRadius.full,
      fontWeight: typography.fontWeight.semibold,
      fontSize: typography.fontSize.body,
      cursor: 'pointer',
      transition: transitions.base,
      fontFamily: 'inherit',
      border: 'none',
    },

    btnPrimary: {
      background: colors.brand.gold,
      color: colors.bg.primary,
    },

    btnSecondary: {
      background: 'transparent',
      color: colors.brand.gold,
      border: `2px solid ${colors.brand.gold}`,
    },

    btnOutline: {
      background: 'transparent',
      color: colors.text.primary,
      border: `2px solid ${colors.text.primary}`,
    },

    spacingGrid: {
      display: 'grid',
      gap: spacing.lg,
    },

    spacingItem: {
      background: colors.bg.secondary,
      padding: spacing.lg,
      borderRadius: borderRadius.lg,
      border: `1px solid ${colors.border.light}`,
      display: 'flex',
      alignItems: 'center',
      gap: spacing.lg,
    },

    spacingVisual: {
      height: '40px',
      background: colors.brand.gold,
    },

    spacingLabel: {
      fontFamily: "'Courier New', monospace",
      fontWeight: typography.fontWeight.semibold,
      minWidth: '100px',
      color: colors.brand.gold,
    },

    spacingDesc: {
      color: colors.text.secondary,
    },
  };

  const colorPalette = [
    { name: 'Black', hex: '#000000', token: '--color-bg-primary', rgb: '0, 0, 0', usage: ['Primary BG'] },
    { name: 'Gold', hex: '#FDB714', token: '--color-brand-gold', rgb: '253, 183, 20', usage: ['Brand', 'CTAs'] },
    { name: 'White', hex: '#FFFFFF', token: '--color-text-primary', rgb: '255, 255, 255', usage: ['Primary Text'] },
    { name: 'Charcoal', hex: '#1A1A1A', token: '--color-bg-secondary', rgb: '26, 26, 26', usage: ['Cards'] },
    { name: 'Light Gray', hex: '#CCCCCC', token: '--color-text-secondary', rgb: '204, 204, 204', usage: ['Secondary Text'] },
    { name: 'Dark Gray', hex: '#666666', token: '--color-text-muted', rgb: '102, 102, 102', usage: ['Muted Text'] },
  ];

  const typeExamples = [
    { label: 'Display 1', text: 'Driven by Purpose', size: '56px', weight: '700', lineHeight: '1.2', token: '--font-size-display-1' },
    { label: 'Display 2', text: 'Define by Excellence', size: '48px', weight: '600', lineHeight: '1.2', token: '--font-size-display-2' },
    { label: 'Heading 1', text: 'Strategic Growth Planning', size: '40px', weight: '600', lineHeight: '1.4', token: '--font-size-h1' },
    { label: 'Heading 2', text: 'Expert Consultation', size: '32px', weight: '600', lineHeight: '1.4', token: '--font-size-h2' },
    { label: 'Body Large', text: 'If your goal is to generate leads we have the perspective, passion, and talent to make it happen.', size: '18px', weight: '400', lineHeight: '1.6', token: '--font-size-body-lg' },
    { label: 'Body Regular', text: 'Our team combines strategic thinking with creative execution.', size: '16px', weight: '400', lineHeight: '1.6', token: '--font-size-body' },
  ];

  const spacingScale = [
    { label: '4px (xs)', width: '4px', token: '--space-xs', desc: 'Minimal spacing' },
    { label: '8px (sm)', width: '8px', token: '--space-sm', desc: 'Tight spacing' },
    { label: '16px (md)', width: '16px', token: '--space-md', desc: 'Base spacing' },
    { label: '24px (lg)', width: '24px', token: '--space-lg', desc: 'Medium spacing' },
    { label: '32px (xl)', width: '32px', token: '--space-xl', desc: 'Large spacing' },
    { label: '48px (2xl)', width: '48px', token: '--space-2xl', desc: 'Extra large spacing' },
    { label: '64px (3xl)', width: '64px', token: '--space-3xl', desc: 'Section spacing' },
    { label: '80px (4xl)', width: '80px', token: '--space-4xl', desc: 'Page spacing' },
  ];

  return (
    <div style={styles.body}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}></div>
          DirectiveFilms
        </div>
        <ul style={styles.navList}>
          <li><a href="#colors" style={styles.navLink}>Colors</a></li>
          <li><a href="#typography" style={styles.navLink}>Typography</a></li>
          <li><a href="#buttons" style={styles.navLink}>Buttons</a></li>
          <li><a href="#spacing" style={styles.navLink}>Spacing</a></li>
        </ul>
        <button style={styles.navBtn}>Get Started</button>
      </nav>

      {/* Hero */}
      <section style={styles.hero}>
        <div>
          <h1 style={styles.heroTitle}>
            Design by <span style={styles.gold}>System</span><br />
            Build by <span style={styles.gold}>Tokens</span>
          </h1>
          <p style={styles.heroSubtitle}>
            A comprehensive design system built for consistency, scalability, and excellence.
          </p>
          <button style={{...styles.btn, ...styles.btnPrimary}}>
            Explore Design Tokens
          </button>
        </div>
      </section>

      {/* Colors Section */}
      <section style={styles.section} id="colors">
        <h2 style={styles.sectionTitle}>Color System</h2>
        <p style={styles.sectionSubtitle}>Our color palette creates a bold, premium brand experience</p>

        <div style={styles.colorGrid}>
          {colorPalette.map((color, index) => (
            <div key={index} style={styles.colorCard}>
              <div style={{
                ...styles.colorSwatch,
                background: color.hex,
                color: color.hex === '#FFFFFF' || color.hex === '#CCCCCC' ? '#000' : '#fff',
                border: color.hex === '#FFFFFF' ? '1px solid #333' : 'none'
              }}>
                {color.hex}
              </div>
              <div style={styles.colorInfo}>
                <div style={styles.colorName}>{color.name}</div>
                <div style={styles.colorValues}>
                  <div>{color.token}</div>
                  <div>RGB: {color.rgb}</div>
                </div>
                {color.usage.map((use, i) => (
                  <span key={i} style={styles.usageTag}>{use}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography Section */}
      <section style={styles.section} id="typography">
        <h2 style={styles.sectionTitle}>Typography</h2>
        <p style={styles.sectionSubtitle}>Clean, professional type system with clear hierarchy</p>

        <div style={styles.typeGrid}>
          {typeExamples.map((example, index) => (
            <div key={index} style={styles.typeExample}>
              <div style={styles.typeLabel}>{example.label}</div>
              <div style={{
                fontSize: example.size,
                fontWeight: example.weight,
                lineHeight: example.lineHeight,
                color: example.label.includes('Body') ? colors.text.secondary : colors.text.primary
              }}>
                {example.text}
              </div>
              <div style={styles.typeSpecs}>
                font-size: {example.size} ({example.token}) | weight: {example.weight} | line-height: {example.lineHeight}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Buttons Section */}
      <section style={styles.section} id="buttons">
        <h2 style={styles.sectionTitle}>Buttons</h2>
        <p style={styles.sectionSubtitle}>Interactive components with hover states</p>

        <div style={styles.buttonGrid}>
          <div style={styles.buttonExample}>
            <h4 style={{marginBottom: spacing.md}}>Primary Button</h4>
            <p style={{color: colors.text.secondary, marginBottom: '20px', fontSize: '14px'}}>
              Main call-to-action
            </p>
            <button style={{...styles.btn, ...styles.btnPrimary}}>
              Get a Growth Plan
            </button>
          </div>

          <div style={styles.buttonExample}>
            <h4 style={{marginBottom: spacing.md}}>Secondary Button</h4>
            <p style={{color: colors.text.secondary, marginBottom: '20px', fontSize: '14px'}}>
              Secondary actions
            </p>
            <button style={{...styles.btn, ...styles.btnSecondary}}>
              Learn More
            </button>
          </div>

          <div style={styles.buttonExample}>
            <h4 style={{marginBottom: spacing.md}}>Outline Button</h4>
            <p style={{color: colors.text.secondary, marginBottom: '20px', fontSize: '14px'}}>
              Tertiary actions
            </p>
            <button style={{...styles.btn, ...styles.btnOutline}}>
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Spacing Section */}
      <section style={styles.section} id="spacing">
        <h2 style={styles.sectionTitle}>Spacing Scale</h2>
        <p style={styles.sectionSubtitle}>Consistent spacing creates rhythm and hierarchy</p>

        <div style={styles.spacingGrid}>
          {spacingScale.map((space, index) => (
            <div key={index} style={styles.spacingItem}>
              <div style={styles.spacingLabel}>{space.label}</div>
              <div style={{...styles.spacingVisual, width: space.width}}></div>
              <div style={styles.spacingDesc}>{space.token} | {space.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
