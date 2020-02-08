// A chess knight can move as indicated in the chess diagram below:

//  .           

 

// This time, we place our chess knight on any numbered key of a phone pad (indicated above), and the knight makes N-1 hops.  Each hop must be from one key to another numbered key.

// Each time it lands on a key (including the initial placement of the knight), it presses the number of that key, pressing N digits total.

// How many distinct numbers can you dial in this manner?

// Since the answer may be large, output the answer modulo 10^9 + 7.











//similar to 668, Knapsack of ways
var knightDialer = function(N) {
    let mawd=Math.pow(10,9)+7 //my result must be %mawd
    
    //previous[i][j] = the number of distinct numbers I can type with [i][j] as the last key pressed
    let previous=Array(4).fill(null).map(d=>Array(3).fill(1))
    previous[3][0]=0 
    previous[3][2]=0
    let moves=[[-2,-1],[-2,+1],[-1,-2],[-1,+2],[+1,-2],[1,2],[2,1],[2,-1]] //potential moves of[i][j]
    for (let times = 1; times <N; times++) {
        let next=Array(4).fill(null).map(d=>Array(3).fill(0))// KEY STEP, it is essential creating a blank matrix only this level's results properly stored...the state is preserved through the logic of my matrix


        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                if(i==3&&(j==0||j==2))continue // Not messing with the null values
                moves.forEach(([a,b])=>{   
                    //next[i][j] will additionally be able to create the sum of all
                    // the previous[k][l] indexes that can access my [i][j] through a move
                    next[i][j]+=(i+a<0||i+a>3||j+b<0||j+b>=3)?0:previous[i+a][j+b]%mawd
                })   
            }            
        }
        previous=next
    }

    return previous.reduce((acc,curr)=>acc+curr.reduce((a,b)=>a+b,0),0)%mawd
};
//Allegedly I can achieve better ms with hardcoding the results of the moves, e.g. 9 goes to 2 and 4...and so on. But it's about clean code innit. 

console.log(
    knightDialer(
        161
    )
)