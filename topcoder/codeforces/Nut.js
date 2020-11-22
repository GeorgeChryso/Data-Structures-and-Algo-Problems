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


    let y=([M,C],x)=> M*x+C //calculates y=Mx+C
    let Intersection=([m1,c1],[m2,c2])=>{return {'x':(c2-c1)/(m1-m2),'y': (m1*(c2-c1)/(m1-m2)+c1)}}

    let n=readline() //reads just the n for a simple test case
    let recs=[]
    for (let i = 0; i < n; i++) 
        recs.push(readline().split(' ').map(d=>Number(d)))
    recs.sort((a,b)=>a[0]-b[0]) 

   let Q=[[0,0]],result=0
   for (let i = 0; i < n; i++){
       let [Xi,Yi,Ai]=recs[i]
       while(Q.length>=2&& y(Q[0],Yi)<=y(Q[1],Yi))
           Q.shift()
       let f= y(Q[0],Yi) -Ai+ Xi*Yi
       result=Math.max(result,f)
       let nextLine=[-Xi,f]
       while(Q.length>=2 && Intersection(nextLine,Q[Q.length-2]).x <= Intersection(Q[Q.length-2],Q[Q.length-1]).x )
           Q.pop()
       Q.push(nextLine)
   }

    console.log(result.toString())
}