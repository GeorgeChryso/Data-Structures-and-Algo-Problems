// Given a non-negative integer numRows, generate the first numRows of Pascal's triangle.

var generate = function(x) {
    if(x==0){return []}
    let A=[[1]]
    for (let k = 1; k < x; k++) {
        let z=[]
        for (let i = 0; i <A[k-1].length+1; i++) {
            
                 (i==0||i==A[k-1].length)?z.push(1):
                z.push( A[k-1][i-1]+A[k-1][i]);
            
            
        }
        A.push(z)

    }
    return A
};

console.log(
    generate(3)
)