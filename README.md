# Resume + CSS Theme Showcase

This is my resume—but more importantly, it's a showcase of **design through CSS**.

## Philosophy

I built this site to demonstrate what's possible with mostly CSS and minimal JavaScript. Each theme represents a different era or aesthetic in digital design, from retro CRT terminals to futuristic glitch effects. The themes are functional, interactive, and (hopefully) fun.

The idea is simple: instead of sending a static PDF, why not show my work through an interactive experience? As a design-focused software engineer, I believe the best way to demonstrate UI skills is to build something that _looks and feels_ polished.

## The Themes

This site includes several distinct themes spanning different design eras:

- **1985** — CRT terminal aesthetic
- **1992** — Classic terminal interface
- **1996** — Nostalgia-era web with marquees and blinking text
- **2001** — Windows XP-inspired skeuomorphism
- **2004** — Web 2.0 glossy badges and rounded corners
- **2007** — Skeuomorphic design with sticky notes and realistic textures
- **2012** — Metro/flat design language
- **2017** — Brutalist web design
- **2020** — Modern dashboard interfaces
- **2027** — Neo-Swiss minimalism
- **2039** — Glitch/cyberpunk aesthetic
- **Current** — Default clean design

Each theme is primarily implemented in CSS with light JavaScript for dynamic content generation where needed.

## Technical Approach

- **CSS-first**: Nearly all visual transformations, animations, and theme-specific styling is handled through CSS custom properties and data attributes
- **Minimal JS**: JavaScript is used sparingly for dial selectors and complex theme-specific effects (like the glitch theme's cursed text)
- **Semantic HTML**: The markup stays clean and semantic regardless of which theme is active
- **Web Components**: Custom `<dial-selector>` element for the theme picker
- **Responsive**: Works across different screen sizes and devices

## Project Structure

### Core Files

- `index.html` - Main interactive resume page with theme switcher
- `print.html` - Print-optimized resume page (minimal styling)
- `feed.xml.html` - RSS feed viewer (displayed with XML syntax highlighting)
- `theme-manager.js` - Handles theme switching and glitch effect setup
- `dialog-handlers.js` - Cookie banner and dialog management

### JavaScript Modules

- `dial-selector/` - Custom web component for theme/mode selection
  - Modular vanilla JavaScript with no build step
  - See `dial-selector/README.md` for architecture details

### Styles

- `assets/css/colors.css` - Global color palette (shared colors only)
- `assets/css/base-styles/` - Modular base CSS split into focused files
  - See `base-styles/STRUCTURE.md` for complete reference
- `assets/css/dial-selector-styles/` - Styles for the dial selector component
- `assets/css/themes/` - Theme-specific CSS overrides
  - Each theme in its own directory with modular structure
  - Theme-specific colors defined in theme files (not global colors.css)

## Made by Me

I designed and built all of this myself (with, of course, the help of modern developer tooling, AI assistants, and the collective wisdom of the web). The goal was to create something that demonstrates both technical skill and design sensibility.

If you're viewing this because you're considering me for a role, I hope it gives you a sense of how I think about UI, interaction design, and the craft of front-end engineering.

## Running Locally

This is a static site. Just open `index.html` in a browser, or serve it with any static file server:

```bash
# Using Python
python -m http.server 8000

# Using Node
npx serve

# Or just open the file
open index.html
```

---

**Zander Maxwell**
Design-focused Software Engineer
[zandermaxwell@hey.com](mailto:zandermaxwell@hey.com) • [LinkedIn](https://www.linkedin.com/in/zandermax) • [GitHub](https://github.com/zandermax)
