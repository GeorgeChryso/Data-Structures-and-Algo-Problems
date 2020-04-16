// Given a string containing only three types of characters: '(', ')' and '*', write a function to check whether this string is valid. We define the validity of a string by these rules:

// Any left parenthesis '(' must have a corresponding right parenthesis ')'.
// Any right parenthesis ')' must have a corresponding left parenthesis '('.
// Left parenthesis '(' must go before the corresponding right parenthesis ')'.
// '*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string.
// An empty string is also valid.

// The string size will be in the range [1, 100].




var checkValidString = function(s) {
    if(s.length==1&&s!='*')return false
    let possibilities=[]

    let dfs=(idx,arr)=>{
      
        while(s[idx]!=="*"&&idx<s.length)idx++
        if(idx>=s.length){
            possibilities.push(arr)
            return
        }

        
        let l=[...arr]
        l[idx]='('
        let m=[...arr]
        m[idx]=''
        let r=[...arr]
        r[idx]=')'

        dfs(idx+1,l)
        dfs(idx+1,m)
        dfs(idx+1,r)
    }

    dfs(0,s.split(''))

    let val=arr=>{
        let stack=[]
        for (const ss of arr) {
            if(ss=='(')stack.push(ss)
            else if(ss==')'&&stack.pop()!='(')return false
        }

        return true
    }

    return possibilities.some(d=>val(d))
};


console.log(checkValidString(
    "*()(())*()(()()((()(()()*)(*(())((((((((()*)(()(*)"
        ))