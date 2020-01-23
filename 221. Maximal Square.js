// Given a 2D binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.



var maximalSquare = function(M) {

    let result=0
    M=M.map(d=>(d.join('')))
    
    for (let i = 0; i < M.length; i++) {

        let start=M[i] 
        if(start&999999)result=Math.max(result,1)
        for(let j = i+1; j < M.length; j++) {

            start&=M[j]
            let counter=0
            for (const bit of start.toString(2)) {
                if(bit)counter++
            }
            if(counter>=j-i-1)result=Math.max(result,Math.pow(j-i-1,2))
        }
        
    }

    return result
};

console.log(maximalSquare(
    [["1","1"],["1","1"]]
    // [["1"]]
    //[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
    ))