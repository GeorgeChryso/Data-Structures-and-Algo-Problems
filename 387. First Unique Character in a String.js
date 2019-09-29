// Given a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1.

var firstUniqChar = function(s) {
    var arry=Array(26).fill(s.length+1)
  
    for (let i = 0; i < s.length; i++) {
        var z=s.charCodeAt(i) -97

        if(arry[z]==s.length+1){
            arry[z]=i
        }
        else{
            arry[z]=s.length
        }

    }
    
    var z=Math.min(...arry)
    return z<s.length?z:-1



};




console.log(
    firstUniqChar(
        "cc"
    )
)

