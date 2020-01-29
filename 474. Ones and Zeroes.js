// In the computer world, use restricted resource you have to generate maximum benefit is what we always want to pursue.

// For now, suppose you are a dominator of m 0s and n 1s respectively. On the other hand, there is an array with strings consisting of only 0s and 1s.

// Now your task is to find the maximum number of strings that you can form with given m 0s and n 1s. Each 0 and 1 can be used at most once.



var findMaxForm = function(strs, m, n) {
    let memo={}
    for (const string of strs) {
        let container=[0,0]
        for (const bit of string) {
            container[Number(bit)]++
        }
        memo[string]=container
    }
    
    let possibleCases={
        
    }
    for (let i = 0; i <=m; i++) {   
        for (let j = 0; j <=n; j++) {
            possibleCases[[i,j]]=Array(strs.length+1)            
        }        
    }

    let dp=Array(strs.length+1).fill(null).map(d=>Array(m*n).fill(Infinity))
    for (let i = 0; i < dp.length; i++) {
        dp[i][0]=[m,n]        
    }   
    strs.map(d=>memo[d])
    for (let i = 1; i < dp.length; i++) {
        for (let j = 1; j < dp.length; j++) {
            dp[i][j]=[]
        }        
    }
};