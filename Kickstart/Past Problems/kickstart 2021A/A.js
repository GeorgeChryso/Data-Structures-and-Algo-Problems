
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
let currentline = 0;
function readline(){
    return input[currentline++];
}

//boilerplate ends here
// Test it with node ./name.js < input.txt

let n=Number(readline()) //1st line is usually the number of testcases

let solve=(n,K,A)=>{
    let curr=0

    for(let i=0;i<n/2;i++)
        if(A[i]!==A[n-1-i])
            curr++

    if(n%2)
        n--,
        curr--,
        K--
    return Math.abs(K-curr)
    
}
for (let i = 0; i <n; i++) { //for each testcase
    // input  logic
    let [N,K]=readline().split(' ').map(d=>Number(d))
    let A=readline()
    ////////////////////
    // solve
    
    let result=solve(N,K,A)
    //output logic
    console.log('Case #'+(i+1).toString()+': '+result.toString())
}
