
// Given two binary trees original and cloned and given a reference to a node target in the original tree.

// The cloned tree is a copy of the original tree.

//simple dfs for unique value
var getTargetCopy = function(original, cloned, target) {
    let result
    let dfs=node=>{
        if(node.val==target.val)result= node
        else (node.left&&dfs(node.left))||(node.right&& dfs(node.right))
    }
    dfs(cloned)
    return result
};

//dfs js reference comparison with ==
//kewlkids
var getTargetCopy = function(original, cloned, target) {
    let result
    let dfs=(node,bode)=>
        (node==target)?result= bode:
        (node.left&&dfs(node.left,bode.left))||(node.right&& dfs(node.right,bode.right))
    dfs(original,cloned)
    return result
};
