# PessoaS2onhecimentos Project Context

## Project Overview
**PessoaS2onhecimentos** is a modern React 19 web application focused on building a platform for sharing knowledge and experiences. It features a landing page with several interactive sections like "Como Funciona" (How it Works) and "Benefícios" (Benefits).

### Main Technologies
- **Framework:** [React 19](https://react.dev/)
- **Routing:** [TanStack Router](https://tanstack.com/router) (File-based routing)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/) (using Radix UI and Lucide icons)
- **Animations:** [Motion](https://motion.dev/) (Framer Motion)
- **Linting & Formatting:** [Biome](https://biomejs.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Testing:** [Vitest](https://vitest.dev/)

## Architecture & Structure
The project follows a standard Vite + TanStack Router structure:

- `src/main.tsx`: Application entry point.
- `src/router.tsx`: TanStack Router instance configuration.
- `src/routes/`: File-based route definitions.
  - `__root.tsx`: Root layout with Header, Footer, and Outlet.
  - `index.tsx`: Home page content.
- `src/components/`: Reusable UI components.
  - `sections/`: Higher-level page sections (Hero, Benefits, CTA, etc.).
- `src/lib/`: Utility functions and shared logic.
- `src/styles.css`: Global styles and Tailwind imports.

### Development Conventions
- **Path Aliases:** Use `#/*` for subpath imports pointing to `./src/*` (e.g., `import { Button } from "#/components/ui/button"`).
- **Code Style:** Biome is configured to use **tabs** for indentation and **double quotes** for JavaScript/TypeScript strings.
- **Routing:** New routes should be added as files in `src/routes/`. The `routeTree.gen.ts` file is automatically managed by the TanStack Router plugin.
- **Styling:** Tailwind CSS 4 is used with CSS variables for colors and themes.

## Building and Running

### Development
```bash
npm install
npm run dev
```
Runs the development server on `http://localhost:3000`.

### Production
```bash
npm run build
```
Builds the application for production in the `dist/` folder.

### Testing
```bash
npm run test
```
Runs the test suite using Vitest. (Note: Initial tests may need to be added).

### Quality Control
```bash
npm run lint    # Run Biome linter
npm run format  # Run Biome formatter
npm run check   # Run Biome linter, formatter, and organizer
```

## Future Considerations
- **Testing:** Implement component and integration tests using Vitest and React Testing Library.
- **Server Functions:** The project is prepared for TanStack Start features like server functions if needed in the future.
- **Internationalization:** Consider adding i18n support if the platform expands to other languages.
