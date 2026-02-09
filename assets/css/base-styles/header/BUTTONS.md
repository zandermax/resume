# Resume Header Buttons - Architecture Documentation

## Semantic Correctness

The resume header buttons (.resume-header__button--print and .resume-header__button--save) MUST use `<button>` HTML elements, NOT `<a>` (anchor) tags.

### Rationale

- **Semantic HTML:** These buttons perform JavaScript actions (triggering print dialog, saving resume), not navigation
- **Accessibility:** Screen readers announce buttons as "button" vs "link", setting correct user expectations
- **Keyboard interaction:** Buttons respond to Space + Enter; links only respond to Enter
- **Call-to-Action:** These are CTAs, not hyperlinks

### ❌ INCORRECT - Do Not Use

```html
<a href="#" class="resume-header__button">Print</a>
```

### ✓ CORRECT - Current Implementation

```html
<button type="button" class="resume-header__button">Print</button>
```

## Architecture

### File Structure

- `variables/printlink.css` - All button CSS variables
- `variables/header-sections.css` - Container (.resume-header__buttons) variables
- `header/buttons.css` - Button selectors and rules
- Theme files - Theme-specific overrides

### Child Elements

Buttons support inline child elements (icons, spans) with fully themeable properties:

- Icon sizing: `--header-button-icon-size` (default: 1em)
- Icon spacing: `--header-button-icon-margin` (default: 0.25em)
- Icon vertical alignment: `--header-button-icon-vertical-align` (default: -0.125em)
- All child elements inherit button color by default

### Link Style Protection

The codebase previously used `a:not(.resume-header__button)` selectors. This was defensive coding but unnecessary since buttons are never anchor tags. This selector has been removed for clarity.

## CSS Variables

All button styling is controlled through CSS custom properties defined in `variables/printlink.css`:

### Base Styles

- Layout: `--header-button-display`, `--header-button-position`
- Spacing: `--header-button-padding-block/inline`, `--header-button-margin-*`
- Borders: `--header-button-border-width/style/color/radius`
- Typography: `--header-button-font-*`, `--header-button-color`, `--header-button-letter-spacing`
- Effects: `--header-button-box-shadow`, `--header-button-transform`, `--header-button-opacity`

### Interactive States

- Hover: `--header-button-hover-*` properties
- Active: `--header-button-active-*` properties

### Child Elements

- `--header-button-icon-size`: Size for icon elements (default: 1em)
- `--header-button-icon-margin`: Spacing around icons (default: 0.25em)
- `--header-button-icon-vertical-align`: Vertical alignment adjustment (default: -0.125em)
- `--header-button-child-color`: Color inheritance for child elements (default: inherit)

### Pseudo-elements

- `--header-button-before-*`: Control ::before pseudo-element (used by terminal theme for brackets)
- `--header-button-after-*`: Control ::after pseudo-element

## Button Variants

### Print Button (.resume-header__button--print)

- Always visible in all themes
- Primary CTA for generating printable resume
- Has pseudo-element support for decorative content

### Save Button (.resume-header__button--save)

- Hidden by default (`--header-button-save-display: none`)
- Only visible in terminal theme
- Used for special download/save functionality

## Theming

Themes can customize buttons by overriding CSS variables. Examples:

**Terminal Theme:**
```css
--header-button-border-width: 2px;
--header-button-border-color: var(--terminal-border-dark);
--header-button-before-content: '[';
--header-button-after-content: ']';
```

**Brutal Theme:**
```css
--header-button-transform: skewX(-5deg);
--header-button-box-shadow: 8px 8px 0 oklch(0% 0 0 / 0.4);
--header-button-font-weight: 900;
```

## Responsive Behavior

Button styling adapts to viewport size through CSS variables:

- `@media (max-width: 600px)`: Adjusts font-size, padding, and margins
- `@media (max-width: 500px)`: Further reduces sizing

Container layout (`.resume-header__buttons`) also responds:

- Switches from row to column layout on smaller screens
- Adjustable gap between buttons

All responsive properties are themeable via CSS variables (no hardcoded values).

## Best Practices

1. **Never convert to anchor tags** - Maintain semantic correctness
2. **Use CSS variables** - Don't add inline styles or hardcoded values
3. **Test across themes** - Ensure changes work in all theme variants
4. **Preserve accessibility** - Keep `type="button"` attribute on HTML elements
5. **Child elements** - If adding icons or spans, rely on the built-in inheritance system

## Related Documentation

- See `STRUCTURE.md` for overall CSS architecture
- See `../variables/printlink.css` for complete variable definitions
- See `buttons.css` for implementation details
