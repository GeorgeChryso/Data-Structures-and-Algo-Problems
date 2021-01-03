

//https://www.hackerearth.com/de/problem/algorithm/dsd-numbers/description/
//https://stackoverflow.com/questions/29372178/how-to-count-the-numbers-that-are-divisible-by-their-sum-of-digits?rq=1
/*     
    need to track 4 states: 
   i:  i-th digit <=10
   s:  ccurrent sum of digits <=100
   r:  remainder by dividing my curr number mod s  
   f:  f <2 is my number already bigger than b? 
    dp[i][s][r][f]

    So obviously the solution is digit dp,
    yet i m stuck where the current state must produce the next state, 
    dp[i][s][r][f] has to produce the state of adding a digit
    
    the new sum will be s+d
    I need to find the new mod so I can increment its count
    aka dp[i+1][newSum][newMod]

    if my old number is  n, then my new nubmer is 10n+d
    n%s=r
    ( 10n+d ) % (s+d)= REQUIRED  
    dp[i][s+d][REQUIRED][0/1] is my next state
    but I cant seem to produce the nextmod if i know the previous
*/
let solve=(b)=>{
    if(b<0)
        return 0
    b=String(b).split('').map(d=>Number(d))
    let n=b.length,
        dp=[...Array(n+1)].map(d=>[...Array(n*10+1)].map(d=>[...Array(10*n+1)].map(d=>[0,0])))

    dp[0][0][0]=[1,0]
    //forward dp
    for (let i = 0; i < n; i++)// for each digit?
        //the sum of digits on my number so far
        for (let c = 0; c <=9*9*(i+1); c++) 
                //the remainder of my number so far modc 
                for (let r = 0; r < c; r++) {
                    for (let newDigit = 0; newDigit <=9; newDigit++) {
                        let newSum=c+newDigit
                        let newRem=(10*r+ newDigit) % c
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
        result+= dp[n][sum][0][0]+dp[n][sum][0][1]     
    
    return result
}
let dokt= (a,b)=>{
   return solve(b)-solve(a-1)
}

console.log(
    dokt(1,12340)
)