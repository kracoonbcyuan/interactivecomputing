function setup() {
  
  createCanvas(1000, 1000);
  angleMode(DEGREES); 
}

function draw() {
  background(0); 

  let cx = width / 2;  
  let cy = height / 2; 

 
  for (let i = 0; i < 12; i++) {
    push(); 
    
    
    translate(cx, cy); 
    
   
    rotate(i * 30); 
    
   
    translate(-cx, -cy); 

    
    fill(0); 
    stroke(255);
	  strokeWeight(1);

    
    ellipse(410, 390, 182);
    ellipse(430, 380, 177);
    ellipse(445, 365, 170);
    ellipse(457, 353, 165);
    ellipse(467, 343, 161);
    ellipse(476, 335, 158);
    ellipse(484, 328, 155);
    ellipse(493, 321, 152);
    ellipse(503, 310, 150);
    ellipse(500, 302, 148);
    ellipse(495, 297, 145);
    ellipse(492, 292, 142);
    ellipse(490, 290, 138);
    ellipse(485, 285, 133);
    ellipse(481, 281, 129);
    ellipse(477, 277, 120);
    ellipse(468, 270, 106);
    ellipse(455, 268, 97);
    ellipse(444, 267, 90);
    ellipse(436, 266, 80);
    ellipse(424, 265, 70);
    ellipse(412, 264, 58);
    ellipse(401, 263, 46);
    ellipse(390, 262, 33);
    ellipse(377, 261, 20);
    ellipse(369, 260, 11);
    
    
    pop(); 
  }




  fill(255);       
  stroke(0);       
  strokeWeight(2); 
  ellipse(500, 500, 60, 30); 

  
  
  let pupilX = map(mouseX, 0, width, 485, 515);
  
  
  let pupilY = map(mouseY, 0, height, 495, 505);

  
  stroke(0);        
  strokeWeight(20); 
  point(pupilX, pupilY);

}