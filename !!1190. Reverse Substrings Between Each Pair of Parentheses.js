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


var reverseParentheses = function(s, start = 0, end = s.length, position = findParentheses(s)) {

    let output = '';
    for (let i = start; i < end; i++) {
      if (s[i] === '(') {
        const str = reverseParentheses(s, i + 1, position[i], position);
        output += reverse(str);
        i = position[i];
      } else {
        output += s[i];
      }
    }
    return output;
  };
  
  function findParentheses(s) {
    const position = {};
    const stack = [];
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '(') {
        stack.push(i);
      } else if (s[i] === ')') {
        position[stack.pop()] = i;
      }
    }
    return position;
  }
  
  function reverse(s) {
    let output = '';
    for (const c of s) {
      output = c + output;
    }
    return output;
  }


//


var reverseParentheses = function(S) {
    function reverse(s) {
        let output = '';
        for (const c of s) {
          output = c + output;
        }
        return output;
      }
      let t=0
        let stack = ['']
        for (c of S){
            console.log(stack)

            if (c == '(') null
            else if( c == ')')
                {var add = stack[stack.length-1]
                    stack.pop()
                stack.unshift(
                    (t%2?reverse(add):add)) 
                t++}
            else
                {stack.unshift(c)}
            }

            stack.pop()
        return stack
};

console.log(reverseParentheses(
  //  "(u(love)i)"
    // "a(ed((oc))da(et)el)b"
    "(ed(et(oc))el)"
     ))


console.log(Math.floor(2))