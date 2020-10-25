'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
    });
    
    main();    
});

function readline() {
    return inputString[currentLine++];
}
// Note there's no need to do it for every test case like kickstart
// tests: $ cat input.txt | node "c:\....name.js"
function main() {

    let solve=(A)=>{
        let n=A.length,result=0
        for(let i=0;i<n;i++){
            let total=A[i].reduce((a,c)=>a+Number(c),0)
            if(total>=2){
                result++
            }
        }
        return result
    }

    let n=readline() //reads just the n for a simple test case
    let A=[]
    for (let i = 0; i < n; i++) {
        A.push([...readline().split(" ").map(d=>Number(d))])        
    }

    let result=solve(A) //solves a simple test case
    console.log(result.toString())
    
    
}