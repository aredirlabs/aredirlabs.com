---
name: Aredir Systems
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c1c6d7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8b90a0'
  outline-variant: '#414755'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e69'
  primary-container: '#4b8eff'
  on-primary-container: '#00285c'
  inverse-primary: '#005bc1'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#ca8100'
  on-tertiary-container: '#3e2400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.08em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  xxl: 80px
  gutter: 20px
  margin: 24px
---

## Brand & Style

The design system is built upon the concept of **Venture Architecture**. It serves as a precision-engineered foundation for a modern SaaS studio, balancing the cold efficiency of high-tech infrastructure with the vibrant, organic growth of its portfolio.

The style is **Functional Minimalism**—where every pixel must justify its existence—intersected with a **High-Tech Ecosystem** aesthetic. It prioritizes data density, legibility, and developer-first authenticity. The interface should feel like a sophisticated "Command Center" or "War Room," instilling a sense of absolute control and innovative forward-momentum for both institutional investors and technical founders. 

Key visual identifiers include structural grid-line accents, subtle translucency to suggest depth without clutter, and high-contrast technical data points.

## Colors

The palette is rooted in a "void" aesthetic, using a deep charcoal base to allow technical accents to oscillate with high energy.

- **Primary (Electric Blue):** Used for primary actions, active states, and "Signal" elements. It represents the flow of data and connectivity.
- **Secondary (Emerald Green):** Reserved for growth metrics, success states, and health indicators. It symbolizes the thriving nature of the studio’s ventures.
- **Neutrals:** A monochromatic scale from `#0A0A0A` (Deep Space) to `#EDEDED` (Technical White). Surface layers utilize `#1A1A1A` to create subtle separation.
- **Semantic Accents:** Occasional use of high-visibility amber for warnings and neon-tinted variations for specific portfolio dialects (Fitness/Fantasy Sports).

Backgrounds should remain consistently dark to reduce eye strain and emphasize the "illuminated" UI elements.

## Typography

This design system utilizes a tiered typographic approach to distinguish between editorial narrative and technical data.

- **Headlines (Geist):** A sharp, modern sans-serif that embodies precision. Use tight letter-spacing for larger display sizes to create a "compacted" professional feel.
- **Body (Inter):** The workhorse for long-form content and UI descriptions. It ensures maximum readability across varying pixel densities.
- **Data & Micro-copy (JetBrains Mono):** This monospaced font is used for labels, timestamps, IDs, and metric data. It signals a "developer-first" DNA and provides a structured, rhythmic feel to data-heavy views.

All labels should be treated with uppercase styling and increased letter-spacing to enhance the technical "schematic" aesthetic.

## Layout & Spacing

The layout is governed by **Bento Grid 2.0**, a modular system of rectangular containers that organize diverse information types into a unified dashboard view.

### Grid Logic
- **Desktop:** 12-column fluid grid with 20px gutters. Elements typically span 3, 4, 6, or 12 columns.
- **Tablet:** 8-column grid with 16px gutters.
- **Mobile:** 4-column grid with 12px gutters.

### Bento Containers
Cards should utilize different "aspect-ratio" behaviors based on their content (e.g., a 2x2 grid for metrics, a 4x2 grid for graph visualizations). Spacing within containers follows a strict 4px base unit, with 16px being the standard padding for standard UI components.

Grid lines should be subtly visible (`#262626`) in certain views to reinforce the "blueprint" or "architectural" nature of the design system.

## Elevation & Depth

Depth in this design system is created through **tonal layering** and **glassmorphism** rather than traditional drop shadows.

- **Level 0 (Base):** Deep Charcoal (`#0A0A0A`). The canvas.
- **Level 1 (Surfaces):** Slate (`#1A1A1A`). Used for Bento cards and primary containers. 
- **Level 2 (Interactions):** Subtle backdrop blurs (20px) with a semi-transparent stroke (`rgba(255, 255, 255, 0.05)`) to simulate "frosted" glass overlays for menus and modals.

### Accents
Instead of shadows, use **1px inner borders** or "ghost borders" to define edges. A top-down light source is simulated with a slightly brighter top-border on cards to provide a tactile, machined quality.

## Shapes

The shape language is "Soft" yet disciplined. While the grid is rigid, the containers have slight rounding to prevent the UI from feeling aggressive or "brutalist."

- **Standard Radius:** 4px (`0.25rem`). Used for inputs, small buttons, and tags.
- **Large Radius:** 8px (`0.5rem`). Used for Bento cards and primary containers.
- **Extra Large Radius:** 12px (`0.75rem`). Reserved for large modal windows or distinct section breaks.

This subtle rounding maintains a professional, "machined" aesthetic while providing enough visual comfort for long-term usage in data-driven environments.

## Components

### Buttons
- **Primary:** Solid Electric Blue with white or deep charcoal text. No gradients.
- **Secondary:** Ghost style with a 1px Slate border and JetBrains Mono text.
- **Action:** High-contrast Emerald Green for "Deploy" or "Growth" related actions.

### Cards (Bento Style)
Bento cards are the core organizational unit. They feature a 1px border (`#262626`), a subtle background tint (`#1A1A1A`), and optionally a 0.5px "grid accent" overlay. Title labels within cards should always use `label-sm` (Monospaced).

### Inputs & Fields
Inputs are minimalist: a bottom-border only or a subtle dark fill with a high-contrast focus state (Primary Blue border). Use JetBrains Mono for input text to maintain the technical vibe.

### Chips & Tags
Chips use a monospaced font and are categorized by color:
- **Neutral:** Slate background.
- **Growth:** Emerald Green background (low opacity) with Green text.
- **Alert:** Amber text with a subtle glow.

### Portfolio Dialects
- **Fitness Portfolio:** Increase contrast, use neon blue/green text, and incorporate thin "biometric" line graphs.
- **Fantasy Sports:** Maximize data density; use "War Room" red accents for live alerts and condensed headers for player stats.