// Given a non-empty array of integers, every element appears twice except for one. Find that single one.

// Note:

// Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

// Example 1:

// Input: [2,2,1]
// Output: 1


var singleNumber0 = function(nums) {


    // for ( d of nums){
        
    //     if(nums.indexOf(d)==nums.lastIndexOf(d)){
    //         return d

    //     }

    // }

    return nums.reduce((a,b) => a^b);


    
};

// Runtime: 80 ms, faster than 31.27% of JavaScript online submissions for Single Number.
// Memory Usage: 37 MB, less than 47.45% of JavaScript online submissions for Single Number.

// lusi 2(a+b+c)-(a+a+b+b)=c  , c zitoumeno
var singleNumber = function(nums) {


  
    return 2*nums.sort()
               .reduce((s,d,i)=>{
                         if (i%2==0)
                         {return s+d}
                            return s;}) 
    - nums.reduce((a,b)=> a+b)

    
};

console.log(
    singleNumber(
       
        [1,0,1,3,0]
    )
)


// Return the rightmost 1 in the binary representation of a number.
// Example: For 1010, you should perform some operations to give 0010 as the output. For 1100, you should give 0100. Similarly for 0001, you should return 0001.
// ara 10=>2    1010   =>0010
//     12=>8    1100   =>0100
//      1=>1    0001   =>0001


let z=(x)=>{
return x ^ (x & (x - 1))

}
//  110
//  101
//------
//   100 

// a^a=0
// a&a=a


// Count set bits in an integer
// dhladh metrhse tous asous sta bits tou arithmou
let countOnesOfBits=(x)=>{
    // auto pou kanw kathe fora einai apo se o,ti fasi kai na
    // vrisketai o arithmos, ton prattw (&) me tin monada gia na dw an
    // exei monada ekei pou metraw, kai an exei to metraw alliws sunexizw
 let count=0;
 while(x>0){
    count=count+x&1;   // an to teleutaio einai 1(eksigisi katw), metrise 1
    x=x>>1;          // kai metefere ton arithmo 1 monada deksia
 }
return count;
}
// eksigisi
// an to teleutaio psifio opoioudipote arithmou einai 1
// p.x. 101=5
// an to praksw me to 1, pairnw 1
// dhladh 5&1=1
// an omws to teleutaio den htan 1 tha epairna 0
// 100=4  ara 4&1=0
//to & vazei sto idio bit 1 kai se diaforetika 0


// Count number of bits to be flipped to convert A to B


// Input : a = 10, b = 20
// Output : 4
// Binary representation of a is 00001010
// Binary representation of b is 00010100

// ^ litourgei ws eksis
// diaforetika ^=1
// idia^ =0

// 0001 =1 
// ^
// 1011 =11
//-----
// 1010 thelw 2 bits loipon gia na metatrepse 1 se 11

// ara gia dw posa bits prepei na allaksw prepei ousiastika prwta
// na to praksw me ^ 
// gia na dw se poia bits diaferei me ton arithmo ( sta 1 diaferei)
// kai ustera na metrisw poses monades exei o neos arithmos
//ara

var bitsToConvert=(a,b)=>{

  return  countOnesOfBits(a^b) // tin ethesa pio panw
}

//px 
console.log(bitsToConvert(13,9))