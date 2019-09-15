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
            if (!(counter%2)) {
                if(temp.length!=0)answ.push(temp)
                console.log('hi')

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
            if (!(counter%2)) {
                if(temp.length!=0)answ.push(temp)
                console.log('hi')
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

    console.log(answ,'\n',ret,'\n','\n' )
   for (let i = 0; i < answ.length; i++) {
        if(answ[i]==''){
            console.log(answ,ret, )
            answ[i]=ret[ret.length-1]
            ret.pop()
            console.log(answ,ret ,'\n','\n')

        }       
   }
    return answ.join('')+(temp.length?temp:'')
};

console.log(reverseParentheses(
    "(abcd)"  ))

