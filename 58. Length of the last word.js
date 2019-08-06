var lol=(A)=>{
  A=  Array.from(A)
  console.log(A)
for (var i=0;  i< A.length-1;i++ ){
console.log(i)
if (A[A.length-1-i]==' '){
    break
}
}
    return i==A.length-1?0:i
}

console.log(lol(
    'toend'
))