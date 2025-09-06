# Farms FIAP App

This repository contains the Farms FIAP mobile application built with Expo and Firebase. The app allows users to manage farm-related data with a seamless offline-first experience, leveraging Firebase services and local emulators for development.

---

## Project Overview

Farms FIAP is a cross-platform mobile app built using Expo and Firebase. It uses Firebase Authentication, Firestore, and Cloud Functions to provide a robust backend. For local development, Firebase emulators are used to simulate backend services, enabling faster iteration and offline testing.

---

## Prerequisites

Before getting started, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) (`npm install -g expo-cli`)
- [Firebase CLI](https://firebase.google.com/docs/cli) (`npm install -g firebase-tools`)
- Java Development Kit (JDK) 11 or newer (for Android builds)
- Android Studio (for Android emulator)
- Xcode (for iOS simulator, macOS only)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-org/farms-fiap.git
cd farms-fiap
```

### 2. Install dependencies for the Expo app

```bash
npm install
```

or

```bash
yarn install
```

### 3. Install dependencies for Firebase Functions

Navigate to the functions directory and install dependencies:

```bash
cd functions
npm install
```

or

```bash
yarn install
```

```bash
npm run build
```

Return to the root directory when done:

```bash
cd ..
```

---

## Firebase Emulators Setup with Seed Data

The project uses Firebase emulators for Authentication, Firestore, and Functions to run locally.

### 1. Start Firebase Emulators

Run the following command from the project root:

```bash
npm run emulators:start
```

### 2. Seeded Test User Credentials

You can use the following test user to log in during development:

- **Email:** teste@fiap.com
- **Password:** 123456!

---

## Running the App

### iOS

1. Start the Firebase emulators as described above.
2. In a new terminal, start the Expo development server:

```bash
npm start
```

or

```bash
yarn start
```

3. Press `i` to open the iOS simulator or scan the QR code with Expo Go on your iOS device.

### Android

1. Start the Firebase emulators.
2. Start the Expo development server.
3. Press `a` to open the Android emulator or scan the QR code with Expo Go on your Android device.

---

## Firebase Configuration Details

### 1. GoogleService Files

- **iOS:** Place `GoogleService-Info.plist` in the `ios/` directory.
- **Android:** Place `google-services.json` in the `android/app/` directory.

These files are required for Firebase SDK initialization on each platform.

### 2. Android Gradle Plugins

Ensure the following plugins are added in your `android/build.gradle`:

```gradle
buildscript {
    dependencies {
        classpath 'com.google.gms:google-services:4.3.15'
        classpath 'com.google.firebase:firebase-crashlytics-gradle:2.9.5'
    }
}
```

And apply the plugins in `android/app/build.gradle`:

```gradle
apply plugin: 'com.google.gms.google-services'
apply plugin: 'com.google.firebase.crashlytics'
```

### 3. Android Keystore

For signing your Android app, configure your keystore as follows:

- Place your keystore file (e.g., `my-release-key.keystore`) in the `android/app/` directory.
- Update `android/gradle.properties` with your keystore credentials:

```properties
MYAPP_UPLOAD_STORE_FILE=my-release-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=your-store-password
MYAPP_UPLOAD_KEY_PASSWORD=your-key-password
```

---

## How the App Connects to Firebase Emulators

The app dynamically detects the environment and connects to the Firebase emulators when running locally. This is configured in the app’s Firebase initialization code:

- Authentication emulator on `localhost:9099`
- Firestore emulator on `localhost:8080`
- Functions emulator on `localhost:5001`

When running in production, the app connects to the live Firebase services.

---

## Troubleshooting

- **Emulator connection issues:** Ensure the Firebase emulators are running before starting the app.
- **Port conflicts:** Confirm ports 9099, 8080, and 5001 are free.
- **Android build errors:** Verify JDK version and Android Studio installation.
- **iOS build errors:** Ensure Xcode command line tools are installed and updated.
- **Expo issues:** Clear cache with `expo start -c`.

---

## Project Folder Structure

```
/app                # Expo app source code
/functions          # Firebase Cloud Functions source code
/seed               # Firebase emulator seed data
/android            # Android native project files
/ios                # iOS native project files
.gitignore          # Git ignore rules
package.json        # App dependencies and scripts
firebase.json       # Firebase emulator configuration
README.md           # This documentation
```
