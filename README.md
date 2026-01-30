# berndsen.dev

Personal website with a Markdown-based blog.

## Directory structure

```
.
├── index.html          # Main landing page
├── style.css           # Shared styles
├── script.js           # Grid animation
└── blog/
    ├── index.html      # Auto-generated post listing
    ├── template.html   # Pandoc HTML template
    ├── posts/          # Markdown source files
    ├── pub/            # Generated HTML (do not edit by hand)
    └── tools/
        └── publish.sh  # Builds blog HTML from posts
```

## Writing a post

1. Create a Markdown file in `blog/posts/` named `YYYY-MM-DD-title.md` (e.g. `2026-01-30-hello-world.md`).
2. Write your content in standard Markdown.
3. Run `blog/tools/publish.sh` to generate the HTML.
4. Commit the results.

## Publishing

```sh
blog/tools/publish.sh
```

This script:

1. Finds all `.md` files in `blog/posts/`.
2. Converts each to HTML in `blog/pub/` using `pandoc --template=blog/template.html`.
3. Regenerates `blog/index.html` with all posts listed newest-first.

Requires [pandoc](https://pandoc.org/) to be installed.
