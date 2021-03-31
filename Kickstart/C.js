
const { Console } = require('console');
const { FORMERR } = require('dns');
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
let currentline = 0;
function readline(){
    return input[currentline++];
}

//boilerplate ends here
// Test it with node ./name.js < input.txt

let T=Number(readline()) //1st line is usually the number of testcases
let tst=(n,A)=>{
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
let solve=(N,C)=>{
    let L=[],R=[],M=C

    if(C<N-1)
        return false
    C-=N-1
     let A=[...Array(N)].map((d,i)=>i+1)

    for(let i=0;i<N-1&&C>0;i++){
        if(A.length>=2&&C+1>=A.length){
            C++
            C-=A.length
            if(L.length>=R.length)
                R.unshift(A.shift())
            else
                L.push(A.pop())
            A=A.reverse()
        }
        else{
            L.push(A.shift())
        }
    }

    if(C!==0)
        return false
    let r=L.concat(A.concat(R))
    return r
}

for (let t = 0; t <T; t++) { //for each testcase
    // input  logic
     let [N,C]=readline().split(' ').map(d=>Number(d))
    ////////////////////
    // solve
    let result=solve(N,C)
    if(result===false){
        console.log('Case #'+(t+1).toString()+': '+'IMPOSSIBLE')
    }
    else
    //output logic
    console.log('Case #'+(t+1).toString()+': '+(result.join(' ').toString()))
    
}

