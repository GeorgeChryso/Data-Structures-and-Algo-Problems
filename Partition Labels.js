// A string S of lowercase English letters is given. We want to partition this string into as many parts as possible so that each letter appears in at most one part, and return a list of integers representing the size of these parts.

// Example 1:

// Input: S = "ababcbacadefegdehijhklij"
// Output: [9,7,8]
// Explanation:
// The partition is "ababcbaca", "defegde", "hijhklij".
// This is a partition so that each letter appears in at most one part.
// A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits S into less parts.
 

// Note:

// S will have length in range [1, 500].
// S will consist of lowercase English letters ('a' to 'z') only.

//nlogn
var partitionLabels = function(S) {
    let n=S.length,memo=[...Array(27)].map(d=>[]),result=[]
    for (let i = 0; i <n; i++) {
        let ele=S.charCodeAt(i)-97
        if(memo[ele].length===2)
            memo[ele][1]=i
        else
            memo[ele].push(i)    
    }
    memo=memo.filter(d=>d.length).map(d=>d.length==1?[d[0],d[0]]:d)
    memo.sort((a,b)=>{
        if(a[0]===b[0])return b[1]-a[1]
        return a[0]-b[0]
    })

    result.push(memo[0])
    for (let i = 1; i < memo.length; i++) {
        if(!memo[i].length)continue
        let [a,b]=memo[i]
        let [la,lb]=result[result.length-1]
        if(a<=lb)
            result[result.length-1][1]=Math.max(b,lb)
        else
            result.push([a,b])
    }

    return result.map(([a,b])=>b-a+1)
};

console.log(
    partitionLabels(
        "ababcbacadefegdehijhklij"
    )
)