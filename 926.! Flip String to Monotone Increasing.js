// A string of '0's and '1's is monotone increasing if it consists of some number of '0's (possibly 0), followed by some number of '1's (also possibly 0.)
// We are given a string S of '0's and '1's, and we may flip any '0' to a '1' or a '1' to a '0'.
// Return the minimum number of flips to make S monotone increasing.
// Example 1:

// Input: "00110"
// Output: 1
// Explanation: We flip the last digit to get 00111.
// Example 2:

        // Input: "010110"
        //    011111
        //    010111

        //    000000
        //    000110
        //    000111
    var isMinc=(x)=>{
       // if( x==/^Duis/g)
        let i=0
        while( x.charAt(i)==0 && i<x.length){

            i++
        }
        console.log(i)
        if(i==x.length){return true }
        let j=i+1
        while( x.charAt(j)==1 && j<x.length){

            j++
        }
        console.log(j)
        if(j==x.length){
            return true
        }
        return false
        }  // True if monotone increasing, false if not 
    var isMinc0=(x)=>{
        return (/^0*1*$/g).test(x)
    }
    var Dec=(x)=>{
            return parseInt(x,2)
        } // bit to decimals
    var Bit=(x)=>{
            return x.toString(2)
        }  // decimal to bit  
    var onesIn=(x)=>{
        return x.match(/1/g).length
         } // counts 1 bits



        // console.log(
        //     onesIn(
        //     Bit(
        //     Dec(
        //         "00011000"
        //         )
        //         ^
        //     Dec(
        //         '00000000'
        //         )
        //     )
        //     )
            
        //     )

    
// Output: 2
// Explanation: We flip to get 011111, or alternatively 000111.
// Example 3:

// Input: "00011000"
// Output: 2
// Explanation: We flip to get 00000000.
 
//console.log('100100 => \n'+'100100'.replace(/1+0(1*)(0*)$/,'11$1$2')+'\n--------')
// Note:

// 1 <= S.length <= 20000
// S only consists of '0' and '1' characters.


var minFlipsMonoIncr = function(S) {
    let z=0, d=0;
    for(let i of S){
        z = Math.min(z, d)+ (i=='1'? 0:1);
        d+= (i=='1'? 1:0);
    }
   return Math.min(z, d);
};

var minFlipsMonoIncr = function(S) {
if(S==null||S.length==0){return 0}
var ones=0,flips=0

for(let d of S){
if ( d=='0') {          //An To stoixeio mou einai 0
    if( ones!=0){       // enw exw sunanthsei Monades prin px (0010<-010)
        flips++         // flippare to stoixeiaki
    }
    else continue;
}
else                    // to stoixeio mou einai 1
{                   
    ones++              

}

    if(flips>ones){        // an ta flips mhdenikwn ksepernane
                        // tis monades shmainei  oti 
    flips=ones          // me sumferei na antistrepsw tis monades
    }                   // px  0011000 ta flips sto telos einai 3 ksepernane tis 2           
                //          monades ara kalutera na antistrepsw aftes
}

return flips


}



console.log(
    minFlipsMonoIncr(
        '10001'
    )
)