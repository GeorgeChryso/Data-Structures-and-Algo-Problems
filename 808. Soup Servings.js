// There are two types of soup: type A and type B. Initially we have N ml of each type of soup. There are four kinds of operations:

// Serve 100 ml of soup A and 0 ml of soup B
// Serve 75 ml of soup A and 25 ml of soup B
// Serve 50 ml of soup A and 50 ml of soup B
// Serve 25 ml of soup A and 75 ml of soup B
// When we serve some soup, we give it to someone and we no longer have it.  Each turn, we will choose from the four operations with equal probability 0.25. If the remaining volume of soup is not enough to complete the operation, we will serve as much as we can.  We stop once we no longer have some quantity of both types of soup.

// Note that we do not have the operation where all 100 ml's of soup B are used first.  

// Return the probability that soup A will be empty first, plus half the probability that A and B become empty at the same time.



var soupServings = function(N) {
    if(N>=5551 )return 1 //costraint
    let operations=[[100,0],[75,25],[50,50],[25,75]]

    let dp=Array(N+101).fill(null).map(d=>Array(N+101).fill(0))

    //basecase 
    dp[N+100][N+100]=1// the probability of getting Nml A Nml B 
    let pA=0
    for (let i = N+100; i>=0; i--) {
        for (let j = N+100; j >=0; j--) {
                if(i==N+100&&j==N+100)continue

                // if(
                //     !operations.every(
                //         ([a,b])=>(i+a<=N+100&&j+b<=N+100)?(i+a>100&&j+a>100):true
                //     )
                // ){
                //     dp[i][j]=0
                //     continue
                // }

                operations.forEach(
                    ([a,b])=>{

                        
                        dp[i][j]+= (i+a<=N+100&&j+b<=N+100)?
                        (i+a>100&&j+a>100)?dp[i+a][j+b]/4:0:0
                    }
                )                
                if(i<=100&&j<=100)pA+=dp[i][j]/2
                else if(i<=100)pA+=dp[i][j]

            
        }            
    }

    return pA
};

//console.log(soupServings(50))


console.log(soupServings(
   
   // 50  //.625
   100 //0.71875
))
