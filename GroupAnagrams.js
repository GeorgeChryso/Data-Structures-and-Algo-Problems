







//sorting
var groupAnagrams = function(strs) {

    
    

    let sort=str=>{

        let zz=str.split('').sort((a,b)=>a.charCodeAt(0)-b.charCodeAt(0))
        return zz.join('')
    }
    let codes={}

    for (const string of strs) {
        
        let h=hash(string)

        if(codes[h]===undefined)codes[h]=[string]
        else{
            codes[h].push(string)
        }
    }

    return Object.values(codes)
};

//hash
var groupAnagrams = function(strs) {

    
    //calculate hash
    let hash=str=>{

        let sum=0n
        for (let i = 0; i < str.length; i++) {
            const letter = str[i];
            sum+=BigInt(letter.charCodeAt(0)*7+(1-letter.charCodeAt(0))*letter.charCodeAt(0)*letter.charCodeAt(0)*13+7*letter.charCodeAt(0)+letter.charCodeAt(0)*11+7-letter.charCodeAt(0)*letter.charCodeAt(0)*3+letter.charCodeAt(0)+2+110%letter.charCodeAt(0))
        }
        
        return sum
    }

   
    let codes={}

    for (const string of strs) {
        
        let h=hash(string)

        if(codes[h]===undefined)codes[h]=[string]
        else{
            codes[h].push(string)
        }
    }

    return Object.values(codes)
};

// prime hashing (assigning a letter to a prime, and multiplying )
const groupAnagrams = (strs) => {
    const resp = new Array(),
          termsGrouped = new Map();
    
    strs.forEach(term => {
        const hashed = hash(term);
        if(!termsGrouped.has(hashed)) termsGrouped.set(hashed, new Array());
        termsGrouped.get(hashed).push(term);
    });
    
    termsGrouped.forEach(terms => {
        resp.push(terms);
    });
    
    return resp;
};

const hash = (term) => {
    const primeLetterNumbers = [
        2, 3, 5, 7, 11, 13, 
        17, 19, 23, 29, 31, 37, 
        41, 43, 47, 53, 59, 61, 
        67, 71, 73, 79, 83, 89, 
        97, 101
    ];
    
    let accum = 1;
    for(let letter of term) {
        const primeIndex = letter.charCodeAt(0) - 'a'.charCodeAt(0);
        const primeMapping = primeLetterNumbers[primeIndex];            

        accum *= primeMapping;
    }
    
    return accum;
};
console.log(groupAnagrams(["run","had","lot","kim","fat","net","fin","rca","chi","lei","lox","iva","liz","hug","hot","irk","lap","tan","tux","yuk","hep","map","ran","ell","kit","put","non","aol","add","lad","she","job","mes","pen","vic","fag","bud","ken","nod","jam","coy","hui","sue","nap","ton","coy","rut","fit","cut","eta","our","oho","zip"]))