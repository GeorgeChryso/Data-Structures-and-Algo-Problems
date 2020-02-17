// Given an array of numbers nums, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once.

// Example:

// Input:  [1,2,1,3,2,5]
// Output: [3,5]
// Note:

// The order of the result is not important. So in the above example, [5, 3] is also correct.
// Your algorithm should run in linear runtime complexity. Could you implement it using only constant space complexity?

var singleNumber = function(nums) {
        let objy={}
        nums.forEach((d)=>{
            objy[d]=(objy[d]||0) +1
        }
        )
        return Object.keys(objy).filter(d=>objy[d]===1)
    };  



var singleNumber = function(nums) {
    var s = nums.reduce((n1, n2) => n1 ^ n2);
    // s is now equal to a^b, where a,b are my results


    //offset is the first different bit of my two results
    // which is equal to the first set bit of my s

    //var offset=s.toString(2).split('').reduce((acc,curr,i)=>curr?acc?i:acc:acc,0)
    var offset = 0;
    while (true) {
        if (s & 1 == 1) {
            break;
        }

        offset++;
        s >>= 1;
    }

    var a = 0, b = 0;
    nums.forEach(num => {
        // if the number has the offset-th bit inverted,store it on a
        if ((num >> offset) & 1 == 1) {
            a ^= num; //the duplicates will kill eachother leaving me with a
        } else {
            b ^= num; // and b
        }
    });

    return [a, b];
};


//elegant
var singleNumber = function(nums) {
    var s = nums.reduce((n1, n2) => n1 ^ n2); //still thats 'the a^b left
    let offset=s&~(s-1) //that gives me the number with the first 1 bit of s set...and everything else 0
    let a=nums.reduce((acc,curr)=>((curr&offset)!==0)?acc^curr:acc,0)//same logic
    return [a, a^s]; // [a,a^a^b]=[a,b]
};


console.log(singleNumber(
    [1,2,1,3,2,5]
))

console.log(3^3,3^1,1^3,4^1)