let balls = [];

let engScore = 0;
let korScore = 0;

const engStrokes = {
  'A':3, 'B':3, 'C':1, 'D':2, 'E':4, 'F':3, 'G':3, 'H':3, 'I':1, 'J':2, 'K':3, 'L':2, 'M':4, 
  'N':3, 'O':1, 'P':2, 'Q':2, 'R':3, 'S':1, 'T':2, 'U':1, 'V':2, 'W':4, 'X':2, 'Y':3, 'Z':3
};

const korStrokes = {
  'ㄱ':1, 'ㄴ':1, 'ㄷ':2, 'ㄹ':3, 'ㅁ':3, 'ㅂ':4, 'ㅅ':2, 'ㅇ':1, 'ㅈ':3, 'ㅊ':4, 'ㅋ':2, 'ㅌ':3, 'ㅍ':4, 'ㅎ':3, 
  'ㅏ':2, 'ㅑ':3, 'ㅓ':2, 'ㅕ':3, 'ㅗ':2, 'ㅛ':3, 'ㅜ':2, 'ㅠ':3, 'ㅡ':1, 'ㅣ':1
};

// 영문 타자를 쳐도 한글 자모로 인식하게 해주는 매핑 데이터
const keyToKor = {
  'r':'ㄱ', 's':'ㄴ', 'e':'ㄷ', 'f':'ㄹ', 'a':'ㅁ', 'q':'ㅂ', 't':'ㅅ', 
  'd':'ㅇ', 'w':'ㅈ', 'c':'ㅊ', 'z':'ㅋ', 'x':'ㅌ', 'v':'ㅍ', 'g':'ㅎ',
  'k':'ㅏ', 'i':'ㅑ', 'j':'ㅓ', 'u':'ㅕ', 'h':'ㅗ', 'y':'ㅛ', 'n':'ㅜ', 
  'b':'ㅠ', 'm':'ㅡ', 'l':'ㅣ'
};

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  // 영어(ENG)만 일정 프레임마다 자동으로 생성
  if (frameCount % 60 === 0) {
    balls.push(new BattleChar('ENG'));
  }

  for (let i = balls.length - 1; i >= 0; i--) {
    balls[i].update();
    balls[i].display();

    if (balls[i].isDead()) {
      balls.splice(i, 1);
    }
  }

  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      let b1 = balls[i];
      let b2 = balls[j];

      if (!b1.isFalling && !b2.isFalling && b1.side !== b2.side) {
        let d = dist(b1.x, b1.y, b2.x, b2.y);
        
        if (d < b1.r + b2.r) {
          resolveBattle(b1, b2);
        }
      }
    }
  }

  displayScores();
}

// 키보드를 누를 때마다 한글 생성
function keyPressed() {
  let typedChar = key.toLowerCase();
  
  if (keyToKor[typedChar]) {
    typedChar = keyToKor[typedChar];
  }
  
  if (korStrokes[typedChar]) {
    // 입력한 글자를 BattleChar에 전달
    balls.push(new BattleChar('KOR', typedChar));
  }
}

function displayScores() {
  push();
  textSize(36);
  textStyle(BOLD);

  fill(100, 200, 255);
  textAlign(LEFT, TOP);
  text(`ENG: ${engScore}`, 30, 30);

  fill(255, 100, 150);
  textAlign(RIGHT, TOP);
  text(`KOR: ${korScore}`, width - 30, 30);
  pop();
}

function resolveBattle(b1, b2) {
  if (b1.strokes > b2.strokes) {
    b2.lose(); 
    b1.win(b2); 
    engScore++;
  } else if (b2.strokes > b1.strokes) {
    b1.lose(); 
    b2.win(b1); 
    korScore++;
  } else {
    b1.bounceOff(b2);
    b2.bounceOff(b1);
  }
}

class BattleChar {
  // 생성자에 charInput 매개변수 추가
  constructor(side, charInput = null) {
    this.side = side;
    this.isFalling = false;
    this.r = 25; 
    this.wins = 0; 

    if (this.side === 'ENG') {
      this.x = random(-this.r * 3, -this.r); 
      let keys = Object.keys(engStrokes);
      this.char = random(keys);
      this.strokes = engStrokes[this.char];
      this.baseSpeed = random(2, 4); 
      this.color = color(100, 200, 255);
    } else {
      this.x = random(width + this.r, width + this.r * 3); 
      // KOR일 경우 랜덤 대신 입력받은 글자(charInput)를 사용
      this.char = charInput; 
      this.strokes = korStrokes[this.char];
      this.baseSpeed = random(2, 4); 
      this.color = color(255, 100, 150);
    }

    this.vx = (this.side === 'ENG') ? this.baseSpeed : -this.baseSpeed;
    this.y = random(50, height - 50);
    this.vy = random(-2, 2);
  }

  update() {
    if (this.isFalling) {
      this.vy += 0.5; 
      this.x += this.vx * 0.2; 
      this.y += this.vy;
    } else {
      this.x += this.vx;
      this.y += this.vy;

      let buffer = this.r;

      if (this.y < buffer) {
        this.vy = abs(this.vy); 
        this.y = buffer;
      } else if (this.y > height - buffer) {
        this.vy = -abs(this.vy); 
        this.y = height - buffer;
      }

      if (this.x > buffer && this.x < width - buffer) {
        let nextX = this.x + this.vx;
        if (nextX < buffer || nextX > width - buffer) {
          this.vx *= -1; 
        }
      }
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    
    textAlign(CENTER, CENTER);
    textSize(32);
    noStroke();

    if (this.isFalling) {
      tint(255, 100);
      rotate(frameCount * 0.1);
      fill(100);
      text(this.char, 0, 0);
    } else {
      fill(this.color);
      text(this.char, 0, 0);
      
      fill(255);
      textSize(12);
      text(this.strokes, 15, 15);
      
      if (this.wins > 0) {
        stroke(255, 150);
        strokeWeight(this.wins);
        noFill();
        ellipse(0, 0, this.r * 2);
      }
    }
    pop();
  }

  win(other) {
    this.wins++; 
    this.bounceOff(other); 
    
    let speedMult = 1.0 + (this.wins * 0.2); 
    
    let currentSpeedX = abs(this.vx);
    let newSpeedX = this.baseSpeed * speedMult;
    this.vx = (this.vx > 0) ? newSpeedX : -newSpeedX;

    let currentSpeedY = abs(this.vy);
    let newSpeedY = max(2, currentSpeedY * speedMult); 
    this.vy = (this.vy > 0) ? newSpeedY : -newSpeedY;
    
    let maxS = 15;
    this.vx = constrain(this.vx, -maxS, maxS);
    this.vy = constrain(this.vy, -maxS, maxS);
  }

  lose() {
    this.isFalling = true;
    this.vy = -5; 
    this.wins = 0; 
  }

  bounceOff(other) {
    this.vx *= -1;
  }

  isDead() {
    return this.isFalling && (this.y > height + this.r * 2);
  }
}