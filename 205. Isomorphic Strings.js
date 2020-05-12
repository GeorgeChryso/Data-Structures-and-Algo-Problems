// Given two strings s and t, determine if they are isomorphic.

// Two strings are isomorphic if the characters in s can be replaced to get t.

// All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character but a character may map to itself.




var isIsomorphic = function(s, t) {
    let memo={}
    let set=new Set()
    for (let i = 0; i < s.length; i++) {
        if(memo[s[i]]!==undefined){
            if(memo[s[i]]!==t[i])return false
        }
        else{
            if(set.has(t[i]))return false
            memo[s[i]]=t[i]
            set.add(t[i])
        }
    }
    return true
};