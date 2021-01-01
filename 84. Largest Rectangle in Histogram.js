// Given n non-negative integers representing the histogram's bar height where the width of each bar is 1, find the area of largest rectangle in the histogram.






// Intuition: At any given index i, we can say A[i] is the height of the current POTENTIAL rectangle we re examining.
// This rectangle starts on some index j, such that j is of course less than i , j<i
// This index j , has to be the first index on the left of i, such that A[j]<A[i], otherwise the length of my current rectangle cannot be A[i].
// Same goes for the end index of my rectangle. It has to be the first index on the right of i, lets say k>i such that A[i]>A[k]


//O(n^2) TLE
//Essentally for Each element, i m searching its leftmost and rightmost FIRST smaller elements. 
// Then a max area will of course be H[i](indexofRightmostSmaller-indexofLeftmostSmaller -1)
// However this is TLE
var largestRectangleArea = function(H) {
  if (!H.length) return 0;

  var MaxAreaIndexCanGive = Array(H.length);

  for (var i in H) {
    var leftLow = Number(i);
    var rightLow = Number(i);
    while (H[i] <= H[leftLow] && leftLow >= 0) leftLow--;
    while (H[i] <= H[rightLow] && rightLow <= H.length-1) rightLow++;

    MaxAreaIndexCanGive[i] =
      H[i] * (rightLow == leftLow ? 1 : rightLow - leftLow - 1);
  }

  return Math.max(...MaxAreaIndexCanGive);
};
// faster? Reduced Readibility
var largestRectangleArea = function(height) {
    if (height.length === 0) return 0;
    const stack = [];
    let maxArea = 0;
  
    for (let i = 0; i <= height.length; i++) {
        const cur = i === height.length ? -1 : height[i];
  
        while (stack.length !== 0 && cur < height[stack[stack.length-1]]) {
            const index = stack.pop();
            const top = height[index];
            const width = stack.length === 0 ? i : i - stack[stack.length-1]-1;
            maxArea = Math.max(maxArea, top * width);
        }
        stack.push(i);
    }
    return maxArea;
  };


// THE COOLEST OF ALL O(n)
// Stack /Monotonic Queue solution , because each element can only be popped from or pushed to the stack only once.  
var largestRectangleArea = function(H) {

    class Stack {
        constructor(){
            this.q=[]
        }
        
        push=(indexOfCurr)=>{
            let lastElement=this.q[this.q.length-1]//current lastelement, (index)
            let valueOfLast=H[lastElement] //its value
            let valueOfCurr=H[indexOfCurr] // the value of my CurrentElement


            if(!this.q.length|| valueOfLast<=valueOfCurr){
                this.q.push(indexOfCurr)
            }
            else if( valueOfLast>valueOfCurr){

                while (valueOfLast>valueOfCurr && this.q.length) {
                   
                        let poppedIndex=this.q.pop() //the index of the first Rightmost
                        let valueOfPopped=H[poppedIndex]   


                        //If there is no Leftmost Smaller element, consider it to be the beginning of the array (index -1)
                        lastElement=this.q[this.q.length-1]||-1

                        valueOfLast=H[lastElement]
    
                        //Calculate The Area of the popped element
                        // WHY THO?
                        //Cos by popping this element I have everything that I need to calculate Its Area.
                        // The valueOfCurr is the RIGHTMOST FIRST SMALLER VALUE, that resulted in popping the valueOFLast, since (valueofCurr<valueOfLast) 
                        // so its index is the RIGHTMOST index we re looking for. 
                        //AND GUESS WHAT?
                        // the value on its LEFT, that means the new Last element of my stack is the  INDEX of the first SMALLER VALUE ON THE RIGHT, we already had that. 
                        let AreaOfPopped=valueOfPopped*(indexOfCurr-lastElement-1 )
                        // console.log(AreaOfPopped,poppedIndex,lastElement)

                        // keep a maximum
                        Max=Math.max(Max,AreaOfPopped)

                } 
                this.q.push(indexOfCurr)
            
            }

        }

        remainder=()=>{
         

            let popped=this.q.pop()
            let valueOfPopped=H[popped]
            

            //If there is no Leftmost Smaller element, consider it to be the beginning of the array
            let lastElement=this.q[this.q.length-1]||-1

            
            // since i m calling this for the remaining elements, that means that whatever remained on my stack DOES NOT HAVE A RIGHTMOST SMALLER ELEMENT AT ALL, SO I CONSIDER IT TO BE THE END OF MY ARRAY
            let AreaOfPopped=valueOfPopped*( (H.length)-lastElement-1 )
            Max=Math.max(Max,AreaOfPopped)

        }



    }

    var Max=0
    var stacky=new Stack

    // this handles all the elements that do have a LeftMost Smaller
    // and RightMost Bigger Elements
    for (var i in H) {
        stacky.push(i)
    }


    // I may still have elements up there, indexes in ascending order that is
    // what do they mean tho?
    // They mean that they have NO RIGHTMOST Bigger Elements. thats why they re still there
    // So i just have to assume that the end of the array is their rightmost bigger element (H.length)
    while(stacky.q.length){
        stacky.remainder()

    }

    return Max
};


//q holds tuples [pos,val]
// Idea: if the rectangles are reduced to an ascending order, we can linearly find out with a left scan what's the biggest rectangle there is. 
// On each iteration, we ensure the rectangles are in increasing order. If a rectangel is to be added that has a smaller value, it pops everything with a gbigger value. During this popping, everything in the q is already in increasing value, so i can still find the biggest rectangle theere is with a right scan, as the end point will always be the first one i m popping. 
var largestRectangleArea =(A)=>{
    let n =A.length,q=[],result=0
    for(let i=0;i<n;i++){
        let curr=[i,A[i]],lastidx=i-1
        while(q.length&&A[i]<=q[q.length-1][1])
            result=Math.max(result, (lastidx-q[q.length-1][0] +1 ) * q[q.length-1][1], (i-q[q.length-1][0]+1)*A[i] ),
            curr[0]=q[q.length-1][0],
            q.pop()
        q.push(curr)
        if(curr[0]!==i)
            q.push([i,A[i]])
    }
    while(q.length)
        result=Math.max(result,(q[q.length-1][0]-q[0][0]+1) *q[0][1] ),
        q.shift()
    return result
}
console.log(largestRectangleArea(
    [5,7,0,7,2,9,2,7,6,8,8]
    ))