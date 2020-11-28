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
        let [n,k]=readline().split(' ').map(d=>Number(d))
        let A=readline().split(' ').map(d=>Number(d))

        solve(A,n,k)
    }
    main();    
});


// naive O(n^2)
let solvee=(A,n,k)=>{
    let result=k,lastindex=k-1
    for (let i = k; i <n;i++ ) {
        let charges=k,idx=i,max=0
        while(idx>=0&&(charges>0||A[idx])){
            if(A[idx]==0)
                charges--
            max++
            idx--
        }        
        if(max>result)
            result=max,
            lastindex=i
    }
    for(let i=lastindex;i>lastindex-result&&i>=0;i--)
        A[i]=1
    console.log(result+'')
    console.log(A.join(' '))
}

//O(n) with O(n) extra space
let solve=(A,n,k)=>{
    let result=0,lastindex=0
    let consOnes=[...Array(n)].map(d=>0) //consecutive ones leading up to and including i 
    let cons=0,stackZ=[]
    //console.log(n,k)
    for (let i = 0; i <n;i++ ) {
        if(A[i]==0){
            cons=0
            stackZ.push(i)
            if(stackZ.length>k)
                stackZ.shift()
        }
        else
            cons++,
            consOnes[i]=cons

        //consider starting from this fella
        let gain=0
        if(stackZ.length)
            gain+=(i-stackZ[0]+1),
            gain+=(stackZ[0]>0?consOnes[stackZ[0]-1]:0)
        else 
            gain+=consOnes[i]

        //console.log(gain)
        if(result<=gain)
            result=gain,
            lastindex=i
        
    }
   // console.log(result)
    for(let i=lastindex;i>=Math.max(lastindex-result+1,0);i--)
        A[i]=1
    console.log(result+'')
    console.log(A.join(' '))
}

