// Helper function to get cookie value
function getCookie(name) {
  return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || null;
}

// Helper to close dialog on backdrop click
function closeOnBackdrop(dialog) {
  dialog?.addEventListener('click', (e) => e.target === dialog && dialog.close());
}

// Helper to add keyboard click handler (Enter/Space)
function addKeyboardClickHandler(element, callback) {
  element?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback(e);
    }
  });
}

// Helper to setup clickable card with keyboard support
function setupClickableCard(card, onClick) {
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.addEventListener('click', onClick);
  addKeyboardClickHandler(card, onClick);
}

// Cookie Banner - Convert to accessible dialog
window.addEventListener('DOMContentLoaded', () => {
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieBannerAccept = document.getElementById('cookie-banner-accept');

  // Store timeout ID so we can cancel it if theme changes
  let cookieBannerTimeoutId = null;

  // Function to check and show cookie banner if needed
  function checkAndShowCookieBanner() {
    const showDelay = 5000;
    const existingCookie = getCookie('resume_cookie_consent');
    const isBrutalTheme = document.documentElement.getAttribute('data-theme') === 'brutal';

    // Clear any existing timeout
    if (cookieBannerTimeoutId) {
      clearTimeout(cookieBannerTimeoutId);
      cookieBannerTimeoutId = null;
    }

    if (!cookieBanner || !isBrutalTheme) return;

    // If banner is already showing, don't show it again
    if (cookieBanner.open) return;

    if (!existingCookie) {
      // Show banner after delay for initial theme or theme changes
      cookieBannerTimeoutId = setTimeout(() => {
        // Double-check we're still on brutal theme before showing
        const stillBrutalTheme = document.documentElement.getAttribute('data-theme') === 'brutal';
        if (stillBrutalTheme) {
          cookieBanner.showModal();
        }
        cookieBannerTimeoutId = null;
      }, showDelay);
    } else {
      // Show returning visitor version
      cookieBanner.classList.add('cookie-banner--returning');
      cookieBannerTimeoutId = setTimeout(() => {
        // Double-check we're still on brutal theme before showing
        const stillBrutalTheme = document.documentElement.getAttribute('data-theme') === 'brutal';
        if (stillBrutalTheme) {
          cookieBanner.showModal();
        }
        cookieBannerTimeoutId = null;
      }, showDelay);
      console.log('🍪 Cookie found:', existingCookie);
    }
  }

  // Check on page load
  if (cookieBanner) {
    checkAndShowCookieBanner();
  }

  // Cookie Banner - Accept button sets cookie and closes
  cookieBannerAccept?.addEventListener('click', () => {
    const now = new Date();
    now.setTime(now.getTime() + 60 * 60 * 1000);
    const expires = 'expires=' + now.toUTCString();
    const cookieValue = "Wow I can't believe you actually checked if a cookie was set. Well, indeed it is.";
    document.cookie = `resume_cookie_consent=${encodeURIComponent(cookieValue)};${expires};path=/;SameSite=Lax`;
    console.log('🍪 Cookie set!');

    cookieBanner?.close();
  });

  // Backdrop click to close (optional - for better UX)
  closeOnBackdrop(cookieBanner);

  // Listen for theme changes to show cookie banner when switching to brutal theme
  const themeSelector = document.getElementById('theme-selector');
  if (themeSelector) {
    themeSelector.addEventListener('change', (event) => {
      // Small delay to let theme change complete
      setTimeout(checkAndShowCookieBanner, 100);
    });
  }
});

// XP Dialog
const xpCloseBtn = document.getElementById('xp-close-btn');
const xpDialog = document.getElementById('xp-dialog');
const xpDesktopIcon = document.getElementById('xp-desktop-icon');

xpCloseBtn?.addEventListener('click', () => xpDialog?.showModal());

xpDialog?.addEventListener('click', (e) => {
  if (e.target.id === 'xp-dialog-ok') {
    const resumeMain = document.querySelector('.resume__main');
    if (resumeMain) {
      resumeMain.style.display = 'none';
    }
    // Show desktop icon
    if (xpDesktopIcon) {
      xpDesktopIcon.style.display = 'block';
    }
    xpDialog.close();
  } else if (e.target.id === 'xp-dialog-cancel' || e.target.id === 'xp-dialog-close') {
    xpDialog.close();
  }
});

// XP Desktop Icon - restore window on double-click/double-tap
let xpIconClickCount = 0;
let xpIconClickTimer = null;

xpDesktopIcon?.addEventListener('click', (e) => {
  xpIconClickCount++;

  if (xpIconClickCount === 1) {
    xpIconClickTimer = setTimeout(() => {
      xpIconClickCount = 0;
    }, 300);
  } else if (xpIconClickCount === 2) {
    clearTimeout(xpIconClickTimer);
    xpIconClickCount = 0;

    const resumeMain = document.querySelector('.resume__main');
    if (resumeMain) {
      resumeMain.style.display = 'block';
    }
    if (xpDesktopIcon) {
      xpDesktopIcon.style.display = 'none';
    }
  }
});

// Terminal Dialog
const terminalDialog = document.getElementById('terminal-dialog');
document.getElementById('terminal-save-btn')?.addEventListener('click', () => terminalDialog?.showModal());
// Handle both desktop and mobile cancel buttons
document.getElementById('terminal-dialog-cancel')?.addEventListener('click', () => terminalDialog?.close());
document.getElementById('terminal-dialog-cancel-mobile')?.addEventListener('click', () => terminalDialog?.close());
closeOnBackdrop(terminalDialog);

// CRT Terminal Log Dialog
const crtTerminalDialog = document.getElementById('crt-terminal-dialog');
const terminalLog = document.getElementById('terminal-log');
terminalLog?.addEventListener('click', () => crtTerminalDialog?.showModal());
addKeyboardClickHandler(terminalLog, () => crtTerminalDialog?.showModal());
document.getElementById('crt-terminal-dialog-close')?.addEventListener('click', () => crtTerminalDialog?.close());
closeOnBackdrop(crtTerminalDialog);

// Neo-Swiss AI Modal - Convert to accessible dialog
const neoSwissButton = document.getElementById('neoswiss-ai-button');
const neoSwissDialog = document.getElementById('neoswiss-ai-modal');
const neoSwissClose = neoSwissDialog?.querySelector('.neoswiss-ai-modal__close');

// Store animation listeners for cleanup
let neoSwissAnimationListeners = [];

neoSwissButton?.addEventListener('click', () => {
  neoSwissDialog?.showModal();

  // Preserve existing auto-scroll functionality
  const container = neoSwissDialog.querySelector('.neoswiss-ai-modal__container');
  const sections = neoSwissDialog.querySelectorAll('.neoswiss-ai-modal__section');
  if (container && sections.length > 0) {
    container.scrollTop = 0;
    sections.forEach((section) => {
      const computedStyle = window.getComputedStyle(section);
      const animationDelay = parseFloat(computedStyle.animationDelay) || 0;
      const scrollDelay = animationDelay * 1000 + 400;
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
      }, scrollDelay);
    });
  }

  // Add haptic feedback for progressive animations
  const animatedElements = neoSwissDialog.querySelectorAll(`
    .neoswiss-ai-modal__section-title,
    .neoswiss-ai-modal__text,
    .neoswiss-ai-modal__list li,
    .neoswiss-ai-modal__score-bar,
    .neoswiss-ai-modal__score-fill,
    .neoswiss-ai-modal__score-label,
    #neoswiss-ai-modal__recommendation
  `);

  animatedElements.forEach((element) => {
    const handler = (e) => {
      // Only trigger for relevant animations
      if (['contentFadeIn', 'scoreFill', 'recommendationAppear'].includes(e.animationName)) {
        if (navigator.vibrate && typeof navigator.vibrate === 'function') {
          try {
            navigator.vibrate(12); // Very subtle for progressive output
          } catch (err) {
            // Silently fail
          }
        }
      }
    };
    element.addEventListener('animationstart', handler);
    neoSwissAnimationListeners.push({ element, handler });
  });
});

neoSwissClose?.addEventListener('click', () => {
  neoSwissDialog?.close();

  // Cleanup animation listeners
  neoSwissAnimationListeners.forEach(({ element, handler }) => {
    element.removeEventListener('animationstart', handler);
  });
  neoSwissAnimationListeners = [];
});

// Backdrop click to close
closeOnBackdrop(neoSwissDialog);

// Keyboard support for button
addKeyboardClickHandler(neoSwissButton, () => neoSwissDialog?.showModal());

// Dashboard Metrics Dialog
const dashboardMetricsDialog = document.getElementById('dashboard-metrics-dialog');
const dashboardDialogClose = document.getElementById('dashboard-metrics-dialog-close');

// Dialog title mapping
const dashboardTitles = {
  'years-experience': 'YEARS EXPERIENCE BREAKDOWN',
  'technologies-monitored': 'TECHNOLOGIES MONITORED',
  'projects-shipped': 'PROJECTS SHIPPED ANALYTICS',
  'code-quality': 'CODE QUALITY METRICS',
};

// Function to show appropriate dashboard dialog content
function showDashboardDialog(cardType) {
  const dialogTitle = document.getElementById('dashboard-dialog-title');
  const allDataSections = document.querySelectorAll('.dashboard-dialog-data');

  // Update title
  dialogTitle.textContent = dashboardTitles[cardType] || 'Metric Details';

  // Hide all content sections
  allDataSections.forEach((section) => {
    section.style.display = 'none';
  });

  // Show the appropriate content section
  const activeSection = document.querySelector(`.dashboard-dialog-data[data-card-type="${cardType}"]`);
  if (activeSection) {
    activeSection.style.display = 'block';
  }
}

// Add click handlers to dashboard cards
document.addEventListener('DOMContentLoaded', () => {
  const dashboardCards = document.querySelectorAll('.dashboard-card');
  dashboardCards.forEach((card) => {
    setupClickableCard(card, () => {
      const cardType = card.classList.value.split(' ').find((cls) => cls !== 'dashboard-card');
      if (cardType && dashboardTitles[cardType]) {
        showDashboardDialog(cardType);
        dashboardMetricsDialog?.showModal();
      }
    });
  });
});

// Close dashboard metrics dialog
dashboardDialogClose?.addEventListener('click', () => dashboardMetricsDialog?.close());
closeOnBackdrop(dashboardMetricsDialog);

// Metro Chat Dialog
const metroChatWidget = document.getElementById('metro-chat-widget');
const metroChatDialog = document.getElementById('metro-chat-dialog');
const metroChatDialogClose = document.getElementById('metro-chat-dialog-close');

// Open chat dialog when clicking widget
metroChatWidget?.addEventListener('click', () => metroChatDialog?.showModal());
addKeyboardClickHandler(metroChatWidget, () => metroChatDialog?.showModal());

// Close chat dialog
metroChatDialogClose?.addEventListener('click', () => metroChatDialog?.close());
closeOnBackdrop(metroChatDialog);

// Sticky Note Haptic Feedback
const stickyNoteCheckboxes = document.querySelectorAll('#sticky-note input[type="checkbox"]');
stickyNoteCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    if (navigator.vibrate && typeof navigator.vibrate === 'function') {
      try {
        navigator.vibrate(25);
      } catch (e) {
        // Silently fail
      }
    }
  });
});
