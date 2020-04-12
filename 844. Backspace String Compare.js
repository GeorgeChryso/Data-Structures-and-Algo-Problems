// Given two strings S and T, return if they are equal when both are typed into empty text editors. # means a backspace character.

var backspaceCompare = function(S, T) {
   var curr=0,endofS=0,endofT=0
   S=Array.from(S)
   T=Array.from(T)
   for (let i = 0; i < S.length; i++) {
        if(S[i]=='#'){
            curr?curr--:null
            console.log( curr)


        }
        else{
            S[curr]=S[i]
            curr++
            console.log(S+'',curr)

        }
   }
   endofS=curr
   for (var i = 0,curr=0; i < T.length; i++) {
        if(T[i]=='#'){
            curr?curr--:null
            console.log( curr)
        }
        else{
            T[curr]=T[i]
           
            curr++
            console.log(T+'',curr)
        }
    }
    endofT=curr
    if(endofT!=endofS)return false
    
    for (let i = 0; i < endofT; i++) {
     if(S[i]!==T[i])return false       
   }
   return true
};



var backspaceCompare = function(S, T) {
    
    
    // Define a regex expression to locate a backspace and number
    let reg = /[a-z]\#/gi;
    
    let reg2 = /\#/gi;
    
    while(reg.test(S)) {
            S = S.replace(reg,"")   
    }

    
    while(reg.test(T)) {
        T = T.replace(reg,"")   
    }
    

    while(reg2.test(S)) {
          S = S.replace(reg2,"")   
    }

    
    while(reg2.test(T)) {
        T = T.replace(reg2,"")   
    }
    
    
    return (S === T) ? true : false;

};

//compare 2 lifo queues O(m+n) runtime space
var backspaceCompare = function(S, T) {
    
    let sq=[]
    let tq=[]

    for (const letter of S) {
        if(letter=="#"){
            if(sq.length)sq.pop()
        }
        else{
            sq.push(letter)
        }
    }
    for (const letter of T) {
        if(letter=="#"){
            if(tq.length)tq.pop()
        }
        else{
            tq.push(letter)
        }
    }
    
    return sq.every((d,i)=>d===tq[i])
    
};



console.log(backspaceCompare(
    "gtc#uz#",
    "gtc#uz##"
))