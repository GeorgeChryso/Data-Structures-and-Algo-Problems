'use strict'

// Share
// Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Note that an empty string is also considered valid.

// Example 1:

// Input: "()"
// Output: true
// Example 2:

// Input: "()[]{}"
// Output: true

var isValid=(s)=>{
    if (s === null || s.length <= 0) return true;
while ( /\(+\)/.test(s) || /\{+\}/.test(s) || /\[+\]/.test(s) ){
    s = s.replace("()", "").replace('{}', "").replace('[]', "")

}

return s==''
}


// slow af


var isValid = function(s) {
    if (s === null || s.length <= 0) return true;
    var expect = [];                    // I create an array that will serve as 
    for (var c of s) {                  // the expected value 
        if (c == '[') expect.push(']');     // I Iterate, saving the expected value
        else if (c == '{') expect.push('}'); // each time i see the relevant element
        else if (c == '(') expect.push(')');
        else if (expect.length == 0 || c != expect.pop()) return false;
        // If I see a closing element, and it's not what I expect, I return false 
        // Otherwise, I pop one element and expect the next one

    }
    if (expect.length == 0) return true; // If the iteration finishes with no elements
                                        // in expected, I return true
    return false;                       // else False
};


// faster


var isValid=function(s){
    console.log(s)
    var pairs={
        "\(" : "\)",
        "\{" : "\}",
        "\[" : "\]"
    }

    var open=[]         

    for(var i = 0; i<s.length; i++){            //iteration
        console.log( 's[i]=', s[i])
        if(s[i] in pairs){      // sto open vazw ta anoigmena poy sunantw
            open.push(s[i])
            console.log('open',open)
        }
        else {                              //an sunatnisw klseisto
            var current = open.pop()            // pairnw to prwto tou open
            console.log('current',current)
            if(pairs[current] !== s[i]){        // kai an den einai to antistoixo tou
                return false                    // epistrefw false
            }
        }
    }
    return open.length === 0                // an den mou exoun meinei anoixta true
}

//stack
var isValid = function(string) {
    if(string.length==1)return false
    let stack=[]
    string=string.split("")
    for(let s of string){
        if(s=="("||s=="{"||s=="[")stack.push(s)
        else{
            if(stack.length==0)return false
            let p=stack.pop()
            
            if(s==")"&&p!="(")return false
            if(s=="]"&&p!="[")return false
            if(s=="}"&&p!="{")return false
        }
    }
    return stack.length==0
};
console.log(isValid(
    '()([)'
    ))

