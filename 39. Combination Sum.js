// Given a set of candidate numbers (candidates) (without duplicates) and a target number (target), find all unique combinations in candidates where the candidate numbers sums to target.

// The same repeated number may be chosen from candidates unlimited number of times.

// Note:

// All numbers (including target) will be positive integers.
// The solution set must not contain duplicate combinations.



// //backtracking O(2^n)
// var combinationSum = function(A, target) {
//     let result={}
//     let bktrk=(currSet,currSum,index)=>{
//         if(index>=A.length||currSum>target)return
//         if(currSum==target){
//             //save a string hashmap
//             let cs=currSet.toString()
//             if(!result[cs])result[cs]=currSet
//             return
//         }
//         //choosing A[Index] multiple times
//         bktrk(currSet.concat(A[index]),currSum+A[index],index)
        
//         //choosing A[index] and moving to the next element
//         bktrk(currSet.concat(A[index]),currSum+A[index],index+1)

//         //not choosing A[index] and moving to the next element
//         bktrk(currSet,currSum,index+1)
//         return
//     }

//     bktrk([],0,0)
//     return Object.values(result)
// };


// var combinationSum = function(A, target) {
//     A.sort((a,b)=>a-b)
//     let result={}
//     let termination=false
//     let bktrk=(currSet,remaining,index)=>{
//         console.log(currSet,remaining,index)
//         if(index<0||remaining<0)return
//         if(remaining==0){
//             //save a string hashmap
//             let cs=currSet.toString()
//             if(!result[cs])result[cs]=currSet
//             return
//         }
//         //choosing A[Index] multiple times
//         bktrk(currSet.concat(A[index]),remaining-A[index],index)
        
//         //choosing A[index] and moving to the next element
//         if(remaining-A[index]>0)bktrk(currSet.concat(A[index]),remaining-A[index],index-1)

//         //not choosing A[index] and moving to the next element
//         bktrk(currSet,remaining,index-1)
//         return
//     }

//     bktrk([],target,A.length-1)
//     return Object.values(result)
// };


// //optimized
//   var combinationSum = (candidates, target) => {
//     const result = []
//     const backtracking = (path, currSum, index) => {
//       if (currSum > target)return
//       if (currSum === target)return result.push([...path])
      
    
//       while(index<candidates.length){
//         const item = candidates[index]
//         path.push(item)
//         //try to add the element
//         backtracking(path, currSum + item,index)
//         //when ure here all the possibilities will be explored
//         path.pop()
//         index++
//       }

//     }
  
//     backtracking([], 0, 0)
  
//     return result
//   } 


//   function combinationSum(candidates, target) {
//     candidates.sort((a, b) => a - b);
  
//     var length = candidates.length;
//     var res = [];

//     function search(idx, prefix, target) {
//         if (idx === length || target<=0) return;
//         if (target === 0)return res.push(prefix.slice());
  
//         prefix.push(candidates[idx]);
//         search(idx, prefix, target - candidates[idx]);
//         prefix.pop();
//         search(idx + 1, prefix, target);
//       }
    
//     search(0, [], target);
//     return res;
  
   
//   };


// No duplicates=>but repetion is allowed=> unbounded knapsack
function combinationSum(candidates, target) {
    let dp=[...Array(candidates.length+1)].map(d=>[...Array(target+1)].map(d=>0))
    // dp[sum][i]= #ways to reach sum with the first i items

    dp[0][0]=1// we can reach sum 0 with 0 items in 1 way
    for (let i = 1; i <= candidates.length; i++) {
        let ele=candidates[i-1]
        for (let s = 0; s <=target; s++) {
          if(ele<=s){
            dp[i][s]+=dp[i][s-ele] //this line allows repetition,
            // if it was +=dp[i-1][s-ele], it would mean that i m only picking an element once
          }
          dp[i][s]+=dp[i-1][s]
          
        }      
    }

    dp.forEach(d=>console.log(d+''))
    let result=[...Array(dp[candidates.length][target])].map(d=>[])
    //reconstruction ezpz only through dp table
    let recursion=(i,j,left)=>{
      if(i<=0||j<=0||dp[i][j]==0)return
      let num=dp[i][j]-dp[i-1][j]
      if(num>0){
        for (let ii = left; ii <left+num; ii++) 
          result[ii].push(candidates[i-1])        
        recursion(i,j-candidates[i-1],left)
      }
      recursion(i-1,j,left+num)
    }
    recursion(candidates.length,target,0)
    return result
};





console.log(combinationSum(
  [2,3,4,5], 8,
    //[1],2
))