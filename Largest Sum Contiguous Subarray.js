















//kadane's O(n), O(1)
let largestSubarray=A=>{
    if(A.length==1)return A[0]

    let result=-Infinity
    let running=0,max=0,min=0
    for (let i = 0; i < A.length; i++) {
        running+=A[i]
        result=Math.max(A[i],result)
        if(running<min){
            min=running
        }
        else{
            max=running
            result=Math.max(result,max-min,A[i])
        }

    }

    return result
}

console.log(largestSubarray(
   // [-2,-1]
    [-1]
   // [1,-2,-3,4,-1,-2,1,5,-3]
))