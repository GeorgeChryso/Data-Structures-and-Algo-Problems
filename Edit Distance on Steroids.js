// CRLS 15-5 


// Given two sequences x[1..m] and y[1..n] and set of transformation-operation costs, the edit distance from x to y is the cost of the least expensive operatoin sequence that transforms x to y. Describe a dynamic-programming algorithm that finds the edit distance from x[1..m] to y[1..n] and prints an optimal opeartion sequence. Analyze the running time and space requirements of your algorithm.





``


//dp[i][j][k] minimum cost to transform x[0..i] to y[0...j] with the last operation being k (0<=k<=5)
let MinimumEditDistance=(x,y,costs)=>{
    
    let [COPY,REPLACE,DELETE,INSERT,TWIDDLE,KILL]=costs




}