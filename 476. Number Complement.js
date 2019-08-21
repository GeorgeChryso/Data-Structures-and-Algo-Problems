// Given a positive integer, output its complement number. The complement strategy is to flip the bits of its binary representation.

// Note:
// The given integer is guaranteed to fit within the range of a 32-bit signed integer.
// You could assume no leading zero bit in the integer’s binary representation.


var findComplement =( function(num) {
  //  return parseInt(num.toString(2).split('').map((d)=>d==0?1:0).join(''),2)


   return parseInt(String(num.toString(2)).replace(/1|0/g,(x)=>x==1?'0':1),2)
}
)(5)




console.log(findComplement)

