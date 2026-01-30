const gridSize = 5;
const grid = document.getElementById('grid');
const footerLabel = document.getElementById('footer-label');

const totalCells = gridSize * gridSize;

function pickDistinctIndices(count) {
  const indices = [];
  while (indices.length < count) {
    const idx = Math.floor(Math.random() * totalCells);
    if (!indices.includes(idx)) indices.push(idx);
  }
  return indices;
}

const [redIndex, yellowIndex, blueIndex] = pickDistinctIndices(3);

const circles = [
  { index: redIndex, className: 'circle', href: 'https://github.com/berni-b/', target: '_blank', label: 'GitHub', color: '#e04545' },
  { index: yellowIndex, className: 'circle yellow', href: 'blog/index.html', target: null, label: 'Blog', color: '#FFD300' },
  { index: blueIndex, className: 'circle blue', href: 'https://www.linkedin.com/in/bastian-b-817037156/', target: '_blank', label: 'LinkedIn', color: '#0A66C2' },
];

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
    const coloredCircle = circles.find(c => c.index === idx);

    if (coloredCircle) {
      const circleLink = document.createElement('a');
      circleLink.className = coloredCircle.className;
      circleLink.href = coloredCircle.href;
      if (coloredCircle.target) {
        circleLink.target = coloredCircle.target;
        circleLink.rel = 'noopener';
      }
      circleLink.style.animationDelay = `${delay}ms`;
      circleLink.addEventListener('mouseenter', () => {
        footerLabel.textContent = coloredCircle.label;
        footerLabel.style.color = coloredCircle.color;
      });
      circleLink.addEventListener('mouseleave', () => {
        footerLabel.textContent = '';
      });
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
