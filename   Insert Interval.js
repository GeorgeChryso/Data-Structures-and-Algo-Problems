// Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).

// You may assume that the intervals were initially sorted according to their start times.

// Example 1:

// Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
// Output: [[1,5],[6,9]]
// Example 2:

// Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
// Output: [[1,2],[3,10],[12,16]]
// Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
// NOTE: input types have been changed on April 15, 2019. Please reset to default code definition to get new method signature.



var insert = function(intervals, newInterval) {
    if(!intervals.length)return [newInterval]

    let result=[]
    let [a,b]=newInterval,flag=false
    if(intervals.length==1){
        let [x,y]=intervals[0]
        if(x>b||y<a){
            if(x>b)
                return [[a,b],[x,y]]
            else 
                return [[x,y],[a,b]]
        }
        else {
            a=Math.min(a,x)     
            b=Math.max(b,y)
        }  
        return [[a,b]]
    }

    let [sx,sy]=intervals[0],[ex,ey]=intervals[intervals.length-1]
    if(b<sx)
        return [newInterval,...intervals]
    else if (ey<a )
        return [...intervals,newInterval]

    for (let i = 0; i < intervals.length; i++) {
        let [x,y]=intervals[i]
        if(x>b||y<a){
            if(b<x){
                result.push([a,b])
                flag=false
            }
            result.push([x,y])
        }
        else {
            flag=true
            a=Math.min(a,x)     
            b=Math.max(b,y)
        }   
    }
    if(flag==true)
        result.push([a,b])
    return result
};

console.log(insert(
    [[1,3]],  [2,5]
)
)