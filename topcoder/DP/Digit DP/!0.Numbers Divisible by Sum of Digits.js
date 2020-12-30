

//https://www.hackerearth.com/de/problem/algorithm/dsd-numbers/description/
let solve=(b)=>{
    if(b<0)
        return 0
    b=String(b).split('').map(d=>Number(d))
    let n=b.length,
        dp=[...Array(n+1)].map(d=>[...Array(k)].map(d=>[...Array(2)].map(d=>0)))
    dp[0][0]=[1,0]
    //forward dp
    for (let i = 0; i < n; i++)
        //the sum of digits on my number so far
        for (let c = 0; c <k; c++)  //remainder mod sum
                //consider putting newDigit on the i+1-th place
                for (let newDigit = 0; newDigit <=9; newDigit++) {
                    // c+ newDigit % 
                    let newSum=(c+newDigit )%k
                    if(newDigit==b[i])  // the result so far is === b[:i] and i place an element that's equal to b[i]
                        dp[i+1][newSum][0]+=dp[i][c][0]
                    if(newDigit<b[i])
                        dp[i+1][newSum][1]+=dp[i][c][0] // if i place an element smaller than b[i] in the i+1-th place, then the result is now smaller than b[:i]
                    dp[i+1][newSum][1]+=dp[i][c][1] // we can always extend by any digit if so far the result isa lready smaller than b[:i]
                }
    return dp[n][0][0]+dp[n][0][1]
}
let dokt= (a,b)=>{
   return solve(b)-solve(a-1)
}

