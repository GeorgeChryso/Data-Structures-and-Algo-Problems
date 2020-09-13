// var numSpecial = function(mat) {
//     let n=mat.length,m=mat[0].length
//     let result=0
   

//     for (let i = 0; i <n; i++) {
//         for (let j = 0; j < m; j++) {
//             if(mat[i][j]==0)
//                 continue
//             let ones=0
//             for (let ii = 0; ii < n; ii++) {
//                 if(ii==i)continue
//                 if(mat[ii][j]==1){
//                     ones++
//                     break
//                 }
//             }
//             for (let jj = 0; jj < m; jj++) {
//                 if(jj==j)continue
//                 if(mat[i][jj]==1){
//                     ones++
//                     break
//                 }
//             }
//             result+=Number(ones==0)
//         }        
//     }
//     return result
// };



// var unhappyFriends = function(n, preferences, pairs) {
//     let result=0
//     let prd={}
//     for (const [x,y] of pairs) {
//         prd[x]=y
//         prd[y]=x
//     }

//     for (let i = 0; i < n; i++) {
//         let partner=prd[i]
//         let xhappy=false,yhappy=false
//         for (let j = 0; j < n-1; j++) {
//             if(preferences[i][j]==partner){
//                 xhappy=true
//                 break
//             }            
//             let alternative=preferences[i][j]
//             let alty=prd[alternative]
//             let xi=0,xalt=0
//             for (let jj = 0; jj < n-1; jj++) {
//                 if(preferences[alternative][jj]==i){
//                     xi=jj
//                 }
//                 else if(preferences[alternative][jj]==alty){
//                     xalt=jj
//                 }
//             }
//             if(xi<xalt){
//                 break
//             }
//         }
//         for (let j = 0; j < n-1; j++) {
//             if(preferences[partner][j]==i){
//                 yhappy=true
//                 break
//             }   
//             let alternative=preferences[partner][j]
//             let alty=prd[alternative]
//             let xi=0,xalt=0
//             for (let jj = 0; jj < n-1; jj++) {
//                 if(preferences[alternative][jj]==partner){
//                     xi=jj
//                 }
//                 else if(preferences[alternative][jj]==alty){
//                     xalt=jj
//                 }
//             }
//             if(xi<xalt){
//                 break
//             }         
//         }
//         result+=Number(xhappy==false)+Number(yhappy=false)
//     }

//     return result
// };


// var minCostConnectPoints = function(points) {
//      if(points.length==2){
//         let [x1,y1]=points[0]
//         let [x2,y2]=points[1]
//         let cost=Math.abs(x1-x2)+Math.abs(y1-y2)
//         return cost
//      }
//      let edges=[],n=points.length
//      for (let i = 0; i < n; i++) {
//         for (let j = i+1; j < n; j++) {
//             let [x1,y1]=points[i]
//             let [x2,y2]=points[j]
//             let cost=Math.abs(x1-x2)+Math.abs(y1-y2)
//             edges.push([i,j,cost])            
//         }         
//      }

//      //optional(incase im not given the total number of different Vertices)
//      let diffVertices=new Set()
//      //sort ascending + check the total number of Vertices
//      edges.sort(([source,to,cost],[source2,to2,cost2])=>{
//          diffVertices.add(source) 
//          diffVertices.add(to)
//          diffVertices.add(source2)
//          diffVertices.add(to2)
//          return cost-cost2
//          }
//      )
 
//      let uf=new UnionFind
//      // The construction is based on a mapping
//      // essentially mapping my Vertices into a number
//      let mapping={}
//      let id=0 
//      diffVertices.forEach(d=>mapping[d]=id++)
//      uf.construction(diffVertices.size)
//      let result=0
//      for (const [source,to,cost] of edges) {
//          // the MST consists of N-1 nodes N being the total number of Vertices
//          //if they re not in the same group, Unite the groups amd push said edge to my result
//          if(!uf.sameGroup(mapping[source],mapping[to])){
//              uf.union(mapping[source],mapping[to])
//              result+=cost
//          }
//      }
 
//      return result
// };



// class UnionFind {

//     constructor(){
//         //the number of elements in this union find
//         this.size
//         //tracks the sizes of each of the components(groups/sets)
//         this.sz
//         //number of components(groups) in the union find
//         this.numComponents
//         //points to the parent of i, if id[i]=i, i is a root node
//         this.id=[] 
//     }

//     //construction -O(n) n=size:The total number of elements
//     //put every element into its own group
//     construction(size){
//         if(size<=0)return 'Wrong size'
//         this.size=this.numComponents=size 
//         this.sz=[...Array(size)] 
//         this.id=[...Array(size)] 

//         for (let i = 0; i < size; i++) {
//             this.sz[i]=i     
//             this.id[i]=i            
//         }
//     }

//     //returns to which component (group) my element belongs to 
//     // α(n) --Amortized constant time 
//     // Update: Also compresses the paths so that each child points to its 
//     // parent
//     find(element){
//         let root=element
//         while(root!=this.id[root])root=this.id[root]

//         // Compression, point the element to its parent if its not already pointed
//         while(element!=root){
//             let next=this.id[element]
//             this.id[element]=root
//             element=next
//         }
        
//         return root
//     }   

//     //Unifies the sets containing A and B
//     // α(n) --Amortized constant time 
//     union(A,B){
//         let root1=this.find(A)
//         let root2=this.find(B)

//         // I want to put the set with fewer elements 
//         // to the one with more elemenets


//         if(this.sz[root1]<this.sz[root2]){
//             this.sz[root2]+=this.sz[root1]
//             this.id[root1]=this.id[root2]
//         }
//         else {
//             this.sz[root1]+=this.sz[root2]
//             this.id[root2]=this.id[root1]
//         }

//         this.numComponents-- //cos 1 less group
//     }

//     sameGroup=(A,B)=>this.find(A)==this.find(B)
//     sizeOfGroup=(A)=>this.sz[this.find(A)]
//     //total size of elements inthe Union Find set
//     size=()=>this.size
//     totalGroups=()=>this.numComponents

// }


var isTransformable = function(s, t) {
    let n=s.length,m=t.length
    if(n!=m)return false
    s=s.split(''),t=t.split('')
    let freq={}
    for (const num of s) {
        freq[num]=(freq[num]||0)+1
    }
    for (const num of t) {
        if(freq[num]===undefined)
            return false
        freq[num]--
    }

    if(Object.values(freq).some(d=>d!=0))
        return false
    freq={}
    for (const i in s) {
        if(freq[s[i]]==undefined){
            freq[s[i]]=[i]
        }
        else
            freq[s[i]].push(i)
    }

    for (let i = 0; i < n; i++) {
        console.log('as')

        let wanted=t[i],wantedpos=freq[wanted].shift()
        if(wantedpos<i)
            return false
        let curr=0
        while(s[i]!==t[i]){
            console.log('as')
            console.log(i,wantedpos)

            if(curr>=n||wantedpos<i)
                return false
            [s[wantedpos],s[wantedpos-1]]=[s[wantedpos-1],s[wantedpos]]
            wantedpos--
            curr++
        }

    }
    console.log(true)

    return true
};

console.log(isTransformable(
    "84532",
"34852"
))
