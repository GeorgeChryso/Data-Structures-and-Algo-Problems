// Given two strings s and t , write a function to determine if t is an anagram of s.


var isAnagram = function(s, t) {
    let dictionary={}
    for (const letter of s) {
        dictionary[letter]=(dictionary[letter]||0) +1
    }

    for (const letter of t) {
        if(dictionary[letter]===undefined || dictionary[letter]<0)return false
        dictionary[letter]--
    }

    return Object.values(dictionary).every(d=>d===0)    
};