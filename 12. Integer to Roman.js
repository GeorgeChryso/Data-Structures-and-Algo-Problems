// Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

// Symbol       Value
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
// For example, two is written as II in Roman numeral, just two one's added together. Twelve is written as, XII, which is simply X + II. The number twenty seven is written as XXVII, which is XX + V + II.

// Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

// I can be placed before V (5) and X (10) to make 4 and 9. 
// X can be placed before L (50) and C (100) to make 40 and 90. 
// C can be placed before D (500) and M (1000) to make 400 and 900.
// Given an integer, convert it to a roman numeral. Input is guaranteed to be within the range from 1 to 3999.


var intToRoman = function(A) {
    let answ=''
    while(A>=1000){
    answ+='M'
    A-=1000
    }
    while (A>=100){
        if(A>=900){
            answ+='CM'
            A-=900
            break
        }
        if( A>=500){
            answ+='D'
            while(A>599){
                answ+='C'
                A-=100
            }
            A-=500
            break
        }
         if (A>=400){
            answ+='CD'
            A-=400
            break;
        }
      
       answ+='C' 
        A-=100

    }
    while(A>=10){
        if(A>=90){
            answ+='XC'
            A-=90
            break
        }
        else if ( A>=50){
            answ+='L'
            while (A>59){
                answ+='X'
                A-=10
            }
            A-=50
            break;
        }
        else if ( A>=40){
            answ+='XL'
            A-=40
            break;
        }
        
            answ+='X'
        
        A-=10
    }
    console.log(A)
    var objy={
        0:'',
        1:'I',
        2:'II',
        3:'III',
        4:'IV',
        5:'V',
        6:'VI',
        7:'VII',
        8:'VIII',
        9:'IX'
    }
    return answ+objy[A]
};

console.log(intToRoman(
    58
))