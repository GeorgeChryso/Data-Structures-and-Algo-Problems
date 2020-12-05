

/*
 Clearly, we should consider all possible submapping of all subtrees on all vertex-subsets of the graph. The number of these submapping is huge, so we have to determine which properties of these submappings are important for extending the mapping. It turns out that these properties are:
1. Subtree denoted by its root vertex v. Necessary to check the outgoing edge mapping later.
2. Vertex of graph p which is the image of v. Again: necessary to check the mapping of added edge.
3. The full image of v-subtree in graph - set s of already mapped vertices in graph. Necessary to maintain bijectivity of mapping.
Therefore we define state domain (v,p,s)->GR. GR is number of submappings with the properties we are interested in.

To combine results of sons in tree we need to run another "internal" DP.
     Remember that internal DP is local for each vertex v of the tree. 
        The first parameter will be number of sons already merged - this is quite standard.
        Also we'll use additional parameters p and s inside. 
        The state domain is (k,p,s)->IR where IR is the number of submappings of partial v-subtree on graph with properties:
        1. The vertex v and subtrees corresponding to its first k sons are being mapped (called domain).
        2. Image of v is vertex p in graph.
        3. The full image of mapping considered is s - subset of already used vertices.
The transition of this internal DP is defined by adding one subtree corresponding to k-th son to the domain of mapping. For example, if w is the k-th son, then we add global state GR[w,q,t] to internal state IR[k,p,s] and get internal state IR[k+1,p,s+t]. Here we must check that there is an edge p-q in the graph and that sets s and t have no common elements. The combinations considered in GR[w,q,t] and IR[k,p,s] are independent, so we can just add their product to the destination state. The answer of internal DP is IR[sk,p,s] which is stored as a result GR[k,p,s] of global DP.
This is correct solution of this problem. Unfortunately, it runs in O(4^N * N^3) if implemented like it is in the code below. Of course it gets TL. You need to optimize the solution even further to achieve the required performance. The recipe "Optimizing DP solution" describes how to get this solution accepted.
*/

let GameWithGraphAndTree=(graph, tree)=>{
    let mod=1000000007,result=0,n=graph.length,
        dp=[...Array(n)].map(d=>[...Array(n)].map(d=>[...Array(1<<n)].map(d=>0)))
    /*
        dp[t][p][mask]= Number of mappings such that tree node t goes to graph node p and 
                        mask represents the Graph nodes that are used in such mappings. 
    */
   // O(n*n*n*(1<<n)*(1<<n))
    let dfs=(node,parent=-1)=>{
        let children=[]
        for (let child = 0; child <n; child++)
            if(tree[node][child]==='Y' && child!==parent )
                dfs(child,node),
                children.push(child)
        let ires=[...Array(children.length+1)].map(d=>[...Array(n)].map(d=>[...Array(1<<n)].map(d=>0)))
        //basecase of internal dp
        //so the number of ways to map node to GraphNode such that only GraphNode s used is 1 
        for (let graphNode = 0; graphNode < n; graphNode++)
            ires[0][graphNode][1<<graphNode]=1 
        /*                          Tree                     Graph
                                    node                  c=GraphNode
                                /   /   |   \               /  |  \
                               c1  c2  c3   c4             a   b   d

            for example. 
            ires[2][c][0011] = 2     represent the mappings        and            
                                        node          =>    c           node     =>    c
                                    c1      c2            a  b          c1  c2       b     a


            ires[k][graphNode][mask]= the number of mappings of the PARTIAL tree that consists of : 
                our tree vertex: node
                the first k children of the tree node,and their subtrees
            such that
                node -> nodeimg
                the k-th child -> childImg , with a q mask being used by the graph subtree of q 
                and mask are the elements used in the graph already
        */
        for (let k = 0; k < children.length; k++)                                       //for erery tree child
            for (let nodeimg = 0,child=children[k]; nodeimg < n; nodeimg++)  // my main node maps to graphNode
                // the graph nodes already used up to the k-th, the image of the first k-children
                for (let curGraph = 0; curGraph < (1<<n); curGraph++)
                    for (let childImg = 0; childImg<n; childImg++)//the image of the k-th child , a graph Node
                        for (let qMask = 0;graph[childImg][nodeimg]==='Y'&&qMask < (1<<n); qMask++) //the graph nodes used in this image q 
                            if((qMask&curGraph)==0)
                                ires[k+1][nodeimg][qMask|curGraph]=
                                ( ires[k+1][nodeimg][qMask|curGraph]+ires[k][nodeimg][curGraph]*dp[child][childImg][qMask])%mod
        dp[node]=ires[children.length]
    }
    dfs(0)
    // map the tree node 0 to the graph node r while the image of the graph is 
    // 11111...1 aka all of its elements are used. 
    for (let r = 0; r <n; r++) 
        result=(result+dp[0][r][(1<<n)-1])%mod   

    console.log(result)
    return result
}
// The graph can also contain cycles btw
let GameWithGraphAndTreeOptimized=(graph, tree)=>{
    let mod=1000000007,result=0,n=graph.length,
        dp=[...Array(n)].map(d=>[...Array(n)].map(d=>[...Array(1<<n)].map(d=>0)))

    let dfs=(node,parent=-1)=>{
        let children=[]
        for (let child = 0; child <n; child++)
            if(tree[node][child]==='Y' && child!==parent )
                dfs(child,node),
                children.push(child)
        let ires=[...Array(children.length+1)].map(d=>[...Array(n)].map(d=>[...Array(1<<n)].map(d=>0)))
        for (let graphNode = 0; graphNode < n; graphNode++)
            ires[0][graphNode][1<<graphNode]=1 
        
        //instead of iterating over all qMasks, i want only those which do not intersect with curGraph, So i can iterate
        // over all subsets of the remaining nodes that are not used in curGraph
        for (let k = 0; k < children.length; k++)                                      
            for (let nodeimg = 0,child=children[k]; nodeimg < n; nodeimg++)  
                for (let curGraph = 0; curGraph < (1<<n); curGraph++)
                    for (let childImg = 0; ires[k][nodeimg][curGraph] && childImg<n; childImg++)
                        if( (curGraph&(1<<childImg) )===0){ // my graph cant contain the childimg
                            let complement= ((1<<n)-1)^curGraph
                            //iterate over all subsets of the complement instead to reduce the time to O(3**n)
                            for (let qMask = complement; qMask>0&&graph[childImg][nodeimg]==='Y'; qMask = (qMask-1) &complement ) 
                                if(dp[child][childImg][qMask])
                                    ires[k+1][nodeimg][qMask|curGraph]=
                                        ( ires[k+1][nodeimg][qMask|curGraph]+ires[k][nodeimg][curGraph]*dp[child][childImg][qMask])%mod
        
                        }
        dp[node]=ires[children.length]
    }
    dfs(0)
    // map the tree node 0 to the graph node r while the image of the graph is 
    // 11111...1 aka all of its elements are used. 
    for (let r = 0; r <n; r++) 
        result=(result+dp[0][r][(1<<n)-1])%mod   

    return result
}

let tests=[
    [['NYY','YNY','YYN'],['NYN','YNY','NYN']],
    [["NYYYN", "YNYYY", "YYNNY", "YYNNY", "NYYYN"],["NYNNN", "YNYYY", "NYNNN", "NYNNN", "NYNNN"]],
    [["NNNYNNNNNYYY", "NNNYNNNNNNYN", "NNNNNNNNYYNN", "YYNNNYYNYNNN", "NNNNNNYNNNNY", "NNNYNNNNYNNY", "NNNYYNNNNNYN", "NNNNNNNNNNNY", "NNYYNYNNNYNN", "YNYNNNNNYNNN", "YYNNNNYNNNNY", "YNNNYYNYNNYN"],["NNNNNNYNNNNN", "NNNNNNNNNYNN", "NNNYYNNNNNNN", "NNYNNNYNYNYN", "NNYNNNNNNNNN", "NNNNNNNNNYNN", "YNNYNNNYNNNN", "NNNNNNYNNNNY", "NNNYNNNNNYNN", "NYNNNYNNYNNN", "NNNYNNNNNNNN", "NNNNNNNYNNNN"]],
    [["NYYYYYNYYYYYYY", "YNYYYYYYYYYYYY", "YYNYYYNYYYYYYY", "YYYNYYYYYYYYYY", "YYYYNYYYYYYYYY", "YYYYYNYYYYYYYY", "NYNYYYNYYYYYYY", "YYYYYYYNYYYYYY", "YYYYYYYYNYYYYY", "YYYYYYYYYNYYYY", "YYYYYYYYYYNYYY", "YYYYYYYYYYYNYY", "YYYYYYYYYYYYNY", "YYYYYYYYYYYYYN"],["NNNNNYNNNNNNNN", "NNYNNNNNNNNNNN", "NYNNNNNYYNNNNN", "NNNNNNYNNNNNNN", "NNNNNNYNNYYNYY", "YNNNNNNYNNNYNN", "NNNYYNNYNNNNNN", "NNYNNYYNNNNNNN", "NNYNNNNNNNNNNN", "NNNNYNNNNNNNNN", "NNNNYNNNNNNNNN", "NNNNNYNNNNNNNN", "NNNNYNNNNNNNNN", "NNNNYNNNNNNNNN"]],
    [ ["NYYYYYYYYYYYYY", "YNYYYYYYYYYYYY", "YYNYYYYYYYYYYY", "YYYNYYYYYYYYYY", "YYYYNYYYYYYYYY", "YYYYYNYYYYYYYY", "YYYYYYNYYYYYYY", "YYYYYYYNYYYYYY", "YYYYYYYYNYYYYY", "YYYYYYYYYNYYYY", "YYYYYYYYYYNYYY", "YYYYYYYYYYYNYY", "YYYYYYYYYYYYNY", "YYYYYYYYYYYYYN"], ["NNNNYNNNNNNNNN", "NNNYNYNNNNNNNN", "NNNNNNNYNNNNYN", "NYNNNNNNNNNNNN", "YNNNNYNNNNNNNN", "NYNNYNNYNNYNNY", "NNNNNNNNNNNNYN", "NNYNNYNNNYNNNN", "NNNNNNNNNNYNNN", "NNNNNNNYNNNNNN", "NNNNNYNNYNNYNN", "NNNNNNNNNNYNNN", "NNYNNNYNNNNNNN", "NNNNNYNNNNNNNN"]],
    [['NY','YN'],['NY','YN']],
    [ ["NYN",
    "YNY",
    "NYN"],["NYY",
    "YNN",
    "YNN"]],
[["NYNNN",
    "YNYYY",
    "NYNYY",
    "NYYNY",
    "NYYYN"],["NYNNN", 
    "YNYNN",
    "NYNYN",
    "NNYNY",
    "NNNYN"]],
    [["NYNNNY",
    "YNYNNN",
    "NYNYNN",
    "NNYNYN", 
    "NNNYNY",
    "YNNNYN"],["NYNNYN",
    "YNNYNY",
    "NNNNYN",
    "NYNNNN",
    "YNYNNN",
    "NYNNNN"]],
    [["NYNNYN",
    "YNNYNY",
    "NNNNYN",
    "NYNNNN",
    "YNYNNN",
    "NYNNNN"],["NNNYYN", 
    "NNYNNN",
    "NYNNYY", 
    "YNNNNN",
    "YNYNNN",
    "NNYNNN"]],
    [["NYNNNYNNY",
    "YNNNNNNYN",
    "NNNNYYNYY",
    "NNNNNYNNY",
    "NNYNNNYNY",
    "YNYYNNNYN",
    "NNNNYNNYN",
    "NYYNNYYNN",
    "YNYYYNNNN"],["NNYNNNYYN",
    "NNNNYNNNN",
    "YNNNNNNNN",
    "NNNNNNYNN",
    "NYNNNNNYY",
    "NNNNNNNNY",
    "YNNYNNNNN",
    "YNNNYNNNN",
    "NNNNYYNNN"]]
]

console.log(tests.map( ([a,b])=>GameWithGraphAndTreeOptimized(a,b)))