const Turtle = {
  render: function(sentence, inangle,alpha) {
    const len = 8;          
    const angle = radians(inangle);
    for (let i = 0; i < sentence.length; i++) {
      let current = sentence.charAt(i);

      if (current === 'F') {
        line(0, 0, 0, -len);
        translate(0, -len);
      } 
      else if (current === '+') {
        rotate(angle);
      } 
      else if (current === '-') {
        rotate(-angle);
      } 
      else if (current === '[') {
        push();
      } 
      else if (current === ']') {
        pop();
      }
      else if (current == 'C') {
      fill(255,255,255,alpha);
      ellipse(0,-len+(len/2),len/3,len/2);
      }   
      else if (current === 'X') {
      }
    }
  }
};