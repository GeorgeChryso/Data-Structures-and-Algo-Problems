// Given a binary array, find the maximum length of a contiguous subarray with equal number of 0 and 1.

//Just Prefix-Sum TLE--FIXED with a tweak
var findMaxLength = function(A) {

    let Prefix=[...Array(A.length)].map(d=>0)
    let sum=0 
    for (let i = 0; i < A.length; i++) {
        sum+=A[i]
        Prefix[i]=sum
    }
    Prefix.unshift(0)

    let result=0
    for (let i = 0; i < Prefix.length; i++) {

        //j=i+result+1 saves it from TLE because I m always aggresively checking better cases without wasting time on smaller 
        // windows
        for (let j =i+result+1; j < Prefix.length; j++) {
            if((j-i)%2==0 &&(Prefix[j]-Prefix[i]==(j-i)/2))result=Math.max(result,j-i)
        }        
    }

    return result
};


//Optimization 1 A hashtable with a Prefix Sum index memo
var findMaxLength = function(A) {
    let memo={0:-1}
    let result=0
    let sum=0 
    for (let i = 0; i < A.length; i++) {
        sum+=A[i]?1:-1
        if(memo[sum]===undefined)memo[sum]=i
        else result=Math.max(result,(i-memo[sum])||0)
    }
    return result
};


console.log(findMaxLength(
    [0,1,0,1,1,1,0,0]
))