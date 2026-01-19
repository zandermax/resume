/**
 * Geometry Mixin
 * Handles angle calculations and dimension updates for the Dial Selector component.
 *
 * This mixin provides methods for:
 * - Calculating spoke angles for label positioning around the dial
 * - Scaling dimensions based on actual rendered size
 * - Positioning labels vertically using trigonometric calculations
 */

import {
  RIGHT_ARC_START,
  RIGHT_ARC_END,
  LEFT_ARC_START,
  LEFT_ARC_END,
  BASE_KNOB_WRAP_SIZE,
  BASE_LABEL_COLUMN_HEIGHT,
  BASE_LABEL_VERTICAL_OFFSET_SCALE,
  BASE_HORIZONTAL_LINE_LENGTH,
  BASE_MAX_SPOKE_LENGTH,
  BASE_HIT_AREA_STROKE_WIDTH,
  BASE_HORIZONTAL_LINE_END_OFFSET,
} from './constants.js';

export const Geometry = {
  /**
   * Generates evenly distributed angles within a given arc.
   *
   * @param {number} count - Number of angles to generate
   * @param {number} arcStart - Starting angle in degrees
   * @param {number} arcEnd - Ending angle in degrees
   * @returns {number[]} Array of angles in degrees
   *
   * Edge cases:
   * - When count === 1, returns the midpoint of the arc to center the single option
   * - When count > 1, distributes angles evenly across the arc range
   *
   * Example: generateAngles(3, -45, 45) → [-45, 0, 45]
   */
  generateAngles(count, arcStart, arcEnd) {
    const angles = [];
    for (let i = 0; i < count; i++) {
      // Special case: single option should be centered in the arc
      angles.push(count === 1 ? (arcStart + arcEnd) / 2 : arcStart + ((arcEnd - arcStart) * i) / (count - 1));
    }
    return angles;
  },

  /**
   * Calculates spoke angles for all options, distributing them across right and left arcs.
   *
   * The dial is divided into two arcs:
   * - Right arc: -45° to 45° (bottom-right to top-right)
   * - Left arc: 135° to 225° (top-left to bottom-left)
   *
   * Options are split evenly (with rounding up for left side if odd count).
   * Updates: this.spokeAngles, this.rightCount, this.leftCount, this.halfPoint
   */
  calculateAngles() {
    this.halfPoint = Math.ceil(this.OPTIONS.length / 2);
    this.rightCount = this.OPTIONS.length - this.halfPoint;
    this.leftCount = this.halfPoint;

    // Generate angles for both sides
    this.spokeAngles = [
      ...this.generateAngles(this.rightCount, RIGHT_ARC_START, RIGHT_ARC_END),
      ...this.generateAngles(this.leftCount, LEFT_ARC_START, LEFT_ARC_END),
    ];
  },

  /**
   * Updates all scaled dimensions based on the actual rendered size of the knob.
   *
   * This method reads the actual CSS-controlled size and scales all dimension properties
   * proportionally from their base values. This allows the component to be responsive
   * and work at any size while maintaining proper proportions.
   *
   * Scale factor formula: actualSize / BASE_KNOB_WRAP_SIZE (320px)
   *
   * Will skip if:
   * - Container has zero width (likely hidden/display:none)
   * - .knob-wrap element doesn't exist yet (DOM not ready)
   */
  updateDimensions() {
    const containerWidth = this.getBoundingClientRect().width;

    if (containerWidth === 0) {
      console.warn('DialSelector: Container has zero width, skipping dimension update. Component may be hidden.');
      return;
    }

    const knobWrap = this.querySelector('.knob-wrap');
    if (!knobWrap) {
      console.warn('DialSelector: .knob-wrap element not found, skipping dimension update. DOM may not be ready.');
      return;
    }

    // CSS-controlled sizing: read the actual rendered size and scale all dimensions proportionally
    const actualSize = knobWrap.getBoundingClientRect().width;

    if (actualSize === 0) {
      console.warn('DialSelector: .knob-wrap has zero width, skipping dimension update.');
      return;
    }

    this.knobWrapSize = actualSize;
    this.knobCenter = actualSize / 2;

    const scale = actualSize / BASE_KNOB_WRAP_SIZE;
    this.labelColumnHeight = BASE_LABEL_COLUMN_HEIGHT * scale;
    this.labelVerticalOffsetScale = BASE_LABEL_VERTICAL_OFFSET_SCALE * scale;
    this.horizontalLineLength = BASE_HORIZONTAL_LINE_LENGTH * scale;
    this.maxSpokeLength = BASE_MAX_SPOKE_LENGTH * scale;
    this.hitAreaStrokeWidth = BASE_HIT_AREA_STROKE_WIDTH * scale;
    this.horizontalLineEndOffset = BASE_HORIZONTAL_LINE_END_OFFSET * scale;

    if (this.labels.length > 0) {
      this.updateLabelPositions();
    }
  },

  /**
   * Updates the vertical position of all label elements using trigonometry.
   *
   * Formula: topPosition = columnCenter + sin(angle) × verticalOffsetScale
   *
   * This creates the visual effect of labels following the arc of the dial:
   * - Labels at 0° (right) are centered vertically
   * - Labels at 90° (top) are at maximum upward offset
   * - Labels at 180° (left) are centered vertically
   * - Labels at 270° (bottom) are at maximum downward offset
   *
   * Validates that label.dataset.angle exists and is a valid number.
   */
  updateLabelPositions() {
    this.labels.forEach((label, index) => {
      if (!label.dataset.angle) {
        console.warn(`DialSelector: Label at index ${index} is missing data-angle attribute.`);
        return;
      }

      const angle = parseFloat(label.dataset.angle);

      if (isNaN(angle)) {
        console.warn(`DialSelector: Label at index ${index} has invalid angle: "${label.dataset.angle}"`);
        return;
      }

      const angleRad = (angle * Math.PI) / 180;

      const columnCenter = this.labelColumnHeight / 2;
      const verticalOffset = Math.sin(angleRad) * this.labelVerticalOffsetScale;
      const topPosition = columnCenter + verticalOffset;

      label.style.top = `${topPosition}px`;
    });
  },
};
