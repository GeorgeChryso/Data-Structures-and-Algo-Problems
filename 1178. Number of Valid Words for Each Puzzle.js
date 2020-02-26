// With respect to a given puzzle string, a word is valid if both the following conditions are satisfied:
// word contains the first letter of puzzle.
// For each letter in word, that letter is in puzzle.
// For example, if the puzzle is "abcdefg", then valid words are "faced", "cabbage", and "baggage"; while invalid words are "beefed" (doesn't include "a") and "based" (includes "s" which isn't in the puzzle).
// Return an array answer, where answer[i] is the number of words in the given word list words that are valid with respect to the puzzle puzzles[i].






var findNumOfValidWords = function(words, puzzles) {
    let letters2bit=word=>{
        let final=0
        for (const letter of word) {
            final|=(1<<(letter.charCodeAt(0)-97))
        }
        return final
    }

    words=words.map(d=>letters2bit(d))
    puzzles=puzzles.map(d=>[letters2bit(d),1<<(d.charCodeAt(0)-97)])

    return puzzles.map(([puzzle,firstlettermask])=>words.reduce((acc,word)=>acc+Number((puzzle&word)==word && ((firstlettermask&word)!==0)),0))
};