// NOTE: This problem statement contains images that may not display properly if viewed outside of the applet.



// "4Blocks" is a two player cooperative game played on a special board. The board is a grid composed of 1x1 square cells. There are two different kinds of blocks: '1' blocks and '4' blocks. '1' blocks are 1x1, and '4' blocks are 2x2:






// You must place blocks on the board so that their sides are aligned to the grid lines and no two blocks overlap. The final score is the sum of the values in each cell. '1' blocks are worth 1 point, and '4' blocks are worth 16 points because they cover 4 cells and each cell is worth 4 points.



// Your friend has taken his turn and placed a number of '1' blocks on the board. The current nexturation is given in the String[] grid. The j-th character of the i-th element of grid is '.' if the cell at row i, column j is empty, and '1' if your friend placed a '1' block in that cell. It is now your turn, and you can place any number of '1' or '4' blocks on the board, but you cannot remove any of the blocks that have already been placed. Return the maximum score that can be achieved. For example, the following images show one possible starting state, and the optimal placement of blocks from that state:







// The final score would be 4*16 + 6*1 = 70.
 
// Definition
    	
// Class:	FourBlocks
// Method:	maxScore
// Parameters:	String[]
// Returns:	int
// Method signature:	int maxScore(String[] grid)
// (be sure your method is public)
    
 
// Constraints
// -	grid will contain between 1 and 10 elements, inclusive.
// -	Each element of grid will contain between 1 and 25 characters, inclusive.
// -	All elements of grid will contain the same number of characters.
// -	Each element of grid will contain only '.' or '1' (one).
 
// Examples
// 0)	
    	
// {".....1..1..",
//  "..1.....1.."}
// Returns: 70
// This is the example from the statement.
// 1)	
    	



// https://community.topcoder.com/stat?c=problem_statement&pm=10487

//http://sk765.blogspot.com/2012/02/dynamic-programming-with-profile_7469.html


var maxScoreA=A=>{
    let M=A[0].length,N=A.length,
        dp=[...Array(M+1)].map(d=>[...Array(1<<N)].map(d=>-1))

    //create an array of the bitmask representations of M columns
    let cols=[]
    for (let j = 0; j < M; j++) {
        let mask=0
        for (let i = 0; i < N; i++) 
            if(A[i][j]==='1')
                mask|=(1<<i)            
        cols.push(mask)
    }

    //returns count of ones in bitmask
    let countTopLeftFour=mask=>{
        let res=0
        while(mask)
            res+=mask&1,
            mask>>=1
        return res
    }

    //idx is the index of the current column
    // and mask is it's mask represntation,
    //  aka the elements already placed by the other player
    // rec(idx,mask) returns the Max outcome for the idx-th column
    // when it's prev column has a profile of mask
    // 
    let rec=( idx,  prev)=>{
        if(idx == M){ //the m-th column is the last
            if(prev == 0) 
                return 0;
            return -Infinity;
        }
        
        // Invalid overlap with already placed 1 
        if(prev & cols[idx]) 
            return -Infinity;
        
    
        if( dp[idx][prev] != -1) // Memo
            return  dp[idx][prev];
        
        dp[idx][prev]=0

        //try every PROFILE for the CURRENT IDX-TH COLUMN
        for(let next = 0; next < (1<<(N-1)); next++){
            
            //next|(next<<1) essentially creates a mask with all the occupied cells by my NEXT MASK CHOICE

            if( (next & (next<<1)) || //this checks if there are any adjacent ones, which is impossible for 4x4 top edges to be next to each other
                (prev & (next | (next<<1))) || //this checks if there are any adjacent ones in the two consecutive columns, which it cant be
                (cols[idx] & (next | (next<<1))) //this checks for invalid profile, aka there's an overlap with the already placed ones by the other player
                )
                    continue;
            

            // Ok, so the counting here is tricky.
            dp[idx][prev] = Math.max( dp[idx][prev], 
                            rec(idx+1, next | (next<<1) ) + //notice that I pass (next|next<<1) INSTEAD OF JUST NEXT , indicating all of the occupied cells on that column
                            countTopLeftFour(next) * 16 + // Essentially, this counts Only the score by the 4x4s on this column and the one in the right of it, aka its next

                            /*==========================TURICKY PART=======================\\
                                I want to count the remaining ones of my "next" mask
                                But to do that, I want to also consider the previous mask, cos what if the previous mask
                                contains some 1s (4x4s) which extend to the "next" mask?
                                example                                                *(next|(next<<1))
                                   prev next        So, prev was already converted to its ACTUAL* occupancy
                                    0     1         represntation. That means that those two ones extend to 
                                    0     0         the "next" mask, and should therefore not be counted
                                    1     0         cos they were countd on the previous call of rec.
                                    1     0         So I will count the one the bottom, (the remaining 0)
                                    0     0 <==== this one , because it isnt occupied by any previous squares or
                                                    current 4x4s squares and will therefore be occupied by just a 1x1 square that needs to be accounted for. 
                            */
                            (N - countTopLeftFour( prev | next | (next<<1))) //This counts only the 1x1s of the "next" mask that arent occupied by any choices of the previous column
                         );
        }
        
        return dp[idx][prev]
        
    }


    return rec(0,0)
}


// O(m*n*2^(n+1)) , petr code dunno
var maxScoreB=A=>{
    let M=A[0].length,N=A.length,
        max =[...Array(1 << (N + 1))].map(d=>-1);

    max[max.length - 1] = 0;

    for (let col = 0; col < M; ++col)
        for (let row = 0; row < N; ++row)
        {
            let nmax =[...Array(1 << (N + 1))].map(d=>-1);
            for (let mask = 0; mask < (1 << (N + 1)); ++mask)
            {
                if (max[mask] < 0)
                    continue;
                if (row == 0){
                    let nmask = (mask << 1) & ((1 << (N + 1)) - 1);
                    if (A[row][col] != '.')
                        ++nmask;
                    nmax[nmask] = Math.max(nmax[nmask], max[mask]);
                }
                else{
                    let nmask = mask & ~(1 << row);
                    if (A[row][col] != '.')
                        nmask += (1 << row);
                    nmax[nmask] = Math.max(nmax[nmask], max[mask]);
                    if (A[row][col] == '.' && (((mask >> (row - 1)) & 7) == 0)){
                        nmask = mask + (7 << (row - 1));
                        nmax[nmask] = Math.max(nmax[nmask], max[mask] + 1);
                    }
                }
            }
            max = nmax;
        }

    let res =Math.max(...max)
    return res * 12 + N * M;
}

// Forward dp
var maxScore=A=>{
    let bitCount=(mask,res=0)=>mask!==0?bitCount(mask>>1,res+(mask&1)):res,
        M=A[0].length,N=A.length,
        //DP[i][mask] is the max value i can get when up to the i-th column EVERYTHING IS TILED, and the i+1-th column has profile mask. This max value entails only the tiles I PLACED, and not the ones that were already placed by the other player. 
        dp=[...Array(M+1)].map(d=>[...Array(1<<N)].map(d=>-1)),
        placedAlrdy=1,columns=[]

    //i is the i-th element on my column[k] that I'm considerign to place
    // a tile on. This column has currently the mask prev. And I'm creating
    // each potential next mask that will obviously go to dp[k+1][next]
    let rec=(i,prev,next,sum,k)=>{
            if(i==N){
                dp[k+1][next] = Math.max(dp[k+1][next], sum);
                return;
            }
            //place nothing on i
            rec(i + 1, prev, next, sum,k);

            //PLACED A 1X1 on prev[i]
            if ((prev & (1 << i)) == 0) 
                rec(i + 1, prev, next, sum + 1,k);

            // PLACED A 2X2 ON prev[i],prev[i+1]
            if (i < N - 1 && 
                (prev & (1 << i)) == 0 && (prev & (1 << (i + 1))) == 0
             && (next & (1 << i)) == 0 && (next & (1 << (i + 1))) == 0
             ) 
                rec(i + 2, prev, next | (1 << i) | (1 << (i + 1)), sum + 16,k);
        }

    for (let i = 0; i < M; ++i) {
        let mask = 0;
        for (let j = 0; j < N; ++j) 
          if (A[j][i] === '1') 
            mask |=(1 << j);

        columns.push(mask)
        placedAlrdy += bitCount(mask); // count the preplaced ones
    }

    //for each column
    for (let k = 0; k < M; k++) 
    //==================== These 2 lines are the most imposrtant part========================\\
/*
                Instead of immediately searching for my mask of choice for the k-th column,
                I'm searching for masks that do not overlap with the column itself, so I dont recount the placedAlrdy elements. 
*/
        for (let mask = 0; mask < (1 << N); mask++) //for each possible mask on this column
          if ((mask & columns[k]) == 0) // that doesnt overlap with the mask
            rec(0,mask|columns[k], next=0, sum=dp[k][mask],k);
      
    return dp[M][0] + placedAlrdy; // All M columns tiled and m+1-th has profile 0 (there is no  m+1th column obviously.)
}
let tests=[

    [".....1...",
    ".....1...",
    "111111111",
    ".....1...",
    ".....1..."],
    ["...1.",
    ".1...",
    "..1.1",
    "1...."],
    ["...1.",
    ".....",
    ".1..1",
    ".....",
    "1...."],
    [".....1..1..",
      "..1.....1.."],
    ["......1...........1.............1.....1......",
     ".................1.....1....................."
    ],
    ["1..1..111111111111", "...1...11...1...11", "...1...1....1....1", "..111..1...111...1"],
    ["1...11..1...1", "....1...1....", "....1...1....", "11111...11111", "1111111111111", "11111...1..11", "....1...1...1", "....1...1...1", "1...1..11...1"],
    ["1.........11111....1..1..", "....1111........11...1...", ".1.......1........1..11..", "....11.......111111......", ".......1...1......1...1..", ".1..1..1..11..1...1111...", ".........1.1...1.1.1.....", "....11..1..1....1....1...", "...1......111....1.....1.", "1..1.....11.....1....1..."],
    ["......1.....1", "1......1....1", "...1.....11..", "......1.....1", "...1.........", "......1.1...1", ".............", "..1.11...1...", ".1....1....1.", "...1........."]
]
console.log(tests.map(d=>maxScoreA(d)))
console.log(tests.map(d=>maxScoreB(d)))

console.log(tests.map(d=>maxScore(d)))

let output=[
    117,20,73,70,318,168,261,586,358
]