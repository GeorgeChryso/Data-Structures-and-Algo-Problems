// Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

// For example, this binary tree [1,2,2,3,4,4,3] is symmetric:


var ArrayToBinaryTree = A => {
    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }
    
    if (!A.length) return null;
    var start = new TreeNode(A[0]);
    var queue = [start];
    var arrayLeftAt = 1;

    //create it with bst
    while (queue.length) {
        var temp=[]
        queue.forEach(d=>{
            if(d!==null){
                
                let leftone=A[arrayLeftAt]
                let rightone=A[arrayLeftAt+1]
                if(leftone!==undefined){
                    if(leftone===null){
                        d.left=null
                    }
                    else{
                        d.left=new TreeNode(leftone)
                        temp.push(d.left)
                    } 
                }

                if(rightone!==undefined){
                    if(rightone===null){
                        d.right=null
                    }
                    else {
                        d.right=new TreeNode(rightone)
                        temp.push(d.right)
                    }
                }
                arrayLeftAt+=2

           
            }
        })
        queue=temp

    }


    return start;
};



//bfs
var isSymmetric = function(root) {
    if(!root)return false

    var q=[root]
    while(q.length){
        let lastelementindex=q.length%2?(q.length-1)/2:(q.length/2-1)
        for (let i = 0; i <=lastelementindex; i++) {
            if((q[i]===null&&q[q.length-1-i]!==null )||
                (q[q.length-1-i]===null&& q[i]!==null)){
                return false
            }

            if(q[i]&&q[q.length-1-i]){
              if(q[i].val!==q[q.length-1-i].val)return false
            }            
        }
        let temp=[]
        q.forEach(d=>{
            if(d){
                temp.push(d.left||null)
                temp.push(d.right||null)
            }
         }
        )
        console.log(temp)
        q=temp
    }

    return true
};


//dp
// essentially for a tree to be symmetrical, its left and righht subtree have to be mirrored versions of each other

// Two trees are a mirror reflection of each other if:

// Their two roots have the same value.
// The right subtree of each tree is a mirror reflection of the left subtree of the other tree.
var isSymmetric = function(node) {


    function isMirror(A, B) {

        //if they re both null
        if (!A && !B) return true;
        //if only one of them is null
        if (!A || !B) return false;

        //  return whether they have the same values
        // and continue the symmetric checks, A outer left B outer right, A  A inner right B inner left
        return (A.val === B.val) 
          && isMirror(A.left, B.right)
          && isMirror(A.right, B.left)
      }



    return isMirror(node, node);
};



console.log(
    isSymmetric(
    ArrayToBinaryTree(
        [2,3,3,4,5,5,4,null,null,8,9,null,null,9,8]
        )
)
)