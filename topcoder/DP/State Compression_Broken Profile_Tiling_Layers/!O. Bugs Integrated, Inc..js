// // Bugs Integrated, Inc. is a major manufacturer of advanced memory chips. They are launching production of a new six terabyte Q-RAM chip. Each chip consists of six unit squares arranged in a form of a 2*3 rectangle. The way Q-RAM chips are made is such that one takes a rectangular plate of silicon divided into N*M unit squares. Then all squares are tested carefully and the bad ones are marked with a black marker.
// Finally, the plate of silicon is cut into memory chips. Each chip consists of 2*3 (or 3*2) unit squares. Of course, no chip can contain any bad (marked) squares. It might not be possible to cut the plate so that every good unit square is a part of some memory chip. The corporation wants to waste as little good squares as possible. Therefore they would like to know how to cut the plate to make the maximum number of chips possible.
// Task
// You are given the dimensions of several silicon plates and a list of all bad unit squares for each plate. Your task is to write a program that computes for each plate the maximum number of chips that can be cut out of the plate.
// Input

// The first line of the input file consists of a single integer D (1 <= D <= 5), denoting the number of silicon plates. D blocks follow, each describing one silicon plate. The first line of each block contains three integers N (1 <= N <= 150), M (1 <= M <= 10), K (0 <= K <= MN) separated by single spaces. N is the length of the plate, M is its height and K is the number of bad squares in the plate. The following K lines contain a list of bad squares. Each line consists of two integers x and y (1 <= x <= N, 1 <= y <= M) ?coordinates of one bad square (the upper left square has coordinates [1, 1], the bottom right is [N,M]).
// Output

// For each plate in the input file output a single line containing the maximum number of memory chips that can be cut out of the plate.



var Bugs=(A)=>{
    let n=A.length,m=A[0].length,
        dp=[...Array(m+1)].map(d=>[...Array(1<<n)].map(d=>-Infinity)) 
    //dp[i][k] the number of ways to tile up to i-th column, when the i+1-th column has
    // profile mask k
    let res=0

    //basecase
    dp[0]=[...Array(1<<n)].map(d=>0) 
    let isOccupied=(i,mask,k)=> (mask&(1<<i)) || A[i][k]==='#'

    let search=(i,p,q,g,k,r2,r3)=>{
        if(i==n){
            if(k+1<=m)
                dp[k+1][q]=Math.max(dp[k+1][q],dp[k][p]+r2),
                res=Math.max(dp[k+1][q],res)
            if(k+2<=m)
                dp[k+2][g]=Math.max(dp[k+2][g],dp[k][p]+r2+r3,dp[k+1][q]),
                res=Math.max(dp[k+2][g],res)
            return
        }

        /*          k k+1 k+2
                    p  q  g
               i       *  *
               i+1     *  *
               i+2     *  *
        */
       if( i<n-2&&k<m-1 && !isOccupied(i  ,q,k+1)&&  !isOccupied(i  ,g,k+2)&&     
       !isOccupied(i+1,q,k+1)&& !isOccupied(i+1,g,k+2  )&&
       !isOccupied(i+2,q,k+1)&& !isOccupied(i+2,g,k+2 ) ){
               search(i+3, p, q|(7<<i), g|(7<<i), k, r2+1, r3)

       }


        if(isOccupied(i,p,k)){
            search(i+1,p,q,g,k,r2,r3)
            return 
        }
        
        /*             k k+1 k+2
                       p  q  g
               i       *  *
               i+1     *  *
               i+2     *  *
        */
        if( i<n-2&&k<m-1         && !isOccupied(i  ,q,k+1)&&   
           !isOccupied(i+1,q,k+1)&& !isOccupied(i+1,p,k  )&&
           !isOccupied(i+2,q,k+1)&& !isOccupied(i+2,p,k  )  ){
                search(i+3, p, q|(7<<i), g, k, r2+1, r3)
        }
        /* 
                 p  q  g
                 k k+1 k+2
            i    *  *  *
            i+1  *  *  *
        */
        if(k<m-2&&i<n-1&&
            !isOccupied(i+1,p,k  )&&
            !isOccupied(i+1,q,k+1)&&
            !isOccupied(i+1,g,k+2)&&
            !isOccupied(i  ,q,k+1)&&
            !isOccupied(i  ,g,k+2)      ){ 
            search(i+2, p, q|(3<<i), g|(3<<i), k, r2, r3+1);
        }

      
    }
    

    for (let k = 0; k <m; k++) 
        for (let p = 0; p < (1<<n); p++) {
            search(0,p,0,0,k,0,0) 
        }     

    dp.forEach(d=>console.log(d.map(q=>q===-Infinity?0:q)))
    return res
}


let test=
[   
    [
        '...#',
        '...#',
        '#...',
        '#...'
    ],
    [  
        '.....',
        '.....',
        '..#..',
        '.....',
        '.....',
       // '##.#.',
    ],
    [
        '....',
        '....',
        '....'
    ],
    [
        '.......',
        '..#....',
        '.......'   
    ],
    [
        '..#...',
        '......',
        '..####',
        '..#.#.',
        '..#...',
        '..#...'
    ],
    [
        '......',
        '.#....',
        '......',
        '#....#',
        '......',
        '..##..'
    ]
]
//console.log(Bugs(test[0]))
console.log(test.map(d=>Bugs(d)))
let output=[2,4,2,3,4,3]

