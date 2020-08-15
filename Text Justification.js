// Given a string S, we want to split  them into "GOOD LINES"
// so that you minimize the overall badness
// text= list of words
// badness[i][j] is how bad it is to use words[i...j] as a line

// I have some  notion of how wide my line can be

// badness[i][j]= (page width-total width)**3 


//subproblems: Suffixes[i...] 
// Original problem: Find the optimal Suffix[0...] which furtherly minimizes badness
// Suffix[i...]=min(Suffix[j....]+badness[i][j]) j>i
// Essentially meaning that [i..j] is a line that I choose, and i take the minimum of the rest Suffixes

//SUFFIX-PREFIX dp problem

//A is an array of words, badness is a 2D array
let TJ=(A,badness)=>{

    let dp=[...Array(A.length)].map(d=>Infinity)
    //base case 
    dp[A.length-1]=0 //because I have no words
    
    for (let i = A.length-2;i>=0; i--) {
        for (let j = i+1; j < dp.length; j++) {
            dp[i]=Math.min(dp[i],dp[j]+badness[i][j])
        }        
    }

    return dp[0] // minimum badness from A[0]...A[A.length-1]
}
