let blobs = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  noStroke();

  for (let i = 0; i < 20; i++) {
    blobs.push(new BlobObj(random(width), random(height)));
  }
}

function draw() {
  // 기존 (20, 0, 10) 대신 (0, 0, 0)인 완전한 검은색으로 덮어서 탁한 흔적을 없앱니다.
  // 0.08은 잔상의 길이를 결정합니다. (숫자가 작을수록 꼬리가 길어짐)
  background(0, 0, 0, 0.08);

  for (let b of blobs) {
    b.update();
    b.show();
    b.edges();
  }
}

class BlobObj {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(0.5, 2));
    this.r = random(40, 120);
    
    this.zoff = random(1000); 
    this.noiseMax = random(0.5, 2); 
    this.hue = random(360);
  }

  update() {
    this.pos.add(this.vel);
    this.zoff += 0.01;
  }

  edges() {
    if (this.pos.x > width + this.r) this.pos.x = -this.r;
    if (this.pos.x < -this.r) this.pos.x = width + this.r;
    if (this.pos.y > height + this.r) this.pos.y = -this.r;
    if (this.pos.y < -this.r) this.pos.y = height + this.r;
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(this.hue, 80, 80, 0.8);

    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.1) {
      let xoff = map(cos(a), -1, 1, 0, this.noiseMax);
      let yoff = map(sin(a), -1, 1, 0, this.noiseMax);

      let r = map(noise(xoff, yoff, this.zoff), 0, 1, this.r * 0.5, this.r * 1.5);

      let x = r * cos(a);
      let y = r * sin(a);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}