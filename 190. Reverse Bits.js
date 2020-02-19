// Reverse bits of a given 32 bits unsigned integer.

// nonbit
var reverseBits = function(n) {
    return parseInt(n.toString(2).padStart(32,'0').split('').reverse().join(''),2)
  
};


var reverseBits = function(n) {
    var result = 0;
    var count = 32;
  
    while (count--) {
      result <<=1
      result += n & 1;
      n = n >> 1;
    }
    return result>>>0; //needs that to pass the tests
};

var reverseBits = function(n) {
    var result = 0;
    var count = 32;
  
    while (count--) {
      result*=2
      result += n & 1;
      n = n >> 1;
    }
    return result;
};


// for 8 bit binary number abcdefgh, the process is as follow:
// abcdefgh -> efghabcd -> ghefcdab -> hgfedcba

//not running properly
var reverseBits=n=>{
    n = (n >> 16) | (n << 16);
    n = ((n & 0xff00ff00) >> 8) | ((n & 0x00ff00ff) << 8);
    n = ((n & 0xf0f0f0f0) >> 4) | ((n & 0x0f0f0f0f) << 4);
    n = ((n & 0xcccccccc) >> 2) | ((n & 0x33333333) << 2);
    n = ((n & 0xaaaaaaaa) >> 1) | ((n & 0x55555555) << 1);
    return n>>>0
}


console.log(reverseBits(
    11111111111111111111111111111101
))