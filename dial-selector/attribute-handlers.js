/**
 * Attribute Handlers Mixin
 * Handles all attribute updates and parsing
 */

import { DEFAULT_LINE_STROKE_WIDTH, RAINBOW_COLORS } from './constants.js';

export const AttributeHandlers = {
  // Helper to parse percentage attribute (DRY principle)
  parsePercentageAttr(attrValue, defaultValue = 100, minValue = 0) {
    if (!attrValue) return defaultValue;
    const percentage = parseFloat(attrValue.replace('%', ''));
    return !isNaN(percentage) && percentage >= minValue ? percentage : defaultValue;
  },

  // Helper to update color properties
  updateColorProperty(attrName, cssVarName) {
    const value = this.getAttribute(attrName);
    if (value) {
      this.style.setProperty(cssVarName, value);
    }
  },

  updateIndicatorColor() {
    this.updateColorProperty('color-indicator', '--color-indicator');
  },

  createGradientFromColors(colors) {
    if (colors.length === 0) return 'none';
    if (colors.length === 1) {
      return `linear-gradient(to bottom, ${colors[0]})`;
    }

    const stops = colors
      .map((color, index) => {
        const percentage = (index / (colors.length - 1)) * 100;
        return `${color} ${percentage}%`;
      })
      .join(', ');

    return `linear-gradient(to bottom, ${stops})`;
  },

  updateIndicatorGradient() {
    const gradientColors = this.getAttribute('indicator-gradient');

    if (gradientColors) {
      const colors = gradientColors.split(',').map((color) => color.trim());
      const gradient = this.createGradientFromColors(colors);
      this.style.setProperty('--indicator-gradient', gradient);
    } else if (this.hasAttribute('indicator-rainbow')) {
      const gradient = this.createGradientFromColors(RAINBOW_COLORS);
      this.style.setProperty('--indicator-gradient', gradient);
    } else {
      this.style.removeProperty('--indicator-gradient');
    }
  },

  updateSelectionColor() {
    this.updateColorProperty('color-selection', '--color-selection');
  },

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
  },

  updateIndicatorLength() {
    const lengthIndicator = this.getAttribute('length-indicator');
    this.indicatorLengthPercentage = this.parsePercentageAttr(lengthIndicator);
    if (this.isInitialized) {
      this.updateDimensions();
    }
  },

  updateCenterIndicator() {
    const centerIndicator = this.getAttribute('center-indicator');
    this.centerIndicatorPercentage = this.parsePercentageAttr(centerIndicator, 0);
    if (this.isInitialized) {
      this.updateDimensions();
    }
  },

  updateKnobSize() {
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

    this.widthInnerCirclePercentage = this.parsePercentageAttr(this.getAttribute('width-inner-circle'));
    this.widthOuterCirclePercentage = this.parsePercentageAttr(this.getAttribute('width-outer-circle'));

    if (this.isInitialized) {
      this.updateDimensions();
    }
  },

  updateSelectionDelay() {
    const timeSelectionDelay = this.getAttribute('time-selection-delay');
    if (timeSelectionDelay) {
      const delayMs = parseFloat(timeSelectionDelay);
      const delaySeconds = Math.max(0, delayMs) / 1000;
      this.style.setProperty('--time-selection-delay', `${delaySeconds}s`);
    } else {
      this.style.removeProperty('--time-selection-delay');
    }
  },

  updateFontSize() {
    const fontSize = this.getAttribute('font-size');
    if (fontSize) {
      const percentage = parseFloat(fontSize.replace('%', ''));
      if (!isNaN(percentage) && fontSize.replace('%', '').trim() === percentage.toString()) {
        const baseMax = 14;
        const scaledMax = (baseMax * percentage) / 100;
        const baseMin = 10;
        const scaledMin = (baseMin * percentage) / 100;
        const viewportUnit = (1.5 * percentage) / 100;
        this.style.setProperty('--font-size', `clamp(${scaledMin}px, ${viewportUnit}vw, ${scaledMax}px)`);
      } else {
        this.style.setProperty('--font-size', fontSize);
      }
    } else {
      this.style.removeProperty('--font-size');
    }
  },

  updateFontFamily() {
    const fontFamily = this.getAttribute('font-family');
    if (fontFamily) {
      this.style.setProperty('--font-family', fontFamily);
    } else {
      this.style.removeProperty('--font-family');
    }
  },

  updateCursor() {
    const cursor = this.getAttribute('cursor');
    if (cursor) {
      this.style.setProperty('--dial-cursor', cursor);
    } else {
      this.style.removeProperty('--dial-cursor');
    }
  },

  // Helper to update width/height with minimum validation
  updateDimension(dimension, minValue = 200) {
    const value = this.getAttribute(dimension);
    const properties =
      dimension === 'width'
        ? ['--component-width', 'width', 'max-width', 'min-width']
        : ['--component-height', 'height', 'min-height'];

    if (value) {
      let finalValue = value;
      const pixelMatch = value.match(/^(\d+(?:\.\d+)?)px$/i);
      if (pixelMatch && parseFloat(pixelMatch[1]) < minValue) {
        finalValue = `${minValue}px`;
      }
      properties.forEach((prop) => this.style.setProperty(prop, finalValue));
      if (this.isInitialized) this.updateDimensions();
    } else {
      properties.forEach((prop) => this.style.removeProperty(prop));
      if (this.isInitialized) this.updateDimensions();
    }
  },

  updateWidth() {
    this.updateDimension('width');
  },

  updateHeight() {
    this.updateDimension('height');
  },

  setDefaultOption() {
    const defaultOption = this.getAttribute('default-option');
    if (!defaultOption) return;

    if (!this.OPTIONS || !Array.isArray(this.OPTIONS)) {
      return;
    }

    const indexValue = parseInt(defaultOption, 10);
    if (!isNaN(indexValue) && indexValue >= 0 && indexValue < this.OPTIONS.length) {
      this.currentIndex = indexValue;
      return;
    }

    const optionIndex = this.OPTIONS.findIndex((opt) => opt.toLowerCase() === defaultOption.trim().toLowerCase());
    if (optionIndex !== -1) {
      this.currentIndex = optionIndex;
      return;
    }

    console.warn(`dial-selector: default-option "${defaultOption}" not found. Using index 0.`);
  },
};
