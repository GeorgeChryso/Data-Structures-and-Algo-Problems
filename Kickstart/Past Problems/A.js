
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
let currentline = 0;
function readline(){
    return input[currentline++];
}

//boilerplate ends here
// Test it with node ./name.js < input.txt

let n=Number(readline()) //1st line is usually the number of testcases


let solve=(N,A)=>{
    let result=0,numgames=0
    let dp=[...Array(N)].map(d=>[...Array(N)].map(d=>[...Array(N)].map(d=>[])))
    for (let i = 0; i <N; i++) {
        const element = array[i];
        
    }

    let recursion=(arr,score,step)=>{
        if(arr.length==1){
            result+=score
            numgames++
            return
        }

        for (let i = 0; i < arr.length-1; i++) {
            if(dp[step][i+1][N].length){

            }
            let newar=[]
            for (let j = 0; j < i; j++) 
                newar.push(arr[j])
            newar.push(arr[i]+arr[i+1])
            for (let j = i+2; j < arr.length; j++) 
                newar.push(arr[j])
            recursion(newar,score+arr[i]+arr[i+1],step-1)
        }

    }
    recursion(A,0,N-1)
    return result/numgames
}


for (let i = 0; i <n; i++) { //for each testcase
    // input  logic
    let N= Number(readline())
    let A=readline().split(' ').map(d=>Number(d))

    ////////////////////
    // solve
    let result=solve(N,A)
    //output logic
    console.log('Case #'+(i+1).toString()+': '+result.toString())
}

