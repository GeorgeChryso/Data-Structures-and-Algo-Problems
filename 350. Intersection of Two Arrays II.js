// Given two arrays, write a function to compute their intersection.

var intersect = function(A, B) {
    var result=[]

    for (let i = 0; i < A.length; i++) {
            
        for (let j = 0; j < B.length; j++) {
            if(A[i]===B[j]){
                result.push(B[j])
                B[j]=NaN
                B=B.slice(0,j).concat(B.slice(j+1))
                j--
            }        
        
           }
    }
    return result
};  


var intersect = function(A, B) {
    var result=[]
    var obj={}
    for (let i = 0; i < A.length; i++) {
        if(obj[A[i]]===undefined){
            obj[A[i]]=1
        }
        else obj[A[i]]++
    }
    
    for (let i = 0; i < B.length; i++) {
        if(obj[B[i]]){
            result.push(B[i])
            obj[B[i]]--
        }        
    }
    return result
};  
console.log(intersect(
    [1,2,2,1]
,[2]
))