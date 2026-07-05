# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running Locally

No build step — open `index.html` directly in a browser, or serve with:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

VS Code Live Server extension also works (right-click `index.html` → Open with Live Server).

## Architecture

Pure static site — no framework, no bundler, no package manager.

**CSS split:**
- `css/style.css` — global tokens (CSS variables), navbar, footer, buttons, cursor, particles, animations
- `css/pages.css` — layout primitives (`.grid-2/3/4`, `.section`, `.page-hero`), card variants (`.service-card`, `.project-card`, `.stat-card`), contact form, timeline, CTA strip

Every page imports both files. All design tokens live as CSS custom properties in `:root` inside `style.css` — always change colors/spacing there, never inline.

**JS:** `js/main.js` is the single script loaded by every page. It initialises AOS animations, the typing effect (hero only), navbar scroll-hide/show, mobile menu, active link detection, smooth page fade transitions, animated cursor with two trailing dots, and floating particles in the hero section.

**External CDNs (no local copies):**
- `https://unpkg.com/aos@2.3.1` — scroll animations (`data-aos` attributes on elements)
- `https://unpkg.com/lucide@latest` — icon library (`<i data-lucide="icon-name">` + `lucide.createIcons()` inline script on each page)
- Google Fonts Inter

**Page map:**
- `index.html` — homepage with hero, services preview, projects preview, CTA
- `about.html` — stats, timeline, tech stack
- `services.html` — 4 service cards linking to detail pages
- `projects.html` — project grid
- `contact.html` — contact form + info cards
- `descriptions/` — detail pages for each service (ai-sales-agent, ai-receptionist, rag-chatbot, workflow-automation)
- `service-*.html` — alternate service landing pages (root level)

## Conventions

**Adding a new page:** Copy the nav + mobile-menu + footer block from any existing page verbatim. Add `class="active"` to the correct nav link. Include both CSS files and both CDN scripts plus the `lucide.createIcons()` inline call before `main.js`.

**Scroll animations:** Add `data-aos="fade-up"` (or `fade-left`, `zoom-in`) to any element. Delay with `data-aos-delay="100"`. AOS is already initialised in `main.js`.

**Icons:** Use `<i data-lucide="icon-name"></i>` — icon names come from the Lucide icon set.

**Active nav link:** `main.js` auto-detects the active page by filename, but each page also hard-codes `class="active"` on its own nav link as a fallback for direct-open (non-server) scenarios.

**Color palette (from `--` vars in style.css):**
- `--accent-cyan: #00d4ff` — primary accent
- `--accent-purple: #9b51e0`
- `--accent-blue: #378ADD`
- `--accent-green: #27ae60`
- `--bg-color: #0a0a0a`, `--card-bg: #111111`, `--border-color: #1a1a1a`
