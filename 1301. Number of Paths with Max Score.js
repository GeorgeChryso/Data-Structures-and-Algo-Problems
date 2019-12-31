// You are given a square board of characters. You can move on the board starting at the bottom right square marked with the character 'S'.

// You need to reach the top left square marked with the character 'E'. The rest of the squares are labeled either with a numeric character 1, 2, ..., 9 or with an obstacle 'X'. In one move you can go up, left or up-left (diagonally) only if there is no obstacle there.

// Return a list of two integers: the first integer is the maximum sum of numeric characters you can collect, and the second is the number of such paths that you can take to get that maximum sum, taken modulo 10^9 + 7.

// In case there is no path, return [0, 0].



//DFS TLE 
var pathsWithMaxScore = function(A) {
    var sumsMemo={}
    var dp=(i,j,curSum)=>{
        if(i<0 ||j<0) return
        if(A[i][j]=='E'){
            sumsMemo[Number(curSum)]=(sumsMemo[Number(curSum)]||0) +1
            return
        }
        else if(A[i][j]!='X'&&A[i][j]!='S') curSum=curSum+parseInt(A[i][j],10)
        
            if(j>=1&&A[i][j-1]!='X'){
                dp(i,j-1,curSum)
            }
            if(i>=1&&A[i-1][j]!='X'){
                dp(i-1,j,curSum)
            }
            if(i>=1&&j>=1&&A[i-1][j-1]!='X'){
                dp(i-1,j-1,curSum)
            }
        
        
    }
    dp(A.length-1,A[0].length-1,0)
        if(!Object.keys(sumsMemo).length)return[0,0]

    let result=Math.max(...Object.keys(sumsMemo).map(d=>parseInt(d)))
    let ways=sumsMemo[result]
    let res=[]
    res.push(Number(result),Number(ways))
    //console.log(result,ways)

    return res
};


// NEEDS memoization