# Portfolio Design Direction

## Concept

The portfolio uses a **considered move** system: one clear promise, one purposeful action, and immediate proof. It reflects Gourav's approach to engineering and board games—thoughtful decisions, reliable systems, and outcomes that help people.

## Color System

- Ground: `#E7ECE9` — cool stone sampled from the portrait environment.
- Surface: `#F7F8F4` — clean content field.
- Raised field: `#D6E1DC` — quiet section contrast.
- Ink: `#142027` — deep blue-black.
- Muted ink: `#53636A` — secondary text.
- Action: `#1F6B5A` — accessible deep seafoam on light fields.
- Hero: `#0D171C` with surface `#16262C`.
- Hero action: `#8DE0C2`, hover `#B3F0DB`.

Seafoam marks actions, focus, and active navigation. It should not decorate headings or fill unrelated components.

## Hero

- The opening is a two-column editorial composition on desktop: concise promise and actions on the left, portrait on the right.
- The headline stays within two lines. Supporting copy explains what Gourav builds and why it matters.
- The portrait is a real, dominant image with a restrained cool grade and subtle fine-pointer tilt.
- Availability and three proof metrics form one quiet evidence band rather than separate floating cards.
- Tablet retains the split composition; mobile stacks copy, portrait, then proof.

## Accessibility and Motion

Maintain visible focus, 44px minimum touch targets, WCAG AA text contrast, semantic headings, and descriptive image text. Motion uses transforms and opacity only. Fine-pointer tilt is disabled for touch and `prefers-reduced-motion`.

## Validation

Build Tailwind, freeze the Flask app, validate JavaScript and Python syntax, run the design linter and inspector at 1440px, 768px, and 390px, and review every final screenshot before release.
