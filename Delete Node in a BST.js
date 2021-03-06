// Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

// Basically, the deletion can be divided into two stages:

// Search for a node to remove.
// If the node is found, delete the node.


//essentially i have to replace the node to be deleted with 

var deleteNode = function(root, key) {
    let todel=root,dummyStart=new TreeNode(0,root,root),//dummy node
        todelParent=dummyStart
    while(todel&&todel.val!==key){
        todelParent=todel
        if(todel.val>key)
            todel=todel.left
        else 
            todel=todel.right
    }

    //there is no such key
    if(todel===null)return root
    // no children=> just delete the node 
    if(todel.left===null&&todel.right===null)
        if(todelParent.left&& (todelParent.left.val===todel.val))
            todelParent.left=null
        else if(todelParent.right&&( todelParent.right.val===todel.val))
            todelParent.right=null
    
    // does have a left child=>replace it with its left cousin
    else if(todel.left!==null){
        let leftcousin=todel.left,leftParent=todel
        while(leftcousin&&leftcousin.right!==null){
            leftParent=leftcousin
            leftcousin=leftcousin.right
        }

        if(leftcousin.left!==null){
            leftParent.right=leftcousin.left
        }
        todel.val=leftcousin.val

        if(leftParent.left.val===leftcousin.val)
            leftParent.left=null
        else
            leftParent.right=null
        
    }
    // does have a right child=>replace it with its right cousin
    else{
        let rightcousin=todel.right,rightParent=todel
        while(rightcousin&&rightcousin.left!==null){
            rightParent=rightcousin
            rightcousin=rightcousin.left
        }

        if(rightcousin.right!==null)
            rightParent.left=rightcousin.right
        todel.val=rightcousin.val
        
        if(rightParent.right.val===rightcousin.val)
            rightParent.right=null
        else
            rightParent.left=null
    }
    return dummyStart.left
};

var deleteNode = function(root, key) {
    let todel=root,
        todelParent=root,direction='left'

    //find the node and its direction
    while(todel&&todel.val!==key){
        todelParent=todel
        if(todel.val>key){
            todel=todel.left
            direction='left'
        }
        else{
            todel=todel.right
            direction='right'
        }
    }

    //there is no such key
    if(todel===null)return root
    
    //if it has a right node substitute it with the right cousin (successor)
    if(todel.right){
        if(todel.right.left==null){
            todel.right.left=todel.left
            todelParent[direction]=todel.right
        }
        else{
            let leftmost=todel.right
            while(leftmost.left.left)
                leftmost=leftmost.left
            todel.val=leftmost.left.val
            leftmost.left=leftmost.left.right
        }
    }
    //else just substitute it with its left element
    else{
        todelParent[direction]=todel.left
    }
    return root
};

var deleteNode = function(root, key) {
    // edge case 
    if (!root) 
        return null;
    var node = root, parent,direction;
    
    while (node && node.val !== key) {
        parent = node;
        if (key > node.val) {
            node = node.right;
            direction = 'right';
        } else {
            node = node.left;
            direction = 'left';
        }
    }

    if (node === null) return root
        
    if (node.right) {
        // make the right branch the new parent/root
        // first find the left-most node on the right branch
        let rightBranchLeftMost = node.right;
        while (rightBranchLeftMost.left) 
            rightBranchLeftMost = rightBranchLeftMost.left;
        
        // attach the old root's left to that
        rightBranchLeftMost.left = node.left
        
        if (parent) 
            parent[direction] = node.right;
         else 
            // When we have no parent, we're talking about root
            root = node.right;    
    } 
    else {
        if (parent) 
            parent[direction] = node.left;
        else 
        // When we have no parent, we're talking about root
            root = node.left;  
    }   
    return root;
};