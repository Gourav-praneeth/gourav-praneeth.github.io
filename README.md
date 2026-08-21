# 🎲 Board-Game Portfolio

A personal portfolio website with a tabletop board-game theme — built in **Python (Flask)** and published as a static site on **GitHub Pages**.

You develop locally with Flask (nice and dynamic), then a build script *freezes* the site into plain HTML/CSS/JS that GitHub Pages hosts for free.

---

## 📁 Project structure

```
Personal_Portfolio/
├── app.py                  ← the Flask app (runs the site while you develop)
├── freeze.py               ← builds the static site into docs/ for hosting
├── requirements.txt        ← Python packages to install
│
├── content/
│   └── data.py             ← 👈 EDIT THIS: all your text, skills, projects, jobs
│
├── templates/              ← the HTML (Jinja2). You rarely need to touch these.
│   ├── base.html           ← page skeleton: <head>, nav bar, footer
│   ├── index.html          ← stacks the sections together
│   └── partials/
│       ├── hero.html       ← "Player 1 Select" character card
│       ├── stats.html      ← "Ability Scores" skill tree
│       ├── gallery.html    ← "The Card Hand" project cards
│       ├── quests.html     ← "Quest Log" timeline
│       └── contact.html    ← "Victory Conditions" contact form
│
├── static/                 ← things served as-is
│   ├── css/custom.css      ← custom styles (textures, flip cards, portrait frame)
│   ├── js/main.js          ← interactions (tabs, card flips, filters)
│   └── img/profile.jpg     ← your photo
│
├── docs/                   ← BUILD OUTPUT (auto-generated — don't edit by hand)
├── .github/workflows/      ← auto-deploy to GitHub Pages on push
└── README.md               ← you are here
```

**The one file you'll edit most:** [`content/data.py`](content/data.py). Change your name, bio, skills, projects, and work history there — the templates rebuild themselves from it.

---

## 🚀 Run it locally

You need **Python 3.10+** installed. From this folder:

```bash
# 1. Create and activate a virtual environment (keeps packages tidy)
python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate

# 2. Install the dependencies
pip install -r requirements.txt

# 3. Start the dev server
python app.py
```

Open **http://127.0.0.1:5000** in your browser. Edit `content/data.py`, save, and refresh to see changes.

---

## 🏗️ Build the static site

When you're happy with it, generate the static version:

```bash
python freeze.py
```

This writes the finished site into `docs/`. Preview that exact static build with:

```bash
python -m http.server -d docs 8000     # then open http://localhost:8000
```

---

## 🌐 Publish to GitHub Pages

### Recommended: automatic (GitHub Actions)

The repo includes a workflow that builds and deploys on every push. One-time setup:

1. Create a repo on GitHub and push this project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: board-game portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source → “GitHub Actions.”**
3. Every push to `main` now rebuilds and republishes automatically. Your site lives at
   `https://<your-username>.github.io/<your-repo>/`.

> **Tip:** to get the clean URL `https://<your-username>.github.io/`, name the repo exactly `<your-username>.github.io`.

### Alternative: manual (commit the `docs/` folder)

Prefer not to use Actions? 

1. Delete the `docs/` line from [`.gitignore`](.gitignore).
2. Run `python freeze.py`, then commit and push (including `docs/`).
3. On GitHub: **Settings → Pages → Source → “Deploy from a branch” → `main` / `docs`.**

---

## ✉️ Enable the contact form (Formspree)

The form works without any backend using [Formspree](https://formspree.io) (free tier):

1. Sign up, create a form, and copy your endpoint (looks like `https://formspree.io/f/abcdwxyz`).
2. Paste it into `content/data.py`:
   ```python
   "formspree_endpoint": "https://formspree.io/f/abcdwxyz",
   ```
3. Rebuild/redeploy. Submissions now get emailed to you. (Left blank, the form shows a harmless demo message.)

---

## 🎨 Customising

| Want to change... | Edit... |
|---|---|
| Name, bio, skills, projects, jobs, socials | `content/data.py` |
| Theme colors (gold/charcoal/parchment) | the `colors` block in `templates/base.html` |
| Your photo | replace `static/img/profile.jpg` (keep the name, or update `avatar` in `data.py`) |
| Project screenshots | drop images in `static/img/`, set `"image": "img/yourfile.png"` on that project |
| Icons | any name from [lucide.dev/icons](https://lucide.dev/icons) |
| Animations / flip behaviour | `static/css/custom.css` and `static/js/main.js` |

Skill icons and colors are documented inline in `content/data.py`.

---

## 📝 Notes

- **Tailwind** is loaded via CDN, so there's **no Node/npm build step** — pure Python workflow. You may see a console note that the CDN isn't for production; it's fine for a portfolio. To remove it later, compile Tailwind with the CLI (see the Tailwind docs).
- Everything is dependency-light and commented so you can grow it as you learn.
