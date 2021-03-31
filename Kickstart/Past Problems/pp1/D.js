const { Console } = require('console');
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
let currentline = 0;
function readline(){
    return input[currentline++];
}

//boilerplate ends here
// Test it with node ./name.js < input.txt

let n=Number(readline()) //1st line is usually the number of testcases

let solve=(names,queries)=>{
    let n=names.length,q=queries.length,result
    names=names.map(
        s=>{
            let mask=0
            for (let i = 0; i < s.length; i++) {
                mask|=1<<(s.charCodeAt(i)-65)                
            }
            return mask
        }
    )

    queries=queries.map(([f,t])=>[f-1,t-1])
    let adj=[...Array(n)].map(d=>[...Array(n)].map(d=>Infinity))
    for (let i = 0; i < n; i++) 
        for (let j = i+1; j < n; j++) 
            if((names[i]&names[j])!==0)
                 adj[i][j]=1,
                 adj[j][i]=1  

    
    let seen=new Map()

    let arrays={}
    return queries.map(([f,t])=>{
        if(seen.has([f,t].toString()))
            return seen.get([f,t].toString())
        if(seen.has([t,f].toString()))
            return seen.get([t,f].toString())   
        if(arrays[f]!==undefined)
            return arrays[f][t]
        let m=[...Array(n)].map(d=>2) //map everything to 2
        let distanceFromStart=[...Array(n)].map(d=>Infinity)
        distanceFromStart[f]=0
        let q=[f]
        while(q.length){
            let u=q.shift()
            m[u]=0
            for (let i = 0; i < n; i++) {
                let [v,cost]=[i,adj[u][i]]
                if(distanceFromStart[u]+cost<distanceFromStart[v]){
                    distanceFromStart[v]=distanceFromStart[u]+cost
                    if(m[v]==2){
                        m[v]=1
                        q.push(v)
                    }
                    else if(m[v]==0){
                        m[v]=1
                        q.unshift(v)
                    }
    
                }
    
            }
        } 
        arrays[f]=[...distanceFromStart]
        let res=(distanceFromStart[t]+1)===Infinity?-1:(distanceFromStart[t]+1)
        seen.set([f,t].toString(),res)
        seen.set([t,f].toString(),res)
        return res
        }
    )
    
}  

for (let i = 0; i <n; i++) { //for each testcase
    // input  logic
    let [N,Q]=readline().split(' ').map(d=>Number(d))
    let Names=readline().split(' ')
    let Queries=[]
    for (let i = 0; i < Q; i++) {
        Queries.push(readline().split(' ').map(d=>Number(d)))        
    }
    ////////////////////
    
    
    let result=solve(Names,Queries).join(' ')
    //output logic
    console.log('Case #'+(i+1).toString()+': '+result)
}

