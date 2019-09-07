// //Given an array A of integers, return true if and only if we can partition the array into three non-empty parts with equal sums.

// Formally, we can partition the array if we can find indexes i+1 < j with (A[0] + A[1] + ... + A[i] == A[i+1] + A[i+2] + ... + A[j-1] == A[j] + A[j-1] + ... + A[A.length - 1])

var canThreePartsEqualSum = function(A) {
    var sum=A.reduce((a,b)=>a+b)
    var sums=[0,0]
   
    for (let i = 0; i < A.length-1; i++) {
        sums[0]+=A[i]
        for (let j = i+1; j < A.length-1; j++) {
            sums[1]+=A[j]

            if(sums[0]==sums[1]&& (sum-sums[0]-sums[1])==sums[1]){ return true}

           
        }
        sums[1]=0        
    }
    return false
};

console.log(canThreePartsEqualSum(
    [18,12,-18,18,-19,-1,10,10] ))