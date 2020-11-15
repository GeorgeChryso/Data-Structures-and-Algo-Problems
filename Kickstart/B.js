const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
let currentline = 0;
function readline(){
    return input[currentline++];
}

//boilerplate ends here
// Test it with node ./name.js < input.txt

let n=Number(readline()) //1st line is usually the number of testcases
let isBoring=x=>{
    x=x.toString()
    for (let i = 0; i < x.length; i++) {
        let c=i+1
        if(c%2&&(Number(x[i])%2==0))
            return 0
        if(c%2==0&&Number(x[i])%2)
            return 0
    }
    return 1
}
let solve=(L,R)=>{
    let res=0

    let tilprimal=0
    let curr=L
    while(1){
        let isb=isBoring(curr)
        curr=curr+''
        
        if(isb&&(curr[curr.length-1]==0||curr[curr.length-1]==1))
            break
        if(isb)
            tilprimal++   
        curr--
    }

    let c=curr,totalbors=0
    while(c<=R){
        if(c+10<R)
        if(c+100<)
    }

    return res

}
for (let i = 0; i <n; i++) { //for each testcase
    // input  logic
    let [L,R]=readline().split(' ').map(d=>Number(d))
    ////////////////////
    // solve
    
    let result=solve(L,R)
    //output logic
    console.log('Case #'+(i+1).toString()+': '+result.toString())
}

