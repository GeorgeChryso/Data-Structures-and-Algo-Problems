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
        let n=Number(readline()),requests=[]
        for (let i = 0; i < n; i++){
            let [c,p]=readline().split(' ').map(d=>Number(d))
            requests.push([c,p,i+1])
        }
        let k=Number(readline())
        let seats=readline().split(' ').map(d=>Number(d))
        solve(n,requests,k,seats)
    }
    main();    
});

//greedy, place the richest people to the first available seat
let solve=(n,R,K,Seats)=>{
    R.sort((a,b)=>b[1]==a[1]?a[0]-b[0]:b[1]-a[1])
    Seats=Seats.map((a,i)=>[a,i+1])
    Seats.sort((a,b)=>a[0]-b[0])
    let taken=[...Array(K)].map(d=>0),result=0,res=[]
    for( let [ppl,money,idx] of R)
        for(let i=0;i<K;i++){
            let [r,idx2]=Seats[i]
            if(taken[i])
                continue
            if(ppl<=r){
                taken[i]=1
                result+=money
                res.push([idx,idx2])
                break
            }
        }
    console.log(res.length+' '+result)
    for(let [idx1,idx2] of res)
        console.log(idx1+' '+idx2)
}


//can also be solved through dp, as there is no crossing between the selection... meh, after that it needs reconstruction similar to edit distance