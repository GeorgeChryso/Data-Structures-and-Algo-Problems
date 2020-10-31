

// T L E 
// bottom up dp TLE
var findNumberOfLIS=A=>{

    let n=A.length,
        dp=[...Array(n+1)].map(d=>[...Array(n)].map(d=>0))

    //basecase
    //each subsequence of length 1 is itself
    for (let i = 0; i <n; i++)
        dp[1][i]=1        
    //dp[k][i]= number of increasing subsequences of length k ending at index i 
    for (let k = 2; k <=n; k++) 
        for (let i = k-1; i < n; i++) 
            for (let j =0; j <i; j++) 
                if(A[i]>A[j])
                    dp[k][i]+=dp[k-1][j]
    console.log(dp)
    for (let k = n; k >=1; k--) {
        let currentCount=dp[k].reduce((a,c)=>a+c)
        if(currentCount!==0)
            return currentCount        
    }
    return 0
}

// O(n^2)
var findNumberOfLIS=A=>{
    let n=A.length,longestLength=0
        //the length of the Longest Increasing Subsequence which ends with nums[i].
        LisLen=[...Array(n)].map(d=>1),
        //the number of the Longest Increasing Subsequences which end with nums[i].
        count=[...Array(n)].map(d=>1)
        
    for (let i = 0; i < n; i++){
        for (let j = 0; j <i; j++)
             /*      Essentially, try creating all the subsequences of the form
                                    ..., A[j], A[i]
                with ... indicating the longest subsequences that end at A[j]
                So the new subsequences will have a length of LisLen[j]+1     */
            if(A[j]<A[i])
                // if I ve seen subsequences of that length already that end at A[j]
                if(LisLen[j]+1==LisLen[i]) 
                    count[i]+=count[j] //then i need to count the extra ones

                // If the longest subsequences that end at A[i] have smaller length
                // then we found a new best length for A[i],
                //  because our type beats the old one in terms of size
                else if(LisLen[j]+1>LisLen[i])
                    LisLen[i]=LisLen[j]+1,
                    count[i]=count[j]

                // If the new subsequences I consider are smaller than what I ve already
                // found for A[i], that means that I already found bigger subsequences
                // that end at A[i], then I dont need to even consider the ones of the form
                //                  ..., A[j], A[i]
                else // if( LisLen+1<LisLen[i])
                    continue

        longestLength=Math.max(longestLength,LisLen[i]) //update the maximum found length
        console.log(count+'',LisLen+'')
    }
    //count only the ones of longest length
    return count.filter((d,i)=>LisLen[i]==longestLength).reduce((a,c)=>a+c,0)
}
console.log(findNumberOfLIS(
//[1,3,5,4,7,2,3,1,7,324,12,31,1,12,33]
//[2,2,2,2,2]
    [1,3,5,4,2,1,12,3,12,31,123,12,7]
))