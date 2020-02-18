

var toHex = function(num) {
    let hexdic={
        10:'a',11:'b',12:
        'c',13:'d',14:'e',15:'f'
    }
    let hexy=(num)=>num<10?''+num:hexdic[num]
    let sigBits=x=>{
        if(x==1)return 1
        console.log(x)
        console.log(`hi`)
        let significant=0
        for (let i = 0; i <32; i++) {
            if(num>=(2**i) && num<=( 2**(i+1))){
                significant=i+1
            }
        }
        return significant
    }


    if(num===0)return '0'

    let binary2hex=(num)=>{
        let significant=sigBits(num)
        let result=''
        let last=significant%4
        while(significant!=last){
            result=hexy(15&num)+result
            num>>>=4
            significant-=4
        }

        if(last!=0){
            let k=1
            let left=last-1
            while(left!=0){
                k=(k<<1)|1
                left--
            }
            k=k&num
            result=hexy(k)+result
        }
        return result
    }

    if(num>0)return binary2hex(num)
    else {
        let mask=1

        let s=Number(sigBits(-num))
        for (let i = 1; i <(32-s); i++) {
            mask=(mask<<1)|1
        }
        
        for (let i = 0; i <s; i++) {
            mask<<=1            
        }

        mask=mask|(~num)
        console.log(`mask`,mask,mask.toString(2))

        return binary2hex(mask)
    }
    
};

console.log(toHex(-1))
// let z= ~(4-1)
// let k= ~z+1

// console.log(
//     011111111111110
// )