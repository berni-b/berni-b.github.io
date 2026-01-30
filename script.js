const gridSize = 5;
const grid = document.getElementById('grid');

const redIndex = Math.floor(Math.random() * gridSize * gridSize);
let yellowIndex;
do {
  yellowIndex = Math.floor(Math.random() * gridSize * gridSize);
} while (yellowIndex === redIndex);

function interpolateColor(color1, color2, factor) {
  return color1.map((c, i) => Math.round(c + (color2[i] - c) * factor));
}

const light = [204, 204, 204]; // #ccc
const dark = [34, 34, 34];     // #222

for (let i = 0; i < gridSize; i++) {
  for (let j = 0; j < gridSize; j++) {
    const idx = i * gridSize + j;
    const cell = document.createElement('div');
    cell.className = 'cell';

    const delay = (i + j) * 60;

    if (idx === redIndex) {
      const circleLink = document.createElement('a');
      circleLink.className = 'circle';
      circleLink.href = 'https://github.com/berni-b/';
      circleLink.target = '_blank';
      circleLink.rel = 'noopener';
      circleLink.style.animationDelay = `${delay}ms`;
      cell.appendChild(circleLink);
    } else if (idx === yellowIndex) {
      const circleLink = document.createElement('a');
      circleLink.className = 'circle yellow';
      circleLink.href = 'blog/index.html';
      circleLink.style.animationDelay = `${delay}ms`;
      cell.appendChild(circleLink);
    } else {
      const circle = document.createElement('div');
      circle.className = 'circle';
      const fade = (i + j) / (2 * (gridSize - 1));
      const rgb = interpolateColor(light, dark, fade);
      circle.style.background = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
      circle.style.animationDelay = `${delay}ms`;
      cell.appendChild(circle);
    }

    grid.appendChild(cell);
  }
}
