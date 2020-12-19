process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '',currentLine = 0,readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string =>string.trim());
  
        let [n,m]=readline().split(' ').map(d=>b=BigInt(d)),
            A=readline().split(' ').map(d=>BigInt(d)),
            B=readline().split(' ').map(d=>BigInt(d))
        //if(i===0)
         //r=solveNaive(n,m,k,POI),
        //r=solveDC(n,m,k,POI),
       //r=solveCHT(n,m,k,POI),
        solve(n,m,A,B)
       

});
let gcd=(a,b)=>{
    while(b){
        a=a%b
        let temp=a
        a=b
        b=temp
    }
    return a
}

let solve=(n,m,A,B)=>{
    // console.log(A,B)
    let res=[]
    for(let i=0;i<m;i++){
        let curr=B[i]+A[0]
        for (let j = 1; j < n; j++) {
            if(curr===1n)
                break
            curr=gcd(curr,B[i]+A[j])
        }
        res.push(curr)
    }

    console.log(res.join(' '))
}