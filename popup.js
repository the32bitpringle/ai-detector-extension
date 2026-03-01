document.addEventListener('DOMContentLoaded', () => {
  const gptZeroInput = document.getElementById('gptzero');
  const copyleaksInput = document.getElementById('copyleaks');
  const hiveInput = document.getElementById('hive');
  const saveButton = document.getElementById('save');
  const statusDiv = document.getElementById('status');

  // Load existing keys from storage
  chrome.storage.local.get(['gptzeroKey', 'copyleaksKey', 'hiveKey'], (result) => {
    if (result.gptzeroKey) gptZeroInput.value = result.gptzeroKey;
    if (result.copyleaksKey) copyleaksInput.value = result.copyleaksKey;
    if (result.hiveKey) hiveInput.value = result.hiveKey;
  });

  // Save keys to storage
  saveButton.addEventListener('click', () => {
    const keys = {
      gptzeroKey: gptZeroInput.value.trim(),
      copyleaksKey: copyleaksInput.value.trim(),
      hiveKey: hiveInput.value.trim()
    };

    chrome.storage.local.set(keys, () => {
      statusDiv.textContent = 'Settings saved successfully!';
      setTimeout(() => {
        statusDiv.textContent = '';
      }, 3000);
    });
  });
});