// You are given a string s and an integer target. s represents a decimal number containing digits from 0 to 9. You can partition s into as many parts as you want and take the sum of its parts. Afterwards, return the minimum possible absolute difference to target.

// Constraints

// 1 ≤ n, target ≤ 1,000 where n is the length of s
// Example 1
// Input
// s = "112"
// target = 10
// Output
// 3
// Explanation
// We can partition s into "1" + "12" which sums to 13 and abs(13 - 10) = 3.











let solve=(S, T)=>{
    let n=S.length,
        dp=[...Array(n+1)].map(d=>new Set()),
        val=[...Array(n)].map(d=>[...Array(n)].map(d=>0))
    
    //precalc [i,j]
    for(let i=0;i<n;i++)
        for(let j=i;j<n;j++)
            if(i==j)
                val[i][j]=Number(S[j])
            else
                val[i][j]=Number(val[i][j-1])*10+Number(S[j])

    //dp[i] holds the numbers that we can make up to s[:i]
    dp[0].add(0)
    for(let i=0;i<=n;i++){
        let mxSoFar=Infinity //this holds the SMALLEST number thats BIGGER than K
        // there is no point holding numbers bigger than K in any dictionary dp[i]
        for(let j=0;j<i;j++)
                dp[j].forEach(v=>{
                    let newVal=Number(v)+Number(val[j][i-1])    
                    if(newVal>T){
                        if(newVal<mxSoFar)  //maintain the mxSoFar invariatn
                            dp[i].delete(mxSoFar), //and delete the old one
                            mxSoFar=newVal,
                            dp[i].add(newVal)
                    }
                    else
                        dp[i].add(newVal)
                })
    }
        
    let result=Infinity
    dp[n].forEach(d=>result=Math.min(result,Math.abs(d-T)))
    return result
}

