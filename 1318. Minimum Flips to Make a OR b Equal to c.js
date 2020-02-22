// Given 3 positives numbers a, b and c. Return the minimum flips required in some bits of a and b to make ( a OR b == c ). (bitwise OR operation).
// Flip operation consists of change any single bit 1 to 0 or change the bit 0 to 1 in their binary representation.



var minFlips = function(a, b, c) {
  let counter=0

  //checking the bits one by one
  for (let i = 0; i < 31; i++) {

    let [ba,bb,bc]=[a&1,b&1,c&1]

    //the only time i need to change both a and b is
    // when they re both 1 and c is 0
    if(bc==0&&(ba&bb))counter+=2
    //otherwise if one of them is one, i just incremenet by one
    else if(bc==0&&(ba|bb))counter++
    // the last case i need to increment is when both of them are 0 and c=1
    else if(bc&&!ba&&!bb)counter++

    //can be summarized to
    //if there must be a flip, its either 2 or 1
    //if((ba|bb)^bc)counter+=(bc==0&&(ba&bb))?2:1

    a>>>=1
    b>>>=1
    c>>>=1
  }
  
  return counter
};