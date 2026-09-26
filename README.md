# Anurag Mergu — Portfolio

A personal portfolio site: dark theme with red accents, a full-bleed hero, and a layout that works on desktop and on phones.

Built with plain **HTML, CSS and JavaScript**. There's no build step and nothing to install.

## Run it

Open `index.html` in a browser. To serve it locally instead:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

To host it for free, turn on **GitHub Pages** (Settings → Pages → deploy from branch, root folder).

## Structure

```
index.html              page markup (all content lives here)
assets/css/style.css    styles and responsive breakpoints
assets/js/main.js       mobile menu, scroll reveal, stat counters, active nav link
assets/img/             portrait (background removed) and project screenshots
```

## Things to personalise

Search `index.html` for `EDIT:` comments:

- **Education**: degree, college, years
- **Contact**: email address (currently a placeholder) and city
- **Stats** in the hero: the numbers and labels
- **Project 03**: replace the "Coming Soon" card with your next project

To add a project, copy one `<article class="project">` block, drop a 16:10 screenshot into `assets/img/`, and update the link and text.
