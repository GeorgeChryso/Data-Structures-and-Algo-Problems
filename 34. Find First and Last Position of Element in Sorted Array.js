// Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.

// Your algorithm's runtime complexity must be in the order of O(log n).

// If the target is not found in the array, return [-1, -1].


var searchRange = function(A, T) {


    var finished=false
    var tIndex=-1
    var result=[-1,-1]
    if(!A.length){return result}

    var dp=(start,end)=>{
        let length=1+end-start

        if(!length || finished)return

        if (length%2){
            var splitIndex=(length-1)/2
        }
        else {
            var splitIndex=length/2-1
        }
        console.log(`CALLED [${start},${end}] with splitIndex ${splitIndex}`)

        if(A[start+splitIndex]==T){
            console.log('hi')
            finished=true
            tIndex=start+splitIndex
             
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
    console.log('finalized tIndex:',tIndex)

    var endIndex=new Number(tIndex)
    if(tIndex!=-1){
        while(A[tIndex]===T){
            tIndex--
        }
        while(A[endIndex]===T){
            endIndex++
        }
     result[0]=tIndex+1
     result[1]=endIndex-1
    }
   

    return result
};

console.log(searchRange(
   // [-99999,-99998,-9999,-999,-99,-9,-1],0
   //[2,2],3
  //[1],1
   //[5,7,7,8,8,10],6
    ))