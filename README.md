# Songs by Mood

[![React Native](https://img.shields.io/badge/React%20Native-0.64.3-blue?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-44-black?logo=expo)](https://expo.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-lightgrey)]()

A React Native mobile application that detects your mood from a photo and plays music to match how you feel. Snap a selfie or pick an image from your gallery -- the app analyzes your facial expression, determines your emotion, and queues up a curated playlist.

## Features

- **Facial Emotion Detection** -- Take a photo with your camera or select one from your gallery to detect your current mood.
- **Mood-Based Playlists** -- Curated song collections for four mood categories: Happy, Sad, Neutral, and Angry.
- **Music Playback Controls** -- Play, stop, and skip to the next song directly within the app.
- **Cross-Platform** -- Runs on iOS, Android, and Web via Expo.
- **Real-Time Feedback** -- Displays your detected mood with expressive messages and matching artwork.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [React Native](https://reactnative.dev/) 0.64 |
| Toolchain | [Expo](https://expo.dev/) SDK 44 |
| Navigation | [React Navigation](https://reactnavigation.org/) 6 (Native Stack) |
| UI Components | [React Native Paper](https://callstack.github.io/react-native-paper/) |
| HTTP Client | [Axios](https://axios-http.com/) |
| Audio | [Expo AV](https://docs.expo.dev/versions/latest/sdk/av/) |
| Camera | [Expo Camera](https://docs.expo.dev/versions/latest/sdk/camera/) |
| Image Processing | [Expo Image Manipulator](https://docs.expo.dev/versions/latest/sdk/imagemanipulator/) |
| Emotion API | External REST API (image-to-emotion) |

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- A physical device or emulator (iOS Simulator / Android Emulator)

### Setup

```bash
# Clone the repository
git clone https://github.com/yakubilik/songs-by-mood.git
cd songs-by-mood

# Install dependencies
npm install

# Start the development server
expo start
```

Then scan the QR code with the Expo Go app on your device, or press `a` for Android emulator / `i` for iOS simulator.

## Usage

1. **Home Screen** -- View your current mood and the currently playing song. Use the playback controls to play, stop, or skip tracks.
2. **Find By Mood** -- Tap "Find By Mood" to open the camera screen. Take a selfie or choose an image from your gallery.
3. **Mood Detection** -- The app sends your photo to the emotion detection API and navigates back to the Home screen with your detected mood and a matching song playing automatically.

## Project Structure

```
songs-by-mood/
├── App.js                # Root component with navigation stack
├── data.js               # Mood-to-song mapping and asset references
├── screens/
│   ├── Home.js           # Main screen with mood display and music controls
│   ├── Find.js           # Camera and gallery screen for mood detection
│   ├── Loading.js        # Loading spinner component
│   └── Photo.js          # Photo permissions helper (Android)
├── assets/
│   ├── images/           # Mood artwork (monkey emojis per mood)
│   └── musics/           # Audio files for each mood category
├── app.json              # Expo configuration
├── babel.config.js       # Babel configuration
└── package.json          # Project dependencies and scripts
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` / `expo start` | Start the Expo development server |
| `expo start --android` | Start on Android emulator |
| `expo start --ios` | Start on iOS simulator |
| `expo start --web` | Start in the web browser |

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
