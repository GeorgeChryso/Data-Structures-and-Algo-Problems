'use strict'

// Given an array A of non - negative integers, return an array consisting of all the even elements of A, followed by all the odd elements of A.

// You may return any answer array that satisfies this condition.



//     Example 1:

// Input: [3, 1, 2, 4]
// Output: [2, 4, 3, 1]
// The outputs[4, 2, 3, 1], [2, 4, 1, 3], and[4, 2, 1, 3] would also be accepted.


//     Note:

// 1 <= A.length <= 5000
// 0 <= A[i] <= 5000


var sortArrayByParity = function (A) {
    // let answer = []
    // A.forEach((d) => {
    //     if (d % 2 == 0) {
    //         answer.unshift(d)
    //     } else {
    //         answer.push(d)
    //     }
    // })

    return A.sort((d) => d % 2 == 1 ? 1: -1)
    return A
    return answer
};

console.log(sortArrayByParity(

    [4016, 2240, 402, 1600, 2540, 4665, 545, 2756, 3533, 2737, 4073, 2701, 4820, 3016, 2938, 2225, 2982, 1924, 2878, 1451]
))

