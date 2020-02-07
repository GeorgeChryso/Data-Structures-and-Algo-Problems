// On an NxN chessboard, a knight starts at the r-th row and c-th column and attempts to make exactly K moves. The rows and columns are 0 indexed, so the top-left square is (0, 0), and the bottom-right square is (N-1, N-1).

// A chess knight has 8 possible moves it can make, as illustrated below. Each move is two squares in a cardinal direction, then one square in an orthogonal direction.





//smells like Knapsack AGAIN
var knightProbability = function(N, K, r, c) {
    let end={}// that would actually be the times my knight moved out of the chessboard
    if(K==0)return 1

    let calculatePos=(i,j,times)=>{
        if(dp[i][j]!==undefined)return
        if(times>K)return
        let result=0
        let queue=[]
        if(i-2>=0){
            if(j-1>=0){
                result++
                queue.push([i-2,j-1])
            }
            if(j+1<=N-1){
                result++
                queue.push([i-2,j+1])
            }
        }
        if(i-1>=0){
            if(j-2>=0){
                result++
                queue.push([i-1,j-2])
            }
            if(j+2<=N-1){
                result++
                queue.push([i-1,j+2])
            }
        }
        if(i+2<=N-1){
            if(j-1>=0){
                result++
                queue.push([i+2,j-1])
            }
            if(j+1<=N-1){
                result++
               queue.push([i+2,j+1])

            }
        }

        if(i+1<=N-1){
            if(j-2>=0){
                result++
                queue.push([i+1,j-2])
            }
            if(j+2<=N-1){
                result++
                queue.push([i+1,j+2])
            }
        }
        dp[i][j]=result
        queue.forEach(([k,l])=>{
            if(times===K-1&&end[[k,l].join(',')]===undefined){
                end[[k,l].join(',')]=true
            }
            calculatePos(k,l,times+1)
        })
       
    }

    let dp=Array(N).fill(null).map(d=>Array(N).fill(undefined))
    
    calculatePos(r,c,1) //basecase

    if(K==1)return dp[r][c]/8
    return Object.keys(end).reduce((acc,curr)=>{
       curr=curr.split(',')
       return acc*dp[curr[0]][curr[1]]/8
    },1)

};

var knightProbability = function(N, K, r, c) {
    let previous=Array(N).fill(null).map(d=>Array(N).fill(0))
    previous[r][c]=1 //probability of reaching cell i j
    //Let previous[r][c] be the probability of being on square (r, c) after steps steps. Based on how a knight moves, we have the following recursion:
    //next[r][c]=Sum(...previous[r+dr][c+dc])/8
    for (var time = 0; time < K; time++) {
        let next=Array(N).fill(null).map(d=>Array(N).fill(0))
        for (let i = 0; i < N; i++) {
            for (let j = 0; j< N; j++) {
                let q= [
                    [i-2,j-1],
                    [i-2,j+1],
                    [i-1,j-2],
                    [i-1,j+2],
                    [i+1,j-2],
                    [i+1,j+2],
                    [i+2,j-1],
                    [i+2,j+1],
                ]
                q.forEach(([a,b])=>next[i][j]+=a<0||b<0||a>=N||b>=N?0:(previous[a][b]/8))
                

            }            
        }
        previous=next
    }


    return previous.reduce((acc,curr)=>acc+curr.reduce((a,b)=>a+b),0) 
};
console.log(
    knightProbability(8,30,6,4)
)