// Given a positive integer n, find the least number of perfect square numbers (for example, 1, 4, 9, 16, ...) which sum to n.

// Input: n = 12
// Output: 3 
// Explanation: 12 = 4 + 4 + 4.

//smells like a knapsack problem where I create the array of squares
// But: I can choose the same element more than once. 
// knapsack Iterative (O(A)) space
var numSquares = function(n) {
    let A=[]
    let i=1


    // i create my wanted squares
    while(i*i<=n)A.push(i*(i++))
    //from which Imma make a choice

    let possSums=Array(n+1).fill(Infinity) //possSums[i] is the minimum numbers of perfect squares(items) needed to reach the sum=i 

    //base case
    possSums[0]=0 //to reach sum=0 i need 0 items
    
    for (let j= 0; j < A.length; j++) {
     
        //notice how it doesnt work for this
        // for (let i = n; i >=0; i--) {
        //     if(i-A[j]>=0)possSums[i]=Math.min(possSums[i],1+possSums[i-A[j]])            
        // }

        for (let i = A[j]; i <=n; i++) {
            possSums[i]=Math.min(possSums[i], 1+possSums[i-A[j]])  
            
        }

    }        
  
    // for (const ele of A) {
    //     for (let i = ele; i <=n; i++) {
    //         possSums[i]=Math.min(possSums[i],possSums[i-ele]+1)         
    //     }
    // }
    // return possSums[n]==Infinity?-1:possSums[n]

    return possSums[n]==Infinity?-1:possSums[n]
};



//dp  recursion +memo
var numSquares = function(n) {
    let A=[]
    let i=1


    // i create my wanted squares
    while(i*i<=n)A.push(i*(i++))
    //from which Imma make a choice

    let possSums={} //possSums[i] is the minimum numbers of perfect squares(items) needed to reach the sum=i 

    let recursion=(sum)=>{
        if(sum<0)return Infinity
        if(sum==0){
            return 0
        }
        if(possSums[sum]!==undefined)return possSums[sum]

        for (let item of A) {
            possSums[sum]=Math.min(possSums[sum]!==undefined?possSums[sum]:Infinity,recursion(sum-item)+1)
        }

        return possSums[sum]
    }

    return recursion(n)
};

console.log(numSquares(12))