let classifier;
let video;
let label = "loading...";

let svgSad, svgWalk1, svgWalk2, svgHappy;

let imgWidth = 240;
let imgHeight = 484;

let charX, charY;
let isWalking = false;
let facingRight = false;

let actionTimer = 0;
let currentAction = "stop";
let isClassifying = false;

let imageModelURL = "https://teachablemachine.withgoogle.com/models/wGz-cX6Lm/";

function setup() {
  createCanvas(windowWidth, windowHeight);

  video = createCapture(VIDEO, startClassifier);
  video.size(640, 480);
  video.hide();

  svgSad = createImg("sadman.svg", "sad");
  svgWalk1 = createImg("walkingman1.svg", "walk1");
  svgWalk2 = createImg("walkingman2.svg", "walk2");
  svgHappy = createImg("happyman.svg", "happy");

  let svgs = [svgSad, svgWalk1, svgWalk2, svgHappy];
  for (let i = 0; i < svgs.length; i++) {
    svgs[i].size(imgWidth, imgHeight);
    svgs[i].hide();
  }

  charX = width / 2;
  charY = height / 2;
}

function draw() {
  background(255);

  svgSad.hide();
  svgWalk1.hide();
  svgWalk2.hide();
  svgHappy.hide();

  if (label === "fire") {
    updateSvg(svgHappy, charX, charY, facingRight);
    svgHappy.show();
  } else if (label === "loaded") {
    actionTimer--;

    if (actionTimer <= 0) {
      let r = floor(random(3));
      if (r === 0) currentAction = "stop";
      else if (r === 1) currentAction = "left";
      else if (r === 2) currentAction = "right";

      actionTimer = floor(random(60, 180));
    }

    if (currentAction === "stop") {
      isWalking = false;
    } else if (currentAction === "left") {
      isWalking = true;
      facingRight = false;
      charX -= 5;

      if (charX <= imgWidth / 2) {
        charX = imgWidth / 2;
        currentAction = "right";
        facingRight = true;
      }
    } else if (currentAction === "right") {
      isWalking = true;
      facingRight = true;
      charX += 5;

      if (charX >= width - imgWidth / 2) {
        charX = width - imgWidth / 2;
        currentAction = "left";
        facingRight = false;
      }
    }

    if (isWalking) {
      if (frameCount % 30 < 15) {
        updateSvg(svgWalk1, charX, charY, facingRight);
        svgWalk1.show();
      } else {
        updateSvg(svgWalk2, charX, charY, facingRight);
        svgWalk2.show();
      }
    } else {
      updateSvg(svgSad, charX, charY, facingRight);
      svgSad.show();
    }
  } else {
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(150);
    text(label, width / 2, height / 2);
  }

  drawMirroredVideoFit(video, 0, 0, 160, 120);
}

function drawMirroredVideoFit(source, x, y, boxW, boxH) {
  if (!source || !source.elt || source.elt.readyState < 2) {
    return;
  }

  const sourceW = source.elt.videoWidth || source.width || boxW;
  const sourceH = source.elt.videoHeight || source.height || boxH;
  const sourceRatio = sourceW / sourceH;
  const boxRatio = boxW / boxH;
  let drawW = boxW;
  let drawH = boxH;

  if (sourceRatio > boxRatio) {
    drawH = boxW / sourceRatio;
  } else {
    drawW = boxH * sourceRatio;
  }

  const drawX = x + (boxW - drawW) / 2;
  const drawY = y + (boxH - drawH) / 2;

  push();
  translate(x + boxW, y);
  scale(-1, 1);
  image(source, boxW - (drawX - x) - drawW, drawY - y, drawW, drawH);
  pop();
}

function updateSvg(svgEl, x, y, isFlipped) {
  svgEl.position(x - imgWidth / 2, y - imgHeight / 2);
  svgEl.style("transform", isFlipped ? "scaleX(-1)" : "scaleX(1)");
}

async function startClassifier() {
  try {
    if (!ml5 || typeof ml5.imageClassifier !== "function") {
      label = "imageClassifier unavailable";
      return;
    }

    classifier = ml5.imageClassifier(imageModelURL + "model.json");

    if (classifier && typeof classifier.then === "function") {
      classifier = await classifier;
    }

    if (classifier && typeof classifier.classifyStart === "function") {
      classifier.classifyStart(video, gotResult);
      return;
    }

    classifyLoop();
  } catch (error) {
    console.warn(error);
    label = "model load failed";
  }
}

function classifyLoop() {
  if (isClassifying) {
    return;
  }

  if (!classifier || typeof classifier.classify !== "function") {
    label = "classifier unavailable";
    return;
  }

  isClassifying = true;
  const result = classifier.classify(video, gotResult);

  if (result && typeof result.then === "function") {
    result.then((results) => gotResult(results)).catch((error) => {
      isClassifying = false;
      console.warn(error);
    });
  }
}

function gotResult(first, second) {
  isClassifying = false;

  const error = Array.isArray(first) ? null : first;
  const results = Array.isArray(first) ? first : second;

  if (error) {
    console.warn(error);
  } else if (results && results.length > 0) {
    label = results[0].label;
  }

  if (!classifier || typeof classifier.classifyStart !== "function") {
    classifyLoop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  charY = windowHeight / 2;
}