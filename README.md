# 📱 React Native Test (Mecenate / feeds) App

This project is a mobile application built with **React Native (Expo)**, **TypeScript**, **React Query**, and **MobX**.
It consumes a test API and demonstrates handling of loading, error, and empty states, along with optimistic updates and modern UI patterns.

---

# Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/Bobstyle23/feeds
cd feeds
```

---

## 2. Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

## 3. Start the development server

```bash
npx expo start
```

---

## Running the app

### Option 1 — iOS Simulator (Mac only)

```bash
i
```

---

### Option 2 — Android Emulator

- Open Android Studio
- Start an emulator from **Device Manager**
- Then run:

```bash
a
```

---

### Option 3 — Physical Device

- Install **Expo Go** on your phone
- Scan the QR code from terminal
- NOTE: I have used latest expo sdk v55. Expo Go on mobile supports 54 only for now

---

# Testing Error States

The API supports a special query parameter:

```txt
simulate_error=true (Default is false, to trigger error change it to true)
```

This forces the backend to return a **500 error**.

---

## Example usage

Inside usePosts API call:

```ts
getPosts({
  limit: 10,
  simulateError: true,
});
```

---

## Recommended testing scenarios

- Initial load error (full screen error)
- Empty state (no posts)
- Optimistic updates (like button)

---

# Tech Stack

- **React Native (Expo)**
- **TypeScript**
- **React Query** — server state management
- **MobX** — client/UI state

---

# Features Implemented

- Infinite scrolling posts feed
- Optimistic like/unlike updates
- Pull-to-refresh
- Paid content with blur overlay
- Full error handling

---

# 👨‍💻 Author

MukhammadBobur Pakhriev
