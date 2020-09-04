// Given a string s. In one step you can insert any character at any index of the string.

// Return the minimum number of steps to make s palindrome.

// A Palindrome String is one that reads the same backward as well as forward.

//dp similar to edit distance

// actually it seems to be similar to Longest Palindromic Subsequence

var minInsertions = function(s) {
    let n = s.length,
        lps = [...Array(n)].map(d => [...Array(n)].map(d => 0));
    //solve lps first

    //lps[i][j]= longest palindromic subsequence length from i to j

    //lps[i][j]=lps[i+1][j-1]+2 if(s[i]===s[j])
    //          lps[i+1][j],lps[i][j-1] else

    //basecases
    for (let i = 0; i < n; i++) lps[i][i] = 1; //the letter itself
    // when len=1 actual length==2
    for (let len = 1; len < n; len++) {
        for (let i = 0; i < n - len; i++) {
            let j = i + len;
            lps[i][j] = Math.max(lps[i + 1][j], lps[i][j - 1]);
            if (s[i] === s[j])
                lps[i][j] = Math.max(lps[i][j], lps[i + 1][j - 1]+2);
        }
    }

    lps[0][n - 1]; //is the longest palindromic subsequence's length

    // so, what i can simply do, is insert the elements that dont belong to the LPS to symmetric indexes 
    // for example abbda
    // lps=abba
    // insert d to its symmetric
    // a d b b d a
    return n-lps[0][n-1] //resulting in bounded amount of insertions
};

console.log(minInsertions('abbad'));
