// In the "100 game" two players take turns adding, to a running total, any integer from 1 to 10. The player who first causes the running total to reach or exceed 100 wins.

// What if we change the game so that players cannot re-use integers?

// For example, two players might take turns drawing from a common pool of numbers from 1 to 15 without replacement until they reach a total >= 100.

// Given two integers maxChoosableInteger and desiredTotal, return true if the first player to move can force a win, otherwise return false. Assume both players play optimally.


// recursive small pp
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


//TLE,we use a map here to avoid memory overflow, 
// What was wrong here is that the only dimension needed to compute the result is 
// only the state, and not the current sum
var canIWin = function(maxChoosableInteger, desiredTotal) {
    let n=desiredTotal,m=maxChoosableInteger
    if(n<=m)
        return true
    let comesfrom=[...Array(n+1)].map(d=>[])
    for (let curstate = 0; curstate <(1<<m); curstate++) {
        let acc=0
        for (let j = 0; j < m; j++) 
            acc+= (curstate&(1<<j))?(j+1):0
        if(acc<=n)
            comesfrom[acc].push(curstate)
    }
    let dp=new Map()
    for (let i = n-1; i>=0; i--) 
        for (const curstate of comesfrom[i]) {
            dp[[i,curstate]]=false //let default be false
            for (let j = 0; j < m; j++) //for any available number to choose next
                if((curstate&(1<<j))==0) //if i can pick the j-th number to add it
                    //if i reach my goal or if I can reach a false
                    if(i+1+j>=n||dp[ [i+j+1,curstate|(1<<j)] ]===false){
                        dp[[i,curstate]]=true //i ll reach a false next turn, so my opponent loses
                        break
                    }
        }
    
    return dp[[0,0]]
};


//dp[i]= can the player who plays first while at state i win?
var canIWin = function(maxChoosableInteger, desiredTotal) {
    let n=desiredTotal,m=maxChoosableInteger,dp=[...Array(1<<m)].map(d=>0)
    for (let i = (1<<m)-1; i >=0; i--) {
        let next=[],totalSum=0
        for (let j = 0; j < m; j++)
            if(i&(1<<j))
                totalSum+=j+1
            else
                //[next's mask, their difference]
                next.push( [i|(1<<j),j+1] ) 

        dp[i]=totalSum>=n|| // my curr state wins only if its totalSum exceeds desired
             next.some(([nextmask,difference])=>
             // or when a next state's total sum  exceeds desired
                                        difference+totalSum>=n||
            // or when some next state loses 
            // (aka I pick the losing state and my opponents loses cos he plays next)
                                        dp[nextmask]==0
                       )
    } 
    return dp[0]
};
console.log(canIWin(10,
    11))

