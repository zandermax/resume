# Base Styles Structure

Quick reference guide for AI agents and developers working with the modular base styles.

## Overview

This directory contains the base CSS styles split into small, focused modules. Most files are under 200 lines for maintainability. All files include metadata headers describing their purpose, HTML mappings, and dependencies.

The `_base.css` file (prefixed with underscore) should always be imported first as it contains fundamental resets and generic element styles that all other files depend on.

## File Organization

### CSS Variables (7 files)

- `variables-base.css` (~70 lines) - Core design tokens
- `variables-layout.css` (~308 lines) - Main container, header, section variables
- `variables-skills.css` (~97 lines) - Skills grid variables
- `variables-experience.css` (~197 lines) - Experience items, tech badges, bullets
- `variables-lists.css` (~85 lines) - Community and principles lists
- `variables-education.css` (~60 lines) - Education section
- `variables-buttons.css` (~179 lines) - Print/save buttons, dial selector

### Style Rules (9 files)

- `_base.css` (~175 lines) - Base resets and generic element styles (html, body, h1-h3, p, li, a, strong, em)
- `layout.css` (~58 lines) - Main resume container
- `header.css` (~445 lines) - Resume header structure, name/role, meta, links, and buttons
- `sections.css` (~190 lines) - Section containers and variants
- `title.css` (~95 lines) - Section title styling
- `skills.css` (~115 lines) - Skills grid component
- `experience.css` (~275 lines) - Experience items
- `lists.css` (~163 lines) - Community/principles lists
- `components/education.css` (~108 lines) - Education component

### Entry Point

- `index.css` (~70 lines) - Imports all files in correct order

## Quick Reference: HTML → CSS Files

| HTML Element                   | Variable File            | Style File     |
| ------------------------------ | ------------------------ | -------------- |
| `body.resume`                  | variables-base.css       | \_base.css     |
| `h1, h2, h3` (generic)         | variables-layout.css     | \_base.css     |
| `p, li` (generic)              | variables-layout.css     | \_base.css     |
| `a` (generic links)            | variables-layout.css     | \_base.css     |
| `.resume__main`                | variables-layout.css     | layout.css     |
| `.resume-header`               | variables-layout.css     | header.css     |
| `.resume-header__name`         | variables-layout.css     | header.css     |
| `.resume-header__role`         | variables-layout.css     | header.css     |
| `.resume-header__meta`         | variables-layout.css     | header.css     |
| `.resume-header__savelink`     | variables-buttons.css    | header.css     |
| `#resume-header__printlink`    | variables-buttons.css    | header.css     |
| `.resume-section`              | variables-layout.css     | sections.css   |
| `.resume-section__title`       | variables-layout.css     | title.css      |
| `.skills-grid`                 | variables-skills.css     | skills.css     |
| `.skills-grid__group`          | variables-skills.css     | skills.css     |
| `.skills-grid__title`          | variables-skills.css     | skills.css     |
| `.experience-item`             | variables-experience.css | experience.css |
| `.experience-item__role`       | variables-experience.css | experience.css |
| `.experience-item__tech`       | variables-experience.css | experience.css |
| `.experience-item__bullets`    | variables-experience.css | experience.css |
| `.community-list`              | variables-lists.css      | lists.css      |
| `.principles-list`             | variables-lists.css      | lists.css      |
| `.education-item`              | variables-education.css  | components/education.css  |
| `.education-item__institution` | variables-education.css  | components/education.css  |
| `dial-selector`                | variables-buttons.css    | header.css     |

## Import Order & Dependencies

```
variables-base.css (no dependencies)
variables-layout.css
variables-skills.css
variables-experience.css
variables-lists.css
variables-education.css
variables-buttons.css

_base.css (uses variables-base.css, variables-layout.css)
  ├─ layout.css
  ├─ header.css (includes buttons)
  ├─ sections.css
  ├─ title.css
  ├─ skills.css
  ├─ experience.css
  ├─ lists.css
  └─ components/
      └─ education.css
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
border: var(--element-border, none); /* Resets ALL border properties */
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

- ✓ Define longhand properties: `--section-padding-block-start`, `--section-padding-inline-end`
- ✓ Can also define shorthand for convenience: `--section-padding` (see exception below)
- ✗ Avoid using shorthand in actual CSS rules where longhand is also used
- This policy applies to CSS rules in base style files

**Exception for convenience shorthands:**

Shorthand custom properties can coexist with longhand properties if:
1. The shorthand is only used where needed (e.g., responsive.css, theme convenience)
2. Base style files (like experience.css) use ONLY longhand properties in their CSS rules
3. Both are defined in variables files for theme flexibility

Example from experience:
- `variables-experience.css` defines both `--experience-item-padding` (shorthand) and the four longhand properties
- `experience.css` uses ONLY the longhand properties in its CSS rules
- `responsive.css` uses the shorthand: `padding: var(--experience-item-padding)`
- Themes can set either the shorthand (for uniform padding) or individual longhand properties (for custom edges)

### Background Layering Pattern

When using both `background-image` and `background` properties:

- Set `background-image` BEFORE `background` shorthand
- This allows themes to use textures/patterns via `--element-background-image`
- The `background` shorthand sets color without overriding the image
- Example in title.css:
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

### All Properties Must Be Defined in Base Styles

**Important principle:** Every CSS custom property that themes can override MUST be defined in base variable files first.

**Why this matters:**
- Ensures consistent defaults across all themes
- Makes it easy to discover available customization points
- Prevents themes from creating incompatible custom properties
- Enables proper fallback behavior

**Examples:**
- ✓ Good: Theme sets `--experience-item-filter: blur(2px)` and base defines `--experience-item-filter: none`
- ✗ Bad: Theme sets `--experience-item-filter: blur(2px)` but base doesn't define it at all

**How to add theme-specific properties:**
1. Add the property to the appropriate base `variables-*.css` file with a sensible default
2. Document it in the file header
3. Then themes can override it as needed

Even if only one theme currently uses a property, it should be defined in base with a neutral default (like `none`, `visible`, `relative`, `transparent`).

## Theme Overrides

Theme files in `assets/css/themes/*.css` can override any CSS variable defined in the `variables-*.css` files. The base styles provide sensible defaults that themes customize.

Themes should:

1. **Only override** base variables to customize appearance (never define new custom properties without base definitions)
2. Define theme-specific intermediate variables (with theme prefix like `--brutal-*`, `--glitch-*`) for internal reuse
3. Use colors from `colors.css` when possible, or define custom oklch() colors
4. Document any custom spacing systems if not using base `--spacing-*` scale
5. When overriding box model properties, prefer setting all four longhand directions for uniform effects

## Adding New Components

1. Create `variables-{component}.css` with all component CSS variables
2. Create `{component}.css` with component styles
3. Add both imports to `index.css` in appropriate sections
4. Update this STRUCTURE.md file with the new component mappings
5. Follow variable naming patterns documented above
