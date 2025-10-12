# AI-DEX Project Documentation

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Architecture](#architecture)
- [Key Features](#key-features)
- [Coding Standards and Rules](#coding-standards-and-rules)
- [API Integration](#api-integration)
- [Routing System](#routing-system)
- [State Management](#state-management)
- [Authentication Flow](#authentication-flow)
- [Component Guidelines](#component-guidelines)
- [Scripts](#scripts)
- [Environment Requirements](#environment-requirements)

---

## Project Overview

AI-DEX is a Monster Management application built with React and TypeScript. It allows users to browse, create, and manage monsters with various types and rarities. The application features authentication, profile management, and a comprehensive monster catalog.

**Version:** 0.0.0
**Node Engine:** 20

---

## Tech Stack

### Core Technologies

- **React 19.1.1** - UI library
- **TypeScript 5.8.3** - Type-safe JavaScript
- **Vite 7.1.0** - Build tool and dev server

### Routing & Navigation

- **TanStack Router 1.131.2** - Type-safe routing with file-based routing
- **TanStack Router Devtools** - Development tools for debugging routes
- **TanStack Router Plugin** - Vite plugin for automatic route generation

### State Management & Data Fetching

- **TanStack Query 5.84.2** - Powerful async state management
- **TanStack Query Devtools** - Development tools for debugging queries
- **Axios 1.11.0** - HTTP client for API requests
- **qs 6.14.0** - Query string parsing and stringification

### Form Management

- **React Hook Form 7.62.0** - Performant form library
- **@hookform/resolvers 5.2.1** - Validation resolvers
- **Zod 4.1.5** - Schema validation

### Styling

- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **@tailwindcss/vite 4.1.13** - Vite integration for Tailwind

### UI Components & Icons

- **Lucide React 0.544.0** - Icon library
- **React Toastify 11.0.5** - Toast notifications

### Build Tools & Development

- **SWC** - Fast JavaScript/TypeScript compiler
- **vite-plugin-svgr 4.3.0** - SVG import as React components
- **ESLint 9.32.0** - Linting tool
- **TypeScript ESLint 8.39.0** - TypeScript linting rules

---

## Project Structure

```
ai-dex/
├── src/
│   ├── @types/              # TypeScript type definitions
│   │   └── monster.d.ts     # Monster types
│   ├── api/                 # API layer
│   │   ├── axios/           # Axios configuration
│   │   │   └── api.ts       # Base API instance
│   │   ├── mutations/       # React Query mutations
│   │   │   ├── useAuthenticate.ts
│   │   │   ├── useCreateMonster.ts
│   │   │   ├── useLogoutUser.ts
│   │   │   └── useRegisterUser.ts
│   │   ├── queries/         # React Query queries
│   │   │   ├── queryFactory/
│   │   │   │   └── makeMonstersQuery.ts
│   │   │   ├── monsters/
│   │   │   │   ├── useFetchAllMonsters.ts
│   │   │   │   ├── useFetchMonsterById.ts
│   │   │   │   └── useFetchUserMonsters.ts
│   │   │   └── users/
│   │   │       └── useFetchUser.ts
│   │   ├── autenticate.ts
│   │   ├── createMonster.ts
│   │   ├── fetchAllMonsters.ts
│   │   ├── fetchMonsterById.ts
│   │   ├── fetchUser.ts
│   │   ├── logoutUser.ts
│   │   ├── refreshToken.ts
│   │   └── registerUser.ts
│   ├── components/          # Reusable UI components
│   │   ├── Avatar/
│   │   ├── CardMonster/
│   │   ├── Header/
│   │   ├── LabelType/
│   │   ├── Pagination/
│   │   ├── RarityBadge/
│   │   ├── RarityIndicator/
│   │   └── RarityShowcase/
│   ├── constants/           # Application constants
│   │   └── monsterTypes.ts
│   ├── context/             # React Context providers
│   │   └── authenticate.tsx # Authentication context
│   ├── hooks/               # Custom React hooks
│   │   └── useDebounce.ts
│   ├── pages/               # Page components
│   │   ├── createMonster/
│   │   ├── home/
│   │   ├── login/
│   │   ├── monsterDetails/
│   │   ├── notFound/
│   │   ├── profile/
│   │   └── register/
│   ├── routes/              # TanStack Router routes
│   │   ├── _authenticated/  # Protected routes
│   │   │   └── create-monster.tsx
│   │   ├── _authenticated.tsx
│   │   ├── _public.tsx
│   │   ├── _public.login.tsx
│   │   ├── _public.register.tsx
│   │   ├── __root.tsx       # Root route with layout
│   │   ├── index.tsx
│   │   └── profile.tsx
│   ├── styles/              # Global styles
│   │   └── global.css
│   ├── utils/               # Utility functions
│   │   ├── errors/
│   │   │   └── handleApiError.ts
│   │   └── rarity.ts
│   ├── App.tsx              # App component with providers
│   ├── main.tsx             # Application entry point
│   ├── routeTree.gen.ts     # Auto-generated route tree
│   └── vite-env.d.ts        # Vite environment types
├── eslint.config.js         # ESLint configuration
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript root config
├── tsconfig.app.json        # TypeScript app config
├── tsconfig.node.json       # TypeScript node config
├── vite.config.ts           # Vite configuration
└── README.md                # Project readme
```

---

## Development Setup

### Prerequisites

- Node.js version 20
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ai-dex

# Install dependencies
npm install
```

### Running the Application

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

The application will run on `http://localhost:5173` (default Vite port) and connects to the backend API at `http://localhost:5555`.

---

## Architecture

### Design Patterns

1. **File-Based Routing** - Routes are automatically generated from the `src/routes/` directory structure
2. **API Layer Separation** - Clear separation between API functions and React Query hooks
3. **Component-Based Architecture** - Reusable, composable UI components
4. **Context API for Global State** - Authentication state managed via React Context
5. **Server State Management** - TanStack Query handles all server state caching and synchronization

### Key Architectural Decisions

- **SWC for Fast Refresh** - Using `@vitejs/plugin-react-swc` for faster development experience
- **Type Safety First** - Comprehensive TypeScript usage throughout the application
- **Centralized Error Handling** - Global error handlers in QueryClient and API interceptors
- **Protected Routes** - Layout-based route protection using `_authenticated` prefix
- **Token-Based Authentication** - JWT tokens with automatic refresh mechanism

---

## Key Features

### Authentication System

- User registration and login
- JWT token-based authentication
- Automatic token refresh on 401 errors
- Logout functionality
- Protected routes requiring authentication

### Monster Management

- Browse all monsters with pagination
- View monster details
- Create new monsters (authenticated users only)
- View user-specific monsters
- Monster type and rarity systems

### User Profile

- View user information
- Display user's monsters
- Profile management

### UI/UX Features

- Toast notifications for user feedback
- Loading states and suspense boundaries
- Responsive design with Tailwind CSS
- Error boundaries for graceful error handling
- Development tools (React Query Devtools, Router Devtools)

---

## Coding Standards and Rules

### TypeScript Standards

1. **Strict Mode** - Always use TypeScript strict mode
2. **Explicit Types** - Define explicit types for function parameters and return values
3. **Type Definitions** - Place shared types in `src/@types/` directory
4. **Avoid `any`** - Use specific types or `unknown` instead of `any`

### React Standards

1. **Functional Components** - Use functional components with hooks
2. **Component Naming** - PascalCase for component names
3. **File Organization** - One component per file, index.tsx for component exports
4. **Props Interfaces** - Define props interfaces with descriptive names ending in `Props` or `Params`

### Naming Conventions

- **Files**: camelCase for utilities, PascalCase for components
- **Components**: PascalCase (e.g., `CardMonster`, `RarityBadge`)
- **Hooks**: Start with `use` prefix (e.g., `useDebounce`, `useFetchUser`)
- **Mutations**: Prefix with `use` and indicate action (e.g., `useCreateMonster`)
- **Queries**: Prefix with `use` and `Fetch` (e.g., `useFetchAllMonsters`)
- **Constants**: UPPER_SNAKE_CASE for true constants
- **Types**: PascalCase with descriptive names

### Code Organization Rules

1. **Import Order**:
   - External libraries
   - Internal modules (API, hooks, utils)
   - Components
   - Types
   - Styles

2. **API Layer Structure**:
   - Raw API functions in `src/api/`
   - React Query hooks in `src/api/queries/` or `src/api/mutations/`
   - Separate queries and mutations

3. **Component Structure**:
   - Each component in its own directory
   - Index file exports the component
   - Co-locate component-specific types and utilities

### ESLint Configuration

The project uses:

- `@eslint/js` recommended rules
- TypeScript ESLint recommended rules
- React Hooks rules (recommended-latest)
- React Refresh rules for Vite

### Best Practices

1. **Error Handling**:
   - Use try-catch in async functions
   - Provide user feedback via toast notifications
   - Handle API errors gracefully with `handleApiError` utility

2. **State Management**:
   - Use TanStack Query for server state
   - Use React Context sparingly (authentication only)
   - Keep local state close to where it's used

3. **Performance**:
   - Lazy load routes when possible
   - Use React Suspense for async components
   - Implement debouncing for search inputs
   - Configure appropriate staleTime for queries

4. **Security**:
   - Never commit sensitive data
   - Use httpOnly cookies for refresh tokens
   - Validate all user inputs with Zod schemas
   - Sanitize data before rendering

5. **Testing**:
   - Write unit tests for utilities
   - Test custom hooks
   - Test API error scenarios

---

## API Integration

### Base Configuration

```typescript
// src/api/axios/api.ts
baseURL: 'http://localhost:5555/';
withCredentials: true;
```

### Authentication Interceptors

1. **Request Interceptor** - Automatically adds Bearer token to requests
2. **Response Interceptor** - Handles 401 errors and refreshes tokens automatically

### API Endpoints

The application integrates with the following API endpoints:

- **Authentication**:
  - `POST /auth/login` - User login
  - `POST /auth/register` - User registration
  - `POST /auth/refresh` - Token refresh
  - `POST /auth/logout` - User logout

- **Users**:
  - `GET /users/profile` - Fetch user profile

- **Monsters**:
  - `GET /monsters` - Fetch all monsters (with pagination/filters)
  - `GET /monsters/:id` - Fetch specific monster
  - `GET /monsters/user` - Fetch user's monsters
  - `POST /monsters` - Create new monster

### React Query Configuration

```typescript
defaultOptions: {
  queries: {
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    throwOnError: (error, query) => typeof query.state.data === 'undefined'
  }
}
```

---

## Routing System

### Route Patterns

The application uses TanStack Router with file-based routing:

- **Public Routes** (`_public` prefix):
  - `/login` - Login page
  - `/register` - Registration page

- **Authenticated Routes** (`_authenticated` prefix):
  - `/create-monster` - Create new monster (requires auth)
  - `/profile` - User profile (requires auth)

- **Hybrid Routes**:
  - `/` - Home page (accessible to all)
  - `/monster/:id` - Monster details (accessible to all)

### Route Protection

Routes prefixed with `_authenticated` automatically redirect unauthenticated users to `/login`.

### Route Generation

Routes are automatically generated by `@tanstack/router-plugin` and output to `src/routeTree.gen.ts`.

---

## State Management

### Server State (TanStack Query)

- All API data is managed by React Query
- Automatic caching and background refetching
- Optimistic updates for mutations
- Global error handling via QueryCache

### Global State (React Context)

**AuthenticateContext** provides:

- `token`: Current JWT token
- `setToken`: Update token
- `isAuthenticate`: Boolean auth status
- `logout`: Logout function
- `user`: Current user data

### Local State

- Component-specific state using `useState`
- Form state managed by React Hook Form
- URL state managed by TanStack Router

---

## Authentication Flow

1. **Initial Load**:
   - App attempts to refresh token on mount
   - If successful, user is authenticated
   - If failed, user remains logged out

2. **Login**:
   - User submits credentials
   - Backend returns JWT token
   - Token stored in context
   - User redirected to home page

3. **Token Refresh**:
   - On 401 response, interceptor triggers token refresh
   - New token updated in context
   - Original request retried with new token
   - If refresh fails, user logged out

4. **Logout**:
   - Call logout API
   - Clear token from context
   - Redirect to home page

---

## Component Guidelines

### Component Structure

```typescript
// Type definitions
interface ComponentProps {
  // props
}

// Component
export function Component({ prop }: ComponentProps) {
  // hooks
  // handlers
  // render
}
```

### Reusable Components

- **Avatar** - User avatar display
- **CardMonster** - Monster card with image, type, and rarity
- **Header** - Navigation header with auth state
- **LabelType** - Monster type label with styling
- **Pagination** - Page navigation controls
- **RarityBadge** - Visual rarity indicator
- **RarityIndicator** - Rarity level display
- **RarityShowcase** - Detailed rarity information

### Page Components

Each page component:

- Located in `src/pages/`
- Connected to a route in `src/routes/`
- Handles data fetching via React Query
- Manages page-specific state and logic

---

## Scripts

```json
{
  "dev": "vite", // Start development server
  "build": "tsc -b && vite build", // Type check and build
  "lint": "eslint .", // Run linter
  "preview": "vite preview" // Preview production build
}
```

---

## Environment Requirements

### Required Environment Variables

The application expects a backend API running at `http://localhost:5555`. For production or different environments, update the `baseURL` in `src/api/axios/api.ts`.

### Browser Support

Modern browsers supporting ES2020+ features.

### Development Tools

- **React Query Devtools** - Available in development mode
- **TanStack Router Devtools** - Available in development mode
- **TypeScript** - Type checking during development

---

## Additional Notes

### Monster Types

Available monster types (defined in `src/@types/monster.d.ts`):

- NORMAL, FIRE, WATER, ELECTRIC, GRASS, ICE, FIGHTING, POISON, GROUND
- FLYING, PSYCHIC, BUG, ROCK, GHOST, DRAGON, DARK, STEEL, FAIRY

### Future Improvements

Consider implementing:

- Environment variables for API configuration
- Unit and integration tests
- CI/CD pipeline
- Docker containerization
- Internationalization (i18n)
- Dark mode support
- Progressive Web App (PWA) features

---

## Troubleshooting

### Common Issues

1. **Port already in use**: Change port in `vite.config.ts` or kill process using port 5173
2. **API connection failed**: Ensure backend is running on port 5555
3. **Type errors**: Run `tsc -b` to check TypeScript compilation
4. **Route not found**: Check that `routeTree.gen.ts` is up to date (regenerated on dev server start)

---

## Contributing

1. Follow the coding standards outlined in this document
2. Write meaningful commit messages
3. Test your changes thoroughly
4. Update documentation for new features
5. Use TypeScript strictly
6. Handle errors gracefully with user feedback

---

**Last Updated:** 2025-10-10
