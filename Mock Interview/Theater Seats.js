// In a row of seats, 1 represents a person sitting in that seat, and 0 represents that the seat is empty. 

// There is at least one empty seat, and at least one person sitting.

// Alex wants to sit in the seat such that the distance between him and the closest person to him is maximized. 

// Return that maximum distance to closest person.

// Example 1:

// Input: [1,0,0,0,1,0,1]
// Output: 2
// Explanation: 
// If Alex sits in the second open seat (seats[2]), then the closest person has distance 2.
// If Alex sits in any other open seat, the closest person has distance 1.
// Thus, the maximum distance to the closest person is 2.
// Example 2:

// Input: [1,0,0,0]
// Output: 3
// Explanation: 
// If Alex sits in the last seat, the closest person is 3 seats away.
// This is the maximum distance possible, so the answer is 3.
// Note:

// 1 <= seats.length <= 20000
// seats contains only 0s or 1s, at least one 0, and at least one 1.


var maxDistToClosest = function(seats) {
    var maxLength=(z,x)=>{
        let c=0
        let cstart=0
        let cend=0
        while (x[cstart]==0){
            cstart++
        }
        while (x[seats.length-1-cend]==0){
            cend++
        }

        z.forEach( (d,i)=>{
            if(d.length%2==1 ){
                if ((d.length/2+0.5)>c){
                    c=(d.length/2+0.5)
                }
            }
            else{ if(d.length/2>c){
                c=d.length/2
            }

            }
        }
        )
        if (c<cstart){
            c=cstart
        }
        if (c<cend){
            c=cend
        }
        return c
    }
   return maxLength(seats.join('').split('1'),seats)

};

console.log(
    maxDistToClosest(
        [1,0,0,0,1,0,1]
            )
)

