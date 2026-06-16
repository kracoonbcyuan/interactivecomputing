let crawlers = []; 
let ripples = [];  
let target = null; 
let numCrawlers = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(150, 210, 255); 
  
  target = { x: width / 2, y: height / 2 };
  
  for (let i = 0; i < numCrawlers; i++) {
    crawlers.push(new Crawler());
  }
}

function draw() {
  
  background(150, 210, 255); 

  
  for (let i = ripples.length - 1; i >= 0; i--) {
    let r = ripples[i];
    r.update();
    r.display();
    
    
    if (r.isDead()) {
      ripples.splice(i, 1);
    }
  }

  
  for (let i = crawlers.length - 1; i >= 0; i--) {
    let c = crawlers[i];
    c.update();
    c.display();
    
    if (c.isLeaving && c.isOffScreen()) {
      crawlers.splice(i, 1);
    }
  }
}

function mousePressed() {
  target = { x: mouseX, y: mouseY };
  
  
  ripples.push(new Ripple(mouseX, mouseY));
  
  for (let i = 0; i < 3; i++) {
    crawlers.push(new Crawler());
  }
}


class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10;        
    this.alpha = 150;   
  }
  
  update() {
    this.r += 1.5;      
    this.alpha -= 2.5;  
  }
  
  display() {
    noFill();
    
    stroke(20, 80, 150, this.alpha); 
    strokeWeight(2);
    ellipse(this.x, this.y, this.r, this.r);
  }
  
  isDead() {
    
    return this.alpha <= 0;
  }
}


class Crawler {
  constructor() {
    this.history = []; 
    this.age = 0;      
    this.lifespan = random(300, 600); 
    this.isLeaving = false; 
    this.spawn(); 
  }
  
  spawn() {
    this.history = []; 
    let edge = floor(random(4)); 
    let offset = 50; 
    
    if (edge === 0) {
      this.x = random(width);
      this.y = -offset;
    } else if (edge === 1) {
      this.x = width + offset;
      this.y = random(height);
    } else if (edge === 2) {
      this.x = random(width);
      this.y = height + offset;
    } else {
      this.x = -offset;
      this.y = random(height);
    }
    
    let initialAngle = atan2(height/2 - this.y, width/2 - this.x) + random(-0.5, 0.5);
    this.dx = cos(initialAngle) * random(1, 2);
    this.dy = sin(initialAngle) * random(1, 2);
  }
  
  update() {
    this.age++; 
    
    if (this.age > this.lifespan) {
      this.isLeaving = true;
    }

    this.dx += random(-0.3, 0.3);
    this.dy += random(-0.3, 0.3);
    
    if (!this.isLeaving) {
      if (target) {
        let angle = atan2(target.y - this.y, target.x - this.x);
        this.dx += cos(angle) * 0.15; 
        this.dy += sin(angle) * 0.15;
      }
    } else {
      let exitAngle = atan2(this.dy, this.dx);
      this.dx += cos(exitAngle) * 0.2; 
      this.dy += sin(exitAngle) * 0.2;
    }
    
    let speed = sqrt(this.dx * this.dx + this.dy * this.dy);
    let maxSpeed = this.isLeaving ? 5 : 3.5; 
    if (speed > maxSpeed) {
      this.dx = (this.dx / speed) * maxSpeed;
      this.dy = (this.dy / speed) * maxSpeed;
    }
    
    this.x += this.dx;
    this.y += this.dy;

    this.history.push(createVector(this.x, this.y));
    if (this.history.length > 20) { 
      this.history.shift(); 
    }
  }

  isOffScreen() {
    let margin = 100;
    return (this.x < -margin || this.x > width + margin || 
            this.y < -margin || this.y > height + margin);
  }
  
  display() {
    noStroke();
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      let alpha = map(i, 0, this.history.length, 0, 150);
      let r = map(i, 0, this.history.length, 0, 14);
      
      fill(255, 255, 255, alpha);
      ellipse(pos.x, pos.y, r, r);
    }

    let angle = atan2(this.dy, this.dx);
    
    push();
    translate(this.x, this.y);
    rotate(angle); 
    
    noStroke();
    
    fill(200, 200); 
    triangle(4, 4, -5, 13, -2, 4); 
    triangle(4, -4, -5, -13, -2, -4); 

    fill(220);
    triangle(-10, 0, -25, -8, -25, 8);
    fill(0, 30); 
    triangle(-25, 0, -25, -8, -25, 8);

    fill(255);
    ellipse(0, 0, 26, 12); 
    
    fill(255, 80, 80);
    ellipse(-2, 0, 10, 6);
    ellipse(4, 0, 6, 4);
    
    fill(30);
    ellipse(8, -3.5, 2.5, 2.5); 
    ellipse(8, 3.5, 2.5, 2.5);  

    pop();
  }
}