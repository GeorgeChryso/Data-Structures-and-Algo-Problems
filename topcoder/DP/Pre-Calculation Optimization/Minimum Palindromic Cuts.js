// Minimum Palindromic Cuts
// given a string, find the minmum number of cuts that you need to make such that the resulting pieces of the array are palindroms

//examples : 'ABBA' , output=0 ,the string is already a palindrome so no cuts are needed

// 'ABAZYZ', output=1, ABA + ZYZ
// 'ABCDEF', output=5, no palindromes other than the letters themselves

// O(n^3)
var MpC=A=>{    
    let isPalindrome=(i,j)=>{
        while(i<=j)
            if(A[i]!==A[j])
                return false
            else
                i++,j--
        return true
    }
    let n=A.length,dp=[...Array(n+1)].map(d=>Infinity)
    dp[0]=0
    for(let i=1;i<=n;i++)
        for(let j=1;j<=i;j++)
            if(isPalindrome(j-1,i-1) && dp[i]>dp[j-1]+1)
                dp[i]=dp[j-1]+1
    return dp[n]-1 //because we always consider cutting after the last element
}

console.log(
    MpC('ABBA'),
    MpC('ABAZYZ'),
    MpC('ABCDEF')
)

//optimization precalculate every possible interval of a palindrom and speedup the above process to O(n^2)

// To efficiently precalculate all palindromes, we start from the middle and expand left and right
// O(n^2)
var MpC=A=>{    
    let n=A.length,
        dp=[...Array(n+1)].map(d=>Infinity),
        isPalindrome=[...Array(n)].map(d=>[...Array(n)].map(d=>0))

    //prefill isPalindrome starting from any possible middle element ->O(n^2)
    for(let i=0;i<n;i++){
        //try expanding it from a single element (middle is a single element)
        let lo=i,hi=i
        while(lo>=0&&hi<=n-1&&A[lo]===A[hi])
            isPalindrome[lo][hi]=1,
            lo--,hi++
        // try expanding it from two elements (middle is no element)
        lo=i,hi=i+1
        while(lo>=0&&hi<=n-1&&A[lo]===A[hi])
            isPalindrome[lo][hi]=1,
            lo--,hi++
    }
    dp[0]=0
    for(let i=1;i<=n;i++)
        for(let j=1;j<=i;j++)
            if(isPalindrome[j-1][i-1] && dp[i]>dp[j-1]+1)
                dp[i]=dp[j-1]+1
    return dp[n]-1 //because we always consider cutting after the last element
}

console.log(
    MpC('ABBA'),
    MpC('ABAZYZ'),
    MpC('ABCDEF')
)
