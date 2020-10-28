// In the "100 game" two players take turns adding, to a running total, any integer from 1 to 10. The player who first causes the running total to reach or exceed 100 wins.

// What if we change the game so that players cannot re-use integers?

// For example, two players might take turns drawing from a common pool of numbers from 1 to 15 without replacement until they reach a total >= 100.

// Given two integers maxChoosableInteger and desiredTotal, return true if the first player to move can force a win, otherwise return false. Assume both players play optimally.



var canIWin = function(maxChoosableInteger, desiredTotal) {
    if (desiredTotal <= 0 || maxChoosableInteger >= desiredTotal) return true;
    if ((maxChoosableInteger * (maxChoosableInteger + 1)) / 2 < desiredTotal) return false; // unwinnable 

    var gameStates = {},    // hash of used-key => true/false
    used = 0;                      // each bit represents a used value (max 128 bits)
    
    // Our helper function
    var helper = function (runningTotal) {
        if (runningTotal <= 0) return false;
        var key = used;
        if (!gameStates.hasOwnProperty(key)) {
            for (var i = 1; i <= maxChoosableInteger; ++i) {
                if (!isUsed(i)) {
                    setUsed(i);
                    if (!helper(runningTotal - i)) {
                        gameStates[key] = true;
                        clearUsed(i);    // reset the state of used values
                        return true;        // return true as soon as we find
                                            // a winning combo
                    }
                    clearUsed(i);    // reset the state of used values
                }
            }
            gameStates[key] = false; // If we make this through the loop without
                                     // returning true, then it's a false
        }
        return gameStates[key];
    };
    
    var isUsed = function (i) {
        return ((used & (1 << (i - 1))) !== 0);
    };
    
    var setUsed = function (i) {
        return used |= (1 << (i - 1));
    };
    
    var clearUsed = function (i) {
        return used &= ~(1 << (i - 1));
    };
    
    return helper(desiredTotal);
};


// this actually causes a Memory Error
// dp[n][s]= can a player win if the current running value is n, and s is the state of the chosen integers
var canIWin = function(maxChoosableInteger, desiredTotal) {
    let n=desiredTotal,m=maxChoosableInteger
    if(n<=m)
        return true
    let comesfrom=[...Array(n+1)].map(d=>[])
    for (let curstate = 0; curstate <(1<<m); curstate++) {
        let acc=0
        for (let j = 0; j < m; j++) 
            acc+= (curstate&(1<<j))?(j+1):0
        comesfrom[acc].push(curstate)
    }
    let dp=[...Array(n+1)].map(d=>[...Array(1<<m)].map(d=>true))
    for (let i = n-1; i>=0; i--) {
        for (const state of curstate[]) {
            
        }
        for (let curstate = 0; curstate <(1<<m); curstate++) {
            let acc=0
            for (let j = 0; j < m; j++) 
                acc+= (curstate&(1<<j))?(j+1):0
            if(acc!==i)
                continue
            //if for every next move
            //the other guy loses, this guy wins
            //so if there is a winning next state, this guy loses
            for (let j = 0; j < m; j++)
                if((curstate&(1<<j))==0 && i+j+1<n && dp[i+j+1][curstate|(1<<j)]==true)
                    dp[i][curstate]=false
        }

    }

    return dp[0][0]
};


console.log(canIWin(10,0))

