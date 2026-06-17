function setup() {
	createCanvas(1600, 1600);
	background(255);
}

function draw() {

	
	let linearGradient = drawingContext.createLinearGradient(0, 0, 800, 800);
  linearGradient.addColorStop(0, '#8B0000DD');
  //linearGradient.addColorStop(0.2, '#F9918533');
  //linearGradient.addColorStop(0.4, '#CF556C33');
  linearGradient.addColorStop(1, '#FFFFFFDD');
drawingContext.fillStyle = linearGradient;
   noStroke();
	square(0, 0, 800);

drawingContext.fillStyle = '#FFFFFF';	
fill(255);
noStroke();
ellipse(400, 400, 600, 500);



drawingContext.fillStyle = '#FFFFFF';	
fill(255);
noStroke();
square(400-300, 400, 300);



drawingContext.fillStyle = '#8B0000';	
fill('#8B0000');
noStroke();
ellipse(150, 400, 100, 50);


drawingContext.fillStyle = '#8B0000';	
fill('#8B0000');
noStroke();
ellipse(300, 400, 100, 50);




	let linearGradient2 = drawingContext.createLinearGradient(800, 0, 800, 800);
  linearGradient2.addColorStop(0, '#0C3483');
  //linearGradient.addColorStop(0.2, '#F9918533');
  //linearGradient.addColorStop(0.4, '#CF556C33');
  linearGradient2.addColorStop(1, '#FFFFFF');
drawingContext.fillStyle = linearGradient2;
   noStroke();
	square(800, 0, 800);

	let linearGradient5 = drawingContext.createLinearGradient(800, 800, 800, 400);
  linearGradient5.addColorStop(0, '#0C3483');
  //linearGradient.addColorStop(0.2, '#F9918533');
  //linearGradient.addColorStop(0.4, '#CF556C33');
  linearGradient5.addColorStop(1, '#FFFFFF');
drawingContext.fillStyle = linearGradient5;


stroke(0);
strokeWeight(0);
  
  beginShape();
  vertex(800, 800);
  bezierVertex(857.5, 743, 876.5, 652.5, 838, 583.5);
  bezierVertex(817, 531.5, 838, 462.5, 893, 398);
  bezierVertex(876.5, 462.5, 876.5, 531.5, 914.5, 583.5);
  bezierVertex(964.5, 652.5, 964.5, 743, 945.5, 800);
	endShape();


push(); 
  
translate(145.5, 0);
stroke(0);
strokeWeight(0);
  
  beginShape();
  vertex(800, 800);
  bezierVertex(857.5, 743, 876.5, 652.5, 838, 583.5);
  bezierVertex(817, 531.5, 838, 462.5, 893, 398);
  bezierVertex(876.5, 462.5, 876.5, 531.5, 914.5, 583.5);
  bezierVertex(964.5, 652.5, 964.5, 743, 945.5, 800);
	endShape();
pop();

push(); 
  
translate(145.5*2, 0);
stroke(0);
strokeWeight(0);
 
  beginShape();
  vertex(800, 800);
  bezierVertex(857.5, 743, 876.5, 652.5, 838, 583.5);
  bezierVertex(817, 531.5, 838, 462.5, 893, 398);
  bezierVertex(876.5, 462.5, 876.5, 531.5, 914.5, 583.5);
  bezierVertex(964.5, 652.5, 964.5, 743, 945.5, 800);
	endShape();
pop();	

	
push(); 
  
translate(145.5*3, 0);
stroke(0);
strokeWeight(0);
 
  beginShape();
  vertex(800, 800);
  bezierVertex(857.5, 743, 876.5, 652.5, 838, 583.5);
  bezierVertex(817, 531.5, 838, 462.5, 893, 398);
  bezierVertex(876.5, 462.5, 876.5, 531.5, 914.5, 583.5);
  bezierVertex(964.5, 652.5, 964.5, 743, 945.5, 800);
	endShape();
pop();	




push(); 
  
translate(145.5*4, 0);
stroke(0);
strokeWeight(0);
  
  beginShape();
  vertex(800, 800);
  bezierVertex(857.5, 743, 876.5, 652.5, 838, 583.5);
  bezierVertex(817, 531.5, 838, 462.5, 893, 398);
  bezierVertex(876.5, 462.5, 876.5, 531.5, 914.5, 583.5);
  bezierVertex(964.5, 652.5, 964.5, 743, 945.5, 800);
	endShape();
pop();		





let linearGradient3 = drawingContext.createLinearGradient(800, 0, 800, 1600);
  linearGradient3.addColorStop(0, '#EFFF00');
  //linearGradient.addColorStop(0.2, '#F9918533');
  //linearGradient.addColorStop(0.4, '#CF556C33');
  linearGradient3.addColorStop(1, '#FFFFFF');
drawingContext.fillStyle = linearGradient3;
   noStroke();
	square(0, 800, 800);	



stroke(0);
strokeWeight(0);
  fill(255);
  beginShape();
  vertex(340, 1271);
  bezierVertex(376.8, 1249.4, 355.33, 1219.67, 340, 1207.5);
  bezierVertex(282.67, 1206, 165.5, 1179.2, 155.5, 1084);
  bezierVertex(143, 965, 233, 928, 303.5, 1018);
	bezierVertex(374, 1108, 390.5, 1176, 432, 1130);
	bezierVertex(465.2, 1093.2, 458.83, 1019, 451.5, 986.5);
	bezierVertex(470.33, 950.33, 516.7, 892, 551.5, 948);
	bezierVertex(586.3, 1004, 593.33, 1040.67, 592.5, 1052);
	bezierVertex(590.83, 1065.17, 573.9, 1103.1, 519.5, 1149.5);
	bezierVertex(465.1, 1195.9, 496.83, 1231.83, 519.5, 1244);
	bezierVertex(582, 1207.5, 698.7, 1156.4, 665.5, 1244);
	bezierVertex(624, 1353.5, 590, 1402, 507.5, 1331.5);
	bezierVertex(425, 1261, 391, 1275.5, 376.5, 1363);
	bezierVertex(362, 1450.5, 101.5, 1552, 191.5, 1414);
	bezierVertex(281.5, 1276, 294, 1298, 340, 1271);
	endShape();


let linearGradient4 = drawingContext.createLinearGradient(800, 800, 1600, 1600);
  linearGradient4.addColorStop(0, '#FF7800');
  //linearGradient.addColorStop(0.2, '#F9918533');
  //linearGradient.addColorStop(0.4, '#CF556C33');
  linearGradient4.addColorStop(1, '#FFFFFF');
drawingContext.fillStyle = linearGradient4;
   noStroke();
	square(800, 800, 800);	

fill('#FF7800');
noStroke();
circle(1570, 1570, 100)

fill(255);
noStroke();
circle(1560, 1560, 10)

fill(255);
noStroke();
circle(1590, 1565, 10)

fill(255);
noStroke();
ellipse(1570, 1585, 20, 10)



fill(255);
noStroke();
ellipse(1100, 1100, 500, 500)

	
stroke(0);
strokeWeight(0);
  fill('#FF7800');
  beginShape();
  vertex(1124.5, 1050);
  bezierVertex(1183.3, 1051.2, 1209.33, 1083.83, 1215, 1100);
  bezierVertex(1197, 1097.33, 1153.7, 1083.6, 1124.5, 1050);	
  endShape();


stroke(0);
strokeWeight(0);
  fill('#FF7800');
  beginShape();
  vertex(1244, 1114.5);
  bezierVertex(1263.83, 1117.67, 1308.7, 1131.3, 1329.5, 1160.5);
  bezierVertex(1355.5, 1197, 1258.5, 1137, 1244, 1114.5);	
  endShape();


stroke(0);
strokeWeight(0);
  fill('#FF7800');
  beginShape();
  vertex(1048, 1127.5);
  bezierVertex(1048.67, 1166.17, 1028.88, 1272.43, 1091, 1287.5);
  bezierVertex(1287.5, 1301.21, 1271.17, 1250.5, 1289, 1243);	
  bezierVertex(1263.17, 1265.83, 1175.1, 1311.5, 1139.5, 1313.5);
  bezierVertex(1095, 1316, 1032, 1295.5, 1032, 1261);
	bezierVertex(1032, 1226.5, 1030, 1140.5, 1048, 1127.5);
  endShape();
}