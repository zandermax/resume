# Dial Selector Styles Structure

This directory contains the modularized CSS for the custom `<dial-selector>` web component.

## File Organization

### `index.css`

Main entry point that imports all other files in the correct order.

### `variables.css`

All CSS custom properties for the dial selector component:

- Color variables (ink, selection, line, indicator)
- Line styling variables
- Typography variables
- Component-level properties
- Grid layout variables
- Knob styling variables
- Indicator styling variables
- Label styling variables (including hover and active states)
- Spoke line styling variables
- Sizing variables (knob size and derived calculations)
- Component dimensions

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

The dial selector uses CSS custom properties that can be overridden by themes:

- `--dial-color-ink` - Main text/line color
- `--dial-color-selection` - Active selection color
- `--dial-color-indicator` - Knob indicator color
- `--ds-knob-background` - Knob background color

Themes can also override component-specific variables with the `--ds-*` prefix for advanced customization.
