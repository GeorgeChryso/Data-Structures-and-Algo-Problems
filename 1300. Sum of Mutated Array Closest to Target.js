// Given an integer array arr and a target value target, return the integer value such that when we change all the integers larger than value in the given array to be equal to value, the sum of the array gets as close as possible (in absolute difference) to target.

// In case of a tie, return the minimum such integer.

// Notice that the answer is not neccesarilly a number from arr.

 

// Example 1:

// Input: arr = [4,9,3], target = 10
// Output: 3
// Explanation: When using 3 arr converts to [3, 3, 3] which sums 9 and that's the optimal answer.
// Example 2:

// Input: arr = [2,3,5], target = 10
// Output: 5
// Example 3:

// Input: arr = [60864,25176,27249,21296,20204], target = 56803
// Output: 11361


var findBestValue = function(A, target) {
    var result=0
    var difference=Infinity    
    var biggerthan=Array(A.length).fill(0)
    var eqSum=Array(A.length).fill(0)
    var smallerSum=Array(A.length).fill(0)
    for (let i = 0; i < A.length; i++) {
        A.forEach((curr)=>{
            if(curr>A[i]){
                biggerthan[i]++
            }
            if( curr==A[i])eqSum[i]++
            if( curr<A[i]){
                smallerSum[i]+=curr
            }
        })
        let potential=Math.round(Math.abs(target-smallerSum[i])/(biggerthan[i]+eqSum[i] ))

        let potentialCons=Math.round(Math.abs((target-smallerSum[i]-(eqSum[i]*A[i]))/(biggerthan[i]) ))

        let newDif1=Math.abs(target-( potential*(biggerthan[i]+eqSum[i]) +smallerSum[i] ))
        let newDif2=Math.abs(target-( potentialCons*biggerthan[i] +smallerSum[i]+(eqSum[i]*A[i]) ))

        if( difference>newDif1){
            
            result= Math.min(potential,result)
        }
        if( difference>newDif2){
            result= Math.min(potentialCons,result)
        }
       
    }
    return result
};



var findBestValue=(A,T)=>{
    //A.sort((a,b)=>b-a)
    let max=A.reduce((max,curr)=>Math.max(max,curr),0)
    let total=A.reduce((acc,curr)=>acc+curr)
    if(total<=T)return max

    //binary search
    let start=1
    let end=max
    let curr
    while(start<max){
        curr=(start+end)/2
        total=0
        for (const element of A) {
            total+= element>curr?curr:element
        }
        if(total>=T)end=curr
        else start=curr+1
        
    }



}   
