# Lists App

[![Live Demo](https://img.shields.io/badge/Vercel-Live%20Demo-black?style=for-the-badge&logo=vercel)](https://list-app-beryl-iota.vercel.app)

A collaborative list management app built with **Vue 3**, **TypeScript**, and the **Composition API**. Create lists, add items, and share them with others via invitation links.

---

## Features

- Create, edit, and delete multiple lists
- Add, edit, toggle, and remove list items with descriptions
- Share lists via invitation links with configurable expiration
- Accept invitations and collaborate on shared lists
- Real-time sync with polling (10s intervals)
- Anonymous authentication with JWT
- Toast notifications for user feedback
- Mobile-first responsive design
- Dialog-based interactions
- Empty state handling and 404 page

---

## Tech Stack

| Category      | Technology                          |
|---------------|-------------------------------------|
| Framework     | Vue 3 (Composition API)             |
| Language      | TypeScript                          |
| Build Tool    | Vite                                |
| Routing       | Vue Router                          |
| HTTP Client   | Axios                               |
| Icons         | Remixicon                           |
| Styling       | Custom CSS with design tokens       |
| Linting       | ESLint + Prettier                   |

---

## Getting Started

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env.local` file:

```env
VITE_API_BASE_URL=http://localhost:80/api
VITE_BASE_URL=http://localhost:5173
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Other scripts

```bash
npm run lint       # ESLint with auto-fix
npm run format     # Prettier formatting
npm run preview    # Preview production build
```

---

## Project Structure

```
src/
├── api/                    # API layer
│   ├── client.ts           # Axios instance with auth interceptor
│   └── services/           # Service modules (lists, items, identity, invitations)
├── components/
│   ├── dialogs/            # Modal dialogs (SaveList, SaveListItem, ShareList, etc.)
│   ├── layout/             # Header and Footer
│   ├── lists/              # ListCard and ListItemRow
│   └── ui/                 # FloatingAddButton, LoadingOverlay, SimpleToast
├── composables/            # Shared reactive logic (useLists, useAuth, useNotification)
├── router/                 # Vue Router configuration
├── types/
│   ├── models/             # Domain models (List, ListItem, Identity)
│   └── dtos/               # API response/request types
├── views/                  # Page components (ListsIndex, ListDetail, AcceptInviteView)
├── assets/                 # Global CSS
├── App.vue                 # Root component
└── main.ts                 # Entry point
```

---

## Architecture

**State management** is handled through Vue composables instead of a state library:

- `useLists` — list and item CRUD, local cache + API sync
- `useAuth` — JWT token management, anonymous identity creation
- `useNotification` — toast notification system

**Data flow** follows a layered pattern:

```
API (Raw DTOs) → Services (transform) → Models → Composables → Components
```

**Component design:**

- Views handle routing and page-level orchestration
- Components are presentational (props in, emits out)
- Dialogs expose their API via `defineExpose` (`open()` / `close()`)

---

## Future Ideas

- Animations for list transitions
- Keyboard accessibility improvements
- WebSocket-based real-time updates (replace polling)
- Named/authenticated user accounts

---

## License

This project is for learning and personal use.
