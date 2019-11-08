// PROBLEM 1.1
//     Given an Array of Integers A that sums up to a number M, and an integer K such that 0<=K<=M, is there a subset of A that sums up to K?



var subsetSum=(A,K)=>{
    var M=A.reduce((acc,curr)=>acc+curr) // the sum of the array


    var m=Array(M).fill(0)
    m[0]=1
    for (let i = 0; i < A.length; i++) {   
        for (let j = M; j >= A[i]; j--) {
            console.log(m+'')
            m[j]|=m[j-A[i]]
            
        }        
    }

    return m[K]?'POSSIBLE':'IMPOSSIBLE'


}

console.log(subsetSum(
    [4,2,0,0,3],2
))