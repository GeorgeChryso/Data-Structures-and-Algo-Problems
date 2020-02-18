// A binary watch has 4 LEDs on the top which represent the hours (0-11), and the 6 LEDs on the bottom represent the minutes (0-59).

// Each LED represents a zero or one, with the least significant bit on the right.
// 
// Given a non-negative integer n which represents the number of LEDs that are currently on, return all possible times the watch could represent.

// Example:

// Input: n = 1
// Return: ["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"]
// Note:
// The order of output does not matter.
// The hour must not contain a leading zero, for example "01:00" is not valid, it should be "1:00".
// The minute must be consist of two digits and may contain a leading zero, for example "10:2" is not valid, it should be "10:02".

//hardcore your way to the solution
var readBinaryWatch = function(N) {

    let result={}
    let perm_i=x=>{
        if(x===0)return ['0:']
        if(x===1)return [1,2,4,8].map(d=>d.toString()+':')
        if(x===2)return [3,5,9,6,10,].map(d=>d.toString()+':')
        if (x==3)return [7,11].map(d=>d.toString()+':')
    }
    let perm_j=x=>{
        if(x===0)return ['00']
        let result={}
        for (let i = 1; i <= 59; i++) {
            let z=i
            let counter=0
            while(z!==0){
                z&=z-1
                counter++
            }            
            if(counter===x){
                if(i<10){
                    result['0'+i.toString()]=true
                }
                else{
                    result[i.toString()]=true
                }
            }
        }
        return Object.keys(result)
    }

    for (let i = 0; i <4; i++) {
        for (let j = 0; j <=5; j++) {
            if(i+j==N){
               let first= perm_i(i)
               let second= perm_j(j)

               first.forEach(f=>{
                   second.forEach(
                       s=>result[f.concat(s)]=true
                   )
               })
            }            
        }        
    }

    return Object.keys(result)
};
console.log(readBinaryWatch(
    1
))