
let snoob=x=>{
    // right most set bit 
    let rightOne = x & -x; 
    
    // reset the pattern and set next higher bit 
    // left part of x will be here 
    let nextHigherOneBit = x + rightOne; 

    // nextHigherOneBit is now part [D] of the above explanation. 

    // isolate the pattern 
    let rightOnesPattern = x ^ nextHigherOneBit; 

    // right adjust pattern 
    rightOnesPattern = (rightOnesPattern)/rightOne; 

    // correction factor 
    rightOnesPattern >>= 2; 

    // rightOnesPattern is now part [A] of the above explanation. 

    // integrate new pattern (Add [D] and [A]) 
    let next = nextHigherOneBit | rightOnesPattern; 
    return next
}

// bitmask knapsack, 2 row optimization, 
// + snoob for masks with only k turned on bits
/*
    dp[mask]= Minimum incompatibility to create a group that consists of mask

    therefore, my target is dp[11111..1]
*/
var minimumIncompatibility = function(A, k) {
    A.sort((a,b)=>a-b)
    let n=A.length,
    if(n/k!==((n/k)>>0))
        return  -1
    let sz=n/k,start=((1<<sz)-1)
    let dp1=[...Array(1<<n)].map(d=>Infinity)
    dp1[0]=0
    //for every candidate subset of sz length
    for (let mask = start; mask < (1<<n); mask=snoob(mask)) {
        let seen=0,flag=true,small=Infinity,big=0
        for (let k = 0; k<n; k++)  //see if it's valid, aka no duplicates
            if((mask&(1<<k)))
                if( seen&(1<<A[k])){
                    flag=false
                    break
                }
                else
                    seen|=(1<<A[k]),
                    small=Math.min(small,A[k]),
                    big=Math.max(big,A[k])
        if(!flag) //if it has duplicates
            continue
        let dp2=[...dp1],inc=big-small //calculate its incompatibility
        for (let j = 0; j<(1<<n); j++)
                if((j&(cand[i])) ===0)
                    dp2[ j|mask ]=Math.min(dp2[ j|mask ],dp1[j]+inc) //and throw it in the knapsack (forward dp)
        
        result=Math.min(dp1[(1<<n)-1],dp2[(1<<n)-1],result) 
        dp1=dp2
    }
    return result
   
};