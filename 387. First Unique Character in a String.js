// Given a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1.

var firstUniqChar = function(s) {
    var lexic={}
    var arry=Array(s.length).fill(-1)
    var min=0
    for (let i = 0; i < s.length; i++) {
        if(lexic[s[i]]==undefined){
            lexic[s[i]]=i
            arry[i]=i

        }
        else{
            arry[lexic[s[i]]]=-1
            lexic[s[i]]=i
            arry[i]=-1
        }
    }
    for (let i = 0; i < arry.length; i++) {
        if(arry[i]!=-1)return i        
    }
    return -1

    var res=Math.min(...Object.values(lexic))
    return res==Infinity?-1:res

};




console.log(
    firstUniqChar(
        "cc"

    )
)

