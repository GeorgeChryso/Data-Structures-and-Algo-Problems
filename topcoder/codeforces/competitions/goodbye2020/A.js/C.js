process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '',currentLine = 0,readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string =>string.trim());
    let t=Number(readline())
    for (let tt = 0; tt <t; tt++) {
        let X=readline().split(' ').map(d=>Number(d))
        solve(X)
    }
    
});

let solve=X=>{
    let n=X.length
    
}