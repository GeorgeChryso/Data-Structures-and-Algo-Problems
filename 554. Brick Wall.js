// There is a brick wall in front of you. The wall is rectangular and has several rows of bricks. The bricks have the same height but different width. You want to draw a vertical line from the top to the bottom and cross the least bricks.

// The brick wall is represented by a list of rows. Each row is a list of integers representing the width of each brick in this row from left to right.

// If your line go through the edge of a brick, then the brick is not considered as crossed. You need to find out how to draw the line to cross the least bricks and return the number of crossed bricks.

// You cannot draw a line just along one of the two vertical edges of the wall, in which case the line will obviously cross no bricks.

var leastBricks = function(A) {
    var M=[]
    A.forEach(d=>{
        let Mrow=[]
        d.forEach((r,z)=>{
            if(r==1)Mrow.push(1)
            else{
            for (let i = 0; i < (2*r-1); i++) {
                    Mrow.push(1)
                    
            }
              }
            if(z!=d.length-1)Mrow.push(0)
        })
        M.push(Mrow)
    })
    var count1min=Infinity

    for (let i = 0; i < M[0].length; i++) {
        var temp1=0
        for (let j = 0; j < M.length; j++) {
            if(M[j][i]==1)temp1++
        }
        count1min=Math.min(count1min,temp1)        
    }
    return count1min
};

console.log(leastBricks(
    [[1,2,2,1],
        [3,1,2],
        [1,3,2],
        [2,4],
        [3,1,2],
        [1,3,1,1]]
))