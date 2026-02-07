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
var len = 12;
var angle;

var rules = [
    { 
    a: "F", 
    b: "FF", 
    weight: 0.3 
  },
  { 
    a: "F", 
    b: "F[+F]F", 
    weight: 0.1 
  },
  { 
    a: "F", 
    b: "FF-[-F+FC]+[+F-FC]", 
    weight: 0.4 
  },
  { 
    a: "F", 
    b: "FF-[-F+F+FC]+[+F-F-FC]", 
    weight: 0.2 
  }
];

// rules[1] = {
//   a: "B",
//   b: "A"
// }


function generate() {
  len -= 1;
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
  createCanvas(1000,600);
  background(20);
  var randchoice = floor(random(4))
  sentence = axiom[randchoice];
  angle = (PI/6-random(0.2));
  turtle();
  for(var i = 0; i < 3 ; i ++)
  {
    generate();
  }
}