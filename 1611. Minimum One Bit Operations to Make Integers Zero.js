// Given an integer n, you must transform it into 0 using the following operations any number of times:

// Change the rightmost (0th) bit in the binary representation of n.
// Change the ith bit in the binary representation of n if the (i-1)th bit is set to 1 and the (i-2)th through 0th bits are set to 0.
// Return the minimum number of operations to transform n into 0.




// Observation: GreyCode always has the least number of bit changes"
// REVERSE THE ORDER, SO TRANSFORM 0 TO THE NUMBER
// THATS PROLLY GRAYCODE OPERATIONS 



// convert number to GrayCode
var Graycode=n=>{
    return n ^ (n >> 1)
}

// Convert GrayCode to number
var minimumOneBitOperations = function(n) {
        let ans = 0;
        while(n) {
            ans ^= n;
            n >>=1;
        }
        return ans;
};
console.log([0,1,2,3,4,5,6,7].map(d=>minimumOneBitOperations(d)))
// O(1) m,ore efficient for 32 bits
var minimumOneBitOperations=num=>
{
    num ^= num >> 16;
    num ^= num >>  8;
    num ^= num >>  4;
    num ^= num >>  2;
    num ^= num >>  1;
    return num;
}