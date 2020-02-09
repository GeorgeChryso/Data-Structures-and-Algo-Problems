// Given a m * n matrix seats  that represent seats distributions in a classroom. If a seat is broken, it is denoted by '#' character otherwise it is denoted by a '.' character.

// Students can see the answers of those sitting next to the left, right, upper left and upper right, but he cannot see the answers of the student sitting directly in front or behind him. Return the maximum number of students that can take the exam together without any cheating being possible..

// Students must be placed in seats in good condition.

//standard dfs -TLE, 50/55 passed
var maxStudents = function(S) {

    //this logic prunes the trees i m about to expand by preplacing students in safe places
    let startcheck=(i,j)=>{
        return ways.every(
                ([a,b])=>(i+a<0||j+b<0||i+a>=S.length||j+b>=S[0].length)?true:
                   S[i+a][j+b]==='#'
            )
    }
    let standard=0

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
                if(startcheck(i,j)){
                    S[i][j]='#'
                    standard++
                }
                else{
                    proc.push([i,j])
                }
            
            }       
        }        
    }

    let helper=(matrix,left,seated)=>{
 
        if(left.length){
          

            let cand=left.shift()
            while(matrix[cand[0]][cand[1]]==='#'&&left.length){
                cand=left.shift()
            }
            let i=cand[0],j=cand[1]

            if(left.length==0 &&matrix[i][j]==='#')return seated

        
            let sum1=0
            if(check(i,j,matrix)==true){
                let m1=JSON.parse(JSON.stringify(matrix))
                m1[i][j]=1
                ways.forEach(([a,b])=>{
                    if(i+a<0||j+b<0||(i+a>=S.length)||(j+b>=S[0].length)){

                    }
                    else{
                        m1[i+a][j+b]='#'
                    }
                })
                
                sum1=helper(m1,[...left],seated+1)

            }
            let m2=JSON.parse(JSON.stringify(matrix))
            m2[i][j]='#'
            
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