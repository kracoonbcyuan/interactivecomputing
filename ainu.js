let img;
let img2; 
let targetPoints = []; 

let stepSize = 10; 
let threshold = 50; 

let imgOffsetX = 200; 
let imgOffsetY = 90; 

function preload() {
  img = loadImage('ainu2.png'); 
  img2 = loadImage('ainu5.png'); 
}

function setup() {
  createCanvas(1800, 1800);
  pixelDensity(3); 
  
  noLoop(); 

  img2.resize(50, 0); 
  img2.loadPixels();
  
  let offsetX = 250; 
  let offsetY = 1500; 

  for (let y = 0; y < img2.height; y++) {
    for (let x = 0; x < img2.width; x++) {
      let index = (y * img2.width + x) * 4;
      let a = img2.pixels[index + 3]; 
      
      if (a > 0) {
        targetPoints.push({ x: x + offsetX, y: y + offsetY });
      }
    }
  }
}

function draw() {
  background(255);
  img.loadPixels();

  for (let y = 0; y < img.height; y += stepSize) {
    for (let x = 0; x < img.width; x += stepSize) {
      
      let index = (y * img.width + x) * 4;

      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let a = img.pixels[index + 3];

      if (a === 0) continue;

      let brightness = (r + g + b) / 3;

      if (brightness < threshold) {
        
        noFill();
        stroke('#0558FFFF');
        strokeWeight(random(0.04, 0.08));
        
        let cx = img.width / 2;
        let cy = img.height / 2;

        let dx = (x + stepSize / 2) - cx;
        let dy = (y + stepSize / 2) - cy;

        let angleX = PI / 3.5; 
        let angleY = PI / 7; 

        let z = dy * sin(angleX);
        let rotatedY = dy * cos(angleX);

        let rotatedX = dx * cos(angleY) + z * sin(angleY);
        let rotatedZ = -dx * sin(angleY) + z * cos(angleY);

        let fov = 600; 
        let scale = fov / (fov + rotatedZ);

        let startX = cx + rotatedX * scale + imgOffsetX;
        let startY = cy + rotatedY * scale + imgOffsetY;
        
        let randomTarget = random(targetPoints);
        
        let endX = randomTarget ? randomTarget.x : 0; 
        let endY = randomTarget ? randomTarget.y : 0; 

        let steps = 6; 

        beginShape();
        for (let i = 0; i <= steps; i++) {
          let t = i / steps;
          let currentX = lerp(startX, endX, t);
          let currentY = lerp(startY, endY, t);

          if (i > 0 && i < steps) {
            currentX += random(-30, 30); 
            currentY += random(-30, 30); 
          }
          
          vertex(currentX, currentY);
        }
        endShape();
        
        stroke('#00209EFF');
        strokeWeight(random(0.1, 0.3));
        
        ellipse(startX, startY, random(1, 10), random(20, 50));
      }
    }
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('my_generative_art', 'png');
    console.log("이미지가 성공적으로 저장되었습니다!");
  }
}