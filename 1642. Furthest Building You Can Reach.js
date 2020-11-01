// You are given an integer array heights representing the heights of buildings, some bricks, and some ladders.

// You start your journey from building 0 and move to the next building by possibly using bricks or ladders.

// While moving from building i to building i+1 (0-indexed),

// If the current building's height is greater than or equal to the next building's height, you do not need a ladder or bricks.
// If the current building's height is less than the next building's height, you can either use one ladder or (h[i+1] - h[i]) bricks.
// Return the furthest building index (0-indexed) you can reach if you use the given ladders and bricks optimally.

// Input: heights = [4,2,7,6,9,14,12], bricks = 5, ladders = 1
// Output: 4
// Explanation: Starting at building 0, you can follow these steps:
// - Go to building 1 without using ladders nor bricks since 4 >= 2.
// - Go to building 2 using 5 bricks. You must use either bricks or ladders because 2 < 7.
// - Go to building 3 without using ladders nor bricks since 7 >= 6.
// - Go to building 4 using your only ladder. You must use either bricks or ladders because 6 < 9.
// It is impossible to go beyond building 4 because you do not have any more bricks or ladders.





// Intuition:
// Binary search for the answer, if he cant get to k-th city, he surely cant get to k+1th etc

// O (N* logN* logN)
var furthestBuilding = function(heights, bricks, ladders) {
    // First, we can view the array as an array of deltas,
    // differences that I have to pay to get a specific location
    // delta[i]=0 if the previous element is smaller ( I can just jump to this)
    // delta[i]=A[i]-A[i-1] I have to use some bricks/ ladder to get her and pay that diff
    let deltas=heights.map((d,i)=>{
        if(i==0 || (heights[i]<=heights[i-1]))
            return 0
        return heights[i]-heights[i-1]
    })
    //================ Juicy Part ===================\\
    // How can I check if I can get to the k-th building?
    // I will try to use the ladders for my most expensive jumps`
    var isPossible=k=>{
        let current=deltas.slice(0,k+1)
        current.sort((a,b)=>b-a) //sort descending, too check the most expensive 
        // deltas
        let total=current.reduce((a,b)=>a+b,0)
        // remove the ladders highest of them
        for (let i = 0; i < Math.min(ladders,current.length); i++) 
            total-=current[i] 
        // and see if its still possible to get there
        // with just bricks
        return total<=bricks
    }   
    //========= Binary Search for the answer =========\\
    let lo=0, hi=heights.length-1, res=0
    while(lo<=hi){
        let mid=(lo+hi)>>1 
        //checks if I can get to mid-th building
        if(isPossible(mid))
            res=mid,
            lo=mid+1
        else
            hi=mid-1
    }
    return lo
};
console.log(furthestBuilding(
    [17,16,5,10,10,14,7],
    74,
    6
))