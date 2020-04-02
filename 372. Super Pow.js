
// Your task is to calculate ab mod 1337 where a is a positive integer and b is an extremely large positive integer given in the form of an array.


var superPow = function(a, b) {
    //through binary exponantiation I will calculate a**b
    

    var myPow = function(x, n) {
        if(n===0)return 1
        let result=1
        // if n is negative i m gonna compute the positive power
        // and return 1/result
        let q=Math.max(n,-n)
        while( n){
            if(q&1)result*=x
            q>>>=1
            x*=x
        }
        
        return n<0?result:1/result
    };
    let powerA=myPow(a,parseInt(b.join('')))

    return powerA%1337
    //through the extended euclidean algorithm I will calculate the modular inverse of  a
    let exEuc=(a,b)=>{

        let extendedEuclidean=( a,  b) =>{
            let x,y
            if (a == 0) {
                x = 0;
                y = 1;
                return [b,0,1];
            }
            let [g,x1,y1]= extendedEuclidean(b % a, a);
            x = y1- Math.floor(b / a) * x1;
            y = x1;
            return [g,x,y];
        }
        let gcd=extendedEuclidean(a,b) // find both the gcd and the solution to the LDequation,(the x,y)
    
        return gcd 
     }
    
    
     // A  number a has a modular inverse mod b  <=> gcd(a,b)=1
     // then ax+by=1 ====> x is the modular inverse of a modb
     // If a number a has a modular inverse modb , then I can find the triplet extended euclidean gives me
     // x is the inverse of a modb
    // BUT, X CAN BE A NEGATIVE NUMBER, THAT'S WHY I HAVE TO  FIND THE EQUILEVANT POSITIVE NUMBER
    
    let modInverse=(a,b)=>{
    
        let [g,x,y]=exEuc(a,b)
        if(g!==1)return "Not possible"
        
        x=(x%b+b)%b //picks the positive x
        return x
    }



};
