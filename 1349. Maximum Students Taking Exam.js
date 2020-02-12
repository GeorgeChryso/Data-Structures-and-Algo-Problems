// Given a m * n matrix seats  that represent seats distributions in a classroom. If a seat is broken, it is denoted by '#' character otherwise it is denoted by a '.' character.

// Students can see the answers of those sitting next to the left, right, upper left and upper right, but he cannot see the answers of the student sitting directly in front or behind him. Return the maximum number of students that can take the exam together without any cheating being possible..

// Students must be placed in seats in good condition.

//standard dfs -TLE, 50/55 passed
var maxStudents = function(S) {

    //this logic prunes the trees I'm about to expand by preplacing students in safe places
    let startcheck=(i,j)=>{
        return ways.every(
                ([a,b])=>(i+a<0||j+b<0||i+a>=S.length||j+b>=S[0].length)?true:
                   S[i+a][j+b]==='#'
            )
    }
    let standard=0 //store the number of preplaced students here 


    //checks if it is safe to place a student on position i,j of the matrix k
    let check=(i,j,k)=>{
        return ways.every(
                ([a,b])=>(i+a<0||j+b<0||i+a>=k.length||j+b>=k[0].length)?true:
                   k[i+a][j+b]!==1
            )
    }
    let ways=[[-1,-1],[-1,+1],[0,-1],[0,1]]
    let proc=[] //this stores the indices pairs of my candidate placings


    
    for (let i = 0; i < S.length; i++) {
        for (let j = 0; j < S[0].length; j++) {
            if(S[i][j]==='.'){

                //preplace && remove from candidates
                if(startcheck(i,j)){
                    S[i][j]='#'
                    standard++
                }
                // save the candidate position
                else{
                    proc.push([i,j])
                }
            
            }       
        }        
    }


    //dfs logic
    let helper=(matrix,left,seated)=>{
 
        if(left.length){
          

            //take the first pair of indices 
            let cand=left.shift()
            // that isnt a '#" on my matrix
            while(matrix[cand[0]][cand[1]]==='#'&&left.length){
                cand=left.shift()
            }
            let i=cand[0],j=cand[1]

            if(left.length==0 &&matrix[i][j]==='#')return seated

        
            let sum1=0
            //1st option
            //if it's still a potential candiate (not 1 (placed) adjacent)
            if(check(i,j,matrix)==true){
                let m1=JSON.parse(JSON.stringify(matrix)) //deep copy the matrix im about to alter
                m1[i][j]=1 // place a fella
                //and verify your placement by making all the adjacent unavailable
                ways.forEach(([a,b])=>{
                    if(i+a<0||j+b<0||(i+a>=S.length)||(j+b>=S[0].length)){

                    }
                    else{
                        m1[i+a][j+b]='#'
                    }
                })
                //and expand your selection
                sum1=helper(m1,[...left],seated+1)

            }
            //2nd option
            let m2=JSON.parse(JSON.stringify(matrix))
            m2[i][j]='#' // Do not place a student 
            
           return Math.max(sum1,helper(m2,[...left],seated)) 
        }
        else{
            return seated
        }
    }
    
    

    return helper(S,proc,0)+standard

};

//potential solution? Mask every array into a string for easy processing


//solution bitmask:todo

//use a series of bits to represent each row
//1 for not broken 0 for broken
//1 for seated // n bits representing studeents must be a subset of n bits representing seats

//dp[i][mask]= the maximum number of students for the first i rows while the students in the i-th row folow the mask
//dp[i][mask]=Math.max(dp[i-1][mask'])+ number of valid bits(mask)


//(mask & (mask' >> 1)) == 0, there should be no students in the upper left position for every student. Essentially moved the previous row 1 position to the left in order to AND every element of my current mask with its respective left element on the above side
//((mask >> 1) & mask') == 0, there should be no students in the upper right position for every student.Same logic for its respective right element, but now i m moving the row itself one bit to the right


//If these two equation holds and dp[i - 1][mask'] itself is valid, we could then transit from dp[i - 1][mask'] to dp[i][mask] according to the transition function.

//count[i] = count[i/2] + (i % 2 == 1) and store them in an array to compute the number of valid bits in a masking efficiently



var maxStudents=(matrix)=>{
    
    //counts the ones within a binary representation of a number
    let bitCount=(n)=>(n.toString(2).match(/1/g)!==null?n.toString(2).match(/1/g).length:0)
  
    let validity=[] //essentially a binary representation of the available seats of each row,1 if available 0 if not

    //fill the validity matrix (availability)
    //one line
    //validity=matrix.map(row=>parseInt(row.map(d=>Number(d==".")).join(''),2))
    //or
    for (let i = 0; i < matrix.length; i++) {
        let cur=0
        //create the binary representation of the row
        for (let j = 0; j < matrix[0].length; j++) {
           cur=cur*2+(matrix[i][j]==".") 
           //or
           //same thing with bitwise operators
           // cur=(cur<<1)^(matrix[i][j]==".")      
        }
        validity.push(cur)
    }

   // let stateSize=1<<matrix[0].length //2^n states for n columns    
    let stateSize=Math.pow(2,matrix[0].length)

    let dp=Array(matrix.length).fill(null).map(d=>Array(stateSize).fill(-1))
    let result=0

    for (let i = 0; i < dp.length; i++) {

        for (let j = 0; j < stateSize; j++) {
            //to start with, j's binary representation is a potential state

            // (j & valid) == j: check if j is a subset of valid
            // valid is the actual row, j can be any row where one or more of the ones are inverted

		    // (j & (j >> 1))==0: check if there is no adjancent students in the row
            let isValid=( ((j&validity[i])==j)  && ( (j & (j >> 1)) == 0) ) 

            if(isValid){

                if(i==0)dp[i][j]=bitCount(j)
                else{
                   
                     for (let k = 0; k < stateSize; k++) {

                        // !(j & (k >> 1)): no students in the upper left positions
                        let UpLeft=(j&(k >> 1))==0
                        // !((j >> 1) & k): no students in the upper right positions
                        let UpRight=((j >> 1) & k)==0
                        // dp[i-1][k] != -1: the previous state is valid
                        let PrevValid=dp[i-1][k] != -1

                        let possible=UpLeft&&UpRight&&PrevValid

                        if(possible){
                            dp[i][j] = Math.max(dp[i][j], dp[i-1][k] + bitCount(j));
                        }
                     }
                     
                }
                result=Math.max(result,dp[i][j])

            }

        }

    }

    return result
};

console.log(
    maxStudents(
        [["#",".","#","#",".","#"],
        [".","#","#","#","#","."],
        ["#",".","#","#",".","#"]]
    )
)