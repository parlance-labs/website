# Parlance Labs Website

Quarto static site with custom dark theme styling.

## Key Files

- `custom.scss` - Main styling (SCSS variables, CSS rules, responsive design)
- `_quarto.yml` - Site config, navbar, sidebar structure
- `index.css` / `services.css` - Page-specific styles
- `education/_metadata.yml` - Education section metadata
- `education/education.css` - Education-specific styles (enables search)

## Navbar (Bootstrap + Quarto)

The navbar uses Bootstrap classes that require `!important` overrides:

- `.navbar-brand-container.mx-auto` - Centers the logo; override with `margin: 0 !important` on mobile to pack items left
- `.navbar-nav.me-auto` - Has auto right margin; may need explicit margin overrides
- `.navbar-logo.dark-content` / `.navbar-logo.light-content` - Two logo images for themes; hide/show with CSS based on theme

Mobile navbar fix pattern:
```scss
@media (max-width: 991.98px) {
  .navbar .navbar-brand-container,
  .navbar .navbar-brand-container.mx-auto {
    margin: 0 !important;
    padding-left: 0.75rem !important;
  }
  .navbar .navbar-brand {
    margin-right: 0.5rem !important;
  }
}
```

## Search Visibility

Search is hidden globally in `custom.scss`:
```scss
#quarto-search {
  display: none !important;
}
```

Re-enabled for education pages in `education/education.css`:
```scss
#quarto-search {
  display: flex !important;
}
```

## Design System

CSS custom properties defined in `:root` with `--pl-` prefix:
- `--pl-bg-primary: #0f1114` (dark background)
- `--pl-accent: #38bdf8` (electric blue)
- `--pl-text-primary: #f4f4f5`

## Build & Preview

```bash
quarto preview  # Local dev server
quarto render   # Build site
```
