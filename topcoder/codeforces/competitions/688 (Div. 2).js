process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '',currentLine = 0,readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string =>string.trim());
    let t=Number(readline())
    for (let i = 0; i < t; i++) {
        let n=Number(readline())
        A=readline().split('').map(d=>Number(d))
        solve(A,n)
    }    
  
});

let solve=(A,n)=>{ 
    let res=[...Array(10)].map(d=>0)
    let topMost=[...Array(10)],
        bottomMost=[...Array(10)],
        leftMost=[...Array(10)],
        rightMost=[...Array(10)]
    for(let i=0;i<n;i++)
        for (let j = 0; j < n; j++){
            if(topMost[A[i][j]]===undefined)
                topMost[A[i][j]]=i
            else
                topMost[A[i][j]]=Math.min(i,topMost[A[i][j]])
            if(leftMost[A[i][j]]===undefined)
                leftMost[A[i][j]]=j
            else
                leftMost[A[i][j]]=Math.min(j,leftMost[A[i][j]])
            if(bottomMost[A[i][j]]===undefined)
                bottomMost[A[i][j]]=i
            else
                bottomMost[A[i][j]]=Math.max(i,bottomMost[A[i][j]])    
            if(rightMost[A[i][j]]===undefined)
                rightMost[A[i][j]]=j
            else
                rightMost[A[i][j]]=Math.max(j,rightMost[A[i][j]])
        }

        for(let i=0;i<n;i++)
            for (let j = 0; j < n; j++){
                let d=A[i][j]
                if(topMost[d]!==undefined)
                    res[d]=Math.max(res[d],
                        Math.abs(topMost[d]-i)*
                        Math.max(Math.abs(n-j-1),j)
                    )
                 if(bottomMost[d]!==undefined)
                    res[d]=Math.max(res[d],
                        Math.abs(bottomMost[d]-i)*
                        Math.max(Math.abs(n-j-1),j)
                    )
                 if(leftMost[d]!==undefined)
                    res[d]=Math.max(res[d],
                        Math.abs(leftMost[d]-j)*
                        Math.max(Math.abs(n-i-1),i)
                    )
                 if(rightMost[d]!==undefined)
                    res[d]=Math.max(res[d],
                        Math.abs(rightMost[d]-j)*
                        Math.max(Math.abs(n-i-1),i)
                    )
            }
    
    console.log(...res)
}