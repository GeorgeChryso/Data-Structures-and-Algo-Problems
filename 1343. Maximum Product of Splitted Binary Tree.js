// Given a binary tree root. Split the binary tree into two subtrees by removing 1 edge such that the product of the sums of the subtrees are maximized.

// Since the answer may be too large, return it modulo 10^9 + 7.

function TreeNode(A) {
    this.val=A
    this.left=null
    this.right=null
}


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */



var maxProduct = function(root) {
    let processVal=val=>{
       let potential=(val*(totalSum-val))
       result=Math.max(result,potential)
   }
   let result=-Infinity
   let totalSum=0
   let level=0
   let q=[root]
   let ends={}
   while(q.length){
       let temp=[]
       for (const node of q) {
           totalSum+=node.val
           node.original=Number(node.val)
           if(node.left){
               node.left.prev=node
               temp.push(node.left)
           }
         
           if(node.right){
               node.right.prev=node
               temp.push(node.right)
           }
           
         if(ends[level])ends[level].push(node)
         else ends[level]=[node]
           
       }
       q=temp
       level++
   }

    for (level; level>0; level--) {
        if(ends[level]===undefined)continue
        for (const node of ends[level]) {
            if(node.arr!==undefined){
                node.val+=node.arr.reduce((acc,curr)=>acc+curr)
                processVal(node.val)
            }
            else{
                processVal(node.val)    
            }
                    
            if(node.prev){
                if(node.prev.arr){
                    node.prev.arr.push(node.val)
                }
                else{
                    node.prev.arr=[node.val]
                }
            }
            
        }
        
    }  
  
   return result%1000000007
};





var ArrayToBinaryTree = A => {
 


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



console.log(maxProduct(
    ArrayToBinaryTree(
       // [8,5,10,null,null,5,7,1,2]
              //  [7,8,7,4,null,null,null,null,6]
        //[7,8,7,4,null,null,null,null,6] //252
      //  [2,3,9,10,7,8,6,5,4,11,1] //1025 
       // [1,null,2,3,4,null,null,5,6] //90
          // [1,2,3,4,5,6]g
     [2,3,9,10,7,8,6,5,4,11,1] //1025
)))