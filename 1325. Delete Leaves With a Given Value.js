// Given a binary tree root and an integer target, delete all the leaf nodes with value target.

// Note that once you delete a leaf node with value target, if it's parent node becomes a leaf node and has the value target, it should also be deleted (you need to continue doing that until you can't).


//2x bfs normal n reverse  O(n) space
var removeLeafNodes = function(root, target) {
    
    let nodez=[[root]]
    let q=[root]
    
    while(q.length){
        let temp=[]
        for (const node of q) {
            if(node.left)temp.push(node.left)
            if(node.right)temp.push(node.right)
        }
        nodez.push(temp)
        q=temp
    }

    while(nodez.length){
        let curr=nodez.pop()
        for (const node of curr) {
            if(node.left||node.right){
                if(node.left&&node.left.del)node.left=null
                if(node.right&&node.right.del)node.right=null
            }
            if(!node.left&&!node.right){
                if(node.val===target){
                    node.del=true
                }
            }
        }

    }

    if(root.left||root.right){
        return root
    }
    else{
        if(root.val==target)return null
        else return root
    }
};