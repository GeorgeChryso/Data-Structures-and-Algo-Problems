'use strict'

// We have an array A of integers, and an array queries of queries.

// For the i-th query val = queries[i][0], index = queries[i][1], we add val to A[index].  Then, the answer to the i-th query is the sum of the even values of A.

// (Here, the given index = queries[i][1] is a 0-based index, and each query permanently modifies the array A.)

// Return the answer to all queries.  Your answer array should have answer[i] as the answer to the i-th query.


var sumEvenAfterQueries = function(A, queries) {
  let answer=[]
  let sum=A.reduce((a,b)=>{
        
    if(b%2==0)
   { 
    return a+b}
    else{
        return a
    }
})-(A[0]%2==0?0:A[0])

   queries.forEach(
    (d)=>{
        sum-=A[d[1]]%2==0?A[d[1]]:0
        A[d[1]]+=d[0]
        sum+=A[d[1]]%2==0?A[d[1]]:0
        answer.push(sum)
    }

  )
  return answer

};

console.log(sumEvenAfterQueries(
    [1,2,3,4],[[1,0],[-3,1],[-4,0],[2,3]]
))