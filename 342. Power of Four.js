// Given an integer (signed 32 bits), write a function to check whether it is a power of 4.

var isPowerOfFour = function(x) {
    //first check if its only got 1 set bit
    if(x<=0|| !((x&(x-1))==0))return false

    //find the position of the set bit
    let counter=0

    while((x&1)==0){
        counter++
        x=x>>>1
    }
    console.log(counter)
    //for it to be a power of 4 it needs to be on an even position from the start 
    return counter%2==0
};


var isPowerOfFour = function(x) {
    //first check if its only got 1 set bit
    if(x<=0|| !((x&(x-1))==0))return false
    // ok, the solution is practically the same as the above,
    // but instead of finding the distance of the first one from the start,
    // i find the distance from the first bit, added by one which is the distance from the start
    return ((x^1).toString(2).length+1)%2==0
};

var isPowerOfFour = function(x) {
    //first check if its only got 1 set bit
    if(x<=0|| !((x&(x-1))==0))return false
   
    //or just find the distanfce from the start added by one 
    return ((x).toString(2).length+1)%2==0
};

console.log(
    isPowerOfFour(16)
)