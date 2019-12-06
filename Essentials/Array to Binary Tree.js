function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}


var ArrayToBinaryTree = A => {
    console.log(`
    ${A}  ...   BECOMES`)

    //string to array for BTrees
    function StringToArray(a) {
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
    var curr = start;
    for (let i = 1; i < A.length; i += 2) {
        start.left = A[i];
        start.right = A[i + 1];
    }

    var queue = [start];
    var level = 2;
    var arrayLeftAt = 0;
    while (queue.length) {
        var children = [];
        for (let i = 0; i < level; i++) {
            arrayLeftAt++;

            if (A[arrayLeftAt] !== undefined) {
                if(A[arrayLeftAt]===null)children.push(null)
                else children.push(new TreeNode(A[arrayLeftAt]));
            }
        }

        var childrenCounter = 0;
        queue.forEach(d => {
            if(d!==null){
                d.left = children[childrenCounter];
                childrenCounter++;
                d.right = children[childrenCounter];
                childrenCounter++;
            }
            else{
                childrenCounter++;
            }
          
        });

        queue = children;
        level *= 2;
    }


    console.log(`
        THIS...    
    \n`,curr)
    return curr;
};


var BinaryTreeToArray = root => {
    console.log(`but... \n`,root, ` BECOMES`)
    
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
            if (res[i]) res[i] = res[i].toString();
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
        "[1,2,3,null,null,4,5]"
    )
))