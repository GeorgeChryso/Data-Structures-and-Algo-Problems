function TreeNode(A) {
    this.val=A
    this.left=null
    this.right=null
}

var ArrayToBinaryTree = A => {
    //string to array for BTrees

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


 




var sumEvenGrandparent = function(root) {
    let result=0

    let queue=[root]

    let sumOfgchildren=(node)=>{
        let result=0
        let leftchild=null
        let rightchild=null
        if(node.left) leftchild=node.left
        if(node.right) rightchild=node.right
        
        if(leftchild){
            if(leftchild.left)result+=leftchild.left.val
            if(leftchild.right)result+=leftchild.right.val
        }
        if(rightchild){
            if(rightchild.left)result+=rightchild.left.val
            if(rightchild.right)result+=rightchild.right.val
        }
        return result
    }

    while(queue.length){
        let temp=[]
        queue.forEach(d=>{
            if(d.val%2==0)result+=sumOfgchildren(d)
            if(d.left){
                temp.push(d.left)
            }
            if(d.right){
                temp.push(d.right)
            }
        })
        queue=temp
    }
    return result
};




console.log(
    sumEvenGrandparent(
        ArrayToBinaryTree ([6,7,8,2,7,1,3,9,null,1,4,null,null,null,5])
))


var decompressRLElist = function(A) {
    let result=[]
    for (let i = 0; i < A.length; i+=2) {
            for (let j = 0; j <A[i]; j++) {
                result.push(A[i+1])                
            }        
    }
    return result    
};



console.log(
    decompressRLElist(
        [1,2,3,4]
    )
)

var distinctEchoSubstrings = function(A) {
    let memo=Array(A.length).fill(null).map(d=>{})
    memo[0]='d'
    console.log(memo)
    for (let start = 0; start < A.length; start++) {
        for (let end = 0; end < A.length; end++) {
            
        }        
    }
};


console.log(distinctEchoSubstrings(
    'leetcode'
))