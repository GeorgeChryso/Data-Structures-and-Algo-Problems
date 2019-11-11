
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




//stack 
var nextGreaterElements = function(A) {
    const len = A.length
    var res = Array(len).fill(-1)
    var stack = [];
    for(let i=0;i<len*2;++i){


        while(stack.length&&A[stack[stack.length-1]]<A[i%len]){
            res[stack[stack.length-1]]=A[i%len];
            stack.pop();
        }

        if(i<len)   stack.push(i);
    }
    return res;
};


// Clearer (de)queue alla me ameso update sto result, giati exw duplciates
// 
var nextGreaterElements = (A) =>{
    class dequeue {

        constructor(){
          this.dq=[]
          this.indexes=[]
        }
       
    
        pushy( [x,i] ){
    
          // basic monotonic dequeue/stack
          while(this.dq.length&&  x>this.dq[this.dq.length-1][0]){
            let [curVal,curIndex]=this.dq.pop()

                result[curIndex]=x

            }
          this.dq.push([x,i])
        }
        
         
   
    
        
      }

      var dq1=new dequeue
      // filling with -1, cos the elements that will not be affected by my for loop just need to be -1
      var result=Array(A.length).fill(-1)

      // i just need 2 passes btw, so 2*A.length
      // i%A.length always gives me the corresponding element 
      // no matter the passes
      for (let i = 0; i < 2*A.length; i++) {
            dq1.pushy([A[i%A.length],i%A.length])
      }


     
     return result
 
};


console.log(nextGreaterElements(
    [100,1,11,1,120,111,123,1,-1,-100]

))