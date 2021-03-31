
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
let currentline = 0;
function readline(){
    return input[currentline++];
}

//boilerplate ends here
// Test it with node ./name.js < input.txt

let T=Number(readline()) //1st line is usually the number of testcases
let solve=(n,A)=>{


    let  result=0

    for (let i = 1; i <=n; i++) {
        //the element n should go to index n-1
        let idx = A.indexOf(i);
        if(i===n)
            break
        result+=(idx-i+1+1)
        for(let j=i-1;j<((i+idx)>>1);j++)
            [A[j],A[idx-j+i-1]]=[A[idx-j+i-1],A[j]]
    }
    return result;
}
for (let t = 0; t <T; t++) { //for each testcase
    // input  logic
    let n=Number(readline())
    let A=readline().split(' ').map(d=>Number(d))
    ////////////////////
    // solve
    
    let result=solve(n,A)
    //output logic
    console.log('Case #'+(t+1).toString()+': '+result.toString())
}

