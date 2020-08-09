


//known dp with fixed lengths
//Let dp[i][j] be the minimum cost if we cut on the stick from cuts[i] to cuts[j].
//                                                             -------------------

// Optimal Substructure: dp[i][j]=Min(dp[i][k]+dp[k][j]+cost[j]-cost[i]) I need to calculate every potential cut
// Overlapping Subproblems: Consider the recursion tree of dp[0][2] and dp[1][3] => They both consider case dp[1][2]
var minCost = function(n, cuts) {
    cuts.push(0, n); //Sentinels
    cuts.sort((a, b) => a - b);
    console.log(cuts)
    let N=cuts.length
    let dp = [...Array(N)].map(d => [...Array(N)].map(d=>Infinity));

    // length of my window is 1 
    //adjacent cuts on my starting array
    for (let i = 0; i <N; i++) {
        dp[i][i+1]=0  // cant cut it. As in I m never given the option to perform that cut No matter what the numbers are. 
    }
    // length of my window is 2
    for (let i = 0; i <N-1; i++) {
        dp[i][i+2]=cuts[i+2]-cuts[i] // Obviously, for every triplet a,b,c in cuts, dp[idx(a)][idx(c)]=c-a because I can only perform the cut at b (the middle element)
    }

    //for every length
    for (let len = 3; len < N; len++) {
        //consider each window i,j of my CUTS ARRAY representing the acutual window [cuts[i],cuts[j]]
        for (let i = 0; i <=N-len; i++) {
            let j=i+len
            //consider each possible MIDDLE CUT k 
            for (let k = i+1; k < j; k++) {
                dp[i][j]=Math.min(dp[i][j],cuts[j]-cuts[i]+dp[i][k]+dp[k][j])                
            }            
        }
    }

    return dp[0][N-1];
};



//recursion + memoization ( Sentinels DP )
var minCost = function(n, cuts) {
    cuts.push(0, n); // SENTINELS
    cuts.sort((a, b) => a - b);
    let N=cuts.length
    let dp = [...Array(N)].map(d => [...Array(N)]);

    let rec = (i, j) => {
        if(j-i== 1) return 0;
        if (dp[i][j] !== undefined) return dp[i][j];
        for (let k = i + 1; k < j; k++) {
            dp[i][j] = Math.min(dp[i][j]||Infinity, rec(i, k) + rec(k, j) + cuts[j] - cuts[i]);
        }
        return dp[i][j];
    };
   
    return  rec(0, N-1);
};

