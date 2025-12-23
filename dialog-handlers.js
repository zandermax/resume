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
      // Cookie exists - show the "EVERY TIME" message
      cookieBanner.classList.add('cookie-banner--returning');
      cookieBannerDismiss.checked = false; // Show the banner again
      console.log('🍪 Cookie found:', existingCookie);
    } else {
      // No cookie - reset banner to hidden
      cookieBannerDismiss.checked = false;
    }
  }

  // Cookie Banner - Set a real cookie when accepted
  const cookieBannerAccept = document.getElementById('cookie-banner-accept');
  if (cookieBannerAccept && !existingCookie) {
    cookieBannerAccept.addEventListener('click', () => {
      // Set cookie that expires in 1 hour
      const now = new Date();
      now.setTime(now.getTime() + 60 * 60 * 1000);
      const expires = 'expires=' + now.toUTCString();

      const cookieValue = "Wow I can't believe you actually checked if a cookie was set. Well, indeed it is.";
      document.cookie = `resume_cookie_consent=${encodeURIComponent(cookieValue)};${expires};path=/;SameSite=Lax`;

      console.log('🍪 Cookie set!');
    });
  }
});

// XP Dialog minimal JS using native dialog
const xpCloseBtn = document.getElementById('xp-close-btn');
const xpDialog = document.getElementById('xp-dialog');

xpCloseBtn?.addEventListener('click', () => xpDialog?.showModal());
xpDialog?.addEventListener('click', (e) => {
  if (e.target.id === 'xp-dialog-ok') {
    window.close(); // Actually try to close the window!
  } else if (e.target.id === 'xp-dialog-cancel' || e.target.id === 'xp-dialog-close') {
    xpDialog.close();
  }
});

// Terminal Dialog minimal JS using native dialog
const terminalSaveBtn = document.getElementById('terminal-save-btn');
const terminalDialog = document.getElementById('terminal-dialog');
const terminalDialogCancel = document.getElementById('terminal-dialog-cancel');

terminalSaveBtn?.addEventListener('click', () => terminalDialog?.showModal());
terminalDialogCancel?.addEventListener('click', () => terminalDialog?.close());

// Close dialog when clicking the backdrop
terminalDialog?.addEventListener('click', (e) => {
  if (e.target === terminalDialog) {
    terminalDialog.close();
  }
});

// Neo-Swiss AI Modal - Auto-scroll to keep latest section visible
const neoswissToggle = document.getElementById('neoswiss-ai-toggle');
if (neoswissToggle) {
  neoswissToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
      // Modal just opened - set up auto-scroll behavior
      const container = document.querySelector('.neoswiss-ai-modal__container');
      const sections = document.querySelectorAll('.neoswiss-ai-modal__section');

      if (container && sections.length > 0) {
        // Reset scroll position to top when modal opens
        container.scrollTop = 0;

        // Set up auto-scroll for each section based on its animation delay
        sections.forEach((section, index) => {
          // Get the animation delay from computed styles
          const computedStyle = window.getComputedStyle(section);
          const animationDelay = parseFloat(computedStyle.animationDelay) || 0;

          // Schedule scroll to happen partway through the section's appearance
          // This ensures the user sees it enter from below
          const scrollDelay = animationDelay * 1000 + 400; // 400ms after animation starts

          setTimeout(() => {
            section.scrollIntoView({
              behavior: 'smooth',
              block: 'end', // Align to bottom of viewport
              inline: 'nearest',
            });
          }, scrollDelay);
        });
      }
    }
  });
}
