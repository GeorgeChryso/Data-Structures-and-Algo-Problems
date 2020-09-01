// CRLS 15-5 


// Given two sequences x[1..m] and y[1..n] and set of transformation-operation costs, the edit distance from x to y is the cost of the least expensive operatoin sequence that transforms x to y. Describe a dynamic-programming algorithm that finds the edit distance from x[1..m] to y[1..n] and prints an optimal opeartion sequence. Analyze the running time and space requirements of your algorithm.


// FIRST THINGS FIRST. CONSIDER THAT L(S1,S2)===L(S2,S1)

//let's first review the levenshtein distance problem
// given 2 strings S1,S2 find the minimum edit distance to turn S2 to S1
// edits: 
//   INSERT a letter  in S1 or s2 ===(inserting S2[j] to S2[:j-1])
                // so that would make my problem S1[:i+1]=>S2[:j]
                //dp[i][j]=dp[i+1][j]+1 //NO BUENO
                // but i ve already said that L(S1,S2)===L(S2,S1)
//===========>   that would make my subproblem S1[:i]=>S2[:j-1]+S2[j]
                // you can view it as an insertion operation of S2[j] on S2[:j-1]

//   DELETE a letter of S1 so then dp[i][j] becomes dp[i-1][j]+1
            //because now I deleted S1[i] so i just have S1[:i-1] that has to be transformed to S2[:j] and +1 for the deletion operation
//   REPLACE/SUBSTITUTE a letter of S1 with any letter
            //in this case dp[i][j] depends whether S1[i]===S2[i],
            // if(yes)=>d[i][j]=dp[i-1][j-1] because there is no need for an operation so i just need to compare the previous S1[:i-1] S2[:j-1]
            // else => d[i][j]=dp[i-1][j-1]+1 cos i make the substitution

//dp[i][j]= Minimum edit distance to xform S1[:i]=>S2[:j]
let LevenshteinDistance=(S1,S2)=>{
    let n=S1.length,m=S2.length
    let dp=[...Array(n+1)].map(d=>[...Array(m+1)].map(d=>Infinity))

    //base cases
    for (let j = 0; j <=m; j++) 
        dp[0][j]=j // converting ''=> abdcd costs always s.length insertions
    for (let i = 0; i <=n; i++) 
        dp[i][0]=i // converting abdcd=>''costs always s.length deletions       
    
    for (let i = 1; i <=n; i++) 
        for (let j = 1; j <=m; j++) 
            // the minimum edit distance to xform S[:i]=>S[:j] is
            dp[i][j]=Math.min( 
                dp[i-1][j]+1,//deletion of S1[i-1]
                dp[i][j-1]+1,//Insertion of S2[j] to S2[:j-1]
                dp[i-1][j-1]+Number(S1[i-1]==S2[j-1]) // Substitution if necessary of S1[i-1] by S2[j-1]
            )            
                
    return dp[n][m]
}


//dp[i][j][k] minimum cost to transform x[0..i] to y[0...j] with the last operation being k (0<=k<=5)
let MinimumEditDistance=(x,y,costs)=>{
    
    let [COPY,REPLACE,DELETE,INSERT,TWIDDLE,KILL]=costs




}