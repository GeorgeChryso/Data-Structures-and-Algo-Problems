

var ArrayToBinaryTree = A => {
    //string to array for BTrees
    function StringToArray(a) {
        if(a.length<=2)return []
        let res = a.replace(/[\[\]']/g, '').split(','); //.map(Number)
        for (let i = 0; i < res.length; i++) {
            if (res[i] === 'null') {
                res[i] = null;
            } else res[i] = Number(res[i]);
        }

        return res;
    }
    A = StringToArray(A);
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


var BinaryTreeToArray = root => {
    console.log(`but... \n`,root, ` BECOMES`)
    if(!root)return '[]'
    var result = [];

    var queue = [root];

    while (queue.length) {
        let stack = [];
        queue.forEach(d => {
            if (d === null) {
                result.push(null);
            } else {
                result.push(d.val);
                if (d.left !== undefined) stack.push(d.left);
                if (d.right !== undefined) stack.push(d.right);
            }
        });
        queue = stack;
    }


    function ArrayToString(res) {
        for (let i = 0; i < res.length; i++) {
            if (res[i]!==null) res[i] = res[i].toString();
            else res[i] = 'null';
        }
        res[0] = '[' + res[0];
        res[res.length - 1] = res[res.length - 1] + ']';
        res = res.join(',');
        return res;
    }

    var end=ArrayToString(result)
    console.log(`this... \n`,end)
    return end;
};

console.log(BinaryTreeToArray(
    ArrayToBinaryTree(
        "[5,2,3,null,null,2,4,3,1]"
      // "[1,2,3,null,null,4,5]"
     //  "[]"
     //   "[5,2,3,null,null,2,4,3,1]"
      // "[-1,0,1]"
     //
     //"[1,2,null,3,null,4,null,5]"
    )
))