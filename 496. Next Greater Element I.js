// You are given two arrays (without duplicates) nums1 and nums2 where nums1’s elements are subset of nums2. Find all the next greater numbers for nums1's elements in the corresponding places of nums2.

// The Next Greater Number of a number x in nums1 is the first greater number to its right in nums2. If it does not exist, output -1 for this number.

// Example 1:
// Input: nums1 = [4,1,2], nums2 = [1,3,4,2].
// Output: [-1,3,-1]
// Explanation:
//     For number 4 in the first array, you cannot find the next greater number for it in the second array, so output -1.
//     For number 1 in the first array, the next greater number for it in the second array is 3.
//     For number 2 in the first array, there is no next greater number for it in the second array, so output -1.


var nextGreaterElement = function(nums1, nums2) {
    return  nums1.map(
        (d,i)=>{
            for (let j =(nums2.indexOf(d)<nums2.length?nums2.indexOf(d)+1:j=nums2.length) ; j < nums2.length; j++){
                if(d<nums2[j]){
                    return nums2[j]
                }
                return -1
            }
        }
    )
     
};

//flwruba.exe
var nextGreaterElement = function(nums1, nums2) {
    return  nums1.map(
        (d,i)=>{
            for (let j =nums2.indexOf(d)+1; j < nums2.length; j++){
                if(d<nums2[j]){
                    return nums2[j]
                }
            }
            return -1

        }
    )
     
};


//Dequeue O(N)  + MEMO APPROACH, ANTRIKIA PRAGMATA

// NOTICE: an eixe duplicates opoiadipote lista, tin eixa putsisei, to parakatw den tha ginotan. 
// [ 1,2,3,1,3] px, to memo gia to 1 tha katelhge na htan 3.
// kai tha mas edine 
// [3,3,-1,3,-1] enw to swsto tha htan
// [2,3,-1,3,-1] 

var nextGreaterElement = function(A, B) {
    
    //store the next greater element for EACH element of B
    var memo={

    }
    class dequeue {

        constructor(){
          this.dq=[]
        }

        pushy(x){
    
          //keeps popping all the smaller elements off of the top of the queue, the fact that they re being popped
          /// means that a bigger element was met. Not just any element, the next greater element. 
          //  SO SMART INTENSIFIES. 
          while( this.dq.length &&  x>this.dq[this.dq.length-1]){
            memo[this.dq.pop()]=x
            }
          this.dq.push(x)
        }
     
      }
    
    var deque1=new dequeue
      
    for (let i = 0; i < B.length; i++) {
        deque1.pushy(B[i])
    }
    //ok , IF there are some elements still in the dq, that means that the poor SOULS have no next greater element. 
    // That means that they have no memo :( 
    // In their stead, place -1
    return A.map(d=>memo[d]?memo[d]:-1)

     
};




//
console.log(nextGreaterElement(
  //  [4,1,2],[1,3,4,2]
    [2,4],[1,2,3,4]
))