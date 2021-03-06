// Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.

// Your algorithm's runtime complexity must be in the order of O(log n).

// If the target is not found in the array, return [-1, -1].

// BINARY search with dynamic programming
var searchRange = function(A, T) {


    var tIndex=-1
    var result=[-1,-1]
    if(!A.length){return result}

    function dp(start,end){
        let length=1+end-start

        if(!length)return

        if (length%2){
            var splitIndex=(length-1)/2
        }
        else {
            var splitIndex=length/2-1
        }
      

        if(A[start+splitIndex]==T){
            tIndex=start+splitIndex
            var endIndex=new Number(tIndex)
            while(A[tIndex]===T){
                tIndex--
            }
            while(A[endIndex]===T){
                endIndex++
            }
            result=[tIndex+1,endIndex-1]
            return
        }
        else if( A[start+splitIndex]<T){
            if(splitIndex+1==start){
                return
            }
            dp(start+splitIndex+1,end)
            
            
        }
        else{
            if(splitIndex-1==end){
                return
            }
            dp(start,start+splitIndex-1)
            
        }
        
        return

    }

    dp(0,A.length-1)
    
    var start=0
    var end = A.length-1
    
    while (start<end){  
        let length=1+end-start
        if(!length)break
       

        let splitIndex=length%2?
        (start+(length-1)/2):
        (start+(length-2/2))

        if(A[splitIndex]===T){
            var endIndex=new Number(splitIndex)
            while(A[splitIndex]===T){
                splitIndex--
            }
            while(A[endIndex]===T){
                endIndex++
            }
            return [splitIndex+1,endIndex-1]
            
        }
        else if (A[splitIndex]<T){
            start=splitIndex+1
        }
        else{
            end=splitIndex-1
        }

    }

    return result
};

//BINARY SEARCH with a WHILE 
var searchRange = function(A, T) {
    if(!A.length){return [-1,-1]}

    var start=0
    var end = A.length-1
    
    while (start<=end){      
        
        
        let splitIndex = Math.floor((l + r) / 2);

        
        if(A[splitIndex]===T){

            let endIndex=new Number(splitIndex)
            while(A[splitIndex]===T){
                splitIndex--
            }
            while(A[endIndex]===T){
                endIndex++
            }
            return [splitIndex+1,endIndex-1]
            
        }
        else if (A[splitIndex]<T){
            start=splitIndex+1
        }
        else{
            end=splitIndex-1
        }

    }

    return [-1,-1]
};



console.log(searchRange(
   // [-99999,-99998,-9999,-999,-99,-9,-1],0
   //[2,2],3
 // [1],1
   [5,7,7,8,8,10],10
    ))