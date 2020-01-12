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
console.log(minSteps
    (
        6
    )
)
