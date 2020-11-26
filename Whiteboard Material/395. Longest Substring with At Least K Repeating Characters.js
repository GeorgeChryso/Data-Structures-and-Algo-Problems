// Find the length of the longest substring T of a given string (consists of lowercase letters only) such that every character in T appears no less than k times.



console.log(longestSubstring('ABC'));



// Sliding Window O(n^2), try out every sliding window from bigger to smaller
// and check the condition
var longestSubstring = function(s, k) {
    let N=s.length
    for(let len=N; len>=1; len--){
        let freq=[...Array(26)].map(d=>0)
        for(let i=0;i<N;i++){
            freq[s.charCodeAt(i)-97]++
            if(i>=len)
                freq[s.charCodeAt(i-len)-97]--
            if(i>=len-1&&freq.every(d=>d==0||d>=k))
                return len
        }
    }
    return 0 
};

// 2 pointers
// Adding a constraint of Character uniqueness helps me achieve a better complexity
// Odd technique
var longestSubstring = function(s, k) {
    let n=s.length,freq=[...Array(26)].map(d=>0),res=0
    for (let u = 1; u <= 26; u++) { //for every possible number of unique letters in a substring
        freq=[...Array(26)].map(d=>0)
        let left=0,right=0,//start window at the beginning []
            unique=0, //but keep track of HOW MANY unique characters your current window has 
            kOrMore=0 //and How MANY of the characters INSIDE the window have frequency k or more
        while(right<n){
            if(unique<=u){ // add characters until we have the required amount of unique letters
                freq[s.charCodeAt(right)-97]++
                if(freq[s.charCodeAt(right)-97]==1)
                    unique++
                if(freq[s.charCodeAt(right)-97]==k)
                    kOrMore++
                right++
            }
            else{   //if we do have more unique characters than we want, try shortening the window
                freq[s.charCodeAt(left)-97]--
                if(freq[s.charCodeAt(left)-97]==0)
                    unique--
                if(freq[s.charCodeAt(left)-97]==k-1)
                    kOrMore--
                left++
            }
            if(unique==u && kOrMore==unique) //if our current window satisfies the conditions
                res=Math.max(res,right-left);
        }
    }
    return res
};



// Recursion
var longestSubstring = function(s, k) {
    let hash = {},
        max = 0;
    s.split('').forEach(val => {
        hash[val] = hash[val] + 1 || 1;
    });

    // [...[key,val]] with val>=K
    let c = Object.entries(hash).filter(([key, val]) => val < k);

    //if there is a key value pair with value>=K
    if (c[0]) {
        // for each substring()
        // c.shift()=[key,val]
        // [key,val]][0]=key
        // for (seg of s.split(key) )
        for (let seg of s.split(c.shift()[0])) {
            max = Math.max(longestSubstring(seg, k), max);
        }
        return max;
    }
    return s.length;
};
// recursion again
var longestSubstring = function(s, k) {
    if (!s.length) return 0;

    const hash = {};
    //fill hash
    for (let c of s) hash[c] = (hash[c] || 0) + 1;

    // if there is no frequency  less than k
    if (!Object.values(hash).some(d => d < k)) {
        return s.length;
    } else {
        let begin = 0,
            end = 0,
            res = 0;

        while (end < s.length) {
            if (hash[s[end]] < k) {
                res = Math.max(
                    res,
                    longestSubstring(s.substring(begin, end), k)
                );
                begin = end + 1;
            }
            end++;
        }
        res = Math.max(res, longestSubstring(s.substring(begin), k));
        return res;
    }
};