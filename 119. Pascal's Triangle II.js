'use strict'

// Given a non-negative integer numRows, generate the first numRows of Pascal's triangle.

//Given a non-negative index k where k ≤ 33, return the kth index row of the Pascal's triangle.



var getRow0 = function(x) {
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

var getRow1= function(x) {
    if(x==0){return [1]}
    let A=[1]
    for (let k = 1; k < x+1; k++) {
        console.log(A)
        for (var i = 0; i <A.length+1-i; i++) {
           

                 (i==0||i==A.length-i)?A.unshift(1):
                A.unshift( A[k-1]+A[k]);
            console.log(A,'i='+i,'k='+k)
    }
    console.log(i,k)
    A.splice(i,k)
  

};
return A
}


var getRow2 = function(x) {
    let A = new Array(x+1).fill(0);
    A[0] = 1;
    console.log('A='+A)
        for(let i=1; i<x+1; i++){
            console.log('i='+i)
            for(let j=i; j>=1; j--){
                console.log('j='+j,'A['+j+']='+A[j]+'   +='+
                'A['+(j-1)+']='+A[j-1])
                A[j] += A[j-1];
            }
            console.log('A='+A)
        }
            
        return A;
};

var getRow = function(n) {
    const x = new Array(n + 1).fill(1);
    for (let i = 0; i <= n; i++) {
        
        for (var j = i - 1; j > 0; j--) {
            x[j] += x[j - 1];
        }
        console.log(x,i,j)
    }
    return x;
  };

console.log(
    getRow(6)
)
//[ 1, 5, 10, 10, 5, 1 ]
