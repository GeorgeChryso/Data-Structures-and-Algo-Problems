
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
var DominoEs=(n,m)=>{
    let dp=[...Array(m+1)].map(d=>[...Array(1<<n)].map(d=>0)) 
    dp[0][0]=1
    let isOccupied=(i,mask)=> mask&(1<<i)

    // i-th cell to change on p
    let search=(i,p,q,k)=>{
        // n-th element doesnt exist
        if(i==n){
            // DP[K+1][ NEXT ] NEEDS TO COUNT DP[K][PREVIOUS]
            // BECAUSE P CAN PRODUCE Q 
            dp[k+1][q]+=dp[k][p]
            return
        }
        //TRY PRODUCING EVERY Q
        if(isOccupied(i,p)){
            search(i+1,p,q,k) //try changing the next
            return
        }
        if(i+1<n&&!isOccupied(i+1,p)){
            search(i+2,p,q,k) //place a vertical domino on i,i+1
                            // so the EQUVALENT ELEMENTS OF Q REMAIN UNCHANGED
                            // aka Q[i] and Q[i+1]
        }

        if(k+1<m){ // IF THIS ISNT THE LAST ROW, I CAN PLACE A HORIZONTAL
            // DOMINO OCCUPYING PREVIOUS[i] AND Q[i]
            // placed a horizontal domino
            search(i+1,p,q|(1<<i),k);
        }
    }
    
    for (let k = 0; k <m; k++) 
        for (let p = 0; p < (1<<n); p++) {
            let q=0 //next profile
            // start the process and try to change 0-th element of p       
            search(0,p,q,k) 
        }        
    
    return dp[m][0]
}
tests=[2,3,8,12]
output=[3,0,153,2131]

console.log(tests.map(d=>(DominoEs(3,d))))

//forward bottom up with recursion
var DominoEs=(n,m)=>{
    let dp=[...Array(m+1)].map(d=>[...Array(1<<n)].map(d=>0)) 
    dp[0][0]=1
    let isOccupied=(i,mask)=> mask&(1<<i)

    // i-th cell to change on p
    let search=(i,p,q,k)=>{
        //essentially reached the end, as my column has n-1 elements
        if(i==n)
            // DP[K+1][ NEXT ] NEEDS TO COUNT DP[K][PREVIOUS]
            // BECAUSE P CAN PRODUCE Q 
            dp[k+1][q]+=dp[k][p]


        for (let j = i; j < n; j++) {
            if(isOccupied(j,p))
                continue
            if( j+1<n && !isOccupied(j+1,p) )
                search(j+2,p,q,k)
            if( k+1<m )
                search(j+1,p,q|(1<<j),k);
        }

    }
    
    for (let k = 0; k <m; k++) 
        for (let p = 0; p < (1<<n); p++) {
            let q=0 //next profile
            // start the process and try to change 0-th element of p       
            search(0,p,q,k) 
        }        
    
    return dp[m][0]
}

tests=[2,3,8,12]
output=[3,0,153,2131]

console.log(tests.map(d=>(DominoEs(3,d))))