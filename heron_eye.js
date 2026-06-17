let w = 40;
let boxes = [];
let cols, rows;
let colors = [
  '#2E294E',
  '#541388',
  '#F1E9DA',
  '#FFD400',
  '#D90368'
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();

  cols = ceil(width / w) + 1;
  rows = ceil(height / w) + 1;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w + w / 2;
      let y = j * w + w / 2;
      boxes.push(new Box(x, y, w));
    }
  }
}

function draw() {
  background(0);

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].update();
    boxes[i].show();
  }
}

class Box {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.scl = 1;
    this.angle = 0;
    this.col = colors[0];
    this.alpha = 0;
  }

  update() {
    let distance = dist(this.x, this.y, mouseX, mouseY);
    let range = 200;

    this.scl = map(distance, 0, range, 0.2, 1);
    this.angle = map(distance, 0, range, PI * 4, 0);

    this.scl = constrain(this.scl, 0.2, 1);
    this.angle = constrain(this.angle, 0, PI * 4);

    let n = map(distance, 0, range, 0, colors.length - 1);
    let index = floor(constrain(n, 0, colors.length - 1));
    this.col = colors[index];

    
    this.alpha = map(distance, 0, range, 255, 0);
    this.alpha = constrain(this.alpha, 0, 255);
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    scale(this.scl);

    
    let c = color(this.col);
    c.setAlpha(this.alpha);
    fill(c);
    
    rect(0, 0, this.size * 2, this.size * 2);
    
    pop();
  }
}