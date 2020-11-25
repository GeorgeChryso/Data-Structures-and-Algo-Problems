'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '',currentLine = 0,
    readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
    });
    function main() {
        let n=Number(readline())
        let result=domiNOES(n) //solves a simple test case
        console.log(result.toString())
    }
    main();    
});


// normal Broken Profile for mxn 
let domiNOESS=n=>{
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



// Ad hoc for m=3
let domiNOES=n=>{
    return n%2?0:2**(n/2)
}