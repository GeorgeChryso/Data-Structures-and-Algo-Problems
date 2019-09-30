// Given a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1.

var firstUniqChar = function(s) {

    
    var arry=Array(26).fill(s.length+1)
    var order=[]
    for (let i = 0; i < s.length; i++) {
        var z=s.charCodeAt(i) -97

        if(arry[z]==s.length+1){
            arry[z]=i
            order.push(z)
        }
        else{
            arry[z]=s.length
        }

    }

    for (let i = 0; i < order.length; i++) {
        if(arry[order[i]]<s.length)return arry[order[i]]      
    }
    return -1



};




console.log(
    firstUniqChar(
        "cc"
    )
)

