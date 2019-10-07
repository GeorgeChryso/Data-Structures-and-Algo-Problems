// Given an integer n, return 1 - n in lexicographical order.

// For example, given 13, return: [1,10,11,12,13,2,3,4,5,6,7,8,9].

// Please optimize your algorithm to use less time and space. The input size may be as large as 5,000,000.


var lexicalOrder = function(n) {
    var result=[]
  for (let i = 1; i < n; i++) {
      result.push(i)
  }  
  return result.sort()
};



var lexicalOrder = function(n) {
    
    function getNumberByOrder( start, end) {
   for (var i=start; i<=end; i++) {
     if (i > n) {
       break;
     }
     
     res.push(i);
     getNumberByOrder( i*10, i*10+9);
   }
 }
   
   
   var res = [];
   
   getNumberByOrder( 1, 9);
   
   return res;
 };


var lexicalOrder = function(n) {
    var result = [];

    function getNumberByOrder( start, end) {
        
        while(start <= end ){
         console.log(result)
         if(start>n)break
         result.push(start);   
         getNumberByOrder(start*10, start*10+9);
         start++   
         
        }
   }

   
   
   getNumberByOrder( 1, 9);
   return result;
 };
 

 console.log(lexicalOrder(
    123

))