



// dp  naive O(n^3*Funds), but n<<<Funds
let minimalRange=(D,Funds,P)=>{
    P.sort((a,b)=>a-b)
    let n=P.length,result=Infinity,
        dp=[...Array(n+1)].map(d=>[...Array(D+1)].map(d=>[...Array(Funds+1)].map(d=>Infinity)))
    // dp[i][j][g]= the minimal Range, when I moved the i-1 transmitters, j is the position of the i-th transmitterm,while having g dollars spent 
    dp[0][0][0]=0
    
    for (let i = 0; i <n; i++)        //the first i transmitters are already placed
        for (let j = 0; j <=D; j++)  // j is the position of the i-1-th transmitter
            for (let g = 0; g <=Funds; g++)  //having spent this much already 
                for (let newPos = j; newPos <=D; newPos++) {   // newposition is where im placing the i-th transmitter
                    let gold=Math.abs(newPos-P[i]) //gold to move the ith transmitter to newPos
                    if(g+gold <=Funds)
                        if(dp[i][j][g]!==Infinity)
                            dp[i+1][newPos][g+gold]=Math.min( 
                                dp[i+1][newPos][g+gold], 
                                Math.max(dp[i][j][g],Math.abs(newPos-j))
                                )         
                }
    //retrieve the result, that is the minimum dp[n][j][g], such that g<=Funds
    for (let j = 0; j <=D; j++) { //for every position of the last transmitter
        for (let g = 0; g <=Funds; g++) { //for every dollar spent
            let range=Math.max( Math.abs(D-j),dp[n][j][g]) //consider the last segment aswell, aka the distance between B and the last placed trasnmitter
            result=Math.min(range,result)            
        }
    }        
    return result
}

// dp  Let's try to fix the range instead of the funds to reduce the complexity
// O(n^4)
let minimalRangeAlt=(D,Funds,P)=>{
    P.sort((a,b)=>a-b)
    let n=P.length,result=Infinity,
        dp=[...Array(n+1)].map(d=>[...Array(D+1)].map(d=>[...Array(D+1)].map(d=>Infinity)))
    // dp[i][j][r]= the minimal Funds spent, while I placed the i-1 transmitters, j is the position of the i-th transmitter while the minimum range is r 
    dp[0][0][0]=0
    
    for (let i = 0; i <n; i++)        //the first i transmitters are already placed
        for (let j = 0; j <=D; j++)  // j is the position of the i-1-th transmitter
            for (let r = 0; r <=D; r++)  //having spent this much already 
                for (let newPos = j; newPos <=D; newPos++) {   // newposition is where im placing the i-th transmitter
                    if(dp[i][j][r]==Infinity)
                        continue
                    let gold=Math.abs(newPos-P[i]) //gold to move the ith transmitter to newPos
                    let newRange=Math.max(r,Math.abs(newPos-j))
                    dp[i+1][newPos][newRange]=Math.min(
                                                dp[i+1][newPos][newRange],
                                                dp[i][j][r]+gold
                                             )
                }
    //retrieve the result
    // that is the minimum range r such that dp[n][j][r]<=Funds
    for (let j = 0; j <=D; j++) { //for every position of the last transmitter
        for (let r = 0; r <=D; r++) { //for every potential range
            let spent=dp[n][j][r]
            let lastSegmentRange=D-j // range between : lastplaced transmitter and B
            let actualRange=Math.max(lastSegmentRange,r)
            if(spent<=Funds)
                result=Math.min(result,actualRange)            
        }
    }        
    return result
}

let tests=
[
    [ 10,5,[3,7,9]],
    [20,100,[0,0,0,0]],
    [63,19,[34, 48, 19, 61, 24]],
    [	100, 6, [2, 56, 7, 9, 11, 79, 96, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 8, 9, 11, 87, 87, 87, 66, 62]],
    [100, 0, [0, 0, 0, 0, 0]	],
    [	100, 17, [51, 32, 86, 42, 98, 14]],
    [100, 2, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    [	100, 91, [69, 96, 15, 15, 18, 18, 96, 69, 69, 85, 15, 96, 18, 15, 85, 85, 15, 85, 69, 18, 85, 18, 15, 1, 96, 1, 18, 85, 85, 18, 69, 85, 15, 1, 69, 15, 18, 96, 96]],
    [	100, 44, [98, 75, 92, 11, 93, 38, 54, 88, 88, 63]],
    [	95, 4723, [32, 12, 44, 70, 20, 69, 10, 22, 4, 55, 17, 15, 10, 29, 84, 76, 63, 94, 81, 80, 57, 85, 62, 82, 95, 43, 40, 76, 55, 90, 2, 56, 70, 47, 30, 90, 84, 8, 16, 56, 31, 1, 71, 9, 30, 27, 85]],
    [1, 1000, [0, 1]],
    [89, 2271, [86, 40, 78, 9, 18, 73, 42, 58, 8, 60, 14, 72, 57, 56, 44, 21, 42, 86, 4, 84, 69, 82, 30, 60, 10, 49, 83, 79, 31, 9, 30, 27, 49, 18, 36, 67, 53, 40, 88, 24, 63, 64, 6, 30, 30]]
]

console.log(tests.map(([a,b,c])=>minimalRange(a,b,c)))
console.log(tests.map(([a,b,c])=>minimalRangeAlt(a,b,c)))