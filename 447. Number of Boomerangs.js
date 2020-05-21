// Given n points in the plane that are all pairwise distinct, a "boomerang" is a tuple of points (i, j, k) such that the distance between i and j equals the distance between i and k (the order of the tuple matters).

// Find the number of boomerangs. You may assume that n will be at most 500 and coordinates of points are all in the range [-10000, 10000] (inclusive).



// permutation order matters!
var numberOfBoomerangs = function(points) {
    let result=0
    // I can even do without the Math.sqrt for a faster runtime
    let calcDistance=(a,b)=>Math.sqrt( (a[0]-b[0])**2 + (a[1]-b[1])**2)
    for (let i = 0; i < points.length; i++) {
        let dist={}
        for (let j = 0; j < points.length; j++) {
            let z=calcDistance(points[i],points[j])
            dist[z]=(dist[z]||0)+1
        }        

        Object.values(dist).forEach(d=>{
                if(d>=2){
                    result+= d*(d-1)
                }
            }
        )
        
    }
    return result
};