// Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.

// Your algorithm's runtime complexity must be in the order of O(log n).

// If the target is not found in the array, return [-1, -1].


var searchRange = function(A, T) {
    var finished=false
    var tIndex=-1
    var result=[-1,-1]

    var dp=(arr)=>{
        if(!arr.length || finished)return
        if (arr.length%2){
            var splitIndex=(arr.length-1)/2
        }
        else {
            var splitIndex=arr.length/2-1
        }
        
        if(arr[splitIndex]==T){
            finished=true
            tIndex=splitIndex
             
        }
        else if( arr[splitIndex ]<T){
            dp(arr.slice(0,splitIndex))
            
        }
        else(
            dp(arr.slice(splitIndex,arr.length))
        )
        return

    }
    var endIndex=new Number(tIndex)
    while(A[tIndex]==T){
        tIndex--
    }
    while(A[endIndex]==T){
        tIndex++
    }
    result[0]=tIndex+1
    result[1]=endIndex-1
    
};