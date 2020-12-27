process.stdin.resume();process.stdin.setEncoding('utf-8');
let inp = '',cur = 0,readline=_=>inp[cur++]
process.stdin.on('data', inputStdin =>inp += inputStdin);
process.stdin.on('end', _ => {inp = inp.trim().split('\n').map(dqd =>dqd.trim());
    let [n,k]=readline().split(' ').map(d=>Number(d)),B=[]
    A=readline().split(' ').map(d=>Number(d))
    console.log(''+solve(n,k,A))
});
let Arr=(n,m,val=0)=>(n!=1)?[...Array(n)].map(d=>[...Array(m)].map(d=>val)): [...Array(m)].map(d=>val)

let solve=(n,k,A)=>{


    
}