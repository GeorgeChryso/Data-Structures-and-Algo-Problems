// NOTE: This problem statement contains images that may not display properly if viewed outside of the applet.



// "4Blocks" is a two player cooperative game played on a special board. The board is a grid composed of 1x1 square cells. The grid is two cells high. There are two different kinds of blocks: '1' blocks and '4' blocks. '1' blocks are 1x1, and '4' blocks are 2x2:






// You must place blocks on the board so that their sides are aligned to the grid lines and no two blocks overlap. The final score is the sum of the values in each cell. '1' blocks are worth 1 point, and '4' blocks are worth 16 points because they cover 4 cells and each cell is worth 4 points.



// Your friend has taken his turn and placed a number of '1' blocks on the board. The current configuration is given in the String[] grid. The j-th character of the i-th element of grid is '.' if the cell at row i, column j is empty, and '1' if your friend placed a '1' block in that cell. It is now your turn, and you can place any number of '1' or '4' blocks on the board, but you cannot remove any of the blocks that have already been placed. Return the maximum score that can be achieved. For example, the following images show one possible starting state, and the optimal placement of blocks from that state:







// The final score would be 4*16 + 6*1 = 70.
 
// Definition
    	
// Class:	FourBlocksEasy
// Method:	maxScore
// Parameters:	String[]
// Returns:	int
// Method signature:	int maxScore(String[] grid)
// (be sure your method is public)
    
 
// Constraints
// -	grid will contain exactly 2 elements.
// -	Each element of grid will contain between 1 and 50 characters, inclusive.
// -	All elements of grid will contain the same number of characters.
// -	Each element of grid will contain only '.' or '1' (one).
 
// Examples
// 0)	
    	
// {".....1..1..",
//  "..1.....1.."}
// Returns: 70
// This is the example from the statement.
// 1)	
    	
// {"....................",
//  "...................."}
// Returns: 160
// We can fit ten '4' blocks in this setup.
// 2)	
    	
// {".1.........11.........",
//  "..1.1......11........."}
// Returns: 128
// 3)	
    	
// {"......1.....1...1.",
//  ".................."}
// Returns: 108



let ez=A=>{
    let n=A[0].length,dp=[...Array(n+1)].map(d=>0)
    dp[1]=2 // till 1st col max score is 2, tiling with 2 1s

    //dp[i]=max score I can achieve till column i
    for (let i = 2; i <= n; i++) 
        if((Number(A[0][i-1]==='1')+Number(A[1][i-1]==='1')==0)&&
            (Number(A[0][i-2]==='1')+Number(A[1][i-2]==='1')==0)
        ) // if both previous columns have profile 0, i can place  a 4sq
            dp[i]=Math.max(dp[i-2]+16,dp[i-1]+2)
        else //else i place 2 1s
            dp[i]=dp[i-1]+2
    
    return dp[n]
}

console.log(
    ez(
        [".1.........11.........",
         "..1.1......11........."]
// 128

    ),
    ez(
    ["......1.....1...1.",
     ".................."]) //108
    ,
    ez(
        [	".1.....1.1.1.1...........1........................", ".1.......1.1.1.1................................1."] //304
    )
    ,
    ez(
        ["11111", "....."]
    )//2
    ,
    ez(
        ["1", "."] //10
    ),
    ez(
        ["......................1..........1.", ".1........1......1....1............"] //238
    ),
    ez(
        ["......1...........1.............1.....1......", ".................1.....1....................."]
    )//318
)