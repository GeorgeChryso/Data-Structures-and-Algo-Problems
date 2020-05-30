var canBeEqual = function(target, arr) {
//     let memo={}
//     arr.forEach(d=>memo[d]=(memo[d]||0)+1)
//     for (let i = 0; i < target.length; i++) {
//         if(memo[target[i]]===undefined)return false
//         else memo[target[i]]--        
//     }
//     return Object.values(memo).every(d=>d===0)
// };



// var hasAllCodes = function(s, k) {
//     let memo=new Set()

//     for (let i = 0; i < s.length; i++) {
//         if(i+k<=s.length)memo.add(Number.parseInt(s.slice(i,i+k),2))
//     }  

//     for (let i = 0; i < 2**(k); i++) {
//         console.log(i)
//         if(!memo.has(i))return false        
//     }
//     return true
// };

// console.log(hasAllCodes(
//  //   "00110110",  2+
//     "00110",2
// ))
