function setup() {
  let canvas = createCanvas(windowWidth * 0.66, windowHeight);
  canvas.parent('garden-container');
  background(0);
  noLoop();
}

function draw() {
  background(0);

  const plants = gardata.getPlants();

  for (let p of plants) {
    let alpha = map(p.y, 0, height, 10, 180);

    push();
    translate(p.x, p.y);
    scale(p.scale);
    
    stroke(255, 255, 255, alpha);
    strokeWeight(1);
    noFill();

    const result = LSystem.generate(p.type, p.seed);
    
    if (result) {
      randomSeed(p.seed);
      Turtle.render(result.sentence, result.angle, alpha);
    }
    
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth * 0.66, windowHeight);
  redraw();
}


// //devtool
// function mousePressed() {
//   // RIGHT CLICK: Nuclear Option (Clear Everything)
//   if (mouseButton === RIGHT) {
//     gardata.clear(); // 1. Wipe LocalStorage
//     redraw();        // 2. Refresh canvas (it will be black/empty)
//     console.log("Garden cleared!");
//   } 
  
//   // LEFT CLICK: Add Plant (Your previous testing logic)
//   else {
//     gardata.addPlant(mouseX, mouseY);
//     redraw();
//   }

//   // IMPORTANT: This prevents the "Right Click Menu" from popping up
//   return false; 
// }