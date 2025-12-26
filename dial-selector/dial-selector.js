/**
 * Dial Selector Web Component
 * Main class that orchestrates the component behavior
 */

import {
  DEFAULT_OPTIONS,
  BASE_KNOB_WRAP_SIZE,
  BASE_LABEL_COLUMN_HEIGHT,
  BASE_LABEL_VERTICAL_OFFSET_SCALE,
  BASE_HORIZONTAL_LINE_LENGTH,
  BASE_MAX_SPOKE_LENGTH,
  BASE_HIT_AREA_STROKE_WIDTH,
  BASE_HORIZONTAL_LINE_END_OFFSET,
  BASE_INDICATOR_WIDTH,
  INITIALIZATION_DELAY,
} from './constants.js';
import { AttributeHandlers } from './attribute-handlers.js';
import { Geometry } from './geometry.js';
import { DOMBuilder } from './dom-builder.js';

export class DialSelector extends HTMLElement {
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

    // Dynamic dimensions
    this.knobWrapSize = BASE_KNOB_WRAP_SIZE;
    this.knobCenter = BASE_KNOB_WRAP_SIZE / 2;
    this.labelColumnHeight = BASE_LABEL_COLUMN_HEIGHT;
    this.labelVerticalOffsetScale = BASE_LABEL_VERTICAL_OFFSET_SCALE;
    this.horizontalLineLength = BASE_HORIZONTAL_LINE_LENGTH;
    this.maxSpokeLength = BASE_MAX_SPOKE_LENGTH;
    this.hitAreaStrokeWidth = BASE_HIT_AREA_STROKE_WIDTH;
    this.horizontalLineEndOffset = BASE_HORIZONTAL_LINE_END_OFFSET;
    this.indicatorWidth = BASE_INDICATOR_WIDTH;
    this.indicatorLengthPercentage = 100;

    // Percentage values
    this.centerIndicatorPercentage = 0;
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
      'cursor',
    ];
  }

  connectedCallback() {
    const optionsAttr = this.getAttribute('options');
    this.OPTIONS = optionsAttr ? optionsAttr.split(',').map((opt) => opt.trim()) : DEFAULT_OPTIONS;

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
    this.updateCursor();
    this.updateWidth();
    this.updateHeight();
    this.buildDOM();
    this.calculateAngles();

    this.setupResizeObserver();

    this.classList.add('no-transitions');

    requestAnimationFrame(() => {
      this.updateDimensions();
      this.createLabelsAndLines();

      setTimeout(() => {
        this.updateLines();
        this.updateSelector();
        this.classList.remove('no-transitions');
      }, INITIALIZATION_DELAY);
    });

    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.handleAttributeChange({ name, oldValue, newValue });
  }

  handleResize() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.classList.add('no-transitions');
          this.classList.add('calculating-layout');
          this.updateDimensions();
          this.updateLines();
          requestAnimationFrame(() => {
            this.classList.remove('no-transitions');
            this.classList.remove('calculating-layout');
          });
        });
      });
    });
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
          this.classList.add('no-transitions');
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
            this.classList.remove('no-transitions');
          }, INITIALIZATION_DELAY);
        }
        break;

      case 'onchange':
        break;

      case 'default-option':
        if (!this.isInitialized) {
          this.setDefaultOption();
          if (this.labels.length > 0) {
            this.updateSelector();
          }
        }
        break;

      case 'cursor':
        this.updateCursor();
        break;

      default:
        break;
    }
  }

  setupResizeObserver() {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.handleResize();
      });
      const knobWrap = this.querySelector('.knob-wrap');
      if (knobWrap) {
        this.resizeObserver.observe(knobWrap);
      }
    }
  }
}

// Mix in all the methods from our modules
Object.assign(DialSelector.prototype, AttributeHandlers, Geometry, DOMBuilder);
