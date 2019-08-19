// Given a string S and a character C, return an array of integers representing the shortest distance from the character C in the string.


var shortestToChar = (function(S, C) {
    var arr=[]
  S= S.split("")
  S.forEach((d,i)=>{
        if(d==C){
            arr.push(i)
        }
    })
 return   S.map((d,i)=>{
        return Math.min(...arr.map((q,j)=>Math.abs(i-q)))
    })


})(
    "loveleetcode",'e'
    )

console.log(shortestToChar)