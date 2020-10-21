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

//obviously this becomes a O(N*(2^m)*(2^m)) solution

//dp[i][mask][prevmask]=Math.max(dp[i-1][prevmask][k]+turretcount(mask) ),for each prevmask and k 

let Turrets=A=>{
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