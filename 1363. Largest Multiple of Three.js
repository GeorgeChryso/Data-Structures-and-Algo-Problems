// Given an integer array of digits, return the largest multiple of three that can be formed by concatenating some of the given digits in any order.

// Since the answer may not fit in an integer data type, return the answer as a string.

// If there is no answer return an empty string.




// Intuition: 3 divisibility rules says that if the sum of digis%3===0 then n%3==0
var largestMultipleOfThree = function(digits) {
    digits.sort((a,b)=>a-b)

    let digits2string=arr=>arr[arr.length-1]===0?'0':arr.reduce((acc,curr,i)=>curr+''+acc,'')

    let total=digits.reduce((acc,curr)=>acc+curr)
   
    //if total is divisible by 3 then my biggest number is already formed
    if(total%3==0)return digits2string(digits)


    let first=-1 //holds the index of the first operation (remove 1 element)
    let second=[] // holds the 2 indices of the second operation (remove 2)
    let setA=new Set([1,7,4])
    let setB=new Set([2,5,8])


     //if the  remainder of total is 1, i can perform two operations
    // either remove a 1,4,7 to amke the remainder ==0
    // or (if there are no 1,4,7  )remove two of 2,5,8 to make the remainder ==0
    // that would be 2,2 , 2,5 , 5,5 ,2,8, 5,8  8,8
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
    
    //if the first operation can be performed without deleting the whole digits array
    if(first!=-1&&digits.length>1){
        //return the string of the array with the item removed
        digits[first]=''
        return digits2string(digits)
    }

    //if the second operation can be performed without deleting the whole array
    if(second.length==2&&digits.length>2){
        //return the string of the array with the items removed
        digits[second[0]]=''
        digits[second[1]]=''
        return digits2string(digits)
    }
    
    return ''
};


//O(nlogn) due to sort
//shorter solution, essentially the same
var largestMultipleOfThree = function(digits) {
    const sum = digits.reduce((a,c) => a + c);
    if (sum === 0) return '0'
    const remainder = sum % 3;
    digits.sort((a,b) => b - a); //sorting them in reverse so i can just join afterwards
    if (remainder === 0) return digits.join('');
    
    // handles the cases
    const doubleRemainder = (remainder === 1)? 2 : 1;
    
    const idxs = []
    for (let i = digits.length - 1; i >= 0; i--) {
        //the remainder of digit[i]
        const numRemainder = digits[i] % 3;
        
        // handles the cases, if there is a number with the same remainder, 
        // immediately the result is found
        if (numRemainder === remainder) {
            digits[i] = '';
            return digits.join('')
        } 
        //else you need to attempt the two elements
        else if (numRemainder === doubleRemainder) {
            idxs.push(i);
        }
    }
    
    //if there are no two elements taht can be removed 
    if (idx.length!==2) return '';


    //if it got herre it means the 2 elements were found.
    digits[idx[0]] = ''
    digits[idx2[1]] = ''
    return digits.join('');
};

// It would make sense to use bucket sort as all my input is uniformly distributed over a range
// [0,10]
// O(n)- O(1) cos no further sorting is necessary
var largestMultipleOfThree=digits=>{
    function stringify(values) {
        return values.reduce((result, nums) =>  nums.join('') + result, '');
    }
    let bucket=[...Array(10)].map(d=>[])//buckets'buckets, each item on its corresponding bucket
    
    for (const digit of digits) {
        bucket[digit].push(digit)
    }
    //btw no sorting is required for bucket sort as the buckets only hold 1 type of item each,1 digit
    let totalSum=bucket.reduce((acc,curr,i)=>acc+curr.length*i,0) //total sum of all the buckets
    if(totalSum==0)return '0'
    if(totalSum%3==0)return stringify(bucket)

    let remainder=totalSum%3

    //handle the removal of 1 element
    for (let i = remainder; i < bucket.length; i+=3) {
        if(bucket[i].length){
            bucket[i].pop()
            return stringify(bucket)
        }
    }
    
    //handle the removal of 2 element
    let start=0
    if(remainder==1){
         start=2 //cos i need to remove 2 elements from categories 2,5,8
    }
    else  start=1 // cos i need to remove 2 elements from categoreis 1,4,7

    let countOfRemoved=0
    for ( start; start < bucket.length; start+=3) {
            while(bucket[start].length&&countOfRemoved<2){
                bucket[start].pop()
                countOfRemoved++
            }
            if(countOfRemoved==2){
                return stringify(bucket)
            }
    }

    return ''
}
console.log(
    largestMultipleOfThree(
        [5,8]
    )
)