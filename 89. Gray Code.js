'use strict'

// The gray code is a binary numeral system where two successive values differ in only one bit.

// Given a non-negative integer n representing the total number of bits in the code, print the sequence of gray code. A gray code sequence must begin with 0.

// Example 1:

// Input: 2
// Output: [0,1,3,2]
// Explanation:
// 00 - 0
// 01 - 1
// 11 - 3
// 10 - 2


var grayCode = function(n) {
    const ans = [0]; // start from 0
    for (let i = 1; i <= n; i++) {
      const m = Math.pow(2, i - 1);
      for (let j = ans.length - 1; j >= 0; j--) {
        ans.push(m + ans[j]);
      }
    }
    return ans;
  };

  console.log(grayCode([0,1,3,2]))