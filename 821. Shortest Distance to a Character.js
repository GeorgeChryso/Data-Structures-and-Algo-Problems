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



    var shortestToChar = (function(S, C) {
        
            let res = new Array(S.length);
            let pre = Infinity;
            for(let i=0;i<S.length;i++){
                if(S[i] == C){
                    pre = i
                } 
                res[i] = Math.abs(i - pre)
             
            }
            pre = Infinity;
            for(let i = S.length-1;i>=0;i--){
                if(S[i] == C){
                    pre = i
                }
                res[i] = Math.min(res[i],Math.abs(pre-i))
                
            }
            return res;
        
     
    
    })(
        "loveleetcode",'e'
        )
    



    
console.log(shortestToChar)




