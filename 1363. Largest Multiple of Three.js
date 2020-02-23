// Given an integer array of digits, return the largest multiple of three that can be formed by concatenating some of the given digits in any order.

// Since the answer may not fit in an integer data type, return the answer as a string.

// If there is no answer return an empty string.




// Intuition: 3 divisibility rules says that if the sum of digis%3===0 then n%3==0
var largestMultipleOfThree = function(digits) {


    let digits2string=arr=>arr[arr.length-1]==0?'0':arr.reduce((acc,curr,i)=>curr+''+acc,'')
    digits.sort((a,b)=>a-b)
    let total=digits.reduce((acc,curr)=>acc+curr)
   
    //if total is divisible by 3 then my biggest number is already formed
    if(total%3==0)return digits2string(digits)

    //if the  remainder of total is 1, i can perform two operations
    // either remove a 1,4,7 to amke the remainder ==0
    // or (if there are no 1,4,7  )remove two of 2,5,8 to make the remainder ==0
    // that would be 2,2 , 2,5 , 5,5 ,2,8, 5,8  8,8
    
    let first=-1
    let second=[]
    let setA=new Set([1,7,4])
    let setB=new Set([2,5,8])
    if(total%3==1){
        for (let i = 0; i < digits.length; i++) {
            if(setA.has(digits[i])&&first==-1)first=i
            if(setB.has(digits[i])&&second.length<2)second.push(i)
        }
    }

    // else if the total's remainder is 2 we have yet again 2 operations
    // either remove one of 2 ,5 ,8
    // or (if there are no 2 ,5 ,8 ) two of 1,4,7
    if(total%3==2){
        for (let i = 0; i < digits.length; i++) {
            if(setB.has(digits[i])&&first==-1)first=i
            if(setA.has(digits[i])&&second.length<2)second.push(i)
        }
    }

    //Note: it's always better to remove 1 rather than two elements cos thats 1 decimal instead of 2, making the first choice prefferable and bigger
    
    //if there is one of 2,5,8, and it's not the only element
    if(first!=-1&&digits.length>1){
        console.log('hi')

        //return the string of the array with the item removed
        return digits2string(digits.slice(0,first).concat(digits.slice(first+1)))
    }

    //if there is a pair of 1,4,7 and they re not the only ones
    if(second.length==2&&digits.length>2){
        //return the string of the array with the items removed
        return digits2string(digits.slice(0,second[0]).concat(
            digits.slice(second[0]+1,second[1]).concat(digits.slice(second[1]+1))
        ))
    }
    
    return ''
};


console.log(
    largestMultipleOfThree(
        [5,8]
    )
)