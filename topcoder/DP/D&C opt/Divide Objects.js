// Given n objects with weights [w1,w2,...,wn] divide them into m groups of CONSECUTIVE
// objects such that the SUM of SQUARES of the sums of weights of the groups is MINIMAL


//example
// w=[2,2,1,4,1,2,2] m=2
// output=[0,3] 
// so essentially i want to return the m indexes of the first elements of the m different groups

// i can quickly calculate contiguous sums with prefix sum in O(1) for each query + O(n) build time

// let dp[i][j] be the minimum sum of the squares of sums until idx j, if the i-th group ends at index j

// then dp[i][j]= min{dp[i-1][k]+prefix[j]-prefix[k] }  k<j

// DP: O(m*n*n)
var divideEmA=(W,m)=>{
    let n=W.length, prefix=[0]
    for (let i = 0; i < n; i++)
        prefix.push(prefix[prefix.length-1]+W[i])

    if(m>n)
        return -1

    let dp=[...Array(m)].map(d=>[...Array(n)].map(d=>Infinity)),
        h=[...Array(m)].map(d=>[...Array(n)].map(d=>Infinity))

    //base case is the first line aka dp[0][j] which is bascially the prefix sums
    for (let j = 0; j <n; j++)
        dp[0][j]=prefix[j+1]**2        
    

    for (let i = 1; i < m-1; i++) {
        //start from i cos the ith group can only start from the ith ele 
        for (let j = i; j < n; j++) {
            for (let k = 0; k < j; k++) {
                if(dp[i-1][k]+(prefix[j+1]-prefix[k+1])**2<dp[i][j]){
                    dp[i][j]=dp[i-1][k]+(prefix[j+1]-prefix[k+1])**2
                    h[i][j]=k
                }
            }            
        }        
    }
    
    //consider the remaining elements to the right (aka the last group)
    for (let j = m-2; j < n; j++) 
        dp[m-1][j]=dp[m-2][j]+(prefix[n]-prefix[j+1])**2        
    
    dp.forEach(d=>console.log(d.map(d=>d==Infinity?-1:d)+'\t'))
    console.log(`\n Proof that h is increasing monotone`)
    h.forEach(h=>console.log(h.map(d=>d==Infinity?-1:d)+''))

    return Math.min(...dp[m-1])
}


// divide and conquer optimization based on the fact that :
// because, as you can see, H[i][j]<=H[i][j+1], where H[i][j]=k
// such that dp[i][j]=dp[i-1][k]+ pref..(j+1,k+1)
// so I can apply the divide and conquer DP optimization
// which reduces the complexity to O(mnlogn)
var divideEmB=(W,m)=>{
    let n=W.length, prefix=[0]
    for (let i = 0; i < n; i++)
        prefix.push(prefix[prefix.length-1]+W[i])

    if(m>n)
        return -1

    let dp=[...Array(m-1)].map(d=>[...Array(n)].map(d=>Infinity))

    //base case is the first line aka dp[0][j] which is bascially the prefix sums
    for (let j = 0; j <n; j++)
        dp[0][j]=prefix[j+1]**2        
    
    let DC=(i,jleft,jright,kleft,kright)=>{
        if(jleft>jright)
            return
        let mid=(jleft+jright)>>1,best=Infinity,bestk=-1
        
        for (let k = kleft; k <= Math.min(kright,mid); k++) 
            if(dp[i-1][k]+ (prefix[mid+1]-prefix[k+1])**2<best){
                best=dp[i-1][k]+ (prefix[mid+1]-prefix[k+1])**2
                bestk=k
            }     

        dp[i][mid]=best
        DC(i,jleft,mid-1,kleft,bestk)
        DC(i,mid+1,jright,bestk,kright)
    }
   
    for (let i = 1; i < m-1; i++) 
        DC(i,0,n,0,n)

    //consider the remaining elements to the right (aka the last group)
    for (let j = m-2; j < n; j++) 
        dp[m-2][j]=dp[m-2][j]+(prefix[n]-prefix[j+1])**2        
    
    dp=dp.map((d,i)=>d.map((q,j)=>j<i?Infinity:q))// remove the impossible
    dp.forEach(d=>console.log(d.map(d=>d==Infinity?-1:d)+'\t'))

    return Math.min(...dp[m-2])
}



console.log(
    divideEmA(
        [8,2,8,8,1,1,8,1,1,1,2,3],7
    )
)

console.log(
    divideEmB(
        [8,2,8,8,1,1,8,1,1,1,2,3],7
    )
)