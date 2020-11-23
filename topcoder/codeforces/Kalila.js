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
    main();    
});


var solve=(A,B)=>{
    let y=([M,C],x)=> BigInt(BigInt(M)*BigInt(x)+BigInt(C))
    let Intersection=(l1,l2)=>{
        let [m1,c1]=l1,[m2,c2]=l2
        m1=BigInt(m1)
        c1=BigInt(c1)
        m2=BigInt(m2)
        c2=BigInt(c2)
        return {'x':(c2-c1)/(m1-m2),'y': (m1*(c2-c1)/(m1-m2)+c1)}
    }
    let n=A.length //cost 0 

    //dp[i] Minimum cost to cut the i-th tree completely
    /* 
        dp[i]=  Max( B[j]*A[i] + dp[j]) 
        y             M    x       C
        slope descending, 
        Queries Ascending= > classic CHT
    */
    let Q=[],curr=0n
    for (let i = 0; i <n; i++){
        while(Q.length>=2&& y(Q[0],A[i])>=y(Q[1],A[i]))
            Q.shift()
        if(Q.length)
            curr= y(Q[0],A[i])
        let nextLine=[B[i],curr]
        while(Q.length>=2 && Intersection(nextLine,Q[Q.length-2]).x <= Intersection(Q[Q.length-2],Q[Q.length-1]).x )
            Q.pop()
        Q.push(nextLine)
    }
    return curr
}
function main() {

    
    let n=Number(readline())
    let A=readline().split(" ").map(d=>Number(d))
    let B=readline().split(" ").map(d=>Number(d))
    let result=solve(A,B) //solves a simple test case
    console.log(result.toString())
}



