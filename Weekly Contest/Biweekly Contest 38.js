var frequencySort = function(nums) {
    let freq={}
    for(let i=0;i<nums.length;i++){
        freq[nums[i]]=(freq[nums[i]]||0)+1
    }

    return nums.sort((a,b)=>freq[a]==freq[b]?b-a:freq[a]-freq[b])
};



var countSubstrings = function(s, t) {
    let n=s.length,m=t.length   
    let result=0;
    for(let len=1;len<=n;len++){
        
        for(let i=0;i<=n-len;i++){

            for(let q=0;q<=m-len;q++){
                let diff=0

                for(let k=q,j=i;k<=q+len-1;k++,j++){
                    if(s[j]!==t[k])
                    diff++
                }
                if(diff==1)
                    result++
            }

        } 
    }
    return result
};


var numWays = function(words, target) {
    let mod=1e9+7,n=words.length,m=words[0].length
    if(m<target.length)
        return 0
    let dict=[...Array(m)].map(d=>[...Array(26)].map(d=>0))
    //create a dicitonary regarding each position of words[i]
    // this dictionoary will hold the frequency of each character on that index
    for (let i = 0; i < n; i++) 
        for (let j = 0; j < m; j++) 
            dict[j][words[i][j].charCodeAt(0)-97]++            

    //dp[i][j]= the number of ways to form 
    // up to target[:i] using dict[:j] till index j
    let dp=[...Array(target.length+1)].map(d=>[...Array(m+1)].map(d=>0))
    dp[0].fill(1)//basecase
    // dp[0][j]=1 means to create '', using dict[:i]
    // the number of ways to form

    for(let j=1;j<=m;j++)
        for(let i=1;i<=target.length;i++)
            times=dict[j-1][target.charCodeAt(i-1) -97],
            //the number of ways I could create it with dict[:j-1]
            // plus the new times 
            // that means the frequency of target[i] on dict[j]
            // times the number of ways I could create target[:i-1]
            // (being at taret[i] lets me use this letter as many times as it is
            // available with the )
            dp[i][j]=(dp[i][j-1]+ dp[i-1][j-1]*times)%mod               

    return dp[target.length][m]%mod
};

console.log(
    numWays(
         ["acca","bbbb","caca"],
        "aba"

       // ["abba","baab"],   "bab"
    )
)
