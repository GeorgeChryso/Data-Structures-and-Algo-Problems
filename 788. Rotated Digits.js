
var rotatedDigits = function(N) {
var goods={
    0:0,
    1:1,
    8:8,
    2:5,
    5:2,
    6:9,
    9:6
}

var count=0
function amIvalid(d){
    d=String(d).split('')
    for (let i = 0; i < d.length; i++) {
        if(goods[d[i]]==undefined){
        return false     }
        else{
            d[i]=goods[d[i]]
        }
    }
    return Number(d)
}
for (let i = 1; i < N; i++) {
   if (amIvalid(i) && amIvalid(i)!=i){
       console.log(i,amIvalid(i))
       count++
   }
    
}

return count
    
};

console.log(rotatedDigits(10))