process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '',currentLine = 0,readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string =>string.trim());
    let t=Number(readline())
    for (let i = 0; i < t; i++) {
        let n=Number(readline())
        let A=readline().split(' ').map(d=>Number(d))
        
        solve(n,A)
    }    
  
});

let solve=(n,A)=>{
    let res=''
    old=A,neo=A,oo=false
    let memo=new Set(),flag=true
        for (let j = 0; j < neo.length; j++) {
            if(neo[j]>neo.length || neo[j]<=0 || memo.has(neo[j])){
                res=res+'0'   
                flag=false
                break         
            }
            memo.add(neo[j])
        }
    if(flag)
        res=res+'1'

    for (let i = 1; i < n; i++) {
        if(oo){
            res=res+'0'
            continue
        }
        let neo=[]
        for (let j = 0; j < old.length-1; j++) 
            neo.push(Math.min(old[j],old[j+1]))

        let memo=new Set(),flag=true,overallMin=Infinity
        for (let j = 0; j < neo.length; j++) {
            if(neo[j]>neo.length || neo[j]<=0 || memo.has(neo[j])){
                res=res+'0'   
                flag=false
                break         
            }
            overallMin=Math.min(overallMin,neo[j])
            memo.add(neo[j])
        }
        if(overallMin<=0||overallMin>=neo.length)
            oo=true
        old=neo
        if(flag)
            res=res+'1'
    }
    console.log(res)
}