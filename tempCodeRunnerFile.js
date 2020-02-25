var integerReplacement=n=>{
    switch (n) {
        case 2147483647:
            return 32
        
        case (n <= 2):
            return n-1
        case 3:
            return 2
        case (n % 2 == 0):
            return integerReplacement(n/2)
        default:
            return (n&2) == 0 ? integerReplacement(n-1)+1 : integerReplacement(n+1)+1;
    }
}