# Base Styles Structure

Quick reference guide for AI agents and developers working with the modular base styles.

## Overview

This directory contains the base CSS styles split into small, focused modules. Most files are under 200 lines for maintainability. All files include metadata headers describing their purpose, HTML mappings, and dependencies.

The `_base.css` file (prefixed with underscore) should always be imported first as it contains fundamental resets and generic element styles that all other files depend on.

## File Organization

### CSS Variables (10 files in variables/ subdirectory)

- `variables/base.css` (~70 lines) - Core design tokens
- `variables/main-header.css` (~308 lines) - Main container and core header variables
- `variables/header-sections.css` - Extended header and section container variables
- `variables/sections-global.css` - Section content and global styles
- `variables/skills.css` (~97 lines) - Skills grid variables
- `variables/experience.css` (~197 lines) - Experience items, tech badges, bullets
- `variables/lists.css` (~145 lines) - Community and principles lists (33 variables, zero fallbacks)
- `variables/education.css` (~60 lines) - Education section
- `variables/printlink.css` (~106 lines) - Print/save link buttons
- `variables/dial-selector.css` (~310 lines) - Dial selector component and housing (~136 public API variables)

### Style Rules (9 files)

- `_base.css` (~175 lines) - Base resets and generic element styles (html, body, h1-h3, p, li, a, strong, em)
- `main.css` (~58 lines) - Main resume container
- `header.css` (~445 lines) - Resume header structure, name/role, meta, links, and buttons
- `sections.css` (~190 lines) - Section containers and variants
- `title.css` (~95 lines) - Section title styling
- `skills.css` (~115 lines) - Skills grid component
- `experience.css` (~275 lines) - Experience items
- `lists.css` (~319 lines) - Community/principles lists (native CSS nesting, zero fallbacks)
- `components/education.css` (~108 lines) - Education component

### Entry Point

- `index.css` (~70 lines) - Imports all files in correct order

## Quick Reference: HTML → CSS Files

| HTML Element                   | Variable File                 | Style File                |
| ------------------------------ | ----------------------------- | ------------------------- |
| `body.resume`                  | variables/base.css            | \_base.css                |
| `h1, h2, h3` (generic)         | variables/sections-global.css | \_base.css                |
| `p, li` (generic)              | variables/sections-global.css | \_base.css                |
| `a` (generic links)            | variables/sections-global.css | \_base.css                |
| `.resume__main`                | variables/main-header.css     | main.css                  |
| `.resume-header`               | variables/main-header.css     | header.css                |
| `.resume-header__name`         | variables/main-header.css     | header.css                |
| `.resume-header__role`         | variables/header-sections.css | header.css                |
| `.resume-header__meta`         | variables/header-sections.css | header.css                |
| `.resume-header__savelink`     | variables/printlink.css       | header/buttons.css        |
| `#resume-header__printlink`    | variables/printlink.css       | header/buttons.css        |
| `.resume-section`              | variables/header-sections.css | sections.css              |
| `.resume-section__title`       | variables/header-sections.css | title.css                 |
| `.skills-grid`                 | variables/skills.css          | skills.css                |
| `.skills-grid__group`          | variables/skills.css          | skills.css                |
| `.skills-grid__title`          | variables/skills.css          | skills.css                |
| `.experience-item`             | variables/experience.css      | experience.css            |
| `.experience-item__role`       | variables/experience.css      | experience.css            |
| `.experience-item__tech`       | variables/experience.css      | experience.css            |
| `.experience-item__bullets`    | variables/experience.css      | experience.css            |
| `.community-list`              | variables/lists.css           | lists.css                 |
| `.principles-list`             | variables/lists.css           | lists.css                 |
| `.education-item`              | variables/education.css       | components/education.css  |
| `.education-item__institution` | variables/education.css       | components/education.css  |
| `.dial-selector-housing`       | variables/dial-selector.css   | header/dial-selectors.css |

## Import Order & Dependencies

```
variables/base.css (no dependencies)
variables/main-header.css
variables/header-sections.css
variables/sections-global.css
variables/skills.css
variables/experience.css
variables/lists.css
variables/education.css
variables/printlink.css
variables/dial-selector.css

_base.css (uses variables/base.css, variables/*-*.css)
  ├─ main.css
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

**Responsive Gap Pattern (Dial Selector):**

The dial selector component uses internal responsive gap variables (`--ds-gap-tablet`, `--ds-gap-phone`, `--ds-gap-xs`) that are applied at different breakpoints in `dial-selector-styles/responsive.css`. These derive from the public `--dial-selector-gap` variable, providing consistent responsive behavior while allowing themes to override the base gap value.

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

- `variables/experience.css` defines both `--experience-item-padding` (shorthand) and the four longhand properties
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

### Theme-Specific Variables

Themes can define their own prefixed variables for internal reuse and theme-specific colors:

**Theme-Specific Colors** (defined in theme files, NOT in global colors.css):

- `--color-blue-metro` (Metro theme)
- `--color-blue-dashboard` (Dashboard theme)
- `--color-blue-sky` (Terminal theme)
- `--color-blue-steel`, `--color-green-xp` (XP theme)

**Theme-Specific Style Variables**:

- `--brutal-shadow-*`, `--brutal-texture` (Brutal theme)
- `--terminal-inset-*`, `--terminal-border-*` (Terminal theme)
- `--glitch-*` colors and effects (Glitch theme)
- `--nostalgia-*` colors (Nostalgia theme)
- `--metro-*` color palette (Metro theme)
- `--xp-*` system colors (XP theme)

These intermediate variables help themes maintain consistency and avoid repetition.

### Shared Variables

Some elements intentionally share variables:

- `.resume-header__name-greeting` and `.resume-header__name-small` both use `--header-name-greeting-*` variables for consistent styling

### Header Custom Properties

The header component uses a mix of shorthand and longhand custom properties for flexibility.

**Shorthand convenience properties** (defined for theme convenience):

- `--header-border` - Complete border shorthand (e.g., `3px solid color`)
- `--header-padding` - Complete padding shorthand (e.g., `1rem 2rem`)
- `--header-margin` - Complete margin shorthand (e.g., `0 0 1.5rem 0`)
- `--header-name-border` - Name element border shorthand
- `--header-name-padding` - Name element padding shorthand
- `--header-name-margin` - Name element margin shorthand

**Base styles usage**: The actual CSS rules in `header.css` use ONLY longhand properties (e.g., `border-block-start`, `padding-inline-start`) to avoid cascade conflicts. The shorthand properties above are convenience properties for themes.

**Themes can choose**:

- Override shorthand for uniform values: `--header-padding: 2rem;`
- Override specific longhand for asymmetric values: `--header-padding-block-start: 3rem;`
- Mix both approaches (longhand takes precedence in actual styles)

**Pseudo-element properties**:

- Header pseudo-elements use pattern `--resume-header-before-*` and `--resume-header-after-*`
- All pseudo-element properties must be defined in base with defaults
- Examples: `--resume-header-before-border`, `--resume-header-before-opacity`, `--resume-header-before-pointer-events`

### Section Title Properties

Section titles (h2.resume-section\_\_title) follow the same longhand-first principle:

**Longhand properties** (used in actual CSS rules):

- `--section-title-margin-block-start`, `--section-title-margin-block-end`
- `--section-title-margin-inline-start`, `--section-title-margin-inline-end`
- `--section-title-padding-block-start`, `--section-title-padding-block-end`
- `--section-title-padding-inline-start`, `--section-title-padding-inline-end`
- `--section-title-border-block-start`, `--section-title-border-block-end`
- `--section-title-border-inline-start`, `--section-title-border-inline-end`

**Variable organization in variables/header-sections.css:**

Properties are grouped by category for easy navigation:

- Typography (font-size, weight, line-height, letter-spacing, text-transform, color)
- Borders (block-start, block-end, inline-start, inline-end, radius)
- Spacing - Padding (4 longhand properties)
- Spacing - Margin (4 longhand properties)
- Background & Visual Effects (background, background-image, box-shadow, text-shadow)
- Layout & Display (display, width, overflow, align-items, gap)
- Transform & Animation (transform, animation, contain, will-change)
- Hover State (hover-box-shadow)
- Pseudo-elements (::before and ::after properties in separate groups)

**Background layering**: Uses `background-image` before `background` shorthand to allow texture overlays. The `background` property has a special inline fallback to `--section-accent-color` in title.css for automatic per-section color rotation (see sections.css).

**Pseudo-elements**: Support extensive customization via `--section-title-before-*` and `--section-title-after-*` properties for theme-specific decorations. All properties default to neutral values (none/auto/transparent/static).

**No inline fallbacks**: All properties have defaults defined in variables/header-sections.css except for the intentional `--section-accent-color` fallback pattern.

**Dial selector housing**:

- Uses longhand properties in actual styles: `--dial-selector-housing-padding-block-start`, etc.
- Shorthand `--dial-selector-housing-margin-inline` and `--dial-selector-housing-margin-block` available for theme convenience
- Follows same pattern as header properties

**Dial Selector Public API**:

The dial selector component exposes a comprehensive public API for theme customization through `--dial-selector-*` prefixed variables. This API establishes a clear boundary between what themes should customize (public API) and what should remain private (internal `--ds-*` variables).

- **Public API (~50 variables)**: `--dial-selector-*` variables defined in `variables/dial-selector.css`

  - Theme colors: ink, selection, indicator, line, knob background, outer circle, inner circle
  - Label styling: font, padding, colors, borders, shadows, transitions
  - Label states: hover (color, background, padding, box-shadow, transform, opacity, filter)
  - Label states: active (color, background, filter, text-shadow, box-shadow)
  - Label span: display, padding, borders, background, colors, transform, letter-spacing
  - Knob styling: border (width, style, color), box-shadow, border-radius, background-image, filter, clip-path, opacity
  - Knob ::before: opacity, filter (inner circle customization)
  - Knob ::after: 9 properties for decorative pseudo-element
  - Indicator styling: width, height, gradient, box-shadow, border, border-radius, opacity, filter
  - Line styling: width, opacity (default, active, alternate), stroke, filter

- **Private Internal Variables**: `--ds-*` variables in `dial-selector-styles/variables.css`

  - Layout calculations: knob-size, gap, radius-\*, component dimensions
  - Animation/performance: will-change, contain, animation properties
  - Pseudo-elements: knob-after-\*, indicator internals
  - These should NOT be overridden by themes except for advanced customization

- **Pattern**: Component reads from public API with fallbacks: `var(--dial-selector-label-font-size, clamp(...))`
- **Benefits**: Clear encapsulation, stable theming API, maintainable component internals

Themes should ONLY override `--dial-selector-*` variables. Direct `--ds-*` overrides are considered advanced/internal customization and may break with component updates.

**Link styling in header**:

- Generic link properties: `--header-link-*` (e.g., `--header-link-color`, `--header-link-hover-border-block-end`)
- Alternative anchor-specific properties: `--header-a-*` (less common, used by glitch theme)
- Prefer `--header-link-*` for consistency with base styles

**No inline fallbacks principle**:

As of the latest refactor, `header.css` contains NO inline fallbacks (no `var(--property, fallback)` syntax). All ~80 header-related custom properties have proper defaults defined in variable files:

- All defaults resolve to concrete values (no circular references)
- Ensures consistent behavior across all themes
- Eliminates duplication between fallbacks and variable definitions
- Makes the codebase more maintainable and easier to understand

This pattern should be followed in all other component CSS files.

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

1. Add the property to the appropriate base `variables/*.css` file with a sensible default
2. Document it in the file header
3. Then themes can override it as needed

Even if only one theme currently uses a property, it should be defined in base with a neutral default (like `none`, `visible`, `relative`, `transparent`).

## Color System Architecture

### Global Colors (`assets/css/colors.css`)

The global `colors.css` file contains **ONLY colors shared across multiple themes**:

- **Base colors**: `--color-black`, `--color-white`, `--color-gray-*`
- **Shared color families**: red, blue, green, yellow, cyan, magenta, orange, purple
- **Neutral tones**: beige, cream, tan, brown (used by multiple specialty themes)
- **System colors**: silver, gray variants for terminal/UI themes
- **Dark mode defaults**: `--color-dark-bg`, `--color-dark-knob` (shared by default & brutal themes)

### Theme-Specific Colors (in theme files)

**Theme-specific colors MUST be defined in the theme's own files**, not in `colors.css`.

**Benefits of this architecture**:

- Clear ownership: each theme owns its specific colors
- No pollution of global namespace
- Easier to understand what colors are actually shared
- Better encapsulation and maintainability

### When to Add Colors to `colors.css`

Only add a color to the global `colors.css` if:

1. It's used by **2 or more themes** (shared color)
2. It's a fundamental base color (black, white, primary colors)
3. It's part of a system color set (grays, terminal colors)

Otherwise, define it in the theme's own file with a descriptive name.

## Theme Overrides

Theme files in `assets/css/themes/*.css` can override any CSS variable defined in the `variables/*.css` files. The base styles provide sensible defaults that themes customize.

Themes should:

1. **Only override** base variables to customize appearance (never define new custom properties without base definitions)
2. **Define theme-specific colors** in the theme file itself (not in global colors.css)
3. Define theme-specific intermediate variables (with theme prefix like `--brutal-*`, `--glitch-*`) for internal reuse
4. Use colors from `colors.css` when possible for shared colors, or define custom oklch() colors in the theme
5. Document any custom spacing systems if not using base `--spacing-*` scale
6. When overriding box model properties, prefer setting all four longhand directions for uniform effects
7. **Avoid redundancy**: Do not redefine properties that exactly match base defaults (e.g., don't set `--main-position: relative` if that's already the base default)
8. **Remove unused properties**: Deprecated or unused properties should be removed from theme files to maintain clarity and prevent confusion

### Theme Property Optimization Guidelines

When creating or maintaining themes:

1. **Avoid Redundant Defaults**: Do not set properties that match base defaults

   - ✗ Bad: `--dial-selector-knob-border-radius: 50%` (already the default)
   - ✓ Good: Only set if changing from default (e.g., `--dial-selector-knob-border-radius: 0`)

2. **Common Redundant Properties to Avoid**:

   - `--dial-selector-knob-border-radius: 50%`
   - `--dial-selector-knob-box-shadow: none`
   - `--dial-selector-indicator-box-shadow: none`
   - `--dial-selector-indicator-border-radius: 0`
   - `--dial-selector-label-background: transparent`
   - `--dial-selector-label-border-width: 0`
   - `--dial-selector-label-hover-background: transparent`
   - `--dial-selector-label-hover-transform: none`

3. **Responsive Dial-Selector Properties** - REQUIRED PATTERN:

   - **MUST** use `@media` blocks within theme's `dial-selector.css` file
   - **DO NOT** scatter dial-selector properties across `responsive.css`
   - **Exception**: Housing padding properties can remain in `responsive.css` for broader layout changes

   **Example**:

   ```css
   /* In themes/mytheme/dial-selector.css */
   :root[data-theme='mytheme'] {
     --dial-selector-label-font-size: 1rem;
   }

   /* Responsive overrides in same file */
   @media (max-width: 768px) {
     :root[data-theme='mytheme'] {
       --dial-selector-label-font-size: 0.85rem;
       --dial-selector-label-padding: 0.5rem 0.75rem;
     }
   }
   ```

4. **Housing Property Location**:
   - Housing padding responsive overrides can stay in `responsive.css`
   - Base housing properties should be in `variables.css`

## Main Container Property Guidelines

### Base Definition Requirement

All properties used in main.css must be defined in variables/main-header.css with sensible defaults, even if only one theme overrides them.

### Main Container Property Categories

**Structural properties** (almost always overridden by themes):

- --main-border-width (13/12 themes override)
- --main-padding (12/12 themes override)
- --main-box-shadow (11/12 themes override)

**Visual properties** (frequently overridden):

- --main-border-radius (8/12 themes override)
- --main-background-image (2/12 themes: nostalgia only)
- --main-transform (2/12 themes: brutal, glitch)

**Utility properties** (rarely overridden, keep defaults):

- --main-position (default: relative - do not override unless necessary)
- --main-border-style (default: solid - do not override unless necessary)
- --main-overflow (1/12 themes: glitch only)
- --main-filter (1/12 themes: glitch only)

### Pseudo-Element Decoration Patterns

**Themes using ::before for visual effects**:

- **xp**: Title bar with gradient (lines 25-40)
- **brutal**: Texture grid overlay (lines 30-43)
- **web2gloss**: Glossy reflection (lines 199-206)
- **skeuomorph**: Leather material backing (lines 14-24)

**Themes using ::after for visual effects**:

- **glitch**: Scanline pattern (lines 330-342)
- **skeuomorph**: Stitched border detail (lines 27-33)

**Pattern**: Set `content: ''` to activate, then use `position: absolute`, `inset`, `pointer-events: none`, and z-index for layering.

### Redundancies to Avoid

Do not redefine in themes if exactly matching base default:

- ✗ `--main-position: relative`
- ✗ `--main-border-style: solid`
- ✗ `--main-border-radius: 0`
- ✗ `--main-overflow: visible`
- ✗ `--main-filter: none`
- ✗ Any `--resume-main-before-*` or `--resume-main-after-*` set to base default

## List Customization Best Practices

### Border Property Patterns

For community and principles list items:

- **Use longhand properties**: `--community-item-border-width`, `--community-item-border-style`
- **Avoid shorthand**: Do not use `--community-item-border` or `--principles-item-border` in themes
- **Share colors**: Use `--list-item-border-color` for both community and principles items

### Pseudo-Element Positioning

Both community and principles items share the same pseudo-element positioning variables:

### Theme Accent Color Rotation

List items support automatic accent color rotation via `--item-accent-color`:

- Define `--theme-accent-1` through `--theme-accent-4` in your theme
- Colors automatically rotate per nth-child (2n, 3n, 4n)
- The `--item-accent-color` variable is defined in `lists.css` and rotates based on nth-child
- To use accent colors, set `--community-item-border-inline-start-color: var(--item-accent-color)` in your theme
- Falls back to `--border-color` if theme accents not defined

Example theme setup:

```css
:root[data-theme='mytheme'] {
  --theme-accent-1: oklch(60% 0.2 200);
  --theme-accent-2: oklch(60% 0.2 250);
  --theme-accent-3: oklch(60% 0.2 300);
  --theme-accent-4: oklch(60% 0.2 350);

  /* Connect accent colors to border */
  --community-item-border-inline-start-color: var(--item-accent-color);
  --principles-item-border-inline-start-color: var(--item-accent-color);
}
```

### Border Property Pattern

List items use **longhand border properties** to avoid cascade conflicts:

- `--community-item-border-inline-start-width` - Border width (e.g., `4px`, `var(--border-width-thick)`)
- `--community-item-border-inline-start-style` - Border style (e.g., `solid`, `dashed`)
- `--community-item-border-inline-start-color` - Border color (can use `var(--item-accent-color)` for rotation)

Do NOT use shorthand `--community-item-border-inline-start` as it creates cascade ambiguity. Use the three longhand properties instead.

## Adding New Components

1. Create `variables/{component}.css` with all component CSS variables
2. Create `{component}.css` with component styles
3. Add both imports to `index.css` in appropriate sections
4. Update this STRUCTURE.md file with the new component mappings
5. Follow variable naming patterns documented above
