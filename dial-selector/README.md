# Dial Selector Web Component

A modular, vanilla JavaScript web component for creating interactive dial-based selectors with no build step required.

## Directory Structure

```text
dial-selector/
├── index.js                  # Entry point - registers the custom element
├── dial-selector.js          # Main class that orchestrates the component
├── constants.js              # All constants (dimensions, angles, colors, etc.)
├── attribute-handlers.js     # Handlers for functional attributes
├── geometry.js               # Angle calculations and dimension updates
├── dom-builder.js            # DOM creation, manipulation, and events
└── README.md                 # This file
```

## Architecture

The component is split into logical modules using ES6 imports/exports:

- **constants.js**: All magic numbers, default values, and configuration constants
- **attribute-handlers.js**: Methods for parsing and applying functional attributes
- **geometry.js**: Mathematical calculations for angles, positions, and scaling
- **dom-builder.js**: DOM creation, SVG line drawing, and event handling
- **dial-selector.js**: Main class that combines all mixins
- **index.js**: Registers the custom element with `customElements.define()`

## Usage

### In HTML (Module)

```html
<script type="module" src="./dial-selector/index.js"></script>

<!-- Basic usage -->
<dial-selector options="Option 1,Option 2,Option 3" default-option="Option 1"> </dial-selector>

<!-- With haptic feedback customization (mobile) -->
<dial-selector options="Light,Dark" default-option="Light" haptic-feedback="true" haptic-duration="30"> </dial-selector>
```

### Real-World Examples

From this resume project:

```html
<!-- Theme selector -->
<dial-selector
  id="theme-selector"
  options="Today,1985,1992,1996,2001,2004,2007,2012,2017,2020,2027,2039"
  default-option="Today"
>
</dial-selector>

<!-- Mode selector -->
<dial-selector id="mode-selector" options="Light,Dark" default-option="Light"> </dial-selector>
```

### In JavaScript (Programmatic)

```javascript
import { DialSelector } from './dial-selector/index.js';

// Component is automatically registered when imported
const selector = document.createElement('dial-selector');
selector.setAttribute('options', 'A,B,C');
selector.setAttribute('default-option', 'A');
document.body.appendChild(selector);

// Listen for changes
selector.addEventListener('change', (event) => {
  console.log('Selected:', event.detail.value);
  console.log('Index:', event.detail.index);
});
```

## Attributes

The component supports 4 functional attributes for behavior control:

### `options` (Required)

Comma-separated list of selectable options.

**Example:** `options="Red,Green,Blue"`

**Default:** `['PHONO-2', 'PHONO-1', 'TUNER', 'AUX', 'CD', 'TAPE', 'STREAM', 'TV']`

### `default-option`

Initial selected option. Can be either the option name or numeric index.

**Examples:**

- `default-option="Red"` - Select by name
- `default-option="0"` - Select by index

**Default:** Index 0 (first option)

### `haptic-feedback`

Enable/disable vibration feedback on mobile devices when selecting an option.

**Examples:**

- `haptic-feedback="true"` - Enable (default)
- `haptic-feedback="false"` - Disable

**Default:** `true`

### `haptic-duration`

Duration of vibration feedback in milliseconds (mobile only).

**Example:** `haptic-duration="50"`

**Default:** `25` (ms)

## Styling with CSS Variables

All visual styling is controlled via CSS variables, allowing themes to customize the appearance without attributes. Override these variables in your CSS to style the component:

### Colors

```css
dial-selector {
  /* Core colors */
  --dial-selector-color-ink: oklch(20% 0 0);
  --dial-selector-color-selection: oklch(55% 0.25 30);
  --dial-selector-color-indicator: oklch(55% 0.25 30);
  --dial-selector-color-line: oklch(50% 0 0 / 0.3);
  --dial-selector-color-knob-background: oklch(95% 0 0);
  --dial-selector-color-outer-circle: var(--dial-selector-color-ink);
  --dial-selector-color-inner-circle: var(--dial-selector-color-ink);
}
```

### Typography

```css
dial-selector {
  --dial-selector-label-font-size: clamp(16px, 1.5vw, 22px);
  --dial-selector-label-font-weight: normal;
  --dial-selector-label-color: inherit;
  --dial-selector-label-text-transform: none;
  --dial-selector-label-letter-spacing: clamp(0.5px, 0.1vw, 1px);
}
```

### Sizing & Layout

```css
dial-selector {
  --dial-selector-knob-size: clamp(120px, 25vw, 200px);
  --dial-selector-gap: clamp(12px, 4vw, 40px);
  --dial-selector-line-width: 2px;
}
```

### Advanced Styling

```css
dial-selector {
  /* Label styling */
  --dial-selector-label-padding: 0.4rem 0.8rem;
  --dial-selector-label-background: transparent;
  --dial-selector-label-border-radius: 0;
  --dial-selector-label-box-shadow: none;

  /* Knob styling */
  --dial-selector-knob-border-width: 2px;
  --dial-selector-knob-border-color: var(--dial-selector-color-outer-circle);
  --dial-selector-knob-box-shadow: none;

  /* Indicator (needle) styling */
  --dial-selector-indicator-gradient: var(--dial-selector-color-indicator);
  --dial-selector-indicator-border-radius: 0;
  --dial-selector-indicator-box-shadow: none;
}
```

For a complete list of CSS variables, see [assets/css/base-styles/variables/dial-selector.css](../assets/css/base-styles/variables/dial-selector.css) in this project.

## Events

The component fires a custom `change` event when the selection changes:

```javascript
selector.addEventListener('change', (event) => {
  console.log(event.detail.value); // Selected option text
  console.log(event.detail.index); // Selected option index
});
```

## Browser Compatibility

Requires browsers that support:

- ES6 modules (`type="module"`)
- Custom Elements (Web Components)
- ResizeObserver API
- Vibration API (optional, for haptic feedback)

All modern browsers from 2020+ support these features natively.
