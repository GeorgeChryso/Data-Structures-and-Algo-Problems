// The Tribonacci sequence Tn is defined as follows: 

// T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.

// Given n, return the value of Tn.


var tribonacci = function(n) {
    let arr=[0,1,1]    
    for (let i =3; i <= n; i++) {
arr[i]=arr[i-3]+arr[i-2]+arr[i-1]        
    }
    return arr[n]
};
console.log(tribonacci(36))



//