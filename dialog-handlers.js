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
