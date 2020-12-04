// tldr given a tree, edges have some cost to delete them. Some nodes are bad, return the minimum cost such that no two bad nodes are connexted through a path.

// 2<=Nodes<=50
// 1<=edges<=50
// 1<=badNodes<=Nodes


// approach 1 brute forcy
// Try every combination of edges
// add them into a dsu
// see if each badNode is connected
// if not, consider the nodes ommited total cost as the result
// return the minimum such cost
// O(2^N *N^3)
// Actually, the number of edges that need to be removed is one less than the number of badNodes
// use snoob, to generate all masks where K-1 edges are removed and see if all of the badnodes are still

// O(2^K *(N*2)), TLE
let BE=(N,edges,badNodes)=>{
    class UnionFind {

        constructor(size){
            //the total count of different elements(not groups) in this union find
            this.count=size
            //tracks the sizes of each of the components(groups/sets)
            //groupsize[a] returns how many elements the component with root a has 
            this.groupSize=[...Array(size)] 
            //number of components(groups) in the union find
            this.numComponents=size
            //points to the parent of i, if parent[i]=i, i is a root node
            this.parent=[...Array(size)]  //which is also the index of the group
    
            //put every element into its own group
            // rooted at itself
            for (let i = 0; i < size; i++) {
                this.groupSize[i]=i     
                this.parent[i]=i            
            }
        }
    
        //returns to which component (group) my element belongs to 
        // α(n) --Amortized constant time 
        // Update: Also compresses the paths so that each child points to its 
        // parent
        find(element){
            let root=element
            //find the parent of the group the elemnt belongs to
            // When root===parent[root] is always the parent of that group (root)
            while(root!=this.parent[root])
                root=this.parent[root]
    
            // Compression, point the element to its parent if its not already pointed
            // Tldr: Not only do I point my element to its actual root, i point any
            // inbetween elements to that root aswell
            while(element!=root){
                let next=this.parent[element]
                this.parent[element]=root
                element=next
            }
            
            return root
        }   
    
        //Unifies the sets containing A and B
        // if not already unified 
        // α(n) --Amortized constant time 
        union(A,B){
            let root1=this.find(A) //parent of A
                ,root2=this.find(B) //parent of B
            if(root1===root2) //already unified
                return false    
            // I want to put the set with fewer elements 
            // to the one with more elemenets
            if(this.groupSize[root1]<this.groupSize[root2]){
                this.groupSize[root2]+=this.groupSize[root1]
                this.parent[root1]=this.parent[root2]
            }
            else {
                this.groupSize[root1]+=this.groupSize[root2]
                this.parent[root2]=this.parent[root1]
            }
    
            this.numComponents-- //cos 1 less group, since i merged 2
            return true
        }
    
        //same parent=>samegroup
        sameGroup=(A,B)=>this.find(A)==this.find(B)
    
        //essentially the groupSize of its parent's group
        sizeOfGroup=(A)=>this.groupSize[this.find(A)]
    
    }
    let btcnt=(x,c=0n)=>x>0n?btcnt(x>>(1n),c+(x&1n)):c
    let snoob=x=>{
        // right most set bit 
        let rightOne = x & -x; 
        
        // reset the pattern and set next higher bit 
        // left part of x will be here 
        let nextHigherOneBit = x + rightOne; 
    
        // nextHigherOneBit is now part [D] of the above explanation. 
    
        // isolate the pattern 
        let rightOnesPattern = x ^ nextHigherOneBit; 
    
        // right adjust pattern 
        rightOnesPattern = (rightOnesPattern)/rightOne; 
    
        // correction factor 
        rightOnesPattern >>= 2n; 
    
        // rightOnesPattern is now part [A] of the above explanation. 
    
        // integrate new pattern (Add [D] and [A]) 
        let next = nextHigherOneBit | rightOnesPattern; 
        return next
    }
    let K=badNodes.length,result=Infinity
    if(K==1)
        return 0
    for (let mask = BigInt( (1<<(K-1)) -1); mask < (1n<<BigInt(N)); mask=snoob(mask)) {
        if(Number(btcnt(mask))!==K-1)
            continue
        let DSU=new UnionFind(N),f,t,cost,cur=0
        for (let i = 0; i < edges.length; i+=1)
            if((mask&BigInt(1<<i))==0n)
                [f,t,cost]=edges[Number(i)],
                DSU.union(f,t)
            else
                cur+=edges[Number(i)][2]
        if(badNodes.every(d=>
            badNodes.every(q=>q==d||!DSU.sameGroup(q,d))))
            result=Math.min(result,cur)
    }
    return result
}
// Greedy
//if an edge connects 2 subtrees with a badnode then it belongs to the solution
// O(n**2)
let BeGreedy=(N,edges,badNodes)=>{
    edges.sort((a,b)=>a[2]-b[2]) //sort them ascending and start removing
    let result=0,next={}
    badNodes=new Set(badNodes)
    if(badNodes.size==1)
        return 0
    for( let [f,t,cost] of edges )
        next[f]=next[f]||{},
        next[t]=next[t]||{},
        next[f][t]=next[t][f]=cost
    //dfs returns whether the subtree rooted at node has badnodes
    let dfs=(node,parent)=>{
        if(badNodes.has(Number(node)))
            return 1
        let res=0
        for(let nei of Object.keys(next[node]))
            if(nei!==parent&&next[node][nei]!==undefined)
                res|=dfs(nei,node)
        return res
    }
    for(let [f,t,cost] of edges){
        //try removing the current edge
        next[f][t]=next[t][f]=undefined
        ///and see if there exist badnodes on the subtrees created
        if(dfs(f)&&dfs(t)) 
            result+=cost //if they do, delete the edge
        else
            next[f][t]=next[t][f]=cost //else, readd it
    }
    return result
}



 /*
        dp[node][0]=The minimum cost, such that on the subtree rooted at node, no two badnodes are connected
        dp[node][1]=The minimum cost, such taht on the subteree rooted at node, no two badnodes are connected, but one badnode path escapes upwards

        demonstrating

                        \
                        v*
                    /4  |2  \1
                   a    b*    c*            dp[v][0]= Infinity, there is no way v's path doesnt escape upward
                                            dp[v][1]= 1+2 =3  
                                            
                        v
                    /4  |2  \1              dp[v][0]=1+2=3
                    a    b*    c*           dp[v][1]=1+2 -2=1, we always pick the biggest cost as the one to leave escapign, aka 2
                                            to keep track of the biggest cost (edge) to leave escaping upwards, we assign var max
    */



//dp on subtrees O(n**2) elegant + BigBrainTime
let BEdp=(N,edges,badNodes)=>{
    badNodes=new Set(badNodes)
    if(badNodes.size==1)
        return 0
    let dp=[...Array(N)].map(d=>[Infinity,Infinity]),next={}
    for( let [f,t,cost] of edges ) //create the graph
        next[f]=next[f]||{},next[t]=next[t]||{},next[f][t]=next[t][f]=cost
    let dfs=(node,parent=-1)=>{
        let res=0,max=-1 //res is the total sum of children costs,max is the maximum one I can spare and let escape upwards
        for(let child of Object.keys(next[node]))
            if(child!=parent){
                dfs(Number(child),node)
                if(dp[child][1]+next[node][child]<=dp[child][0])//should the child be considered bad or good?
                    res+=dp[child][1]+next[node][child],
                    max=Math.max(max,next[node][child]) //try sparing this edge
                else
                    res+=dp[child][0],
                    max=Math.max(max,dp[child][0]-dp[child][1]) //try sparing the biggest edge that made the previous white
            }
        if(badNodes.has(node))
            dp[node]=[Infinity,res]
        else
            dp[node]=[res,max===-1?Infinity:res-max]
    }
    dfs(0)
    return Math.min(dp[0][0],dp[0][1])
}


let tests=[
    [5,[ [1,0,1], [1, 2, 2], [0, 3, 3],[4, 0, 4]],[3,2,4]],
    [12,[[0,1,3],[2,0,5],[1,3,1],[1,4,8],[1,5,4],[2,6,2],[4,7,11],[4,8,10],[6,9,7],[6,10,9],[6,11,6]],[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]],
    [12,[[0,1,3],[2,0,5],[1,3,1],[1,4,8],[1,5,4],[2,6,2],[4,7,11],[4,8,10],[6,9,7],[6,10,9],[6,11,6]] ,[1, 2, 6, 8]],
    [23, ["4 19 18", "14 8 296", "6 19 828", "17 5 38", "19 10 258", "9 5 23", "2 13 969", "7 10 240", "4 9 998", "5 20 826", "3 2 827", "15 6 18", "16 1 602", "2 8 92", "8 1 408", "14 0 798", "5 16 388", "21 3 701", "15 12 268", "22 9 87", "11 18 649", "18 15 555"].map(d=>d.split(' ').map(d=>Number(d))), [0, 18, 2, 12, 14, 15, 17, 9, 21, 5, 11, 19, 8, 4, 20, 1]],
    [	32, ["9 27 120", "24 5 208", "23 14 37", "28 7 910", "24 25 164", "26 20 683", "2 3 106", "28 12 493", "30 26 824", "2 21 861", "2 5 817", "10 17 313", "3 18 613", "28 16 917", "14 0 988", "10 24 494", "21 31 5", "26 10 94", "23 30 5", "11 18 181", "21 7 310", "0 9 730", "23 19 894", "18 13 655", "29 10 982", "6 21 548", "29 15 118", "4 17 62", "8 17 881", "22 2 107", "23 1 407"].map(d=>d.split(' ').map(d=>Number(d))), [30, 10, 2, 31, 29, 25, 0, 28, 8, 18, 21, 6, 4, 13, 12, 16, 15, 27, 5, 3, 11, 26, 19, 17, 7]],
    [50,["42 45 1000000", "28 13 1000000", "5 14 1000000", "16 31 1000000", "7 38 1000000", "37 27 1000000", "27 47 1000000", "19 17 1000000", "12 49 1000000", "42 40 1000000", "12 4 1000000", "42 47 1000000", "30 43 1000000", "19 35 1000000", "37 3 1000000", "41 27 1000000", "36 21 1000000", "23 7 1000000", "44 15 1000000", "14 27 1000000", "28 40 1000000", "15 20 1000000", "40 38 1000000", "2 16 1000000", "44 22 1000000", "32 26 1000000", "19 5 1000000", "12 10 1000000", "44 42 1000000", "6 38 1000000", "33 22 1000000", "35 24 1000000", "26 30 1000000", "12 42 1000000", "0 27 1000000", "11 8 1000000", "26 17 1000000", "48 17 1000000", "10 2 1000000", "8 4 1000000", "39 7 1000000", "6 21 1000000", "38 34 1000000", "25 43 1000000", "46 37 1000000", "29 3 1000000", "15 1 1000000", "18 22 1000000", "9 19 1000000"].map(d=>d.split(' ').map(d=>Number(d))),[39, 12, 47, 6, 9, 26, 11, 1, 37, 4]],
    [50, ["24 14 30585", "14 2 17913", "2 1 7185", "14 32 3524", "2 3 23893", "14 42 32358", "1 46 15102", "42 29 20974", "29 11 24873", "2 23 17418", "2 31 3231", "29 12 14447", "11 9 1113", "2 0 8315", "46 34 19524", "32 33 25625", "14 17 30017", "42 18 20966", "9 47 11888", "33 35 23186", "33 13 31662", "2 20 7048", "0 7 13660", "29 21 31953", "13 44 13667", "0 38 26165", "17 27 21876", "9 28 20388", "11 49 8853", "14 10 12501", "7 45 27097", "14 39 5165", "33 16 622", "42 4 20706", "34 36 30941", "28 22 12384", "33 15 32654", "13 19 748", "19 25 18571", "4 40 26503", "10 37 11397", "9 8 19221", "24 43 17180", "0 5 25278", "1 6 20571", "28 48 9621", "2 26 11138", "16 41 2423", "46 30 777"].map(d=>d.split(' ').map(d=>Number(d))), [21, 49, 34, 16, 40, 22, 6, 26, 39, 5, 33, 19, 44, 48, 9, 0, 3, 17, 45, 47]],
    [	12, ["0 1 3", "2 0 5", "1 3 1", "1 4 8", "1 5 4", "2 6 2", "4 7 11", "4 8 10", "6 9 7", "6 10 9", "6 11 6"].map(d=>d.split(' ').map(d=>Number(d))), [1, 2, 6, 8]],
    [	50, ["1 0 1", "2 1 3", "2 3 11", "4 0 17", "1 5 3", "6 0 8", "2 7 6", "3 8 5", "2 9 5", "4 10 20", "7 11 1", "0 12 6", "3 13 13", "13 14 13", "15 0 14", "16 15 14", "11 17 18", "18 14 2", "16 19 4", "5 20 10", "21 17 10", "9 22 2", "23 6 4", "8 24 19", "9 25 10", "26 1 12", "27 7 5", "28 1 17", "29 18 3", "4 30 19", "31 29 11", "24 32 14", "32 33 18", "34 1 3", "35 12 12", "36 19 18", "31 37 7", "24 38 17", "15 39 19", "40 30 15", "14 41 1", "41 43 100", "43 44 5", "43 47 2", "47 45 3", "47 46 1", "41 48 2", "41 49 4", "42 41 7"].map(d=>d.split(' ').map(d=>Number(d))), [11, 24, 19, 30, 4, 16, 29, 37, 44, 45, 47, 49, 42]],
    [50, ["0 42 1000000", "47 32 1000000", "10 35 1000000", "16 49 1000000", "46 3 1000000", "1 37 1000000", "25 5 1000000", "32 28 1000000", "8 29 1000000", "13 10 1000000", "10 15 1000000", "49 40 1000000", "40 4 1000000", "3 20 1000000", "22 19 1000000", "9 14 1000000", "15 38 1000000", "13 11 1000000", "2 41 1000000", "8 18 1000000", "29 43 1000000", "18 23 1000000", "23 0 1000000", "42 14 1000000", "39 13 1000000", "11 29 1000000", "22 49 1000000", "28 43 1000000", "18 5 1000000", "5 19 1000000", "0 20 1000000", "12 8 1000000", "48 30 1000000", "21 49 1000000", "41 20 1000000", "34 8 1000000", "37 42 1000000", "44 34 1000000", "7 4 1000000", "36 28 1000000", "6 35 1000000", "24 4 1000000", "45 14 1000000", "26 42 1000000", "33 5 1000000", "31 9 1000000", "30 11 1000000", "19 27 1000000", "17 14 1000000"].map(d=>d.split(' ').map(d=>Number(d))), [20, 3, 9, 13, 6, 26, 40, 45, 16, 38, 44, 28, 25, 8, 27, 48, 12, 4, 23, 35, 0, 19, 37, 31, 22, 46, 10, 33, 34, 11, 42, 21, 43, 14, 2, 29, 41, 15, 36, 49, 1, 7, 18, 32, 39, 47, 24, 30, 5, 17]],
    [32, ["9 27 120", "24 5 208", "23 14 37", "28 7 910", "24 25 164", "26 20 683", "2 3 106", "28 12 493", "30 26 824", "2 21 861", "2 5 817", "10 17 313", "3 18 613", "28 16 917", "14 0 988", "10 24 494", "21 31 5", "26 10 94", "23 30 5", "11 18 181", "21 7 310", "0 9 730", "23 19 894", "18 13 655", "29 10 982", "6 21 548", "29 15 118", "4 17 62", "8 17 881", "22 2 107", "23 1 407"].map(d=>d.split(' ').map(d=>Number(d))), [30, 10, 2, 31, 29, 25, 0, 28, 8, 18, 21, 6, 4, 13, 12, 16, 15, 27, 5, 3, 11, 26, 19, 17, 7]],
    [	50, ["29 5 842537", "31 30 508599", "22 8 420260", "40 12 768022", "15 14 31706", "21 41 197008", "13 8 416243", "30 24 673120", "29 36 581517", "12 22 768290", "39 23 838225", "27 8 740867", "4 49 676710", "3 28 620391", "32 4 741437", "32 11 26543", "11 6 536744", "49 24 859345", "2 33 876576", "10 46 840634", "39 44 484947", "45 14 265889", "25 21 166952", "43 9 225820", "21 46 580337", "41 1 357469", "3 0 909914", "12 29 404261", "0 22 38216", "22 44 939503", "27 16 605142", "22 46 289520", "19 8 703065", "37 3 729794", "24 19 939128", "38 24 269044", "18 6 726022", "43 44 669188", "23 20 314433", "14 19 780348", "47 29 575445", "35 44 421869", "34 39 366897", "34 48 558769", "33 25 470879", "17 34 413874", "40 42 689596", "7 14 318396", "26 15 835931"].map(d=>d.split(' ').map(d=>Number(d))), [22, 41, 7, 5, 33, 36, 21, 27, 14, 13, 16, 17, 25, 6, 47, 37, 32, 42, 38]		]
]


 console.log(tests.map( ([a,b,c])=>BeGreedy(a,b,c)))
 console.log(tests.map( ([a,b,c])=>BEdp(a,b,c)))


