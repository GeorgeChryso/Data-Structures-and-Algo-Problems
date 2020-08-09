var makeGood = function(s) {
    s = s.split('');
    let flag = true;
    for (let i = 0; i < s.length; i++) {
        if (i === s.length - 1) break;
        let a = s[i].charCodeAt(0),
            b = s[i + 1].charCodeAt(0);
        if (Math.abs(a - b) === 32) {
            flag = true;
            s.splice(i, 2);
            i = -1;
        }
    }
    s = s.join('');
    return s;
};

console.log(makeGood(`leEeetcode`));

var findKthBit = function(n, k) {
    let s1 = '0';
    if (n == 1) return s1[k - 1];

    let revinv = s => {
        let res = '';
        for (let i = 0; i < s.length; i++) {
            let ele = s[i];
            if (ele === '1') res = '' + '0' + '' + res;
            else res = '' + '1' + '' + res;
        }

        return res;
    };
    let curr = s1;
    for (let i = 2; i <= n; i++) {
        curr = curr + '1' + revinv(curr);
    }
    return curr[k - 1];
};

var maxNonOverlapping = function(nums, target) {
    let result = [];
    let memo = { 0: 0 };
    let pref = 0;
    let acc = 0;

    for (let i = 0; i < nums.length; i++) {
        acc += nums[i];

        if (memo[acc - target] !== undefined) {
            result.push([memo[acc - target], i]);
        }
        memo[acc] = i + 1;
    }

    var nono = function(intervals) {
        intervals.sort((a, b) => a[1] - b[1]);
        let prev = intervals[0],
            remove = 0;

        for (let i = 1; i < intervals.length; i++) {
            const [prevS, prevE] = prev;
            const [currS, currE] = intervals[i];
            if (prevE < currS) prev = intervals[i];
            else remove++;
        }
        return remove;
    };

    console.log(result);
    console.log(nono(result));
    return result.length - nono(result);
};

// const permutator = (inputArr) => {
//     let result = [];

//     const permute = (arr, m = []) => {
//       if (arr.length === 0) {
//         result.push(m)
//       } else {
//         for (let i = 0; i < arr.length; i++) {
//           let curr = arr.slice();
//           let next = curr.splice(i, 1);
//           permute(curr.slice(), m.concat(next))
//        }
//      }
//    }

//    permute(inputArr)

//    return result;
//   }

// var minCost = function(n, ca) {
//     let min=n*n+n

//     let cc=permutator(ca)
//     console.log(cc)
//     let helper=cuts=>{
//         let result=0
//         let c=[[0,n]]
//         for (let i = 0; i < cuts.length; i++) {
//             let cut=cuts[i]
//             for (let j = 0; j < c.length; j++) {
//                 let [lo,hi]=c[j]

//                 if(cut>=lo&&cut<=hi){
//                     result+=hi-lo
//                     if(result>min)return Infinity
//                     c.splice(j,1, [lo,cut]  ,[cut,hi])
//                     break
//                 }

//             }

//         }
//         return result
//     }
//     cc.forEach(ct=>{
//         let d=helper(ct)
//         min=Math.min(min,d)
//     }
//     )

//     return min
// };

var minCost = function(n, cuts) {
    let dp = [...Array(n+1)].map(d => [...Array(n+1)]);
    cuts.push(0, n);
    cuts.sort((a, b) => a - b);

    let rec = (i, j) => {
        if (i > n || j > n || j < 0 || i < 0) return Infinity;
        let min = Infinity;
        if (Math.abs(j - i) <= 1) return 0;
        if (dp[i][j] !== undefined) return dp[i][j];

        // for (let k = 0; k < cuts.length; k++) {
        //     if (cuts[k] <= i || cuts[k] >= j) continue;
        //     min = Math.min(min, rec(i, cuts[k]) + rec(cuts[k], j) + j - i);
        // }
        for (let k = i + 1; k < j; k++) {
            min = Math.min(min, rec(i, k) + rec(k, j) + cuts[j] - cuts[i]);
        }
        dp[i][j] = min === Infinity ? 0 : min;
        return min;
    };
    rec(0, n);
    dp.forEach(d => console.log(d + ''));
    return dp[0][n];
};



//known dp with fixed lengths
//Let dp[i][j] be the minimum cost if we cut on the stick from cuts[i] to cuts[j].
//                                                             -------------------

var minCost = function(n, cuts) {
    cuts.push(0, n);
    cuts.sort((a, b) => a - b);
    console.log(cuts)
    let N=cuts.length
    let dp = [...Array(N)].map(d => [...Array(N)].map(d=>Infinity));

    // length of my window is 1 
    //adjacent cuts on my starting array
    for (let i = 0; i <N; i++) {
        dp[i][i+1]=0  // cant cut it. As in I m never given the option to perform that cut No matter what the numbers are. 
    }
    // length of my window is 2
    for (let i = 0; i <N-1; i++) {
        dp[i][i+2]=cuts[i+2]-cuts[i] // Obviously, for every triplet a,b,c in cuts, dp[idx(a)][idx(c)]=c-a because I can only perform the cut at b (the middle element)
    }

    //for every length
    for (let len = 3; len < N; len++) {
        //consider each window i,j of my CUTS ARRAY representing the acutual window [cuts[i],cuts[j]]
        for (let i = 0; i <=N-len; i++) {
            let j=i+len
            //consider each possible MIDDLE CUT k 
            for (let k = i+1; k < j; k++) {
                dp[i][j]=Math.min(dp[i][j],cuts[j]-cuts[i]+dp[i][k]+dp[k][j])                
            }            
        }
    }
    
    return dp[0][N-1];
};
console.log(minCost(7, [1, 3, 4, 5]));
