let colors = ['#ff0000', '#ff9100', '#74dbf7', '#37ff00'];
let w = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function mousePressed() {
  redraw();
}

function draw() {
  background(255);
  
  let cols = ceil(width / w);
  let rows = ceil(height / w);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * w;
      drawNetwork(x, y, w);
    }
  }
}

function drawNetwork(x, y, w) {
  let points = [];
  let numPoints = floor(random(4, 9));
  let shapes = ['circle', 'square', 'triangle'];

  for (let i = 0; i < numPoints; i++) {
    points.push({
      px: x + random(w * 0.15, w * 0.85),
      py: y + random(w * 0.15, w * 0.85),
      size: random(8, 24),
      col: random(colors),
      shapeType: random(shapes)
    });
  }

  noFill();
  stroke(255, 80);
  strokeWeight(2);
  
  beginShape();
  for (let i = 0; i < points.length; i++) {
    vertex(points[i].px, points[i].py);
  }
  endShape(CLOSE);

  noStroke();
  for (let i = 0; i < points.length; i++) {
    fill(points[i].col);
    
    let px = points[i].px;
    let py = points[i].py;
    let s = points[i].size;

    if (points[i].shapeType === 'circle') {
      circle(px, py, s);
    } else if (points[i].shapeType === 'square') {
      square(px - s / 2, py - s / 2, s);
    } else if (points[i].shapeType === 'triangle') {
      triangle(px, py - s / 2, px - s / 2, py + s / 2, px + s / 2, py + s / 2);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}