// var stringMatching = function(words) {

//     let result=new Set()
//     for (const a of words) {
//         for (const word of words) {

//             if(word.search(a)!=-1&&a!=word){
//                 result.add(a)
//                 break
//             }
//         }
//     }

//     let end=[]
//     result.forEach(d=>end.push(d))

//     return end
// };

// var processQueries = function(queries, m) {
//     let memo={

//     }
//     let P=[...Array(m)].map((d,i)=>{
//          memo[i+1]=i
//          return i+1
//     })
//     let result=[]
//     console.log(P)
//     for (const val of queries) {

//         let i=P.indexOf(val)
//         result.push(i)
//         for (let j =i; j>=1; j--) {
//             P[j]=P[j-1]
//         }

//         P[0]=val

//     }

//     return result
// };

// console.log(
//     processQueries(
//         [3,1,2,1],5
//     )
// )

// var entityParser = function(text) {
//     text=text.replace(new RegExp('&quot;','g'),'\\"')
//     text=text.replace(new RegExp('&apos;','g'),'\'')
//     text=text.replace(new RegExp('&amp;','g'),'&')
//     text=text.replace(new RegExp('&gt;','g'),'>')
//     text=text.replace(new RegExp('&lt;','g'),'<')
//     text=text.replace(new RegExp('&frasl;','g'),'/')

// return text
// };

// console.log(
//     entityParser(
//         "and I quote: &quot;...&quot;"

//     )
// )

var numOfWays = function(n) {
    let m = 1e9 + 7;
    let result = 0;

    let mat = [...Array(n)].map(d => Array(3));

    let count = ( i, j, sel) => {
        if (i == mat.length - 1 && j == 2) {
            if (n == 1) {
                if (sel != mat[0][1]) {
                    mat[i][j] = sel;
                    //console.log(mat);
                    return 1;
                }
                return 0;
            }
            if (
                sel != mat[mat.length - 2][2] &&
                sel != mat[mat.length - 1][1]
            ) {
                mat[i][j] = sel;
               // console.log(mat);
                return 1;
            }
        }
        if (i >= n || j > 2) return 0;
        let flag = true;

        if (i == 0) {
            if (j == 0) {
                flag = true;
            } else {
                flag = flag && sel != mat[i][j - 1];
            }
        }
        if (i > 0) {
            if (j == 0) {
                flag = flag && sel != mat[i - 1][j];
            } else {
                flag = flag && sel != mat[i - 1][j] && sel != mat[i][j - 1];
            }
        }
        if (flag) {
            mat[i][j] = sel;
            let ni, nj;
            if (j == 2) {
                ni = i + 1;
                nj = 0;
            } else {
                ni = i;
                nj = j + 1;
            }

            return (
                (count (ni, nj, 0) +
                    count( ni, nj, 1) +
                    count( ni, nj, 2)) %
                m
            );
        }
        return 0;
    };

    for (let i = 0; i <3; i++) {
        result = (result + count( 0, 0, i)) % m;
    }

    return result % m;
};

console.log(numOfWays(5000));

var numOfWays = function(n) {
    let m = 1e9 + 7;
    let result=0
    let q=[2,2,3,3,3,2,2,3,3,3,2,2]

    for (const first of q) {
        let sum=0
        let last=first
        for (let i = 1; i < n; i++) {
            if(last=2)sum*=5%m
            else sum*=3%m       
            last =
        }
        result=(result+sum)%m
    }
   return m
};