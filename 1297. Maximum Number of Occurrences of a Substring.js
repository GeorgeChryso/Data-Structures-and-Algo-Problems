// Given a string s, return the maximum number of ocurrences of any substring under the following rules:

// The number of unique characters in the substring must be less than or equal to maxLetters.
// The substring size must be between minSize and maxSize inclusive.



//brute force, slow
var maxFreq = function(s, maxLetters, minSize, maxSize) {
    let result=0
    //sliding window
    let isValid=str=>{
        let unique=new Set()
        let count=0
        for (let i = 0; i < str.length; i++) {
            if(!unique.has(str[i])){
                unique.add(str[i])
                count++
            }
        }
        return count<=maxLetters
    }

    let memo={}
    for (let wind = minSize; wind <= maxSize; wind++) {
        let start=0
        for (let end = wind-1; end < s.length; end++,start++) {
            let substr=s.slice(start,end+1)
            if(memo[substr]!==undefined){
                memo[substr]++
                result=Math.max(memo[substr],result)
                continue
            }
            if(isValid(substr)){
                memo[substr]=1
                result=Math.max(memo[substr],result)

            }
        }
    }
    return result
};

//brute force with pruning the small windows that are invalid from the get go. Slightly faster
var maxFreq = function(s, maxLetters, minSize, maxSize) {
    let result=0
    //sliding window
    let isValid=str=>{
        let unique=new Set()
        let count=0
        for (let i = 0; i < str.length; i++) {
            if(!unique.has(str[i])){
                unique.add(str[i])
                count++
                if(count>maxLetters)return false
            }
        }
        return true
    }

    let memo={}
    let start=0

    for (let end = minSize-1; end < s.length; end++,start++) {
        let substr=s.slice(start,end+1)
        for (let wind = minSize; wind <= maxSize; wind++) {
            substr+=s[end+wind-minSize]
            if(memo[substr]!==undefined){
                memo[substr]++
                result=Math.max(memo[substr],result)
                continue
            }
            if(isValid(substr)){
                memo[substr]=1
                result=Math.max(memo[substr],result)
            }
            else break
        }
    }
    return result
};

console.log(maxFreq(
    "aaaa",
    1,
    3,
    3,
))