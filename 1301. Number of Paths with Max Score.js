// You are given a square board of characters. You can move on the board starting at the bottom right square marked with the character 'S'.

// You need to reach the top left square marked with the character 'E'. The rest of the squares are labeled either with a numeric character 1, 2, ..., 9 or with an obstacle 'X'. In one move you can go up, left or up-left (diagonally) only if there is no obstacle there.

// Return a list of two integers: the first integer is the maximum sum of numeric characters you can collect, and the second is the number of such paths that you can take to get that maximum sum, taken modulo 10^9 + 7.

// In case there is no path, return [0, 0].

//DFS TLE,needs memo
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

// memo without recursion
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




// MY ANSWER
// OK, here goes the memoization approach
// each cell of the matrix dp[i][j], holds the maximum value of the paths that lead to the end of every possible direction
// DFS+MEMO
var pathsWithMaxScore = A => {
    //matrix initialization
    const M = A.length;
    const N = A[0].length;
    const dp = Array(M)
        .fill(null)
        .map(d => Array(N).fill(null));
    const m = 10 ** 9 + 7; // i need to return the count%m

    //dfs formula
    const findMaximumPath = (i, j) => {
        //if we go out of boundaries, the path is cancelled
        if (i < 0 || j < 0) {
            return [0, 0];
        }
        if (i == 0 && j == 0) {
            dp[i][j] = [0, 1]; //if we reach the end, we just found a way to reach it,so counter=1, however there is no end value (A[0][0]), so we return [0,1]
        }
        if (A[i][j] == 'X') {
            //if we run into an obstacle, the path is cancelled
            dp[i][j] = [0, 0];
        }

        // MEMOIZATION STEP
        if (dp[i][j] !== null) return dp[i][j]; // that's the most important step.
        // It saves me the extra work, and that's the point of memoization
        // If there is an element on my board, that means that the maximum value path that starts from
        // the element A[i][j] is already calculated, therefore there is no need to expand it since I already have its maximum Value path and its counter

        const left = findMaximumPath(i, j - 1);
        const up = findMaximumPath(i - 1, j);
        const diag = findMaximumPath(i - 1, j - 1);

        // deciding on the best solution out of the three for the cell A[i][j] as the start of our optimal path
        let maxValue = Math.max(left[0], up[0], diag[0]);
        let maxValueCounter = [left, up, diag].reduce(
            ([accS, accCount], [sum, counter]) => {
                if (sum > accS) {
                    return [sum, counter];
                } else if (sum === accS) {
                    return [sum, counter + accCount];
                }
                return [accS, accCount];
            },
            [0, 0]
        )[1];

        // MEMO STEP, set the dp[i][j] to be equal to the best path found, so that if another candidate
        // path ends up on this cell, it knows the Value of following this path
        dp[i][j] = [maxValue + (Number(A[i][j]) || 0), maxValueCounter % m];

        return dp[i][j];
    };

    let result = findMaximumPath(N - 1, N - 1);

    //if the end dp[0][0] is not reached, return [0,0] otherwise there is a result
    return dp[0][0] ? result : [0, 0];
};

console.log(
    pathsWithMaxScore(
        //  ['E23', '2X2', '12S']
        ['E11', 'XXX', '11S']
    )
);
