// Alice and Bob play the game Nim Square.
// Nim Square is just like ordinary three-heap normal play Nim, but the players may only remove a square number of stones from a heap.
// The number of stones in the three heaps is represented by the ordered triple (a,b,c).
// If 0≤a≤b≤c≤29 then the number of losing positions for the next player is 1160.

// Find the number of losing positions for the next player if 0≤a≤b≤c≤100 000.
//https://projecteuler.net/problem=310

// so, sprague grundy tells us that the grundy number of multiple games
// is the xor sum of all the games themselves
// in this case
// G(state)=0 means that the state is losing
// G( {abc})= G(a) xor G(b) xor G(c)
// and i need to claculate how many triplets {a,b,c}
// have a Grundy state of 0,aka losing states

//let's first prove the hypothesis 
// If 0≤a≤b≤c≤29 then the number of losing positions for the next player is 1160.
// we ll first have to calculate the Grundy number for a simple stack of 29

let GrundyResults=x=>{
    let n=x,candidates=[] //my candidates to remove
    for(let i=1;i*i<=x;i++)
        candidates.push(i*i)
    let m=candidates.length

    // let dp=[...Array(n+1)].map(d=>0)
    //  dp[0]=0//0 is a losing state
    // for (let i = 1; i <=n; i++) 
    //     for (let j = 0; j < m&&candidates[j]<=i; j++)
    //         if(dp[i-candidates[i]]==0)
    //             dp[i]=1
    
    //now dp[n] DOES NOT HOLD the grundy number of n
    // dp holds whether a state is winning or losing (1 or 0 respectively)


    //Actually Im going to manually calculate the grundy number of each state
    // through the recursion grundy[n]=mex{,...grundy[n-k**2]}, k**2<=n
    let nimber=[...Array(n+1)].map(d=>0)
    nimber[0]=0//basecase
    for (let i = 1; i <=n; i++){
        let memo=new Set()
        for (let j = 0; j < m&&candidates[j]<=i; j++)
            memo.add(nimber[i-candidates[j]])

        for (let k = 0; k <=i+1; k++) 
            if(!memo.has(k)){
                nimber[i]=k
                break
            }            
    }

    
    // // O R D E R E D    T R I P L E 
    // B R U T E  F O R CE IS B A D 
    // for (let a = 0;  a<=n; a++) 
    //     for (let b = a; b <=n; b++) 
    //         for (let c = b; c <= n; c++) 
    //             if(((nimber[a]^nimber[b])^nimber[c])===0)
    //                 result++

                        
    let freqs=[...Array(n+1)].map(d=>0)
    // freq[k]
    // number of frequency of k=nims[i]^nims[j] pairs, where i<=j
    let res=0

    // Essentially how many pairs are there from a onwards, such that(nimber[a]^sth)==0
    for (let a= n;a>=0; a--){ //
        for (let b = a; b <=n; b++) 
            freqs[nimber[a]^nimber[b]]++               
        res+=freqs[nimber[a]] 
    }
              
    console.log(freqs)
    return res
}
console.log(GrundyResults(29)) //1160
console.log(GrundyResults(100000)) //2586528661783

//More nimbers
// https://projecteuler.net/problem=306
// https://projecteuler.net/problem=400
// https://www.codechef.com/problems/FDIVGAME
// https://onlinejudge.org/external/14/1482.pdf
// https://atcoder.jp/contests/arc091/tasks/arc091_d
// https://codingcompetitions.withgoogle.com/codejam/round/00000000000516b9/0000000000134cdf
// https://codeforces.com/blog/entry/55274 
// <game theory tab