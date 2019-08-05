// Given a non-negative integer numRows, generate the first numRows of Pascal's triangle.

//Given a non-negative index k where k ≤ 33, return the kth index row of the Pascal's triangle.



var getRow = function(x) {
    if(x==0){return [1]}
    let A=[1],B=[]
    for (let k = 1; k < x+1; k++) {
        
        for (let i = 0; i <A.length+1; i++) {
            
                 (i==0||i==A.length)?B.push(1):
                B.push( A[i-1]+A[i]);
            
            
        }
        A=B
        B=[]

    }
    return A
};




console.log(
    getRow(6)
)
//[ 1, 5, 10, 10, 5, 1 ]
