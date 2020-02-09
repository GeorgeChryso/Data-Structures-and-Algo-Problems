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
    if (N==0)return 0.5 //

    
    let operations=[[100,0],[75,25],[50,50],[25,75]]
    //If the remaining volume of soup is not enough to complete the operation, we will serve as much as we can
    let dp=Array(N+100+1).fill(null).map(d=>Array(N+75+1).fill(0))
    //dp[i][j] is the probability of getting i-100 ml of A and j-75 ml of B 


    //basecase 
    dp[N+100][N+75]=1// the probability of getting Nml A Nml B 
    let pA=0
    for (let i = N+100; i>=0; i--) {
        for (let j = N+75; j >=0; j--) {
                if(i==N+100&&j==N+75)continue
                operations.forEach(
                    ([a,b])=>{

                        
                        dp[i][j]+= 
                            (i+a<=N+100&&j+b<=N+75)? //if a valid element
                                (i+a>100&&j+b>75)?  //if it can come from any state where anything has ran out
                                    dp[i+a][j+b]/4
                                    :0  //we stop once something runs out
                            :0
                    }
                )             

                //A<=0 && B<=0 
                if(i<=100&&j<=75)pA+=dp[i][j]/2
                // A<=0 && B>0
                else if(i<=100&&j>75)pA+=dp[i][j]
        }            
    }

    return pA
};

//console.log(soupServings(50))


console.log(soupServings(
   //0//
   // 50  //.625
   100 //0.71875
))
