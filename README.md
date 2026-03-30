# React Native Healthcare App

> Cross-platform iOS & Android healthcare app — Firebase Remote Config, A11y compliance, modular SDK architecture, and Redux Toolkit state management.

![React Native](https://img.shields.io/badge/React_Native-0.73-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-007ACC?style=flat-square&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-10-FFCA28?style=flat-square&logo=firebase)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=flat-square&logo=redux)

## Overview

A production-ready **cross-platform healthcare mobile application** targeting iOS and Android. Built with a modular SDK architecture that enables shared functionality across multiple healthcare applications without code duplication.

## Features

- **Firebase Remote Config** — real-time app behavior changes without requiring app store updates
- **Accessibility (A11y)** — full screen-reader support, WCAG 2.1 AA compliance
- **Modular SDK Architecture** — shared modules usable across multiple healthcare apps
- **Redux Toolkit** — predictable state management with async thunks
- **TypeScript** — end-to-end type safety across screens, components, and API calls
- **Jest Test Suite** — unit and integration tests with >80% coverage
- **Offline Support** — graceful degradation when network is unavailable

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React Native 0.73, TypeScript |
| State | Redux Toolkit, Redux Thunk |
| Backend | Firebase (Auth, Firestore, Remote Config) |
| Build | Webpack, Babel |
| Testing | Jest, SonarQube |
| Quality | ESLint, Prettier |

## Project Structure

```
src/
├── screens/
│   ├── HomeScreen.tsx
│   └── PatientDetailScreen.tsx
├── components/
│   └── PatientCard.tsx
├── store/
│   ├── index.ts
│   └── slices/
│       └── patientSlice.ts
├── services/
│   └── firebaseConfig.ts
├── hooks/
│   └── useFirebaseConfig.ts
└── types/
    └── patient.ts
```

## Getting Started

```bash
# Install dependencies
npm install

# iOS
npx pod-install
npx react-native run-ios

# Android
npx react-native run-android

# Run tests
npm test
```

## License

MIT © [Rahul Karnavathula](https://github.com/rahulkannavathula)
