// You are given a string s of even length consisting of digits from 0 to 9, and two integers a and b.

// You can apply either of the following two operations any number of times and in any order on s:

// Add a to all odd indices of s (0-indexed). Digits post 9 are cycled back to 0. For example, if s = "3456" and a = 5, s becomes "3951".
// Rotate s to the right by b positions. For example, if s = "3456" and b = 1, s becomes "6345".
// Return the lexicographically smallest string you can obtain by applying the above operations any number of times on s.

// A string a is lexicographically smaller than a string b (of the same length) if in the first position where a and b differ, string a has a letter that appears earlier in the alphabet than the corresponding letter in b. For example, "0158" is lexicographically smaller than "0190" because the first position they differ is at the third letter, and '5' comes before '9'.
// Input: s = "5525", a = 9, b = 2
// Output: "2050"
// Explanation: We can apply the following operations:
// Start:  "5525"
// Rotate: "2555"
// Add:    "2454"
// Add:    "2353"
// Rotate: "5323"
// Add:    "5222"
// ​​​​​​​Add:    "5121"
// ​​​​​​​Rotate: "2151"
// ​​​​​​​Add:    "2050"​​​​​​​​​​​​
// There is no way to obtain a string that is lexicographically smaller then "2050".

// BFS
var findLexSmallestString = function(s, a, b) {
     let result=Number(s),memo=new Set([s]),n=s.length
     let stringres=s
    let q=[s]
    while(q.length){
        let temp=[]
        while(q.length){
            let curr=q.shift()
            if(result>Number(curr)){
                result=Number(curr)
                stringres=curr
            }
            //operation 2
            let shifted=curr.slice(n-b)+curr.slice(0,n-b)
            if(!memo.has(String(shifted)))
                temp.push(shifted)
            memo.add(shifted)
            
            //operation 1
            let ele=[]
            for (let i = 0; i <n; i++) 
                if(i%2)
                    ele.push((Number(curr[i])+a)%10)                
                else
                    ele.push(curr[i])
           let op1=ele.join('')
           if(!memo.has(op1))
                temp.push(op1)
            memo.add(op1)
        }
        q=temp
    }   
    return stringres //avoid leading 0s error
};
console.log(findLexSmallestString(
    '5525',9,2
))