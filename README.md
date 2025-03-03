# URL Shortener Pro Frontend

A modern URL shortening service built with Nuxt 3, Vue 3, TypeScript, and TailwindCSS.

## Features

- Shorten long URLs with a click
- Free tier with 30 requests without registration + 30 after registration
- QR code generation for shortened URLs
- Tracking of remaining free requests
- Dark/light mode themes
- Responsive design with glassmorphism UI elements
- TypeScript for type safety

## Tech Stack

- **Framework**: Nuxt.js 3
- **UI Library**: Vue.js 3
- **Type Checking**: TypeScript
- **CSS Framework**: TailwindCSS
- **State Management**: Pinia
- **Build Tool**: Vite

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# yarn
yarn build

# pnpm
pnpm build
```

Locally preview production build:

```bash
# npm
npm run preview

# yarn
yarn preview

# pnpm
pnpm preview
```

## Environment Variables

Create a `.env` file based on the `.env.example` file:

- `API_BASE_URL`: URL of the backend API
- `BASE_URL`: Base URL for the frontend application

## Project Structure

```
url-shortener-pro/
├── assets/               # Static resources (images, fonts)
├── components/           # Vue components
│   ├── common/           # Common components (buttons, inputs)
│   ├── layout/           # Layout components (Header, Footer)
│   └── home/             # Home page components
├── composables/          # Vue composables
├── layouts/              # Page layouts
├── pages/                # Application pages
├── plugins/              # Nuxt plugins
├── public/               # Public files
├── server/               # Server API endpoints
├── stores/               # Pinia stores
├── types/                # TypeScript types
└── utils/                # Utility functions
```

## License

[MIT License](LICENSE)