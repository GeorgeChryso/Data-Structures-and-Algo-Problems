
/*

Problem description. Given a grid of size N×M. Find number of ways to fill the grid with figures of size 2×1 (no cell should be left unfilled, and figures should not overlap each other).

Let the DP state be: dp[i,mask], where i=1,…N and mask=0,…2^M−1.

i represents number of rows in the current grid, and mask is the state of last row of current grid. If j-th bit of mask is 0 then the corresponding cell is filled, otherwise it is unfilled.

Clearly, the answer to the problem will be dp[N,0].

We will be building the DP state by iterating over each i=1,⋯N and each mask=0,…2M−1, and for each mask we will be only transitioning forward, that is, we will be adding figures to the current grid.
*/

//idea https://coderevilbuggy.blogspot.com/2018/05/broken-profile-dynamic-programming.html

//forward bottom up with recursion
var DominoEs=(n,m)=>{
    let dp=[...Array(m+1)].map(d=>[...Array(1<<n)].map(d=>0)) 
    //dp[i][k] the number of ways to tile up to i-th column, when the i-th column has
    // profile mask k

    //dp[i][q]= Σ( dp[i-1][p]), such that p can produce q , aka q is the next of p 
    

    // Strategy: INSTEAD OF EXAMINING EACH POSSIBLE COMBINATION OF MASKS ( 2^N * 2^N), 
    // I m gonna try to produce each possible next (q) mask from its previous (p)
    // by placing, when possible, each of my tiles. 


    dp[0][0]=1 //basecase
    let isOccupied=(i,mask)=> mask&(1<<i)

    // i-th cell to change on mask p, 
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
            search(i+1,p,q,k) //try changing the next element in that column
            return
        }
        //if this isnt the last element of my column (aka there's at least 1 more (i+1))
        // and the i+1-th of my column is free
        if(i<n-1&&!isOccupied(i+1,p)){
            search(i+2,p,q,k) //place a vertical domino on i,i+1
                            // so the EQUVALENT ELEMENTS OF Q REMAIN UNCHANGED
                            // aka Q[i] and Q[i+1]
        }

        if(k<m-1){ // IF THIS ISNT THE LAST COLUMN, I CAN PLACE A HORIZONTAL
            // DOMINO OCCUPYING PREVIOUS[i] AND Q[i]
            // placed a horizontal domino
            search(i+1,p,q^(1<<i),k);
        }
    }
    
    for (let k = 0; k <m; k++) // for each one of the columns, 
        for (let p = 0; p < (1<<n); p++) {// for every possible profile on column k
            let q=0 //next profile (on column k+1)
            // start the process and try to change 0-th element of p       
            search(0,p,q,k)  //create and fill all possible nexts profile q
            // with my current profile's count
        }        
    
    return dp[m][0]
}
tests=[2,3,8,12]
//output=[3,0,153,2131]
console.log(tests.map(d=>(DominoEs(d,3))))




//forward N*M dominos + trominos
var numTilings=(n,m)=>{
    if(n<=2)
        return n
    n--
    //prefer to always have n as the smaller number
    let dp=[...Array(m+1)].map(d=>[...Array(1<<n)].map(d=>0)) 
    dp[0][0]=1 //basecase
    let isOccupied=(i,mask)=> mask&(1<<i)

    // i-th cell to change on p
    let search=(i,p,q,k)=>{
        // n-th element doesnt exist
        if(i==n){
            // DP[K+1][ NEXT ] NEEDS TO COUNT DP[K][PREVIOUS]
            // BECAUSE P CAN PRODUCE Q 
            //console.log(p.toString(2),q.toString(2),k,dp[k][p])
            dp[k+1][q]=(dp[k+1][q]+dp[k][p])%(1e9+7)
            return
        }
        //TRY PRODUCING EVERY Q
        if(isOccupied(i,p)){
            search(i+1,p,q,k) //try changing the next element in that column
            return
        }
        //if this isnt the last element of my column (aka there's at least 1 more (i+1))
        // and the i+1-th of my column is free
        
        //the previous line is tiled or i==0
        // 
        /*       
             (*) *      (*) *         (*)
              *             *          * *
        */
        if(i<n-1&&k<m-1){
            if(!isOccupied(i,q)&&!isOccupied(i+1,p))
                search(i+2,p,q|(1<<i),k)

            if(!isOccupied(i,q)&&!isOccupied(i+1,q)) //edge case bottom
                search(i+1,p,q|(1<<i)|(1<<(i+1)),k)
                
            if(!isOccupied(i+1,q)&&!isOccupied(i+1,p))
                search(i+2,p,q|(1<<(i+1)),k)
        }
        /*
               *     
           (*) *             
        */
        if(i>=1&&k<m-1&&!isOccupied(i-1,q)&&!isOccupied(i,q))
            search(i+1,p,q|(1<<i)|(1<<(i-1)),k)

        /*
                              (*)     
             (*) *             *    
        */
        if(k<m-1 && !isOccupied(i,q))
            search(i+1,p,q|(1<<i),k);

        if(i<n-1 && !isOccupied(i+1,p) )
            search(i+2,p,q,k) 

    }
    
    for (let k = 0; k <m; k++) 
        for (let p = 0; p < (1<<n); p++) {// for every possible profile on column k
            let q=0 //next profile (on column k+1)
            // start the process and try to change 0-th element of p       
            search(0,p,q,k)  //create and fill all possible nexts profile q
            // with my current profile's count
        }        
    
    return dp[m][0]
}


console.log([4,5,6,12,15,17,21].map(d=>numTilings(3,d)))
//output has to be, [ 11, 24, 53, 6105, 65501, 318632, 7540017 ]



// Forward with BLOCKED CELLS
var Xenia=(A)=>{

    // INPUT 
    A=A.map(d=>d.split(','))
    let z=[],n=A.length,m=A[0].length
    for (let col = 0; col < A[0].length; col++) {
        let mask=0
        for (let i = 0; i < A.length; i++) {
            if(A[i][col]!=='.') // 'X' cells are blocked
                mask|=(1<<(i))
        }        
        z.push(mask)
    }
    A=z

    // Forward DP
    n--
    //prefer to always have n as the smaller number
    let dp=[...Array(m+1)].map(d=>[...Array(1<<n)].map(d=>0)) 
    dp[0][0]=1 //basecase
    let isOccupied=(i,mask,j)=>mask&(1<<i)
    // i-th cell to change on p
    let search=(i,p,q,k)=>{
        if(i==n&&(A[k+1]&q)==0){
            //the next also has to be valid, aka not overlap with the k+1's mask
            console.log(p.toString(2),q.toString(2),A[k].toString(2),k)
            dp[k+1][q]=(dp[k+1][q]+dp[k][p])%(1e9+7)
            return
        }
        if(isOccupied(i,p,k)){
            search(i+1,p,q,k) 
            return
        }
        /*
                              (*)     
             (*) *             *    
        */
        if(k<m-1 && !isOccupied(i,q,k))
            search(i+1,p,q|(1<<i),k);
        if(i<n-1 && !isOccupied(i+1,p,k) )
            search(i+2,p,q,k) 
    }

    // Driver
    for (let k = 0; k <m; k++) 
        for (let p = 0; p < (1<<n); p++) {// for every possible profile on column k
            if(p&A[k]) //p must be valid
                continue
            let q=0 //next profile (on column k+1)
            // start the process and try to change 0-th element of p       
            search(0,p,q,k)  //create and fill all possible nexts profile q
            // with my current profile's count
        }        
    return dp[m][0]
}
// tiling problems
//https://projecteuler.net/problem=189
//7255 - Land of Farms
// dp tiling
//http://fileadmin.cs.lth.se/contest/nwerc/Problemset_NWERC2004.pdf
// poj 1038
// sgu 131
// sgu 132
// sgu 223
// sgu 225
// zoj 1346
// poj 3254
// poj 1185
// poj 3311
// hdu 3001
// poj 2288
// zoj 4257
// hdu 3681
// poj 2430
// poj 2436
// poj 2541
// poj 2836
// poj 1699
// poj 2288
// poj 2688
// poj 3411
// poj 2686
// poj 1482
// poj 2690
// poj 3719
// poj 1795
// poj 1739
// poj 3593
// poj 2088
// UVA 10359 - Tiling
// UVA 10918 - Tri Tiling
// SPOJ GNY07H (Four Tiling)
// SPOJ M5TILE (Five Tiling)
// SPOJ MNTILE (MxN Tiling)
// SPOJ DOJ1
// SPOJ DOJ2
// SPOJ BTCODE_J
// SPOJ PBOARD
// ACM HDU 4285 - Circuits
// LiveArchive 4608 - Mosaic
// Timus 1519 - Formula 1
// Codeforces Parquet