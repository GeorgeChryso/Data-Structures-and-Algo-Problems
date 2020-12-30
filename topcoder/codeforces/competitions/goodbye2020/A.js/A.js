process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '',currentLine = 0,readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string =>string.trim());
    let t=Number(readline())
    for (let tt = 0; tt <t; tt++) {
        let n=Number(readline())
        let X=readline().split(' ').map(d=>Number(d))
        solve(n,X)
    }
    
});


let solve=(n,X)=>{
    let seen=new Set()
    for(let i=0;i<n;i++)
        for (let j = i+1; j < n; j++) {
            seen.add(X[j]-X[i])          
        }
    console.log(seen.size+'') 
}