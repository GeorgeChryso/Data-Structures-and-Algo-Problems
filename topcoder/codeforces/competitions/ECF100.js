let inputString = '',currentLine = 0,readline=_=>inputString[currentLine++];
process.stdin.resume();process.stdin.setEncoding('utf-8');process.stdin.on('data', inputStdin =>inputString += inputStdin);process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string =>string.trim());
    //INPUT
    let t=Number(readline())
    for (let i = 0; i <t; i++) {
        let [a,b,c]=readline().split(' ').map(d=>Number(d))
        let res=solve(a,b,c)
        console.log(res?'YES':'NO')
    }
});

let solve=(aa,bb,cc)=>{
    let A=[aa,bb,cc]
    A.sort((a,b)=>a-b)
    let [a,b,c]=A
    let counter=1
    while(a!==0&&b!==0&&c!==0){
        //console.log(a,b,c,counter)
        if(counter==7){
            a--
            b--
            c--
            counter=1
        }
        else{
            if(c>=a&&c>=b)
                c--,
                counter++
            else if( a>=c&&a>=b)
                a--,
                counter++
            else 
                b--,
                counter++
        }
        if(a==0&&b==0&&c==0)
            return true
    }

    return false
}