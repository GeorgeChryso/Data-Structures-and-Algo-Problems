
//naive n!
const permutator = (inputArr) => {
    let result = [];
    const permute = (arr, m = []) => {
        if (arr.length === 0) 
            return result.push(m)
        for (let i = 0; i < arr.length; i++) 
            curr = arr.slice(),
            next = curr.splice(i, 1),
            permute(curr.slice(), m.concat(next))
   }
   permute(inputArr)
   return result;
}

var countArrangement = function(n) {
    let res=permutator( [...Array(n)].map((d,i)=>i+1))
    return res.filter(d=>
            d.every((c,i)=>(c%(i+1)==0)||((i+1)%c==0))
            ).length
};



//dp , can also be solved with the same complexity as digit dp
var countArrangement = function(n) {
    let dp=[...Array(1<<n)].map(d=>0)
    dp[0]=1
    for(let i=0;i<n;i++)
        dp[1<<i]=1
    for (let len = 1; len <=n; len++) 
        for (let mask = (1<<len)-1; mask < (1<<n); mask=snoob(mask)) 
            for (let i = 0; i < n; i++) 
                if(((1<<i)&mask) ==0 && (( (i+1) % (len+1)==0 )|| ((len+1)%(i+1)==0)))
                    dp[mask|(1<<i)]+=dp[mask]                
    return dp[(1<<n)-1]
};
//finds the next higher number with the same number of set bits
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
console.log(countArrangement(3))
