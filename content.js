let lastRightClickedElement = null;

// Track the element the user right-clicked on
document.addEventListener('contextmenu', (event) => {
  lastRightClickedElement = event.target;
}, true);

// Listen for messages from background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'start-text-scan' || request.action === 'start-image-scan') {
    if (lastRightClickedElement) {
      showLoadingLabel(lastRightClickedElement);
    }
  } else if (request.action === 'scan-result') {
    if (lastRightClickedElement) {
      removeLoadingLabel(lastRightClickedElement);
      showResultLabel(lastRightClickedElement, request.result);
    }
  }
});

function showLoadingLabel(element) {
  const rect = element.getBoundingClientRect();
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'ai-detector-loading';
  loadingDiv.textContent = 'Scanning for AI...';
  
  // Position above the element
  loadingDiv.style.top = `${window.scrollY + rect.top - 24}px`;
  loadingDiv.style.left = `${window.scrollX + rect.left}px`;
  
  document.body.appendChild(loadingDiv);
  element._aiLoadingDiv = loadingDiv;
}

function removeLoadingLabel(element) {
  if (element._aiLoadingDiv) {
    element._aiLoadingDiv.remove();
    delete element._aiLoadingDiv;
  }
}

function showResultLabel(element, result) {
  const rect = element.getBoundingClientRect();
  const labelDiv = document.createElement('div');
  labelDiv.className = 'ai-detector-label';
  
  if (result.error) {
    labelDiv.textContent = `⚠️ Error: ${result.error}`;
    labelDiv.style.backgroundColor = '#dc3545'; // Red
  } else {
    const percentage = Math.round(result.probability * 100);
    let message = `AI Probability: ${percentage}%`;
    
    if (result.metadataWarning) {
      message += ' (Metadata match)';
    }
    labelDiv.textContent = message;
    
    // Style based on confidence
    if (percentage > 70) {
      labelDiv.style.backgroundColor = '#dc3545'; // Red
      element.classList.add('ai-detected-highlight');
    } else if (percentage > 30) {
      labelDiv.style.backgroundColor = '#fd7e14'; // Orange
    } else {
      labelDiv.style.backgroundColor = '#28a745'; // Green
    }
  }

  // Position label
  labelDiv.style.top = `${window.scrollY + rect.top - 24}px`;
  labelDiv.style.left = `${window.scrollX + rect.left}px`;
  
  document.body.appendChild(labelDiv);

  // Auto-remove after 10 seconds
  setTimeout(() => {
    labelDiv.remove();
    element.classList.remove('ai-detected-highlight');
  }, 10000);
}