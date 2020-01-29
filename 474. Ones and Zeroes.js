// In the computer world, use restricted resource you have to generate maximum benefit is what we always want to pursue.

// For now, suppose you are a dominator of m 0s and n 1s respectively. On the other hand, there is an array with strings consisting of only 0s and 1s.

// Now your task is to find the maximum number of strings that you can form with given m 0s and n 1s. Each 0 and 1 can be used at most once.


// It is a knapsack, I did found the dp connectio but I get tle due to 
// the hash I use
var findMaxForm = function(strs, m, n) {
    for (const i in strs) {
        let container=[0,0]
        for (const bit of strs[i]) {
            container[Number(bit)]++
        }
        strs[i]=[...container]
    }
    
    let possibleCases={}
    for (let i = 0; i <=m; i++) {   
        for (let j = 0; j <=n; j++) {
            possibleCases[[i,j]]=Infinity           
        }        
    }
    let dp=Array(strs.length+1).fill(null).map(d=>Object.assign({},possibleCases))
    // dp[i][[k,l]] is the max number of items i can take while having used [k,l] 0,1s
    //basecase
    Object.keys(dp[0]).forEach(d=>dp[0][d]=0)
    for (let i = 1; i < dp.length; i++) {
           let [mm,nn]=strs[i-1]
           for (const dora of Object.keys(dp[i])) {
                let [x,y]=dora.split(',')
           
                if(x>=mm&&y>=nn){
                    if(dp[i-1][[x,y]]===Infinity){
                        dp[i][[x,y]]=1+dp[i-1][[x-mm,y-nn]]
                        continue
                    }
                    if(dp[i-1][[x-mm,y-nn]]===Infinity){
                        dp[i][[x,y]]=dp[i-1][[x,y]]
                        continue
                    }
                    dp[i][[x,y]]=Math.max(dp[i-1][[x,y]],1+dp[i-1][[x-mm,y-nn]])

                }
                else dp[i][[x,y]]=dp[i-1][[x,y]]
           }
           console.log(dp[i])
    }   
    return Object.values(dp[dp.length-1]).reduce((acc,curr)=>{
       if(curr===Infinity)return acc
       return Math.max(curr,acc) 
    },0)
};


console.log(findMaxForm(
    ["10","0001","111001","1","0"],5,3
  //  ["10", "0", "1"],1,1
))