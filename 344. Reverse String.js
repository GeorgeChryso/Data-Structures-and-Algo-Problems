'use strict'

// Write a function that reverses a string. The input string is given as an array of characters char[].

// Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.

// You may assume all the characters consist of printable ascii characters.


var reverseString = function(s) {
    for (let i=0;i<s.length/2;i++) {
        let q=s[i]
        s[i]=s[s.length-i-1]
        s[s.length-i-1]=q
    }
    console.log(s)
}


console.log(
    reverseString(
        ["h","e","l","l","o"]
    )
)