// You are given a list of non-negative integers, a1, a2, ..., an, and a target, S. Now you have 2 symbols + and -. For each integer, you should choose one from + and - as its new symbol.

// Find out how many ways to assign symbols to make sum of integers equal to target S.



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


console.log(findTargetSumWays(
    [1, 1, 1, 1, 1],3 
))