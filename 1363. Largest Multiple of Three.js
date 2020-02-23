// Given an integer array of digits, return the largest multiple of three that can be formed by concatenating some of the given digits in any order.

// Since the answer may not fit in an integer data type, return the answer as a string.

// If there is no answer return an empty string.




// Intuition: 3 divisibility rules says that if the sum of digis%3===0 then n%3==0
var largestMultipleOfThree = function(digits) {
    digits.sort((a,b)=>a-b)
    console.log(digits)
    let total=digits.reduce((acc,curr)=>acc+curr)
    
    console.log(total,total%3)
    //if total is divisible by 3 then my biggest number is already formed
    console.log(digits.reduce((acc,curr,i)=>acc+curr*(10**i)))
    
    if(total%3==0)return digits[digits.length-1]==0?'0':digits.reduce((acc,curr,i)=>curr+''+acc,'')

    

    //if the  remainder of total is 1, i can perform two operations
    // either remove a 1,4,7 to amke the remainder ==0
    // or remove two of 2,5,8 to make the remainder ==0
    // that would be 2,2 , 2,5 , 5,5 ,2,8, 5,8  8,8
    if(total%3==1){
        if(digits.length==1&&digits[0]==1)return ''

        let first=-1
        let second=[]
        for (let i = 0; i < digits.length; i++) {
            if(digits[i]==1 || digits[i]==7 || digits[i]==4){
                if(first==-1)first=i
            }            
            if(digits[i]==2 || digits[i]==5 || digits[i]==8){
                
                if(second.length<2)second.push(i)
            }  
        }
        
        console.log(first,second)
        //calculate the max number after the operations
        let result1=-1
        let result2=-1
        if(first!=-1&&digits.length>1){
            result1=0
            for (let i = 0,j=0; i < digits.length; i++) {
                    if(i!==first){
                        result1+=digits[i]*10**j
                        j++
                    }                
            }

        }

        if(second.length==2&&digits.length>2){
            result2=0
            for (let i = 0,j=0; i < digits.length; i++) {
                    if(i!==second[0]&&i!==second[1]){
                        result2+=digits[i]*10**j
                        j++
                    }                
            }

        }
        let final=Math.max(result1,result2)

        return final==-1?'':final.toString()


    }


    // else if the total's remainder is 2 we have yet again 2 operations
    // either remove one of 2 ,5 ,8
    // or two of 1,4,7
    if(total%3==2){
        if(digits.length==1&&digits[0]==2)return ''
        let first=-1
        let second=[]
        for (let i = 0; i < digits.length; i++) {
            if(digits[i]==2 || digits[i]==5 || digits[i]==8){
                if(first===-1)first=i
            }            
            if(digits[i]==1 || digits[i]==4 || digits[i]==7){
                
                if(second.length<2)second.push(i)
            }  
        }
        
        
        //calculate the max number after the operations
        let result1=-1
        let result2=-1
        if(first!=-1&&digits.length>1){
            result1=0
            for (let i = 0,j=0; i < digits.length; i++) {
                    if(i!==first){
                        result1+=digits[i]*10**j
                        j++
                    }                
            }

        }

        if(second.length==2&&digits.length>2){
            result2=0
            for (let i = 0,j=0; i < digits.length; i++) {
                    if(i!==second[0]&&i!==second[1]){
                        result2+=digits[i]*10**j
                        j++
                    }                
            }

        }
        let final=Math.max(result1,result2)
        return final==-1?'':final.toString()
    }
};


console.log(
    largestMultipleOfThree(
        [6,0,8,2,6,3,5,8,6,3,0,9,8,0,8,5,4,5,1,6,9,3,0,4,7,4,3,7,8,2,6,8,3,3,7,9,2,6,6,9,9,7,8,3,5,9,8,1,1,2,9,8,8,3,8,1,9,5,3,1,7,2,0,0,4,5,0,1,3,5,8,8,4,4,0,7,5,2,4,3,6,7,5,8,6,6,8,3,4,1,3,9,0,7,3,1,1,9,3,7,2,6,7,6,4,5,6,1,5,0,6,0,6,0,7,4,6,4,2,6,3,1,4,6,8,6,0,2,1,8,5,2,9,7,9,6,3,2,2,9,3,7,1,9,7,3,3,7,6,4,6,1,8,8,5,6,6,8,7,1,5,0,7,2,2,9,4,0,7,5,3,5,8,1,1,5,8,8,2,4,1,6,8,0,5,5,7,0,2,8,9,9,9,3,8,3,2,2,9,3,1,1,7,3,2,3,9,6,6,1,3,7,4,7,6,7,5,4,5,0,7,7,4,9,5,8,5,6,1,6,1,6,9,9,3,4,4,8,6,7,1,8,2,7,7,4,3,9,7,9,4,8,3,6,2,0,2,1,3,8,7,7,6,4,8,3,6,9,8,1,3,3,6,3,6,8,5,3,4,8,3,3,5,3,8,7,0,1,9,1,2,1,2,9,9,9,2,1,5,6,4,4,9,3,1,0,3,0,0,5,8,5,5,4,6,6,5,4,7,4,1,4,7,0,7,1,6,4,5,0,8,2,9,3,1,7,7,9,9,2,5,6,6,8,2,9,5,8,4,5,6,3,5,2,7,7,2,1,3,2,2,7,9,8,7,7,4,4,5,1,6,1,8,9,3,0,4,6,3,5,4,1,0,8,9,6,9,8,0,2,9,1,6,7,1,0,8,7,5,4,0,5,6,9,5,7,1,5,2,1,5,9,2,5,6,9,8,9,3,7,3,3,6,5,9,3,8,2,9,4,6,9,5,7,8,0,6,3,4,5,8,6,4,1,8,8,9,3,2,0,4,2,1,9,6,7,7,2,9,2,8,2,6,2,1,3,8,5,1,6,2,0,7,2,8,1,0,2,2,5,9,5,8,2,5,1,2,3,9,4,8,9,8,9,3,4,3,4,4,3]
    )
)