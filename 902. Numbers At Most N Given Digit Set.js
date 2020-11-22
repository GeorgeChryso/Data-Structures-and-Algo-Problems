// Given an array of digits, you can write numbers using each digits[i] as many times as we want.  For example, if digits = ['1','3','5'], we may write numbers such as '13', '551', and '1351315'.

// Return the number of positive integers that can be generated that are less than or equal to a given integer n.



//no dp
var atMostNGivenDigitSet = function(digits, target) {
    let n=digits.length,result=0,
        m=target.toString().length //my target's length

    //first add all the numbers of lower lengths than my target
    for(let k=1;k<m;k++)
        result+=n**k
    digits.map(d=>Number(d))
    digits.sort((a,b)=>a-b)
    
    let prev=1 
    //essentially prev holds the number of ways I can create a number thats lower than 
    // the number created by the last i digits of my target
    for(let i=0;i<m;i++){
        let currDigit=target%10,numsBelowIt=0,hasCurr=0
        for(let j=0;j<n;j++)
            if(digits[j]<currDigit)
                numsBelowIt++
            else if(digits[j]==currDigit)
                hasCurr=1
        prev=numsBelowIt*n**(i) + hasCurr*prev
        target=(target-currDigit)/10
    }
    return result+prev
};