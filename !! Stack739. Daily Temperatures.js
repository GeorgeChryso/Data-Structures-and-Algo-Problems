var dailyTemperatures = function(T) {
//     for (let i = 0; i < T.length; i++) {
        
//         if (T[i]==100||i==T.length-1){
//             T[i]=0
//             continue
//         }
//         for (var j = i+1; T[i]>=T[j] && ( j<=(T.length -1)); j++){
            
           
//         }
//         if( j>T.length-1){
//             T[i]=0
//         }else 
//         {T[i]=j-i
//         }

//     }



// return T


return T.map((d,i)=>{
    for (var j = i+1; d>=T[j] && ( j<=(T.length -1)); j++){

    }
    if( j>T.length-1){
        return 0
    }else 
    { return j-i
    }
})

};

var dailyTemperatures = function(T) {
    let res = Array.from({length:T.length},x=>0);
    let stack = [];
    for(let i=0; i<T.length; i++){
        console.log('i='+i,stack)
        let stackLast=stack[stack.length-1]
      console.log(stackLast,T[stackLast],T[i] ,T[stackLast]<T[i],'\n')
        while(stack.length>0 &&
             T[stackLast]<T[i]){
    		let j = stack.pop();
    		res[j] = i-j;
    	}
    	stack.push(i);
    }
    return res;
}; 

// OPTIMIZED STACK SOLUTION
console.log(dailyTemperatures(
    [55,38,53,81,61,93,97,32,43,78]
    ))


