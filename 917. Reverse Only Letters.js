





// var reverseOnlyLetters = function(S) {
//     var A={'Q':' ',
//     'W':' ',
//     'E':' ',
//     'R':' ',
//     'T':' ',
//     'Y':' ',
//     'U':' ',
//     'I':' ','O':' ','P':' ','A':' ','S':' ','D':' ','F':' ',
//     'G':' ','H':' ','J':' ','K':' ','L':' ','Z':' ','X':' ',
//     'C':' ','V':' ','B':' ','N':' ','M':' ','q':' ','w':' ',
//     'e':' ','r':' ','t':' ','y':' ','u':' ','i':' ',
//     'o':' ',
//     'p':' ',
//     'a':' ',
//     's':' ',
//     'd':' ',
//     'f':' ',
//     'g':' ',
//     'h':' ',
//     'j':' ',
//     'k':' ',
//     'l':' ',
//     'z':' ',
//     'x':' ',
//     'c':' ',

//     'v':' ',
//     'b':' ',
//     'n':' ',
//     'm':' '
// }
//    var Z= S.split('').map(d=>A[d]?false:d)
   
//    for (let i =S.length-1,j=0; i >-1; i--) {
//        if(A[S[i]]){
//       while( Z[j]!==false ){
//           j++
//       }
//        if( j>Z.length-1){
//            break
//        }
//        Z[j]=S[i]
//     }
//    }

//    return Z.join('')
// };
console.log(isLetter)



 var reverseOnlyLetters = function(S) {
    var replaceAt=function(index, replacement) {
        S= S.substr(0, index) + replacement+ S.substr(index + replacement.length);
    }
        var A={'Q':' ',
        'W':' ',
        'E':' ',
        'R':' ',
        'T':' ',
        'Y':' ',
        'U':' ',
        'I':' ','O':' ','P':' ','A':' ','S':' ','D':' ','F':' ',
        'G':' ','H':' ','J':' ','K':' ','L':' ','Z':' ','X':' ',
        'C':' ','V':' ','B':' ','N':' ','M':' ','q':' ','w':' ',
        'e':' ','r':' ','t':' ','y':' ','u':' ','i':' ',
        'o':' ',
        'p':' ',
        'a':' ',
        's':' ',
        'd':' ',
        'f':' ',
        'g':' ',
        'h':' ',
        'j':' ',
        'k':' ',
        'l':' ',
        'z':' ',
        'x':' ',
        'c':' ',
    
        'v':' ',
        'b':' ',
        'n':' ',
        'm':' '
    }
  
    for (let i =S.length-1,j=0; i >-1; i--) {
        if(A[S[i]]){
            while(!A[S[j]]){j++;}
            if(j>S.length-1||i<=j){break;}
            var C=S[j]
            replaceAt(j,S[i])
            replaceAt(i,C)
            j++
        }
       }
       return S

    };

    console.log(reverseOnlyLetters(
        '?6C40E'
        ))