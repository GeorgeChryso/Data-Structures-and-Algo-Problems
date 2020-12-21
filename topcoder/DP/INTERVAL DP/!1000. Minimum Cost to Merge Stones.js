// There are N piles of stones arranged in a row.  The i-th pile has stones[i] stones.

// A move consists of merging exactly K consecutive piles into one pile, and the cost of this move is equal to the total number of stones in these K piles.

// Find the minimum cost to merge all piles of stones into one pile.  If it is impossible, return -1.

//recursive
var mergeStones = function(stones, K) {
    let n = stones.length,prefix=[0],cache={};
    if ((n-1) % (K - 1)) 
        return -1;
    for (let i = 0; i <= n; i++) 
        prefix[i + 1] = stones[i] + prefix[i]
    let recursive=(i, j, m)=> {
        let key = '' + i + j + m
        if( !cache[key] )
            return cache[key];
        if(i === j) 
            return m !== 1 ? Infinity : 0
        if(m === 1) 
            return recursive(i, j, K) + prefix[j+1] - prefix[i]
        for(let mid = i; mid < j; mid += (K - 1)) 
            cache[key]=Math.min(
                        cache[key]||Infinity,
                        recursive(i, mid, 1) + recursive(mid + 1, j, m - 1)
                        )
        return cache[key] 
    }
    return recursive(0, n-1, 1);
};

// dp[i][j]=min cost to merge [i,j] until it can be merged no more. (not necessarily 1 pile)

var mergeStones = function(A, K) {
    let n=A.length,prefix=[...Array(n+1)].map(d=>0),
        dp=[...Array(n)].map(d=>[...Array(n)].map(d=>0))
    if ((n - 1) % (K - 1) > 0) //cant be reduced into one pile
        return -1;

    for (let i = 0; i < n; i++) 
        prefix[i+1]=prefix[i]+A[i]
    
    for (let len =K; len <=n; len++) 
        for (let i = 0; i <=n-len; i++) {
            let j=i+len-1
            dp[i][j]=Infinity
            for (let mid= i; mid <j; mid+=K-1) // the best middle point 
                dp[i][j] = Math.min(dp[i][j], dp[i][mid] + dp[mid+1][j]); 
            if ((j-i) % (K-1) == 0) //can be merged into one pile
                dp[i][j] += prefix[j+1] - prefix[i]; //when i merge into one i pay the cost
        }
    return dp[0][n-1] ; 
};  
console.log(mergeStones(
   
[3,5,1,2,6],
3
))
