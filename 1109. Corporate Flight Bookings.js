// There are n flights, and they are labeled from 1 to n.

// We have a list of flight bookings.  The i-th booking bookings[i] = [i, j, k] means that we booked k seats from flights labeled i to j inclusive.

// Return an array answer of length n, representing the number of seats booked on each flight in order of their label.

var corpFlightBookings = function(bookings, n) {
  var result=Array(n).fill(0)

  for(let [i,j,k] of bookings){
        while(i<=j){
            result[i-1]+=k
            i++
        }

  }
    
  return result
};
//naive
/*
i1  j1  k1
i2  j2  j2
-----------
i1<i2?
 j1<j2?
   

*/
var corpFlightBookings = function(bookings, n) {

    // create the result Array which we are going to 
    // utilize for our end result. Fill each (flight) with 0 seats
    var result=Array(n).fill(0)
  
    // traverse the bookings array, destructuring its contents with ES6 for easier processing
    for(let [i,j,k] of bookings){

        // !Basically say that: 
        // From the index(flight) i-1 and onwards, I want to
        // add k-seats to each.
        // Because 1st flight points to index 0 of the result Array we re using result[i-1] and not result[i]
        result[i-1]+=k

        // !Basically say that:
        // After the index j, I dont want the k-seats anymore
        if(j<n) result[j]-=k
        // if j was equal to n that would mean that I dont really care what happens after I added k inbetween i and j-1. j-1 is the last element I really care about
    }

    // traverse the modified result array
    for (let i = 1; i < result.length; i++) {
        // Accumulate the final result (check out the provided image for this step)
        result[i]+=result[i-1] 

    }
    return result
  };
console.log(
    corpFlightBookings(
        [[1,2,10],[2,3,20],[2,5,25]],5
    )
)