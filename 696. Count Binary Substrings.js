

var countBinarySubstrings = function(s) {

    var count =0
    function incrMe(i){
        var count0=0
        var count1=0
        s[i]?count1++:count0++
        var j=i+1
        while(j<s.length&&s[j]==s[i]){
            count1++
            j++
        }
        while(j<s.length&&s[j]!=s[i]){
            count0++
            if(count0==count1){
                count++
            }
            j++
        }
    }
    
    for (let i = 0; i < s.length; i++) {
            incrMe(i)        
    }
    return count
};
// time limit exceeded'
var countBinarySubstrings = function(s) {

    var count =0
    var temp=[0,0]
    var flag=s[0]
    temp[s[0]]++
    for (let i =1; i < s.length; i++) {
        while(flag==s[i]){
            temp[s[i]]++
            i++
        }        
        count+=Math.min(temp[0],temp[1])
        temp[s[i]]=0
        flag=s[i]
        i--

    }
    return count
};


console.log(countBinarySubstrings(
    "00110011"))