// Berland shop sells n kinds of juices. Each juice has its price ci. Each juice includes some set of vitamins in it. There are three types of vitamins: vitamin "A", vitamin "B" and vitamin "C". Each juice can contain one, two or all three types of vitamins in it.

// Petya knows that he needs all three types of vitamins to stay healthy. What is the minimum total price of juices that Petya has to buy to obtain all three vitamins? Petya obtains some vitamin if he buys at least one juice containing it and drinks it.

// Input
// The first line contains a single integer n (1≤n≤1000) — the number of juices.

// Each of the next n lines contains an integer ci (1≤ci≤100000) and a string si — the price of the i-th juice and the vitamins it contains. String si contains from 1 to 3 characters, and the only possible characters are "A", "B" and "C". It is guaranteed that each letter appears no more than once in each string si. The order of letters in strings si is arbitrary.

// Output
// Print -1 if there is no way to obtain all three vitamins. Otherwise print the minimum total price of juices that Petya has to buy to obtain all three vitamins.
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
        let n=Number(readline()),A=[]
        for (let i = 0; i < n; i++) 
            A.push(readline().split(' '))
        let result=solve(A) //solves a simple test case
        console.log(result.toString())
    }
    main();    
});


let solve=(A)=>{
    let costs=[...Array(1<<3)].map(d=>Infinity)
    costs[0]=0
    for (const [cost,string] of A) {
        let mask=0
        for(let i=0;i<string.length;i++)
            mask|=(1<< (string[i].charCodeAt(0)-65))
        costs[mask]=Math.min(costs[mask],Number(cost))
    }

    let dp=[...Array((1<<3)+1)].map(d=>[...Array(1<<3)].map(d=>Infinity))
    dp[0][0]=0
    for (let i = 1; i <= (1<<3); i++) {
        let m1=i-1      
        for (let j = 0; j < (1<<3); j++) {
            dp[i][j|m1]=Math.min(
                            dp[i][j|m1],
                            dp[i-1][j]+costs[m1]
            )
            dp[i][j]=Math.min(dp[i][j],dp[i-1][j])
        }
    }
    return dp[(1<<3)][7]==Infinity?-1:dp[(1<<3)][7]
}

