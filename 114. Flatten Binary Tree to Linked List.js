// Given a binary tree, flatten it to a linked list in-place.

// For example, given the following tree:

//     1
//    / \
//   2   5
//  / \   \
// 3   4   6
// The flattened tree should look like:

// 1
//  \
//   2
//    \
//     3
//      \
//       4
//        \
//         5
//          \
//           6



var flatten = function(root) {
    if(!root||(!root.left&&!root.right))return root
    let curr=root
    let q=[]
    let dfs=node=>{
        if(node===null)return
        q.push(node)
        dfs(node.left)
        dfs(node.right)
    }  
    dfs(root)
    while(q.length){
        curr.left=null
        curr.right=q.shift()
        curr=curr.right
    }
    return root
};