# PsyConnect

PsyConnect is a Next.js application for finding psychologists online, saving favorite specialists, and booking sessions.

## About the project

The project helps users:

- browse verified psychologists with filters and pagination;
- save specialists to favorites after authentication;
- book a session with a selected psychologist;
- manage authentication state and protected pages.

## Technologies

- Next.js 15 (App Router)
- React 19
- TypeScript
- CSS Modules
- Zustand
- TanStack Query
- Formik + Yup
- Axios
- react-hot-toast

## Design and requirements

- Figma mockup: https://www.figma.com/design/RYmB7bJkCgFP2gTskhQMSg/PsyConnect?node-id=12-2421&t=ojno95zlUnpKDopu-0
- API documentation: https://psy-connect.b.goit.study/api-docs

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Create an environment file:

```bash
cp .env.example .env.local
```

3. Fill in the required environment variables in `.env.local`.

4. Start the development server:

```bash
npm run dev
```

5. Open `http://localhost:3000` in your browser.

## Available scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
```
