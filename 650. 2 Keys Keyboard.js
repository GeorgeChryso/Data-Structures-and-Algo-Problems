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


// dp memo
var AminSteps=n=>{
    let dp=Array(n+1).fill(Infinity).map((d,i)=>i)
    //dp[i] is the minimum number of steps required to get i
    
    //base case
    dp[0]=0
    dp[1]=0


    for (let i = 2; i <=n; i++) {
        for (let j = i; j >=0; j--) {
            if(i%j==0)dp[i]=Math.min(dp[i],dp[j]+i/j)
        }              
    }


    return dp[n]
}


[1,2,3,1,5,6,8,7,12,23,26,71].forEach(d => {
    console.log(d+'         ',minSteps(d),AminSteps(d))
});