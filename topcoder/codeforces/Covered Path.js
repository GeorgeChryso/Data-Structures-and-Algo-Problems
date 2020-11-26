process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '',currentLine = 0,
    readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
    });
    function main() {
        let [v1,v2]=readline().split(' ').map(d=>Number(d))
        let [t,d]=readline().split(' ').map(d=>Number(d))
        let result=solve(v1,v2,t,d) //solves a simple test case
        console.log(result.toString())
    }
    main();    
});

// Greedy (possibly wrong)
// be optimistic about the value regarding each of the ends,
// store in op1, op2 the maximum value it can get 
let solvee=(v1,v2,n,d)=>{
    let op1=[v1],op2=[v2],result=0
    for(let i=0;i<n-2;i++)
        op1.push(op1[op1.length-1]+d),
        op2.unshift(op2[0]+d)
    op1.push(Infinity)
    op2.unshift(Infinity)
    for (let i = 0; i <n; i++) 
        result+=Math.min(op1[i],op2[i])
    return result   
}

//shorter, less space
let solve=(v1,v2,n,d)=>{
    let result=v1+v2
    for (let i = 1; i <=n-2; i++) 
        result+=Math.min(v1+d*(i),v2+ d*(n-1-i))
    return result   
}