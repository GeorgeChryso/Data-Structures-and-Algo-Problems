
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
let currentline = 0;
function readline(){
    return input[currentline++];
}

//boilerplate ends here
// Test it with node ./name.js < input.txt

let T=Number(readline()) //1st line is usually the number of testcases

for (let t = 0; t <T; t++) { //for each testcase
    // input  logic
    let N=Number(readline()),A=[],B=[]
    let A=readline().split(' ').map(d=>Number(d))
    ////////////////////
    // solve
    
    let result=[A,N,K]
    //output logic
    console.log('Case #'+(t+1).toString()+': '+result.toString())
}

