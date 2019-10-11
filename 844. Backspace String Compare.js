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


console.log(backspaceCompare(
    "gtc#uz#",
    "gtc#uz##"
))