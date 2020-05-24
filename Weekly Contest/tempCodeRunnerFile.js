        }        
        memo.push([...temp])
    }
    let result=-Infinity
    let choices=[...Array(memo.length)].map(d=>[...Array(memo[0].length)].fill(-Infinity))
    for (let j = memo[0].length-1; j >=1; j--) {
        for (let i = memo.length-1; i >=0; i--) {
            if(i===memo.length-1){
                choices[i][j]=memo[i][j]
            }
            else choices[i][j]=Math.max(choices[i+1][j],memo[i][j])
        }
    }
    for (let j = 0; j < choices.length; j++) {
        choices[j][0]=memo[j][0]        
    }
    
    for (let i = 1; i < choices.length; i++) {
        let sum=Math.max(choices[i-1][0],0)
        for (let j = 1; j < array.length; j++) {
            sum+=Math.max(0,choices[i][j])            
        }
        result=Math.max(result,sum)
    }

    return result
};