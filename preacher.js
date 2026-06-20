let faceMesh;
let handPose; 
let video;
let faces = [];
let hands = []; 
let isDetectingFace = false;
let isDetectingHand = false;

// 애니메이션 및 인터랙션을 위한 변수
let kneelAmount = 0; 
let particles = []; 

const lipsExterior = [267, 269, 270, 409, 291, 375, 321, 405, 314, 17, 84, 181, 91, 146, 61, 185, 40, 39, 37, 0];
const lipsInterior = [13, 312, 311, 310, 415, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95, 78, 191, 80, 81, 82];
const palmIndices = [0, 1, 5, 9, 13, 17];
const fingerSegments = [
  [1, 2], [2, 3], [3, 4], 
  [5, 6], [6, 7], [7, 8], 
  [9, 10], [10, 11], [11, 12], 
  [13, 14], [14, 15], [15, 16], 
  [17, 18], [18, 19], [19, 20]  
];

function preload() {
  faceMesh = ml5.faceMesh();
  handPose = ml5.handPose(); 
}

function setup() {
  const canvas = createCanvas(640, 480);
  canvas.parent("app");
  
  video = createCapture(VIDEO, function() {
    console.log("웹캠 준비 완료. 얼굴과 손 인식을 시작합니다.");
    faceMesh.detectStart(video, gotFaces);
    handPose.detectStart(video, gotHands); 
    isDetectingFace = true;
    isDetectingHand = true;
  });
  
  video.size(640, 480);
  video.hide(); 
}

function gotFaces(results) {
  faces = results;
}

function gotHands(results) {
  hands = results;
}

function draw() {
  background(0);

  // 1. 화면 상단 문구 추가 (글자가 뒤집히지 않도록 거울 모드 밖에 배치)
  fill(255);
  noStroke();
  textSize(15);
  textAlign(CENTER, TOP);
  text("Raise your hands and preach.", width / 2, 45);

  // 2. 하단 보라색 언덕
  fill(150, 50, 255); 
  ellipse(width / 2, height, width, 100);

  // 3. 사람 애니메이션 상태 계산
  let handVisible = (isDetectingHand && hands.length > 0);
  let targetKneel = handVisible ? 1 : 0;
  kneelAmount = lerp(kneelAmount, targetKneel, 0.1); 

  // 4. 언덕 위에 나란히 5명 그리기
  let spacing = 45; // 사람 사이의 가로 간격
  for (let i = -2; i <= 2; i++) {
    // 중앙(width/2)을 기준으로 -90, -45, 0, 45, 90 픽셀 위치에 배치
    let xPos = width / 2 + (i * spacing);
    drawCharacter(xPos, kneelAmount);
  }

  // 5. 입 벌림 감지 및 문자 스폰 (손이 보일 때만 작동)
  if (handVisible && isDetectingFace && faces.length > 0) {
    let face = faces[0];
    let pt13 = face.keypoints[13]; 
    let pt14 = face.keypoints[14];
    let mapped13 = mapCameraPoint(pt13);
    let mapped14 = mapCameraPoint(pt14);
    let cameraFit = getCameraFit();
    let mouthDist = dist(mapped13.x, mapped13.y, mapped14.x, mapped14.y);
    
    if (mouthDist > 11 * cameraFit.scale) {
      let spawnX = (mapped13.x + mapped14.x) / 2;
      let spawnY = (mapped13.y + mapped14.y) / 2;
      
      particles.push(new LetterParticle(spawnX, spawnY));
      particles.push(new LetterParticle(spawnX, spawnY));
    }
  }

  // 6. 문자들 업데이트 및 그리기
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
  // 7. 얼굴과 손 메쉬 렌더링
  if (isDetectingFace && faces.length > 0) {
    drawLips(); 
  }

  if (isDetectingHand && hands.length > 0) {
    drawHands(); 
  }
}

// --- 문자 파티클 클래스 ---
class LetterParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2.5, 2.5);
    this.vy = random(1.5, 4.5);
    this.alpha = 255;
    this.size = random(12, 22);
    
    let chars = "αβγδεζηθικλμνξοπρστυφχψω*+=-!?@#$";
    this.char = random(chars.split(''));
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    
    if (this.y > height - 110) {
      this.alpha -= 12; 
    }
  }
  
  display() {
    fill(255, this.alpha);
    noStroke();
    textSize(this.size);
    textAlign(CENTER, CENTER);
    text(this.char, this.x, this.y);
  }
  
  isDead() {
    return this.alpha <= 0 || this.y > height;
  }
}

// x 좌표 값을 받아 해당 위치에 사람을 그리는 구조로 변경
function drawCharacter(x, k) {
  push();
  translate(x, height - 30); // 인자로 받은 x 위치로 기준점 이동
  fill(220); 
  noStroke();

  let pelvisY = lerp(-45, -20, k); 
  translate(0, pelvisY);

  // 왼쪽 다리
  push();
  translate(-7, 10); 
  rotate(lerp(0, 0.4, k)); 
  ellipse(0, 10, 8, 20); 
  translate(0, 20); 
  rotate(lerp(0, -2.5, k)); 
  ellipse(0, 10, 7, 20); 
  pop();

  // 오른쪽 다리
  push();
  translate(7, 10); 
  rotate(lerp(0, -0.4, k)); 
  ellipse(0, 10, 8, 20); 
  translate(0, 20); 
  rotate(lerp(0, 2.5, k)); 
  ellipse(0, 10, 7, 20); 
  pop();

  // 몸통
  rectMode(CENTER);
  rect(0, -5, 20, 30, 4); 

  // 왼쪽 팔
  push();
  translate(-12, -15); 
  rotate(lerp(0.2, 0.6, k)); 
  ellipse(0, 10, 7, 20); 
  translate(0, 20); 
  rotate(lerp(0, -0.8, k)); 
  ellipse(0, 10, 6, 20); 
  pop();

  // 오른쪽 팔
  push();
  translate(12, -15); 
  rotate(lerp(-0.2, -0.6, k));
  ellipse(0, 10, 7, 20); 
  translate(0, 20); 
  rotate(lerp(0, 0.8, k)); 
  ellipse(0, 10, 6, 20); 
  pop();

  // 머리
  ellipse(0, -28, 18, 18); 

  pop();
}

function getCameraFit() {
  const sourceW = video && video.elt ? (video.elt.videoWidth || video.width || width) : width;
  const sourceH = video && video.elt ? (video.elt.videoHeight || video.height || height) : height;
  const scale = Math.min(width / sourceW, height / sourceH);

  return {
    scale,
    offsetX: (width - sourceW * scale) / 2,
    offsetY: (height - sourceH * scale) / 2,
  };
}

function mapCameraPoint(point, mirror = true) {
  const fit = getCameraFit();
  const x = fit.offsetX + point.x * fit.scale;
  const y = fit.offsetY + point.y * fit.scale;

  return {
    x: mirror ? width - x : x,
    y,
  };
}
function drawLips() {
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    fill(255, 50, 100); 
    noStroke(); 
    beginShape();
    for (let j = 0; j < lipsExterior.length; j++) {
      let index = lipsExterior[j];
      let keypoint = face.keypoints[index];
      let mapped = mapCameraPoint(keypoint);
      vertex(mapped.x, mapped.y);
    }
    beginContour();
    for (let j = lipsInterior.length - 1; j >= 0; j--) {
      let index = lipsInterior[j];
      let keypoint = face.keypoints[index];
      let mapped = mapCameraPoint(keypoint);
      vertex(mapped.x, mapped.y);
    }
    endContour(); 
    endShape(CLOSE); 
  }
}

function drawHands() {
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    fill(255, 50, 100); 
    noStroke();
    
    beginShape();
    for (let j = 0; j < palmIndices.length; j++) {
      let index = palmIndices[j];
      let keypoint = hand.keypoints[index];
      let mapped = mapCameraPoint(keypoint);
      vertex(mapped.x, mapped.y);
    }
    endShape(CLOSE);
    
    for (let j = 0; j < fingerSegments.length; j++) {
      let pt1 = mapCameraPoint(hand.keypoints[fingerSegments[j][0]]); 
      let pt2 = mapCameraPoint(hand.keypoints[fingerSegments[j][1]]); 
      let midX = (pt1.x + pt2.x) / 2;
      let midY = (pt1.y + pt2.y) / 2;
      let d = dist(pt1.x, pt1.y, pt2.x, pt2.y);
      let angle = atan2(pt2.y - pt1.y, pt2.x - pt1.x);
      
      push();
      translate(midX, midY); 
      rotate(angle);         
      ellipse(0, 0, d, 14); 
      pop();
    }
  }
}
