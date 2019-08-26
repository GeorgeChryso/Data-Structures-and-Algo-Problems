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
    let rem=new Set()
   // let l=arr2.length+1-1
    let objy={}
    arr2.forEach((d,i)=>objy[d]=i)

        // arr2=arr2.map((d,i)=>[d,i])
        // for (let i = 0; i < l; i++) {
        //     if ( arr2[i][0]==undefined){
        //         continue;
        //     }
        //     if(arr2[arr2[i][0]]!=undefined){
        //         if(arr2[arr2[i][0]][0]==arr2[i][0]){ continue}
        //         let temp=arr2[arr2[i][0]]
        //         arr2[arr2[i][0]]=arr2[i]
        //         arr2[i]=temp
        //         i--
                
        //     }
        //     else{
        //         arr2[arr2[i][0]]=arr2[i]
        //         arr2[i]=undefined
        //     }
      
        //     console.log (arr2)

        // }

    // arr1=arr1.filter((a)=>{
    //     if(arr2[a]){
    //         return true}
    //     else {
    //                       rem.push(a)
    //                       return false;
    //                   }})

        
    // arr1.sort((a,b)=>{
    //     if (arr2[a][1]<arr2[b][1]){ return -1}
    //     if (arr2[a][1]>arr2[b][1]){ return 1}
    //     return 0
    // })
    

    //  arr1=arr1.filter((a)=>{
    //     if(objy[a]!=undefined){
    //         return true}
    //     else {
    //                       rem.push(a)
    //                       return false;
    //                   }}).sort((a,b)=>{
    //     if (objy[a]<objy[b]){ return -1}
    //     if (objy[a]>objy[b]){ return 1}
    //     return 0
    // })                

    return arr1
    .filter((a)=>{ if(objy[a]!=undefined){return true}else{rem.add(a);
                  return false;}})
    .sort((a,b)=>{if(objy[a]<objy[b])return -1;
       return (objy[a]>objy[b])? 1:0
    })
    .concat([...rem])

};


var relativeSortArray=( arr1,arr2)=>{
    let rem=new Set()
    let objy={}
 arr2.forEach((d,i)=>objy[d]=i)

return arr1
.filter((a)=>{ if(objy[a]!=undefined){return true}else{rem.add(a);rem=new Set(rem);             return false;}})
.sort((a,b)=>{if(objy[a]<objy[b])return -1;
   return (objy[a]>objy[b])? 1:0
})
.concat([...rem])
}
console.log( relativeSortArray(
   
[28,6,22,8,44,17],
[22,28,8,6]
))


console.log( new Set([1,2,3,4,67,8]))