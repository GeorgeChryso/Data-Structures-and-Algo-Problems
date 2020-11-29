// Given an array of non-negative integers nums, you are initially positioned at the first index of the array.

// Each element in the array represents your maximum jump length at that position.

// Your goal is to reach the last index in the minimum number of jumps.

// You can assume that you can always reach the last index.

 

// Example 1:

// Input: nums = [2,3,1,1,4]
// Output: 2
// Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
// Example 2:

// Input: nums = [2,3,0,1,4]
// Output: 2
 

// Constraints:

// 1 <= nums.length <= 3 * 104
// 0 <= nums[i] <= 105


//classic dp tle
var jump = function(A) {
    let n=A.length,dp=[...Array(n)].map(d=>Infinity)
    dp[0]=0
    for(let i=1;i<n;i++)
        for(let j=0;j<i;j++)
            if(A[j]>=i-j)
                dp[i]=Math.min(dp[j]+1,dp[i])
    return dp[n-1]
};

// monotonic queue dp optimization
// q[0] holds a pair [index,value] 
// such that an element dp[i] where i<=index can take the value 
var jump = function(A) {
    let n=A.length,dp=[...Array(n)].map(d=>false),
        q=[ [A[0],1] ]
    dp[0]=0
    for(let i=1;i<n;i++){
        while(q.length&& q[0][0]<i)
            q.shift()
        if(q.length)
            dp[i]=q[0][1]
        let newELe=[i+A[i],dp[i]+1]
        while(q.length&& dp[i]+1<=q[q.length-1][1] && q[q.length-1][0]<=i+A[i] )
            q.pop()
        q.push(newELe)
    }
    return Boolean(dp[n-1])
};


console.log(
    canJump(
        [0,2,3]
    )
)