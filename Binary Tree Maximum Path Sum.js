// Given a non-empty binary tree, find the maximum path sum.

// For this problem, a path is defined as any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The path must contain at least one node and does not need to go through the root.






var maxPathSum = function(root) {
  let result=-Infinity


  let dfs=(node)=>{
    let L=node.left?dfs(node.left):-Infinity
    let R=node.right?dfs(node.right):-Infinity
    
    result=Math.max(result,L+node.val,R+node.val,L+R+node.val,node.val)
    return Math.max(L,R,0)+node.val
  }

  dfs(root)


  return result
};