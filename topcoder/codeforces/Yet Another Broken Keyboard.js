// Recently, Norge found a string s=s1s2…sn consisting of n lowercase Latin letters. As an exercise to improve his typing speed, he decided to type all substrings of the string s. Yes, all n(n+1)2 of them!

// A substring of s is a non-empty string x=s[a…b]=sasa+1…sb (1≤a≤b≤n). For example, "auto" and "ton" are substrings of "automaton".

// Shortly after the start of the exercise, Norge realized that his keyboard was broken, namely, he could use only k Latin letters c1,c2,…,ck out of 26.

// After that, Norge became interested in how many substrings of the string s he could still type using his broken keyboard. Help him to find this number.

// Input
// The first line contains two space-separated integers n and k (1≤n≤2⋅105, 1≤k≤26) — the length of the string s and the number of Latin letters still available on the keyboard.

// The second line contains the string s consisting of exactly n lowercase Latin letters.

// The third line contains k space-separated distinct lowercase Latin letters c1,c2,…,ck — the letters still available on the keyboard.

// Output
// Print a single number — the number of substrings of s that can be typed using only available letters c1,c2,…,ck.



// given a string S which contains lowercase letters
// and  K  available letters,
// output the number of substrings of S that we can type with K available letters


'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '',currentLine = 0,
    readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
    });
    function main() {
        let [n,k]=readline().split(' ').map(d=>Number(d))
        let A=readline()
        let B=readline().split(' ').map(d=>d)
        let result=Brokenn(A,B) //solves a simple test case
        console.log(result.toString())
    }
    main();    
});

//naive N^2
let Broken=(A,K)=>{
    let n=A.length
    K=new Set(K)
    // let dp=[...Array(n)].map(d=>[...Array(n)].map(d=>0))
    // dp[0][0]=1
    /*
        dp[i][j]= number of ways i can type the substring [i,j]
    */
    let result=0
    for (let i = 0; i < n; i++) {
        let prev=Number(K.has(A[i]))
        result+=prev
        for (let j = i+1; j < n; j++) {
            if(!K.has(A[j])){
                prev=0
                break
            }
            result+=prev
        }        
    }
    return result
}

let Brokenn=(A,K)=>{
    let n=A.length
    K=new Set(K)
    /*
        dp[i]=ways to type substrings that end at i 
        dp[i]=  dp[i-1]+1 ,if K has A[i]
                0         ,else
    */
    let result=0,prev=0
    for (let i = 0; i < n; i++) {
        if(K.has(A[i]))
            prev=prev+1
        else 
            prev=0
        result+=prev
    }
    return result
}



