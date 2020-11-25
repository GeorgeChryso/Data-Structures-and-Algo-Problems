// You have a given integer n. Find the number of ways to fill all 3×n tiles with L shaped Dominoes Upon filling, no empty spaces are allowed. Shapes cannot overlap.
/*
    TLDR count the ways to fill a 3xN board with these types of dominoes
        * *      
        *
*/





// Ad hoc for m=3
// because there are 2 ways to fill the first 2 columns
/*
        KK     KK
        KP     PK
        PP     PP

    so for 3 rows is 0, and for 4 is 4 ..etc
*/
let domiNOES=n=>n%2?0:2**(n/2)


// let's do it forward,
// Normal, for mxn
let domiNOES=n=>{
    let m=3,dp=[...Array(n+1)].map(d=>[...Array(1<<m)].map(d=>0))
    dp[0][0]=1

    let isOccupied=(mask,i)=>mask&(1<<i)
    let rec=(i,cur,next,j)=>{
        if(i==m){
            dp[j+1][next]+=dp[j][cur]
            return
        }
        if(isOccupied(cur,i))
            return rec(i+1,cur,next,j)
        /*try assigning a 
                  *
                * *
        */
        if(i>0&& !isOccupied(next,i-1) && !isOccupied(next,i) )
            rec(i+1,cur,next|(1<<i)|(1<<(i-1)),j)

        if(i>=m-1 )
            return
        /*
            * *
            *
        */
        if(!isOccupied(cur,i+1)&&!isOccupied(next,i))
            rec(i+2,cur,next|(1<<i),j)
        /*
                * *
                  *
        */
        if(!isOccupied(next,i+1)&&!isOccupied(next,i))
            rec(i+1,cur,next|(1<<i)|(1<<(i+1)),j)
        /*
                *
                * *
        */
        if(!isOccupied(cur,i+1)&&!isOccupied(next,i+1))
            rec(i+2,cur,next|(1<<(i+1)),j)
    }
    for (let j = 0; j<n; j++) 
        for (let mask = 0; mask < (1<<m); mask++) 
            //curr i to change, curr mask, next mask , j=column
            rec(0,mask,0,j)
    return dp[n][0]
}

console.log(domiNOES(
    5
))