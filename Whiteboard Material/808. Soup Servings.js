// There are two types of soup: type A and type B. Initially we have N ml of each type of soup. There are four kinds of operations:

// Serve 100 ml of soup A and 0 ml of soup B
// Serve 75 ml of soup A and 25 ml of soup B
// Serve 50 ml of soup A and 50 ml of soup B
// Serve 25 ml of soup A and 75 ml of soup B
// When we serve some soup, we give it to someone and we no longer have it.  Each turn, we will choose from the four operations with equal probability 0.25. If the remaining volume of soup is not enough to complete the operation, we will serve as much as we can.  We stop once we no longer have some quantity of both types of soup.

// Note that we do not have the operation where all 100 ml's of soup B are used first.  

// Return the probability that soup A will be empty first, plus half the probability that A and B become empty at the same time.


// so that's an O(N^2)time and space dp approach and its the optimal one, however due to the tests being specific I can map the N to increments of 25(already implemented update on index incremenets:) and get a better runtime

// The catch on the bottom up approach is line 50: I only want to count the states that come from direct descendants, that would be states above 0
var soupServings = function(N) {
    if(N>=5551 )return 1 //costraint

    // if i choose the first option, A gets to 0 first, so that's .25
    // if i choose any of the other 3, they both get to 0, so thats .75
    // but i want the half of the probability of them getting both below 0,so that's .375
    // so my result is .25+.375=.5
    if (N==0)return 0.5 
   

    
    let operations=[[100,0],[75,25],[50,50],[25,75]]
    //If the remaining volume of soup is not enough to complete the operation, we will serve as much as we can
    let dp=Array(N+100+1).fill(null).map(d=>Array(N+75+1).fill(0))
    //dp[i][j] is the probability of getting i-100 ml of A and j-75 ml of B 


    //basecase 
    dp[N+100][N+75]=1// the probability of getting Nml A Nml B 
    let result=0 
    for (let i = N+100; i>=0; i--) {
        for (let j = N+75; j >=0; j--) {
                if(i==N+100&&j==N+75)continue
                
                // essentially sum all the probabilities that can produce 
                // the state of having i-100 ml A and j-75 Ml B left
                // and divide them by 4,as I can only pick one at a time
                operations.forEach(
                    ([a,b])=>{

                        
                        dp[i][j]+= 
                            (i+a<=N+100&&j+b<=N+75)? //if a valid element
                                (i+a>100&&j+b>75)?  //if it can come from any state where anything hasn't ran out yet
                                    dp[i+a][j+b]/4 
                                    :0  //we stop once something runs out
                            :0
                    }
                )             

                // A<=0 && B<=0 
                if(i<=100&&j<=75)result+=dp[i][j]/2
                // A<=0 && B>0
                else if(i<=100&&j>75)result+=dp[i][j]
        }            
    }

    return result
};


//top down recursive with memo
var soupServings=(N)=>{
    if(N>=5551 )return 1 //costraint

    let dp=Array(N+1).fill(null).map(d=>Array(N+1).fill(undefined))
    let operations=[[100,0],[75,25],[50,50],[25,75]]
 
    
    //essentially returns the required sum when starting to count from (i,j)
    let helper=(i,j)=>{
        //I want Half of the sum of probabilities that get me at or below 0,0
        if(i<=0&&j<=0)return .5

        // But full of the sum that gets me below 0,+
        if(i<=0)return 1 
        
        //however none of those where b gets emptied first
        if(j<=0)return 0


        if(dp[i][j]!==undefined) return dp[i][j] //utilizing the memo


        // the probability of getting i ml of A and j ml of B is
        // 1/4( of the sum of the probability of each choice)
        dp[i][j]=operations.reduce((acc,curr)=>
           acc+helper(i-curr[0],j-curr[1])/4,0
        )

        return dp[i][j]
    }

    return helper(N,N)
}


//bottom up recursion
var soupServings=(N)=>{
    if(N>=5551 )return 1 //costraint

    let dp=Array(N+101).fill(null).map(d=>Array(N+76).fill(undefined))
    //dp[i][j] is the probability of having iml A and Jml B

    dp[N+100][N+75]=1//basecase

    let operations=[[100,0],[75,25],[50,50],[25,75]]
    
    
    //this actually calculates the probability of i,j happening
    let helper=(i,j)=>{
        if(i>N+100||j>N+75)return 0

      

        if(dp[i][j]!==undefined) return dp[i][j] //utilizing the memo



        // the probability of getting i ml of A and j ml of B is
        // 1/4( of the sum of the probability of each choice)
        dp[i][j]=operations.reduce((acc,curr)=>
           //count only the ones that come from operations done on direct descendants
           // cos I cant for example start an operation( make a selection out of four)
           // on let's say 100,75 (0,0)
           (i+curr[0]>100&&j+curr[1]>75)?acc+helper(i+curr[0],j+curr[1])/4:acc
           ,0
        )
        return dp[i][j]
    }


    let result=0
    for (let i = 0; i < 101; i+=25) {
        for (let j = 0; j < dp[0].length; j+=25) {
            helper(i,j)  

                if(i<=100&&j<=75)result+=dp[i][j]/2
                if(i<=100&&j>75)result+=dp[i][j]
            
         
        }        
    }
    return result
}


console.log(soupServings(
   //0//
   // 50  //.625
   100 //0.71875
))
