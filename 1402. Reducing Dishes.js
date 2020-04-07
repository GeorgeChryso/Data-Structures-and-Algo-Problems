// A chef has collected data on the satisfaction level of his n dishes. Chef can cook any dish in 1 unit of time.

// Like-time coefficient of a dish is defined as the time taken to cook that dish including previous dishes multiplied by its satisfaction level  i.e.  time[i]*satisfaction[i]

// Return the maximum sum of Like-time coefficient that the chef can obtain after dishes preparation.

// Dishes can be prepared in any order and the chef can discard some dishes to get this maximum value.



var maxSatisfaction = function(satisfaction) {
    
    satisfaction.sort((a,b)=>a-b)
    if(satisfaction[0]>=0){
        let sum=0
        for (let i = 0; i < satisfaction.length; i++) {
            sum+=(i+1)*satisfaction[i]            
        }
        return sum
    }
    if(satisfaction[satisfaction.length-1]<=0)return 0
    let max=-1
    let maxindex=0
    let n = satisfaction.length
    let point=0
    for (let i = 0; i < satisfaction.length; i++) {
        if(satisfaction[i]>=0)break

            satisfactiony=satisfaction.slice(i)
            let sum=0

            for (let i = 0; i < satisfactiony.length; i++) {
                sum+=(i+1)*satisfactiony[i]            
            }
            max=Math.max(sum,max)    
        
    }



 

    return max
};
