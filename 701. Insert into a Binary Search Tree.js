

 function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
   this.right = (right===undefined ? null : right)
}
//iterative
var insertIntoBST = function(root, val) {
     let target=new TreeNode(val)
     if(!root)return target

     let node=root
     while(true){
        if(node.val>val){
            if(node.left)node=node.left
            else{
                node.left=target
                break
            }
        }
        else{
            if(node.right)node=node.right
            else{
                node.right=target
                break
            }
        }
        
     }

     return root
};


//recursive
var insertIntoBST=(root,val,curr=root)=>{
    if(root===null)return new TreeNode(val)
    if(curr.val>val){
        if(curr.left)return insertIntoBST(root,val,curr.left)
        else{
            curr.left=new TreeNode(val)
            return root
        }
    }
    else{
        if(curr.right)return insertIntoBST(root,val,curr.right)
        else{
            curr.right=new TreeNode(val)
            return root
        }
    }
}