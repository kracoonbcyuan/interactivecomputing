let maxWaveSize = 400;

let cycleFrames = 210; 

function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();
}

function draw() {
	background('#19020a');

	let spacing = 220;

	let t = (frameCount % cycleFrames) / cycleFrames;
	
	let cycle = floor(frameCount / cycleFrames);

	let angleLeaves = (cycle + easeInBounce(t)) * (PI / 4);        
	let angleOuterPetals = -(cycle + easeOutBounce(t)) * (PI / 4); 
	let angleInnerPetals = (cycle + easeInElastic(t)) * (PI / 2);  
	
	let waveSize = maxWaveSize * easeOutElastic(t);                

	let clampedWaveSize = constrain(waveSize, 0, maxWaveSize);
	let waveAlpha = map(clampedWaveSize, 0, maxWaveSize, 180, 0);



    push();
	translate(width / 2, height / 2);
	scale(0.83);
	translate(-width / 2, -height / 2);


	for (let x = 10; x < width + 200; x += spacing) {
		for (let y = -100; y < height + 200; y += spacing) {
			push();
			translate(x, y);

			fill(color(255, 255, 255, waveAlpha));
			circle(0, 0, waveSize);

			push();
			rotate(angleLeaves);
			fill('#aa1145');
			drawRadialShapes(8, 160, 60);
			pop();

			push();
			rotate(angleOuterPetals);
			fill('#c1134e');
			drawRadialShapes(12, 125, 48);
			pop();

			push();
			rotate(angleInnerPetals);
			fill('#d81558');
			drawRadialShapes(8, 90, 36);
			pop();

			fill('#e91e63');
			circle(0, 0, 35);

			pop();
		}
	}
    pop();
}

function drawRadialShapes(count, length, width) {
	for (let i = 0; i < count; i++) {
		push();
		rotate((TWO_PI / count) * i);
		
		beginShape();
		vertex(0, 0);
		quadraticVertex(width, -length / 2, 0, -length);
		quadraticVertex(-width, -length / 2, 0, 0);
		endShape(CLOSE);
		
		pop();
	}
}

function easeOutBounce(x) {
	const n1 = 7.5625;
	const d1 = 2.75;
	if (x < 1 / d1) { return n1 * x * x; }
	else if (x < 2 / d1) { return n1 * (x -= 1.5 / d1) * x + 0.75; }
	else if (x < 2.5 / d1) { return n1 * (x -= 2.25 / d1) * x + 0.9375; }
	else { return n1 * (x -= 2.625 / d1) * x + 0.984375; }
}

function easeInBounce(x) {
	return 1 - easeOutBounce(1 - x);
}

function easeInElastic(x) {
	const c4 = TWO_PI / 3;
	return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
}

function easeOutElastic(x) {
	const c4 = TWO_PI / 3;
	return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
}