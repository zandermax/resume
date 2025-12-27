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

## Theme Overrides

Theme files in `assets/css/themes/*.css` can override any CSS variable defined in the `variables-*.css` files. The base styles provide sensible defaults that themes customize.

## Adding New Components

1. Create `variables-{component}.css` with all component CSS variables
2. Create `{component}.css` with component styles
3. Add both imports to `index.css` in appropriate sections
4. Update this STRUCTURE.md file with the new component mappings
