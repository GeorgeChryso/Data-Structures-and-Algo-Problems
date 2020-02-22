// Given a positive integer n and you can do operations as follow:

// If n is even, replace n with n/2.
// If n is odd, you can replace n with either n + 1 or n - 1.
// What is the minimum number of replacements needed for n to become 1?


//recursion
var integerReplacement = function(n) {
    if(n<1)return Infinity
    if(n===1)return 0

     return (n%2?Math.min(integerReplacement(n-1),integerReplacement(n+1)):integerReplacement(n/2))+1
};

//bfs
var integerReplacement = function(n) {
    if(n==1)return 0
    //avoid repetitive work
    let dict=new Set() // so I dont expand trees I've expanded in the past

    let q=[n]
    dict.add(n)
    let level=0
    while(q.length){
        temp=[]
        
        for (const d of q) {
            if(d%2){
                if(d-1==1||d+1==1)return level+1
                if(!dict.has(d-1)){
                    dict.add(d-1)
                    temp.push(d-1)
                }
                if(!dict.has(d+1)){
                    dict.add(d+1)
                    temp.push(d+1)
                }
            }
            else{
                if(d/2===1)return level+1
                if(!dict.has(d/2)){
                    dict.add(d/2)
                    temp.push(d/2)
                }
            }
        }
           
        level++
        q=temp
    }
};

//bitwise solution

var integerReplacement = function(n) {
    if(n<1)return Infinity
    if ( n===1)return 0

    let distfrom1=n=>{
        let result=n
        let counter=0
        while(result!=1){
            result>>>=1
            counter++
        }
        return counter
    }

    let distFromclosestPowerOfTwo=n=>{
        let result=Infinity
        let dist=Infinity
        for (let i = 0; i < 31; i++) {
            if(Math.abs(n-2**i)<dist){
                dist=Math.abs(n-2**i)
                result=2**i
            }
        }
        return [dist,result]
    }

    if((n%2)===0){
        if((n&(n-1))===0) return distfrom1(n)
        else{
            return integerReplacement(n/2)
            // let [dist1,result1]=distFromclosestPowerOfTwo(n)
            // let [dist2,result2]=distFromclosestPowerOfTwo(n/2)

            // if(dist1<dist2){

            // }
            
        }
    }
    else{
         
       
        let [dist,result]=distFromclosestPowerOfTwo(n)
        console.log(result)
        return dist+integerReplacement(result)
        return 1+integerReplacement(n-1)
        
    }
};


console.log(
    integerReplacement(1234)
)