
  function median(values){
    if(values.length ===0) return 0;
    var half = Math.floor(values.length / 2);
    if (values.length % 2)
      return values[half];
    return (values[half - 1] + values[half]) / 2.0;
  }
let isBoring=players=>{
    
    let diffs=players.map((d,i)=>d-(players[0]+i))
    let mediandiff=median(diffs)
    return diffs.reduce((a,c)=>a+Math.abs(c-mediandiff),0)
}
console.log(isBoring([ 3 , 5,   7,   8,  10,  16]))