const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
let currentline = 0;
function readline(){
    return input[currentline++];
}

//boilerplate ends here
// Test it with node ./name.js < input.txt
let solve=(N,K,S)=>{
        //N levels K current level S sword level
    return Math.min(K-1+N+1,K-1+K-S+N-S+1)
}
let n=Number(readline()) //1st line is usually the number of testcases

for (let i = 0; i <n; i++) { //for each testcase
    // input  logic
    let [N,K,S]=readline().split(' ').map(d=>Number(d))
    
    let result=solve(N,K,S)
    //output logic
    console.log('Case #'+(i+1).toString()+': '+result.toString())
}

