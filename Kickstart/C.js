const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
let currentline = 0;
function readline(){
    return input[currentline++];
}

//boilerplate ends here
// Test it with node ./name.js < input.txt

let n=Number(readline()) //1st line is usually the number of testcases

let solve=players=>{
    let n=players.length
    if(n==1)
        return 0
    let miny=Infinity,maxy=-Infinity,result=0,freq={}
    players.sort((a,b)=>a[0]-b[0])
    for (const [x,y] of players){
        miny=Math.min(y,miny)
        maxy=Math.max(y,maxy)
        freq[y]=(freq[y]||0)+1
    }
    
    
    function median(values){
        if(values.length ===0) return 0;
        var half = Math.floor(values.length / 2);
        values.sort((a,b)=>a-b)
        if (values.length % 2)
          return values[half];
        return (values[half - 1] + values[half]) / 2.0;
      }

    if(miny!==maxy){
        let ys=players.map(([x,y])=>y)
        ys.sort((a,b)=>a-b)
        let n=ys.length
        let y
        if(n%2)
            y=ys[(n/2)>>0]
        else
            y=(ys[(n / 2)>>0] + ys[((n - 2) / 2)>>0]) / 2
        
        let s=0
        for(let i = 0; i < n; i++) 
            s += Math.abs(ys[i] - y); 
        result+=s
    }

    players=players.map(([x,y])=>x)
    let diffs=players.map((d,i)=>d-(i+players[0]))
    let mediandiff=median(diffs)
    return result+diffs.reduce((a,c)=>a+Math.abs(c-mediandiff),0)
}

for (let i = 0; i <n; i++) { //for each testcase
    // input  logic
    let P=Number(readline())
    let players=[]
    for (let p = 0; p < P; p++) {
        players.push(readline().split(' ').map(d=>Number(d)))        
    }

    let result=solve(players)
    //output logic
    console.log('Case #'+(i+1).toString()+': '+result.toString())
}

