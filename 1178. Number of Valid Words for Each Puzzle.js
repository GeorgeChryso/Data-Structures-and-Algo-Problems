// With respect to a given puzzle string, a word is valid if both the following conditions are satisfied:
// word contains the first letter of puzzle.
// For each letter in word, that letter is in puzzle.
// For example, if the puzzle is "abcdefg", then valid words are "faced", "cabbage", and "baggage"; while invalid words are "beefed" (doesn't include "a") and "based" (includes "s" which isn't in the puzzle).
// Return an array answer, where answer[i] is the number of words in the given word list words that are valid with respect to the puzzle puzzles[i].


// Constraints:

// 1 <= words.length <= 10^5
// 4 <= words[i].length <= 50
// 1 <= puzzles.length <= 10^4
// puzzles[i].length == 7
// words[i][j], puzzles[i][j] are English lowercase letters.
// Each puzzles[i] doesn't contain repeated characters.


//standard bit state compression solution, works but is slow
var findNumOfValidWords = function(words, puzzles) {
    //dictionaries for repeated words
    let dict={}
    let puzzledict={}
    let letters2bit=word=>{
        let final=0
        for (const letter of word) {
            final|=(1<<(letter.charCodeAt(0)-97))
        }
        return final
    }

    words=words.map(d=>{
        if(dict[d]!==undefined)return dict[d]
        dict[d]=letters2bit(d)
        return dict[d]
    })
    puzzles=puzzles.map(d=>{
        if(puzzledict[d]!==undefined)return puzzledict[d]
        puzzledict[d]=[d,letters2bit(d),1<<(d.charCodeAt(0)-97)]
        return puzzledict[d]
    })
    let resultdict={}
    return puzzles.map(([original,puzzle,firstlettermask])=>{
        if(resultdict[original]!==undefined)return resultdict[original]
        resultdict[original]= words.reduce((acc,word)=>acc+Number((puzzle&word)==word && ((firstlettermask&word)!==0)),0)
        return resultdict[original]
     }
    )
};


var findNumOfValidWords = function(words, puzzles) {
   
    //dictionaries for repeated words
    let letters2bit=word=>{
        let final=0
        for (const letter of word) {
            final|=(1<<(letter.charCodeAt(0)-97))
        }
        return final
    }
    let dict={}
    words.forEach(d=>{
        let bitrep=letters2bit(d)
        dict[bitrep]=(dict[bitrep]||0)+1
    })

    puzzles.forEach((paz,i)=>{
        let firstlettermask=1<<(paz.charCodeAt(0)-97)
        let puzzle=letters2bit(paz)
        let counter=0
        //this part is what's causing the TLE
        // instead of brute forcing the words,
        // I can think smarter and consider instead every possible subset
        // of my puzzle bitwise representation 
        // for (var word in dict) {
        //     word=Number(word)
        //     if((puzzle&word)===word&&((firstlettermask&word)!==0)){
        //         counter+=(dict[word])
        //     }
        // }


        //instead, Iterate over ONLY the subsets of my number
        let mask=puzzle
        while(mask!=0){
            if((firstlettermask&mask)!==0){
                counter+=dict[mask]||0
            }
            mask=(mask-1)&puzzle //finds all the subsets of my mask
        }

        puzzles[i]=counter
      })

    return puzzles
};

console.log(findNumOfValidWords(
    ["aaaa","asas","able","ability","actt","actor","access"],
["aboveyz","abrodyz","abslute","absoryz","actresz","gaswxyz"]
))

var findNumOfValidWords = function(words, puzzles) {
    const toMask = function(str) {
        let res = 0;
        for (const ch of str) {
            res |= 1 << (ch.charCodeAt(0) - 'a'.charCodeAt(0));
        }
        return res;
    }
    const counts = new Map();
    for (const word of words) {
        const mask = toMask(word);
        counts.set(mask, counts.has(mask) ? counts.get(mask) + 1 : 1);
    }

    const res = [];
    for (const puzzle of puzzles) {
        const mask = toMask(puzzle);
        const first = 1 << (puzzle.charCodeAt(0) - 'a'.charCodeAt(0));
        let cnt = 0, sub = mask;
        //essentially brute forces every number less than my current
        //which can be a subset of my puzzle bitwise representation, 
        // saving a lot of time. could be saved
        while (sub !== 0) {
            if ((sub & first) && counts.has(sub)) {
                cnt += counts.get(sub);
            }
            sub = (sub - 1) & mask; //fookin genius or what
        }
        res.push(cnt);
    }
    return res;
};




