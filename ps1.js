let angle = 0;

function setup() {

  let canvas = createCanvas(320, 240, WEBGL);
  
  canvas.style('width', '640px'); 
  canvas.style('height', '480px');
  canvas.style('image-rendering', 'pixelated');
}

function draw() {
  background(20);
  
  
  directionalLight(200, 200, 200, 1, 1, -1);
  ambientLight(80);

  
  angle += 0.02;
  let quantizedAngle = floor(angle * 12) / 12; 

  rotateX(quantizedAngle);
  rotateY(quantizedAngle);

  
  fill(150, 150, 255);
  noStroke(); 

  sphere(60, 5, 5); 
  
 
  fill(255, 100, 100);
  for(let i = 0; i < 4; i++) {
    push();
    rotateY(quantizedAngle * (i + 1));
    translate(100, 0, 0);
    box(25);
    pop();
  }
}