// Given two arrays, write a function to compute their intersection.


//Straight Forward using hashmaps O(n+m)
var intersection = function(A, B) {
     A=new Set(A)
     B=new Set(B)
     let result={}
     A.forEach(d =>{
         if(B.has(d))result[d]=true
     });

     return Object.keys(result)
};