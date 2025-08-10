# @lp/ui — Design System for Language Power

Welcome to **@lp/ui**, the design system and UI component library for the Language Power app — a language learning platform designed to help learners improve their skills with interactive, engaging UI components.

This package is a relaunch and evolution of the original Language Power project. Its components and utilities are crafted to ensure consistency, reusability, and excellent developer experience.

---

## Features

- A comprehensive set of reusable React UI components tailored for language learning apps.
- Full Storybook integration providing interactive documentation, live previews, and UI testing.
- Design system synchronization with Figma prototypes, including color schemes, typography, and component layouts.
- Accessibility-minded components optimized for keyboard and screen reader support.
- State management and interaction patterns designed for language learning modules, including games and quizzes.
- Built with TypeScript and tested via Storybook’s addon ecosystem.

---

## Getting Started

### Installation

```bash
yarn install

yarn codegen
```

For a live, interactive preview and full documentation of all components, run:

```bash
yarn storybook
```

Or view the built Storybook [here]() to explore components with detailed usage, design references, and live controls.

---

## Design System Integration

### Figma

Our design system is closely synced with Figma. For each component, confirm the specs, color scheme, typography, and layouts in Figma:

- [Design System in Figma](https://www.figma.com/design/uLznHs3pU0bQqy7Wwn3xQx/Design-system?node-id=2-123&t=WCAmwHrchrH9VnTd-1)
- Color palette, typography scale, and component layouts are maintained to ensure pixel-perfect implementation.

You will find Figma links in the Storybook docs next to most components for quick access.

---

## Component Highlights

- **AudioButton:** Interactive audio playback with optional autoplay and text.
- **ConjugationInput:** Spanish verb conjugation practice inputs with validation.
- **SpeechInput:** Speech recognition component for pronunciation games.
- **Game Components:** Including ImageGame, GenderGame, SelectDefGame, and others for immersive language learning experiences.

---

## Folder Structure & Static Assets

- Component code is located in `src/components`.
- Images and design assets used in Storybook docs are stored in the `/public/images` directory and served via Storybook’s `staticDirs` configuration.

---

## Developer Scripts

- Use `yarn storybook` to start the local Storybook environment.
- Use `yarn build-storybook` to generate static Storybook files for deployment.
- Automated linting and style fixing available via `ready`.
- `plop` is configured for quickly scaffolding new components.
- GraphQL code generation is available to keep your queries and types in sync.

---

## Customization and Theming

- Storybook UI is customized to match the project’s branded color palette, providing a consistent and polished look.
- Icons and components use CSS variables for colors based on your design tokens for easy maintenance and theming.

---

## Contact & More Info

Project repository: [Language Power GitHub](https://github.com/marusyaganza/lp-monorepo)

---

### Happy Learning and Coding!
