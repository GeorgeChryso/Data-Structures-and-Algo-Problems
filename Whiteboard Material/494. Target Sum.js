// You are given a list of non-negative integers, a1, a2, ..., an, and a target, S. Now you have 2 symbols + and -. For each integer, you should choose one from + and - as its new symbol.

// Find out how many ways to assign symbols to make sum of integers equal to target S.


//dfs naive solution 
//Time complexity : O(2^n) Size of recursion tree will be 2^n
//Space complexity : O(n)). The depth of the recursion tree can go upto n.
var findTargetSumWays = function(Arr, S) {
    if(!Arr.length)return 0
    let count=0

    var dfs=(i,acc)=>{
        if(i>Arr.length-1){
            if(acc==S)count++
            return
        }

        dfs(i+1,acc+Arr[i])
        dfs(i+1,acc-Arr[i])
    }

    dfs(0,0)
    return count
};





//touzbouz
var findTargetSumWays = function(nums, S, sum = 0, i = 0, memo = new Map()){
    let key = sum + ',' + i;
    if (memo.has(key)) return memo.get(key);
    if (i === nums.length) return +(sum === S);
    memo.set(key, findTargetSumWays(nums, S, sum + nums[i], i + 1, memo) + findTargetSumWays(nums, S, sum - nums[i], i + 1, memo));
    return memo.get(key);
};

//knapsack concept have to write it down

// classic knapsack: Choose the item or not, with a total weight constraint in order to maximize value
// this knapsack: Add the item or not(subtract it), with a total weight constraint S, in order to maximize the number of ways for first i-th(nth) element to reach a sum+S


// That would be O(N*(2*S+1))=O(N*S) runtime and 
// O(N*(SUM of the elements of the array)) space
// It can be reduced to O(SUM) space
var findTargetSumWays = function(Arr, S) {
    
    var sum=Arr.reduce((acc,curr)=>acc+curr)
    if(S<-sum||S>sum)return 0

    // each cell dp[i][j] represents the number of ways I can reach sum equal to j-sum 
    var dp=Array(Arr.length+1).fill().map(d=>new Array(2*sum+1).fill(0))

    dp[0][0+sum]=1 // j=0+sum means 0, j=0 means -sum
    //giati to euros twn lusewn mou einai apo [-sum, sum]
    
    for (let i = 1; i <= Arr.length; i++) {
        dp.forEach(d=>console.log(d+''))

        for (let j = 0; j < (2  * sum + 1); j++) {
            
            if((j + Arr[i - 1]) <= 2  * sum ) dp[i][j] += dp[i - 1][j + Arr[i - 1]]
            if((j - Arr[i - 1] )>= 0) dp[i][j] += dp[i - 1][j - Arr[i - 1]];
            
        }        
        console.log('\n')
    }

    dp.forEach(d=>console.log(d+''))

    return dp[Arr.length][sum+S]
};


// Here i m turning the space complexity to O(sum) (still using Knapsack memo)
var findTargetSumWays = function(Arr, S) {
    
    var sum=Arr.reduce((acc,curr)=>acc+curr)
    if(S<-sum||S>sum)return 0

    //reducing the space complexity cos I just need 2 arrays at a time
    var previous=new Array(2*sum+1).fill(0)
    var current=new Array(2*sum+1).fill(0)


    previous[0+sum]=1 
    
    for (let i = 1; i <= Arr.length; i++) {
        for (let j = 0; j < (2  * sum + 1); j++) {

            //you need to set your new array's element to zero first,cos current keeps its 
            // "pseudo" state
            current[j]=0

            if((j + Arr[i - 1]) <= 2  * sum ) current[j] += previous[j + Arr[i - 1]]
            if((j - Arr[i - 1] )>= 0) current[j] += previous[j - Arr[i - 1]];
            
        }
        //essentially copy the current array to previous
        previous=[...current]        

    }


    return previous[sum+S]?previous[sum+S]:0
};

// yuxiangmusic
var findTargetSumWays = function(Arr, S) {
    var sum=Arr.reduce((acc,curr)=>acc+curr)
    
    // S+sum explanation:
    // So the problem becomes
    // Find a subset P of nums such that sum(P) = (target + sum(nums)) / 2
    // where P is the positives that I choose
    if((sum<S)||(S+sum)%2)return 0

    //??
    S=(S+sum)>>1



    //prolly storing the sums here
    let dp=Array(S+1).fill(0)
    dp[0]=1

    for (const weight of Arr) {
        for (let possible_weight = S; possible_weight>=weight; possible_weight--) { 
            dp[possible_weight]+=dp[possible_weight-weight]            
        }
    }
    return dp[S]
};

console.log(findTargetSumWays(
    //[1, 2, 1, 3],4 
    [1,1,1,1,1],3
))


