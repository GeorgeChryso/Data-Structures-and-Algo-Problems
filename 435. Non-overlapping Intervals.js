// Given a collection of intervals, find the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.


// Greedy O(n) approach:
// Key: Sorting .
// 1st sort the intervals in ascending ends
// Greedily pick the first interval that does NOT overlap with the 
// last interval you picked (always pick the first of course)
// O(nlgn), O(1)
var eraseOverlapIntervals = function(intervals) {
    intervals.sort((a,b)=>a[1]-b[1])
    let result=0,hi=-Infinity
    for(let i=0;i<intervals.length;i++){
        let [l,h]=intervals[i]
        if(l>=hi)
            hi=h //picking the new interval
        else
            result++ //discarding this inteval
    }
    return result
};