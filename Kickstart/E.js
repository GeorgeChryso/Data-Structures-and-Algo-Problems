
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
let P=Number(readline())

let solve=(A)=>{

    let S=[...Array(100)]
    let Q=[...Array(10001)]

    for(let i=0;i<100;i++)
        S[i]=Math.random()*6 -3 
    for(let i=0;i<10001;i++)
        Q[i]=Math.random()*6 -3 

    let sigm=(x)=>{
        return 1/(1+Math.exp(-x))
    }
    let Esig=(x,b)=>{
        return (x-b)*(2*Math.log(Math.abs(x-b)+1)-2*Math.abs(x-b)+(x-b)*(x-b)-3)/(2*Math.abs(x-b))
    }
    let Esig2=(x,b)=>{
        return Math.abs(x-b)-Math.log(Math.abs(x-b)+1)
    }

    let P=[...Array(100)].map(d=>0)
    let min=Infinity,res=0
    let PP=[...Array(100)].map(d=>0)
    for(let i=0;i<A.length;i++){
        for(let j=0;j<A[0].length;j++){
            if( Math.abs( Math.random()*11>5))
                P[i]+=sigm(S[i]-Q[j])
            else
                P[i]++
            if(A[i][j]==='1')
                PP[i]++
        }
        if(PP[i]-P[i]<min)
            min=PP[i]-P[i], res=i
    }
    return res+1
}



for (let t = 0; t <T; t++) { //for each testcase
    // input  logic
    let A=[]

    for(let i=0;i<100;i++)
     A.push(readline())
     let r=[...Array(100)].map(d=>0)
    for(let k=0;k<25;k++)
        r[solve(A)-1]++
    let mx=Math.max(...r),
        result=r.indexOf(mx)+1

    //result=solve(A)
    //output logic
    console.log('Case #'+(t+1).toString()+': '+result.toString())
}

