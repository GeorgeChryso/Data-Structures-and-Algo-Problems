



/*TLDR find the number of mountain sequences that can be formed from A, such that 
      |ai-aj|<=K, no repetitions
    constraints:
        0<A.length<=50
        1<=A[i]<=1,000,000,000
        A has distinct elements
         1<=k<=1,000,000,000
*/  
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

//naive dp and counting
let validMountainSequences=(A,k)=>{
    if(A.length>25) //cant handle bigger numbers :( TLE
        return
    A.sort((a,b)=>a-b)
    let mod=1234567891,n=A.length,isValid=[...Array((1<<n))].map(d=>0)
    //basecase
    //isValid[mask] determines if the picked mask is valid, aka 1011 can be a valid increasing subsequence
    // isValid[1011]=isValid[0011]&&  |A[3]-A[1]| <=k
    for (let i = 0; i < n; i++) 
        isValid[1<<i]=true 
    //tried memo to cut some costs
    let isVal=x=>{
        if(isValid[x])
            return isValid[x]
        let ms1=(Math.log(x)/Math.log(2))>>0 //the most significant bit of x
        let sub= (1<<ms1)^x // x with ms1 turned off 
        let ms2=(Math.log(sub)/Math.log(2))>>0 //the second most significant of x
        return isValid[x]=isVal(sub)&&(Math.abs(A[ms1]-A[ms2])<=k)
    }

    //the peak, can only be the last element
    let result=0,peak=n-1,subset= (1<<peak) -1 
    for (let sub = subset; sub>0; sub=subset&(sub-1) ) { //aka the left part (the increasing sub)
        let nx=sub ^((1<<peak)-1) //sub's complement, aka the right part ( the decreasing sub)
        if(isVal(sub|(1<<peak))&&nx>0&&isVal(nx|(1<<peak)))
            result=(result+1)%mod
    }
    return result
}
// bottom up,slower,same but slower
let validMountainSequenceBU=(A,k)=>{
    if(A.length>25) //cant handle bigger numbers :( TLE
        return
    A.sort((a,b)=>a-b)
    let mod=1234567891,n=A.length,isValid=[...Array((1<<n))].map(d=>0)
    //basecase
    for (let i = 0; i < n; i++) 
        isValid[1<<i]=true 
    for(let len=1;len<=n;len++)
        for(let mask=(1<<len)-1;mask<(1<<n);mask=snoob(mask) )
            for(let next=n-1;next>=0&&(1<<next)>mask&&isValid[mask];next--)
               isValid[(1<<next)| mask]=isValid[mask]&&Math.abs(A[next]-A[(Math.log(mask)/Math.log(2))>>0])<=k

    //the peak, can only be the last element
    let result=0,peak=n-1,subset= (1<<peak) -1 
    for (let sub = subset; sub>0; sub=subset&(sub-1) ) { //aka the left part (the increasing sub)
        let nx=sub ^((1<<peak)-1) //sub's complement, aka the right part ( the decreasing sub)
        if(isValid[sub|(1<<peak)]&&nx>0&&isValid[nx|(1<<peak)])
            result=(result+1)%mod
    }
    return result
}
//https://apps.topcoder.com/forums/?module=Thread&start=0&threadID=697925
//tourist O(n^2) ????
let validMountainSequencesOPT=(A,k)=>{
    A.sort((a,b)=>b-a) //sort descending
    let mod=1234567891,n=A.length,result=0,dp=[...Array(n)].map(q=>[...Array(n)].map(d=>0))
    dp[0][0]=1
    //forward
    for (let i = 0; i < n; i++)
        for (let j=i;j<n-1;j++) {
            if (A[i]-A[j+1] <= k) 
                dp[j][j+1] = (dp[j][j+1]+dp[i][j]) % mod;
            if (A[j]-A[j+1] <= k) 
                dp[i][j+1] = (dp[i][j+1]+dp[i][j]) % mod;
        }
        
    for(let i=1;i<n;i++)
        result=(result+dp[i][n-1])%mod

    dp.forEach(d=>console.log(d+''))
    return result
}
let test=[
    [[1, 5, 10],6],

//    [[1, 5, 10, 4],6],
    // [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],1000000000],
    // [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],4],
    // [[1, 5, 10, 4],10],
    // [[4, 44, 7, 77],1],
    // [[159222273, 49486465, 897950775, 236306497, 791597317, 577607501, 382282839, 138297331, 498490546],512120673],
    // [[584621542, 587153344, 199147873, 29941836, 359842316],216593161],
    // [[117129546, 28761175, 2262014, 106814401, 7724542],323762309],
    // [[96, 29, 21, 90, 46, 77, 31, 63, 79],44],
    // [[90335786, 228487851, 13459343, 11961136, 18288337, 202792311, 52890320, 119602407, 60751697, 177873991, 759510676, 19800257, 96124225, 263356167, 140024951, 272277715, 462468469, 144162639, 466145677, 126052505, 37192363, 456152068, 569458429, 75402983, 366428517, 786077677, 523707697],394379241],
    // [[456277933, 175661017, 26251201, 28813551, 213861391, 202752005, 442531277, 250585851, 68665077, 656926309, 50647921, 192772201, 611472343, 52809583, 178898386, 289056665, 14555683, 250903, 686164677],119372137],
    // [[374592500, 902786786, 62801091, 998574303, 59891470, 880630500, 325697503, 782671450, 991667950, 229549775, 671878274, 106000767, 180023494, 744649053, 560144777, 764566194, 965156751, 217438761, 106949811, 295437934, 165218756, 481305829, 229228333, 451463128, 73212664, 451467606, 981205204, 531612025, 972303939, 928907829, 186179416, 199412791, 684210967, 248980506, 197987093, 744102436, 129611005, 376200947, 379290237, 973795306, 605750721, 51168511, 79796072, 785774215, 648333915, 639940848, 402856760, 613490665, 709895961, 362322922], 908928598]
]

console.log(test.map( ([a,b])=>validMountainSequences(a,b)))
console.log(test.map( ([a,b])=>validMountainSequenceBU(a,b)))
console.log(test.map( ([a,b])=>validMountainSequencesOPT(a,b)))