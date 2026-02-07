var sentence;
var curr_rules;
var len = 12;
var angle;

function generate() {
  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++)
  {
    var cur = sentence.charAt(i);

    if (cur === "F") {
      var r = random(1); // number between 0 and 1
      var sum = 0;

      for (var j = 0; j < curr_rules.length; j++){
        sum += curr_rules[j].weight;
        if (r < sum) {
          nextSentence += curr_rules[j].b;
          break;
        }
      }
    } else {
      nextSentence += cur;
    }
  }
  sentence = nextSentence;
//   createP(sentence);
}

function turtle(x,y,alpha) {
  resetMatrix();
  translate(x, y);
  stroke(255, 255, 255, alpha);
  
  for(var i =0; i<sentence.length; i++)
  {
    var cur = sentence.charAt(i); 
    if (cur =='F'){
      line(0,0,0,-len);
      translate(0,-len);
    }
    else if(cur=='+') {
      rotate(angle);
    }
    else if(cur == '-') {
      rotate(-angle)
    }
    else if(cur == '[') {
      push();
    }
    else if (cur == ']') {
      pop();
    }
    else if (cur == 'C') {
      fill(255,255,255,alpha);
      ellipse(0,-len+(len/2),len/2,len/3);
    }
  }
}

function setup() { 
  let canvas = createCanvas(500, 500); 
  canvas.parent('garden-container');
  console.log(plantLibrary);

  backgroundColor = color('#4c3228')
  background(backgroundColor);
}

function drawGardenBed() {
  noStroke();
  for (let i = 0; i < 40; i++) {
    fill(139, 115, 85, 150); // Muted pebble brown
    let x = random(width);
    let y = random(height);
    ellipse(x, y, random(5, 15), random(3, 8)); // Random pebble sizes
  }
}

function getAlpha(y){
  if(y<0){return 255;}
  else{return (255*y)/1200};
} 

function plantOnce(x,y, plantype) {
  curr_rules = plantype.rules;
  sentence = random(plantype.axioms);
  angle = (PI/6 - random(0.2));
  for(var i = 0; i < 3; i++) {
    generate();
  }
  turtle(x,y,getAlpha(y)); 
}

function plantAtRandom(numplant, w, h)
{
  var plantada = random(plantLibrary);
  for (var i = 0; i < numplant; i ++){
    var xPlausible = random(w);
    var yPlausible = random(h);
    plantOnce(xPlausible,yPlausible,plantada);
  }
}

function mouseClicked()
{
  plantAtRandom(10,1000,700);
}