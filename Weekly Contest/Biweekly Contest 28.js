



// var finalPrices = function(prices) {
//     let res=[]
//     for (let i = 0; i < prices.length; i++) {
//         res[i]=prices[i]
//         for (let j = i+1; j < prices.length; j++) {
//             if(prices[j]<=prices[i]){
//                 res[i]-=prices[j]
//                 break
//             }            
//         }        
//     }
//     return res
// };




// var SubrectangleQueries = function(rectangle) {
//     this.rec=rectangle
// };

// /** 
//  * @param {number} row1 
//  * @param {number} col1 
//  * @param {number} row2 
//  * @param {number} col2 
//  * @param {number} newValue
//  * @return {void}
//  */
// SubrectangleQueries.prototype.updateSubrectangle = function(row1, col1, row2, col2, newValue) {
    
//     for (let i = row1; i <= row2; i++) {
//         for (let j = col1; j <=col2; j++) {
//             this.rec[i][j]=newValue            
//         }        
//     }
// };

// /** 
//  * @param {number} row 
//  * @param {number} col
//  * @return {number}
//  */
// SubrectangleQueries.prototype.getValue = function(row, col) {
//     return this.rec[row][col]
// };



var minSumOfLengths = function(arr, target) {
    
    let result=Infinity
    target*=2
    let total=arr.reduce((acc,curr)=>acc+curr)
    if(total<target)return -1
    
    let dp=[...Array(arr.length+1)].map(d=>[...Array(target+1)].map(q=>Infinity))
    //dp[i][j] minimum number of items from 0...ith to reach sum =j 
    dp[0][0]=0
    for (let i = 1; i < dp.length; i++) {
        for (let j = 0; j <=target; j++) {
           if(j>=arr[i-1]) dp[i][j]=Math.min(dp[i-1][j-arr[i-1]]+1,dp[i-1][j])
           else dp[i][j]=dp[i-1][j]
        }
    }

    dp.forEach(d=>console.log(d+''))
    return dp[arr.length-1][target]===Infinity?-1:dp[arr.length-1][target]
};


var minSumOfLengths = function(arr, target) {
    arr.sort((a,b)=>a-b)
    for (var i = 0; i < arr.length; i++) {
        if(arr[i]>target)break        
    }
    arr.splice(i)

    let result=Infinity
    let total=arr.reduce((acc,curr)=>acc+curr)
    if(total<2*target)return -1
    
    let dp=[...Array(arr.length+1)].map(d=>[...Array(target+1)].map(q=>Infinity))
    //dp[i][j] minimum number of items from 0...ith to reach sum =j 
    dp[0][0]=0
    for (let i = 1; i < dp.length; i++) {
        for (let j = 0; j <=target; j++) {
           if(j>=arr[i-1]) dp[i][j]=Math.min(dp[i-1][j-arr[i-1]]+1,dp[i-1][j])
           else dp[i][j]=dp[i-1][j]
        }
    }

    dp.forEach(d=>console.log(d+''))
    return dp[arr.length-1][target]===Infinity?-1:dp[arr.length-1][target]
};


var minSumOfLengths = function(arr, target) {
    // arr.sort((a,b)=>a-b)
    // for (var i = 0; i < arr.length; i++) {
    //     if(arr[i]>target)break        
    // }
    // arr.splice(i)
    if(arr.length===0)return -1
    let result=Infinity
    let total=arr.reduce((acc,curr)=>acc+curr)
    if(total<2*target)return -1
    
    let prefix=[0]
    let sum=0
    for (let i = 0; i < arr.length; i++) {
        sum+=arr[i]
        prefix.push(sum)
    }
    console.log(arr)
    console.log(prefix)
    let memo=[...Array(arr.length)]

    for (let i = 0; i < prefix.length; i++) {
        for (let j = i+1; j < prefix.length; j++) {
            s1=prefix[j]-prefix[i]  
            if(s1>target||j-i>result)continue
            if(s1===target){
                memo[j-i]?memo[j-i].push([i,j-1]):memo[j-i]=[[i,j-1]]
            }
        }
    }
    console.log(memo)

    return result===Infinity?-1:result
};
console.log(minSumOfLengths(
    //   [3,2,2,4,3],  3
  //  [3,1,1,1,5,1,2,1],3
//   [26,5,16,1,2,2,25,20,1,5,1,9,32,4,2,2,3,34,6,8,1,1,2,45,2,2,1,1,1,50,1,1,32,6,7,6,1,37]
//   ,52
  //
  [64,5,20,9,1,39],69
))