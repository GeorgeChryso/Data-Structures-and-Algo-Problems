process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '',currentLine = 0,readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string =>string.trim());
    let [a,b,c,d]=readline().split(' ').map(d=>Number(d))
    let r=solve(a,b,c,d)
    console.log(r+'')
});

//through expected value
let solvee=(a,b,c,d)=>{  
    return a/(b*(1-(1-a/b)*(1-c/d)))
}

// through geometric series
let solve =(a,b,c,d)=>{
    let x= (1-a/b)*(1-c/d)
    return a*(1/(1-x)) /b
}   