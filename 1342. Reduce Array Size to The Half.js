// Given an array arr.  You can choose a set of integers and remove all the occurrences of these integers in the array.

// Return the minimum size of the set so that at least half of the integers of the array are removed.


var minSetSize = function(A) {
  let dictionary={}
  for (const item of A) {
      dictionary[item]=(dictionary[item]||0 )+1
  }
  let total=A.length

  let entries=Object.values(dictionary).sort((a,b)=>b-a)

  let acc=0
  for (let i = 0; i < entries.length; i++) {
        acc+=entries[i]      
        if(acc>=Math.floor(total/2))return i+1
  }
  return 1
};


console.log(minSetSize(
    [1000,1000,3,7]
    //[1,2,3,4,5,6,7,8,9,10]
 //   [3,3,3,3,5,5,5,2,2,7]
   // [7,7,7,7,7,7]
  // [1,9]
    ))