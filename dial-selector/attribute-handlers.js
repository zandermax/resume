/**
 * Attribute Handlers Mixin
 * Handles all attribute updates and parsing
 */

export const AttributeHandlers = {
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
      if (!isNaN(duration) && duration >= 0) {
        this.hapticFeedbackDuration = duration;
      } else {
        this.hapticFeedbackDuration = 25;
      }
    } else {
      this.hapticFeedbackDuration = 25;
    }
  },
};
