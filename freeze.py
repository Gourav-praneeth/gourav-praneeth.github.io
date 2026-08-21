"""
freeze.py — turn the live Flask app into a static website.

GitHub Pages can't run Python, so we "freeze" the Flask app into plain HTML/CSS/JS
files that any static host can serve. The output goes into the `docs/` folder,
which is the folder GitHub Pages is configured to publish (see README.md).

    Run it with:   python freeze.py

After it runs, `docs/` contains index.html + a copy of everything in static/.
Commit and push, and GitHub Pages serves it.
"""

from pathlib import Path

from flask_frozen import Freezer

from app import app

# Where the static build is written. `docs/` is the simplest GitHub Pages source.
app.config["FREEZER_DESTINATION"] = "docs"
# Use relative URLs (href="static/..." not "/static/...") so the site works when
# hosted at a subpath like  https://username.github.io/repo-name/
app.config["FREEZER_RELATIVE_URLS"] = True
# Clean out stale files from previous builds.
app.config["FREEZER_REMOVE_EXTRA_FILES"] = True

freezer = Freezer(app)


if __name__ == "__main__":
    freezer.freeze()

    # `.nojekyll` tells GitHub Pages to serve the files as-is (skip Jekyll processing).
    # We re-create it after freezing because the step above wipes extra files.
    docs = Path(app.config["FREEZER_DESTINATION"])
    (docs / ".nojekyll").write_text("")

    print("✅ Static site built into  docs/")
    print("   Preview it locally with:  python -m http.server -d docs 8000")
