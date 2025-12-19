const style = document.createElement('style');
style.textContent = `
dial-selector {
  --color-ink: var(--dial-color-ink, #f4f4f4);
  --color-selection: var(--dial-color-selection, #f13b3b);
  --color-line: var(--dial-color-ink, #c7c2b5);
  --color-indicator: var(--dial-color-indicator, #f13b3b);
  --shadow: 0;
  --label-radius: 150px;
  /* Line styling variables */
  --line-stroke-width: 2;
  --line-opacity-inactive: 0.4;
  --line-opacity-active: 0.8;
  --line-transition: opacity 0.3s ease, stroke 0.3s ease;
  /* Indicator styling variables */
  --indicator-length: 60px;
  --indicator-vertical-offset: 46.75%;
  --center-indicator: 0px;
  --time-selection-delay: 0s;
  /* Knob circle styling variables */
  --radius-outer: 90px;
  --width-outer-circle: 4px;
  --color-outer-circle: var(--color-ink);
  --radius-inner: 72px;
  --width-inner-circle: 2px;
  --color-inner-circle: var(--color-ink);
  /* Typography variables */
  --font-size: clamp(16px, 1.5vw, 22px);
  --font-family: 'IBM Plex Mono', 'Courier New', monospace;
  /* Responsive sizing variables (set dynamically) */
  --knob-wrap-size: 320px;
  --knob-center: 160px;
  --label-column-height: 320px;
  --label-vertical-offset-scale: 140px;
  --horizontal-line-length: 100px;
  --max-spoke-length: 80px;
  --horizontal-line-end-offset: 10px;
  --hit-area-stroke-width: 20px;
  --indicator-width: 10px;
  /* Component dimensions */
  --component-width: 100%;
  --component-height: auto;
  --component-min-width: 200px;
  --component-min-height: 200px;
  display: block;
  font-family: var(--font-family);
  min-width: var(--component-min-width);
  max-width: var(--component-width);
  width: var(--component-width);
  height: var(--component-height);
  overflow: hidden;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

dial-selector * {
  box-sizing: border-box;
}

dial-selector {
  --indicator-angle: 0deg;
}

dial-selector .selector {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: clamp(12px, 4vw, 40px);
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

dial-selector .label-column {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: var(--label-column-height, 320px);
  margin: 0;
  padding: 0;
}

dial-selector .label-column.left {
  align-items: flex-end;
}

dial-selector .label-column.right {
  align-items: flex-start;
}

dial-selector .knob-wrap {
  position: relative;
  width: var(--knob-wrap-size, 320px);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

dial-selector .knob {
  position: relative;
  width: calc(var(--radius-outer) * 2);
  height: calc(var(--radius-outer) * 2);
  border: var(--width-outer-circle) solid var(--color-outer-circle);
  border-radius: 50%;
  background: var(--dial-knob-background, #11161c);
  box-shadow: var(--shadow);
  z-index: 2;
  transform: rotate(var(--indicator-angle));
  transition: transform 0.25s ease-in var(--time-selection-delay, 0s);
}

dial-selector .indicator {
  position: absolute;
  width: var(--indicator-width, 10px);
  height: var(--indicator-length, 60px);
  background: var(--indicator-gradient, var(--color-indicator));
  border-radius: calc(var(--indicator-width, 10px) / 2);
  top: calc(var(--indicator-vertical-offset, 46.75%) - var(--indicator-length, 60px) / 2);
  left: calc(40% + var(--radius-inner, 72px) - var(--width-inner-circle, 2px) + var(--center-indicator, 0px));
  transform-origin: 0% 50%;
  transform: rotate(90deg);
}

dial-selector.no-transitions .knob {
  transition: none;
}

dial-selector .knob::before {
  content: '';
  position: absolute;
  inset: calc(var(--radius-outer) - var(--radius-inner));
  border: var(--width-inner-circle) solid var(--color-inner-circle);
  border-radius: 50%;
  opacity: 0.6;
}

dial-selector .dial-label {
  text-decoration: none;
  color: inherit;
  font-size: var(--font-size);
  font-family: var(--font-family);
  letter-spacing: clamp(0.5px, 0.1vw, 1px);
  display: inline-flex;
  align-items: center;
  gap: 0;
  cursor: pointer;
  user-select: none;
  padding: clamp(4px, 1vw, 8px) clamp(6px, 1.5vw, 12px);
  position: absolute;
  transform: translateY(-50%);
  white-space: nowrap;
}

dial-selector .dial-label.active > span {
  padding: 0.5em;
  color: var(--color-selection);
}

dial-selector #lineContainer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: visible;
}

dial-selector .spoke-line {
  transition: var(--line-transition, opacity 0.3s ease, stroke 0.3s ease);
}

dial-selector.no-transitions .spoke-line {
  transition: none;
}

dial-selector .advance {
  position: absolute;
  inset: 0;
  cursor: pointer;
  pointer-events: auto;
  background: transparent;
}

/* Mobile responsive breakpoints */
@media (max-width: 768px) {
  dial-selector {
    /* Reduce overall size for tablets/large phones */
    --font-size: clamp(14px, 2.5vw, 18px);
  }

  dial-selector .selector {
    gap: clamp(8px, 2vw, 20px);
  }

  dial-selector .dial-label {
    padding: clamp(3px, 0.8vw, 6px) clamp(5px, 1.2vw, 10px);
    letter-spacing: clamp(0.3px, 0.08vw, 0.8px);
  }
}

/* Reduced horizontal lines for small mobile */
@media (max-width: 600px) {
  dial-selector {
    /* Make knob 25% smaller (75% of original size) */
    --knob-wrap-size: 240px; /* 75% of 320px */
    --knob-center: 120px; /* 75% of 160px */
    --label-column-height: 240px; /* 75% of 320px */
    --radius-outer: 67.5px; /* 75% of 90px */
    --radius-inner: 54px; /* 75% of 72px */
    --label-vertical-offset-scale: 105px; /* 75% of 140px */
    --horizontal-line-length: 40px; /* Significantly shorter horizontal lines */
    --max-spoke-length: 60px;
    --font-size: clamp(12px, 2.5vw, 16px);
  }

  dial-selector .selector {
    gap: clamp(4px, 1.5vw, 12px);
  }

  dial-selector .dial-label {
    padding: clamp(2px, 0.6vw, 5px) clamp(4px, 1vw, 8px);
    letter-spacing: 0.3px;
  }
}

/* Spokes-only mode for very small screens */
@media (max-width: 480px) {
  dial-selector {
    --horizontal-line-length: 0px; /* NO horizontal lines - spokes only! */
    --font-size: clamp(14px, 2.8vw, 14px);
    --horizontal-line-end-offset: 0px; /* No offset needed without horizontal lines */
  }

  dial-selector .selector {
    gap: clamp(2px, 1vw, 6px);
  }

  dial-selector .dial-label {
    padding: 2px 6px;
    letter-spacing: 0.2px;
  }

  /* Move horizontal labels (middle options) up and in for better text visibility */
  dial-selector .dial-label[data-angle="180"] > span,
  dial-selector .dial-label[data-angle="0"] > span {
    margin-block-end: 2lh !important;
    margin-inline: -1em;
  }
}

/* Ultra-compact for tiny screens */
@media (max-width: 380px) {
  dial-selector {
    --horizontal-line-length: 0px;
    --max-spoke-length: 40px;
    --font-size: clamp(12px, 3vw, 13px);
  }

  dial-selector .selector {
    gap: 2px;
  }

  dial-selector .dial-label {
    padding: 1px 4px;
    letter-spacing: 0;
  }
}
`;

// Inject styles only once
if (!document.getElementById('dial-selector-styles')) {
  style.id = 'dial-selector-styles';
  document.head.appendChild(style);
}

// Constants
const DEFAULT_OPTIONS = ['PHONO-2', 'PHONO-1', 'TUNER', 'AUX', 'CD', 'TAPE', 'STREAM', 'TV'];

// Arc angles for label positioning
const RIGHT_ARC_START = -45;
const RIGHT_ARC_END = 45;
const LEFT_ARC_START = 135;
const LEFT_ARC_END = 225;

// Base dimensions (used as reference for scaling)
const BASE_KNOB_WRAP_SIZE = 320;
const BASE_KNOB_RADIUS_OUTER = 90;
const BASE_KNOB_RADIUS_INNER = 72;
const BASE_LABEL_COLUMN_HEIGHT = 320;
const BASE_LABEL_VERTICAL_OFFSET_SCALE = 140;
const BASE_HORIZONTAL_LINE_LENGTH = 100;
const BASE_MAX_SPOKE_LENGTH = 80;
const BASE_HIT_AREA_STROKE_WIDTH = 20;
const DEFAULT_LINE_STROKE_WIDTH = 2;
const BASE_HORIZONTAL_LINE_END_OFFSET = 10;
const BASE_INDICATOR_WIDTH = 10;
const BASE_INDICATOR_LENGTH = 60; // Base indicator length at default knob size
const BASE_CENTER_INDICATOR = 15; // Base center indicator offset (100% = 15px, default is 0 = 0%)
const BASE_WIDTH_OUTER_CIRCLE = 4;
const BASE_WIDTH_INNER_CIRCLE = 2;

// Min/max constraints
const MIN_KNOB_WRAP_SIZE = 200;
const MAX_KNOB_WRAP_SIZE = 600;

// Opacity values
const LINE_OPACITY_INACTIVE = 0.4;
const LINE_OPACITY_ACTIVE = 0.8;

// Indicator dimensions (some remain fixed, some scale)
const BASE_INDICATOR_HEIGHT = 60;

// Animation and timing
const TRANSITION_DELAY = 0.125;
const INITIALIZATION_DELAY = 100;

// Angle calculation threshold
const NEARLY_HORIZONTAL_THRESHOLD = 0.0001;
const FULL_CIRCLE_DEGREES = 360;

// Rainbow gradient colors
const RAINBOW_COLORS = [
  '#ff0000', // Red
  '#ff7f00', // Orange
  '#ffff00', // Yellow
  '#00ff00', // Green
  '#0000ff', // Blue
  '#4b0082', // Indigo
  '#9400d3', // Violet
];

class DialSelector extends HTMLElement {
  constructor() {
    super();
    this.currentIndex = 0;
    this.previousIndex = -1;
    this.currentAngle = 0;
    this.isInitialized = false;
    this.labels = [];
    this.lines = [];
    this.hitAreas = [];
    this.spokeAngles = [];
    this.rightCount = 0;
    this.leftCount = 0;
    this.halfPoint = 0;
    this.resizeObserver = null;
    // Dynamic dimensions (calculated based on container size)
    this.knobWrapSize = BASE_KNOB_WRAP_SIZE;
    this.knobCenter = BASE_KNOB_WRAP_SIZE / 2;
    this.labelColumnHeight = BASE_LABEL_COLUMN_HEIGHT;
    this.labelVerticalOffsetScale = BASE_LABEL_VERTICAL_OFFSET_SCALE;
    this.horizontalLineLength = BASE_HORIZONTAL_LINE_LENGTH;
    this.maxSpokeLength = BASE_MAX_SPOKE_LENGTH;
    this.hitAreaStrokeWidth = BASE_HIT_AREA_STROKE_WIDTH;
    this.horizontalLineEndOffset = BASE_HORIZONTAL_LINE_END_OFFSET;
    this.indicatorWidth = BASE_INDICATOR_WIDTH;
    this.indicatorLengthPercentage = 100; // Default to 100% (full length)
    // Percentage values for attributes (default to 100% = default size)
    this.centerIndicatorPercentage = 0; // Default is 0 (no offset)
    this.radiusOuterPercentage = 100;
    this.radiusInnerPercentage = 100;
    this.widthOuterCirclePercentage = 100;
    this.widthInnerCirclePercentage = 100;
    this.lineThicknessPercentage = 100;
  }

  static get observedAttributes() {
    return [
      'color-indicator',
      'color-selection',
      'options',
      'onchange',
      'indicator-rainbow',
      'indicator-gradient',
      'line-thickness',
      'length-indicator',
      'center-indicator',
      'radius-inner',
      'color-inner-circle',
      'color-outer-circle',
      'width-inner-circle',
      'radius-outer',
      'width-outer-circle',
      'time-selection-delay',
      'font-size',
      'font-family',
      'width',
      'height',
      'default-option',
    ];
  }

  connectedCallback() {
    // Parse options from attribute or use default
    const optionsAttr = this.getAttribute('options');
    this.OPTIONS = optionsAttr ? optionsAttr.split(',').map((opt) => opt.trim()) : DEFAULT_OPTIONS;

    // Set default option before building DOM
    this.setDefaultOption();

    this.updateIndicatorColor();
    this.updateIndicatorGradient();
    this.updateSelectionColor();
    this.updateLineThickness();
    this.updateIndicatorLength();
    this.updateCenterIndicator();
    this.updateKnobSize();
    this.updateSelectionDelay();
    this.updateFontSize();
    this.updateFontFamily();
    this.updateWidth();
    this.updateHeight();
    this.buildDOM();
    this.calculateAngles();

    // Set up ResizeObserver to monitor container size changes
    this.setupResizeObserver();

    // Disable transitions during initial setup
    this.classList.add('no-transitions');

    // Initial dimension calculation
    this.updateDimensions();
    this.createLabelsAndLines();

    setTimeout(() => {
      this.updateLines();
      this.updateSelector();
      // Re-enable transitions after initial setup
      this.classList.remove('no-transitions');
    }, INITIALIZATION_DELAY);

    window.addEventListener('resize', () => {
      // Disable transitions during resize
      this.classList.add('no-transitions');
      this.updateDimensions();
      // updateLines() is called after updateDimensions(), which also calls updateLabelPositions()
      this.updateLines();
      // Re-enable transitions after resize completes
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.classList.remove('no-transitions');
        });
      });
    });
  }

  disconnectedCallback() {
    // Clean up ResizeObserver when component is removed
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.handleAttributeChange({ name, oldValue, newValue });
  }

  handleAttributeChange({ name, oldValue, newValue }) {
    switch (name) {
      case 'color-indicator':
        this.updateIndicatorColor();
        break;

      case 'indicator-rainbow':
      case 'indicator-gradient':
        this.updateIndicatorGradient();
        break;

      case 'color-selection':
        this.updateSelectionColor();
        break;

      case 'line-thickness':
        this.updateLineThickness();
        break;

      case 'length-indicator':
        this.updateIndicatorLength();
        break;

      case 'center-indicator':
        this.updateCenterIndicator();
        break;

      case 'radius-inner':
      case 'color-inner-circle':
      case 'color-outer-circle':
      case 'width-inner-circle':
      case 'radius-outer':
      case 'width-outer-circle':
        this.updateKnobSize();
        break;

      case 'time-selection-delay':
        this.updateSelectionDelay();
        break;

      case 'font-size':
        this.updateFontSize();
        break;

      case 'font-family':
        this.updateFontFamily();
        break;

      case 'width':
        this.updateWidth();
        break;

      case 'height':
        this.updateHeight();
        break;

      case 'options':
        if (this.isInitialized) {
          // Disable transitions during rebuild
          this.classList.add('no-transitions');
          // Rebuild if options change
          this.OPTIONS = newValue.split(',').map((opt) => opt.trim());
          this.labels = [];
          this.lines = [];
          this.spokeAngles = [];
          this.currentIndex = 0;
          this.previousIndex = -1;
          this.isInitialized = false;
          this.updateDimensions();
          this.calculateAngles();
          this.createLabelsAndLines();
          setTimeout(() => {
            this.updateLines();
            this.updateSelector();
            // Re-enable transitions after rebuild
            this.classList.remove('no-transitions');
          }, INITIALIZATION_DELAY);
        }
        break;

      case 'onchange':
        // onchange attribute changes are handled automatically
        // No action needed here
        break;

      case 'default-option':
        // Only apply default-option if not already initialized
        // This prevents changing selection after user has interacted
        if (!this.isInitialized) {
          this.setDefaultOption();
          if (this.labels.length > 0) {
            this.updateSelector();
          }
        }
        break;

      default:
        // Unknown attribute, ignore
        break;
    }
  }

  updateIndicatorColor() {
    const colorIndicator = this.getAttribute('color-indicator');
    if (colorIndicator) {
      this.style.setProperty('--color-indicator', colorIndicator);
    }
  }

  updateIndicatorGradient() {
    // Check if custom gradient is provided
    const gradientColors = this.getAttribute('indicator-gradient');

    if (gradientColors) {
      // Parse comma-separated colors and create gradient
      const colors = gradientColors.split(',').map((color) => color.trim());
      const gradient = this.createGradientFromColors(colors);
      this.style.setProperty('--indicator-gradient', gradient);
    } else if (this.hasAttribute('indicator-rainbow')) {
      // Default rainbow gradient if indicator-rainbow is set
      const rainbowColors = RAINBOW_COLORS;
      const gradient = this.createGradientFromColors(rainbowColors);
      this.style.setProperty('--indicator-gradient', gradient);
    } else {
      // Remove the property so CSS fallback to --color-indicator works
      this.style.removeProperty('--indicator-gradient');
    }
  }

  createGradientFromColors(colors) {
    if (colors.length === 0) return 'none';
    if (colors.length === 1) {
      return `linear-gradient(to bottom, ${colors[0]})`;
    }

    // Create gradient with evenly distributed color stops
    const stops = colors
      .map((color, index) => {
        const percentage = (index / (colors.length - 1)) * 100;
        return `${color} ${percentage}%`;
      })
      .join(', ');

    return `linear-gradient(to bottom, ${stops})`;
  }

  updateSelectionColor() {
    const colorSelection = this.getAttribute('color-selection');
    if (colorSelection) {
      this.style.setProperty('--color-selection', colorSelection);
    }
  }

  // Helper to parse percentage attribute (DRY principle)
  parsePercentageAttr(attrValue, defaultValue = 100, minValue = 0) {
    if (!attrValue) return defaultValue;
    const percentage = parseFloat(attrValue.replace('%', ''));
    return !isNaN(percentage) && percentage >= minValue ? percentage : defaultValue;
  }

  updateLineThickness() {
    const lineThickness = this.getAttribute('line-thickness');
    if (lineThickness) {
      this.lineThicknessPercentage = this.parsePercentageAttr(lineThickness);
      const actualThickness = (DEFAULT_LINE_STROKE_WIDTH * this.lineThicknessPercentage) / 100;
      this.style.setProperty('--line-stroke-width', `${actualThickness}px`);
    } else {
      this.lineThicknessPercentage = 100;
      this.style.removeProperty('--line-stroke-width');
    }
  }

  updateIndicatorLength() {
    const lengthIndicator = this.getAttribute('length-indicator');
    this.indicatorLengthPercentage = this.parsePercentageAttr(lengthIndicator);
    if (this.isInitialized) {
      this.updateDimensions();
    }
  }

  updateCenterIndicator() {
    const centerIndicator = this.getAttribute('center-indicator');
    this.centerIndicatorPercentage = this.parsePercentageAttr(centerIndicator, 0);
    if (this.isInitialized) {
      this.updateDimensions();
    }
  }

  updateKnobSize() {
    // Note: radius-inner and radius-outer are handled by updateDimensions() for responsive scaling
    // Only handle colors and widths here, as they don't need to scale

    const colorInnerCircle = this.getAttribute('color-inner-circle');
    if (colorInnerCircle) {
      this.style.setProperty('--color-inner-circle', colorInnerCircle);
    } else {
      this.style.removeProperty('--color-inner-circle');
    }

    const colorOuterCircle = this.getAttribute('color-outer-circle');
    if (colorOuterCircle) {
      this.style.setProperty('--color-outer-circle', colorOuterCircle);
    } else {
      this.style.removeProperty('--color-outer-circle');
    }

    // Note: width-inner-circle and width-outer-circle are handled by updateDimensions() for responsive scaling
    // Parse percentages here and store them
    this.widthInnerCirclePercentage = this.parsePercentageAttr(this.getAttribute('width-inner-circle'));
    this.widthOuterCirclePercentage = this.parsePercentageAttr(this.getAttribute('width-outer-circle'));

    // Trigger dimension update to recalculate scaled knob radii
    if (this.isInitialized) {
      this.updateDimensions();
    }
  }

  updateSelectionDelay() {
    const timeSelectionDelay = this.getAttribute('time-selection-delay');
    if (timeSelectionDelay) {
      // Convert milliseconds to seconds, clamp to minimum of 0
      const delayMs = parseFloat(timeSelectionDelay);
      const delaySeconds = Math.max(0, delayMs) / 1000;
      this.style.setProperty('--time-selection-delay', `${delaySeconds}s`);
    } else {
      // Reset to default if attribute is removed
      this.style.removeProperty('--time-selection-delay');
    }
  }

  updateFontSize() {
    const fontSize = this.getAttribute('font-size');
    if (fontSize) {
      // Check if it's a percentage value (numeric without units)
      const percentage = parseFloat(fontSize.replace('%', ''));
      if (!isNaN(percentage) && fontSize.replace('%', '').trim() === percentage.toString()) {
        // It's a percentage - calculate relative to base clamp(10px, 1.5vw, 14px)
        // For percentage, we'll scale the middle value (1.5vw) proportionally
        // But since clamp is complex, we'll use a simpler approach: scale the max value
        const baseMax = 14;
        const scaledMax = (baseMax * percentage) / 100;
        const baseMin = 10;
        const scaledMin = (baseMin * percentage) / 100;
        // Keep the viewport unit proportional
        const viewportUnit = (1.5 * percentage) / 100;
        this.style.setProperty('--font-size', `clamp(${scaledMin}px, ${viewportUnit}vw, ${scaledMax}px)`);
      } else {
        // It's a direct CSS value (e.g., "16px", "1.2em", "clamp(...)")
        this.style.setProperty('--font-size', fontSize);
      }
    } else {
      // Reset to default if attribute is removed
      this.style.removeProperty('--font-size');
    }
  }

  updateFontFamily() {
    const fontFamily = this.getAttribute('font-family');
    if (fontFamily) {
      this.style.setProperty('--font-family', fontFamily);
    } else {
      // Reset to default if attribute is removed
      this.style.removeProperty('--font-family');
    }
  }

  updateWidth() {
    const width = this.getAttribute('width');
    if (width) {
      // Parse the value and enforce minimum
      const minWidthPx = 200;
      let finalWidth = width;

      // Check if it's a pixel value and enforce minimum
      const pixelMatch = width.match(/^(\d+(?:\.\d+)?)px$/i);
      if (pixelMatch) {
        const pxValue = parseFloat(pixelMatch[1]);
        if (pxValue < minWidthPx) {
          finalWidth = `${minWidthPx}px`;
        }
      }

      // Set both width and max-width to the same value for exact dimensions
      this.style.setProperty('--component-width', finalWidth);
      this.style.setProperty('width', finalWidth);
      this.style.setProperty('max-width', finalWidth);
      this.style.setProperty('min-width', finalWidth);

      // Trigger dimension update to recalculate internal layout
      if (this.isInitialized) {
        this.updateDimensions();
      }
    } else {
      // Reset to defaults if attribute is removed
      this.style.removeProperty('--component-width');
      this.style.removeProperty('width');
      this.style.removeProperty('max-width');
      this.style.removeProperty('min-width');

      // Trigger dimension update to recalculate internal layout
      if (this.isInitialized) {
        this.updateDimensions();
      }
    }
  }

  updateHeight() {
    const height = this.getAttribute('height');
    if (height) {
      // Parse the value and enforce minimum
      const minHeightPx = 200;
      let finalHeight = height;

      // Check if it's a pixel value and enforce minimum
      const pixelMatch = height.match(/^(\d+(?:\.\d+)?)px$/i);
      if (pixelMatch) {
        const pxValue = parseFloat(pixelMatch[1]);
        if (pxValue < minHeightPx) {
          finalHeight = `${minHeightPx}px`;
        }
      }

      // Set exact height
      this.style.setProperty('--component-height', finalHeight);
      this.style.setProperty('height', finalHeight);
      this.style.setProperty('min-height', finalHeight);

      // Trigger dimension update to recalculate internal layout
      if (this.isInitialized) {
        this.updateDimensions();
      }
    } else {
      // Reset to default if attribute is removed
      this.style.removeProperty('--component-height');
      this.style.removeProperty('height');
      this.style.removeProperty('min-height');

      // Trigger dimension update to recalculate internal layout
      if (this.isInitialized) {
        this.updateDimensions();
      }
    }
  }

  setDefaultOption() {
    const defaultOption = this.getAttribute('default-option');
    if (!defaultOption) return;

    // Guard: OPTIONS must be initialized first
    if (!this.OPTIONS || !Array.isArray(this.OPTIONS)) {
      return;
    }

    // Try to parse as number (index)
    const indexValue = parseInt(defaultOption, 10);
    if (!isNaN(indexValue) && indexValue >= 0 && indexValue < this.OPTIONS.length) {
      this.currentIndex = indexValue;
      return;
    }

    // Try to find by option name (case-insensitive)
    const optionIndex = this.OPTIONS.findIndex((opt) => opt.toLowerCase() === defaultOption.trim().toLowerCase());
    if (optionIndex !== -1) {
      this.currentIndex = optionIndex;
      return;
    }

    // If neither worked, log a warning but don't change currentIndex
    console.warn(`dial-selector: default-option "${defaultOption}" not found. Using index 0.`);
  }

  setupResizeObserver() {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        // Disable transitions during resize
        this.classList.add('no-transitions');
        this.updateDimensions();
        // updateLines() is called after updateDimensions(), which also calls updateLabelPositions()
        this.updateLines();
        // Re-enable transitions after resize completes
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            this.classList.remove('no-transitions');
          });
        });
      });
      this.resizeObserver.observe(this);
    }
  }

  updateDimensions() {
    // Get container width and height
    const containerWidth = this.getBoundingClientRect().width;
    const containerHeight = this.getBoundingClientRect().height;

    if (containerWidth === 0) {
      // Component not yet rendered, use defaults
      return;
    }

    const knobWrap = this.querySelector('.knob-wrap');
    if (!knobWrap) return;

    // Calculate target knob size based on container width
    // Use a percentage of container width, clamped between min and max
    const selector = this.querySelector('.selector');
    if (!selector) return;

    // Check if height is explicitly set
    const heightAttr = this.getAttribute('height');
    const hasFixedHeight = !!heightAttr;

    // Calculate available space (accounting for gaps)
    const computedStyle = getComputedStyle(selector);
    const gap = parseFloat(computedStyle.gap) || 0;
    const availableWidth = containerWidth - gap * 2; // Two gaps between three columns

    // Target knob size: aim for about 40-50% of container width, but respect min/max
    // If height is set, also consider height constraints
    let targetSize = Math.min(Math.max(MIN_KNOB_WRAP_SIZE, availableWidth * 0.45), MAX_KNOB_WRAP_SIZE);

    if (hasFixedHeight && containerHeight > 0) {
      // When height is fixed, ensure knob fits within height
      // Knob is square, so use the smaller of width-based or height-based size
      const heightBasedSize = containerHeight;
      targetSize = Math.min(targetSize, heightBasedSize);
      // Still respect min/max
      targetSize = Math.min(Math.max(MIN_KNOB_WRAP_SIZE, targetSize), MAX_KNOB_WRAP_SIZE);
    }

    // Set the knob-wrap size via CSS variable
    this.style.setProperty('--knob-wrap-size', `${targetSize}px`);

    // Force a reflow to ensure the browser has applied the size
    void knobWrap.offsetWidth;

    // Measure the actual rendered size (may differ slightly due to grid constraints)
    const actualSize = knobWrap.getBoundingClientRect().width;

    this.knobWrapSize = actualSize;
    this.knobCenter = this.knobWrapSize / 2;

    // Calculate scale factor relative to base size
    const scale = this.knobWrapSize / BASE_KNOB_WRAP_SIZE;

    // Scale all proportional dimensions
    // If height is fixed, use the container height for label columns
    if (hasFixedHeight && containerHeight > 0) {
      this.labelColumnHeight = containerHeight;
    } else {
      this.labelColumnHeight = BASE_LABEL_COLUMN_HEIGHT * scale;
    }
    this.labelVerticalOffsetScale = BASE_LABEL_VERTICAL_OFFSET_SCALE * scale;
    this.horizontalLineLength = BASE_HORIZONTAL_LINE_LENGTH * scale;
    this.maxSpokeLength = BASE_MAX_SPOKE_LENGTH * scale;
    this.hitAreaStrokeWidth = BASE_HIT_AREA_STROKE_WIDTH * scale;
    this.horizontalLineEndOffset = BASE_HORIZONTAL_LINE_END_OFFSET * scale;
    this.indicatorWidth = BASE_INDICATOR_WIDTH * scale;

    // Scale knob radii proportionally - parse percentages from attributes
    this.radiusOuterPercentage = this.parsePercentageAttr(this.getAttribute('radius-outer'));
    this.radiusInnerPercentage = this.parsePercentageAttr(this.getAttribute('radius-inner'));

    // Calculate base radii from percentages
    const baseRadiusOuter = (BASE_KNOB_RADIUS_OUTER * this.radiusOuterPercentage) / 100;
    const baseRadiusInner = (BASE_KNOB_RADIUS_INNER * this.radiusInnerPercentage) / 100;

    // Scale the radii based on the current scale factor
    const scaledRadiusOuter = baseRadiusOuter * scale;
    const scaledRadiusInner = baseRadiusInner * scale;

    // Update knob size CSS variables
    this.style.setProperty('--radius-outer', `${scaledRadiusOuter}px`);
    this.style.setProperty('--radius-inner', `${scaledRadiusInner}px`);

    // Calculate and set scaled circle widths
    const baseWidthOuter = (BASE_WIDTH_OUTER_CIRCLE * this.widthOuterCirclePercentage) / 100;
    const baseWidthInner = (BASE_WIDTH_INNER_CIRCLE * this.widthInnerCirclePercentage) / 100;
    const scaledWidthOuter = baseWidthOuter * scale;
    const scaledWidthInner = baseWidthInner * scale;
    this.style.setProperty('--width-outer-circle', `${scaledWidthOuter}px`);
    this.style.setProperty('--width-inner-circle', `${scaledWidthInner}px`);

    // Scale center-indicator offset
    const baseCenterIndicator = (BASE_CENTER_INDICATOR * this.centerIndicatorPercentage) / 100;
    const scaledCenterIndicator = baseCenterIndicator * scale;
    this.style.setProperty('--center-indicator', `${scaledCenterIndicator}px`);

    // Calculate indicator length based on knob radius and percentage
    // Base indicator length is proportional to base knob radius
    // Ratio: BASE_INDICATOR_LENGTH / BASE_KNOB_RADIUS_OUTER
    const indicatorLengthRatio = BASE_INDICATOR_LENGTH / BASE_KNOB_RADIUS_OUTER;
    const scaledIndicatorLength = scaledRadiusOuter * indicatorLengthRatio * (this.indicatorLengthPercentage / 100);
    this.style.setProperty('--indicator-length', `${scaledIndicatorLength}px`);

    // Update remaining CSS custom properties
    this.style.setProperty('--knob-center', `${this.knobCenter}px`);
    this.style.setProperty('--label-column-height', `${this.labelColumnHeight}px`);
    this.style.setProperty('--label-vertical-offset-scale', `${this.labelVerticalOffsetScale}px`);
    this.style.setProperty('--horizontal-line-length', `${this.horizontalLineLength}px`);
    this.style.setProperty('--max-spoke-length', `${this.maxSpokeLength}px`);
    this.style.setProperty('--hit-area-stroke-width', `${this.hitAreaStrokeWidth}px`);
    this.style.setProperty('--horizontal-line-end-offset', `${this.horizontalLineEndOffset}px`);
    this.style.setProperty('--indicator-width', `${this.indicatorWidth}px`);

    // Update label positions when dimensions change
    if (this.labels.length > 0) {
      this.updateLabelPositions();
    }
  }

  buildDOM() {
    this.innerHTML = `
			<div class="selector">
				<div class="label-column left" id="leftColumn">
					<!-- Left labels will be generated by JavaScript -->
				</div>

				<div class="knob-wrap">
					<svg id="lineContainer" width="100%" height="100%" style="position: absolute; overflow: visible;">
						<!-- Lines will be generated by JavaScript -->
					</svg>
					<div class="knob">
						<div class="indicator"></div>
						<div class="advance" id="advanceButton" aria-label="Switch to next option"></div>
					</div>
				</div>

				<div class="label-column right" id="rightColumn">
					<!-- Right labels will be generated by JavaScript -->
				</div>
			</div>
		`;
  }

  calculateAngles() {
    this.halfPoint = Math.ceil(this.OPTIONS.length / 2);
    this.rightCount = this.OPTIONS.length - this.halfPoint;
    this.leftCount = this.halfPoint;

    // Generate angles for right side
    for (let i = 0; i < this.rightCount; i++) {
      let angle;
      if (this.rightCount === 1) {
        // Single item on right side - use middle of arc
        angle = (RIGHT_ARC_START + RIGHT_ARC_END) / 2;
      } else {
        angle = RIGHT_ARC_START + ((RIGHT_ARC_END - RIGHT_ARC_START) * i) / (this.rightCount - 1);
      }
      this.spokeAngles.push(angle);
    }

    // Generate angles for left side
    for (let i = 0; i < this.leftCount; i++) {
      let angle;
      if (this.leftCount === 1) {
        // Single item on left side - use middle of arc
        angle = (LEFT_ARC_START + LEFT_ARC_END) / 2;
      } else {
        angle = LEFT_ARC_START + ((LEFT_ARC_END - LEFT_ARC_START) * i) / (this.leftCount - 1);
      }
      this.spokeAngles.push(angle);
    }
  }

  createLabelsAndLines() {
    const leftColumn = this.querySelector('#leftColumn');
    const rightColumn = this.querySelector('#rightColumn');
    const lineContainer = this.querySelector('#lineContainer');
    const advanceButton = this.querySelector('#advanceButton');

    // Clear existing content
    if (leftColumn) leftColumn.innerHTML = '';
    if (rightColumn) rightColumn.innerHTML = '';
    if (lineContainer) lineContainer.innerHTML = '';
    this.hitAreas = [];

    this.OPTIONS.forEach((option, index) => {
      // Left side gets first half (indices 0 to leftCount-1), right side gets second half (indices leftCount to length-1)
      const isLeft = index < this.leftCount;
      const container = isLeft ? leftColumn : rightColumn;
      let angleIndex;
      if (isLeft) {
        // Left side: normal order (Option 1 at top, Option leftCount at bottom)
        // Map index 0 to rightCount (top left), index leftCount-1 to rightCount+leftCount-1 (bottom left)
        angleIndex = this.rightCount + index;
      } else {
        // Right side: normal order (Option leftCount+1 at top, Option length at bottom)
        // Map index leftCount to 0 (top right), index length-1 to rightCount-1 (bottom right)
        angleIndex = index - this.leftCount;
      }
      const angle = this.spokeAngles[angleIndex];
      const angleRad = (angle * Math.PI) / 180;

      // Calculate vertical position based on angle
      // The knob center is at 50% of the column height
      // We want labels positioned along the vertical arc where the indicator points
      const columnCenter = this.labelColumnHeight / 2;
      const verticalOffset = Math.sin(angleRad) * this.labelVerticalOffsetScale;
      const topPosition = columnCenter + verticalOffset;

      // Create label
      const label = document.createElement('label');
      label.className = 'dial-label';
      const span = document.createElement('span');
      span.textContent = option;
      label.appendChild(span);
      label.dataset.index = index;
      label.dataset.angle = angle;

      // Position label vertically based on angle
      label.style.top = `${topPosition}px`;
      if (isLeft) {
        label.style.right = '0';
      } else {
        label.style.left = '0';
      }

      label.addEventListener('click', () => {
        this.currentIndex = index;
        this.updateSelector();
      });

      // Append to containers
      if (container) container.appendChild(label);
      this.labels.push(label);

      // Create invisible wider hit area overlay for easier clicking (Fitt's Law)
      const hitArea = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      hitArea.setAttribute('class', 'spoke-line-hit-area');
      hitArea.setAttribute('fill', 'none');
      hitArea.setAttribute('stroke', 'transparent');
      hitArea.setAttribute('stroke-width', this.hitAreaStrokeWidth.toString());
      hitArea.setAttribute('stroke-linejoin', 'miter');
      hitArea.setAttribute('pointer-events', 'auto');
      hitArea.style.cursor = 'pointer';
      hitArea.dataset.index = index;
      // Initialize with empty points - will be set in updateLines()
      hitArea.setAttribute('points', '');

      // Make hit area clickable
      hitArea.addEventListener('click', () => {
        this.currentIndex = index;
        this.updateSelector();
      });

      // Create visible line (spoke + horizontal)
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      line.setAttribute('class', 'spoke-line');
      line.setAttribute('fill', 'none');
      line.setAttribute('stroke', 'var(--color-ink)');
      line.setAttribute('stroke-width', `var(--line-stroke-width, ${DEFAULT_LINE_STROKE_WIDTH})`);
      line.setAttribute('opacity', `var(--line-opacity-inactive, ${LINE_OPACITY_INACTIVE})`);
      line.setAttribute('stroke-linejoin', 'miter');
      line.setAttribute('pointer-events', 'none'); // Let clicks pass through to hit area
      line.dataset.index = index;

      // Append hit area first (behind), then line (on top)
      lineContainer.appendChild(hitArea);
      lineContainer.appendChild(line);
      this.lines.push(line);
      this.hitAreas.push(hitArea);
    });

    if (advanceButton) {
      advanceButton.addEventListener('click', () => {
        this.currentIndex = (this.currentIndex + 1) % this.OPTIONS.length;
        this.updateSelector();
      });
    }
  }

  updateLabelPositions() {
    // Update label positions based on current dimensions
    this.labels.forEach((label) => {
      const angle = parseFloat(label.dataset.angle);
      const angleRad = (angle * Math.PI) / 180;
      const index = parseInt(label.dataset.index);
      const isLeft = index < this.leftCount;

      // Calculate vertical position based on angle
      const columnCenter = this.labelColumnHeight / 2;
      const verticalOffset = Math.sin(angleRad) * this.labelVerticalOffsetScale;
      const topPosition = columnCenter + verticalOffset;

      // Update label position
      label.style.top = `${topPosition}px`;
    });
  }

  updateLines() {
    const knobWrap = this.querySelector('.knob-wrap');
    if (!knobWrap) return;

    const centerX = this.knobCenter;
    const centerY = this.knobCenter;
    // Get the actual knob radius from CSS variable, with fallback to default
    const computedStyle = getComputedStyle(this);
    const radiusOuter = computedStyle.getPropertyValue('--radius-outer').trim() || '90px';
    const knobRadius = parseFloat(radiusOuter);
    const horizontalLength = this.horizontalLineLength;

    this.labels.forEach((label, index) => {
      const labelRect = label.getBoundingClientRect();
      const knobWrapRect = knobWrap.getBoundingClientRect();

      const angle = parseFloat(label.dataset.angle);
      const angleRad = (angle * Math.PI) / 180;
      const isLeft = index < this.leftCount;

      // Label connection point (relative to knob-wrap)
      const labelX = isLeft ? labelRect.right - knobWrapRect.left : labelRect.left - knobWrapRect.left;
      const labelY = labelRect.top + labelRect.height / 2 - knobWrapRect.top;

      // Spoke start point at knob edge
      const spokeStartX = centerX + Math.cos(angleRad) * knobRadius;
      const spokeStartY = centerY + Math.sin(angleRad) * knobRadius;

      // Calculate where the spoke (extending from knob edge at angle) meets the horizontal line
      // The spoke extends from spokeStart outward at the given angle
      // We need to find where it intersects with the horizontal line at labelY
      // But limit the spoke length so horizontal spokes don't extend too far
      const maxSpokeLength = this.maxSpokeLength;

      let intersectX, intersectY;

      if (Math.abs(Math.sin(angleRad)) < NEARLY_HORIZONTAL_THRESHOLD) {
        // Nearly horizontal spoke - limit the extension
        const maxExtension = isLeft ? -maxSpokeLength : maxSpokeLength;
        intersectX = spokeStartX + maxExtension;
        intersectY = labelY;
      } else {
        // Parametric form: x = spokeStartX + t*cos(angle), y = spokeStartY + t*sin(angle)
        // We want y = labelY, so: t = (labelY - spokeStartY) / sin(angle)
        const t = (labelY - spokeStartY) / Math.sin(angleRad);

        // Limit the spoke length if it would extend too far
        const spokeLength = Math.abs(t);
        if (spokeLength > maxSpokeLength) {
          // Cap the spoke at max length
          const limitedT = t > 0 ? maxSpokeLength : -maxSpokeLength;
          intersectX = spokeStartX + limitedT * Math.cos(angleRad);
          // Keep intersection on the horizontal line at labelY
          intersectY = labelY;
        } else {
          intersectX = spokeStartX + t * Math.cos(angleRad);
          intersectY = labelY;
        }
      }

      // Horizontal line should extend from label to intersection
      // But we want it to stop a bit before the intersection for visual clarity
      const horizontalEndX = isLeft
        ? Math.min(intersectX - this.horizontalLineEndOffset, labelX + horizontalLength)
        : Math.max(intersectX + this.horizontalLineEndOffset, labelX - horizontalLength);
      const horizontalEndY = labelY;

      // Create polyline: label -> horizontal end -> intersection -> spoke start
      const points = `${labelX},${labelY} ${horizontalEndX},${horizontalEndY} ${intersectX},${intersectY} ${spokeStartX},${spokeStartY}`;
      this.lines[index].setAttribute('points', points);

      // Update hit area with same points
      if (this.hitAreas[index]) {
        this.hitAreas[index].setAttribute('points', points);
      }
    });
  }

  updateSelector() {
    if (this.labels.length === 0) return;

    const targetAngle = parseFloat(this.labels[this.currentIndex].dataset.angle);

    if (!this.isInitialized) {
      this.currentAngle = targetAngle;
      this.isInitialized = true;
      this.previousIndex = this.currentIndex;
    } else {
      // Calculate shortest angular distance
      // First get the raw difference
      let delta = targetAngle - this.currentAngle;

      // Normalize delta to be in the range [-180, 180]
      // This ensures we always take the shortest path around the circle
      while (delta > 180) delta -= FULL_CIRCLE_DEGREES;
      while (delta < -180) delta += FULL_CIRCLE_DEGREES;

      // Special case: When delta is exactly ±180° (halfway around the circle),
      // the direction is ambiguous. For 2-option selectors, prefer the direction
      // that goes "over the top" when moving to a higher index.
      if (Math.abs(delta) === 180) {
        if (this.currentIndex > this.previousIndex) {
          // Moving to higher index: prefer positive (counterclockwise)
          delta = 180;
        } else {
          // Moving to lower index: prefer negative (clockwise)
          delta = -180;
        }
      }

      // Apply the shortest delta to current angle
      this.currentAngle = this.currentAngle + delta;
    }

    this.style.setProperty('--indicator-angle', `${this.currentAngle}deg`);

    this.labels.forEach((label, index) => {
      const line = this.lines[index];
      if (index === this.currentIndex) {
        label.classList.add('active');
        line.classList.add('active');
        line.setAttribute('opacity', `var(--line-opacity-active, ${LINE_OPACITY_ACTIVE})`);
        line.setAttribute('stroke', 'var(--color-selection)');
      } else {
        label.classList.remove('active');
        line.classList.remove('active');
        line.setAttribute('opacity', `var(--line-opacity-inactive, ${LINE_OPACITY_INACTIVE})`);
        line.setAttribute('stroke', 'var(--color-ink)');
      }
    });

    // Dispatch change event if the selection actually changed
    if (this.previousIndex !== this.currentIndex && this.isInitialized) {
      this.dispatchChangeEvent();
      this.previousIndex = this.currentIndex;
    }
  }

  dispatchChangeEvent() {
    const event = new CustomEvent('change', {
      bubbles: true,
      cancelable: true,
      detail: {
        value: this.OPTIONS[this.currentIndex],
        index: this.currentIndex,
        previousValue: this.OPTIONS[this.previousIndex],
        previousIndex: this.previousIndex,
      },
    });

    // Store original onchange to restore later
    const onchangeAttr = this.getAttribute('onchange');
    const originalOnchange = this.onchange;

    // Temporarily remove onchange to prevent browser from auto-executing it
    if (onchangeAttr) {
      this.removeAttribute('onchange');
      delete this.onchange;
    }

    // Dispatch the event (browser won't auto-execute onchange since we removed it)
    this.dispatchEvent(event);

    // Manually execute the handler
    if (onchangeAttr) {
      try {
        const handler = new Function('event', onchangeAttr);
        handler.call(this, event);
      } catch (e) {
        console.warn('Error executing onchange handler:', e);
      }
      // Restore the attribute
      this.setAttribute('onchange', onchangeAttr);
    } else if (typeof originalOnchange === 'function') {
      originalOnchange.call(this, event);
    }
  }
}

customElements.define('dial-selector', DialSelector);
