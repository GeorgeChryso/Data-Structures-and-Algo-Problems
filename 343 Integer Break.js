// Given a positive integer n, break it into the sum of at least two positive integers and maximize the product of those integers. Return the maximum product you can get.

// You may assume that n is not less than 2 and not larger than 58.

var integerBreak = function(n) {
   if ( n==2 || n==3) return n-1
   var product=1

   while(n>4){
       product=product*3
       n-=3
   }
   product*=n


   return product
};


