// Given a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1.

var firstUniqChar = function(s) {
    var lexic={}
    for (let i = 0; i < s.length; i++) {
        if(lexic[s[i]]==undefined){
            lexic[s[i]]=i
        }
        else{
            lexic[s[i]]=Infinity
        }
    }
    var res=Math.min(...Object.values(lexic))
    return res==Infinity?-1:res

};


let firstUniqChar = s => {
    let states = Array(26).fill(-1)
    let order = []
    
    for (let i = 0; i < s.length; i++) {
        let char = s.charCodeAt(i) - 97
        
        if (states[char] === -1) {
            order.push(char)
            states[char] = i
        } else {
            states[char] = -2
        }
    }
    
    for (let i = 0; i < order.length; i++) {
        let char = order[i]
        let index = states[char]
        if (index > -1) return index
    }
    
    return -1
};




console.log(
    firstUniqChar(
        "cc"

    )
)

console.log(Object.values({a:1,b:2}))