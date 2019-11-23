// Find the length of the longest substring T of a given string (consists of lowercase letters only) such that every character in T appears no less than k times.

// Sliding Window + Hashmap O(26*N)=O(N)
var longestSubstring = function(s, k) {
    // this function finds the maximum length of a substring (window)
    // that has u distinct characters and
    // EACH character's frequency is at least k
    var maxLengthofSusbtrWith_u_distinct_andFreq_K = function(u) {
        let start = 0,
            end = 0; // the start and end index of my currrent window
        let curU = 0; // the number of the Unique elements in my current window
        let curK = 0; // the number of elements with frequency>=K in my current window

        let max = 0; // the Maximum length of the window that meets my 2 conditions so far

        //character: its frequency
        let hash = {};

        //Sliding window
        while (end < s.length) {
            // fill the hash
            hash[s[end]] = hash[s[end]] + 1 || 1;
            // if its the first log of the element( unique element)
            if (hash[s[end]] == 1) curU++;
            // if its the k'th log (condition met)
            if (hash[s[end]] == k) curK++;
            // lengthen the window from the right
            end++;

            // extra letter coming in, so we shrink left
            // if the number of unique elements on my hash is bigger than u I want to find a window where curU==u so ...
            while (curU > u) {
                // I have to somehow reduce the unique numbers to u
                // I will do that by moving the window's start 1 element to the right

                // First I have to remove that element from the hashmap
                // If that element's frequency was k, I have to reduce the curK counter
                if (hash[s[start]] == k) {
                    curK--;
                }
                hash[s[start]]--;

                // If hash[s[start]] was 1 and became 0 by moving the resizing the window to the right, I have to reduce the unique elements counter, as there is no such element anymore
                if (hash[s[start]] == 0) {
                    curU--;
                }

                // and I finally expand the window to the right
                start++;
            }

            // every unique element is met at Least K times and I have u distinct elements
            // So my condition is met, My current window has u distinct elements that have frequency>=k
            if (curU == curK && curU == u) {
                //So i just need to keep the maximum of each said window
                max = Math.max(end - start, max);
                console.log('ss');
            }
        }
        // and return it
        return max;
    };

    let result = 0;
    // I m talking about letters (characters) So my distinct elements with frequency>=k , can be at most 26. Cos there are only 26 distinct letters.
    for (let i = 0; i < 26; i++) {
        result = Math.max(
            result,
            maxLengthofSusbtrWith_u_distinct_andFreq_K(i + 1)
        );
    }
    return result;
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

console.log(longestSubstring('ABC'));

