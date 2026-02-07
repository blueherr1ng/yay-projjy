// variables: A B
// axiom: A, ABA, etc.
// rules: (A-> AB), (B->A)

var axiom = [
  "F[+F][-F]", 
  "F", 
  "F[F][F]", 
  "F[+F]F[-F]"
]
var sentence;
var len = 8;
var angle;

var rules = [
    { 
    a: "F", 
    b: "FF", 
    weight: 0.2 
  },
  { 
    a: "F", 
    b: "F[+F]F", 
    weight: 0.4 
  },
  { 
    a: "F", 
    b: "FF-[-F+FC]+[+F-FC]", 
    weight: 0.4 
  }
];

// rules[1] = {
//   a: "B",
//   b: "A"
// }


function generate() {
  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++)
  {
    var cur = sentence.charAt(i);

    if (cur === "F") {
      var r = random(1); // number between 0 and 1
      var sum = 0;

      for (var j = 0; j < rules.length; j++){
        sum += rules[j].weight;
        if (r < sum) {
          nextSentence += rules[j].b;
          break;
        }
      }
    } else {
      nextSentence += cur;
    }
  }
  sentence = nextSentence;
  createP(sentence);
  turtle();
}

function turtle() {
  background(20);
  resetMatrix();
  translate(width/2,height);
  stroke(255, 255, 255, 127);
  
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
      fill(255,255,255,100);
      ellipse(0,-len+(len/2),len/2,len/3);
    }
  }
}

function setup() { 
  createCanvas(400,400);
  background(20);
  var randchoice = floor(random(4))
  sentence = axiom[randchoice];
  angle = (random(PI/5 * 0.8));
  turtle();
  for(var i = 0; i < 3 ; i ++)
  {
    generate();
  }
}

// function draw() {
//   background(220);
// }