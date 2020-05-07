
// Given two binary trees original and cloned and given a reference to a node target in the original tree.

// The cloned tree is a copy of the original tree.

//js reference comparison with ==
var getTargetCopy = function(original, cloned, target) {
    let result
    let dfs=node=>{
        if(node.val==target.val){
            result= node
        }
        if(node.left) dfs(node.left)
        if(node.right) dfs(node.right)
    }
    dfs(cloned)
    return result
};