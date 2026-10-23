# Asterix-Inspired Portfolio Direction

## Intent

This portfolio adapts the atmosphere of the [Asterix Digital Studio template](https://www.aura.build/s/asterix-digital-13) without reproducing its agency layout or ornamental interface patterns. The result should feel precise, warm, technical, and personal: an ink-black editorial portfolio punctuated by controlled orange signals.

The existing content, DOM structure, layout geometry, responsive behavior, interactions, and animations are fixed. This document governs visual styling only.

## Color System

| Role | Value | Use |
| --- | --- | --- |
| Ground | `#050505` | Primary page background |
| Deep field | `#000000` | Work, testimonial, and footer sections |
| Surface | `#0D0D0C` | Elevated dark sections |
| Warm surface | `#12110F` | Former light editorial sections |
| Raised field | `#1A120D` | Capability field |
| Ink | `#F6F2ED` | Headings and primary text |
| Body | `#C7C0B8` | Running text on warm surfaces |
| Muted | `#958D84` | Secondary notes and metadata |
| Accent | `#FF6B2C` | Actions, active work, figures, focus, contact |
| Accent hover | `#FF8754` | Interactive hover feedback |
| Accent ink | `#160802` | Text on orange |
| Portrait matte | `#211A15` | Image fallback and edge integration |

Orange is a signal, not a background decoration. Keep it concentrated on meaningful interactions and proof.

## Typography and Components

- Switzer remains the sole interface and reading face.
- Italic Georgia is reserved for the existing hero/footer wordmarks and testimonial lead. The main headline remains unstyled Switzer.
- Buttons stay flat, square, and high-contrast. Do not introduce gradients, glows, pill shapes, ornamental badges, or card grids.
- Preserve existing spacing, sizes, section boundaries, focus geometry, and Phosphor icons.
- Express Asterix's technical-grid character through disciplined alignment and rhythm, not visible grid lines.

## Imagery

- Portrait: `saturate(0.86) contrast(1.08) brightness(0.78) sepia(0.06)` with the existing crop.
- Object photography: `grayscale(1) sepia(0.16) contrast(1.08) brightness(0.78)`.
- Do not replace, reposition, or resize imagery as part of this restyle.

## Ambient Interaction

- Keep the native system cursor; never replace it with a follower or custom pointer.
- On fine-pointer devices, the hero's existing background wordmark follows the pointer by at most 18px horizontally and 12px vertically.
- The portrait moves in the opposite direction by at most 6px and 4px, creating restrained depth without changing layout.
- Motion eases through `requestAnimationFrame`, returns to rest when the pointer leaves, and stops outside the hero viewport.
- Touch devices and `prefers-reduced-motion` receive the finished static composition.

## Accessibility and Validation

All normal text must meet WCAG AA contrast. Focus remains a three-pixel accent outline. Reduced motion must expose all content without travel. Every release must pass the CSS build, frozen export, JavaScript and Python syntax checks, the design linter, and the 1440px, 768px, and 390px browser inspection with zero failures.
