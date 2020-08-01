// Given an Array p consisting of the dimensions of n matrices (p.length=n+1)
// A[i] has dimensions p[i-1],p[i] find an optimal parenthesization 




let optPar=p=>{
    //m[i,j] is the minimum cost needed for the multiplications of matrices AiAi+1....Aj
    //s[i,j] is the index k where the optimal split occurs such that Ai..Ak and Ak+1...Aj produce the minimum overall cost m[i,j]
    let n=p.length-1

    let m=[...Array(n+1)].map(d=>[...Array(n+1)].map(q=>Infinity)),
    s=[...Array(n+1)].map(d=>[...Array(n+1)].map(q=>Infinity))

    for(let i=0; i<m.length;i++){
        m[i][i]=0 //case where only 1 matrix is present (no cost )
    }
    
    for (let l = 2; l <=n; l++) {
        for (let i = 1; i <=n-l+1; i++) {
            let j=i+l-1 // j is fixed cos we re examining possible cuts of the window i...j
            for (let k = i; k < j; k++) {// k is the index of the potential split
                let q=m[i][k]+m[k+1][j]+p[i-1]*p[k]*p[j] //CRLS 15.2
                if(q<m[i][j]){
                    m[i][j]=q
                    s[i][j]=k
                }
            }
        }        
    }
    
    console.log(reconstruction(s,1,n))
    console.log(matrixChainMultiply(A,s,1,A.length))
    return m[1][n]

}

let reconstruction=(s,i,j)=>{
    return i==j?'A'+i:'('+reconstruction(s,i,s[i][j])+' '+reconstruction(s,s[i][j]+1,j)+')'
}


//matrix multiplication returns the new Matrix
let mult=(A,B)=>{
    //assume correct dimensions
    let C=[...Array(A.length)].map(d=>[...Array(B[0].length)].map(q=>0))
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B[0].length; j++) {
            for (let k = 0; k < B.length; k++) {
                C[i][j]+=A[i][k]*B[k][j]                
            }
        }
    }
    return C
}

//15.2.2  Optimal Chain Multiplication utilizing the s table
//A : sequence of matrices, s: the s table. i , j performs the multiplication from index i to j 
let matrixChainMultiply=(A,s,i,j)=>{
    if(i==j)return A[i-1] // that's a matrix btw, i-1 because of 0 indexing
    else return mult(matrixChainMultiply(A,s,i,s[i][j]),matrixChainMultiply(A,s,s[i][j]+1,j))
}



//Array of matrices
let A=[
    [
        [0,-1,2],
        [-1,-2,-1]
    ],
    [
        [0,1,0,0,1],
        [-2,-1,0,0,0],
        [0,1,-1,2,-1]
    ],
    [
        [1,-1,0,-1],
        [-2,-1,2,-1],
        [-1,0,-1,-2],
        [0,-2,2,-1],
        [0,-1,-2,-2]
    ]
]

console.log(optPar(
    // [30,35,15,5,10,20,25]
    // [5,10,3,12,5,50,6]
    [2,3,5,4]
 ))
 