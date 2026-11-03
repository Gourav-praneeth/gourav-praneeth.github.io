# Project evidence

The portfolio uses real project evidence rather than generated interface mockups.

Current portfolio images:

- `mise-kitchen.jpg` — current desktop capture from the deployed Mise sign-in/landing experience.
- `multi-agent-autoresearch.jpg`
- `board-game-rag.jpg`

## Images to capture or replace

Use these exact filenames so no Python or template changes are required:

- `mise-kitchen.jpg` — desktop view of **My Kitchen** with realistic demo data. Show inventory,
  storage areas, and the primary action. Avoid account names, email addresses, or private household data.
- `multi-agent-autoresearch.jpg` — the AutoResearch input and live pipeline-progress view.
- `board-game-rag.jpg` — a question, cited answer, and visible rulebook source in one frame.
- `gentle-spend.webp` — an optional authentic product screen when the private project is ready to show.
- `gradelens.webp` — an optional instructor review screen with fictional student data only. A strong
  frame shows an editable rubric beside criterion-level evidence and an override control.

- `culinary-companion.webp` — use a real phone screen or a two-screen product view.
- `tactile-campus-map.webp` — use a photograph of the physical map, a CAD render,
  or a close detail showing the braille and raised lettering.

## Capture checklist

1. Populate the app with realistic demo data; never use real student, household, financial, or login data.
2. Hide browser bookmarks, developer tools, notifications, and password-manager prompts.
3. Use a 1440 x 900 browser viewport for each featured-project image.
4. Capture the product state that proves the project claim, not a generic sign-in screen when an authenticated demo is available.
5. Crop away browser chrome. Keep the interface readable at portfolio size and preserve the app's natural colors.
6. Export JPG or WebP at 80–88% quality and keep the file below 500 KB when practical.
7. Replace the file in this folder without changing its name, rebuild, and inspect both desktop and mobile crops.

Recommended format:

- Use WebP when possible; PNG is also supported.
- Featured project images: 1440 x 900 pixels (8:5 ratio).
- Keep each image below 500 KB when practical.
- Use lowercase, descriptive filenames with hyphens.

After adding an image, update that project's `image` value in
`content/data.py`. For example:

```python
"image": "img/projects/board-game-rag.webp",
```

Do not substitute stock photography or an invented product screen. Projects without
an authentic image intentionally remain text-led in the additional-projects ledger.
