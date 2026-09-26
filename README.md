# Anurag Merugu — Portfolio

**Live:** https://anuragon1.github.io

A personal portfolio site: dark theme with red accents, a full-bleed hero, and a layout that works on desktop and on phones.

Built with plain **HTML, CSS and JavaScript**. There's no build step and nothing to install.

## Run it

Open `index.html` in a browser. To serve it locally instead:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

It's hosted on **GitHub Pages** from the `main` branch. Anything merged into `main` goes live within a minute or two.

## Structure

```
index.html              page markup (all content lives here)
assets/css/style.css    styles and responsive breakpoints
assets/js/main.js       mobile menu, scroll reveal, stat counters, active nav link
assets/img/             portrait (background removed) and project screenshots
```

## Updating content

All content is in `index.html`:

- **Hero stats**: the `data-count` numbers (the count-up animation reads these)
- **Experience**: one `<li class="job">` per role. Copy a block to add a new job.
- **Projects**: copy an `<article class="project">` block, drop a 16:10 screenshot into `assets/img/`, and update the link and text. Project 03 is a "Coming Soon" placeholder.
