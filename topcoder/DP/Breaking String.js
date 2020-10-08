// A certain string-processing language allows the programmer to break a string into two pieces. Since this involves copying the old string, it costs n units of time to break a string of n characters into two pieces. Suppose a programmer wants to break a string into many pieces. The order in which the breaks are made can affect the total amount of time used. For example, suppose we wish to break a 20 character string after characters 3, 8, and 10 (numbering the characters in ascending order from the left-hand end, starting from 1). If the breaks are made in left-to-right order, then the first break cost 20 units of time, the second break costs 17 units of time, and the third breaks costs 12 units of time, a total of 49 units of time (see the sample below). If the breaks are made in right-to-left order, then the first break costs 20 units of time, the second break costs 10 units of time, and the third break costs 8 units of time, a total of 38 units of time.

// The cost of making the breaks in left-to-right order:

// thisisastringofchars     (original)
// thi sisastringofchars    (cost:20 units)
// thi sisas tringofchars   (cost:17 units)
// thi sisas tr ingofchars  (cost:12 units)
//                          Total: 49 units.
// The cost of making the breaks in right-to-left order:

// thisisastringofchars     (original)
// thisisastr ingofchars    (cost:20 units)
// thisisas tr ingofchars   (cost:10 units)
// thi sisas tr ingofchars  (cost: 8 units)
//                          Total: 38 units.
// Input:

// There are several test cases! In each test case, the first line contains 2 integers N (2<=N<=10000000) and M (1<=M<=1000, M<N). N is the original length of the string, and M is the number of the breaks. The following lines contain M integers Mi (1<=Mi<N) in ascending order that represent the breaking positions from the string's left-hand end.

// Output:

// For each test case, output in one line the least cost to make all the breakings.

// Sample Input:

// 20 3
// 3 8 10
// Sample Output:

// 37

// O(N**3), TLE
var BreakingStrings=(N,Breaks)=>{

    // dp[i][j] holds the minmum cost to cut from [i,j] optimally
    let dp=[...Array(N)].map(d=>[...Array(N)].map(d=>Infinity)) 
    
    //i dont want to cut my final words so i set their cost to 0
    let start=0
    for (let i = 0; i < Breaks.length; i++) {
        dp[start][Breaks[i]-1]=0
        start=Breaks[i]-1//-1 everywhere because the indices start at 1 
    }
    dp[start][N-1]=0 //dont forget to set the final interval to  0 aswell

    let minCost=(start,end)=>{
        if(dp[start][end]==Infinity){
            let res=Infinity
            for (let i = 0; i < Breaks.length; i++) { 
                // consider each possible cut within Breaks that's between star,end
                if((start<Breaks[i]-1)&&(Breaks[i]-1<end))
                    res=Math.min(res,minCost(start,Breaks[i]-1)+minCost(Breaks[i]-1,end))            
            }
            dp[start][end]=res+end-start+1 // dont forget to addd the end-start+1 for the cost of the actual word
        }
        return dp[start][end]
    }   
    return minCost(0,N-1)
}

// let's try it bottom up
// O(n**3) classic dp
var BreakingStrings=(N,Breaks)=>{

    //dp[i][j] stores the minimum cost for the substring between the ith and j-th BREAK POINTS 
    let dp=[...Array(N)].map(d=>[...Array(N)].map(d=>Infinity)) 
    

    let n=Breaks.length
    Breaks.unshift(0)//sentinel
    Breaks.push(N)//sentinel

    // so here left, right and k mean the INDEX of the point, and not the point itself
    for (let len = 0; len <= n+1; len++) {
        for (let left = 0; left+len<=n+1; left++) {
            let right=left+len
            if(len<2){
                dp[left][right]=0
                continue
            }
            dp[left][right]=Infinity
            for (let k = left; k <=right; k++) 
                dp[left][right]=Math.min(dp[left][right],
                    dp[left][k] + dp[k][right] + (Breaks[right] - Breaks[left])
                    )             
            
        }        
    }
    return dp[0][n+1] // meaning 0 and N
}

//                          Knuth Optimization
// costs(x,y)=Breaks[y]-Breaks[y]  , x<=y  is the function in question
// obviously Breaks is in ascending order, so it satisfies both the conditions for Knuth

// 1)so it is convex monotone a<=b<=c=d => Breaks[c]-breaks[b]<= Breaks[d]-Breaks[a]
// 2) and Breaks[c]-Breaks[a]+Breaks[d]-Breaks[b]<= Breaks[d]-Breaks[a]+Breaks[c]-Breaks[b]
// convex Quadrangle  inequality (equal)

// O(n**2) amortized
var BreakingStrings=(N,Breaks)=>{

    //dp[i][j] stores the minimum cost for the substring between the ith and j-th BREAK POINTS 
    let dp=[...Array(N)].map(d=>[...Array(N)].map(d=>Infinity)),
        // h[i][j] will store the BEST k such that dp[i][j] takes its minimum value on that k
        // dp[i][j]= dp[i][k]+dp[k][j]+ Breaks[j]-Breaks[i]
        h=[...Array(N)].map(d=>[...Array(N)].map(d=>Infinity)) 
        // this will help me to utilize the knuth optimization as I will know that 
        // for any dp[i][j]. the best k is between h[i][j-1]<= k <= h[i+1][j]
        
    let n=Breaks.length
    Breaks.unshift(0)//sentinel
    Breaks.push(N)//sentinel

    // so here left, right and k mean the INDEX of the point, and not the point itself
    for (let len = 0; len <= n+1; len++) {
        for (let left = 0; left+len<=n+1; left++) {
            let right=left+len
            if(len<2){
                dp[left][right]=0
                h[left][right]=left //set it to the left doesnt matter
                continue
            }
            dp[left][right]=Infinity

            //here's what changes, I just use the Knuth formula as i know that k lies between 
            // h[i][j-1]<= k <= h[i+1][j]
            for (let k = h[left][right-1]; k <=h[left+1][right]; k++){
                let consideredval=dp[left][k] + dp[k][right] + (Breaks[right] - Breaks[left])
                if(consideredval<dp[left][right]){
                    dp[left][right]=consideredval
                    h[left][right]=k // dont forget to update this aswell for better k's 
                }

            }
        }        
    }
    return dp[0][n+1] // meaning 0 and N
}

console.log(BreakingStrings(
    20,[3,8,10]
))