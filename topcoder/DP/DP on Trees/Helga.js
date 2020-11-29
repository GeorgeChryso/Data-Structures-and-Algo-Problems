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
        let [n,m]=readline().split(' ').map(d=>Number(d))
        let A=[]
        for (let i = 0; i < n-1; i++) 
            A.push(readline().split(' ').map(d=>Number(d)))          
        let [k,x]=readline().split(' ').map(d=>Number(d))
          
        let result=solve(n,m,A,k,x)
        console.log(result.toString())
    }
    main();    
});


/* number of ways of assigning types from 1 to m to
     n tree nodes such that :
        there are at most x nodes of type k
        all adjacent nodes of a type k node, have their type<k
        (no two adjacent nodes can be of type k)
    
    A tree can be assigned M numbers to any of its N nodes. K<=M is a special number such that:
        there are at most X nodes assigned K,
        All adjacent nodes to a K node are assigned a number Q<K 

    dp[i][j][k] represents the count of numberings 
    where j  k's exist in the subtree rooted at i,
    and the state of the current node i is <k, k,or >k.
                                           0  1     2
*/
let solve=(n,m,A,K,x)=>{
    let mod=BigInt(1e9+7),adj=[...Array(n)].map(d=>[])
    for(let [f,t] of A)
        adj[f-1].push(t-1),
        adj[t-1].push(f-1)

    let dp=[...Array(n+1)].map(d=>[...Array(x+2)].map(d=>[...Array(4)].map(d=>0n)))
    
    let dfs=(node,parent)=>{
        //essentially precomputes the children, so the dp can occur and all the subtrees rooted at children are known
        for(let child of adj[node])
            if(child!==parent)
                dfs(child,node)
        /*
            subdp0[i][j]= The number of ways I can create the tree that consists of : 
                            (some of) the first i children,my node as root 
                            such that, it has at most j total K's used 
                            And my root node has a value < K
            subdp1[i][j]= numWays to color my subtree rooted at node out of the first i children, such that there are j total Ks used and the root  has a value == K
            subdp2[i][j]= numWays to color my subtree rooted at node out of the first i children, such that there are j total Ks used and the root  has a value > K
        */
        let subdp0=[...Array(adj[node].length+1)].map(d=>[...Array(x+1)].map(d=>0n)), //root is <k
            subdp1=[...Array(adj[node].length+1)].map(d=>[...Array(x+1)].map(d=>0n)),// root is k
            subdp2=[...Array(adj[node].length+1)].map(d=>[...Array(x+1)].map(d=>0n)) // root is >k 
        subdp0[0][0]=1n
        subdp1[0][0]=1n
        subdp2[0][0]=1n
        let count=0
        for(let child of adj[node]) //for every child
            if(child!==parent){
                // for every possible Number of Ks The tree that consists of :
                    //my root node, and the first count children
                for (let curTaken = 0; curTaken <=x; curTaken++) 
                    //for every potential number of Ks my subtree rooted at the i-th child can HAVE
                    for (let numKsSubtree = 0; numKsSubtree <=x-curTaken; numKsSubtree++) { 
                        let tot=curTaken+numKsSubtree,
                            //the total number of ways for the child to have numKssubtree number of Ks in its subtree
                            ways012=BigInt(dp[child][numKsSubtree][0]+dp[child][numKsSubtree][1]+dp[child][numKsSubtree][2])%mod,
                            //the number of ways for the child to have numKsSubtree number of Ks while the child is < K
                            ways0=BigInt(dp[child][numKsSubtree][0]),
                            //the number of ways for the child to have  numKsSubtree number of Ks while the child is != K
                            ways02=BigInt(dp[child][numKsSubtree][0]+dp[child][numKsSubtree][2])%mod

                        subdp0[count+1][tot]=BigInt(subdp0[count+1][tot]+ways012*subdp0[count][curTaken])%mod
                        subdp1[count+1][tot]=BigInt(subdp1[count+1][tot]+ways0*subdp1[count][curTaken])%mod                
                        subdp2[count+1][tot]=BigInt(subdp2[count+1][tot]+ways02*subdp2[count][curTaken])%mod               
                    }                   
                count++
            }
        for (let numKs = 0; numKs <=x; numKs++) 
            dp[node][numKs][0]= (subdp0[count][numKs]*BigInt(K-1))%mod, // K-1 numbers less than K for the root node
            dp[node][numKs+1][1]= (subdp1[count][numKs])%mod,  // 1 number ===K for the root node (+1 for the root,which is K)
            dp[node][numKs][2]= (subdp2[count][numKs]*BigInt(m-K))%mod // m-K numbers > K for the root node
    }
    dfs(0,-1)
    let result=0n
    for(let k=0;k<3;k++)
        for(let j=0;j<=x;j++)
            result=(result+dp[0][j][k])%mod
    return result
}