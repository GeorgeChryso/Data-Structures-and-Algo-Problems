// Given a positive integer, output its complement number. The complement strategy is to flip the bits of its binary representation.

// Note:
// The given integer is guaranteed to fit within the range of a 32-bit signed integer.
// You could assume no leading zero bit in the integer’s binary representation.


var findComplement =( function(num) {
  //  return parseInt(num.toString(2).split('').map((d)=>d==0?1:0).join(''),2)


   return parseInt(num.toString(2).replace(/1|0/g,(x)=>x==1?'0':1),2)
}
)(5)

var findComplement = function(num) {
    if (num === 1) return 0
    let i = 1;
    while (i <= num) {
      i *= 2;
    }
    
    return i - 1 - num;
    
  };


// Any complement of a number is X equal to 
// where 2^A is the closest >= integer of X
// 2^A>X  2^A-X-1
// NEAT TRICKU
console.log(findComplement(5))

