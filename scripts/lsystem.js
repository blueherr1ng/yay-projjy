const LSystem = {
  // 1. The Manager: Handles the seed and the loop size
  generate: function(type, seed) {
    const data = plantLibrary.find(p => p.name === type);
    if (!data) return null;

    // Lock the chaos so it grows the same way every time
    randomSeed(seed);
    let cursentence = data.axiom; 
    const loopnum = floor(random(2,5));
    for (let i = 0; i < loopnum; i++) {
      cursentence = this.applyRules(cursentence, data.rules);
    }

    return { 
      sentence: cursentence, 
      angle: data.angle 
    };
  },


  applyRules: function(sentence, rules) {
    let newsent = "";
    for (let i = 0; i < sentence.length; i++) {
      let cur = sentence.charAt(i);
      let found = false;
      let plausibles = [];
      for (let j = 0; j < rules.length; j++) {
        if (rules[j].a === cur) {
          plausibles.push(rules[j]);
        }
      }

      if (plausibles.length > 0) {
        let r = random(1);
        let sum = 0;
        
        for (let k = 0; k < plausibles.length; k++) {
          let rule = plausibles[k];
          sum += rule.weight;
          if (r <= sum) {
            newsent += rule.b; 
            found = true;
            break;
          }
        }
      }
      if (!found) {
        newsent += cur;
      }
    }
    return newsent;
  }
};