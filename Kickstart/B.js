
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
let currentline = 0;
function readline(){
    return input[currentline++];
}

//boilerplate ends here
// Test it with node ./name.js < input.txt

let T=Number(readline()) //1st line is usually the number of testcases
let solve=(x,y,S)=>{
    [x,y]=[Number(x),Number(y)]
    let n=S.length,
        dp=[...Array(n)].map(d=>[Infinity,Infinity])
    let char=S[0]
    if(char==='C')
        dp[0]=[0,Infinity]
    else if(char==='J')
        dp[0]=[Infinity,0]
    else 
        dp[0]=[0,0]
        
    for(let i=1;i<n;i++){
        let char=S[i]
        if(char==='C')
            dp[i][0]=Math.min(dp[i-1][0],dp[i-1][1]+y)
        else if(char==='J')
            dp[i][1]=Math.min(dp[i-1][0]+x,dp[i-1][1])
        else{
            dp[i][0]=Math.min(dp[i-1][0],dp[i-1][1]+y)//AN EINAI C
            dp[i][1]=Math.min(dp[i-1][0]+x,dp[i-1][1])
        }
    }
    return Math.min(dp[n-1][0],dp[n-1][1])
}
for (let t = 0; t <T; t++) { //for each testcase
    // input  logic
    let [c,j,S]= readline().split(' ')

    ////////////////////
    // solve
    
    let result=solve(c,j,S)

    
    //output logic
    console.log('Case #'+(t+1).toString()+': '+result.toString())
}

