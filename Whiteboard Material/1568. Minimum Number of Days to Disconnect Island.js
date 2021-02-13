
// basically the answer can only be 0 1 or 2 
// because we can always isolate a single island
var minDays = function(A) {
    let n=A.length,m=A[0].length,P=[]
    A.forEach((d,i)=>d.forEach((q,j)=>{ if(q)P.push([i,j])}))
    let checkComps=(A)=>{
        let count=0,seen=new Set()
        let dfs=(i,j)=>{
            if(i<0||j<0||i>=n||j>=m||seen.has([i,j]+'')||A[i][j]===0)
                return
            seen.add([i,j]+'')
            A[i][j]=0
            for(let [dx,dy] of [[0,1],[0,-1],[-1,0],[1,0]])
                dfs(i+dx,j+dy)
        }
        for(let i=0;i<n;i++)
            for(let j=0;j<m;j++)
                if(A[i][j]==1)
                    count++,
                    dfs(i,j)
        if(P.length)
            for(let [i,j] of P)
                A[i][j]=1
        return count
    }
    if(checkComps(A)!==1)
        return 0

    //check for 1
    for(let i=0;i<P.length;i++){
        let [i1,j1]=P[i]
        A[i1][j1]=0
        if(checkComps(A)!==1)
            return 1
    }
    //is 2 
    return 2
};