/**
 * @param {number[]} nums
 * @param {number[]} multipliers
 * @return {number}
 */

//dp[k][i][0] the maximum points i can get if the k-th item is A[i] and it comes from the left side
//dp[k][i][1] the maximum points i can get if the k-th item is A[i] and it comes from the right side
//2 row optimization => Ok
var maximumScore = function(A, M) {
    let n=A.length,m=M.length
    if(n>2*m)
        A=[...A.slice(0,m),...A.slice(n-m)],
        n=2*m
    let dp1=[...Array(n)].map(d=>[-Infinity,-Infinity]),dp2=[...Array(n)]
    dp1[0]=[0,0],dp1[n-1]=[0,0]
    for(let k=1;k<=m;k++){
        for(let i=0;i<n;i++){
            dp2[i]=[-Infinity,-Infinity]
            if(i+k-1>=n-1)
                dp2[i][1]=Math.max( dp2[i][1], 
                    dp1[(i+1)%n][1]+M[k-1]*A[i], //previous is the immediate right
                    dp1[(i+k-1+n)%n][0]+M[k-1]*A[i] //previous is k to the right (so far left)
                    )
            if(i-(k-1)<=0)
                dp2[i][0]=Math.max( dp2[i][0], 
                    dp1[(n+i-1) %n][0]+M[k-1]*A[i], //previous is the immediate left
                    dp1[(i-k+1+n)%n][1]+M[k-1]*A[i] //previous is k to the left ( so it necessarily is on the far right)
                )
        }
        dp1=[...dp2]
    } 
    return Math.max(...(dp1.map( d=>Math.max(d[0],d[1]))))
};

//try recursion + memo => TLE?
var maximumScore = function(A, M) {
    let n=A.length,m=M.length,memo=new Map(),result=-Infinity
    if(n>2*m)
        A=[...A.slice(0,m),...A.slice(n-m)],n=2*m
    let rec=(k,i,r)=>{
        if(k==0)
            return 0
        let key=[k,i,r]+'',res=-Infinity
        if(memo.has(key))
            return memo.get(key)
        if(r===1&&i+k-1>=n-1)
           res=Math.max(res,rec(k-1,(i+1)%n,1)+M[k-1]*A[i],rec(k-1,(i+k-1+n)%n,0)+M[k-1]*A[i])
        if(r===0&&i-(k-1)<=0)
           res=Math.max(res,rec(k-1,(n+i-1) %n,0)+M[k-1]*A[i],rec(k-1,(i-k+1+n)%n,1)+M[k-1]*A[i])
        memo.set(key,res)
        return res
    }
    for(let i=0;i<n;i++){
        if(i<=m-1)
            result=Math.max(result,rec(m,i,0))
        if(i+m>=n-1)
            result=Math.max(result,rec(m,i,1))
    }   
    return result
};

console.log(maximumScore(
    [555,526,732,182,43,-537,-434,-233,-947,968,-250,-10,470,-867,-809,-987,120,607,-700,25,-349,-657,349,-75,-936,-473,615,691,-261,-517,-867,527,782,939,-465,12,988,-78,-990,504,-358,491,805,756,-218,513,-928,579,678,10],
[783,911,820,37,466,-251,286,-74,-899,586,792,-643,-969,-267,121,-656,381,871,762,-355,721,753,-521]
))