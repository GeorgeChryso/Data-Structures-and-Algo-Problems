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


