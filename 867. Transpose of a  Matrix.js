var transpose=(A)=>{


    var result=[]
    // A.forEach(
    //     (d,i)=>{
    //         let curr=[]
    //         A[i].forEach(
    //             (k,j)=>{
                    
    //             }
    //         )
            
    //     }
    // )
    for (let i = 0; i < A[0].length; i++) {
result.push([])  ;   
  for (let j = 0; j < A.length; j++) {
            result[i].push(A[j][i])
            
        }
        
    }


    return result
}



console.log(transpose(
    [   [1,2,3],
        [4,5,6]
    ]
))

