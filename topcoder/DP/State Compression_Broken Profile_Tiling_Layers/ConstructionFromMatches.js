

/*
-   and only 2 layers to tile
-	cost will contain between 1 and 12 elements, inclusive. <= few costs to pick from
-	Each element of cost will be between 1 and 100000, inclusive.
-	Elements of cost will be in strictly ascending order.
-	top will contain between 1 and 50 elements, inclusive.
-	bottom will contain the same number of elements as top.
-	Each element of top and bottom will be between 4 and 48, inclusive.
*/

//dp on broken profile
// state : dp[i][k][l]= the minimum cost  to tile up to the i-th column, if the i-th column has 2 colums of width k and l 
let minimumCost=(cost,top,bottom)=>{

    let n=top.length,c=cost.length,result=Infinity,
        dp=[...Array(n+1)].map(d=>[...Array(c+1)].map(d=>[...Array(c+1)].map(d=>Infinity)))
    //basecases, first colunn
    for (let i = 0; i < c; i++)
        for (let j = 0; j < c; j++) 
            dp[0][i+1][j+1]=cost[i]+cost[j]
    /*       A
       rem1     topC
             B
       rem2     bottomC
             C
    */
    for (let i = 1; i <= n; i++) 
        for (let topC = 1; topC <= c; topC++)
            for (let bottomC =1; bottomC <=c; bottomC++) 
                for (let A = 1; A <=c; A++) 
                    for (let B = 1; B <= c; B++) 
                        for (let C = 1; C <= c; C++){
                            let targetTop=top[i-1],targetBot=bottom[i-1],
                                rem1=targetTop-topC-A-B,rem2=targetBot-bottomC-B-C,
                                totalCost=cost[topC-1]+cost[bottomC-1]+cost[A-1]+cost[B-1]+cost[C-1]
                            if(rem1>=1&&rem2>=1&&rem1<=c&&rem2<=c) // valid remainings 
                                dp[i][topC][bottomC]=Math.min(dp[i][topC][bottomC],dp[i-1][rem1][rem2]+totalCost),
                                result=i==n?Math.min(result, dp[i][topC][bottomC]):result
                        }
    if(result===Infinity)
        return -1
    return result
}


let tests=[
    [[1, 2],[7],[5]],
    [[1],[5],[5]],
    [[1, 5, 9],[7,10],[8,9]],
    [[1, 3, 4, 7, 9],[13, 14, 13, 11, 9, 7, 11, 8, 8, 10],[18, 14, 17, 10, 8, 4, 8, 13, 14, 13]]
]

console.log(tests.map( ([a,b,c])=>minimumCost(a,b,c) ))