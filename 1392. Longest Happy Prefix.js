// A string is called a happy prefix if is a non-empty prefix which is also a suffix (excluding itself).

// Given a string s. Return the longest happy prefix of s .

// Return an empty string if no such prefix exists.

//passes. Brute force
var longestPrefix = function(s) {
    if (s.length === 1) return '';
    for (let i = s.length - 1; i >= 1; i--) {
        const pre = s.slice(0, i);
        const suf = s.slice(s.length - i);
        if (pre === suf) {
            return pre;
        }
    }
    return '';
};

// KMP preprocessing gives me LPS, A matrix with the longest prefix that is also a suffix at index i
// so if lps[10]=5 that means pattern[6,7,8,9,10]====pattern[0,1,2,3,4] ( prefix==suffix at index i )
// so lps[lps.length-1] has the length of the longest prefix that is also a suffix
var longestPrefix = function(s) {
    let computeLPS = pattern => {
        let lps = [...Array(pattern.length)];
        lps[0] = 0; //the first element is always 0
        let len = 0; //essentially both the index of pattern and the length
        // len always RESETS to lps[len-1] after a mismatch

        //fill lps[i]
        for (let i = 1; i < pattern.length; i++) {
            //match
            if (pattern[i] === pattern[len]) {
                len++;
                lps[i] = len;
            }
            //mismatch of i and len
            else {
                //if len!=0 that means that
                // I can still go back to the previous letter
                if (len != 0) {
                    len = lps[len - 1];
                    i--; //that means that I still want to test the same index, not decrementing per se
                    // but keeping i the same so the i++ wont change it
                }
                //if len==0 that means that i have to go to the beginning (first letter)
                else {
                    lps[i] = len;
                }
            }
        }
        return lps;
    };

    let lps = computeLPS(s);
    return s.slice(s.length - lps[lps.length - 1]);
};

//1 <= s.length <= 10^5
//s contains only lowercase English letters.

// Intuition, a rolling hash of the prefix and suffix of the same length.
// The maximum length of a prefix can be s.length-1, (not the string itself)
// so when I come across a same hash Value, i check if its an identical match.
var longestPrefix = function(s) {
    //apparently these do not work
    // let base=26 //lowercase english characters
    // let prime= 1e5+3 // a prime number bigger than s.length==1e5, is  100003
    // and these are used
    let prime = 1e9 + 7;
    let base = 26;

    let prehash = x => x.charCodeAt(0) - 'a'.charCodeAt(0) + 1; //maps letters to 0 ,1 ,2, 3.. .

    let curP = 0;
    let curS = 0;

    let maxLength = 0;

    let mul=1
    for (let i = 0; i < s.length - 1; i++) {
        curP=(curP * base%prime + prehash(s[i])) % prime;
        curS=(curS+mul*prehash(s[s.length - 1 - i]))%prime
        mul = mul * 26 % prime;
        if (curS == curP) maxLength = i + 1;
    }

    return s.slice(0, maxLength);
};

console.log(
    longestPrefix(
        'ddjefgfiagebcgbgchgchhabdcadbbbjaibabgacidjhdhidfbfefbigigiaibjbdaijififhabaajihicchdeffabjbegieedjebgdbfbbbdcfbcfhiejjihbddibhffejcehfggabbhidhbdaebehjbeiggdchjejjfejjbgcheehahfaccicffgfiiagdgfiijghceihbfjdabchcfedigicehiaadijbedfcdhajbifjjgcaaggbadidacbhieijjddifffbfaegghjifcchdbdjgghiedddagacdfjbbbcjjfgbghibigchagfjaacgihdiggbcbeijjcgaihccgdgcccjcddgabajedjibbajhjeehbgcjefhajbdbebbfiaiabhijbefcjeaceffcbiehafaghgdjdeedjhfgajjbjaffafeeffbeghhgijjffehdaejgigihcbabeahdbghfgfbhgageajafgehhdbjddcghgeaicaccjhdiejjagjciegeiihjedhigifaahcfhdigbcacfabgcdbbceagddeejiidiigfaafbhiejahgfaccggdedgiichjgdhbhfcdgceecjhfjifieecjacfcfgajaichjdbhcibgffhajihggchjebbacccfciegjhhdjhfadacaiifgijeijegbeeijjccfhgeiccbjjafiabgjfjhccchefdegceahbadcjadhgdgbfijihbeajjhfejfijffbdiaicdjacgjcdiaefjdeeijegciggiahgdagafcaeibhdicaejgaficfdfgaefajiebgaihjjfacchhfdieajfihecdejgbeicjficcgafafajcfbgjafcdcgffcgjjbdicagaedeeggbgebijdggigaabcihdccbehfagijbejhhcjcefgdbijjfbajbdaiaifdegdgfgfejihbedbhiaagbdjhajgbfjachjjcccdifciigfdijhjdadehdebehhjihfjbjggcfeefgejgdiifdhghggfhadedjfjabhfdechghiahibaijfefjhcbffhieejedjabddhdfjageajcfchcjfadacfhabgfbhdhiffjjhahjdhjibideabhfgeiajccigcfjgfjeggchdhicdiciadgbfiaegcgdeggichdcjjegbiggcjjbhdedhjhgededjedgaaffhcjjihbfdegigefagjbjdidddjefgfiagebcgbgchgchhabdcadbbbjaibabgacidjhdhidfbfefbigigiaibjbdaijififhabaajihicchdeffabjbegieedjebgdbfbbbdcfbcfhiejjihbddibhffejcehfggabbhidhbdaebehjbeiggdchjejjfejjbgcheehahfacci'
        // "bcdaacccddacbcdccdbcbcdbadbdcadcdcbcccdccddbbcdaacccddacbcd"
    )
);
