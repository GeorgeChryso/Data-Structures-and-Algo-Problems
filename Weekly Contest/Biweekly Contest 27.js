// var canBeEqual = function(target, arr) {
//     let memo={}
//     arr.forEach(d=>memo[d]=(memo[d]||0)+1)
//     for (let i = 0; i < target.length; i++) {
//         if(memo[target[i]]===undefined)return false
//         else memo[target[i]]--        
//     }
//     return Object.values(memo).every(d=>d===0)
// };



// var hasAllCodes = function(s, k) {
//     let memo=new Set()

//     for (let i = 0; i < s.length; i++) {
//         if(i+k<=s.length)memo.add(Number.parseInt(s.slice(i,i+k),2))
//     }  

//     for (let i = 0; i < 2**(k); i++) {
//         console.log(i)
//         if(!memo.has(i))return false        
//     }
//     return true
// };

// console.log(hasAllCodes(
//  //   "00110110",  2+
//     "00110",2
// ))


var checkIfPrerequisite = function(n, prerequisites, queries) {
    class TreeNode{
        constructor(v){
            this.val=v
        }
    }

    let memo=[...Array(n)].map((d,i)=>new TreeNode(i))
    let previous=[...Array(n)].map(d=>new Set())

    for (const [p,next] of prerequisites) {
        previous[next].add(p)
    }
    let dfs=(node,val)=>{
        if(node===null)return [true,[]]
        if(previous[node.val].has(val))return [true,previous[node.val]]
        if(node.val===val)return [true,previous[node.val]]

        let q=[false,[]] 
        previous[node.val].forEach(i=>{
            let z=q[0]?[true,[]]:dfs(memo[i],val)
            if(q[0])return
            q[0]=q[0]||z[0]
            if(z[1])z[1].forEach(d=>previous[node.val].add(d))
        })

        if(q[0])return [true,previous[node.val]]
        return [false,previous[node.val]]
    }
    return queries.map(([prev,next])=>dfs(memo[next],prev)[0])
};


console.log(
    checkIfPrerequisite(
        // 2,
        // [[1,0]],
        // [[0,1],[1,0]]
        5,
[[0,1],[1,2],[2,3],[3,4]],
[[0,4],[4,0],[1,3],[3,0]]
    )

)