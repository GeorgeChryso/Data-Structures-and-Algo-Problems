// We distribute some number of candies, to a row of n = num_people people in the following way:

// We then give 1 candy to the first person, 2 candies to the second person, and so on until we give n candies to the last person.

// Then, we go back to the start of the row, giving n + 1 candies to the first person, n + 2 candies to the second person, and so on until we give 2 * n candies to the last person.

// This process repeats (with us giving one more candy each time, and moving to the start of the row after we reach the end) until we run out of candies.  The last person will receive all of our remaining candies (not necessarily one more than the previous gift).

// Return an array (of length num_people and sum candies) that represents the final distribution of candies.


// SIMPLE SOLUTION, WEAK
var distributeCandies = function(C, N) {
    let answ =Array(N).fill(0)
    answ[0]=1
    for (var  i=1;  C>0 ;i++) {
        answ[(i-1)%N]+=Math.min(C, i);
        C-=Math.min(C, i);    
    } 
    return answ
};




//DYNAMIC PROGRAMMING SOLUTION, WEAK
var distributeCandies = function(C, N) {
    var result=new Array(N).fill(0);
    if(C == 0) return result;
    
    var dfs=function(C, i){
        var cur = Math.min(C, i);
        result[(i-1)%N]+=cur;
        C-=cur;
        if(C<=0){
            return;
        }
        dfs(C, i+1);
    }
    dfs(C, 1)
    return result;
};

// Arithmetic progression usage
var distributeCandies = function(C, N) {
    let answ =Array(N).fill(0)
    function SumAt(n){
        return n*(n+1)/2

    }
    let D=C+1-1
    for (var  i=0;  0<D ;i++) {

        for (var j =0 ;  SumAt(i+j*N)<=C ; j++) {
            
            answ[(i)%N]+= SumAt(i+j*N+1)<C? 
            (1+i+j*N) 
            :
             ( C- SumAt(i+j*N))
        }
        D-=answ[i]
    } 

    return answ
};
// MORE MATHS
var distributeCandies = function(C, N) {
    let answ =Array(N).fill(0)
    function charAtPos(a1,n,v){
        return a1+(n-1)*v
    }
    function SumAt(a1,n,v){
        return n*(a1+charAtPos(a1,n,v))/2

    }
    let D=C+1-1
    for (var  i=0;  0<D ;i++) {

       var j=0
       while(SumAt(1,i+j*N,1)<=C){j++}
        j--;
        answ[i%N]=SumAt(1,1+i+j*N,1)<C? 
        SumAt(i%N,i+j*N+1,N)
        :
         (  SumAt(i%N,i+j*N ,N)+C-charAtPos(1,i+j*N+1,1) );
        D-=answ[i]
    } 
    answ[0]++
    console.log('broke at D='+D)

    return answ
};

console.log(
    distributeCandies(
 10,3
    )
)

// 2 2 3