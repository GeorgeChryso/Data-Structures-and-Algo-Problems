// Given a rows x cols matrix grid representing a field of cherries. Each cell in grid represents the number of cherries that you can collect.

// You have two robots that can collect cherries for you, Robot #1 is located at the top-left corner (0,0) , and Robot #2 is located at the top-right corner (0, cols-1) of the grid.

// Return the maximum number of cherries collection using both robots  by following the rules below:

// From a cell (i,j), robots can move to cell (i+1, j-1) , (i+1, j) or (i+1, j+1).
// When any robot is passing through a cell, It picks it up all cherries, and the cell becomes an empty cell (0).
// When both robots stay on the same cell, only one of them takes the cherries.
// Both robots cannot move outside of the grid at any moment.
// Both robots should reach the bottom row in the grid.




var cherryPickup = function(A) {
    let [n,m]=[A.length,A[0].length],
        dp=[...Array(n)].map(d=>[...Array(m)].map(d=>[...Array(m)].map(d=>-Infinity)))
        dp[0][0][m-1]=A[0][0]+A[0][m-1]
    /*  
        dp[i][j][k] max score i can obtain if at the i-th row the first robot is at A[i][j] and the second at A[i][k]
    */
    for(let i=1;i<n;i++)
        for (let j = 0; j <m; j++) 
            for (let k = 0; k < m; k++)
                for (let q1 = -1; q1 <= 1; q1++) 
                    for (let q2 = -1; q2 <=1; q2++) 
                        if(j+q1>=0&&k+q2>=0&&j+q1<m&&k+q2<m)
                            dp[i][j][k]=Math.max(
                                    dp[i][j][k],
                                    dp[i-1][j+q1][k+q2] + A[i][j]+ Number(j!=k)*A[i][k])                                         
   
    return Math.max(...dp[n-1].flat())
};

