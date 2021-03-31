// Given a set of intervals, for each of the interval i, check if there exists an interval j whose start point is bigger than or equal to the end point of the interval i, which can be called that j is on the "right" of i.

// For any interval i, you need to store the minimum interval j's index, which means that the interval j has the minimum start point to build the "right" relationship for interval i. If the interval j doesn't exist, store -1 for the interval i. Finally, you need output the stored value of each interval as an array.

// Note:

// You may assume the interval's end point is always bigger than its start point.
// You may assume none of these intervals have the same start point.
 

// Example 1:

// Input: [ [1,2] ]

// Output: [-1]

// Explanation: There is only one interval in the collection, so it outputs -1.
 

// Example 2:

// Input: [ [3,4], [2,3], [1,2] ]

// Output: [-1, 0, 1]

// Explanation: There is no satisfied "right" interval for [3,4].
// For [2,3], the interval [3,4] has minimum-"right" start point;
// For [1,2], the interval [2,3] has minimum-"right" start point.
 

// Example 3:

// Input: [ [1,4], [2,3], [3,4] ]

// Output: [-1, 2, -1]

// Explanation: There is no satisfied "right" interval for [1,4] and [3,4].
// For [2,3], the interval [3,4] has minimum-"right" start point.
// NOTE: input types have been changed on April 15, 2019. Please reset to default code definition to get new method signature.






//TLE O(N**2)
var findRightInterval = function(intervals) {
    let maps=[...Array(intervals.length)].map(D=>-1)
    for(let i in intervals){
        let [s,e]=intervals[i]
        let min=Infinity,idx=-1
        for(let j in intervals){
        let [l,h]=intervals[j]
            if(l<=min&&e<=l&&i!=j){
                min=l
                idx=j
            }
            
        }
        maps[i]=idx
    }
    return maps
};

// Smart O(n**2) AC
var findRightInterval = function(intervals) {
    intervals=intervals.map(([s,e],i)=>[s,e,i])
    intervals.sort((a,b)=>a[0]-b[0])

    let maps=[...Array(intervals.length)].map(D=>-1)
    for(let i=0;i<intervals.length-1;i++){
        let [s,e,idx1]=intervals[i]
        for (let j = i+1; j <intervals.length; j++) {
            let [l,h,idx2]=intervals[j]
            if(e<=l){
                maps[idx1]=idx2
                break
            }
        }
    }
    return maps
};

//nlogn sort+binary search 
var findRightInterval = function(intervals) {
    if(intervals.length==1)return [-1]
    intervals=intervals.map(([s,e],i)=>[s,e,i])
    intervals.sort((a,b)=>a[0]-b[0])
    let maps=[...Array(intervals.length)].map(D=>-1)
    for(let i=0;i<intervals.length-1;i++){
        let [s,e,idx1]=intervals[i]
        //the logic is same us above, but instead of looking at each next element
        // on the sorted list I 
        //binary search to find the right interval
        let lo=i+1, hi=intervals.length-1
        while(lo<=hi){
            let mid=(lo+hi)>>1
            let [l,h,idx2]=intervals[mid]
            if(e==l){
                maps[idx1]=idx2
                break
            }
            if(e<l){
                maps[idx1]=idx2
                hi=mid-1
            }
            else
                lo=mid+1
        }
    }
    return maps
};

console.log(
    findRightInterval(
        [ [3,4], [2,3], [1,2] ]
      // [[1,4],[2,3],[3,4]]
    )
)