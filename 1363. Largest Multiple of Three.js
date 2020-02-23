// Given an integer array of digits, return the largest multiple of three that can be formed by concatenating some of the given digits in any order.

// Since the answer may not fit in an integer data type, return the answer as a string.

// If there is no answer return an empty string.




// Intuition: 3 divisibility rules says that if the sum of digis%3===0 then n%3==0
var largestMultipleOfThree = function(digits) {
    digits.sort((a,b)=>a-b)
    let total=digits.reduce((acc,curr)=>acc+curr)
    
    //if total is divisible by 3 then my biggest number is already formed
    if(total%3==0)return digits.reduce((acc,curr,i)=>acc+curr*(10**i).toString())
    

    //if the  remainder of total is 1, i can perform two operations
    // either remove a 1,4,7 to amke the remainder ==0
    // or remove two of 2,5,8 to make the remainder ==0
    // that would be 2,2 , 2,5 , 5,5 ,2,8, 5,8  8,8
    if(total%3==1){
        
        let first=-1
        let second=[]
        for (let i = 0; i < digits.length; i++) {
            if(digits[i]==1 || diogits[i]==7 || digits[i]==4){
                if(first!=-1)first=i
            }            
            if(digits[i]==2 || diogits[i]==5 || digits[i]==8){
                
                if(second.length<2)second.push(i)
            }  
        }
        
        
        //calculate the max number after the operations
        let result1=-1
        let result2=-1
        if(first!=-1){
            result1=0
            for (let i = 0,j=0; i < digits.length; i++) {
                    if(i!==first){
                        result1+=digits[i]*10**j
                        j++
                    }                
            }

        }

        if(second.length==2){
            result2=0
            for (let i = 0,j=0; i < digits.length; i++) {
                    if(i!==second[0]&&i!==second[1]){
                        result2+=digits[i]*10**j
                        j++
                    }                
            }

        }

        return final==-1?'':final


    }
    if()
};