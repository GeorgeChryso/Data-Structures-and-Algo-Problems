// On a 2-dimensional grid, there are 4 types of squares:

// 1 represents the starting square.  There is exactly one starting square.
// 2 represents the ending square.  There is exactly one ending square.
// 0 represents empty squares we can walk over.
// -1 represents obstacles that we cannot walk over.
// Return the number of 4-directional walks from the starting square to the ending square, that walk over every non-obstacle square exactly once.




// Brute force Backtracking with memo 
var uniquePathsIII = function(grid) {
    let n=grid.length,m=grid[0].length,result=0,
        memo=[...Array(n)].map(d=>[...Array(m)].map(d=>0)),
        dir=[[0,1],[0,-1],[1,0],[-1,0]], totalWalkable=n*m,start,end

    for (let i = 0; i < n; i++) 
        for (let j = 0; j < m; j++) 
            if(grid[i][j]==-1)
                totalWalkable--            
            else if (grid[i][j]==1)
                start=[i,j]
            else if( grid[i][j]==2)
                end=[i,j]


    let backtracking=(i,j,totalWalked)=>{
        if(i<0||i>=n||j<0||j>=m||memo[i][j]==1||grid[i][j]==-1)
            return
        memo[i][j]=1
        totalWalked++
        if(i==end[0]&&j==end[1]){
            result+=Number(totalWalked==totalWalkable)
            return memo[i][j]=0
        }
        for (const [x,y] of dir) 
            backtracking(i+x,j+y,totalWalked)
        
        memo[i][j]=0
        totalWalked--
    }

    backtracking(start[0],start[1],0)
    return result
};
console.log(uniquePathsIII(
    [[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
))