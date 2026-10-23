# Repository Guidelines

## Project Structure & Module Organization

This is a Flask portfolio that is frozen into a static GitHub Pages site.

- `app.py` defines the application and public routes.
- `content/data.py` is the primary content source for profile, project, experience, and contact data.
- `templates/` contains Jinja layouts and section partials.
- `static/css/`, `static/js/`, `static/img/`, `static/fonts/`, and `static/files/` contain production assets.
- `freeze.py` generates the deployable site in `docs/`.
- `.github/workflows/deploy.yml` builds and publishes `main`.

Do not edit `docs/` manually; it is generated and ignored. Add project screenshots under `static/img/projects/` using lowercase kebab-case names such as `board-game-rag.webp`.

## Build, Test, and Development Commands

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
npm ci
npm run build:css
python app.py
```

`python app.py` serves the development site at `http://127.0.0.1:5000`. Run `npm run build:css` after changing Tailwind classes or `tailwind.config.js`.

```bash
python freeze.py
python -m http.server -d docs 8000
node --check static/js/main.js
python -m py_compile app.py freeze.py content/data.py
git diff --check
```

These commands build and preview the exact static output, validate JavaScript and Python syntax, and catch whitespace errors.

## Coding Style & Naming Conventions

Use four spaces for Python and two spaces for HTML, CSS, JavaScript, JSON, and YAML. Prefer semantic HTML, accessible labels, visible focus states, and dependency-light JavaScript. Keep reusable content in `content/data.py` instead of duplicating it in templates. Use `snake_case` for Python identifiers, `camelCase` for JavaScript, and kebab-case for asset filenames and CSS component classes.

## Testing Guidelines

There is no formal test suite or coverage threshold yet. Every change must pass the syntax and build commands above. For UI work, inspect desktop and mobile layouts, keyboard navigation, reduced-motion behavior, links, résumé access, and the contact form. Performance-oriented changes should be checked with Lighthouse when practical.

## Commit & Pull Request Guidelines

Follow the existing imperative, outcome-focused commit style: `Add polished portfolio interactions and motion`. Keep commits scoped to one feature. Pull requests should explain the user-visible result, list verification performed, link relevant issues, and include before/after screenshots for visual changes. Never commit secrets, `.env` files, `node_modules/`, virtual environments, or generated `docs/` output.
