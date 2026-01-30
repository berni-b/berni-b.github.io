#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
POSTS_DIR="$REPO_ROOT/blog/posts"
PUB_DIR="$REPO_ROOT/blog/pub"
TEMPLATE="$REPO_ROOT/blog/template.html"
INDEX="$REPO_ROOT/blog/index.html"

if [ ! -d "$POSTS_DIR" ]; then
  echo "No posts directory found at $POSTS_DIR"
  exit 1
fi

shopt -s nullglob
posts=("$POSTS_DIR"/*.md)
shopt -u nullglob

if [ ${#posts[@]} -eq 0 ]; then
  echo "No .md files found in $POSTS_DIR"
  exit 0
fi

mkdir -p "$PUB_DIR"

# Convert each post to HTML
for md in "${posts[@]}"; do
  basename="$(basename "$md" .md)"
  html="$PUB_DIR/$basename.html"

  date="${basename:0:10}"
  raw_title="${basename:11}"
  title="$(echo "$raw_title" | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')"

  pandoc "$md" \
    --template="$TEMPLATE" \
    --metadata title="$title" \
    --metadata date="$date" \
    --standalone \
    -o "$html"

  echo "Generated $html"
done

# Generate blog index page
cat > "$INDEX" <<'HEADER'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Blog — berndsen.dev</title>
    <link rel="stylesheet" href="../style.css" type="text/css" media="screen">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23e04545'/></svg>">
  </head>
  <body class="blog-page">
    <header class="blog-header">
      <a href="../index.html" class="back-link">&larr; berndsen.dev</a>
    </header>
    <main class="blog-index">
      <h1>Blog</h1>
      <ul class="post-list">
HEADER

for md in $(ls -r "$POSTS_DIR"/*.md 2>/dev/null); do
  basename="$(basename "$md" .md)"
  date="${basename:0:10}"
  raw_title="${basename:11}"
  title="$(echo "$raw_title" | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')"
  echo "        <li><time>$date</time> <a href=\"pub/$basename.html\">$title</a></li>" >> "$INDEX"
done

cat >> "$INDEX" <<'FOOTER'
      </ul>
    </main>
    <footer class="blog-footer">
      <a href="../index.html" class="back-link">&larr; berndsen.dev</a>
    </footer>
  </body>
</html>
FOOTER

echo "Generated $INDEX"
