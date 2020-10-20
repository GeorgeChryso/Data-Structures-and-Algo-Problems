// Write an API that generates fancy sequences using the append, addAll, and multAll operations.

// Implement the Fancy class:

// Fancy() Initializes the object with an empty sequence.
// void append(val) Appends an integer val to the end of the sequence.
// void addAll(inc) Increments all existing values in the sequence by an integer inc.
// void multAll(m) Multiplies all existing values in the sequence by an integer m.
// int getIndex(idx) Gets the current value at index idx (0-indexed) of the sequence modulo 109 + 7. If the index is greater or equal than the length of the sequence, return -1.
 

// Example 1:

// Input
// ["Fancy", "append", "addAll", "append", "multAll", "getIndex", "addAll", "append", "multAll", "getIndex", "getIndex", "getIndex"]
// [[], [2], [3], [7], [2], [0], [3], [10], [2], [0], [1], [2]]
// Output
// [null, null, null, null, null, 10, null, null, null, 26, 34, 20]

// Explanation
// Fancy fancy = new Fancy();
// fancy.append(2);   // fancy sequence: [2]
// fancy.addAll(3);   // fancy sequence: [2+3] -> [5]
// fancy.append(7);   // fancy sequence: [5, 7]
// fancy.multAll(2);  // fancy sequence: [5*2, 7*2] -> [10, 14]
// fancy.getIndex(0); // return 10
// fancy.addAll(3);   // fancy sequence: [10+3, 14+3] -> [13, 17]
// fancy.append(10);  // fancy sequence: [13, 17, 10]
// fancy.multAll(2);  // fancy sequence: [13*2, 17*2, 10*2] -> [26, 34, 20]
// fancy.getIndex(0); // return 26
// fancy.getIndex(1); // return 34
// fancy.getIndex(2); // return 20
 

// Constraints:

// 1 <= val, inc, m <= 100
// 0 <= idx <= 105
// At most 105 calls total will be made to append, addAll, multAll, and getIndex.

// 3 hours of debugging and turns out js overflows no matter what
// whooooo can say where the rain goes
// just always use extended euclidean for modular inverse, 
// Fermat's little theorem isnt applicable in js for big integers.
// ΧΑ, ΧΑ ,... ΧΑ.. δεν το περιμενες εετσι
// So the thing here is that keeping track of a pair [a,b] such that 
// ax+b gives me the result each time will suffice
// however, elements can be pushed after/before some operations, so they only require
// some of the operations performed, and not all

var Fancy = function() {
    this.arr=[]
    this.stack=[]
    this.pair=[1,0]

    //for each element x appended, keep track of the the pair[a,b] at that time
    // this will later give me the linear equation a'x+b', which will calculate
    // the value of x after some operations

    this.mod=1e9+7

    // let [aold,bold] be the pair the moment x was inserted
    // after some operations it will be 
    // [anew,bnew]
    // But only the operations between these two times has to be applied on x

    // [a,b] => a simple addition of +c turns this tuple into
    // [a,b+c]
    // whereas a multiplication *m
    // turns it into [a*m,b*m]

    // It is easy to notice, that the end result can be
    // newX= (anew/aold) *x + bnew-bold*(anew/aold)
    // The thing is, that these will most likely overflow, and I want 
    // the result mod1e9+7
    // In order to perform the division (anew/aold)% M
    // I have to instead compute, the modular inverse of aold mod M
    // and do it like that (anew*inverse(aold))%M
    // this can be easily calculated using Fermat's little theorem:
    // Because 1e9+7 is prime => let any number x <1e9+7
    // then the (modular inverse of xmodM)= x**(1e9+7-2)=x^(1e9+5)
    // so i ll have to just raise x to the 1e9+5 to find its inverse
    // this can be done using binary exponantiation
};

/** 
 * @param {number} val
 * @return {void}
 */
var Fancy = function() {
    this.arr=[]
    this.stack=[]
    this.pair=[1n,0n]

    //for each element x appended, keep track of the the pair[a,b] at that time
    // this will later give me the linear equation a'x+b', which will calculate
    // the value of x after some operations

    this.mod=BigInt(1e9+7)

    // let [aold,bold] be the pair the moment x was inserted
    // after some operations it will be 
    // [anew,bnew]
    // But only the operations between these two times has to be applied on x

    // [a,b] => a simple addition of +c turns this tuple into
    // [a,b+c]
    // whereas a multiplication *m
    // turns it into [a*m,b*m]

    // It is easy to notice, that the end result can be
    // newX= (anew/aold) *x + bnew-bold*(anew/aold)
    // The thing is, that these will most likely overflow, and I want 
    // the result mod1e9+7
    // In order to perform the division (anew/aold)% M
    // I have to instead compute, the modular inverse of aold mod M
    // and do it like that (anew*inverse(aold))%M
    // this can be easily calculated using Fermat's little theorem:
    // Because 1e9+7 is prime => let any number x <1e9+7
    // then the (modular inverse of xmodM)= x**(1e9+7-2)=x^(1e9+5)
    // so i ll have to just raise x to the 1e9+5 to find its inverse
    // this can be done using binary exponantiation
};

/** 
 * @param {number} val
 * @return {void}
 */
Fancy.prototype.append = function(val) {
    this.arr.push(BigInt(val))
    this.stack.push([...this.pair])
};

/** 
 * @param {number} inc
 * @return {void}
 */
Fancy.prototype.addAll = function(inc) {
    let [a,b]=this.pair
    this.pair=[a,(b+BigInt(inc)%this.mod)%this.mod]
};

/** 
 * @param {number} m
 * @return {void}
 */
Fancy.prototype.multAll = function(m) {
    let [a,b]=this.pair
    m=BigInt(m)
    this.pair=[(a*m)%this.mod,(b*m)%this.mod]
};

/** 
 * @param {number} idx
 * @return {number}
 */
Fancy.prototype.getIndex = function(idx) {
    let n=this.arr.length
    if(idx>=n)
        return -1
    let [ra,rb]=this.pair
    let [a,b]=this.stack[idx]
    // i want to now calculate the modular inverse of a mod1e9+7
    // so i can perform (ra/a)%mod
  
    
    let extendedEuclidean=( a,  b) =>{
    
        if (a == 0n) 
            return [b,0n,1n];
        
        let [g,x1,y1]= extendedEuclidean(b % a, a),
            x = BigInt(y1- ((b / a)>>0n) * x1,)
            y = BigInt(x1);
        return [g,x,y];//gcd,solution x , solution to y
    }
    let modInverse=(a,b)=>{
        a=BigInt(a)
        b=BigInt(b)
        let [g,x,y]=extendedEuclidean(a,b)
        if(g!==1n)return "Not possible" //gcd(a,mod) has to be 1 for the inverse to exist
        
        return ((x%b+b)%b) //picks the positive x
    }


    let ainverse=modInverse(a,1e9+7)
    let dif=ra*ainverse%this.mod

    return Number( ((dif*this.arr[idx])%this.mod + rb%this.mod-(b*dif)%this.mod) %this.mod)
};


//   a  b       ra        rb
// [ 3, 37 ] [ 44789760, 629233920 ] 14
let extendedEuclidean=( a,  b) =>{
    
    if (a == 0n) 
        return [b,0n,1n];
    
    let [g,x1,y1]= extendedEuclidean(b % a, a),
        x = BigInt(y1- ((b / a)>>0n) * x1,)
        y = BigInt(x1);
    return [g,x,y];//gcd,solution x , solution to y
}
let modInverse=(a,b)=>{
    a=BigInt(a)
    b=BigInt(b)
    let [g,x,y]=extendedEuclidean(a,b)
    if(g!==1n)return "Not possible" //gcd(a,mod) has to be 1 for the inverse to exist
    
    return ((x%b+b)%b) //picks the positive x
}
console.log(44789760n*modInverse(3,1e9+7)%BigInt(1e9+7),14929920119439360%(1e9+7))

console.log(14929920*14 +629233920-37*14929920%(1e9+7))

            653128757n
            558835200n 1n -653128757n
console.log(dif,this.arr[idx], rb-(b*dif)%this.mod)

