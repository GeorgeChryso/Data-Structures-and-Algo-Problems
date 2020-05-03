// Given an arbitrary ransom note string and another string containing letters from all the magazines, write a function that will return true if the ransom note can be constructed from the magazines ; otherwise, it will return false.

// Each letter in the magazine string can only be used once in your ransom note.



var canConstruct = function(ransomNote, magazine) {
    let memo={}
    for (let i = 0; i < ransomNote.length; i++) {
        memo[ransomNote[i]]=(memo[ransomNote[i]]||0) +1        
    }
    for (let i = 0; i < magazine.length; i++) {
        if(memo[magazine[i]]>0)memo[magazine[i]]--        
    }

    return Object.values(memo).every(d=>d==0)

};