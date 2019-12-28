// var a = 3;
// var x = a;
// a++;

// var b = [1, 2, 3];
// var c = b;
// var qe = c;
// c = 2;
// x--;
// console.log(a, x);

// console.log(typeof b);
// console.log(b, c, qe);
// var a='[1,2,3,null,null,4,5]'

// var res=a.replace(/[\[\]']/g,'').split(',')//.map(Number)
// for (let i = 0; i < res.length; i++) {
//      if(res[i]==='null'){
//    res[i]=null
//      }
// else res[i]=Number(res[i])
//     }


// for (let i = 0; i < res.length; i++) {
//     if(res[i])res[i]=res[i].toString()
//     else res[i]='null'    
// }
// res[0]='['+res[0]
// res[res.length-1]=res[res.length-1]+']'
// res=res.join(',')

// // console.log(typeof res)

// let da=new Set()
// da.add([2,2,3])
// let z=[2,2,3]
// da.add(z)


// let du=new Map()
// du.set([1],2)

// let wm=new WeakMap()
// wm.set([2,2,3])

// console.log(da.has(z))
// console.log(wm.has([2,2,3]))
// console.log(da.has([2,2,3]))
// console.log(du.has([1]))

var canPartition = function(A) {
    //calculate the sum of my Array
    var sumA = A.reduce((acc, curr) => acc + curr);

    if (sumA % 2) return false;

    //create Rows
    // i want a row for each of my candidate elements+ one for my
    // 0th element( no element ) which I know for a fact can add up to 0 if selected
    var B = new Array(A.length + 1).fill(null);

    // create Columns
    // My final total sum ranges from 0 to sumA, which are totally sumA+1 candidate weights(sums)
    B = B.map(d => Array((sumA/2)+1).fill(false));

    // now that the matrix is created i have to use my base case which is:
    // If there is a way for me to get sum=0, with 0 elements
    B[0][0] = true;    // of course there is


    //now let's see what I actaully want to find
    //if there is ANY subset, that adds Up to sumA/2
    //so that would mean ANY element of the column A/2, that would be dp[;][A/2]


    //here i=0 cos everything other column (sum) of this row cannot be created with 0 elements
    for (let i = 1; i <= A.length; i++) {
        for (let j = 0; j <= sumA / 2 ; j++) {
            //I know that i-1>=0 so i dont need an extra check for that
            if (j - A[i - 1] >= 0){
                B[i][j] = B[i - 1][j - A[i - 1]]||B[i - 1][j];
            }
            else{
                B[i][j] = B[i - 1][j];

            }
            
        }
    }

    return B[A.length][sumA/2];
};


var canPartition = function(A) {
    var sumA = A.reduce((acc, curr) => acc + curr);

    if (sumA % 2) return false;
  
    var previousRow = new Array((sumA/2)+1).fill(false);
    var currentRow= new Array((sumA/2)+1).fill(false);
    
    previousRow[0] = true; // base case  


    for (let i = 1; i <= A.length; i++) {
        for (let j = 0; j <= sumA / 2 ; j++) {
           
            if (j - A[i - 1] >= 0){
                currentRow[j] = previousRow[j - A[i - 1]]||previousRow[j];
            }
            else{
                currentRow[j] = previousRow[j];

            }
            
        }
        previousRow=currentRow.slice(0) // make previous=current
    }

    return currentRow[sumA/2];
};

var canPartition = function(A) {
    var sumA = A.reduce((acc, curr) => acc + curr);

    if (sumA % 2) return false;
  
    var row = new Array((sumA/2)+1).fill(false);
    
    row[0] = true; // base case  


    for (let i = 1; i <= A.length; i++) {
        for (let j = sumA / 2; j >= 0; j--) {
            if (j - A[i - 1] >= 0){
                row[j] = row[j - A[i - 1]]||row[j];
            }
        }
    }

    return row[sumA/2];
};
console.log(
    canPartition(
       // [1,2,5] //f
       [1,5,11,5] //t
    )
)