process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '',currentLine = 0,readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string =>string.trim());
    let t=Number(readline())
    for (let i = 0; i < t; i++) {
        let [n,q]=readline().split(' ').map(d=>Number(d))
        let A=readline().split(' ').map(d=>Number(d))
        let Q=[]
        for (let j = 0; j <q; j++) 
            Q.push(Number(readline()))
        let r=solve(n,q,A,Q)
    }
});


let solve=(n,q,A,Q)=>{
    let result=0,isOk=[...Array(n)].map(d=>false)
    if(s[n-1]==n){
        isOk[n-1]=true
        if(n>1)
            for (let i = n-2; i >=0; i--)
                isOk[i]=isOk[i+1]&&(s[i]==i+1)
        if(isOk[0])
            return 1
        isOk.unshift(false)
    }
    let qq={}
    qq[0]=1
    for (const [r,p] of Q) {
        let tt={}
        Object.keys(qq).forEach(i=>{
            let prob=qq[i]
            if(qq[i]>0)
                tt[i]= (tt[i]||0)+prob*(1-p)
            let idd=Math.max(r,i)
            if(isOk[idd+1]||idd==n)
                result+=prob*p
            else
                tt[idd]=(tt[idd]||0)+prob*p
        })
        qq=tt
    }
    return result
}

