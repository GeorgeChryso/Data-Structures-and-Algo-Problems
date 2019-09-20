
//find the intersection of the array and return the min of their 
// each possible pair 


var minAreaRect = function(P) {
  var obx={}
  var min=Infinity
  
  function Inters(A,B,sum){
    var q={}
    var answ=[]
    A.forEach(d=>q[d]='1')
    B.forEach(d=>q[d]?answ.push(d):null)
    if(answ.length<2)return null
    answ.forEach((d,j)=>{
        for (let i = j+1; i < answ.length; i++){
          min= Math.min(Math.abs(d-answ[i])*sum,min)  
        }
    })
}

  P.forEach(([x,y])=>
       {
          if(  obx[x]==undefined ){
          obx[x]=[y]
          }
          else{
          obx[x].push(y)
          }
        } 
      )
    
  let q=Object.keys(obx)
  for (let i = 0; i < q.length; i++) {
      for (let j = i+1 ; j < q.length; j++) {
            Inters(obx[q[i]],obx[q[j]],Math.abs(q[i]-q[j]))
      }
    
    }
  
return min==Infinity?0:min
};

var minAreaRect = function(points) {
  let min = Infinity;
  let isPoint = {};
  points.forEach(([x, y]) => (isPoint[x * 40000 + y] = true));
  console.log(isPoint)
  for (let idx1 = 0; idx1 < points.length - 1; idx1++) {
    let [x1, y1] = points[idx1];
    for (let idx2 = idx1 + 1; idx2 < points.length; idx2++) {
      let [x2, y2] = points[idx2];
      let area = Math.abs((x1 - x2) * (y1 - y2));

      console.log([x1,y1])
      console.log([x2,y2] ,area)
      console.log(area === 0 || area >= min)   


      if (area === 0 || area >= min) continue;
      console.log(isPoint[x1 * 40000 + y2] && isPoint[x2 * 40000 + y1],'\n','\n')
      if (isPoint[x1 * 40000 + y2] && isPoint[x2 * 40000 + y1]) min= area;
    }
  }
  return min!== Infinity ? min: 0;
};
// Genius lol 
console.log(minAreaRect(
  [[1,1],[1,3],[3,1],[3,3],[4,1],[4,3]]
))

