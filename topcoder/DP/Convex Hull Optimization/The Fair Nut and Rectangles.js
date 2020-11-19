








//It is guaranteed that there are no nested rectangles.

// so there are no two x1,y1 and x2,y2
// such that x1<x2 && y1<y2
/*
      |
    y2*-------------*
      |             |
    y1*-------*     |
      |       |     |       I M P O S S I B L E
      |       |     |
      *-------*-----*
       x1    x2
    

        
    y2*-------*
      |       |
    y1*-------------*     
      |       |     |       the only type of 2 rectangles
      |       |     |       If I sort them ascending x => Y will be descending
      *-------*-----*       Cos if there was x1<x2 and y1<y2 => 1st case ( impossible)
              x2    x1


*/      

let NuttinCHT=(recs)=>{

    //sort ascending x 
    recs.sort((a,b)=>a[0]-b[0]) 
    /*
        dp[i]= Max value I can get if the last rectangle I chose is the i-th one (aka ends at xi), up to the i-th rectangle 
        dp[i]=Math.max( dp[j] + X[i]*Y[i]  - A[i]  -Y[i]*X[j]) for j<i
    */
    
    let n=recs.length,dp=[...Array(n)].map(d=>-Infinity)

    //basecase: just itself 
    dp[0]=recs[0][0]*recs[0][1]-recs[0][2] // X0*Y0-A0

    for (let i = 1; i < n; i++){
        let [Xi,Yi,Ai]=recs[i]
        for (let j = 0; j < i; j++){
            let [Xj,Yj,Aj]=recs[j]
            dp[i]=Math.max(
                    dp[i],
                //max value at j-th, the area of the i-th, - A[i], -the area of their intersection
                    dp[j] + Xi*Yi  - Ai  -Yi*Xj 
                ) 
        }    
        console.log(dp+'',Xi,Yi,Ai)
    }
    return Math.max(...dp)
}


let tests=[
    [[4,4,8],[1,5,0],[5,2,10]],
    [[6,2,4],[1,6,2],[2,4,3],[5,3,8]]
]
let output=[ 9,10]

console.log(tests.map(d=>NuttinCHT(d)))