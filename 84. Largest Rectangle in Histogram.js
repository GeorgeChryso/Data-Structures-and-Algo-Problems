// Given n non-negative integers representing the histogram's bar height where the width of each bar is 1, find the area of largest rectangle in the histogram.






// Intuition: At any given index i, we can say A[i] is the height of the current rectangle we re examining.
// This rectangle starts on some index j, such that j is of course less than i , j<i
// This index j , has to be the first index on the left of i, such that A[j]<A[i], otherwise the length of my current rectangle cannot be A[i].
// Same goes for the end index of my rectangle. It has to be the first index on the right of i, lets say k>i such that A[i]>A[k]


//O(n^2) TLE
//Essentally for Each element, i m searching its leftmost and rightmost FIRST smaller elements.
// Them a max area will of course be H[i](indexofRightmostSmaller-indexofLeftmostSmaller -1)
// However this is TLE
var largestRectangleArea = function(H) {
  if (!H.length) return 0;

  var MaxAreaIndexCanGive = Array(H.length);

  for (var i in H) {
    var leftLow = Number(i);
    var rightLow = Number(i);
    while (H[i] <= H[leftLow] && leftLow >= 0) leftLow--;
    while (H[i] <= H[rightLow] && rightLow <= H.length) rightLow++;

    MaxAreaIndexCanGive[i] =
      H[i] * (rightLow == leftLow ? 1 : rightLow - leftLow - 1);
  }

  return Math.max(...MaxAreaIndexCanGive);
};



// Stack /Monotonic Queue solution O(n), because each element can only be popped from or pushed to the stack only once. 
var largestRectangleArea = function(H) {

    class Stack {
        constructor(){
            //I will store Indices here.
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


                        //I may never find a smaller element, so the default for my last element is index 0 no matter what
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
            

            //If there is no last element that satisfies what I want, set it -1
            let lastElement=this.q[this.q.length-1]||-1
            let valueOfLast=H[lastElement]
            
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


console.log(largestRectangleArea(
    
    
 //  [1,1]   
    [2,1,5,6,2,3]
))