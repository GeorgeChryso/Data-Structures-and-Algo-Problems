// You have a keyboard layout as shown above in the XY plane, where each English uppercase letter is located at some coordinate, for example, the letter A is located at coordinate (0,0), the letter B is located at coordinate (0,1), the letter P is located at coordinate (2,3) and the letter Z is located at coordinate (4,1).

// Given the string word, return the minimum total distance to type such string using only two fingers. The distance between coordinates (x1,y1) and (x2,y2) is |x1 - x2| + |y1 - y2|.

// Note that the initial positions of your two fingers are considered free so don't count towards your total distance, also your two fingers do not have to start at the first letter or the first two letters.

//

let scoring = (c1, c2) => {
    let y1 = c1 % 6,
        y2 = c2 % 6,
        x1 = Math.floor(c1/6)
        x2 = Math.floor(c2/6)
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

//dp O(N*26*26)

//Let dp[i][j][k] be the minimum distance to build the substring from word from index i untill the end of the word, given that currently the fingers are on positions j and k respectively.
var minimumDistance = function(W) {
    // W.length+1 cos I have a dummy state of the last suffix [w.length, w.length] where i will initialize my base cases
    let dp = [...Array(W.length + 1)].map(d =>
        [...Array(26)].map(d=>[...Array(26)].map(d=>Infinity))
        );
    //base cases :
    // the dummy suffix [w.length, w.length has all the distances minimized cos i can start from any letter i please]
    for (let j = 0; j < 26; j++)
        for (let k = 0; k < 26; k++) dp[W.length][j][k] = 0; //base case: my fingers start from any state/
        
    let result=Infinity
    for (let i = W.length - 1; i >= 0; i--) {
        for (let j = 0; j < 26; j++) {
            for (let k = 0; k < 26; k++) {
                let to = W.charCodeAt(i) - 65
                //--------->//fingers currently on j k : HOW DID THEY COME HERE? HOW MUST HAVE THEY ENDED UP ON J, K SO MY TOTAL DISTANCE IS MINIMIZED
                dp[i][j][k] = Math.min(
                    dp[i + 1][to][k] + scoring(j, to),
                    dp[i + 1][j][to] + scoring(to, k)
                );
                //the min distance to build the substring from index i onwards when my Left finger is on j and my right finger is on k, can be obtained
                // A) either by typing W[i] with my Left finger and moving it from W[i] to letter j
                // B) or by typing W[i] with my Right figner and moving it from W[i] to letter k
                if(i==0)result=Math.min(result,dp[i][j][k])
            }
        }
    }
    
    return result
};



console.log(minimumDistance('CAKE'));
