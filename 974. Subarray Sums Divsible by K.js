// Given an array A of integers, return the number of (contiguous, non-empty) subarrays that have a sum divisible by K.


// 1 <= A.length <= 30000
// -10000 <= A[i] <= 10000
// 2 <= K <= 10000

// O(N^2),BRUTE FORCE , NAIVE
var subarraysDivByK = function(A, K) {
    var result=0

    for (let i = 0; i < A.length; i++) {
        var sum=0
        for (let j = i; j < A.length; j++) {
            sum+=A[j]
            if (sum%K===0) {
                console.log(i,j)
                result++
            }
        }        
    }


    return result
};

 // Each modulo K (remainder of the division of a number by K) will ALWAYS
 // be less than K, according to the Euclidean Theorem of Division. 

// The idea: 

var subarraysDivByK = function(A, K) {
    let mod = new Array(K).fill(0);//
   
    // so by creating the mod Array we already have our 
    // "key-value" pairs that refer to
    // "moduloK : times I've seen It"

    // WHY
    mod[0]=1

    // This is the sum of the moduli of K 
    let sum = 0;

    // The count of wanted subarrays, whose Sum modulo K equals to zero
    let count=0;

    for(let i = 0; i < A.length; i++){

        //WHY
        sum=(sum+A[i])%K

        //WHY        
        if(sum<0)sum+=K


        count+=mod[sum]

        map[sum]++
    }
    return count
    

};


var subarraysDivByK = function(A, K) {
    let mod = new Array(K).fill(0);//
   
    // so by creating the mod Array we already have our 
    // "key-value" pairs that refer to
    // "moduloK : times I've seen It"

    // WHY
    mod[0]=1

    // This is the sum of the moduli of K 
    let sum = 0;

    // The count of wanted subarrays, whose Sum modulo K equals to zero
    let count=0;

    for(let i = 0; i < A.length; i++){

        //WHY
        sum=(sum+A[i])%K

        //WHY        
        if(sum<0)sum+=K


        count+=mod[sum]

        map[sum]++
    }
    return count
    

};




var subarraysDivByK = function(A, K) {
    let frequency = new Array(K).fill(0);//
   
    // so by creating the mod Array we already have our 
    // "key-value" pairs that refer to
    // "moduloK : times I've seen It"

    // If the subarray starts from i=0 and has a remainder of 0
    frequency[0]=1 // the sum%K is already 0,

    // This is the sum of the elements of A
    let sum = 0;

    // The count of wanted subarrays, whose Sum modulo K equals to zero
    let count=0;

    for(let i = 0; i < A.length; i++){

        sum=sum+A[i]


        var remainder= sum%K

        if(remainder<0)remainder+=K //ALWAYS CHOOSE THE POSITIVE REMAINDER
            

        count+=frequency[remainder]

        frequency[remainder]++
    }
    return count
    

};


console.log(
    subarraysDivByK(

        [2,3,1,2],2
    )
)


console.log((-1)%2)
console.log(1%2)