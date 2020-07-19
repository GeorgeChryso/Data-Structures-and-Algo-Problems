


// Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

// Basically, the deletion can be divided into two stages:

// Search for a node to remove.
// If the node is found, delete the node.
// Note: Time complexity should be O(height of tree).





//When there is no previous attribute.
var deleteNode = function(root, key) {
    //search for the node with the corresponding key
    let parent=null
    let target=root
    while(target!==null){
        if(key==target.val)break
        parent=target
        if( key<target.val)target=target.left
        else target=target.right
    }
    if(target===null)return root
    //no left
    if(!target.left){
        if(parent===null)return target.right
        if(parent.val>key)parent.left=target.right
        else parent.right=target.right
    }
    //no right
    else if (!target.right){
        if(parent===null)return target.left
        if(parent.val>key)parent.left=target.left
        else parent.right=target.left
    }
    // both present
    else{
    //search for the successor of the required node
    //( the minimum element of its right subtree 
    //OR  (when there is no right subtree) the (grand)parent with a value bigger than it) (which is not this case, now we just have to find the successor which has to be located on the right subtreee)
        let succ=target.right
        if(!succ.left){
            target.val=target.right.val
            target.right=target.right.right||null
            return root
        }

        while(true){
            if(!succ.left.left){
                target.val=succ.left.val
                succ.left=succ.left.right //THAT IS THE MOST IMPORTANT STEP.
                // A SUCCESSOR, MIGHT HAVE A RIGHT CHILD, YOU NEED TO IMMEDIATELY REPLACE IT WITH ITS RIGHT CHILD
                break
            } 
            succ=succ.left
        }
    } 
    return root
    
};