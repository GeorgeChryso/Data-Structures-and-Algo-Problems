// var minStartValue = function(nums) {
//     let start=1
//     let curr=1
//     for (const val of nums) {

//         if(curr+val<1){
//             start+=1-val-curr
//             curr=1
//         }
//         else{
//             curr+=val
//         }

//     }
//     return start
// };

// var findMinFibonacciNumbers = function(k) {

//     let nums=[1,1]

//     while(nums[nums.length-1]<k){
//         nums.push(nums[nums.length-1]+nums[nums.length-2])
//     }

//     let costs=[...Array(k+1)].fill(0)
//     let costsn=[...Array(k+1)].fill(0)
//     let mins=[...Array(k+1)].fill(0)
//     let minsn=[...Array(k+1)].fill(0)

//     for(let i=1;i<nums.length;i++) {

//         for(let j=0;j<=k;j++) {
//             costs[j] = costsn[j];
//             mins[j] = minsn[j];
//             if(nums[i]<=j) {
//                 costs[j] = Math.max(costs[j],costsn[j-nums[i]]+nums[i]);
//                 if(costsn[j]==costsn[j-nums[i]]+nums[i]) {
//                     mins[j] = Math.min(mins[j],minsn[j-nums[i]]+1);
//                 }
//                 else if(costsn[j]<costsn[j-nums[i]]+nums[i]) {
//                     mins[j] = minsn[j-nums[i]]+1;
//                 }
//             }
//         }

//         costsn=[...costs]
//         minsn=[...mins]

//     }

//     return mins[k]

// };

// var findMinFibonacciNumbers = function(k) {

//     let nums=[1,1]

//     while(nums[nums.length-1]<=k){
//         nums.push(nums[nums.length-1]+nums[nums.length-2])
//     }
//     nums.pop()
//     let sum=0
//     let count=1
//     sum=nums[nums.length-1]
//     while(sum!=k){

//         for (var i = 0; i < nums.length; i++) {
//             if(nums[i]+sum>k)break
//         }
//         if(i==0)return count
//         else {

//             sum+=nums[i-1]
//             count++

//         }
//     }

//     return count

// };

// var getHappyString = function(n, k) {

//     let choices=['a','b','c']

//     let arr=['']
//     let memo=new Set()
//     let round=0

//     while(round<n){

//         let temp=[]
//         for (const strt of arr) {
//             for (const plus of choices) {
//                 if(strt[strt.length-1]!==plus){
//                     if(!memo.has(strt+''+plus)){
//                         temp.push(strt+''+plus)
//                         memo.add(strt+''+plus)
//                     }
//                 }
//             }
//         }

//         arr=temp
//         round++
//     }

//     arr.sort()
//     return arr[k-1]?arr[k-1]:""
// };

var numberOfArrays = function(s, k) {
    let n = s.length
    let dp=[...Array(n + 1)].fill(0);
    dp[n] = 1; // the base case

    for (let i=n-1; i>=0; --i) {
        let num = s[i] - '0'
        j = i + 1;
        while (num > 0 && num <= k && j < n + 1) {
            dp[i] = (dp[i] + dp[j]) % 1000000007;
            num = (j < n && num <= k / 10) ? 10 * num + (s[j] - '0') : Infinity
            j++;
        }
        console.log(dp)
    }
    return dp[0];
};

console.log(numberOfArrays("1317"
,2000));
