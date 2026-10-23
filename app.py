"""
app.py — the Flask application.

This is what runs while you DEVELOP the site locally. It reads all of your
portfolio content from `content/data.py`, injects it into the Jinja2 templates
in `templates/`, and serves the result at http://127.0.0.1:5000.

    Run it with:   python app.py     (or:  flask run)

When you're happy with how it looks, `freeze.py` turns this same app into a
folder of static HTML (in `docs/`) that GitHub Pages can host for free.
"""

from flask import Flask, Response, render_template

# All editable content (your name, skills, projects, jobs...) lives in one place.
from content.data import CONTENT

app = Flask(__name__)


@app.route("/")
def index():
    """Render the single-page portfolio.

    `**CONTENT` unpacks the content dictionary so each top-level key
    (profile, capabilities, projects, ...) becomes a variable the templates can use.
    """
    return render_template("index.html", **CONTENT)


@app.route("/robots.txt")
def robots():
    """Let search engines crawl the public portfolio and discover its sitemap."""
    site_url = CONTENT["site"]["url"].rstrip("/")
    body = f"User-agent: *\nAllow: /\n\nSitemap: {site_url}/sitemap.xml\n"
    return Response(body, mimetype="text/plain")


@app.route("/sitemap.xml")
def sitemap():
    """Expose the single public page in a minimal standards-compliant sitemap."""
    site_url = CONTENT["site"]["url"].rstrip("/")
    body = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"  <url><loc>{site_url}/</loc><priority>1.0</priority></url>\n"
        "</urlset>\n"
    )
    return Response(body, mimetype="application/xml")


if __name__ == "__main__":
    # debug=True auto-reloads the browser when you edit files. Turn it off for anything public.
    app.run(debug=True, port=5000)
