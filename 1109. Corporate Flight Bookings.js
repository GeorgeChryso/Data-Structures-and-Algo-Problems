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
    var result=Array(n).fill(0)
  
    for(let [i,j,k] of bookings){

            result[i-1]+=k
            if(j<n)result[j]-=k
        console.log(result)
    }
    for (let i = 1; i < result.length; i++) {
        result[i]+=result[i-1] 

    }
    return result
  };
console.log(
    corpFlightBookings(
        [[1,2,10],[2,3,20],[2,5,25]],5
    )
)