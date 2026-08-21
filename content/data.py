"""
data.py — ALL of your portfolio content lives here.

This is the ONLY file you need to edit to change what the website says.
The templates loop over these Python dictionaries/lists and build the HTML,
so you never have to touch HTML to update your name, skills, projects, or jobs.

TIP: after editing, refresh the browser (the dev server auto-reloads).

Anything marked  # EDIT  is meant to be personalised.
Levels are 1–10 (shown as "Lv 9"); `value` is the bar fill percentage 0–100.
Icon names come from https://lucide.dev/icons  (just use the icon's name).
"""

CONTENT = {

    # ------------------------------------------------------------------ #
    #  SITE-WIDE SETTINGS                                                 #
    # ------------------------------------------------------------------ #
    "site": {
        "brand": "GOURAV",                                  # EDIT: short logo text
        "tagline": "The Portfolio Quest",                   # EDIT: small subtitle under logo
        "title": "Gourav Bhimavarapu · Portfolio",          # EDIT: browser tab title
        "description": "Board-game themed developer portfolio of Gourav Bhimavarapu.",  # EDIT: SEO description
        # EDIT: create a free form at https://formspree.io , paste your endpoint URL here.
        # Until you do, the form falls back to a friendly demo message.
        "formspree_endpoint": "",
    },

    # ------------------------------------------------------------------ #
    #  HERO — "Player 1 Select" character sheet                          #
    # ------------------------------------------------------------------ #
    "profile": {
        "name": "Gourav Bhimavarapu",                       # EDIT
        "avatar": "img/profile.jpg",                        # file lives in static/img/
        # Class/title tags. `style` is one of: gold, bronze, muted
        "classes": [
            {"label": "Software Engineer", "style": "gold"},    # EDIT
            {"label": "Creative Tech",     "style": "bronze"},  # EDIT
            {"label": "Full-Stack Ranger", "style": "muted"},   # EDIT
        ],
        "level": 27,                                        # EDIT: just for fun
        "xp": {"label": "XP", "current": "8,540", "max": "10,000", "percent": 85},  # EDIT
        "hp": {"label": "HP", "note": "Fully Rested ☕", "percent": 100},           # EDIT
        "bio": (                                            # EDIT: your backstory blurb
            "A builder who journeyed from the humble lands of HTML to the towering "
            "spires of full-stack development. Wields Python with precision, tames "
            "unruly APIs, and has a documented weakness for over-engineered side "
            "projects. Currently seeking the next great quest."
        ),
        # Quick-fact tiles under the bio
        "facts": [
            {"label": "Home Base",  "value": "Tempe, AZ"},      # EDIT
            {"label": "Guild",      "value": "Open to Work"},   # EDIT
            {"label": "Alignment",  "value": "Chaotic Builder"},# EDIT
        ],
    },

    # ------------------------------------------------------------------ #
    #  ABILITY SCORES — tabbed skill tree                                #
    # ------------------------------------------------------------------ #
    # Each category becomes a tab. Add/remove skills freely.
    "abilities": {
        "categories": [
            {
                "id": "lang", "label": "Languages",
                "skills": [
                    {"name": "Python",          "level": 9, "value": 92},   # EDIT
                    {"name": "JavaScript / TS", "level": 8, "value": 85},
                    {"name": "Java",            "level": 7, "value": 74},
                    {"name": "SQL",             "level": 7, "value": 78},
                ],
            },
            {
                "id": "frame", "label": "Frameworks",
                "skills": [
                    {"name": "Flask / Django",  "level": 8, "value": 86},   # EDIT
                    {"name": "React / Next.js", "level": 8, "value": 84},
                    {"name": "Node / Express",  "level": 7, "value": 76},
                    {"name": "Tailwind CSS",    "level": 8, "value": 88},
                ],
            },
            {
                "id": "tools", "label": "Tools & Utilities",
                "skills": [
                    {"name": "Git / GitHub", "level": 9, "value": 91},      # EDIT
                    {"name": "Docker",       "level": 7, "value": 70},
                    {"name": "AWS / Cloud",  "level": 7, "value": 68},
                    {"name": "Figma",        "level": 8, "value": 80},
                ],
            },
        ],
    },

    # Combat-stat badges (ATK / DEF / SPD styled as technical metrics)
    # `color` is one of: ember, gold, bronze
    "combat_stats": [
        {"label": "ATK · Shipping Speed", "value": 98, "icon": "sword",  "color": "ember"},  # EDIT
        {"label": "DEF · Code Quality",   "value": 94, "icon": "shield", "color": "gold"},   # EDIT
        {"label": "SPD · Learning Rate",  "value": 96, "icon": "zap",    "color": "bronze"}, # EDIT
    ],

    # ------------------------------------------------------------------ #
    #  THE CARD HAND — project gallery (flip cards + filters)            #
    # ------------------------------------------------------------------ #
    # `category` must match a filter id below: web / ai / mobile (add your own).
    # `cost` is the little mana number. `icon` shows on the artwork placeholder
    # (or set "image" to a file in static/img to show a real screenshot instead).
    "project_filters": [
        {"id": "all",    "label": "All Cards"},
        {"id": "web",    "label": "Web"},
        {"id": "ai",     "label": "AI / ML"},
        {"id": "mobile", "label": "Mobile"},
    ],
    "projects": [
        {
            "title": "Quest Board", "category": "web", "cost": 3,             # EDIT
            "icon": "kanban", "image": None,
            "tags": ["Python", "Flask", "PostgreSQL"],
            "short": "A collaborative task tracker themed as a medieval quest board.",
            "details": (
                "Built the realtime sync engine with WebSockets and reduced task-update "
                "latency by 60%. Designed the parchment UI system and shipped to 400+ users."
            ),
            "features": ["Realtime multiplayer sync", "Offline-first PWA", "60% latency drop"],
            "links": {"play": "#", "code": "#"},
        },
        {
            "title": "Oracle Bot", "category": "ai", "cost": 5,               # EDIT
            "icon": "sparkles", "image": None,
            "tags": ["Python", "LangChain", "FastAPI"],
            "short": "An AI assistant that answers lore questions from your own docs.",
            "details": (
                "RAG pipeline over a private knowledge base with citation-backed answers "
                "and streaming responses."
            ),
            "features": ["Vector search (pgvector)", "Streaming responses", "Cited sources"],
            "links": {"play": "#", "code": "#"},
        },
        {
            "title": "Dice Vault", "category": "mobile", "cost": 2,           # EDIT
            "icon": "dice-5", "image": None,
            "tags": ["React Native", "Expo"],
            "short": "A tactile dice roller for tabletop nights, with haptics & history.",
            "details": (
                "Cross-platform app with physics-based dice, custom sets, and shareable roll logs."
            ),
            "features": ["Haptic feedback", "4.8★ on stores", "Offline history"],
            "links": {"play": "#", "code": "#"},
        },
    ],

    # ------------------------------------------------------------------ #
    #  QUEST LOG — career / education timeline                           #
    # ------------------------------------------------------------------ #
    # `tone` styles the node marker: gold (current), bronze (past), muted (education)
    "quests": [
        {
            "period": "2023 — Present", "tone": "gold", "icon": "flag",      # EDIT
            "role": "Software Engineer",
            "org": "Company Name",
            "points": [
                "Led migration to microservices, cutting deploy time 70%.",
                "Mentored a party of junior engineers.",
            ],
        },
        {
            "period": "2021 — 2023", "tone": "bronze", "icon": "map-pin",    # EDIT
            "role": "Software Engineer Intern",
            "org": "Previous Company",
            "points": [
                "Shipped the flagship dashboard used by 10k+ users.",
                "Built the internal component library.",
            ],
        },
        {
            "period": "2021 — 2023", "tone": "muted", "icon": "graduation-cap",  # EDIT
            "role": "M.S. Computer Science",
            "org": "Arizona State University",
            "points": [
                "Focus on software engineering and machine learning.",
                "Member of the campus developer community.",
            ],
        },
    ],

    # ------------------------------------------------------------------ #
    #  ACHIEVEMENTS — certificates & credentials                         #
    # ------------------------------------------------------------------ #
    # `icon` = lucide icon name. `url` = credential link (leave "" to hide the button).
    # Add more entries as you earn them. Set `locked: True` for a "coming soon" card.
    "certificates": [
        {
            "title": "Applied AI Foundations",
            "issuer": "OpenAI",
            "date": "2025",              # EDIT: year/month earned
            "icon": "sparkles",
            "url": "",                    # EDIT: paste the credential/verification link
        },
        {
            "title": "AI Agents Course",
            "issuer": "Hugging Face",
            "date": "2025",              # EDIT
            "icon": "bot",
            "url": "",                    # EDIT
        },
        {
            # Teaser card — delete this once you've added the rest of your certs.
            "title": "More achievements incoming…",
            "issuer": "",
            "date": "",
            "icon": "lock",
            "url": "",
            "locked": True,
        },
    ],

    # ------------------------------------------------------------------ #
    #  DOWNTIME — hobbies & interests                                    #
    # ------------------------------------------------------------------ #
    # `icon` = lucide icon name (see https://lucide.dev/icons). `note` = short flavor line.
    "hobbies": [
        {"label": "Pickleball",  "icon": "circle-dot", "note": "Dinking & smashing"},      # EDIT
        {"label": "Board Games", "icon": "dices",      "note": "Strategy & shenanigans"},
        {"label": "Swimming",    "icon": "waves",      "note": "Lap after lap"},
        {"label": "Anime",       "icon": "tv",         "note": "One more episode…"},
    ],

    # ------------------------------------------------------------------ #
    #  CONTACT + FOOTER social links                                     #
    # ------------------------------------------------------------------ #
    # `icon` = lucide icon name. Use full URLs. Email uses a mailto: link.
    "socials": [
        {"label": "GitHub",   "icon": "github",   "url": "https://github.com/your-username"},        # EDIT
        {"label": "LinkedIn", "icon": "linkedin", "url": "https://linkedin.com/in/your-handle"},      # EDIT
        {"label": "Email",    "icon": "mail",     "url": "mailto:gbhimava@asu.edu"},                  # EDIT
    ],
}
