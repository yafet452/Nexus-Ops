# Nexus-Ops

Internal Staff Dashboard for tour operator company. Built with Vite, vanilla JS, and a modern glassmorphism UI.

## Features
- **Role-Based Access**: Admin (Operations) and Staff (Tour Leaders) views
- **Tour Management**: View assigned tours with status tracking
- **Availability Management**: Staff can block out unavailable dates
- **Auto-Assigner**: Admin-only automated tour assignment engine
- **Communications**: Internal messaging system with channels
- **Real-Time Updates**: Live activity feed

## Tech Stack
- Frontend: Vite + Vanilla JS + CSS (Glassmorphism)
- Backend: Node.js + Express (planned)
- Database: Supabase (planned)
- Icons: Phosphor Icons
- Font: Outfit (Google Fonts)

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 and sign in with:
- **Admin**: `admin@nexus.com` / any password
- **Staff**: `staff@nexus.com` / any password
