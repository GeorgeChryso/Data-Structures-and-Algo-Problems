// var minOperations = function(logs) {
//     let n=logs.length
//     let stack=[]
//     for (let i = 0; i < n; i++) {
//         if(logs[i]=='../'){
//             if(stack.length){
//                 stack.pop()

//             }
//             continue
//         }
           
        
//         if(logs[i]=='./')
//             continue

//         else{
//             stack.push(1)
//         }
//     }
//     return stack.length
// };


// var minOperationsMaxProfit = function(customers, boardingCost, runningCost) {
    
//     let max=-1,maxidx=0,n=customers.length,c=0,totalboarded=0
//     let totalpass=customers.reduce((acc,curr)=>acc+curr)
//     for (let i = 0; i <n&&totalboarded<totalpass; i++) {
//         let totalcost=0
//         if(i<n)c+=customers[i]
//         if(c-4>=0){
//             totalboarded+=4
//             c-=4

//         }
//         else{
//             totalboarded+=c
//             c=0
//         }

//         totalcost=totalboarded*boardingCost-(i+1)*runningCost
//         if(totalcost>max){
//             max=totalcost
//             maxidx=i+1
//         }

//     }
//     if(max==-1)
//         return -1
    
//     return maxidx
// };

// var node = function(name) {
//     this.name=name
//     this.children={}
//     this.isdead=false
// };
// var ThroneInheritance = function(kingName) {
//     this.kingName=kingName
//     this.pointers={}
//     this.root=new node(kingName)
//     this.pointers[kingName]=this.root
//     this.curr=root
// };

// /** 
//  * @param {string} parentName 
//  * @param {string} childName
//  * @return {void}
//  */
// ThroneInheritance.prototype.birth = function(parentName, childName) {
//     this.pointers[parentName].children[childName]=new node(childName)
//     this.pointers[childName]=this.pointers[parentName].children[childName]
// };

// /** 
//  * @param {string} name
//  * @return {void}
//  */
// ThroneInheritance.prototype.death = function(name) {
//     this.pointers[name].isdead=true
// };

// /**
//  * @return {string[]}
//  */
// ThroneInheritance.prototype.getInheritanceOrder = function() {
//     let res=[]
//     let dfs=(node)=>{
//         if(!node)
//             return
//         if(node.isdead==false)
//             res.push(node.name)
//         Object.values(node.children).forEach(
//             d=>dfs(d)
//         )
        
//     }
//     dfs(this.root)
//     return res
// };



// var maximumRequests = function(n, requests) {
    
//     let adj=[...Array(n)].map(d=>[...Array(n)].map(d=>0))

//     for (const [f,t] of requests) {
//         adj[f][t]++
//     }
    
//     let bfs=(rGraph,s,t,parent)=>{
//         let visited=[...Array(n)].map(d=>false)
//         let q=[]
//         q.push(s)
//         visited[s]=true
//         parent[s]=-1
//         while (q.length) 
//         { 
//             let u = q.pop()
  
//             for (let v=0; v<n; v++) 
//             { 
//                 if (visited[v]==false && rGraph[u][v] > 0) 
//                 { 
//                     q.push(v)
//                     parent[v] = u; 
//                     visited[v] = true; 
//                 } 
//             } 
//         } 
//         return visited[t]==true
//     }

//     let fordFulkerson=(graph,s,t)=>{
//         let rGraph=[...Array(n)].map(d=>[...Array(n)].map(d=>0)),max_flow=0
//         for (let i = 0; i < n; i++) {
//             for (let j = 0; j < n; j++) {
//                 rGraph[i][j]=graph[i][j]                
//             }            
//         }
//         let parent=[...Array(n)]
//         while(bfs(rGraph,s,t,parent)){
//             let path_flow=Infinity,u
//             for (let v = t; v !=s; v=parent[v]) {
//                 u=parent[v]    
//                 path_flow = Math.min(path_flow, rGraph[u][v]); 
//             }

//             for (let v=t; v != s; v=parent[v]) { 
//                 u = parent[v]; 
//                 rGraph[u][v] -= path_flow; 
//                 rGraph[v][u] += path_flow; 
//             } 
//             max_flow += path_flow; 

//         }
//         return max_flow; 

//     }
//     let len=
//     return mx
// };



var maximumRequests = function(n, requests) {
    
    let result=0
    for (let i = 1; i < 2**requests.length; i++) {
        let s=[...Array(n)].map(d=>[0,0]),r=0
       ,cur=0,mask=i
       while(mask){
           if( mask&1){
                let [f,t]=requests[cur]
                s[f][0]++
                s[t][1]++
                r++
           }
           mask>>=1
           cur++
       }         
       if(s.every(([f,t])=>f==t))
        result=Math.max(result,r)
    }
    return result
};

var maximumRequests = function(n, requests) {
    let result=0
    for (let i = 1; i < 2**requests.length; i++) {
        let s=[...Array(n)].map(d=>0),r=0
       ,cur=0,mask=i
       while(mask){
           if( mask&1){
                let [f,t]=requests[cur]
                s[f]++
                s[t]--
                r++
           }
           mask>>=1
           cur++
       }         
       if(s.every(d=>d==0))
           result=Math.max(result,r)
    }
    return result
};
console.log(maximumRequests(
    3,
[[1,2],[1,2],[2,2],[0,2],[2,1],[1,1],[1,2]]
))