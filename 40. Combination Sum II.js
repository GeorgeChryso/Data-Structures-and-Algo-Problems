// Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sums to target.

// Each number in candidates may only be used once in the combination.

// Note:

// All numbers (including target) will be positive integers.
// The solution set must not contain duplicate combinations.

// typical knapsack, 
// BUT duplicates are allowed, and i dont want duplicate entries inside the result
// meaning that if tar=4 and candidates=[2,2,2]
// the only pair allowed is result=[[2,2]]
// and NOT [[2,2],[2,2],[2,2]]

//this is not the solution, this just solves knapsack with duplicates allowed
// but duplicate entries arent allowed in the result, so I apply sort of a hack memo in the end
// The implementation correctly find s the number of ways to reach a sum even with duplicates,but considers the different combinations of elements, for example
// A=[2,2,2] , tar=4 
// would normally produce the result
// [[2,2],[2,2],[2,2]], but we only want [[2,2]]

let combinationSum2=(candidates, target)=> {
    candidates.sort((a,b)=>a-b)
    let dp=[...Array(candidates.length+1)].map(d=>[...Array(target+1)].map(d=>0))
    // dp[sum][i]= #ways to reach sum with the first i items

    dp[0][0]=1 //we can reach sum 0 with 0 items in 1 way
    for (let i = 1; i <= candidates.length; i++) {
        let ele=candidates[i-1]
        for (let s = 0; s <=target; s++) {
          if(ele<=s){
            dp[i][s]+=dp[i-1][s-ele] //if this was dp[i][s-ele] it would mean that i can pick an item multiple times
          }
          dp[i][s]+=dp[i-1][s]
        }      
    }
    dp.forEach(d=>console.log(d+''))

    let result=[...Array(dp[candidates.length][target])].map(d=>[])
    //reconstruction ezpz only through dp table
    let recursion=(i,j,left)=>{
      if(i<=0||j<=0||dp[i][j]==0)return
      let num=dp[i][j]-dp[i-1][j] // I need to add my A[j-1] to the first num arrays of my result
      if(num>0){
        for (let ii = left; ii <left+num; ii++) 
          result[ii].push(candidates[i-1])        
        recursion(i-1,j-candidates[i-1],left) //then i need to pop to the previous line considering this entry
      }
      recursion(i-1,j,left+num) // I need to consider the next arrays of my result
    }
    recursion(candidates.length,target,0)
    console.log(result)
    //hack part, just skip same entries. 
    let memohack=new Set()
    return result.filter(d=>{
        let c=d.join('')
        if(!memohack.has(c)){
            memohack.add(c)
            return true
        }
        return false
    })
};

console.log(
    combinationSum2(
        [2,2,2],  4,
    )
)