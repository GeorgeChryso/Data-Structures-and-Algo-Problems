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

let solve=(n,A)=>{
    let freq={},seen=new Set()
    A.sort((a,b)=>a-b)
    for(let i=0;i<n;i++)
        freq[A[i]]=(freq[A[i]]||0) +1
    for (let i = 0; i < n; i++) {
        if(seen.has(A[i]))
            seen.add(A[i]+1)
        seen.add(A[i])        
    }
    console.log(seen.size) 
}