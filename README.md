# 📋 Lists App

[![Live Demo](https://img.shields.io/badge/Vercel-Live%20Demo-black?style=for-the-badge&logo=vercel)](https://list-app-beryl-iota.vercel.app)

A simple and clean list management app built with **Vue 3**, **TypeScript**, and the **Composition API**.

The goal of this project is to practice:
- Component-based architecture
- State management via composables
- Clean UX for list and item handling
- Vue Router navigation patterns

---

## ✨ Features

- Create multiple lists
- Add, toggle and remove items
- Persistence: Data is saved locally using LocalStorage
- Switch between lists
- Empty states handling
- Mobile-first UI
- Dialog-based interactions
- Not Found route handling

---

## 🧱 Tech Stack

- **Vue 3**
- **TypeScript**
- **Vue Router**
- **Composition API**
- **Vite**

## 🚀 Getting Started

### Install dependencies
```bash
npm install
````

### Run development server

```bash
npm run dev
```

---

## 🧠 Architectural Notes

* Global state is handled via a **composable (`useLists`)**
* Views are responsible for:

  * Routing
  * Fetching data from composables
* Components are:

  * Dumb / presentational
  * Communicate via props and emits
* Dialogs expose their API using `defineExpose`

---

## 📌 Future Ideas

* Persist data (API)
* Backend Integration: Plan to implement a Laravel API to enable list sharing via public hash links (Magic Links)
* Edit list items
* Animations for list changes
* Keyboard accessibility improvements

---

## 📄 License

This project is for learning and personal use.
