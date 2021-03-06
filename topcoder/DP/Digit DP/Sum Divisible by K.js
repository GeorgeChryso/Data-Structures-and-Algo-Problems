


/* Given two integers L,R determine how many numbers are there
    between these two, such that the sum of their digits is divisible by  K 

    so if f(x)= number of shizzle in the range [0,x]
    then my answer = f(R)-f(L) 

    and F[k]= F[k-1] + Number(SumOfdigits(k)%K==0)
*/

// naive
let detK=(L,R,K)=>{
    let sumOfDigits=x=>{
        let sum=0
        while(x)
            sum+=x%10,
            x=(x-x%10)/10
        return sum
    }
    let result=0
    for(let i=L;i<=R;i++)
        result+=Number(sumOfDigits(i)%K===0)
    return result
}

/*
        Digit DP
        
    dp[i][c][f]  how many i-digit numbers exist such that their remainder modk ==c
    and f===1 ===> curr[:i-1]<b[:i-1]   // then the next digit (i-th) can be anything 
        f===0 ===> curr[:i-1]===b[:i-1]  // then the next digit (i) has to be <= b[i]

*/


 
let solve=(b,k)=>{
    if(b<0)
        return 0
    b=String(b).split('').map(d=>Number(d))
    let n=b.length,
        dp=[...Array(n+1)].map(d=>[...Array(k)].map(d=>[...Array(2)].map(d=>0)))
    dp[0][0]=[1,0]
    //forward dp
    for (let i = 0; i < n; i++)
        //the sum of digits on my number so far
        for (let c = 0; c <k; c++) 
                //consider putting newDigit on the i+1-th place
                for (let newDigit = 0; newDigit <=9; newDigit++) {
                    let newSum=(c+newDigit )%k
                    if(newDigit==b[i])  // the result so far is === b[:i] and i place an element that's equal to b[i]
                        dp[i+1][newSum][0]+=dp[i][c][0]
                    if(newDigit<b[i])
                        dp[i+1][newSum][1]+=dp[i][c][0] // if i place an element smaller than b[i] in the i+1-th place, then the result is now smaller than b[:i]
                    dp[i+1][newSum][1]+=dp[i][c][1] // we can always extend by any digit if so far the result isa lready smaller than b[:i]
                }
    return dp[n][0][0]+dp[n][0][1]
}
let dokt= (a,b,k)=>{
   return solve(b,k)-solve(a-1,k)
}


console.log(dokt(4,20,4))