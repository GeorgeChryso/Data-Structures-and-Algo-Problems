// A 3 x 3 magic square is a 3 x 3 grid filled with distinct numbers from 1 to 9 such that each row, column, and both diagonals all have the same sum.

// Given an grid of integers, how many 3 x 3 "magic square" subgrids are there?  (Each subgrid is contiguous).

 

// Example 1:

// Input: [[4,3,8,4],
//         [9,5,1,9],
//         [2,7,6,2]]
// Output: 1
// Explanation: 
// The following subgrid is a 3 x 3 magic square:
// 438
// 951
// 276

// while this one is not:
// 384
// 519
// 762


var numMagicSquaresInside = function(A) {

var Disti=(i,j)=>{
    let grgr={1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
        7:0,
        8:0,
        9:0
    }
    for (let iq=i;iq<3;iq++) {
        for (let jq=j; jq < 3; jq++) {
            grgr[A[iq][jq]]+=1
        }
        
    }
    if(Object.values(grgr).some((d)=>d!=1)){
        return false
    }
    return true

}
var isMS=(A,i,j)=>{

let s=A[i][j]+A[i+1][j]+A[i+2][j]
let q=s
let eq=s
let ep=s

for (let z = 0; z < 3; z++) 
 {
    s=s-A[i][j+z]
    eq=eq-A[i+z][j]
    q=q-A[i+z][j+z]
    ep=ep-A[i+z][j+2-z]    

}



if(s!=0||eq!=0||q!=0||ep!=0|| !Disti(i,j) ){
    return false
}
 return true
}  


let cc=0
for (let u=0 ;u+2<A[0].length; u+=2){
    for (let t = 0; t+2< A.length; t+=2) {
        if(isMS(A,u,t)){
            cc+=1
        }        
    }

}

return cc

};

console.log(
    numMagicSquaresInside(
        [[4,3,8,4],[9,5,1,9],[2,7,6,2]]
    )
)