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

console.log(
    corpFlightBookings(
        [[1,2,10],[2,3,20],[2,5,25]],5
    )
)