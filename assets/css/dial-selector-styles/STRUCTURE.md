# Dial Selector Styles Structure

This directory contains the modularized CSS for the custom `<dial-selector>` web component.

## File Organization

### `index.css`

Main entry point that imports all other files in the correct order.

### `variables.css`

**PRIVATE INTERNAL VARIABLES** (~150 variables with `--ds-*` prefix):

This file defines the component's internal implementation. Themes should NOT directly override these variables. Instead, use the public API (`--dial-selector-*`) defined in `base-styles/variables-dial-selector.css`.

Internal variable categories:
- Color resolution (reads from public API)
- Line styling internals
- Typography resolution
- Component-level calculations
- Grid layout internals
- Knob styling (reads from public API)
- Indicator styling (reads from public API)
- Label styling (reads from public API)
- Spoke line calculations
- Sizing calculations (knob size and derived dimensions)
- Component dimension calculations

**Pattern**: Each internal variable reads from the public API with fallbacks:
```css
--ds-label-font-size: var(--dial-selector-label-font-size, clamp(16px, 1.5vw, 22px));
```

### `component.css`

Base styles for the `<dial-selector>` element:

- Display and box model properties
- Universal box-sizing reset
- No-transition utility classes

### `layout.css`

Grid layout and positioning:

- `.selector` grid container (3-column layout)
- `.label-column` flex containers (left/right)
- `.knob-wrap` positioning and sizing

### `knob.css`

Knob and indicator styles:

- `.knob` main element with rotation and transitions
- `.knob::before` inner circle pseudo-element
- `.indicator` pointer element

### `labels.css`

Label text elements:

- `.dial-label` base styles
- `.dial-label:hover > span` hover states
- `.dial-label.active > span` active/selected states

### `lines.css`

SVG line elements and containers:

- `#lineContainer` SVG positioning
- `.spoke-line` transition styles
- `.spoke-line-hit-area` cursor styles
- `.advance` hit area overlay

### `responsive.css`

Media queries for different screen sizes:

- `@media (max-width: 768px)` - Tablets and large phones
- `@media (max-width: 600px)` - Small mobile phones
- `@media (max-width: 400px)` - Extra small screens

## Import Order

The import order in `index.css` is critical:

1. **variables.css** - Must be first as all other files depend on these
2. **component.css** - Base component setup
3. **layout.css** - Grid and positioning structure
4. **knob.css** - Central knob element
5. **labels.css** - Text label elements
6. **lines.css** - SVG line elements
7. **responsive.css** - Must be last to override base styles

## Usage

Import the main index file in your HTML or parent CSS:

```css
@import './dial-selector-styles/index.css';
```

Or reference directly:

```html
<link rel="stylesheet" href="assets/css/dial-selector-styles/index.css" />
```

## Theme Integration

The dial selector component has a clear public/private API boundary:

### Public API (~90 Variables)

Themes should **ONLY** use `--dial-selector-*` prefixed variables defined in `base-styles/variables-dial-selector.css`:

**Color System (5 variables):**
- `--dial-selector-color-ink` - Main text/line color (default: black)
- `--dial-selector-color-selection` - Active selection color (default: crimson)
- `--dial-selector-color-indicator` - Knob indicator color (default: crimson)
- `--dial-selector-color-line` - Spoke line color (default: gray-400)
- `--dial-selector-color-knob-background` - Knob background color (default: dark-knob)

**Label Styling (13 variables):**
- Font: `label-font-size`, `label-font-weight`, `label-letter-spacing`, `label-text-transform`, `label-text-shadow`
- Box model: `label-padding`, `label-background`, `label-color`
- Borders: `label-border-width`, `label-border-style`, `label-border-color`, `label-border-radius`, `label-box-shadow`
- Behavior: `label-transition`

**Label Hover State (10 variables):**
- `label-hover-color`, `label-hover-background`, `label-hover-padding`, `label-hover-border-*`, `label-hover-box-shadow`
- `label-hover-text-shadow`, `label-hover-font-weight`, `label-hover-transform`, `label-hover-opacity`
- `label-hover-animation`, `label-hover-filter`, `label-hover-will-change`

**Label Active State (11 variables):**
- `label-active-color`, `label-active-background`, `label-active-font-weight`, `label-active-text-shadow`
- `label-active-box-shadow`, `label-active-filter`
- `label-active-span-padding-*`, `label-active-span-border-*`, `label-active-span-box-shadow`
- `label-active-animation`, `label-active-will-change`

**Label Span (inner text element) (13 variables):**
- `label-span-display`, `label-span-padding-*`, `label-span-border-*`, `label-span-background`, `label-span-box-shadow`
- `label-span-font-*`, `label-span-color`, `label-span-transform`, `label-span-letter-spacing`, `label-span-text-transform`
- `label-span-transition`, `label-span-overflow`

**Knob Styling (11 variables):**
- `knob-border-width`, `knob-border-style`, `knob-border-color`
- `knob-box-shadow`, `knob-border-radius`, `knob-background-image`, `knob-filter`, `knob-clip-path`
- `knob-animation`, `knob-will-change`

**Knob Pseudo-elements (9 variables):**
- `knob-after-content`, `knob-after-display`, `knob-after-position`, `knob-after-inset`
- `knob-after-border-radius`, `knob-after-background`, `knob-after-pointer-events`
- `knob-after-opacity`, `knob-after-filter`

**Indicator Styling (10 variables):**
- `indicator-width`, `indicator-height`, `indicator-gradient`, `indicator-box-shadow`
- `indicator-border-*`, `indicator-border-radius`, `indicator-vertical-offset`
- `indicator-animation`, `indicator-will-change`

**Line Styling (7 variables):**
- `line-width`, `line-opacity`, `line-opacity-active`, `line-opacity-alternate`
- `line-stroke`, `line-filter`, `line-filter-active`

**Component Layout & Positioning (5 variables):**
- `component-margin-block-start` - Vertical positioning offset
- `component-filter` - Filter effects on entire component
- `knob-size` - Override responsive knob sizing (use with caution)
- `selector-gap` - Override grid gap between columns (use with caution)
- `indicator-vertical-offset` - Fine-tune indicator position

**Animation & Performance (8 variables):**
- `label-animation`, `label-contain`, `label-will-change`
- `label-hover-animation`, `label-hover-will-change`
- `label-active-animation`, `label-active-will-change`
- `knob-animation`, `knob-will-change`
- `indicator-animation`, `indicator-will-change`

### Private Internal Variables (~150 Variables)

Variables with `--ds-*` prefix are **PRIVATE** to the component (`dial-selector-styles/variables.css`):

**Internal Only (Do NOT Override Directly):**
- Layout calculations: `--ds-radius-*`, `--ds-component-width`, `--ds-indicator-length`
- Derived dimensions: `--ds-knob-center`, `--ds-horizontal-line-length`, `--ds-label-vertical-offset-scale`
- Pseudo-elements: `--ds-knob-before-*` (inner circle)
- Internal line properties: `--ds-internal-line-*`

**Now Available via Public API:**
The following previously-private variables now have public API equivalents:
- `--ds-knob-size` → Use `--dial-selector-knob-size`
- `--ds-selector-gap` → Use `--dial-selector-selector-gap`
- `--ds-indicator-vertical-offset` → Use `--dial-selector-indicator-vertical-offset`
- `--ds-margin-block-start` → Use `--dial-selector-component-margin-block-start`
- `--ds-filter` → Use `--dial-selector-component-filter`
- `--ds-*-animation` → Use `--dial-selector-*-animation`
- `--ds-*-will-change` → Use `--dial-selector-*-will-change`
- `--ds-label-contain` → Use `--dial-selector-label-contain`
- `--ds-knob-after-*` → Use `--dial-selector-knob-after-*`

**Pattern:**
- Component reads: `--ds-label-font-size: var(--dial-selector-label-font-size, clamp(...))`
- Themes set: `--dial-selector-label-font-size: 1rem`
- Result: Component uses theme value, falls back to default if not set

### Migration from Old API

Prior to v2024.01, themes could directly override `--ds-*` variables. This has been deprecated in favor of the public `--dial-selector-*` API for better encapsulation and maintainability.

**Old (deprecated):**
```css
:root[data-theme='mytheme'] {
  dial-selector {
    --ds-label-font-size: 1rem;  /* ❌ Violates encapsulation */
  }
}
```

**New (recommended):**
```css
:root[data-theme='mytheme'] {
  --dial-selector-label-font-size: 1rem;  /* ✅ Uses public API */
}
```

### Recent API Additions (2026.01)

The following variables were added to the public API based on theme requirements:

**Component Layout & Positioning:**
- `--dial-selector-component-margin-block-start` - For vertical offset (e.g., Brutal theme)
- `--dial-selector-component-filter` - For component-wide filters (e.g., Glitch theme)
- `--dial-selector-knob-size` - For responsive sizing overrides (e.g., Web2Gloss theme)
- `--dial-selector-selector-gap` - For custom grid gaps (e.g., Web2Gloss theme)
- `--dial-selector-indicator-vertical-offset` - For indicator positioning (e.g., Web2Gloss theme)

**Animation & Performance:**
- `--dial-selector-knob-animation`, `--dial-selector-knob-will-change`
- `--dial-selector-indicator-animation`, `--dial-selector-indicator-will-change`
- `--dial-selector-label-animation`, `--dial-selector-label-contain`, `--dial-selector-label-will-change`
- `--dial-selector-label-hover-animation`, `--dial-selector-label-hover-filter`, `--dial-selector-label-hover-will-change`
- `--dial-selector-label-active-animation`, `--dial-selector-label-active-will-change`

**Knob Pseudo-elements:**
- `--dial-selector-knob-after-*` (9 variables) - For advanced knob decorations (e.g., Skeuomorph ridges)

**Border Property Clarification:**
Knob and indicator border properties are now properly separated:
- Use `--dial-selector-knob-border-width`, `--dial-selector-knob-border-style`, `--dial-selector-knob-border-color` separately
- Use `--dial-selector-indicator-border-width`, `--dial-selector-indicator-border-style`, `--dial-selector-indicator-border-color` separately
- Do NOT use `-border-color` as a shorthand for the entire border property
