// You are given a binary tree in which each node contains an integer value.

// Find the number of paths that sum to a given value.

// The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).

// The tree has no more than 1,000 nodes and the values are in the range -1,000,000 to 1,000,000.


var ArrayToBinaryTree = A => {
    function TreeNode(A) {
        this.val=A
        this.left=null
        this.right=null
    }
    

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




var pathSum = function(root, sum) {
    

    var counter=0
    //Careful here, soi m creating this in order for the algorithm to avoid repetitive and obsolete work, I only need to check the value of a node itself only once, thats why each time a check is initialized of the same node, i avoid it by storing it in my map
    var dict=new Map()

    function isSum(node,curr=0) {
        if(!node)return
        curr+=node.val
        if(curr==sum){
        counter++}

        if(node.left){
            isSum(node.left,curr)
            if(!dict.has(node.left)){
                dict.set(node.left)
                isSum(node.left)
            }
        }
        if(node.right){
            isSum(node.right,curr)
            if(!dict.has(node.right)){
                dict.set(node.right)
                isSum(node.right)
            }
    
        }
       
    }



    isSum(root)
    return counter
};



console.log(pathSum(
//     ArrayToBinaryTree(
// [1,null,2,null,3,null,4,null,5]
//     ),3


        ArrayToBinaryTree(
[0,1,1]    ),1
))