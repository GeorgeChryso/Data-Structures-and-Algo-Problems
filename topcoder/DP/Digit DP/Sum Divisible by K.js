


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

To find all numbers less than a particular number say X, satisfying a particular property, we iterate the number by replacing its digits such that it is less than X. If this number satisfies the property, increment the count.


*/