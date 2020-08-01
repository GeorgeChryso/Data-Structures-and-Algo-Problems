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
    return m[1][n]

}

let reconstruction=(s,i,j)=>{
    return i==j?'A'+i:'('+reconstruction(s,i,s[i][j])+' '+reconstruction(s,s[i][j]+1,j)+')'
}

console.log(optPar(
   // [30,35,15,5,10,20,25]
    [5,10,3,12,5,50,6]
))