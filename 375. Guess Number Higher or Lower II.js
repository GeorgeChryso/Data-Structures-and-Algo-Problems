// We are playing the Guessing Game. The game will work as follows:

// I pick a number between 1 and n.
// You guess a number.
// If you guess the right number, you win the game.
// If you guess the wrong number, then I will tell you whether the number I picked is higher or lower, and you will continue guessing.
// Every time you guess a wrong number x, you will pay x dollars. If you run out of money, you lose the game.
// Given a particular n, return the minimum amount of money you need to guarantee a win regardless of what number I pick.

//minimax recursion
var getMoneyAmountz = function (n) {

    let dp=[...Array(n+2)].map(d=>[...Array(n+2)].map(d=>Infinity))
  
    const minimax = (l, r) => {
      if (l >= r) return 0
      if (dp[l][r] !== Infinity) return dp[l][r]
  
      for (let i = l; i <= r; i++) {
        dp[l][r] = Math.min(dp[l][r], i + Math.max(minimax(i + 1, r), minimax(l, i - 1)))
      }
      return dp[l][r]
    }
  
    return minimax(1, n)
  };

//minimize the expected loss
//dp[i][j]: the minimum worst-case cost to guess a number in the range i,j

var getMoneyAmount = function(n) {
    let dp=[...Array(n+2)].map(d=>[...Array(n+2)].map(d=>0))
    
    for (let len = 2; len <= n; len++) 
        for (let i = 1; i <= n - len + 1; i++) {
            let j=i+len-1
            dp[i][j] = Infinity
            for (let k = i; k <j; k++) 
                //math.max(dp[i][k-1],dp[k+1][j]) is the worst case scenario
                //that the problem setter can produce with his choice
                //so i have to account for that, and count it to produce
                // my best case scenario, which essentially means
                // Minimize the worst case scenario for each possible choice
                dp[i][j] = Math.min(dp[i][j], k +Math.max(dp[i][k - 1],dp[k + 1][j]))
        }
    
    return dp[1][n]
};

console.log(getMoneyAmountz(10),getMoneyAmount(10))