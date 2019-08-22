'use strict'

// Given a List of words, return the words that can be typed using letters of alphabet on only one row's of American keyboard like the image below.


var findWords = 
(
function(words) {
    var first='qwertyuiopQWERTYYUIOP'
    var second='asdfghjklASDFGHJKL'
    var third='zxcvbnmZXCVBNM'
    var answer=[]


    function checki(d,strink){
        for (let i =1; i < d.length; i++) {
               if (strink.indexOf(d[i])==-1){
                    return false
               }         
        }
        return true
    }


   words.forEach((d)=>{
        if(first.indexOf(d[0])!=-1){
            checki(d,first)?answer.push(d):null;
        }
        else if(second.indexOf(d[0])!=-1){

            checki(d,second)?answer.push(d):null;
        }
        else{
            checki(d,third)?answer.push(d):null;
        }
        
        



    }
   )

   return answer
}
)(["Hello", "Alaska", "Dad", "Peace"])

console.log(findWords)