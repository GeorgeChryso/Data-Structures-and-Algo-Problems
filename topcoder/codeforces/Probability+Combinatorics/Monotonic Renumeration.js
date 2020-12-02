process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '',currentLine = 0,readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string =>string.trim());
    let n=Number(readline())
    let A=readline().split(' ').map(d=>Number(d))
    
    let r=solve(A,n)
    console.log(r+'')
});


let solve=(A,n)=>{
    let mod=998244353 

}