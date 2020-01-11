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
    console.log(possSums)

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



    // recursion(sum) returns the min number of elements needed to reach sum
    let recursion=(sum)=>{
        if(sum<0)return Infinity
        if(sum==0){
            //the base case : 0 elements needed to reach sum 0
            return 0
        }
        //utilizing the memo to avoid excess computations
        if(possSums[sum]!==undefined)return possSums[sum]

    
        for (let item of A) {
            // the known formula
            possSums[sum]=Math.min(possSums[sum]!==undefined?possSums[sum]:Infinity,recursion(sum-item)+1)
        }
        console.log(possSums)
        return possSums[sum]
    }

    return recursion(n)
};

// just recursion? and faster
var numSquares = function(n) {
    const squares = [];
    let count = n;
    for(let i = n; i >= 1; i--){
        if(Number.isInteger(Math.sqrt(i))){
            squares.push(i)
        }
    }

    var helper = function(n, recs = 0, index = 0){
        if(n === 0){
            count = Math.min(count, recs);
            return;
        }
        if(Number.isInteger(Math.sqrt(n))){
            count = Math.min(count, recs+1);
            return;
        }
        for (const index in squares) {
            if(squares[index]<=n)helper(n-squares[index],recs+1,index+1)
        }

    }

    helper(n);
    return count;
};


// static dp? The same as the above dp+memo
var numSquares = function(n) {
    const squares = [];
    for(let i = n; i >= 1; i--){
        if(Number.isInteger(Math.sqrt(i))){
            squares.push(i)
        }
    }
    let countPS=[0]
    

    //essentially runs for n times( cos each time i m adding exactly one element)
    // so its a funny way of describing every possible sum up to n, same with my previous solution really.
    while (countPS.length<=n) {
        let length=countPS.length // this also represents every possible sum to n
        let count=Infinity
        for (let i = 1; i*i <=length; i++) {
            count=Math.min(count,countPS[length-i*i]+1)
        }

        countPS.push(count)
    }
    console.log(countPS)
    return countPS[n];
};


// Lagrange's theorem fo four squares: Every number can be written as the sum of four squares of integers
// so my potential answers are 0,1,2,3,4
// 0 never happens because there's always an answer
// 1 happens when the number itself is a valid square 
var numSquares=n=>{

    //returns if the number x is a valid square root ( can be represented as the square of an integer)
    let isSquare=x=>Math.floor(Math.sqrt(x))**2===x


    if(isSquare(n))return 1 // that would be the fact that its equal to itself

    // Legendre's three square theorem: A natural number n can be represented as the sum of three squares of integers if and only if : n!= 4^x ( 8*m+7)
    // that means that my number is  written as such, my result is immediately 4
    // so i m just gonna keep dividing by 4, and my finalresult mod8  has to be 7 
    // for every x=2^i, n&x=n%(x+1)
    // n&3=n%4 
    // tldr: while possible, keep dividing the number by 4
    // while(n&3===0)n=n>>2 // divides the number by 4,  equivalent to n=n/4
    while(n%4===0) n/=4
    // n&7=n%8
    // if(n&7==7)return 4
    if(n%8===7)return 4
    //ok, we ruled out the possibility of result 4
    // there are only 2 results remaining, 2 and 3

    // Manually checking for result 2
    for (let i = 0; i <=n ; i++) {
        // if x=n-i*i   and x is a valid square then OBVIOUSLY
        // n=i^2 +sqrt(x)^2  ,so n is a square of two numbers   
        if(isSquare(n-i*i))return 2
    }

    // otherwise
    return 3
}


//bfs
var numSquares = function(n) {
    const squares = [];
    for(let i = n; i >= 1; i--){
        if(Number.isInteger(Math.sqrt(i))){
            squares.push(i)
        }
    }
    let memo={}
    let queue=[n]
    while(queue.length){
        let temp=[]
        queue.forEach(
            element=>{
                if(memo[element]!==undefined)return memo[element]
                for (const square of squares) {
                    memo[element]=Math.min(element-square,memo[element])
                }
            }
        )
    }

};


console.log(numSquares(21))

