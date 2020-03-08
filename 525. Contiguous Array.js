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


//Optimization 1 A hashtable will help me decide 
var findMaxLength = function(A) {
    let memo={}
    let result=0
    let sum=0 
    for (let i = 0; i < A.length; i++) {
        sum+=A[i]
        if(memo[0]===undefined&&sum==(i+1)/2&&i>0)memo[0]=i
        else result=Math.max(i-memo[0],result)
    }

    return result
};


console.log(findMaxLength(
    [0,1,0]
))