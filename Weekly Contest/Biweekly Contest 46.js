var highestPeak = function(A) {
    let q=[],n=A.length,m=A[0].length
        let seen=new Set()

    for(let i=0;i<n;i++)
        for(let j=0;j<m;j++)
            if(A[i][j]===1)
                q.push([i,j]),
                seen.add([i,j]+'')
    
    let dir=[ [0,1],[0,-1],[1,0],[-1,0]]
    let level=1
    let B=[...Array(n)].map(d=>[...Array(m)].map(d=>0))
    while(q.length){
        let temp=[]
        for(let [i,j] of q ){
            for(let [dx,dy] of dir)
                if(i+dx>=0&&i+dx<n&&j+dy>=0&&j+dy<m&& (!seen.has( [i+dx,j+dy]+'')))
                    temp.push([i+dx,j+dy]),
                    seen.add( [i+dx,j+dy]+''),
                    B[Number(i)+dx][Number(j)+dy]=level
        }
        q=temp
        level++
    }
    return B
};

