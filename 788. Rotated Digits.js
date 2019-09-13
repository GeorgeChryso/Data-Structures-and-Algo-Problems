
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

for (let i = 1; i <=N; i++) {
 
    
   d=String(i).split('')
   for (let j = 0; j < d.length; j++) {
    if(goods[d[j]]==undefined){
        d=i
        break;
    }
    else{
        d[j]=goods[d[j]]
    }
    }
    if( d[0]!=undefined){ d=Number(d.join(''))}
    
if (d!=i){
    count++
}


}

return count
    
};

console.log(rotatedDigits(857))