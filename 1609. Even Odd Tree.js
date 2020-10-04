// A binary tree is named Even-Odd if it meets the following conditions:

// The root of the binary tree is at level index 0, its children are at level index 1, their children are at level index 2, etc.
// For every even-indexed level, all nodes at the level have odd integer values in strictly increasing order (from left to right).
// For every odd-indexed level, all nodes at the level have even integer values in strictly decreasing order (from left to right).
// Given the root of a binary tree, return true if the binary tree is Even-Odd, otherwise return false.


// Simple bfs
var isEvenOddTree = function(root) {
    if(root.val%2==0)
        return false
    let q=[root]
    let currlevel=1
    while(q.length){ 
        let temp=[]   
     
        for (let node of q) {
            if(node&&node.left)
                temp.push(node.left)
            if(node&&node.right)
                temp.push(node.right)      
        }
        
        //check for breaking conditions
        if(currlevel%2==0){ //check if any item is bigger than its next or is even
            if(temp.length&&temp[0].val%2==0)
                return false
            for (let i = 0; i < temp.length-1; i++) 
                if(temp[i].val>=temp[i+1].val||temp[i].val%2==0||temp[i+1].val%2==0)
                    return false                
        }
        else{//check if any item is smaller than its next or is odd
            if(temp.length&&temp[0].val%2==1)
                return false
            for (let i = 0; i < temp.length-1; i++) 
                if(temp[i].val<=temp[i+1].val||temp[i].val%2==1||temp[i+1].val%2==1)
                    return false                
        }

        q=temp
        currlevel++
    }
    return true
};