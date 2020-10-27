// Alice and Bob continue their games with piles of stones. There are several stones arranged in a row, and each stone has an associated value which is an integer given in the array stoneValue.

// Alice and Bob take turns, with Alice starting first. On each player's turn, that player can take 1, 2 or 3 stones from the first remaining stones in the row.

// The score of each player is the sum of values of the stones taken. The score of each player is 0 initially.

// The objective of the game is to end with the highest score, and the winner is the player with the highest score and there could be a tie. The game continues until all the stones have been taken.

// Assume Alice and Bob play optimally.

// Return "Alice" if Alice will win, "Bob" if Bob will win or "Tie" if they end the game with the same score.


// minmax  dp
// dp[i] the maximum difference between the current player and the other

// =Math.max(A[i]+ Math.min(dp[i+1],dp[i+2],dp[i+3]), )
var stoneGameIII = function(A) {
    let n=A.length,
        dp=[...Array(n)].map(d=>-Infinity),
        prefix=[0]
    for (let i = 0; i < n; i++) 
        prefix.push(prefix[prefix.length-1]+A[i])        
    
    for (let i = n-1; i >=0; i--) 
        // 3 choices
        // dp[i]=Max( sum[A[i]:A[i+k] ] -dp[i+k] ) k=0,1,2
        // cos bob will make the best choice after Alice's choices
        // aka dp[i+k+1], so Alice has to maximize the difference, aka how much she s gonna win
        // over Bob's choice
        for (let k = 0,acc=0; k < 3 && i + k < n ; k++){
            acc+=A[i+k] //sums the next 3 elements
            dp[i] = Math.max(dp[i], acc - (dp[i + k + 1]||0));
        }

    if(dp[0]===0)
        return 'Tie'
    return dp[0]<0?'Bob':'Alice'
};

console.log(
    stoneGameIII(
        [1,2,3,7]
    )
)