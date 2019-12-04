var a = 3;
var x = a;
a++;

var b = [1, 2, 3];
var c = b;
var qe = c;
c = 2;
x--;
console.log(a, x);

console.log(typeof b);
console.log(b, c, qe);
