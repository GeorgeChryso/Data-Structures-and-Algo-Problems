'use strict'

// nternational Morse Code defines a standard encoding where each letter is mapped to a series of dots and dashes, as follows: "a" maps to ".-", "b" maps to "-...", "c" maps to "-.-.", and so on.

// For convenience, the full table for the 26 letters of the English alphabet is given below:

// Now, given a list of words, each word can be written as a concatenation of the Morse code of each letter.For example, "cba" can be written as "-.-..--...", (which is the concatenation "-.-." + "-..." + ".-").We'll call such a concatenation, the transformation of a word.

// Return the number of different transformations among all words we have.

//     Example:
// Input: words = ["gin", "zen", "gig", "msg"]
// Output: 2
// Explanation:
// The transformation of each word is:
// "gin" -> "--...-."
// "zen" -> "--...-."
// "gig" -> "--...--."
// "msg" -> "--...--."

// There are 2 different transformations, "--...-." and "--...--.".


var table= [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."]
var z='abcdefghijklmnopqrstuvwxyz'
var uniqueMorseRepresentations = function (words) {
    let S = new Set()
   
   
    words.forEach((d) => S.add(d.replace(/[a-z]/g, a => table[z.indexOf(a)])))
return S.size
};                                                       
console.log(uniqueMorseRepresentations(
    ["gin", "zen", "gig", "msg"]
))