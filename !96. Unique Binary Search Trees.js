// Given n, how many structurally unique BST's (binary search trees) that store values 1 ... n?


// Catalan sequence
// G[i]=F[1,i]+...+F[i,i]
// F[i,n]=G[i-1]*G[n-i]

var numTrees=( n)=> {
    var G = Array(n+1).fill(0) // I store the catalan numbers here
    G[0] =1
    G[1] = 1;
    

    //complete the array ( fille all the Catalan numbers leading to n'th)
    for(let i=2; i<=n; i++) {
    
      
      for(let j=1; j<=i; j++) {
        G[i] +=( G[j-1] * G[i-j]);
      }

    }
    console.log(G)
    return G[n];
  }

  var numTrees = function(n) {
    let sol = 1;
    
    for (let i = 0; i < n; i++) {
        sol = (4 * i + 2) / (i + 2) * sol;
    }
    
    return sol;
};

var numTrees = function(n) {
        int[] dp = new int[n + 1];
        dp[0] = 1;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                dp[i] += dp[j - 1]*dp[i - j];
            }
        }
        return dp[n];
    }

console.log(numTrees(3))