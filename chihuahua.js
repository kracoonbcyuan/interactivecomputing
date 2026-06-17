let img;
let smallImg;

const gridResolution = 50;
const maxHeight = 200;
const maxTiltAngle = 60;
const interactRadius = 400;

let divW, divH;

function preload() {
  img = loadImage('chihuahua.jpg'); 
}

function setup() {
  createCanvas(800, 600, WEBGL);
  noSmooth(); 

  let aspect = img.height / img.width;
  let smallW = gridResolution;
  let smallH = floor(gridResolution * aspect);
  smallImg = createImage(smallW, smallH);
  smallImg.copy(img, 0, 0, img.width, img.height, 0, 0, smallW, smallH);
  
  let renderW = 500;
  let renderH = renderW * aspect;
  divW = renderW / smallW;
  divH = renderH / smallH;
}

function draw() {
  background(255);
  orbitControl(); 

  ambientLight(80);
  directionalLight(255, 255, 255, 0.5, 1, -0.5);

  smallImg.loadPixels();
  
  rotateX(PI / 3); 
  translate(-smallImg.width * divW / 2, -smallImg.height * divH / 2, 0);

  push();
  texture(img);
  noStroke();
  rect(0, 0, smallImg.width * divW, smallImg.height * divH);
  pop();

  noStroke();

  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;

  for (let y = 0; y < smallImg.height; y++) {
    for (let x = 0; x < smallImg.width; x++) {
      let index = (x + y * smallImg.width) * 4;
      let r = smallImg.pixels[index];
      let g = smallImg.pixels[index + 1];
      let b = smallImg.pixels[index + 2];
      
      fill(r, g, b);

      let brightness = (r + g + b) / 3;
      let h = map(brightness, 0, 255, 5, maxHeight);

      let posX = x * divW + divW / 2;
      let posY = y * divH + divH / 2;

      push();
      translate(posX, posY, 0);

      let d = dist(posX - (smallImg.width * divW / 2), posY - (smallImg.height * divH / 2), mx, my);

      let tiltAngle = map(d, 0, interactRadius, 0, radians(maxTiltAngle), true);

      let angleToMouse = atan2(my - (posY - (smallImg.height * divH / 2)), mx - (posX - (smallImg.width * divW / 2)));

      rotateZ(angleToMouse);
      rotateY(-tiltAngle);

      translate(0, 0, h / 2);
      
      box(divW * 0.8, divH * 0.8, h);

      pop();
    }
  }
}