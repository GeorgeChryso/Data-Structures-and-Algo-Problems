// The Hamming distance between two integers is the number of positions at which the corresponding bits are different.

// Given two integers x and y, calculate the Hamming distance.

// Note:
// 0 ≤ x, y < 231.

// Example:

// Input: x = 1, y = 4

// Output: 2

// Explanation:
// 1   (0 0 0 1)
// 4   (0 1 0 0)
//        ↑   ↑


var hammingDistance = function(x, y) {
    let z=x^y
    let result=0
    while(z!==0){
        if(z&1)result++ //check if the first bit is one
        z=z>>1 //keep moving 1 left and checking whether the last element is 1
    }
    return result
};