process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '',currentLine = 0,readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string =>string.trim());
    
    let n=Number(readline())
    solve(n)


});


let solve=(n)=>{
    if(n==1||n==2){
        console.log('4')
        return
    }
    let globalseen=new Set()
    let seen=new Set()
    let start=[ [0,1,2],[1,0,3],[0,-1,4],[-1,0,1]],steps=1
    while(steps<n){
        seen=new Set()
        start.forEach(([a,b,c])=>{
            globalseen.add([a,b,c].toString())
            if(c==1)
                seen.add([a,b+1,2].toString()),
                seen.add([a,b+1,4].toString())
            if(c==2)
                seen.add([a+1,b,1].toString()),
                seen.add([a+1,b,3].toString())
            if(c==3)
                seen.add([a,b-1,2].toString()),
                seen.add([a,b-1,4].toString())
           else
                seen.add([a-1,b,3].toString()),
                seen.add([a-1,b,1].toString())
        })
        start=[]
        seen.forEach(st=>{
            if(!globalseen.has(st))
                start.push([...st.split(',').map(d=>Number(d))])
        })
        steps++
        if(steps===n-1)
            console.log(start.length)
    }

}