var numSquares=(n)=>{

    //returns if the number x is a valid square root
    let isSquare=x=>Math.sqrt(x)*Math.sqrt(x)===x
    
    if(isSquare(n))return 1

    while(!(n&3))n=n>>2 // divides the number by 4,  equivalent to n=n/4

    while(n&7==7)return 4
    
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if(isSquare(n-i*i))return 2
    }

    return 3
}
