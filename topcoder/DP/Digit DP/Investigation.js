// An integer is divisible by 3 if the sum of its digits is also divisible by 3. For example, 3702 is divisible by 3 and 12 (3+7+0+2) is also divisible by 3. This property also holds for the integer 9.

// In this problem, we will investigate this property for other integers.

// Input starts with an integer T (≤ 200), denoting the number of test cases.

// Each case contains three positive integers A, B and K (1 ≤ A ≤ B < 231 and 0 < K < 10000).

// Output
// For each case, output the case number and the number of integers in the range [A, B] which are divisible by K and the sum of its digits is also divisible by K.




// dp[i][sumDigits][NumberModK][f]

let solve=(b,k)=>{
    if(b<0)
        return 0
    b=String(b).split('').map(d=>Number(d))
    let n=b.length,
        dp=[...Array(n+1)].map(d=>[...Array(n*100+1)].map(d=>[...Array(k+1)].map(d=>[0,0])))

    dp[0][0][0]=[1,0]
    //forward dp
    for (let i = 0; i < n; i++)// for each digit?
        //the sum of digits on my number so far
        for (let c = 0; c <=9*(i+1); c++) 
                //the remainder of my number so far modK
                for (let r = 0; r <k; r++) {
                    for (let newDigit = 0; newDigit <=9; newDigit++) {
                        let newSum=c+newDigit
                        let newRem=((10*r%k)+ newDigit%k) % k //my new number is 10*n+d, so this is (10n+d)%K
                        if(newSum>=10*n+1)
                            continue
                        if(newDigit==b[i])
                            dp[i+1][newSum][newRem][0]+=dp[i][c][r][0]
                        if(newDigit<b[i])
                            dp[i+1][newSum][newRem][1]+=dp[i][c][r][0]
                        dp[i+1][newSum][newRem][1]+=dp[i][c][r][1]
                    }
                }
    let result=0
    for (let sum = 0; sum <=10*n; sum++) 
        if(sum%k==0)
            result+= dp[n][sum][0][0]+dp[n][sum][0][1]     
    
    return result
}
let dokt= (a,b,k)=>{
   return solve(b,k)-solve(a-1,k)
}

console.log(dokt(1,20,1))