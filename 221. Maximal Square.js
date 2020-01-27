// Given a 2D binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.


// naive aproach using bitwise operations:
// O(M*N*N)
var maximalSquare = function(M) {

    let result=0
    //the notion is that Every potential rectangle can start from a given row and end on another
    // That would cause the last row being full of consecutive ones forming my desired rec
    // by actually bitwise Anding (X-AND) every row of the said rectangle.
    for (let i = 0; i < M.length; i++) {

        let start=M[i]
        // I'm looking for just the base case, a simple one so I can update my result
        for (const bit of start) {
            if(Number(bit)==1){
            result=Math.max(result,1)
            break
            }
            
        }

        // Essentially forming my rectangle.
        for(let j = i+1; j < M.length; j++) {
            start.forEach((d,i)=>start[i]=d&M[j][i])// Base Intuition

            let consecutive=0 // the consecutive ones I meet
            let max=0   //helps with my early termination -200ms
            for (const bit of start) {

                if(Number(bit)==1){
                    consecutive++
                    max=Math.max(consecutive,max)
                    if(consecutive==j-i+1)result=Math.max(result,Math.pow(consecutive,2))

                }
                else {
                    consecutive=0
                }
            }
            if(max<j-i+1)break // a rectangle is not possible further down

        }
        
    }

    return result
};

//dp Solution
var maximalSquare=A=>{
    let dp=Array(A.length).fill(null).map(d=>Array(A[0].length).fill(0))
    //dp[i][j] means the maximum length of the side of a square whose bottom right corner end is the index i,j
    let maxSide=0;
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
            if (i==0 || j==0 || A[i][j] == '0') { 
                dp[i][j] = A[i][j] ; //If I come across a 0 the max length is 0, cos no square can be formed. As for the first line, if i see 1 or a 0 the result is whatever I see. 
            } else { // If A[i][j]=='1' I can extend my 3 squares..How?
                dp[i][j] =Math.min(     //I need the minimum of the 3 sides    
                    dp[i - 1][j - 1],   
                    Math.min(dp[i - 1][j], dp[i][j - 1]) 
                    ) + 1;
            }
             maxSide=Math.max(maxSide,dp[i][j])
        }        

    }
    return maxSide*maxSide
}



                //                          |
                //             dp[i-1][j-1] | dp[i-1][j]
                //                   _______|_______
                //                          |
                //               dp[i][j-1] | dp[i][j]
                //                          |
                //                          
                //   dp[i][j] essentially forms the biggest square with a bottom right index at i,j
                // That relies on the other cells though, as for me to form the biggest square at index i,j There have to be






console.log(maximalSquare(
   // [["1","1"],["1","1"]]
    // [["1"]]
   // [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
//    [
//    ["1","0","1","0"],
//    ["1","0","1","1"],
//    ["1","0","1","1"],
//    ["1","1","1","1"]]
// //    ,
//    [["1","0","1","0","0"],
//     ["1","0","1","1","1"],
//     ["1","1","1","1","1"]
//    ,["1","0","0","1","0"]]
// [["1","0","1","0"],
// ["1","0","1","1"],
// ["1","0","1","1"],
// ["1","1","1","1"]]
 [["0","1"]]
    ))


