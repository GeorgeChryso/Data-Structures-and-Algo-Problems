



var sortString = function(s) {
    if(s.length===1)return s
    let freq={}
    for (let i = 0; i < s.length; i++) {
        freq[s[i]]=(freq[s[i]]||0 )+1        
    }

    let z=[...Object.keys(freq)]
    z.sort()

    let result=''

    let left=s.length

    while(left){

        let step1=0
        for (let i = 0; i < z.length; i++) {
            if(freq[z[i]]>0){
                result+=z[i]
                freq[z[i]]--
                left--
            }

        }
        for (let i = z.length-1; i>=0; i--) {
            if(freq[z[i]]>0){
                result+=z[i]
                freq[z[i]]--
                left--
            }

        }

    }
    return result
};





var findTheLongestSubstring = function(s) {

    for (let length = s.length; length >=0; length--) {
    
        let freq={
            'a':0,
            'e':0,
            'i':0,
            'o':0,
            'u':0
        }

        check=()=>Object.values(freq).every(d=>d%2===0)

        for (let i = 0; i < length; i++) {
            if(freq[s[i]]!==undefined)freq[s[i]]++
        }        

        if(check())return length

        let start=0
        for (let end = length; end < s.length; end++ ,start++) {
            if(freq[s[start]]!==undefined)freq[s[start]]--
            if(freq[s[end]]!==undefined)freq[s[end]]++
            if(check())return end-start
        }

    }
   
    return result
};



var longestZigZag = function(root) {
    let result=0

    let dfs=(node,lengthsofar,comingfrom)=>{
        if(comingfrom==0&&node.right===null)result=Math.max(lengthsofar,result)
        if(comingfrom==1&&node.left===null)result=Math.max(lengthsofar,result)
        
        if(comingfrom==0){
            dfs(node.right,lengthsofar+1,1)
        }else{
            dfs(node.left,lengthsofar+1,0)

        }

    }

    dfs(root,0,0)
    dfs(root,0,1)

    return result
};
console.log(
    findTheLongestSubstring  (
        "eleetminicoworoep"
        )
)