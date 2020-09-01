// Given an array of 4 digits, return the largest 24 hour time that can be made.

// The smallest 24 hour time is 00:00, and the largest is 23:59.  Starting from 00:00, a time is larger if more time has elapsed since midnight.

// Return the answer as a string of length 5.  If no valid time can be made, return an empty string.



var largestTimeFromDigits = function(A) {
    let results=[],freq=[...Array(10)].map(d=>0)

    for (let i = 0; i < A.length; i++)
        freq[A[i]]++
    
    for (let i = 0; i <24; i++) {
        for (let j = 0; j <60; j++) {
            let arr=[...Array(10)].map(d=>0)
            let hours=(i>=10?'':'0')+i,mins=(j>=10?'':'0')+j

            for (const el of hours) 
                arr[Number(el)]++
            for (const el of mins) 
                arr[Number(el)]++

            results.push([hours+':'+mins,arr])            
        }        
    }

    for (let i = results.length-1;i>=0;i--) {
        let [time,needed]=results[i]
        if(needed.every((d,i)=>d>=freq[i]))
            return time        
    }
    return ''

};

//faster less space
var largestTimeFromDigits = function(A) {
    let freq=[...Array(10)].map(d=>0)
    for (let i = 0; i < A.length; i++)
        freq[A[i]]++
    
    for (let i = 23; i >=0; i--)
        for (let j =59; j>=0; j--) {
            let arr=[...Array(10)].map(d=>0),
                hours=(i>=10?'':'0')+i,mins=(j>=10?'':'0')+j
            for (const el of hours) 
                arr[Number(el)]++
            for (const el of mins) 
                arr[Number(el)]++
            if(arr.every((d,i)=>d>=freq[i]))
                return hours+':'+mins
        }        
    
    return ''
};

console.log(largestTimeFromDigits(

))