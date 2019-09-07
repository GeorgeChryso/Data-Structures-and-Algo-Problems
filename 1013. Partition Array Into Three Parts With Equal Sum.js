// //Given an array A of integers, return true if and only if we can partition the array into three non-empty parts with equal sums.

// Formally, we can partition the array if we can find indexes i+1 < j with (A[0] + A[1] + ... + A[i] == A[i+1] + A[i+2] + ... + A[j-1] == A[j] + A[j-1] + ... + A[A.length - 1])
var canThreePartsEqualSum = function(A) {
    var sum=A.reduce((a,b)=>a+b)
    if( sum%3 )return false
    var sums=[0,0]
   
    for (let i = 0; i < A.length-1; i++) {
        sums[0]+=A[i]
        if(sums[0]!=Math.floor(sum/3)){continue;}
        for (let j = i+1; j < A.length-1; j++) {
            sums[1]+=A[j]
            if(sums[1]!=Math.floor(sum/3)){continue;}
            return true
           

           
        }
    }
    return false



};

var canThreePartsEqualSum=function(A){
    var sum=A.reduce((a,b)=>a+b)
    if( sum%3 )return false
    var sum=Math.floor(sum/3)
    var count=0
    var checkSum=0
    for (let i = 0; i < A.length; i++) {
       
        checkSum+=A[i]
        if(checkSum==sum){
            count++
            if(count==2){return true}
            checkSum=0
        }
    }
    return false

}
console.log(canThreePartsEqualSum(
    [18,12,-18,18,-19,-1,10,10] ))