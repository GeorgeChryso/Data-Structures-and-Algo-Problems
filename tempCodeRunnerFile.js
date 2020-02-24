
// var maxSumDivThree = (A) => {
//     //cur[i] is the highest sum i can achieve such that sum%3=i
//     let item=0


//     for (let num of A) {
//         let pre =item // implicitly set current bucket to max of itself and previous bucket
//         let sum = num + pre;// max sum i can achieve using the curr element
//         let k = sum % 3; 
//         if(k==0)item = Math.max(item, sum);
//     }
//     return item
// };