// We distribute some number of candies, to a row of n = num_people people in the following way:

// We then give 1 candy to the first person, 2 candies to the second person, and so on until we give n candies to the last person.

// Then, we go back to the start of the row, giving n + 1 candies to the first person, n + 2 candies to the second person, and so on until we give 2 * n candies to the last person.

// This process repeats (with us giving one more candy each time, and moving to the start of the row after we reach the end) until we run out of candies.  The last person will receive all of our remaining candies (not necessarily one more than the previous gift).

// Return an array (of length num_people and sum candies) that represents the final distribution of candies.


// SIMPLE SOLUTION, WEAK
var distributeCandies = function(C, N) {
    let answ =Array(N).fill(0)
    for (var  i=1;  C>0 ;i++) {
        var cur = Math.min(C, i);
        answ[(i-1)%N]+=cur;
        C-=cur       
    } 
    
    


    return answ
};

console.log(
    distributeCandies(
  60,4
    )
)

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