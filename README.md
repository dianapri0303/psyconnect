# PsyConnect

PsyConnect is a Next.js web application for finding licensed psychologists online, saving favorite specialists, and booking sessions with them.

**Live demo:** https://psyconnect-ecyz5l7gb-dianapri0303s-projects.vercel.app/

## About the project

PsyConnect solves a simple problem: finding the right therapist shouldn't be hard. The app lets users:

- browse a catalog of verified psychologists with filters (specialization, therapeutic approach, price) and infinite-scroll pagination;
- sign up / log in and save specialists to a personal favorites list;
- book a session with a chosen psychologist through a validated booking form;
- access protected pages (Favorites) only when authenticated, with the rest of the app publicly available.

The interface is built for desktop use (reference width — 1440px, minimum supported width — 1024px), matching the provided Figma design.

## Technologies

- Next.js 15 (App Router, Server & Client Components)
- React 19 + TypeScript
- CSS Modules + modern-normalize
- Zustand (auth, favorites, modal and booking state)
- TanStack Query (`useInfiniteQuery` for catalog pagination)
- Formik + Yup (form state and validation)
- Axios (API requests, cookie-based session)
- react-hot-toast (error and status notifications)

## Design & API

- Figma mockup: https://www.figma.com/design/RYmB7bJkCgFP2gTskhQMSg/PsyConnect?node-id=12-2421&t=ojno95zlUnpKDopu-0
- API documentation (Swagger): https://psy-connect.b.goit.study/api-docs

## Getting started

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Create an environment file:

   ```bash
   cp .env.example .env.local
   ```

3. Fill in the required environment variables in `.env.local`:

   ```
   NEXT_PUBLIC_API_URL=https://psy-connect.b.goit.study
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Check code with ESLint |
| `npm run format` | Format the codebase with Prettier |
