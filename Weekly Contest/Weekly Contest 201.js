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




console.log(minCost(7, [1, 3, 4, 5]));
