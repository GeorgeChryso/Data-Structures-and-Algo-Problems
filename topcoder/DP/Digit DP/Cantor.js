// The mathematician Georg Cantor was a lover of both sets and infinity, but he didn't get along too well with his colleagues. One morning he woke up with the idea of defining a set so strange that, when made public, would make the rest of the mathematicians lose their sleep for several days. And he was successful.

// The set he defined is called the Cantor set, and it is formed by all the real numbers in the interval [0, 1] whose decimal expression in base 3 uses exclusively the digits 0 and 2. This set has amazing properties, which we will not mention here so that you can sleep tonight. Moreover, and luckily for everyone involved, in this problem we will not be working with the Cantor set, but with a generalization of this set to the integer numbers.

// We will say that an integer number is of Cantor type, or a cantiger for short, if its expression in a given base B uses solely the digits in a given set C contained in {0, 1, ..., B-1}. Thus, the fact that a given number is a cantiger depends on how we choose B and C.

// Your task is to count cantiger numbers, in order to prevent the mathematicians of the entire world from loosing their sleep. More precisely, given two integers D and H, along with B and C, you have to count the number of cantigers with respect to B and C from D to H inclusive.
// Each test case is described using a single line. This line contains three integers, D, H and B, and a string L. The values of D and H indicate the endpoints of the closed interval [D, H] we are interested in (1 ≤ D ≤ H ≤ 1016). The value of B is the base mentioned in the problem statement (2 ≤ B ≤ 10). The string L = L0 L1 ... LB-1 has exactly B characters, and describes the set C also mentioned in the problem statement. The character Li is the uppercase letter 'S' if i is in C, and the uppercase letter 'N' otherwise (i = 0, 1, ..., B-1). The set C is non-empty, so that there is at least one 'S' character in L. The end of the input is signalled by a line containing three times the number -1 and a single '*' character.
// Output
// For each test case, you should print a single line containing an integer number, representing the number of cantigers (with respect to B and C) that are greater or equal to D and lower or equal to H.


//we have to use a state to handle leading zeroes somehow. cos i m not always able to use a zero inside the number, but i can always use a leading zero. thats what bugs me 
//dp[i][started][f]
let solve=(b,base,C)=>{
    if(b<0)
        return 0
        console.log(b,b.toString(base),C)

    b=b.toString(base)
    let n=b.length,
        dp=[...Array(n+1)].map(d=>[[0,0],[0,0]])
    dp[0][0]=[1,0]
    //forward dp
    for (let i = 0; i < n; i++)
        for (let newDigit = 0; newDigit <base; newDigit++) {
                if( newDigit===0&&!C.has(newDigit))
                    dp[i+1][0][0]+=dp[i][0][0]
                                    dp[i][0][1]
                                    dp[i][1][0]
                                    dp[i][1][1]
                if(!C.has(newDigit))
                     continue
                if(newDigit==b[i])
                    dp[i+1][0][0]+=dp[i][0][0]
                if(newDigit<b[i])
                    dp[i+1][1]+=dp[i][0]
                dp[i+1][1]+=dp[i][1]
        }
    console.log(dp,dp[n][0]+dp[n][1],'\n')
    return dp[n][0]+dp[n][1]
}
let dokt= (a,b,base,C)=>{
   C=new Set( C.split('').map((d,i)=>d==='S'?i:-1).filter(d=>d!==-1))
   return solve(b,base,C)-solve(a-1,base,C)
}


console.log(
    dokt(1,10,3,'SNS'),
    dokt(99,999,5,'NSSNS'),
    dokt(1110 ,1111 ,10,'NSNNNNNNNN'),
    dokt(1,10000000000000000 ,10,'NNNNNSNNNN'),
    dokt(1,10000000000000000 ,7,'SSSSSSS')

)