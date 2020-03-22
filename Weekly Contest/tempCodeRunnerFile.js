


// var createTargetArray = function(nums, index) {
//    let target=[]
   
//    for (let i = 0; i < nums.length; i++) {
//        target.splice(index[i],0,nums[i])
//    }
//    return target
// };


// console.log(createTargetArray(
//     [1],[0]
// ))





// var sumFourDivisors = function(nums) {
//     let has4divisors=x=>{
//         let result=0
//         let totalSum=0
//         for (let i = 1; i <=x/2; i++) {
//             if(x%i==0){
//                 result++   
//                 if(result>4)return 0  
//                 totalSum+=i
//             }       
//         }

//         if(result==3)return totalSum+x
//         return 0
//     }
    
//     let primeFact=(x)=>{
//         let twos=0
//         while(x%2==0){
//             x/=2
//             twos++
//         }   
//         let factors={}
//         for (let i = 3; i <= Math.sqrt(x); i++) {
//             while(n%i==0)factors[i]=(factors[i]||0) +1           
//         }
//         if(x>2)factors[x]=1

//         return twos+1 + Object.values(factors).reduce((acc,curr)=>acc+curr+1)
//     }
//    // return nums.reduce((acc,curr)=>acc+primeFact(curr),0)

//     return nums.reduce((acc,curr)=>acc+has4divisors(curr),0)
// };

