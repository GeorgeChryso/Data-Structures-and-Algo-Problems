// // In how many ways can you tile a 3×n rectangle with 2×1 dominoes?

// // Here is a sample tiling of a 3×12 rectangle.
// Input consists of several test cases followed by a line containing -1. Each test case is a line containing an integer 0≤n≤30. For each test case, output one integer number giving the number of possible tilings


tests=[2,3,8,12]
output=[3,0,153,2131]
//there are only 12 states for each column. DRAW THEM and the adjacency matrix for each
// some cannot be previous to some
var Dominos=n=>{
    //create the adjacency matrix
    // adj[prev][next]=1 if prev can be previous to next, 0 otherwise
    let adj=[...Array(12)].map(d=>[...Array(12)].map(d=>0))
    let z=[[1,4,11],[0,2,3],[7,8],[9],[10],[7,8],[11],[0,2,3],[5],[0,2,3],[4,1],[6]]
    for (let i = 0; i <12; i++) 
        while(z[i].length)
            adj[i][z[i].shift()]=1
    
    let dp=[...Array(n)].map(d=>[...Array(12)].map(d=>0))
    //first column can be only states 0,2,3         
    let firstcolumn=new Set([0,2,3]),lastcolumn=new Set([1,7,9])

    for (let i = 0; i < n; i++) 
        for (let cur = 0; cur < 12; cur++) 
            for (let prev = 0; prev < 12; prev++) 
                if(i==0&&!firstcolumn.has(cur)) //basecases (1st col)
                    continue
                else if(i==n-1&&!lastcolumn.has(cur)) //lastcol
                    continue
                else if (i==0) //1st col
                    dp[i][cur]=1
                else if(adj[prev][cur])
                    dp[i][cur]=dp[i][cur]+dp[i-1][prev]
    return dp[n-1].reduce((a,c)=>a+c)
}

console.log(tests.map(d=>Dominos(d)))
//istead, a less brute forcy approach is to consider each column as a base 2 number
// 1 for occupied and 0 for free
//DRAW THE STATES AND HOW THEY CAN COME FROM PREVIOUS STATES
var Dominos=n=>{
    let prev=[...Array(8)].map(d=>0)
    //basecases
    prev[0]=1,prev[3]=1,prev[6]=1 //basecases, i can place 0, 1 dominos in a single column
    // so the cases 3 and 6 come from placing 1 domino, and 0 from placing 0 dominos
    for (let i = 1; i <n; i++) {
        let next=[...prev]
        next[0]=prev[7]     
        next[1]=prev[6]//+prev[0] Prev[0] is already accounted for in prev[6], because it's the same placing of dominos
        next[3]=prev[7]+prev[4]
        next[4]=prev[3]//+prev[0] same here, prev[3] handles the case of prev[0], cos it's the same arrangements of dominos (1 vertical and 1 horizontal)
        next[6]=prev[7]+prev[1]
        next[7]=prev[6]+prev[3]+prev[0]
        prev=next
    }
    return prev[7]
}
console.log(tests.map(d=>Dominos(d)))

//bottomup forward dp
var DominoEs=(n,m)=>{
    
    let dp=[...Array(m+1)].map(d=>[...Array(1<<n)].map(d=>0)) 
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
    
    for (let k = 0; k <m; k++) 
        for (let p = 0; p < (1<<n); p++) {// for every possible profile on column k
            let q=0 //next profile (on column k+1)
            // start the process and try to change 0-th element of p       
            search(0,p,q,k)  //create and fill all possible nexts profile q
            // with my current profile's count
        }        
    
    return dp[m][0]
}
console.log(tests.map(d=>DominoEs(3,d)))

