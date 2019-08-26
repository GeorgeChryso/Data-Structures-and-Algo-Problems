// Given two arrays arr1 and arr2, the elements of arr2 are distinct, and all elements in arr2 are also in arr1.

// Sort the elements of arr1 such that the relative ordering of items in arr1 are the same as in arr2.  Elements that don't appear in arr2 should be placed at the end of arr1 in ascending order.

 

// Example 1:

// Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
// Output: [2,2,2,1,4,3,3,9,6,7,19]
 

// Constraints:

// arr1.length, arr2.length <= 1000
// 0 <= arr1[i], arr2[i] <= 1000
// Each arr2[i] is distinct.


var relativeSortArray = function(arr1, arr2) {
    let rem=[]
    let l=arr2.length+1-1
        for (let i = 0; i < l; i++) {
            console.log(i,l)
            if(arr2[arr2[i]]!=null){
                let temp=arr2[arr2[i]]
                arr2[arr2[i]]=arr2[i]
                arr2[i]=temp
                i--
                continue;
            }
            else{
                arr2[arr2[i]]=arr2[i]
                arr2[i]=null
            }
            console.log(arr2)

        }
     
    // arr1=arr1.filter((a)=>{
    //     if(arr2.indexOf(a)!=-1){
    //         console.log(a,true)
    //         return true}
    //     else {
    //                       rem.push(a)
    //                       console.log(a,false)

    //                       return false;
    //                   }})
    //                   console.log(arr1)

        
    // arr1.sort((a,b)=>{
    //     if (arr2.indexOf(a)<arr2.indexOf(b)){ return -1}
    //     if (arr2.indexOf(a)>arr2.indexOf(b)){ return 1}
    //     return 0
    // })
    // return arr1.concat(rem.sort((a,b)=>a-b))
};
console.log( relativeSortArray(
    [2,3,1,3,2,4,6,7,9,2,19], [2,1,4,3,9,6]
))