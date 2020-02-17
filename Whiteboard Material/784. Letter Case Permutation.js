

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


var letterCasePermutation = function(S) {
    
    let result={}
    let recursion=(index,str)=>{
        if(index>=S.length)return
        result[str]=result[str]||true
        if(str[index]<65)recursion(index+1,str)
        let typeA=str.slice(0,index)+str[index].toUpperCase()+str.slice(index+1)
        let typeB=str.slice(0,index)+str[index].toLowerCase()+str.slice(index+1)

        recursion(index+1,typeA)
        recursion(index+1,typeB)

    }

    recursion(0,S)
    return Object.keys(result)
}

console.log(
    
)