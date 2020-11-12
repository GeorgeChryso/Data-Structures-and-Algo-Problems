








var permute = function(A) {
    let result=[],n=A.length,
        backtracking=(curr,mask)=>{
            if(curr.length==n)
                return result.push([...curr])
            for (let i = 0; i < n; i++) 
                if(((1<<i)&mask)==0)
                    backtracking([...curr,A[i]],mask|(1<<i))
        }
    backtracking([],0)
    return result
}