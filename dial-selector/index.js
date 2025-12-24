/**
 * Dial Selector Web Component - Entry Point
 * Registers the custom element and exports for programmatic use
 */

import { DialSelector } from './dial-selector.js';

// Register the custom element
customElements.define('dial-selector', DialSelector);

// Export for potential programmatic use
export { DialSelector };

