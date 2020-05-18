// In a string S of lowercase letters, these letters form consecutive groups of the same character.

// For example, a string like S = "abbxxxxzyy" has the groups "a", "bb", "xxxx", "z" and "yy".

// Call a group large if it has 3 or more characters.  We would like the starting and ending positions of every large group.

// The final answer should be in lexicographic order.



var largeGroupPositions = function(S) {
    let start=0
    let result=[]
    for (var i = 0; i < S.length; i++) {
        if(S[start]!==S[i]){
            if(i-start>=3){
                result.push([start,i-1])
            }
            start=i
        }
    }
    i-start>=3?result.push([start,i-1]):null
    return result
};