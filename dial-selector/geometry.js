/**
 * Geometry Mixin
 * Handles angle calculations and dimension updates
 */

import {
  RIGHT_ARC_START,
  RIGHT_ARC_END,
  LEFT_ARC_START,
  LEFT_ARC_END,
  BASE_KNOB_WRAP_SIZE,
  BASE_KNOB_RADIUS_OUTER,
  BASE_KNOB_RADIUS_INNER,
  BASE_LABEL_COLUMN_HEIGHT,
  BASE_LABEL_VERTICAL_OFFSET_SCALE,
  BASE_HORIZONTAL_LINE_LENGTH,
  BASE_MAX_SPOKE_LENGTH,
  BASE_HIT_AREA_STROKE_WIDTH,
  BASE_HORIZONTAL_LINE_END_OFFSET,
  BASE_INDICATOR_WIDTH,
  BASE_INDICATOR_LENGTH,
  BASE_CENTER_INDICATOR,
  BASE_WIDTH_OUTER_CIRCLE,
  BASE_WIDTH_INNER_CIRCLE,
  MIN_KNOB_WRAP_SIZE,
  MAX_KNOB_WRAP_SIZE,
} from './constants.js';

export const Geometry = {
  // Helper to generate angles for a given arc
  generateAngles(count, arcStart, arcEnd) {
    const angles = [];
    for (let i = 0; i < count; i++) {
      angles.push(count === 1 ? (arcStart + arcEnd) / 2 : arcStart + ((arcEnd - arcStart) * i) / (count - 1));
    }
    return angles;
  },

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

  updateDimensions() {
    const containerWidth = this.getBoundingClientRect().width;
    const containerHeight = this.getBoundingClientRect().height;

    if (containerWidth === 0) {
      return;
    }

    const knobWrap = this.querySelector('.knob-wrap');
    if (!knobWrap) return;

    const selector = this.querySelector('.selector');
    if (!selector) return;

    const widthAttr = this.getAttribute('width');
    const heightAttr = this.getAttribute('height');
    const hasExplicitWidth = !!widthAttr;
    const hasFixedHeight = !!heightAttr;

    // CSS CONTROL MODE: No explicit sizing
    if (!hasExplicitWidth && !hasFixedHeight) {
      const actualSize = knobWrap.getBoundingClientRect().width;
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

      return;
    }

    // EXPLICIT SIZING MODE
    const computedStyle = getComputedStyle(selector);
    const gap = parseFloat(computedStyle.gap) || 0;
    const availableWidth = containerWidth - gap * 2;

    let targetSize = Math.min(Math.max(MIN_KNOB_WRAP_SIZE, availableWidth * 0.45), MAX_KNOB_WRAP_SIZE);

    if (hasFixedHeight && containerHeight > 0) {
      const heightBasedSize = containerHeight;
      targetSize = Math.min(targetSize, heightBasedSize);
      targetSize = Math.min(Math.max(MIN_KNOB_WRAP_SIZE, targetSize), MAX_KNOB_WRAP_SIZE);
    }

    if (hasExplicitWidth || hasFixedHeight) {
      this.style.setProperty('--ds-knob-wrap-size', `${targetSize}px`);
    }

    void knobWrap.offsetWidth;

    const actualSize = knobWrap.getBoundingClientRect().width;
    this.knobWrapSize = actualSize;
    this.knobCenter = this.knobWrapSize / 2;

    const scale = this.knobWrapSize / BASE_KNOB_WRAP_SIZE;

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

    this.radiusOuterPercentage = this.parsePercentageAttr(this.getAttribute('radius-outer'));
    this.radiusInnerPercentage = this.parsePercentageAttr(this.getAttribute('radius-inner'));

    const baseRadiusOuter = (BASE_KNOB_RADIUS_OUTER * this.radiusOuterPercentage) / 100;
    const baseRadiusInner = (BASE_KNOB_RADIUS_INNER * this.radiusInnerPercentage) / 100;

    const scaledRadiusOuter = baseRadiusOuter * scale;
    const scaledRadiusInner = baseRadiusInner * scale;

    if (hasExplicitWidth || hasFixedHeight) {
      this.style.setProperty('--ds-radius-outer', `${scaledRadiusOuter}px`);
      this.style.setProperty('--ds-radius-inner', `${scaledRadiusInner}px`);
    }

    const baseWidthOuter = (BASE_WIDTH_OUTER_CIRCLE * this.widthOuterCirclePercentage) / 100;
    const baseWidthInner = (BASE_WIDTH_INNER_CIRCLE * this.widthInnerCirclePercentage) / 100;
    const scaledWidthOuter = baseWidthOuter * scale;
    const scaledWidthInner = baseWidthInner * scale;

    if (hasExplicitWidth || hasFixedHeight) {
      this.style.setProperty('--ds-width-outer-circle', `${scaledWidthOuter}px`);
      this.style.setProperty('--ds-width-inner-circle', `${scaledWidthInner}px`);
    }

    const baseCenterIndicator = (BASE_CENTER_INDICATOR * this.centerIndicatorPercentage) / 100;
    const scaledCenterIndicator = baseCenterIndicator * scale;
    this.style.setProperty('--ds-center-indicator', `${scaledCenterIndicator}px`);

    const indicatorLengthRatio = BASE_INDICATOR_LENGTH / BASE_KNOB_RADIUS_OUTER;
    const scaledIndicatorLength = scaledRadiusOuter * indicatorLengthRatio * (this.indicatorLengthPercentage / 100);

    if (hasExplicitWidth || hasFixedHeight) {
      this.style.setProperty('--ds-indicator-length', `${scaledIndicatorLength}px`);
    }

    this.style.setProperty('--ds-knob-center', `${this.knobCenter}px`);

    if (hasExplicitWidth || hasFixedHeight) {
      this.style.setProperty('--ds-label-column-height', `${this.labelColumnHeight}px`);
      this.style.setProperty('--ds-label-vertical-offset-scale', `${this.labelVerticalOffsetScale}px`);
      this.style.setProperty('--ds-horizontal-line-length', `${this.horizontalLineLength}px`);
      this.style.setProperty('--ds-max-line-length', `${this.maxSpokeLength}px`);
      this.style.setProperty('--dial-selector-indicator-width', `${this.indicatorWidth}px`);
    }

    this.style.setProperty('--ds-hit-area-stroke-width', `${this.hitAreaStrokeWidth}px`);
    this.style.setProperty('--ds-horizontal-line-end-offset', `${this.horizontalLineEndOffset}px`);

    if (this.labels.length > 0) {
      this.updateLabelPositions();
    }
  },

  updateLabelPositions() {
    this.labels.forEach((label) => {
      const angle = parseFloat(label.dataset.angle);
      const angleRad = (angle * Math.PI) / 180;

      const columnCenter = this.labelColumnHeight / 2;
      const verticalOffset = Math.sin(angleRad) * this.labelVerticalOffsetScale;
      const topPosition = columnCenter + verticalOffset;

      label.style.top = `${topPosition}px`;
    });
  },
};
