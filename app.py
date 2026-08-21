"""
app.py — the Flask application.

This is what runs while you DEVELOP the site locally. It reads all of your
portfolio content from `content/data.py`, injects it into the Jinja2 templates
in `templates/`, and serves the result at http://127.0.0.1:5000.

    Run it with:   python app.py     (or:  flask run)

When you're happy with how it looks, `freeze.py` turns this same app into a
folder of static HTML (in `docs/`) that GitHub Pages can host for free.
"""

from flask import Flask, render_template

# All editable content (your name, skills, projects, jobs...) lives in one place.
from content.data import CONTENT

app = Flask(__name__)


@app.route("/")
def index():
    """Render the single-page portfolio.

    `**CONTENT` unpacks the content dictionary so each top-level key
    (profile, abilities, projects, ...) becomes a variable the templates can use.
    """
    return render_template("index.html", **CONTENT)


if __name__ == "__main__":
    # debug=True auto-reloads the browser when you edit files. Turn it off for anything public.
    app.run(debug=True, port=5000)
