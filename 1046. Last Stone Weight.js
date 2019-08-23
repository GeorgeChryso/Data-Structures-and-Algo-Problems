


var lastStoneWeight = function(A) {
    while(A.length>1){
             A= A.sort((a,b)=>a-b)
                let len=A.length    
        if( A[len-2]==A[len-1]){
                A.splice(len-2,2)
            
        }
        else{
            A[len-1]=A[len-1]-A[len-2]
              A.splice(len-2,1)
        }
    }
    return A[0]==undefined?0:A[0]
};

var lastStoneWeight = function (stones) {
    stones.sort((a, b) => a - b);
    while (stones.length > 1) {
        let a = stones.pop();
        let b = stones.pop();
        let diff = a > b ? a - b : b - a;
        if (stones.length === 0) {
            stones.unshift(diff);
        } else if (diff > 0) {
            let i = 0;
            for (; i < stones.length; i++) {
                if (stones[i] > diff) {
                    stones.splice(i, 0, diff)
                    break;
                }
            }
            if (i >= stones.length) {
                stones.push(diff);
            }
        }
    }
    return stones[0];
};

console.log(lastStoneWeight(
   

    [9,3,2,10]
        ))