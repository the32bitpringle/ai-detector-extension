let lastRightClickedElement = null;
const autoScannedElements = new Map();

// Track the element the user right-clicked on
document.addEventListener('contextmenu', (event) => {
  lastRightClickedElement = event.target;
}, true);

// Auto-scan feature
window.addEventListener('load', () => {
  setTimeout(() => {
    const images = document.querySelectorAll('img');
    const texts = document.querySelectorAll('p, h1, h2, h3, article, section');
    const videos = document.querySelectorAll('video, iframe[src*="youtube"], iframe[src*="vimeo"]');

    images.forEach((img, index) => {
      if (img.src && img.width > 100 && img.height > 100) {
        const id = `img-${index}`;
        autoScannedElements.set(id, img);
        chrome.runtime.sendMessage({ action: "auto-scan-image", srcUrl: img.src, elementId: id });
      }
    });

    texts.forEach((text, index) => {
      const content = text.innerText.trim();
      if (content.length > 100) {
        const id = `text-${index}`;
        autoScannedElements.set(id, text);
        chrome.runtime.sendMessage({ action: "auto-scan-text", text: content, elementId: id });
      }
    });

    videos.forEach((video, index) => {
      const id = `video-${index}`;
      autoScannedElements.set(id, video);
      const src = video.src || video.getAttribute('src');
      if (src) {
        chrome.runtime.sendMessage({ action: "auto-scan-video", srcUrl: src, elementId: id });
      }
    });
  }, 2000); // Wait for page to settle
});

// Listen for messages from background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'start-text-scan' || request.action === 'start-image-scan' || request.action === 'start-video-scan') {
    if (lastRightClickedElement) {
      showLoadingLabel(lastRightClickedElement);
    }
  } else if (request.action === 'scan-result') {
    let target = lastRightClickedElement;
    if (request.elementId && autoScannedElements.has(request.elementId)) {
      target = autoScannedElements.get(request.elementId);
    }

    if (target) {
      removeLoadingLabel(target);
      showResultLabel(target, request.result, request.type);
    }
  }
});

function showLoadingLabel(element) {
  const rect = element.getBoundingClientRect();
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'ai-detector-loading';
  loadingDiv.textContent = 'Scanning...';
  
  loadingDiv.style.top = `${window.scrollY + rect.top - 20}px`;
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

function showResultLabel(element, result, type) {
  // Remove existing label if any
  if (element._aiLabelDiv) {
    element._aiLabelDiv.remove();
  }

  const rect = element.getBoundingClientRect();
  if (rect.width === 0) return; // Hidden element

  const labelDiv = document.createElement('div');
  labelDiv.className = `ai-detector-label ai-tag-${type}`;
  
  if (result.error) {
    labelDiv.textContent = `!`;
    labelDiv.title = `Error: ${result.error}`;
    labelDiv.style.backgroundColor = '#6c757d';
  } else {
    const percentage = Math.round(result.probability * 100);
    labelDiv.textContent = `${type.toUpperCase()}: ${percentage}%`;
    labelDiv.title = `Source: ${result.source}`;
    
    if (percentage > 75) {
      labelDiv.classList.add('ai-tag-high');
      element.classList.add('ai-detected-highlight');
    } else if (percentage > 40) {
      labelDiv.classList.add('ai-tag-medium');
    } else {
      labelDiv.classList.add('ai-tag-low');
    }
  }

  // Positioning: bottom right of the element
  labelDiv.style.top = `${window.scrollY + rect.top + 5}px`;
  labelDiv.style.left = `${window.scrollX + rect.left + 5}px`;
  
  document.body.appendChild(labelDiv);
  element._aiLabelDiv = labelDiv;

  // Add observer to keep label positioned if element moves or window resizes
  const updatePosition = () => {
    const newRect = element.getBoundingClientRect();
    labelDiv.style.top = `${window.scrollY + newRect.top + 5}px`;
    labelDiv.style.left = `${window.scrollX + newRect.left + 5}px`;
  };
  window.addEventListener('scroll', updatePosition);
  window.addEventListener('resize', updatePosition);
}