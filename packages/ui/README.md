# @lp/ui

Design system and UI component library for the second version of Language Power. It contains the shared React components, the game interfaces and the design tokens, all documented in Storybook.

This package is part of the [lp-monorepo](../../README.md). Requirements, tool versions and the full local setup are described in the root README; this file covers what is specific to the design system.

## Explore

- [Storybook](https://lp-design-system.netlify.app/?path=/docs/design-system-colors--docs), deployed to Netlify, is the public showcase of the project. The game stories are playable with predefined vocabulary data.
- [Figma: design system and components](https://www.figma.com/design/uLznHs3pU0bQqy7Wwn3xQx/Design-system?node-id=2-123&t=i0lZuzBj152W7e0j-1)

Several Storybook pages link to the matching Figma frame.

## Stack

- React 18 and TypeScript, styled with CSS Modules and CSS custom properties
- `react-spring` for animations
- Storybook 7 (`react-webpack5`) with autodocs, MDX documentation pages and a custom theme
- Types for game data and words generated from the shared GraphQL schema
- Plop for scaffolding components
- ESLint (with `jsx-a11y` rules) and Stylelint

## How it is consumed

There is no build step. `package.json` points `main` and `types` at `src/index.ts`, and `@lp/front` imports the TypeScript source through Yarn workspaces and compiles it with its own webpack configuration.

## Contents

- **Design foundations:** colour palette and typography pages in `src/docs`, built on CSS custom properties.
- **Form components:** inputs, selects, checkboxes, array and definition inputs, and the word and tag forms used by the frontend, with the `useForm` hook for state and validation.
- **Layout and feedback:** header, footer, user menu, modal, notification, spinner, progress, error display and error boundary.
- **Vocabulary:** word cards, dictionary entries, the search field, and tag components for the experimental tags feature.
- **Games:** `GameEngine` runs a game with a reducer (start, check answer, next question) and renders one of eight game components: audio, select definition, select word, type word, image, speaking, conjugation and gender. Answers are checked in the browser, and the results are passed back to the frontend, which saves them with the server's `saveGameResult` mutation.
- **Speech and audio:** `AudioButton` plays pronunciations, optionally on load. `SpeechInput` uses the browser's Web Speech API (`webkitSpeechRecognition`). The speaking game built on it is experimental: it works only in Chrome and never ran reliably.

Images used in the documentation pages are in `static/images` and served by Storybook at `/images`.

## Scripts

| Script                 | Description                                                              |
| ---------------------- | ------------------------------------------------------------------------ |
| `yarn storybook`       | Start Storybook on `http://localhost:6006`                               |
| `yarn build-storybook` | Build the static Storybook site into `storybook-static/`                 |
| `yarn codegen`         | Generate types from the shared schema into `src/generated`               |
| `yarn new-component`   | Scaffold a component, its CSS module and its story from `plop-templates` |
| `yarn lint`            | Run ESLint                                                               |
| `yarn stylelint`       | Run Stylelint                                                            |
| `yarn ready`           | Apply ESLint and Stylelint fixes                                         |
| `yarn clean`           | Remove build output, generated files and `node_modules`                  |

Run `yarn codegen` once before starting Storybook in a fresh checkout. The root `yarn storybook` does not generate types itself.

The package has no unit tests. Components are documented and checked in Storybook, and covered indirectly by the Cypress tests in `@lp/front`.
