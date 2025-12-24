# Dial Selector Web Component

A modular, vanilla JavaScript web component for creating interactive dial-based selectors with no build step required.

## Directory Structure

```text
dial-selector/
├── index.js                  # Entry point - registers the custom element
├── dial-selector.js          # Main class that orchestrates the component
├── constants.js              # All constants (dimensions, angles, colors, etc.)
├── attribute-handlers.js     # Handlers for all component attributes
├── geometry.js               # Angle calculations and dimension updates
├── dom-builder.js            # DOM creation, manipulation, and events
└── README.md                 # This file
```

## Architecture

The component is split into logical modules using ES6 imports/exports:

- **constants.js**: All magic numbers, default values, and configuration constants
- **attribute-handlers.js**: Methods for parsing and applying component attributes
- **geometry.js**: Mathematical calculations for angles, positions, and scaling
- **dom-builder.js**: DOM creation, SVG line drawing, and event handling
- **dial-selector.js**: Main class that combines all mixins
- **index.js**: Registers the custom element with `customElements.define()`

## Usage

### In HTML (Module)

```html
<script type="module" src="./dial-selector/index.js"></script>

<dial-selector options="Option 1,Option 2,Option 3" default-option="Option 1" onchange="handleChange(event)">
</dial-selector>
```

### In JavaScript (Programmatic)

```javascript
import { DialSelector } from './dial-selector/index.js';

// Component is automatically registered when imported
const selector = document.createElement('dial-selector');
selector.setAttribute('options', 'A,B,C');
document.body.appendChild(selector);
```

## Browser Compatibility

Requires browsers that support:

- ES6 modules (`type="module"`)
- Custom Elements (Web Components)
- ResizeObserver API

All modern browsers from 2020+ support these features natively.
