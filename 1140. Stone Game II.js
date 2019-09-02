var stoneGameII = function(piles) {


    var n =piles.length
    var hash=new Array(n).fill(new Array(n).fill(null))
    if( piles==null || piles.length==0){return 0}
    var sums = new Array(n)
    sums[n-1]=piles[n-1]
    
    function helperu(P,  i,M){
        if ( i==P.length){return 0}
        if( 2*M >=( P.length-i))return sums[i]
        if ( hash[i][M]!=null &&hash[i][M]!=0)return hash[i][M]
        
        var min=Number.MAX_VALUE
        
        for(var x=1;x<=2*M;x++){
            min=Math.min(min,helperu(P,i+x,Math.max(M,x)))
        }
        hash[i][M]=sums[i]-min
        
        return hash[i][M]
        }
    


for (let i = n-2; i>=0; i--) {
    sums[i]=sums[i+1]+piles[i]
    
}

return helperu(piles,0,1)

};


// var stoneGameII=(P)=>{
//     var n =P.length
//     if(n==0)return 0
//     var sum =Array(n).fill(0)
//     sum[n-1]=P[n-1]
//     for (let i = n-2; i >=0 ; i--) {
//         sum[i]=P[i]+sum[i+1]    
//     }
    
//     var dp=Array(n).fill(Array(n).fill(0))
    
//     for (let i = 0; i < n; i++) {
//     dp[i][n]=sum[i]    
//     }
//     console.log(sum,'\n',dp)
//     for (let i = n-1; i >=0 ; i--) {
//         for (let j = n-1; j >=0 ; j--) {
//             for (let x = 0; (x<=2*j) &&( (i+x)<=n) ; x--) {
//                 console.log( i,x,j)
//                 console.log(dp[4][4],sum[4],dp[5])
//                 dp[i][j]=Math.max(dp[i][j] ,sum[i]- dp[i+x][Math.max(j,x)] )
//             }
//         }
//     }
    
    
//     return dp[0][1]
    
//     }


var stoneGameII=(P)=>{
 var memo=Array(P.length).fill(Array(P.length).fill(null))

 function helper(a,m){
    if( a.length==0)return 0
    if( memo[a.length][m])return memo[a.length][m]
    var res=0
    var sum=a.reduce((a,b)=>a+b)

    for (let i = 1; i < (Math.min( 2*m,a.length)+1); i++) {
        var temp=sum-helper(a[i],Math.max(m,i))       
        var res=Math.max(res,temp)

    }
    memo[a.length][m]=res
    return res
 }
return helper( P,1)
}

    console.log(stoneGameII(
        [2,7,9,4,4]
        )
    )