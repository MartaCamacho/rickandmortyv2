# Rick & Morty Mobile App  
A React Native app built with **Ignite by Infinite Red**

## 📱 Overview
This project is a mobile application built using **React Native**, starting from the **Ignite** template by Infinite Red.  
The app consumes data from the public **Rick and Morty API** and provides a simple, clean interface to browse episodes and view their details.

## 🚀 Features
- **Built with Ignite**: Uses the official Ignite boilerplate for a robust and scalable project structure.  
- **TanStack Query Integration**: Added manually to handle API requests, caching, and background updates efficiently.  
- **Episode List Page**: Displays all episodes retrieved from the Rick and Morty API.  
- **Episode Details Page**: Shows detailed information for a selected episode.

## 🔌 Tech Stack
- **React Native**
- **Ignite CLI (Infinite Red)**
- **TypeScript**
- **TanStack Query**
- **Rick and Morty API** → https://rickandmortyapi.com

## 🗂️ Screens
### Episode List
Fetches and renders all episodes, including basic episode information.

### Episode Details
Displays more detailed data for a specific episode, fetched dynamically using TanStack Query.

# Getting Started
- npm install --legacy-peer-deps
- npx expo start
- To make things work on your local simulator, or on your phone, you need first to run eas build. There are many shortcuts on package.json to make it easier:

- npm run build:ios:sim # build for ios simulator
- npm run build:ios:device # build for ios device
- npm run build:ios:prod # build for ios device

Follow the official [EAS setup guide](https://docs.expo.dev/build/setup/)  if you need it 