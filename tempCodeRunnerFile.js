var minFallingPathSum = function(A) {
    let minimumSum=Infinity

    let recursion=(i,j,total)=>{
        if(i>=A.length||j<0||j>=A[0].length)return Infinity
        
        total+=A[i][j]
        if(i==A.length-1){
            minimumSum=Math.min(minimumSum,total)
        }
        return Math.min(recursion(i+1,j,total),recursion(i+1,j-1,total),recursion(i+1,j+1,total))
    }

    A[0].forEach( (element,j) =>recursion(0,j,0));
    return minimumSum
};
