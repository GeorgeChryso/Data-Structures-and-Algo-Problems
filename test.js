// var a = 3;
// var x = a;
// a++;

// var b = [1, 2, 3];
// var c = b;
// var qe = c;
// c = 2;
// x--;
// console.log(a, x);

// console.log(typeof b);
// console.log(b, c, qe);
var a='[1,2,3,null,null,4,5]'

var res=a.replace(/[\[\]']/g,'').split(',')
res.map(d=>d==='null'?null:Number(d))

console.log( res)
