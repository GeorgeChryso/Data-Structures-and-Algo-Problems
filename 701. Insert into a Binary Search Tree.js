


var insertIntoBST = function(root, val) {
     function TreeNode(val, left, right) {
             this.val = (val===undefined ? 0 : val)
             this.left = (left===undefined ? null : left)
            this.right = (right===undefined ? null : right)
     }

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