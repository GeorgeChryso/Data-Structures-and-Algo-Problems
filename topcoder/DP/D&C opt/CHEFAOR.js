// Chef studies very well in his University. There is only one professor who doesn't want to give him the highest grade, A. Chef has had a long argument with him, and eventually they agreed, that if Chef solves an algorithmic problem, he gets the highest grade. After looking at the problem, he realized he can't solve it. Once again, he approached Codechef admins for help, and once again we decided to put it off and pass on the task to you. Please, help him (and us)!

// You are given an array A of integers and an integer K. Your goal is to divide the array into K consecutive disjoint non-empty groups, so that any array element belongs to exactly one group.

// Each group can be specified by two integers L and R (L ≤ R) with the meaning that the group contains all the elements from the Lth to the Rth one (both inclusive) in the given array. The cost of such a group equals to the value of bitwise OR of all elements in the group.

// The cost of array for some particular group division equals to the sum of costs for all the groups. You have to find the maximal achievable cost of the given array.

// Input
// The first line of the input contains an integer T denoting the number of test cases. The description of T test cases follows.

// The first line of each test case contains two integers N and K denoting the number of elements in the array and number of groups, respectively.

// The second line contains N space-separated integers A1, A2, ..., AN denoting the given array.
// process.stdin.resume();
// process.stdin.setEncoding('utf-8');
// var arr = "";
// process.stdin.on('data', function(chunk) {
//   arr += chunk;
// });
// process.stdin.on('end', function() {
//   arr = arr.split("\n");
//   var n = parseInt(arr.shift()); // in order ot get no of test cases
//   for (let testcase = 0; testcase < n; testcase++) {
//         let [N,k]=arr.shift().split(' ').map(d=>Number(d))      
//         let A=arr.shift().split(' ').map(d=>Number(d))
//         console.log(CHEFAOR(N,k,A))
//   }
    
// });

let CHEFAOR=(n,m,A)=>{ //or and not xor
    //fast xor range queries=> prefix or
    let prefix=[0]
    for (let i = 0; i <n; i++) 
        prefix.push(prefix[prefix.length-1]^A[i])        
    // prefix[j]^prefix[i] means the xor from i to j-1
    let dp = [...Array(m)].map(d => [...Array(n)].map(d => Infinity))
    dp[0]=prefix.slice(1) //#pro basecase
    let DC=(i,jl,jr,kl,kr)=>{
        if(jl>=jr)
            return
        let mid=(jl+jr)>>1,bestk=-1
        for (let k = kl; k <=Math.max(mid,kr); k++)
            if (dp[i][mid]>dp[i-1][k]+ (prefix[mid+1]^prefix[k+2])) {
                dp[i][mid]=dp[i-1][k]+ (prefix[mid+1]^prefix[k+2])
                bestk=k
            }
        DC(i,jl,mid-1,kl,bestk)
        DC(i,mid+1,jr,bestk,kr)
    }
    for (let i = 1; i < m-1; i++) 
        DC(i,0,n,0,n)
        dp.forEach(d => console.log(d.map(d => d == Infinity ? `*` : d) + ''))
    for (let j = 0; j < n-1; j++) 
        dp[m-2][j]+=(prefix[n]^prefix[j+2])
    return Math.min(...dp[m-2])
}

let tests=[
    [3,2,[1,2,2]],
    [4,3,[1,2,3,4]],
    [2,2,[1,2]],
    [11,4,[66,152, 7, 89, 42, 28, 222, 69 ,10 ,54, 99]]
]
for (const [n,m,ar] of tests) {
    console.log(CHEFAOR(n,m,ar))
}