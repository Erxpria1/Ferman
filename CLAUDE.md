# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Osmanlı Yapılacaklar" (Ottoman Todo) is a React Native todo list app with an Ottoman Empire visual theme, built with Expo SDK 54.

## Development Commands

```bash
# Start development server
npx expo start

# Start in tunnel mode (for remote device testing over internet)
npx expo start --tunnel

# Platform-specific
npx expo start --ios
npx expo start --android
npx expo start --web

# Install dependencies
npm install

# Clear cache if needed
rm -rf .expo node_modules
npm install
```

**Note:** Tunnel mode requires `@expo/ngrok` package (already installed).

## Architecture

### Entry Point
- `index.js` → Registers the root component via `registerRootComponent()`
- `App.js` → Main app component with navigation setup and font loading

### Navigation
- Uses `@react-navigation/native-stack` for screen navigation
- Two screens: `Home` (todo list) and `AddTodo` (add new item)
- Custom headers are used (`headerShown: false` in navigator config)

### State Management
- Local component state with `useState`
- Data persistence via `AsyncStorage` (key: `@osmanli_yapilacaklar`)
- Storage utilities in `src/utils/storage.js`

### Styling System
- Centralized color theme in `src/styles/colors.js` (Ottoman-inspired: deep red #8B0000, gold #FFD700)
- Custom fonts: Amiri-Regular and Amiri-Bold (Arabic/Ottamic-style font)
- Background image: `assets/images/ottoman-bg.png`

### Key Components
- `Header.js` - Custom header component used across screens
- `TodoItem.js` - Individual todo item with toggle/delete
- `CustomButton.js` - Reusable button component
- `HomeScreen.js` - Main list view with FlatList
- `AddTodoScreen.js` - Add new todo form

## Project Structure
```
src/
├── components/     # Reusable UI components
├── screens/        # Navigation screens
├── styles/         # Centralized styling (colors, typography, common)
└── utils/          # Storage utilities
```
