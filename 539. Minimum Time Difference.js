// Given a list of 24-hour clock time points in "Hour:Minutes" format, find the minimum minutes difference between any two time points in the list.

var findMinDifference = function(A) {
    A=A.map(d=>[Number(d[0]+d[1]),Number(d[3]+d[4])])
    console.log(A)
    function calc(timeA,timeB){
        if(timeA[0]<timeB[0]){
            let switchy=timeA
            timeA=timeB
            timeB=switchy
        }

        if(timeA[0]==timeB[0])
        {
            return Math.abs(timeA[1]-timeB[1])
        }
        else{
                console.log(`${timeA} ${timeB}`,
                [timeB[0]*60+timeB[1]
                +(24-timeA[0])*60-timeA[1]
                ,
            (timeA[0]-timeB[0])*60+
            ((timeA[1]>=timeB[1])?(timeA[1]-timeB[1]):(timeB[1]-timeA[1]))]
            )
                return Math.min(
                    
                    timeB[0]*60+timeB[1]
                    +(24-timeA[0])*60-timeA[1]
                    ,
                (timeA[0]-timeB[0])*60+
               timeA[1]-timeB[1])
                    
                
                
            
       
        }
    }   
    var result=Infinity

    for (let i = 0; i < A.length; i++) {
        for (let j = i+1; j < A.length; j++) {
            result=Math.min(result,calc(A[i],A[j]))   
            console.log(i,j,calc(A[i],A[j]))         
        }        
    }

    return result
};
console.log(findMinDifference(
    ["01:01","02:01","03:00"]
    ))

console.log(new Date("23:59")==new Date("00:00"))