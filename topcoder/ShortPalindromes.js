// Problem Statement

// A palindrome is a String that is spelled the same forward and backwards. Given a String base that may or may not be a palindrome, we can always force base to be a palindrome by adding letters to it. For example, given the word "RACE", we could add the letters "CAR" to its back to get "RACECAR" (quotes for clarity only). However, we are not restricted to adding letters at the back. For example, we could also add the letters "ECA" to the front to get "ECARACE". In fact, we can add letters anywhere in the word, so we could also get "ERCACRE" by adding an 'E' at the beginning, a 'C' after the 'R', and another 'R' before the final 'E'. Your task is to make base into a palindrome by adding as few letters as possible and return the resulting String. When there is more than one palindrome of minimal length that can be made, return the lexicographically earliest (that is, the one that occurs first in alphabetical order).

// Definition

// Class:	ShortPalindromes
// Method:	shortest
// Parameters:	String
// Returns:	String
// Method signature:	String shortest(String base)
// (be sure your method is public)

// Constraints
// -	base contains between 1 and 25 characters, inclusive.
// -	Every character in base is an uppercase letter ('A'-'Z').

// Examples
// 0)

// "RACE"
// Returns: "ECARACE"
// To make "RACE" into a palindrome, we must add at least three letters. However, there are eight ways to do this by adding exactly three letters:
//     "ECARACE"  "ECRARCE"  "ERACARE"  "ERCACRE"
//     "RACECAR"  "RAECEAR"  "REACAER"  "RECACER"
// Of these alternatives, "ECARACE" is the lexicographically earliest.
// 1)

// "TOPCODER"
// Returns: "REDTOCPCOTDER"
// 2)

// "Q"
// Returns: "Q"
// 3)

// "MADAMIMADAM"
// Returns: "MADAMIMADAM"
// 4)

// "ALRCAGOEUAOEURGCOEUOOIGFA"
// Returns: "AFLRCAGIOEOUAEOCEGRURGECOEAUOEOIGACRLFA"

// LC 1312
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
                lps[i][j] = Math.max(lps[i][j], lps[i + 1][j - 1] + 2);
        }
    }

    lps[0][n - 1]; //is the longest palindromic subsequence's length

    // so, what i can simply do, is insert the elements that dont belong to the LPS to symmetric indexes
    // for example abbda
    // lps=abba
    // insert d to its symmetric
    // a d b b d a
    minIns = n - lps[0][n - 1]; //resulting in bounded amount of insertions

    // essentially i need to reconstruct all the possible solutions and then sort them to find the lexico smaller, KEEP IN MIND THAT MY RESULT has to have n+minIns letters and no more
    let result=Array(n+minIns).fill('Z').join('') //highest lexico, i want smallest of length n+minIns
    let reconstruct1 = (i, j, word) => {
        if (i<0||j<0||i>=n||j>=n){
            return
        }

        if(i>=j){
             //took me 5 days to realise that i also need to place +s[i] here. Big mistake
             let addition=(i==j)?s[i]:''
             //if (i==j)the second half is created and s[i] is in the middle
             //if (i>j) the second half is created 
             let res=word.split('').reverse().join('')+addition+word 
             if(res.length==minIns+n&&res<result)
                result=res
         }
         else if (i < j) {
            //notice that all of these are possible even at the same iteration
            if (lps[i][j] == lps[i + 1][j]) 
                reconstruct1(i + 1, j, s[i] + word);
            if (lps[i][j] == lps[i][j-1]) 
                reconstruct1(i, j - 1, s[j] + word);
            if(lps[i][j] == lps[i + 1][j-1]+2&&s[j]==s[i])  
                reconstruct1(i + 1, j - 1, s[j] + word);
        } 

    };
    reconstruct1(0, n - 1, '');

    return result
};

console.log(minInsertions(
    //'RACE'
    //'ALRCAGOEUAOEURGCOEUOOIGFA'
    //'TOPCODER'
    //'GOOGLE'
    ));
// ALRCAFGIOOEUAEOCEGRURGECOEAUEOOIGFACRLA
// AFLRCAGIOEOUAEOCEGRURGECOEAUOEOIGACRLFA