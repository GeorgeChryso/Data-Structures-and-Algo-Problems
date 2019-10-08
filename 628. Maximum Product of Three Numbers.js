// Given an integer array, find three numbers whose product is maximum and output the maximum product.

// Example 1:

// Input: [1,2,3]
// Output: 6
 

// Example 2:

// Input: [1,2,3,4]
// Output: 24
 

// Note:

// The length of the given array will be in range [3,104] and all elements are in the range [-1000, 1000].
// Multiplication of any three numbers in the input won't exceed the range of 32-bit signed integer.


var maximumProduct = function(A) {
 

//
if(A.length==3)return A[0]*A[1]*A[2]

A=A.sort((a,b)=>a-b)

if(A[A.length-1]==0){
    return 0
}

if(A[A.length-1]<0 || A[0]>=0){
    return A[A.length-1]*A[A.length-2]*A[A.length-3]
}

for (var i = 0; i < A.length; i++) {
    if(A[i]>=0) break
}

if (i==1) return A[A.length-1]*A[A.length-2]*A[A.length-3]




};
//brute 
var maximumProduct=(A)=>{
if(A.length==3)return A[0]*A[1]*A[2]


var objy={
    minT:undefined,
    minP:1,

    clll:-0.5,
    cll:-0.6,
    cl:-0.7,

    0:undefined,

    maxP:-2,
    maxPP:-1,
    maxT:undefined
}
function exCl(a){
 if(a>objy['clll']){
     objy['cl']=objy['cll']
     objy['cll']=objy['clll']
     objy['clll']=a
     return
 }

 if(a>objy['cll']){
    objy['cl']=objy['cll']
    objy['cll']=a
    return
 }

 if(a>objy['cl']){
    objy['cl']=objy['cll']
    objy['cll']=a
    return
 }
 return
}

    for (let i = 0; i < A.length; i++) {


        if(A[i]<0&&objy['minT']===undefined){
            objy['minP']=objy['minT']
            objy['minT']=A[i]
            continue
        }
        if(A[i]>0 && objy['maxT']===undefined){
            objy['maxP']=objy['maxPP']
            objy['maxPP']=objy['maxT']
            objy['maxT']=A[i]
            continue
        }

        if(A[i]<=objy['minT']){
            exCl(A[i])
            objy['minP']=objy['minT']
            objy['minT']=A[i]
            continue
        }
        if(A[i]<objy['minP'] || objy['minP']==undefined){
            exCl(A[i])
            objy['minP']=A[i]
            continue
        }
        if(!A[i]){
            objy[0]=true
            continue
        }

        if(A[i]>=objy['maxT']|| objy['maxT']===undefined){
            objy['maxP']=objy['maxPP']
            objy['maxPP']=objy['maxT']
            objy['maxT']=A[i]
            continue
        }

        if(A[i]>=objy['maxPP']|| objy['maxPP']===undefined){
            objy['maxP']=objy['maxPP']
            objy['maxPP']=A[i]
            continue
        }

        if(A[i]>=objy['maxP'] || objy['maxP']===undefined){
            objy['maxP']=A[i]
            continue
        }

    }
    console.log(objy)

   

     if(objy['maxT']===undefined){
        if(objy[0]){
            return 0
        }
        else{
            return objy['cl']*objy['cll']*objy['cll']
        }
    }
    
    if(objy['minT']===undefined){
        if( ! objy['maxP'] || !objy['maxPP']) return 0

        return objy['maxT']*objy['maxPP']*objy['maxP']
    }

    if( objy['minP']===undefined){
        if( ! objy['maxP'] || !objy['maxPP']) return 0
        return objy['maxT']*objy['maxPP']*objy['maxP']
    }


        return Math.max(objy['maxT']*objy['minP']*objy['minT'], objy['maxT'] && objy['maxPP'] && objy['maxP']? 
        objy['maxT'] * objy['maxPP'] *objy['maxP'] : -Infinity)
 
}
//naive

var maximumProduct=(A)=>{

var 
    min1=Infinity,
    min2=Infinity,
    max1=-Infinity,
    max2=-Infinity,
    max3=-Infinity


for (var n of A) {
    if (n <= min1) {
        min2 = min1;
        min1 = n;
    } else if (n <= min2) {     // n lies between min1 and min2
        min2 = n;
    }
    if (n >= max1) {            // n is greater than max1, max2 and max3
        max3 = max2;
        max2 = max1;
        max1 = n;
    } else if (n >= max2) {     // n lies betweeen max1 and max2
        max3 = max2;
        max2 = n;
    } else if (n >= max3) {     // n lies betwen max2 and max3
        max3 = n;
    }

}
return Math.max(min1 * min2 * max1, max1 * max2 * max3);
}
// optimal

console.log(maximumProduct(
  //[-4,-3,-2,-1,60]
    //[1,2,3,3,3]
    [7,3,1,0,0,6]
//[0,0,0,4]
))