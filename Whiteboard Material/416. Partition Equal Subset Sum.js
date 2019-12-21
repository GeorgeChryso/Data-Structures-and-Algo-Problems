// Given a non-empty array containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.

// Note:

// Each of the array element will not exceed 100.
// The array size will not exceed 200.



//  K   N   A   P   S   A   C   K       S   O   L   U   T   I   O   N
// Let us see what we seek: Whether (boolean) there is a pair of partition subsets
// A1,A2, such that sum(A1)=sum(A2)
//  now let's advance what we seek to a clearer formula
//  I know that sumA1 + sumA2= sumA
//  so 2*sumA1=sumA since sumA1=sumA2
//  so sumA1=sumA/2
// that means I seek a subset of my current set so that it equals the sum of all my elements divided by two,
// From that I can deduce that the sum of all my elements must be divisible by two
// so It must be even, or there is no such subset

// Ok so this is apparently another knapsack problem which DP can handle.
// I will create a matrix of N rows (for each Item I can potentially use)
// and M columns (all the possible results of the sum of my item selection)

// The dp relies on the intuition that: On my final selecion, I can Either choose an Item, or Ignore it, hence each cell of my dp matrix will represent
// dp[i][j] : The total number of ways sum J can be reached using the first i items
// dp[i][j]=dp[i-1][j]+dp[i-1][j-A[i-1]]
// that means: the Number of ways i can reach sum J with the first i items is the sum of:
// the number of ways I can reach the same sum with the previous i-1 elements (which basically means I didnt choose the i-th item)
// plus
// the number of ways I can reach the same sum minus the sum of the i-1th item , which means that I chose the last item in order to get to my sum J

// Runtime O(N*sum(A))
// Space O(N*sum(A))=> can be reduced by just alternating between just two rows, because my formula only relies on just the previous row
var canPartition = function(A) {
    //calculate the sum of my Array
    var sumA = A.reduce((acc, curr) => acc + curr);

    if (sumA % 2) return false;

    //create Rows
    // i want a row for each of my candidate elements+ one for my
    // 0th element( no element ) which I know for a fact can add up to 0 if selected
    var dp = new Array(A.length + 1).fill(null);

    // create Columns
    // My final total sum ranges from 0 to sumA, which are totally sumA+1 candidates
    dp = dp.map(d => Array(sumA + 1).fill(0));

    // now that the matrix is created i have to use my base case which is:
    // The number of ways I can end up with sum=0 by using 0 items is 1 ways: just by selecting the 0th item (doesnt exist, which means i just take no item at all)
    dp[0][0] = 1;

    //now let's see what I actaully want to find
    //if there is ANY subset, that adds Up to sumA/2
    //so that would mean ANY element of the column A/2, that would be dp[;][A/2]

    //now, theoretically, I could fill the whole board and then check my column but that's BOOOOOOOOOOORING
    // so let's look at my formula again
    // dp[i][j]=dp[i-1][j]+dp[i-1][j-A[i-1]]
    // so that means, any element will eithter use the item above it( on the previous row or same column), or an item on the previous row but on a smaller number of column
    // so It's ok not to fill the whole board and just go up to my desired column (A/2)

    //here i=0 cos everything other column (sum) of this row cannot be created with 0 elements
    for (let i = 1; i < A.length; i++) {
        for (let j = 0; j <= sumA / 2; j++) {
            //I know that i-1>=0 so i dont need an extra check for that
            dp[i][j] += dp[i - 1][j];
            if (j - A[i - 1] >= 0) dp[i][j] += dp[i - 1][j - A[i - 1]];

            // here i check whether the element of the row I'm concerned about was positive, if so that means a target Subset was found
            if (j == sumA / 2 && dp[i][j]) return true;
        }
    }
    console.log(dp.forEach(d => console.log(d + '')));
    return false;
};

// ok let's optimize this a bit by just creating 2 rows of length sumA/2 +1
// which should be sufficient to reduce memory constraints
var DcanPartition = function(A) {
    var sumA = A.reduce((acc, curr) => acc + curr);

    if (sumA % 2) return false;

    var previous = new Array((sumA / 2) + 1).fill(0);


        //var current = new Array(sumA / 2 + 1).fill(0);
        //or if youre kewl
    var current=[...previous] // copies the array, same as
        // var current=Array.from(previous) //l8am8a
    previous[0] = 1;

    for (let i = 1; i < A.length; i++) {
        console.log(A[i-1])
        console.log(previous+'')

        //OLD WAY ,with hard copying the previous array
                for (let j = 0; j <= sumA / 2; j++) {
                    current[j] = 0;
                    //I know that i-1>=0 so i dont need an extra chec   k for that
                    current[j] += previous[j];
                    if (j - A[i - 1] >= 0) current[j] += previous[j - A[i - 1]];

                    if (j == sumA / 2 && current[j]) return true;
                }
                //that's O(sumA/2+1) complexity
                //copy the array (choose one of them)
                     previous = current.slice(0); // seems to be faster than spread operator
                    //  previous=Object.values(current)
                    //   previous=current.map(d=>d)
                    // previous=JSON.parse(JSON.stringify(current))
                    //previous=Array.from(current)


    }
    console.log(previous+'')


    return false;
};

// optimization using bits and 2 states
var DcanPartition = function(A) {
    var sumA = A.reduce((acc, curr) => acc + curr);

    if (sumA % 2) return false;


    // to start with, i want the number with 1 as its first element so i can mimic the previous[0]=1 state, and length of bits= the length of bits of my desired sum (sumA/2)
    console.log((sumA/2 ).toString(2))
    let start=(sumA/2)&0 
    //essentially switch the first bit of start to 1
    start|=start^1<<1

    //extend the bits so ican have more 0s
    start=start<<25
    console.log(start.toString(2))

    var previous=start

    for (const weight of A) {
        console.log(previous.toString(2) , `weight was `,weight)
        previous=(previous)|(previous>>weight)
    }



    // var previous = new Array((sumA / 2) + 1).fill(0);


    //     //var current = new Array(sumA / 2 + 1).fill(0);
    //     //or if youre kewl
    // var current=[...previous] // copies the array, same as
    //     // var current=Array.from(previous) //l8am8a
    // previous[0] = 1;

    // for (let i = 1; i < A.length; i++) {
    //     console.log(A[i-1])
    //     console.log(previous+'')

    //     //OLD WAY ,with hard copying the previous array
    //             for (let j = 0; j <= sumA / 2; j++) {
    //                 current[j] = 0;
    //                 //I know that i-1>=0 so i dont need an extra chec   k for that
    //                 current[j] += previous[j];
    //                 if (j - A[i - 1] >= 0) current[j] += previous[j - A[i - 1]];

    //                 if (j == sumA / 2 && current[j]) return true;
    //             }
    //             //that's O(sumA/2+1) complexity
    //             //copy the array (choose one of them)
    //                  previous = current.slice(0); // seems to be faster than spread operator
    //                 //  previous=Object.values(current)
    //                 //   previous=current.map(d=>d)
    //                 // previous=JSON.parse(JSON.stringify(current))
    //                 //previous=Array.from(current)


    // }
    // console.log(previous+'')


    return false;
};



// optimization one row
var canPartition = function(A) {
    var sumA = A.reduce((acc, curr) => acc + curr);

    if (sumA % 2) return false;

    var previous = new Array((sumA / 2) + 1).fill(0);


    //with the new way I end up not needing as second array (LOOK further down)
        //var current = new Array(sumA / 2 + 1).fill(0);
        //or if youre kewl
        // var current=[...previous] // copies the array, same as
        // var current=Array.from(previous) //l8am8a
    previous[0] = 1;

    for (let i = 1; i < A.length; i++) {
        console.log(A[i-1])
        console.log(previous+'')

        //OLD WAY ,with hard copying the previous array
                // for (let j = 0; j <= sumA / 2; j++) {
                //     current[j] = 0;
                //     //I know that i-1>=0 so i dont need an extra chec   k for that
                //     current[j] += previous[j];
                //     if (j - A[i - 1] >= 0) current[j] += previous[j - A[i - 1]];

                //     if (j == sumA / 2 && current[j]) return true;
                // }
                //that's O(sumA/2+1) complexity
                //copy the array (choose one of them)
                    // previous = current.slice(0); // seems to be faster than spread operator
                    //  previous=Object.values(current)
                    //   previous=current.map(d=>d)
                    // previous=JSON.parse(JSON.stringify(current))
                    //previous=Array.from(current)


        // New way, better runtime and space cos i m not hard copying the array
            //ok it's actually big brain time, what if I only use just one array and traverse it from right to left HUUUUUUUUH? what if I just use previous and just update it leftwards in order for me to not alter the important columns
            for (let j = sumA/2; j >=0; j--){

                previous[j]+=(j - A[i - 1] >= 0)?previous[j - A[i - 1]]:0 

                if (j == sumA / 2 && previous[j]){
                    console.log(A[i])
                    console.log(previous+'')
                    return true;
                }
            }
         // inb4 it actually works and its better(O(sumA+1)) space
    }
    console.log(previous+'')


    return false;
};



// so let's see
var canPartition = function(A){
    var sumA = A.reduce((acc, curr) => acc + curr);
    //sumA&1 means => take the bit representation of sumA and & it with ...00001\
    // if the last bit ends in 1 , that means that sumA&1 will return true
    // that means that sumA is not divisible by two, becaue its last bit is one
    // and 1&1=1, so the result will be 0000001=1 => true
    // On the other hand, if the number isn't odd, that means that its last bit is definitely 0, so by extension sumA&1=....0 & ...01=...00 cos 0&1=0
    // So i could definitely replace 
    // if (sumA % 2) return false;
    // with 
    if(! (sumA&1))return false
    // another way to check if a number is even or odd is 
    // shifting left and right by 1 bit on order to see if the last bit was 0 in the first place
    // if(sumA>>1<<1===sumA) then sumA is even because I removed 1 zero and readded it with the left shift and the number did not change 
    // whereas if sumA was odd
    // sumA>>1<<1 != sumA, cos the last bit was 1, i shifted it to the right( removed it) and placed a 0 as the last bit on its stead, creating a different number
    
    let intitial=1
    for (const weight of A) {
        intitial=intitial|intitial<<weight
    }
    return  intitial[sumA >> 1];
};


// Best optimized way using BITS
var canPartition = function(nums){
    const bits = nums.reduce((acc, num) => acc | acc << BigInt(num),1n)
    const acc = nums.reduce((acc, num) => acc + num)
    return !(acc & 1) && bits >> BigInt(acc >> 1) & 1n
};


console.log(DcanPartition([1, 5, 11, 5]));
