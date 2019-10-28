var maxLength = function(ARR) {
    var result=0
    function isdif(A){
        obj={}
        for (const a of A) {
            if(obj[a])return false
            obj[a]=true
        }
        result=Math.max(result,A.length)

        return true
    }
    ARR=ARR.filter(d=>isdif(d))

    function aredif(A,B,j){
   
        if( isdif(A+B) ){
            if( j<ARR.length)return aredif(A+B,ARR[j+1],j+1)
        }
        else{

            if( j<ARR.length)return aredif(A,ARR[j+1],j+1)
 
        }
        

    
    }

    for (let i = 0; i < ARR.length; i++) {
          for (let j = i+1; j < ARR.length; j++) {
                    aredif(ARR[i],ARR[j],j)
            }
        
    }
    return  result

};