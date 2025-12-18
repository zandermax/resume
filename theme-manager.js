// ===========================
// Glitch Theme - Mark Random Characters
// ===========================

// Mark random characters with a class for CSS-based glitch effect
function markGlitchableCharacters() {
  const mainContainer = document.querySelector('.resume__main');
  if (!mainContainer) return;

  // Get all sections except the header
  const contentElements = Array.from(mainContainer.children).filter(
    (child) => !child.classList.contains('resume-header')
  );

  // Process each content section
  contentElements.forEach((element) => {
    // Work with text nodes to preserve HTML structure
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);

    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node);
    }

    // Wrap random characters in spans
    textNodes.forEach((textNode) => {
      const text = textNode.textContent;
      if (!text.trim()) return;

      const fragment = document.createDocumentFragment();

      for (let i = 0; i < text.length; i++) {
        const char = text[i];

        // 3% chance to mark character as glitchable
        if (char.trim() && Math.random() < 0.03) {
          const span = document.createElement('span');
          span.className = 'glitchable';
          span.textContent = char;
          fragment.appendChild(span);
        } else {
          fragment.appendChild(document.createTextNode(char));
        }
      }

      textNode.parentNode.replaceChild(fragment, textNode);
    });
  });
}

// ===========================
// Theme Management
// ===========================

// Map display names to internal theme names
const THEME_DISPLAY_TO_INTERNAL = {
  current: 'default',
  1985: 'crt',
  1992: 'terminal',
  1996: 'nostalgia',
  2001: 'xp',
  2004: 'web2gloss',
  2007: 'skeuomorph',
  2012: 'metro',
  2017: 'brutal',
  2020: 'dashboard',
  2027: 'neoswiss',
  2039: 'glitch',
};

// Current selections
let currentTheme = 'default';
let currentMode = 'light';

// Apply a theme+mode combination by setting data attributes
// CSS handles ALL theme behavior via [data-theme] selectors and CSS custom properties
function applyThemeAndMode() {
  // Set attributes on both :root (html) and body for CSS targeting
  // :root is needed for CSS custom properties, body for theme-specific rules
  document.documentElement.setAttribute('data-theme', currentTheme);
  document.documentElement.setAttribute('data-mode', currentMode);
  document.body.setAttribute('data-theme', currentTheme);
  document.body.setAttribute('data-mode', currentMode);
}

// Handle theme change from theme selector
function handleThemeChange(event) {
  const displayName = event.detail.value.toLowerCase();
  // Map display name to internal theme name
  currentTheme = THEME_DISPLAY_TO_INTERNAL[displayName] || displayName;

  // For glitch theme, enable animations after theme is applied
  if (currentTheme === 'glitch') {
    // Remove animation-ready flag if switching away and back
    document.body.removeAttribute('data-glitch-animations-ready');

    // Apply theme first
    applyThemeAndMode();

    // Enable animations after browser has time to prepare the theme
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.setAttribute('data-glitch-animations-ready', 'true');
      });
    });
  } else {
    // For other themes, just apply normally
    document.body.removeAttribute('data-glitch-animations-ready');
    applyThemeAndMode();
  }

  // Handle cookie banner for brutal theme
  handleCookieBanner();
}

// Handle mode change from mode selector
function handleModeChange(event) {
  currentMode = event.detail.value.toLowerCase();
  applyThemeAndMode();
}

// ===========================
// Cookie Banner (Brutal/2017 Theme)
// ===========================

// Handle cookie banner visibility
function handleCookieBanner() {
  const cookieBannerOverlay = document.getElementById('cookie-banner-overlay');

  if (!cookieBannerOverlay) return;

  // Check if user has already accepted cookies (stored in sessionStorage for the session)
  const cookiesAccepted = sessionStorage.getItem('brutal-cookies-accepted');

  // Show banner only for brutal theme and if not already accepted
  if (currentTheme === 'brutal' && !cookiesAccepted) {
    cookieBannerOverlay.style.display = 'block';
    // Prevent scrolling when banner is open
    document.body.style.overflow = 'hidden';
  } else {
    cookieBannerOverlay.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Handle cookie banner acceptance
function acceptCookies() {
  // Store acceptance in sessionStorage (will reset when browser is closed)
  sessionStorage.setItem('brutal-cookies-accepted', 'true');

  // Hide the banner with animation
  const cookieBannerOverlay = document.getElementById('cookie-banner-overlay');
  if (cookieBannerOverlay) {
    cookieBannerOverlay.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
      cookieBannerOverlay.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
  // Mark random characters for glitch effect (CSS will handle the styling)
  markGlitchableCharacters();

  // Apply default theme and mode
  applyThemeAndMode();

  // If starting with glitch theme, enable animations after initial render
  if (currentTheme === 'glitch') {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.setAttribute('data-glitch-animations-ready', 'true');
      });
    });
  }

  // Initialize cookie banner
  handleCookieBanner();

  // Attach event listeners to dial-selectors
  const themeSelector = document.getElementById('theme-selector');
  const modeSelector = document.getElementById('mode-selector');

  if (themeSelector) {
    themeSelector.addEventListener('change', handleThemeChange);
  }

  if (modeSelector) {
    modeSelector.addEventListener('change', handleModeChange);
  }

  // Attach cookie banner accept button
  const cookieAcceptBtn = document.getElementById('cookie-banner-accept');
  if (cookieAcceptBtn) {
    cookieAcceptBtn.addEventListener('click', acceptCookies);
  }
});
