

// var sortByBits = function(arr) {
//     if( arr.length===1)return arr
//     let countones=n=>{
//         let count=0
//         while(n!=0){
//             count+=(n&1)
//             n>>>=1
//         }
//         return count
//     }
    
//     return arr.sort((a,b)=>{
//         if(countones(a)<countones(b))return -1
//         if(countones(a)===countones(b))return a-b
//         return 1

//     })
// };




// /**
//  * @param {number} n
//  * @param {number} discount
//  * @param {number[]} products
//  * @param {number[]} prices
//  */
// var Cashier = function(n, discount, products, prices) {
//     this.number=n
//     this.discount=discount
//     // this.products=products
//     // this.prices=prices
//     this.buffer=0
//     this.pricedict={}
//     for (let i = 0; i < products.length; i++) {
//         this.pricedict[products[i]]=prices[i]        
//     }
// };

// /** 
//  * @param {number[]} product 
//  * @param {number[]} amount
//  * @return {number}
//  */
// Cashier.prototype.getBill = function(product, amount) {
//     this.buffer++
//     let sum=0
//     for (let i = 0; i < product.length; i++) {
//         sum+=(this.pricedict[product[i]]*amount[i])     
//     }
//     if(this.buffer==this.number){
//         this.buffer=0
//         sum-=((this.discount/100)*sum)
//     }
//     console.log(sum)
//     return sum
// };

// /** 
//  * Your Cashier object will be instantiated and called as such:
//  * var obj = new Cashier(n, discount, products, prices)
//  * var param_1 = obj.getBill(product,amount)
//  */

// console.log(
//    sortByBits (
//     [10,100,1000,10000]
//        )
// )



// console.log('a'.charCodeAt(0).toString(2))
// console.log('b'.charCodeAt(0).toString(2))
// console.log('c'.charCodeAt(0).toString(2))

// console.log(97&98)


// let mitso=new Cashier(192,34,[77],[302])
// mitso.getBill([77],[343])
// mitso.getBill([77],[990])
// mitso.getBill([77],[101])
// mitso.getBill([77],[577])

console.log(302*101)
var numberOfSubstrings = function(s) {
    let result=0
    for (let start = 0; start <= s.length-3; start++) {
        let changed=false
        for (let end = start+2; end < s.length; end++) {

            let set=new Set()
            let count=0
            for (let i = start; i <=end; i++) {
                if(!set.has(s[i])){
                    count++
                    set.add(s[i])
                }
                if(count===3){
                    changed=true
                    result+=(s.length-end)
                    break
                }                
            }
            if(changed){
                break
            }
            
        }
        
    }
    return result
};


console.log(numberOfSubstrings("abcabc"))
