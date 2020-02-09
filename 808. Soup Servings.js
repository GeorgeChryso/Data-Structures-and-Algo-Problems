// There are two types of soup: type A and type B. Initially we have N ml of each type of soup. There are four kinds of operations:

// Serve 100 ml of soup A and 0 ml of soup B
// Serve 75 ml of soup A and 25 ml of soup B
// Serve 50 ml of soup A and 50 ml of soup B
// Serve 25 ml of soup A and 75 ml of soup B
// When we serve some soup, we give it to someone and we no longer have it.  Each turn, we will choose from the four operations with equal probability 0.25. If the remaining volume of soup is not enough to complete the operation, we will serve as much as we can.  We stop once we no longer have some quantity of both types of soup.

// Note that we do not have the operation where all 100 ml's of soup B are used first.  

// Return the probability that soup A will be empty first, plus half the probability that A and B become empty at the same time.



var soupServings = function(N) {
    let operations=[[100,0],[75,25],[50,50],[25,75]]

    let dp=Array(N+1).fill(null).map(d=>Array(N+1).fill(1))

    //basecase 
    dp[N][N]=1// the probability of getting Nml A Nml B 
    let pA=0
    for (let i = N; i>=0; i--) {
        for (let j = N; j >= 0; j--) {
                // if(operations.some(([a,b])=>{
                //     if(i+a<=N&&j+b<=N)return dp[i+a][j+b]!==0
                //     else return false
                // }))dp[i][j]=1
                // else continue

                // fill 1

                operations.forEach(
                    ([a,b])=>dp[i][j]*= (i+a<=N&&j+b<=N)?dp[i+a][j+b]/4:1
                )                


                // operations.forEach(
                //     ([a,b])=>dp[i][j]*= (i+a<=N&&j+b<=N)?(dp[i+a][j+b]!==0?dp[i+a][j+b]/4:1):1
                // )                
                if(i==0&&j>0)pA+=dp[i][j]

        }            
    }
    console.log(pA)
    // probability A gets 0 first
    console.log(dp[1]+'')
    return (pA+dp[0][0]/2)
};

//console.log(soupServings(50))


console.log(soupServings(50))
