# AI Content Detector Chrome Extension

A browser extension that identifies AI-generated images and text directly on webpages. It uses multiple detection techniques and cross-checks results using industry-standard APIs.

## Features

- **Text Detection**: Uses GPTZero and Copyleaks APIs to analyze selected text for AI patterns.
- **Image Detection**: 
  - **Metadata Heuristics**: Checks image headers for common AI generator signatures (e.g., Midjourney, DALL-E).
  - **API Scanning**: Integrates with Hive Moderation to identify synthetic visuals.
- **In-Page Labels**: Uses "Inspect Element" style overlays to visually badge detected content without leaving the page.
- **Secure Configuration**: Stores your API keys safely in Chrome's local storage.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/the32bitpringle/ai-detector-extension.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top right.
4. Click **Load unpacked** and select the extension folder.

## Setup

1. Click the extension icon in your toolbar to open the settings popup.
2. Enter your API keys for:
   - [GPTZero](https://gptzero.me/)
   - [Copyleaks](https://copyleaks.com/ai-content-detector)
   - [Hive Moderation](https://thehive.ai/)
3. Click **Save Settings**.

## Usage

- **For Text**: Highlight a block of text, right-click, and select **"Scan selected text for AI"**.
- **For Images**: Right-click any image and select **"Scan image for AI"**.

The extension will overlay a label indicating the probability of AI generation and highlight the element if it exceeds a high-confidence threshold.

## Project Structure

- `manifest.json`: Extension configuration (Manifest V3).
- `background.js`: Service worker for API requests and context menu management.
- `content.js`: Handles DOM manipulation and result labeling.
- `content.css`: Styles for the in-page badges and highlights.
- `popup.html/js`: Settings interface for API key management.
