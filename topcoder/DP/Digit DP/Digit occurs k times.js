// How many numbers x are there in the range a to b, where the digit d occurs exactly k times in x? There may have several solutions including number theory or combinatorics, but let’s see how we can solve this problem using digit dp.


/*
    dp[i][c][f]  how many i-digit numbers exist such that they have c occurences of the special digit in their count, 
    and f===1 ===> curr[:i-1]<b[:i-1]   // then the next digit (i-th) can be anything 
        f===0 ===> curr[:i-1]===b[:i-1]  // then the next digit (i) has to be <= b[i]

*/

//finds the result in teh range [0,b]
let solve=(b,d,k)=>{
    if(b<0)
        return 0
    b=String(b).split('').map(d=>Number(d))
    let n=b.length,
        dp=[...Array(n+1)].map(d=>[...Array(k+1)].map(d=>[...Array(2)].map(d=>0)))
    dp[0][0]=[1,0]
    //forward dp
    for (let i = 0; i < n; i++)
        //the count of special digits in my number so far
        for (let c = 0; c <=k; c++) 
                //consider putting newDigit on the i+1-th place
                for (let newDigit = 0; newDigit <=9; newDigit++) {
                    let newSpecialCount=c+Number(newDigit==d)
                    if(newSpecialCount>k)
                        continue
                    if(newDigit==b[i])  // the result so far is === b[:i] and i place an element that's equal to b[i]
                        dp[i+1][newSpecialCount][0]+=dp[i][c][0]
                    if(newDigit<b[i])
                        dp[i+1][newSpecialCount][1]+=dp[i][c][0] // if i place an element smaller than b[i] in the i+1-th place, then the result is now smaller than b[:i]
                    dp[i+1][newSpecialCount][1]+=dp[i][c][1] // we can always extend by any digit if so far the result isa lready smaller than b[:i]
                }
    return dp[n][k][0]+dp[n][k][1]
}
let dokt= (a,b,d,k)=>{
   return solve(b,d,k)-solve(a-1,d,k)
}
console.log(dokt(12,112,1,0)) 