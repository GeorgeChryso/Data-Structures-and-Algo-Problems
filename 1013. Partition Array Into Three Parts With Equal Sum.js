// //Given an array A of integers, return true if and only if we can partition the array into three non-empty parts with equal sums.

// Formally, we can partition the array if we can find indexes i+1 < j with (A[0] + A[1] + ... + A[i] == A[i+1] + A[i+2] + ... + A[j-1] == A[j] + A[j-1] + ... + A[A.length - 1])

var canThreePartsEqualSum = function(A) {
    var sum=A.reduce((a,b)=>a+b)
    console.log(sum)
    function sumAt(i,j){
        console.log(A.slice(i,j),A.slice(i,j).reduce((a,b)=>a+b))
     return A.slice(i,j).reduce((a,b)=>a+b)

    }
    for (let i = 1; i < A.length-2; i++) {
        console.log('DATS i')
        let z=sumAt(0,i)
        for (let j = i; j < A.length-1; j++) {
            let q=sumAt(i,j+1)
            if((sum-z-q)==z && z==q){
                console.log(
                    i,j,'\n',
                    A.slice(0,i), A.slice(i,j+1) , A.slice(j+1,A.length)
                )
                return true
            }
        }        
    }
    return false
};

console.log(canThreePartsEqualSum(
    [0,2,1,-6,6,-7,9,1,2,0,1]    ))