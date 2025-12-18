// XP Dialog now handled with CSS only (no JS needed)
// Uses hidden checkbox #xp-dialog-toggle with :checked state

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
