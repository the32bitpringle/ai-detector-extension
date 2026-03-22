document.addEventListener('DOMContentLoaded', () => {
  const apiInputs = {
    gptzeroKey: document.getElementById('gptzero'),
    copyleaksKey: document.getElementById('copyleaks'),
    winstonKey: document.getElementById('winston'),
    originalityKey: document.getElementById('originality'),
    pangramKey: document.getElementById('pangram'),
    hiveKey: document.getElementById('hive'),
    sensityKey: document.getElementById('sensity'),
    realitydefenderKey: document.getElementById('realitydefender'),
    deepwareKey: document.getElementById('deepware'),
    truthscanKey: document.getElementById('truthscan')
  };
  const saveButton = document.getElementById('save');
  const statusDiv = document.getElementById('status');

  const storageKeys = Object.keys(apiInputs);

  // Load existing keys from storage
  chrome.storage.local.get(storageKeys, (result) => {
    storageKeys.forEach(key => {
      if (result[key]) apiInputs[key].value = result[key];
    });
  });

  // Save keys to storage
  saveButton.addEventListener('click', () => {
    const keys = {};
    storageKeys.forEach(key => {
      keys[key] = apiInputs[key].value.trim();
    });

    chrome.storage.local.set(keys, () => {
      statusDiv.textContent = 'Settings saved successfully!';
      setTimeout(() => {
        statusDiv.textContent = '';
      }, 3000);
    });
  });
});