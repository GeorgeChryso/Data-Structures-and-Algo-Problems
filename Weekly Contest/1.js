var maxLength = function(arr) {
   
    
};



var findSolution = function(customfunction, z) {
    var result=[]
    for (let i = 1; i <= z; i++) {
       for (let j = 1; j <= z; j++) {
            if(customfunction.f(i,j)===z){
                result.push([i,j])
            }           
       }        
    }

    return result
};


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



var circularPermutation = function(n, start) {
    var p=Array(Math.pow(2,n)).fill(0)
    p[0]=start
    
    var ends=new Set(p)
    for (let i = 0; i < p.length; i++) {
        ends.add(i)        
    }
    ends.delete(start)
    while( p[p.length-1]^p[p.length-2]!==1 ){

          for (const end of ends) {
                if(end^start!==1){
                    continue
                }
            







          }
            

    }
    return p
};



console.log(new Set(Array(Math.pow(2,2))))