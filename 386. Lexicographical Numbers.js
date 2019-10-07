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

console.log(lexicalOrder(
    123

))


var lexicalOrder=(n)=>{
    var result=[]
    var objy={
        1:[],
        2:[],
        3:[],
        4:[],
        5:[],
        6:[],
        7:[],
        8:[],
        9:[]
    }
for (let i = 0; i < n.length; i++) {

    for (let j = 1; j <= n; j**10) {
        result.push(j)
        for (let z = 1; z < j; z++) {
            objy[String(j[0])].push(z)
        }

    }
    
}


}


//mexri 5 000 000