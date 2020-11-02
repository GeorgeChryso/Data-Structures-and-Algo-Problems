// Bob is standing at cell (0, 0), and he wants to reach destination: (row, column). He can only travel right and down. You are going to help Bob by providing instructions for him to reach destination.

// The instructions are represented as a string, where each character is either:

// 'H', meaning move horizontally (go right), or
// 'V', meaning move vertically (go down).
// Multiple instructions will lead Bob to destination. For example, if destination is (2, 3), both "HHHVV" and "HVHVH" are valid instructions.

// However, Bob is very picky. Bob has a lucky number k, and he wants the kth lexicographically smallest instructions that will lead him to destination. k is 1-indexed.

// Given an integer array destination and an integer k, return the kth lexicographically smallest instructions that will take Bob to destination.

 

// Example 1:

// Input: destination = [2,3], k = 1
// Output: "HHHVV"
// Explanation: All the instructions that reach (2, 3) in lexicographic order are as follows:
// ["HHHVV", "HHVHV", "HHVVH", "HVHHV", "HVHVH", "HVVHH", "VHHHV", "VHHVH", "VHVHH", "VVHHH"].


// 1st approach, TLE
// This problem essentially asks to find the k-th lexicographical permutation of a bitwise representation of length n+m. However there are some impossible states, as each path must consist of Math.max(n,m) 'H's and Math.min(m,n) 'V's
// To compute the k-th such permutation 
// O(k) TLE
var kthSmallestPath = function(destination, kk) {
    //  produces the next lower element with the same number of set bits( 'H' s)
    let snooblo=y=>{
         let  u = (y+1) ^ y, v = (y+1) & y;
         return v - (v & -v) / (u + 1);
    }
    let [n,m]=destination, len=n+m, mx=Math.max(m,n),next,
         first= ((1<<mx)-1 )<<(len-mx) //this is the first element, aka the biggest valid lexicographical element 11110...0 that has its first len bits set

    //then i just use my snooblo k times to find the kth biggest lexico
    for (let i = 0; i <kk; i++) 
        next=snooblo(first),
        first=next   
    
    // and when I do, I recreate it 
    let r='',mask=first
    for(let i=len-1;i>=0;i--)
        if((1<<i)&mask)
            r=r+'H'
        else
            r=r+'V'
    return r
};


// Dynamic Programming
var kthSmallestPath = function(destination, K) {
    var combinations=(n,k)=>{
        let dp=[...Array(n+1)].map(d=>[...Array(n+1)].map(d=>0))
        //basecases
        for (let i = 1; i <=n; i++) 
            dp[i][0]=1,dp[i][i]=1 
        
        for (let i = 1; i <=n; i++) 
            for (let k = 1; k <i; k++) 
                dp[i][k]=dp[i-1][k-1]+dp[i-1][k]      
                      
        return dp
     }
    let [v,h]=destination,dp=combinations(v+h,v+h),result=''
    while(v>0&&h>0){
        // dp[v+h-1][v] is the number of paths of length v+h to the end starting with H 
        // the number of paths from [0,0] to [v,h] is dp[v+h][h], because they must consist of
        // v downs and h rights
        // and it's v+ h-1 cos I already fixed the first position with an H (starting with H)
        // then I just have to choose where to place the v thingz
        // that translates to the number of combinations v+h-1 choose v 
        // or v+h-1 choose h-1
        let ways=dp[v+h-1][v]
        if(K<=ways)
            result=result+'H',
            h--
        
        else
            result=result+'V',
            v--,
            K-=ways
        
    }
    if(h==0)
        for (let i = 0; i < v; i++) 
            result+='V'
    
    if(v==0)
        for (let i = 0; i < h; i++) 
            result+='H'

    return result
};

var kthSmallestPath = function(destination, K) {
    var combinations=(n,k)=>{
        let dp=[...Array(n+1)].map(d=>[...Array(n+1)].map(d=>0))
        //basecases
        for (let i = 0; i <=n; i++) 
            dp[i][0]=1,dp[i][i]=1 
        
        for (let i = 0; i <=n; i++) 
            for (let k = 0; k <i; k++) 
                dp[i][k]=dp[i-1][k-1]+dp[i-1][k]      
                      
        return dp
     }
    let [v,h]=destination,comb=combinations(v+h,v+h),result='',totalLen=v+h
    for (let i = 0; i <totalLen; i++){
        //can I start with h and total ways starting with 'H'>=K
        if(h>0&&K<=comb[v+h-1][v])
            result=result+'H',
            h--
        //cant start with H (h==0 or total ways starting with H are < K) 
        //so I have to startwith V instead
        else 
            result=result+'V',
            K-=comb[v+h-1][v], //<======= Since I'm instead starting from V, my target K changes
            v--
    }

    return result
};
console.log(kthSmallestPath(
    [2,3],3
))