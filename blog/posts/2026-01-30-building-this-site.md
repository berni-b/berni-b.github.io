# The Motivation of Building This Site

As a change of pace from my usual work revolving around AI/ML pipelines and concerning myself with the question of how we can make intelligence(artificial or human) fail safely in a predictable manner, I choose to go the exact opposite direction. Not every system needs to be hyper intelligent and therefore overly complex. Sometimes minimal tools, a well defined problem space and a focus is all it takes. I wanted a personal site that was fast, minimal, and didn't look like every other developer portfolio.

That means:
- No bloated JavaScript frameworks.
- No heavy build pipelines.
- Just simple tools like plain HTML, CSS, vanilla JS and Bash.

For part of the implementation I used Claude, since my front end skills have gotten a little rusty over the years.

## The visual design

The visual language is inspired by Bauhaus — geometry, primary colors, no decoration. The centerpiece is a 5x5 grid of circles that fades from light to dark using a simple color interpolation:

```javascript
const fade = (i + j) / (2 * (gridSize - 1));
const rgb = interpolateColor(light, dark, fade);
```

Each page load, three dots are randomly placed in the grid: red for GitHub, yellow for the blog, and blue for LinkedIn. Hovering over any of them reveals the label in the footer, color-matched. It's a small interaction that rewards curiosity without demanding it — the bottom nav has the same links for anyone who doesn't hover.

## No build step

The entire site is static HTML and a single CSS file shared across the landing page and blog. Blog posts are written in Markdown and converted to HTML using a simple template with `$title$`, `$date$`, and `$body$` placeholders. No static site generator, no Node, just pandoc as the only external dependency.

The file structure is flat:

```
index.html
style.css
script.js
blog/
  index.html
  template.html
  tools/
    publish.sh
  posts/
    <contains the blog posts in .md format>
  pub/
    <contains the rendered html>

```

## The grid animation

Circles animate in with a staggered `pop-in` effect. The delay is based on grid position:

```javascript
const delay = (i + j) * 60;
```

This creates a diagonal wave from top-left to bottom-right. The animation itself is pure CSS:

```css
.circle {
  opacity: 0;
  transform: scale(0);
  animation: pop-in 0.4s ease forwards;
}

@keyframes pop-in {
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

## Data-driven colored dots

Rather than hardcoding each colored circle with if/else branches, the three special dots are defined as a data array:

```javascript
const circles = [
  { index: redIndex, className: 'circle', href: '...', label: 'GitHub', color: '#e04545' },
  { index: yellowIndex, className: 'circle yellow', href: '...', label: 'Blog', color: '#FFD300' },
  { index: blueIndex, className: 'circle blue', href: '...', label: 'LinkedIn', color: '#0A66C2' },
];
```

The grid loop checks each cell against this array. Adding a new colored dot means adding one object to the array — no logic changes needed.

## Tradeoffs

There are things this site intentionally doesn't do:

- **No JavaScript framework.** The entire script is 70 lines. A framework would add weight for no benefit.
- **No CMS or static site generator.** Publishing a post means writing Markdown, running it through the template, and committing. This is fine at low volume.
- **No analytics.** I don't need to track visitors. If someone reads a post, they'll reach out or they won't.

The constraint was to keep the total payload under what a single React component would cost. The entire site — HTML, CSS, JS, all pages — is smaller than most hero images.

## What I'd change

If the blog grows beyond a handful of posts, the manual template workflow won't scale. At that point I'd add a small build script — probably a 20-line shell script that loops over Markdown files and generates HTML. Still no framework, just automation for the repetitive parts.

## Resources

[https://github.com/berni-b/berni-b.github.io](https://github.com/berni-b/berni-b.github.io)
