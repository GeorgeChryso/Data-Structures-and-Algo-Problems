// In the "100 game" two players take turns adding, to a running total, any integer from 1 to 10. The player who first causes the running total to reach or exceed 100 wins.

// What if we change the game so that players cannot re-use integers?

// For example, two players might take turns drawing from a common pool of numbers from 1 to 15 without replacement until they reach a total >= 100.

// Given two integers maxChoosableInteger and desiredTotal, return true if the first player to move can force a win, otherwise return false. Assume both players play optimally.




//dp[i]: can a player win if he has i as desired total
var canIWin = function(maxChoosableInteger, desiredTotal) {
    let n=desiredTotal
    
    let dp=[...Array(n+1)].map(d=>0)
    dp[0]=1
    for (let i = 1; i <=n; i++) {
        for (let first = 1; first <= maxChoosableInteger; first++) //if my curr guy
            dp[i]|=!dp[i-first-1]
    }
    return dp[n]
};



var canIWin = function(maxChoosableInteger, desiredTotal) {
    let n=desiredTotal,m=maxChoosableInteger
    let st={}
    for (let state = 0; state < (1<<m); state++) {
        let acc=0,s=state
        for (let i = 1; i <=m; i++) 
            if(s&(1<<i))
                acc+=(i)    
        if(st[acc]==undefined)
            st[acc]=[state]
        else
            st[acc].push(state)
    }

    let dp=[...Array(n+1)].map(d=>0)
    dp[n]=1
    for (let i = n-1; i>=0; i--) {
        //for every valid state that sums up to i
        // is it possible to make a move and go to a winning state?
        let s=st[i]
        for (const state of s) 
            for (let k = 1; k <=m; k++) 
                if(state&(1<<k)==0)
                    dp[i]|=!dp[i+k]
    }

    console.log(dp)
    return dp[0]
};


console.log(canIWin(10,1))

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