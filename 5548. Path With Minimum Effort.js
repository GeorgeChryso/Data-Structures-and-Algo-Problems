// You are a hiker preparing for an upcoming hike. You are given heights, a 2D array of size rows x columns, where heights[row][col] represents the height of cell (row, col). You are situated in the top-left cell, (0, 0), and you hope to travel to the bottom-right cell, (rows-1, columns-1) (i.e., 0-indexed). You can move up, down, left, or right, and you wish to find a route that requires the minimum effort.

// A route's effort is the maximum absolute difference in heights between two consecutive cells of the route.

// Return the minimum effort required to travel from the top-left cell to the bottom-right cell.





// Binary search for the correct answer
// if n effort is possible, search below it,else search above it
// O(M*NlogW)
var minimumEffortPath = function(heights) {
    let n=heights.length,m=heights[0].length,
        moves=[[0,1],[0,-1],[1,0],[-1,0]],
        lo=0,hi=1e6,result=Infinity

    //iterative dfs
    // essentially you want to find any path such that
    // the cost of that path, aka max diff between any two consecutive nodes
    // is <= effort
    // Again, you need to find A N Y path that satisfies this, so you 
    // re ok with exploring the minimum path first. 
    let dfs=(effort)=>{
        let seen=new Set(),stack=[[0,0]]
        seen.add([0,0].toString())
        while(stack.length){
            let [r,c]=stack.pop()
            if(r==n-1&&c==m-1) //reached my target with maxEffort<=effort
                return true

            for (const [dx,dy] of moves) 
                if( r+dx>=0&&r+dx<n&&c+dy>=0&&c+dy<m  &&   //inbound neighbor
                    !seen.has([r+dx,c+dy].toString()) &&    // not  explored
                    Math.abs(heights[r+dx][c+dy]-heights[r][c])<=effort //with good diff
                    )
                    seen.add([r+dx,c+dy].toString()), //explore it 
                    stack.push([r+dx,c+dy]) //explore the minimum path first
        }
        return false
    }

    while(lo<=hi){
        let mid=(lo+hi)>>1
        if(dfs(mid))//is mid possible? through dfs
            result=Math.min(result,mid),
            hi=mid-1
        else
            lo=mid+1
    }

    return result
};
// recursive dfs + binary search
var minimumEffortPath = function(heights) {
    let n=heights.length,m=heights[0].length,
        moves=[[0,1],[0,-1],[1,0],[-1,0]],
        lo=0,hi=1e6,result=Infinity

    let isPossible=(i,j,effort,seen)=>{
        if(i==n-1&&j==m-1) //reached my target with maxEffort<=effort
            return true        
        seen.add([i,j].toString())
        let result=false
        for (const [dx,dy] of moves) 
            if( i+dx>=0&&i+dx<n&&j+dy>=0&&j+dy<m  &&   //inbound neighbor
                !seen.has([i+dx,j+dy].toString()) &&    // not  explored
                Math.abs(heights[i+dx][j+dy]-heights[i][j])<=effort&&//with good diff
                !result //and a previous path wasnt successful (cut the recursive stack overhead)
                )
                seen.add([i+dx,j+dy].toString()), //explore it 
                result|=isPossible(i+dx,j+dy,effort,seen)//explore the minimum path first
        
        return result
        //alternatively (concise)
        return moves.some(([dx,dy])=>{
            if( i+dx>=0&&i+dx<n&&j+dy>=0&&j+dy<m  &&   //inbound neighbor
                !seen.has([i+dx,j+dy].toString()) &&    // not  explored
                Math.abs(heights[i+dx][j+dy]-heights[i][j])<=effort //with good diff
                ){
                    seen.add([i+dx,j+dy].toString()) //explore it 
                    return isPossible(i+dx,j+dy,effort,seen)//explore the minimum path first
                }
               
            return false
        })
    }

    while(lo<=hi){
        let mid=(lo+hi)>>1
        let seen=new Set()  
        if(isPossible(0,0,mid,seen))//is mid cost possible? through dfs
            result=Math.min(result,mid),
            hi=mid-1
        else
            lo=mid+1
    }

    return result
};
//bfs alternative + binary search
var minimumEffortPath = function(heights) {
    let n=heights.length,m=heights[0].length,
        moves=[[0,1],[0,-1],[1,0],[-1,0]],
        lo=0,hi=1e6,result=Infinity
    
    
    //bfs
    let isPossible=(effort,seen)=>{
        let q=[[0,0]]
        seen.add([0,0].toString())
        while(q.length){
            let temp=[]
            while(q.length){
                let [i,j]=q.shift()
                if(i==n-1&&j==m-1)
                    return true
                for (const [dx,dy] of moves) 
                    if( i+dx>=0&&i+dx<n&&j+dy>=0&&j+dy<m  &&   //inbound neighbor
                        !seen.has([i+dx,j+dy].toString()) &&    // not  explored
                        Math.abs(heights[i+dx][j+dy]-heights[i][j])<=effort//with good diff
                        )
                        seen.add([i+dx,j+dy].toString()), //explore it 
                        temp.push([i+dx,j+dy])
            }
            q=temp
        }
        return false
        
    }

    while(lo<=hi){
        let mid=(lo+hi)>>1
        let seen=new Set()  
        if(isPossible(mid,seen))//is mid cost possible? through dfs
            result=Math.min(result,mid),
            hi=mid-1
        else
            lo=mid+1
    }

    return result
};


//dijkstras
class minBinaryHeap{
    constructor(){
        this.heap=[]
        //this is the simplest comparator between a and b and returns 
        // a positive number if a >b
        // a negative number if a < b
        // or 0 when a ===b, 
        // adjusting this for every situation will allow me to use heaps outside of the 
        // just numbers context
        this.comparator=(a,b)=>a-b
    }

    hasParent=index=>index>=1
    getParent=(index)=>this.heap[Math.floor((index-1)/2)]
    
    hasLeft=(index)=>2*index+1<=this.heap.length-1
    getLeftChild=(index)=>this.heap[2*index+1]
    
    hasRight=index=>2*index+2<=this.heap.length-1
    getRightChild=(index)=> this.heap[2*index+2]
    
    length=()=>this.heap.length

    peek=()=>this.heap[0]

    push(element){
        this.heap.push(element)
        //this element is pushed on the rightmost node of the lowest level
        // and needs  to be bubbled up accordingly
        this.bubbleUp(this.heap.length-1)
    }

    bubbleUp(index){
        //if there is a parent with a bigger priority, switch places with my index
        while(this.hasParent(index)&&(this.comparator(this.heap[index],this.getParent(index))<0)){
            //swap the two elements until the Invariant is reached
            this.swap(index,Math.floor((index-1)/2))
            // and update the new index to be its parent's index, since u switched the items
            index=Math.floor((index-1)/2)
        }
    }

    //get the highest(lowest) priority element
    poll(){
        if(this.length()==1)return this.heap.pop()

        let result=this.heap[0]
        this.heap[0]=this.heap.pop()
        this.bubbleDown(0)
        return result
    }
    
    //after every poll, the new item on place 0 needs to be bubbled down to its correct position
    bubbleDown(index){
        if(this.length()<=1)return

        while(this.hasLeft(index)&&(this.comparator(this.heap[index],this.getLeftChild(index))>0||(this.hasRight(index)&&this.comparator(this.heap[index],this.getRightChild(index))>0) )){

            //if there is no right child, swap with the left
            if(!this.hasRight(index)){
                this.swap(index,index*2+1)
                index=index*2+1
            }
            else{
                // if the left child is less than or equal to the right child, choos the left
                if(this.comparator(this.getLeftChild(index),this.getRightChild(index))<=0){
                    //and swap
                    this.swap(index,index*2+1)
                    index=index*2+1
                }
                // else choose the right child
                else {
                    //and swap
                  this.swap(index,index*2+2)
                  index=index*2+2

                }
                
            }
        }
    }
    swap=(a,b)=>{
        if(a===b)return
        let temp=this.heap[b]
        this.heap[b]=this.heap[a]
        this.heap[a]=temp
    }
}

var minimumEffortPath = function(A) {
    let n=A.length,m=A[0].length,
        moves=[[0,1],[0,-1],[1,0],[-1,0]],
        //holds the lowest distance from the beginning of node (i,j)
        distance=[...Array(n)].map(d=>[...Array(m)].map(d=>Infinity))
        pq=new minBinaryHeap()
    pq.comparator=( (a,b)=>a[0]-b[0])

    pq.push([0,0,0]) // [ Max path distance from the beginning, node's i, node's j ]
    distance[0][0]=0// lowest distance from itself is 0
    while(pq.length()){
        let [d,i,j]=pq.poll() 
        if(i==n-1&&j==m-1)
            return d
        for (const [dx,dy] of moves) //find all its neighbors
            if( i+dx>=0&&i+dx<n&&j+dy>=0&&j+dy<m){ //that are valid
                let ni=i+dx,nj=j+dy,
                    nd=Math.max(d,Math.abs(A[ni][nj]-A[i][j])) //and update their distance 
                if(nd<distance[ni][nj]) //if deemed better,update it and explore it
                    distance[ni][nj]=nd,
                    pq.push([nd,ni,nj])

            }
    }
};



// Kruskal's DSU MST
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

var minimumEffortPath = function(A) {
    let n=A.length,m=A[0].length
    // PUSH ALL THE EDGES ONTO A QUEUE AND THEN SORT EM
    let edges=[]
    for (let i = 0; i < n; i++) 
        for (let j = 0; j < m; j++) {
            if(i>=1)
                edges.push( [(i-1)*m+j, i*m+j, Math.abs(A[i-1][j]-A[i][j])])        
            if(j>=1)    
                edges.push( [i*m+j-1  , i*m+j, Math.abs(A[i][j-1]-A[i][j])])        
        }        
    //edge: [from cell, to cell, their distance]
    // mapping : (i,j)=>i*m+j
    edges.sort((a,b)=>a[2]-b[2]) //sort distance ascending

    let DSU=new UnionFind(n*m)
    //Note: the last edge that will connect the target's group with start's group will contain
    // the result distance, cos I sorted ascending, so it will be the maximum edge of that group
    for(let [n1,n2,dist] of edges)
        //DSU.union will unify n1 and n2  and return true if they were not already unified. 
        if(DSU.union(n1,n2)&&DSU.sameGroup(0,(n-1)*m+m-1)) 
            return dist
    
    return 0
};

//PRIM'S, completely inefficient
var minimumEffortPath = function(A) {
    let n=A.length,m=A[0].length,visited=new Set()
    pq=new minBinaryHeap()
    pq.comparator=( (a,b)=>a[2]-b[2])
        // PUSH ALL THE EDGES ONTO A PRIORITY Queue
    for (let i = 0; i < n; i++) 
        for (let j = 0; j < m; j++) {
            if(i>=1)
                pq.push( [(i-1)*m+j, i*m+j, Math.abs(A[i-1][j]-A[i][j])])        
            if(j>=1)    
                pq.push( [i*m+j-1  , i*m+j, Math.abs(A[i][j-1]-A[i][j])])        
        }        
    let MST=new Set()
    //EXECUTE PRIM'S
    while(MST.size!=n*m-1){
        var [from,to,distance]=pq.poll()
        if(visited.has(to))
            continue
        visited.add(to)
        MST.add([from,to,distance].toString())

        let DeMap=(x)=>
            A[(x/m)>>0][x-m*((x/m)>>0)]     
        //the bottom adjacent node differs by m
        if(to+m<m*n&&!visited.has(to+m)&&(((to/m)>>0)===1-(((to+m)/m)>>0)) )// they also have to be on the same column
            pq.push([to,to+m, Math.abs(DeMap(to)-DeMap(to+m))])
        //the next one differs by one
        if(to+1<m*n&&!visited.has(to+1)&&(((to/m)>>0)==(((to+1)/m)>>0)) )
            pq.push([to,to+1, Math.abs(DeMap(to)-DeMap(to+1))])
    }

    //DO A DFS ON THE MST Starting from source and going up to target
    let seen=new Set(),
        DFS=(i,j,MST,maxDist)=>{
            if(i<0||j<0||i>=n||j>=m||seen.has([i,j].toString()))
                return Infinity
            if(i==n-1&&j==m-1)
                return maxDist
            seen.add([i,j].toString())
            let result=Infinity
            if(i+1<n&&MST.has([i*m+j,(i+1)*m+j,Math.abs(A[i][j]-A[i+1][j])].toString()))
                result=Math.min(result,DFS(i+1,j,MST,
                    Math.max(maxDist,Math.abs(A[i][j]-A[i+1][j]))))
            if(j+1<m&&MST.has([i*m+j,i*m+j+1,Math.abs(A[i][j]-A[i][j+1])].toString()))
                result=Math.min(
                        result,
                        DFS(i,j+1,MST,
                                    Math.max(
                                        Math.abs(A[i][j]-A[i][j+1]),
                                        maxDist)))    
            return result
        }

    return DFS(0,0,MST,0)
};


// D'esopo Pape
var minimumEffortPath = function(A) {
    let n=A.length,m=A[0].length,
        moves=[[0,1],[0,-1],[1,0],[-1,0]],
        dist=[...Array(n)].map(d=>[...Array(m)].map(d=>Infinity)),
        mm=[...Array(n*m)].map(d=>2), //map everything to 2
        q=[ [0,0] ]

    dist[0][0]=0
    while(q.length){
        let [x,y]=q.shift()
        mm[x*m+y]=0
        for (const [dx,dy] of moves) {
            if(x+dx<0||x+dx>=n||y+dy>=m||y+dy<0)
                continue
            let ndist=Math.abs(A[x][y]-A[x+dx][y+dy])
            if(Math.max(dist[x][y],ndist)<dist[x+dx][y+dy]){
                dist[x+dx][y+dy]=Math.max(dist[x][y],ndist)
                let encoded= (x+dx)*m+y+dy
                if(mm[encoded]==2)
                    mm[encoded]=1,
                    q.push([x+dx,y+dy])
                else if(mm[encoded]==0)
                    mm[encoded]=1,
                    q.unshift([x+dx,y+dy])
            }
        }
    }
    return dist[n-1][m-1]
};
console.log(minimumEffortPath(
    [[1,10,6,7,9,10,4,9]]
      
))