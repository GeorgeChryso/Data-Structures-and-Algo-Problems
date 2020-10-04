// Given a list of intervals, remove all intervals that are covered by another interval in the list.

// Interval [a,b) is covered by interval [c,d) if and only if c <= a and b <= d.

// After doing so, return the number of remaining intervals.

 


// Approach 1, naive O(n**2), filter out the covered intervals
var removeCoveredIntervals = function(INT) {
    return INT.filter(([start,end],i)=> //filter the intervals
                        !INT.some(([s,e],j)=> //for which there is no other interval
                            j!==i&&s<=start&&end<=e) // that overlaps them
                     ).length
};


// sort solution intuition:
// Sort them by ascending x, and DESCENDING y
// in order to create sth like this
// [1,5],[1,3],[1,2],[2,3],[3,7],[3,6],[4,15]
// Why? Because each [x,y] can only be contained in a previous interval that way
// Each time i meet an interval with a bigger y, this means that this interval will NOT be a subset of any known interval
// for example
//[1,5],[1,3],[1,2],[2,3],[3,7],[3,6],[4,15]
//  *                       *            *  
// y=5                      7>5        15>7          
//                      so i set y=7   so i set y=15 
// and return result=3

// The things is that until i find a bigger y, i m positive that any intervals that follow are
// contained within the [x,curry] i already incremented my result at.  

// the result will be 3, because all the other intervals are subsets of previously met intervals


var removeCoveredIntervals = function(A) {
    A.sort(([x1,y1],[x2,y2])=>x1==x2?y2-y1:x1-x2)
    let result=0, curry=0
    for (const [s,e] of A) {
        if(e>curry){
            curry=e
            result++
        }
    }
    return result
};


console.log(
    removeCoveredIntervals(
        [[1,4],[2,3]]
    )
)