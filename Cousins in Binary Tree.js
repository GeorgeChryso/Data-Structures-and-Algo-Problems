// In a binary tree, the root node is at depth 0, and children of each depth k node are at depth k+1.

// Two nodes of a binary tree are cousins if they have the same depth, but have different parents.

// We are given the root of a binary tree with unique values, and the values x and y of two different nodes in the tree.

// Return true if and only if the nodes corresponding to the values x and y are cousins..






var isCousins = function(root, x, y) {
    
    if(root.val==x||root.val==y)return x===y
    let q=[root]
    
    while(q.length){
        let memo= new Set()
        let temp=[]
        for (const node of q) {
            if(node.left&&node.right&&((node.left.val==x&&node.right.val==y)||node.left.val==y&&(node.right.val==x)))return false
            if(node.left){
                temp.push(node.left)
                memo.add(node.left.val)
            }
            if(node.right){
                memo.add(node.right.val)
                temp.push(node.right)
            }
        }
        if(memo.has(x)&&memo.has(y))return true
        q=temp
    }
    return false
};