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
export const BASE_LABEL_COLUMN_HEIGHT = 320;
export const BASE_LABEL_VERTICAL_OFFSET_SCALE = 140;
export const BASE_HORIZONTAL_LINE_LENGTH = 100;
export const BASE_MAX_SPOKE_LENGTH = 80;
export const BASE_HIT_AREA_STROKE_WIDTH = 20;
export const BASE_HORIZONTAL_LINE_END_OFFSET = 10;
export const BASE_INDICATOR_WIDTH = 10;

// Haptic feedback
export const DEFAULT_HAPTIC_DURATION = 25;
export const HAPTIC_COMPLETION_DURATION = 35;

// Animation and timing
export const INITIALIZATION_DELAY = 100;

// Angle calculation threshold
export const NEARLY_HORIZONTAL_THRESHOLD = 0.0001;
export const FULL_CIRCLE_DEGREES = 360;

// Default options
export const DEFAULT_OPTIONS = ['PHONO-2', 'PHONO-1', 'TUNER', 'AUX', 'CD', 'TAPE', 'STREAM', 'TV'];
