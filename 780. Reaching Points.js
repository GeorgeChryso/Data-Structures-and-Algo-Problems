// A move consists of taking a point (x, y) and transforming it to either (x, x+y) or (x+y, y).

// Given a starting point (sx, sy) and a target point (tx, ty), return True if and only if a sequence of moves exists to transform the point (sx, sy) to (tx, ty). Otherwise, return False.


// Maximum Call Stack exceeded
var reachingPoints = function(sx, sy, tx, ty) {
    let memo={}
    let recursion=(x,y)=>{
        if(memo[x]===undefined){
            memo[x]=new Set()
        }
        if(memo[x].has(y)||x>tx||y>ty)return false
        if(x===tx&&y===ty)return true
        memo[x].add(y)
        return recursion(x,x+y)||recursion(x+y,y)
    }
    return recursion(sx,sy)
};

var reachingPoints=function(sx,sy,tx,ty){
    while (sx < tx && sy < ty){
        if (tx < ty) ty %= tx;
        else tx %= ty;
    }

    return sx == tx && sy <= ty && (ty - sy) % sx == 0 ||
       sy == ty && sx <= tx && (tx - sx) % sy == 0;
}
console.log(reachingPoints(
    9,5,12,8
))