// You are climbing a stair case. It takes n steps to reach to the top.

// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

// Note: Given n will be a positive integer.


// DFS kinda, I will have to create all of the possible trees with this approach. Works but Time limit Exceeded. 
var climbStairs = function(n) {
    var counter=0
    
    function dp(curr){
        if(curr===n){
            counter++
            return
        }
        if(curr>n)return

        dp(curr+1)
        dp(curr+2)


    }

    dp(0)
    return counter
};



var climbStairs = function(n) {
    var A=Array(n+1).fill(0)
    A[1]=1
    A[2]=2
    for (let i = 3; i < A.length; i++) {
       A[i]=A[i-1]+A[i-2] 
    }
    return A[n]
};



console.log(climbStairs(
    5
))