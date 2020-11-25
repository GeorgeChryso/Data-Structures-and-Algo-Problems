// Your friend Mishka and you attend a calculus lecture. Lecture lasts n minutes. Lecturer tells ai theorems during the i-th minute.

// Mishka is really interested in calculus, though it is so hard to stay awake for all the time of lecture. You are given an array t of Mishka's behavior. If Mishka is asleep during the i-th minute of the lecture then ti will be equal to 0, otherwise it will be equal to 1. When Mishka is awake he writes down all the theorems he is being told — ai during the i-th minute. Otherwise he writes nothing.

// You know some secret technique to keep Mishka awake for k minutes straight. However you can use it only once. You can start using it at the beginning of any minute between 1 and n - k + 1. If you use it on some minute i then Mishka will be awake during minutes j such that  and will write down all the theorems lecturer tells.

// You task is to calculate the maximum number of theorems Mishka will be able to write down if you use your technique only once to wake him up.

// Input
// The first line of the input contains two integer numbers n and k (1 ≤ k ≤ n ≤ 105) — the duration of the lecture in minutes and the number of minutes you can keep Mishka awake.

// The second line of the input contains n integer numbers a1, a2, ... an (1 ≤ ai ≤ 104) — the number of theorems lecturer tells during the i-th minute.

// The third line of the input contains n integer numbers t1, t2, ... tn (0 ≤ ti ≤ 1) — type of Mishka's behavior at the i-th minute of the lecture.

// Output
// Print only one integer — the maximum number of theorems Mishka will be able to write down if you use your technique only once to wake him up.

// Example
// inputCopy
// 6 3
// 1 3 5 2 5 4
// 1 1 0 1 0 0
// outputCopy
// 16
// Note
// In the sample case the better way is to use the secret technique at the beginning of the third minute. Then the number of theorems Mishka will be able to write down will be equal to 16.

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
        let [n,k]=readline().split(' ').map(d=>Number(d))
        let A=readline().split(' ').map(d=>Number(d)),B=readline().split(' ').map(d=>Number(d))
        let result=solve(A,B,k) //solves a simple test case
        console.log(result.toString())
    }
    main();    
});

let solve=(A,B,k)=>{
    let prefixNormal=[0],prefixMax=[0],n=A.length
    for(let i=0;i<n;i++)
        prefixNormal.push(prefixNormal[prefixNormal.length-1]+B[i]*A[i]),
        prefixMax.push(prefixMax[prefixMax.length-1]+A[i])
    let result=0
    
    for (let i = k; i <= n; i++) 
        result=Math.max(
                result,
                prefixMax[i]-prefixMax[i-k]+
                prefixNormal[i-k]+
                prefixNormal[n]-prefixNormal[i]
            )        
    return result
}