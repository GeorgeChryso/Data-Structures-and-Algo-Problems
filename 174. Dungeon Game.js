// The demons had captured the princess (P) and imprisoned her in the bottom-right corner of a dungeon. The dungeon consists of M x N rooms laid out in a 2D grid. Our valiant knight (K) was initially positioned in the top-left room and must fight his way through the dungeon to rescue the princess.

// The knight has an initial health point represented by a positive integer. If at any point his health point drops to 0 or below, he dies immediately.

// Some of the rooms are guarded by demons, so the knight loses health (negative integers) upon entering these rooms; other rooms are either empty (0's) or contain magic orbs that increase the knight's health (positive integers).

// In order to reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step.

 


var calculateMinimumHP = function(A) {
    var min=Infinity
    if(A.length==1&&A[0].length==1){return A[0][0]<=0?-A[0][0]+1:1}
    
    var start=0;
    var flag=false
        function Recu(i,j,curr,need){
            if(i>=A.length||j>=A[0].length){
                return;
            }
        
            if(i==A.length-1&&j==(A[0].length-1)){

                let currn=curr+A[i][j]
                if(currn<=0){
                need+=(1-currn)
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
                    currn=1
                    flag=true

                    }


                Recu(i+1,j,currn,need)
                Recu(i,j+1,currn,need)

            
                return      
            }
            return
        }
    

   
    // if(A[0][0]<=0){
    // Recu(0, 0, 0, 0)}
    // else{
    Recu(0, 0, 0, 0)
   // }
    return !flag?1:min;
};

console.log(calculateMinimumHP(
  
   
[[3,-20,30]
,[-3,4,0]]
    ))

