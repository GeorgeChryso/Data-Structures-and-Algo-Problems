/*

    Given an NxM grid, of H (Hills) and P (Plains). You can only place Turrets in Ps.
    A turret will attack anything on his cross region up to his attack range ,which is two cells. 

                                        [....|...]
                                        [....|...]
                                        [..--T--.]
                                        [..H.|...]
                                        [..|.H...]
                                        [--T-----]
                                        [..|.....]
    Return the maximum number of Turrets that you can place on the grid, such that no turret attacks 
    another. 

    N <= 100, 
    M <= 10 <===notice, too small.



    Sample Input
    5 4
    PHPP
    PPHH
    PPPP
    PHPP
    PHHP
    Sample Output
    6
*/



//dp[i][mask][prevmask]
// is the Maximum turrets I can place on the i-th row using the bitwise mask, while on the previous row I used the bitwise mask prevmask

//obviously this becomes a O(N*(2^m)*(2^m)*(2^m)) solution

//dp[i][mask][prevmask]=Math.max(dp[i-1][prevmask][k]+turretcount(mask) ),for each prevmask and k 

var Turrets=A=>{
    let n=A.length,m=A[0].length,result=0
    //first i ll save my matrix as an array of n numbers, 0 for empty places and 1 for hills
    let M=A.map(d=>{
        let mask=0,len=d.length
        for (let i = 0; i < len; i++) 
            if(d[i]==='H')
                mask|=(1<<(len-1-i))
        return mask
    })
    //checks if the current choice of mask doesnt place any turrets 
    // on hills of the current row, and all turrets have at least 2 spaces between them
    let isValidMask=(mask,row)=>{
        // turret and hill overlap
        if(mask&M[row])
            return false
        //2spaces between each one
        while(mask&1==0)
            mask>>=1
        let spaces=-1
        while(mask){
            if(mask&1){
                if(spaces>0)
                    return false
                spaces=2
            }
            else
                spaces--
            mask>>=1
        }
        return true
    }
    let countbits=mask=>{
        let count=0 ,m=mask
        while(mask)
            count+=(mask&1),
            mask>>=1
        return count
    }
    let isValidTriplet=(a,b,c)=>{
        return ((a&c) ==0 )&& ((a&b)==0 )&&( (b&c )==0)
    }
    //initialize my matrix
    let dp=[...Array(n)].map(d=>[...Array(1<<m)].map(d=>[...Array(1<<m)].map(d=>-1)))

    //basecases, any mask for the 2 first rows
    // the 0-th row can be filled with anything valid, 
    for (let mask = 0; mask < (1<<m); mask++) //a valid 0-th row
        if(isValidMask(mask,0))
            for (let secondary = 0; secondary < (1<<m); secondary++) //anymask
                dp[0][mask][secondary]=Math.max(dp[0][mask][secondary],countbits(mask)),
                result=Math.max(result,dp[0][mask][secondary])
        
    if(n<=1)
        return result
    // the first row can be filled only according to the 0-th row          
    for (let mask = 0; mask < (1<<m); mask++) //a valid 0-th row
        if(isValidMask(mask,1))
            for (let secondary = 0; secondary < (1<<m); secondary++) //anymask
                if(isValidMask(secondary,0)&& !(mask&secondary))
                    for (let anymask = 0; anymask < (1<<m); anymask++) //anymask
                        dp[1][mask][secondary]=Math.max(dp[1][mask][secondary],dp[0][secondary][anymask]+countbits(mask)),
                        result=Math.max(result,dp[1][mask][secondary])

    for(let i=2;i<n;i++){
        //try all cases for my currmask
        for (let mask = 0; mask < (1<<m); mask++) {
            if(!isValidMask(mask,i))
                continue
            //check validity of the currmask
            let countturrets=countbits(mask)
            for (let prev = 0; prev < (1<<m); prev++) {
                if(!isValidMask(prev,i-1))
                    continue
                //check validity of the prev
                for (let prevprev = 0; prevprev < (1<<m); prevprev++) {
                    if(!isValidMask(prevprev,i-2))
                        continue
                    if(!isValidTriplet(mask,prev,prevprev))
                        continue
                    //check validity of the triplet 
                    dp[i][mask][prev]=Math.max(
                        dp[i][mask][prev],
                        dp[i-1][prev][prevprev]+countturrets
                    )
                    result=Math.max(result,dp[i][mask][prev])
                }                
            }            
        }
    }

    return result
}


///apparently there's a faster solution
// State compression=> Compress 2 rows into M integers

// I can encode my 2 previous rows into M base 3 integers
// and for EACH possible row (O(2^M)), 
// try all possibilities for the 2 previous rows => O( 3^M)
// • Three possibilities for the column of the previus two rows
// • Use base-3 integers to encode

//dp[i][mask] instead holds the max turrets placed till row i
// if my last 2 rows consist of a number represented by mask in base 3 Int

//dp[i]['2001'] is when  i-1:    0110
//                         i:    0001


// this will reduce the complexity to O(N* 2^M * 3^M )
// Because I m using 1 number for 2 rows
// base 3
// 
/*

    so  0 maps to  1   
                   0

        1 maps to  0                so 2010=>  0101
                   1                           0010        
                                    and 2010 is invalid btw cos on the first row, 2 turrets are too close
    and 2 maps to 0
                  0


  State compression but implementation heavy  problem
*/

// O(n*2^m*3^m) runtime , O(n*m)
var TurretsNaiveDP=A=>{
    let n=A.length,m=A[0].length,result=0
    //first i ll save my matrix as an array of n numbers, 0 for empty places and 1 for hills
    let M=A.map(d=>{
        let mask=0,len=d.length
        for (let i = 0; i < len; i++) 
            if(d[i]==='H')
                mask|=(1<<(len-1-i))
        return mask
    })
    //checks if the current choice of mask doesnt place any turrets 
    // on hills of the current row, and all turrets have at least 2 spaces between them
    let isValidMask=(mask,row)=>{
        // turret and hill overlap
        if(mask&M[row])
            return false
        //2spaces between each one
        while(mask&1==0)
            mask>>=1
        let spaces=-1
        while(mask){
            if(mask&1){
                if(spaces>0)
                    return false
                spaces=2
            }
            else
                spaces--
            mask>>=1
        }
        return true
    }

    let countbits=mask=>{
        let count=0 ,m=mask
        while(mask)
            count+=(mask&1),
            mask>>=1
        return count
    }
    if(n==1){//just 1 row edge case
        for (let mask = 0; mask < (1<<m); mask++) 
            if(isValidMask(mask,0))
                result=Math.max(result,countbits(mask))           
        return result
    }


    //basecases, any mask for the 2 first rows
    // the first two rows can be filled wif anyfin as long as its valid
    let isValidMask2D=(mask,currow)=>{
        //check if every 1 has a distance of 2 from every other 1
        // and 0 from the next 0
        mask=mask.toString(3)
        let l=mask.length
        for (let i = 0; i < m-l; i++) 
            mask='0'+mask    // fill in the zeroes ommited at the beginning of the mask
        //test for the validity of the mask itself
        let regex=RegExp(/((00)|(11)|(101)|(121)|(010)|(020))/,'g')
        if(regex.test(mask))
            return false
        // check if it overlaps with any HILLS 
        for (let i = 0; i < m; i++) {
            let char=mask[i]
            if(char==='1'){
                if(M[currow]&(1<<(m-1-i)))
                    return false
            }   
            else if(char=='0'){
                if(M[currow-1]&(1<<(m-1-i)))
                    return false
            }         
        }
        return true
    }
    let countbits2d=mask=>{
        let l=mask.length
        for (let i = 0; i < m-l; i++) 
            mask='0'+mask 
        return mask.split('').reduce((a,c)=>a+(c=='2'?0:1),0)
    }



    //checks if prevrows can be the 2 previous rows fo curmask
    let createTuple=(prevrows,currmask)=>{
        prevrows=prevrows.toString(3)
        
        let l=prevrows.length
        for (let i = 0; i < m-l; i++) 
            prevrows='0'+prevrows 
        //create the res
        let res=''
        for (let i = 0; i < m; i++) {
            let ele=prevrows[i]
            //check for 0/1 of prevrows
            // being on the same col as a turned on bit
            // of currmask            
            if((currmask&(1<<(m-1-i)))&&ele!=='2')
                return -1
            
            if(currmask&(1<<(m-1-i)))
                res=res+'1'
            else{
                if(ele!='1')
                    res=res+'2'
                else
                    res=res+'0'
            }            
        }
        //return the integer base 3 representation of the new last 2 rows
        return parseInt(res,3)
    }

    //for each row, create a memo validMask2dRow[i] which basically 
    // contains all the possible previous 2 rows that are valid for this row base 3
    let validmask2dRow=[...Array(n)].map(d=>[...Array(3**m)].map(d=>false))
    // O(n*3^m*m) to fill it
    for (let i = 1; i < n; i++) 
        for (let mask = 0; mask < 3**m; mask++)
            if(isValidMask2D(mask,i))
                validmask2dRow[i][mask]=true
    
    // console.log(validmask2dRow[1].map((d,i)=>[d,i]).filter(([a,b])=>a)
    // )
    //for each row, create also a validMask1dRow[i] which contains all the possible
    // masks base 2 for that row
    let validMask1dRow=[...Array(n)].map(d=>[...Array(1<<m)].map(d=>false))
    // O(n*2^m*m)runtime to fill it
    for (let i = 0; i < n; i++) 
        for (let mask = 0; mask < (1<<m); mask++)
            if(isValidMask(mask,i))
                validMask1dRow[i][mask]=true

    //count bits for each mask base 2
    let count=[...Array(1<<m)] 
    for (let mask = 0; mask < (1<<m); mask++)
        count[mask]=countbits(mask)
    //for each possible combination of a row in base 2 and 2 previous rows in base 3
    // create a isValid3rows[prev2_base_3][curr_base_2] which tells me if it can be a valid
    // 3 consecutive rows
    // O(m*2^M*3^N) runtime O(3**M*2**M) space
    let isValid3rows=[...Array(3**m)].map(d=>[...Array(1<<m)].map(d=>-1))
    for (let mask = 0; mask < 3**m; mask++)
        for (let curmask = 0; curmask < (1<<m); curmask++)
        // -1 means it's not possible for this to be consecutive
        // else the number is the new base 3 representation of the last 2 rows
            isValid3rows[mask][curmask]=createTuple(mask,curmask)


    //dp part
    //initialize my matrix, N*3^M cos it saves the last 2 compressed rows
    let dp=[...Array(n)].map(d=>[...Array(3**m)].map(d=>-1))

    //basecase
    for (let mask = 0; mask < (3**m); mask++)
        if(validmask2dRow[1][mask])
            dp[1][mask]=countbits2d(mask.toString(3)),result=Math.max(result,dp[1][mask])
        


    for(let i=2;i<n;i++){
        //try all cases for the prev 2 rows
        for (let mask = 0; mask < (3**m); mask++) {
            if(!validmask2dRow[i-1][mask])
                continue
            for (let curmask = 0; curmask < (1<<m); curmask++) {
                if(!validMask1dRow[i][curmask])
                    continue
                if(isValid3rows[mask][curmask]<0)
                    continue
                let cur2rows=isValid3rows[mask][curmask] //turned into a number from base 3
                dp[i][cur2rows]=Math.max(dp[i][cur2rows],dp[i-1][mask]+count[curmask])       
                result=Math.max(result,dp[i][cur2rows])         
            }
        }
    }
    return result
}

let b3=n=>{
    console.log(n.toString(3),parseInt(n.toString(3),3))
}


console.log(
    Turrets(
        ['PP',
        'PH']
    )
)


console.log(
    Turrets(
        ['PHPP',
        'PPHH',
        'PPPP',
        'PHPP',
        'PHHP']
    )
)



let testcase=
[
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP',
    'PPPPPPPPPP'
]
console.log(Turrets(testcase))