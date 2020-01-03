// You are given a square board of characters. You can move on the board starting at the bottom right square marked with the character 'S'.

// You need to reach the top left square marked with the character 'E'. The rest of the squares are labeled either with a numeric character 1, 2, ..., 9 or with an obstacle 'X'. In one move you can go up, left or up-left (diagonally) only if there is no obstacle there.

// Return a list of two integers: the first integer is the maximum sum of numeric characters you can collect, and the second is the number of such paths that you can take to get that maximum sum, taken modulo 10^9 + 7.

// In case there is no path, return [0, 0].

//DFS TLE
var pathsWithMaxScore = function(A) {
    var sumsMemo = {};
    var dp = (i, j, curSum) => {
        if (i < 0 || j < 0) return;
        if (A[i][j] == 'E') {
            sumsMemo[Number(curSum)] = (sumsMemo[Number(curSum)] || 0) + 1;
            return;
        } else if (A[i][j] != 'X' && A[i][j] != 'S')
            curSum = curSum + parseInt(A[i][j], 10);

        if (j >= 1 && A[i][j - 1] != 'X') {
            dp(i, j - 1, curSum);
        }
        if (i >= 1 && A[i - 1][j] != 'X') {
            dp(i - 1, j, curSum);
        }
        if (i >= 1 && j >= 1 && A[i - 1][j - 1] != 'X') {
            dp(i - 1, j - 1, curSum);
        }
    };
    dp(A.length - 1, A[0].length - 1, 0);

    if (!Object.keys(sumsMemo).length) return [0, 0];

    let result = Math.max(...Object.keys(sumsMemo).map(d => parseInt(d)));
    let ways = sumsMemo[result];
    let res = [];
    res.push(Number(result), Number(ways));
    //console.log(result,ways)

    return res;
};

// NEEDS memoization
var pathsWithMaxScore = function(A) {
    var DIRECTIONS = [
        [0, -1], // go left
        [-1, 0], // go up
        [-1, -1] // go up-left (diagonally)
    ];

    const M = A.length; //rows
    const N = A[0].length; // columns
    let dpSum = Array(M)
        .fill(null)
        .map(d => Array(N).fill(null));
    let dpCount = Array(M)
        .fill(null)
        .map(d => Array(N).fill(null));

    dpCount[M - 1][N - 1] = 1; //set the start count to 1

    for (let r = M - 1; r >= 0; r--) {
        for (let c = N - 1; c >= 0; c--) {
            if (dpCount[r][c] == 0) continue; // can't reach to this square

            for (let dir of DIRECTIONS) {
                let nr = r + dir[0];
                let nc = c + dir[1];

                if (nr >= 0 && nc >= 0 && A[nr][nc] != 'X') {
                    let nsum = dpSum[r][c];

                    if (A[nr][nc] != 'E') nsum += A[nr][nc] - '0';
                    if (nsum > dpSum[nr][nc]) {
                        dpCount[nr][nc] = dpCount[r][c];
                        dpSum[nr][nc] = nsum;
                    } else if (nsum == dpSum[nr][nc]) {
                        dpCount[nr][nc] =
                            (dpCount[nr][nc] + dpCount[r][c]) % 1000000007;
                    }
                }
            }
        }
    }

    if (!dpCount[0][0] || !dpSum[0][0]) return [0, 0];
    else return [dpSum[0][0], dpCount[0][0]];
};

// dfs
var pathsWithMaxScore = function(A) {
    const M = A.length; //rows
    const N = A[0].length; // columns
    let dpSumCount = Array(M)
        .fill(null)
        .map(d => Array(N).fill([null, null]));

    var dp = (i, j, count) => {
        if (i < 0 || j < 0 || A[i][j] == 'X') return [-Infinity, -Infinity];
        if (A[i][j] == 'E') {
            return [0, 1];
        }

        let temp = A[i][j] == 'S' ? 0 : Number(A[i][j]);
        count = 0;

        if (dpSumCount[i][j] && dpSumCount[i][j][0] < temp) {
        }

        let goLeft = dp(i, j - 1, count + 1); // go left
        let goUp = dp(i - 1, j, count + 1); // go up
        let goDiag = dp(i - 1, j - 1, count + 1); // go diagonally

        let MaxPathSum = Math.max(goLeft[0], goUp[0], goDiag[0]);

        for (const [sum, times] of [goLeft, goUp, goDiag]) {
            if (sum == MaxPathSum) count += times;
        }

        //MEMO addition
        dpSumCount[i][j] = [temp + MaxPathSum, count];

        return [temp + MaxPathSum, count];
    };

    let [a, b] = dp(A.length - 1, A[0].length - 1, 0);

    if (a != -Infinity || b != -Infinity)
        return [a % 1000000007, b % 1000000007];
    else return [0, 0];
};

//optimal memo
const pathsWithMaxScore = A => {
    const M = A.length;
    const N = A[0].length;
    const dp = Array(M)
        .fill(null)
        .map(d => Array(N).fill(null));
    const m = 10 ** 9 + 7;

    const traverse = (r, c) => {
        if (r < 0 || c < 0) {
            return [0, 0];
        }

        if (dp[r][c] === null) {
            const value = A[r][c];

            if (value === 'X') {
                dp[r][c] = [0, 0]; // set that impossible path
            } else if (value === 'E') {
                dp[r][c] = [0, 1]; // there's one way to complete this
            } else {
                const l = traverse(r, c - 1);
                const u = traverse(r - 1, c);
                const ul = traverse(r - 1, c - 1);

                if (l[0] === 0 && u[0] === 0 && ul[0] === 0) {
                    // either we can reach the end with 0 cost, or we cant reach the end at all
                    if (l[1] === 0 && u[1] === 0 && ul[1] === 0) {
                        // we cant reach the end at all
                        dp[r][c] = [0, 0];
                    } else {
                        // we  can reach it automatically
                        dp[r][c] = [Number(value), 1];
                    }
                } else {
                    const max = Math.max(l[0], u[0], ul[0]);
                    let count = 0;
                    if (l[0] === max) {
                        count += l[1];
                    }
                    if (u[0] === max) {
                        count += u[1];
                    }
                    if (ul[0] === max) {
                        count += ul[1];
                    }
                    const iv = parseInt(v, 10) || 0;
                    dp[r][c] = [max + iv, count % m];
                }
            }
        }

        return dp[r][c];
    };

    return traverse(n - 1, n - 1);
};
console.log(pathsWithMaxScore(['E23', '2X2', '12S']));
