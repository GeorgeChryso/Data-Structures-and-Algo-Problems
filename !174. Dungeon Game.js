// The demons had captured the princess (P) and imprisoned her in the bottom-right corner of a A. The A consists of M x N rooms laid out in a 2D grid. Our valiant knight (K) was initially positioned in the top-left room and must fight his way through the A to rescue the princess.

// The knight has an initial health point represented by a positive integer. If at any point his health point drops to 0 or below, he dies immediately.

// Some of the rooms are guarded by demons, so the knight loses health (negative integers) upon entering these rooms; other rooms are either empty (0's) or contain magic orbs that increase the knight's health (positive integers).

// In order to reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step.

 

// Naive Brute Force
var calculateMinimumHP = function(A) {
    var min=Infinity
    if(A.length==1&&A[0].length==1){return A[0][0]<=0?-A[0][0]+1:1}
    
    var flag=false
        function Recu(i,j,curr,need){
            if(i>=A.length||j>=A[0].length){
                return;
            }
        
            if(i==A.length-1&&j==(A[0].length-1)){

                let currn=curr+A[i][j]
                if(currn<=0){
                need+=(1-currn)
                if(need==1)return 1
                flag=true
                }
                min=Math.min(min,need)

                return
            }

            if(i>=0&&j>=0)
            {

                
                let currn=curr+A[i][j]
                if(currn<=0){
                    need+=(1-currn)
                    if(need>=min){
                        return;
                    }
                    currn=1
                    flag=true

                    }


                Recu(i+1,j,currn,need)
                Recu(i,j+1,currn,need)

            
                return      
            }
            return
        }
    

   
  
    Recu(0, 0, 0, 0)
    return !flag?1:min;
};




// Elegant O(M*N), O(1)

// T L D R
// so starting from the princess herself i am replacing all the 
// A[i][j] elements with: The minimum Hp needed to get to the Princess // 

// I am doing this in an order befitting to the freedom of movement so 
// as for all the cases to be considered(Rightward and Downward movements)

// In the end I return the first element which has to be the least amount 
// of HP needed to get to the princess overall. 

// I could have used an external Memoization MxN matrix but that would just be
// extra uncesessary space, so I m using the given Matrix instead

var calculateMinimumHP = function(A) {
    if (A.length === 0) {
        return 1;
    }
    
    const [m, n] = [A.length, A[0].length];


    // FROM THE BOTTOM ROW TO THE FIRST, COS I CAN ONLY GO DOWNWARDS
    for (let i=m-1; i>=0; i--) {

        
        // FROM THE RIGHTMOST COLUMN TO THE FIRST, COS I CAN ONLY GO RIGHTWARDS
        for (let j=n-1; j>=0; j--) {


            if (i === m-1 && j === n-1) { // Princess


                
                A[i][j] = Math.max(1-A[i][j], 1);


            } 
            
            else if (i === m-1) { // Last Row

                // Vale o,ti vlepw deksia tou pinaka
                A[i][j] = Math.max( A[i][j+1]-A[i][j] , 1);
            } 
            
            else if (j === n-1) {// Last Column
                A[i][j] = Math.max(A[i+1][j]-A[i][j], 1);



            } else { //Any other element
                A[i][j] = Math.max(Math.min(A[i+1][j], A[i][j+1])-A[i][j], 1);
            }
        }
    }
    
    return A[0][0];
};




console.log(calculateMinimumHP(
  
   
[[3,-20,30]
,[-3,4,0]]
    ))

