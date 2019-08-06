var lol=(A)=>{


for (var i=A.length-1 ;  A.charAt(i)==' ' && i!=-1 ;i-- ){




}
if(i==-1){
    return 0
}
console.log(i)
for (var j = i-1 ; A.charAt(j)!=' ' && j!=-1; j--) {
    
}
console.log(j)
if ( j==-1){
    return i+1
}
else{
    return i-j
}


}
// optimal speed



var lengthOfLastWord = function(s) {
    return s.trim().split(" ").pop().length;
};/// poor speed
//trim removes all whitespace in the end and the beginning of the string, split creates an array and pop returns the last element of the array


var lengthOfLastWord = function(s) {
    var endPointer = s.length - 1; // parses the string
    
    while(s[endPointer] === ' '){ // until the first non whitespace character
        endPointer--;
    }
    var arr = s.substring(0,endPointer + 1).split(' '); // then creates an array splitting on whitespace and returns the last element's length
    return arr[arr.length - 1].length;
};



console.log('da da'.indexOf())

// console.log(lol(
//   'da da  '
// ))
