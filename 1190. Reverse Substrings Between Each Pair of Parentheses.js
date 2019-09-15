// Given a string s that consists of lower case English letters and brackets. 

// Reverse the strings in each pair of matching parentheses, starting from the innermost one.

// Your result should not contain any bracket.



var reverseParentheses = function(S) {
    function lean(answ,ret,temp){
        for (let i = 0; i < answ.length; i++) {
             if(answ[i]==''){
                 answ[i]=ret[ret.length-1]
                 ret.pop()
     
             }       
        }
        if( answ.length!=0)
        {
        answ=[]
        temp=''
        ret=[]}


     }
    var answ=[]
    var temp=''
    var ret=[]
    var counter=0

    for (let i = 0; i < S.length; i++) {
      
        if(S[i]=='('){
            if (!(counter%2)) {
                if(temp.length!=0)answ.push(temp)

            }
            else{
                
                answ.push('')
                ret.push(temp)
                        }
            counter++
            if(!counter ){
                lean(answ,ret,temp)
            }
            temp=''
            continue
        }
        if(S[i]==')'){
            if (!(counter%2)) {
                if(temp.length!=0)answ.push(temp)
            }
            else{
              answ.push('')
                ret.push(temp)
                        }
            counter--
            if(!counter ){
                lean(answ,ret,temp)
            }
            temp=''
            continue
        }

        if(counter%2){
            temp=S[i]+temp

        }
        else{
            temp+=S[i]

        }

    }
return answ.join('')+(temp?temp:'')
};

console.log(reverseParentheses(
    "sxmdll(q)eki(x)"))

