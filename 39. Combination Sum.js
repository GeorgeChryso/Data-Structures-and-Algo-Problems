// Given a set of candidate numbers (candidates) (without duplicates) and a target number (target), find all unique combinations in candidates where the candidate numbers sums to target.

// The same repeated number may be chosen from candidates unlimited number of times.

// Note:

// All numbers (including target) will be positive integers.
// The solution set must not contain duplicate combinations.



//backtracking O(2^n)
var combinationSum = function(A, target) {
    let result={}
    let bktrk=(currSet,currSum,index)=>{
        if(index>=A.length||currSum>target)return
        if(currSum==target){
            //save a string hashmap
            let cs=currSet.toString()
            if(!result[cs])result[cs]=currSet
            return
        }
        //choosing A[Index] multiple times
        bktrk(currSet.concat(A[index]),currSum+A[index],index)
        
        //choosing A[index] and moving to the next element
        bktrk(currSet.concat(A[index]),currSum+A[index],index+1)

        //not choosing A[index] and moving to the next element
        bktrk(currSet,currSum,index+1)
        return
    }

    bktrk([],0,0)
    return Object.values(result)
};


var combinationSum = function(A, target) {
    A.sort((a,b)=>a-b)
    let result={}
    let termination=false
    let bktrk=(currSet,remaining,index)=>{
        console.log(currSet,remaining,index)
        if(index<0||remaining<0)return
        if(remaining==0){
            //save a string hashmap
            let cs=currSet.toString()
            if(!result[cs])result[cs]=currSet
            return
        }
        //choosing A[Index] multiple times
        bktrk(currSet.concat(A[index]),remaining-A[index],index)
        
        //choosing A[index] and moving to the next element
        if(remaining-A[index]>0)bktrk(currSet.concat(A[index]),remaining-A[index],index-1)

        //not choosing A[index] and moving to the next element
        bktrk(currSet,remaining,index-1)
        return
    }

    bktrk([],target,A.length-1)
    return Object.values(result)
};


//optimized
  const combinationSum = (candidates, target) => {
    const result = []
    const backtracking = (path, currSum, index) => {
      if (currSum > target)return
      if (currSum === target)return result.push(path.slice(0))
      
    
      while(index<candidates.length){
        const item = candidates[index]
        path.push(item)
        //try to add the element
        backtracking(path, currSum + item,index)
        //when ure here all the possibilities will be explored
        path.pop()
        index++
      }
      
    }
  
    backtracking([], 0, 0)
  
    return result
  } 
console.log(dcombinationSum(
   [2,3,6,7],7
    //[1],2
))