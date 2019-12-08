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



// naive search, relatively slow cos i m checking every possible sum there is from every node downwards.
var pathSum = function(root, sum) {
    

    var counter=0
    //Careful here, so I m creating this in order for the algorithm to avoid repetitive and obsolete work, I only need to check the value of a node itself only once, thats why each time a check is initialized of the same node, i avoid it by storing it in my map
    var dict=new Map()

    function isSum(node,curr=0) {
        if(!node)return
        curr+=node.val
        if(curr==sum){
        counter++}

        if(node.left){
            isSum(node.left,curr)

            // I only need to check the value of a node itself only once
            if(!dict.has(node.left)){
                dict.set(node.left)
                isSum(node.left)
            }
        }
        if(node.right){
            isSum(node.right,curr)

            // I only need to check the value of a node itself only once
            if(!dict.has(node.right)){
                dict.set(node.right)
                isSum(node.right)
            }
    
        }
       
    }



    isSum(root)
    return counter
};


//so this is a little bit more sophisticated 
// but still slow because  copying an object takes time

// essentially check LC 560, Prefix Sum+Memo
var pathSum=function(root,sum){

    let counter=0
    var prefIt=(node,currSum,dict)=>{
        if(!node)return 
        currSum+=node.val
        counter+=(dict[currSum-sum]||0)


        dict[currSum]=(dict[currSum]||0) +1

        if(node.left)prefIt(node.left,currSum,dict)

        
        if(node.right){
            if(node.left)dict[currSum+node.left.val]=(dict[currSum+node.left.val]-1)||0
           
            prefIt(node.right,currSum,dict)  
            dict[currSum+node.right.val]-=1
        }
    }


    prefIt(root,0,{0:1})

 
    return counter
}


//using a map, better
var pathSum = function(root, sum) {
    if (!root) return 0
    const map = new Map();
    return helper(root, sum, map, 0)
};

function helper(node, target,map, currentSum ){
    //base case
    if (!node) return 0;
    currentSum += node.val;

    let count = 0;
    if (map.has(currentSum-target)){
        count += map.get(currentSum-target)
    }
    if (currentSum===target){
        count++
    }


    //update map
    let currentSumCount = map.has(currentSum)? map.get(currentSum)+1: 1
    map.set(currentSum, currentSumCount )

    count+= helper(node.left, target, map, currentSum);
    count+= helper(node.right, target, map, currentSum);
    
    //backtrack by updating map
    map.set(currentSum, currentSumCount-1)
    // console.log(count)
    return count;
    
}
console.log(pathSum(
    ArrayToBinaryTree(
//[1,null,2,null,3,null,4,null,5]
//[10,5,-3,3,2,null,11,3,-2,null,1]
//[1,-2,-3]
[1,-2,-3,1,3,-2,null,-1]

    ),
    //3
    //8
   // -1
    3     
))