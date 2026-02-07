const gardata = {
  KEY: 'gardata_v1',
  addPlant: function (x,y) {
    const plants = this.getPlants();
    const types = plantLibrary.map(p=>p.name);
    const randtype = types[floor(random()*types.length)];
    let depth = map(y, 0, height, 0.4, 1.0);
    let variance = random(-0.05, 0.05); 
    let finscale = constrain(depth + variance, 0.2, 1.5);
    const newp = {
      x:x, y:y, type:randtype, 
      seed: floor(random()*1000000), 
      scale: finscale
    };
    
    plants.push(newp);
    localStorage.setItem(this.KEY, JSON.stringify(plants));
    return newp;
  },
  
  getPlants: function() {
    const data = localStorage.getItem(this.KEY);
    return data ? JSON.parse(data): [];
  },
  
  clear: function() {
    localStorage.removeItem(this.KEY);
  }
}
      
      