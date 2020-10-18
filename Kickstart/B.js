
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
let currentline = 0;
function readline(){
    return input[currentline++];
}

//boilerplate ends here
// Test it with node ./name.js < input.txt

let n=Number(readline()) //1st line is usually the number of testcases


let solve=(W,N,A)=>{
    let result=Infinity,freq={}
    if(N==1)
        return 0
    
    for(let i=0;i<A.length;i++)
        freq[A[i]]=(freq[A[i]]||0)+1
    let keys=Object.keys(freq)
    keys.sort((a,b)=>a-b)
    let zz=[]
    for (let i = 0; i <keys.length; i++) {
        let tar=Number(keys[i])
        let cost=0

        for (const key of keys) {
            let curr=Number(key)
            let times=Number(freq[curr])
            cost+=(Math.min( 
                Math.abs(curr-tar),//Directly
                  N-curr+tar               ,//go to the end first
                  N-tar+curr                //go to the beginning first
                )*times)  
        }
        zz.push(cost)
        if(cost<result){
            result=cost
        }
    }
    console.log(keys)
    console.log(zz)
    return result
}

for (let i = 0; i <n; i++) { //for each testcase
    // input  logic
    let [W,N]=readline().split(' ').map(d=>Number(d))
    let A=readline().split(' ').map(d=>Number(d))

    ////////////////////
    // solve
    let result=solve(W,N,A)
    //output logic
    console.log('Case #'+(i+1).toString()+': '+result.toString())
}

