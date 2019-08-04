// Given a non-negative integer numRows, generate the first numRows of Pascal's triangle.




var generate = function(x) {
    if(x==0){return []}
    let A=[[1]]
    for (let k = 1; k < x; k++) {
        A.push([])
        for (let i = 0; i <A[k-1].length+1; i++) {
            
                 (i==0||i==A[k-1].length)?A[k].push(1):
                A[k].push( A[k-1][i-1]+A[k-1][i]);
            
            
        }

    }
    return A
};





console.log(
    generate1(6)
)