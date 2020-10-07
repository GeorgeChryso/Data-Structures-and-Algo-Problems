// Given an integer n, you must transform it into 0 using the following operations any number of times:

// Change the rightmost (0th) bit in the binary representation of n.
// Change the ith bit in the binary representation of n if the (i-1)th bit is set to 1 and the (i-2)th through 0th bits are set to 0.
// Return the minimum number of operations to transform n into 0.

//bfs memo TLE
var minimumOneBitOperations = function(g) {
    let memo=new Set()
    memo.add(g)
    let q=[g],level=0
    while(q.length){
        let temp=[]
        for(num of q){
            if(num==0)return level
            if(num==1){
                temp.push(0)
                continue
            }
            //choice 1
            if(!memo.has(num^1)){
                temp.push(num^1)
                memo.add(num^1)
            }
            //choice 2
            let res=0
            res=num^((num^(num&(num-1)))<<1)
            //  num^(00100) where 1 is the 2nd rightmost set bit

            if(!memo.has(res)){
                memo.add(res)
                temp.push(res)
            }
        }
        level++
        q=temp
    }
   return 0
};


// Note that the number of operations for n to become 0 is the same as the number of operations for 0 to become n...

// Let's see how it can be done for numbers that are powers of 2.
// 1 -> 0 => 1
// 10 -> 11 -> 01 -> ... => 2 + 1
// 100 -> 101 -> 111 -> 110 -> 010 -> ... => 4 + 2 + 1
// 1000 -> 1001 -> 1011 -> 1010 -> 1110 -> 1111 -> 1101 -> 1100 -> 0100 -> ... => 8 + 4 + 2 + 1
// We can find that for 2^n, it needs 2^(n+1) - 1 operations to become 0.

//So the operations to transform 11100 to 0 is= op(10000)-op(01100)


//so the observation is that THE NUMBERS WITH 1 BIT LIKE 10000 ALWAYS PRECEED THE NUMBERS
// WITH MORE BITS 11001 11110 ETC
// so its always possible to 
// go from 10000=>11001=>0
let minimumOneBitOperations= n=> {
    if (n <= 1)
        return n;
    let bit = 0; //the leftmost set bit
    for (var i = 0; i < 32; i++) 
        if((1<<i)&n)
            bit=i    
    // The number of operations from 1000 to 1110  is the same  from 000 to 0110
    let operationsto0=(1 << (bit+1)) - 1 //the operations to transform 1000..0 to 0
    return operationsto0- minimumOneBitOperations(n ^(1<<bit) )// removed the leftmost set bit
}


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