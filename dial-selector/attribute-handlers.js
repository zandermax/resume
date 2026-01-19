/**
 * Attribute Handlers Mixin
 * Handles all attribute updates and parsing
 */

import { DEFAULT_HAPTIC_DURATION } from './constants.js';

export const AttributeHandlers = {
  /**
   * Parse a percentage attribute value
   * @param {string|null} value - The attribute value to parse
   * @param {number} defaultValue - The default percentage value to use if parsing fails
   * @returns {number} The parsed percentage value (0-100+)
   */
  parsePercentageAttr(value, defaultValue = 100) {
    if (value === null || value === undefined) {
      return defaultValue;
    }
    const parsed = parseFloat(value);
    if (isNaN(parsed) || parsed < 0) {
      return defaultValue;
    }
    return parsed;
  },
  setDefaultOption() {
    const defaultOption = this.getAttribute('default-option');
    if (!defaultOption) return;

    if (!this.OPTIONS || !Array.isArray(this.OPTIONS)) {
      console.warn('dial-selector: OPTIONS is not defined or not an array. Cannot set default option.');
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

    console.warn(`dial-selector: default-option "${defaultOption}" not found in OPTIONS. Defaulting to index 0.`);
    this.currentIndex = 0;
  },

  updateHapticFeedback() {
    const hapticFeedback = this.getAttribute('haptic-feedback');
    if (hapticFeedback === null) {
      this.hapticFeedbackEnabled = true;
      return;
    }
    const value = hapticFeedback.toLowerCase();
    this.hapticFeedbackEnabled = value !== 'false' && value !== '0' && value !== 'no';
  },

  updateHapticDuration() {
    const hapticDuration = this.getAttribute('haptic-duration');
    if (hapticDuration) {
      const duration = parseInt(hapticDuration, 10);
      // Validate duration is a non-negative number and within reasonable limits (max 5000ms)
      if (!isNaN(duration) && duration >= 0 && duration <= 5000) {
        this.hapticFeedbackDuration = duration;
      } else {
        console.warn(
          `dial-selector: Invalid haptic-duration "${hapticDuration}". Using default ${DEFAULT_HAPTIC_DURATION}ms.`,
        );
        this.hapticFeedbackDuration = DEFAULT_HAPTIC_DURATION;
      }
    } else {
      this.hapticFeedbackDuration = DEFAULT_HAPTIC_DURATION;
    }
  },
};
