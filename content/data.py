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
            {"label": "Software Engineer",   "style": "gold"},    # EDIT
            {"label": "RAG & Agentic AI",     "style": "bronze"},  # EDIT
            {"label": "MS CS Grad · ASU '26", "style": "muted"},   # EDIT
        ],
        "level": 22,                                        # EDIT: just for fun (your age)
        "xp": {"label": "XP", "current": "8,540", "max": "10,000", "percent": 85},  # EDIT
        "hp": {"label": "HP", "note": "Fully Rested ☕", "percent": 100},           # EDIT
        "bio": (                                            # EDIT: your backstory blurb
            "I build things that teach, automate, and scale. Having completed my BS/MS in "
            "Computer Science at Arizona State University (May 2026), I've spent the "
            "last 3 years at the intersection of software engineering, AI development, "
            "and education. I've supported 700+ students across 5 teaching roles, and "
            "founded the ASU Board Games Club, growing it from 0 to 300+ members. "
            "Actively seeking full-time Software Engineering / AI Engineer roles."
        ),
        # Quick-fact tiles under the bio
        "facts": [
            {"label": "Home Base",  "value": "Tempe, AZ"},          # EDIT
            {"label": "Guild",      "value": "Open to Work"},       # EDIT
            {"label": "Toolkit",    "value": "Python · Java · SQL"},# EDIT
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
                    {"name": "Python",     "level": 9, "value": 92},   # EDIT
                    {"name": "Java",       "level": 7, "value": 76},
                    {"name": "C++",        "level": 7, "value": 75},
                    {"name": "SQL",        "level": 7, "value": 78},
                    {"name": "JavaScript", "level": 6, "value": 68},
                ],
            },
            {
                "id": "frame", "label": "Frameworks",
                "skills": [
                    {"name": "React.js",         "level": 8, "value": 82},   # EDIT
                    {"name": "Flask",            "level": 8, "value": 84},
                    {"name": "LangChain",        "level": 8, "value": 80},
                    {"name": "Streamlit",        "level": 8, "value": 82},
                    {"name": "Firebase",         "level": 7, "value": 76},
                ],
            },
            {
                "id": "tools", "label": "Tools & Utilities",
                "skills": [
                    {"name": "Git / GitHub",         "level": 9, "value": 90},   # EDIT
                    {"name": "OpenAI API",           "level": 8, "value": 84},
                    {"name": "Chroma / Vector Search","level": 7, "value": 76},
                    {"name": "Bash Scripting",       "level": 8, "value": 80},
                    {"name": "Vercel",               "level": 7, "value": 74},
                    {"name": "Gradescope Automation","level": 8, "value": 82},
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
        {"id": "all",     "label": "All Cards"},
        {"id": "ai",      "label": "AI / ML"},
        {"id": "mobile",  "label": "Mobile"},
        {"id": "impact",  "label": "Social Impact"},
    ],
    "projects": [
        {
            "title": "Board Game Rules RAG Engine", "category": "ai", "cost": 5,
            "icon": "sparkles", "image": None,
            "tags": ["Python", "LangChain", "Chroma", "OpenAI API"],
            "short": "A retrieval engine that answers Catan rules questions with cited sources — no hallucinations allowed.",
            "details": (
                "Architected an end-to-end RAG pipeline (LangChain + Chroma + OpenAI) enforcing strict "
                "source citations and an 'insufficient context' fallback to prevent hallucinations. Used "
                "structure-aware chunking (800-char / 150-char overlap) to preserve context across rules "
                "and edge-case exceptions, then built a custom pytest evaluation harness that hit 9/10 "
                "accuracy on a hand-written test set. Shipped as a live Streamlit web app."
            ),
            "features": ["90% eval accuracy", "Citation-enforced answers", "Live Streamlit app"],
            "links": {
                "play": "https://board-game-rule-assistant.streamlit.app",
                "code": "https://github.com/Gourav-praneeth/Board-Game-Rule-Assistant",
            },
        },
        {
            "title": "Multi-Agent AutoResearch", "category": "ai", "cost": 5,
            "icon": "workflow", "image": None,
            "tags": ["Python", "Multi-Agent", "OpenAI API", "Streamlit"],
            "short": "A 5-agent pipeline that autonomously researches a question and writes a cited report.",
            "details": (
                "Orchestrates five specialized agents — Planner, Retriever, Summarizer, Critic, and "
                "Writer — to decompose a research question, pull facts from Wikipedia and DuckDuckGo, "
                "score confidence, identify gaps that need another retrieval pass (capped at 2 loops for "
                "cost control), and synthesize everything into a structured Markdown report. Runs on "
                "GPT-4o-mini for roughly $0.01–$0.03 per query. Built with Pydantic-validated schemas "
                "between agent stages and shipped as a live Streamlit app."
            ),
            "features": ["5-agent orchestration", "Confidence-scored findings", "~$0.01–$0.03 per run"],
            "links": {
                "play": "https://multi-agent-autoresearch.streamlit.app",
                "code": "https://github.com/Gourav-praneeth/autoresearch",
            },
        },
        {
            "title": "Culinary Companion", "category": "mobile", "cost": 3,
            "icon": "chef-hat", "image": None,
            "tags": ["React Native", "Firebase", "Spoonacular API"],
            "short": "A recipe app for exploring, saving, and personalizing recipes from a global API.",
            "details": (
                "A mobile app for cooking enthusiasts to add, remove, and favorite recipes, pulling "
                "diverse globally-sourced recipes from the Spoonacular API. Uses Firebase for "
                "real-time sync so a user's recipe collection stays up to date across devices."
            ),
            "features": ["Real-time Firebase sync", "External recipe API", "Favorites management"],
            "links": {"play": "#", "code": "#"},
        },
        {
            "title": "3D Tactile Campus Map", "category": "impact", "cost": 4,
            "icon": "map", "image": None,
            "tags": ["CAD Modeling", "Accessibility", "EPICS"],
            "short": "A tactile 3D campus map helping visually impaired ASU students navigate independently.",
            "details": (
                "Built through ASU's EPICS program: designed and modeled a tactile 3D map of campus "
                "using CAD, incorporating braille and raised lettering. Worked directly with SAILS and "
                "visually impaired students to gather feedback and refine clarity and usability."
            ),
            "features": ["CAD-modeled braille & raised lettering", "Co-designed with end users", "ASU EPICS program"],
            "links": {"play": "#", "code": "#"},
        },
    ],

    # ------------------------------------------------------------------ #
    #  QUEST LOG — career / education timeline                           #
    # ------------------------------------------------------------------ #
    # `tone` styles the node marker: gold (current), bronze (past), muted (education)
    # Ordered newest → oldest (latest milestone on top).
    "quests": [
        {
            "period": "2025 — 2026", "tone": "gold", "icon": "graduation-cap",
            "role": "M.S. Computer Science · 4.0 GPA",
            "org": "Arizona State University",
            "points": [
                "Coursework: Agentic AI, Data Processing at Scale, Data Mining, Software Verification & Validation.",
                "Graduated May 2026 — actively seeking full-time SWE / AI Engineer roles.",
            ],
        },
        {
            "period": "Aug 2024 — May 2025", "tone": "gold", "icon": "briefcase",
            "role": "AI Software Engineer Externship",
            "org": "Beam Group",
            "points": [
                "Architected a web-based AI assistant (5-person agile team) helping Canadian seniors navigate government financial aid (CPP) applications.",
                "Built an accessible React.js conversational UI optimized for senior readability.",
                "Integrated Firebase & Vercel for real-time auth and scalable deployment.",
            ],
        },
        {
            "period": "Jun 2024 — May 2026", "tone": "bronze", "icon": "flag",
            "role": "Club Founder & President",
            "org": "Board Games Club at ASU",
            "points": [
                "Founded ASU's first dedicated board games community — 0 to 280+ active members in 8 months.",
                "Secured $1,800 in university funding via formal budget proposals to stakeholders.",
                "Drove a 30% membership spike in a single week through targeted campus outreach.",
            ],
        },
        {
            "period": "Aug 2023 — May 2026", "tone": "bronze", "icon": "users",
            "role": "Graduate & Undergraduate Teaching Assistant",
            "org": "Arizona State University",
            "points": [
                "Mentored 1,000+ students across 6+ CS & math courses (Python, C++, Assembly, Algebra, Calculus).",
                "Engineered Python/Bash grading automation on Gradescope — 100% scoring consistency across 150+ submissions per assignment.",
                "Led engineering labs and exam reviews to ease first-year students' transition.",
            ],
        },
        {
            "period": "2021 — 2025", "tone": "muted", "icon": "graduation-cap",
            "role": "B.S. Computer Science · 4.0 GPA",
            "org": "Arizona State University",
            "points": [
                "Coursework: DSA, Database Management Systems, Machine Learning, Cybersecurity, Software Engineering.",
                "President of Board Games Club, member of Pickleball Club & SASE.",
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
            "date": "Aug 2026",
            "icon": "sparkles",
            "url": "https://academy.openai.com/public/certificate/66j0ft4fej",
        },
        {
            "title": "AI Agents Fundamentals",
            "issuer": "Hugging Face",
            "date": "Aug 2026",
            "icon": "bot",
            "url": (
                "https://us.aws.cdn.hf.co/xet-bridge-us/67a47037749ea2c4b9fafd4b/"
                "e9b921057e9a3b925b9c0994f372ef54cfd5d051e7a5c604fc49f7aa02fd8916"
                "?response-content-type=image%2Fpng&response-content-disposition=inline%3B"
                "+filename*%3DUTF-8%27%272026-08-11.png%3B+filename%3D%222026-08-11.png%22%3B"
                "&user_id=698d1d75b52913ea9ffbccac&X-Xet-Cas-Uid=698d1d75b52913ea9ffbccac"
                "&Expires=1787619373&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly91cy5hd3MuY2RuLmhmLmNvL3hldC1icmlkZ2UtdXMvNjdhNDcwMzc3NDllYTJjNGI5ZmFmZDRiL2U5YjkyMTA1N2U5YTNiOTI1YjljMDk5NGYzNzJlZjU0Y2ZkNWQwNTFlN2E1YzYwNGZjNDlmN2FhMDJmZDg5MTZcXD9yZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZwbmcmcmVzcG9uc2UtY29udGVudC1kaXNwb3NpdGlvbj1pbmxpbmUlM0IrZmlsZW5hbWUlMkElM0RVVEYtOCUyNyUyNzIwMjYtMDgtMTEucG5nJTNCK2ZpbGVuYW1lJTNEJTIyMjAyNi0wOC0xMS5wbmclMjIlM0ImdXNlcl9pZD02OThkMWQ3NWI1MjkxM2VhOWZmYmNjYWMmWC1YZXQtQ2FzLVVpZD02OThkMWQ3NWI1MjkxM2VhOWZmYmNjYWMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkVwb2NoVGltZSI6MTc4NzYxOTM3M319fV19"
                "&Signature=MEYCIQDY87hr0z2zLVWpz-KZeatWRkPCYCLo8jR2AK9jIIw4ZwIhAK-N86dv7Pay6Hk134~zupMC9Z~jWQ-Yl3~RD1ZQIl~k"
                "&Key-Pair-Id=01KXEF4KZ1B6FV465MAWR4M21F"
            ),
            # NOTE: this is a temporary signed AWS link (has an Expires= param) — it WILL
            # eventually stop working. Grab a fresh "See credential" link from your Hugging
            # Face profile and swap it in here when that happens.
        },
        {
            "title": "AI Fluency: Framework & Foundations",
            "issuer": "Anthropic",
            "date": "Jul 2026",
            "icon": "brain-circuit",
            "url": "https://verify.skilljar.com/c/cnuxcoi2kp5n",
        },
        {
            "title": "Claude 101",
            "issuer": "Anthropic",
            "date": "Jul 2026",
            "icon": "graduation-cap",
            "url": "https://verify.skilljar.com/c/3q8jqhc69cg9",
        },
        {
            "title": "Career Essentials in Generative AI",
            "issuer": "Microsoft & LinkedIn",
            "date": "May 2024",
            "icon": "grid-2x2",
            "url": "https://www.linkedin.com/learning/certificates/5f9fe606d1f93ebda490d23bb4861c4db09c9581096dfdd25e4f3c6e4d798f78",
        },
        {
            "title": "Cybersecurity Virtual Experience Program",
            "issuer": "Mastercard",
            "date": "Aug 2023",
            "icon": "shield-check",
            "url": (
                "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/"
                "mastercard/vcKAB5yYAgvemepGQ_Mastercard_dXQvAnN8f5cuoyzYd_"
                "1690996782583_completion_certificate.pdf"
            ),
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
    # `icon` = lucide icon name (used when `svg_path` is not set). Email uses a mailto: link.
    # NOTE: GitHub/LinkedIn use `svg_path` (their real logo) instead of lucide's `icon`,
    # because Lucide removed brand/company logos from its icon set — data-lucide="github"
    # and "linkedin" silently render nothing. Don't switch these back to `icon`.
    "socials": [
        {
            "label": "GitHub", "url": "https://github.com/Gourav-praneeth",
            "svg_path": "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
        },
        {
            "label": "LinkedIn", "url": "https://www.linkedin.com/in/gouravbh/",
            "svg_path": "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
        },
        {"label": "Email", "icon": "mail", "url": "mailto:gouravprb610@gmail.com"},
    ],

    # ------------------------------------------------------------------ #
    #  GUILD ENDORSEMENT — testimonial / recommendation                  #
    # ------------------------------------------------------------------ #
    "testimonial": {
        "quote": (
            "I am pleased to recommend Gourav as a highly capable and dependable "
            "engineer with strong technical and leadership skills. He stood out for his "
            "curiosity, strong problem-solving ability, and willingness to go beyond course "
            "requirements — later serving as a Teaching Assistant, Section Leader, and "
            "Instructional Assistant, where he developed automated grading scripts "
            "demonstrating proficiency in C++, Python, and Bash scripting. Gourav is highly "
            "motivated, dependable, and a natural teacher and leader. I recommend him "
            "without hesitation and am confident he will excel in any role he pursues."
        ),
        "author": "Soumya Indela",
        "role": "Faculty, CSE 230 — Arizona State University",
    },
}
