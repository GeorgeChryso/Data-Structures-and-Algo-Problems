let inputString = '',currentLine = 0,readline=_=>inputString[currentLine++];
process.stdin.resume();process.stdin.setEncoding('utf-8');process.stdin.on('data', inputStdin =>inputString += inputStdin);process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string =>string.trim());
    //INPUT
    let t=Number(readline())
    for (let i = 0; i <t; i++) {
        let n=Number(readline())
        let A=readline().split(' ').map(d=>Number(d))
        solve(n,A)
    }
});

let solve=(n,A)=>{
    console.log(A)
    console.log((A.map(d=>d&&d%2?d-1:d)).join(' ')) 
}