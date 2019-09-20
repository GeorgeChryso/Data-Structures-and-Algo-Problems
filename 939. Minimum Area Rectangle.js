
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

  P.forEach(d=>
       {
          if(  obx[d[0]]==undefined ){
          obx[d[0]]=[d[1]]
          }
          else{
          obx[d[0]].push(d[1])
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

console.log(minAreaRect(
  [[1,1],[1,3],[3,1],[3,3],[4,1],[4,3]]
))

