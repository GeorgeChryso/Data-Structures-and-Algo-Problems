// We have an array A of integers, and an array queries of queries.

// For the i-th query val = queries[i][0], index = queries[i][1], we add val to A[index].  Then, the answer to the i-th query is the sum of the even values of A.

// (Here, the given index = queries[i][1] is a 0-based index, and each query permanently modifies the array A.)

// Return the answer to all queries.  Your answer array should have answer[i] as the answer to the i-th query.
function sumOfEven(x){
    return x.reduce((a,b)=>{
        
        if(b%2==0)
       { 
        return a+b}
        else{
            return a
        }
})-(x[0]%2==0?0:x[0])
}

var sumEvenAfterQueries = function(A, queries) {
  let answer=[]
   queries.forEach(
    (d)=>{
        A[d[1]]+=d[0]
        answer.push(sumOfEven(A))
    }

  )
  return answer

};

console.log(sumEvenAfterQueries(
    [1,2,3,4],[[1,0],[-3,1],[-4,0],[2,3]]
))