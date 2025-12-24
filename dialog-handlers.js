// Helper function to get cookie value
function getCookie(name) {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
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

// Reset all dialog/modal states on page load
window.addEventListener('DOMContentLoaded', () => {
  // Reset Neo-Swiss AI modal
  const neoswissAiToggle = document.getElementById('neoswiss-ai-toggle');
  if (neoswissAiToggle) {
    neoswissAiToggle.checked = false;
  }

  // Check if cookie is already set and update banner message
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieBannerDismiss = document.getElementById('cookie-banner-dismiss');
  const existingCookie = getCookie('resume_cookie_consent');

  if (cookieBanner && cookieBannerDismiss) {
    if (existingCookie) {
      cookieBanner.classList.add('cookie-banner--returning');
      cookieBannerDismiss.checked = false;
      console.log('🍪 Cookie found:', existingCookie);
    } else {
      cookieBannerDismiss.checked = false;
    }
  }

  // Cookie Banner - Set a real cookie when accepted
  const cookieBannerAccept = document.getElementById('cookie-banner-accept');
  if (cookieBannerAccept && !existingCookie) {
    cookieBannerAccept.addEventListener('click', () => {
      const now = new Date();
      now.setTime(now.getTime() + 60 * 60 * 1000);
      const expires = 'expires=' + now.toUTCString();
      const cookieValue = "Wow I can't believe you actually checked if a cookie was set. Well, indeed it is.";
      document.cookie = `resume_cookie_consent=${encodeURIComponent(cookieValue)};${expires};path=/;SameSite=Lax`;
      console.log('🍪 Cookie set!');
    });
  }
});

// XP Dialog
const xpCloseBtn = document.getElementById('xp-close-btn');
const xpDialog = document.getElementById('xp-dialog');
xpCloseBtn?.addEventListener('click', () => xpDialog?.showModal());
xpDialog?.addEventListener('click', (e) => {
  if (e.target.id === 'xp-dialog-ok') {
    window.close();
  } else if (e.target.id === 'xp-dialog-cancel' || e.target.id === 'xp-dialog-close') {
    xpDialog.close();
  }
});

// Terminal Dialog
const terminalDialog = document.getElementById('terminal-dialog');
document.getElementById('terminal-save-btn')?.addEventListener('click', () => terminalDialog?.showModal());
document.getElementById('terminal-dialog-cancel')?.addEventListener('click', () => terminalDialog?.close());
closeOnBackdrop(terminalDialog);

// CRT Terminal Log Dialog
const crtTerminalDialog = document.getElementById('crt-terminal-dialog');
const terminalLog = document.getElementById('terminal-log');
terminalLog?.addEventListener('click', () => crtTerminalDialog?.showModal());
addKeyboardClickHandler(terminalLog, () => crtTerminalDialog?.showModal());
document.getElementById('crt-terminal-dialog-close')?.addEventListener('click', () => crtTerminalDialog?.close());
closeOnBackdrop(crtTerminalDialog);

// Neo-Swiss AI Modal - Auto-scroll
const neoswissToggle = document.getElementById('neoswiss-ai-toggle');
if (neoswissToggle) {
  neoswissToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
      const container = document.querySelector('.neoswiss-ai-modal__container');
      const sections = document.querySelectorAll('.neoswiss-ai-modal__section');
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
    }
  });
}

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
