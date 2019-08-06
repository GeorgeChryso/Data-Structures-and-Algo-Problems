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

console.log(lol(
  'da da  '
))
