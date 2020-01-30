// In the computer world, use restricted resource you have to generate maximum benefit is what we always want to pursue.

// For now, suppose you are a dominator of m 0s and n 1s respectively. On the other hand, there is an array with strings consisting of only 0s and 1s.

// Now your task is to find the maximum number of strings that you can form with given m 0s and n 1s. Each 0 and 1 can be used at most once.




//trying sort of a hash, still knapsack
var findMaxForm = function(strs, m, n) {
    // map every item to its corresponding number of ones and zeros [#0s,#1s]
    for (const i in strs) {
        let container=[0,0]
        for (const bit of strs[i]) {
            container[Number(bit)]++
        }
        strs[i]=[...container] 
    }
    let hashback=(x,y)=>(x)*(n+1)+y

    // knapsack dp
    let dp=Array(strs.length+1).fill(null).map(d=>Array((m+1)*(n+1)).fill(0))
    // dp[i][[k,l]] is the max number of items i can take while having used [k,l] 0,1s    
    for (let i = 1; i < dp.length; i++) {
           let [mm,nn]=strs[i-1]

           //i map every j to a [x,y] pair (of all the possible pairs of 0s and 1s ) 
           // I can end up with
           for (let j = 0,x=0,y=0; j < dp[i].length; j++) {
                dp[i][j]=dp[i-1][j]

                //these help me with the mapping
                if(y==n+1){
                    y=0
                    x++
                }

               if(x>=mm&&y>=nn){
                    dp[i][j]=Math.max(dp[i-1][j],1+dp[i-1][hashback(x-mm,y-nn)])
                }
                y++// increment y for the next round
           }

      
    }   
    return Math.max(...dp[dp.length-1])
};




console.log(findMaxForm(
//["10","0001","111001","1","0"],5,3 //4
  //  ["10", "0", "1"],1,1 //2
           
           ["10","0001","111001","1","0"]
          , 5
          , 3
))