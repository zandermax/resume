# Base Styles Structure

Quick reference guide for AI agents and developers working with the modular base styles.

## Overview

This directory contains the base CSS styles split into small, focused modules. Most files are under 200 lines for maintainability. All files include metadata headers describing their purpose, HTML mappings, and dependencies.

## File Organization

### CSS Variables (7 files)

- `variables-base.css` (~70 lines) - Core design tokens
- `variables-layout.css` (~308 lines) - Main container, header, section variables
- `variables-skills.css` (~97 lines) - Skills grid variables
- `variables-experience.css` (~197 lines) - Experience items, tech badges, bullets
- `variables-lists.css` (~85 lines) - Community and principles lists
- `variables-education.css` (~60 lines) - Education section
- `variables-buttons.css` (~179 lines) - Print/save buttons, dial selector

### Style Rules (10 files)

- `reset.css` (~82 lines) - HTML/body resets
- `typography.css` (~248 lines) - All text styling
- `layout.css` (~58 lines) - Main resume container
- `header.css` (~157 lines) - Resume header structure
- `sections.css` (~94 lines) - Section containers
- `skills.css` (~115 lines) - Skills grid component
- `experience.css` (~253 lines) - Experience items
- `lists.css` (~163 lines) - Community/principles lists
- `education.css` (~52 lines) - Education component
- `buttons.css` (~162 lines) - Print/save buttons

### Entry Point

- `index.css` (~74 lines) - Imports all files in correct order

## Quick Reference: HTML → CSS Files

| HTML Element                | Variable File            | Style File     |
| --------------------------- | ------------------------ | -------------- |
| `body.resume`               | variables-base.css       | reset.css      |
| `.resume__main`             | variables-layout.css     | layout.css     |
| `.resume-header`            | variables-layout.css     | header.css     |
| `.resume-header__name`      | variables-layout.css     | typography.css |
| `.resume-header__role`      | variables-layout.css     | typography.css |
| `.resume-header__meta`      | variables-layout.css     | header.css     |
| `.resume-header__savelink`  | variables-buttons.css    | buttons.css    |
| `#resume-header__printlink` | variables-buttons.css    | buttons.css    |
| `.resume-section`           | variables-layout.css     | sections.css   |
| `.resume-section__title`    | variables-layout.css     | typography.css |
| `.skills-grid`              | variables-skills.css     | skills.css     |
| `.skills-grid__group`       | variables-skills.css     | skills.css     |
| `.skills-grid__title`       | variables-skills.css     | skills.css     |
| `.experience-item`          | variables-experience.css | experience.css |
| `.experience-item__role`    | variables-experience.css | typography.css |
| `.experience-item__tech`    | variables-experience.css | experience.css |
| `.experience-item__bullets` | variables-experience.css | experience.css |
| `.community-list`           | variables-lists.css      | lists.css      |
| `.principles-list`          | variables-lists.css      | lists.css      |
| `.education-item`           | variables-education.css  | education.css  |
| `dial-selector`             | variables-buttons.css    | header.css     |

## Import Order & Dependencies

```
variables-base.css (no dependencies)
  ├─ variables-layout.css
  │   ├─ layout.css
  │   ├─ header.css
  │   └─ sections.css
  ├─ variables-skills.css
  │   └─ skills.css
  ├─ variables-experience.css
  │   └─ experience.css
  ├─ variables-lists.css
  │   └─ lists.css
  ├─ variables-education.css
  │   └─ education.css
  └─ variables-buttons.css
      └─ buttons.css

reset.css (uses variables-base.css)
typography.css (uses variables-base.css, variables-layout.css)
```

## File Header Format

Every CSS file includes a structured header:

```css
/**
 * FILE: filename.css
 * PURPOSE: What this file does
 *
 * HTML ELEMENTS AFFECTED:
 *   - .element-name (description)
 *
 * DEPENDENCIES:
 *   - other-file.css (what it depends on)
 *
 * RELATED FILES:
 *   - related-file.css (how it relates)
 *
 * [For variable files]
 * VARIABLES DEFINED: ~N variables controlling:
 *   - Feature area
 */
```

## CSS Variable Guidelines

### Variable Naming Patterns

**Pseudo-element variables:**
- Use `--element-before-*` for `::before` pseudo-elements
- Use `--element-after-*` for `::after` pseudo-elements
- Example: `--section-title-before-content`, `--experience-item-after-background`

**Responsive variables:**
- Use `--property-name-responsive-{breakpoint}` pattern with explicit property names
- For spacing properties, use longhand logical properties (not shorthands)
- Breakpoints: 960, 768, 600, 500, 480, 400, 380
- Examples:
  - ✓ Correct: `--section-padding-inline-start-responsive-768`
  - ✓ Correct: `--header-padding-responsive-500` (if header uses shorthand)
  - ✗ Avoid: `--section-padding-responsive-768` (ambiguous - which padding direction?)

**State variables:**
- Use `--element-hover-*` for hover states
- Use `--element-active-*` for active states
- Example: `--link-hover-color`, `--printlink-active-transform`

**Alternate/nth-child variables:**
- Use `--element-nth-{pattern}-*` for nth-child styling
- Use `--property-alternate` for even/odd alternates
- These inherit from base variables by default
- Examples:
  - `--experience-item-nth-2n-transform` (for even experience items)
  - `--education-item-nth-even-transform` (for even education items)
  - `--bullet-before-content-alternate` (for even bullet points)
  - `--bullet-text-shadow-alternate` (for even bullet points)

### Longhand-Only Policy for Box Model Properties

**Always use longhand properties for `border`, `margin`, and `padding`** to avoid cascade conflicts:

**Why:** CSS shorthand properties reset ALL sub-properties, which can override longhand properties regardless of order. This creates unpredictable behavior when themes try to override specific edges.

**Example of the problem:**
```css
/* BAD - shorthand conflicts with longhand */
border: var(--element-border, none);           /* Resets ALL border properties */
border-block-end: var(--element-border-width, 3px) solid var(--border-color); /* Gets overridden! */

/* GOOD - use only longhand */
border-block-start: var(--element-border-block-start, none);
border-block-end: var(--element-border-block-end, 3px solid var(--border-color));
border-inline-start: var(--element-border-inline-start, none);
border-inline-end: var(--element-border-inline-end, none);
```

**Apply this to CSS properties:**
- `border` → use `border-block-start`, `border-block-end`, `border-inline-start`, `border-inline-end`
- `margin` → use `margin-block-start`, `margin-block-end`, `margin-inline-start`, `margin-inline-end`
- `padding` → use `padding-block-start`, `padding-block-end`, `padding-inline-start`, `padding-inline-end`

**Apply this to CSS custom properties (variable definitions):**
- ✓ Define: `--section-padding-block-start`, `--section-padding-inline-end`
- ✗ Avoid: `--section-padding` (shorthand creates override conflicts)
- This policy applies to both base variable definitions AND theme overrides
- Themes that need uniform padding on all sides should set all four longhand properties

### Background Layering Pattern

When using both `background-image` and `background` properties:
- Set `background-image` BEFORE `background` shorthand
- This allows themes to use textures/patterns via `--element-background-image`
- The `background` shorthand sets color without overriding the image
- Example in typography.css:
  ```css
  background-image: var(--section-title-background-image);
  background: var(--section-title-background, transparent);
  ```

### Theme-Specific Intermediate Variables

Themes can define their own prefixed variables for internal reuse:
- `--brutal-shadow-*`, `--brutal-texture` (Brutal theme)
- `--terminal-inset-*`, `--terminal-border-*` (Terminal theme)
- `--glitch-primary`, `--glitch-text-shadow` (Glitch theme)
- `--nostalgia-*` colors (Nostalgia theme)

These intermediate variables help themes maintain consistency and avoid repetition.

### Shared Variables

Some elements intentionally share variables:
- `.resume-header__name-greeting` and `.resume-header__name-small` both use `--header-name-greeting-*` variables for consistent styling

## Theme Overrides

Theme files in `assets/css/themes/*.css` can override any CSS variable defined in the `variables-*.css` files. The base styles provide sensible defaults that themes customize.

Themes should:
1. Override base variables to customize appearance
2. Define theme-specific intermediate variables (with theme prefix) for internal reuse
3. Use colors from `colors.css` when possible, or define custom oklch() colors
4. Document any custom spacing systems if not using base `--spacing-*` scale

## Adding New Components

1. Create `variables-{component}.css` with all component CSS variables
2. Create `{component}.css` with component styles
3. Add both imports to `index.css` in appropriate sections
4. Update this STRUCTURE.md file with the new component mappings
5. Follow variable naming patterns documented above
