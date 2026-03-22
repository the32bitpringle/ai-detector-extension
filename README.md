# AI Content Detector Chrome Extension (v2.0)

An advanced browser extension that automatically identifies AI-generated text, images, and videos directly on any webpage. It uses a comprehensive ensemble of detection APIs and real-time scanning to provide instant authenticity verification.

## New Features

- **Multimodal Detection**: Now supports **Text, Image, and Video** (Deepfake) detection.
- **Auto-Scan Feature**: Automatically scans every website on load. No more manual right-clicking (though still available).
- **Persistent AI Tags**: Subtle, color-coded tags are attached to elements to indicate AI probability at a glance.
- **Expanded API Support**: 
  - **Text**: GPTZero, Copyleaks, Winston AI, Originality.AI, Pangram Labs.
  - **Image**: Hive Moderation, Sensity AI, Reality Defender, Winston AI (OCR).
  - **Video**: Deepware, Truthscan, Reality Defender.
- **Improved UI**: Categorized settings and enhanced visual highlights for high-confidence AI content.

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
2. Enter your API keys for the desired detection services.
3. Click **Save Settings**. The extension will now automatically scan pages using these keys.

## Usage

- **Auto-Scan**: Simply visit any website. The extension will scan text blocks, images, and videos after the page settles (approx. 2 seconds).
- **Manual Scan**: 
  - **For Text**: Highlight a block of text, right-click, and select **"Scan selected text for AI"**.
  - **For Images**: Right-click any image and select **"Scan image for AI"**.
  - **For Videos**: Right-click any video and select **"Scan video for AI"**.

### AI Tags & Highlights
- **Red Tag / Highlight**: High probability (>75%) of AI generation.
- **Orange Tag**: Medium probability (40-75%).
- **Green Tag**: Low probability (<40%).

## Project Structure

- `manifest.json`: Extension configuration (Manifest V3).
- `background.js`: Service worker for ensemble API requests and context menu management.
- `content.js`: Handles auto-scanning, DOM manipulation, and persistent AI tagging.
- `content.css`: Styles for the new AI Tags and element highlights.
- `popup.html/js`: Categorized settings interface for managing multiple API keys.

## Supported APIs

| Type | Providers |
| :--- | :--- |
| **Text** | GPTZero, Copyleaks, Winston AI, Originality.AI, Pangram Labs |
| **Image** | Hive Moderation, Sensity AI, Reality Defender |
| **Video** | Deepware, Truthscan, Reality Defender |
