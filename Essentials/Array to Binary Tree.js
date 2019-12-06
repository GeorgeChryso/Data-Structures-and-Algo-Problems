function TreeNode(val) {
       this.val = val;
       this.left = this.right = null;
    }


var ArrayToBinaryTree=(A)=>{
    A=A.split('');
    if(!A.length)return null

    var start=new TreeNode(A[0])
    var curr=start
    for (let i = 1; i < A.length; i+=2) {
        start.left=A[i]
        start.right=A[i+1]           
    }

    var queue=[start]
    var level=2
    var arrayLeftAt=0
    while(queue.length){

        var children=[]
        for (let i = 0; i < level; i++) {
            arrayLeftAt++

            if(A[arrayLeftAt]!==undefined){
                children.push(new TreeNode(A[arrayLeftAt]))            
            }
        }   

        var childrenCounter=0
        queue.forEach(
            d=>{
                d.left=children[childrenCounter]
                childrenCounter++
                d.right=children[childrenCounter]
                childrenCounter++
            }
        )
        
        queue=children;
        level*=2
    }

    return curr
}

