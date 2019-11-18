// Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity O(n).

var minWindow = function(S, T) {
    S=S.split('')
    T=T.split('')
    var seto=new Set(T)
    var dicto={}
    var result=0
    var start=0
    var end=0

    for (var end = 0; end <T.length; end++) {
        dictionary[A[end]] = dictionary[A[end]] || 0 + 1;
        seto.add(A[end]);
      }
    
    
};

function minWindow(s, t) {
    var ans = '';
    
    // 1. process hashmap
    var map = {};
    t.split('').forEach(ch => map[ch] = (map[ch] || 0) + 1);
    var count = Object.keys(map).length;
    
    // 2. traverse s to find boundaries
    // both l & r are inclusive
    var l = 0;
    var r = -1;
    
    while (r < s.length) {
        if (count === 0) {
            // good condition
            // l~r contains t
            
            // update ans
            if (!ans || r - l + 1 < ans.length) {
                ans = s.slice(l, r + 1);
            }
            
            // get rid of curr ch and then move l
            if (map[s[l]] !== undefined) {
                map[s[l]]++;
            }
            if (map[s[l]] > 0) {
                count++;
            }
            l++;
            
        } else {
            // bad condition
            // l~r doesn't contain t
            
            // move r and add new ch
            r++;
            if (map[s[r]] !== undefined) {
                map[s[r]]--;
            }
            if (map[s[r]] === 0) {
                count--;
            }
        }
    }
    return ans;
}