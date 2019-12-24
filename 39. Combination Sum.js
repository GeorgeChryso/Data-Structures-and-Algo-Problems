// Given a set of candidate numbers (candidates) (without duplicates) and a target number (target), find all unique combinations in candidates where the candidate numbers sums to target.

// The same repeated number may be chosen from candidates unlimited number of times.

// Note:

// All numbers (including target) will be positive integers.
// The solution set must not contain duplicate combinations.



//backtracking immediately



var combinationSum = function(A, target) {
    A.sort((a,b)=>a-b)
    let totalSum=A.reduce((acc,curr)=>acc+curr)
    let result=new Set()
    let bktrk=(currSet,currSum,remainingSum,index)=>{
        console.log(currSet)
        if(index>=A.length||currSum>target)return
        if(currSum==target){
            if(!result.has(currSet.toString()))result.add(currSet.toString())
            return
        }
        //choosing A[Index] multiple times
        bktrk(currSet.concat(A[index]),currSum+A[index],remainingSum-A[index],index)
        
        //choosing A[index]
        bktrk(currSet.concat(A[index]),currSum+A[index],remainingSum-A[index],index+1)
        //not choosing A[index]
        bktrk(currSet,currSum,remainingSum-A[index],index+1)
        return
    }

   bktrk([],0,totalSum,0)

   return Array.from(result.values()).map(d=>d.split(',').map(d=>Number(d)))
};

console.log(combinationSum(
   // [2,3,6,7],7
    [1],2
))