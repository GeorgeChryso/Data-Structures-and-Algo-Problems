
//way simpler than before
var toHex = function(num) {
    if(num==0)return '0'
    let hexdic='0123456789abcdef'
    let result=''
    while(num!=0){
        //15=1111, so im essentially copying the hex representation of the first 4 bits into my new number
        result=hexdic[(15&num)]+result
        num>>>=4 // and moving to the next 4 bits
    }
    return result
    
};


console.log(toHex(-1))
// let z= ~(4-1)
// let k= ~z+1

// console.log(
//     011111111111110
// )