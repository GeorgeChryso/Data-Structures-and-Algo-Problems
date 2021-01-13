// You are given a two-dimensional list of integers matrix. You want to pick a number from each row. For each 0 ≤ r < n - 1 the cost for picking matrix[r][j] and matrix[r + 1][k] is abs(k - j).

// Return the maximum sum possible of the numbers chosen, minus costs.

// Constraints

// 1 ≤ n * m ≤ 200,000 where n and m are the number of rows and columns in matrix
// Example 1
// Input
// matrix = [
//     [3, 2, 1, 6],
//     [4, 1, 2, 0],
//     [1, 5, 2, -2]
// ]
// Output
// 11
// Explanation
// Return 11 by picking 3, 4 and 5


//naive dp O(nm^2)
class Solution {
    solve(A) {
        let n=A.length,m=A[0].length
        for(let i=1;i<=n-1;i++)
            for(let j=0;j<m;j++){
                let val=A[i][j]
                A[i][j]=-Infinity
                for(let k=0;k<m;k++)
                    A[i][j]=Math.max(
                                A[i][j],
                                A[i-1][k]+Math.abs(j-k)+val
                    )
            }
        return  Math.max(...A[n-1])
    }
}

/* 
    So, you can manipulate the recurrence and isolate things that can be precomputed (are independent of j)
                  A[i][j]-(j-k)+dp[i-1][k], for k<=j
    dp[i][j]=Max{
                 A[i][j]-(k-j)+dp[i-1][k], for k>j
    
                 but (dp[i-1][k]+-k ) are both independnent of j so they can be precalculated for each j 

*/
//optimized O(nm)
class Solution {
    solve(A) {
        let n=A.length,m=A[0].length
        let left=[...Array(m)].map(d=>-Infinity),
            right=[...left]
        for(let i=1;i<=n-1;i++){
            left[0]=A[i-1][0] //left[i]=the maximum value of A[i][j]+j where j<=i
            right[m-1]=-Infinity // right[i]= the maximum value of A[i][j]-j where j>i
            for(let j=1;j<m;j++)
                left[j]=Math.max(left[j-1],A[i-1][j]+j)
            for(let j=m-2;j>=0;j--)
                right[j]=Math.max(right[j+1],A[i-1][j+1]-j-1)
            for(let j=0;j<m;j++)
                A[i][j]+=Math.max(left[j]-j,right[j]+j)
        }
        return  Math.max(...A[n-1])
    }
}