	
// A sequence of numbers is called a zig-zag sequence if the differences between successive numbers strictly alternate between positive and negative. The first difference (if one exists) may be either positive or negative. A sequence with fewer than two elements is trivially a zig-zag sequence.

// For example, 1,7,4,9,2,5 is a zig-zag sequence because the differences (6,-3,5,-7,3) are alternately positive and negative. In contrast, 1,4,7,2,5 and 1,7,4,5,5 are not zig-zag sequences, the first because its first two differences are positive and the second because its last difference is zero.

// Given a sequence of integers, sequence, return the length of the longest subsequence of sequence that is a zig-zag sequence. A subsequence is obtained by deleting some number of elements (possibly zero) from the original sequence, leaving the remaining elements in their original order.




// DP O(n**2)
var LZZS=A=>{
    
    let n=A.length,dp=[...Array(n)].map(d=>[1,1]),result=1

    //dp[i]=[LOW,HI] 
        // LOW=Longest ZZ that ends on i, with the previous item being Bigger than A[i]
        // HI=Longest ZZ that ends on i, with the previous item being Smaller than A[i]

    for (let i = 1; i <n; i++) {
        for (let j = 0; j <i; j++) {
            let [l,h]=dp[j], [k,m]=dp[i]
            if(A[i]===A[j])
                dp[i]=[Math.max(l,k),Math.max(h,m)]
            else if (A[i]-A[j]>0)
                dp[i]=[k,Math.max(m,l+1)]
            else
                dp[i]=[Math.max(k,1+h),m]
            result=Math.max(result,dp[i][0],dp[i][1])
        }        
    }
    return result
}

// O(n) greedy
// Essentially looking for the longest sequence of different signs
// signs= -1 for negative difference A[i]-A[i-1] and 1 for positive
var LZZS=A=>{
    let signs=[...Array(A.length-1)]
    for (let i = 1; i < A.length; i++) 
        if(A[i]-A[i-1]==0)
            signs[i-1]=0
        else if(A[i]-A[i-1]>0)
            signs[i-1]=1
        else
            signs[i-1]=-1
    

    let lastsig=0,result=1
    for (let i = 0; i < A.length-1; i++) {
        if(signs[i]==lastsig||signs[i]==0)
            continue
        lastsig=signs[i]
        result++
    }
    return result
}

let tests=[
    [ 1, 7, 4, 9, 2, 5],//6
    [1, 17, 5, 10, 13, 15, 10, 5, 16, 8 ],//7
    [44],//1
    [ 1, 2, 3, 4, 5, 6, 7, 8, 9],//2
    [70, 55, 13, 2, 99, 2, 80, 80, 80, 80, 100, 19, 7, 5, 5, 5, 1000, 32, 32],//8
    [374, 40, 854, 203, 203, 156, 362, 279, 812, 955, 
        600, 947, 978, 46, 100, 953, 670, 862, 568, 188, 
        67, 669, 810, 704, 52, 861, 49, 640, 370, 908, 
        477, 245, 413, 109, 659, 401, 483, 308, 609, 120, 
        249, 22, 176, 279, 23, 22, 617, 462, 459, 244 ],//36
]

tests.forEach(
    d=>console.log(LZZS(d))
)