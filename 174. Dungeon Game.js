// The demons had captured the princess (P) and imprisoned her in the bottom-right corner of a dungeon. The dungeon consists of M x N rooms laid out in a 2D grid. Our valiant knight (K) was initially positioned in the top-left room and must fight his way through the dungeon to rescue the princess.

// The knight has an initial health point represented by a positive integer. If at any point his health point drops to 0 or below, he dies immediately.

// Some of the rooms are guarded by demons, so the knight loses health (negative integers) upon entering these rooms; other rooms are either empty (0's) or contain magic orbs that increase the knight's health (positive integers).

// In order to reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step.

//classic knapsack O(m*n) O(m*n)
var calculateMinimumHP = function(A) {
    let dp = [...A];

    //dp[i][j] is the minimum health needed to survive the distance from that square to the end
    // my base case is the end square that must contain the min value as HP in order to survive

    //logic: Choose the minimum Positive element on the right or bottom
    // if the either of them is negative, that means that I need no
    // extra cash to survive,so  dp[i][j]=-dp[i][j] I just need the price the current cell has to offer

    for (let i = A.length - 1; i >= 0; i--) {
        for (let j = A[0].length - 1; j >= 0; j--) {
            if (i == A.length - 1 && j == A[0].length - 1) {
                // last element
                dp[i][j] = -dp[i][j]; //base case
            } else if (i + 1 <= A.length - 1 && j + 1 <= A[0].length - 1) {
                if (dp[i + 1][j] < 0 || dp[i][j + 1] < 0)
                    dp[i][j] = 0 - dp[i][j];
                else dp[i][j] = Math.min(dp[i + 1][j], dp[i][j + 1]) - dp[i][j];
            } else if (i + 1 <= A.length - 1) {
                if (dp[i + 1][j] < 0) dp[i][j] = 0 - dp[i][j];
                else dp[i][j] = Math.min(dp[i + 1][j]) - dp[i][j];
            } else if (j + 1 <= A[0].length - 1) {
                if (dp[i][j + 1] < 0) dp[i][j] = -dp[i][j];
                else dp[i][j] = Math.min(dp[i][j + 1]) - dp[i][j];
            }
        }
    }
    // so my A[0][0] can either be positive or negative
    // If It's positive i need that much cash in the beginning +1 for surviving the last cell (if I dont add 1, I die on the last cell cos of 0)
    // If it's negative that means that I just need 1, cos I m gonna be // making money throughout the way that will help me survive.
    return Math.max(dp[0][0], 0) + 1;
};

//essentially the previous approach with no extra space O(m*n) O(1)
var calculateMinimumHP = function(A) {
    for (let i = A.length - 1; i >= 0; i--) {
        for (let j = A[0].length - 1; j >= 0; j--) {
            if (i == A.length - 1 && j == A[0].length - 1) {
                A[i][j] = -A[i][j];
            } else if (i + 1 <= A.length - 1 && j + 1 <= A[0].length - 1) {
                if (A[i + 1][j] < 0 || A[i][j + 1] < 0) A[i][j] = 0 - A[i][j];
                else A[i][j] = Math.min(A[i + 1][j], A[i][j + 1]) - A[i][j];
            } else if (i + 1 <= A.length - 1) {
                if (A[i + 1][j] < 0) A[i][j] = 0 - A[i][j];
                else A[i][j] = Math.min(A[i + 1][j]) - A[i][j];
            } else if (j + 1 <= A[0].length - 1) {
                if (A[i][j + 1] < 0) A[i][j] = -A[i][j];
                else A[i][j] = Math.min(A[i][j + 1]) - A[i][j];
            }
        }
    }
    return Math.max(A[0][0], 0) + 1;
};

//test cases
[
    [[[0]], 1],
    [[[-3, 5]], 4],
    [[[100]], 0],
    [
        [
            [-2, -3, 3],
            [-5, -10, 1],
            [10, 30, -5]
        ],
        7
    ]
].forEach(([a, b]) => {
    //  console.log(calculateMinimumHP(a),b,calculateMinimumHP(a)==b)
    console.log(calculateMinimumHP(a) == b);
});
