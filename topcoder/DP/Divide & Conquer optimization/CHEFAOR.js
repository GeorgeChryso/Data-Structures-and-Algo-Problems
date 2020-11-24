// Chef studies very well in his University. There is only one professor who doesn't want to give him the highest grade, A. Chef has had a long argument with him, and eventually they agreed, that if Chef solves an algorithmic problem, he gets the highest grade. After looking at the problem, he realized he can't solve it. Once again, he approached Codechef admins for help, and once again we decided to put it off and pass on the task to you. Please, help him (and us)!

// You are given an array A of integers and an integer K. Your goal is to divide the array into K consecutive disjoint non-empty groups, so that any array element belongs to exactly one group.

// Each group can be specified by two integers L and R (L ≤ R) with the meaning that the group contains all the elements from the Lth to the Rth one (both inclusive) in the given array. The cost of such a group equals to the value of bitwise OR of all elements in the group.

// The cost of array for some particular group division equals to the sum of costs for all the groups. You have to find the maximal achievable cost of the given array.

// Input
// The first line of the input contains an integer T denoting the number of test cases. The description of T test cases follows.

// The first line of each test case contains two integers N and K denoting the number of elements in the array and number of groups, respectively.

// The second line contains N space-separated integers A1, A2, ..., AN denoting the given array.

// O(NN+ NMlogN)
var CHEFAOR1 = (n, m, A) => { //or and not xor
    //fast or range queries=> prefix or
    let prefix = [...Array(n)].map(d => [...Array(n)].map(d => 0))
    //N*2 dp to fill prefix OR interval
    for (let i = 0; i <n; i++) 
        for (let j = i,total=0; j < n; j++) 
            total|=A[j],
            prefix[i][j]=total


    let dp = [...Array(m)].map(d => [...Array(n)].map(d => 0))
    dp[0] = [...prefix[0]] //#pro basecase
    let DC = (i, jl, jr, kl, kr) => {
        if (jl > jr)
            return
        let mid = (jl + jr) >> 1, bestk = -1
        for (let k = kl; k <= Math.min(mid, kr); k++)
            if (k + 1 <= mid && dp[i][mid] < dp[i - 1][k] + (prefix[k + 1][mid])) {
                dp[i][mid] = dp[i - 1][k] + (prefix[k + 1][mid])
                bestk = k
            }
        DC(i, jl, mid - 1, kl, bestk)
        DC(i, mid + 1, jr, bestk, kr)
    }
    for (let i = 1; i < m - 1; i++)
        DC(i, 0, n - 1, 0, n - 1)

    for (let j = 0; j < n - 1; j++)
        dp[m - 2][j] += (prefix[j + 1][n - 1])

    //dp.forEach(d => console.log(d.map(d => d == Infinity ? `*` : d) + ''))

    return Math.max(...dp[m - 2])
}
var CHEFAOR2 = (n, m, A) => { //or and not xor

   
    //fast or range queries=> prefix or but the prefix sum of the i-th bits 
    let pre = [...Array(n)].map(d => [...Array(32)].map(d => 0))
    //alternative way to calculate bitwise OR queries
    for(var i = 0; i < n; i++)
        for(var j = 0; j < 32; j++){
            //check if bit i is set for arr[i]
            if((A[i] & (1 << j)) != 0)
                pre[i][j] = 1;   
            if( i > 0) 
                pre[i][j] += pre[i - 1][j];
            
        }
     

     pre.unshift([...Array(32)].map(d=>0))
    let dp = [...Array(m)].map(d => [...Array(n)].map(d => 0))
     //basecase
    for(var j = 0; j < n; j++)
        if(j==0)
            dp[0][j]=A[j]
        else 
            dp[0][j]=(dp[0][j-1]|A[j])
    
   
    let DC = (i, jl, jr, kl, kr) => {
        if (jl > jr)
            return
        let mid = (jl + jr) >> 1, bestk = -1,orquery=0
        for (let k = Math.min(mid, kr); k >=kl; k--){
            //spend O(32) for each
            //calculate OR query for[k+1,mid]
            for (let i = 0; i < 30; i++)
                if( pre[mid+1][i] > pre[k+2-1 ][i])
                    orquery |= (1 << i);
             
            if (k + 1 <= mid && dp[i][mid] < dp[i - 1][k] + orquery) {
                dp[i][mid] = dp[i - 1][k] + orquery
                bestk = k

            }
        }
        DC(i, jl, mid - 1, kl, bestk)
        DC(i, mid + 1, jr, bestk, kr)
    }
    for (let i = 1; i < m - 1; i++)
        DC(i, 0, n - 1, 0, n - 1)

    let acc=A[n-1]
    for (let j = n-2; j >=0; j--){
        dp[m - 2][j] += acc
        acc|=A[j]
    }
    return Math.max(...dp[m - 2])
}
// Knuth optimization
var CHEFAOR3 = (n, m, A) => { 

    let prefix = [...Array(n)].map(d => [...Array(n)].map(d => 0))
    //N*2 dp to fill prefix OR interval
    for (let i = 0; i <n; i++) 
        for (let j = i,total=0; j < n; j++) 
            total|=A[j],
            prefix[i][j]=total

    let dp = [...Array(m)].map(d => [...Array(n)].map(d => 0)),
    h=[...Array(m)].map(d=>[...Array(n)].map(d=>Infinity)) 


    for (let len = 1; len <= n; len++) {
        for (let left = 0; left+len<n; left++) {
            let right=left+len
            if(len<1){
                dp[left][right]=0
                h[left][right]=left //set it to the left doesnt matter
                continue
            }
            dp[left][right]=Infinity
            //here's what changes, I just use the Knuth formula as i know that k lies between 
            // h[i][j-1]<= k <= h[i+1][j]
            for (let k = h[left][right-1]; k <=Math.min(right-1,h[left+1][right]); k++){
                let consideredval=dp[left][k] + prefix[k+1][right]
                if(consideredval<dp[left][right])
                    dp[left][right]=consideredval,
                    h[left][right]=k // dont forget to update this aswell for better k's 
            }
        }        
    }

    let acc=A[n-1]
    for (let j = n-2; j >=0; j--){
        dp[m - 2][j] += acc
        acc|=A[j]
    }

    return Math.max(...dp[m - 2])
}
let tests = [
    [3, 2, [1, 2, 2]], //5
    [4, 3, [1, 2, 3, 4]], //10
    [2, 2, [1, 2]],//3
    [11, 4, [66, 152, 7, 89, 42, 28, 222, 69, 10, 54, 99]] //704
]


console.log(tests.map(([A,B,C])=>CHEFAOR1(A,B,C)))
console.log(tests.map(([A,B,C])=>CHEFAOR2(A,B,C)))
console.log(tests.map(([A,B,C])=>CHEFAOR3(A,B,C)))




for(let a=0;a<1000;a++){
    for (let b =0; b <100000; b++) {
            if( (a|b) >a+b)
                console.log(a,b)            
        
    }
}

//https://projecteuler.net/problem=307
//https://open.kattis.com/problems/fancy