
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
 
    z=true
   d=String(i).split('')
   for (let j = 0; j < d.length; j++) {
        if(goods[d[j]]==undefined ){
            z=false
            break;
        }else{

        }
        
    }

if (z){
    count++
}


}

return count
    
};

console.log(rotatedDigits(857))