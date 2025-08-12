# Language Power Monorepo

**Language Power** is a modern, open-source vocabulary‑building app, built as a TypeScript monorepo.
I created it to make vocabulary learning faster, richer, and more memorable:

- I wanted an effortless way to add words from a dictionary I love and trust — instead of typing them manually every time.
- I needed to practise spelling so the words truly stick.
- I wanted audio for every word to improve pronunciation.
- I learn best in context, so I made it possible to add my own examples, quotes from books or movies, and translations.
- I wanted the option to attach my own audio or images to each word for better recall.

Today, Language Power combines those features into one workflow: add a word, enrich it with context and media, and practise it through fun, interactive games.

## Project Highlights

- **Unified mono-repo** for backend, frontend, and design system, enabling fast, consistent development.
- **Reusable UI**: All UI logic and styles are shared as `@lp/ui`, backed by a customized design system and Storybook documentation.
- **Full-stack TypeScript**+**GraphQL**: Type-safe, scalable architecture from database to UI, with automatic codegen for queries and types.
- **Apollo Client & Server**: Efficient GQL data-fetching on the front, scalable API on the back.
- **Testing-first**: Includes automated unit/integration tests (Jest, Cypress), stylelint/eslint for code quality.
- **Docker & Volta** support: Eases onboarding, local and cloud deployment, and guarantees tool consistency across contributors.
- **Figma-linked Design**: Components and pages reference matching Figma files.

---

## Repository Structure

This repo uses Yarn workspaces and Lerna. Key packages:

- `packages/ui` – **@lp/ui**: The UI library & design system (Storybook, CSS tokens, typography/colors, all shared React components)
- `packages/front` – **@lp/front**: The React web app for learners, games, vocabulary, and progress tracking
- `packages/server` – **@lp/server**: The Apollo GraphQL server (Express, CORS, rate-limiting, MongoDB, dictionary API integration)
- (other shared packages as needed)

All are managed with a single set of scripts, codegen, and dependency installs via workspaces.

---

## Getting Started

### 1. Prerequisites

- **Volta** – Enforces Node 18.17, Yarn 1.22 for everyone (see package.json volta field).
- **Docker** – For reliable development and database provisioning.

### 2. Clone & Install

```bash
git clone https://github.com/marusyaganza/language-power.git
cd language-power
yarn install
```

All dependencies for every package will be installed.

### 3. Development & Testing

- **Backend**: Runs with Apollo Server, Express, MongoDB (local or cloud), uses [Merriam-Webster Dictionary API](https://dictionaryapi.com/), with built-in API mocks
- **Frontend**: React app; imports shared UI from `@lp/ui`
- **UI Library**: Develop, preview, and document UI via Storybook (Chromatic-hosted and locally)

#### Common commands from repo root:

```
yarn start # Run all packages in dev mode using Lerna
yarn storybook # Launch Storybook (UI system docs/examples)
yarn lint # Lint codebase
yarn ready # Auto-fix lint/style issues in all packages
yarn test # Run tests across all packages
yarn cypress # Launch E2E Cypress tests
yarn codegen # Regenerate TypeScript types from GQL schema for all packages
```

### Env Setup

- MongoDB: Required for server; configure `MONGODB_URI` in `.env` (use `.env.example`)
- API Keys: For dictionary API, add credentials if real data is required
- Mocks: Set `USE_MOCKS=true` in env to use the provided dictionary API mocks

---

## Deploy/CI

- **Dockerized workflow** for prod/dev deploys (see details in the scripts section and below)
- **Chromatic Hosting**: Storybook is instantly deployed on every commit/merge ([see Chromatic docs](https://www.chromatic.com/))
- **CI/CD ready** via GitHub Actions for build, lint, and deployment

---

## Scripts Overview

All scripts are run via Lerna/Yarn workspaces:

- `start`, `dev`, `prod:docker`, `dev:docker` – combined app build/run (see details in package.json)
- `ready`, `lint`, `stylelint`, `clean`, `test`, `test:preprod` – for code quality, hygiene, and CI
- `storybook`, `build-storybook` – documentation for UI system (preview and build)
- `api-docs` – Generates backend API documentation
- `codegen`, `codegen:watch` – GQL type generation
- `new-component` – Scaffolds new UI components

---

## Project Demos

- **Frontend app demo**: [link](https://lp-monorepo-1.onrender.com)
- **Storybook live docs**: [link](https://lp-design-system.netlify.app/?path=/docs/design-system-colors--docs)

---

## Design & Documentation

- **Figma UI/UX:**

  - [Design system/UI kit in Figma](https://www.figma.com/design/uLznHs3pU0bQqy7Wwn3xQx/Design-system?node-id=2-123&t=i0lZuzBj152W7e0j-1)
  - [Page flows and layouts in Figma](https://www.figma.com/design/uLznHs3pU0bQqy7Wwn3xQx/Design-system?node-id=2-228&t=cV9Um1WVsmJJoaFu-1)

---

## Cross-Package Capabilities

- **GraphQL Type-Safe Codegen**:  
  GQL schema and TS types are shared across packages.

  - Run `yarn codegen` after any schema or frontend GQL change.

- **Apollo Client & Server**:
  - Frontend queries data via Apollo Client.
  - Backend is Apollo Server integrated with Express (with CORS, rate limiting, and mocks support).

---

## Previous Version

For historical context and legacy English-only features, see:

[Legacy Language Power repo - client](https://github.com/marusyaganza/language-power)

[Legacy Language Power repo - server](https://github.com/marusyaganza/language-power-backend)
