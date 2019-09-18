
var nextGreaterElements = function(A) {
    return A.map((d,j)=>{
                for (let i = j+1; i < A.length; i++) {
                    if(d<A[i])return A[i]       
                }
                for (let i =0; i < j; i++) {
                    if(d<A[i])return A[i]       
                }
                return -1  
                }
                )
};

//slow

var nextGreaterElements = function(A) {
    var answ=[]
    var stack=[]
    var stacky=(i)=>{
        console.log(stack)
        while(stack.length!=0&&A[i]>=stack[0]){
            stack.shift()
            console.log(stack)

        }
        if(!stack.length)answ[i]=-1
        else answ[i]=stack[0]
        stack.unshift(A[i])
        console.log(stack)

    }

    for (let i = A.length-1 ; i>=0 ; i--) {
        stacky(i)        
    }
    for (let i = A.length-1 ; i>=0 ; i--) {
        stacky(i)        
    }
    return answ
};

console.log(nextGreaterElements(
    [1,2,1]
))

var nextGreaterElements = function(nums) {
    const len = nums.length, res = Array(len).fill(-1), stack = [];
    for(let i=0;i<len*2;++i){
        while(stack.length&&nums[stack[stack.length-1]]<nums[i%len]){
            res[stack[stack.length-1]]=nums[i%len];
            stack.pop();
        }
        if(i<len)   stack.push(i);
    }
    return res;
};