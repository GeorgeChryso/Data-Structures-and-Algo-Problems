

/* ok we follow the minimax approach, but we use 2 caches:
    1 to track the states that we ve already seen on the current game being played.
    We use backtracking's logic to efficiently keep track of said states
    these states do not need the "level", but rather whose turn it is 

    The 2nd cache, memo, is used to store states for dynamic programming logic.
    These states need the current level, to avoid further redundant computations that have already occured in the past
*/
var catMouseGame = function(graph) {
    let n=graph.length,
        memo=[...Array(n+1)].map(d=>[...Array(n+1)].map(d=>[...Array(2*n+1)])),
        seen=[...Array(n+1)].map(d=>[...Array(n+1)].map(d=>[...Array(2)]))
    //dfs returns 0 1 2, whether the current player loses,wins, or draws respectively
    let dfs=(M,C,level)=>{
        let turn=level%2,curr=turn?C:M,draw=0,res=0
        //draw when we ve seen the state before or cycles
        if(seen[M][C][turn]!==undefined||level>=2*n+1) 
            return memo[M][C][level]=2 
        if(M==0)// win for mouse if it reaches the hole, loss for cat
            memo[M][C][level]=turn^1
        if(M==C) // win for cat if it reaches the mouse, loss for mouse
            memo[M][C][level]=turn 
        if(memo[M][C][level]===undefined){
            seen[M][C][turn]=0 //set this state as visited
            for(let i=0;i<graph[curr].length&&!res;i++) //traverse for the available edges
                if( !(turn&&(!graph[curr][i]))){ //The cat cant move into the hole
                    let val=turn?
                            dfs(M,graph[curr][i],level+1):
                            dfs(graph[curr][i],C,level+1)
                    if(val===2) 
                        draw=1 //set draw as an available option
                    else
                        res|=(1^val) //minimax logic, always prefer the losing state
                }
            memo[M][C][level]=res||(2*draw) // set in this order 1->2->0 
        }
        seen[M][C][turn]=undefined;// de-set the state for the current game,as it concluded
        return memo[M][C][level]
    }
    return [2,1,0][dfs(1,2,0)] //js eye candy
};

// Without the seen cache. But we only consider draw states the ones that exceed the limit of turns
var catMouseGame = function(graph) {
    let n=graph.length,
        memo=[...Array(n+1)].map(d=>[...Array(n+1)].map(d=>[...Array(2*n+1)]))
    //dfs returns 0 1 2, whether the current player loses,wins, or draws respectively
    let dfs=(M,C,level)=>{
        let turn=level%2,curr=turn?C:M,draw=0,res=0,next
        if(level>=2*n) //draw when cycles
            return memo[M][C][level]=2 
        if(M==0)// win for mouse if it reaches the hole, loss for cat
            return memo[M][C][level]=turn^1
        if(M==C) // win for cat if it reaches the mouse, loss for mouse
            return memo[M][C][level]=turn 
        if(memo[M][C][level]===undefined){ 
            for(let i=0;i<graph[curr].length&&!res;i++) //traverse for the available edges
                if( !(turn&&(!graph[curr][i]))) //The cat cant move into the hole
                    next=turn?dfs(M,graph[curr][i],level+1):dfs(graph[curr][i],C,level+1),
                    next==2?draw=1:res|=(1^next) //minimax logic, always prefer the losing state and mark draws as possible
        }
        return memo[M][C][level]=memo[M][C][level]==undefined?res||(2*draw):memo[M][C][level]
    }
    return [2,1,0][dfs(1,2,0)] //js eye candy
};
console.log(catMouseGame(
    [[2,5],[3],[0,4,5],[1,4,5],[2,3],[0,2,3]]
))

//condensed as thicc milk 
var catMouseGame = function(graph,memo={}) {
    return [2,1,0][(function dfs(M,C,level){
        let turn=level%2,curr=turn?C:M,draw=0,res=0,next,state=(M*graph.length+C)+0.37*level
        if(level>=2*graph.length) return memo[state]=2 
        if(M==0||M==C)return memo[state]=turn^Number(M==0)
        for(let i=0;i<graph[curr].length&&!res&&memo[state]===undefined;i++) 
            if( !(turn&&(!graph[curr][i]))) 
                next=turn?dfs(M,graph[curr][i],level+1):dfs(graph[curr][i],C,level+1),
                next==2?draw=1:res|=(1^next) 
        return memo[state]=memo[state]||(res||(2*draw))
    })(1,2,0)]
}; 