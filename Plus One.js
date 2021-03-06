// Given a non-empty array of digits representing a non-negative integer, plus one to the integer.

// The digits are stored such that the most significant digit is at the head of the list, and each element in the array contain a single digit.

// You may assume the integer does not contain any leading zero, except the number 0 itself.

// Example 1:

// Input: [1,2,3]
// Output: [1,2,4]
// Explanation: The array represents the integer 123.
// Example 2:

// Input: [4,3,2,1]
// Output: [4,3,2,2]
// Explanation: The array represents the integer 4321.






var plusOne = function(digits) {
    
    let i=digits.length-1
    let carry=1
    while(i>=0){
        if(carry==0)break
        digits[i]=digits[i]+carry
        carry=0
        if(digits[i]>=10){
            digits[i]%=10
            carry=1
        }
        i--
    }
    if(carry){
        digits.unshift(carry)
    }
    return digits
};