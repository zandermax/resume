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

    // Haptic feedback configuration
    this.hapticFeedbackEnabled = true;
    this.hapticFeedbackDuration = 25;
  }

  static get observedAttributes() {
    return [
      'options',
      'default-option',
      'haptic-feedback',
      'haptic-duration',
    ];
  }

  connectedCallback() {
    const optionsAttr = this.getAttribute('options');
    this.OPTIONS = optionsAttr ? optionsAttr.split(',').map((opt) => opt.trim()) : DEFAULT_OPTIONS;

    this.setDefaultOption();
    this.updateHapticFeedback();
    this.updateHapticDuration();
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

      case 'default-option':
        if (!this.isInitialized) {
          this.setDefaultOption();
          if (this.labels.length > 0) {
            this.updateSelector();
          }
        }
        break;

      case 'haptic-feedback':
        this.updateHapticFeedback();
        break;

      case 'haptic-duration':
        this.updateHapticDuration();
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
