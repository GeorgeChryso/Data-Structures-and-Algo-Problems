let inputString = '',currentLine = 0,readline=_=>inputString[currentLine++];
process.stdin.resume();process.stdin.setEncoding('utf-8');process.stdin.on('data', inputStdin =>inputString += inputStdin);process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string =>string.trim());
    //INPUT
    let t=Number(readline())
    for (let i = 0; i <t; i++) {
        let n=Number(readline()),C=[]
        for(let j=0;j<n;j++)
         C.push(readline().split(' ').map(d=>Number(d)))
        solve(n,C)
    }
});

let solve=(n,C)=>{
    

    let currcom=0,result=0,currtime=0
    while(true){
        [time,place]=C.shift()
        result++
        while(place!==curplace){
            if(place>curplace)
            curplace++
            else
            curplace--
            if(lastP===place)
                result++,
                currcom++
            curtime++
        }

    }

    
}