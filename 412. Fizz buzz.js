// Write a program that outputs the string representation of numbers from 1 to n.

// But for multiples of three it should output “Fizz” instead of the number and for the multiples of five output “Buzz”. For numbers which are multiples of both three and five output “FizzBuzz”.

// Example:

// n = 15,

// Return:
// [
//     "1",
//     "2",
//     "Fizz",
//     "4",
//     "Buzz",
//     "Fizz",
//     "7",
//     "8",
//     "Fizz",
//     "Buzz",
//     "11",
//     "Fizz",
//     "13",
//     "14",
//     "FizzBuzz"
// ]

var fizzBuzz = function(n) {
    
    return  Array(n).fill(0).map((d,j)=>{
        return ((j+1)%3==0 && (j+1)%5==0)? 'FizzBuzz':
        ((j+1)%3==0 )?'Fizz':
       ((j+1)%5==0)? 'Buzz':
         String(j+1)
    })

    let answ=[]

    for (let j = 0; j <n; i++) {
        answ.push(((j+1)%3==0 && (j+1)%5==0)? 'FizzBuzz':
        ((j+1)%3==0 )?'Fizz':
       ((j+1)%5==0)? 'Buzz':
         String(j+1))        
    }
    return answ
};

console.log(fizzBuzz(15))