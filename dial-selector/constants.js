/**
 * Constants for Dial Selector Component
 */

// Arc angles for label positioning
export const RIGHT_ARC_START = -45;
export const RIGHT_ARC_END = 45;
export const LEFT_ARC_START = 135;
export const LEFT_ARC_END = 225;

// Base dimensions (used as reference for scaling)
export const BASE_KNOB_WRAP_SIZE = 320;
export const BASE_KNOB_RADIUS_OUTER = 90;
export const BASE_KNOB_RADIUS_INNER = 72;
export const BASE_LABEL_COLUMN_HEIGHT = 320;
export const BASE_LABEL_VERTICAL_OFFSET_SCALE = 140;
export const BASE_HORIZONTAL_LINE_LENGTH = 100;
export const BASE_MAX_SPOKE_LENGTH = 80;
export const BASE_HIT_AREA_STROKE_WIDTH = 20;
export const DEFAULT_LINE_STROKE_WIDTH = 2;
export const BASE_HORIZONTAL_LINE_END_OFFSET = 10;
export const BASE_INDICATOR_WIDTH = 10;
export const BASE_INDICATOR_LENGTH = 60;
export const BASE_CENTER_INDICATOR = 15;
export const BASE_WIDTH_OUTER_CIRCLE = 4;
export const BASE_WIDTH_INNER_CIRCLE = 2;

// Min/max constraints
export const MIN_KNOB_WRAP_SIZE = 200;
export const MAX_KNOB_WRAP_SIZE = 600;

// Opacity values
export const LINE_OPACITY_INACTIVE = 0.4;
export const LINE_OPACITY_ACTIVE = 0.8;

// Animation and timing
export const INITIALIZATION_DELAY = 100;

// Angle calculation threshold
export const NEARLY_HORIZONTAL_THRESHOLD = 0.0001;
export const FULL_CIRCLE_DEGREES = 360;

// Default options
export const DEFAULT_OPTIONS = ['PHONO-2', 'PHONO-1', 'TUNER', 'AUX', 'CD', 'TAPE', 'STREAM', 'TV'];

// Rainbow gradient colors
export const RAINBOW_COLORS = [
  '#ff0000', // Red
  '#ff7f00', // Orange
  '#ffff00', // Yellow
  '#00ff00', // Green
  '#0000ff', // Blue
  '#4b0082', // Indigo
  '#9400d3', // Violet
];

