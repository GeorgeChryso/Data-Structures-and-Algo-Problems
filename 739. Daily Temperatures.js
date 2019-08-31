var dailyTemperatures = function(T) {
    let answ=[]
    for (let i = 0; i < T.length; i++) {
        
        if (T[i]==100||i==T.length-1){
            answ[i]=0
            continue
        }
        for (var j = i+1; T[i]>=T[j] && ( j<=(T.length -1)); j++){
            
           
        }
        if( j>T.length-1){
            answ[i]=0
        }else 
        {answ[i]=j-i
        }

    }

return answ
};

console.log(dailyTemperatures(
    [55,38,53,81,61,93,97,32,43,78]
    ))