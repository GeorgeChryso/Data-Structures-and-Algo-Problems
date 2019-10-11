// Given two strings S and T, return if they are equal when both are typed into empty text editors. # means a backspace character.

var backspaceCompare = function(S, T) {
   var OS=[],OT=[]
   
   for (let i = 0; i < Math.max(S.length,T.length); i++) {
        if( S[i]!==undefined){
            if(S[i]==='#')OS.pop()
            else OS.push(S[i])
        }
        if( T[i]!==undefined){
            if(T[i]==='#')OT.pop()
            else OT.push(T[i])
        } 
         
   }
   console.log(OS,OT)
   if(OS.length!==OT.length)return false   
   
   for (let i = 0; i < OS.length; i++) {
     if(OS[i]!==OT[i])return false       
   }
   return true
};


console.log(backspaceCompare(
    "ab#c",
"ad#c"
))