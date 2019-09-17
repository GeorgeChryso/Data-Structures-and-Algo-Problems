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
    A=String(A)
    var answ=[]
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
        9:'IX',
        10:'X',20:'XX',30:'XXX',
        40:'XL',
        50:'L',60:'LX',70:'LXX',80:'LXXX',
        90:'XC',
        100:'C',200:'CC',300:'CCC',
        400: 'CD',
        500:'D',600:'DC',700:'DCC',800:'DCCC',
        900:'CM',
        1000:'M',
        2000:'MM',
        3000:'MMM'
    }
  for (let i = 0; i < A.length; i++) {
   answ+= objy[A[i]*Math.pow(10,(A.length-i-1))]
  }
    return answ

   
};
var intToRoman = function(num) {
    let result = '';
    switch (Math.floor(num/1000)) {
        case 0:
            break;
        case 1:
            result += "M";
            //num -= 1000;
            break;
        case 2:
            result += "MM";
            //num -= 2000;
            break;
        case 3:
            result += "MMM";
            //num -= 3000;
            break;
    }
    switch (Math.floor((num%1000)/100)) {
        case 0:
            break;
        case 1:
            result += "C";
            //num -= 100;
            break;
        case 2:
            result += "CC";
            //num -= 200;
            break;
        case 3:
            result += "CCC";
            //num -= 300;
            break;
        case 4:
            result += "CD";
            //num -= 400;
            break;
        case 5:
            result += "D";
            //num -= 500;
            break;
        case 6:
            result += "DC";
            //num -= 600;
            break;
        case 7:
            result += "DCC";
            //num -= 700;
            break;
        case 8:
            result += "DCCC";
            //num -= 800;
            break;
        case 9:
            result += "CM";
            //num -= 900;
            break;
    }
    switch (Math.floor((num%100/10))) {
        case 0:
            break;
        case 1:
            result += "X";
            //num -= 10;
            break;
        case 2:
            result += "XX";
            //num -= 20;
            break;
        case 3:
            result += "XXX";
            //num -= 30;
            break;
        case 4:
            result += "XL";
            //num -= 40;
            break;
        case 5:
            result += "L";
            //num -= 50;
            break;
        case 6:
            result += "LX";
            //num -= 60;
            break;
        case 7:
            result += "LXX";
            //num -= 70;
            break;
        case 8:
            result += "LXXX";
            //num -= 80;
            break;
        case 9:
            result += "XC";
            //num -= 90;
            break;
    }
    switch (num%10) {
        case 0:
            break;
        case 1:
            result += "I";
            break;
        case 2:
            result += "II";
            break;
        case 3:
            result += "III";
            break;
        case 4:
            result += "IV";
            break;
        case 5:
            result += "V";
            break;
        case 6:
            result += "VI";
            break;
        case 7:
            result += "VII";
            break;
        case 8:
            result += "VIII";
            break;
        case 9:
            result += "IX";
            break;
    }
    return result;
};

console.log(intToRoman(
    58
))