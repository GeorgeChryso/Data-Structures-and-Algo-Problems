// Find all possible combinations of k numbers that add up to a number n, given that only numbers from 1 to 9 can be used and each combination should be a unique set of numbers.

// Note:

// All numbers will be positive integers.
// The solution set must not contain duplicate combinations.
// Example 1:

// Input: k = 3, n = 7
// Output: [[1,2,4]]
// Example 2:

// Input: k = 3, n = 9
// Output: [[1,2,6], [1,3,5], [2,3,4]]

//typical knapsack no duplicates with fixed choices
let combinationSum3=(k, target)=> {
    let candidates=[1,2,3,4,5,6,7,8,9]

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
    return result.filter(d=>
      d.length==k
    )
};


console.log(
    combinationSum3(3,9)
)