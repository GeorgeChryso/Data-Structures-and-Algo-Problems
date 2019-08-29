// Today, the bookstore owner has a store open for customers.length minutes.  Every minute, some number of customers (customers[i]) enter the store, and all those customers leave after the end of that minute.

// On some minutes, the bookstore owner is grumpy.  If the bookstore owner is grumpy on the i-th minute, grumpy[i] = 1, otherwise grumpy[i] = 0.  When the bookstore owner is grumpy, the customers of that minute are not satisfied, otherwise they are satisfied.

// The bookstore owner knows a secret technique to keep themselves not grumpy for X minutes straight, but can only use it once.

// Return the maximum number of customers that can be satisfied throughout the day.

 

// Example 1:

// Input: customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], X = 3
// Output: 16
// Explanation: The bookstore owner keeps themselves not grumpy for the last 3 minutes. 
// The maximum number of customers that can be satisfied = 1 + 1 + 1 + 1 + 7 + 5 = 16.
 

// Note:

// 1 <= X <= customers.length == grumpy.length <= 20000
// 0 <= customers[i] <= 1000
// 0 <= grumpy[i] <= 1


var maxSatisfied = function(C, G, X) {
    let fin=0
    function satisfaction(i){
 


      fin=Math.max(fin, 
        C.reduce((acc,c,j)=> {   
            
            if(
                (G[j]==0)  || (j>=i && j<= i+X-1 )  
            ){
            return acc+c}
        return acc},0) )
            
       
    }
    
    for (let i = 0; i <= G.length-X; i++) {
        if(G[i]==0&&G[i+1]==0&&[G[i+2]==0]){i=i+2}
        satisfaction(i)

    }
return fin
};
var maxSatisfied = function(customers, grumpy, X) {
    let guar_sat = 0;
    let queue = [];
    for(let i = 0; i < customers.length; i++) {
        guar_sat += grumpy[i] == 0 ? customers[i] : 0;
        if(grumpy[i] == 1) {
            queue.push(i);
        }
    }
    let max_sat = guar_sat;
    let left = 0;
    let right = 0;
    while(right < queue.length) {
        while(queue[right] - queue[left] >= X) {
                let yesGrumpy = queue[left];
                guar_sat -= customers[yesGrumpy];
                left += 1;
            }
        let noGrumpy = queue[right];
        guar_sat += customers[noGrumpy];
        max_sat = Math.max(max_sat, guar_sat);
        right += 1;
    }
    return max_sat;
};

console.log(
    maxSatisfied(
 
//         [1,0,1,2,1,1,7,5],
// [0,1,0,1,0,1,0,1],
// 3
        [2,6,6,9],
        [0,0,1,1],
        1
    )
)