//naive dp O(n^3)
var maxJumps = function(A, d) {
    let n=A.length,next=[...Array(n)].map(d=>[]),
        dp=[...Array(n)].map(d=>0),res=1
    for (let i = 0; i < A.length; i++) {
        let l=i-1,r=i+1
        while(i-l<=d&&l>=0&&A[i]>A[l])
            next[i].push(l--)
        while(r-i<=d&&r<n&&A[i]>A[r])
            next[i].push(r++)   
        if(!next[i].length)
            dp[i]=1
    }

    for(let i=0;i<n;i++)
        for(let j=0;j<n;j++)
            for(let nei of next[j])
                dp[j]=Math.max(dp[j],dp[nei]+1),
                res=Math.max(res,dp[j])
    return res
}; 

//toposort O(n^2)
var maxJumps = function(A, d) {
    let n=A.length,next=[...Array(n)].map(d=>[]),
        dp=[...Array(n)].map(d=>0),
        topoSort=A.map((d,i)=>[d,i]).sort((a,b)=>a[0]-b[0])

    for (let i = 0; i < A.length; i++) {
        let l=i-1,r=i+1
        while(i-l<=d&&l>=0&&A[i]>A[l])
            next[i].push(l--)
        while(r-i<=d&&r<n&&A[i]>A[r])
            next[i].push(r++)   
        if(!next[i].length)
            dp[i]=1
    }
    
    for(let j=0;j<n;j++)
        for(let nei of next[topoSort[j][1]])
            dp[topoSort[j][1]]=Math.max(dp[topoSort[j][1]],dp[nei]+1)
    return Math.max(...dp)
}; 

// monoq optimization somehow
var maxJumps = function(A, d) {
    let n=A.length,next=[...Array(n)].map(d=>[]),
        dp=[...Array(n)].map(d=>0),
        topoSort=A.map((d,i)=>[d,i]).sort((a,b)=>a[0]-b[0])

    for (let i = 0; i < A.length; i++) {
        let l=i-1,r=i+1
        while(i-l<=d&&l>=0&&A[i]>A[l])
            next[i].push(l--)
        while(r-i<=d&&r<n&&A[i]>A[r])
            next[i].push(r++)   
        if(!next[i].length)
            dp[i]=1
    }
    
    for(let j=0;j<n;j++)
        for(let nei of next[topoSort[j][1]])
            dp[topoSort[j][1]]=Math.max(dp[topoSort[j][1]],dp[nei]+1)
    return Math.max(...dp)
}; 