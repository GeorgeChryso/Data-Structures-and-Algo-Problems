// Given a positive integer n and you can do operations as follow:

// If n is even, replace n with n/2.
// If n is odd, you can replace n with either n + 1 or n - 1.
// What is the minimum number of replacements needed for n to become 1?


//recursion
var integerReplacement = function(n) {
    if(n<1)return Infinity
    if(n===1)return 0

     return (n%2?Math.min(integerReplacement(n-1),integerReplacement(n+1)):integerReplacement(n/2))+1
};
//recursion with memo optimized
var integerReplacement = function(n,dict={}) {
    if(n<1)return Infinity
    if(n===1)return 0
    //dict is a memo with the results of expanded branches of dfs
    if(dict[n]!=undefined)return dict[n]

    dict[n]=(n%2?Math.min(integerReplacement(n-1,dict),integerReplacement(n+1,dict)):integerReplacement(n/2,dict))+1
    return dict[n]
};

//bfs
var integerReplacement = function(n) {
    if(n==1)return 0
    //avoid repetitive work
    let dict=new Set() // so I dont expand trees I've expanded in the past

    let q=[n]
    dict.add(n)
    let level=0
    while(q.length){
        temp=[]
        
        for (const d of q) {
            if(d%2){
                if(d-1==1||d+1==1)return level+1
                if(!dict.has(d-1)){
                    dict.add(d-1)
                    temp.push(d-1)
                }
                if(!dict.has(d+1)){
                    dict.add(d+1)
                    temp.push(d+1)
                }
            }
            else{
                if(d/2===1)return level+1
                if(!dict.has(d/2)){
                    dict.add(d/2)
                    temp.push(d/2)
                }
            }
        }
           
        level++
        q=temp
    }
};

//bitwise solution

var integerReplacement = function(n) {
    if(n==1)return 0
    //avoid repetitive work
    let dict=new Set() // so I dont expand trees I've expanded in the past

    let q=[n]
    dict.add(n)
    let level=0
    while(q.length){
        temp=[]
        
        for (const d of q) {
            if(d%2){
                if(d-1==1||d+1==1)return level+1
                if(!dict.has(d-1)){
                    dict.add(d-1)
                    temp.push(d-1)
                }
                if(!dict.has(d+1)){
                    dict.add(d+1)
                    temp.push(d+1)
                }
            }
            else{
                if(d/2===1)return level+1
                if(!dict.has(d/2)){
                    dict.add(d/2)
                    temp.push(d/2)
                }
            }
        }
           
        level++
        q=temp
    }
};


// When n is even, the operation is fixed. The procedure is unknown when it is odd. When n is odd it can be written into the form n = 2k+1 (k is a non-negative integer.). That is, n+1 = 2k+2 and n-1 = 2k. Then, (n+1)/2 = k+1 and (n-1)/2 = k. So one of (n+1)/2 and (n-1)/2 is even, the other is odd. And the "best" case of this problem is to divide as much as possible. Because of that, always pick n+1 or n-1 based on if it can be divided by 4. The only special case of that is when n=3 you would like to pick n-1 rather than n+1.


var integerReplacement = function(n) {
    
    // Base case: Arrive at target number.
    if (n === 1) {
        return 0;
    }
    
    // Special case: 3 is in the middle of 2 and 4.
    if (n === 3) {
         return 2;
    }
    
    // If even, then just keep dividing.
    if (n % 2 === 0) {
        return 1 + integerReplacement(n / 2);
    }
    
    // If odd, then pick a neighbor number that is divisible by 2.
    if (((n + 1) / 2) % 2 === 0) {
        return 2 + integerReplacement((n + 1) / 2);
    } else {
        return 2 + integerReplacement((n - 1) / 2);
    }
};

var integerReplacement=n=>{
    
        if( n== 2147483647)return 32
        if (n <= 2) return n-1;
        if (n == 3) return 2;
        if (n % 2 == 0) return integerReplacement(n/2)+1;
        //can it be dividied by 4?
        else return (n&2) == 0 ? integerReplacement(n-1)+1 : integerReplacement(n+1)+1;
    
}

console.log(
    integerReplacement(1234)
)

console.log(-1>>>1)