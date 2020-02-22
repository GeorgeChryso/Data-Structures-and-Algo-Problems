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

//bfs
var integerReplacement = function(n) {
    
    let q=[n]
    let level=0
    while(q.length){
        temp=[]
        
        for (const d of q) {
            if(d%2){
                if(d-1==1||d+1==1)return level
                temp.push(d-1,d+1)
            }
            else{
                if(d/2===1)return level
                temp.push(d/2)
            }
        }
           
        level++
        q=temp
    }
};

//bitwise solution

var integerReplacement = function(n) {
    
    let q=[n]
    let level=0
    while(q.length){
        temp=[]
        
        for (const d of q) {
            if(d%2){
                if(d-1==1||d+1==1)return level
                temp.push(d-1,d+1)
            }
            else{
                if(d/2===1)return level
                temp.push(d/2)
            }
        }
           
        level++
        q=temp
    }
};