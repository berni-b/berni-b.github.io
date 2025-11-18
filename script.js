const gridSize = 5;
const grid = document.getElementById('grid');

// Pick a random cell to be red
const redIndex = Math.floor(Math.random() * gridSize * gridSize);

// Helper to interpolate between two colors
function interpolateColor(color1, color2, factor) {
  return color1.map((c, i) => Math.round(c + (color2[i] - c) * factor));
}

const light = [204, 204, 204]; // #ccc
const dark = [34, 34, 34];     // #222

for(let i=0; i<gridSize; i++) {
  for(let j=0; j<gridSize; j++) {
    const idx = i * gridSize + j;
    const cell = document.createElement('div');
    cell.className = 'cell';
    const circle = document.createElement('div');
    circle.className = 'circle';

    if(idx === redIndex) {
      circle.style.background = 'red';
    } else {
      // Fade: diagonal from top-left to bottom-right
      const fade = (i + j) / (2 * (gridSize - 1));
      const rgb = interpolateColor(light, dark, fade);
      circle.style.background = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    }

    cell.appendChild(circle);
    grid.appendChild(cell);
  }
}
