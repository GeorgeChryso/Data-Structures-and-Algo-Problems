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

//realisation: You do just need to search for windowsize=minSize,
// cos everything else doesnt matter. if there is a size 3 repeating string, then it's the one that's repeating the most times. And i dont need to search for a string sized 4 
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
    let start=0
    for (let end = minSize-1; end < s.length; end++,start++) {
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
    
    return result
};

//rolling hash, instead of creating a set every time
function maxFreq(s, maxLetters, minSize) {

    let n = s.length,
        a = 'a'.charCodeAt(), // s only contains lowercase English letters.
        charCount = new Array(26).fill(0), 
        substrCount = {},
        left = 0,
        ans = 0;

    for (let i = 1; i <= n; ++i) { 
        if (charCount[s.charCodeAt(i - 1) - a]++ === 0) --maxLetters; 
        
        if (i >= minSize) { 
            let substr = s.substring(left, i);

            if (maxLetters >= 0) { 
                ans = Math.max(ans, substrCount[substr] = (substrCount[substr] || 0) + 1);
            }

            if (--charCount[s.charCodeAt(left++) - a] === 0) ++maxLetters; // 
        }
    }

    return ans;
}
console.log(maxFreq(
    "aaaa",
    1,
    3,
    3,
))