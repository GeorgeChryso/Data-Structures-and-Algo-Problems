

// Given a string S, we can transform every letter individually to be lowercase or uppercase to create another string.  Return a list of all possible strings we could create.

// Examples:
// Input: S = "a1b2"
// Output: ["a1b2", "a1B2", "A1b2", "A1B2"]

// Input: S = "3z4"
// Output: ["3z4", "3Z4"]

// Input: S = "12345"
// Output: ["12345"]
// Note:

// S will be a string with length between 1 and 12.
// S will consist only of letters or digits.

//dfs sortof
var letterCasePermutation = function(S) {
    
    let result={}
    let recursion=(index,str)=>{
        result[str]=result[str]||true

        //not a letter
        while(str.charCodeAt(index)<65)index++

        if(index>=S.length)return

        //the string with the indexed letter Capital
        let typeA=str.slice(0,index)+str[index].toUpperCase()+str.slice(index+1)
        recursion(index+1,typeA)

        //the string with the indexed letter Lowercase
        let typeB=str.slice(0,index)+str[index].toLowerCase()+str.slice(index+1)
        recursion(index+1,typeB)

    }

    recursion(0,S)
    return Object.keys(result)
}



//REALIZATION: S will be a string with length between 1 and 12.
// intuition: Length low enough to store state on bits
var letterCasePermutation = function(S) {
    let letterIndexes=new Set()  
    for (let i = 0; i < S.length; i++) {
        if(!(S.charCodeAt(i)<65)){
            letterIndexes.add(S.length-1-i)
        }
    }
    if(letterIndexes.size==0)return [S]

    let result=Array(2**letterIndexes.size).fill(null).map((d,i)=>i)

    return result.map((bin)=>{
        let final=''
        for (let k = S.length-1; k>=0; k--) {
            let letter=String(S[S.length-1-k])
            if(letterIndexes.has(k)){
              final+=((bin&1)?letter.toUpperCase():letter.toLowerCase())
              bin>>=1
            }
            else{
              final+=letter
            }
            
        }
        return final
    })
}

const letterCasePermutation = s => {
    const result = []
    let stringLength = s.length;
    helper('', s.length-1)
    return result;
    
    function helper(currString, index) {
        if(index < 0) {
            result.push(currString)
            return;
        }
        let char = s[index];
        if(char <= '9') helper(char + currString , index-1);
        else {
            helper(char.toLowerCase() + currString , index-1);
            helper(char.toUpperCase() + currString , index-1);
        }
    }
}
console.log(
    letterCasePermutation(
        '3z4'
        
    )
)