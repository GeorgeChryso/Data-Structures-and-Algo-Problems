
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
let currentline = 0;
function readline(){
    return input[currentline++];
}

//boilerplate ends here
// Test it with node ./name.js < input.txt

let bSearch=(x,y)=>{
    if(y<4||x<2)
        return 0
    if(x>=y)
        return ((y)>>1) -1
    let lo=2,hi=x,res=lo
    while(lo<=hi){
        let mid=lo+hi>>1
        if( 2*mid<=y)
            res=Math.max(mid,res),
            lo=mid+1
        else
            hi=mid-1
    }
    // console.log(x,y,res-1)
    return res-1
}

let n=Number(readline()) //1st line is usually the number of testcases
let solve=(n,m,A)=>{
    let result=0
    let L=[...Array(n)].map(d=>[...Array(m)].map(d=>0))
    let R=[...Array(n)].map(d=>[...Array(m)].map(d=>0))
    let U=[...Array(n)].map(d=>[...Array(m)].map(d=>0))
    let D=[...Array(n)].map(d=>[...Array(m)].map(d=>0))

    for(let i=0;i<n;i++){
        let curr=0
        for(let j=0;j<m;j++)
            if(A[i][j]===0)
                curr=0
            else
                curr++,
                L[i][j]=curr
    }
    for(let i=0;i<n;i++){
        let curr=0
        for(let j=m-1;j>=0;j--)
            if(A[i][j]===0)
                curr=0
            else
                curr++,
                R[i][j]=curr
    }
    for(let j=0;j<m;j++){
        let curr=0
        for(let i=n-1;i>=0;i--)
            if(A[i][j]===0)
                curr=0
            else
                curr++,
                D[i][j]=curr
    }
    for(let j=0;j<m;j++){
        let curr=0
        for(let i=0;i<n;i++)
            if(A[i][j]===0)
                curr=0
            else
                curr++,
                U[i][j]=curr
    }
    for(let i=0;i<n;i++)
        for(let j=0;j<m;j++){
            let [l,r,u,d]=[L[i][j],R[i][j],U[i][j],D[i][j]]
            result+=bSearch(l,u)
            result+=bSearch(r,u)
            result+=bSearch(l,d)
            result+=bSearch(r,d)
            result+=bSearch(u,l)
            result+=bSearch(d,l)
            result+=bSearch(u,r)
            result+=bSearch(d,r)
        }
    return result
}

for (let i = 0; i <n; i++) { //for each testcase
    // input  logic
    let [N,m]=readline().split(' ').map(d=>Number(d))
    let A=[]
    for(let i=0;i<N;i++)
        A.push(readline().split(' ').map(d=>Number(d)))
    
    ////////////////////
    // solve
    
    let result=solve(N,m,A)
    //output logic
    console.log('Case #'+(i+1).toString()+': '+result.toString())
}
