// Initially on a notepad only one character 'A' is present. You can perform two operations on this notepad for each step:

// Copy All: You can copy all the characters present on the notepad (partial copy is not allowed).
// Paste: You can paste the characters which are copied last time.
 

// Given a number n. You have to get exactly n 'A' on the notepad by performing the minimum number of steps permitted. Output the minimum number of steps to get n 'A'.




//recursion
var minSteps=n=>{
    let result=Infinity

    let recursion=(total,cache,steps,copied)=>{
        if(total>n||steps>n)return
        if(total==n||steps==n)return result=Math.min(steps,result)
        
        //copy
       if(!copied)recursion(total,total,steps+1,true)
        //paste
       if(copied){
             // with the intention of continuing to paste
            recursion(total+cache,cache,steps+1,true)
            // with the intention of copying next round
            recursion(total+cache,cache,steps+1,false)
         }  
    }

    recursion(1,1,0,false)
    return result
}


// dp memo is good enough
var minSteps=n=>{
    let dp=Array(n+1).fill(Infinity).map((d,i)=>i)
    //the maximum steps required to get i, is i obviously

    //dp[i] is the minimum number of steps required to get i
    // firstm
    //base case
    dp[0]=0
    dp[1]=0


    // I can get 6 only by dp[2]+COPYPASTEPASTE 
    // I can get 2 by dp[2]=dp[1]+CP=dp[1]+2
    // so I can get 6 by dp[6]=dp[2]+3=dp[1]+2+3=5
    // OR 
    // dp[6]=dp[3]+CP=dp[3]+2
    // .. so i can get any number k, dp[k]=dp[j]+k/j, assuming k%j==0
    for (let i = 2; i <=n; i++) {
        // for (let j = i; j >=0; j--) { // same thing 
        //     if(i%j==0)dp[i]=Math.min(dp[i],dp[j]+i/j)
        // }              
        for (let j = 0; j < i; j++) {
            if(i%j==0)dp[i]=Math.min(dp[i],dp[j]+i/j)
        }
    }


    return dp[n]
}

//recursive Optimized based on maths
// IT IS ALWAYS BETTER DTO DIVIDE WHENEVER POSSIBLE
// so it turns into a problem for finding the sum of all possible factors of a number,
// so essentially the dp/memo is not needed
let minSteps=n=>{
    if(n==1)return 0
    for (let i = 2; i <n; i++) {
        if(n%i==0)return i+minSteps(n/i)        
    }
    return n
}


//'https://leetcode.com/problems/2-keys-keyboard/discuss/105932/Java-solutions-from-naive-DP-to-optimized-DP-to-non-DP' for more in depth 

[1,2,3,1,5,6,8,7,12,23,26,71].forEach(d => {
    console.log(d+'         ',minSteps(d),AminSteps(d))
});