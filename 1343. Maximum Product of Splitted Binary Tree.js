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


// nice bfs + memo approach
var maxProduct = function(root) {
    let processVal=val=>{
       let potential=(val*(totalSum-val))
       result=Math.max(result,potential)
   } // updates the result considering the value passed, the value is the temporary accumulated sum of a potential edge split
   let result=-Infinity
   let totalSum=0
   let level=0
   let q=[root]
   let ends={} // storing all the references of each level

   //bfs to find the total sum AND create previous references and populate my 
   while(q.length){
       let temp=[]
       for (const node of q) {
           totalSum+=node.val
           if(node.left){
               node.left.prev=node
               temp.push(node.left)
           }
           if(node.right){
               node.right.prev=node
               temp.push(node.right)
           }
           
         if(ends[level])ends[level].push(node) // here i m storing each level's node references
         else ends[level]=[node]
           
       }
       q=temp
       level++
   }
   //starting from the leaves
    for (level; level>0; level--) {
        if(ends[level]===undefined)continue
        for (const node of ends[level]) { // process each node.
            processVal(node.val)
            if(node.prev)node.prev.val+=node.val // pass the acc sum to the parent node
        }
    }  
  
   return result%1000000007
};

// Making use of the turning back nature of dfs, the return statement on each dfs happens from bottom to the root, that's what Im taking advantage of now. 
var maxProduct=root=>{
   
    let dfsSum=(node)=>{
        let leftSum=0,rightSum=0
        if(node.left)leftSum=dfsSum(node.left)
        if(node.right)rightSum=dfsSum(node.right)
        return node.val+rightSum+leftSum
    }
    let totalSum=dfsSum(root) //calculate the total sum

    let result=0
    let dfsSum2=(node)=>{
        let leftSum=0,rightSum=0
        if(node.left)leftSum=dfsSum2(node.left)
        if(node.right)rightSum=dfsSum2(node.right)
        result=Math.max(result,(node.val+rightSum+leftSum)*(totalSum-(node.val+rightSum+leftSum))) // test any temporary sum, because of the nature of dfs return, that's exactly what I want, picture it
        return node.val+rightSum+leftSum
    }
    dfsSum2(root) // essentially just like dfsSum, but with the extra line of handling the temporary returned sums, which is what this exercise is all about.

    return result%1000000007 
}

//same but shortened
var maxProduct = function(root) {
    let sum = 0;
     let mx = 0;
     let d = Math.pow(10,9) + 7;

     //in order for me not to create 2 dfs functions, i create a flag (cm) that will determine whether the result will be updated. same thing less lines
     const check = (node,cm) => {
         let l = node.left ? check(node.left,cm) : 0
         let r = node.right ? check(node.right,cm) : 0;
         let s = node.val + l + r;
         if (cm) mx = Math.max(mx, s * (sum-s));
         return s;
     };
 
     sum = check(root,false);
     check(root,true);
     return mx % d;
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