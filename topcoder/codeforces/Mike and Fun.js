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
        let [n,m,q]=readline().split(' ').map(d=>Number(d))
        let A=[],queries=[]
        for (let i = 0; i < n; i++) 
            A.push(readline().split(' ').map(d=>Number(d)))            
        for (let i = 0; i < q; i++) 
            queries.push(readline().split(' ').map(d=>Number(d)-1))
        solve(n,m,q,A,queries)
        //console.log(result.toString())
    }
    main();    
});

let solve=(n,m,q,A,queries)=>{

    let freq=[...Array(m+1)].map(d=>0)
    for (let i = 0; i < n; i++) {
        let sofar=0
        for (let j = 0; j < m; j++) {
            sofar+=A[i][j]
            if(A[i][j]==0)
                freq[sofar]++,
                sofar=0
        }        
        freq[sofar]++
    }
    let findMax=_=>{
        for (let i = m; i >0; i--)
            if(freq[i]>0)
                return i
        return 0
    }
    //A.forEach(d=>console.log(d+''))
    for(let [k,l] of queries){
        let rightones=0,leftones=0
        let idx=l+1
        while(idx<m&&A[k][idx])
            rightones++,
            idx++
        idx=l-1
        while(idx>=0&&A[k][idx])
            leftones++,
            idx--
        
        if(A[k][l]==0)
            freq[leftones]--,
            freq[rightones]--,
            freq[leftones+rightones+1]++
        else 
            freq[leftones+rightones+1]--,
            freq[leftones]++,
            freq[rightones]++
        console.log(String(findMax()))
        A[k][l]^=1
        // console.log([k,l])
        // A.forEach(d=>console.log(d+''))

    }
}