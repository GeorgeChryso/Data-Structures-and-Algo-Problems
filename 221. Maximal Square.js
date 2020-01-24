// Given a 2D binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.



var maximalSquare = function(M) {

    let result=0
    //M=M.map(d=>BigInt(d.join('')))
    for (let i = 0; i < M.length; i++) {

        let start=M[i]
        for (const bit of start) {
            if(Number(bit)==1){
            result=Math.max(result,1)
            break
            }
            
        }

        for(let j = i+1; j < M.length; j++) {
            start=start.map((d,i)=>d&M[j][i])

            //console.log(start, typeof start ,M[j], typeof M[j])
            let counter=0
            let consecutive=0
            for (const bit of start) {
              //  console.log(start.toString(),bit,counter,consecutive)
                if(Number(bit)==1){
                    counter++
                    consecutive=Math.max(counter,consecutive)
                    if(consecutive==j-i+1)result=Math.max(result,Math.pow(consecutive,2))

                }
                else {
                    counter=0
                    consecutive=0
                }

            }
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


