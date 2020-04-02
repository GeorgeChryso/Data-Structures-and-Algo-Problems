var findLucky = function(arr) {
    let freq={}
    for (const ele of arr) {
        freq[ele]=(freq[ele]||0) +1
    }
    let result=-1
    for (const ele of arr) {
        if(freq[ele]===ele)result=Math.max(ele,result)
    }
    return result
};

var numTeams = function(rating) {

    
    let dp=[...Array(3)].map(d=>[...Array(rating.length)].map(q=>0))
    let qp=[...Array(3)].map(d=>[...Array(rating.length)].map(q=>0))

    for (let i = 0; i < rating.length; i++) { 
        dp[0][i] = 1; 
        qp[0][i] = 1; 

    } 
    for (let l = 1; l < 3; l++) { 
  
        for (let i = l; i < rating.length; i++) { 
            dp[l][i] = 0; 
            qp[l][i] = 0; 

            for (let j = l - 1; j < i; j++) { 
                if (rating[j] < rating[i]) { 
                    dp[l][i] += dp[l - 1][j]; 
                } 
                if (rating[j] > rating[i]) { 
                    qp[l][i] += qp[l - 1][j]; 
                } 
            } 
        } 
    } 

    let result=0
    for (let i = 2; i < rating.length; i++) { 
        result += dp[2][i]; 
    } 

    return result
};



console.log(numTeams(
    [2,5,3,4,1]
))

