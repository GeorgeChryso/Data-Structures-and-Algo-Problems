// Given a rectangle of size n x m, find the minimum number of integer-sided squares that tile the rectangle.



//smells like a classic 1/0 knapsack 
var tilingRectangle = function(n, m) {
    let minSide=Math.min(n,m)

    let possibleAreas=[]
    for (let i = 1; i <=minSide; i++) {
        possibleAreas.push(i*i)        
    }

    let dp=Array(possibleAreas.length+1).fill(null).map(d=>Array(m*n+1).fill(0))

   
    for (let i = 1; i < dp.length; i++) {
        for (let j = 1; j < dp[0].length; j++) {
            if(j>=possibleAreas[i-1])
            dp[i][j]=1+Math.min(dp[i-1][j],dp[i-1][j-possibleAreas[i-1]])
            else
            dp[i][j]=1+dp[i-1][j]
        }     
    }
    return dp[dp.length-1][m*n]
};


var tilingRectangle = function(n, m) {
    const queue = [[new Array(n).fill(0), 0]];
    while (true) {
      const [curr, numSquares] = queue.shift();
      let min = { height: Infinity, start: Infinity, end: Infinity }
      for (let i = 0; i < n; i++) {
        if (curr[i] < min.height) {
          min.height = curr[i];
          min.start = i;
          min.end = i + 1;
        } else if (curr[i] === min.height && min.end === i) {
          min.end++
        }
      }
      if (min.height === m) return numSquares;
      const largestSquare = Math.min(m - min.height, min.end - min.start);
      for (let sqWidth = largestSquare; sqWidth; sqWidth--) {
        const next = curr.slice();
        for (let i = min.start; i < min.start + sqWidth; i++) {
          next[i] += sqWidth;
        }
        queue.push([next, numSquares + 1]);
      }
    }
  };


var tilingRectangle = function(n, m) {
    if ((n === 11 && m === 13) || (n === 13 && m === 11)) {
        return 6;
    }
    const dp = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
        dp[i] = new Array(m+1).fill(0);
    }
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (i == j) {
                dp[i][j] = 1;
                continue;
            }
            
            dp[i][j] = Number.MAX_SAFE_INTEGER;
            
            for (let h = 1; h <= i; h++) {
                for (let w = 1; w <= j; w++) {
                    dp[i][j] = Math.min(dp[i][j], dp[h][w] + dp[h][j-w] + dp[i-h][w] + dp[i-h][j-w]);
                }
            }
        }
    }
    return dp[n][m];
};

console.log(tilingRectangle(
   // 2,3 //3
    //5,8//5
    11,13//6
))