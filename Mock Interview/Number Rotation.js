// X is a good number if after rotating each digit individually by 180 degrees, we get a valid number that is different from X.  Each digit must be rotated - we cannot choose to leave it alone.

// A number is valid if each digit remains a digit after rotation. 0, 1, and 8 rotate to themselves; 2 and 5 rotate to each other; 6 and 9 rotate to each other, and the rest of the numbers do not rotate to any other number and become invalid.

// Now given a positive number N, how many numbers X from 1 to N are good?

// Example:
// Input: 10
// Output: 4
// Explanation: 
// There are four good numbers in the range [1, 10] : 2, 5, 6, 9.
// Note that 1 and 10 are not good numbers, since they remain unchanged after rotating.


// 0=>1
// 8=>8
// 2=>5
// 5=>2
// 6=>9
// 9=>6
var isGood=(x)=>{
if (x.toString().includes('3')||x.toString().includes('7')||x.toString().includes('4')){return false}

  return   parseInt (x.toString().split("").map((d)=>{
         return d=='0'?0:
                d=='1'?1:
                d=='8'?8:
                d=='2'?5:
                d=='5'?2:
                d=='6'?9:
                d=='9'?6:null;
      }).join(''))!=x

  }


var rotatedDigits = function(N) {
    let count=0
    for (let i=1;i<=N;i++){
        if(isGood(i)){
            count++
        }
    }
  return count

};

// console.log(rotatedDigits(
//     10
// ))
console.log(isGood(
    130
))
