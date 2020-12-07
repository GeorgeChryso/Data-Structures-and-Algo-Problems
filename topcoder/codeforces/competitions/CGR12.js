process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '',currentLine = 0,readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string =>string.trim());
    let t=Number(readline())
    for (let i = 0; i < t; i++) {
        let n=Number(readline()),G=[]
        for(let j=0;j<n;j++){
            let s=readline().split('')
            G.push(s)
        }
        solve(n,G)
    }    
  
});

let solve=(n,G)=>{
    let r=0,k=0
    let swap=(i,j)=>{
        if(G[i][j]==='X')
            G[i][j]='O'
        else
            G[i][j]='X'
        r++
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if(G[i][j]!=='.')
                k++

            if(i>0&&i<n-1&&j>0&&j<n-1&& G[i][j]===G[i][j+1]&&G[i][j]===G[i][j-1]&&G[i][j]!=='.'&&
            G[i][j]===G[i-1][j]&&G[i][j]===G[i+1][j]){
                swap(i,j)
                continue
            }
            if(j>0&&j<n-1&& G[i][j]===G[i][j+1]&&G[i][j]===G[i][j-1]&&G[i][j]!=='.'){
                if(i+2<n&&G[i+2][j]===G[i][j])
                    swap(i,j)
                else
                    swap(i,j+1)
            }
            else if( i>0 && i<n-1 && G[i][j]===G[i-1][j]&&G[i][j]===G[i+1][j]&&G[i][j]!=='.'){
                if(j+2<n&&G[i][j+2]===G[i][j])
                    swap(i,j)
                else
                    swap(i+1,j)

            }
        }        
    }

    let dp=[...Array(n)].map(d=>[...Array(n)].map(d=>0))
    // dp[i][j]=min number of swaps such that no 3 shizzle 
    
    console.log(r,(k/3) >>0)
    G.forEach(d=>console.log(d.join('')))
}

