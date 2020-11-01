
/*

Problem description. Given a grid of size N×M. Find number of ways to fill the grid with figures of size 2×1 (no cell should be left unfilled, and figures should not overlap each other).

Let the DP state be: dp[i,mask], where i=1,…N and mask=0,…2^M−1.

i represents number of rows in the current grid, and mask is the state of last row of current grid. If j-th bit of mask is 0 then the corresponding cell is filled, otherwise it is unfilled.

Clearly, the answer to the problem will be dp[N,0].

We will be building the DP state by iterating over each i=1,⋯N and each mask=0,…2M−1, and for each mask we will be only transitioning forward, that is, we will be adding figures to the current grid.
*/

// O-> FILLED
// 1->EMPTY

// so the mask 010=> 0
//                   1
//                   0

// 0->FULLY FILLED



//forward bottom up with recursion
let DominoEs=(n,m)=>{
    // row, column, mask,nextmask
    let calc=(x,y,cur_mask,nextmask)=>{
        //lastrow
        if(x==n)
            return
        //lastcolumn
        if(y>=m)
            dp[x+1][nextmask]+=dp[x][cur_mask]
        else{
            let mymask=1<<y //try turning on the y-th bit of the row
            if(cur_mask&mymask!==0) // not fully filled, try next bit
                calc(x,y+1,cur_mask,nextmask)  

            else{ //fully filled, aka mymask completes cur_mask

                calc (x, y+1, cur_mask, nextmask | mymask); //tile the next bit 

                if (
                        y+1 < m &&
                        !(cur_mask & mymask) && 
                        !(cur_mask & (mymask << 1))
                    )
                        calc (x, y+2, cur_mask, nextmask);
            }
        }
    }
    // dp[i][mask] =#ways to tile up to i-th row, with the i-th row being the mask base2
    let dp=[...Array(n)].map(d=>[...Array(1<<m)].map(d=>0))

    //basecase
    dp[0][0]=1 //the first row can be fully tiled in 1 way
    
    for (let row=0; row<n; row++)
        for (let mask=0; mask<(1<<m); ++mask)
            calc (row, 0, mask, 0);

    return dp[n][0]
}

console.log(DominoEs(4,5))