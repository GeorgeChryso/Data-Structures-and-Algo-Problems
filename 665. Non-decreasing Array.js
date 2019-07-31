
// Given an array with n integers, your task is to check if it could become non-decreasing by modifying at most 1 element.

// We define an array is non-decreasing if array[i] <= array[i + 1] holds for every i (1 <= i < n).

// Example 1:
// Input: [4,2,3]
// Output: True
// Explanation: You could modify the first 4 to 1 to get a non-decreasing array.
// Example 2:
// Input: [4,2,1]
// Output: False
// Explanation: You can't get a non-decreasing array by modify at most one element.


function isND(x){

    for (i in x ){
        if(i==0){
            continue;
        }
        if (x[i-1]>x[i] ){
            return false
        }

    }
    return true;
}


var checkPossibility = function(nums) {
 if (nums.length==1){
     return true
 }

var c=0
var q=0

  for ( i in nums){
      if(i==0){continue}

    if(nums[i-1]>nums[i])
    {
      c++
      q=i
      if(c>1){
          return false
      }
    }

  }

  if(c==0){return true}
    q=parseInt(q)

    if (isND( nums.slice(0,q).concat(nums.slice(q+1)))      ||
      isND( nums.slice(0,q+1).concat(nums.slice(q+2)))    ||
      isND( nums.slice(0,q-1).concat(nums.slice(q)))
      )

      {
          

      return true
  }
  return false

  


    
};

console.log( checkPossibility(
    [1,2,5,3]      
    
    ))

/// na vrw socket
// Input: [4,2,3]
// ENA SOCKET MPOREI NA EINAI KAI ANAMESA SE 3 ARITHMOUS HDH 
//  DIATETAGMENOUS
// [1,2,3]
// a(i<i+1<i+2 )
// diff 2->3=>[1,2,3]
            
// mporw na valw opoudhpote opoiondhpote arithmo, kai oxi na allaksw tous hdh uparxontes
//vevaia to ti tha valw tha eksartatai apo ton amesws prohgoumeno kai epomeno
// pote kati den einai non decreasing
// [4,1,2,1]
// otan den exei arketa sockets
// pws orizw ena socket
// se enna array prepei na uparxei h ekseis katastasi
// [a1<=a2<=a3<=a4]
//[1,2,5,1,2,5] ypope

// [1,2,3,5,6,3,3,3,3]        
//[1,2,3,4, 1,   5,6]         true

//      [1,2,3,4, 1,   3,4]         false
//      [1,2,3,4, 1,   2,3]         false


//      [1,2,3,4, 1,   1,2]         false
//      [1,2,3,4, 1,   1,3]         false
//      [1,2,3,4, 1,   1,4]         false
//      [1,2,3,4, 1,   1,5]         false

//      [1,2,3,4, 3,   3,4]         true
//      [1,2,3,5, 4,   4,4]         true

// pws tha me eksipiretei to anomaly
// tha vlepei an to max tou array mexri to provlima
// provlima sto i=3,i+1=4 giati a[3]>a[4]


// prepei na dw to epomeno ti sxesi exei me ta prohgoumena
// 


//[1 ,2 ,3 ,4,1]

// 1st try loLOLOLOLOLDOLZADOLADSOLDOLOLOL
// Runtime: 72 ms, faster than 45.78% of JavaScript online submissions for Non-decreasing Array.
// Memory Usage: 39.1 MB, less than 6.00% of JavaScript online submissions for Non-decreasing Array.
// Next challenges:

//v2 optimized runtime 64ms