// Check If a String Is a Valid Sequence from Root to Leaves Path in a Binary Tree







var isValidSequence = function(root, arr) {
    
    let dfs=(node,idx)=>{
        if(node==null&&idx<arr.length)return false
        if(idx==arr.length-1)return node.val==arr[idx]&&node.left===null&&node.right===null
        if(idx==arr.length&&node!==null)return false
        return node.val==arr[idx]&&(dfs(node.left,idx+1)||dfs(node.right,idx+1))
    }

    return dfs(root,0)
};