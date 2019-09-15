// Given a string s that consists of lower case English letters and brackets. 

// Reverse the strings in each pair of matching parentheses, starting from the innermost one.

// Your result should not contain any bracket.



var reverseParentheses = function(S) {
    
    var answ=[]
    var temp=''
    var ret=[]
    var counter=0

    for (let i = 0; i < S.length; i++) {
        if(S[i]=='('){
            if (!counter%2) {
                answ.push(temp)
            }
            else{
                answ.push('')
                ret.push(temp)
                        }
            counter++
            temp=''
            continue
        }
        if(S[i]==')'){
            if (!counter%2) {
                answ.push(temp)
            }
            else{
                answ.push('')
                ret.push(temp)
                        }
            counter--
            temp=''
            continue
        }

        if(counter%2){
            temp=S[i]+temp

        }
        else{
            temp+=S[i]

        }
        console.log(temp)

    }

    console.log(answ,'\n',ret)
   

    return answ
};

console.log(reverseParentheses(
    "(ed(et(oc))el)"   ))

